<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;

class StudentGroup extends Model
{
    protected $fillable = [
        'id',
        'name',
        'owner_id',
        'course_id',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function saveUsers($arr)
    {
        // OmniHelper::log($arr);
        $vals = [];
        foreach($arr as $student) {
            $vals[] = "({$this->id}, {$student['id']})";
        }
        $valuesClause = implode(",", $vals);
        $sql = "DELETE FROM student_group_user WHERE student_group_id = ?";
        OmniHelper::log($sql);
        DB::delete($sql, [$this->id]);
        if (!empty($arr)) {
            $sql = "INSERT IGNORE INTO student_group_user (student_group_id, user_id) VALUES {$valuesClause}";
            OmniHelper::log($sql);
            DB::insert($sql, []);
        }
    }
}
