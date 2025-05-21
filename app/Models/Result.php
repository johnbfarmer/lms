<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Result extends Model
{
    protected $fillable = [
        'user_id',
        'answer_id',
        'problem_id',
    ];

    public static function insert($userId, $problemId, $answers)
    {
        $sql = 'DELETE FROM results WHERE user_id = ? AND problem_id = ?';
        DB::delete($sql, [$userId, $problemId]);

        foreach ($answers as $answerId) {
            $sql = 'INSERT INTO results (user_id, problem_id, answer_id) VALUES (?, ?, ?)';
            DB::insert($sql, [$userId, $problemId, $answerId]);
        }
    }

    public static function insertOpenAnswer($userId, $problemId, $answers)
    {
        $sql = 'DELETE FROM results WHERE user_id = ? AND problem_id = ?';
        DB::delete($sql, [$userId, $problemId]);

        $sql = 'INSERT INTO results (user_id, problem_id, open_answer_result) VALUES (?, ?, ?)';
        DB::insert($sql, [$userId, $problemId, $answers]);
    }
}
