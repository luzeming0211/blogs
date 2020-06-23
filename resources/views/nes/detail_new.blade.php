<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="Keywords" content="小霸王,红白机,FC游戏,FC游戏在线玩,FC游戏联机,红白机,nes游戏,nes游戏,nes游戏在线玩">
    <link rel="shortcut icon" href="/f.png">
    <title>雪人兄弟</title>
    <link
            href="{{asset('assets/nes_new')}}/css/bootstrap.min.css"
            rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/nes_new')}}/css/font-awesome.min.css"
          type="text/css">
    <link rel="stylesheet" href="{{asset('assets/nes_new')}}/css/play-940d1153b8f4df9def467f2547099e75.css">

    <style type="text/css">
        .info-msg,
        .success-msg,
        .warning-msg,
        .error-msg {
            margin: 10px 0;
            padding: 10px;
            border-radius: 3px 3px 3px 3px;
        }

        .info-msg {
            color: #059;
            background-color: #BEF;
        }

        #savelist, #cheatlist {
            list-style-type: none;
            /* max-width: 500px; */
            margin: 0 auto;
            padding: 0 15px;
        }

        #savelist > li, #cheatlist > li {
            background: white;
            margin-top: 5px;
            border-radius: 8px;
            overflow: hidden;
            padding: 8px;
            position: relative;
        }

        .avatar {
            background: #eaeaea;
            border-radius: 4px;
            display: inline-block;
            width: 5.5rem;
            height: 5.5rem;
        }

        .name {
            margin-right: 50px;
            margin-left: 20px;
            position: absolute;
            font-size: 1.1em;
            font-weight: 600;
        }

        .time {
            left: 8.8rem;
            top: 4rem;
            position: absolute;
            font-size: 0.9em;
        }

        .right {
            position: absolute;
            right: 10px;
            top: 3rem;
        }

        .right2 {
            position: absolute;
            right: 70px;
            top: 3rem;
        }

        .tenant-model {
            display: none;
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .tenant-model-content {
            border-radius: 10px;
            /* background-color: #000; */
            position: absolute;
            /*resize: both;*/
            display: none;
            z-index: 100;
        }

        .tenant-model-header {
            height: 10px;
            box-sizing: border-box;
            /* border-bottom: 1px solid #ccc; */
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #closeModel, #closecontroller, #closeChatModel, .closebtn {
            color: #b7b7b7;
            font-size: 50px;
            font-weight: bold;
            transition: all 0.3s;
        }

        #closeModel:hover, #closeModel:focus, .closebtn:hover, .closebtn:focus {
            color: #95b4ed;
            text-decoration: none;
            cursor: pointer;
        }

        #closecontroller:hover, #closecontroller:focus {
            color: #95b4ed;
            text-decoration: none;
            cursor: pointer;
        }

        #closeChatModel:hover, #closeChatModel:focus {
            color: #95b4ed;
            text-decoration: none;
            cursor: pointer;
        }

        .tenant-model-body {
            padding: 10px;
            font-size: 16px;
            box-sizing: border-box;
        }

        .opbtn {
            width: 10px;
            position: absolute;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        }

        .btn-outline {
            margin-top: 10px;
            color: #563d7c;
            background-color: transparent;
            border-color: #563d7c;
        }

        .btn-outline:hover,
        .btn-outline:focus,
        .btn-outline:active {
            color: #fff;
            background-color: #563d7c;
            border-color: #563d7c;
        }

        .chat .message {
            position: relative;
            padding: 6px 10px;
            font-size: 12px;
            line-height: 18px;
            word-wrap: break-word;
            background: #fff;
            border-bottom: 1px solid #e6e6e6;
        }

        .chat .messages {
            color: #282828;

            top: 0;
            bottom: 38px;
            width: 100%;
            overflow: auto;
            overflow-y: auto;
        }

        .chat .message.bg-change {
            background-color: #eee;
        }

        .chat ul li:nth-child(odd) {
            background-color: #eee;
        }

        .message .speaker, .message .textContainer {
            margin-left: 30px;
        }

        .message .speaker, .message .subject {
            font-weight: bold;
        }

        .message .avatar, .suggestion .avatar {
            position: absolute;
            top: 8px;
            left: 0;
            width: 40px;
            height: 30px;
            background-size: auto 30px;
            background-position: center center;
            background-repeat: no-repeat;
            background-color: transparent;
            overflow: hidden;
        }

        .chat-footer {
            position: relative;
            padding: 10px 10px;
            bottom: 0;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            box-sizing: border-box;
            background-color: #EFEFF4;
        }

        .chat-footer-box {
            position: relative;
            padding-left: 10px;
            padding-right: 10px;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            border: 1px solid #E6E6EA;
            box-sizing: border-box;
            background: #FFFFFF;
        }

        .chat-input {
            outline: none;
            /* padding: 5px 0; */
            width: 100%;
            height: 2.4em;
            border: 0;
            font-size: 13px;
            line-height: 2.4em;
            box-sizing: content-box;
            background: transparent;
        }

        .tab-pane {
            /* top: 42px;
           bottom: 0;
           left: 0;
           right: 0; */
            width: 280px;
            height: 280px;
            z-index: 100;
            margin: 10px;
            overflow-y: auto;
            position: relative;
            background: #eee;
            overflow-x: hidden;
            border-radius: 2px;
        }

        .tab-pane-bg {
            border-radius: 10px;
            background-color: rgb(78, 54, 107);
            width: 300px;
            position: absolute;
            left: calc(50% - 400px);
            /*resize: both;*/
            z-index: 100;
            cursor: move;
        }

        .messages {
            height: 220px;
        }

        .msg-coming {
            -webkit-animation: twinkling 1s infinite ease-in-out
        }

        .animated {
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both
        }

        @-webkit-keyframes twinkling {
            0% {
                opacity: 0.5;
            }
            100% {
                opacity: 1;
            }
        }

        @keyframes twinkling {
            0% {
                opacity: 0.5;
            }
            100% {
                opacity: 1;
            }
        }

        @media (min-width: 1400px) {
            .tab-pane {
                height: 480px;
            }

            .messages {
                height: 420px;
            }

            .tab-pane-bg {
                width: 400px;
            }

            .tab-pane {
                width: 380px;
            }
        }

        input[type="checkbox"] {
            position: absolute;
            opacity: 0;
        }

        input[type="checkbox"].ios-switch + div {
            vertical-align: middle;
            width: 40px;
            height: 20px;
            border: 1px solid rgba(0, 0, 0, .4);
            border-radius: 999px;
            background-color: rgba(0, 0, 0, 0.1);
            -webkit-transition-duration: .4s;
            -webkit-transition-property: background-color, box-shadow;
            box-shadow: inset 0 0 0 0px rgba(0, 0, 0, 0.4);
            margin-left: 180px;
        }

        input[type="checkbox"].bigswitch.ios-switch + div {
            width: 50px;
            height: 25px;
        }

        input[type="checkbox"].green.ios-switch:checked + div {
            background-color: #00e359;
            border: 1px solid rgba(0, 162, 63, 1);
            box-shadow: inset 0 0 0 10px rgba(0, 227, 89, 1);
        }

        input[type="checkbox"].ios-switch + div > div {
            float: left;
            width: 18px;
            height: 18px;
            border-radius: inherit;
            background: #ffffff;
            -webkit-transition-timing-function: cubic-bezier(.54, 1.85, .5, 1);
            -webkit-transition-duration: 0.4s;
            -webkit-transition-property: transform, background-color, box-shadow;
            -moz-transition-timing-function: cubic-bezier(.54, 1.85, .5, 1);
            -moz-transition-duration: 0.4s;
            -moz-transition-property: transform, background-color;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3), 0px 0px 0 1px rgba(0, 0, 0, 0.4);
            pointer-events: none;
            margin-top: 1px;
            margin-left: 1px;
        }

        input[type="checkbox"].bigswitch.ios-switch + div > div {
            width: 23px;
            height: 23px;
            margin-top: 1px;
        }

        input[type="checkbox"].bigswitch.ios-switch:checked + div > div {
            -webkit-transform: translate3d(25px, 0, 0);
            -moz-transform: translate3d(16px, 0, 0);
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3), 0px 0px 0 1px rgba(8, 80, 172, 1);
        }

        input[type="checkbox"].green.ios-switch:checked + div > div {
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 162, 63, 1);
        }

        .cheatlistcontain::-webkit-scrollbar { /*滚动条整体样式*/
            width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
        }

        .cheatlistcontain::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #b7b7b7;
        }

        .cheatlistcontain::-webkit-scrollbar-track { /*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background: #EDEDED;
        }

        #keyword-show, #gamepad-show {
            cursor: pointer;
        }

        .font-unlight {
            color: #97968e;
        }

    </style>

</head>

<body>
<div class="row">
    <div class="wall-bg">
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div class="wall-poster">
            <h1>game <span>over</span></h1>
            <i class="mr-akabei">
                <div class="mr-akabei-content">
                    <span class="mr-akabei-eye-first"></span>
                    <span class="mr-akabei-eye-second"></span>
                    <span class="mr-akabei-bottom-1"></span>
                    <span class="mr-akabei-bottom-2"></span>
                    <span class="mr-akabei-bottom-3"></span>
                    <span class="mr-akabei-bottom-4"></span>
                    <span class="mr-akabei-bottom-5"></span>
                    <span class="mr-akabei-bottom-6"></span>
                    <span class="mr-akabei-bottom-7"></span>
                </div>
                <i class="point-first"></i>
                <i class="point-second"></i>
                <i class="point-third"></i>
                <i class="point-four"></i>
                <i class="point-last"></i>
            </i>
            <i class="mr-pacman">
                <i class="point-first"></i>
                <i class="point-second"></i>
                <i class="point-third"></i>
                <i class="point-four"></i>
            </i>
            <span>1980</span>
        </div>
        <div class="wall-desk">
            <div class="timer">
                <i class="timer-shadow"></i>
                <div class="timer-content">
                    <div class="timer-hr">
                        <div class="timer-digits"></div>
                    </div>
                    <i class="timer-hr-right"></i>
                </div>
                <i class="timer-right"></i>
                <i class="timer-hr-first"></i>
                <i class="timer-hr-second"></i>
                <i class="timer-hr-third"></i>
                <i class="timer-hr-last"></i>
            </div>
            <i class="wall-desk-shadow"></i>
            <i class="wall-desk-bottom"></i>
            <i class="wall-desk-front"></i>
            <i class="wall-desk-right"></i>
        </div>
    </div>
    <div class="floor-bg">
        <div class="floor-hr"><i></i></div>
    </div>

    <div class="tv-content">
        <div class="tv">
            <div class="tv-top"><i class="item-left"></i><i class="item-right"></i></div>
            <div class="tv-shadow"></div>
            <div class="tv-right"></div>
            <div class="tv-bottom">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <i></i>
            </div>
            <div class="tv-screen">
                <a href="" class="pw-btn"></a>
                <div class="tv-hr">
                    <canvas id="nes-canvas" class="nes-screen" width="256" height="240"
                            style="width:100%;position: absolute;image-rendering: pixelated;image-rendering: optimizespeed;border-radius: 18px;"></canvas>
                    <div class="tv-hr-2">
                        <div class="tv-hr-3">
                            <div class="tv-glass">
                                <div class="tv-glass-vintage">
                                    <ul>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>

                                    <i class="tv-noise"></i><i class="tv-noise-second"></i> <i
                                            class="tv-glow"></i>
                                </div>
                            </div>
                            <div class="tv-flashing">
                                <i class="tv-flashing-left"></i> <i class="tv-flashing-bottom"></i>
                                <i class="tv-flashing-bottom-placeholder"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tv-desk">
            <i class="tv-desk-shadow"></i>
            <i class="tv-desk-item-left-shadow"></i>
            <i class="tv-desk-item-left"></i>
            <i class="tv-desk-item-right-shadow"></i>
            <i class="tv-desk-item-right"></i>
            <i class="tv-desk-item-rear-shadow"></i>
            <i class="tv-desk-item-rear"></i>
            <i class="tv-desk-top"></i>
            <i class="tv-desk-front"></i>
            <i class="tv-desk-right"></i>
        </div>
    </div>

    <div class="console">
        <i class="console-shadow"></i>
        <div class="console-top">
            <i class="console-game-top"></i>
            <div class="console-top-panel">
                <i class="console-top-panel-item-1"></i>
                <i class="console-top-panel-item-2"></i>
                <i class="console-top-panel-item-3"></i>
                <i class="console-top-panel-item-4"></i>
                <i class="console-top-panel-item-5"></i>
                <i class="console-top-panel-item-6"></i>
                <i class="console-top-panel-item-7"></i>
                <i class="console-top-panel-item-8"></i>
            </div>
        </div>
        <i class="console-right-top"></i>
        <i class="console-right-bottom"></i>
        <div class="console-front-panel">
            <div class="front-panel-top">
                <i class="console-game"></i>
                <i class="console-power-dark"></i>
            </div>
            <div class="front-panel-bottom">
                <i class="console-power-indicator"></i>
                <i class="console-btn-first"></i>
                <i class="console-btn-second"></i>
                <div class="console-power">
                    <div class="console-power-plug"><i></i></div>
                    <i class="console-power-cable"></i>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="opbtn">
    <button id="keybord_show" type="button" class="btn btn-lg btn-outline">按键设置</button>
    <button id="save_rom" type="button" class="btn btn-lg btn-outline">保存进度</button>
    <button id="max_screen1" type="button" class="btn btn-lg btn-outline">全屏显示</button>
    <button id="reload_rom" type="button" class="btn btn-lg btn-outline">重新加载</button>
    <button id="cheat_btn" type="button" class="btn btn-lg btn-outline">金手指</button>
</div>
<div class="tenant-model-content" id="saveContent">
    <header class="tenant-model-header">
        <span id="closeModel">×</span>
    </header>
    <div class="tenant-model-body">
        <div id="list">
            <ul id="savelist">
                <li id="s1">
                    <div class='avatar'></div>
                    <span class='name'>存档1</span>
                    <span class='time'>未存档</span>
                    <button type='button' class='right2 btn btn-success'>存档</button>
                </li>
                <li id="s2">
                    <div class='avatar'></div>
                    <span class='name'>存档2</span>
                    <span class='time'>未存档</span>
                    <button type='button' class='right2 btn btn-success'>存档</button>
                </li>
                <li id="s3">
                    <div class='avatar'></div>
                    <span class='name'>存档3</span>
                    <span class='time'>未存档</span>
                    <button type='button' class='right2 btn btn-success'>存档</button>
                </li>
            </ul>
        </div>
    </div>
</div>


<div class="tenant-model-content" id="cheatscontent"
     style="display:none;width:300px;background-color: rgb(78, 54, 107);cursor:move;">
    <header class="tenant-model-header">
        <span class="closebtn" id="closecheatsModel">×</span>
    </header>
    <div class="tenant-model-body">
        <div class="cheatlistcontain" style="height:300px;overflow-y:auto">
            <ul id="cheatlist">
            </ul>
        </div>
    </div>
</div>
<div style="width:350px; position: absolute;top: 20%;">


</div>
<img id="opimg" alt="" src="{{asset('assets/nes_new')}}/picture/gpd.png"
     style="position: absolute;z-index: 200; width:350px;display:none">
<div class="tenant-model-content" id="controllerContent">
    <header class="tenant-model-header">
        <span id="closecontroller">×</span>
    </header>
    <div class="tenant-model-body">
        <table id="keytable" tabIndex="-1" class="table" style="margin-bottom:0px;color:white">
            <thead>
            <tr>
                <th><i id="keyword-show" onclick="setControllerMode(0)" class="fa fa-keyboard-o">按键</i>&nbsp;|&nbsp;<i
                            id="gamepad-show" onclick="setControllerMode(1)" class="fa fa-gamepad font-unlight">手柄</i>
                </th>
                <th>玩家1</th>
                <th>玩家2</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>上</td>
                <td>W</td>
                <td>↑</td>
            </tr>
            <tr>
                <td>下</td>
                <td>S</td>
                <td>↓</td>
            </tr>
            <tr>
                <td>左</td>
                <td>A</td>
                <td>←</td>
            </tr>
            <tr>
                <td>右</td>
                <td>D</td>
                <td>→</td>
            </tr>
            <tr>
                <td>A</td>
                <td>K</td>
                <td>数字键盘2</td>
            </tr>
            <tr>
                <td>B</td>
                <td>J</td>
                <td>数字键盘1</td>
            </tr>
            <tr>
                <td>连击A</td>
                <td>I</td>
                <td>数字键盘5</td>
            </tr>
            <tr>
                <td>连击B</td>
                <td>U</td>
                <td>数字键盘4</td>
            </tr>
            <tr>
                <td>Start</td>
                <td>Enter</td>
                <td>无</td>
            </tr>
            <tr>
                <td>Select</td>
                <td>B</td>
                <td>无</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<script src="{{asset('assets/nes_new')}}/js/jquery.min.js"></script>
<script type="text/javascript" src="{{asset('assets/nes_new')}}/js/play-b4042d918f463eaaf846b77239552aca.js"></script>
<script type="text/javascript"
        src="{{asset('assets/nes_new')}}/js/play-0cdfbd043f9cb5325a0e5ec113f6204f-new.js"></script>
<script src="{{asset('assets/nes_new')}}/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="{{asset('assets/nes_new')}}/js/play-10e0778a0b61417ba80b58197e44c5ff.js"></script>
<script>
    function FullScreen() {
        var el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        }
        ;
    }

    document.addEventListener("mozfullscreenchange", fullback);
    document.addEventListener("webkitfullscreenchange", fullback);
    document.addEventListener("MSFullscreenChange", fullback);
    document.addEventListener("fullscreenchange", fullback);

    function fullback() {
        if (!checkFull()) {
            $('#nes-canvas').css({
                "width": $('.tv-hr').width() + "px",
                "height": $('.tv-hr').height() + "px",
                "left": "0px",
                "top": "0px"
            });
            $('.tab-pane-bg').show();
        }
    }


    var userAgent = navigator.userAgent;

    function checkFull() {
        var isFull = document.fullscreen || window.fullScreen || document.webkitIsFullScreen || document.msFullscreen || document.mozFullScreen;
        if (userAgent.indexOf("Chrome") > -1) {
            isFull = document.webkitIsFullScreen;
        }
        //to fix : false || undefined == undefined
        if (isFull === undefined) isFull = false;
        return isFull;
    }

    function setControllerMode(type) {
        if (type == 1) {
            window.issetBtn = true;
            $("#keyword-show").addClass("font-unlight");
            $("#gamepad-show").removeClass("font-unlight");
            initGampadKey();
        } else {
            window.issetBtn = false;
            $("#keyword-show").removeClass("font-unlight");
            $("#gamepad-show").addClass("font-unlight");
            initTableKey();
        }

    }

    $(document).ready(function () {
        initcheatmap();
        //startchat();
        $('#max_screen1').click(function (e) {
            $('.tab-pane-bg').hide();
            FullScreen();
            var topl = $('#nes-canvas').offset().top;
            var leftl = $('#nes-canvas').offset().left;
            var topadd = window.screen.height - $(window).height();
            $('#nes-canvas').css({
                "width": $(window).width() + "px",
                "height": window.screen.height + "px",
                "top": -topl - topadd + 'px',
                "left": -leftl + 'px',
                "z-index": 200
            });
        });
        // 开始游戏
        $('#start_multi_btn').click(function () {
            var u = "";
            //startMulti(u);
        })

        $(".tab-pane-bg").draggable({containment: "parent", scroll: false});
        $("#cheatscontent").draggable({containment: "parent", scroll: false});
        $("#controllerContent").draggable({containment: "parent", scroll: false});
        $('html').addClass('show-player');
        $('.tv-hr-2').hide();
        $('.tv-content').css({"left": $(window).width() / 3 + "px"});
        $('#nes-canvas').css({"width": $('.tv-hr').width() + "px", "height": $('.tv-hr').height() + "px"});
        $('#closeChatModel').click(function () {
            if ($('#closeChatModel').text() == '×') {
                $('.tab-pane').hide();
                $('#closeChatModel').text('+');
            } else {
                $('.tab-pane').show();
                $('#closeChatModel').text('×');
            }

        });
        $('#closecheatsModel').click(function () {
            $('#cheatscontent').hide();
        });
        $('#cheat_btn').click(function () {
            $('#cheatscontent').show();
        });

        $("#keytable tr td:not(:nth-child(1))").click(function () {
            if (window.issetBtn) {
                initGampadKey();
            } else {
                initTableKey();
            }

            $("#keytable").unbind("keydown");
            $("#keytable").focus();
            var h = $(this).parent("tr").prevAll().length;
            var l = $(this).prevAll().length;
            window.hassetpad = true;
            $(this).html("按下按键设置");
            if (window.issetBtn) {
                window.seth = h + 1;
                window.setl = l + 1;
            } else {
                $("#keytable").keydown(function (e) {

                    changeKey(e.key.toUpperCase(), e.keyCode, h + 1, l + 1);
                });
            }

        });
        nes_load_url("nes-canvas", "{{ getFileUrl($nes->game)}}");
        initSavelistPC(4511);
        initCheatCon();
        startPolling();
        //nes_load_url("nes-canvas", "roms/U30S.nes");
        // TIME
        setInterval(function () {
            var dt = new Date(),
                hours = dt.getHours(),
                minutes = dt.getMinutes();

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            var time = hours + ":" + minutes;

            $('.timer-digits').html(time);
        }, 1000);
    });
    setTimeout(savehistory, 10000);
</script>
</body>

</html>
