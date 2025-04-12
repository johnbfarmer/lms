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
        $chapters = LessonSet::where(['course_id' => $id])->get();
        $course = Course::find($id);
        $user = $request->user();
        $myProgress = $user->getCourseLessonSetProgress($id);
        return Inertia::render('LessonSets/Index', ['lessonSets' => $chapters, 'course' => $course, 'progress' => $myProgress]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LessonSet $lessonSet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LessonSet $lessonSet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LessonSet $lessonSet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LessonSet $lessonSet)
    {
        //
    }

    public function all()
    {
        $data = LessonSet::all();
        return Inertia::render('LessonSets/Index', ['reqData' => $data]);
    }

    public function showSet(Request $request, $id)
    {
        $data = Lesson::where(['lesson_set_id' => $id])->get();
OmniHelper::log($data);
        $lessonSet = LessonSet::find($id);
        $user = $request->user();
        // $myProgress = $user->getCourseProgress($lessonSet->course_id);
        $myProgress = [
            'is_premium' => 0,
            'pct_done' => 23,
        ];
OmniHelper::log($myProgress);
        return Inertia::render('LessonSets/Show', ['lessons' => $data, 'lessonSet' => $lessonSet, 'progress' => $myProgress]);
    }
}
