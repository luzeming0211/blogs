<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use SwooleTW\Http\Websocket\Facades\Room;

class VideoController extends Controller
{

    public function p1()
    {
        return view('video.p1');
    }

    public function p2()
    {
        return view('video.p2');
    }

}
