<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProblemHint extends Model
{
     protected $fillable = [
        'problem_id',
        'sequence_id',
        'hint',
    ];
}
