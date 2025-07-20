<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonSet;
use App\Models\Problem;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Helpers\OmniHelper;

class LessonController extends Controller
{
    public function show(Request $request, $id)
    {
        $lesson = Lesson::find($id);
        $problemSet = Problem::where(['lesson_id' => $id, 'active' => 1])->get();
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
        $problems = Problem::where(['lesson_id' => $id, 'active' => 1])->get();
        $lesson = Lesson::find($id);
        $problems->shuffle();
        $answers = [];
        foreach ($problems as $p) {
            $answers[$p->id] = $p->getAnswers();
        }
        $hints = [];
        foreach ($problems as $p) {
            $hints[$p->id] = $p->getHints();
        }

        return Inertia::render('ProblemSets/ShowAlt', ['problems' => $problems, 'lesson' => $lesson, 'answers' => $answers, 'hints' => $hints]);
    }

    public function showAltProblemSet($id)
    {
        $problems = Problem::where(['lesson_id' => $id])->get();
        $lesson = Lesson::find($id);
        $answers = [];
        foreach ($problems as $p) {
            $answers[$p->id] = $p->getAnswers();
        }
        $hints = [];
        foreach ($problems as $p) {
            $hints[$p->id] = $p->getHints();
        }

        return Inertia::render('ProblemSets/ShowAltStu', ['problems' => $problems, 'lesson' => $lesson, 'answers' => $answers, 'hints' => $hints]);
    }

    public function addProblem($id)
    {
        $p = new Problem();
        $p->name = '';
        $p->lesson_id = $id;
        $p->problem_type_id = 1;
        $p->sequence_id = 10;
        $p->problem_text = '';            
        $p->display_type = 'latex';
        $courses = Course::where(['active' => 1])->get(); 
        $lesson = Lesson::find($id);
        $chapterId = $lesson->lesson_set_id;
        $chapter = LessonSet::find($chapterId);
        $courseId = $chapter->course_id;
        return Inertia::render('Problems/Edit', ['origProblem' => $p, 'origAnswers' => [], 'origHints' => [], 'courses' => $courses, 'origCourseId' => $courseId, 'origChapterId' => $chapterId, 'origLessonId' => $id]);
    }

    public function editLesson($id)
    {
        $lesson = Lesson::find($id);
        if ($lesson === null) {
            $lesson = new Lesson();
            $lesson->name = '';
        }

        return Inertia::render('Lessons/Edit', ['origLesson' => $lesson]);
    }

    public function saveLesson(Request $request)
    {
        $data = $request->all();
        $c = $data['lesson'];
        if (empty($c['id'])) {
            $lesson = new lesson();
        } else {
            $lesson = Lesson::find($c['id']);
        }
        if (!empty($c['lesson_page'])) {
            $f = $c['lesson_page'];
        }
        $lesson->name = $c['name'];
        $lesson->lesson_set_id = $c['lesson_set_id'];
        $lesson->lesson_text = $c['lesson_text'];
        $lesson->lesson_type = $c['lesson_type'];
        $lesson->sequence_id = $c['sequence_id'];
        $lesson->active = !empty($c['active']) ? 1 : 0;
        $lesson->save();
        OmniHelper::log($f);
        OmniHelper::log($data);
        OmniHelper::log($lesson);

        return redirect()->route(
            'lesson.edit', ['id' => $lesson->id]
        );
    }
}
