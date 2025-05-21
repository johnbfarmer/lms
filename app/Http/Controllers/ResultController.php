<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Problem;
use App\Models\ProblemScore;
use Illuminate\Http\Request;
use App\Helpers\OmniHelper;

class ResultController extends Controller
{
    public function recordAnswer(Request $request)
    {
        $data = $request->all();
        $userId = $request->user()->id;
        $prob = Problem::find($data['id']);
        if (!$prob) {
            return;
        }
        $prob->ensureUserInCourse($userId);
        if (in_array($prob->problem_type_id, [1,2])) {
            Result::insert($userId, $prob->id, $data['answers']);
        } else {
            Result::insertOpenAnswer($userId, $prob->id, $data['answers']);
        }
        ProblemScore::insert($userId, $prob->id, $data['score']);
    }
}
