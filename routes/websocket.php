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
//            Room::add(Websocket::getSender(), $room_id);
            if ($data['type'] == 'img'){
                $base64_image_content = $data['img'];
                $path =  public_path().'/upload/nes_img/'.$room_id.'/';
                //匹配出图片的格式
                if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
                    $type = $result[2];
                    $new_file = $path."/".date('Ymd',time())."/".time().'/';
                    if(!file_exists($new_file)){
                        //检查是否有该文件夹，如果没有就创建，并给予最高权限
                        File::makeDirectory($new_file, $mode = 0777, true, true);
                    }
                    $new_file = $new_file.uniqid().uniqid().".{$type}";
                    file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)));
                    $data['img'] = str_replace(public_path(),env('APP_URL'),$new_file);
                }
            }
            Websocket::broadcast()->emit('message', $data);
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
//    $key_client = 'client:' . Websocket::getSender();
//    $room_id = $redis::get($key_client);
//    $room_str = 'game:room_' . $room_id;
//    $redis::del($room_str);
//    $redis::del($key_client);
//    Room::delete(Websocket::getSender(), [$room_id]);
//    $path =  public_path().'/upload/nes_img/'.$room_id;

});



