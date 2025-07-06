<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\LessonSet;
use App\Models\Enrollment;
use App\Helpers\OmniHelper;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function all(Request $request)
    {
        $user = $request->user();
        $courses = Course::where(['active' => 1])->get();
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

    public function courses(Request $request)
    {
        return Course::where(['active' => 1])->get();
    }

    public function chapters(Request $request, $id)
    {
        $user = $request->user();
        $course = Course::find($id);
        return $course->getMyChapters();
    }

    public function editCourse(Request $request, $id)
    {
        $course = Course::find($id);
        if ($course === null) {
            $course = new Course();
            $course->name = '';   
            $course->description = '';   
            $chapters = [];
        } else {
            $chapters = $course->getMyChapters(false);
        }
        return Inertia::render('Courses/Edit', ['origCourse' => $course, 'origChapters' => $chapters]);
    }

    public function saveCourse(Request $request)
    {
        $data = $request->all();
        $c = $data['course'];
        if (empty($c['id'])) {
            $course = new Course();
        } else {
            $course = Course::find($c['id']);
        }
        $course->name = $c['name'];
        $course->description = empty($c['description']) ? '' : $c['description'];
        $course->active = !empty($c['active']) ? 1 : 0;
        $course->save();
        $chapters = $data['chapters'];
        $deletedChapters = $data['deletedChapters'];
        foreach ($chapters as $a) {
            if (empty($a['id'])) {
                $chapter = new LessonSet();
            } else {
                if (empty($c['changed'])) {
                    continue;
                }
                $chapter = LessonSet::find($a['id']);
            }
            $chapter->course_id = $a['course_id'];
            $chapter->sequence_id = $a['sequence_id'];
            $chapter->name = $a['name'];
            $chapter->active = $a['active'];
            $chapter->save();
        }
        foreach ($deletedChapters as $idx) {
            $chapter = LessonSet::find($idx);
            $chapter->delete();
        }
        // OmniHelper::log(__DIR__);
        $dataDir = implode(DIRECTORY_SEPARATOR, [__DIR__, '..', '..', '..', 'storage', 'app', 'public', $course->id]);
        // OmniHelper::log($dataDir);
        if (!file_exists($dataDir)) {
            mkdir($dataDir);
            mkdir($dataDir . DIRECTORY_SEPARATOR . 'pdf');
        }
        return redirect()->route(
            'course.edit', ['id' => $course->id]
        );
    }
}
