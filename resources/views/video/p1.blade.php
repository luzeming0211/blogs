<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width">
    <title>Peer-to-Peer Cue System --- Sender</title>
    <link rel="stylesheet" href="{{asset('assets/video')}}/style.css">
</head>
<body>
<h1>Peer-to-Peer Cue System --- Sender</h1>

<table class="control">
    <tr>
        <td class="title">Status:</td>
        <td class="title">Messages:</td>
    </tr>
    <tr>
        <td>
            <span style="font-weight: bold">ID: </span>
            <input type="text" id="receiver-id" title="Input the ID from receive.html">
            <button id="connect-button">Connect</button>
        </td>
        <td>
            <input type="text" id="sendMessageBox" placeholder="Enter a message..." autofocus="true" />
            <button type="button" id="sendButton">Send</button>
            <button type="button" id="clearMsgsButton">Clear Msgs (Local)</button>
        </td>
    </tr>
    <tr>
        <td><div id="status" class="status"></div></td>
        <td><div class="message" id="message"></div></td>
    </tr>
    <tr>
        <td>
            <button type="button" class="control-button" id="resetButton">Reset</button>
        </td>
        <td>
            <button type="button" class="control-button" id="goButton">Go</button>
        </td>
    </tr>
    <tr>
        <td>
            <button type="button" class="control-button" id="fadeButton">Fade</button>
        </td>
        <td>
            <button type="button" class="control-button" id="offButton">Off</button>
        </td>
    </tr>
    <tr>
        <td>
            <video id="video_div" controls="controls" src="{{ asset('assets') }}/1.mp4" style="width: 200px" autoplay></video>
{{--            <video id="video_div" autoplay playsinline></video>--}}
        </td>
        <td>
            <button id="video_send">发送</button>
        </td>
    </tr>
</table>

