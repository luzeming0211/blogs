<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

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
        $nes = DB::table('nes')->where('id', $id)->get()->first();
        if (empty($nes)) {
            dd(111);
        }
        $userid = uniqid();
        $username = uniqid();
        return view('nes.room',compact('userid','username','room_id','nes'));

    }


}
