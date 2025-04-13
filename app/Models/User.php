<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;

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
        $sql = 'SELECT * FROM lms.enrollments WHERE user_id = ? AND course_id = ?';
        $rec = DB::select($sql, [$this->id, $courseId]);
        if (empty($rec)) {
            return null;
        }
        $isPremium = $rec[0]->is_premium;

        // how many probs in course?
        $sql = '
            SELECT count(*) AS ct
            FROM lms.courses C
            INNER JOIN lms.lesson_sets LS ON C.id = LS.course_id
            INNER JOIN lms.lessons L ON LS.id = L.lesson_set_id
            INNER JOIN lms.problems P ON L.id = P.lesson_id
            WHERE C.id = ?';
        $rec = DB::select($sql, [$courseId]);
        $totalProbs = $rec[0]->ct;

        // how many probs have I done in course?
        $sql = '
            SELECT count(*) AS ct
            FROM lms.enrollments E
            INNER JOIN lms.courses C ON C.id = E.course_id
            INNER JOIN lms.lesson_sets LS ON C.id = LS.course_id
            INNER JOIN lms.lessons L ON LS.id = L.lesson_set_id
            INNER JOIN lms.problems P ON L.id = P.lesson_id
            INNER JOIN lms.problem_scores S ON P.id = S.problem_id
            WHERE E.user_id = ? and C.id = ?';
        $rec = DB::select($sql, [$this->id, $courseId]);
        $probsDone = $rec[0]->ct;
        $pctDone = !$totalProbs ? 0 : round(100*($probsDone/$totalProbs));

        return [
            'is_premium' => $isPremium,
            'pct_done' => $pctDone,
        ];
    }

    public function getCourseLessonSetProgress($courseId)
    {
        $sql = 'SELECT * FROM lms.enrollments WHERE user_id = ? AND course_id = ?';
        $rec = DB::select($sql, [$this->id, $courseId]);
        if (empty($rec)) {
            return null;
        }

        $sql = '
            SELECT T1.id, ct, IF(ISNULL(done), 0, done) as done FROM (
                SELECT count(*) as ct, LS.id
                FROM lms.courses C
                INNER JOIN lms.lesson_sets LS ON C.id = LS.course_id
                INNER JOIN lms.lessons L ON LS.id = L.lesson_set_id
                INNER JOIN lms.problems P ON L.id = P.lesson_id
                WHERE C.id = ?
                GROUP BY LS.id
            ) T1
            LEFT JOIN (
                SELECT count(*) AS done, LS.id
                FROM lms.courses C
                INNER JOIN lms.lesson_sets LS ON C.id = LS.course_id
                INNER JOIN lms.lessons L ON LS.id = L.lesson_set_id
                INNER JOIN lms.problems P ON L.id = P.lesson_id
                INNER JOIN lms.problem_scores S ON P.id = S.problem_id
                WHERE C.id = ? AND user_id = ?
                GROUP BY LS.id
            ) T2 ON T1.id = T2.id;';
        $recs = DB::select($sql, [$courseId, $courseId, $this->id]);
        $progress = [];
        OmniHelper::log($recs);
        foreach ($recs as $rec) {
            $totalProbs = $rec->ct;
            $probsDone = $rec->done;
            $progress[$rec->id] = [
                'is_premium' => 1, // will not use but want to reuse component
                'pct_done' => !$totalProbs ? 0 : round(100*($probsDone/$totalProbs)),
            ];
        }

        return $progress;
    }

    public function getLessonSetProgressByLesson($lessonSetId)
    {
        $sql = '
            SELECT T1.id, ct, IF(ISNULL(done), 0, done) as done, IF(ISNULL(score), 0, score/100) as score FROM (
                SELECT count(*) as ct, L.id
                FROM lms.courses C
                INNER JOIN lms.lesson_sets LS ON C.id = LS.course_id
                INNER JOIN lms.lessons L ON LS.id = L.lesson_set_id
                INNER JOIN lms.problems P ON L.id = P.lesson_id
                WHERE LS.id = ?
                GROUP BY L.id
            ) T1
            LEFT JOIN (
                SELECT count(*) AS done, sum(S.score) as score, L.id
                FROM lms.courses C
                INNER JOIN lms.lesson_sets LS ON C.id = LS.course_id
                INNER JOIN lms.lessons L ON LS.id = L.lesson_set_id
                INNER JOIN lms.problems P ON L.id = P.lesson_id
                INNER JOIN lms.problem_scores S ON P.id = S.problem_id
                WHERE LS.id = ? AND user_id = ?
                GROUP BY L.id
            ) T2 ON T1.id = T2.id;';
        $recs = DB::select($sql, [$lessonSetId, $lessonSetId, $this->id]);
        $progress = [];
        OmniHelper::log($recs);
        foreach ($recs as $rec) {
            $totalProbs = $rec->ct;
            $probsDone = $rec->done;
            $score = round($rec->score, 2);
            $progress[$rec->id] = [
                'total' => $totalProbs,
                'right' => $score,
                // 'pct' => !$totalProbs ? 0 : round(100*($probsDone/$totalProbs)),
                'pct' => !$totalProbs ? 0 : round(100*($score/$totalProbs)),
            ];
        }

        return $progress;
    }
}
