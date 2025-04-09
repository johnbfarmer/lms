<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function all()
    {
        $data = Course::all();
        return Inertia::render('Courses/Index', ['reqData' => $data]);
    }
}
