<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class NesController extends Controller
{
//    public function index()
//    {
//        return view('nes.index');
//    }

    public function detail($id)
    {
        $nes = DB::table('nes')->where('id', $id)->first();
        $nes->game = getFileUrl($nes->game);
//        dd($nes);
        if (empty($nes)) {
            dd(111);
        }
        return view('nes.me', compact('nes'));
    }

    public function room($room_id, $id)
    {
        $str = '{"room_id":"1","userid":"5ef5d3f23d7d9","username":"5ef5d3f23d7dd","event":"message"}';
        $a = json_decode($str,true);


        $nes = DB::table('nes')->where('id', $id)->get()->first();
        $nes->game = getFileUrl($nes->game);
        if (empty($nes)) {
            dd(111);
        }
        $userid = uniqid();
        $username = uniqid();
        $room_str = 'game_room_'.$room_id;
        $room_num =  Redis::get($room_str);
        $show_page = 'room.p2';
        if ($room_num == 0 || $room_num == null){
            Redis::set($room_str,1);
            $show_page = 'room.p1';
        }
        if ($room_num == 1){
            Redis::set($room_str,2);
            $show_page = 'room.p2';
        }
        $ws_host = getWxDomain();
        return view($show_page,compact('userid','username','room_id','nes','ws_host'));
    }


}
