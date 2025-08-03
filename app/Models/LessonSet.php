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
}
