<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>{{ $nes->name }}</title>
    <script type="text/javascript" src="{{asset('assets/nes')}}/jsnes.min.js"></script>
    <script type="text/javascript" src="{{asset('assets/nes')}}/nes-embed2.js"></script>
    <script>
        window.onload = function () {
            nes_load_url("nes-canvas", "{{ $nes->game }}");
        }
    </script>
</head>
<body>
<div style="margin: auto; width: 75%;">
    <canvas id="nes-canvas" width="256" height="240" style="width: 75%"/>
</div>
<div >
    操作：
    <p> p1:wsad  j k</p>
    <p> p2:箭头  1 2</p>
    开始 ：回车
    选择：B
</div>
</body>
</html>
