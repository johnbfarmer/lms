<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;

class Problem extends Model
{
    protected $fillable = [
        'name',
        'problem_set_id',
        'problem_type_id',
        'sequence_id',
        'problem_text',
        'lesson_id',
    ];

    function getLessonTitle()
    {
        $sql = '
        SELECT L.name FROM lms.problems P
        INNER JOIN lms.problem_sets PS ON P.problem_set_id = PS.id
        INNER JOIN lms.lessons L ON PS.lesson_id = L.id
        WHERE P.id = ?';
        $rec = DB::select($sql, [$this->id]);
        if (empty($rec)) {
            return null;
        }

        return $rec[0]->name;
    }

    function getNextProblemId()
    {
        $sql = 'SELECT id FROM problems WHERE (sequence_id > ? OR id > ?) AND problem_set_id = ? ORDER BY id';
        $rec = DB::select($sql, [$this->sequence_id, $this->id, $this->problem_set_id]);
        if (empty($rec)) {
            return null;
        }

        return $rec[0]->id;
    }

    function getNextLessonId()
    {
        $sql = '
        SELECT L2.id 
        FROM lms.problems P 
        INNER JOIN lms.problem_sets PS ON P.problem_set_id = PS.id
        INNER JOIN lms.lessons L ON PS.lesson_id = L.id
        INNER JOIN lms.lessons L2 ON L2.lesson_set_id = L.lesson_set_id 
        AND (L2.sequence_id > L.sequence_id OR L2.id > L.id )
        WHERE P.id = ?';
        $rec = DB::select($sql, [$this->id]);
        if (empty($rec)) {
            return null;
        }

        return $rec[0]->id;
    }

    function ensureUserInCourse($userId)
    {
        $missingEnrollment = false;

        $sql = '
        SELECT C.id as course_id FROM lms.problems P
        INNER JOIN lms.problem_sets PS ON P.problem_set_id = PS.id
        INNER JOIN lms.lessons L ON PS.lesson_id = L.id
        INNER JOIN lms.lesson_sets LS ON L.lesson_set_id = LS.id
        INNER JOIN lms.courses C ON LS.course_id = C.id
        WHERE P.id = ?';
        $rec = DB::select($sql, [$this->id]);
        $courseId = $rec[0]->course_id;

        $sql = '
        SELECT count(*) as ct FROM lms.enrollments
        WHERE course_id = ? AND user_id = ?';
        $rec = DB::select($sql, [$courseId, $userId]);

        if (empty($rec) || $rec[0]->ct < 1) {
            Enrollment::enroll($userId, $courseId);
        }
    }
}
