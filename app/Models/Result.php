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

    public static function insert($userId, $problemId, $answers, $score)
    {
        $sql = 'DELETE FROM results WHERE user_id = ? AND problem_id = ?';
        DB::delete($sql, [$userId, $problemId]);

        foreach ($answers as $answerId) {
            $sql = 'INSERT INTO results (user_id, problem_id, answer_id, score) VALUES (?, ?, ?, ?)';
            DB::insert($sql, [$userId, $problemId, $answerId, $score]);
        }
    }

    public static function insertOpenAnswerNumeric($userId, $problemId, $answers, $score)
    {
        $sql = 'DELETE FROM results WHERE user_id = ? AND problem_id = ?';
        DB::delete($sql, [$userId, $problemId]);

        $sql = 'INSERT INTO results (user_id, problem_id, open_answer_numeric, score) VALUES (?, ?, ?, ?)';
        DB::insert($sql, [$userId, $problemId, $answers, $score]);
    }

    public static function insertOpenAnswerAlpha($userId, $problemId, $answers, $score)
    {
        $sql = 'DELETE FROM results WHERE user_id = ? AND problem_id = ?';
        DB::delete($sql, [$userId, $problemId]);

        $sql = 'INSERT INTO results (user_id, problem_id, open_answer_alpha, score) VALUES (?, ?, ?, ?)';
        DB::insert($sql, [$userId, $problemId, $answers, $score]);
    }

    public static function reset($userId, $lessonId)
    {
        $sql = '
        DELETE S FROM problem_scores S
        INNER JOIN problems P ON P.id = S.problem_id
        WHERE user_id = ? AND lesson_id = ?';

        DB::delete($sql, [$userId, $lessonId]);
    }
}
