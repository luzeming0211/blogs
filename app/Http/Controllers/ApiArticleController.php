<?php


namespace App\Http\Controllers;


use App\Models\Article;

class ApiArticleController extends Controller
{
    public function index()
    {
        $aArticle = Article::getArticle();

        return $aArticle;
    }

    public function show($id)
    {
        $aArticle = Article::getArticleId($id);
        return $aArticle;
    }




}
