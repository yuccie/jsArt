---
layout: post
title: 基本的js原理
date: Thu Jan 17 2019 15:17:36 GMT+0800 (中国标准时间)
---


#### **defer与async**
**注意：**默认情况下就是defer
```js
<script src="script.js"></script>
// 没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

<script async src="script.js"></script>
// 有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。

<script defer src="myscript.js"></script>
// 有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。
```


```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```
上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，**因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”**。

**ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入**。
```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```
上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为**编译时加载或者静态加载**，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，**这也导致了没法引用 ES6 模块本身，因为它不是对象**。

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。



#### **Module的加载实现**

***1、ES6 模块与 CommonJS 模块的差异***
- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。 <br/>

第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

下面重点解释第一个差异。

CommonJS 模块输出的是值的拷贝，也就是说，**一旦输出一个值，模块内部的变化就影响不到这个值**。请看下面这个模块文件lib.js的例子。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```


[babelChineseDocsUrl]: https://www.babeljs.cn/docs/plugins
[exports&exportDiffUrl]: https://github.com/aooy/blog/issues/5
[requestAnimationFrame-ruanyifeng-Url]: https://javascript.ruanyifeng.com/htmlapi/requestanimationframe.html
[requestAnimationFrame-taobao-FED-Url]: http://taobaofed.org/blog/2017/03/02/thinking-in-request-animation-frame/
[requestAnimationFrame-zhangxinxu-Url]: https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/
[YouDoNotKonwSetTimeoutUrl]: https://www.jeffjade.com/2016/01/10/2016-01-10-javacript-setTimeout/
[w3cOfficalSetTimeoutUrl]: https://www.w3.org/TR/html5/webappapis.html#timers
[setTimeoutAndSetIntervalUrl]: https://github.com/aooy/blog/issues/5
[dynamicImportUrl]: https://www.w3ctech.com/topic/1977
[nativeECAMScriptModulesUrl]: https://www.w3ctech.com/topic/1977