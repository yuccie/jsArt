---
layout: post
title: 那些酷的代码
date: Wed Jan 30 2019 11:55:28 GMT+0800 (中国标准时间)
---

### 复制到粘贴板，去app打开

参考：[js实现复制到粘贴板][jsCopyTextTOClipboardUrl]<br/>

主要两种方法：
1. 第三方库：clipboard.js
2. 原生方法：document.execCommand()

原生版本1：
```html
<button id="btn"></button>
```

```js
const btn = document.querySelector("#btn")
btn.addEventListener('click',function(){
  // 原生方法只支持input,textarea
  const input = document.createElement('input')
  input.setAttribute('value','这是要复制的内容')
  input.select()
})
```

原生方法在ios会自动拉起键盘(因为focus了)，另外input.select()在ios下并没有选中全部内容，因此还需要`input.setSelectionRange(0, input.value.length)`
参考：[复制内容打开app][clipboardContextOpenAppURl]

***获取剪切板的数据***<br/>
参考：[js获取剪切板内容(segmentfault)][jsGetClipboardContextUrl]<br/>

### 关于进制转换

***任意进制之间转换***<br/>
参考：[进制转换][SysConvertUrl]<br/>

```js
// js实现parseInt
function _parseInt (string, radix) {
  if (typeof string !== "string" && typeof string !== "number") return NaN;
  if (radix && (typeof radix !== "number" || /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(radix) || radix > 36 || radix < 2)) return NaN;
  string = String(string)
  var rexp = (radix == 10) ? /(-?)([0]?)([0-9]+)/ : /(-?)([0]?[Xx]?)([0-9a-fA-F]+)/,
      a = string.match(rexp),
      sign = a[1],
      rawRadix = a[2],
      rawNum = a[3],
      result = 0,
      strArr = rawNum.split(''),
      len = strArr.length,
      numArr = [];
  if (a && !radix) {
      if ( rawRadix.toUpperCase() === "0X") {
          radix = 16;
      } else if (rawRadix === "0") {
          radix = 8;
      } else {
          radix = 10;
      }
  }
  for (var i = 0; i < len; i++){
      var num;
      var charCode = strArr[i].toUpperCase().charCodeAt(0);
      if(radix <=36 && radix >= 11) {
          if (charCode >= 65 && charCode <= 90) {
              num = charCode - 55;
          } else {
              num = charCode - 48;
          }
      }  else {
          num = charCode - 48;
      }
      if (num < radix) {
          numArr.push(num);
      } else {
          return NaN
      };
  }
  if(numArr.length > 0) {
    numArr.forEach(function(item, j){
        result += item * Math.pow(radix, numArr.length-j-1);
    })
  }
  if(sign === "-"){
    result = -result;
  }
  return result
}
```

### 关于进度条
***直线进度条***<br/>
参考：[不可思议的css滚动进度条效果(掘金)][cssScrollLineProcessDemoUrl]

***环形进度条***<br/>
参考：[环形进度条实现方法总结][circleProcessDemoUrl]、[circle progress 环形进度条][circleProcessDemoUrl1]<br/>

方式总结：
- 粗暴直接，用多个sprite图拼接
- 一个环形底图，两个半圆，js旋转半圆实现
- canvas画布
- svg

***仪表盘进度条***<br/>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML5中的SVG属性实现圆形进度条效果</title>
  <style>
    @keyframes offset {
      0% {
        stroke-dashoffset: 942px;
      }
    }
    .ball {
      animation: offset 2s linear infinite;
    }
  </style>
</head>
<body>
<!-- 所谓命名空间，通常是 一个能代表企业或个人的字符串，用于修饰限定标签的名字。在 XML 文档中，通过把“xmlns=" 命名空间的名字 "”作为标签的一个属性记 述，就可以为标签设定命名空间。 -->
  <svg width="400px" height="300px" version="1.1" viewBox="0 0 581 327" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" transform="translate(300,250)" stroke-width="1" fill-rule="evenodd">
      <defs>
        <linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="a">
          <stop stop-color="#5694E7" offset="0%"></stop>
          <stop stop-color="#4963DE" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path fill="none" d="M-130,75 A150,150,125,1,1,130,75 " opacity="0.1" stroke="#4963DE" stroke-width="20"
        stroke-linecap="round" />
      <path id="ring" class="ball" fill="none" stroke-width="20" stroke-dasharray="942 942" stroke-linecap="round"
        stroke="url(#a)" />
      <text font-family="PingFangSC-Medium, PingFang SC" font-size="30" font-weight="400" fill="#222222">
        <tspan x="-280" y="-125">消费额度</tspan>
      </text>
      <text font-family="Helvetica-Bold, Helvetica" font-size="56" font-weight="bold" fill="#4963DE">
        <tspan x="-110" y="2">8,880.00</tspan>
      </text>
      <text font-family="PingFangSC-Regular, PingFang SC" font-size="24" font-weight="normal" fill="#888888">
        <tspan x="-50" y="-50">可用额度</tspan>
      </text>
      <text font-family="PingFangSC-Regular, PingFang SC" font-size="20" x="-80" y="50" font-weight="normal">
        <tspan fill="#888888">总额度：</tspan>
        <tspan font-family="PingFangSC-Medium, PingFang SC" font-weight="400" fill="#222222">10,000.00
        </tspan>
      </text>
      <path stroke="#E4E4E4" stroke-linecap="square"></path>
    </g>
  </svg>
</body>
</html>
```

```js
function getRealXY( x, y, p ) {
  const x1 = x * Math.cos( p ) + y * Math.sin( p );
  const y1 = y * Math.cos( p ) - x * Math.sin( p );
  return {
    x1: x1.toFixed( 2 ), y1: y1.toFixed( 2 ),
  };
}

let path = document.getElementById( 'ring' );
let r = 150;
let progress = 1;
// 计算当前的进度对应的角度值
let angle = progress * ( Math.PI / 180 ) * 240;

// 偏转角度 固定为30度
let pianzhuan = 30 * ( Math.PI / 180 );

//极坐标转换成直角坐标
let x = -( Math.cos( angle ) * r ).toFixed( 2 );
let y = -( Math.sin( angle ) * r ).toFixed( 2 );

//大于180度时候画大角度弧，小于180度的画小角度弧，(deg > 180) ? 1 : 0
let lenghty = window.Number( progress * 240 > 180 );
console.log( 'angle', angle );
console.log( 'lenghty', lenghty );
const { x1, y1 } = getRealXY( x, y, pianzhuan );
console.log( x1, y1 );
//path 属性
let descriptions = [ 'M', -130, 75, 'A', r, r, 75, lenghty, 1, x1, y1 ];

// 给path 设置属性
path.setAttribute( 'd', descriptions.join( ' ' ) );

```


[SysConvertUrl]:http://www.cnblogs.com/gaizai/p/4233780.html '任意进制转换'
[circleProcessDemoUrl]: http://www.dengzhr.com/frontend/css/421
[circleProcessDemoUrl1]: http://reygreen1.github.io/2015/09/08/canvas-circle-progress/
[cssScrollLineProcessDemoUrl]: https://juejin.im/post/5c35953ce51d45523f04b6d2
[jsCopyTextTOClipboardUrl]: https://juejin.im/post/5a94f8eff265da4e9b593c29
[jsGetClipboardContextUrl]: https://segmentfault.com/a/1190000004288686
[clipboardContextOpenAppURl]: https://www.jianshu.com/p/025c7ad4d359