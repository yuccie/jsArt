---
layout: post
title: 浏览器工作原理
date: Wed Nov 14 2018 13:42:14 GMT+0800
---

## 源码阅读

### vue-router

#### 常见工具函数

```js
const isDef = v => v !== undefined;
const inBrowser = typeof window !== 'undefined'
```

#### 使用unicode或者html显示特殊符号

在项目中，我们经常用iconfont或者svg来显示小的图标，其实还可以使用类似 空格`&nbsp;`这样的html语言来显示，当然还有对应unicode码，如果想使用箭头啥的也完全可以，会节省很大流量，参考：https://www.copypastecharacter.com/

#### 给文字上颜色

一般情况下，我们会使用第三方库来给文字上颜色，但归根接地是使用一些解析语法，比如如下：

```js
// 变量会变成蓝色
function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
```

## 其他

### 正则

```js
// 是否为绝对地址
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\\d+\-\.]*:)?\/\//i.test(url);
};

// 是否为网址，用正则也行，但比较啰嗦
function isUrl(url) {
  try {
    // 如果是非法url，则会报错
    new URL(url);
    return true;
  } catch(err) {
    return false;
  }
}
```

```js
// 在js中使用 ? 来规避属性不存在报错的问题
// ES10或TS3.7+ 可选链操作符 ?. 不再需要显示检测更深层次的嵌套值是否有效
// 如果获取 undefined 或 null 的值（nullish）表达式将会短路，并返回undefined
const person = {
  f: 'a',
  l: 'b',
  pet: {
    name: 'pet',
  }
}
// 可以使用？,这样即使不存在也不会报错
console.log(person.pet?.name); // 'pet'
console.log(person.test?.name); // undefined

// 多级箭头函数的问题：
const add = x => y => {
  console.log(x,y)
  return x + y;
}
add(1)(2)

// 等价于如下
function add (x) {
  return function(y) {
    console.log(x,y)
    return x + y;
  }
}
// 执行顺序，先执行add(1)，然后等待2传入
add(1)(2); // 1 2
```

### 编程题

```js
// 模糊查询，高亮显示
let reg = new RegExp(关键词, 'g');
str.replace(reg, `<font color="red">${关键词}</font>`)
```

#### 递归相关

**递归思想：**

- 找到临界条件

```js
// 题：输入一个数字，返回倒序的字符串形式，比如 1234，返回'4321'，要求使用递归
function numReverse(num) {
  let strNum = String(num);
  return strNum.length === 1
    ? strNum
    : numReverse(strNum.substring(1)) + strNum.substring(0, 1);
}
numReverse(1234); // '4321'

function numReverse1(num) {
  let num1 = num / 10;
  let num2 = num % 10;
  if (num1 < 1) {
    return num;
  } else {
    num1 = Math.floor(num1);
    return `${num2}${numReverse1(num1)}`;
  }
}
```

### 原型相关

```js
function Foo() {
  // 只是函数名上挂在的属性？就是静态属性
  Foo.a = function () {
    console.log(1);
  };
  // 实例可以直接继承的属性
  this.a = function () {
    console.log(2);
  };
}
// 原型上的属性
Foo.prototype.a = function () {
  console.log(3);
};
// 直接挂在构造函数上的是静态属性
Foo.a = function () {
  console.log(4);
};
// 访问的是静态属性
Foo.a(); // 4
let obj = new Foo(); // 实例化后，静态属性发生变化了？对
obj.a(); // 2，先访问实例
Foo.a(); // 1，因为静态属性已经发生变化
```

### Vue相关

关于环境变量的问题，项目中一般通过`process.env.ENV或process.env.NODE_ENV`来获取环境变量，但知道怎么挂在的吗？

```js
// 但是在 webpack 3 及其更低版本中，你需要使用 DefinePlugin：
var webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      // 当然还可以如下，相当于../config/dev.env对象里的key-value都挂载在process.env
      new webpack.DefinePlugin({
        'process.env': require('../config/dev.env')
      }),
    })
  ]
}

// 在webpack4+中，可以使用mode选项
// 方式一
module.exports = {
  mode: 'production'
}

// 方式二
webpack --mode=development

// 但vue结合wepack的项目中，在webpack3及以下版本中，配置环境变量仍然需要显式的利用DefinePlugin
// 但在webpack4+中，vue.config.js里面不支持mode选项，取而代之的是.env.[mode]文件
// vue-cli-service serve 默认使用的就是 development
// vue-cli-service build 默认使用的就是 production

// 但我们经常自己定义一些配置文件，因此可以通过如下命令来加载
// 可能存在的 .env、.env.docker 和 .env.docker.local 文件然后构建出生产环境应用
// 其实也就是获取到上面的文件，然后利用DefinePlugin构建在项目中
vue-cli-service build --mode docker
```

关于 invalid host header 的问题？

```js
// 在开发阶段，经常在vue.config.js里配置一个host，
// 但访问的真实host可能通过 ~/etc/hosts 里的配置进行重新dns解析了，
// 导致真实访问的host其实不是项目里配置的。其实这样是为了防止dns劫持

// 但开发阶段，为了方便，一般都不检查host，配置如下
devServer: {
  open: false,
  // 不配置host，则默认访问localhost
  // 如果localhost没有做dns配置的话（其实就是localhost指向127.0.0.1），会提示 invalid host header
  // host: '0.0.0.0',
  // disableHostCheck: true,// 如果开启，将不会检查host最终访问的到底是哪个服务
}
```

### 好资源链接

