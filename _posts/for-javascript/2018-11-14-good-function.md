---
layout: post
title: 经典的函数
date: Wed Nov 14 2018 19:33:18 GMT+0800 (中国标准时间)
---


### 经典函数收集

#### 调系统摄像头录像转换为canvas
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

#### 设置rem基准值
```js
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
      window.$rootFontSize = el.style.fontSize.replace('px','')
    };
  setRootFontSize();
  window.addEventListener(eventType, setRootFontSize, false);
  // dom加载完毕后计算，而非文档加载完毕（load事件）
  document.addEventListener('DOMContentLoaded', setRootFontSize, false);
})();
```