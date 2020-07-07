<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>p1</title>
    <script type="text/javascript" src="{{asset('assets/common')}}/js/jquery-3.0.0.min.js"></script>
    <script type="text/javascript" src="{{asset('assets/nes')}}/jsnes.min.js"></script>
    <script type="text/javascript" src="{{asset('assets/nes')}}/nes-muti.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/peerjs/1.2.0/peerjs.js"></script>
</head>
<body>
<div id="message"></div>
{{--<video id="video_div" controls="controls" src="" style="width: 200px" autoplay></video>--}}
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
{{--我的id--}}
<input type="hidden" value="" id="me_peer_id">
<input type="hidden" value="" id="other_peer_id">
<input type="text" value="{{ $url }}" id=""  >
{{--<button id="conn_other">点我连接</button>--}}
<script type="text/javascript">
    (function () {

        var other_peer_id = null;
{{--        var nes_url = '{{ env('APP_URL').'/upload/files/snow.nes' }}'--}}
        var nes_url = '{{ $nes->game }}'

        function initialize() {
            peer = new Peer(null, {
                host: '{{  env('APP_DOMAIN') }}',
                port: 9000,
                debug: 3,
                path: '/myapp'
            });

            peer.on('open', function (id) {
                $("#me_peer_id").val(id);
            });

            peer.on('connection', function (c) {

            });
            peer.on('disconnected', function () {

            });
            peer.on('close', function () {

            });
            peer.on('error', function (err) {
                console.log(err);
            });
        };
        function conn_other(other_peer_id) {
            console.log('链接' + other_peer_id);
            let nes_canvas = document.getElementById('nes-canvas');
            let stream = nes_canvas.captureStream();
            const call = peer.call(other_peer_id, stream);

            call.on('stream', (remoteStream) => {

            });
        }

        // document.getElementById('conn_other').addEventListener('click', conn_other);

        initialize();
        nes_load_url("nes-canvas", nes_url);


        var userid = '{{ $userid }}';
        var username = '{{ $username }}';
        var room_id = '{{ $room_id }}';

        var ws = new WebSocket("ws://{{ $ws_host }}");

        ws.onopen = function () {
            send_conn();
        };

        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            try {
                var obj = JSON.parse(evt.data);
                info = obj[1];
                key_code = info.key_code;
                type = info.type;
                other_peer_id = info.other_peer_id;
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
                    conn_other(other_peer_id);
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

        function send_conn() {
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
    })();
</script>
</body>
</html>
