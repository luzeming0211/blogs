var SCREEN_WIDTH = 256;
var SCREEN_HEIGHT = 240;
var FRAMEBUFFER_SIZE = SCREEN_WIDTH * SCREEN_HEIGHT;
var canvas_ctx, image;
var framebuffer_u8, framebuffer_u32;
var AUDIO_BUFFERING = 512;
var SAMPLE_COUNT = 4 * 1024;
var SAMPLE_MASK = SAMPLE_COUNT - 1;
var audio_samples_L = new Float32Array(SAMPLE_COUNT);
var audio_samples_R = new Float32Array(SAMPLE_COUNT);
var audio_write_cursor = 0, audio_read_cursor = 0;
var dbtool = new dbtool();
var joydirmap = new Map();
joydirmap.set("left", "up");
joydirmap.set("down", "left");
joydirmap.set("right", "down");
joydirmap.set("up", "right");
joydirmap.set("leftup", "rightup");
joydirmap.set("leftdown", "leftup");
joydirmap.set("rightup", "rightdown");
joydirmap.set("rightdown", "leftdown");
var controllers = new Map();
controllers.set(1, jsnes.Controller.BUTTON_A);
controllers.set(0, jsnes.Controller.BUTTON_B);
controllers.set(8, jsnes.Controller.BUTTON_SELECT);
controllers.set(9, jsnes.Controller.BUTTON_START);
controllers.set(12, jsnes.Controller.BUTTON_UP);
controllers.set(13, jsnes.Controller.BUTTON_DOWN);
controllers.set(14, jsnes.Controller.BUTTON_LEFT);
controllers.set(15, jsnes.Controller.BUTTON_RIGHT);
var player = 1, player2 = 2, gameid;
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt
};

function dbtool() {
    var fcdb = null;
    var storeName = 'nesjson';
    this.saveDate = function (args) {
        var tranJson = fcdb.transaction(storeName, 'readwrite');
        var addNesJsons = tranJson.objectStore(storeName).put(args[0]);
        addNesJsons.onsuccess = function (e) {
            var nesJsonid = e.target.result;
            args[1].nesid = nesJsonid;
            if (args[2]) {
                args[1].id = args[2]
            }
            var addNesInfo = tranJson.objectStore(storeName).put(args[1]);
            addNesInfo.onsuccess = function (e) {
                args[3](nesJsonid, e.target.result)
            }
        };
    };
    this.saveDateCall = function () {
        this.operate(arguments, this.saveDate)
    };
    this.operate = function (args, operateFun) {
        if (fcdb) {
            operateFun(args)
        } else {
            var request = window.indexedDB.open("fcdata");
            request.onerror = function (e) {
                console.log('open Error!')
            };
            request.onsuccess = function (e) {
                fcdb = e.target.result;
                operateFun(args)
            };
            request.onupgradeneeded = function (e) {
                var db = e.target.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    try {
                        var objectStore = db.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true});
                        objectStore.createIndex('nameIndex', 'name', {unique: false})
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        }
    };
    this.loadData = function (args) {
        var transaction = fcdb.transaction(storeName);
        var objectStore = transaction.objectStore(storeName);
        var getrequest = objectStore.get(args[0]);
        getrequest.onsuccess = function (event) {
            if (event.target.result) {
                args[1](event.target.result)
            }
        }
    };
    this.loadDataCall = function () {
        this.operate(arguments, this.loadData)
    };
    this.getNesList = function (args) {
        var transaction = fcdb.transaction(storeName);
        var store = transaction.objectStore(storeName);
        var index = store.index("nameIndex");
        var request = index.openCursor(IDBKeyRange.only(args[0]));
        var nesList = [];
        request.onsuccess = function (e) {
            var cursor = e.target.result;
            var isEnd = true;
            if (cursor) {
                var nesInfo = cursor.value;
                nesList.push(nesInfo);
                isEnd = false;
                cursor.continue()
            }
            if (isEnd) {
                args[1](nesList)
            }
        }
    };
    this.getNesListCall = function () {
        this.operate(arguments, this.getNesList)
    };
    this.deleteData = function (args) {
        var transaction = fcdb.transaction(storeName, 'readwrite');
        transaction.objectStore(storeName).delete(args[0]);
        transaction.objectStore(storeName).delete(args[1]);
        transaction.oncomplete = function (event) {
            args[2]()
        }
    };
    this.deleteDataCall = function () {
        this.operate(arguments, this.deleteData)
    }
}

var nes = new jsnes.NES({
    onFrame: function (framebuffer_24) {
        for (var i = 0; i < FRAMEBUFFER_SIZE; i++) framebuffer_u32[i] = 0xFF000000 | framebuffer_24[i]
    }, onAudioSample: function (l, r) {
        audio_samples_L[audio_write_cursor] = l;
        audio_samples_R[audio_write_cursor] = r;
        audio_write_cursor = (audio_write_cursor + 1) & SAMPLE_MASK
    },
});

function onAnimationFrame() {
    window.requestAnimationFrame(onAnimationFrame);
    for (var i = 0; i < gamecheatList.length; i++) {
        if (gamecheatList[i].status == true) {
            setmemValue(gamecheatList[i].address, gamecheatList[i].values)
        }
    }
    image.data.set(framebuffer_u8);
    canvas_ctx.putImageData(image, 0, 0);
    nes.frame()
}

function audio_remain() {
    return (audio_write_cursor - audio_read_cursor) & SAMPLE_MASK
}

var audiocall = false;

