// console.log(JSON.parse(localStorage.getItem('data')));
// let arr = [
//     {
//         href: 'https://www.acfun.cn/',
//         logo: 'acfun',
//         // link: 'www.acfun.cn',
//     },
//     {
//         href: 'https://www.bilibili.com/',
//         logo: 'bilibili',
//         // link: 'www.bilibili.com',
//     },
// ];

function loadData(arr) {
  let html;
  $(".siteList>li").not(".last").remove();
  arr.forEach((obj) => {
    console.log(1, obj.logo);
    html = `
        <li>
        <a href="${obj.href}">
            <div class="site">
                <div class="logo">
                    ${obj.logo}
                </div>
               
            </div>
        </a>
        </li>`;
    $(html).insertBefore($(".last"));
  });
}

// loadData(arr);
// $('.addButton').on('click', fn);
// function fn() {
//     let str = prompt();
//     if (str[0] !== 'h') {
//         str = 'https://' + str;
//     }

//     arr.push({
//         href: str,
//         logo: str,
//         link: str,
//     });

//     loadData(arr);
// }

// window.onbeforeunload = function (e) {
//    localStorage.setItem('data', JSON.stringify(arr));
//     var e = window.event || e;
//     e.returnValue = '确定离开当前页面吗？';
// };

// add shortcut
let state = false;
$(".addPage").on("input", "input", () => {
  if (
    $(".addName").val().trim().length > 0 &&
    $(".addSite").val().trim().length > 0
  ) {
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



$('.cancel').on('touchstart',function(){
    console.log(1);
})
$('.cancel').on('touchend',function(){
    console.log(2);
})

