(function webpackUniversalModuleDefinition(a, b) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = b()
    } else {
        if (typeof define === "function" && define.amd) {
            define("jsnes", [], b)
        } else {
            if (typeof exports === "object") {
                exports["jsnes"] = b()
            } else {
                a["jsnes"] = b()
            }
        }
    }
})(typeof self !== "undefined" ? self : this, function() {
    return (function(a) {
        var b = {};

        function c(e) {
            if (b[e]) {
                return b[e].exports
            }
            var d = b[e] = {
                i: e,
                l: false,
                exports: {}
            };
            a[e].call(d.exports, d, d.exports, c);
            d.l = true;
            return d.exports
        }
        c.m = a;
        c.c = b;
        c.d = function(e, f, d) {
            if (!c.o(e, f)) {
                Object.defineProperty(e, f, {
                    configurable: false,
                    enumerable: true,
                    get: d
                })
            }
        };
        c.n = function(e) {
            var d = e && e.__esModule ? function f() {
                return e["default"]
            } : function g() {
                return e
            };
            c.d(d, "a", d);
            return d
        };
        c.o = function(d, e) {
            return Object.prototype.hasOwnProperty.call(d, e)
        };
        c.p = "";
        return c(c.s = 3)
    })([(function(b, a) {
        b.exports = {
            copyArrayElements: function(h, f, d, c, g) {
                for (var e = 0; e < g; ++e) {
                    d[c + e] = h[f + e]
                }
            },
            copyArray: function(c) {
                return c.slice(0)
            },
            fromJSON: function(e, d) {
                for (var c = 0; c < e.JSON_PROPERTIES.length; c++) {
                    e[e.JSON_PROPERTIES[c]] = d[e.JSON_PROPERTIES[c]]
                }
            },
            toJSON: function(e) {
                var d = {};
                for (var c = 0; c < e.JSON_PROPERTIES.length; c++) {
                    d[e.JSON_PROPERTIES[c]] = e[e.JSON_PROPERTIES[c]]
                }
                return d
            }
        }
    }), (function(b, a) {
        var c = function() {
            this.state = new Array(8);
            for (var d = 0; d < this.state.length; d++) {
                this.state[d] = 64
            }
        };
        c.BUTTON_A = 0;
        c.BUTTON_B = 1;
        c.BUTTON_SELECT = 2;
        c.BUTTON_START = 3;
        c.BUTTON_UP = 4;
        c.BUTTON_DOWN = 5;
        c.BUTTON_LEFT = 6;
        c.BUTTON_RIGHT = 7;
        c.prototype = {
            buttonDown: function(d) {
                this.state[d] = 65
            },
            buttonUp: function(d) {
                this.state[d] = 64
            },
            buttonValue: function(d, e) {
                this.state[d] = e
            }
        };
        b.exports = c
    }), (function(c, a) {
        var b = function() {
            this.pix = new Array(64);
            this.fbIndex = null;
            this.tIndex = null;
            this.x = null;
            this.y = null;
            this.w = null;
            this.h = null;
            this.incX = null;
            this.incY = null;
            this.palIndex = null;
            this.tpri = null;
            this.c = null;
            this.initialized = false;
            this.opaque = new Array(8)
        };
        b.prototype = {
            setBuffer: function(d) {
                for (this.y = 0; this.y < 8; this.y++) {
                    this.setScanline(this.y, d[this.y], d[this.y + 8])
                }
            },
            setScanline: function(f, e, d) {
                this.initialized = true;
                this.tIndex = f << 3;
                for (this.x = 0; this.x < 8; this.x++) {
                    this.pix[this.tIndex + this.x] = ((e >> (7 - this.x)) & 1) + (((d >> (7 - this.x)) & 1) << 1);
                    if (this.pix[this.tIndex + this.x] === 0) {
                        this.opaque[f] = false
                    }
                }
            },
            render: function(f, m, i, l, h, p, n, k, e, o, g, d, j) {
                if (p < -7 || p >= 256 || n < -7 || n >= 240) {
                    return
                }
                this.w = l - m;
                this.h = h - i;
                if (p < 0) {
                    m -= p
                }
                if (p + l >= 256) {
                    l = 256 - p
                }
                if (n < 0) {
                    i -= n
                }
                if (n + h >= 240) {
                    h = 240 - n
                }
                if (!o && !g) {
                    this.fbIndex = (n << 8) + p;
                    this.tIndex = 0;
                    for (this.y = 0; this.y < 8; this.y++) {
                        for (this.x = 0; this.x < 8; this.x++) {
                            if (this.x >= m && this.x < l && this.y >= i && this.y < h) {
                                this.palIndex = this.pix[this.tIndex];
                                this.tpri = j[this.fbIndex];
                                if (this.palIndex !== 0 && d <= (this.tpri & 255)) {
                                    f[this.fbIndex] = e[this.palIndex + k];
                                    this.tpri = (this.tpri & 3840) | d;
                                    j[this.fbIndex] = this.tpri
                                }
                            }
                            this.fbIndex++;
                            this.tIndex++
                        }
                        this.fbIndex -= 8;
                        this.fbIndex += 256
                    }
                } else {
                    if (o && !g) {
                        this.fbIndex = (n << 8) + p;
                        this.tIndex = 7;
                        for (this.y = 0; this.y < 8; this.y++) {
                            for (this.x = 0; this.x < 8; this.x++) {
                                if (this.x >= m && this.x < l && this.y >= i && this.y < h) {
                                    this.palIndex = this.pix[this.tIndex];
                                    this.tpri = j[this.fbIndex];
                                    if (this.palIndex !== 0 && d <= (this.tpri & 255)) {
                                        f[this.fbIndex] = e[this.palIndex + k];
                                        this.tpri = (this.tpri & 3840) | d;
                                        j[this.fbIndex] = this.tpri
                                    }
                                }
                                this.fbIndex++;
                                this.tIndex--
                            }
                            this.fbIndex -= 8;
                            this.fbIndex += 256;
                            this.tIndex += 16
                        }
                    } else {
                        if (g && !o) {
                            this.fbIndex = (n << 8) + p;
                            this.tIndex = 56;
                            for (this.y = 0; this.y < 8; this.y++) {
                                for (this.x = 0; this.x < 8; this.x++) {
                                    if (this.x >= m && this.x < l && this.y >= i && this.y < h) {
                                        this.palIndex = this.pix[this.tIndex];
                                        this.tpri = j[this.fbIndex];
                                        if (this.palIndex !== 0 && d <= (this.tpri & 255)) {
                                            f[this.fbIndex] = e[this.palIndex + k];
                                            this.tpri = (this.tpri & 3840) | d;
                                            j[this.fbIndex] = this.tpri
                                        }
                                    }
                                    this.fbIndex++;
                                    this.tIndex++
                                }
                                this.fbIndex -= 8;
                                this.fbIndex += 256;
                                this.tIndex -= 16
                            }
                        } else {
                            this.fbIndex = (n << 8) + p;
                            this.tIndex = 63;
                            for (this.y = 0; this.y < 8; this.y++) {
                                for (this.x = 0; this.x < 8; this.x++) {
                                    if (this.x >= m && this.x < l && this.y >= i && this.y < h) {
                                        this.palIndex = this.pix[this.tIndex];
                                        this.tpri = j[this.fbIndex];
                                        if (this.palIndex !== 0 && d <= (this.tpri & 255)) {
                                            f[this.fbIndex] = e[this.palIndex + k];
                                            this.tpri = (this.tpri & 3840) | d;
                                            j[this.fbIndex] = this.tpri
                                        }
                                    }
                                    this.fbIndex++;
                                    this.tIndex--
                                }
                                this.fbIndex -= 8;
                                this.fbIndex += 256
                            }
                        }
                    }
                }
            },
            isTransparent: function(d, e) {
                return this.pix[(e << 3) + d] === 0
            },
            toJSON: function() {
                return {
                    opaque: this.opaque,
                    pix: this.pix
                }
            },
            fromJSON: function(d) {
                this.opaque = d.opaque;
                this.pix = d.pix
            }
        };
        c.exports = b
    }), (function(b, a, c) {
        b.exports = {
            Controller: c(1),
            NES: c(4)
        }
    }), (function(c, f, b) {
        var a = b(5);
        var e = b(1);
        var h = b(6);
        var g = b(7);
        var i = b(8);
        var d = function(k) {
            this.opts = {
                onFrame: function() {},
                onAudioSample: null,
                onStatusUpdate: function() {},
                onBatteryRamWrite: function() {},
                preferredFrameRate: 60,
                emulateSound: true,
                sampleRate: 44100
            };
            if (typeof k !== "undefined") {
                var j;
                for (j in this.opts) {
                    if (typeof k[j] !== "undefined") {
                        this.opts[j] = k[j]
                    }
                }
            }
            this.frameTime = 1000 / this.opts.preferredFrameRate;
            this.ui = {
                writeFrame: this.opts.onFrame,
                updateStatus: this.opts.onStatusUpdate
            };
            this.cpu = new a(this);
            this.ppu = new h(this);
            this.papu = new g(this);
            this.mmap = null;
            this.controllers = {
                1: new e(),
                2: new e()
            };
            this.ui.updateStatus("Ready to load a ROM.");
            this.frame = this.frame.bind(this);
            this.buttonDown = this.buttonDown.bind(this);
            this.buttonValue = this.buttonValue.bind(this);
            this.buttonUp = this.buttonUp.bind(this);
            this.zapperMove = this.zapperMove.bind(this);
            this.zapperFireDown = this.zapperFireDown.bind(this);
            this.zapperFireUp = this.zapperFireUp.bind(this)
        };
        d.prototype = {
            fpsFrameCount: 0,
            romData: null,
            reset: function() {
                if (this.mmap !== null) {
                    this.mmap.reset()
                }
                this.cpu.reset();
                this.ppu.reset();
                this.papu.reset();
                this.lastFpsTime = null;
                this.fpsFrameCount = 0
            },
            frame: function() {
                this.ppu.startFrame();
                var l = 0;
                var j = this.opts.emulateSound;
                var k = this.cpu;
                var n = this.ppu;
                var m = this.papu;
                FRAMELOOP: for (;;) {
                    if (k.cyclesToHalt === 0) {
                        l = k.emulate();
                        if (j) {
                            m.clockFrameCounter(l)
                        }
                        l *= 3
                    } else {
                        if (k.cyclesToHalt > 8) {
                            l = 24;
                            if (j) {
                                m.clockFrameCounter(8)
                            }
                            k.cyclesToHalt -= 8
                        } else {
                            l = k.cyclesToHalt * 3;
                            if (j) {
                                m.clockFrameCounter(k.cyclesToHalt)
                            }
                            k.cyclesToHalt = 0
                        }
                    }
                    for (; l > 0; l--) {
                        if (n.curX === n.spr0HitX && n.f_spVisibility === 1 && n.scanline - 21 === n.spr0HitY) {
                            n.setStatusFlag(n.STATUS_SPRITE0HIT, true)
                        }
                        if (n.requestEndFrame) {
                            n.nmiCounter--;
                            if (n.nmiCounter === 0) {
                                n.requestEndFrame = false;
                                n.startVBlank();
                                break FRAMELOOP
                            }
                        }
                        n.curX++;
                        if (n.curX === 341) {
                            n.curX = 0;
                            n.endScanline()
                        }
                    }
                }
                this.fpsFrameCount++
            },
            buttonDown: function(j, k) {
                this.controllers[j].buttonDown(k)
            },
            buttonUp: function(j, k) {
                this.controllers[j].buttonUp(k)
            },
            buttonValue: function(j, k, l) {
                this.controllers[j].buttonValue(k, l)
            },
            zapperMove: function(j, k) {
                if (!this.mmap) {
                    return
                }
                this.mmap.zapperX = j;
                this.mmap.zapperY = k
            },
            zapperFireDown: function() {
                if (!this.mmap) {
                    return
                }
                this.mmap.zapperFired = true
            },
            zapperFireUp: function() {
                if (!this.mmap) {
                    return
                }
                this.mmap.zapperFired = false
            },
            getFPS: function() {
                var j = +new Date();
                var k = null;
                if (this.lastFpsTime) {
                    k = this.fpsFrameCount / ((j - this.lastFpsTime) / 1000)
                }
                this.fpsFrameCount = 0;
                this.lastFpsTime = j;
                return k
            },
            reloadROM: function() {
                if (this.romData !== null) {
                    this.loadROM(this.romData)
                }
            },
            loadROM: function(j) {
                this.rom = new i(this);
                this.rom.load(j);
                this.reset();
                this.mmap = this.rom.createMapper();
                this.mmap.loadROM();
                this.ppu.setMirroring(this.rom.getMirroringType());
                this.romData = j
            },
            setFramerate: function(j) {
                this.opts.preferredFrameRate = j;
                this.frameTime = 1000 / j;
                this.papu.setSampleRate(this.opts.sampleRate, false)
            },
            toJSON: function() {
                return {
                    romData: this.romData,
                    cpu: this.cpu.toJSON(),
                    mmap: this.mmap.toJSON(),
                    ppu: this.ppu.toJSON()
                }
            },
            fromJSON: function(j) {
                this.loadROM(j.romData);
                this.cpu.fromJSON(j.cpu);
                this.mmap.fromJSON(j.mmap);
                this.ppu.fromJSON(j.ppu)
            }
        };
        c.exports = d
    }), (function(d, b, f) {
        var a = f(0);
        var c = function(g) {
            this.nes = g;
            this.mem = null;
            this.REG_ACC = null;
            this.REG_X = null;
            this.REG_Y = null;
            this.REG_SP = null;
            this.REG_PC = null;
            this.REG_PC_NEW = null;
            this.REG_STATUS = null;
            this.F_CARRY = null;
            this.F_DECIMAL = null;
            this.F_INTERRUPT = null;
            this.F_INTERRUPT_NEW = null;
            this.F_OVERFLOW = null;
            this.F_SIGN = null;
            this.F_ZERO = null;
            this.F_NOTUSED = null;
            this.F_NOTUSED_NEW = null;
            this.F_BRK = null;
            this.F_BRK_NEW = null;
            this.opdata = null;
            this.cyclesToHalt = null;
            this.crash = null;
            this.irqRequested = null;
            this.irqType = null;
            this.reset()
        };
        c.prototype = {
            IRQ_NORMAL: 0,
            IRQ_NMI: 1,
            IRQ_RESET: 2,
            reset: function() {
                this.mem = new Array(65536);
                for (var l = 0; l < 8192; l++) {
                    this.mem[l] = 255
                }
                for (var m = 0; m < 4; m++) {
                    var h = m * 2048;
                    this.mem[h + 8] = 247;
                    this.mem[h + 9] = 239;
                    this.mem[h + 10] = 223;
                    this.mem[h + 15] = 191
                }
                for (var g = 8193; g < this.mem.length; g++) {
                    this.mem[g] = 0
                }
                this.REG_ACC = 0;
                this.REG_X = 0;
                this.REG_Y = 0;
                this.REG_SP = 511;
                this.REG_PC = 32768 - 1;
                this.REG_PC_NEW = 32768 - 1;
                this.REG_STATUS = 40;
                this.setStatus(40);
                this.F_CARRY = 0;
                this.F_DECIMAL = 0;
                this.F_INTERRUPT = 1;
                this.F_INTERRUPT_NEW = 1;
                this.F_OVERFLOW = 0;
                this.F_SIGN = 0;
                this.F_ZERO = 1;
                this.F_NOTUSED = 1;
                this.F_NOTUSED_NEW = 1;
                this.F_BRK = 1;
                this.F_BRK_NEW = 1;
                this.opdata = new e().opdata;
                this.cyclesToHalt = 0;
                this.crash = false;
                this.irqRequested = false;
                this.irqType = null
            },
            emulate: function() {
                var i;
                var m;
                if (this.irqRequested) {
                    i = this.F_CARRY | ((this.F_ZERO === 0 ? 1 : 0) << 1) | (this.F_INTERRUPT << 2) | (this.F_DECIMAL << 3) | (this.F_BRK << 4) | (this.F_NOTUSED << 5) | (this.F_OVERFLOW << 6) | (this.F_SIGN << 7);
                    this.REG_PC_NEW = this.REG_PC;
                    this.F_INTERRUPT_NEW = this.F_INTERRUPT;
                    switch (this.irqType) {
                        case 0:
                            if (this.F_INTERRUPT !== 0) {
                                break
                            }
                            this.doIrq(i);
                            break;
                        case 1:
                            this.doNonMaskableInterrupt(i);
                            break;
                        case 2:
                            this.doResetInterrupt();
                            break
                    }
                    this.REG_PC = this.REG_PC_NEW;
                    this.F_INTERRUPT = this.F_INTERRUPT_NEW;
                    this.F_BRK = this.F_BRK_NEW;
                    this.irqRequested = false
                }
                var k = this.opdata[this.nes.mmap.load(this.REG_PC + 1)];
                var j = k >> 24;
                var l = 0;
                var h = (k >> 8) & 255;
                var g = this.REG_PC;
                this.REG_PC += (k >> 16) & 255;
                var n = 0;
                switch (h) {
                    case 0:
                        n = this.load(g + 2);
                        break;
                    case 1:
                        n = this.load(g + 2);
                        if (n < 128) {
                            n += this.REG_PC
                        } else {
                            n += this.REG_PC - 256
                        }
                        break;
                    case 2:
                        break;
                    case 3:
                        n = this.load16bit(g + 2);
                        break;
                    case 4:
                        n = this.REG_ACC;
                        break;
                    case 5:
                        n = this.REG_PC;
                        break;
                    case 6:
                        n = (this.load(g + 2) + this.REG_X) & 255;
                        break;
                    case 7:
                        n = (this.load(g + 2) + this.REG_Y) & 255;
                        break;
                    case 8:
                        n = this.load16bit(g + 2);
                        if ((n & 65280) !== ((n + this.REG_X) & 65280)) {
                            l = 1
                        }
                        n += this.REG_X;
                        break;
                    case 9:
                        n = this.load16bit(g + 2);
                        if ((n & 65280) !== ((n + this.REG_Y) & 65280)) {
                            l = 1
                        }
                        n += this.REG_Y;
                        break;
                    case 10:
                        n = this.load(g + 2);
                        if ((n & 65280) !== ((n + this.REG_X) & 65280)) {
                            l = 1
                        }
                        n += this.REG_X;
                        n &= 255;
                        n = this.load16bit(n);
                        break;
                    case 11:
                        n = this.load16bit(this.load(g + 2));
                        if ((n & 65280) !== ((n + this.REG_Y) & 65280)) {
                            l = 1
                        }
                        n += this.REG_Y;
                        break;
                    case 12:
                        n = this.load16bit(g + 2);
                        if (n < 8191) {
                            n = this.mem[n] + (this.mem[(n & 65280) | (((n & 255) + 1) & 255)] << 8)
                        } else {
                            n = this.nes.mmap.load(n) + (this.nes.mmap.load((n & 65280) | (((n & 255) + 1) & 255)) << 8)
                        }
                        break
                }
                n &= 65535;
                switch (k & 255) {
                    case 0:
                        i = this.REG_ACC + this.load(n) + this.F_CARRY;
                        if (((this.REG_ACC ^ this.load(n)) & 128) === 0 && ((this.REG_ACC ^ i) & 128) !== 0) {
                            this.F_OVERFLOW = 1
                        } else {
                            this.F_OVERFLOW = 0
                        }
                        this.F_CARRY = i > 255 ? 1 : 0;
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i & 255;
                        this.REG_ACC = i & 255;
                        j += l;
                        break;
                    case 1:
                        this.REG_ACC = this.REG_ACC & this.load(n);
                        this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        this.F_ZERO = this.REG_ACC;
                        if (h !== 11) {
                            j += l
                        }
                        break;
                    case 2:
                        if (h === 4) {
                            this.F_CARRY = (this.REG_ACC >> 7) & 1;
                            this.REG_ACC = (this.REG_ACC << 1) & 255;
                            this.F_SIGN = (this.REG_ACC >> 7) & 1;
                            this.F_ZERO = this.REG_ACC
                        } else {
                            i = this.load(n);
                            this.F_CARRY = (i >> 7) & 1;
                            i = (i << 1) & 255;
                            this.F_SIGN = (i >> 7) & 1;
                            this.F_ZERO = i;
                            this.write(n, i)
                        }
                        break;
                    case 3:
                        if (this.F_CARRY === 0) {
                            j += (g & 65280) !== (n & 65280) ? 2 : 1;
                            this.REG_PC = n
                        }
                        break;
                    case 4:
                        if (this.F_CARRY === 1) {
                            j += (g & 65280) !== (n & 65280) ? 2 : 1;
                            this.REG_PC = n
                        }
                        break;
                    case 5:
                        if (this.F_ZERO === 0) {
                            j += (g & 65280) !== (n & 65280) ? 2 : 1;
                            this.REG_PC = n
                        }
                        break;
                    case 6:
                        i = this.load(n);
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_OVERFLOW = (i >> 6) & 1;
                        i &= this.REG_ACC;
                        this.F_ZERO = i;
                        break;
                    case 7:
                        if (this.F_SIGN === 1) {
                            j++;
                            this.REG_PC = n
                        }
                        break;
                    case 8:
                        if (this.F_ZERO !== 0) {
                            j += (g & 65280) !== (n & 65280) ? 2 : 1;
                            this.REG_PC = n
                        }
                        break;
                    case 9:
                        if (this.F_SIGN === 0) {
                            j += (g & 65280) !== (n & 65280) ? 2 : 1;
                            this.REG_PC = n
                        }
                        break;
                    case 10:
                        this.REG_PC += 2;
                        this.push((this.REG_PC >> 8) & 255);
                        this.push(this.REG_PC & 255);
                        this.F_BRK = 1;
                        this.push(this.F_CARRY | ((this.F_ZERO === 0 ? 1 : 0) << 1) | (this.F_INTERRUPT << 2) | (this.F_DECIMAL << 3) | (this.F_BRK << 4) | (this.F_NOTUSED << 5) | (this.F_OVERFLOW << 6) | (this.F_SIGN << 7));
                        this.F_INTERRUPT = 1;
                        this.REG_PC = this.load16bit(65534);
                        this.REG_PC--;
                        break;
                    case 11:
                        if (this.F_OVERFLOW === 0) {
                            j += (g & 65280) !== (n & 65280) ? 2 : 1;
                            this.REG_PC = n
                        }
                        break;
                    case 12:
                        if (this.F_OVERFLOW === 1) {
                            j += (g & 65280) !== (n & 65280) ? 2 : 1;
                            this.REG_PC = n
                        }
                        break;
                    case 13:
                        this.F_CARRY = 0;
                        break;
                    case 14:
                        this.F_DECIMAL = 0;
                        break;
                    case 15:
                        this.F_INTERRUPT = 0;
                        break;
                    case 16:
                        this.F_OVERFLOW = 0;
                        break;
                    case 17:
                        i = this.REG_ACC - this.load(n);
                        this.F_CARRY = i >= 0 ? 1 : 0;
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i & 255;
                        j += l;
                        break;
                    case 18:
                        i = this.REG_X - this.load(n);
                        this.F_CARRY = i >= 0 ? 1 : 0;
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i & 255;
                        break;
                    case 19:
                        i = this.REG_Y - this.load(n);
                        this.F_CARRY = i >= 0 ? 1 : 0;
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i & 255;
                        break;
                    case 20:
                        i = (this.load(n) - 1) & 255;
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i;
                        this.write(n, i);
                        break;
                    case 21:
                        this.REG_X = (this.REG_X - 1) & 255;
                        this.F_SIGN = (this.REG_X >> 7) & 1;
                        this.F_ZERO = this.REG_X;
                        break;
                    case 22:
                        this.REG_Y = (this.REG_Y - 1) & 255;
                        this.F_SIGN = (this.REG_Y >> 7) & 1;
                        this.F_ZERO = this.REG_Y;
                        break;
                    case 23:
                        this.REG_ACC = (this.load(n) ^ this.REG_ACC) & 255;
                        this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        this.F_ZERO = this.REG_ACC;
                        j += l;
                        break;
                    case 24:
                        i = (this.load(n) + 1) & 255;
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i;
                        this.write(n, i & 255);
                        break;
                    case 25:
                        this.REG_X = (this.REG_X + 1) & 255;
                        this.F_SIGN = (this.REG_X >> 7) & 1;
                        this.F_ZERO = this.REG_X;
                        break;
                    case 26:
                        this.REG_Y++;
                        this.REG_Y &= 255;
                        this.F_SIGN = (this.REG_Y >> 7) & 1;
                        this.F_ZERO = this.REG_Y;
                        break;
                    case 27:
                        this.REG_PC = n - 1;
                        break;
                    case 28:
                        this.push((this.REG_PC >> 8) & 255);
                        this.push(this.REG_PC & 255);
                        this.REG_PC = n - 1;
                        break;
                    case 29:
                        this.REG_ACC = this.load(n);
                        this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        this.F_ZERO = this.REG_ACC;
                        j += l;
                        break;
                    case 30:
                        this.REG_X = this.load(n);
                        this.F_SIGN = (this.REG_X >> 7) & 1;
                        this.F_ZERO = this.REG_X;
                        j += l;
                        break;
                    case 31:
                        this.REG_Y = this.load(n);
                        this.F_SIGN = (this.REG_Y >> 7) & 1;
                        this.F_ZERO = this.REG_Y;
                        j += l;
                        break;
                    case 32:
                        if (h === 4) {
                            i = this.REG_ACC & 255;
                            this.F_CARRY = i & 1;
                            i >>= 1;
                            this.REG_ACC = i
                        } else {
                            i = this.load(n) & 255;
                            this.F_CARRY = i & 1;
                            i >>= 1;
                            this.write(n, i)
                        }
                        this.F_SIGN = 0;
                        this.F_ZERO = i;
                        break;
                    case 33:
                        break;
                    case 34:
                        i = (this.load(n) | this.REG_ACC) & 255;
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i;
                        this.REG_ACC = i;
                        if (h !== 11) {
                            j += l
                        }
                        break;
                    case 35:
                        this.push(this.REG_ACC);
                        break;
                    case 36:
                        this.F_BRK = 1;
                        this.push(this.F_CARRY | ((this.F_ZERO === 0 ? 1 : 0) << 1) | (this.F_INTERRUPT << 2) | (this.F_DECIMAL << 3) | (this.F_BRK << 4) | (this.F_NOTUSED << 5) | (this.F_OVERFLOW << 6) | (this.F_SIGN << 7));
                        break;
                    case 37:
                        this.REG_ACC = this.pull();
                        this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        this.F_ZERO = this.REG_ACC;
                        break;
                    case 38:
                        i = this.pull();
                        this.F_CARRY = i & 1;
                        this.F_ZERO = ((i >> 1) & 1) === 1 ? 0 : 1;
                        this.F_INTERRUPT = (i >> 2) & 1;
                        this.F_DECIMAL = (i >> 3) & 1;
                        this.F_BRK = (i >> 4) & 1;
                        this.F_NOTUSED = (i >> 5) & 1;
                        this.F_OVERFLOW = (i >> 6) & 1;
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_NOTUSED = 1;
                        break;
                    case 39:
                        if (h === 4) {
                            i = this.REG_ACC;
                            m = this.F_CARRY;
                            this.F_CARRY = (i >> 7) & 1;
                            i = ((i << 1) & 255) + m;
                            this.REG_ACC = i
                        } else {
                            i = this.load(n);
                            m = this.F_CARRY;
                            this.F_CARRY = (i >> 7) & 1;
                            i = ((i << 1) & 255) + m;
                            this.write(n, i)
                        }
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i;
                        break;
                    case 40:
                        if (h === 4) {
                            m = this.F_CARRY << 7;
                            this.F_CARRY = this.REG_ACC & 1;
                            i = (this.REG_ACC >> 1) + m;
                            this.REG_ACC = i
                        } else {
                            i = this.load(n);
                            m = this.F_CARRY << 7;
                            this.F_CARRY = i & 1;
                            i = (i >> 1) + m;
                            this.write(n, i)
                        }
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i;
                        break;
                    case 41:
                        i = this.pull();
                        this.F_CARRY = i & 1;
                        this.F_ZERO = ((i >> 1) & 1) === 0 ? 1 : 0;
                        this.F_INTERRUPT = (i >> 2) & 1;
                        this.F_DECIMAL = (i >> 3) & 1;
                        this.F_BRK = (i >> 4) & 1;
                        this.F_NOTUSED = (i >> 5) & 1;
                        this.F_OVERFLOW = (i >> 6) & 1;
                        this.F_SIGN = (i >> 7) & 1;
                        this.REG_PC = this.pull();
                        this.REG_PC += this.pull() << 8;
                        if (this.REG_PC === 65535) {
                            return
                        }
                        this.REG_PC--;
                        this.F_NOTUSED = 1;
                        break;
                    case 42:
                        this.REG_PC = this.pull();
                        this.REG_PC += this.pull() << 8;
                        if (this.REG_PC === 65535) {
                            return
                        }
                        break;
                    case 43:
                        i = this.REG_ACC - this.load(n) - (1 - this.F_CARRY);
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i & 255;
                        if (((this.REG_ACC ^ i) & 128) !== 0 && ((this.REG_ACC ^ this.load(n)) & 128) !== 0) {
                            this.F_OVERFLOW = 1
                        } else {
                            this.F_OVERFLOW = 0
                        }
                        this.F_CARRY = i < 0 ? 0 : 1;
                        this.REG_ACC = i & 255;
                        if (h !== 11) {
                            j += l
                        }
                        break;
                    case 44:
                        this.F_CARRY = 1;
                        break;
                    case 45:
                        this.F_DECIMAL = 1;
                        break;
                    case 46:
                        this.F_INTERRUPT = 1;
                        break;
                    case 47:
                        this.write(n, this.REG_ACC);
                        break;
                    case 48:
                        this.write(n, this.REG_X);
                        break;
                    case 49:
                        this.write(n, this.REG_Y);
                        break;
                    case 50:
                        this.REG_X = this.REG_ACC;
                        this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        this.F_ZERO = this.REG_ACC;
                        break;
                    case 51:
                        this.REG_Y = this.REG_ACC;
                        this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        this.F_ZERO = this.REG_ACC;
                        break;
                    case 52:
                        this.REG_X = this.REG_SP - 256;
                        this.F_SIGN = (this.REG_SP >> 7) & 1;
                        this.F_ZERO = this.REG_X;
                        break;
                    case 53:
                        this.REG_ACC = this.REG_X;
                        this.F_SIGN = (this.REG_X >> 7) & 1;
                        this.F_ZERO = this.REG_X;
                        break;
                    case 54:
                        this.REG_SP = this.REG_X + 256;
                        this.stackWrap();
                        break;
                    case 55:
                        this.REG_ACC = this.REG_Y;
                        this.F_SIGN = (this.REG_Y >> 7) & 1;
                        this.F_ZERO = this.REG_Y;
                        break;
                    case 56:
                        i = this.REG_ACC & this.load(n);
                        this.F_CARRY = i & 1;
                        this.REG_ACC = this.F_ZERO = i >> 1;
                        this.F_SIGN = 0;
                        break;
                    case 57:
                        this.REG_ACC = this.F_ZERO = this.REG_ACC & this.load(n);
                        this.F_CARRY = this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        break;
                    case 58:
                        i = this.REG_ACC & this.load(n);
                        this.REG_ACC = this.F_ZERO = (i >> 1) + (this.F_CARRY << 7);
                        this.F_SIGN = this.F_CARRY;
                        this.F_CARRY = (i >> 7) & 1;
                        this.F_OVERFLOW = ((i >> 7) ^ (i >> 6)) & 1;
                        break;
                    case 59:
                        i = (this.REG_X & this.REG_ACC) - this.load(n);
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i & 255;
                        if (((this.REG_X ^ i) & 128) !== 0 && ((this.REG_X ^ this.load(n)) & 128) !== 0) {
                            this.F_OVERFLOW = 1
                        } else {
                            this.F_OVERFLOW = 0
                        }
                        this.F_CARRY = i < 0 ? 0 : 1;
                        this.REG_X = i & 255;
                        break;
                    case 60:
                        this.REG_ACC = this.REG_X = this.F_ZERO = this.load(n);
                        this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        j += l;
                        break;
                    case 61:
                        this.write(n, this.REG_ACC & this.REG_X);
                        break;
                    case 62:
                        i = (this.load(n) - 1) & 255;
                        this.write(n, i);
                        i = this.REG_ACC - i;
                        this.F_CARRY = i >= 0 ? 1 : 0;
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i & 255;
                        if (h !== 11) {
                            j += l
                        }
                        break;
                    case 63:
                        i = (this.load(n) + 1) & 255;
                        this.write(n, i);
                        i = this.REG_ACC - i - (1 - this.F_CARRY);
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i & 255;
                        if (((this.REG_ACC ^ i) & 128) !== 0 && ((this.REG_ACC ^ this.load(n)) & 128) !== 0) {
                            this.F_OVERFLOW = 1
                        } else {
                            this.F_OVERFLOW = 0
                        }
                        this.F_CARRY = i < 0 ? 0 : 1;
                        this.REG_ACC = i & 255;
                        if (h !== 11) {
                            j += l
                        }
                        break;
                    case 64:
                        i = this.load(n);
                        m = this.F_CARRY;
                        this.F_CARRY = (i >> 7) & 1;
                        i = ((i << 1) & 255) + m;
                        this.write(n, i);
                        this.REG_ACC = this.REG_ACC & i;
                        this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        this.F_ZERO = this.REG_ACC;
                        if (h !== 11) {
                            j += l
                        }
                        break;
                    case 65:
                        i = this.load(n);
                        m = this.F_CARRY << 7;
                        this.F_CARRY = i & 1;
                        i = (i >> 1) + m;
                        this.write(n, i);
                        i = this.REG_ACC + this.load(n) + this.F_CARRY;
                        if (((this.REG_ACC ^ this.load(n)) & 128) === 0 && ((this.REG_ACC ^ i) & 128) !== 0) {
                            this.F_OVERFLOW = 1
                        } else {
                            this.F_OVERFLOW = 0
                        }
                        this.F_CARRY = i > 255 ? 1 : 0;
                        this.F_SIGN = (i >> 7) & 1;
                        this.F_ZERO = i & 255;
                        this.REG_ACC = i & 255;
                        if (h !== 11) {
                            j += l
                        }
                        break;
                    case 66:
                        i = this.load(n);
                        this.F_CARRY = (i >> 7) & 1;
                        i = (i << 1) & 255;
                        this.write(n, i);
                        this.REG_ACC = this.REG_ACC | i;
                        this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        this.F_ZERO = this.REG_ACC;
                        if (h !== 11) {
                            j += l
                        }
                        break;
                    case 67:
                        i = this.load(n) & 255;
                        this.F_CARRY = i & 1;
                        i >>= 1;
                        this.write(n, i);
                        this.REG_ACC = this.REG_ACC ^ i;
                        this.F_SIGN = (this.REG_ACC >> 7) & 1;
                        this.F_ZERO = this.REG_ACC;
                        if (h !== 11) {
                            j += l
                        }
                        break;
                    case 68:
                        break;
                    case 69:
                        this.load(n);
                        if (h !== 11) {
                            j += l
                        }
                        break;
                    default:
                        this.nes.stop();
                        this.nes.crashMessage = "Game crashed, invalid opcode at address $" + g.toString(16);
                        break
                }
                return j
            },
            load: function(g) {
                if (g < 8192) {
                    return this.mem[g & 2047]
                } else {
                    return this.nes.mmap.load(g)
                }
            },
            load16bit: function(g) {
                if (g < 8191) {
                    return this.mem[g & 2047] | (this.mem[(g + 1) & 2047] << 8)
                } else {
                    return this.nes.mmap.load(g) | (this.nes.mmap.load(g + 1) << 8)
                }
            },
            write: function(h, g) {
                if (h < 8192) {
                    this.mem[h & 2047] = g
                } else {
                    this.nes.mmap.write(h, g)
                }
            },
            requestIrq: function(g) {
                if (this.irqRequested) {
                    if (g === this.IRQ_NORMAL) {
                        return
                    }
                }
                this.irqRequested = true;
                this.irqType = g
            },
            push: function(g) {
                this.nes.mmap.write(this.REG_SP, g);
                this.REG_SP--;
                this.REG_SP = 256 | (this.REG_SP & 255)
            },
            stackWrap: function() {
                this.REG_SP = 256 | (this.REG_SP & 255)
            },
            pull: function() {
                this.REG_SP++;
                this.REG_SP = 256 | (this.REG_SP & 255);
                return this.nes.mmap.load(this.REG_SP)
            },
            pageCrossed: function(h, g) {
                return (h & 65280) !== (g & 65280)
            },
            haltCycles: function(g) {
                this.cyclesToHalt += g
            },
            doNonMaskableInterrupt: function(g) {
                if ((this.nes.mmap.load(8192) & 128) !== 0) {
                    this.REG_PC_NEW++;
                    this.push((this.REG_PC_NEW >> 8) & 255);
                    this.push(this.REG_PC_NEW & 255);
                    this.push(g);
                    this.REG_PC_NEW = this.nes.mmap.load(65530) | (this.nes.mmap.load(65531) << 8);
                    this.REG_PC_NEW--
                }
            },
            doResetInterrupt: function() {
                this.REG_PC_NEW = this.nes.mmap.load(65532) | (this.nes.mmap.load(65533) << 8);
                this.REG_PC_NEW--
            },
            doIrq: function(g) {
                this.REG_PC_NEW++;
                this.push((this.REG_PC_NEW >> 8) & 255);
                this.push(this.REG_PC_NEW & 255);
                this.push(g);
                this.F_INTERRUPT_NEW = 1;
                this.F_BRK_NEW = 0;
                this.REG_PC_NEW = this.nes.mmap.load(65534) | (this.nes.mmap.load(65535) << 8);
                this.REG_PC_NEW--
            },
            getStatus: function() {
                return (this.F_CARRY | (this.F_ZERO << 1) | (this.F_INTERRUPT << 2) | (this.F_DECIMAL << 3) | (this.F_BRK << 4) | (this.F_NOTUSED << 5) | (this.F_OVERFLOW << 6) | (this.F_SIGN << 7))
            },
            setStatus: function(g) {
                this.F_CARRY = g & 1;
                this.F_ZERO = (g >> 1) & 1;
                this.F_INTERRUPT = (g >> 2) & 1;
                this.F_DECIMAL = (g >> 3) & 1;
                this.F_BRK = (g >> 4) & 1;
                this.F_NOTUSED = (g >> 5) & 1;
                this.F_OVERFLOW = (g >> 6) & 1;
                this.F_SIGN = (g >> 7) & 1
            },
            JSON_PROPERTIES: ["mem", "cyclesToHalt", "irqRequested", "irqType", "REG_ACC", "REG_X", "REG_Y", "REG_SP", "REG_PC", "REG_PC_NEW", "REG_STATUS", "F_CARRY", "F_DECIMAL", "F_INTERRUPT", "F_INTERRUPT_NEW", "F_OVERFLOW", "F_SIGN", "F_ZERO", "F_NOTUSED", "F_NOTUSED_NEW", "F_BRK", "F_BRK_NEW"],
            toJSON: function() {
                return a.toJSON(this)
            },
            fromJSON: function(g) {
                a.fromJSON(this, g)
            }
        };
        var e = function() {
            this.opdata = new Array(256);
            for (var g = 0; g < 256; g++) {
                this.opdata[g] = 255
            }
            this.setOp(this.INS_ADC, 105, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_ADC, 101, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_ADC, 117, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_ADC, 109, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_ADC, 125, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_ADC, 121, this.ADDR_ABSY, 3, 4);
            this.setOp(this.INS_ADC, 97, this.ADDR_PREIDXIND, 2, 6);
            this.setOp(this.INS_ADC, 113, this.ADDR_POSTIDXIND, 2, 5);
            this.setOp(this.INS_AND, 41, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_AND, 37, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_AND, 53, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_AND, 45, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_AND, 61, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_AND, 57, this.ADDR_ABSY, 3, 4);
            this.setOp(this.INS_AND, 33, this.ADDR_PREIDXIND, 2, 6);
            this.setOp(this.INS_AND, 49, this.ADDR_POSTIDXIND, 2, 5);
            this.setOp(this.INS_ASL, 10, this.ADDR_ACC, 1, 2);
            this.setOp(this.INS_ASL, 6, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_ASL, 22, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_ASL, 14, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_ASL, 30, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_BCC, 144, this.ADDR_REL, 2, 2);
            this.setOp(this.INS_BCS, 176, this.ADDR_REL, 2, 2);
            this.setOp(this.INS_BEQ, 240, this.ADDR_REL, 2, 2);
            this.setOp(this.INS_BIT, 36, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_BIT, 44, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_BMI, 48, this.ADDR_REL, 2, 2);
            this.setOp(this.INS_BNE, 208, this.ADDR_REL, 2, 2);
            this.setOp(this.INS_BPL, 16, this.ADDR_REL, 2, 2);
            this.setOp(this.INS_BRK, 0, this.ADDR_IMP, 1, 7);
            this.setOp(this.INS_BVC, 80, this.ADDR_REL, 2, 2);
            this.setOp(this.INS_BVS, 112, this.ADDR_REL, 2, 2);
            this.setOp(this.INS_CLC, 24, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_CLD, 216, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_CLI, 88, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_CLV, 184, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_CMP, 201, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_CMP, 197, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_CMP, 213, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_CMP, 205, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_CMP, 221, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_CMP, 217, this.ADDR_ABSY, 3, 4);
            this.setOp(this.INS_CMP, 193, this.ADDR_PREIDXIND, 2, 6);
            this.setOp(this.INS_CMP, 209, this.ADDR_POSTIDXIND, 2, 5);
            this.setOp(this.INS_CPX, 224, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_CPX, 228, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_CPX, 236, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_CPY, 192, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_CPY, 196, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_CPY, 204, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_DEC, 198, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_DEC, 214, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_DEC, 206, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_DEC, 222, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_DEX, 202, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_DEY, 136, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_EOR, 73, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_EOR, 69, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_EOR, 85, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_EOR, 77, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_EOR, 93, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_EOR, 89, this.ADDR_ABSY, 3, 4);
            this.setOp(this.INS_EOR, 65, this.ADDR_PREIDXIND, 2, 6);
            this.setOp(this.INS_EOR, 81, this.ADDR_POSTIDXIND, 2, 5);
            this.setOp(this.INS_INC, 230, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_INC, 246, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_INC, 238, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_INC, 254, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_INX, 232, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_INY, 200, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_JMP, 76, this.ADDR_ABS, 3, 3);
            this.setOp(this.INS_JMP, 108, this.ADDR_INDABS, 3, 5);
            this.setOp(this.INS_JSR, 32, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_LDA, 169, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_LDA, 165, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_LDA, 181, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_LDA, 173, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_LDA, 189, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_LDA, 185, this.ADDR_ABSY, 3, 4);
            this.setOp(this.INS_LDA, 161, this.ADDR_PREIDXIND, 2, 6);
            this.setOp(this.INS_LDA, 177, this.ADDR_POSTIDXIND, 2, 5);
            this.setOp(this.INS_LDX, 162, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_LDX, 166, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_LDX, 182, this.ADDR_ZPY, 2, 4);
            this.setOp(this.INS_LDX, 174, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_LDX, 190, this.ADDR_ABSY, 3, 4);
            this.setOp(this.INS_LDY, 160, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_LDY, 164, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_LDY, 180, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_LDY, 172, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_LDY, 188, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_LSR, 74, this.ADDR_ACC, 1, 2);
            this.setOp(this.INS_LSR, 70, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_LSR, 86, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_LSR, 78, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_LSR, 94, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_NOP, 26, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_NOP, 58, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_NOP, 90, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_NOP, 122, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_NOP, 218, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_NOP, 234, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_NOP, 250, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_ORA, 9, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_ORA, 5, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_ORA, 21, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_ORA, 13, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_ORA, 29, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_ORA, 25, this.ADDR_ABSY, 3, 4);
            this.setOp(this.INS_ORA, 1, this.ADDR_PREIDXIND, 2, 6);
            this.setOp(this.INS_ORA, 17, this.ADDR_POSTIDXIND, 2, 5);
            this.setOp(this.INS_PHA, 72, this.ADDR_IMP, 1, 3);
            this.setOp(this.INS_PHP, 8, this.ADDR_IMP, 1, 3);
            this.setOp(this.INS_PLA, 104, this.ADDR_IMP, 1, 4);
            this.setOp(this.INS_PLP, 40, this.ADDR_IMP, 1, 4);
            this.setOp(this.INS_ROL, 42, this.ADDR_ACC, 1, 2);
            this.setOp(this.INS_ROL, 38, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_ROL, 54, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_ROL, 46, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_ROL, 62, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_ROR, 106, this.ADDR_ACC, 1, 2);
            this.setOp(this.INS_ROR, 102, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_ROR, 118, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_ROR, 110, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_ROR, 126, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_RTI, 64, this.ADDR_IMP, 1, 6);
            this.setOp(this.INS_RTS, 96, this.ADDR_IMP, 1, 6);
            this.setOp(this.INS_SBC, 233, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_SBC, 229, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_SBC, 245, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_SBC, 237, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_SBC, 253, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_SBC, 249, this.ADDR_ABSY, 3, 4);
            this.setOp(this.INS_SBC, 225, this.ADDR_PREIDXIND, 2, 6);
            this.setOp(this.INS_SBC, 241, this.ADDR_POSTIDXIND, 2, 5);
            this.setOp(this.INS_SEC, 56, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_SED, 248, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_SEI, 120, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_STA, 133, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_STA, 149, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_STA, 141, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_STA, 157, this.ADDR_ABSX, 3, 5);
            this.setOp(this.INS_STA, 153, this.ADDR_ABSY, 3, 5);
            this.setOp(this.INS_STA, 129, this.ADDR_PREIDXIND, 2, 6);
            this.setOp(this.INS_STA, 145, this.ADDR_POSTIDXIND, 2, 6);
            this.setOp(this.INS_STX, 134, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_STX, 150, this.ADDR_ZPY, 2, 4);
            this.setOp(this.INS_STX, 142, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_STY, 132, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_STY, 148, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_STY, 140, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_TAX, 170, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_TAY, 168, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_TSX, 186, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_TXA, 138, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_TXS, 154, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_TYA, 152, this.ADDR_IMP, 1, 2);
            this.setOp(this.INS_ALR, 75, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_ANC, 11, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_ANC, 43, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_ARR, 107, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_AXS, 203, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_LAX, 163, this.ADDR_PREIDXIND, 2, 6);
            this.setOp(this.INS_LAX, 167, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_LAX, 175, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_LAX, 179, this.ADDR_POSTIDXIND, 2, 5);
            this.setOp(this.INS_LAX, 183, this.ADDR_ZPY, 2, 4);
            this.setOp(this.INS_LAX, 191, this.ADDR_ABSY, 3, 4);
            this.setOp(this.INS_SAX, 131, this.ADDR_PREIDXIND, 2, 6);
            this.setOp(this.INS_SAX, 135, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_SAX, 143, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_SAX, 151, this.ADDR_ZPY, 2, 4);
            this.setOp(this.INS_DCP, 195, this.ADDR_PREIDXIND, 2, 8);
            this.setOp(this.INS_DCP, 199, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_DCP, 207, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_DCP, 211, this.ADDR_POSTIDXIND, 2, 8);
            this.setOp(this.INS_DCP, 215, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_DCP, 219, this.ADDR_ABSY, 3, 7);
            this.setOp(this.INS_DCP, 223, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_ISC, 227, this.ADDR_PREIDXIND, 2, 8);
            this.setOp(this.INS_ISC, 231, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_ISC, 239, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_ISC, 243, this.ADDR_POSTIDXIND, 2, 8);
            this.setOp(this.INS_ISC, 247, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_ISC, 251, this.ADDR_ABSY, 3, 7);
            this.setOp(this.INS_ISC, 255, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_RLA, 35, this.ADDR_PREIDXIND, 2, 8);
            this.setOp(this.INS_RLA, 39, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_RLA, 47, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_RLA, 51, this.ADDR_POSTIDXIND, 2, 8);
            this.setOp(this.INS_RLA, 55, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_RLA, 59, this.ADDR_ABSY, 3, 7);
            this.setOp(this.INS_RLA, 63, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_RRA, 99, this.ADDR_PREIDXIND, 2, 8);
            this.setOp(this.INS_RRA, 103, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_RRA, 111, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_RRA, 115, this.ADDR_POSTIDXIND, 2, 8);
            this.setOp(this.INS_RRA, 119, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_RRA, 123, this.ADDR_ABSY, 3, 7);
            this.setOp(this.INS_RRA, 127, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_SLO, 3, this.ADDR_PREIDXIND, 2, 8);
            this.setOp(this.INS_SLO, 7, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_SLO, 15, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_SLO, 19, this.ADDR_POSTIDXIND, 2, 8);
            this.setOp(this.INS_SLO, 23, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_SLO, 27, this.ADDR_ABSY, 3, 7);
            this.setOp(this.INS_SLO, 31, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_SRE, 67, this.ADDR_PREIDXIND, 2, 8);
            this.setOp(this.INS_SRE, 71, this.ADDR_ZP, 2, 5);
            this.setOp(this.INS_SRE, 79, this.ADDR_ABS, 3, 6);
            this.setOp(this.INS_SRE, 83, this.ADDR_POSTIDXIND, 2, 8);
            this.setOp(this.INS_SRE, 87, this.ADDR_ZPX, 2, 6);
            this.setOp(this.INS_SRE, 91, this.ADDR_ABSY, 3, 7);
            this.setOp(this.INS_SRE, 95, this.ADDR_ABSX, 3, 7);
            this.setOp(this.INS_SKB, 128, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_SKB, 130, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_SKB, 137, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_SKB, 194, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_SKB, 226, this.ADDR_IMM, 2, 2);
            this.setOp(this.INS_IGN, 12, this.ADDR_ABS, 3, 4);
            this.setOp(this.INS_IGN, 28, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_IGN, 60, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_IGN, 92, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_IGN, 124, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_IGN, 220, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_IGN, 252, this.ADDR_ABSX, 3, 4);
            this.setOp(this.INS_IGN, 4, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_IGN, 68, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_IGN, 100, this.ADDR_ZP, 2, 3);
            this.setOp(this.INS_IGN, 20, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_IGN, 52, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_IGN, 84, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_IGN, 116, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_IGN, 212, this.ADDR_ZPX, 2, 4);
            this.setOp(this.INS_IGN, 244, this.ADDR_ZPX, 2, 4);
            this.cycTable = new Array(7, 6, 2, 8, 3, 3, 5, 5, 3, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 6, 6, 2, 8, 3, 3, 5, 5, 4, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 6, 6, 2, 8, 3, 3, 5, 5, 3, 2, 2, 2, 3, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 6, 6, 2, 8, 3, 3, 5, 5, 4, 2, 2, 2, 5, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 2, 6, 2, 6, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 4, 4, 2, 6, 2, 6, 4, 4, 4, 4, 2, 5, 2, 5, 5, 5, 5, 5, 2, 6, 2, 6, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 4, 4, 2, 5, 2, 5, 4, 4, 4, 4, 2, 4, 2, 4, 4, 4, 4, 4, 2, 6, 2, 8, 3, 3, 5, 5, 2, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 2, 6, 3, 8, 3, 3, 5, 5, 2, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7);
            this.instname = new Array(70);
            this.instname[0] = "ADC";
            this.instname[1] = "AND";
            this.instname[2] = "ASL";
            this.instname[3] = "BCC";
            this.instname[4] = "BCS";
            this.instname[5] = "BEQ";
            this.instname[6] = "BIT";
            this.instname[7] = "BMI";
            this.instname[8] = "BNE";
            this.instname[9] = "BPL";
            this.instname[10] = "BRK";
            this.instname[11] = "BVC";
            this.instname[12] = "BVS";
            this.instname[13] = "CLC";
            this.instname[14] = "CLD";
            this.instname[15] = "CLI";
            this.instname[16] = "CLV";
            this.instname[17] = "CMP";
            this.instname[18] = "CPX";
            this.instname[19] = "CPY";
            this.instname[20] = "DEC";
            this.instname[21] = "DEX";
            this.instname[22] = "DEY";
            this.instname[23] = "EOR";
            this.instname[24] = "INC";
            this.instname[25] = "INX";
            this.instname[26] = "INY";
            this.instname[27] = "JMP";
            this.instname[28] = "JSR";
            this.instname[29] = "LDA";
            this.instname[30] = "LDX";
            this.instname[31] = "LDY";
            this.instname[32] = "LSR";
            this.instname[33] = "NOP";
            this.instname[34] = "ORA";
            this.instname[35] = "PHA";
            this.instname[36] = "PHP";
            this.instname[37] = "PLA";
            this.instname[38] = "PLP";
            this.instname[39] = "ROL";
            this.instname[40] = "ROR";
            this.instname[41] = "RTI";
            this.instname[42] = "RTS";
            this.instname[43] = "SBC";
            this.instname[44] = "SEC";
            this.instname[45] = "SED";
            this.instname[46] = "SEI";
            this.instname[47] = "STA";
            this.instname[48] = "STX";
            this.instname[49] = "STY";
            this.instname[50] = "TAX";
            this.instname[51] = "TAY";
            this.instname[52] = "TSX";
            this.instname[53] = "TXA";
            this.instname[54] = "TXS";
            this.instname[55] = "TYA";
            this.instname[56] = "ALR";
            this.instname[57] = "ANC";
            this.instname[58] = "ARR";
            this.instname[59] = "AXS";
            this.instname[60] = "LAX";
            this.instname[61] = "SAX";
            this.instname[62] = "DCP";
            this.instname[63] = "ISC";
            this.instname[64] = "RLA";
            this.instname[65] = "RRA";
            this.instname[66] = "SLO";
            this.instname[67] = "SRE";
            this.instname[68] = "SKB";
            this.instname[69] = "IGN";
            this.addrDesc = new Array("Zero Page           ", "Relative            ", "Implied             ", "Absolute            ", "Accumulator         ", "Immediate           ", "Zero Page,X         ", "Zero Page,Y         ", "Absolute,X          ", "Absolute,Y          ", "Preindexed Indirect ", "Postindexed Indirect", "Indirect Absolute   ")
        };
        e.prototype = {
            INS_ADC: 0,
            INS_AND: 1,
            INS_ASL: 2,
            INS_BCC: 3,
            INS_BCS: 4,
            INS_BEQ: 5,
            INS_BIT: 6,
            INS_BMI: 7,
            INS_BNE: 8,
            INS_BPL: 9,
            INS_BRK: 10,
            INS_BVC: 11,
            INS_BVS: 12,
            INS_CLC: 13,
            INS_CLD: 14,
            INS_CLI: 15,
            INS_CLV: 16,
            INS_CMP: 17,
            INS_CPX: 18,
            INS_CPY: 19,
            INS_DEC: 20,
            INS_DEX: 21,
            INS_DEY: 22,
            INS_EOR: 23,
            INS_INC: 24,
            INS_INX: 25,
            INS_INY: 26,
            INS_JMP: 27,
            INS_JSR: 28,
            INS_LDA: 29,
            INS_LDX: 30,
            INS_LDY: 31,
            INS_LSR: 32,
            INS_NOP: 33,
            INS_ORA: 34,
            INS_PHA: 35,
            INS_PHP: 36,
            INS_PLA: 37,
            INS_PLP: 38,
            INS_ROL: 39,
            INS_ROR: 40,
            INS_RTI: 41,
            INS_RTS: 42,
            INS_SBC: 43,
            INS_SEC: 44,
            INS_SED: 45,
            INS_SEI: 46,
            INS_STA: 47,
            INS_STX: 48,
            INS_STY: 49,
            INS_TAX: 50,
            INS_TAY: 51,
            INS_TSX: 52,
            INS_TXA: 53,
            INS_TXS: 54,
            INS_TYA: 55,
            INS_ALR: 56,
            INS_ANC: 57,
            INS_ARR: 58,
            INS_AXS: 59,
            INS_LAX: 60,
            INS_SAX: 61,
            INS_DCP: 62,
            INS_ISC: 63,
            INS_RLA: 64,
            INS_RRA: 65,
            INS_SLO: 66,
            INS_SRE: 67,
            INS_SKB: 68,
            INS_IGN: 69,
            INS_DUMMY: 70,
            ADDR_ZP: 0,
            ADDR_REL: 1,
            ADDR_IMP: 2,
            ADDR_ABS: 3,
            ADDR_ACC: 4,
            ADDR_IMM: 5,
            ADDR_ZPX: 6,
            ADDR_ZPY: 7,
            ADDR_ABSX: 8,
            ADDR_ABSY: 9,
            ADDR_PREIDXIND: 10,
            ADDR_POSTIDXIND: 11,
            ADDR_INDABS: 12,
            setOp: function(h, k, j, g, i) {
                this.opdata[k] = (h & 255) | ((j & 255) << 8) | ((g & 255) << 16) | ((i & 255) << 24)
            }
        };
        d.exports = c
    }), (function(e, c, g) {
        var d = g(2);
        var b = g(0);
        var f = function(i) {
            this.nes = i;
            this.vramMem = null;
            this.spriteMem = null;
            this.vramAddress = null;
            this.vramTmpAddress = null;
            this.vramBufferedReadValue = null;
            this.firstWrite = null;
            this.sramAddress = null;
            this.currentMirroring = null;
            this.requestEndFrame = null;
            this.nmiOk = null;
            this.dummyCycleToggle = null;
            this.validTileData = null;
            this.nmiCounter = null;
            this.scanlineAlreadyRendered = null;
            this.f_nmiOnVblank = null;
            this.f_spriteSize = null;
            this.f_bgPatternTable = null;
            this.f_spPatternTable = null;
            this.f_addrInc = null;
            this.f_nTblAddress = null;
            this.f_color = null;
            this.f_spVisibility = null;
            this.f_bgVisibility = null;
            this.f_spClipping = null;
            this.f_bgClipping = null;
            this.f_dispType = null;
            this.cntFV = null;
            this.cntV = null;
            this.cntH = null;
            this.cntVT = null;
            this.cntHT = null;
            this.regFV = null;
            this.regV = null;
            this.regH = null;
            this.regVT = null;
            this.regHT = null;
            this.regFH = null;
            this.regS = null;
            this.curNt = null;
            this.attrib = null;
            this.buffer = null;
            this.bgbuffer = null;
            this.pixrendered = null;
            this.validTileData = null;
            this.scantile = null;
            this.scanline = null;
            this.lastRenderedScanline = null;
            this.curX = null;
            this.sprX = null;
            this.sprY = null;
            this.sprTile = null;
            this.sprCol = null;
            this.vertFlip = null;
            this.horiFlip = null;
            this.bgPriority = null;
            this.spr0HitX = null;
            this.spr0HitY = null;
            this.hitSpr0 = null;
            this.sprPalette = null;
            this.imgPalette = null;
            this.ptTile = null;
            this.ntable1 = null;
            this.currentMirroring = null;
            this.nameTable = null;
            this.vramMirrorTable = null;
            this.palTable = null;
            this.showSpr0Hit = false;
            this.clipToTvSize = true;
            this.reset()
        };
        f.prototype = {
            STATUS_VRAMWRITE: 4,
            STATUS_SLSPRITECOUNT: 5,
            STATUS_SPRITE0HIT: 6,
            STATUS_VBLANK: 7,
            reset: function() {
                var j;
                this.vramMem = new Array(32768);
                this.spriteMem = new Array(256);
                for (j = 0; j < this.vramMem.length; j++) {
                    this.vramMem[j] = 0
                }
                for (j = 0; j < this.spriteMem.length; j++) {
                    this.spriteMem[j] = 0
                }
                this.vramAddress = null;
                this.vramTmpAddress = null;
                this.vramBufferedReadValue = 0;
                this.firstWrite = true;
                this.sramAddress = 0;
                this.currentMirroring = -1;
                this.requestEndFrame = false;
                this.nmiOk = false;
                this.dummyCycleToggle = false;
                this.validTileData = false;
                this.nmiCounter = 0;
                this.scanlineAlreadyRendered = null;
                this.f_nmiOnVblank = 0;
                this.f_spriteSize = 0;
                this.f_bgPatternTable = 0;
                this.f_spPatternTable = 0;
                this.f_addrInc = 0;
                this.f_nTblAddress = 0;
                this.f_color = 0;
                this.f_spVisibility = 0;
                this.f_bgVisibility = 0;
                this.f_spClipping = 0;
                this.f_bgClipping = 0;
                this.f_dispType = 0;
                this.cntFV = 0;
                this.cntV = 0;
                this.cntH = 0;
                this.cntVT = 0;
                this.cntHT = 0;
                this.regFV = 0;
                this.regV = 0;
                this.regH = 0;
                this.regVT = 0;
                this.regHT = 0;
                this.regFH = 0;
                this.regS = 0;
                this.curNt = null;
                this.attrib = new Array(32);
                this.buffer = new Array(256 * 240);
                this.bgbuffer = new Array(256 * 240);
                this.pixrendered = new Array(256 * 240);
                this.validTileData = null;
                this.scantile = new Array(32);
                this.scanline = 0;
                this.lastRenderedScanline = -1;
                this.curX = 0;
                this.sprX = new Array(64);
                this.sprY = new Array(64);
                this.sprTile = new Array(64);
                this.sprCol = new Array(64);
                this.vertFlip = new Array(64);
                this.horiFlip = new Array(64);
                this.bgPriority = new Array(64);
                this.spr0HitX = 0;
                this.spr0HitY = 0;
                this.hitSpr0 = false;
                this.sprPalette = new Array(16);
                this.imgPalette = new Array(16);
                this.ptTile = new Array(512);
                for (j = 0; j < 512; j++) {
                    this.ptTile[j] = new d()
                }
                this.ntable1 = new Array(4);
                this.currentMirroring = -1;
                this.nameTable = new Array(4);
                for (j = 0; j < 4; j++) {
                    this.nameTable[j] = new h(32, 32, "Nt" + j)
                }
                this.vramMirrorTable = new Array(32768);
                for (j = 0; j < 32768; j++) {
                    this.vramMirrorTable[j] = j
                }
                this.palTable = new a();
                this.palTable.loadNTSCPalette();
                this.updateControlReg1(0);
                this.updateControlReg2(0)
            },
            setMirroring: function(k) {
                if (k === this.currentMirroring) {
                    return
                }
                this.currentMirroring = k;
                this.triggerRendering();
                if (this.vramMirrorTable === null) {
                    this.vramMirrorTable = new Array(32768)
                }
                for (var j = 0; j < 32768; j++) {
                    this.vramMirrorTable[j] = j
                }
                this.defineMirrorRegion(16160, 16128, 32);
                this.defineMirrorRegion(16192, 16128, 32);
                this.defineMirrorRegion(16256, 16128, 32);
                this.defineMirrorRegion(16320, 16128, 32);
                this.defineMirrorRegion(12288, 8192, 3840);
                this.defineMirrorRegion(16384, 0, 16384);
                if (k === this.nes.rom.HORIZONTAL_MIRRORING) {
                    this.ntable1[0] = 0;
                    this.ntable1[1] = 0;
                    this.ntable1[2] = 1;
                    this.ntable1[3] = 1;
                    this.defineMirrorRegion(9216, 8192, 1024);
                    this.defineMirrorRegion(11264, 10240, 1024)
                } else {
                    if (k === this.nes.rom.VERTICAL_MIRRORING) {
                        this.ntable1[0] = 0;
                        this.ntable1[1] = 1;
                        this.ntable1[2] = 0;
                        this.ntable1[3] = 1;
                        this.defineMirrorRegion(10240, 8192, 1024);
                        this.defineMirrorRegion(11264, 9216, 1024)
                    } else {
                        if (k === this.nes.rom.SINGLESCREEN_MIRRORING) {
                            this.ntable1[0] = 0;
                            this.ntable1[1] = 0;
                            this.ntable1[2] = 0;
                            this.ntable1[3] = 0;
                            this.defineMirrorRegion(9216, 8192, 1024);
                            this.defineMirrorRegion(10240, 8192, 1024);
                            this.defineMirrorRegion(11264, 8192, 1024)
                        } else {
                            if (k === this.nes.rom.SINGLESCREEN_MIRRORING2) {
                                this.ntable1[0] = 1;
                                this.ntable1[1] = 1;
                                this.ntable1[2] = 1;
                                this.ntable1[3] = 1;
                                this.defineMirrorRegion(9216, 9216, 1024);
                                this.defineMirrorRegion(10240, 9216, 1024);
                                this.defineMirrorRegion(11264, 9216, 1024)
                            } else {
                                this.ntable1[0] = 0;
                                this.ntable1[1] = 1;
                                this.ntable1[2] = 2;
                                this.ntable1[3] = 3
                            }
                        }
                    }
                }
            },
            defineMirrorRegion: function(j, m, l) {
                for (var k = 0; k < l; k++) {
                    this.vramMirrorTable[j + k] = m + k
                }
            },
            startVBlank: function() {
                this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NMI);
                if (this.lastRenderedScanline < 239) {
                    this.renderFramePartially(this.lastRenderedScanline + 1, 240 - this.lastRenderedScanline)
                }
                this.endFrame();
                this.lastRenderedScanline = -1
            },
            endScanline: function() {
                switch (this.scanline) {
                    case 19:
                        if (this.dummyCycleToggle) {
                            this.curX = 1;
                            this.dummyCycleToggle = !this.dummyCycleToggle
                        }
                        break;
                    case 20:
                        this.setStatusFlag(this.STATUS_VBLANK, false);
                        this.setStatusFlag(this.STATUS_SPRITE0HIT, false);
                        this.hitSpr0 = false;
                        this.spr0HitX = -1;
                        this.spr0HitY = -1;
                        if (this.f_bgVisibility === 1 || this.f_spVisibility === 1) {
                            this.cntFV = this.regFV;
                            this.cntV = this.regV;
                            this.cntH = this.regH;
                            this.cntVT = this.regVT;
                            this.cntHT = this.regHT;
                            if (this.f_bgVisibility === 1) {
                                this.renderBgScanline(false, 0)
                            }
                        }
                        if (this.f_bgVisibility === 1 && this.f_spVisibility === 1) {
                            this.checkSprite0(0)
                        }
                        if (this.f_bgVisibility === 1 || this.f_spVisibility === 1) {
                            this.nes.mmap.clockIrqCounter()
                        }
                        break;
                    case 261:
                        this.setStatusFlag(this.STATUS_VBLANK, true);
                        this.requestEndFrame = true;
                        this.nmiCounter = 9;
                        this.scanline = -1;
                        break;
                    default:
                        if (this.scanline >= 21 && this.scanline <= 260) {
                            if (this.f_bgVisibility === 1) {
                                if (!this.scanlineAlreadyRendered) {
                                    this.cntHT = this.regHT;
                                    this.cntH = this.regH;
                                    this.renderBgScanline(true, this.scanline + 1 - 21)
                                }
                                this.scanlineAlreadyRendered = false;
                                if (!this.hitSpr0 && this.f_spVisibility === 1) {
                                    if (this.sprX[0] >= -7 && this.sprX[0] < 256 && this.sprY[0] + 1 <= this.scanline - 20 && this.sprY[0] + 1 + (this.f_spriteSize === 0 ? 8 : 16) >= this.scanline - 20) {
                                        if (this.checkSprite0(this.scanline - 20)) {
                                            this.hitSpr0 = true
                                        }
                                    }
                                }
                            }
                            if (this.f_bgVisibility === 1 || this.f_spVisibility === 1) {
                                this.nes.mmap.clockIrqCounter()
                            }
                        }
                }
                this.scanline++;
                this.regsToAddress();
                this.cntsToAddress()
            },
            startFrame: function() {
                var m = 0;
                if (this.f_dispType === 0) {
                    m = this.imgPalette[0]
                } else {
                    switch (this.f_color) {
                        case 0:
                            m = 0;
                            break;
                        case 1:
                            m = 65280;
                            break;
                        case 2:
                            m = 16711680;
                            break;
                        case 3:
                            m = 0;
                            break;
                        case 4:
                            m = 255;
                            break;
                        default:
                            m = 0
                    }
                }
                var j = this.buffer;
                var l;
                for (l = 0; l < 256 * 240; l++) {
                    j[l] = m
                }
                var k = this.pixrendered;
                for (l = 0; l < k.length; l++) {
                    k[l] = 65
                }
            },
            endFrame: function() {
                var l, j, m;
                var k = this.buffer;
                if (this.showSpr0Hit) {
                    if (this.sprX[0] >= 0 && this.sprX[0] < 256 && this.sprY[0] >= 0 && this.sprY[0] < 240) {
                        for (l = 0; l < 256; l++) {
                            k[(this.sprY[0] << 8) + l] = 16733525
                        }
                        for (l = 0; l < 240; l++) {
                            k[(l << 8) + this.sprX[0]] = 16733525
                        }
                    }
                    if (this.spr0HitX >= 0 && this.spr0HitX < 256 && this.spr0HitY >= 0 && this.spr0HitY < 240) {
                        for (l = 0; l < 256; l++) {
                            k[(this.spr0HitY << 8) + l] = 5635925
                        }
                        for (l = 0; l < 240; l++) {
                            k[(l << 8) + this.spr0HitX] = 5635925
                        }
                    }
                }
                if (this.clipToTvSize || this.f_bgClipping === 0 || this.f_spClipping === 0) {
                    for (m = 0; m < 240; m++) {
                        for (j = 0; j < 8; j++) {
                            k[(m << 8) + j] = 0
                        }
                    }
                }
                if (this.clipToTvSize) {
                    for (m = 0; m < 240; m++) {
                        for (j = 0; j < 8; j++) {
                            k[(m << 8) + 255 - j] = 0
                        }
                    }
                }
                if (this.clipToTvSize) {
                    for (m = 0; m < 8; m++) {
                        for (j = 0; j < 256; j++) {
                            k[(m << 8) + j] = 0;
                            k[((239 - m) << 8) + j] = 0
                        }
                    }
                }
                this.nes.ui.writeFrame(k)
            },
            updateControlReg1: function(i) {
                this.triggerRendering();
                this.f_nmiOnVblank = (i >> 7) & 1;
                this.f_spriteSize = (i >> 5) & 1;
                this.f_bgPatternTable = (i >> 4) & 1;
                this.f_spPatternTable = (i >> 3) & 1;
                this.f_addrInc = (i >> 2) & 1;
                this.f_nTblAddress = i & 3;
                this.regV = (i >> 1) & 1;
                this.regH = i & 1;
                this.regS = (i >> 4) & 1
            },
            updateControlReg2: function(i) {
                this.triggerRendering();
                this.f_color = (i >> 5) & 7;
                this.f_spVisibility = (i >> 4) & 1;
                this.f_bgVisibility = (i >> 3) & 1;
                this.f_spClipping = (i >> 2) & 1;
                this.f_bgClipping = (i >> 1) & 1;
                this.f_dispType = i & 1;
                if (this.f_dispType === 0) {
                    this.palTable.setEmphasis(this.f_color)
                }
                this.updatePalettes()
            },
            setStatusFlag: function(i, j) {
                var k = 1 << i;
                this.nes.cpu.mem[8194] = (this.nes.cpu.mem[8194] & (255 - k)) | (j ? k : 0)
            },
            readStatusRegister: function() {
                var i = this.nes.cpu.mem[8194];
                this.firstWrite = true;
                this.setStatusFlag(this.STATUS_VBLANK, false);
                return i
            },
            writeSRAMAddress: function(i) {
                this.sramAddress = i
            },
            sramLoad: function() {
                return this.spriteMem[this.sramAddress]
            },
            sramWrite: function(i) {
                this.spriteMem[this.sramAddress] = i;
                this.spriteRamWriteUpdate(this.sramAddress, i);
                this.sramAddress++;
                this.sramAddress %= 256
            },
            scrollWrite: function(i) {
                this.triggerRendering();
                if (this.firstWrite) {
                    this.regHT = (i >> 3) & 31;
                    this.regFH = i & 7
                } else {
                    this.regFV = i & 7;
                    this.regVT = (i >> 3) & 31
                }
                this.firstWrite = !this.firstWrite
            },
            writeVRAMAddress: function(i) {
                if (this.firstWrite) {
                    this.regFV = (i >> 4) & 3;
                    this.regV = (i >> 3) & 1;
                    this.regH = (i >> 2) & 1;
                    this.regVT = (this.regVT & 7) | ((i & 3) << 3)
                } else {
                    this.triggerRendering();
                    this.regVT = (this.regVT & 24) | ((i >> 5) & 7);
                    this.regHT = i & 31;
                    this.cntFV = this.regFV;
                    this.cntV = this.regV;
                    this.cntH = this.regH;
                    this.cntVT = this.regVT;
                    this.cntHT = this.regHT;
                    this.checkSprite0(this.scanline - 20)
                }
                this.firstWrite = !this.firstWrite;
                this.cntsToAddress();
                if (this.vramAddress < 8192) {
                    this.nes.mmap.latchAccess(this.vramAddress)
                }
            },
            vramLoad: function() {
                var i;
                this.cntsToAddress();
                this.regsToAddress();
                if (this.vramAddress <= 16127) {
                    i = this.vramBufferedReadValue;
                    if (this.vramAddress < 8192) {
                        this.vramBufferedReadValue = this.vramMem[this.vramAddress]
                    } else {
                        this.vramBufferedReadValue = this.mirroredLoad(this.vramAddress)
                    } if (this.vramAddress < 8192) {
                        this.nes.mmap.latchAccess(this.vramAddress)
                    }
                    this.vramAddress += this.f_addrInc === 1 ? 32 : 1;
                    this.cntsFromAddress();
                    this.regsFromAddress();
                    return i
                }
                i = this.mirroredLoad(this.vramAddress);
                this.vramAddress += this.f_addrInc === 1 ? 32 : 1;
                this.cntsFromAddress();
                this.regsFromAddress();
                return i
            },
            vramWrite: function(i) {
                this.triggerRendering();
                this.cntsToAddress();
                this.regsToAddress();
                if (this.vramAddress >= 8192) {
                    this.mirroredWrite(this.vramAddress, i)
                } else {
                    this.writeMem(this.vramAddress, i);
                    this.nes.mmap.latchAccess(this.vramAddress)
                }
                this.vramAddress += this.f_addrInc === 1 ? 32 : 1;
                this.regsFromAddress();
                this.cntsFromAddress()
            },
            sramDMA: function(m) {
                var j = m * 256;
                var l;
                for (var k = this.sramAddress; k < 256; k++) {
                    l = this.nes.cpu.mem[j + k];
                    this.spriteMem[k] = l;
                    this.spriteRamWriteUpdate(k, l)
                }
                this.nes.cpu.haltCycles(513)
            },
            regsFromAddress: function() {
                var i = (this.vramTmpAddress >> 8) & 255;
                this.regFV = (i >> 4) & 7;
                this.regV = (i >> 3) & 1;
                this.regH = (i >> 2) & 1;
                this.regVT = (this.regVT & 7) | ((i & 3) << 3);
                i = this.vramTmpAddress & 255;
                this.regVT = (this.regVT & 24) | ((i >> 5) & 7);
                this.regHT = i & 31
            },
            cntsFromAddress: function() {
                var i = (this.vramAddress >> 8) & 255;
                this.cntFV = (i >> 4) & 3;
                this.cntV = (i >> 3) & 1;
                this.cntH = (i >> 2) & 1;
                this.cntVT = (this.cntVT & 7) | ((i & 3) << 3);
                i = this.vramAddress & 255;
                this.cntVT = (this.cntVT & 24) | ((i >> 5) & 7);
                this.cntHT = i & 31
            },
            regsToAddress: function() {
                var j = (this.regFV & 7) << 4;
                j |= (this.regV & 1) << 3;
                j |= (this.regH & 1) << 2;
                j |= (this.regVT >> 3) & 3;
                var i = (this.regVT & 7) << 5;
                i |= this.regHT & 31;
                this.vramTmpAddress = ((j << 8) | i) & 32767
            },
            cntsToAddress: function() {
                var j = (this.cntFV & 7) << 4;
                j |= (this.cntV & 1) << 3;
                j |= (this.cntH & 1) << 2;
                j |= (this.cntVT >> 3) & 3;
                var i = (this.cntVT & 7) << 5;
                i |= this.cntHT & 31;
                this.vramAddress = ((j << 8) | i) & 32767
            },
            incTileCounter: function(k) {
                for (var j = k; j !== 0; j--) {
                    this.cntHT++;
                    if (this.cntHT === 32) {
                        this.cntHT = 0;
                        this.cntVT++;
                        if (this.cntVT >= 30) {
                            this.cntH++;
                            if (this.cntH === 2) {
                                this.cntH = 0;
                                this.cntV++;
                                if (this.cntV === 2) {
                                    this.cntV = 0;
                                    this.cntFV++;
                                    this.cntFV &= 7
                                }
                            }
                        }
                    }
                }
            },
            mirroredLoad: function(i) {
                return this.vramMem[this.vramMirrorTable[i]]
            },
            mirroredWrite: function(i, j) {
                if (i >= 16128 && i < 16160) {
                    if (i === 16128 || i === 16144) {
                        this.writeMem(16128, j);
                        this.writeMem(16144, j)
                    } else {
                        if (i === 16132 || i === 16148) {
                            this.writeMem(16132, j);
                            this.writeMem(16148, j)
                        } else {
                            if (i === 16136 || i === 16152) {
                                this.writeMem(16136, j);
                                this.writeMem(16152, j)
                            } else {
                                if (i === 16140 || i === 16156) {
                                    this.writeMem(16140, j);
                                    this.writeMem(16156, j)
                                } else {
                                    this.writeMem(i, j)
                                }
                            }
                        }
                    }
                } else {
                    if (i < this.vramMirrorTable.length) {
                        this.writeMem(this.vramMirrorTable[i], j)
                    } else {
                        throw new Error("Invalid VRAM address: " + i.toString(16))
                    }
                }
            },
            triggerRendering: function() {
                if (this.scanline >= 21 && this.scanline <= 260) {
                    this.renderFramePartially(this.lastRenderedScanline + 1, this.scanline - 21 - this.lastRenderedScanline);
                    this.lastRenderedScanline = this.scanline - 21
                }
            },
            renderFramePartially: function(p, o) {
                if (this.f_spVisibility === 1) {
                    this.renderSpritesPartially(p, o, true)
                }
                if (this.f_bgVisibility === 1) {
                    var m = p << 8;
                    var n = (p + o) << 8;
                    if (n > 61440) {
                        n = 61440
                    }
                    var i = this.buffer;
                    var k = this.bgbuffer;
                    var j = this.pixrendered;
                    for (var l = m; l < n; l++) {
                        if (j[l] > 255) {
                            i[l] = k[l]
                        }
                    }
                }
                if (this.f_spVisibility === 1) {
                    this.renderSpritesPartially(p, o, false)
                }
                this.validTileData = false
            },
            renderBgScanline: function(i, v) {
                var n = this.regS === 0 ? 0 : 256;
                var A = (v << 8) - this.regFH;
                this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH];
                this.cntHT = this.regHT;
                this.cntH = this.regH;
                this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH];
                if (v < 240 && v - this.cntFV >= 0) {
                    var C = this.cntFV << 3;
                    var l = this.scantile;
                    var p = this.attrib;
                    var u = this.ptTile;
                    var z = this.nameTable;
                    var k = this.imgPalette;
                    var j = this.pixrendered;
                    var o = i ? this.bgbuffer : this.buffer;
                    var s, q, y, m;
                    for (var B = 0; B < 32; B++) {
                        if (v >= 0) {
                            if (this.validTileData) {
                                s = l[B];
                                if (typeof s === "undefined") {
                                    continue
                                }
                                q = s.pix;
                                y = p[B]
                            } else {
                                s = u[n + z[this.curNt].getTileIndex(this.cntHT, this.cntVT)];
                                if (typeof s === "undefined") {
                                    continue
                                }
                                q = s.pix;
                                y = z[this.curNt].getAttrib(this.cntHT, this.cntVT);
                                l[B] = s;
                                p[B] = y
                            }
                            var w = 0;
                            var r = (B << 3) - this.regFH;
                            if (r > -8) {
                                if (r < 0) {
                                    A -= r;
                                    w = -r
                                }
                                if (s.opaque[this.cntFV]) {
                                    for (; w < 8; w++) {
                                        o[A] = k[q[C + w] + y];
                                        j[A] |= 256;
                                        A++
                                    }
                                } else {
                                    for (; w < 8; w++) {
                                        m = q[C + w];
                                        if (m !== 0) {
                                            o[A] = k[m + y];
                                            j[A] |= 256
                                        }
                                        A++
                                    }
                                }
                            }
                        }
                        if (++this.cntHT === 32) {
                            this.cntHT = 0;
                            this.cntH++;
                            this.cntH %= 2;
                            this.curNt = this.ntable1[(this.cntV << 1) + this.cntH]
                        }
                    }
                    this.validTileData = true
                }
                this.cntFV++;
                if (this.cntFV === 8) {
                    this.cntFV = 0;
                    this.cntVT++;
                    if (this.cntVT === 30) {
                        this.cntVT = 0;
                        this.cntV++;
                        this.cntV %= 2;
                        this.curNt = this.ntable1[(this.cntV << 1) + this.cntH]
                    } else {
                        if (this.cntVT === 32) {
                            this.cntVT = 0
                        }
                    }
                    this.validTileData = false
                }
            },
            renderSpritesPartially: function(m, l, o) {
                if (this.f_spVisibility === 1) {
                    for (var n = 0; n < 64; n++) {
                        if (this.bgPriority[n] === o && this.sprX[n] >= 0 && this.sprX[n] < 256 && this.sprY[n] + 8 >= m && this.sprY[n] < m + l) {
                            if (this.f_spriteSize === 0) {
                                this.srcy1 = 0;
                                this.srcy2 = 8;
                                if (this.sprY[n] < m) {
                                    this.srcy1 = m - this.sprY[n] - 1
                                }
                                if (this.sprY[n] + 8 > m + l) {
                                    this.srcy2 = m + l - this.sprY[n] + 1
                                }
                                if (this.f_spPatternTable === 0) {
                                    this.ptTile[this.sprTile[n]].render(this.buffer, 0, this.srcy1, 8, this.srcy2, this.sprX[n], this.sprY[n] + 1, this.sprCol[n], this.sprPalette, this.horiFlip[n], this.vertFlip[n], n, this.pixrendered)
                                } else {
                                    this.ptTile[this.sprTile[n] + 256].render(this.buffer, 0, this.srcy1, 8, this.srcy2, this.sprX[n], this.sprY[n] + 1, this.sprCol[n], this.sprPalette, this.horiFlip[n], this.vertFlip[n], n, this.pixrendered)
                                }
                            } else {
                                var p = this.sprTile[n];
                                if ((p & 1) !== 0) {
                                    p = this.sprTile[n] - 1 + 256
                                }
                                var k = 0;
                                var j = 8;
                                if (this.sprY[n] < m) {
                                    k = m - this.sprY[n] - 1
                                }
                                if (this.sprY[n] + 8 > m + l) {
                                    j = m + l - this.sprY[n]
                                }
                                this.ptTile[p + (this.vertFlip[n] ? 1 : 0)].render(this.buffer, 0, k, 8, j, this.sprX[n], this.sprY[n] + 1, this.sprCol[n], this.sprPalette, this.horiFlip[n], this.vertFlip[n], n, this.pixrendered);
                                k = 0;
                                j = 8;
                                if (this.sprY[n] + 8 < m) {
                                    k = m - (this.sprY[n] + 8 + 1)
                                }
                                if (this.sprY[n] + 16 > m + l) {
                                    j = m + l - (this.sprY[n] + 8)
                                }
                                this.ptTile[p + (this.vertFlip[n] ? 0 : 1)].render(this.buffer, 0, k, 8, j, this.sprX[n], this.sprY[n] + 1 + 8, this.sprCol[n], this.sprPalette, this.horiFlip[n], this.vertFlip[n], n, this.pixrendered)
                            }
                        }
                    }
                }
            },
            checkSprite0: function(l) {
                this.spr0HitX = -1;
                this.spr0HitY = -1;
                var p;
                var o = this.f_spPatternTable === 0 ? 0 : 256;
                var j, q, n, m;
                var k;
                j = this.sprX[0];
                q = this.sprY[0] + 1;
                if (this.f_spriteSize === 0) {
                    if (q <= l && q + 8 > l && j >= -7 && j < 256) {
                        n = this.ptTile[this.sprTile[0] + o];
                        if (this.vertFlip[0]) {
                            p = 7 - (l - q)
                        } else {
                            p = l - q
                        }
                        p *= 8;
                        k = l * 256 + j;
                        if (this.horiFlip[0]) {
                            for (m = 7; m >= 0; m--) {
                                if (j >= 0 && j < 256) {
                                    if (k >= 0 && k < 61440 && this.pixrendered[k] !== 0) {
                                        if (n.pix[p + m] !== 0) {
                                            this.spr0HitX = k % 256;
                                            this.spr0HitY = l;
                                            return true
                                        }
                                    }
                                }
                                j++;
                                k++
                            }
                        } else {
                            for (m = 0; m < 8; m++) {
                                if (j >= 0 && j < 256) {
                                    if (k >= 0 && k < 61440 && this.pixrendered[k] !== 0) {
                                        if (n.pix[p + m] !== 0) {
                                            this.spr0HitX = k % 256;
                                            this.spr0HitY = l;
                                            return true
                                        }
                                    }
                                }
                                j++;
                                k++
                            }
                        }
                    }
                } else {
                    if (q <= l && q + 16 > l && j >= -7 && j < 256) {
                        if (this.vertFlip[0]) {
                            p = 15 - (l - q)
                        } else {
                            p = l - q
                        } if (p < 8) {
                            n = this.ptTile[this.sprTile[0] + (this.vertFlip[0] ? 1 : 0) + ((this.sprTile[0] & 1) !== 0 ? 255 : 0)]
                        } else {
                            n = this.ptTile[this.sprTile[0] + (this.vertFlip[0] ? 0 : 1) + ((this.sprTile[0] & 1) !== 0 ? 255 : 0)];
                            if (this.vertFlip[0]) {
                                p = 15 - p
                            } else {
                                p -= 8
                            }
                        }
                        p *= 8;
                        k = l * 256 + j;
                        if (this.horiFlip[0]) {
                            for (m = 7; m >= 0; m--) {
                                if (j >= 0 && j < 256) {
                                    if (k >= 0 && k < 61440 && this.pixrendered[k] !== 0) {
                                        if (n.pix[p + m] !== 0) {
                                            this.spr0HitX = k % 256;
                                            this.spr0HitY = l;
                                            return true
                                        }
                                    }
                                }
                                j++;
                                k++
                            }
                        } else {
                            for (m = 0; m < 8; m++) {
                                if (j >= 0 && j < 256) {
                                    if (k >= 0 && k < 61440 && this.pixrendered[k] !== 0) {
                                        if (n.pix[p + m] !== 0) {
                                            this.spr0HitX = k % 256;
                                            this.spr0HitY = l;
                                            return true
                                        }
                                    }
                                }
                                j++;
                                k++
                            }
                        }
                    }
                }
                return false
            },
            writeMem: function(i, j) {
                this.vramMem[i] = j;
                if (i < 8192) {
                    this.vramMem[i] = j;
                    this.patternWrite(i, j)
                } else {
                    if (i >= 8192 && i < 9152) {
                        this.nameTableWrite(this.ntable1[0], i - 8192, j)
                    } else {
                        if (i >= 9152 && i < 9216) {
                            this.attribTableWrite(this.ntable1[0], i - 9152, j)
                        } else {
                            if (i >= 9216 && i < 10176) {
                                this.nameTableWrite(this.ntable1[1], i - 9216, j)
                            } else {
                                if (i >= 10176 && i < 10240) {
                                    this.attribTableWrite(this.ntable1[1], i - 10176, j)
                                } else {
                                    if (i >= 10240 && i < 11200) {
                                        this.nameTableWrite(this.ntable1[2], i - 10240, j)
                                    } else {
                                        if (i >= 11200 && i < 11264) {
                                            this.attribTableWrite(this.ntable1[2], i - 11200, j)
                                        } else {
                                            if (i >= 11264 && i < 12224) {
                                                this.nameTableWrite(this.ntable1[3], i - 11264, j)
                                            } else {
                                                if (i >= 12224 && i < 12288) {
                                                    this.attribTableWrite(this.ntable1[3], i - 12224, j)
                                                } else {
                                                    if (i >= 16128 && i < 16160) {
                                                        this.updatePalettes()
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            updatePalettes: function() {
                var j;
                for (j = 0; j < 16; j++) {
                    if (this.f_dispType === 0) {
                        this.imgPalette[j] = this.palTable.getEntry(this.vramMem[16128 + j] & 63)
                    } else {
                        this.imgPalette[j] = this.palTable.getEntry(this.vramMem[16128 + j] & 32)
                    }
                }
                for (j = 0; j < 16; j++) {
                    if (this.f_dispType === 0) {
                        this.sprPalette[j] = this.palTable.getEntry(this.vramMem[16144 + j] & 63)
                    } else {
                        this.sprPalette[j] = this.palTable.getEntry(this.vramMem[16144 + j] & 32)
                    }
                }
            },
            patternWrite: function(i, j) {
                var k = Math.floor(i / 16);
                var l = i % 16;
                if (l < 8) {
                    this.ptTile[k].setScanline(l, j, this.vramMem[i + 8])
                } else {
                    this.ptTile[k].setScanline(l - 8, this.vramMem[i - 8], j)
                }
            },
            nameTableWrite: function(j, i, k) {
                this.nameTable[j].tile[i] = k;
                this.checkSprite0(this.scanline - 20)
            },
            attribTableWrite: function(j, i, k) {
                this.nameTable[j].writeAttrib(i, k)
            },
            spriteRamWriteUpdate: function(i, k) {
                var j = Math.floor(i / 4);
                if (j === 0) {
                    this.checkSprite0(this.scanline - 20)
                }
                if (i % 4 === 0) {
                    this.sprY[j] = k
                } else {
                    if (i % 4 === 1) {
                        this.sprTile[j] = k
                    } else {
                        if (i % 4 === 2) {
                            this.vertFlip[j] = (k & 128) !== 0;
                            this.horiFlip[j] = (k & 64) !== 0;
                            this.bgPriority[j] = (k & 32) !== 0;
                            this.sprCol[j] = (k & 3) << 2
                        } else {
                            if (i % 4 === 3) {
                                this.sprX[j] = k
                            }
                        }
                    }
                }
            },
            doNMI: function() {
                this.setStatusFlag(this.STATUS_VBLANK, true);
                this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NMI)
            },
            isPixelWhite: function(i, j) {
                this.triggerRendering();
                return this.nes.ppu.buffer[(j << 8) + i] === 16777215
            },
            JSON_PROPERTIES: ["vramMem", "spriteMem", "cntFV", "cntV", "cntH", "cntVT", "cntHT", "regFV", "regV", "regH", "regVT", "regHT", "regFH", "regS", "vramAddress", "vramTmpAddress", "f_nmiOnVblank", "f_spriteSize", "f_bgPatternTable", "f_spPatternTable", "f_addrInc", "f_nTblAddress", "f_color", "f_spVisibility", "f_bgVisibility", "f_spClipping", "f_bgClipping", "f_dispType", "vramBufferedReadValue", "firstWrite", "currentMirroring", "vramMirrorTable", "ntable1", "sramAddress", "hitSpr0", "sprPalette", "imgPalette", "curX", "scanline", "lastRenderedScanline", "curNt", "scantile", "attrib", "buffer", "bgbuffer", "pixrendered", "requestEndFrame", "nmiOk", "dummyCycleToggle", "nmiCounter", "validTileData", "scanlineAlreadyRendered"],
            toJSON: function() {
                var j;
                var k = b.toJSON(this);
                k.nameTable = [];
                for (j = 0; j < this.nameTable.length; j++) {
                    k.nameTable[j] = this.nameTable[j].toJSON()
                }
                k.ptTile = [];
                for (j = 0; j < this.ptTile.length; j++) {
                    k.ptTile[j] = this.ptTile[j].toJSON()
                }
                return k
            },
            fromJSON: function(k) {
                var j;
                b.fromJSON(this, k);
                for (j = 0; j < this.nameTable.length; j++) {
                    this.nameTable[j].fromJSON(k.nameTable[j])
                }
                for (j = 0; j < this.ptTile.length; j++) {
                    this.ptTile[j].fromJSON(k.ptTile[j])
                }
                for (j = 0; j < this.spriteMem.length; j++) {
                    this.spriteRamWriteUpdate(j, this.spriteMem[j])
                }
            }
        };
        var h = function(m, j, k) {
            this.width = m;
            this.height = j;
            this.name = k;
            this.tile = new Array(m * j);
            this.attrib = new Array(m * j);
            for (var l = 0; l < m * j; l++) {
                this.tile[l] = 0;
                this.attrib[l] = 0
            }
        };
        h.prototype = {
            getTileIndex: function(i, j) {
                return this.tile[j * this.width + i]
            },
            getAttrib: function(i, j) {
                return this.attrib[j * this.width + i]
            },
            writeAttrib: function(m, r) {
                var s = (m % 8) * 4;
                var q = Math.floor(m / 8) * 4;
                var t;
                var k, i;
                var o;
                for (var j = 0; j < 2; j++) {
                    for (var l = 0; l < 2; l++) {
                        t = (r >> (2 * (j * 2 + l))) & 3;
                        for (var n = 0; n < 2; n++) {
                            for (var p = 0; p < 2; p++) {
                                k = s + l * 2 + p;
                                i = q + j * 2 + n;
                                o = i * this.width + k;
                                this.attrib[o] = (t << 2) & 12
                            }
                        }
                    }
                }
            },
            toJSON: function() {
                return {
                    tile: this.tile,
                    attrib: this.attrib
                }
            },
            fromJSON: function(i) {
                this.tile = i.tile;
                this.attrib = i.attrib
            }
        };
        var a = function() {
            this.curTable = new Array(64);
            this.emphTable = new Array(8);
            this.currentEmph = -1
        };
        a.prototype = {
            reset: function() {
                this.setEmphasis(0)
            },
            loadNTSCPalette: function() {
                this.curTable = [5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0];
                this.makeTables();
                this.setEmphasis(0)
            },
            loadPALPalette: function() {
                this.curTable = [5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0];
                this.makeTables();
                this.setEmphasis(0)
            },
            makeTables: function() {
                var j, m, o, k, l, p, n, s;
                for (var q = 0; q < 8; q++) {
                    p = 1;
                    n = 1;
                    s = 1;
                    if ((q & 1) !== 0) {
                        p = 0.75;
                        s = 0.75
                    }
                    if ((q & 2) !== 0) {
                        p = 0.75;
                        n = 0.75
                    }
                    if ((q & 4) !== 0) {
                        n = 0.75;
                        s = 0.75
                    }
                    this.emphTable[q] = new Array(64);
                    for (l = 0; l < 64; l++) {
                        k = this.curTable[l];
                        j = Math.floor(this.getRed(k) * p);
                        m = Math.floor(this.getGreen(k) * n);
                        o = Math.floor(this.getBlue(k) * s);
                        this.emphTable[q][l] = this.getRgb(j, m, o)
                    }
                }
            },
            setEmphasis: function(k) {
                if (k !== this.currentEmph) {
                    this.currentEmph = k;
                    for (var j = 0; j < 64; j++) {
                        this.curTable[j] = this.emphTable[k][j]
                    }
                }
            },
            getEntry: function(i) {
                return this.curTable[i]
            },
            getRed: function(i) {
                return (i >> 16) & 255
            },
            getGreen: function(i) {
                return (i >> 8) & 255
            },
            getBlue: function(i) {
                return i & 255
            },
            getRgb: function(k, j, i) {
                return (k << 16) | (j << 8) | i
            },
            loadDefaultPalette: function() {
                this.curTable[0] = this.getRgb(117, 117, 117);
                this.curTable[1] = this.getRgb(39, 27, 143);
                this.curTable[2] = this.getRgb(0, 0, 171);
                this.curTable[3] = this.getRgb(71, 0, 159);
                this.curTable[4] = this.getRgb(143, 0, 119);
                this.curTable[5] = this.getRgb(171, 0, 19);
                this.curTable[6] = this.getRgb(167, 0, 0);
                this.curTable[7] = this.getRgb(127, 11, 0);
                this.curTable[8] = this.getRgb(67, 47, 0);
                this.curTable[9] = this.getRgb(0, 71, 0);
                this.curTable[10] = this.getRgb(0, 81, 0);
                this.curTable[11] = this.getRgb(0, 63, 23);
                this.curTable[12] = this.getRgb(27, 63, 95);
                this.curTable[13] = this.getRgb(0, 0, 0);
                this.curTable[14] = this.getRgb(0, 0, 0);
                this.curTable[15] = this.getRgb(0, 0, 0);
                this.curTable[16] = this.getRgb(188, 188, 188);
                this.curTable[17] = this.getRgb(0, 115, 239);
                this.curTable[18] = this.getRgb(35, 59, 239);
                this.curTable[19] = this.getRgb(131, 0, 243);
                this.curTable[20] = this.getRgb(191, 0, 191);
                this.curTable[21] = this.getRgb(231, 0, 91);
                this.curTable[22] = this.getRgb(219, 43, 0);
                this.curTable[23] = this.getRgb(203, 79, 15);
                this.curTable[24] = this.getRgb(139, 115, 0);
                this.curTable[25] = this.getRgb(0, 151, 0);
                this.curTable[26] = this.getRgb(0, 171, 0);
                this.curTable[27] = this.getRgb(0, 147, 59);
                this.curTable[28] = this.getRgb(0, 131, 139);
                this.curTable[29] = this.getRgb(0, 0, 0);
                this.curTable[30] = this.getRgb(0, 0, 0);
                this.curTable[31] = this.getRgb(0, 0, 0);
                this.curTable[32] = this.getRgb(255, 255, 255);
                this.curTable[33] = this.getRgb(63, 191, 255);
                this.curTable[34] = this.getRgb(95, 151, 255);
                this.curTable[35] = this.getRgb(167, 139, 253);
                this.curTable[36] = this.getRgb(247, 123, 255);
                this.curTable[37] = this.getRgb(255, 119, 183);
                this.curTable[38] = this.getRgb(255, 119, 99);
                this.curTable[39] = this.getRgb(255, 155, 59);
                this.curTable[40] = this.getRgb(243, 191, 63);
                this.curTable[41] = this.getRgb(131, 211, 19);
                this.curTable[42] = this.getRgb(79, 223, 75);
                this.curTable[43] = this.getRgb(88, 248, 152);
                this.curTable[44] = this.getRgb(0, 235, 219);
                this.curTable[45] = this.getRgb(0, 0, 0);
                this.curTable[46] = this.getRgb(0, 0, 0);
                this.curTable[47] = this.getRgb(0, 0, 0);
                this.curTable[48] = this.getRgb(255, 255, 255);
                this.curTable[49] = this.getRgb(171, 231, 255);
                this.curTable[50] = this.getRgb(199, 215, 255);
                this.curTable[51] = this.getRgb(215, 203, 255);
                this.curTable[52] = this.getRgb(255, 199, 255);
                this.curTable[53] = this.getRgb(255, 199, 219);
                this.curTable[54] = this.getRgb(255, 191, 179);
                this.curTable[55] = this.getRgb(255, 219, 171);
                this.curTable[56] = this.getRgb(255, 231, 163);
                this.curTable[57] = this.getRgb(227, 255, 163);
                this.curTable[58] = this.getRgb(171, 243, 191);
                this.curTable[59] = this.getRgb(179, 255, 207);
                this.curTable[60] = this.getRgb(159, 255, 243);
                this.curTable[61] = this.getRgb(0, 0, 0);
                this.curTable[62] = this.getRgb(0, 0, 0);
                this.curTable[63] = this.getRgb(0, 0, 0);
                this.makeTables();
                this.setEmphasis(0)
            }
        };
        e.exports = f
    }), (function(f, c) {
        var a = 1789772.5;
        var e = function(k) {
            this.nes = k;
            this.square1 = new g(this, true);
            this.square2 = new g(this, false);
            this.triangle = new b(this);
            this.noise = new d(this);
            this.dmc = new h(this);
            this.frameIrqCounter = null;
            this.frameIrqCounterMax = 4;
            this.initCounter = 2048;
            this.channelEnableValue = null;
            this.sampleRate = 44100;
            this.lengthLookup = null;
            this.dmcFreqLookup = null;
            this.noiseWavelengthLookup = null;
            this.square_table = null;
            this.tnd_table = null;
            this.frameIrqEnabled = false;
            this.frameIrqActive = null;
            this.frameClockNow = null;
            this.startedPlaying = false;
            this.recordOutput = false;
            this.initingHardware = false;
            this.masterFrameCounter = null;
            this.derivedFrameCounter = null;
            this.countSequence = null;
            this.sampleTimer = null;
            this.frameTime = null;
            this.sampleTimerMax = null;
            this.sampleCount = null;
            this.triValue = 0;
            this.smpSquare1 = null;
            this.smpSquare2 = null;
            this.smpTriangle = null;
            this.smpDmc = null;
            this.accCount = null;
            this.prevSampleL = 0;
            this.prevSampleR = 0;
            this.smpAccumL = 0;
            this.smpAccumR = 0;
            this.dacRange = 0;
            this.dcValue = 0;
            this.masterVolume = 256;
            this.stereoPosLSquare1 = null;
            this.stereoPosLSquare2 = null;
            this.stereoPosLTriangle = null;
            this.stereoPosLNoise = null;
            this.stereoPosLDMC = null;
            this.stereoPosRSquare1 = null;
            this.stereoPosRSquare2 = null;
            this.stereoPosRTriangle = null;
            this.stereoPosRNoise = null;
            this.stereoPosRDMC = null;
            this.extraCycles = null;
            this.maxSample = null;
            this.minSample = null;
            this.panning = [80, 170, 100, 150, 128];
            this.setPanning(this.panning);
            this.initLengthLookup();
            this.initDmcFrequencyLookup();
            this.initNoiseWavelengthLookup();
            this.initDACtables();
            for (var j = 0; j < 20; j++) {
                if (j === 16) {
                    this.writeReg(16400, 16)
                } else {
                    this.writeReg(16384 + j, 0)
                }
            }
            this.reset()
        };
        e.prototype = {
            reset: function() {
                this.sampleRate = this.nes.opts.sampleRate;
                this.sampleTimerMax = Math.floor((1024 * a * this.nes.opts.preferredFrameRate) / (this.sampleRate * 60));
                this.frameTime = Math.floor((14915 * this.nes.opts.preferredFrameRate) / 60);
                this.sampleTimer = 0;
                this.updateChannelEnable(0);
                this.masterFrameCounter = 0;
                this.derivedFrameCounter = 0;
                this.countSequence = 0;
                this.sampleCount = 0;
                this.initCounter = 2048;
                this.frameIrqEnabled = false;
                this.initingHardware = false;
                this.resetCounter();
                this.square1.reset();
                this.square2.reset();
                this.triangle.reset();
                this.noise.reset();
                this.dmc.reset();
                this.accCount = 0;
                this.smpSquare1 = 0;
                this.smpSquare2 = 0;
                this.smpTriangle = 0;
                this.smpDmc = 0;
                this.frameIrqEnabled = false;
                this.frameIrqCounterMax = 4;
                this.channelEnableValue = 255;
                this.startedPlaying = false;
                this.prevSampleL = 0;
                this.prevSampleR = 0;
                this.smpAccumL = 0;
                this.smpAccumR = 0;
                this.maxSample = -500000;
                this.minSample = 500000
            },
            readReg: function(i) {
                var j = 0;
                j |= this.square1.getLengthStatus();
                j |= this.square2.getLengthStatus() << 1;
                j |= this.triangle.getLengthStatus() << 2;
                j |= this.noise.getLengthStatus() << 3;
                j |= this.dmc.getLengthStatus() << 4;
                j |= (this.frameIrqActive && this.frameIrqEnabled ? 1 : 0) << 6;
                j |= this.dmc.getIrqStatus() << 7;
                this.frameIrqActive = false;
                this.dmc.irqGenerated = false;
                return j & 65535
            },
            writeReg: function(i, j) {
                if (i >= 16384 && i < 16388) {
                    this.square1.writeReg(i, j)
                } else {
                    if (i >= 16388 && i < 16392) {
                        this.square2.writeReg(i, j)
                    } else {
                        if (i >= 16392 && i < 16396) {
                            this.triangle.writeReg(i, j)
                        } else {
                            if (i >= 16396 && i <= 16399) {
                                this.noise.writeReg(i, j)
                            } else {
                                if (i === 16400) {
                                    this.dmc.writeReg(i, j)
                                } else {
                                    if (i === 16401) {
                                        this.dmc.writeReg(i, j)
                                    } else {
                                        if (i === 16402) {
                                            this.dmc.writeReg(i, j)
                                        } else {
                                            if (i === 16403) {
                                                this.dmc.writeReg(i, j)
                                            } else {
                                                if (i === 16405) {
                                                    this.updateChannelEnable(j);
                                                    if (j !== 0 && this.initCounter > 0) {
                                                        this.initingHardware = true
                                                    }
                                                    this.dmc.writeReg(i, j)
                                                } else {
                                                    if (i === 16407) {
                                                        this.countSequence = (j >> 7) & 1;
                                                        this.masterFrameCounter = 0;
                                                        this.frameIrqActive = false;
                                                        if (((j >> 6) & 1) === 0) {
                                                            this.frameIrqEnabled = true
                                                        } else {
                                                            this.frameIrqEnabled = false
                                                        } if (this.countSequence === 0) {
                                                            this.frameIrqCounterMax = 4;
                                                            this.derivedFrameCounter = 4
                                                        } else {
                                                            this.frameIrqCounterMax = 5;
                                                            this.derivedFrameCounter = 0;
                                                            this.frameCounterTick()
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            resetCounter: function() {
                if (this.countSequence === 0) {
                    this.derivedFrameCounter = 4
                } else {
                    this.derivedFrameCounter = 0
                }
            },
            updateChannelEnable: function(i) {
                this.channelEnableValue = i & 65535;
                this.square1.setEnabled((i & 1) !== 0);
                this.square2.setEnabled((i & 2) !== 0);
                this.triangle.setEnabled((i & 4) !== 0);
                this.noise.setEnabled((i & 8) !== 0);
                this.dmc.setEnabled((i & 16) !== 0)
            },
            clockFrameCounter: function(p) {
                if (this.initCounter > 0) {
                    if (this.initingHardware) {
                        this.initCounter -= p;
                        if (this.initCounter <= 0) {
                            this.initingHardware = false
                        }
                        return
                    }
                }
                p += this.extraCycles;
                var m = this.sampleTimerMax - this.sampleTimer;
                if (p << 10 > m) {
                    this.extraCycles = ((p << 10) - m) >> 10;
                    p -= this.extraCycles
                } else {
                    this.extraCycles = 0
                }
                var n = this.dmc;
                var o = this.triangle;
                var l = this.square1;
                var k = this.square2;
                var j = this.noise;
                if (n.isEnabled) {
                    n.shiftCounter -= p << 3;
                    while (n.shiftCounter <= 0 && n.dmaFrequency > 0) {
                        n.shiftCounter += n.dmaFrequency;
                        n.clockDmc()
                    }
                }
                if (o.progTimerMax > 0) {
                    o.progTimerCount -= p;
                    while (o.progTimerCount <= 0) {
                        o.progTimerCount += o.progTimerMax + 1;
                        if (o.linearCounter > 0 && o.lengthCounter > 0) {
                            o.triangleCounter++;
                            o.triangleCounter &= 31;
                            if (o.isEnabled) {
                                if (o.triangleCounter >= 16) {
                                    o.sampleValue = o.triangleCounter & 15
                                } else {
                                    o.sampleValue = 15 - (o.triangleCounter & 15)
                                }
                                o.sampleValue <<= 4
                            }
                        }
                    }
                }
                l.progTimerCount -= p;
                if (l.progTimerCount <= 0) {
                    l.progTimerCount += (l.progTimerMax + 1) << 1;
                    l.squareCounter++;
                    l.squareCounter &= 7;
                    l.updateSampleValue()
                }
                k.progTimerCount -= p;
                if (k.progTimerCount <= 0) {
                    k.progTimerCount += (k.progTimerMax + 1) << 1;
                    k.squareCounter++;
                    k.squareCounter &= 7;
                    k.updateSampleValue()
                }
                var i = p;
                if (j.progTimerCount - i > 0) {
                    j.progTimerCount -= i;
                    j.accCount += i;
                    j.accValue += i * j.sampleValue
                } else {
                    while (i-- > 0) {
                        if (--j.progTimerCount <= 0 && j.progTimerMax > 0) {
                            j.shiftReg <<= 1;
                            j.tmp = ((j.shiftReg << (j.randomMode === 0 ? 1 : 6)) ^ j.shiftReg) & 32768;
                            if (j.tmp !== 0) {
                                j.shiftReg |= 1;
                                j.randomBit = 0;
                                j.sampleValue = 0
                            } else {
                                j.randomBit = 1;
                                if (j.isEnabled && j.lengthCounter > 0) {
                                    j.sampleValue = j.masterVolume
                                } else {
                                    j.sampleValue = 0
                                }
                            }
                            j.progTimerCount += j.progTimerMax
                        }
                        j.accValue += j.sampleValue;
                        j.accCount++
                    }
                } if (this.frameIrqEnabled && this.frameIrqActive) {
                    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL)
                }
                this.masterFrameCounter += p << 1;
                if (this.masterFrameCounter >= this.frameTime) {
                    this.masterFrameCounter -= this.frameTime;
                    this.frameCounterTick()
                }
                this.accSample(p);
                this.sampleTimer += p << 10;
                if (this.sampleTimer >= this.sampleTimerMax) {
                    this.sample();
                    this.sampleTimer -= this.sampleTimerMax
                }
            },
            accSample: function(i) {
                if (this.triangle.sampleCondition) {
                    this.triValue = Math.floor((this.triangle.progTimerCount << 4) / (this.triangle.progTimerMax + 1));
                    if (this.triValue > 16) {
                        this.triValue = 16
                    }
                    if (this.triangle.triangleCounter >= 16) {
                        this.triValue = 16 - this.triValue
                    }
                    this.triValue += this.triangle.sampleValue
                }
                if (i === 2) {
                    this.smpTriangle += this.triValue << 1;
                    this.smpDmc += this.dmc.sample << 1;
                    this.smpSquare1 += this.square1.sampleValue << 1;
                    this.smpSquare2 += this.square2.sampleValue << 1;
                    this.accCount += 2
                } else {
                    if (i === 4) {
                        this.smpTriangle += this.triValue << 2;
                        this.smpDmc += this.dmc.sample << 2;
                        this.smpSquare1 += this.square1.sampleValue << 2;
                        this.smpSquare2 += this.square2.sampleValue << 2;
                        this.accCount += 4
                    } else {
                        this.smpTriangle += i * this.triValue;
                        this.smpDmc += i * this.dmc.sample;
                        this.smpSquare1 += i * this.square1.sampleValue;
                        this.smpSquare2 += i * this.square2.sampleValue;
                        this.accCount += i
                    }
                }
            },
            frameCounterTick: function() {
                this.derivedFrameCounter++;
                if (this.derivedFrameCounter >= this.frameIrqCounterMax) {
                    this.derivedFrameCounter = 0
                }
                if (this.derivedFrameCounter === 1 || this.derivedFrameCounter === 3) {
                    this.triangle.clockLengthCounter();
                    this.square1.clockLengthCounter();
                    this.square2.clockLengthCounter();
                    this.noise.clockLengthCounter();
                    this.square1.clockSweep();
                    this.square2.clockSweep()
                }
                if (this.derivedFrameCounter >= 0 && this.derivedFrameCounter < 4) {
                    this.square1.clockEnvDecay();
                    this.square2.clockEnvDecay();
                    this.noise.clockEnvDecay();
                    this.triangle.clockLinearCounter()
                }
                if (this.derivedFrameCounter === 3 && this.countSequence === 0) {
                    this.frameIrqActive = true
                }
            },
            sample: function() {
                var o, k;
                if (this.accCount > 0) {
                    this.smpSquare1 <<= 4;
                    this.smpSquare1 = Math.floor(this.smpSquare1 / this.accCount);
                    this.smpSquare2 <<= 4;
                    this.smpSquare2 = Math.floor(this.smpSquare2 / this.accCount);
                    this.smpTriangle = Math.floor(this.smpTriangle / this.accCount);
                    this.smpDmc <<= 4;
                    this.smpDmc = Math.floor(this.smpDmc / this.accCount);
                    this.accCount = 0
                } else {
                    this.smpSquare1 = this.square1.sampleValue << 4;
                    this.smpSquare2 = this.square2.sampleValue << 4;
                    this.smpTriangle = this.triangle.sampleValue;
                    this.smpDmc = this.dmc.sample << 4
                }
                var l = Math.floor((this.noise.accValue << 4) / this.noise.accCount);
                this.noise.accValue = l >> 4;
                this.noise.accCount = 1;
                o = (this.smpSquare1 * this.stereoPosLSquare1 + this.smpSquare2 * this.stereoPosLSquare2) >> 8;
                k = (3 * this.smpTriangle * this.stereoPosLTriangle + (l << 1) * this.stereoPosLNoise + this.smpDmc * this.stereoPosLDMC) >> 8;
                if (o >= this.square_table.length) {
                    o = this.square_table.length - 1
                }
                if (k >= this.tnd_table.length) {
                    k = this.tnd_table.length - 1
                }
                var j = this.square_table[o] + this.tnd_table[k] - this.dcValue;
                o = (this.smpSquare1 * this.stereoPosRSquare1 + this.smpSquare2 * this.stereoPosRSquare2) >> 8;
                k = (3 * this.smpTriangle * this.stereoPosRTriangle + (l << 1) * this.stereoPosRNoise + this.smpDmc * this.stereoPosRDMC) >> 8;
                if (o >= this.square_table.length) {
                    o = this.square_table.length - 1
                }
                if (k >= this.tnd_table.length) {
                    k = this.tnd_table.length - 1
                }
                var n = this.square_table[o] + this.tnd_table[k] - this.dcValue;
                var m = j - this.prevSampleL;
                this.prevSampleL += m;
                this.smpAccumL += m - (this.smpAccumL >> 10);
                j = this.smpAccumL;
                var i = n - this.prevSampleR;
                this.prevSampleR += i;
                this.smpAccumR += i - (this.smpAccumR >> 10);
                n = this.smpAccumR;
                if (j > this.maxSample) {
                    this.maxSample = j
                }
                if (j < this.minSample) {
                    this.minSample = j
                }
                if (this.nes.opts.onAudioSample) {
                    this.nes.opts.onAudioSample(j / 32768, n / 32768)
                }
                this.smpSquare1 = 0;
                this.smpSquare2 = 0;
                this.smpTriangle = 0;
                this.smpDmc = 0
            },
            getLengthMax: function(i) {
                return this.lengthLookup[i >> 3]
            },
            getDmcFrequency: function(i) {
                if (i >= 0 && i < 16) {
                    return this.dmcFreqLookup[i]
                }
                return 0
            },
            getNoiseWaveLength: function(i) {
                if (i >= 0 && i < 16) {
                    return this.noiseWavelengthLookup[i]
                }
                return 0
            },
            setPanning: function(k) {
                for (var j = 0; j < 5; j++) {
                    this.panning[j] = k[j]
                }
                this.updateStereoPos()
            },
            setMasterVolume: function(i) {
                if (i < 0) {
                    i = 0
                }
                if (i > 256) {
                    i = 256
                }
                this.masterVolume = i;
                this.updateStereoPos()
            },
            updateStereoPos: function() {
                this.stereoPosLSquare1 = (this.panning[0] * this.masterVolume) >> 8;
                this.stereoPosLSquare2 = (this.panning[1] * this.masterVolume) >> 8;
                this.stereoPosLTriangle = (this.panning[2] * this.masterVolume) >> 8;
                this.stereoPosLNoise = (this.panning[3] * this.masterVolume) >> 8;
                this.stereoPosLDMC = (this.panning[4] * this.masterVolume) >> 8;
                this.stereoPosRSquare1 = this.masterVolume - this.stereoPosLSquare1;
                this.stereoPosRSquare2 = this.masterVolume - this.stereoPosLSquare2;
                this.stereoPosRTriangle = this.masterVolume - this.stereoPosLTriangle;
                this.stereoPosRNoise = this.masterVolume - this.stereoPosLNoise;
                this.stereoPosRDMC = this.masterVolume - this.stereoPosLDMC
            },
            initLengthLookup: function() {
                this.lengthLookup = [10, 254, 20, 2, 40, 4, 80, 6, 160, 8, 60, 10, 14, 12, 26, 14, 12, 16, 24, 18, 48, 20, 96, 22, 192, 24, 72, 26, 16, 28, 32, 30]
            },
            initDmcFrequencyLookup: function() {
                this.dmcFreqLookup = new Array(16);
                this.dmcFreqLookup[0] = 3424;
                this.dmcFreqLookup[1] = 3040;
                this.dmcFreqLookup[2] = 2720;
                this.dmcFreqLookup[3] = 2560;
                this.dmcFreqLookup[4] = 2288;
                this.dmcFreqLookup[5] = 2032;
                this.dmcFreqLookup[6] = 1808;
                this.dmcFreqLookup[7] = 1712;
                this.dmcFreqLookup[8] = 1520;
                this.dmcFreqLookup[9] = 1280;
                this.dmcFreqLookup[10] = 1136;
                this.dmcFreqLookup[11] = 1024;
                this.dmcFreqLookup[12] = 848;
                this.dmcFreqLookup[13] = 672;
                this.dmcFreqLookup[14] = 576;
                this.dmcFreqLookup[15] = 432
            },
            initNoiseWavelengthLookup: function() {
                this.noiseWavelengthLookup = new Array(16);
                this.noiseWavelengthLookup[0] = 4;
                this.noiseWavelengthLookup[1] = 8;
                this.noiseWavelengthLookup[2] = 16;
                this.noiseWavelengthLookup[3] = 32;
                this.noiseWavelengthLookup[4] = 64;
                this.noiseWavelengthLookup[5] = 96;
                this.noiseWavelengthLookup[6] = 128;
                this.noiseWavelengthLookup[7] = 160;
                this.noiseWavelengthLookup[8] = 202;
                this.noiseWavelengthLookup[9] = 254;
                this.noiseWavelengthLookup[10] = 380;
                this.noiseWavelengthLookup[11] = 508;
                this.noiseWavelengthLookup[12] = 762;
                this.noiseWavelengthLookup[13] = 1016;
                this.noiseWavelengthLookup[14] = 2034;
                this.noiseWavelengthLookup[15] = 4068
            },
            initDACtables: function() {
                var n, k, l;
                var j = 0;
                var m = 0;
                this.square_table = new Array(32 * 16);
                this.tnd_table = new Array(204 * 16);
                for (l = 0; l < 32 * 16; l++) {
                    n = 95.52 / (8128 / (l / 16) + 100);
                    n *= 0.98411;
                    n *= 50000;
                    k = Math.floor(n);
                    this.square_table[l] = k;
                    if (k > j) {
                        j = k
                    }
                }
                for (l = 0; l < 204 * 16; l++) {
                    n = 163.67 / (24329 / (l / 16) + 100);
                    n *= 0.98411;
                    n *= 50000;
                    k = Math.floor(n);
                    this.tnd_table[l] = k;
                    if (k > m) {
                        m = k
                    }
                }
                this.dacRange = j + m;
                this.dcValue = this.dacRange / 2
            }
        };
        var h = function(i) {
            this.papu = i;
            this.MODE_NORMAL = 0;
            this.MODE_LOOP = 1;
            this.MODE_IRQ = 2;
            this.isEnabled = null;
            this.hasSample = null;
            this.irqGenerated = false;
            this.playMode = null;
            this.dmaFrequency = null;
            this.dmaCounter = null;
            this.deltaCounter = null;
            this.playStartAddress = null;
            this.playAddress = null;
            this.playLength = null;
            this.playLengthCounter = null;
            this.shiftCounter = null;
            this.reg4012 = null;
            this.reg4013 = null;
            this.sample = null;
            this.dacLsb = null;
            this.data = null;
            this.reset()
        };
        h.prototype = {
            clockDmc: function() {
                if (this.hasSample) {
                    if ((this.data & 1) === 0) {
                        if (this.deltaCounter > 0) {
                            this.deltaCounter--
                        }
                    } else {
                        if (this.deltaCounter < 63) {
                            this.deltaCounter++
                        }
                    }
                    this.sample = this.isEnabled ? (this.deltaCounter << 1) + this.dacLsb : 0;
                    this.data >>= 1
                }
                this.dmaCounter--;
                if (this.dmaCounter <= 0) {
                    this.hasSample = false;
                    this.endOfSample();
                    this.dmaCounter = 8
                }
                if (this.irqGenerated) {
                    this.papu.nes.cpu.requestIrq(this.papu.nes.cpu.IRQ_NORMAL)
                }
            },
            endOfSample: function() {
                if (this.playLengthCounter === 0 && this.playMode === this.MODE_LOOP) {
                    this.playAddress = this.playStartAddress;
                    this.playLengthCounter = this.playLength
                }
                if (this.playLengthCounter > 0) {
                    this.nextSample();
                    if (this.playLengthCounter === 0) {
                        if (this.playMode === this.MODE_IRQ) {
                            this.irqGenerated = true
                        }
                    }
                }
            },
            nextSample: function() {
                this.data = this.papu.nes.mmap.load(this.playAddress);
                this.papu.nes.cpu.haltCycles(4);
                this.playLengthCounter--;
                this.playAddress++;
                if (this.playAddress > 65535) {
                    this.playAddress = 32768
                }
                this.hasSample = true
            },
            writeReg: function(i, j) {
                if (i === 16400) {
                    if (j >> 6 === 0) {
                        this.playMode = this.MODE_NORMAL
                    } else {
                        if (((j >> 6) & 1) === 1) {
                            this.playMode = this.MODE_LOOP
                        } else {
                            if (j >> 6 === 2) {
                                this.playMode = this.MODE_IRQ
                            }
                        }
                    } if ((j & 128) === 0) {
                        this.irqGenerated = false
                    }
                    this.dmaFrequency = this.papu.getDmcFrequency(j & 15)
                } else {
                    if (i === 16401) {
                        this.deltaCounter = (j >> 1) & 63;
                        this.dacLsb = j & 1;
                        this.sample = (this.deltaCounter << 1) + this.dacLsb
                    } else {
                        if (i === 16402) {
                            this.playStartAddress = (j << 6) | 49152;
                            this.playAddress = this.playStartAddress;
                            this.reg4012 = j
                        } else {
                            if (i === 16403) {
                                this.playLength = (j << 4) + 1;
                                this.playLengthCounter = this.playLength;
                                this.reg4013 = j
                            } else {
                                if (i === 16405) {
                                    if (((j >> 4) & 1) === 0) {
                                        this.playLengthCounter = 0
                                    } else {
                                        this.playAddress = this.playStartAddress;
                                        this.playLengthCounter = this.playLength
                                    }
                                    this.irqGenerated = false
                                }
                            }
                        }
                    }
                }
            },
            setEnabled: function(i) {
                if (!this.isEnabled && i) {
                    this.playLengthCounter = this.playLength
                }
                this.isEnabled = i
            },
            getLengthStatus: function() {
                return this.playLengthCounter === 0 || !this.isEnabled ? 0 : 1
            },
            getIrqStatus: function() {
                return this.irqGenerated ? 1 : 0
            },
            reset: function() {
                this.isEnabled = false;
                this.irqGenerated = false;
                this.playMode = this.MODE_NORMAL;
                this.dmaFrequency = 0;
                this.dmaCounter = 0;
                this.deltaCounter = 0;
                this.playStartAddress = 0;
                this.playAddress = 0;
                this.playLength = 0;
                this.playLengthCounter = 0;
                this.sample = 0;
                this.dacLsb = 0;
                this.shiftCounter = 0;
                this.reg4012 = 0;
                this.reg4013 = 0;
                this.data = 0
            }
        };
        var d = function(i) {
            this.papu = i;
            this.isEnabled = null;
            this.envDecayDisable = null;
            this.envDecayLoopEnable = null;
            this.lengthCounterEnable = null;
            this.envReset = null;
            this.shiftNow = null;
            this.lengthCounter = null;
            this.progTimerCount = null;
            this.progTimerMax = null;
            this.envDecayRate = null;
            this.envDecayCounter = null;
            this.envVolume = null;
            this.masterVolume = null;
            this.shiftReg = 1 << 14;
            this.randomBit = null;
            this.randomMode = null;
            this.sampleValue = null;
            this.accValue = 0;
            this.accCount = 1;
            this.tmp = null;
            this.reset()
        };
        d.prototype = {
            reset: function() {
                this.progTimerCount = 0;
                this.progTimerMax = 0;
                this.isEnabled = false;
                this.lengthCounter = 0;
                this.lengthCounterEnable = false;
                this.envDecayDisable = false;
                this.envDecayLoopEnable = false;
                this.shiftNow = false;
                this.envDecayRate = 0;
                this.envDecayCounter = 0;
                this.envVolume = 0;
                this.masterVolume = 0;
                this.shiftReg = 1;
                this.randomBit = 0;
                this.randomMode = 0;
                this.sampleValue = 0;
                this.tmp = 0
            },
            clockLengthCounter: function() {
                if (this.lengthCounterEnable && this.lengthCounter > 0) {
                    this.lengthCounter--;
                    if (this.lengthCounter === 0) {
                        this.updateSampleValue()
                    }
                }
            },
            clockEnvDecay: function() {
                if (this.envReset) {
                    this.envReset = false;
                    this.envDecayCounter = this.envDecayRate + 1;
                    this.envVolume = 15
                } else {
                    if (--this.envDecayCounter <= 0) {
                        this.envDecayCounter = this.envDecayRate + 1;
                        if (this.envVolume > 0) {
                            this.envVolume--
                        } else {
                            this.envVolume = this.envDecayLoopEnable ? 15 : 0
                        }
                    }
                } if (this.envDecayDisable) {
                    this.masterVolume = this.envDecayRate
                } else {
                    this.masterVolume = this.envVolume
                }
                this.updateSampleValue()
            },
            updateSampleValue: function() {
                if (this.isEnabled && this.lengthCounter > 0) {
                    this.sampleValue = this.randomBit * this.masterVolume
                }
            },
            writeReg: function(i, j) {
                if (i === 16396) {
                    this.envDecayDisable = (j & 16) !== 0;
                    this.envDecayRate = j & 15;
                    this.envDecayLoopEnable = (j & 32) !== 0;
                    this.lengthCounterEnable = (j & 32) === 0;
                    if (this.envDecayDisable) {
                        this.masterVolume = this.envDecayRate
                    } else {
                        this.masterVolume = this.envVolume
                    }
                } else {
                    if (i === 16398) {
                        this.progTimerMax = this.papu.getNoiseWaveLength(j & 15);
                        this.randomMode = j >> 7
                    } else {
                        if (i === 16399) {
                            this.lengthCounter = this.papu.getLengthMax(j & 248);
                            this.envReset = true
                        }
                    }
                }
            },
            setEnabled: function(i) {
                this.isEnabled = i;
                if (!i) {
                    this.lengthCounter = 0
                }
                this.updateSampleValue()
            },
            getLengthStatus: function() {
                return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1
            }
        };
        var g = function(j, i) {
            this.papu = j;
            this.dutyLookup = [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1];
            this.impLookup = [1, -1, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 0];
            this.sqr1 = i;
            this.isEnabled = null;
            this.lengthCounterEnable = null;
            this.sweepActive = null;
            this.envDecayDisable = null;
            this.envDecayLoopEnable = null;
            this.envReset = null;
            this.sweepCarry = null;
            this.updateSweepPeriod = null;
            this.progTimerCount = null;
            this.progTimerMax = null;
            this.lengthCounter = null;
            this.squareCounter = null;
            this.sweepCounter = null;
            this.sweepCounterMax = null;
            this.sweepMode = null;
            this.sweepShiftAmount = null;
            this.envDecayRate = null;
            this.envDecayCounter = null;
            this.envVolume = null;
            this.masterVolume = null;
            this.dutyMode = null;
            this.sweepResult = null;
            this.sampleValue = null;
            this.vol = null;
            this.reset()
        };
        g.prototype = {
            reset: function() {
                this.progTimerCount = 0;
                this.progTimerMax = 0;
                this.lengthCounter = 0;
                this.squareCounter = 0;
                this.sweepCounter = 0;
                this.sweepCounterMax = 0;
                this.sweepMode = 0;
                this.sweepShiftAmount = 0;
                this.envDecayRate = 0;
                this.envDecayCounter = 0;
                this.envVolume = 0;
                this.masterVolume = 0;
                this.dutyMode = 0;
                this.vol = 0;
                this.isEnabled = false;
                this.lengthCounterEnable = false;
                this.sweepActive = false;
                this.sweepCarry = false;
                this.envDecayDisable = false;
                this.envDecayLoopEnable = false
            },
            clockLengthCounter: function() {
                if (this.lengthCounterEnable && this.lengthCounter > 0) {
                    this.lengthCounter--;
                    if (this.lengthCounter === 0) {
                        this.updateSampleValue()
                    }
                }
            },
            clockEnvDecay: function() {
                if (this.envReset) {
                    this.envReset = false;
                    this.envDecayCounter = this.envDecayRate + 1;
                    this.envVolume = 15
                } else {
                    if (--this.envDecayCounter <= 0) {
                        this.envDecayCounter = this.envDecayRate + 1;
                        if (this.envVolume > 0) {
                            this.envVolume--
                        } else {
                            this.envVolume = this.envDecayLoopEnable ? 15 : 0
                        }
                    }
                } if (this.envDecayDisable) {
                    this.masterVolume = this.envDecayRate
                } else {
                    this.masterVolume = this.envVolume
                }
                this.updateSampleValue()
            },
            clockSweep: function() {
                if (--this.sweepCounter <= 0) {
                    this.sweepCounter = this.sweepCounterMax + 1;
                    if (this.sweepActive && this.sweepShiftAmount > 0 && this.progTimerMax > 7) {
                        this.sweepCarry = false;
                        if (this.sweepMode === 0) {
                            this.progTimerMax += this.progTimerMax >> this.sweepShiftAmount;
                            if (this.progTimerMax > 4095) {
                                this.progTimerMax = 4095;
                                this.sweepCarry = true
                            }
                        } else {
                            this.progTimerMax = this.progTimerMax - ((this.progTimerMax >> this.sweepShiftAmount) - (this.sqr1 ? 1 : 0))
                        }
                    }
                }
                if (this.updateSweepPeriod) {
                    this.updateSweepPeriod = false;
                    this.sweepCounter = this.sweepCounterMax + 1
                }
            },
            updateSampleValue: function() {
                if (this.isEnabled && this.lengthCounter > 0 && this.progTimerMax > 7) {
                    if (this.sweepMode === 0 && this.progTimerMax + (this.progTimerMax >> this.sweepShiftAmount) > 4095) {
                        this.sampleValue = 0
                    } else {
                        this.sampleValue = this.masterVolume * this.dutyLookup[(this.dutyMode << 3) + this.squareCounter]
                    }
                } else {
                    this.sampleValue = 0
                }
            },
            writeReg: function(i, j) {
                var k = this.sqr1 ? 0 : 4;
                if (i === 16384 + k) {
                    this.envDecayDisable = (j & 16) !== 0;
                    this.envDecayRate = j & 15;
                    this.envDecayLoopEnable = (j & 32) !== 0;
                    this.dutyMode = (j >> 6) & 3;
                    this.lengthCounterEnable = (j & 32) === 0;
                    if (this.envDecayDisable) {
                        this.masterVolume = this.envDecayRate
                    } else {
                        this.masterVolume = this.envVolume
                    }
                    this.updateSampleValue()
                } else {
                    if (i === 16385 + k) {
                        this.sweepActive = (j & 128) !== 0;
                        this.sweepCounterMax = (j >> 4) & 7;
                        this.sweepMode = (j >> 3) & 1;
                        this.sweepShiftAmount = j & 7;
                        this.updateSweepPeriod = true
                    } else {
                        if (i === 16386 + k) {
                            this.progTimerMax &= 1792;
                            this.progTimerMax |= j
                        } else {
                            if (i === 16387 + k) {
                                this.progTimerMax &= 255;
                                this.progTimerMax |= (j & 7) << 8;
                                if (this.isEnabled) {
                                    this.lengthCounter = this.papu.getLengthMax(j & 248)
                                }
                                this.envReset = true
                            }
                        }
                    }
                }
            },
            setEnabled: function(i) {
                this.isEnabled = i;
                if (!i) {
                    this.lengthCounter = 0
                }
                this.updateSampleValue()
            },
            getLengthStatus: function() {
                return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1
            }
        };
        var b = function(i) {
            this.papu = i;
            this.isEnabled = null;
            this.sampleCondition = null;
            this.lengthCounterEnable = null;
            this.lcHalt = null;
            this.lcControl = null;
            this.progTimerCount = null;
            this.progTimerMax = null;
            this.triangleCounter = null;
            this.lengthCounter = null;
            this.linearCounter = null;
            this.lcLoadValue = null;
            this.sampleValue = null;
            this.tmp = null;
            this.reset()
        };
        b.prototype = {
            reset: function() {
                this.progTimerCount = 0;
                this.progTimerMax = 0;
                this.triangleCounter = 0;
                this.isEnabled = false;
                this.sampleCondition = false;
                this.lengthCounter = 0;
                this.lengthCounterEnable = false;
                this.linearCounter = 0;
                this.lcLoadValue = 0;
                this.lcHalt = true;
                this.lcControl = false;
                this.tmp = 0;
                this.sampleValue = 15
            },
            clockLengthCounter: function() {
                if (this.lengthCounterEnable && this.lengthCounter > 0) {
                    this.lengthCounter--;
                    if (this.lengthCounter === 0) {
                        this.updateSampleCondition()
                    }
                }
            },
            clockLinearCounter: function() {
                if (this.lcHalt) {
                    this.linearCounter = this.lcLoadValue;
                    this.updateSampleCondition()
                } else {
                    if (this.linearCounter > 0) {
                        this.linearCounter--;
                        this.updateSampleCondition()
                    }
                } if (!this.lcControl) {
                    this.lcHalt = false
                }
            },
            getLengthStatus: function() {
                return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1
            },
            readReg: function(i) {
                return 0
            },
            writeReg: function(i, j) {
                if (i === 16392) {
                    this.lcControl = (j & 128) !== 0;
                    this.lcLoadValue = j & 127;
                    this.lengthCounterEnable = !this.lcControl
                } else {
                    if (i === 16394) {
                        this.progTimerMax &= 1792;
                        this.progTimerMax |= j
                    } else {
                        if (i === 16395) {
                            this.progTimerMax &= 255;
                            this.progTimerMax |= (j & 7) << 8;
                            this.lengthCounter = this.papu.getLengthMax(j & 248);
                            this.lcHalt = true
                        }
                    }
                }
                this.updateSampleCondition()
            },
            clockProgrammableTimer: function(i) {
                if (this.progTimerMax > 0) {
                    this.progTimerCount += i;
                    while (this.progTimerMax > 0 && this.progTimerCount >= this.progTimerMax) {
                        this.progTimerCount -= this.progTimerMax;
                        if (this.isEnabled && this.lengthCounter > 0 && this.linearCounter > 0) {
                            this.clockTriangleGenerator()
                        }
                    }
                }
            },
            clockTriangleGenerator: function() {
                this.triangleCounter++;
                this.triangleCounter &= 31
            },
            setEnabled: function(i) {
                this.isEnabled = i;
                if (!i) {
                    this.lengthCounter = 0
                }
                this.updateSampleCondition()
            },
            updateSampleCondition: function() {
                this.sampleCondition = this.isEnabled && this.progTimerMax > 7 && this.linearCounter > 0 && this.lengthCounter > 0
            }
        };
        f.exports = e
    }), (function(d, b, f) {
        var a = f(9);
        var c = f(2);
        var e = function(h) {
            this.nes = h;
            this.mapperName = new Array(92);
            for (var g = 0; g < 92; g++) {
                this.mapperName[g] = "Unknown Mapper"
            }
            this.mapperName[0] = "Direct Access";
            this.mapperName[1] = "Nintendo MMC1";
            this.mapperName[2] = "UNROM";
            this.mapperName[3] = "CNROM";
            this.mapperName[4] = "Nintendo MMC3";
            this.mapperName[5] = "Nintendo MMC5";
            this.mapperName[6] = "FFE F4xxx";
            this.mapperName[7] = "AOROM";
            this.mapperName[8] = "FFE F3xxx";
            this.mapperName[9] = "Nintendo MMC2";
            this.mapperName[10] = "Nintendo MMC4";
            this.mapperName[11] = "Color Dreams Chip";
            this.mapperName[12] = "FFE F6xxx";
            this.mapperName[15] = "100-in-1 switch";
            this.mapperName[16] = "Bandai chip";
            this.mapperName[17] = "FFE F8xxx";
            this.mapperName[18] = "Jaleco SS8806 chip";
            this.mapperName[19] = "Namcot 106 chip";
            this.mapperName[20] = "Famicom Disk System";
            this.mapperName[21] = "Konami VRC4a";
            this.mapperName[22] = "Konami VRC2a";
            this.mapperName[23] = "Konami VRC2a";
            this.mapperName[24] = "Konami VRC6";
            this.mapperName[25] = "Konami VRC4b";
            this.mapperName[32] = "Irem G-101 chip";
            this.mapperName[33] = "Taito TC0190/TC0350";
            this.mapperName[34] = "32kB ROM switch";
            this.mapperName[64] = "Tengen RAMBO-1 chip";
            this.mapperName[65] = "Irem H-3001 chip";
            this.mapperName[66] = "GNROM switch";
            this.mapperName[67] = "SunSoft3 chip";
            this.mapperName[68] = "SunSoft4 chip";
            this.mapperName[69] = "SunSoft5 FME-7 chip";
            this.mapperName[71] = "Camerica chip";
            this.mapperName[78] = "Irem 74HC161/32-based";
            this.mapperName[91] = "Pirate HK-SF3 chip"
        };
        e.prototype = {
            VERTICAL_MIRRORING: 0,
            HORIZONTAL_MIRRORING: 1,
            FOURSCREEN_MIRRORING: 2,
            SINGLESCREEN_MIRRORING: 3,
            SINGLESCREEN_MIRRORING2: 4,
            SINGLESCREEN_MIRRORING3: 5,
            SINGLESCREEN_MIRRORING4: 6,
            CHRROM_MIRRORING: 7,
            header: null,
            rom: null,
            vrom: null,
            vromTile: null,
            romCount: null,
            vromCount: null,
            mirroring: null,
            batteryRam: null,
            trainer: null,
            fourScreen: null,
            mapperType: null,
            valid: false,
            load: function(l) {
                var k, h, g;
                if (l.indexOf("NES") === -1) {
                    throw new Error("Not a valid NES ROM.")
                }
                this.header = new Array(16);
                for (k = 0; k < 16; k++) {
                    this.header[k] = l.charCodeAt(k) & 255
                }
                this.romCount = this.header[4];
                this.vromCount = this.header[5] * 2;
                this.mirroring = (this.header[6] & 1) !== 0 ? 1 : 0;
                this.batteryRam = (this.header[6] & 2) !== 0;
                this.trainer = (this.header[6] & 4) !== 0;
                this.fourScreen = (this.header[6] & 8) !== 0;
                this.mapperType = (this.header[6] >> 4) | (this.header[7] & 240);
                var p = false;
                for (k = 8; k < 16; k++) {
                    if (this.header[k] !== 0) {
                        p = true;
                        break
                    }
                }
                if (p) {
                    this.mapperType &= 15
                }
                this.rom = new Array(this.romCount);
                var o = 16;
                for (k = 0; k < this.romCount; k++) {
                    this.rom[k] = new Array(16384);
                    for (h = 0; h < 16384; h++) {
                        if (o + h >= l.length) {
                            break
                        }
                        this.rom[k][h] = l.charCodeAt(o + h) & 255
                    }
                    o += 16384
                }
                this.vrom = new Array(this.vromCount);
                for (k = 0; k < this.vromCount; k++) {
                    this.vrom[k] = new Array(4096);
                    for (h = 0; h < 4096; h++) {
                        if (o + h >= l.length) {
                            break
                        }
                        this.vrom[k][h] = l.charCodeAt(o + h) & 255
                    }
                    o += 4096
                }
                this.vromTile = new Array(this.vromCount);
                for (k = 0; k < this.vromCount; k++) {
                    this.vromTile[k] = new Array(256);
                    for (h = 0; h < 256; h++) {
                        this.vromTile[k][h] = new c()
                    }
                }
                var m;
                var n;
                for (g = 0; g < this.vromCount; g++) {
                    for (k = 0; k < 4096; k++) {
                        m = k >> 4;
                        n = k % 16;
                        if (n < 8) {
                            this.vromTile[g][m].setScanline(n, this.vrom[g][k], this.vrom[g][k + 8])
                        } else {
                            this.vromTile[g][m].setScanline(n - 8, this.vrom[g][k - 8], this.vrom[g][k])
                        }
                    }
                }
                this.valid = true
            },
            getMirroringType: function() {
                if (this.fourScreen) {
                    return this.FOURSCREEN_MIRRORING
                }
                if (this.mirroring === 0) {
                    return this.HORIZONTAL_MIRRORING
                }
                return this.VERTICAL_MIRRORING
            },
            getMapperName: function() {
                if (this.mapperType >= 0 && this.mapperType < this.mapperName.length) {
                    return this.mapperName[this.mapperType]
                }
                return "Unknown Mapper, " + this.mapperType
            },
            mapperSupported: function() {
                return typeof a[this.mapperType] !== "undefined"
            },
            createMapper: function() {
                if (this.mapperSupported()) {
                    return new a[this.mapperType](this.nes)
                } else {
                    throw new Error("This ROM uses a mapper not supported by JSNES: " + this.getMapperName() + "(" + this.mapperType + ")")
                }
            }
        };
        d.exports = e
    }), (function(d, c, e) {
        var a = e(0);
        var b = {};
        b[0] = function(f) {
            this.nes = f
        };
        b[0].prototype = {
            reset: function() {
                this.joy1StrobeState = 0;
                this.joy2StrobeState = 0;
                this.joypadLastWrite = 0;
                this.zapperFired = false;
                this.zapperX = null;
                this.zapperY = null
            },
            write: function(f, g) {
                if (f < 8192) {
                    this.nes.cpu.mem[f & 2047] = g
                } else {
                    if (f > 16407) {
                        this.nes.cpu.mem[f] = g;
                        if (f >= 24576 && f < 32768) {
                            this.nes.opts.onBatteryRamWrite(f, g)
                        }
                    } else {
                        if (f > 8199 && f < 16384) {
                            this.regWrite(8192 + (f & 7), g)
                        } else {
                            this.regWrite(f, g)
                        }
                    }
                }
            },
            writelow: function(f, g) {
                if (f < 8192) {
                    this.nes.cpu.mem[f & 2047] = g
                } else {
                    if (f > 16407) {
                        this.nes.cpu.mem[f] = g
                    } else {
                        if (f > 8199 && f < 16384) {
                            this.regWrite(8192 + (f & 7), g)
                        } else {
                            this.regWrite(f, g)
                        }
                    }
                }
            },
            load: function(f) {
                f &= 65535;
                if (f > 16407) {
                    return this.nes.cpu.mem[f]
                } else {
                    if (f >= 8192) {
                        return this.regLoad(f)
                    } else {
                        return this.nes.cpu.mem[f & 2047]
                    }
                }
            },
            regLoad: function(g) {
                switch (g >> 12) {
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                    case 3:
                        switch (g & 7) {
                            case 0:
                                return this.nes.cpu.mem[8192];
                            case 1:
                                return this.nes.cpu.mem[8193];
                            case 2:
                                return this.nes.ppu.readStatusRegister();
                            case 3:
                                return 0;
                            case 4:
                                return this.nes.ppu.sramLoad();
                            case 5:
                                return 0;
                            case 6:
                                return 0;
                            case 7:
                                return this.nes.ppu.vramLoad()
                        }
                        break;
                    case 4:
                        switch (g - 16405) {
                            case 0:
                                return this.nes.papu.readReg(g);
                            case 1:
                                return this.joy1Read();
                            case 2:
                                var f;
                                if (this.zapperX !== null && this.zapperY !== null && this.nes.ppu.isPixelWhite(this.zapperX, this.zapperY)) {
                                    f = 0
                                } else {
                                    f = 1 << 3
                                } if (this.zapperFired) {
                                f |= 1 << 4
                            }
                                return (this.joy2Read() | f) & 65535
                        }
                        break
                }
                return 0
            },
            regWrite: function(f, g) {
                switch (f) {
                    case 8192:
                        this.nes.cpu.mem[f] = g;
                        this.nes.ppu.updateControlReg1(g);
                        break;
                    case 8193:
                        this.nes.cpu.mem[f] = g;
                        this.nes.ppu.updateControlReg2(g);
                        break;
                    case 8195:
                        this.nes.ppu.writeSRAMAddress(g);
                        break;
                    case 8196:
                        this.nes.ppu.sramWrite(g);
                        break;
                    case 8197:
                        this.nes.ppu.scrollWrite(g);
                        break;
                    case 8198:
                        this.nes.ppu.writeVRAMAddress(g);
                        break;
                    case 8199:
                        this.nes.ppu.vramWrite(g);
                        break;
                    case 16404:
                        this.nes.ppu.sramDMA(g);
                        break;
                    case 16405:
                        this.nes.papu.writeReg(f, g);
                        break;
                    case 16406:
                        if ((g & 1) === 0 && (this.joypadLastWrite & 1) === 1) {
                            this.joy1StrobeState = 0;
                            this.joy2StrobeState = 0
                        }
                        this.joypadLastWrite = g;
                        break;
                    case 16407:
                        this.nes.papu.writeReg(f, g);
                        break;
                    default:
                        if (f >= 16384 && f <= 16407) {
                            this.nes.papu.writeReg(f, g)
                        }
                }
            },
            joy1Read: function() {
                var f;
                switch (this.joy1StrobeState) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        f = this.nes.controllers[1].state[this.joy1StrobeState];
                        break;
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                        f = 0;
                        break;
                    case 19:
                        f = 1;
                        break;
                    default:
                        f = 0
                }
                this.joy1StrobeState++;
                if (this.joy1StrobeState === 24) {
                    this.joy1StrobeState = 0
                }
                return f
            },
            joy2Read: function() {
                var f;
                switch (this.joy2StrobeState) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        f = this.nes.controllers[2].state[this.joy2StrobeState];
                        break;
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                        f = 0;
                        break;
                    case 19:
                        f = 1;
                        break;
                    default:
                        f = 0
                }
                this.joy2StrobeState++;
                if (this.joy2StrobeState === 24) {
                    this.joy2StrobeState = 0
                }
                return f
            },
            loadROM: function() {
                if (!this.nes.rom.valid || this.nes.rom.romCount < 1) {
                    throw new Error("NoMapper: Invalid ROM! Unable to load.")
                }
                this.loadPRGROM();
                this.loadCHRROM();
                this.loadBatteryRam();
                this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
            },
            loadPRGROM: function() {
                if (this.nes.rom.romCount > 1) {
                    this.loadRomBank(0, 32768);
                    this.loadRomBank(1, 49152)
                } else {
                    this.loadRomBank(0, 32768);
                    this.loadRomBank(0, 49152)
                }
            },
            loadCHRROM: function() {
                if (this.nes.rom.vromCount > 0) {
                    if (this.nes.rom.vromCount === 1) {
                        this.loadVromBank(0, 0);
                        this.loadVromBank(0, 4096)
                    } else {
                        this.loadVromBank(0, 0);
                        this.loadVromBank(1, 4096)
                    }
                } else {}
            },
            loadBatteryRam: function() {
                if (this.nes.rom.batteryRam) {
                    var f = this.nes.rom.batteryRam;
                    if (f !== null && f.length === 8192) {
                        a.copyArrayElements(f, 0, this.nes.cpu.mem, 24576, 8192)
                    }
                }
            },
            loadRomBank: function(g, f) {
                g %= this.nes.rom.romCount;
                a.copyArrayElements(this.nes.rom.rom[g], 0, this.nes.cpu.mem, f, 16384)
            },
            loadVromBank: function(h, g) {
                if (this.nes.rom.vromCount === 0) {
                    return
                }
                this.nes.ppu.triggerRendering();
                a.copyArrayElements(this.nes.rom.vrom[h % this.nes.rom.vromCount], 0, this.nes.ppu.vramMem, g, 4096);
                var f = this.nes.rom.vromTile[h % this.nes.rom.vromCount];
                a.copyArrayElements(f, 0, this.nes.ppu.ptTile, g >> 4, 256)
            },
            load32kRomBank: function(g, f) {
                this.loadRomBank((g * 2) % this.nes.rom.romCount, f);
                this.loadRomBank((g * 2 + 1) % this.nes.rom.romCount, f + 16384)
            },
            load8kVromBank: function(g, f) {
                if (this.nes.rom.vromCount === 0) {
                    return
                }
                this.nes.ppu.triggerRendering();
                this.loadVromBank(g % this.nes.rom.vromCount, f);
                this.loadVromBank((g + 1) % this.nes.rom.vromCount, f + 4096)
            },
            load1kVromBank: function(k, h) {
                if (this.nes.rom.vromCount === 0) {
                    return
                }
                this.nes.ppu.triggerRendering();
                var m = Math.floor(k / 4) % this.nes.rom.vromCount;
                var l = (k % 4) * 1024;
                a.copyArrayElements(this.nes.rom.vrom[m], l, this.nes.ppu.vramMem, h, 1024);
                var g = this.nes.rom.vromTile[m];
                var f = h >> 4;
                for (var j = 0; j < 64; j++) {
                    this.nes.ppu.ptTile[f + j] = g[(k % 4 << 6) + j]
                }
            },
            load2kVromBank: function(k, h) {
                if (this.nes.rom.vromCount === 0) {
                    return
                }
                this.nes.ppu.triggerRendering();
                var m = Math.floor(k / 2) % this.nes.rom.vromCount;
                var l = (k % 2) * 2048;
                a.copyArrayElements(this.nes.rom.vrom[m], l, this.nes.ppu.vramMem, h, 2048);
                var g = this.nes.rom.vromTile[m];
                var f = h >> 4;
                for (var j = 0; j < 128; j++) {
                    this.nes.ppu.ptTile[f + j] = g[(k % 2 << 7) + j]
                }
            },
            load8kRomBank: function(h, f) {
                var g = Math.floor(h / 2) % this.nes.rom.romCount;
                var i = (h % 2) * 8192;
                a.copyArrayElements(this.nes.rom.rom[g], i, this.nes.cpu.mem, f, 8192)
            },
            clockIrqCounter: function() {},
            latchAccess: function(f) {},
            toJSON: function() {
                return {
                    joy1StrobeState: this.joy1StrobeState,
                    joy2StrobeState: this.joy2StrobeState,
                    joypadLastWrite: this.joypadLastWrite
                }
            },
            fromJSON: function(f) {
                this.joy1StrobeState = f.joy1StrobeState;
                this.joy2StrobeState = f.joy2StrobeState;
                this.joypadLastWrite = f.joypadLastWrite
            }
        };
        b[1] = function(f) {
            this.nes = f
        };
        b[1].prototype = new b[0]();
        b[1].prototype.reset = function() {
            b[0].prototype.reset.apply(this);
            this.regBuffer = 0;
            this.regBufferCounter = 0;
            this.mirroring = 0;
            this.oneScreenMirroring = 0;
            this.prgSwitchingArea = 1;
            this.prgSwitchingSize = 1;
            this.vromSwitchingSize = 0;
            this.romSelectionReg0 = 0;
            this.romSelectionReg1 = 0;
            this.romBankSelect = 0
        };
        b[1].prototype.write = function(f, g) {
            if (f < 32768) {
                b[0].prototype.write.apply(this, arguments);
                return
            }
            if ((g & 128) !== 0) {
                this.regBufferCounter = 0;
                this.regBuffer = 0;
                if (this.getRegNumber(f) === 0) {
                    this.prgSwitchingArea = 1;
                    this.prgSwitchingSize = 1
                }
            } else {
                this.regBuffer = (this.regBuffer & (255 - (1 << this.regBufferCounter))) | ((g & 1) << this.regBufferCounter);
                this.regBufferCounter++;
                if (this.regBufferCounter === 5) {
                    this.setReg(this.getRegNumber(f), this.regBuffer);
                    this.regBuffer = 0;
                    this.regBufferCounter = 0
                }
            }
        };
        b[1].prototype.setReg = function(i, j) {
            var h;
            switch (i) {
                case 0:
                    h = j & 3;
                    if (h !== this.mirroring) {
                        this.mirroring = h;
                        if ((this.mirroring & 2) === 0) {
                            this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING)
                        } else {
                            if ((this.mirroring & 1) !== 0) {
                                this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING)
                            } else {
                                this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING)
                            }
                        }
                    }
                    this.prgSwitchingArea = (j >> 2) & 1;
                    this.prgSwitchingSize = (j >> 3) & 1;
                    this.vromSwitchingSize = (j >> 4) & 1;
                    break;
                case 1:
                    this.romSelectionReg0 = (j >> 4) & 1;
                    if (this.nes.rom.vromCount > 0) {
                        if (this.vromSwitchingSize === 0) {
                            if (this.romSelectionReg0 === 0) {
                                this.load8kVromBank(j & 15, 0)
                            } else {
                                this.load8kVromBank(Math.floor(this.nes.rom.vromCount / 2) + (j & 15), 0)
                            }
                        } else {
                            if (this.romSelectionReg0 === 0) {
                                this.loadVromBank(j & 15, 0)
                            } else {
                                this.loadVromBank(Math.floor(this.nes.rom.vromCount / 2) + (j & 15), 0)
                            }
                        }
                    }
                    break;
                case 2:
                    this.romSelectionReg1 = (j >> 4) & 1;
                    if (this.nes.rom.vromCount > 0) {
                        if (this.vromSwitchingSize === 1) {
                            if (this.romSelectionReg1 === 0) {
                                this.loadVromBank(j & 15, 4096)
                            } else {
                                this.loadVromBank(Math.floor(this.nes.rom.vromCount / 2) + (j & 15), 4096)
                            }
                        }
                    }
                    break;
                default:
                    h = j & 15;
                    var f;
                    var g = 0;
                    if (this.nes.rom.romCount >= 32) {
                        if (this.vromSwitchingSize === 0) {
                            if (this.romSelectionReg0 === 1) {
                                g = 16
                            }
                        } else {
                            g = (this.romSelectionReg0 | (this.romSelectionReg1 << 1)) << 3
                        }
                    } else {
                        if (this.nes.rom.romCount >= 16) {
                            if (this.romSelectionReg0 === 1) {
                                g = 8
                            }
                        }
                    } if (this.prgSwitchingSize === 0) {
                    f = g + (j & 15);
                    this.load32kRomBank(f, 32768)
                } else {
                    f = g * 2 + (j & 15);
                    if (this.prgSwitchingArea === 0) {
                        this.loadRomBank(f, 49152)
                    } else {
                        this.loadRomBank(f, 32768)
                    }
                }
            }
        };
        b[1].prototype.getRegNumber = function(f) {
            if (f >= 32768 && f <= 40959) {
                return 0
            } else {
                if (f >= 40960 && f <= 49151) {
                    return 1
                } else {
                    if (f >= 49152 && f <= 57343) {
                        return 2
                    } else {
                        return 3
                    }
                }
            }
        };
        b[1].prototype.loadROM = function() {
            if (!this.nes.rom.valid) {
                throw new Error("MMC1: Invalid ROM! Unable to load.")
            }
            this.loadRomBank(0, 32768);
            this.loadRomBank(this.nes.rom.romCount - 1, 49152);
            this.loadCHRROM();
            this.loadBatteryRam();
            this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        };
        b[1].prototype.switchLowHighPrgRom = function(f) {};
        b[1].prototype.switch16to32 = function() {};
        b[1].prototype.switch32to16 = function() {};
        b[1].prototype.toJSON = function() {
            var f = b[0].prototype.toJSON.apply(this);
            f.mirroring = this.mirroring;
            f.oneScreenMirroring = this.oneScreenMirroring;
            f.prgSwitchingArea = this.prgSwitchingArea;
            f.prgSwitchingSize = this.prgSwitchingSize;
            f.vromSwitchingSize = this.vromSwitchingSize;
            f.romSelectionReg0 = this.romSelectionReg0;
            f.romSelectionReg1 = this.romSelectionReg1;
            f.romBankSelect = this.romBankSelect;
            f.regBuffer = this.regBuffer;
            f.regBufferCounter = this.regBufferCounter;
            return f
        };
        b[1].prototype.fromJSON = function(f) {
            b[0].prototype.fromJSON.apply(this, arguments);
            this.mirroring = f.mirroring;
            this.oneScreenMirroring = f.oneScreenMirroring;
            this.prgSwitchingArea = f.prgSwitchingArea;
            this.prgSwitchingSize = f.prgSwitchingSize;
            this.vromSwitchingSize = f.vromSwitchingSize;
            this.romSelectionReg0 = f.romSelectionReg0;
            this.romSelectionReg1 = f.romSelectionReg1;
            this.romBankSelect = f.romBankSelect;
            this.regBuffer = f.regBuffer;
            this.regBufferCounter = f.regBufferCounter
        };
        b[2] = function(f) {
            this.nes = f
        };
        b[2].prototype = new b[0]();
        b[2].prototype.write = function(f, g) {
            if (f < 32768) {
                b[0].prototype.write.apply(this, arguments);
                return
            } else {
                this.loadRomBank(g, 32768)
            }
        };
        b[2].prototype.loadROM = function() {
            if (!this.nes.rom.valid) {
                throw new Error("UNROM: Invalid ROM! Unable to load.")
            }
            this.loadRomBank(0, 32768);
            this.loadRomBank(this.nes.rom.romCount - 1, 49152);
            this.loadCHRROM();
            this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        };
        b[3] = function(f) {
            this.nes = f
        };
        b[3].prototype = new b[0]();
        b[3].prototype.write = function(f, h) {
            if (f < 32768) {
                b[0].prototype.write.apply(this, arguments);
                return
            } else {
                var g = (h % (this.nes.rom.vromCount / 2)) * 2;
                this.loadVromBank(g, 0);
                this.loadVromBank(g + 1, 4096);
                this.load8kVromBank(h * 2, 0)
            }
        };
        b[4] = function(f) {
            this.nes = f;
            this.CMD_SEL_2_1K_VROM_0000 = 0;
            this.CMD_SEL_2_1K_VROM_0800 = 1;
            this.CMD_SEL_1K_VROM_1000 = 2;
            this.CMD_SEL_1K_VROM_1400 = 3;
            this.CMD_SEL_1K_VROM_1800 = 4;
            this.CMD_SEL_1K_VROM_1C00 = 5;
            this.CMD_SEL_ROM_PAGE1 = 6;
            this.CMD_SEL_ROM_PAGE2 = 7;
            this.command = null;
            this.prgAddressSelect = null;
            this.chrAddressSelect = null;
            this.pageNumber = null;
            this.irqCounter = null;
            this.irqLatchValue = null;
            this.irqEnable = null;
            this.prgAddressChanged = false
        };
        b[4].prototype = new b[0]();
        b[4].prototype.write = function(f, h) {
            if (f < 32768) {
                b[0].prototype.write.apply(this, arguments);
                return
            }
            switch (f) {
                case 32768:
                    this.command = h & 7;
                    var g = (h >> 6) & 1;
                    if (g !== this.prgAddressSelect) {
                        this.prgAddressChanged = true
                    }
                    this.prgAddressSelect = g;
                    this.chrAddressSelect = (h >> 7) & 1;
                    break;
                case 32769:
                    this.executeCommand(this.command, h);
                    break;
                case 40960:
                    if ((h & 1) !== 0) {
                        this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING)
                    } else {
                        this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING)
                    }
                    break;
                case 40961:
                    break;
                case 49152:
                    this.irqCounter = h;
                    break;
                case 49153:
                    this.irqLatchValue = h;
                    break;
                case 57344:
                    this.irqEnable = 0;
                    break;
                case 57345:
                    this.irqEnable = 1;
                    break;
                default:
            }
        };
        b[4].prototype.executeCommand = function(g, f) {
            switch (g) {
                case this.CMD_SEL_2_1K_VROM_0000:
                    if (this.chrAddressSelect === 0) {
                        this.load1kVromBank(f, 0);
                        this.load1kVromBank(f + 1, 1024)
                    } else {
                        this.load1kVromBank(f, 4096);
                        this.load1kVromBank(f + 1, 5120)
                    }
                    break;
                case this.CMD_SEL_2_1K_VROM_0800:
                    if (this.chrAddressSelect === 0) {
                        this.load1kVromBank(f, 2048);
                        this.load1kVromBank(f + 1, 3072)
                    } else {
                        this.load1kVromBank(f, 6144);
                        this.load1kVromBank(f + 1, 7168)
                    }
                    break;
                case this.CMD_SEL_1K_VROM_1000:
                    if (this.chrAddressSelect === 0) {
                        this.load1kVromBank(f, 4096)
                    } else {
                        this.load1kVromBank(f, 0)
                    }
                    break;
                case this.CMD_SEL_1K_VROM_1400:
                    if (this.chrAddressSelect === 0) {
                        this.load1kVromBank(f, 5120)
                    } else {
                        this.load1kVromBank(f, 1024)
                    }
                    break;
                case this.CMD_SEL_1K_VROM_1800:
                    if (this.chrAddressSelect === 0) {
                        this.load1kVromBank(f, 6144)
                    } else {
                        this.load1kVromBank(f, 2048)
                    }
                    break;
                case this.CMD_SEL_1K_VROM_1C00:
                    if (this.chrAddressSelect === 0) {
                        this.load1kVromBank(f, 7168)
                    } else {
                        this.load1kVromBank(f, 3072)
                    }
                    break;
                case this.CMD_SEL_ROM_PAGE1:
                    if (this.prgAddressChanged) {
                        if (this.prgAddressSelect === 0) {
                            this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 49152)
                        } else {
                            this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 32768)
                        }
                        this.prgAddressChanged = false
                    }
                    if (this.prgAddressSelect === 0) {
                        this.load8kRomBank(f, 32768)
                    } else {
                        this.load8kRomBank(f, 49152)
                    }
                    break;
                case this.CMD_SEL_ROM_PAGE2:
                    this.load8kRomBank(f, 40960);
                    if (this.prgAddressChanged) {
                        if (this.prgAddressSelect === 0) {
                            this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 49152)
                        } else {
                            this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 32768)
                        }
                        this.prgAddressChanged = false
                    }
            }
        };
        b[4].prototype.loadROM = function() {
            if (!this.nes.rom.valid) {
                throw new Error("MMC3: Invalid ROM! Unable to load.")
            }
            this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 49152);
            this.load8kRomBank((this.nes.rom.romCount - 1) * 2 + 1, 57344);
            this.load8kRomBank(0, 32768);
            this.load8kRomBank(1, 40960);
            this.loadCHRROM();
            this.loadBatteryRam();
            this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        };
        b[4].prototype.clockIrqCounter = function() {
            if (this.irqEnable === 1) {
                this.irqCounter--;
                if (this.irqCounter < 0) {
                    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL);
                    this.irqCounter = this.irqLatchValue
                }
            }
        };
        b[4].prototype.toJSON = function() {
            var f = b[0].prototype.toJSON.apply(this);
            f.command = this.command;
            f.prgAddressSelect = this.prgAddressSelect;
            f.chrAddressSelect = this.chrAddressSelect;
            f.pageNumber = this.pageNumber;
            f.irqCounter = this.irqCounter;
            f.irqLatchValue = this.irqLatchValue;
            f.irqEnable = this.irqEnable;
            f.prgAddressChanged = this.prgAddressChanged;
            return f
        };
        b[4].prototype.fromJSON = function(f) {
            b[0].prototype.fromJSON.apply(this, arguments);
            this.command = f.command;
            this.prgAddressSelect = f.prgAddressSelect;
            this.chrAddressSelect = f.chrAddressSelect;
            this.pageNumber = f.pageNumber;
            this.irqCounter = f.irqCounter;
            this.irqLatchValue = f.irqLatchValue;
            this.irqEnable = f.irqEnable;
            this.prgAddressChanged = f.prgAddressChanged
        };
        b[5] = function(f) {
            this.nes = f
        };
        b[5].prototype = new b[0]();
        b[5].prototype.write = function(f, g) {
            if (f < 32768) {
                b[0].prototype.write.apply(this, arguments)
            } else {
                this.load8kVromBank(g, 0)
            }
        };
        b[5].prototype.write = function(f, g) {
            if (f < 20480) {
                b[0].prototype.write.apply(this, arguments);
                return
            }
            switch (f) {
                case 20736:
                    this.prg_size = g & 3;
                    break;
                case 20737:
                    this.chr_size = g & 3;
                    break;
                case 20738:
                    this.sram_we_a = g & 3;
                    break;
                case 20739:
                    this.sram_we_b = g & 3;
                    break;
                case 20740:
                    this.graphic_mode = g & 3;
                    break;
                case 20741:
                    this.nametable_mode = g;
                    this.nametable_type[0] = g & 3;
                    this.load1kVromBank(g & 3, 8192);
                    g >>= 2;
                    this.nametable_type[1] = g & 3;
                    this.load1kVromBank(g & 3, 9216);
                    g >>= 2;
                    this.nametable_type[2] = g & 3;
                    this.load1kVromBank(g & 3, 10240);
                    g >>= 2;
                    this.nametable_type[3] = g & 3;
                    this.load1kVromBank(g & 3, 11264);
                    break;
                case 20742:
                    this.fill_chr = g;
                    break;
                case 20743:
                    this.fill_pal = g & 3;
                    break;
                case 20755:
                    this.SetBank_SRAM(3, g & 3);
                    break;
                case 20756:
                case 20757:
                case 20758:
                case 20759:
                    this.SetBank_CPU(f, g);
                    break;
                case 20768:
                case 20769:
                case 20770:
                case 20771:
                case 20772:
                case 20773:
                case 20774:
                case 20775:
                    this.chr_mode = 0;
                    this.chr_page[0][f & 7] = g;
                    this.SetBank_PPU();
                    break;
                case 20776:
                case 20777:
                case 20778:
                case 20779:
                    this.chr_mode = 1;
                    this.chr_page[1][(f & 3) + 0] = g;
                    this.chr_page[1][(f & 3) + 4] = g;
                    this.SetBank_PPU();
                    break;
                case 20992:
                    this.split_control = g;
                    break;
                case 20993:
                    this.split_scroll = g;
                    break;
                case 20994:
                    this.split_page = g & 63;
                    break;
                case 20995:
                    this.irq_line = g;
                    this.nes.cpu.ClearIRQ();
                    break;
                case 20996:
                    this.irq_enable = g;
                    this.nes.cpu.ClearIRQ();
                    break;
                case 20997:
                    this.mult_a = g;
                    break;
                case 20998:
                    this.mult_b = g;
                    break;
                default:
                    if (f >= 20480 && f <= 20501) {
                        this.nes.papu.exWrite(f, g)
                    } else {
                        if (f >= 23552 && f <= 24575) {
                            if (this.graphic_mode === 2) {} else {
                                if (this.graphic_mode !== 3) {
                                    if (this.irq_status & 64) {} else {}
                                }
                            }
                        } else {
                            if (f >= 24576 && f <= 32767) {
                                if (this.sram_we_a === 2 && this.sram_we_b === 1) {}
                            }
                        }
                    }
                    break
            }
        };
        b[5].prototype.loadROM = function() {
            if (!this.nes.rom.valid) {
                throw new Error("UNROM: Invalid ROM! Unable to load.")
            }
            this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 32768);
            this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 40960);
            this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 49152);
            this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 57344);
            this.loadCHRROM();
            this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        };
        b[7] = function(f) {
            this.nes = f
        };
        b[7].prototype = new b[0]();
        b[7].prototype.write = function(f, g) {
            if (f < 32768) {
                b[0].prototype.write.apply(this, arguments)
            } else {
                this.load32kRomBank(g & 7, 32768);
                if (g & 16) {
                    this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING2)
                } else {
                    this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING)
                }
            }
        };
        b[7].prototype.loadROM = function() {
            if (!this.nes.rom.valid) {
                throw new Error("AOROM: Invalid ROM! Unable to load.")
            }
            this.loadPRGROM();
            this.loadCHRROM();
            this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        };
        b[11] = function(f) {
            this.nes = f
        };
        b[11].prototype = new b[0]();
        b[11].prototype.write = function(g, j) {
            if (g < 32768) {
                b[0].prototype.write.apply(this, arguments);
                return
            } else {
                var i = ((j & 15) * 2) % this.nes.rom.romCount;
                var f = ((j & 15) * 2 + 1) % this.nes.rom.romCount;
                this.loadRomBank(i, 32768);
                this.loadRomBank(f, 49152);
                if (this.nes.rom.vromCount > 0) {
                    var h = ((j >> 4) * 2) % this.nes.rom.vromCount;
                    this.loadVromBank(h, 0);
                    this.loadVromBank(h + 1, 4096)
                }
            }
        };
        b[34] = function(f) {
            this.nes = f
        };
        b[34].prototype = new b[0]();
        b[34].prototype.write = function(f, g) {
            if (f < 32768) {
                b[0].prototype.write.apply(this, arguments);
                return
            } else {
                this.load32kRomBank(g, 32768)
            }
        };
        b[38] = function(f) {
            this.nes = f
        };
        b[38].prototype = new b[0]();
        b[38].prototype.write = function(f, g) {
            if (f < 28672 || f > 32767) {
                b[0].prototype.write.apply(this, arguments);
                return
            } else {
                this.load32kRomBank(g & 3, 32768);
                this.load8kVromBank(((g >> 2) & 3) * 2, 0)
            }
        };
        b[66] = function(f) {
            this.nes = f
        };
        b[66].prototype = new b[0]();
        b[66].prototype.write = function(f, g) {
            if (f < 32768) {
                b[0].prototype.write.apply(this, arguments);
                return
            } else {
                this.load32kRomBank((g >> 4) & 3, 32768);
                this.load8kVromBank((g & 3) * 2, 0)
            }
        };
        b[94] = function(f) {
            this.nes = f
        };
        b[94].prototype = new b[0]();
        b[94].prototype.write = function(f, g) {
            if (f < 32768) {
                b[0].prototype.write.apply(this, arguments);
                return
            } else {
                this.loadRomBank(g >> 2, 32768)
            }
        };
        b[94].prototype.loadROM = function() {
            if (!this.nes.rom.valid) {
                throw new Error("UN1ROM: Invalid ROM! Unable to load.")
            }
            this.loadRomBank(0, 32768);
            this.loadRomBank(this.nes.rom.romCount - 1, 49152);
            this.loadCHRROM();
            this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        };
        b[140] = function(f) {
            this.nes = f
        };
        b[140].prototype = new b[0]();
        b[140].prototype.write = function(f, g) {
            if (f < 24576 || f > 32767) {
                b[0].prototype.write.apply(this, arguments);
                return
            } else {
                this.load32kRomBank((g >> 4) & 3, 32768);
                this.load8kVromBank((g & 15) * 2, 0)
            }
        };
        b[180] = function(f) {
            this.nes = f
        };
        b[180].prototype = new b[0]();
        b[180].prototype.write = function(f, g) {
            if (f < 32768) {
                b[0].prototype.write.apply(this, arguments);
                return
            } else {
                this.loadRomBank(g, 49152)
            }
        };
        b[180].prototype.loadROM = function() {
            if (!this.nes.rom.valid) {
                throw new Error("Mapper 180: Invalid ROM! Unable to load.")
            }
            this.loadRomBank(0, 32768);
            this.loadRomBank(this.nes.rom.romCount - 1, 49152);
            this.loadCHRROM();
            this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        };
        d.exports = b
    })])
});

