<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Nes extends Model
{
    use SoftDeletes;
    protected $table = 'nes';
    protected $guarded = [];
    protected $dates = ['deleted_at'];
    public static $size = 8;


}