{{--<script src="https://cdn.jsdelivr.net/npm/peerjs@1.2.0/dist/peerjs.min.js"></script>--}}
<script src="https://cdn.bootcdn.net/ajax/libs/peerjs/1.2.0/peerjs.js"></script>
<script type="text/javascript">
    (function () {

        var lastPeerId = null;
        var peer = null; // own peer object
        var conn = null;
        var recvIdInput = document.getElementById("receiver-id");
        var status = document.getElementById("status");
        var message = document.getElementById("message");
        var goButton = document.getElementById("goButton");
        var resetButton = document.getElementById("resetButton");
        var fadeButton = document.getElementById("fadeButton");
        var offButton = document.getElementById("offButton");
        var sendMessageBox = document.getElementById("sendMessageBox");
        var sendButton = document.getElementById("sendButton");
        var clearMsgsButton = document.getElementById("clearMsgsButton");
        var connectButton = document.getElementById("connect-button");
        var sendVideo = document.getElementById("video_div");
        var cueString = "<span class=\"cueMsg\">Cue: </span>";

        /**
         * Create the Peer object for our end of the connection.
         *
         * Sets up callbacks that handle any events related to our
         * peer object.
         */
        function initialize() {
            // Create own peer object with connection to shared PeerJS server
            peer = new Peer(null, {
                host: 'laravel.test',
                port: 9000,
                debug: 3,
                path: '/myapp'
            });

            peer.on('open', function (id) {
                // Workaround for peer.reconnect deleting previous id
                if (peer.id === null) {
                    console.log('Received null id from peer open');
                    peer.id = lastPeerId;
                } else {
                    lastPeerId = peer.id;
                }

                console.log('ID: ' + peer.id);
            });
            peer.on('connection', function (c) {
                // Disallow incoming connections
                c.on('open', function() {
                    c.send("Sender does not accept incoming connections");
                    setTimeout(function() { c.close(); }, 500);
                });
            });
            peer.on('disconnected', function () {
                status.innerHTML = "Connection lost. Please reconnect";
                console.log('Connection lost. Please reconnect');

                // Workaround for peer.reconnect deleting previous id
                peer.id = lastPeerId;
                peer._lastServerId = lastPeerId;
                peer.reconnect();
            });
            peer.on('close', function() {
                conn = null;
                status.innerHTML = "Connection destroyed. Please refresh";
                console.log('Connection destroyed');
            });
            peer.on('error', function (err) {
                console.log(err);
                alert('' + err);
            });
        };

        /**
         * Create the connection between the two Peers.
         *
         * Sets up callbacks that handle any events related to the
         * connection and data received on it.
         */
        function join() {
            // // Close old connection
            // if (conn) {
            //     conn.close();
            // }

            // Create connection to destination peer specified in the input field
            // conn = peer.connect(recvIdInput.value, {
            //     reliable: true
            // });


            //
            // navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
            //     const call = peer.call(recvIdInput.value, stream);
            //     call.on('stream', (remoteStream) => {
            //        console.log('remoteStream');
            //        console.log(remoteStream);
            //     });
            // }, (err) => {
            //     console.error('Failed to get local stream', err);
            // });
            // navigator.mediaDevices.getUserMedia({video: true, audio: true})
            //     .then(function(stream) {
            //         /* 使用这个stream stream */
            //         console.log(2222);
            //         var  video = document.querySelector('video');
            //         var videoTracks = stream.getVideoTracks();
            //         window.stream = stream;
            //         video.srcObject = stream;
            //         console.log(333);
            //
            //         const call = peer.call(recvIdInput.value, stream);
            //         call.on('stream', (remoteStream) => {
            //             console.log('remoteStream');
            //             console.log(remoteStream);
            //         });
            //     })
            //     .catch(function(err) {
            //         /* 处理error */
            //         console.log('err');
            //         console.log(err);
            //     });
            var leftVideo = document.getElementById('video_div');

            var video_stream = leftVideo.captureStream();

            const call = peer.call(recvIdInput.value, video_stream);
            call.on('stream', (remoteStream) => {
                console.log('remoteStream');
                console.log(remoteStream);
            });
            // conn.on('open', function () {
            //     status.innerHTML = "Connected to: " + conn.peer;
            //     console.log("Connected to: " + conn.peer);
            //
            //     // Check URL params for comamnds that should be sent immediately
            //     var command = getUrlParam("command");
            //     if (command)
            //         conn.send(command);
            // });
            // Handle incoming data (messages only since this is the signal sender)
            // conn.on('data', function (data) {
            //     addMessage("<span class=\"peerMsg\">Peer:</span> " + data);
            // });
            // conn.on('close', function () {
            //     status.innerHTML = "Connection closed";
            // });
        };

        /**
         * Get first "GET style" parameter from href.
         * This enables delivering an initial command upon page load.
         *
         * Would have been easier to use location.hash.
         */
        function getUrlParam(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.href);
            if (results == null)
                return null;
            else
                return results[1];
        };

        /**
         * Send a signal via the peer connection and add it to the log.
         * This will only occur if the connection is still alive.
         */
        function signal(sigName) {
            if (conn && conn.open) {
                conn.send(sigName);
                console.log(sigName + " signal sent");
                addMessage(cueString + sigName);
            } else {
                console.log('Connection is closed');
            }
        }

        goButton.addEventListener('click', function () {
            signal("Go");
        });
        resetButton.addEventListener('click', function () {
            signal("Reset");
        });
        fadeButton.addEventListener('click', function () {
            signal("Fade");
        });
        offButton.addEventListener('click', function () {
            signal("Off");
        });

        function addMessage(msg) {
            var now = new Date();
            var h = now.getHours();
            var m = addZero(now.getMinutes());
            var s = addZero(now.getSeconds());

            if (h > 12)
                h -= 12;
            else if (h === 0)
                h = 12;

            function addZero(t) {
                if (t < 10)
                    t = "0" + t;
                return t;
            };

            message.innerHTML = "<br><span class=\"msg-time\">" + h + ":" + m + ":" + s + "</span>  -  " + msg + message.innerHTML;
        };

        function clearMessages() {
            message.innerHTML = "";
            addMessage("Msgs cleared");
        };

        // Listen for enter in message box
        sendMessageBox.addEventListener('keypress', function (e) {
            var event = e || window.event;
            var char = event.which || event.keyCode;
            if (char == '13')
                sendButton.click();
        });
        // Send message
        sendButton.addEventListener('click', function () {
            if (conn && conn.open) {
                var msg = sendMessageBox.value;
                sendMessageBox.value = "";
                conn.send(msg);
                console.log("Sent: " + msg);
                addMessage("<span class=\"selfMsg\">Self: </span> " + msg);
            } else {
                console.log('Connection is closed');
            }
        });

        // Clear messages box
        clearMsgsButton.addEventListener('click', clearMessages);
        // Start peer connection on click
        connectButton.addEventListener('click', join);

        // Since all our callbacks are setup, start the process of obtaining an ID
        initialize();
    })();
</script>
</body>
</html>

