<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;

class ProblemSet extends Model
{
    protected $fillable = [
        'name',
        'lesson_id',
    ];

    function getProblemCount()
    {
        $sql = '
        SELECT count(*) AS ct FROM lms.problems
        WHERE problem_set_id = ?';

        $rec = DB::select($sql, [$this->id]);
        if (empty($rec)) {
            return null;
        }

        return $rec[0]->ct;
    }
}
