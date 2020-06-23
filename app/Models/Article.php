<?php

namespace App\Models;

use App\Services\OtherService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Parsedown;

class Article extends Model
{
    use SoftDeletes;

    protected $table = 'articles';
    protected $dates = ['deleted_at'];

    public function adminUser()
    {
        return $this->hasOne('App\Models\AdminUser','userid','id');
    }

    protected function getArticle()
    {
        return $this->orderBy('id','desc')->simplePaginate(15);
    }

    protected function getArticleId($id)
    {
        $aArticle = $this->where('id', $id)->first();
        return $aArticle;
    }

    protected function upContentHtml($id, $content)
    {
        $Parsedown = new Parsedown();
        $content_html = $Parsedown->text($content);
        return $this->where('id', $id)->update(['content_html' => $content_html]);
    }

//    protected function getUserArticle($userid)
//    {
//        return AdminUser::find($userid)->articles;
//    }

    protected function getUserArticle($userid)
    {
        $aArticle =  $this->where('userid',$userid)->orderBy('id')->simplePaginate(15);
        $aArticle->admin_user = AdminUser::getAdminUserInfo($userid);
        return $aArticle;
    }

    protected function getArticleAll()
    {
        return  $this->all();
    }



}
