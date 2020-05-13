//防抖动函数,解决重复频繁调用问题

export function debounce(func , delay){
  let timer = null;
  return function(...args){
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}
//=============================================================================================
// 时间格式化(正则表达式,字符串匹配利器)
export function formatDate(date, fmt) {

//1.获取年份
//y+ 一个或者多个y
//y* 零个或者多个y
//y? 零个或者一个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
//2.获取月/日/时/分/秒
//          yyyy/MM/dd/hh:mm/ss
//          y年, M(大写)月, d日, h 12小时制(H 24小时制),m 分, s 秒
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

//============================================================================================