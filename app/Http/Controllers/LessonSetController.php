<?php

namespace App\Http\Controllers;

use App\Models\LessonSet;
use App\Models\Lesson;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Helpers\OmniHelper;

class LessonSetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $id)
    {
        $chapters = LessonSet::where(['course_id' => $id, 'active' => 1])->orderBy('sequence_id', 'asc')->orderBy('id', 'asc')->get();
        $course = Course::find($id);
        $user = $request->user();
        $myProgress = $user->getCourseLessonSetProgress($id);
        OmniHelper::log(['lessonSets' => $chapters, 'course' => $course, 'progress' => $myProgress]);

        return Inertia::render('LessonSets/Index', ['lessonSets' => $chapters, 'course' => $course, 'progress' => $myProgress]);
    }

    public function showSet(Request $request, $id)
    {
        $lessons = Lesson::where(['lesson_set_id' => $id, 'active' => 1])->orderBy('sequence_id', 'asc')->orderBy('id', 'asc')->get();
        $lessonSet = LessonSet::find($id);
        $user = $request->user();
        $myProgress = $user->getLessonSetProgressByLesson($id);
        $chapterIds = $lessonSet->getNeighboringChapterIds();

        return Inertia::render('LessonSets/Show', ['lessons' => $lessons, 'lessonSet' => $lessonSet, 'progress' => $myProgress, 'chapterIds' => $chapterIds]);
    }

    public function lessons(Request $request, $id)
    {
        $user = $request->user();
        $chapter = LessonSet::find($id);
        return $chapter->getMyLessons();
    }
}