function audio_callback(event) {
    audiocall = true;
    var dst = event.outputBuffer;
    var len = dst.length;
    if (audio_remain() < AUDIO_BUFFERING) nes.frame();
    var dst_l = dst.getChannelData(0);
    var dst_r = dst.getChannelData(1);
    for (var i = 0; i < len; i++) {
        var src_idx = (audio_read_cursor + i) & SAMPLE_MASK;
        dst_l[i] = audio_samples_L[src_idx];
        dst_r[i] = audio_samples_R[src_idx]
    }
    audio_read_cursor = (audio_read_cursor + len) & SAMPLE_MASK
}

function keyboard(callback, event, stat) {
    if (localkeybords[event.keyCode]) {
        var h = localkeybords[event.keyCode][0] - 1;
        var l = localkeybords[event.keyCode][1] - 2;
        var player = l + 1;
        var btn = tablecontroller[l][h];
        if (btn != 8 && btn != 9) {
            callback(player, btn)
        } else if (btn == 8) {
            clearInterval(selfinterval);
            if (stat == 1) {
                nesButtonValue({
                    keyCode: jsnes.Controller.BUTTON_A,
                    keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_A]
                }, player);
                nesButtonUp({keyCode: jsnes.Controller.BUTTON_B}, player);
                selfinterval = setInterval(function () {
                    nesButtonValue({
                        keyCode: jsnes.Controller.BUTTON_A,
                        keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_A]
                    }, player)
                }, 50)
            } else {
                nesButtonValue({keyCode: jsnes.Controller.BUTTON_A, keyValue: 0x40}, player)
            }
        } else if (btn == 9) {
            clearInterval(selfinterval);
            if (stat == 1) {
                nesButtonValue({
                    keyCode: jsnes.Controller.BUTTON_B,
                    keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_B]
                }, player);
                nesButtonUp({keyCode: jsnes.Controller.BUTTON_A}, player);
                selfinterval = setInterval(function () {
                    nesButtonValue({
                        keyCode: jsnes.Controller.BUTTON_B,
                        keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_B]
                    }, player)
                }, 50)
            } else {
                nesButtonValue({keyCode: jsnes.Controller.BUTTON_B, keyValue: 0x40}, player)
            }
        }
    }
}

var audio_ctx;

function nes_init(canvas_id) {
    var canvas = document.getElementById(canvas_id);
    canvas_ctx = canvas.getContext("2d");
    image = canvas_ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    canvas_ctx.fillStyle = "black";
    canvas_ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    var buffer = new ArrayBuffer(image.data.length);
    framebuffer_u8 = new Uint8ClampedArray(buffer);
    framebuffer_u32 = new Uint32Array(buffer);
    window.AudioContext = window.webkitAudioContext || window.AudioContext;
    audio_ctx = new window.AudioContext();
    var script_processor = audio_ctx.createScriptProcessor(AUDIO_BUFFERING, 0, 2);
    script_processor.onaudioprocess = audio_callback;
    script_processor.connect(audio_ctx.destination)
}

var rtfid = null;

function nes_boot(rom_data) {
    nes.loadROM(rom_data);
    rtfid = window.requestAnimationFrame(onAnimationFrame)
}

function nes_load_data(canvas_id, rom_data) {
    nes_init(canvas_id);
    nes_boot(rom_data)
}

function nes_load_url(canvas_id, path) {
    nes_init(canvas_id);
    var req = new XMLHttpRequest();
    req.open("GET", path);
    req.overrideMimeType("text/plain; charset=x-user-defined");
    req.onerror = () => console.log(`Error loading ${path}:${req.statusText}`);
    req.onload = function () {
        if (this.status === 200) {
            nes_boot(this.responseText)
        } else if (this.status === 0) {
        } else {
            req.onerror()
        }
    };
    req.send()
}

function mobile_init() {
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    var type = 's';
    if (width > height) {
        type = 'h';
        hScreen()
    } else {
        wScreen()
    }
    touchInit(type)
}

function hScreen() {
    var self = this;
    var realWidth = $(window).width();
    var realHight = $(window).height();
    var nesWidth = realHight * (256 / 240);
    $(".nes-screen").css({
        "width": nesWidth + 'px',
        "height": realHight + 'px',
        "top": "0",
        "left": (realWidth - nesWidth) / 2 + 'px'
    });
    $(".nes-screen").css('transform', 'none');
    $(".nes-screen").css('transform-origin', '50% 50%');
    joystickInit(realWidth, nesWidth, realHight, 'h');
    var btnsize = realHight / 5;
    var btnleft = (realWidth + nesWidth) / 2;
    if ((btnleft + btnsize * 2 + 10) > realWidth) {
        btnleft = btnleft - ((btnleft + btnsize * 2 + 15) - realWidth)
    }
    var btntop = realHight - btnsize * 2 - 20;
    var btnmargin = 5;
    $('#joystick_btn_Y').css({
        'transform': 'none',
        'transform-origin': '50% 50%',
        "width": btnsize + 'px',
        "height": btnsize + 'px',
        "line-height": btnsize + 'px',
        left: btnleft + 'px',
        top: btntop + 'px'
    });
    $('#joystick_btn_X').css({
        'transform': 'none',
        'transform-origin': '50% 50%',
        "width": btnsize + 'px',
        "height": btnsize + 'px',
        "line-height": btnsize + 'px',
        left: btnleft + btnsize + btnmargin + 'px',
        top: btntop + 'px'
    });
    $('#joystick_btn_B').css({
        'transform': 'none',
        'transform-origin': '50% 50%',
        "width": btnsize + 'px',
        "height": btnsize + 'px',
        "line-height": btnsize + 'px',
        left: btnleft + 'px',
        top: btntop + btnsize + btnmargin + 'px'
    });
    $('#joystick_btn_A').css({
        'transform': 'none',
        'transform-origin': '50% 50%',
        "width": btnsize + 'px',
        "height": btnsize + 'px',
        "line-height": btnsize + 'px',
        left: btnleft + btnsize + btnmargin + 'px',
        top: btntop + btnsize + btnmargin + 'px'
    })
}

