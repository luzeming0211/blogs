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
    <canvas id="nes-canvas"  height="240" style="width: 100%"/>
</div>
</body>

</html>
