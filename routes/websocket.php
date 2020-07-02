<?php


use Illuminate\Http\Request;
use SwooleTW\Http\Websocket\Facades\Room;
use SwooleTW\Http\Websocket\Facades\Websocket;

$redis = '\Illuminate\Support\Facades\Redis';
Websocket::on('message', function ($websocket, $data) use ($redis) {
    if (is_array($data)) {
//        $key_client = 'client:' . Websocket::getSender();
        $room_id = isset($data['room_id']) ? $data['room_id'] : '';
        if (!empty($room_id)) {
//            $flag = $redis::exists($key_client);
//            if (!$flag) {
//                $redis::set($key_client, $room_id);
//            }
//
//            if ($data['type'] == 'img'){
//                dump(time());
//            }
//            $redis::set($key_client, $room_id);
            Room::add(Websocket::getSender(), $room_id);
            Websocket::broadcast()->to([$room_id])->emit('message', $data);
        }
    }

});
Websocket::on('connect', function ($websocket, Request $request) {
    $aPara = [
        'type' => 'message',
        'content' => '感谢来到，尽情游玩吧',
    ];
    Websocket::emit('message', $aPara);
});

Websocket::on('disconnect', function ($websocket) use ($redis) {
    $key_client = 'client:' . Websocket::getSender();
    $room_id = $redis::get($key_client);
    $room_str = 'game:room_' . $room_id;
    $redis::del($room_str);
    $redis::del($key_client);
    Room::delete(Websocket::getSender(), [$room_id]);
});



