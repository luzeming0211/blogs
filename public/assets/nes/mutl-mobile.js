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
var player = 1,
    player2 = 2,
    gameid;
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
        }
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
                        var objectStore = db.createObjectStore(storeName, {
                            keyPath: 'id',
                            autoIncrement: true
                        });
                        objectStore.createIndex('nameIndex', 'name', {
                            unique: false
                        })
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
    speakers.start()
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
    req.onerror = () => console.log(`Error loading $ {
        path
    }: $ {
        req.statusText
    }`);
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

function initcanvas() {
    var realWidth = $(window).width();
    var realHight = $(window).height();
    var nesWidth = realWidth * (240 / 256);
    $("#nes-canvas").addClass("canvas-screen");
    $("#nes-canvas").css({
        "width": nesWidth + 'px',
        "height": realWidth + 'px',
        "top": (realHight - nesWidth) / 2 + 'px',
        "left": ((realWidth - nesWidth) / 2) + 'px'
    });
    $("#nes-canvas").css('transform', 'rotate(90deg)');
    $("#nes-canvas").css('transform-origin', '50% 50%');
}

function wScreen() {
    var realWidth = $(window).width();
    var realHight = $(window).height();
    var nesWidth = realWidth * (240 / 256);
    joystickInit(realWidth, nesWidth, realHight, 's');
    var btnsize = realWidth / 5;
    var btnleft = (realHight + nesWidth) / 2;
    if ((btnleft + btnsize * 2 + 10) > realHight) {
        btnleft = btnleft - ((btnleft + btnsize * 2 + 15) - realHight)
    } else {
        btnleft = btnleft + (realHight - btnleft - btnsize * 2 - 5) / 2 - 5;
    }
    if ((btnleft + btnsize + btnmargin) > realHight) {
        btnleft = realHight - btnsize - btnmargin
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
    $('.tab-pane-bg').css({
        "height": realHight - 130 + 'px',
        "width": realWidth + 'px',
        bottom: '20px'
    });
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
    var minbtnmargin = 15;
    var joymargin = 0;
    var joyopacity = 0.8;
    if ((realHight - nesWidth) / 2 > (minwidth - 10)) {
        joyarea = (realHight - nesWidth - minmargin) / 2;
        if (joyarea > realWidth / 2 - 5)
            joyarea = realWidth / 2 - 5;
        joymargin = 10;
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
            'opacity': 0.8
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
            'opacity': 0.8
        });
        $('#joystick_btn_choice').css({
            'transform': 'rotate(90deg)',
            'transform-origin': '50% 50%',
            "width": joysizeH + 'px',
            "height": joysizeH / 2 + 'px',
            "line-height": joysizeH / 2 + 'px',
            top: (realHight - nesWidth) / 4 - minmargin + 'px',
            left: joyarea + minbtnmargin + 'px'
        });
        $('#joystick_btn_start').css({
            'transform': 'rotate(90deg)',
            'transform-origin': '50% 50%',
            "width": joysizeH + 'px',
            "height": joysizeH / 2 + 'px',
            "line-height": joysizeH / 2 + 'px',
            top: (realHight - nesWidth) / 4 - minmargin + 'px',
            left: (joyarea + joysizeH / 2) + minbtnmargin * 2 + 'px'
        });
        $('#joystick_btn_menu').css({
            'transform': 'rotate(90deg)',
            'transform-origin': '50% 50%',
            "width": joysizeH + 'px',
            "height": joysizeH / 2 + 'px',
            "line-height": joysizeH / 2 + 'px',
            top: (realHight - nesWidth) / 4 - minmargin + 'px',
            left: joyarea + joysizeH + minbtnmargin * 3 + 'px'
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
    $('.interaction').css({
        'font-size': joysizeW / 3 + 'px'
    });
    $('.arrow').each(function (index) {
        $(this).css({
            'width': joysizeW + 'px',
            'height': joysizeH + 'px'
        });
        if (index == 0 || index == 3) {
            $(this).css({
                'left': joyleft + 'px'
            })
        } else {
            $(this).css({
                'top': joytop + 'px'
            })
        }
    });
    $('.darrow').each(function (index) {
        $(this).css({
            'width': joysizeW + 'px',
            'height': joysizeH + 'px'
        });
        if (index == 0) {
            $(this).css({
                'left': joyleft + joysizeW + 'px'
            })
        } else if (index == 1) {
            $(this).css({
                'top': joymargin + 'px'
            })
        } else if (index == 2) {
            $(this).css({
                'left': joymargin + 'px',
                'top': joytop + joysizeW + 'px'
            })
        } else {
            $(this).css({
                'left': joyleft + joysizeW + 'px',
                'top': joytop + joysizeW + 'px'
            })
        }
    });
    var leftpx = joystickSize * (2 / 3)
}

function touchInit(type) {
    $('.interaction-area').bind('touchstart gesturestart',
        function (e) {
            handleDir(e, type);
            e.preventDefault()
        });
    $('.interaction-area').bind('touchmove',
        function (e) {
            handleDir(e, type)
        });
    $('#joystick_btn_menu').bind('touchstart gesturestart touchmove',
        function (e) {
            $('#joystick_btn_menu').addClass('active');
            e.preventDefault()
        });
    $('#joystick_btn_menu').bind('touchend',
        function (e) {
            $('#joystick_btn_menu').removeClass('active');
            $(".menu").show();
            e.preventDefault()
        });
    $('#menu_btn_saverom').bind('touchend',
        function (e) {
            closemenu();
            getNesList(gameid);
            e.preventDefault()
        });
    $('.interaction-area').bind('touchend',
        function (e) {
            $('#joystick_down').removeClass('active');
            $('#joystick_left').removeClass('active');
            $('#joystick_up').removeClass('active');
            $('#joystick_right').removeClass('active');
            syncbtnup("BUTTON_UP");
            syncbtnup("BUTTON_LEFT");
            syncbtnup("BUTTON_RIGHT");
            syncbtnup("BUTTON_DOWN");
        });
    $('#joystick_btn_start').bind('touchstart gesturestart touchmove',
        function (e) {
            $('#joystick_btn_start').addClass('active');
            syncbtndown("BUTTON_START");
            e.preventDefault()
        });
    $('#joystick_btn_start').bind('touchend',
        function (e) {
            $('#joystick_btn_start').removeClass('active');
            syncbtnup("BUTTON_START");
            e.preventDefault();
            //iosAudioInit();
        });
    $('#joystick_btn_choice').bind('touchstart gesturestart touchmove',
        function (e) {
            $('#joystick_btn_choice').addClass('active');
            syncbtndown("BUTTON_SELECT");
            e.preventDefault()
        });
    $('#joystick_btn_choice').bind('touchend',
        function (e) {
            $('#joystick_btn_choice').removeClass('active');
            syncbtnup("BUTTON_SELECT");
            e.preventDefault()
        });
    $('#joystick_btn_A').bind('touchstart gesturestart touchmove',
        function (e) {
            syncbtndown("BUTTON_A");
            e.preventDefault()
        });
    $('#joystick_btn_A').bind('touchend',
        function (e) {
            $('#joystick_btn_A').removeClass('active');
            syncbtnup("BUTTON_A");
            e.preventDefault()
        });
    $('#joystick_btn_B').bind('touchstart gesturestart touchmove',
        function (e) {
            syncbtndown("BUTTON_B");
            e.preventDefault()
        });
    $('#joystick_btn_B').bind('touchend',
        function (e) {
            $('#joystick_btn_B').removeClass('active');
            syncbtnup("BUTTON_B");
            e.preventDefault()
        });
    $('#joystick_btn_AB').bind('touchstart gesturestart touchmove',
        function (e) {
            syncbtndown("BUTTON_A");
            syncbtndown("BUTTON_B");
            e.preventDefault()
        });
    $('#joystick_btn_AB').bind('touchend',
        function (e) {
            $('#joystick_btn_AB').removeClass('active');
            syncbtnup("BUTTON_A");
            syncbtnup("BUTTON_B");
            e.preventDefault()
        });
    $('#joystick_btn_X').bind('touchstart gesturestart touchmove',
        function (e) {
            syncbtndown("BUTTON_DA");
            e.preventDefault()
        });
    $('#joystick_btn_X').bind('touchend',
        function (e) {
            $('#joystick_btn_X').removeClass('active');
            syncbtnup("BUTTON_DA");
            e.preventDefault()
        });
    $('#joystick_btn_Y').bind('touchstart gesturestart touchmove',
        function (e) {
            syncbtndown("BUTTON_DB");
            e.preventDefault()
        });
    $('#joystick_btn_Y').bind('touchend',
        function (e) {
            $('#joystick_btn_Y').removeClass('active');
            syncbtnup("BUTTON_DB");
            e.preventDefault()
        })
}

function touchControll(key, type) {
    //var value = type == 'down' ? 0x41: 0x40;
    //var fvalue = type == 'down' ? 0x40: 0x41;
    switch (key) {
        case 'left':
            syncbtndown("BUTTON_LEFT");
            break;
        case 'right':
            syncbtndown("BUTTON_RIGHT");
            break;
        case 'up':
            syncbtndown("BUTTON_UP");
            break;
        case 'down':
            syncbtndown("BUTTON_DOWN");
            break;
        case 'leftup':
            syncbtndown("BUTTON_UP");
            syncbtndown("BUTTON_LEFT");
            syncbtnup("BUTTON_DOWN");
            syncbtnup("BUTTON_RIGHT");
            break;
        case 'rightup':
            syncbtndown("BUTTON_UP");
            syncbtndown("BUTTON_RIGHT");
            syncbtnup("BUTTON_DOWN");
            syncbtnup("BUTTON_LEFT");
            break;
        case 'leftdown':
            syncbtndown("BUTTON_DOWN");
            syncbtndown("BUTTON_LEFT");
            syncbtnup("BUTTON_UP");
            syncbtnup("BUTTON_RIGHT");
            break;
        case 'rightdown':
            syncbtndown("BUTTON_DOWN");
            syncbtndown("BUTTON_RIGHT");
            syncbtnup("BUTTON_UP");
            syncbtnup("BUTTON_LEFT");
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
                },
                player);
            nesButtonUp({
                    keyCode: jsnes.Controller.BUTTON_B
                },
                player);
            selfinterval = setInterval(function () {
                    nesButtonValue({
                            keyCode: jsnes.Controller.BUTTON_A,
                            keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_A]
                        },
                        player)
                },
                50)
        } else {
            $('#joystick_btn_A').addClass('active');
            nesButtonDown({
                    keyCode: jsnes.Controller.BUTTON_A
                },
                player);
            nesButtonUp({
                    keyCode: jsnes.Controller.BUTTON_B
                },
                player)
        }
    } else if (btn == 'B') {
        if (db) {
            $('#joystick_btn_Y').addClass('active');
            nesButtonUp({
                    keyCode: jsnes.Controller.BUTTON_A
                },
                player);
            nesButtonValue({
                    keyCode: jsnes.Controller.BUTTON_B,
                    keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_B]
                },
                player);
            selfinterval = setInterval(function () {
                    nesButtonValue({
                            keyCode: jsnes.Controller.BUTTON_B,
                            keyValue: 0x81 - nes.controllers[player].state[jsnes.Controller.BUTTON_B]
                        },
                        player)
                },
                50)
        } else {
            $('#joystick_btn_B').addClass('active');
            nesButtonUp({
                    keyCode: jsnes.Controller.BUTTON_A
                },
                player);
            nesButtonDown({
                    keyCode: jsnes.Controller.BUTTON_B
                },
                player)
        }
    } else if (btn == 'AB') {
        nesButtonDown({
                keyCode: jsnes.Controller.BUTTON_A
            },
            player);
        nesButtonDown({
                keyCode: jsnes.Controller.BUTTON_B
            },
            player)
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
        dbtool.saveDateCall(nesj, nesInfo, dbid2,
            function (id1, id2) {
                var savename = $(lie).parent().children(".name").text();
                $(lie).parent().empty().append("<img class='avatar' src='" + nesInfo.pic + "'></img> <span class='name'>" + savename + "</span> <span class='time'>" + nesInfo.time + "</span><button type='button'  onclick='saveAndload(\"1\"," + id1 + " )' class='right btn btn-success'>璇诲彇</button><button type='button' class='right2 btn btn-success' onclick='saveAndload(\"0\",\"" + id + "\",this," + id1 + "," + id2 + " )'>瀛樻。</button>")
            })
    } else {
        dbtool.loadDataCall(id,
            function (d) {
                console.log(id);
                if (d) {
                    nes.fromJSON(d)
                }
            })
    }
}

