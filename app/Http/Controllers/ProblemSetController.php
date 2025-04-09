<?php

namespace App\Http\Controllers;

use App\Models\ProblemSet;
use App\Models\Problem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProblemSetController extends Controller
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
        $data = [['problemText' => '2+3', 'answers' => []]];
        return Inertia::render('ProblemSets/Show', ['reqData' => $data]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProblemSet $problemSet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProblemSet $problemSet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProblemSet $problemSet)
    {
        //
    }

    public function all()
    {
        $data = ProblemSet::all();
        return Inertia::render('ProblemSets/Index', ['reqData' => $data]);
    }

    public function showSet($id)
    {
        $problems = Problem::where(['problem_set_id' => $id])->get();

        $lessonTitle = $problems->isEmpty() ? 'No ' : $problems->first()->getLessonTitle();
        return Inertia::render('ProblemSets/Show', ['problems' => $problems, 'lessonTitle' =>$lessonTitle]);
    }
}
