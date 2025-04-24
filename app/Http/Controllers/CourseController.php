<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function all(Request $request)
    {
        $user = $request->user();
        $courses = Course::all();
        $myProgress = [];
        foreach ($courses as $course) {
            $myProgress[$course->id] = $user->getCourseProgress($course->id);
        }
        return Inertia::render('Courses/Index', ['courses' => $courses, 'myProgress' => $myProgress]);
    }

    public function enrollAction(Request $request, $id)
    {
        $user = $request->user();
        Enrollment::enroll($user->id, $id);
        return redirect()->route(
            'lessonset.index', ['id' => $id]
        );
    }

    public function enroll(Request $request, $id)
    {
        $user = $request->user();
        $course = Course::find($id);
        return Inertia::render('Courses/Enroll', ['course' => $course, 'upgrade' => false]);
    }

    public function upgrade(Request $request, $id)
    {
        $user = $request->user();
        $course = Course::find($id);
        return Inertia::render('Courses/Enroll', ['course' => $course, 'upgrade' => true]);
    }
}
