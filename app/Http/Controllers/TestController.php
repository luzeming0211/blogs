<?php


namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redis;

class TestController extends Controller
{
    public function index()
    {
        $room_str = 'game_room_1';
        $room_num =  Redis::del($room_str);
        $ws_config = config('swoole_http.server');
        $domain = env('APP_DOMAIN');
        $ws_host = $domain.':'.$ws_config['port'];
        return view('test',compact('ws_host'));
    }


}
