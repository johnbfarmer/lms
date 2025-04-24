<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LessonSet extends Model
{
    //

    public function getNeighboringChapterIds()
    {
        $sql = 'SELECT id FROM lms.lesson_sets WHERE (sequence_id > ? OR sequence_id = ? AND id > ?) AND course_id = ? ORDER BY sequence_id, id';
        $rec = DB::select($sql, [$this->sequence_id, $this->sequence_id, $this->id, $this->course_id]);
        $nextChapterId = empty($rec) ? null :  $rec[0]->id;
        $sql = 'SELECT id FROM lms.lesson_sets WHERE (sequence_id < ? OR sequence_id = ? AND id < ?) AND course_id = ? ORDER BY sequence_id desc, id desc';
        $rec = DB::select($sql, [$this->sequence_id, $this->sequence_id, $this->id, $this->course_id]);
        $previousChapterId = empty($rec) ? null : $rec[0]->id;

        return ['previous' => $previousChapterId, 'next' => $nextChapterId];
    }
}
