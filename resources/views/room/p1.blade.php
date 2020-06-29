<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>{{ $nes->name }}</title>
</head>
<body>
<div id="message">等待p2加入</div>
<div style="margin: auto; width: 75%;">
    <canvas id="nes-canvas" width="256" height="240" style="width: 75%"/>
</div>
<div>
    操作：
    <p> p1:wsad j k</p>
    <p> p2:箭头 1 2</p>
    开始 ：回车
    选择：B
</div>
{{--<button onclick="send_leave('p1_leave');">点我离开</button>--}}
<img src="" alt="" id="game_img">
<input type="text" value="{{ $url }}">
<script type="text/javascript" src="{{asset('assets/common')}}/js/jquery-3.0.0.min.js"></script>
<script type="text/javascript" src="{{asset('assets/nes')}}/jsnes.min.js"></script>
<script type="text/javascript" src="{{asset('assets/nes')}}/nes-embed2.js"></script>
<script>
    var userid = '{{ $userid }}';
    var username = '{{ $username }}';
    var room_id = '{{ $room_id }}';


    var ws = new WebSocket("ws://{{ $ws_host }}");

    ws.onopen = function () {
        send_conn();
    };

    ws.onmessage = function (evt) {
        var received_msg = evt.data;
        if (received_msg.indexOf("message") != -1) {
            var obj = JSON.parse(evt.data);
            info = obj[1];
            key_code = info.key_code;
            type = info.type;
            if (type == 'keydown') {
                keyboard_p2(nes.buttonDown, key_code)
            }
            if (type == 'keyup') {
                keyboard_p2(nes.buttonUp, key_code)
            }
            if (type == 'message') {
                $('#message').html(info.content);
            }
            if (type == 'join') {
                nes_load_url("nes-canvas", "{{ $nes->game }}");
                $('#message').html(info.content);
            }
        }
    };

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
