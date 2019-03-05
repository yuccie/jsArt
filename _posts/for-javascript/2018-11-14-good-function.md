---
layout: post
title: 经典的函数
date: Wed Nov 14 2018 19:33:18 GMT+0800 (中国标准时间)
---


### 经典函数收集

#### 数组去重
```js
// 原始方法一
var arr1 = [ 1, 1, '1', '1' ]
function unique1( arr ) {
  let arrLen = arr.length
  if ( arrLen <= 1 ) return
  debugger
  let resArr = []
  for ( let i = 0; i < arrLen; i++ ) {
    for ( var j = 0, resLen = resArr.length; j < resLen; j++ ) {
      // 判断原数组与结果数组是否有重复，只要有一个重复就是重复了，也就没必要再比较了，就跳出整个循环
      if ( arr[ i ] === resArr[ j ] ) {
        // break以后，j就不会在++了，
        break
      }
    }
    if ( j === resLen ) {
      resArr.push( arr[ i ] )
    }
  }
  return resArr
}
console.log( unique1( arr1 ) )

// indexOf
var arr2 = [ 1, 1, '1', '1' ]
function unique2(arr){
  let arrLen = arr.length
  if(arrLen <= 1) return
  let resArr = []
  for(let i = 0; i < arrLen; i++){
    if(resArr.indexOf(arr[i]) === -1){
      // 如果成立，则不包含
      resArr.push(arr[i])
    }
  }
  return resArr
}
console.log( unique2( arr2 ) )

// filter
var arr3 = [1,1,'1','1']
function unique3(arr){
  let arrLen = arr.length
  if(arrLen <= 1) return

  // return arr.filter((item,index,array) => {
  //   return index === array.indexOf(item)
  // })
  return arr.filter((item,index,array) => 
    // 当箭头函数的函数体只有一个 `return` 语句时，可以省略 `return` 关键字和方法体的花括号
    // 注意花括号也得省略
    index === array.indexOf(item)
  )
}
console.log(unique3(arr3))

// 先排序在去重
var arr4 = [2,'1',1,'2']
function uniqued4(arr){
  // 排序
  let arrLen = arr.sort().length
  if(arrLen <= 1) return
  let newArr = [],prevVal;
  for(let i = 0; i < arrLen; i++ ){
    // 第一个肯定要放进去，然后再找相邻不等的
    // 必须将前一个值存起来
    if(!i || prevVal !== arr[i]){
      newArr.push(arr[i])
    }
    // 每次循环都会赋值一个新值
    prevVal = arr[i]
  }
  return newArr
}
console.log(uniqued4(arr4))

// 先排序在去重，再用filter
var arr5 = [2,'1',1,1,'2']
function uniqued5(arr){
  // 排序
  let arrLen = arr.sort().length
  if(arrLen <= 1) return
  return arr.filter((item,index,array) => 
    !index || item !== array[index-1]
  )
}
console.log(uniqued5(arr5))

// map
var arr6 = [2,'1',1,1,'2']
function uniqued6(arr){
  let arrLen = arr.length
  if(arrLen <= 1) return
  let newMap = new Map()
  // map里面不能有重复的
  return arr.filter(a => !newMap.has(a) && newMap.set(a,1))
}
console.log(uniqued6(arr6))


// Set
var arr6 = [2,'1',1,1,'2']
function uniqued6(arr){
  let arrLen = arr.length
  if(arrLen <= 1) return
  return [...new Set()]
}
console.log(uniqued6(arr6))
















```

#### 调系统摄像头录像转换为canvas
需要开启web服务：
- python3 -m http.server
- npx http-server
- npx serve
```html
<!doctype html>
<head>
</head>
<body>
  <video id=video></video>
  <canvas id=canvas width=640 height=480></canvas>
  <!-- 需要引用下面的js代码 -->
  <script src=index.js></script>
</body>
```
```js
video=document.querySelector('#video');
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream=>{
    video.srcObject = stream;
    video.onloadedmetadata = e=>video.play()
  }
)

canvas=document.querySelector('#canvas')
context=canvas.getContext('2d')
function drawVideoToCanvas(){
  context.drawImage(video,0,0)
  context.fillStyle = "rgb(200,0,0)"
  context.fillRect(300, 400, 50, 50)
  requestAnimationFrame(drawVideoToCanvas)
}
drawVideoToCanvas()
```

