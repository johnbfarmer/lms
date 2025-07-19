<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;

class Course extends Model
{
    protected $fillable = [
        'name',
        'description',
        'active',
    ];

    public function getMyChapters($activeOnly = true)
    {
        $activeClause = $activeOnly ? 'and active = 1' : '';
        $sql = 'SELECT * FROM lesson_sets where course_id = ? ' . $activeClause;
        $recs = DB::select($sql, [$this->id]);
        return $recs;
    }

    public function getGroups($userId = null)
    {
        $userFilter = $userId ? ' AND owner_id = ? ' : '';
        $args = [$this->id];
        if ($userId) {
            $args[] = $userId;
        }
        $sql = '
        SELECT * FROM student_groups G
        LEFT JOIN student_group_user U ON U.student_group_id = G.id
        WHERE G.course_id = ? ' . $userFilter .'
        ORDER BY name desc
        ';

        $recs = DB::select($sql, $args);

        return $recs;
    }
}
