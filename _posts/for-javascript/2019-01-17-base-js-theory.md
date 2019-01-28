---
layout: post
title: 基本的js原理
date: Thu Jan 17 2019 15:17:36 GMT+0800 (中国标准时间)
---
[参考js秘密花园][jsSecretGardenUrl]

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

#### **内置类型的构造函数**
**注意：**内置类型（比如 Number 和 String）的构造函数在被调用时，使用或者不使用 new 的结果完全不同。
```js
new Number(10) === 10;     // False, 对象与数字的比较
Number(10) === 10;         // True, 数字与数字的比较
new Number(10) + 0 === 10; // True, 由于隐式的类型转换
```
使用内置类型 Number 作为构造函数将会创建一个新的 Number 对象， 而在不使用 new 关键字的 Number 函数更像是一个数字转换器。
为了避免意向不到的问题，一般都显式的声明转换规则。如
```js
// 使用一元的加号操作符，将字符串变为数字
+'10' === 10; // true
// 字符串转数字，还有以下常见的几种
+'010' === 10
Number('010') === 10
parseInt('010', 10) === 10  // 用来转换为整数

+'010.2' === 10.2
Number('010.2') === 10.2
parseInt('010.2', 10) === 10

// 当然还有使用两次否操作符，可以变为布尔值
!!'foo';   // true
!!'';      // false
!!'0';     // true
!!'1';     // true
!!'-1'     // true
!!{};      // true
!!true;    // true
```

#### **定时器**
定时函数 setTimeout 和 setInterval 都可以接受字符串作为它们的第一个参数。 这个字符串总是在**全局作用域**中执行，

另外建议不要在调用定时器函数时，为了向回调函数传递参数而使用字符串的形式。
```js
function foo(a, b, c) {}
// 不要这样做
setTimeout('foo(1,2, 3)', 1000)
// 可以使用匿名函数完成相同功能
setTimeout(function() {
    foo(1, 2, 3);
}, 1000)
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
[jsSecretGardenUrl]: https://bonsaiden.github.io/JavaScript-Garden/zh/