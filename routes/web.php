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
    Route::get('/courses/all', [CourseController::class, 'all'])->name('course.all');
    Route::get('/courses', [CourseController::class, 'courses'])->name('course.ajax');
    Route::get('/course/{id}/groups', [CourseController::class, 'groups'])->name('course.groups');
    Route::get('/course/{id}/group/add', [CourseController::class, 'addGroup'])->name('course.addGroup');
    Route::get('/group/{groupId}', [CourseController::class, 'groupShow'])->name('course.groupShow');
    Route::get('/enroll/{id}', [CourseController::class, 'enroll'])->name('course.enroll');
    Route::get('/enroll-action/{id}', [CourseController::class, 'enrollAction'])->name('course.enrollaction');
    Route::get('/upgrade/{id}', [CourseController::class, 'upgrade'])->name('course.upgrade');
    Route::get('/lesson-sets', [LessonSetController::class, 'all'])->name('lessonset.all');
    Route::get('/course/{id}', [LessonSetController::class, 'index'])->name('lessonset.index');
    Route::get('/chapter/{id}', [LessonSetController::class, 'showSet'])->name('lessonset.showset');
    Route::get('/lesson/{id}', [LessonController::class, 'show'])->name('lesson.show');
    Route::get('/problem-set-alt/{id}', [LessonController::class, 'showProblemSet'])->name('problemset.showset');
    Route::get('/problem-set/{id}', [LessonController::class, 'showAltProblemSet'])->name('problemset.altshowset');
    Route::get('/problem/{id}', [ProblemController::class, 'show'])->name('problem.show');
    Route::get('/problem/{id}/edit', [ProblemController::class, 'editProblem'])->name('problem.edit');
    Route::get('/chapter/{id}/edit', [LessonSetController::class, 'editChapter'])->name('chapter.edit');
    Route::get('/course/{id}/edit', [CourseController::class, 'editCourse'])->name('course.edit');
    Route::get('/lesson/{id}/edit', [LessonController::class, 'editLesson'])->name('lesson.edit');
    Route::get('/lesson/{id}/add-problem', [LessonController::class, 'addProblem'])->name('lesson.addProblem');
    Route::post('/problem/save', [ProblemController::class, 'saveProblem'])->name('problem.save');
    Route::get('/problem/{id}/duplicate', [ProblemController::class, 'duplicateProblem'])->name('problem.duplicate');
    Route::post('/course/save', [CourseController::class, 'saveCourse'])->name('course.save');
    Route::post('/group/save', [CourseController::class, 'saveGroup'])->name('group.save');
    Route::get('/problems', [ProblemController::class, 'home'])->name('problem.home');
    Route::get('/course/{id}/chapters', [CourseController::class, 'chapters'])->name('course.chapters');
    Route::get('/chapter/{id}/lessons', [LessonSetController::class, 'lessons'])->name('chapter.lessons');
    Route::get('/record-answer', [ResultController::class, 'recordAnswer'])->name('results.recordanswer');
});

require __DIR__.'/auth.php';
