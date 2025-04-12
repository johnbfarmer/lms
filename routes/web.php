<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProblemSetController;
use App\Http\Controllers\ProblemController;
use App\Http\Controllers\LessonSetController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ResultController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/courses', [CourseController::class, 'all'])->name('course.all');
    Route::get('/enroll/{id}', [CourseController::class, 'enroll'])->name('course.enroll');
    Route::get('/upgrade/{id}', [CourseController::class, 'upgrade'])->name('course.upgrade');
    Route::get('/lesson-sets', [LessonSetController::class, 'all'])->name('lessonset.all');
    Route::get('/course/{id}', [LessonSetController::class, 'index'])->name('lessonset.index');
    Route::get('/lesson-set/{id}', [LessonSetController::class, 'showSet'])->name('lessonset.showset');
    Route::get('/lesson/{id}', [LessonController::class, 'show'])->name('lesson.show');
    Route::get('/problem-sets', [ProblemSetController::class, 'all'])->name('problemset.all');
    Route::get('/problem-set/{id}', [ProblemSetController::class, 'showSet'])->name('problemset.showset');
    Route::get('/problem/{id}', [ProblemController::class, 'show'])->name('problem.show');
    Route::post('/record-answer', [ResultController::class, 'recordAnswer'])->name('results.recordanswer');
});

require __DIR__.'/auth.php';
