<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Course extends Model
{
    protected $fillable = [
        'name',
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
}
