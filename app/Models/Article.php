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


    protected function getArticle()
    {
        return $this->orderBy('id')->simplePaginate(15);;
    }

    protected function getArticleId($id)
    {

        $aArticle =  $this->where('id',$id)->first();
        if (!empty($aArticle)){
            $Parsedown = new Parsedown();
            $aArticle->content = $Parsedown->text($aArticle->content);
        }
        return $aArticle;
    }
}
