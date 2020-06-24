<?php


namespace App\Http\Controllers;

class TestController extends Controller
{
    public function index()
    {
        $ws_config = config('swoole_http.server');
        $ws_host = $ws_config['host'].':'.$ws_config['port'];
        return view('test',compact('ws_host'));
    }


}
