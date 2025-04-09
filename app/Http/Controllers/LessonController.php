<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\ProblemSet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Helpers\OmniHelper;

class LessonController extends Controller
{
    public function show(Request $request, $id)
    {
        $lesson = Lesson::find($id);
        $problemSet = ProblemSet::where(['lesson_id' => $id])->first();
        if (!$problemSet || $problemSet->isEmpty() || $problemSet->getProblemCount() < 1) {
            $problemSet = null;
        }
        $pageAssets = [];
        if ($lesson->lesson_type === 'pdf') {
            $pageAssets = ['pdf' => $lesson->lesson_page];
            // return Inertia::render('Lessons/' . $lesson->lesson_page, ['lesson' => $lesson, 'problemSet' => $problemSet, 'pageAssets' => ['imageUrl' => $url]]);
        }

        return Inertia::render('Lessons/Show', ['lesson' => $lesson, 'problemSet' => $problemSet, 'pageAssets' => $pageAssets]);
    }
}