function getNesList(id) {
    dbtool.getNesListCall(id + 'info',
        function (neslist) {
            $("#savelist").empty();
            if (neslist && neslist.length > 0) {
                for (var i = 0; i < neslist.length; i++) {
                    $("#savelist").append("<li><img class='avatar' src='" + neslist[i].pic + "'></img> <span class='name'>瀛樻。[" + (i + 1) + "]</span> <span class='time'>" + neslist[i].time + "</span><button type='button'  onclick='saveAndload(\"1\"," + neslist[i].nesid + " )' class='right btn btn-success'>璇诲彇</button><button type='button' class='right2 btn btn-success' onclick='saveAndload(\"0\",\"" + id + "\",this," + neslist[i].nesid + "," + neslist[i].id + " )'>瀛樻。</button></li>")
                }
            }
            if (neslist.length < 3) {
                for (var i = neslist.length; i < 3; i++) {
                    $("#savelist").append("<li><div class='avatar'></div> <span class='name'>瀛樻。[" + (i + 1) + "]</span> <span class='time'>鏈瓨妗�</span><button type='button' class='right btn btn-success' onclick='saveAndload(\"0\",\"" + id + "\",this)'>瀛樻。</button></li>")
                }
            }
            $("#saveContent").show()
        })
}

function deleteData() {
    dbtool.deleteDataCall(10, 9,
        function () {
        })
}

