<?php

namespace App\Models;

use App\Services\OtherService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Parsedown;

class AdminUser extends Model
{
    protected $table = 'admin_users';

    public static function getAdmin()
    {
        return self::where('id', '>', 0)->get();
    }
}
