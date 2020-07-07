function wScreen1(type) {
    var realWidth = $(window).width();
    var realHight = $(window).height();
    var maxWidth = window.screen.width;
    var maxHight = window.screen.height;
    var topadd = (maxHight - realHight) / 2;
    if (type == 0)
        topadd = -topadd;
    var nesWidth = realWidth * (240 / 256);
    var btnsize = realWidth / 5;
    var btnleft = (realHight + nesWidth) / 2;
    if ((btnleft + btnsize * 2 + 10) > realHight) {
        btnleft = btnleft - ((btnleft + btnsize * 2 + 15) - realHight)
    }
    if ((btnleft + btnsize + btnmargin) > realHight) {
        btnleft = realHight - btnsize - btnmargin;
    }
    var btntop = realWidth - btnsize * 2 - 20;
    var btnmargin = 5;
    $(".nes-screen").css({

        "top": (realHight - nesWidth) / 2 + topadd / 2 + 'px',

    });

    $('#joystick_btn_AB').css({

        "top": btnleft + btnsize / 2 + btnmargin + topadd + 'px',

    });
    $('#joystick_btn_Y').css({

        "top": btnleft + topadd + 'px',

    });
    $('#joystick_btn_X').css({

        "top": btnleft + btnsize + btnmargin + topadd + 'px',

    });
    $('#joystick_btn_B').css({

        "top": btnleft + topadd + 'px',

    });
    $('#joystick_btn_A').css({

        "top": btnleft + btnsize + btnmargin + topadd + 'px',

    });

}

function initmenu() {
    var menusize = $(window).height() / 7;
    $('.menu .item').css({'width': menusize + 'px', 'height': menusize + 'px', 'line-height': menusize + 'px'});
    $('#closeChatModel').click(function () {
        closemenu();
        $('.tab-pane-bg').hide();
    });
    $('#menu_btn_cheat').click(function () {
        closemenu();
        $('#cheatscontent').show();
    });
    $('#menu_btn_reload').click(function () {
        closemenu();
        nes.reloadROM();
    });
    $('#menu_btn_chat').click(function () {
        closemenu();
        $('.tab-pane-bg').show();
    });
}

function closemenu() {
    $('#joystick_btn_menu').removeClass('active');
    $('.menu').hide();
}
$(document).ready(function () {
    // initmenu();
    // mobile_init();
    // nes_load_url("nes-canvas", rom_url);
});
