<?php
Route::get('/nes','NesController@index');
Route::get('/nes/{id}','NesController@detail');
//Route::get('/nes/{room_id}/{id}','NesController@room');

Route::get('/', 'ArticleController@index');
Route::get('/article/{id}', 'ArticleController@detail');
Route::get('/article/user/{userid}', 'ArticleController@user');