function wScreen() {
    var realWidth = $(window).width();
    var realHight = $(window).height();
    var nesWidth = realWidth * (240 / 256);
    $(".nes-screen").css({
        "width": nesWidth + 'px',
        "height": realWidth + 'px',
        "top": (realHight - nesWidth) / 2 + 'px',
        "left": ((realWidth - nesWidth) / 2) + 'px'
    });
    $(".nes-screen").css('transform', 'rotate(90deg)');
    $(".nes-screen").css('transform-origin', '50% 50%');
    joystickInit(realWidth, nesWidth, realHight, 's');
    var btnsize = realWidth / 5;
    var btnleft = (realHight + nesWidth) / 2;
    if ((btnleft + btnsize * 2 + 10) > realHight) {
        btnleft = btnleft - ((btnleft + btnsize * 2 + 15) - realHight)
    }
    var btntop = realWidth - btnsize * 2 - 20;
    var btnmargin = 5;
    $('#joystick_btn_AB').css({
        'transform': 'rotate(90deg)',
        'transform-origin': '50% 50%',
        "width": btnsize + 'px',
        "height": btnsize + 'px',
        "line-height": btnsize + 'px',
        top: btnleft + btnsize / 2 + btnmargin + 'px',
        right: (btntop - btnsize - btnmargin) + 'px'
    });
    $('#joystick_btn_Y').css({
        'transform': 'rotate(90deg)',
        'transform-origin': '50% 50%',
        "width": btnsize + 'px',
        "height": btnsize + 'px',
        "line-height": btnsize + 'px',
        top: btnleft + 'px',
        right: btntop + 'px'
    });
    $('#joystick_btn_X').css({
        'transform': 'rotate(90deg)',
        'transform-origin': '50% 50%',
        "width": btnsize + 'px',
        "height": btnsize + 'px',
        "line-height": btnsize + 'px',
        top: btnleft + btnsize + btnmargin + 'px',
        right: btntop + 'px'
    });
    $('#joystick_btn_B').css({
        'transform': 'rotate(90deg)',
        'transform-origin': '50% 50%',
        "width": btnsize + 'px',
        "height": btnsize + 'px',
        "line-height": btnsize + 'px',
        top: btnleft + 'px',
        right: btntop + btnsize + btnmargin + 'px'
    });
    $('#joystick_btn_A').css({
        'transform': 'rotate(90deg)',
        'transform-origin': '50% 50%',
        "width": btnsize + 'px',
        "height": btnsize + 'px',
        "line-height": btnsize + 'px',
        top: btnleft + btnsize + btnmargin + 'px',
        right: btntop + btnsize + btnmargin + 'px'
    });
    $('.tab-pane-bg').css({"height": realHight - 130 + 'px', "width": realWidth + 'px', bottom: '20px'});
    $(".messages").css('height', realHight - 220 + 'px')
}

