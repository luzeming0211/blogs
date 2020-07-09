<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>111</title>
    <script type="text/javascript" src="{{asset('assets/common')}}/js/jquery-3.0.0.min.js"></script>
    <script type="text/javascript" src="{{asset('assets/nes')}}/jsnes.min.js"></script>
    <script type="text/javascript" src="{{asset('assets/nes')}}/nes-muti.js"></script>
</head>
<body>
<div style="margin: auto; width: 75%;">
    <canvas id="nes-canvas" width="256" height="240" style="width: 75%"/>
</div>
<video id="video_div" playsinline="" class="nes-screen" width="256" height="240"
       style="width: 100%; position: absolute; image-rendering: pixelated; image-rendering: optimizespeed;"
       autoplay="" muted=""></video>
<script>
    var video = document.getElementById('video_div');
    var nes_canvas = document.getElementById('nes-canvas');
    nes_load_url("nes-canvas", "{{ $nes->game }}");
    let stream = nes_canvas.captureStream();
    video.srcObject = stream;
</script>
</body>
</html>
