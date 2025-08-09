<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\StudentGroup;
use App\Models\LessonSet;
use App\Models\Enrollment;
use App\Models\User;
use App\Helpers\OmniHelper;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse ;
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

    public function groups(Request $request, $id)
    {
        $user = $request->user();
        $course = Course::find($id);
        $groups = $course->getGroups($user->isAdmin() ? null : $user->id);

        return Inertia::render('Groups/Index', ['course' => $course, 'groups' => $groups]);
    }

    public function addGroup(Request $request, $id)
    {
        $user = $request->user();
        $course = Course::find($id);
        $students = User::allStudentsWithGroupMembership(0);
        return Inertia::render('Groups/Edit', ['course' => $course, 'group' => null, 'allStudents' => $students]);
    }

    public function groupShow(Request $request, $id)
    {
        $user = $request->user();
        $group = StudentGroup::find($id);
        $course = Course::find($group->course_id);
        $students = User::allStudentsWithGroupMembership($id);

        return Inertia::render('Groups/Edit', ['course' => $course, 'group' => $group, 'allStudents' => $students]);
    }

    public function saveGroup(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'id' => 'nullable|integer',
            'name' => 'required|string|max:255',
            'course_id' => 'required|integer',
        ]);
        if ($request->id) {
            $group = StudentGroup::find($request->id);
            $group->name = $request->name;
            $group->save();
        } else {
            $group = new StudentGroup();
            $group->name = $request->name;
            $group->course_id = $request->course_id;
            $group->owner_id = $user->id;
            $group->save();
        }

        $group->saveUsers($request->students);

        return to_route('course.groups', [$group->course_id]);
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
        $course->short_name = $c['short_name'];
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
            $chapter->course_id = $course->id;
            $chapter->sequence_id = $a['sequence_id'];
            $chapter->name = $a['name'];
            $chapter->active = $a['active'];
            $chapter->save();
        }
        foreach ($deletedChapters as $idx) {
            $chapter = LessonSet::find($idx);
            $chapter->delete();
        }
        $dataDir = implode(DIRECTORY_SEPARATOR, [__DIR__, '..', '..', '..', 'storage', 'app', 'public', $course->id]);
        if (!file_exists($dataDir)) {
            mkdir($dataDir);
            mkdir($dataDir . DIRECTORY_SEPARATOR . 'pdf');
            mkdir($dataDir . DIRECTORY_SEPARATOR . 'img');
        }
        return redirect()->route(
            'lessonset.index', ['id' => $course->id]
        );
    }

    public function uploadImage(Request $request)
    {
        $data = $request->all();
        $courseId = $data['courseId'];
        $f = $data['file'];
        $folder = $courseId;
        $path = Storage::disk('public')->putFileAs($folder, new File($f), $data['imageName']);

        // return response()->json(['success' => true, 'file' => $path]);
        return redirect()->back()->with(['data' => 'Something you want to pass to front-end',]);
    }
}
