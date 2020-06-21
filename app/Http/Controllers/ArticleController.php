<?php


namespace App\Http\Controllers;


use App\Models\Article;

class ArticleController extends Controller
{
    public function index()
    {
        $aArticle = Article::getArticle();

        return view('index', compact('aArticle'));
    }

    public function detail($id)
    {
        $aArticle = Article::getArticleId($id);
        return view('article', compact('aArticle'));
    }

    public function user($userid)
    {
        $aArticle = Article::getUserArticle($userid);
        return view('user', compact('aArticle'));
    }

    public function article($userid)
    {

    }

}
