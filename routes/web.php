<?php

Route::get('/', 'ArticleController@index');
Route::get('/{id}', 'ArticleController@detail');
Route::get('/htmls', 'ArticleController@html');
Route::get('/test', 'ArticleController@test1');

//Route::get('/', function () {
//
//    return view('index');
//});
//Route::get('a', function () {
//
//    return view('article');
//});
