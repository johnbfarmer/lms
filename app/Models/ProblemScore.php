<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProblemScore extends Model
{
    protected $fillable = [
        'user_id',
        'score',
        'problem_id',
    ];

    public static function insert($userId, $problemId, $score)
    {
        $sql = 'DELETE FROM problem_scores WHERE user_id = ? AND problem_id = ?';
        DB::delete($sql, [$userId, $problemId]);

        $sql = 'INSERT INTO problem_scores (user_id, problem_id, score) VALUES (?, ?, ?)';
        DB::insert($sql, [$userId, $problemId, $score]);
    }
}
