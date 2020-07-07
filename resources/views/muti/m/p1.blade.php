<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,inimal-ui,maximum-scale=1, user-scalable=0"/>
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="mobile-web-app-capable" content="yes">
    <title>p1</title>
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/font-awesome.min.css" type="text/css">
    <link href="{{asset('assets/nes_m')}}/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/play-mobile-9d5feb7998bea67e6fe1489c45a3df36.css">
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/play_new.css">
</head>

<body>
<div id="qrcode"></div>
<div id="emulator">
    <canvas id="nes-canvas" class="nes-screen" width="256" height="240"
            style="width: 100%; position: absolute; image-rendering: pixelated; image-rendering: optimizespeed;"></canvas>
</div>
<div class="bg-model"
     style="position: absolute; top: 0%; left: 0%; display: none; background: rgba(0, 0, 0, 0.3); width: 100%; height: 100%; position: fixed; z-index: 9999">
    <div class='content'
         style="position: absolute; left: 35%; top: 25%; border-radius: 8px; width: 30%; height: 40%; background-color: #fff;">
    </div>
</div>
<div id="psp">
    <div class="interaction-area">
        <button id="joystick_left" class="arrow">▵</button>
        <button id="joystick_down" class="arrow">▵</button>
        <button id="joystick_up" class="arrow">▵</button>
        <button id="joystick_right" class="arrow">▵</button>
    </div>
</div>
<div class="joystickpad">
    <div id="joystick_btn_choice" class="left pspbutton joystick_btn_op_1">选择</div>
    <div id="joystick_btn_start" class="left pspbutton joystick_btn_op_1">开始</div>
    <div id="joystick_btn_A" class="xbutton joystick_btn_op_2">A</div>
    <div id="joystick_btn_B" class="xbutton joystick_btn_op_2">B</div>
</div>

<div id="tips"></div>
<script src="{{asset('assets/nes_m')}}/js/jquery.min.js"></script>
<script type="text/javascript"
        src="{{asset('assets/nes_m')}}/js/play-mobile-b4042d918f463eaaf846b77239552aca.js"></script>
<script type="text/javascript"
        src="{{asset('assets/nes_m')}}/js/play-mobile-9e6418b070162fc74f79a769f8a40c18.js"></script>
<script src="{{asset('assets/nes')}}/m_p1_p2.js"></script>
<script type="text/javascript" src="{{asset('assets/common')}}/js/jquery.qrcode.min.js"></script>

<script>
    var userid = '{{ $userid }}';
    var username = '{{ $username }}';
    var room_id = '{{ $room_id }}';
    var nes_url = '{{ $nes->game }}';
    var join_url = '{{ $url }}';

    var player = 1;
    var send_player = 2;

    $('#qrcode').qrcode(join_url);

    var ws = new WebSocket("ws://{{ $ws_host }}");

    ws.onopen = function () {
        send_conn();
    };

    ws.onmessage = function (evt) {
        var received_msg = evt.data;
        try{
            var obj = JSON.parse(evt.data);
            info = obj[1];
            key_code = info.key_code;
            type = info.type;
            if (type == 'keydown') {
                p2_action(nes.buttonDown, key_code);
            }
            if (type == 'keyup') {
                p2_action(nes.buttonUp, key_code);
            }
            if (type == 'message') {
            }
            if (type == 'join') {
                $("#qrcode").remove();
                initmenu();
                mobile_init();
                nes_load_url("nes-canvas", nes_url);
            }
        }catch (e) {
            console.log(received_msg);
        }
    };

    function p2_action(callback, keyCode) {
        switch (keyCode) {
            case 'up': // UP
                callback(send_player, jsnes.Controller.BUTTON_UP);
                break;
            case 'down': // Down
                callback(send_player, jsnes.Controller.BUTTON_DOWN);
                break;
            case 'left': // Left
                callback(send_player, jsnes.Controller.BUTTON_LEFT);
                break;
            case 'right': // Right
                callback(send_player, jsnes.Controller.BUTTON_RIGHT);
                break;
            case 'A': //77
                callback(send_player, jsnes.Controller.BUTTON_A);
                break;
            case 'B':
                callback(send_player, jsnes.Controller.BUTTON_B);
                break;
            case 'choice': //
                callback(send_player, jsnes.Controller.BUTTON_SELECT);
                break;
            case 'start': //
                callback(send_player, jsnes.Controller.BUTTON_START);
                break;
            default:
                break;
        }
    }

    ws.onclose = function () {
        console.log("连接已关闭...");
    };
    window.onbeforeunload = function(event) {
        ws.close();
    }
    function send_conn(){
        var para = {
            room_id: room_id,
            userid: userid,
            username: username,
            event: 'message',
            type: 'conn',
        };
        var data = {
            0: 'message',
            1: para,
        };
        var data_str = JSON.stringify(data);
        ws.send(data_str);
    }
</script>
</body>
</html>
