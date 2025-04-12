<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Lesson extends Model
{
    protected $fillable = [
        'lesson_type',
        'lesson_text',
        'lesson_page',
        'lesson_set_id',
        'sequence_id',
    ];

    function getNeighboringLessonIds()
    {
        $sql = 'SELECT id FROM lms.lessons WHERE (sequence_id > ? OR sequence_id = ? AND id > ?) AND lesson_set_id = ? ORDER BY sequence_id, id';
        $rec = DB::select($sql, [$this->sequence_id, $this->sequence_id, $this->id, $this->lesson_set_id]);
        $nextLessonId = empty($rec) ? null :  $rec[0]->id;
        $sql = 'SELECT id FROM lms.lessons WHERE (sequence_id < ? OR sequence_id = ? AND id < ?) AND lesson_set_id = ? ORDER BY sequence_id desc, id desc';
        $rec = DB::select($sql, [$this->sequence_id, $this->sequence_id, $this->id, $this->lesson_set_id]);
        $previousLessonId = empty($rec) ? null : $rec[0]->id;

        return ['previous' => $previousLessonId, 'next' => $nextLessonId];
    }
}