function joystickInit(realWidth, nesWidth, realHight, type) {
    var joystickSize = realWidth / 3;
    var toppx = (realHight - nesWidth) / 2;
    var btnmargin = 10;
    var btnsize = realWidth / 5;
    var minwidth = 150;
    var joyarea = minwidth;
    var minmargin = 5;
    var joymargin = 0;
    var joyopacity = 0.8;
    if ((realHight - nesWidth) / 2 > (minwidth - 10)) {
        joyarea = (realHight - nesWidth - minmargin) / 2;
        joymargin = 0;
        joyopacity = 1
    }
    var joysizeW = joyarea / 3 - minmargin;
    var joysizeH = joyarea / 3 + minmargin;
    var joytop = (joyarea - joysizeH) / 2;
    var joyleft = (joyarea - joysizeW) / 2;
    if (type == 'h') {
        toppx = realHight - joystickSize / 2 - 10;
        $('#joystick_btn_choice').css({
            'transform': 'none',
            'transform-origin': '50% 50%',
            "width": btnsize + 'px',
            "height": btnsize + 'px',
            "line-height": btnsize + 'px',
            left: btnmargin + 'px',
            top: toppx + 'px'
        });
        $('#joystick_btn_start').css({
            'transform': 'none',
            'transform-origin': '50% 50%',
            "width": btnsize + 'px',
            "height": btnsize + 'px',
            "line-height": btnsize + 'px',
            left: btnmargin + 'px',
            top: toppx + 'px'
        });
        $('.interaction-area').css({
            'width': joyarea + 'px',
            'height': joyarea + 'px',
            'top': (realHight - joyarea) + 'px',
            'left': joymargin + 'px',
            'opacity': joyopacity
        })
    } else {
        if (toppx > (joystickSize + 10)) {
            toppx = toppx - joystickSize / 2 - 10
        }
        $('.interaction-area').css({
            'width': joyarea + 'px',
            'height': joyarea + 'px',
            'top': joymargin + 'px',
            'left': joymargin + 'px',
            'opacity': joyopacity
        });
        $('#joystick_btn_choice').css({
            'transform': 'rotate(90deg)',
            'transform-origin': '50% 50%',
            "width": joysizeH + 'px',
            "height": joysizeH / 2 + 'px',
            "line-height": joysizeH / 2 + 'px',
            top: (realHight - nesWidth) / 4 - minmargin + 'px',
            left: joyarea + minmargin + 'px'
        });
        $('#joystick_btn_start').css({
            'transform': 'rotate(90deg)',
            'transform-origin': '50% 50%',
            "width": joysizeH + 'px',
            "height": joysizeH / 2 + 'px',
            "line-height": joysizeH / 2 + 'px',
            top: (realHight - nesWidth) / 4 - minmargin + 'px',
            left: (joyarea + joysizeH / 2) + minmargin * 2 + 'px'
        });
        $('#joystick_btn_menu').css({
            'transform': 'rotate(90deg)',
            'transform-origin': '50% 50%',
            "width": joysizeH + 'px',
            "height": joysizeH / 2 + 'px',
            "line-height": joysizeH / 2 + 'px',
            top: (realHight - nesWidth) / 4 - minmargin + 'px',
            left: joyarea + joysizeH + minmargin * 3 + 'px'
        });
        $('#joystick_btn_home').css({
            'transform': 'rotate(90deg)',
            'transform-origin': '50% 50%',
            "width": joysizeH + 'px',
            "height": joysizeH / 2 + 'px',
            "line-height": joysizeH / 2 + 'px',
            top: (realHight - nesWidth) / 4 - minmargin + 'px',
            left: joyarea + joysizeH + joysizeH / 2 + minmargin * 4 + 'px'
        });
        $('#messageshow').css({
            'transform': 'rotate(90deg)',
            'transform-origin': '50% 50%',
            top: realHight + 'px',
            left: joyarea + joysizeH + joysizeH / 2 + minmargin * 4 + 'px'
        })
    }
    $('.interaction').css({'font-size': joysizeW / 3 + 'px'});
    $('.arrow').each(function (index) {
        $(this).css({'width': joysizeW + 'px', 'height': joysizeH + 'px'});
        if (index == 0 || index == 3) {
            $(this).css({'left': joyleft + 'px'})
        } else {
            $(this).css({'top': joytop + 'px'})
        }
    });
    $('.darrow').each(function (index) {
        $(this).css({'width': joysizeW + 'px', 'height': joysizeH + 'px'});
        if (index == 0) {
            $(this).css({'left': joyleft + joysizeW + 'px'})
        } else if (index == 1) {
            $(this).css({'top': joymargin + 'px'})
        } else if (index == 2) {
            $(this).css({'left': joymargin + 'px', 'top': joytop + joysizeW + 'px'})
        } else {
            $(this).css({'left': joyleft + joysizeW + 'px', 'top': joytop + joysizeW + 'px'})
        }
    });
    var leftpx = joystickSize * (2 / 3)
}

function touchInit(type) {
    $('.interaction-area').bind('touchstart gesturestart', function (e) {
        handleDir(e, type);
        e.preventDefault()
    });
    $('.interaction-area').bind('touchmove', function (e) {
        handleDir(e, type)
    });
    $('#joystick_btn_menu').bind('touchstart gesturestart touchmove', function (e) {
        $('#joystick_btn_menu').addClass('active');
        e.preventDefault()
    });
    $('#joystick_btn_menu').bind('touchend', function (e) {
        $('#joystick_btn_menu').removeClass('active');
        $(".menu").show();
        e.preventDefault()
    });
    $('#menu_btn_saverom').bind('touchend', function (e) {
        closemenu();
        getNesList(gameid);
        e.preventDefault()
    });
    $('.interaction-area').bind('touchend', function (e) {
        $('#joystick_down').removeClass('active');
        $('#joystick_left').removeClass('active');
        $('#joystick_up').removeClass('active');
        $('#joystick_right').removeClass('active');
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_LEFT}, player);
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_UP}, player);
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_RIGHT}, player);
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_DOWN}, player)
    });
    $('#joystick_btn_start').bind('touchstart gesturestart touchmove', function (e) {
        $('#joystick_btn_start').addClass('active');
        nesButtonDown({keyCode: jsnes.Controller.BUTTON_START}, player);
        e.preventDefault()
    });
    $('#joystick_btn_start').bind('touchend', function (e) {
        $('#joystick_btn_start').removeClass('active');
        deleteData();
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_START}, player);
        e.preventDefault();
        iosAudioInit()
    });
    $('#joystick_btn_choice').bind('touchstart gesturestart touchmove', function (e) {
        $('#joystick_btn_choice').addClass('active');
        nesButtonDown({keyCode: jsnes.Controller.BUTTON_SELECT}, player);
        e.preventDefault()
    });
    $('#joystick_btn_choice').bind('touchend', function (e) {
        $('#joystick_btn_choice').removeClass('active');
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_SELECT}, player);
        e.preventDefault()
    });
    $('#joystick_btn_A').bind('touchstart gesturestart touchmove', function (e) {
        touchAB(e, false, 'A');
        e.preventDefault()
    });
    $('#joystick_btn_A').bind('touchend', function (e) {
        $('#joystick_btn_A').removeClass('active');
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_A}, player);
        e.preventDefault()
    });
    $('#joystick_btn_B').bind('touchstart gesturestart touchmove', function (e) {
        touchAB(e, false, 'B');
        e.preventDefault()
    });
    $('#joystick_btn_B').bind('touchend', function (e) {
        $('#joystick_btn_B').removeClass('active');
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_B}, player);
        e.preventDefault()
    });
    $('#joystick_btn_AB').bind('touchstart gesturestart touchmove', function (e) {
        touchAB(e, false, 'AB');
        e.preventDefault()
    });
    $('#joystick_btn_AB').bind('touchend', function (e) {
        $('#joystick_btn_AB').removeClass('active');
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_A}, player);
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_B}, player);
        e.preventDefault()
    });
    $('#joystick_btn_X').bind('touchstart gesturestart touchmove', function (e) {
        touchAB(e, true, 'A');
        e.preventDefault()
    });
    $('#joystick_btn_X').bind('touchend', function (e) {
        $('#joystick_btn_X').removeClass('active');
        clearInterval(interval);
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_A}, player);
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_B}, player);
        e.preventDefault()
    });
    $('#joystick_btn_Y').bind('touchstart gesturestart touchmove', function (e) {
        touchAB(e, true, 'B');
        e.preventDefault()
    });
    $('#joystick_btn_Y').bind('touchend', function (e) {
        $('#joystick_btn_Y').removeClass('active');
        clearInterval(interval);
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_A}, player);
        nesButtonUp({keyCode: jsnes.Controller.BUTTON_B}, player);
        e.preventDefault()
    })
}

