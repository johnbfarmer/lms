<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $isAdmin = !empty($user) && $user->isAdmin();
        $isTeacher = !empty($user) && $user->isTeacher();
        $editMode = ($isAdmin || $isTeacher) && config('app.edit_mode');
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'edit_mode' => $editMode,
                'is_admin' => $isAdmin,
                'is_teacher' => $isTeacher,
            ],
        ];
    }
}