#### 保存文件
 ```js
/**
 * 保存一个文件, 目前支持字符串与图片DOM
 * @param {(string|Document)} content - 要保存的内容
 * @param {string} fileName - 要保存为的文件名
 * @param {string} [type=text] - 要保存内容的类型
 * @param {string} [MIMEType="image/png"] - 要保存内容的 mime-type
 */

function saveFile (content, fileName, type = 'text', MIMEType = 'image/png') {
  const fileHandlerMap = {
    text: getTextObjectURL,
    image: getImageDataURL,
  }

  const fileHandler = fileHandlerMap[type]
  const url = fileHandler(content, MIMEType)

  doSave(url, fileName)
}

/**
 * 把一个字符串转换为 URL
 * @param {string} text - 要转换的字符串
 * @returns {string} - URL
 */
function getTextObjectURL(text) {
  const blob = new Blob([text])
  return URL.createObjectURL(blob)
}

/**
 * 把一个图片转换为 URL
 * 注意跨域问题!!
 * @param {Document} imageDom - 要转换的图片的 DOM
 * @param {string} MIMEType - 要转换成的 mime-type
 * @returns {string} - URL
 */
function getImageDataURL(imageDom, MIMEType) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.drawImage(imageDom, 0, 0)
  return canvas.toDataURL(MIMEType)
}

/**
 * 触发浏览器的保存
 * @param {string} url - 要保存的 URL
 * @param {string} fileName - 要保存为的文件名
 */
function doSave(url, fileName) {
  const ele = document.createElement('a')
  ele.href = url
  ele.download = fileName
  ele.style.display = 'none'

  document.body.appendChild(ele)
  ele.click()
  document.body.removeChild(ele)
}
```

#### 防抖与节流
```js
// 节流
function throttle(fn, interval = 300) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
}


// 防抖
function debounce(fn, interval = 300) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
}

```

#### 弹出层完美禁止页面滚动
参考：[弹层之后禁止页面滚动][forbiddenScrollUrl]、[web移动端浮层阻止窗体滚动(张鑫旭)][forbiddenWebScrollZXXUrl]<br/>
- 弹出层position设置为fixed，四个定位锚点均设为0；
- 激活弹出层时给html和body设置overflow: hidden;；
- 激活时，还需要加css属性touch-action: none;

#### 设置rem基准值
```js
// 其实说白了，就是设定两个基准值，一个是屏幕宽度，一个字体大小
// 比如说：移动端设置基准宽750px，设置字体100px
// 而pc端：设置屏幕基准宽1600px，字体16px
// 移动端
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// pc端
(function(){
  'use strict';
  /**
  * 根节点
  * @type {Element}
  */
  var el = document.documentElement,
    /**
    * 事件类型，如果不存在旋转事件，则以reisze代替
    * @type {String}
    */
    eventType = 'orientationchange' in window ? 'orientationchange' : 'resize',
    /**
    * font size基准参考值
    * @type {Number}
    */
    size = 16,
    /**
    * 设备独立像素基准参考值，以 iPhone 6(s) 为基准
    * @type {Number}
    */
    dipWidth = 1600,
    /**
    * 设置根节点font-size
    */
    setRootFontSize = function(){
      el.style.fontSize = el.clientWidth / dipWidth * size + 'px';
    };
  setRootFontSize();
  window.addEventListener(eventType, setRootFontSize, false);
  // dom加载完毕后计算，而非文档加载完毕（load事件）
  document.addEventListener('DOMContentLoaded', setRootFontSize, false);
})();
```



[forbiddenScrollUrl]: https://codepen.io/zhaojun/post/forbidscroll
[forbiddenWebScrollZXXUrl]: https://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/