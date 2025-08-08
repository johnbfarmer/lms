<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function isAdmin()
    {
        foreach ($this->roles() ->get() as $role) {
            if ($role->role === 'admin') {
                return true;
            }
        }

        return false;
    }

    public function isTeacher()
    {
        foreach ($this->roles() ->get() as $role) {
            if ($role->role === 'teacher') {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getCourseProgress($courseId)
    {
        // $sql = 'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?';
        // $rec = DB::select($sql, [$this->id, $courseId]);
        // if (empty($rec)) {
        //     return null;
        // }
        // $isPremium = $rec[0]->is_premium;

        $sql = '
            SELECT T1.id, ct, IF(ISNULL(done), 0, done) as done, IF(ISNULL(userScore), 0, userScore) as userScore FROM (
                SELECT count(*) as ct, C.id
                FROM courses C
                INNER JOIN lesson_sets LS ON C.id = LS.course_id
                INNER JOIN lessons L ON LS.id = L.lesson_set_id
                INNER JOIN problems P ON L.id = P.lesson_id
                WHERE C.id = ? AND P.active = 1 AND LS.active = 1 AND L.active = 1
                GROUP BY C.id
            ) T1
            LEFT JOIN (
                SELECT count(*) AS done, sum(score) as userScore, C.id
                FROM courses C
                INNER JOIN lesson_sets LS ON C.id = LS.course_id
                INNER JOIN lessons L ON LS.id = L.lesson_set_id
                INNER JOIN problems P ON L.id = P.lesson_id
                INNER JOIN problem_scores S ON P.id = S.problem_id
                WHERE C.id = ? AND user_id = ? AND P.active = 1 AND LS.active = 1 AND L.active = 1
                GROUP BY C.id
            ) T2 ON T1.id = T2.id;';
        $recs = DB::select($sql, [$courseId, $courseId, $this->id]);
        if (empty($recs)) {
            return [];
        }
        $rec = $recs[0];
        $totalProbs = $rec->ct;
        $probsDone = $rec->done;
        $userScore = $rec->userScore;
        $progress = [
            'total' => $totalProbs,
            'pct_done' => !$totalProbs ? 0 : round(100*($probsDone/$totalProbs)),
            'score' => !$probsDone ? 0 : round(1*($userScore/$probsDone)),
        ];

        return $progress;
    }

    public function getCourseLessonSetProgress($courseId)
    {
        $sql = 'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?';
        $rec = DB::select($sql, [$this->id, $courseId]);
        if (empty($rec)) {
            return null;
        }

        $sql = '
            SELECT T1.id, ct, IF(ISNULL(done), 0, done) as done, IF(ISNULL(userScore), 0, userScore) as userScore FROM (
                SELECT count(*) as ct, LS.id
                FROM courses C
                INNER JOIN lesson_sets LS ON C.id = LS.course_id
                INNER JOIN lessons L ON LS.id = L.lesson_set_id
                INNER JOIN problems P ON L.id = P.lesson_id
                WHERE C.id = ? AND P.active = 1 AND LS.active = 1 AND L.active = 1
                GROUP BY LS.id
            ) T1
            LEFT JOIN (
                SELECT count(*) AS done, sum(score) as userScore, LS.id
                FROM courses C
                INNER JOIN lesson_sets LS ON C.id = LS.course_id
                INNER JOIN lessons L ON LS.id = L.lesson_set_id
                INNER JOIN problems P ON L.id = P.lesson_id
                INNER JOIN problem_scores S ON P.id = S.problem_id
                WHERE C.id = ? AND user_id = ? AND P.active = 1 AND LS.active = 1 AND L.active = 1
                GROUP BY LS.id
            ) T2 ON T1.id = T2.id;';
        $recs = DB::select($sql, [$courseId, $courseId, $this->id]);
        // if (empty($recs)) {
        //     return [];
        // }
        $progress = [];
        foreach ($recs as $rec) {
            $totalProbs = $rec->ct;
            $probsDone = $rec->done;
            $userScore = $rec->userScore;
            $progress[$rec->id] = [
                'total' => $totalProbs,
                'pct_done' => !$totalProbs ? 0 : round(100*($probsDone/$totalProbs)),
                'score' => !$probsDone ? 0 : round(1*($userScore/$probsDone)),
            ];
        }

        return $progress;
    }

    public function getLessonSetProgressByLesson($lessonSetId)
    {
        $sql = '
            SELECT T1.id, ct, IF(ISNULL(done), 0, done) as done, IF(ISNULL(userScore), 0, userScore) as userScore FROM (
                SELECT count(*) as ct, L.id
                FROM courses C
                INNER JOIN lesson_sets LS ON C.id = LS.course_id
                INNER JOIN lessons L ON LS.id = L.lesson_set_id
                INNER JOIN problems P ON L.id = P.lesson_id
                WHERE LS.id = ? AND P.active = 1 AND LS.active = 1 AND L.active = 1
                GROUP BY L.id
            ) T1
            LEFT JOIN (
                SELECT count(*) AS done, sum(S.score) as userScore, L.id
                FROM courses C
                INNER JOIN lesson_sets LS ON C.id = LS.course_id
                INNER JOIN lessons L ON LS.id = L.lesson_set_id
                INNER JOIN problems P ON L.id = P.lesson_id
                INNER JOIN problem_scores S ON P.id = S.problem_id
                WHERE LS.id = ? AND user_id = ? AND P.active = 1 AND LS.active = 1 AND L.active = 1
                GROUP BY L.id
            ) T2 ON T1.id = T2.id;';
        $recs = DB::select($sql, [$lessonSetId, $lessonSetId, $this->id]);
        $progress = [];
        // if (empty($recs)) {
        //     return [];
        // }
        foreach ($recs as $rec) {
            $totalProbs = $rec->ct;
            $probsDone = $rec->done;
            $userScore = $rec->userScore;
            $progress[$rec->id] = [
                'total' => $totalProbs,
                'pct_done' => !$totalProbs ? 0 : round(100*($probsDone/$totalProbs)),
                'score' => !$probsDone ? 0 : round(1*($userScore/$probsDone)),
            ];
        }

        return $progress;
    }

    public static function allStudentsWithGroupMembership($groupId)
    {
        $sql = '
        SELECT S.*, IFNULL(SGU.user_id, 0) AS is_member
        FROM users S
        LEFT JOIN role_user RU ON RU.user_id = S.id
        LEFT JOIN roles R ON R.id = RU.role_id
        LEFT JOIN student_group_user SGU ON SGU.user_id = S.id AND student_group_id = ?
        WHERE role = "student" OR ISNULL(role)
        ';
        $recs = DB::select($sql, [$groupId]);

        return $recs;
    }
}
