<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,inimal-ui,maximum-scale=1, user-scalable=0"/>
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="mobile-web-app-capable" content="yes">
    <title>p2</title>
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/font-awesome.min.css" type="text/css">
    <link href="{{asset('assets/nes_m')}}/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/play-mobile-9d5feb7998bea67e6fe1489c45a3df36.css">
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/play_new.css">
</head>
<body>

<div id="emulator">
    <canvas id="nes-canvas" class="nes-screen" width="256" height="240"
            style="width: 100%; position: absolute; image-rendering: pixelated; image-rendering: optimizespeed;z-index: 3000">
    </canvas>
<video id="video_div" playsinline="" class="nes-screen" width="256" height="240"
       style="width: 100%; position: absolute; image-rendering: pixelated; image-rendering: optimizespeed;"
       autoplay="" muted="" ></video>
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
<script src="https://cdn.bootcdn.net/ajax/libs/peerjs/1.2.0/peerjs.js"></script>
<script type="text/javascript">
    var userid = '{{ $userid }}';
    var username = '{{ $username }}';
    var room_id = '{{ $room_id }}';
    var nes_url = '{{ $nes->game }}';
    var join_url = '{{ $url }}';
    var player = 2;
    var send_player = 1;
    var my_peer_id = null;
    var interval_send_join;
    var video = document.getElementById('video_div');
    var canvas = document.getElementById('nes-canvas');

    function initialize() {
        peer = new Peer(null, {
            host: '{{  env('APP_DOMAIN') }}',
            port: 9000,
            debug: 3,
            path: '/myapp'
        });

        peer.on('open', function (id) {
            my_peer_id = id;
            interval_send_join = window.setInterval(send_join, 1000);
        });
        peer.on('connection', function (c) {

        });
        peer.on('disconnected', function () {

        });
        peer.on('close', function () {

        });
        peer.on('error', function (err) {
            console.log('error' + err);
        });
        peer.on('call', function (call) {
            console.log('call----answer---');
            alert('answer');
            clearInterval(interval_send_join);

            call.answer();

            call.on('stream', function (stream) {
                alert('stream');
                new_stream = new MediaStream(stream, {
                    mimeType: "video/webm; codecs=h264"
                });
                video.srcObject = new_stream;
                video.play();
                var canvas = document.getElementById('nes-canvas');
                makeImg();
                function makeImg() {
                    setInterval(setImg, 20);
                }
                function setImg() {
                    canvas.getContext('2d').drawImage(video, 0, 0, 256, 240);
                }
            });
            call.on('close', function () {
                console.log('close');
            });
        });


    };


    initialize();
    initmenu();
    mobile_init();


    // function makeImg() {
    //     setInterval(setImg, 50);
    // }
    // function setImg() {
    //     canvas.getContext('2d').drawImage(video, 0, 0, 256, 240);
    // }
    function wScreen1(type) {
        var realWidth = $(window).width();
        var realHight = $(window).height();
        var maxWidth = window.screen.width;
        var maxHight = window.screen.height;
        var topadd = (maxHight - realHight) / 2;
        if (type == 0)
            topadd = -topadd;
        var nesWidth = realWidth * (240 / 256);
        var btnsize = realWidth / 5;
        var btnleft = (realHight + nesWidth) / 2;
        if ((btnleft + btnsize * 2 + 10) > realHight) {
            btnleft = btnleft - ((btnleft + btnsize * 2 + 15) - realHight)
        }
        if ((btnleft + btnsize + btnmargin) > realHight) {
            btnleft = realHight - btnsize - btnmargin;
        }
        var btntop = realWidth - btnsize * 2 - 20;
        var btnmargin = 5;
        $(".nes-screen").css({

            "top": (realHight - nesWidth) / 2 + topadd / 2 + 'px',

        });

        $('#joystick_btn_AB').css({

            "top": btnleft + btnsize / 2 + btnmargin + topadd + 'px',

        });
        $('#joystick_btn_Y').css({

            "top": btnleft + topadd + 'px',

        });
        $('#joystick_btn_X').css({

            "top": btnleft + btnsize + btnmargin + topadd + 'px',

        });
        $('#joystick_btn_B').css({

            "top": btnleft + topadd + 'px',

        });
        $('#joystick_btn_A').css({

            "top": btnleft + btnsize + btnmargin + topadd + 'px',

        });

    }

    function initmenu() {
        var menusize = $(window).height() / 7;
        $('.menu .item').css({'width': menusize + 'px', 'height': menusize + 'px', 'line-height': menusize + 'px'});
        $('#closeChatModel').click(function () {
            closemenu();
            $('.tab-pane-bg').hide();
        });
        $('#menu_btn_cheat').click(function () {
            closemenu();
            $('#cheatscontent').show();
        });
        $('#menu_btn_reload').click(function () {
            closemenu();
            nes.reloadROM();
        });
        $('#menu_btn_chat').click(function () {
            closemenu();
            $('.tab-pane-bg').show();
        });
    }

    function closemenu() {
        $('#joystick_btn_menu').removeClass('active');
        $('.menu').hide();
    }

    function touchInit(type) {
        $('.interaction-area').bind('touchstart gesturestart', function (e) {
            handleDir(e, type);
            e.preventDefault()
        });
        $('.interaction-area').bind('touchmove', function (e) {
            handleDir(e, type)
        });
        $('#joystick_btn_menu').bind('touchstart gesturestart touchmove', function (e) {
            $('#joystick_btn_menu').addClass('active');
            e.preventDefault()
        });
        $('#joystick_btn_menu').bind('touchend', function (e) {
            $('#joystick_btn_menu').removeClass('active');
            $(".menu").show();
            e.preventDefault()
        });
        $('#menu_btn_saverom').bind('touchend', function (e) {
            closemenu();
            getNesList(gameid);
            e.preventDefault()
        });
        $('.interaction-area').bind('touchend', function (e) {
            $('#joystick_down').removeClass('active');
            $('#joystick_left').removeClass('active');
            $('#joystick_up').removeClass('active');
            $('#joystick_right').removeClass('active');
            send_m_key('left', 'keyup');
            send_m_key('up', 'keyup');
            send_m_key('right', 'keyup');
            send_m_key('down', 'keyup');
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_LEFT}, player);
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_UP}, player);
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_RIGHT}, player);
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_DOWN}, player)
        });
        $('#joystick_btn_start').bind('touchstart gesturestart touchmove', function (e) {
            $('#joystick_btn_start').addClass('active');
            send_m_key('start', 'keydown');
            nesButtonDown({keyCode: jsnes.Controller.BUTTON_START}, player);
            e.preventDefault()
        });
        $('#joystick_btn_start').bind('touchend', function (e) {
            $('#joystick_btn_start').removeClass('active');
            deleteData();
            send_m_key('start', 'keyup');
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_START}, player);
            e.preventDefault();
            iosAudioInit()
        });
        $('#joystick_btn_choice').bind('touchstart gesturestart touchmove', function (e) {
            $('#joystick_btn_choice').addClass('active');
            send_m_key('choice', 'keydown');
            nesButtonDown({keyCode: jsnes.Controller.BUTTON_SELECT}, player);
            e.preventDefault()
        });
        $('#joystick_btn_choice').bind('touchend', function (e) {
            $('#joystick_btn_choice').removeClass('active');
            send_m_key('choice', 'keyup');
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_SELECT}, player);
            e.preventDefault()
        });
        // luzeming
        $('#joystick_btn_A').bind('touchstart gesturestart touchmove', function (e) {
            send_m_key('A', 'keydown');
            touchAB(e, false, 'A');
            e.preventDefault()
        });
        $('#joystick_btn_A').bind('touchend', function (e) {
            $('#joystick_btn_A').removeClass('active');
            send_m_key('A', 'keyup');
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_A}, player);
            e.preventDefault()
        });
        $('#joystick_btn_B').bind('touchstart gesturestart touchmove', function (e) {
            send_m_key('B', 'keydown');
            touchAB(e, false, 'B');
            e.preventDefault()
        });
        $('#joystick_btn_B').bind('touchend', function (e) {
            $('#joystick_btn_B').removeClass('active');
            send_m_key('B', 'keyup');
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_B}, player);
            e.preventDefault()
        });
    }

    function touchControll(key, type) {
        var value = type == 'down' ? 0x41 : 0x40;
        var fvalue = type == 'down' ? 0x40 : 0x41;
        var key_type = type == 'down' ? 'keydown' : 'keyup';
        send_m_key(key, key_type);
        switch (key) {
            case'left':
                nes.buttonValue(player, jsnes.Controller.BUTTON_LEFT, value);
                break;
            case'right':
                nes.buttonValue(player, jsnes.Controller.BUTTON_RIGHT, value);
                break;
            case'up':
                nes.buttonValue(player, jsnes.Controller.BUTTON_UP, value);
                break;
            case'down':
                nes.buttonValue(player, jsnes.Controller.BUTTON_DOWN, value);
                break;
            case'leftup':
                nes.buttonValue(player, jsnes.Controller.BUTTON_UP, value);
                nes.buttonValue(player, jsnes.Controller.BUTTON_LEFT, value);
                nes.buttonValue(player, jsnes.Controller.BUTTON_DOWN, fvalue);
                nes.buttonValue(player, jsnes.Controller.BUTTON_RIGHT, fvalue);
                break;
            case'rightup':
                nes.buttonValue(player, jsnes.Controller.BUTTON_UP, value);
                nes.buttonValue(player, jsnes.Controller.BUTTON_RIGHT, value);
                nes.buttonValue(player, jsnes.Controller.BUTTON_DOWN, fvalue);
                nes.buttonValue(player, jsnes.Controller.BUTTON_LEFT, fvalue);
                break;
            case'leftdown':
                nes.buttonValue(player, jsnes.Controller.BUTTON_DOWN, value);
                nes.buttonValue(player, jsnes.Controller.BUTTON_LEFT, value);
                nes.buttonValue(player, jsnes.Controller.BUTTON_UP, fvalue);
                nes.buttonValue(player, jsnes.Controller.BUTTON_RIGHT, fvalue);
                break;
            case'rightdown':
                nes.buttonValue(player, jsnes.Controller.BUTTON_DOWN, value);
                nes.buttonValue(player, jsnes.Controller.BUTTON_RIGHT, value);
                nes.buttonValue(player, jsnes.Controller.BUTTON_UP, fvalue);
                nes.buttonValue(player, jsnes.Controller.BUTTON_LEFT, fvalue);
                break
        }
    }


    const ws = new WebSocket("ws://{{ $ws_host }}");
    ws.onopen = function () {

    };

    ws.onmessage = function (evt) {
        var received_msg = evt.data;
        try {
            var obj = JSON.parse(evt.data);
            info = obj[1];
            type = info.type;
            if (type == 'message') {
                $('#message').html(info.content);
            }
        } catch (e) {
            console.log(received_msg);
        }
    };


    ws.onclose = function () {
        console.log("连接已关闭...");
    };
    window.onbeforeunload = function (event) {
        ws.close();
    }

    function send_join() {
        if (my_peer_id == null) {
            console.log('null my_peer_id');
            return false;
        } else {
            console.log('发送 my_peer_id');
            var para = {
                other_peer_id: my_peer_id,
                room_id: room_id,
                userid: userid,
                username: username,
                event: 'message',
                type: 'join',
            };
            var data = {
                0: 'message',
                1: para,
            };
            var data_str = JSON.stringify(data);
            ws.send(data_str);
        }
    }


    function send_m_key(key_code, type) {
        var para = {
            key_code: key_code,
            room_id: room_id,
            userid: userid,
            username: username,
            event: 'message',
            type: type,
        };
        var data = {
            0: 'message',
            1: para,
        };
        var data_str = JSON.stringify(data);
        ws.send(data_str);
    }

    document.getElementById("video_div").addEventListener("click", function () {
        video.play();
    });
</script>
</body>
</html>
