<?php

namespace App\Models;

use App\Services\OtherService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Branch extends Model
{
    protected $table = 'branch';

    public static function addBranchMore($id, $aBranch)
    {
        // 先删除之前的
        self::where('s_id', '=', $id)->delete();
        $aInfo = [];
        $aBranchAll = OtherService::$aBranch;
        foreach ($aBranch as $key => $b_id){
            $aInfo[$key]['s_id'] = $id;
            $aInfo[$key]['b_id'] = $b_id;
            $aInfo[$key]['b_name'] = $aBranchAll[$b_id];
            $aInfo[$key]['created_at'] = date('Y-m-d H:i:s');
            $aInfo[$key]['updated_at'] = date('Y-m-d H:i:s');
        }
        return self::insert($aInfo);
    }

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