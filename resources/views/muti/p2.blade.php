<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>p2</title>
</head>
<body>
<div id="message"></div>
{{--<div style="margin: auto; width: 75%;">--}}
    <video id="video_div" playsinline="" style="width: 200px;" autoplay muted ></video>
{{--<img src="" alt="" id="nes_img">--}}
{{--</div>--}}
{{--<div style="margin: auto; width: 75%;">--}}
{{--    <canvas id="nes-canvas" width="256" height="240" style="width: 75%"/>--}}
{{--</div>--}}
<input type="hidden" value="" id="me_peer_id">
<script type="text/javascript" src="{{asset('assets/common')}}/js/jquery-3.0.0.min.js"></script>
<script type="text/javascript" src="{{asset('assets/nes')}}/jsnes.min.js"></script>
{{--<script type="text/javascript" src="{{asset('assets/nes')}}/nes-muti.js"></script>--}}
<script src="https://cdn.bootcdn.net/ajax/libs/peerjs/1.2.0/peerjs.js"></script>
<script type="text/javascript">
    (function () {

        var my_peer_id = null;

        var userid = '{{ $userid }}';
        var username = '{{ $username }}';
        var room_id = '{{ $room_id }}';

        var  video_div = document.getElementById('video_div');
        var  nes_canvas = document.getElementById('nes-canvas');
        var  nes_img = document.getElementById('nes_img');

        function initialize() {
            peer = new Peer(null, {
                host: '{{  env('APP_DOMAIN') }}',
                port: 9000,
                debug: 3,
                path: '/myapp'
            });

            peer.on('open', function (id) {
                $("#me_peer_id").val(id);
                my_peer_id = id;
                new_ws();
            });
            peer.on('connection', function (c) {

            });
            peer.on('disconnected', function () {

            });
            peer.on('close', function () {

            });
            peer.on('error', function (err) {

            });
            peer.on('call', function (call) {
                // var video_div = document.getElementById('video_div');
                // var video_stream = video_div.captureStream();
                // call.answer(video_stream);
                call.answer();
                // console.log(222);
                // console.log(call);
                // console.log(222);
                call.on('stream', function (stream) {
                    console.log(111);
                    video_div.srcObject = stream;
                });
                call.on('close', function () {
                    console.log('close');
                });
            });


        };


        initialize();

        function new_ws() {
            var ws = new WebSocket("ws://{{ $ws_host }}");
            ws.onopen = function () {
                send_join();
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

            function send_join() {
                console.log('my_peer_id');
                console.log(my_peer_id);
                console.log('my_peer_id');
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

            $(document).keydown(function (event) {
                send_key(event.keyCode, 'keydown');
            });
            $(document).keyup(function (event) {
                send_key(event.keyCode, 'keyup');
            });
        }


    })();
</script>
</body>
</html>
