// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/Pen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Pen = /*#__PURE__*/function () {
  function Pen(color, parentNode) {
    var _this = this;

    _classCallCheck(this, Pen);

    _defineProperty(this, "click", function (e) {
      _this.reset();

      _this.active = !_this.active;

      if (_this.active) {
        _this.dom.classList.add('active');

        _this.ctx.strokeStyle = _this.color;
        _this.ui.paintColor.value = _this.color;
        _this.ui.logo.style.color = _this.color === '#ffffff' ? 'black' : _this.color;
      }
    });

    this.dom = undefined;
    this.active = false;
    this.color = color;
    this.parentNode = parentNode;
  }

  _createClass(Pen, [{
    key: "render",
    value: function render() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pen';
      var drawer = arguments.length > 1 ? arguments[1] : undefined;
      var ctx = drawer.ctx,
          pensDom = drawer.pensDom,
          ui = drawer.ui;
      this.pensDom = pensDom;
      this.ctx = ctx;
      this.ui = ui;

      if (this.color === '#ffffff') {
        name = "clean";
      }

      var html = "<div style=\"display: inline-block\"> <svg class=\"icon\" aria-hidden=\"true\">\n                            <use xlink:href=\"#icon-".concat(name, "\"></use>\n                        </svg></div>");
      var temp = document.createElement('template');
      temp.innerHTML = html;
      var dom = temp.content.firstChild;
      dom.style.color = this.color === '#ffffff' ? 'black' : this.color;
      dom.classList.add('pen');
      this.parentNode.appendChild(dom);
      this.dom = dom;
      this.dom.onclick = this.click;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pensDom.forEach(function (d) {
        d.active = false;
        d.dom.classList.remove('active');
      });
    }
  }]);

  return Pen;
}();

var _default = Pen;
exports.default = _default;
},{}],"js/exportCanvasAsPNG.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function exportCanvasAsPNG(id, isTouchdevice) {
  var canvasElement = document.getElementById(id);
  var MIME_TYPE = "image/png";
  var imgData = canvasElement.toDataURL(MIME_TYPE);

  if (isTouchdevice) {
    var image = new Image();
    image.src = imgData;
    image.classList.add('saveImage');
    savePhotoBox.children[1].append(image);
    savePhotoBox.classList.add('visible');

    closeSavePhotoBox.onclick = function () {
      savePhotoBox.classList.remove('visible');
    };
  } else {
    var link = document.createElement("a");
    var blob = dataURLtoBlob(imgData);
    var objUrl = URL.createObjectURL(blob);
    link.download = "image.png";
    link.href = objUrl;
    link.click();
  }

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {
      type: mime
    });
  }
}

var _default = exportCanvasAsPNG;
exports.default = _default;
},{}],"js/Drawer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pen = _interopRequireDefault(require("./Pen"));

