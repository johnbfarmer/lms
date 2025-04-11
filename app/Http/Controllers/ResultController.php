<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Problem;
use Illuminate\Http\Request;
use App\Helpers\OmniHelper;

class ResultController extends Controller
{
    public function recordAnswer(Request $request)
    {
        // $problemId, $answerId
        $data = $request->all();
        $userId = $request->user()->id;
        $prob = Problem::find($data['id']);
        $prob->ensureUserInCourse($userId);
        Result::insert($userId, $prob->id, $data['answers']);
    }
}