function syncbtndown(key) {
    window.emulator.localController.btnKeyDown(key);
}

function syncbtnup(key) {
    window.emulator.localController.btnKeyUp(key);
}

function pcAudioInit() {
    audio_ctx.resume()
}

function iosAudioInit() {
    if (!audiocall) {
        speakers.start()
    }
}

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
    $('.cheatlistcontain').css({
        'height': $(window).width() * 0.8 - 40 + 'px'
    });
    $('.cheatswitch').css({
        'margin-left': $(window).height() * 0.9 - 140 + 'px'
    });
    $('#closeModel,#closecheatsModel').css({
        "margin-left": $(window).height() * 0.8 + "px"
    });
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
    $('.opbtn').css({
        "left": ($('.tv-screen').offset().left + $('.tv-screen').width() + $('.tv-right').width()) + 'px'
    });
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
            $('#max_screen').text('鏀惧ぇ灞忓箷')
        } else {
            $('#max_screen').attr("screen", "1");
            $('#nes-canvas').css({
                "width": $(window).height() * 0.96 + "px",
                "height": $(window).height() * 0.9 + "px",
                "left": -$(window).height() * 0.96 + $('.tv-hr').width() + 'px',
                "top": -$('.tv-hr').offset().top + 20 + 'px'
            });
            $('#max_screen').text('缂╁皬灞忓箷')
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
    } else if (gameids[0] == gamepadid) return 1;
    else if (!gameids[1]) {
        gameids[1] == gamepadid;
        return 2
    } else if (gameids[1] == gamepadid) return 2;
    return 1
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
            gamecheatList[i] = {
                'address': address,
                'values': value,
                'desc': desc,
                'status': false
            }
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
            37: [3, 3, "鈫�"],
            38: [1, 3, "鈫�"],
            39: [4, 3, "鈫�"],
            40: [2, 3, "鈫�"],
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
            96: [9, 3, "鏁板瓧閿洏0"],
            97: [6, 3, "鏁板瓧閿洏1"],
            98: [5, 3, "鏁板瓧閿洏2"],
            100: [8, 3, "鏁板瓧閿洏4"],
            101: [7, 3, "鏁板瓧閿洏5"]
        };
        lstorage.keys = JSON.stringify(localkeybords)
    }
}

