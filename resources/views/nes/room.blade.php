<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>{{ $nes->name }}</title>
    <script type="text/javascript" src="{{asset('assets/nes')}}/jsnes.min.js"></script>
    <script type="text/javascript" src="{{asset('assets/nes')}}/nes-embed2.js"></script>
    <script>
        window.onload = function () {
            nes_load_url("nes-canvas", "{{ getFileUrl($nes->game) }}");
        }
    </script>
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
</body>
<script src="{{asset('assets/nes_new')}}/js/jquery.min.js"></script>
<script>
    var live_id = '{{$room_id}}';
    var userid = '{{$userid}}';
    var username = '{{$username}}';
    user_agent = '111';
    var port = '{{(config('swoole.port'))}}';
    ws = new WebSocket("ws://tool.boser1u.top:" + port);
    // ws = new WebSocket("ws://47.95.12.100:9589");
    ws.onopen = function (evt) {
        var data = {
            live_id: live_id,
            userid: userid,
            username: username,
            type: 'connect',
            user_agent: user_agent
        };
        console.log(data);
        ws.send(JSON.stringify(data));
        is_discon();
    };
    ws.onmessage = function (evt) {
        var obj = JSON.parse(evt.data);

        console.log(obj);
    };
    ws.onclose = function () {
        //    发送房间号相关信息，以识别connect id
        var data = {
            live_id: live_id,
            userid: userid,
            username: username,
            type: 'close',
            user_agent: user_agent
        };
        ws.send(JSON.stringify(data));
    };
    ws.onerror = function () {
        console.log("出现错误");
    };
    function is_discon() {
        interval = window.setInterval("heart()", 2000);//两秒加载
    }
    function heart() {
        var data = {
            live_id: live_id,
            userid: userid,
            username: username,
            user_agent: user_agent,
            type: 'heart'
        };
        ws.send(JSON.stringify(data));
    }


</script>
</html>
