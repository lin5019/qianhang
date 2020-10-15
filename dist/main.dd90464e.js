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
})({"epB2":[function(require,module,exports) {
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
  $(".items").remove();
  arr.forEach(function (obj, i) {
    html = "\n  <li class=\"items\">\n    <div class=\"shadow-wrapper\">\n      <svg class=\"icon\">\n        <use xlink:href=\"#icon-shadow-list\"></use>\n      </svg>\n    </div>\n    <div class=\"edit-wrapper\">\n      <div class=\"edit\" data-index=\"".concat(i, "\">\u4FEE\u6539\u5FEB\u6377\u65B9\u5F0F</div>\n      <div class=\"del\" data-index=\"").concat(i, "\">\u79FB\u9664</div>\n    </div>\n    <a href=\"").concat(obj.href, "\">\n      <div class=\"site\">\n        <div class=\"logo\">").concat(obj.logo, "</div>\n      </div>\n    </a>\n  </li>\n        ");
    $(html).insertBefore($(".last"));
  });
}

loadData(arr);
$(".addButton").on("click", function () {
  $(".addName").val("");
  $(".addSite").val(""); //to add shorcut

  $(".addPage").addClass('addPageShow');
});

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
}); // addPageShow

$(".cancel").on("click", function () {
  $(".addPage").removeClass('addPageShow');
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
    $(".addPage").removeClass('addPageShow');
  }
}); // delete && edit

var ShadowState = false;
$(".siteList").on("click", ".shadow-wrapper", function (e) {
  $(this).siblings(".edit-wrapper").css("display", "flex");
  ShadowState = true; // e.preventDefault();

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
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.dd90464e.js.map