<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Log;

class OmniHelper
{
    public static function log($msg)
    {
        if (is_array($msg)) {
            $msg = json_encode($msg);
        }

        Log::debug($msg);
    }
}
