<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Course extends Model
{
    public function getMyChapters()
    {
        $sql = 'SELECT * FROM lesson_sets where course_id = ?';
        $recs = DB::select($sql, [$this->id]);
        return $recs;
    }
}
