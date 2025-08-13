<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LessonSet extends Model
{
    protected $fillable = [
        'name',
        'short_name',
        'is_premium',
        'course_id',
        'sequence_id',
        'active',
    ];

    public function getNeighboringChapterIds()
    {
        $sql = 'SELECT id FROM lesson_sets WHERE (sequence_id > ? OR sequence_id = ? AND id > ?) AND course_id = ? and active = 1 ORDER BY sequence_id, id';
        $rec = DB::select($sql, [$this->sequence_id, $this->sequence_id, $this->id, $this->course_id]);
        $nextChapterId = empty($rec) ? null :  $rec[0]->id;
        $sql = 'SELECT id FROM lesson_sets WHERE (sequence_id < ? OR sequence_id = ? AND id < ?) AND course_id = ? and active = 1 ORDER BY sequence_id desc, id desc';
        $rec = DB::select($sql, [$this->sequence_id, $this->sequence_id, $this->id, $this->course_id]);
        $previousChapterId = empty($rec) ? null : $rec[0]->id;

        return ['anterior' => $previousChapterId, 'siguiente' => $nextChapterId];
    }

    public function getMyLessons($publishedOnly = true)
    {
        $activeClause = $publishedOnly ? 'and active = 1' : '';
        $sql = 'SELECT * FROM lessons where lesson_set_id = ? ' . $activeClause;
        $recs = DB::select($sql, [$this->id]);
        return $recs;
    }

    public function getScores($studentId)
    {
        $groupByUser = $studentId ? ', U.id' : '';
        $whereUser = $studentId ? 'AND U.id = ?' : '';
        $params = [$this->id];
        if ($studentId) {
            $params[] = $studentId;
        }$sql = '
        SELECT L.name as lessonName, U.id as userId, U.name as userName, avg(score) as userScore, sum(IF(S.id IS NULL, 0, 1)) as problemsDone, count(P.id) as numProblems, L.sequence_id + L.id / 10000 as sortKey
        FROM users U
        CROSS JOIN courses C
        INNER JOIN lesson_sets LS ON C.id = LS.course_id
        INNER JOIN lessons L ON LS.id = L.lesson_set_id
        INNER JOIN problems P ON L.id = P.lesson_id
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = U.id
        WHERE LS.id = ? ' . $whereUser . ' AND P.active = 1 AND LS.active = 1 AND L.active = 1
        GROUP BY L.id ' . $groupByUser . ';';

        $recs = DB::select($sql, $params);

        return $recs;
    }
}
