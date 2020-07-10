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

/*window.onresize = function(){
    if(!checkFull()){
        $('#nes-canvas').css({"width":$('.tv-hr').width()+"px","height":$('.tv-hr').height()+"px","left":"0px","top":"0px"});
        $('.tab-pane-bg').show();
    }
}*/

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

function initcanvas() {
    $('#nes-canvas').css({"width": $('.tv-hr').width() + "px", "height": $('.tv-hr').height() + "px"});
}

var gameid = 3175;
var gameurl = "/fcrom/dzmx/Takahashi Meijin no Bouken Shima (J) [!].nes";
var gamename = '冒险岛(日版)';
var gamepic = "/fcpic/1001a.png";
var roomid = 'f6d406b8276644ae9509f00c9e7758bd';
var title = '一起玩个痛快';
var roompassword = '';
var avatar = 'http://thirdqq.qlogo.cn/g?b=oidb&k=AtwU3qNe8nX1bBTdABHPBA&s=40&t=1483407557';
var nickname = '俩王带仨二';

function showplayer(num, stat, data) {
    //$("#player"+num).css({"display":"block"});
    if (stat == 1) {
        $("#player" + num).addClass('show-players');
    } else {
        $("#player" + num).removeClass('show-players');
    }
}

function tagglePlayers(s) {
    if (s) {
        $("#player1").hide();
        $("#player2").hide();
    } else {
        $("#player1").show();
        $("#player2").show();
    }
}

$(document).ready(function () {
    //startchat(roomid);
    $('#max_screen1').click(function (e) {
        $('.tab-pane-bg').hide();
        FullScreen();
        tagglePlayers(true);
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

    $('#gamepad-show').hover(function () {
        $('#opimg').show();
    }, function () {
        $('#opimg').hide();
    });
    $('.opbtn').css({
        "left": ($('.tv-screen').offset().left + $('.tv-screen').width() + $('.tv-right').width()) + 'px'
    });
    $('#player1').css({
        "left": ($('.tv-screen').offset().left) + $('#player1').width() + 'px'
    });
    $('#player2').css({
        "left": ($('.tv-screen').offset().left) + $('.tv-screen').width() + $('#player1').width() + 'px'
    });
    $(".tab-pane-bg").draggable({containment: "parent", scroll: false});
    $("#cheatscontent").draggable({containment: "parent", scroll: false});
    $("#controllerContent").draggable({containment: "parent", scroll: false});
    //$('html').addClass('show-player');
    $('.tv-hr-2').hide();
    $('.tv-content').css({"left": $(window).width() / 3 + "px"});
    $('#closeChatModel').click(function () {
        if ($('#closeChatModel').text() == '×') {
            $('.tab-pane').hide();
            $('#closeChatModel').text('+');
        } else {
            $('.tab-pane').show();
            $('#closeChatModel').text('×');
        }

    });
    $("#keytable tr td:not(:nth-child(1))").click(function () {
        initTableKey();
        $("#keytable").unbind("keydown");
        $("#keytable").focus();
        var h = $(this).parent("tr").prevAll().length;
        var l = $(this).prevAll().length;
        $(this).html("按下按键");
        $("#keytable").keydown(function (e) {
            console.log(e);
            changeKey(e.key.toUpperCase(), e.keyCode, h + 1, l + 1);
        });
    });
    initSavelistPC(3175);
    startPolling();
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
