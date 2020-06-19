<?php

Route::get('/', 'ArticleController@index');
Route::get('/{id}', 'ArticleController@detail');
Route::get('/user/{userid}', 'ArticleController@user');
Route::get('/user/{userid}/{id}', 'ArticleController@');
