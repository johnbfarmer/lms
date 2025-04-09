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

    function getNextLessonId()
    {
        $sql = 'SELECT id FROM lessons WHERE (sequence_id > ? OR id > ?) AND lesson_set_id = ? ORDER BY id';
        $rec = DB::select($sql, [$this->sequence_id, $this->id, $this->lesson_set_id]);
        if (empty($rec)) {
            return null;
        }

        return $rec[0]->id;
    }
}
