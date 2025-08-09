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
        switch ($prob->problem_type_id) {
            case 1:
            case 2:
                Result::insert($userId, $prob->id, $data['answers'], $data['score']);
                break;
            case 3:
                Result::insertOpenAnswerAlpha($userId, $prob->id, $data['answers'], $data['score']);
                break;
            case 4:
                Result::insertOpenAnswerNumeric($userId, $prob->id, $data['answers'], $data['score']);
                break;
            default:
                throw new \Exception('Undefined Problem Type Id');
        }
        ProblemScore::insert($userId, $prob->id, $data['score']);
    }

    public function reset(Request $request, $lessonId)
    {
        Result::reset($request->user()->id, $lessonId);

        return redirect()->route(
            'problemset.altshowset', ['id' => $lessonId]
        );
    }
}
