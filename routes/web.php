<?php

Route::get('/video/p1','VideoController@p1');
//Route::get('/nes/p1','NesController@p1');
Route::get('/video/p2','VideoController@p2');
//Route::get('/nes/p2','NesController@p2');


Route::get('/video','NesController@video');
Route::get('/nes/test','NesController@test2');
Route::get('/nes','NesController@index');
Route::get('/nes/{id}','NesController@detail');
Route::get('/nes/croom/{id}','NesController@croom');
Route::get('/nes/{room_id}/{id}','NesController@room');



Route::get('/', 'ArticleController@index')->name('home');
Route::get('/article/{id}', 'ArticleController@detail');
Route::get('/article/user/{userid}', 'ArticleController@user');

Route::get('/article', 'ArticleController@article');

Route::get('/test', 'TestController@index');
