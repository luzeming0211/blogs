<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use SwooleTW\Http\Websocket\Facades\Room;

class NesController extends Controller
{

    public function detail($id)
    {
        $nes = DB::table('nes')->where('id', $id)->first();
        $nes->game = getFileUrl($nes->game);
        if (empty($nes)) {
            dd(111);
        }
        return view('nes.me', compact('nes'));
    }

    public function croom($id)
    {
        $nes = DB::table('nes')->where('id', $id)->get()->first();
        $nes->game = getFileUrl($nes->game);
        if (empty($nes)) {
            dd('empty nes croom');
        }
        $room_id = uniqid();
        $userid = uniqid();
        $username = uniqid();
        $room_str = 'game:room_' . $room_id;
        Redis::set($room_str, $userid);
        $url = env('APP_URL') . '/nes/' . $room_id . '/' . $id;
        ld($url);
        $ws_host = getWxDomain();

        $show_page = 'room.p1';
        if (isMobile()){
            $show_page = 'room.m.p1';
        }

        return view($show_page, compact('userid', 'username', 'room_id', 'nes', 'ws_host', 'url'));
    }

    public function room($room_id, $id)
    {
        $nes = DB::table('nes')->where('id', $id)->get()->first();
        $nes->game = getFileUrl($nes->game);
        if (empty($nes)) {
            dd('empty nes room');
        }
        $userid = uniqid();
        $username = uniqid();
        $room_str = 'game:room_' . $room_id;
        $room_flag = Redis::exists($room_str);
        if ($room_flag) {
            $sRoomUserIds = Redis::get($room_str);
            $aRoomUserIds = explode(',', $sRoomUserIds);
            if (count($aRoomUserIds) > 1) {
                dd('房间人满了');
            } else {
                Redis::set($room_str, $sRoomUserIds . ',' . $userid);
            }
        } else {
            dd('房间不存在');
        }

        $ws_host = getWxDomain();
        $url = '';
        $show_page = 'room.p2';
        if (isMobile()){
            $show_page = 'room.m.p2';
        }
        return view($show_page, compact('userid', 'username', 'room_id', 'nes', 'ws_host','url'));
    }


    public function test2()
    {
        return view('room.m.test');
    }


}
