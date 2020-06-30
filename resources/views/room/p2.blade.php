<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>p2</title>
</head>
<body>
<div style="margin: auto; width: 75%;">
    <img src="" alt="" id="game_img">
</div>

<script type="text/javascript" src="{{asset('assets/common')}}/js/jquery-3.0.0.min.js"></script>
<script>
    var userid = '{{ $userid }}';
    var username = '{{ $username }}';
    var room_id = '{{ $room_id }}';

    var img_data;
    var ws = new WebSocket("ws://{{ $ws_host }}");

    ws.onopen = function () {
        send_join();
        get_img();
    };

    ws.onmessage = function (evt) {
        var received_msg = evt.data;
        if (received_msg.indexOf("message") != -1) {
            var obj = JSON.parse(evt.data);
            info = obj[1];
            type = info.type;
            if (type == 'img') {
                img_data = info.img;
            }
            if (type == 'message') {
                $('#message').html(info.content);
            }
        }
    };

    function get_img(canvas) {
        setInterval(setImg, 20);
    }
    function setImg(){
        $("#game_img").attr('src',img_data);
    }
    ws.onclose = function () {
        alert("连接已关闭...");
    };
    window.onbeforeunload = function(event) {
        ws.close();
    }

    function send_leave() {
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

    function send_join() {
        var para = {
            content: '我来了',
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

    function send_key(key_code, type) {
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

    $(document).keydown(function (event) {
        send_key(event.keyCode, 'keydown');
    });
    $(document).keyup(function (event) {
        send_key(event.keyCode, 'keyup');
    });

</script>
</body>
</html>