function touchControll(key, type) {
    var value = type == 'down' ? 0x41 : 0x40;
    var fvalue = type == 'down' ? 0x40 : 0x41;
    switch (key) {
        case'left':
            nes.buttonValue(player, jsnes.Controller.BUTTON_LEFT, value);
            break;
        case'right':
            nes.buttonValue(player, jsnes.Controller.BUTTON_RIGHT, value);
            break;
        case'up':
            nes.buttonValue(player, jsnes.Controller.BUTTON_UP, value);
            break;
        case'down':
            nes.buttonValue(player, jsnes.Controller.BUTTON_DOWN, value);
            break;
        case'leftup':
            nes.buttonValue(player, jsnes.Controller.BUTTON_UP, value);
            nes.buttonValue(player, jsnes.Controller.BUTTON_LEFT, value);
            nes.buttonValue(player, jsnes.Controller.BUTTON_DOWN, fvalue);
            nes.buttonValue(player, jsnes.Controller.BUTTON_RIGHT, fvalue);
            break;
        case'rightup':
            nes.buttonValue(player, jsnes.Controller.BUTTON_UP, value);
            nes.buttonValue(player, jsnes.Controller.BUTTON_RIGHT, value);
            nes.buttonValue(player, jsnes.Controller.BUTTON_DOWN, fvalue);
            nes.buttonValue(player, jsnes.Controller.BUTTON_LEFT, fvalue);
            break;
        case'leftdown':
            nes.buttonValue(player, jsnes.Controller.BUTTON_DOWN, value);
            nes.buttonValue(player, jsnes.Controller.BUTTON_LEFT, value);
            nes.buttonValue(player, jsnes.Controller.BUTTON_UP, fvalue);
            nes.buttonValue(player, jsnes.Controller.BUTTON_RIGHT, fvalue);
            break;
        case'rightdown':
            nes.buttonValue(player, jsnes.Controller.BUTTON_DOWN, value);
            nes.buttonValue(player, jsnes.Controller.BUTTON_RIGHT, value);
            nes.buttonValue(player, jsnes.Controller.BUTTON_UP, fvalue);
            nes.buttonValue(player, jsnes.Controller.BUTTON_LEFT, fvalue);
            break
    }
}

var selfinterval;

function touchAB(e, db, btn) {
    if (selfinterval) clearInterval(selfinterval);
    if (btn == 'A') {
        if (db) {
            $('#joystick_btn_X').addClass('active');
            nesButtonValue({
                keyCode: jsnes.Controller.BUTTON_A,
                keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_A]
            }, player);
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_B}, player);
            selfinterval = setInterval(function () {
                nesButtonValue({
                    keyCode: jsnes.Controller.BUTTON_A,
                    keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_A]
                }, player)
            }, 50)
        } else {
            $('#joystick_btn_A').addClass('active');
            nesButtonDown({keyCode: jsnes.Controller.BUTTON_A}, player);
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_B}, player)
        }
    } else if (btn == 'B') {
        if (db) {
            $('#joystick_btn_Y').addClass('active');
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_A}, player);
            nesButtonValue({
                keyCode: jsnes.Controller.BUTTON_B,
                keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_B]
            }, player);
            selfinterval = setInterval(function () {
                nesButtonValue({
                    keyCode: jsnes.Controller.BUTTON_B,
                    keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_B]
                }, player)
            }, 50)
        } else {
            $('#joystick_btn_B').addClass('active');
            nesButtonUp({keyCode: jsnes.Controller.BUTTON_A}, player);
            nesButtonDown({keyCode: jsnes.Controller.BUTTON_B}, player)
        }
    } else if (btn == 'AB') {
        nesButtonDown({keyCode: jsnes.Controller.BUTTON_A}, player);
        nesButtonDown({keyCode: jsnes.Controller.BUTTON_B}, player)
    }
}

function handleDir(e, type) {
    var self = this;
    var myLocation = e.originalEvent.changedTouches[0];
    var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
    if ($(realTarget).attr('id')) {
        dir = $(realTarget).attr('id').split('_')[1];
        if (dir.length > 5) {
            if (dir == 'leftup') {
                $('#joystick_right').removeClass('active');
                $('#joystick_down').removeClass('active');
                $('#joystick_left').addClass('active');
                $('#joystick_up').addClass('active')
            } else if (dir == 'leftdown') {
                $('#joystick_right').removeClass('active');
                $('#joystick_up').removeClass('active');
                $('#joystick_down').addClass('active');
                $('#joystick_left').addClass('active')
            } else if (dir == 'rightdown') {
                $('#joystick_up').removeClass('active');
                $('#joystick_left').removeClass('active');
                $('#joystick_right').addClass('active');
                $('#joystick_down').addClass('active')
            } else if (dir == 'rightup') {
                $('#joystick_down').removeClass('active');
                $('#joystick_left').removeClass('active');
                $('#joystick_up').addClass('active');
                $('#joystick_right').addClass('active')
            }
        } else {
            $(realTarget).addClass('active')
        }
        if (type == 's') {
            touchControll(dir, 'down')
        } else {
            touchControll(joydirmap.get(dir), 'down')
        }
    }
}