var _exportCanvasAsPNG = _interopRequireDefault(require("./exportCanvasAsPNG"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Drawer = /*#__PURE__*/function () {
  function Drawer() {
    _classCallCheck(this, Drawer);

    this.isTouchDevice = false;
    this.ctx = undefined;
    this.drawing = false;
    this.last = undefined;
    this.pens = ['#000000', '#cc1827', '#dabff1', '#114c84', '#aad3f7', '#7eea82', '#ffffff'];
    this.pensDom = [];
    this.ui = {
      canvas: '#canvas',
      paintColor: "#paintColor",
      paintLineWidth: '#paintLineWidth',
      clearBtn: '#clear',
      penBox: '#penBox',
      saveBtn: '#save',
      logo: '#logo',
      closeSavePhotoBox: '#closeSavePhotoBox'
    };
  }

  _createClass(Drawer, [{
    key: "init",
    value: function init() {
      this.initUI();
      this.initCtx();
      this.initPen();
      this.isTouchDevice = 'ontouchstart' in document.documentElement;
      this.initEvent();
    }
  }, {
    key: "initUI",
    value: function initUI() {
      var _this = this;

      Object.keys(this.ui).forEach(function (key) {
        _this.ui[key] = document.querySelector(_this.ui[key]);
      });
      this.ui.canvas.width = document.documentElement.clientWidth;
      this.ui.canvas.height = document.documentElement.clientHeight - 54;
    }
  }, {
    key: "initPen",
    value: function initPen() {
      var _this2 = this;

      this.pens.forEach(function (item, index) {
        _this2.pensDom[index] = new _Pen.default(item, _this2.ui.penBox);

        _this2.pensDom[index].render('pen', _this2);
      });
      this.pensDom[0].click();
    }
  }, {
    key: "initWhiteCanvasBg",
    value: function initWhiteCanvasBg() {
      this.ctx.save();
      this.ctx.fillStyle = '#fff';
      this.ctx.rect(0, 0, this.ui.canvas.width, this.ui.canvas.height);
      this.ctx.fill();
      this.ctx.restore();
    }
  }, {
    key: "initCtx",
    value: function initCtx() {
      this.ctx = this.ui.canvas.getContext('2d');
      this.ctx.strokeStyle = 'black';
      this.ctx.lineCap = 'round'; //线段直接的连接方式

      this.ctx.lineWidth = 8;
      this.initWhiteCanvasBg();
    }
  }, {
    key: "initEvent",
    value: function initEvent() {
      this.initUIEvent();

      if (this.isTouchDevice) {
        this.initTouchDrawEvent();
      } else {
        this.initPcDrawEvent();
      }
    }
  }, {
    key: "initUIEvent",
    value: function initUIEvent() {
      var _this3 = this;

      this.ui.paintColor.onchange = function (e) {
        var color = _this3.ui.paintColor.value;
        _this3.ctx.strokeStyle = color;

        _this3.pensDom[0].reset();

        _this3.ui.logo.style.color = color === '#ffffff' ? 'black' : color;
      };

      this.ui.paintLineWidth.onchange = function () {
        _this3.ctx.lineWidth = _this3.ui.paintLineWidth.value;
      };

      this.ui.clearBtn.onclick = function () {
        if (window.confirm("确定要清除画布吗")) {
          _this3.ctx.clearRect(0, 0, _this3.ui.canvas.width, _this3.ui.canvas.height);
        }
      };

      this.ui.saveBtn.onclick = function () {
        _this3.save();
      };
    }
  }, {
    key: "initTouchDrawEvent",
    value: function initTouchDrawEvent() {
      var _this4 = this;

      this.ui.canvas.ontouchstart = function (e) {
        _this4.last = [e.touches[0].layerX, e.touches[0].clientY - 40];
      };

      this.ui.canvas.ontouchmove = function (e) {
        _this4.drawLine(_this4.last[0], _this4.last[1], e.touches[0].clientX, e.touches[0].clientY - 40);

        _this4.last = [e.touches[0].clientX, e.touches[0].clientY - 40];
      };

      document.body.addEventListener('touchmove', function (e) {
        e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
      }, {
        passive: false
      }); //passive 参数不能省略，用来兼容ios和android
    }
  }, {
    key: "initPcDrawEvent",
    value: function initPcDrawEvent() {
      var _this5 = this;

      this.ui.canvas.onmousedown = function (e) {
        _this5.drawing = true;
        _this5.last = [e.layerX, e.layerY];
      };

      this.ui.canvas.onmouseup = function () {
        _this5.drawing = false;
      };

      this.ui.canvas.onmousemove = function (e) {
        if (_this5.drawing === true) {
          _this5.drawLine(_this5.last[0], _this5.last[1], e.layerX, e.layerY);

          _this5.last = [e.layerX, e.layerY];
        }
      };
    }
  }, {
    key: "drawLine",
    value: function drawLine(x1, y1, x2, y2) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }, {
    key: "save",
    value: function save() {
      (0, _exportCanvasAsPNG.default)('canvas', this.isTouchDevice);
    }
  }]);

  return Drawer;
}();

var _default = Drawer;
exports.default = _default;
},{"./Pen":"js/Pen.js","./exportCanvasAsPNG":"js/exportCanvasAsPNG.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

var _Drawer = _interopRequireDefault(require("./Drawer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawer = new _Drawer.default();
drawer.init();
},{"./Drawer":"js/Drawer.js"}],"../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65283" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map