<?php

namespace App\Http\WebSocket;

use SwooleTW\Http\Websocket\HandlerContract;

class WebSocket implements HandlerContract
{

    public function onOpen($fd, \Illuminate\Http\Request $request)
    {
        ld('open');
    }

    public function onMessage(\Swoole\Websocket\Frame $frame)
    {
        ld('onMessage');
    }

    public function onClose($fd, $reactorId)
    {
        ld('onClose');
    }
}
