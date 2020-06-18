<?php

namespace App\Models;

use App\Services\OtherService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use SoftDeletes;
    protected $table = 'articles';
    protected $dates = ['deleted_at'];


    public static function getBranchNameIDs($sBranch)
    {
        $aBranch = explode(',', $sBranch);
        $aBranchName = [];
        $aBranchAll = OtherService::$aBranch;
        foreach ($aBranch as $key => $val) {
            $aBranchName[$key] = $aBranchAll[$val];
        }
        return $aBranchName;
    }
}
