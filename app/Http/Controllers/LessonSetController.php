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

        return Inertia::render('LessonSets/Index', ['lessonSets' => $chapters, 'course' => $course, 'progress' => $myProgress]);
    }

    public function showSet(Request $request, $id)
    {
        $lessons = Lesson::where(['lesson_set_id' => $id, 'active' => 1])->orderBy('sequence_id', 'asc')->orderBy('id', 'asc')->get();
        extract($this->getHierarchy($id));
        $user = $request->user();
        $myProgress = $user->getLessonSetProgressByLesson($id);
        $chapterIds = $chapter->getNeighboringChapterIds();

        return Inertia::render('LessonSets/Show', ['lessons' => $lessons, 'chapter' => $chapter, 'course' => $course, 'progress' => $myProgress, 'chapterIds' => $chapterIds]);
    }

    public function editChapter(Request $request, $id)
    {
        extract($this->getHierarchy($id));
        if ($chapter === null) {
            $chapter = new LessonSet();
            $chapter->name = '';   
            $chapter->description = '';   
            $lessons = [];
        } else {
            $lessons = $chapter->getMyLessons(false);
        }

        return Inertia::render('LessonSets/Edit', ['origLessons' => $lessons, 'origChapter' => $chapter, 'course' => $course]);
    }

    public function saveChapter(Request $request)
    {
        $data = $request->all();
        $c = $data['chapter'];
        if (empty($c['id'])) {
            $chapter = new LessonSet();
        } else {
            $chapter = LessonSet::find($c['id']);
        }
        $chapter->name = $c['name'];
        $chapter->course_id = $c['course_id'];
        $chapter->sequence_id = $c['sequence_id'];
        $chapter->active = !empty($c['active']) ? 1 : 0;
        $chapter->save();
        $lessons = $data['lessons'];
        $deletedLessons = $data['deletedLessons'];
        foreach ($lessons as $a) {
            if (empty($a['id'])) {
                $lesson = new Lesson();
            } else {
                if (empty($c['changed'])) {
                    continue;
                }
                $lesson = Lesson::find($a['id']);
            }
            $lesson->lesson_set_id = $a['lesson_set_id'];
            $lesson->sequence_id = $a['sequence_id'];
            $lesson->name = $a['name'];
            $lesson->active = $a['active'];
            $lesson->lesson_text = '';
            $lesson->lesson_page = '';
            OmniHelper::log($lesson);
            $lesson->save();
        }
        foreach ($deletedLessons as $idx) {
            $lesson = Lesson::find($idx);
            $lesson->delete();
        }

        return redirect()->route(
            'chapter.edit', ['id' => $chapter->id]
        );
    }

    public function lessons(Request $request, $id)
    {
        $user = $request->user();
        $chapter = LessonSet::find($id);
        return $chapter->getMyLessons();
    }

    public function getHierarchy($id) {
            $chapter = LessonSet::find($id);
            $course = Course::find($chapter->course_id);

        return [
            'chapter' => $chapter,
            'course' => $course,
        ];
    }
}
