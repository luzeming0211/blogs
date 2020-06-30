<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,inimal-ui,maximum-scale=1, user-scalable=0"/>
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="mobile-web-app-capable" content="yes">
    <title>手机版</title>
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/font-awesome.min.css" type="text/css">
    <link
        href="{{asset('assets/nes_m')}}/css/bootstrap.min.css"
        rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/play-mobile-9d5feb7998bea67e6fe1489c45a3df36.css">
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/play_new.css">
</head>

<body>
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
        <div class="darrow" id="joystick_leftup"></div>
        <div class="darrow" id="joystick_leftdown"></div>
        <div class="darrow" id="joystick_rightdown"></div>
        <div class="darrow" id="joystick_rightup"></div>
        <button id="joystick_left" class="arrow">▵</button>
        <button id="joystick_down" class="arrow">▵</button>
        <button id="joystick_up" class="arrow">▵</button>
        <button id="joystick_right" class="arrow">▵</button>
    </div>
</div>
<div class="joystickpad">
    <div id="joystick_btn_menu" class="left pspbutton joystick_btn_op_1">菜单</div>
    <div id="joystick_btn_choice" class="left pspbutton joystick_btn_op_1">选择</div>
    <div id="joystick_btn_start" class="left pspbutton joystick_btn_op_1">开始</div>
    <div id="joystick_btn_X" class="xbutton joystick_btn_op_2">X</div>
    <div id="joystick_btn_Y" class="xbutton joystick_btn_op_2">Y</div>
    <div id="joystick_btn_A" class="xbutton joystick_btn_op_2">A</div>
    <div id="joystick_btn_B" class="xbutton joystick_btn_op_2">B</div>
    <div id="joystick_btn_AB" class="xbutton joystick_btn_op_2">AB</div>
</div>
<div class="tab-pane-bg" style="z-index:99;display:none">
    <header class="tenant-model-header">
        <span id="closeChatModel">×</span>
    </header>
    <div class="tab-pane chat">
        <ul class="messages" style="bottom: 36px;">


        </ul>
        <div class="chat-footer">
            <div class="chat-footer-box">
                <input autocomplete="off" id="word" class="chat-input" placeholder="回车发送输入的消息" style="" maxlength="140">
                <i id="mobile_send" class="fa fa-reply" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</div>
<div>
    <ul class="menu">
        <li><a class="item item-0 menu-toggle"><i class="fa fa-times"></i>
                <p class="menutext"></p></a></li>
        <li><a id="menu_btn_cheat" class="item item-1"><i class="fa fa-hand-pointer-o"></i>
                <p class="menutext">金手指</p></a></li>
        <li><a id="menu_btn_full" sc="1" class="item item-2"><i class="fa fa-window-maximize"></i>
                <p class="menutext">全屏</p></a></li>
        <li><a id="menu_btn_reload" class="item item-3"><i class="fa fa-refresh"></i>
                <p class="menutext">重载</p></a></li>
        <li><a id="menu_btn_saverom" class="item item-5"><i class="fa fa-save"></i>
                <p class="menutext">保存</p></a></li>
        <li><a id="menu_btn_chat" class="item item-5"><i class="fa fa-wechat"></i>
                <p class="menutext">聊天</p></a></li>
        <li><a href="/" class="item item-7"><i class="fa fa-power-off"></i>
                <p class="menutext">退出</p></a></li>
    </ul>
</div>
<div class="tenant-model-content" id="cheatscontent" style="display:none;background-color: rgba(34,34,34);">
    <header class="tenant-model-header">
        <span class="closebtn" id="closecheatsModel">×</span>
    </header>
    <div class="tenant-model-body">
        <div class="cheatlistcontain" style="height:150px;overflow-y:auto">
            <ul id="cheatlist">
            </ul>
        </div>
    </div>