function saveAndload(type, id, lie, dbid, dbid2) {
    if (type == '0') {
        var nesj = nes.toJSON();
        nesj.name = id;
        if (dbid) {
            nesj.id = dbid
        }
        var canvas = document.getElementById("nes-canvas");
        var nesInfo = new Object();
        nesInfo.name = id + 'info';
        nesInfo.pic = canvas.toDataURL("image/jpeg", 0.2);
        nesInfo.time = new Date().Format("yyyy-MM-dd hh:mm:ss");
        dbtool.saveDateCall(nesj, nesInfo, dbid2, function (id1, id2) {
            var savename = $(lie).parent().children(".name").text();
            $(lie).parent().empty().append("<img class='avatar' src='" + nesInfo.pic + "'></img> <span class='name'>" + savename + "</span> <span class='time'>" + nesInfo.time + "</span><button type='button'  onclick='saveAndload(\"1\"," + id1 + " )' class='right btn btn-success'>读取</button><button type='button' class='right2 btn btn-success' onclick='saveAndload(\"0\",\"" + id + "\",this," + id1 + "," + id2 + " )'>存档</button>");
        })
    } else {
        dbtool.loadDataCall(id, function (d) {
            console.log(id);
            if (d) {
                nes.fromJSON(d);
            }
        })
    }
}

function getNesList(id) {
    dbtool.getNesListCall(id + 'info', function (neslist) {
        $("#savelist").empty();
        if (neslist && neslist.length > 0) {
            for (var i = 0; i < neslist.length; i++) {
                $("#savelist").append("<li><img class='avatar' src='" + neslist[i].pic + "'></img> <span class='name'>存档[" + (i + 1) + "]</span> <span class='time'>" + neslist[i].time + "</span><button type='button'  onclick='saveAndload(\"1\"," + neslist[i].nesid + " )' class='right btn btn-success'>读取</button><button type='button' class='right2 btn btn-success' onclick='saveAndload(\"0\",\"" + id + "\",this," + neslist[i].nesid + "," + neslist[i].id + " )'>存档</button></li>")
            }
        }
        if (neslist.length < 3) {
            for (var i = neslist.length; i < 3; i++) {
                $("#savelist").append("<li><div class='avatar'></div> <span class='name'>存档[" + (i + 1) + "]</span> <span class='time'>未存档</span><button type='button' class='right btn btn-success' onclick='saveAndload(\"0\",\"" + id + "\",this)'>存档</button></li>")
            }
        }
        $("#saveContent").show()
    })
}

function deleteData() {
    dbtool.deleteDataCall(10, 9, function () {
    })
}

function nesButtonDown(key, playnum) {
    nes.buttonDown(playnum, key.keyCode)
}

function nesButtonUp(key, playnum) {
    nes.buttonUp(playnum, key.keyCode)
}

function nesButtonValue(key, playnum) {
    nes.buttonValue(playnum, key.keyCode, key.keyValue)
}

function pcAudioInit() {
    audio_ctx.resume()
}

function iosAudioInit() {
    if (!audiocall) {
        window.AudioContext = window.webkitAudioContext || window.AudioContext;
        audio_ctx = new window.AudioContext();
        var script_processor = audio_ctx.createScriptProcessor(AUDIO_BUFFERING, 0, 2);
        script_processor.onaudioprocess = audio_callback;
        script_processor.connect(audio_ctx.destination)
    }
}

document.addEventListener('keydown', (event) => {
    keyboard(nes.buttonDown, event, 1)
});
document.addEventListener('keyup', (event) => {
    keyboard(nes.buttonUp, event, 0)
});

function initSavelist(gid) {
    $("#closeModel").click(function () {
        $(".tenant-model-content").hide()
    });
    $('.tenant-model-content').css({
        'transform': 'rotate(90deg)',
        'transform-origin': '50% 50%',
        "width": $(window).height() * 0.9 + 'px',
        "height": $(window).width() * 0.8 + 'px',
        "top": $(window).height() * 0.45 - $(window).width() * 0.4 + 20 + 'px',
        "left": -$(window).width() * 0.2 - 10 + 'px'
    });
    $('.cheatlistcontain').css({'height': $(window).width() * 0.8 - 40 + 'px'});
    $('.cheatswitch').css({'margin-left': $(window).height() * 0.9 - 140 + 'px'});
    $('#closeModel,#closecheatsModel').css({"margin-left": $(window).height() * 0.8 + "px"});
    gameid = gid
}

