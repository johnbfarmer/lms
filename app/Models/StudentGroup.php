<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;

class StudentGroup extends Model
{
    protected $fillable = [
        'id',
        'name',
        'owner_id',
        'course_id',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function saveUsers($arr)
    {
        // OmniHelper::log($arr);
        $vals = [];
        foreach($arr as $student) {
            $vals[] = "({$this->id}, {$student['id']})";
        }
        $valuesClause = implode(",", $vals);
        $sql = "DELETE FROM student_group_user WHERE student_group_id = ?";
        OmniHelper::log($sql);
        DB::delete($sql, [$this->id]);
        if (!empty($arr)) {
            $sql = "INSERT IGNORE INTO student_group_user (student_group_id, user_id) VALUES {$valuesClause}";
            OmniHelper::log($sql);
            DB::insert($sql, []);
        }
    }

    public function getScores($scoreParams)
    {
        extract($scoreParams); // studentId, agg, unit, unitId, ...  agg in (C, LS, L, P) unit in (C, LS, L, P)
        $whereUser = '';
        $whereUnit = '';
        $params = [$this->id];
        if ($studentId) {
            $whereUser = ' AND U.id = ?';
            $params[] = $studentId;
        }
        if ($unit) {
            $whereUnit = ' AND ' . $unit . '.id = ' . $unitId;
        }
        $joinType = $agg === 'P' ? 'INNER' : 'LEFT';
        $sql = '
        SELECT G.id as groupId, U.id as userId, ' . $agg . '.name as unit, ' . $agg . '.id as unitId, U.name as userName, avg(score) as userScore, sum(IF(S.id IS NULL, 0, 1)) as problemsDone, count(P.id) as numProblems
        FROM student_groups G
        INNER JOIN student_group_user GU ON GU.student_group_id = G.id
        INNER JOIN users U ON U.id = GU.user_id
        INNER JOIN courses C ON C.id = G.course_id
        INNER JOIN lesson_sets LS ON G.course_id = LS.course_id
        INNER JOIN lessons L ON LS.id = L.lesson_set_id
        INNER JOIN problems P ON L.id = P.lesson_id ' .
        $joinType.' JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = U.id
        WHERE G.id = ? ' . $whereUser . $whereUnit . ' AND P.active = 1 AND LS.active = 1 AND L.active = 1
        GROUP BY ' . $agg . '.id,' . $agg . '.name, U.id, U.name, G.id';
OmniHelper::log($sql);
OmniHelper::log($params);
OmniHelper::log($scoreParams);
        $recs = DB::select($sql, $params);

        return $recs;
    }

    public function getGroupMembers()
    {
        $sql = '
        SELECT S.*
        FROM users S
        INNER JOIN student_group_user SGU ON SGU.user_id = S.id AND student_group_id = ?
        ';
        $recs = DB::select($sql, [$this->id]);

        return $recs;
    }
}
