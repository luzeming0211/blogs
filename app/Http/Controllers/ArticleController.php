<?php


namespace App\Http\Controllers;


use App\Models\Article;

class ArticleController extends Controller
{
    public function index()
    {
        $aArticle = Article::getArticle();

        return view('index',compact('aArticle'));
    }

    public function detail($id)
    {
        $aArticle = Article::getArticleId($id);
        if (empty($aArticle)){
            abort(404);
        }
        return view('article',compact('aArticle'));
    }



}
