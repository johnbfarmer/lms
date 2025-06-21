<?php

namespace App\Http\Controllers;

use App\Models\Problem;
use App\Models\ProblemHint;
use App\Models\Lesson;
use App\Models\LessonSet;
use App\Models\Course;
use App\Models\AnswerSet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Helpers\OmniHelper;

class ProblemController extends Controller
{
    public function saveProblem(Request $request)
    {
        $data = $request->all();
        $p = $data['problem'];
        if ($p['id']) {
            $problem = Problem::find($p['id']);
        } else {
            $problem = new Problem();
        }
        $problem->name = '';
        $problem->lesson_id = $p['lesson_id'];
        $problem->problem_type_id = $p['problem_type_id'];
        $problem->display_type = $p['display_type'];
        $problem->sequence_id = $p['sequence_id'];
        $problem->problem_text = $p['problem_text'];
        $problem->active = $p['active'];
        $problem->save();
        $problem->deleteAnswers();
        $answers = $data['answers'];
        foreach ($answers as $a) {
            $answer = new AnswerSet();
            $answer->problem_id = $a['problem_id'];
            $answer->display_type = $a['display_type'];
            $answer->is_correct = $a['is_correct'];
            $answer->answer_text = $a['answer_text'];
            $answer->save();
        }
        $problem->deleteHints();
        $hints = $data['hints'];
        foreach ($hints as $h) {
            $hint = new ProblemHint();
            $hint->problem_id = $h['problem_id'];
            $hint->sequence_id = $h['sequence_id'];
            $hint->hint = $h['hint'];
            $hint->save();
        }
    }

    public function show(Request $request, $id)
    {
        $prob = Problem::find($id);
        // $answers = AnswerSet::where(['problem_id' => $id])->get()->toArray();
        $answers = $prob->getAnswers();
        shuffle($answers);
        $nextProblemId = $prob->getNextProblemId();
        $lesson = Lesson::find($prob->lesson_id);
        $lessonIds = $lesson->getNeighboringLessonIds();
        $problemIds = $prob->getNeighboringProblemIds();

        return Inertia::render('Problems/Show', ['prob' => $prob, 'answers' => $answers, 'lesson' => $lesson, 'problemIds' => $problemIds, 'lessonIds' => $lessonIds]);
    }

    public function editProblem($id)
    {
        $p = Problem::find($id);
        if ($p === null) {
            $p = new Problem();
            $p->name = '';
            $p->lesson_id = 0;
            $p->problem_type_id = 1;
            $p->sequence_id = 10;
            $p->problem_text = '';            
            $p->save();
            $courseId = 0;
            $chapterId = 0;
            $lessonId = 0;
        } else {
            $lessonId = $p->lesson_id;
            $lesson = Lesson::find($lessonId);
            $chapterId = $lesson->lesson_set_id;
            $chapter = LessonSet::find($chapterId);
            $courseId = $chapter->course_id;
        }
        $answers = $p->getAnswers();
        $hints = $p->getHints();
        $courses = Course::where(['active' => 1])->get();
        return Inertia::render('Problems/Edit', ['origProblem' => $p, 'origAnswers' => $answers, 'origHints' => $hints, 'courses' => $courses, 'origCourseId' => $courseId, 'origChapterId' => $chapterId, 'origLessonId' => $lessonId]);
    }
}
