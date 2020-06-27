<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>{{ $nes->name }}</title>

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
<button onclick="sendInfo()">发送图</button>
<img src="" alt="" id="game_img">
<script type="text/javascript" src="{{asset('assets/common')}}/js/jquery-3.0.0.min.js"></script>
<script type="text/javascript" src="{{asset('assets/nes')}}/jsnes.min.js"></script>
<script type="text/javascript" src="{{asset('assets/nes')}}/nes-embed2.js"></script>
<script>
    var userid = '{{ $userid }}'
    var username = '{{ $username }}'
    var room_id = '1'
    // window.onload = function () {
    $
    nes_load_url("nes-canvas", "{{ $nes->game }}");


    // 打开一个 web socket
    var ws = new WebSocket("ws://{{ $ws_host }}");



    ws.onopen = function (evt) {
        var data = {
            room_id: room_id,
            userid: userid,
            username: username,
        };
        ws.send(JSON.stringify(data));
        is_discon();
    };
    ws.onmessage = function (evt) {
        // var obj = JSON.parse(evt.data);
        var obj = evt.data;
        console.log(obj);
    };
    ws.onclose = function () {
        var data = {
            room_id: room_id,
            userid: userid,
            username: username,
            type: 'close_video',
        };
        ws.send(JSON.stringify(data));
    };
    ws.onerror = function () {
        console.log("出现错误");
    };

    // }
    function is_discon() {
        interval = window.setInterval("heart()", 2000);//两秒加载
    }

    function heart() {
        var data = {
            room_id: room_id,
            userid: userid,
            username: username,
            type: 'heart'
        };
        ws.send(JSON.stringify(data));
    }

    function sendInfo() {
        // let img = $("#game_img").attr('src');
        var data = {
            room_id: room_id,
            userid: userid,
            username: username,
            // img: img,
            type: 'message'
        };
        console.log(data);
        ws.send((data));
    }
</script>
</body>
</html>
