<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="//player.polyv.net/resp/vod-audio-player/latest/audio-player.min.js"></script>
</head>
<body>
<div id="myAudioPlayer"></div>
<div id="myAudioPlayer2"></div>
<script>
    const plvAudioPlayer = new PlvAudioPlayer({
        vid: '44ca31d0c49533180a8c987f7503892d_4',
        wrap: '#myAudioPlayer',
        skin: 'white'
    });
    const plvAudioPlayer2 = new PlvAudioPlayer({
        vid: '44ca31d0c49533180a8c987f7503892d_4',
        wrap: '#myAudioPlayer2',
        skin: 'grey'
    });
</script>
</body>
</html>
