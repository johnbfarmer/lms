<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnswerSet extends Model
{
     protected $fillable = [
        'problem_id',
        'display_type',
        'is_correct',
        'answer_text',
        'active',
    ];
}
