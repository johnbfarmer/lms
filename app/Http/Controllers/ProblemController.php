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
use App\Http\Requests\ProblemUpdateRequest;

class ProblemController extends Controller
{
    public function saveProblem(ProblemUpdateRequest $request)
    {
        $data = $request->all();
        $p = $data['problem'];
        if (empty($p['display_type'])) {
            $p['display_type'] = 'latex';
        }
        if (empty($p['active'])) {
            $p['active'] = 0;
        }
        if (!empty($p['id'])) {
            $problem = Problem::find($p['id']);
        } else {
            $problem = new Problem();
        }
        $request->validate([
            'problem.problem_text' => 'required|string',
        ],[
            'problem.problem_text.required' => 'El texto del problema no puede estar vacío',
        ]);
        $problem->name = '';
        $problem->lesson_id = $p['lesson_id'];
        $problem->problem_type_id = $p['problem_type_id'];
        $problem->display_type = $p['display_type'];
        $problem->sequence_id = $p['sequence_id'];
        $problem->problem_text = $p['problem_text'];
        $problem->active = $p['active'];
        $problem->save();
        $answers = $data['answers'];
        switch ($problem->problem_type_id) {
            case 1:
            case 2:
                $problem->deleteAnswers();
                foreach ($answers as $a) {
                    $answer = new AnswerSet();
                    $answer->problem_id = $problem->id;
                    $answer->display_type = $a['display_type'];
                    $answer->is_correct = $a['is_correct'];
                    $answer->answer_text = $a['answer_text'];
                    $answer->save();
                }
                break;
            case 3:
            case 4:
                $problem->saveOpenAnswer($answers[0]['answer_text']);
                break;
            default:
                throw new \Exception("unknown answer type in save prob");
        }
        $problem->deleteHints();
        $hints = $data['hints'];
        foreach ($hints as $h) {
            $hint = new ProblemHint();
            $hint->problem_id = $problem->id;
            $hint->sequence_id = $h['sequence_id'];
            $hint->hint = $h['hint'];
            $hint->save();
        }

        return redirect()->route(
            'problem.edit', ['id' => $problem->id]
        );
    }

    public function duplicateProblem(Request $request, $id)
    {
        $p1 = Problem::find($id);
        $p = new Problem();
        $p->name = '';
        $p->lesson_id = $p1->lesson_id;
        $p->problem_type_id = $p1->problem_type_id;
        $p->sequence_id = $p1->sequence_id;
        $p->problem_text = $p1->problem_text;
        $p->display_type = $p1->display_type;
        $answers = $p1->getAnswers();
        $hints = $p1->getHints();
        $courses = Course::where(['active' => 1])->get(); 
        $lesson = Lesson::find($p1->lesson_id);
        $chapterId = $lesson->lesson_set_id;
        $chapter = LessonSet::find($chapterId);
        $courseId = $chapter->course_id;
        return Inertia::render('Problems/Edit', ['origProblem' => $p, 'origAnswers' => $answers, 'origHints' => $hints, 'courses' => $courses, 'origCourseId' => $courseId, 'origChapterId' => $chapterId, 'origLessonId' => $id]);
    }
    
    public function show(Request $request, $id)
    {
        $prob = Problem::find($id);
        // $answers = AnswerSet::where(['problem_id' => $id])->get()->toArray();
        $answers = $prob->getAnswers();
        shuffle($answers);
        $hints = $prob->getHints();
        $nextProblemId = $prob->getNextProblemId();
        extract($this->getHierarchy($prob->lesson_id));
        $lessonIds = $lesson->getNeighboringLessonIds();
        $problemIds = $prob->getNeighboringProblemIds();
        $numCorr = 0;
        foreach($answers as $a) {
            if ($a->is_correct) {
                $numCorr++;
            }
        }
OmniHelper::log('numCorr: '.$numCorr);
        return Inertia::render('Problems/Show', ['prob' => $prob, 'answers' => $answers, 'hints' => $hints, 'lesson' => $lesson, 'problemIds' => $problemIds, 'lessonIds' => $lessonIds, 'chapter' => $chapter, 'course' => $course, 'numberCorrect' => $numCorr]);
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
            $course = null;
            $chapter = null;
            $lesson = null;
        } else {
            extract($this->getHierarchy($p->lesson_id));
            OmniHelper::log('jbf');
            OmniHelper::log($lesson);
            $lessonId = $p->lesson_id;
            $chapterId = $lesson->lesson_set_id;
            $courseId = $chapter->course_id;
        }
        $answers = $p->getAnswers();
        $hints = $p->getHints();
        $courses = Course::where(['active' => 1])->get();
        return Inertia::render('Problems/Edit', ['origProblem' => $p, 'origAnswers' => $answers, 'origHints' => $hints, 'courses' => $courses, 'origCourseId' => $courseId, 'origChapterId' => $chapterId, 'origLessonId' => $lessonId, 'lesson' => $lesson, 'chapter' => $chapter, 'course' => $course]);
    }

    public function getHierarchy($id) {
            $lesson = Lesson::find($id);
            $chapter = LessonSet::find($lesson->lesson_set_id);
            $course = Course::find($chapter->course_id);

        return [
            'lesson' => $lesson,
            'chapter' => $chapter,
            'course' => $course,
        ];
    }
}
