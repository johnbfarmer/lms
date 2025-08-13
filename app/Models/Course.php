<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;

class Course extends Model
{
    protected $fillable = [
        'name',
        'short_name',
        'description',
        'active',
    ];

    public function getMyChapters($activeOnly = true)
    {
        $activeClause = $activeOnly ? 'and active = 1' : '';
        $sql = 'SELECT * FROM lesson_sets where course_id = ? ' . $activeClause;
        $recs = DB::select($sql, [$this->id]);
        return $recs;
    }

    public function getGroups($userId = null)
    {
        $userFilter = $userId ? ' AND owner_id = ? ' : '';
        $args = [$this->id];
        if ($userId) {
            $args[] = $userId;
        }
        $sql = '
        SELECT * FROM student_groups 
        WHERE course_id = ? ' . $userFilter .'
        ORDER BY name desc
        ';

        $recs = DB::select($sql, $args);

        return $recs;
    }

    public function getGroupsAndStudents($userId = null)
    {
        $userFilter = $userId ? ' AND owner_id = ? ' : '';
        $args = [$this->id];
        if ($userId) {
            $args[] = $userId;
        }
        $sql = '
        SELECT G.* FROM student_groups G
        LEFT JOIN student_group_user U ON U.student_group_id = G.id
        WHERE G.course_id = ? ' . $userFilter .'
        ORDER BY name desc
        ';

        $recs = DB::select($sql, $args);

        return $recs;
    }

    public function getStudentScores($groupId, $studentId)
    {
        $whereUser = $studentId ? 'AND U.id = ?' : '';
        $params = [$this->id, $groupId];
        if ($studentId) {
            $params[] = $studentId;
        }
        $sql = '
        SELECT LS.name as chapterName, LS.id as chapterId, U.id as userId, U.name as userName, avg(score) as userScore, sum(IF(S.id IS NULL, 0, 1)) as problemsDone, count(P.id) as numProblems, LS.sequence_id + LS.id / 10000 as sortKey
        FROM users U
        CROSS JOIN courses C
        INNER JOIN lesson_sets LS ON C.id = LS.course_id
        INNER JOIN lessons L ON LS.id = L.lesson_set_id
        INNER JOIN problems P ON L.id = P.lesson_id
        INNER JOIN student_group_user SGU ON SGU.user_id = U.id
        INNER JOIN student_groups SG ON SG.id = SGU.student_group_id
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = U.id
        WHERE C.id = ? ' . $whereUser . ' AND SG.id = ? AND P.active = 1 AND LS.active = 1 AND L.active = 1
        GROUP BY LS.id, U.id';

        $recs = DB::select($sql, $params);

        return $recs;
    }
}