function initTableKey() {
    for (var k in localkeybords) {
        $("#keytable tr:eq(" + localkeybords[k][0] + ") td:nth-child(" + localkeybords[k][1] + ")").html(localkeybords[k][2])
    }
}

function RingBuffer(capacity, evictedCb) {
    this._elements = new Array(capacity || 50);
    this._first = 0;
    this._last = 0;
    this._size = 0;
    this._evictedCb = evictedCb
}

RingBuffer.prototype.capacity = function () {
    return this._elements.length
};
RingBuffer.prototype.isEmpty = function () {
    return this.size() === 0
};
RingBuffer.prototype.isFull = function () {
    return this.size() === this.capacity()
};
RingBuffer.prototype.peek = function () {
    if (this.isEmpty()) throw new Error('RingBuffer is empty');
    return this._elements[this._first]
};
RingBuffer.prototype.peekN = function (count) {
    if (count > this._size) throw new Error('Not enough elements in RingBuffer');
    var end = Math.min(this._first + count, this.capacity());
    var firstHalf = this._elements.slice(this._first, end);
    if (end < this.capacity()) {
        return firstHalf
    }
    var secondHalf = this._elements.slice(0, count - firstHalf.length);
    return firstHalf.concat(secondHalf)
};
RingBuffer.prototype.deq = function () {
    var element = this.peek();
    this._size--;
    this._first = (this._first + 1) % this.capacity();
    return element
};
RingBuffer.prototype.deqN = function (count) {
    var elements = this.peekN(count);
    this._size -= count;
    this._first = (this._first + count) % this.capacity();
    return elements
};
RingBuffer.prototype.enq = function (element) {
    this._end = (this._first + this.size()) % this.capacity();
    var full = this.isFull();
    if (full && this._evictedCb) {
        this._evictedCb(this._elements[this._end])
    }
    this._elements[this._end] = element;
    if (full) {
        this._first = (this._first + 1) % this.capacity()
    } else {
        this._size++
    }
    return this.size()
};
RingBuffer.prototype.size = function () {
    return this._size
};

function savehistory() {
    var canvas = document.getElementById("nes-canvas");
    var nesInfo = new Object();
    nesInfo.name = getQueryString("t");
    nesInfo.id = getQueryString("id");
    nesInfo.pic = canvas.toDataURL("image/jpeg", 0.3);
    nesInfo.url = window.location.href;
    var gameHistory = lstorage.gameHistory;
    if (gameHistory) {
        gameHistory = JSON.parse(gameHistory);
        for (var i = 0; i < gameHistory.length; i++) {
            if (gameHistory[i].id == nesInfo.id) {
                gameHistory.splice(i, 1);
                break
            }
        }
        if (gameHistory.length >= 8) {
            gameHistory.unshift(nesInfo);
            gameHistory.pop()
        } else {
            gameHistory.unshift(nesInfo)
        }
    } else {
        gameHistory = [];
        gameHistory.push(nesInfo)
    }
    lstorage.gameHistory = JSON.stringify(gameHistory)
}
