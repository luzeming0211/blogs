<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>p2</title>

</head>
<body>
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
<img src="" alt="" id="game_img">
<script type="text/javascript" src="{{asset('assets/common')}}/js/jquery-3.0.0.min.js"></script>
<script type="text/javascript" src="{{asset('assets/nes')}}/jsnes.min.js"></script>
<script type="text/javascript" src="{{asset('assets/nes')}}/nes-embed2.js"></script>
<script>
    var userid = '{{ $userid }}'
    var username = '{{ $username }}'
    var room_id = '1'
    {{--    nes_load_url("nes-canvas", "{{ $nes->game }}");--}}

    // console.log("您的浏览器支持 WebSocket!");

    // 打开一个 web socket
    var ws = new WebSocket("ws://{{ $ws_host }}");

    ws.onopen = function () {
        var para = {
            room_id: room_id,
            userid: userid,
            username: username,
            event: 'message',
            type: 'message',
        };
        var data = {
            0: 'message',
            1: para,
        };

        var data_str = JSON.stringify(data);

        ws.send(data_str);
        console.log("数据发送中...");
    };

    ws.onmessage = function (evt) {
        var received_msg = evt.data;
        console.log(received_msg);
        if (received_msg.indexOf("message") != -1) {
            var obj = JSON.parse(evt.data);
            console.log(obj);
            info = obj[1];
            img = info.img;
            console.log(img);
            $("#game_img").attr('src', img);
        }


        console.log("数据已接收...");
    };

    ws.onclose = function () {
        // 关闭 websocket
        console.log("连接已关闭...");
        window.location.reload();
    };

    $(document).keydown(function (event) {

        console.log(event.keyCode);

        var para = {
            key_code: event.keyCode,
            room_id: room_id,
            userid: userid,
            username: username,
            event: 'message',
            type: 'keydown',
        };
        var data = {
            0: 'message',
            1: para,
        };

        var data_str = JSON.stringify(data);

        ws.send(data_str);

    });
    $(document).keyup(function (event) {

        console.log(event.keyCode);

        var para = {
            key_code: event.keyCode,
            room_id: room_id,
            userid: userid,
            username: username,
            event: 'message',
            type: 'keyup',
        };
        var data = {
            0: 'message',
            1: para,
        };

        var data_str = JSON.stringify(data);

        ws.send(data_str);

    });
</script>
</body>
</html>
