<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Problem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Helpers\OmniHelper;

class LessonController extends Controller
{
    public function show(Request $request, $id)
    {
        $lesson = Lesson::find($id);
        $problemSet = Problem::where(['lesson_id' => $id])->get();
        if (!$problemSet || $problemSet->count() < 1) {
            $problemSet = null;
        }
        $pageAssets = [];
        if ($lesson->lesson_type === 'pdf') {
            $pageAssets = ['pdf' => $lesson->lesson_page];
        }

        $lessonIds = $lesson->getNeighboringLessonIds();

        return Inertia::render('Lessons/Show', ['lesson' => $lesson, 'lessonIds' => $lessonIds, 'problemSet' => $problemSet, 'pageAssets' => $pageAssets]);
    }

    public function showProblemSet($id)
    {
        $problems = Problem::where(['lesson_id' => $id])->get();
        $lesson = Lesson::find($id);
        return Inertia::render('ProblemSets/Show', ['problems' => $problems, 'lesson' =>$lesson]);
    }
}