</div>
<div class="tenant-model-content" id="saveContent">
    <header class="tenant-model-header">
        <span id="closeModel">×</span>
    </header>
    <div class="tenant-model-body">
        <div id="list">
            <ul id="savelist">
                <div id="qrcode"></div>
            </ul>
        </div>
    </div>
</div>

<div id="tips"></div>
<script src="{{asset('assets/nes_m')}}/js/jquery.min.js"></script>
<script type="text/javascript"
        src="{{asset('assets/nes_m')}}/js/play-mobile-b4042d918f463eaaf846b77239552aca.js"></script>
<script type="text/javascript"
        src="{{asset('assets/nes_m')}}/js/play-mobile-9e6418b070162fc74f79a769f8a40c18.js"></script>
<script type="text/javascript" src="{{asset('assets/nes_m')}}/js/play-10e0778a0b61417ba80b58197e44c5ff.js"></script>
<script>
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

        function fullScreen() {
            var element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
        }

        function exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        $('#menu_btn_full').click(function () {
            closemenu();
            var sc = $('#menu_btn_full').attr("screen");
            if (sc == '1') {
                $('#menu_btn_full').attr("screen", "0");
                var realWidth = $(window).width();
                var realHight = $(window).height();
                var nesWidth = realWidth * (240 / 256);
                $(".nes-screen").css({
                    "width": nesWidth + 'px',
                    "height": realWidth + 'px',
                    "top": (realHight - nesWidth) / 2 + 'px',
                    "left": ((realWidth - nesWidth) / 2) + 'px'
                });
                $('#menu_btn_full p').text('全屏');
            } else {
                $('#menu_btn_full').attr("screen", "1");
                var realWidth = $(window).width();
                var realHight = $(window).height();
                var nesWidth = realWidth * (240 / 256);
                $('.nes-screen').css({
                    "width": $(window).height() + "px",
                    "top": (realHight - nesWidth) / 2 + 'px',
                    "left": ((realWidth - realHight) / 2) + 'px'
                });
                $('#menu_btn_full p').text('缩小');
            }
        });
        $('#closecheatsModel').click(function () {
            $('#cheatscontent').hide();
        });
        $('.menu-toggle').on('click', function () {
            closemenu();
        });
    }

    function closemenu() {
        $('#joystick_btn_menu').removeClass('active');
        $('.menu').hide();
    }

</script>
<script type="text/javascript" src="{{asset('assets/nes')}}/nes-embed2.js"></script>
<script>
    var userid = '{{ $userid }}';
    var username = '{{ $username }}';
    var room_id = '{{ $room_id }}';
    var rom_url = '{{ $nes->game }}';


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
                // $('#message').html(info.content);
            }
            if (type == 'join') {
                // initcheatmap();
                initmenu();
                mobile_init();
                nes_load_url("nes-canvas", rom_url);
            }
        }catch (e) {
            console.log(received_msg);
        }
    };

    function p2_action(callback, keyCode) {
        var player = 2;
        switch (keyCode) {
            case 'up': // UP
                callback(player, jsnes.Controller.BUTTON_UP);
                break;
            case 'down': // Down
                callback(player, jsnes.Controller.BUTTON_DOWN);
                break;
            case 'left': // Left
                callback(player, jsnes.Controller.BUTTON_LEFT);
                break;
            case 'right': // Right
                callback(player, jsnes.Controller.BUTTON_RIGHT);
                break;
            case 'A': //77
                callback(player, jsnes.Controller.BUTTON_A);
                break;
            case 'B':
                callback(player, jsnes.Controller.BUTTON_B);
                break;
            case 66: //
                callback(player, jsnes.Controller.BUTTON_SELECT);
                break;
            case 13: //
                callback(player, jsnes.Controller.BUTTON_START);
                break;
            default:
                break;
        }
    }

    ws.onclose = function () {
        alert("连接已关闭...");
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

    function send_leave(type) {
        var para = {
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
</script>
</body>
</html>
