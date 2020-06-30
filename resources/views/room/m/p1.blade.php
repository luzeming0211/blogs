<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,inimal-ui,maximum-scale=1, user-scalable=0" />
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="小霸王-其乐无穷">
    <title>雪人兄弟</title>
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/font-awesome.min.css" type="text/css">
    <link
        href="{{asset('assets/nes_m')}}/css/bootstrap.min.css"
        rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/nes_m')}}/css/play-mobile-9d5feb7998bea67e6fe1489c45a3df36.css">

    <style type="text/css">
        * {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        [contenteditable="true"], input, textarea {
            -webkit-user-select: auto!important;
            -khtml-user-select: auto!important;
            -moz-user-select: auto!important;
            -ms-user-select: auto!important;
            -o-user-select: auto!important;
            user-select: auto!important;
        }
        .button {
            -webkit-box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.5), 0px 1px
            2px rgba(0, 0, 0, 0.15);
            -moz-box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.5), 0px 1px 2px
            rgba(0, 0, 0, 0.15);
            box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.5), 0px 1px 2px
            rgba(0, 0, 0, 0.15);
            background-color: #eeeeee;
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #fbfbfb),
            color-stop(100%, #e1e1e1));
            background: -webkit-linear-gradient(top, #fbfbfb, #e1e1e1);
            background: -moz-linear-gradient(top, #fbfbfb, #e1e1e1);
            background: -o-linear-gradient(top, #fbfbfb, #e1e1e1);
            background: linear-gradient(top, #fbfbfb, #e1e1e1);
            display: -moz-inline-stack;
            display: inline-block;
            vertical-align: middle;
            *vertical-align: auto;
            zoom: 1;
            *display: inline;
            border: 1px solid #d4d4d4;
            height: 32px;
            line-height: 32px;
            padding: 0px 25.6px;
            font-weight: 300;
            font-size: 14px;
            font-family: "HelveticaNeue-Light", "Helvetica Neue Light",
            "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
            color: #666666;
            text-shadow: 0 1px 1px white;
            margin: 0;
            text-decoration: none;
            text-align: center;
        }

        .button:hover {
            background-color: #eeeeee;
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #ffffff),
            color-stop(100%, #dcdcdc));
            background: -webkit-linear-gradient(top, #ffffff, #dcdcdc);
            background: -moz-linear-gradient(top, #ffffff, #dcdcdc);
            background: -o-linear-gradient(top, #ffffff, #dcdcdc);
            background: linear-gradient(top, #ffffff, #dcdcdc);
        }

        .button:active {
            -webkit-box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.3), 0px 1px 0px
            white;
            -moz-box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.3), 0px 1px 0px white;
            box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.3), 0px 1px 0px white;
            text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.4);
            background: #eeeeee;
            color: #bbbbbb;
        }

        input.button, button.button {
            height: 34px;
            cursor: pointer;
        }

        .button-block {
            display: block;
        }

        .button.disabled, .button.disabled:hover, .button.disabled:active, input.button:disabled,
        button.button:disabled {
            -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
            -moz-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
            background: #EEE;
            border: 1px solid #dddddd;
            text-shadow: 0 1px 1px white;
            color: #CCC;
            cursor: default;
        }

        .button-wrap {
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #e3e3e3),
            color-stop(100%, #f2f2f2));
            background: -webkit-linear-gradient(top, #e3e3e3, #f2f2f2);
            background: -moz-linear-gradient(top, #e3e3e3, #f2f2f2);
            background: -o-linear-gradient(top, #e3e3e3, #f2f2f2);
            background: linear-gradient(top, #e3e3e3, #f2f2f2);
            -webkit-border-radius: 200px;
            -moz-border-radius: 200px;
            -ms-border-radius: 200px;
            -o-border-radius: 200px;
            border-radius: 200px;
            -webkit-box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.04);
            -moz-box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.04);
            box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.04);
            padding: 10px;
            display: inline-block;
        }

        .button-circle {
            -webkit-border-radius: 240px;
            -moz-border-radius: 240px;
            -ms-border-radius: 240px;
            -o-border-radius: 240px;
            border-radius: 240px;
            -webkit-box-shadow: inset 0px 1px 1px rgba(255, 255, 255, 0.5), 0px 1px
            2px rgba(0, 0, 0, 0.2);
            -moz-box-shadow: inset 0px 1px 1px rgba(255, 255, 255, 0.5), 0px 1px 2px
            rgba(0, 0, 0, 0.2);
            box-shadow: inset 0px 1px 1px rgba(255, 255, 255, 0.5), 0px 1px 2px
            rgba(0, 0, 0, 0.2);
            width: 120px;
            line-height: 120px;
            height: 120px;
            padding: 0px;
            border-width: 4px;
            font-size: 18px;
        }

        .button-primary {
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #00b5e5),
            color-stop(100%, #008db2));
            background: -webkit-linear-gradient(top, #00b5e5, #008db2);
            background: -moz-linear-gradient(top, #00b5e5, #008db2);
            background: -o-linear-gradient(top, #00b5e5, #008db2);
            background: linear-gradient(top, #00b5e5, #008db2);
            background-color: #00a1cb;
            border-color: #007998;
            color: white;
            text-shadow: 0 -1px 1px rgba(0, 40, 50, 0.35);
        }

        .button-primary:hover {
            background-color: #00a1cb;
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #00c9fe),
            color-stop(100%, #008db2));
            background: -webkit-linear-gradient(top, #00c9fe, #008db2);
            background: -moz-linear-gradient(top, #00c9fe, #008db2);
            background: -o-linear-gradient(top, #00c9fe, #008db2);
            background: linear-gradient(top, #00c9fe, #008db2);
        }

        .button-primary:active {
            background: #1495b7;
            color: #005065;
        }

        .button-action {
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #8fcf00),
            color-stop(100%, #6b9c00));
            background: -webkit-linear-gradient(top, #8fcf00, #6b9c00);
            background: -moz-linear-gradient(top, #8fcf00, #6b9c00);
            background: -o-linear-gradient(top, #8fcf00, #6b9c00);
            background: linear-gradient(top, #8fcf00, #6b9c00);
            background-color: #7db500;
            border-color: #5a8200;
            color: white;
            text-shadow: 0 -1px 1px rgba(19, 28, 0, 0.35);
        }

        .button-action:hover {
            background-color: #7db500;
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #a0e800),
            color-stop(100%, #6b9c00));
            background: -webkit-linear-gradient(top, #a0e800, #6b9c00);
            background: -moz-linear-gradient(top, #a0e800, #6b9c00);
            background: -o-linear-gradient(top, #a0e800, #6b9c00);
            background: linear-gradient(top, #a0e800, #6b9c00);
        }

        .button-action.active {
            background: #76a312;
            color: #374f00;
        }

        .button-highlight {
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #fa9915),
            color-stop(100%, #d87e04));
            background: -webkit-linear-gradient(top, #fa9915, #d87e04);
            background: -moz-linear-gradient(top, #fa9915, #d87e04);
            background: -o-linear-gradient(top, #fa9915, #d87e04);
            background: linear-gradient(top, #fa9915, #d87e04);
            background-color: #f18d05;
            border-color: #bf7004;
            color: white;
            text-shadow: 0 -1px 1px rgba(91, 53, 2, 0.35);
        }

        .button-highlight:hover {
            background-color: #f18d05;
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #fba42e),
            color-stop(100%, #d87e04));
            background: -webkit-linear-gradient(top, #fba42e, #d87e04);
            background: -moz-linear-gradient(top, #fba42e, #d87e04);
            background: -o-linear-gradient(top, #fba42e, #d87e04);
            background: linear-gradient(top, #fba42e, #d87e04);
        }

        .button-highlight:active {
            background: #d8891e;
            color: #8d5303;
        }

        .button-caution {
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #e8543f),
            color-stop(100%, #d9331a));
            background: -webkit-linear-gradient(top, #e8543f, #d9331a);
            background: -moz-linear-gradient(top, #e8543f, #d9331a);
            background: -o-linear-gradient(top, #e8543f, #d9331a);
            background: linear-gradient(top, #e8543f, #d9331a);
            background-color: #e54028;
            border-color: #c22d18;
            color: white;
            text-shadow: 0 -1px 1px rgba(103, 24, 13, 0.35);
        }

        .button-caution:hover {
            background-color: #e54028;
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #eb6855),
            color-stop(100%, #d9331a));
            background: -webkit-linear-gradient(top, #eb6855, #d9331a);
            background: -moz-linear-gradient(top, #eb6855, #d9331a);
            background: -o-linear-gradient(top, #eb6855, #d9331a);
            background: linear-gradient(top, #eb6855, #d9331a);
        }

        .button-caution:active {
            background: #cd5240;
            color: #952312;
        }

        .button-royal {
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #99389f),
            color-stop(100%, #752a79));
            background: -webkit-linear-gradient(top, #99389f, #752a79);
            background: -moz-linear-gradient(top, #99389f, #752a79);
            background: -o-linear-gradient(top, #99389f, #752a79);
            background: linear-gradient(top, #99389f, #752a79);
            background-color: #87318c;
            border-color: #632466;
            color: white;
            text-shadow: 0 -1px 1px rgba(26, 9, 27, 0.35);
        }

        .button-royal:hover {
            background-color: #87318c;
            background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #ab3eb2),
            color-stop(100%, #752a79));
            background: -webkit-linear-gradient(top, #ab3eb2, #752a79);
            background: -moz-linear-gradient(top, #ab3eb2, #752a79);
            background: -o-linear-gradient(top, #ab3eb2, #752a79);
            background: linear-gradient(top, #ab3eb2, #752a79);
        }

        .button-royal.active {
            background: #764479;
            color: #3e1740;
        }

        #joystick_btn_A, #joystick_btn_B, #joystick_btn_X, #joystick_btn_Y,#joystick_btn_AB,#joystick_btn_home,
        #joystick_btn_menu,#joystick_btn_choice, #joystick_btn_start,#joystick_btn_menu,#start_multi_btn {
            position: absolute;
        }
        .joystick_btn_op_1{
            opacity: 0.7;
        }
        .joystick_btn_op_2{
            opacity: 0.8;
        }

        #psp .interaction-area {
            opacity: 0.8;
            /* === Form & Shape === */
            width: 150px;
            height: 150px;
            border-radius: 50%;
            /* === Positioning === */
            position: absolute;
            /*top: 100px;*/
            /* === Additionals === */
            background: #222;
            /*border: 2px solid rgba(0,0,0, .35);*/
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 0 0 3px
            rgba(0, 0, 0, 0.35);
            z-index: 99;
            /* END: Button */
        }

        #psp .interaction-area>button {
            outline: none;
            background: #222;
            border: 0;
            width: 45px;
            height: 55px;
            color: whiteSmoke;
            position: absolute;
            font-size: 1.6rem;
            z-index: 4;
            line-height: 0.8;
            padding-bottom: 1.8rem;
            /*border-radius: 580% 580% 800% 800%;*/
            border-top-left-radius: 30%;
            border-top-right-radius: 30%;
            box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.55), inset 0 4px 0px 1px
            rgba(255, 255, 255, 0.05);
        }
        .xbutton{
            outline: none;
            background: #222;
            border: 0;
            width: 45px;
            height: 55px;
            color: whiteSmoke;
            position: absolute;
            font-size: 1.6rem;
            z-index: 4;
            line-height: 0.8;
            padding-bottom: 1.8rem;
            border-radius: 50%;
            vertical-align: middle;
            text-decoration: none;
            text-align: center;
            box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.55), inset 0 4px 0px 1px
            rgba(255, 255, 255, 0.05);
        }

        .xbutton.active {
            background: rgba(99, 99, 99, 0.25);
        }


        #psp .interaction-area>button:first-of-type {
            left: 52px;
            top: 1px;
        }

        #psp .interaction-area>button:nth-of-type(2) {
            left: 6px;
            top: 47px;
            transform: rotate(-90deg);
        }

        #psp .interaction-area>button:nth-of-type(3) {
            top: 47px;
            right: 6px;
            transform: rotate(90deg);
        }

        #psp .interaction-area>button:last-of-type {
            bottom: 1px;
            left: 52px;
            transform: rotate(180deg);
        }

        .joystickpad .left.pspbutton {
            padding: 0 1rem;
        }

        .joystickpad .left.pspbutton.active {
            background: rgba(99, 99, 99, 0.25);
        }

        .joystickpad .pspbutton {
            min-height: 25px;
            min-width: 25px;
            display: inline-block;
            background: rgba(0, 0, 0, 0.25);
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.55), inset 0 2px 0px 1px
            rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            border: 0;
            color: white;
            font-size: 1.6rem;
            padding: 0.7rem 0.5rem;
        }

        #psp .interaction-area .arrow.active {
            background: rgba(99, 99, 99, 0.25);
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.55), inset 0 1px 0px 1px
            rgba(255, 255, 255, 0.05);
        }

        #psp .interaction-area .darrow {
            outline: none;
            border: 0;
            width: 45px;
            height: 55px;
            color: transparent;
            position: absolute;
            z-index: 5;
        }

        .joystickpad .switch {
            height: 10px;
            width: 10px;
            z-index: 999;
            background: rgba(0, 0, 0, 0.25);
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);
            border-radius: 50%;
            position: absolute;
            transition: background 0.28s ease-in-out;
        }

        .joystickpad .switch:after {
            content: "☄";
            color: white;
            font-size: 2rem;
            left: 15px;
            top: -5px;
            position: absolute;
        }

        .joystickpad .switch:hover {
            background: #22FF22 !important;
        }

        #savelist ,#cheatlist{
            list-style-type: none;
            /* max-width: 500px; */
            margin: 0 auto;
            padding: 0 15px;
        }

        #savelist>li,#cheatlist>li {
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

        #closeModel ,#closeChatModel,.closebtn{
            color: #b7b7b7;
            font-size: 50px;
            font-weight: bold;
            transition: all 0.3s;
        }

        #closeModel:hover, #closeModel:focus,.closebtn:hover,.closebtn:focus  {
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
        #tips {
            font-size: 20px;
            position: absolute;
            background-color:rgba(0,0,0,0.5);
            border-radius:10px;
            color:white;
            text-align: center;
            line-height: 50px;
            height:50px;
        }
        .btn-icon{
            color:white
        }

        /**list style**/

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
        .chat ul li:nth-child(odd){background-color: #eee;}
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
            background-color:transparent;
            overflow: hidden;
        }
        .chat-footer{
            position: relative;
            padding: 10px 10px;
            bottom:0;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            box-sizing: border-box;
            background-color: #EFEFF4;
        }
        .chat-footer-box{
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
        .chat-footer-box>i{
            position: absolute;
            right:10px;
            top:10px;
        }
        .chat-input{
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
            /* width:380px;
            height:280px; */
            z-index: 100;
            margin:10px;
            overflow-y: auto;
            position: relative;
            background: #eee;
            overflow-x: hidden;
            border-radius: 2px;
        }
        .tab-pane-bg {
            border-radius: 10px;
            background: rgba(99, 99, 99, 0.25);
            width: 400px;
            position: absolute;
            /*resize: both;*/
            z-index: 100;
        }
        .messages{
            height: 220px;
        }
        .msg-coming{
            -webkit-animation: twinkling 1s infinite ease-in-out
        }
        .animated{
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both
        }
        @-webkit-keyframes twinkling{
            0%{
                opacity: 0.5;
            }
            100%{
                opacity: 1;
            }
        }
        @keyframes twinkling{
            0%{
                opacity: 0.5;
            }
            100%{
                opacity: 1;
            }
        }
        input[type="checkbox"] {
            position: absolute;
            opacity: 0;
        }
        input[type="checkbox"].ios-switch + div {
            vertical-align: middle;
            width: 40px;	height: 20px;
            border: 1px solid rgba(0,0,0,.4);
            border-radius: 999px;
            background-color: rgba(0, 0, 0, 0.1);
            -webkit-transition-duration: .4s;
            -webkit-transition-property: background-color, box-shadow;
            box-shadow: inset 0 0 0 0px rgba(0,0,0,0.4);
            margin-left: 180px;
        }
        input[type="checkbox"].bigswitch.ios-switch + div {
            width: 50px;	height: 25px;
        }
        input[type="checkbox"].green.ios-switch:checked + div {
            background-color: #00e359;
            border: 1px solid rgba(0, 162, 63,1);
            box-shadow: inset 0 0 0 10px rgba(0,227,89,1);
        }
        input[type="checkbox"].ios-switch + div > div {
            float: left;
            width: 18px; height: 18px;
            border-radius: inherit;
            background: #ffffff;
            -webkit-transition-timing-function: cubic-bezier(.54,1.85,.5,1);
            -webkit-transition-duration: 0.4s;
            -webkit-transition-property: transform, background-color, box-shadow;
            -moz-transition-timing-function: cubic-bezier(.54,1.85,.5,1);
            -moz-transition-duration: 0.4s;
            -moz-transition-property: transform, background-color;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3), 0px 0px 0 1px rgba(0, 0, 0, 0.4);
            pointer-events: none;
            margin-top: 1px;
            margin-left: 1px;
        }
        input[type="checkbox"].bigswitch.ios-switch + div > div {
            width: 23px; height: 23px;
            margin-top: 1px;
        }
        input[type="checkbox"].bigswitch.ios-switch:checked + div > div {
            -webkit-transform: translate3d(25px, 0, 0);
            -moz-transform: translate3d(16px, 0, 0);
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3), 0px 0px 0 1px rgba(8, 80, 172,1);
        }
        input[type="checkbox"].green.ios-switch:checked + div > div {
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 162, 63,1);
        }
        .cheatlistcontain::-webkit-scrollbar {
            width: 10px;
            height: 1px;
        }
        .cheatlistcontain::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: #b7b7b7;
        }
        .cheatlistcontain::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 10px;
            background: #EDEDED;
        }
        html, body {
            -webkit-overflow-scrolling: touch;
        }
        .menu {
            position: absolute;
            top: 0;
            right: -15px;
            list-style: none;
            margin: 0;
            padding: 0;
            transition: all .3s ease;
            perspective: 2000px;
            z-index:200;
            display:none;
        }

        .item {
            transform: rotate(90deg);
            background-color: #222;
            /*  border-top: 1px solid #182844;
             border-bottom: 1px solid #253149; */
            color: white;
            width: 71px;
            height: 71px;
            line-height: 71px;
            display: block;
            text-align: center;
            transition: transform .6s ease, background-color .1s .15s ease;
            position: relative;
            text-decoration: none;
            font-size: 1.5em;
        }
        .item:active {
            /* background-color: #d64a73; */
            color: white;
            transition: all .2s 0 ease;
        }
        .menu-toggle {
            font-size: 3em;
        }
        .menu--is-closed {
            pointer-events: none;
        }
        .menu--is-closed .item {
            transform-origin: right center;
            transform: rotateY(180deg);
            background-color: #272841;
        }
        .menutext{
            font-size: 13px;
            margin-top: -20px;
            text-decoration: none;
        }

    </style>
</head>

<body>
<div id="emulator">
    <canvas id="nes-canvas" class="nes-screen" width="256" height="240"
            style="width: 100%; position: absolute; image-rendering: pixelated; image-rendering: optimizespeed;"></canvas>
</div>
<div class="bg-model"
     style="position: absolute; top: 0%; left: 0%; display: none; background: rgba(0, 0, 0, 0.3); width: 100%; height: 100%; position: fixed; z-index: 9999">
    <div class='content'
         style="position: absolute; left: 35%; top: 25%; border-radius: 8px; width: 30%; height: 40%; background-color: #fff;">
    </div>
</div>
<div id="psp">
    <div class="interaction-area">
        <div class="darrow" id="joystick_leftup"></div>
        <div class="darrow" id="joystick_leftdown"></div>
        <div class="darrow" id="joystick_rightdown"></div>
        <div class="darrow" id="joystick_rightup"></div>
        <button id="joystick_left" class="arrow">▵</button>
        <button id="joystick_down" class="arrow">▵</button>
        <button id="joystick_up" class="arrow">▵</button>
        <button id="joystick_right" class="arrow">▵</button>
    </div>
</div>
<div class="joystickpad">
    <!-- <div  id="joystick_btn_saverom" class="left btn-icon"><i class="fa fa-save fa-3x"></i></div> -->
    <!-- <div  id="start_multi_btn" class="left btn-icon"><i class="fa fa-users fa-3x"></i></div> -->
    <!-- <a  href="/" id="joystick_btn_home" class="left pspbutton joystick_btn_op_1">主页</a> -->
    <div  id="joystick_btn_menu" class="left pspbutton joystick_btn_op_1">菜单</div>
    <div  id="joystick_btn_choice" class="left pspbutton joystick_btn_op_1">选择</div>
    <div  id="joystick_btn_start" class="left pspbutton joystick_btn_op_1">开始</div>
    <!-- <i  id="messageshow" class="fa fa-bars fa-2x" aria-hidden="true"></i> -->
    <div id="joystick_btn_X" class="xbutton joystick_btn_op_2">X</div>
    <div  id="joystick_btn_Y" class="xbutton joystick_btn_op_2">Y</div>
    <div  id="joystick_btn_A" class="xbutton joystick_btn_op_2">A</div>
    <div id="joystick_btn_B" class="xbutton joystick_btn_op_2">B</div>
    <div id="joystick_btn_AB" class="xbutton joystick_btn_op_2">AB</div>
</div>
<div class="tab-pane-bg" style="z-index:99;display:none">
    <header class="tenant-model-header">
        <span id="closeChatModel">×</span>
    </header>
    <div class="tab-pane chat">
        <ul class="messages" style="bottom: 36px;">


        </ul>
        <div class="chat-footer">
            <div class="chat-footer-box">
                <input autocomplete="off" id="word" class="chat-input"  placeholder="回车发送输入的消息" style="" maxlength="140">
                <i  id="mobile_send" class="fa fa-reply" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</div>
<div><ul class="menu">
        <li><a class="item item-0 menu-toggle"><i class="fa fa-times"></i><p class="menutext"></p></a></li>
        <li><a id="menu_btn_cheat" class="item item-1"><i class="fa fa-hand-pointer-o"></i><p class="menutext">金手指</p></a></li>
        <li><a id="menu_btn_full" sc="1" class="item item-2"><i class="fa fa-window-maximize"></i><p class="menutext">全屏</p></a></li>
        <li><a id="menu_btn_reload" class="item item-3"><i class="fa fa-refresh"></i><p class="menutext">重载</p></a></li>
        <li><a id="menu_btn_saverom" class="item item-5"><i class="fa fa-save"></i><p class="menutext">保存</p></a></li>
        <li><a id="menu_btn_chat" class="item item-5"><i class="fa fa-wechat"></i><p class="menutext">聊天</p></a></li>
        <li><a href="/" class="item item-7"><i class="fa fa-power-off"></i><p class="menutext">退出</p></a></li>
    </ul></div>
<div class="tenant-model-content" id="cheatscontent" style="display:none;background-color: rgba(34,34,34);">
    <header class="tenant-model-header">
        <span class="closebtn" id="closecheatsModel">×</span>
    </header>
    <div class="tenant-model-body">
        <div class="cheatlistcontain"  style="height:150px;overflow-y:auto">
            <ul id="cheatlist">
            </ul>
        </div>
    </div>
</div>
<div class="tenant-model-content" id="saveContent">
    <header class="tenant-model-header">
        <span id="closeModel">×</span>
    </header>
    <div class="tenant-model-body">
        <div id="list">
            <ul id="savelist">
                <div id="qrcode"></div>
            </ul>
        </div>
    </div>
</div>

<div id="tips"></div>
<script src="{{asset('assets/nes_m')}}/js/jquery.min.js"></script>
<script type="text/javascript" src="{{asset('assets/nes_m')}}/js/play-mobile-b4042d918f463eaaf846b77239552aca.js"></script>
<!--<script src="{{asset('assets/nes_m')}}/js/socket.io.js"></script>-->
<script type="text/javascript" src="{{asset('assets/nes_m')}}/js/play-mobile-9e6418b070162fc74f79a769f8a40c18.js"></script>
<!--<script type="text/javascript" src="{{asset('assets/nes_m')}}/js/43f22b766e50d9d86265f92f42759b9c.js"></script>-->
<script type="text/javascript" src="{{asset('assets/nes_m')}}/js/play-10e0778a0b61417ba80b58197e44c5ff.js"></script>
<!-- <script type="text/javascript" src="{{asset('assets/nes_m')}}/js/qrcode.min.js"></script> -->
<script type="text/javascript" src="{{asset('assets/nes_m')}}/js/ima3.js"></script>
<script type="text/javascript" src="{{asset('assets/nes_m')}}/js/g.ads.js"></script>
<script>
    function wScreen1(type) {
        var realWidth = $(window).width();
        var realHight = $(window).height();
        var maxWidth = window.screen.width;
        var maxHight = window.screen.height;
        var topadd = (maxHight-realHight)/2;
        if(type==0)
            topadd=-topadd;
        var nesWidth = realWidth * (240 / 256);
        var btnsize = realWidth / 5;
        var btnleft = (realHight + nesWidth) / 2;
        if ((btnleft + btnsize * 2 + 10) > realHight) {
            btnleft = btnleft - ((btnleft + btnsize * 2 + 15) - realHight)
        }
        if((btnleft + btnsize + btnmargin)> realHight){
            btnleft = realHight-btnsize -btnmargin;
        }
        var btntop = realWidth - btnsize * 2 - 20;
        var btnmargin = 5;
        $(".nes-screen").css({

            "top": (realHight - nesWidth) / 2 +topadd/2+ 'px',

        });

        $('#joystick_btn_AB').css({

            "top": btnleft + btnsize / 2 + btnmargin +topadd+   'px',

        });
        $('#joystick_btn_Y').css({

            "top": btnleft +topadd+ 'px',

        });
        $('#joystick_btn_X').css({

            "top": btnleft + btnsize + btnmargin +topadd+  'px',

        });
        $('#joystick_btn_B').css({

            "top": btnleft +topadd+'px',

        });
        $('#joystick_btn_A').css({

            "top": btnleft + btnsize + btnmargin +topadd+  'px',

        });

    }
    function initmenu(){
        var menusize=$(window).height()/7;
        $('.menu .item').css({'width':menusize+'px','height':menusize+'px','line-height':menusize+'px'});
        $('#closeChatModel').click(function(){
            closemenu();
            $('.tab-pane-bg').hide();
        });
        $('#menu_btn_cheat').click(function(){
            closemenu();
            $('#cheatscontent').show();
        });
        $('#menu_btn_reload').click(function(){
            closemenu();
            nes.reloadROM();
        });
        $('#menu_btn_chat').click(function(){
            closemenu();
            $('.tab-pane-bg').show();
        });

        function fullScreen() {
            var element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
        }
        function exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
        $('#menu_btn_full').click(function(){
            closemenu();
            var sc = $('#menu_btn_full').attr("screen");
            if(sc=='1'){
                $('#menu_btn_full').attr("screen","0");
                var realWidth = $(window).width();
                var realHight =$(window).height();
                var nesWidth = realWidth*(240/256);
                $(".nes-screen").css({"width":nesWidth+'px',"height":realWidth+'px',"top":(realHight-nesWidth)/2+'px',"left":((realWidth - nesWidth) / 2)+'px'} );
                $('#menu_btn_full p').text('全屏');
            }
            else{
                $('#menu_btn_full').attr("screen","1");
                var realWidth = $(window).width();
                var realHight =$(window).height();
                var nesWidth = realWidth*(240/256);
                $('.nes-screen').css({"width":$(window).height()+"px","top":(realHight-nesWidth)/2+'px',"left":((realWidth - realHight) / 2)+'px'});
                $('#menu_btn_full p').text('缩小');
            }
        });
        $('#closecheatsModel').click(function(){
            $('#cheatscontent').hide();
        });
        $('.menu-toggle').on('click', function(){
            closemenu();
        });
    }
    function closemenu(){
        $('#joystick_btn_menu').removeClass('active');
        $('.menu').hide();
    }
    var start_multi =false;
    $(document).ready(function() {
        initcheatmap();
        //startchat();
        initmenu();
        var token =getQueryString("token");
        if(token){
            stopnes();
            startMulti(token);
        }
        else{
            /* var qrcode = new QRCode(document.getElementById("qrcode"), {
                width : 100,
                height : 100
            }); */
            $('#start_multi_btn').click(function(){
                if(start_multi){
                    showQrcode();
                    return;
                }
                var u = "";
                $.post("getshort",
                    {
                        u:encodeURI(decodeURI(window.location.href)+"&token="+u),
                    },
                    function(data,status){
                        var url = eval(data);
                        if(url&&url.length>0){
                            console.log(url[0]);
                            var shortUrl=url[0].url_short;
                            qrcode.makeCode(shortUrl);
                            stopnes();
                            startMulti(u);
                            start_multi =true;
                        }
                    });
            })
            initCheatCon();
            initSavelist(4511);
        }
        mobile_init();
        nes_load_url("nes-canvas", "https://www.yikm.net/fcrom/xyx/Snow Bros. (J).nes");
        setTimeout(savehistory,10000);
    });
</script>
<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1277037530'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s96.cnzz.com/z_stat.php%3Fid%3D1277037530' type='text/javascript'%3E%3C/script%3E"));document.getElementById("cnzz_stat_icon_1277037530").style.display = "none"; </script>
<!--<div class="tenant-model-content" id="adscontent" style="display:block;background-color: rgba(34,34,34,0);">
                <header class="tenant-model-header">
                        <span class="closebtn" onClick="closeads()">×</span>
                </header>
                <div class="tenant-model-body" id="adsBody">
                <script>
                var date = new Date();
                var mon = date .getMonth();
                var day = date .getDate();
                var extime = mon+":"+day;
                var lextime = localStorage.getItem("adsexptime");
                if(extime !=lextime){
                        localStorage.setItem("adsexptime", extime);
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = 'https://js.qajypx.com/go/a/1/549.js';
						var adiv = document.createElement('div');
						adiv.id="yikmf";
                        var script2 = document.createElement('script');
                        script2.type = 'text/javascript';
                        script2.src = '//spl.ztvx8.com/chfazhy.js';
			var script3 = document.createElement('script');
                        script3.type = 'text/javascript';
                        script3.src = 'https://cdn.flowertt.com//image/9419';
                        var adsbody = document.getElementById('adsBody');
			adsbody.appendChild(script3);
                        adsbody.appendChild(script);
 adiv.appendChild(script2);
 adsbody.appendChild(adiv);
                }
                else{
                        document.getElementById("adscontent").style.display="none";
                }
                function closeads(){
                        document.getElementById("adscontent").style.display="none";
                }

                </script>
                </div>
        </div>-->
</body>
</html>
