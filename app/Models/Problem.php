<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;

class Problem extends Model
{
    protected $fillable = [
        'name',
        'lesson_id',
        'problem_type_id',
        'sequence_id',
        'problem_text',
        'display_type',
        'active',
    ];

    public function getAnswers()
    {
        if (in_array($this->problem_type_id,[1,2])) {
            $sql = '
            SELECT * FROM answer_sets
            WHERE problem_id = ? and active = 1';
        } else {
            $sql = '
            SELECT id, TRIM(TRAILING "0" FROM answer) AS answer_text, 1 as is_correct, pct_tolerance, problem_id FROM open_answers_numeric
            WHERE problem_id = ?';
        }
        $rec = DB::select($sql, [$this->id]);
        if (empty($rec)) {
            return [];
        }

        return $rec;
    }

    public function deleteAnswers()
    {
        $sql = '
        DELETE FROM answer_sets
        WHERE problem_id = ?';
        $rec = DB::delete($sql, [$this->id]);
    }

    public function getHints()
    {
        $sql = '
        SELECT * FROM problem_hints
        WHERE problem_id = ?
        ORDER BY sequence_id, id';
        $rec = DB::select($sql, [$this->id]);
        if (empty($rec)) {
            return [];
        }

        return $rec;
    }

    public function deleteHints()
    {
        $sql = '
        DELETE FROM problem_hints
        WHERE problem_id = ?';
        $rec = DB::delete($sql, [$this->id]);
    }

    public function getUserScore($userId)
    {
        $sql = '
        SELECT * FROM problem_scores
        WHERE problem_id = ? AND user_id = ?';
        $rec = DB::select($sql, [$this->id, $userId]);
        if (empty($rec)) {
            return null;
        }

        return (float)$rec[0]->score;
    }

    public function getLessonTitle()
    {
        $sql = '
        SELECT L.name FROM problems P
        INNER JOIN lessons L ON P.lesson_id = L.id
        WHERE P.id = ?';
        $rec = DB::select($sql, [$this->id]);
        if (empty($rec)) {
            return null;
        }

        return $rec[0]->name;
    }

    public function getNextProblemId()
    {
        $sql = 'SELECT id FROM problems WHERE (sequence_id > ? OR id > ?) AND lesson_id = ? and active = 1 ORDER BY id';
        $rec = DB::select($sql, [$this->sequence_id, $this->id, $this->lesson_id]);
        if (empty($rec)) {
            return null;
        }

        return $rec[0]->id;
    }

    public function getNeighboringProblemIds($userId)
    {
        $sql = '
        SELECT P.id 
        FROM problems P
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = ?
        WHERE S.id IS NULL
            AND (sequence_id > ? OR sequence_id = ? AND P.id > ?) 
            AND lesson_id = ? and active = 1
        ORDER BY sequence_id, id
        ';
        $rec = DB::select($sql, [$userId, $this->sequence_id, $this->sequence_id, $this->id, $this->lesson_id]);
        $nextProblemId = empty($rec) ? null :  $rec[0]->id;

        if (!$nextProblemId) {
            $nextProblemId = $this->getFirstProblemId($userId);
        }
        $sql = '
        SELECT P.id
        FROM problems P
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = ?
        WHERE S.id IS NULL
            AND  (sequence_id < ? OR sequence_id = ? AND P.id < ?)
            AND lesson_id = ? and active = 1
        ORDER BY sequence_id desc, id desc';
        $rec = DB::select($sql, [$userId, $this->sequence_id, $this->sequence_id, $this->id, $this->lesson_id]);
        $previousProblemId = empty($rec) ? null : $rec[0]->id;

        if (!$previousProblemId) {
            $previousProblemId = $this->getLastProblemId($userId);
        }

        return ['anterior' => $previousProblemId, 'siguiente' => $nextProblemId];
    }

    public function getFirstProblemId($userId)
    {
        $sql = '
        SELECT P.id 
        FROM problems P
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = ?
        WHERE S.id IS NULL
            AND lesson_id = ? and active = 1
        ORDER BY sequence_id, id
        ';
        $rec = DB::select($sql, [$userId, $this->lesson_id]);
        return empty($rec) ? null :  $rec[0]->id;
    }

    public function getLastProblemId($userId)
    {
        $sql = '
        SELECT P.id 
        FROM problems P
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = ?
        WHERE S.id IS NULL
            AND lesson_id = ? and active = 1
        ORDER BY sequence_id DESC, id DESC
        ';
        $rec = DB::select($sql, [$userId, $this->lesson_id]);
        return empty($rec) ? null :  $rec[0]->id;
    }

    public function ensureUserInCourse($userId)
    {
        $missingEnrollment = false;

        $sql = '
        SELECT C.id as course_id FROM problems P
        INNER JOIN lessons L ON P.lesson_id = L.id
        INNER JOIN lesson_sets LS ON L.lesson_set_id = LS.id
        INNER JOIN courses C ON LS.course_id = C.id
        WHERE P.id = ?';
        $rec = DB::select($sql, [$this->id]);
        $courseId = $rec[0]->course_id;

        $sql = '
        SELECT count(*) as ct FROM enrollments
        WHERE course_id = ? AND user_id = ?';
        $rec = DB::select($sql, [$courseId, $userId]);

        if (empty($rec) || $rec[0]->ct < 1) {
            Enrollment::enroll($userId, $courseId);
        }
    }

    public function saveOpenAnswer($ans)
    {
        $sql = '
        INSERT INTO open_answers_numeric
        (problem_id, answer)
        VALUES 
        (?, ?)
        ON DUPLICATE KEY UPDATE
        answer = VALUES(answer)
        ;';

        DB::insert($sql, [$this->id, $ans]);
    }
}
