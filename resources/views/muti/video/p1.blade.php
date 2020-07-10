<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>111</title>
    <script type="text/javascript" src="{{asset('assets/common')}}/js/jquery-3.0.0.min.js"></script>
    <script type="text/javascript" src="{{asset('assets/nes')}}/jsnes.min.js"></script>
    <script src="{{asset('assets/nes')}}/m_p1.js"></script>
</head>
<body>
{{--<div style="margin: auto; width: 75%;">--}}
{{--    <canvas id="nes-canvas" width="256" height="240" style="width: 75%"/>--}}
{{--</div>--}}

<video style="width: 200px" controls autoplay id="video_div">
    <source src="{{ asset('assets') }}/1.mp4" type="video/mp4">
    您的浏览器不支持 video 标签。
</video>
<video style="width: 200px" controls autoplay id="video_div2" autoplay>
</video>

{{--<video id="video_div" controls="controls" src="{{ asset('assets') }}/1.mp4" style="width: 200px" autoplay></video>--}}
{{--<video id="video_div" playsinline="" class="nes-screen" width="256" height="240"--}}
{{--       style="width: 100%; position: absolute; image-rendering: pixelated; image-rendering: optimizespeed;"--}}
{{--       autoplay="" muted=""></video>--}}
{{--<script>--}}
{{--    var video = document.getElementById('video_div');--}}
{{--    var nes_canvas = document.getElementById('nes-canvas');--}}
{{--    nes_load_url("nes-canvas", "{{ $nes->game }}");--}}
{{--    let stream = nes_canvas.captureStream();--}}

{{--    console.log(stream);--}}
{{--    try {--}}
{{--        console.log('srcObject');--}}

{{--        new_stream = new MediaStream(stream, {--}}
{{--            mimeType: "video/webm; codecs=h264"--}}
{{--        });--}}
{{--        video.srcObject = new_stream;--}}
{{--    } catch (err) {--}}
{{--        alert(err);--}}
{{--    }--}}
{{--    try {--}}
{{--        video.play();--}}
{{--    } catch (err) {--}}
{{--        alert(err);--}}
{{--    }--}}
{{--    document.getElementById("video_div").addEventListener("click", function () {--}}
{{--        alert(111);--}}
{{--        video.play();--}}
{{--    });--}}
{{--</script>--}}
<script>
    var Video1 = document.getElementById('video_div');
    var video2 = document.getElementById('video_div2');
    var stream = Video1.captureStream();
    video2.srcObject = stream;
    video2.play();
    // Video1.addEventListener('click', function () {
    //     video2.srcObject = stream;
    // });
</script>
</body>
</html>