function initSavelistPC(gid) {
    $("#closeModel").click(function () {
        $("#saveContent").hide()
    });
    $('#saveContent').css({
        "background-color": "#4e366b",
        "width": '400px',
        "top": $(".tv-content").offset().top + 'px',
        "left": $('.tv-screen').offset().left - 420 + 'px'
    });
    $('#controllerContent').css({
        "background-color": "#4e366b",
        "width": '400px',
        "top": $(".tv-content").offset().top - 100 + 'px',
        "left": ($(window).width() / 3) + 'px'
    });
    $('.opbtn').css({"left": ($('.tv-screen').offset().left + $('.tv-screen').width() + $('.tv-right').width()) + 'px'});
    $('#cheatscontent').css({
        "top": $(".tv-content").offset().top - 20 + 'px',
        "left": $('.tv-screen').offset().left - $('#cheatscontent').width() - 20 + 'px'
    });
    $('.tab-pane-bg').css({
        "top": $(".tv-content").offset().top - 20 + 'px',
        "left": $('.tv-screen').offset().left - $('.tab-pane-bg').width() - 20 + 'px'
    });
    gameid = gid;
    $('#save_rom').click(function () {
        getNesList(gid)
    });
    $('#max_screen').click(function () {
        var sc = $('#max_screen').attr("screen");
        if (sc == '1') {
            $('#max_screen').attr("screen", "0");
            $('#nes-canvas').css({
                "width": $('.tv-hr').width() + "px",
                "height": $('.tv-hr').height() + "px",
                "left": "0px",
                "top": "0px"
            });
            $('#max_screen').text('放大屏幕')
        } else {
            $('#max_screen').attr("screen", "1");
            $('#nes-canvas').css({
                "width": $(window).height() * 0.96 + "px",
                "height": $(window).height() * 0.9 + "px",
                "left": -$(window).height() * 0.96 + $('.tv-hr').width() + 'px',
                "top": -$('.tv-hr').offset().top + 20 + 'px'
            });
            $('#max_screen').text('缩小屏幕')
        }
        $('#max_screen').blur()
    });
    $('#reload_rom').click(function () {
        nes.reloadROM();
        $('#reload_rom').blur()
    });
    $('#keybord_show').click(function () {
        $('#controllerContent').show()
    });
    $('#closecontroller').click(function () {
        $('#controllerContent').hide()
    });
    initLocalkeys();
    initTableKey()
}

let gameids = [];

function getPLaynum(gamepadid) {
    if (!gameids[0]) {
        gameids[0] = gamepadid;
        return 1
    } else if (gameids[0] == gamepadid) return 1; else if (!gameids[1]) {
        gameids[1] == gamepadid;
        return 2
    } else if (gameids[1] == gamepadid) return 2;
    return 1
}

function gamepadloop() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();
    for (let gamepadIndex = 0; gamepadIndex < gamepads.length; gamepadIndex++) {
        const gamepad = gamepads[gamepadIndex];
        const previousGamepad = gamepadState[gamepadIndex];
        if (!gamepad) {
            continue
        }
        if (!previousGamepad) {
            initgamepadState(gamepadIndex, gamepad);
            continue
        }
        const buttons = gamepad.buttons;
        const previousButtons = previousGamepad.buttons;
        var playnumer = getPLaynum(gamepad.id);
        for (let code = 0; code < buttons.length; code++) {
            const button = buttons[code];
            const previousButton = previousButtons[code];
            var neskey = controllers.get(code);
            if (neskey == 0 || neskey) {
                if (button.pressed && !previousButton.pressed) {
                    nes.buttonValue(playnumer, neskey, 0x41)
                } else if (!button.pressed && previousButton.pressed) {
                    nes.buttonValue(playnumer, neskey, 0x40)
                }
            }
        }
        initgamepadState(gamepadIndex, gamepad)
    }
}

let gamepadState = [];

function initgamepadState(gamepadIndex, gamepad) {
    var statuss = [];
    for (let i = 0; i < gamepad.buttons.length; i++) {
        statuss[i] = {pressed: gamepad.buttons[i].pressed}
    }
    gamepadState[gamepadIndex] = {buttons: statuss}
}

let stopped = false;

function loop() {
    if (stopped) return;
    gamepadloop();
    requestAnimationFrame(loop)
}

function startPolling() {
    if (!(navigator.getGamepads || navigator.webkitGetGamepads)) {
        stopped = true
    }
    requestAnimationFrame(loop)
}

function getQueryString(key) {
    var after = window.location.search;
    if (after.indexOf('?') === -1) return null;
    after = after.substr(1) || window.location.hash.split("?")[1];
    if (after) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var r = after.match(reg);
        if (r != null) {
            return decodeURIComponent(r[2])
        } else {
            return null
        }
    }
}