function dbtool() {
    var fcdb = null;
    var storeName = 'nesjson';
    this.saveDate = function(args) {
        var tranJson = fcdb.transaction(storeName, 'readwrite');
        var addNesJsons = tranJson.objectStore(storeName).put(args[0]);
        addNesJsons.onsuccess = function(e) {
            var nesJsonid = e.target.result;
            args[1].nesid = nesJsonid;
            if (args[2]) {
                args[1].id = args[2]
            }
            var addNesInfo = tranJson.objectStore(storeName).put(args[1]);
            addNesInfo.onsuccess = function(e) {
                args[3](nesJsonid, e.target.result)
            }
        };
    };
    this.saveDateCall = function() {
        this.operate(arguments, this.saveDate)
    };
    this.operate = function(args, operateFun) {
        if (fcdb) {
            operateFun(args)
        } else {
            var request = window.indexedDB.open("fcdata");
            request.onerror = function(e) {
                console.log('open Error!')
            };
            request.onsuccess = function(e) {
                fcdb = e.target.result;
                operateFun(args)
            };
            request.onupgradeneeded = function(e) {
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
    this.loadData = function(args) {
        var transaction = fcdb.transaction(storeName);
        var objectStore = transaction.objectStore(storeName);
        var getrequest = objectStore.get(args[0]);
        getrequest.onsuccess = function(event) {
            if (event.target.result) {
                args[1](event.target.result)
            }
        }
    };
    this.loadDataCall = function() {
        this.operate(arguments, this.loadData)
    };
    this.getNesList = function(args) {
        var transaction = fcdb.transaction(storeName);
        var store = transaction.objectStore(storeName);
        var index = store.index("nameIndex");
        var request = index.openCursor(IDBKeyRange.only(args[0]));
        var nesList = [];
        request.onsuccess = function(e) {
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
    this.getNesListCall = function() {
        this.operate(arguments, this.getNesList)
    };
    this.deleteData = function(args) {
        var transaction = fcdb.transaction(storeName, 'readwrite');
        transaction.objectStore(storeName).delete(args[0]);
        transaction.objectStore(storeName).delete(args[1]);
        transaction.oncomplete = function(event) {
            args[2]()
        }
    };
    this.deleteDataCall = function() {
        this.operate(arguments, this.deleteData)
    }
};
