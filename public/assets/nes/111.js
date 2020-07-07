var gameid = 3882, gameurl = "/fcrom/gd/Teenage Mutant Hero Turtles - Tournament Fighters (E) [!].nes",
    gamename = "激龟快打(忍者神龟格斗)欧版", gamepic = "/fcpic/gd/2254a.png", roomid = "a61def9768da45bfb724009ce9113918",
    title = "一起玩个痛快", roompassword = "", avatar = "/f.png", nickname = "手机玩家";

function showplayer(n, e, t) {
    1 == e ? $("#player" + n).addClass("show-players") : $("#player" + n).removeClass("show-players")
}

function showLoading(n) {
    0 == n ? ($(".loading-ani").hide(), $("#loading-font").hide()) : ($(".loading-ani").show(), $("#loading-font").show())
}

function initmenu() {
    var n = $(window).height() / 7;
    $(".menu .item").css({
        width: n + "px",
        height: n + "px",
        "line-height": n + "px"
    }), $("#closeChatModel").click(function () {
        closemenu(), $(".tab-pane-bg").hide()
    }), $("#menu_btn_cheat").click(function () {
        closemenu(), $("#cheatscontent").show()
    }), $("#menu_btn_reload").click(function () {
        closemenu(), nes.reloadROM()
    }), $("#menu_btn_chat").click(function () {
        closemenu(), $(".tab-pane-bg").show()
    }), $("#menu_btn_full").click(function () {
        if (closemenu(), "1" == $("#menu_btn_full").attr("screen")) {
            $("#menu_btn_full").attr("screen", "0");
            var n = $(window).width(), e = $(window).height(), t = .9375 * n;
            $("#nes-canvas").css({
                width: t + "px",
                height: n + "px",
                top: (e - t) / 2 + "px",
                left: (n - t) / 2 + "px"
            }), $("#menu_btn_full p").text("全屏")
        } else {
            $("#menu_btn_full").attr("screen", "1");
            n = $(window).width(), e = $(window).height(), t = .9375 * n;
            $("#nes-canvas").css({
                width: $(window).height() + "px",
                top: (e - t) / 2 + "px",
                left: (n - e) / 2 + "px"
            }), $("#menu_btn_full p").text("缩小")
        }
    }), $("#closecheatsModel").click(function () {
        $("#cheatscontent").hide()
    }), $(".menu-toggle").on("click", function () {
        closemenu()
    })
}

function closemenu() {
    $("#joystick_btn_menu").removeClass("active"), $(".menu").hide()
}

$(document).ready(function () {
    initmenu(), mobile_init()
})