function startchat(roomid) {
    var storage = window.localStorage;
    var avatar = parseInt(Math.random() * 5, 10) + 1;
    var nickname;
    if (storage && storage.avatar) {
        avatar = storage.avatar
    } else if (storage) {
        storage.avatar = avatar
    }
    if (storage && storage.nickname) {
        nickname = storage.nickname
    }
    var roomid = 1;
    var title = getQueryString("t");
    console.log(title);
    if (!roomid) roomid = 1;
    socket = io.connect('https://yikm.net?roomid=' + roomid);
    socket.on('connect', function () {
        if (nickname) {
            var realn = nickname + '-' + avatar;
            socket.emit("join", realn.replace(/[\'\"\\\/\b\f\n\r\t\<\>]/g, ''), title)
        }
    });
    socket.on('msg', function (userName, msg) {
        var avatarnum = userName.substring(userName.lastIndexOf('-') + 1);
        var realuserName = userName.substring(0, userName.lastIndexOf('-'));
        var message = '<li class="message"><div class="avatar" style="background-image: url(https://yikm.net/avatar/' + avatarnum + '.png);"></div><div class="speaker">' + realuserName + '</div><div class="textContainer text-border text-border-left me"><div class="text">' + msg + '</div></div></li>';
        $('.messages').append(message);
        $('.messages').scrollTop($('.messages')[0].scrollHeight);
        $('#closeChatModel').addClass('msg-coming');
        setTimeout(function () {
            $('#closeChatModel').removeClass('msg-coming')
        }, 3000)
    });
    $('.chat-input').keydown(function (e) {
        e.stopPropagation();
        if (e.which === 13) {
            if (!nickname) {
                var proname = prompt("请输入昵称", "");
                if (proname && proname.length > 0) {
                    nickname = proname;
                    storage.nickname = proname;
                    socket.emit("join", proname + '-' + avatar, title)
                }
            }
            var msg = $(this).val();
            $(this).val('');
            if (msg && msg.length > 0) socket.send(msg.replace(/[\'\"\\\/\b\f\n\r\t\<\>]/g, ''))
        }
    });
    $('#mobile_send').click(function (e) {
        if (!nickname) {
            var proname = prompt("请输入昵称", "");
            if (proname && proname.length > 0) {
                nickname = proname;
                storage.nickname = proname;
                socket.emit("join", proname + '-' + avatar)
            }
        }
        var msg = $('#word').val();
        $('#word').val('');
        if (msg && msg.length > 0) socket.send(msg.replace(/[\'\"\\\/\b\f\n\r\t\<\>]/g, ''))
    });
    $('.chat-input').keyup(function (e) {
        e.stopPropagation()
    });
    socket.on('sys', function (sysMsg, type, title) {
        var realuserName = sysMsg.substring(0, sysMsg.lastIndexOf('-'));
        var sysType = '';
        if (type == 1) sysType = '正在玩'; else if (type == 2) {
        } else {
            sysType = '离开了房间'
        }
        if (realuserName) {
            var message = '<li class="message"><span class="subject">' + realuserName + '</span><span class="text">' + sysType + '</span><span class="subject">' + title.replace(/[\'\"\\\/\b\f\n\r\t\<\>]/g, '') + '</span></li>';
            $('.messages').append(message)
        }
    });
    socket.on('disconnect', function () {
        console.log("与服务器断开连接!")
    })
}

var cheatmap = new Map();

function initcheatmap() {
    for (var i = 0; i < cheatdata.length; i++) {
        cheatmap.set(cheatdata[i].key, cheatdata[i].values)
    }
    getCheatCode()
}

function setmemValue(address, value) {
    nes.cpu.mem[address] = value
}

var gamecheatList = [];

function getCheatCode() {
    var id = getQueryString("id");
    var cheatCode = cheatmap.get(parseInt(id));
    if (cheatCode) {
        var codes = cheatCode.split(",");
        for (var i = 0; i < codes.length; i++) {
            var values = codes[i].split("$");
            var key = values[0];
            var keys = key.split("-");
            var address = parseInt(keys[0], 16);
            var value = parseInt(keys[1] + keys[2], 16);
            var desc = values[1];
            gamecheatList[i] = {'address': address, 'values': value, 'desc': desc, 'status': false}
        }
    }
}

function initCheatCon() {
    $('#cheatlist').empty();
    if (gamecheatList.length > 0) {
        for (var i = 0; i < gamecheatList.length; i++) {
            $('#cheatlist').append('<li><span class="name" style="margin-top: 5px">' + gamecheatList[i].desc + '</span><label><input type="checkbox" onchange="changecheat(this.checked,' + i + ')" class="ios-switch green  bigswitch" /><div class="cheatswitch"><div></div></div></label></li>')
        }
    }
}

function changecheat(checkstatus, num) {
    gamecheatList[num].status = checkstatus;
    if (checkstatus == false) {
        setmemValue(gamecheatList[num].address, gamecheatList[num].lastmem)
    } else {
        gamecheatList[num].lastmem = nes.cpu.mem[gamecheatList[num].address]
    }
}

var lstorage = window.localStorage;
var localkeybords = {};
var tablecontroller = [[4, 5, 6, 7, 0, 1, 8, 9, 3, 2], [4, 5, 6, 7, 0, 1, 8, 9, 3, 2]];

function changeKey(keyname, keycode, h, l) {
    var currentKey = localkeybords[keycode];
    if (currentKey) {
        $("#keytable tr:eq(" + currentKey[0] + ") td:nth-child(" + currentKey[1] + ")").html("");
        delete localkeybords[keycode]
    }
    $("#keytable tr:eq(" + h + ") td:nth-child(" + l + ")").html(keyname);
    $("#keytable").unbind("keydown");
    for (var k in localkeybords) {
        if (localkeybords[k][0] == h && localkeybords[k][1] == l) {
            delete localkeybords[k];
            break
        }
    }
    localkeybords[keycode] = [h, l, keyname];
    lstorage.keys = JSON.stringify(localkeybords)
}

function initLocalkeys() {
    if (lstorage.keys) {
        localkeybords = JSON.parse(lstorage.keys)
    } else {
        localkeybords = {
            13: [9, 2, "ENTER"],
            37: [3, 3, "←"],
            38: [1, 3, "↑"],
            39: [4, 3, "→"],
            40: [2, 3, "↓"],
            46: [10, 3, "DELETE"],
            65: [3, 2, "A"],
            66: [10, 2, "B"],
            68: [4, 2, "D"],
            73: [7, 2, "I"],
            74: [6, 2, "J"],
            75: [5, 2, "K"],
            83: [2, 2, "S"],
            85: [8, 2, "U"],
            87: [1, 2, "W"],
            96: [9, 3, "数字键盘0"],
            97: [6, 3, "数字键盘1"],
            98: [5, 3, "数字键盘2"],
            100: [8, 3, "数字键盘4"],
            101: [7, 3, "数字键盘5"]
        };
        lstorage.keys = JSON.stringify(localkeybords)
    }
}

function initTableKey() {
    for (var k in localkeybords) {
        $("#keytable tr:eq(" + localkeybords[k][0] + ") td:nth-child(" + localkeybords[k][1] + ")").html(localkeybords[k][2])
    }
}