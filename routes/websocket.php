<?php


use Illuminate\Http\Request;
use SwooleTW\Http\Websocket\Facades\Room;
use SwooleTW\Http\Websocket\Facades\Websocket;

/*
|--------------------------------------------------------------------------
| Websocket Routes
|--------------------------------------------------------------------------
|
| Here is where you can register websocket events for your application.
|
*/
Websocket::on('message', function ($websocket, $data) {
    ld($data);

    Websocket::broadcast()->emit('message', $data);
});
Websocket::on('connect', function ($websocket, Request $request) {
    // called while socket on connect
    ld('called while socket on connect');
//    ld($request);


//    $msg = json_encode(['message'=>$websocket]);
//    Websocket::emit('message', $msg);
//    Websocket::broadcast()->emit('message', 'this is a test');
//    Room::getClients('game_1');
//    Websocket::join('some room');
});

Websocket::on('disconnect', function ($websocket) {
    // called while socket on disconnect
//    ld('called while socket on disconnect');
});

//Websocket::on('connect', "\App\Http\Controllers\SocketController@connect");
//
//Websocket::on('disconnect', "\App\Http\Controllers\SocketController@disconnect");
//
//Websocket::on('message', "\App\Http\Controllers\SocketController@message");


