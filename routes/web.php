<?php
Route::get('/nes','NesController@index');
Route::get('/nes/{id}','NesController@detail');
Route::get('/nes/{room_id}/{id}','NesController@room');

Route::get('/', 'ArticleController@index')->name('home');
Route::get('/article/{id}', 'ArticleController@detail');
Route::get('/article/user/{userid}', 'ArticleController@user');

Route::get('/article', 'ArticleController@article');

Route::get('/test', 'TestController@index');
