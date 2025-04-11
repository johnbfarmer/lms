<?php

namespace App\Http\Controllers;

use App\Models\Problem;
use App\Models\Lesson;
use App\Models\AnswerSet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProblemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(Request $request, $id)
    {
        $prob = Problem::find($id);
        $answers = AnswerSet::where(['problem_id' => $id])->get()->toArray();
        shuffle($answers);
        $nextProblemId = $prob->getNextProblemId();
        $nextLessonId = $prob->getNextLessonId();
        $lessonTitle = $prob->getLessonTitle();

    return Inertia::render('Problems/Show', ['prob' => $prob, 'answers' => $answers, 'lessonTitle' => $lessonTitle, 'nextProblemId' => $nextProblemId, 'nextLessonId' => $nextLessonId]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Problem $problem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Problem $problem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Problem $problem)
    {
        //
    }

    public function all(Problem $problem)
    {
        
    }
}