1. [一名【合格】前端工程师的自检清单](https://juejin.im/post/5cc1da82f265da036023b628?utm_source=gold_browser_extension)

#### 微信分享 SPA/history 模式

1. [ios 与 android 识别 url 的异同](https://github.com/yongheng2016/blog/issues/78)

#### vue 相关

1. [vue 源码技术内幕](http://hcysun.me/vue-design/)

#### element-ui

1. [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD)

```js
// 当我们直接将后台返回的数据直接赋值给date-picker时，选择时间时会报如下错误：Cannot read property 'getHours' of undefined
if (res && res.data) {
  this.returnLaunch = res.data.returnDetail;
  // date-picker 的时间是格林威时间，如 Thu Jun 22 2019 17:10:30 GMT+0800，
  // 如果我们却用的是时间字符串：2019-06-22 17:10:30 或时间戳的格式去绑定 date-picker，会报Cannot read property 'getHours' of undefined
  // 解决方案：
  // 将v-model绑定的时间转换成格林威时间Thu Jun 22 2019 17:10:30 GMT+0800即可！转换很简单，
  // 只需new Date()一下就可以了。
  this.returnLaunch.returnTime = new Date(this.returnLaunch.returnTime);
}

// 我们经常给table绑定一个loading，但如果同样方式给dialog绑定loading，则会直接全屏loading
// 这是因为dialog的wrapper是全屏的，但此时可以利用指令方式，传入具体的元素类名来实现
// target：一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
// 如下，如果只传入.el-dialog还是全屏，可以绑定一个xxx的类名实现(审查元素查看层级关系即可)
this.loadingInstance = Loading.service({
  target: '.xxx .el-dialog',
  text: '处理中...'
})
this.loadingInstance.close();
```

#### 数字滚动

1. [滚动插件 countUp.js](https://inorganik.github.io/countUp.js/)
2. [滚动插件 npm](https://npm.taobao.org/package/countup.js)

#### 好的 ui 风格

1. [material](https://material.io/)
2. [materializecss](https://materializecss.com/buttons.html)

#### js 动画

- https://www.zcfy.cc/article/11-javascript-animation-libraries-for-2018
- http://www.css88.com/archives/7389
- http://h5bp.github.io/Effeckt.css/

1. [tween](https://www.tweenmax.com.cn/about/)
2. [页面切换效果](http://www.yyyweb.com/demo/page-transitions/)
3. [animejs](http://animejs.com/)
4. [动画库 4](https://www.lottiefiles.com/)
5. [动画库 5](https://daneden.github.io/animate.css/)
6. [动画库 6](http://animejs.com/)
7. [动画库 7](http://animejs.com/)
8. [动画库 8](http://animejs.com/)

#### css 相关

1. [css 实现 ooter 置底](http://liaokeyu.com/%E6%8A%80%E6%9C%AF/2017/01/06/%E8%AF%91-CSS%E4%BA%94%E7%A7%8D%E6%96%B9%E5%BC%8F%E5%AE%9E%E7%8E%B0Footer%E7%BD%AE%E5%BA%95.html)
2. [学习 css 布局](http://zh.learnlayout.com/inline-block.html)

#### 文档生成工具

1. [jsdoc](http://www.css88.com/doc/jsdoc/index.html)
2. [vue-styleguidist](https://github.com/vue-styleguidist/vue-styleguidist)

#### RSA 与 AES

1. [为什么 RSA 每次加密的结果都不同](https://blog.csdn.net/guyongqiangx/article/details/74930951)

#### webView 性能优化

1. [美团分析 webview](https://tech.meituan.com/WebViewPerf.html)

#### react 相关

[react 的  今天昨天](https://juejin.im/post/5be90d825188254b0917f180)
[react 有哪些最佳实践](https://www.zhihu.com/question/36516604)

#### Gcs-Vno-Jekyll 主题 博客相关

[ios 喵神](https://onevcat.com/#blog)
[安卓某开发](http://www.gcssloop.com/#blog)
[安卓某开发](http://www.gcssloop.com/#blog)
[安卓某开发](http://www.gcssloop.com/#blog)

#### 终端相关

1. [npm -g 遇到 write access](https://www.jianshu.com/p/31744aa44824)
2. [mac 配置环境变量](https://www.jianshu.com/p/acb1f062a925)

#### IED 相关

1. [vscode 配置 vue 插件](https://juejin.im/post/5a08d1d6f265da430f31950e)
2. [vscode 插件推荐 - 献给所有前端工程师（2019.10.12 更新）](https://segmentfault.com/a/1190000006697219)

#### 什么是 Monaco Editor？

微软之前有个项目叫做 Monaco Workbench，后来这个项目变成了 VSCode，而 Monaco Editor（下文简称 monaco）就是从这个项目中成长出来的一个 web 编辑器，他们很大一部分的代码（monaco-editor-core）都是共用的，所以 monaco 和 VSCode 在编辑代码，交互以及 UI 上几乎是一摸一样的，有点不同的是，两者的平台不一样，monaco 基于浏览器，而 VSCode 基于 electron，所以功能上 VSCode 更加健全，并且性能比较强大。

参考：

- [Monaco Editor 使用](https://zhuanlan.zhihu.com/p/47746336)
- 官方文档：https://microsoft.github.io/monaco-editor/api/index.html

#### 什么是 electron

Electron 可以让你使用纯 JavaScript 调用丰富的原生(操作系统) APIs 来创造桌面应用。 你可以把它看作一个 Node.js 的变体，它专注于桌面应用而不是 Web 服务器端。

这不意味着 Electron 是某个图形用户界面（GUI）库的 JavaScript 版本。 相反，Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。

从开发的角度来看, Electron application 本质上是一个 Node. js 应用程序。

参考：

- [打造你的第一个 Electron 应用](https://www.electronjs.org/docs/tutorial/first-app)
