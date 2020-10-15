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
})({"main.js":[function(require,module,exports) {
var arr = JSON.parse(localStorage.getItem("siteData")) || [{
  href: "https://www.acfun.cn/",
  logo: "acfun"
}, {
  href: "https://www.bilibili.com/",
  logo: "bilibili"
}, {
  href: "https://www.baidu.com/",
  logo: "百度"
}, {
  href: "https://www.zhihu.com/",
  logo: "知乎"
}, {
  href: "http://www.ruanyifeng.com/blog/",
  logo: "阮一峰的网络日志"
}, {
  href: "https://www.vipbic.com/rank.html",
  logo: "vipbic"
}, {
  href: "https://www.wikipedia.org/",
  logo: "wiki"
}, {
  href: "https://www.google.com/",
  logo: "google"
}, {
  href: "https://github.com/",
  logo: "github"
}, {
  href: "https://www.imooc.com/",
  logo: "慕课网"
}];

function loadData(arr) {
  var html;
  $(".siteList li").not(".last").remove();
  arr.forEach(function (obj, i) {
    html = "\n        <li>\n        <div class=\"shadow-wrapper\">\n            <svg class=\"icon\">\n              <use xlink:href=\"#icon-shadow-list\"></use>\n            </svg>\n          </div>\n          <div class=\"edit-wrapper\" >\n              <div class=\"edit\" data-index=".concat(i, ">\u4FEE\u6539\u5FEB\u6377\u65B9\u5F0F</div>\n              <div class=\"del\" data-index=").concat(i, ">\u79FB\u9664</div>\n          </div>\n        <a href=\"").concat(obj.href, "\">\n            <div class=\"site\">\n                <div class=\"logo\">\n                    ").concat(obj.logo, "\n                </div>\n               \n            </div>\n        </a>\n        </li>");
    $(html).insertBefore($(".last"));
  });
}

loadData(arr);
$(".addButton").on("click", fn);

function fn() {
  //to add shorcut
  $(".addPage").css("display", "flex");
}

window.onbeforeunload = function (e) {
  localStorage.setItem("siteData", JSON.stringify(arr)); //   var e = window.event || e;
  //   e.returnValue = "确定离开当前页面吗？";
}; // add shortcut
//开关


var state = false;
var siteName;
var siteAddress;
$(".addPage").on("input", function () {
  siteName = $(".addName").val().trim();
  siteAddress = $(".addSite").val().trim();

  if (siteName.length > 0 && siteAddress.length > 0) {
    if (state === false) {
      state = true;
      $(".completion").addClass("blue");
    }
  } else {
    if (state) {
      state = false;
      $(".completion").removeClass("blue");
    }
  }
});
$(".cancel").on("click", function () {
  $(".addPage").css("display", "none");
  $(".addName").val("");
  $(".addSite").val("");
  loadData(arr);
});
$(".completion").on("click", function () {
  if (state) {
    if (siteAddress[0] !== "h") {
      siteAddress = "https://" + siteAddress;
    }

    arr.push({
      href: siteAddress,
      logo: siteName
    });
    loadData(arr);
    $(".addPage").css("display", "none");
    $(".addName").val("");
    $(".addSite").val("");
  }
}); // delete && edit

var ShadowState = false;
$(".shadow-wrapper").on("click", function (e) {
  $(this).siblings(".edit-wrapper").css("display", "flex");
  ShadowState = true;
  e.preventDefault();
  e.stopPropagation();
});
$(".edit").on("click", function () {
  $(".addPage").css("display", "flex");
  $(".addName").val(arr[$(this).attr("data-index")].href);
  $(".addSite").val(arr[$(this).attr("data-index")].logo);
});
$(".del").on("click", function (e) {
  arr.splice($(this).attr("data-index"), 1);
  loadData(arr);
});
$(document).on("click", function () {
  if (ShadowState) {
    $(".edit-wrapper").css("display", "none");
  }
}); // 回车提交表单

document.onkeydown = function (e) {
  // 兼容FF和IE和Opera
  var theEvent = window.event || e;
  var code = theEvent.keyCode || theEvent.which || theEvent.charCode;

  if (code == 13) {
    $(".completion").click();
  }
};
},{}],"../../../../AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64679" + '/');

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
},{}]},{},["../../../../AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map