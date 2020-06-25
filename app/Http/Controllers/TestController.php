<?php


namespace App\Http\Controllers;

class TestController extends Controller
{
    public function index()
    {
        $ws_config = config('swoole_http.server');
        $domain = env('APP_DOMAIN');
        $ws_host = $domain.':'.$ws_config['port'];
        return view('test',compact('ws_host'));
    }


}
