let arr = JSON.parse(localStorage.getItem("siteData")) || [
  {
    href: "https://www.acfun.cn/",
    logo: "acfun",
  },
  {
    href: "https://www.bilibili.com/",
    logo: "bilibili",
  },
  {
    href: "https://www.baidu.com/",
    logo: "百度",
  },
  {
    href: "https://www.zhihu.com/",
    logo: "知乎",
  },
  {
    href: "http://www.ruanyifeng.com/blog/",
    logo: "阮一峰的网络日志",
  },
  {
    href: "https://www.vipbic.com/rank.html",
    logo: "vipbic",
  },
  {
    href: "https://www.wikipedia.org/",
    logo: "wiki",
  },
  {
    href: "https://www.google.com/",
    logo: "google",
  },
  {
    href: "https://github.com/",
    logo: "github",
  },
  {
    href: "https://www.imooc.com/",
    logo: "慕课网",
  },
];

function loadData(arr) {
  let html;
  $(".items").remove();
  arr.forEach((obj, i) => {
    html = `
  <li class="items">
    <div class="shadow-wrapper">
      <svg class="icon">
        <use xlink:href="#icon-shadow-list"></use>
      </svg>
    </div>
    <div class="edit-wrapper">
      <div class="edit" data-index="${i}">修改快捷方式</div>
      <div class="del" data-index="${i}">移除</div>
    </div>
    <a href="${obj.href}">
      <div class="site">
        <div class="logo">${obj.logo}</div>
      </div>
    </a>
  </li>
        `;
    $(html).insertBefore($(".last"));
  });
}

loadData(arr);

$(".addButton").on("click", () => {
  $(".addName").val("");
  $(".addSite").val("");
  //to add shorcut
  $(".addPage").addClass('addPageShow')
});

window.onbeforeunload = function (e) {
  localStorage.setItem("siteData", JSON.stringify(arr));
  //   var e = window.event || e;
  //   e.returnValue = "确定离开当前页面吗？";
};

// add shortcut
//开关
let state = false;
let siteName;
let siteAddress;
$(".addPage").on("input", () => {
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
// addPageShow
$(".cancel").on("click", function () {
  $(".addPage").removeClass('addPageShow')
  $(".addName").val("");
  $(".addSite").val("");
  loadData(arr);
});

$(".completion").on("click", () => {
  if (state) {
    if (siteAddress[0] !== "h") {
      siteAddress = "https://" + siteAddress;
    }

    arr.push({
      href: siteAddress,
      logo: siteName,
    });
    loadData(arr);
    $(".addPage").removeClass('addPageShow')
  }
});

// delete && edit

let ShadowState = false;
$(".siteList").on("click", ".shadow-wrapper", function (e) {
  $(this).siblings(".edit-wrapper").css("display", "flex");
  ShadowState = true;
  // e.preventDefault();
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
});

// 回车提交表单
document.onkeydown = function (e) {
  // 兼容FF和IE和Opera
  var theEvent = window.event || e;
  var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
  if (code == 13) {
    $(".completion").click();
  }
};
