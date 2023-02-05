---
layout: post
title: 关于javascript你需要知道的
date: Fri May 10 2019 17:25:55 GMT+0800 (中国标准时间)
---

> 写在前面：平时开发中总是遇见相同的问题，但很多时候都需要重新查找相关资料才可以，不但浪费了时间，而且每次都有种重新开始的感觉。。。因此将这些常见问题总结在一起，后续再有相关问题，都将其归为一类进行总结对比学习。

### **参考资料**

[参考 js 秘密花园][jssecretgardenurl]、JavaScript 高级程序设计、你不知道的 JavaScript 系列、

## **数据类型**

---
### 数字类型

1. JavaScript 中的常规数字以 64 位的格式 IEEE-754 存储，也被称为“双精度浮点数”。
2. BigInt 数字，用于表示任意长度的整数。有时会需要它们，因为常规数字不能超过 2^53 或小于 -2^53。

方法 num.toString(base) 返回在给定 base 进制数字系统中 num 的字符串表示形式。**base=36 是最大进制**，数字可以是 0..9 或 A..Z。所有拉丁字母都被用于了表示数字。**对于 36 进制来说，一个有趣且有用的例子是，当我们需要将一个较长的数字标识符转换成较短的时候，例如做一个短的 URL**。可以简单地使用基数为 36 的数字系统表示：

```js
// ..为了避免小数点的错误
alert( 123456..toString(36) ); // 2n9c

Math.trunc() //（IE 浏览器不支持这个方法）
// 移除小数点后的所有内容而没有舍入：3.1 变成 3，-1.1 变成 -1。

// 有 1.2345，并且想把它舍入到小数点后两位，仅得到 1.23。可以如下，先乘再除
let num = 1.23456;
alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
```

### 不精确的计算

在内部，数字是以 64 位格式 IEEE-754 表示的，所以正好有 64 位可以存储一个数字：其中 52 位被用于存储这些数字，其中 11 位用于存储小数点的位置（对于整数，它们为零），而 1 位用于符号。

如果一个数字太大，则会溢出 64 位存储，并可能会导致无穷大：

```js
alert( 1e500 ); // Infinity
```

为什么`0.1 + 0.2 == 0.30000000000000004` ?

一个数字以其二进制的形式存储在内存中，一个 1 和 0 的序列。但是在十进制数字系统中看起来很简单的 0.1，0.2 这样的小数，实际上在二进制形式中是无限循环小数。

换句话说，什么是 0.1？0.1 就是 1 除以 10，1/10，即十分之一。在十进制数字系统中，这样的数字表示起来很容易。将其与三分之一进行比较：1/3。三分之一变成了无限循环小数 0.33333(3)。

在十进制数字系统中，可以保证以 10 的整数次幂作为除数能够正常工作，但是以 3 作为除数则不能。也是同样的原因，在二进制数字系统中，可以保证以 2 的整数次幂作为除数时能够正常工作，但 1/10 就变成了一个无限循环的二进制小数。

使用二进制数字系统无法 精确 存储 0.1 或 0.2，就像没有办法将三分之一存储为十进制小数一样。

IEEE-754 数字格式通过将数字舍入到最接近的可能数字来解决此问题。这些舍入规则通常不允许我们看到“极小的精度损失”，但是它确实存在。

>不仅仅是 JavaScript
>许多其他编程语言也存在同样的问题。
>PHP，Java，C，Perl，Ruby 给出的也是完全相同的结果，因为它们基于的是相同的数字格式。

数字内部表示的另一个有趣结果是存在两个零：0 和 -0。

```js
0 === -0 // true
```

这是因为在存储时，使用一位来存储符号，因此对于包括零在内的任何数字，可以设置这一位或者不设置。
在大多数情况下，这种区别并不明显，因为运算符将它们视为相同的值。

**Object.is：**

有一个特殊的内建方法 Object.is，它类似于 === 一样对值进行比较，但它对于两种边缘情况更可靠：

- 它适用于 NaN：Object.is（NaN，NaN）=== true，这是件好事。
- 值 0 和 -0 是不同的：Object.is（0，-0）=== false，从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。
- 在所有其他情况下，Object.is(a，b) 与 a === b 相同。

这种比较方式经常被用在 JavaScript 规范中。当内部算法需要比较两个值是否完全相同时可以使用。

**parseInt 和 parseFloat：**

使用加号 + 或 Number() 的数字转换是严格的。如果一个值不完全是一个数字，就会失败：

```js
alert( +"100px" ); // NaN
```

唯一的例外是字符串开头或结尾的空格，因为它们会被忽略。

但在现实生活中，我们经常会有带有单位的值，例如 CSS 中的 "100px" 或 "12pt"。并且，在很多国家，货币符号是紧随金额之后的，所以我们有 "19€"，并希望从中提取出一个数值。

这就是 parseInt 和 parseFloat 的作用。

它们可以从字符串中“读取”数字，直到无法读取为止。如果发生 error，则返回收集到的数字。函数 parseInt 返回一个整数，而 parseFloat 返回一个浮点数：

```js
alert( parseInt('100px') ); // 100，可以直接解析带单位的值
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12，只有整数部分被返回了
alert( parseFloat('12.3.4') ); // 12.3，在第二个点出停止了读取

// 某些情况下，parseInt/parseFloat 会返回 NaN。当没有数字可读时会发生这种情况：
alert( parseInt('a123') ); // NaN，第一个符号停止了读取
```

对于不同的数字系统：

- 可以直接在十六进制（0x），八进制（0o）和二进制（0b）系统中写入数字。
- parseInt(str，base) 将字符串 str 解析为在给定的 base 数字系统中的整数，2 ≤ base ≤ 36。
- num.toString(base) 将数字转换为在给定的 base 数字系统中的字符串。

Math.round 和 toFixed 都将数字舍入到最接近的数字：0..4 会被舍去，而 5..9 会进一位。

```js
alert( 1.35.toFixed(1) ); // 1.4
alert( 6.35.toFixed(1) ); // 6.3 为设么？

// 这是因为内部存储的问题：
// 在内部，6.35 的小数部分是一个无限的二进制。在这种情况下，它的存储会造成精度损失。
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
alert( 1.35.toFixed(20) ); // 1.35000000000000008882

// 在进行舍入前，我们应该使其更接近整数：
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
// 请注意，63.5 完全没有精度损失。这是因为小数部分 0.5 实际上是 1/2。以 2 的整数次幂为分母的小数在二进制数字系统中可以被精确地表示，
alert( Math.round(6.35 * 10) / 10); // 6.35 -> 63.5 -> 64(rounded) -> 6.4
```

---
### 字符串

在 JavaScript 中，文本数据被以字符串形式存储，单个字符没有单独的类型。字符串的内部格式始终是 UTF-16，它不依赖于页面编码。

```js
let guestList = "Guests:\n * John\n * Pete\n * Mary";
alert(guestList); // 一个多行的客人列表

let str1 = "Hello\nWorld"; // 使用“换行符”创建的两行字符串

// 使用反引号和普通的换行创建的两行字符串
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

访问字符：方括号是获取字符的一种现代化方法，而 charAt 是历史原因才存在的。

```js
let str = `Hello`;

// 第一个字符
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// 最后一个字符
alert( str[str.length - 1] ); // o
```

str.indexOf(substr, pos) 它从给定位置 pos 开始，在 str 中查找 substr，如果没有找到，则返回 -1，否则返回匹配成功的位置。

```js
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // 这是我们要查找的目标

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // 继续从下一个位置查找
}
```

### JSON、toJSON方法

假设我们有一个复杂的对象，我们希望将其转换为字符串，以通过网络发送，或者只是为了在日志中输出它。

```js
let user = {
  name: "John",
  age: 30,

  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
};

alert(user); // {name: "John", age: 30}
```

但在开发过程中，会新增一些属性，旧的属性会被重命名和删除。每次更新这种 toString 都会非常痛苦。我们可以尝试遍历其中的属性，但是如果对象很复杂，并且在属性中嵌套了对象呢？

JSON（JavaScript Object Notation）是表示值和对象的通用格式。在 RFC 4627 标准中有对其的描述。**最初它是为 JavaScript 而创建的，但许多其他编程语言也有用于处理它的库**。

- JSON.stringify(value, replacer, spaces)  将对象转换为 JSON。
- SON.parse(str, [reviver]) 将 JSON 转换回对象。

JSON 支持以下数据类型：

- Objects { ... }
- Arrays [ ... ]
- Primitives：
- strings，
- numbers，
- boolean values true/false，
- null。

**JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过**。

- 函数属性（方法）。
- Symbol 类型的属性。
- 存储 undefined 的属性。

```js
let user = {
  sayHi() { // 被忽略
    alert("Hello");
  },
  [Symbol("id")]: 123, // 被忽略
  something: undefined // 被忽略
};

alert( JSON.stringify(user) ); // {}（空对象）

// 属性列表应用于了整个对象结构。所以 participants 是空的，因为 name 不在列表中。
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup 引用了 room
};

room.occupiedBy = meetup; // room 引用了 meetup

alert( JSON.stringify(meetup, ['title', 'participants']) );
// {"title":"Conference","participants":[{},{}]}
```

像 toString 进行字符串转换，对象**也可以提供 toJSON 方法来进行 JSON 转换**。如果可用，JSON.stringify 会自动调用它。

```js
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // (2)
  }
*/
```
在这儿我们可以看到 date (1) 变成了一个字符串。这是因为所有日期都有一个内置的 toJSON 方法来返回这种类型的字符串。

```js
let room = {
  number: 23,
  toJSON() {
    return this.number;
  }
};

let meetup = {
  title: "Conference",
  room
};

alert( JSON.stringify(room) ); // 23
```

## 杂项

### Proxy 和 Reflect

https://blog.csdn.net/qq_27127385/article/details/103959956

Proxy 构造函数的两个参数
Proxy 实例的方法
属性读取拦截 -- get()
属性赋值拦截 -- set()
函数调用拦截 -- apply()
函数查询拦截 -- has()
构造函数拦截 -- construct()
属性删除拦截 -- deleteProperty()
添加属性拦截 -- defineProperty()
描述对象拦截 -- getOwnPropertyDescriptor()
对象原型拦截 -- getPrototypeOf()
属性键名拦截 -- ownKeys()
改变原型拦截 -- setPrototypeOf()
this 问题


## **错误处理**

---
***错误处理，"try..catch"***

```js
try {
  lalala; // error, variable is not defined!
} catch(err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)

  // 也可以将一个 error 作为整体显示出来as a whole
  // Error 信息被转换为像 "name: message" 这样的字符串
  alert(err); // ReferenceError: lalala is not defined
}

// 如果我们不需要 error 的详细信息，catch 也可以忽略它：
try {
  // ...
} catch { // <-- 没有 (err)
  // ...
}
```

```js
// 如果try 中有一个 return，finally 会优先执行
function func() {
  try {
    return 1;
  } catch (e) {
    /* ... */
  } finally {
    alert( 'finally' );
  }
}
alert( func() ); // 先执行 finally 中的 alert，然后执行这个 alert
```

```js
// 当然还可以不要catch
function func() {
  // 开始执行需要被完成的操作（比如测量）
  try {
    // ...
  } finally {
    // 完成前面我们需要完成的那件事儿，即使 try 中的执行失败了
  }
}
```

全局catch：例如，Node.JS 有 process.on("uncaughtException")。在浏览器中，我们可以将将一个函数赋值给特殊的 window.onerror 属性，该函数将在发生未捕获的 error 时执行。

```js
<script>
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };

  function readData() {
    badFunc(); // 啊，出问题了！
  }

  readData();
</script>
```

---

***自定义 Error，扩展 Error***

对于网络操作中的 error，我们需要 HttpError，对于数据库操作中的 error，我们需要 DbError，对于搜索操作中的 error，我们需要 NotFoundError，等等。

## **Promise**

--- 
### 

- finally不一定在最后
- finally没有入参

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("result"), 2000)
})
  .finally(() => alert("Promise ready"))
  .then(result => alert(result)); // <-- .then 对结果进行处理
```

创建一个函数：showCircle(cx, cy, radius)，来显示一个不断变大的圆，同时等到圆画好后，展示文字
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <style>
    .message-ball {
      font-size: 20px;
      line-height: 200px;
      text-align: center;
    }
    .circle {
      transition-property: width, height, margin-left, margin-top;
      transition-duration: 2s;
      position: fixed;
      transform: translateX(-50%) translateY(-50%);
      background-color: red;
      border-radius: 50%;
    }
  </style>
</head>

<body>

  <button onclick="go()">Click me</button>

  <script>

  function go() {
    showCircle(150, 150, 100).then(div => {
      // 原生方式添加类名
      div.classList.add('message-ball');
      div.append("Hello, world!");
    });
  }

  function showCircle(cx, cy, radius) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    return new Promise(resolve => {
      setTimeout(() => {
        div.style.width = radius * 2 + 'px';
        div.style.height = radius * 2 + 'px';
        // 添加transitionend事件
        div.addEventListener('transitionend', function handler() {
          // 移除事件，同时命名函数
          div.removeEventListener('transitionend', handler);
          // resolve
          resolve(div);
        });
      }, 0);
    })
  }
  </script>
</body>
</html>
```

--- 
***promise链***

当处理程序（handler）**返回一个值时，它将成为该 promise 的 result**，所以将使用它调用下一个 .then。

当然也可以不使用return，而是手动创建promise；
```js
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

确切地说，处理程序（handler）返回的不完全是一个 promise，而是返回的被称为 “thenable” 对象 — 一个具有方法 .then 的任意对象。主要是考虑到第三方可以自己扩展。

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // 1 秒后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result); // (*)
  })
  .then(alert); // 1000ms 后显示 2
```
如果它具有名为 then 的可调用方法，那么它将**调用该方法并提供原生的函数 resolve 和 reject 作为参数**（类似于 executor），并等待直到其中一个函数被调用

--- 
***使用 promise 处理错误***

Promise 的执行者（executor）和 promise 的处理程序（handler）周围有一个“隐式的 try..catch”。如果发生异常，它（译注：指异常）就会被捕获，并被视为 rejection 进行处理。

```js
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!

// 和下面完全等价

new Promise((resolve, reject) => {
  reject(new Error('Whoops!'));
}).catch(alert)
```
在 executor 周围的“隐式 try..catch”自动捕获了 error，并将其变为 rejected promise

如果error在catch里正常处理了，则接下来的then还会继续执行，否则不执行：

```js
// 执行流：catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // 处理它
  } else {
    alert("Can't handle such error");

    throw error; // 再次抛出此 error 或另外一个 error，执行将跳转至下一个 catch
  }

}).then(function() {
  /* 不在这里运行 */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // 不会返回任何内容 => 执行正常进行

});
```

***未处理的 rejection***

```js
new Promise(function() {
  noSuchFunction(); // 这里出现 error（没有这个函数）
})
  .then(() => {
    // 一个或多个成功的 promise 处理程序（handler）
  }); // 尾端没有 .catch！
```

JavaScript 引擎会跟踪此类 rejection，在这种情况下会生成一个全局的 error。此时可以使用`unhandledrejection`事件：

```js
window.addEventListener('unhandledrejection', function(event) {
  // 这个事件对象有两个特殊的属性：
  alert(event.promise); // [object Promise] - 生成该全局 error 的 promise
  alert(event.reason); // Error: Whoops! - 未处理的 error 对象
});

new Promise(function() {
  throw new Error("Whoops!");
}); // 没有用来处理 error 的 catch
```

```js
// 看下面的错误可以捕获吗？
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
// 这里的错误并不是在 executor 运行时生成的，而是在稍后生成的。因此，promise 无法处理它。
```

---

***Promise API***

- 结果数组中元素的顺序与其在源 promise 中的顺序相同，即使速度不同
- 如果任意一个reject，被 reject 的 error 成为了整个 Promise.all 的结果。
- 此时其他的处理依然在执行，只是不会再影响Promise.all了

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// 将每个 url 映射（map）到 fetch 的 promise 中
let requests = urls.map(url => fetch(url));

// Promise.all 等待所有任务都 resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

通常，Promise.all(...) 接受可迭代对象（iterable）的 promise（大多数情况下是数组）。但是，如果这些对象中的任意一个都不是 promise，那么它将被“按原样”传递给结果数组。
```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

Promise.all中一个出问题，整个响应就成reject那个的了，不太好，还有一个api可以查看所有的结果，不管是resolve还是reject

Promise.allSettled 等待所有的 promise 都被 settle，无论结果如何。结果数组具有：
- {status:"fulfilled", value:result} 对于成功的响应，
- {status:"rejected", reason:error} 对于 error。

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

如果浏览器不支持Promise.assSettled，可以使用polyfill:


```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      status: 'fulfilled',
      value
    }), reason => ({
      status: 'rejected',
      reason
    }))));
  };
}
```
在这段代码中，promises.map 获取输入值，并通过 p => Promise.resolve(p) 将输入值转换为 promise（以防传递了 non-promise），然后向每一个 promise 都添加 .then 处理程序（handler）。

这个处理程序（handler）将成功的结果 value 转换为 {status:'fulfilled', value}，将 error reason 转换为 {status:'rejected', reason}。这正是 Promise.allSettled 的格式。

Promise.race只等待第一个 settled 的 promise 并获取其结果（或 error）;在现代的代码中，很少需要使用 Promise.resolve 和 Promise.reject 方法，因为 async/await 语法（我们会在 稍后 讲到）使它们变得有些过时了。

```js
Promise.resolve(value);
// 等价于
let promise = new Promise(resolve => resolve(value));
```

--- 
***Promisification***

其实就是将基于回调的老方法promise化，由于许多函数和库都是基于回调的，因此，在实际开发中经常会需要进行这种转换。

比如转换下面整个：

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// 用法：
// loadScript('path/script.js', (err, script) => {...})

let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err); 
      else resolve(script);
    })
  })
}
// 用法：
// loadScriptPromise('path/script.js').then(...)
```

当然，我们还可以更近一步抽象出来：

```js
function promisify(f) {
  return function (...args) { // 返回一个包装函数（wrapper-function）
    return new Promise((resolve, reject) => {
      function callback(err, result) { // 我们对 f 的自定义的回调
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 将我们的自定义的回调附加到 f 参数（arguments）的末尾

      f.call(this, ...args); // 调用原始的函数
    });
  };
};

// 用法：
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

上面的callback是两个参数，如果是多个参数呢？

```js
// promisify(f, true) 来获取结果数组
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // 我们自定义的 f 的回调
        if (err) {
          reject(err);
        } else {
          // 如果 manyArgs 被指定，则使用所有回调的结果 resolve
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

// 用法：
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```
有一些具有更灵活一点的 promisification 函数的模块（module），例如 es6-promisify。在 Node.js 中，有一个内建的 promisify 函数 util.promisify。

---
***微任务（Microtask）***

Promise 的处理程序（handlers）.then、.catch 和 .finally 都是异步的。

即便一个 promise 立即被 resolve，.then、.catch 和 .finally 下面 的代码也会在这些处理程序（handler）之前被执行。

```js
let promise = Promise.resolve();

promise.then(() => alert("promise done!"));

alert("code finished"); // 这个 alert 先显示
```

异步任务需要适当的管理。为此，ECMA 标准规定了一个内部队列 PromiseJobs，通常被称为“微任务队列（microtask queue）”（ES8 术语）。

如 规范 中所述：

- 队列（queue）是先进先出的：首先进入队列的任务会首先运行。
- 只有在 JavaScript 引擎中没有其它任务在运行时，才开始执行任务队列中的任务。

简单地说，当一个 promise 准备就绪时，它的 .then/catch/finally 处理程序（handler）就会被放入队列中：但是它们不会立即被执行。当 JavaScript 引擎执行完当前的代码，它会从队列中获取任务并执行它。

---
***Async/await***

```js
async function f() {
  return 1;
}
f().then(alert); // 1
```
在函数前面的 “async” 这个单词表达了一个简单的事情：即这个函数总是返回一个 promise。其他值将自动被包装在一个 resolved 的 promise 中。


也可以显式返回一个promise:
```js
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

关键字 await 让 JavaScript 引擎等待直到 promise 完成（settle）并返回结果。

```js
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // 等待，直到 promise resolve (*)

  alert(result); // "done!"
}

f();
```

```js
async function wait() {
  // 注意这里只是延时，并不是这个resolve抛出的结果决定最终的结果
  // 如果想这个结果，可以let res = await ...
  await new Promise(resolve => setTimeout(() => resolve(5), 1000));

  // 这个才是最终结果
  return 10;
}

function f() {
  // 1 秒后显示 10
  wait().then(result => alert(result));
}

f();
```

让我们强调一下：**await 字面的意思就是让 JavaScript 引擎等待直到 promise settle，然后以 promise 的结果继续执行**。这个行为不会耗费任何 CPU 资源，因为引擎可以同时处理其他任务：执行其他脚本，处理事件等。


## Document

### 浏览器环境，规格

JavaScript 语言最初是为 Web 浏览器创建的。此后，它已经发展成为一种具有多种用途和平台的语言。

平台可以是一个浏览器，一个 Web 服务器，或其他 主机（host），甚至可以是一个“智能”咖啡机，如果它能运行 JavaScript 的话。它们每个都提供了特定于平台的功能。JavaScript 规范将其称为 主机环境。

主机环境提供了自己的对象和语言核心以外的函数。Web 浏览器提供了一种控制网页的方法。Node.JS 提供了服务器端功能，等等。


有一个叫做 window 的“根”对象。它有两个角色：

- 首先，它是 JavaScript 代码的全局对象，如 全局对象 一章所述。
- 其次，它代表“浏览器窗口”，并提供了控制它的方法。

文档对象模型（Document Object Model），简称 DOM，将**所有页面内容表示为可以修改的对象**。

另外也有一份针对 CSS 规则和样式表的、单独的规范 CSS Object Model (CSSOM)，这份规范解释了如何将 CSS 表示为对象，以及如何读写这些对象。

浏览器对象模型（Browser Object Model），简称 BOM，**表示由浏览器（主机环境）提供的用于处理文档（document）之外的所有内容的其他对象**。

- navigator **对象提供了有关浏览器和操作系统的背景信息**。navigator 有许多属性，但是最广为人知的两个属性是：navigator.userAgent — 关于当前浏览器，navigator.platform — 关于平台（可以帮助区分 Windows/Linux/Mac 等）。
- location 对象允许我们读取当前 URL，并且可以将浏览器重定向到新的 URL。


**自动修正**

如果浏览器遇到格式不正确的 HTML，它会在形成 DOM 时自动更正它。

例如，顶级标签总是 <html>。即使它不存在于文档中 — 它也会出现在 DOM 中，因为浏览器会创建它。对于 <body> 也是一样。

例如，如果一个 HTML 文件中只有一个单词 “Hello”，浏览器则会把它包装到 <html> 和 <body> 中，并且会添加所需的 <head>。说白了，就是会自动帮你创建一些标签。

可以动态查看dom情况：http://software.hixie.ch/utilities/js/live-dom-viewer/#

```html
<p>Hello
<li>Mom
<li>and
<li>Dad

<!-- 表格是一个有趣的“特殊的例子”。按照 DOM 规范，它们必须具有 <tbody>，但 HTML 文本却（官方的）忽略了它。然后浏览器在创建 DOM 时，自动地创建了 <tbody>。 -->
<table id="table"><tr><td>1</td></tr></table>
```

### 遍历DOM

- <html> = document.documentElement
- <body> = document.body
- <head> = document.head

document.body 的值可能是 null，脚本无法访问在运行时不存在的元素，页面从上向下渲染，上边的肯定获取不了下方还未创建的元素：

```html
<html>

<head>
  <script>
    alert( "From HEAD: " + document.body ); // null，这里目前还没有 <body>
  </script>
</head>

<body>

  <script>
    alert( "From BODY: " + document.body ); // HTMLBodyElement，现在存在了
  </script>

</body>
</html>
```

firstChild 和 lastChild 属性是访问第一个和最后一个子元素的快捷方式。
这里还有一个特别的函数 elem.hasChildNodes() 用于检查节点是否有子节点。

```js

// <body> 的父节点是 <html>
alert( document.body.parentNode === document.documentElement ); // true

// <head> 的后一个是 <body>
alert( document.head.nextSibling ); // HTMLBodyElement

// <body> 的前一个是 <head>
alert( document.body.previousSibling ); // HTMLHeadElement
```

- children — 仅那些作为元素节点的子代的节点。
- firstElementChild，lastElementChild — 第一个和最后一个子元素。
- previousElementSibling，nextElementSibling — 兄弟元素。
- parentElement — 父元素。

```js
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null
// 因为根节点 document.documentElement（<html>）的父节点是 document。但 document 不是一个元素节点，所以 parentNode 返回了 document，但 parentElement 返回的是 null。
```

### 搜索：getElement*，querySelector*

```js
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // elem 是对带有 id="elem" 的 DOM 元素的引用
  elem.style.background = 'red';

  // id="elem-content" 内有连字符，所以它不能成为一个变量
  // ...但是我们可以通过使用方括号 window['elem-content'] 来访问它
</script>
```

如果有多个元素都带有同一个 id，那么使用它的方法的行为是不可预测的，例如 document.getElementById 可能会随机返回其中一个元素。因此，请遵守规则，保持 id 的唯一性。

只有 document.getElementById，没有 anyElem.getElementById，getElementById 方法只能被在 document 对象上调用。它会在整个文档中查找给定的 id。

CSS 选择器的伪类，例如 :hover 和 :active 也都是被支持的。例如，document.querySelectorAll(':hover') 将会返回鼠标指针现在已经结束的元素的集合（按嵌套顺序：从最外层 <html> 到嵌套最多的元素）。

elem.matches(css) 不会查找任何内容，它只会检查 elem 是否与给定的 CSS 选择器匹配。它返回 true 或 false。
```html
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // 不一定是 document.body.children，还可以是任何集合
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```

elem.closest(css) 方法会查找与 CSS 选择器匹配的最近的祖先。elem 自己也会被搜索。

```html
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null（因为 h1 不是祖先）
</script>
```

所有的 "getElementsBy*" 方法都会返回一个 实时的（live） 集合。这样的集合始终反映的是文档的当前状态，并且在文档发生更改时会“自动更新”。

```js
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  alert(divs.length); // 2
</script>
```

相反，querySelectorAll 返回的是一个 静态的 集合。就像元素的固定数组。

```html
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  alert(divs.length); // 1
</script>
```

### 节点属性 type，tag 和 content

不同的 DOM 节点可能有不同的属性，但是所有这些标签对应的 DOM 节点之间也存在共有的属性和方法，每个 DOM 节点都属于相应的内建类。

层次结构（hierarchy）的根节点是 EventTarget，Node 继承自它，其他 DOM 节点继承自 Node。

EventTarget -》 Node -》。。。

- EventTarget — 是根的“抽象（abstract）”类。该类的对象从未被创建。它作为一个基础，以便让所有 DOM 节点都支持所谓的“事件（event）”，我们会在之后学习它。
- Node — 也是一个“抽象”类，充当 DOM 节点的基础。它提供了树的核心功能：parentNode，nextSibling，childNodes 等（它们都是 getter）。Node 类的对象从未被创建。但是有一些继承自它的具体的节点类，例如：文本节点的 Text，元素节点的 Element，以及更多异域（exotic）类，例如注释节点的 Comment。
- Element — 是 DOM 元素的基本类。它提供了元素级的导航（navigation），例如 nextElementSibling，children，以及像 getElementsByTagName 和 querySelector 这样的搜索方法。浏览器中不仅有 HTML，还会有 XML 和 SVG。Element 类充当更多特定类的基本类：SVGElement，XMLElement 和 HTMLElement。
- HTMLElement — 最终是所有 HTML 元素的基本类。各种 HTML 元素均继承自它：
  - HTMLInputElement — `<input>` 元素的类，
  - HTMLBodyElement — <body> 元素的类，
  - HTMLAnchorElement — `<a>` 元素的类，
  - ……等，每个标签都有自己的类，这些类可以提供特定的属性和方法。

例如，我们考虑一下 <input> 元素的 DOM 对象。它属于 HTMLInputElement 类。
它获取属性和方法，并将其作为下列类（按继承顺序列出）的叠加：

- HTMLInputElement — 该类提供特定于输入的属性，
- HTMLElement — 它提供了通用（common）的 HTML 元素方法（以及 getter 和 setter）
- Element — 提供通用（generic）元素方法，
- Node — 提供通用 DOM 节点属性，
- EventTarget — 为事件（包括事件本身）提供支持，
- ……最后，它继承自 Object，因为像 hasOwnProperty 这样的“普通对象”方法也是可用的。

```js
alert( document.body.constructor.name ); // HTMLBodyElement
alert( document.body ); // [object HTMLBodyElement]
alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true

console.log(elem) // 显示元素的 DOM 树。
console.dir(elem) // 将元素显示为 DOM 对象，非常适合探索其属性。
```

在规范中，**DOM 类不是使用 JavaScript 来描述的，而是一种特殊的 接口描述语言（Interface description language），简写为 IDL**，它通常很容易理解。

```js
// 定义 HTMLInputElement
// 冒号 ":" 表示 HTMLInputElement 继承自 HTMLElement
interface HTMLInputElement: HTMLElement {
  // 接下来是 <input> 元素的属性和方法

  // "DOMString" 表示属性的值是字符串
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

  // 布尔值属性（true/false）
  attribute boolean autofocus;
  ...
  // 现在方法："void" 表示方法没有返回值
  void select();
  ...
}
```

nodeType 属性提供了另一种“过时的”用来获取 DOM 节点类型的方法。

### 特性和属性（Attributes and properties）

当浏览器加载页面时，它会“读取”（或者称之为：“解析”）HTML 并从中生成 DOM 对象。**对于元素节点，大多数标准的 HTML 特性（attributes）会自动变成 DOM 对象的属性（properties）**。（译注：attribute 和 property 两词意思相近，为作区分，全文将 attribute 译为“特性”，property 译为“属性”，请读者注意区分。）

例如，如果标签是 `<body id="page">`，那么 DOM 对象就会有 body.id="page"。

**但特性—属性映射并不是一一对应的**！在本章，我们将带领你一起分清楚这两个概念，了解如何使用它们，了解它们何时相同何时不同。

**一：DOM属性**，DOM 节点是常规的 JavaScript 对象，因此可以添加我们自己的属性，例如，让我们在 document.body 中创建一个新的属性：

```js
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

我们还可以修改内建属性的原型，例如修改 Element.prototype 为所有元素添加一个新方法：

```js
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

所以，**DOM 属性和方法的行为就像常规的 Javascript 对象一样**：

- 它们可以有很多值。
- 它们是大小写敏感的（要写成 elem.nodeType，而不是 elem.NoDeTyPe）。

**二、HTML 特性：**

在 HTML 中，标签可能拥有特性（attributes）。当浏览器解析 HTML 文本，并根据标签创建 DOM 对象时，浏览器会辨别 标准的 特性并以此创建 DOM 属性。

所以，当一个元素有 id 或其他 标准的 特性，那么就会生成对应的 DOM 属性。但是非 标准的 特性则不会。

```js
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
    // 非标准的特性没有获得对应的属性
    alert(document.body.something); // undefined
  </script>
</body>
```

当然作为html的特性，我们可以通过以下方式访问：

- elem.hasAttribute(name) — 检查特性是否存在。
- elem.getAttribute(name) — 获取这个特性值。
- elem.setAttribute(name, value) — 设置这个特性值。
- elem.removeAttribute(name) — 移除这个特性。
- 获取特性的name是大小写不敏感的，href 和 Href一样
  
**三、属性—特性同步：**

当一个**标准的特性被改变，对应的属性也会自动更新，（除了几个特例）反之亦然**。

```html
<input>

<script>
  let input = document.querySelector('input');

  // 特性 => 属性
  input.setAttribute('id', 'id');
  alert(input.id); // id（被更新了）

  // 属性 => 特性
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId（被更新了）
</script>
```

但这里也有些例外，例如 input.value 只能从特性同步到属性，反过来则不行：

```html
<input>

<script>
  let input = document.querySelector('input');

  // 特性 => 属性
  input.setAttribute('value', 'text');
  alert(input.value); // text

  // 这个操作无效，属性 => 特性
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text（没有被更新！）
</script>
```

这个“功能”在实际中会派上用场，因为用户行为可能会导致 value 的更改，然后在这些操作之后，如果我们想从 HTML 中恢复“原始”值，那么该值就在特性中。

**DOM 属性是多类型的：**

DOM 属性不总是字符串类型的。例如，input.checked 属性（对于 checkbox 的）是布尔型的。

```html
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // 特性值是：空字符串
  alert(input.checked); // 属性值是：true
</script>
```

还有其他的例子。style 特性是字符串类型的，但 style 属性是一个对象：

```html
<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // 字符串
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // 对象
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

尽管大多数 DOM 属性都是字符串类型的。

有一种非常少见的情况，即使一个 DOM 属性是字符串类型的，但它可能和 HTML 特性也是不同的。例如，href DOM 属性一直是一个 完整的 URL，即使该特性包含一个相对路径或者包含一个 #hash。

```html
<a id="a" href="#hello">link</a>
<script>
  // 特性
  alert(a.getAttribute('href')); // #hello

  // 属性
  alert(a.href ); // http://site.com/page#hello 形式的完整 URL
</script>
```

**非标准的特性，dataset：**

html的特性，我们可以自定义，但是自定义的特性也存在问题。如果我们出于我们的目的使用了非标准的特性，之后它被引入到了标准中并有了其自己的用途，该怎么办？HTML 语言是在不断发展的，并且更多的特性出现在了标准中，以满足开发者的需求。在这种情况下，自定义的属性可能会产生意料不到的影响。

为了避免冲突，存在 data-* 特性。

所有以 **“data-” 开头的特性均被保留供程序员使用。它们可在 dataset 属性中使用**。

```html
<!-- 像 data-order-state 这样的多词特性可以以驼峰式进行调用：dataset.orderState。 -->
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  A new order.
</div>

<script>
  // 读取
  alert(order.dataset.orderState); // new

  // 修改
  order.dataset.orderState = "pending"; // (*)
</script>
```

在大多数情况下，**最好使用 DOM 属性。仅当 DOM 属性无法满足开发需求，并且我们真的需要特性时，才使用特性**，例如：

我们需要一个非标准的特性。但是如果它以 data- 开头，那么我们应该使用 dataset。
我们想要读取 HTML 中“所写的”值。对应的 DOM 属性可能不同，例如 href 属性一直是一个 完整的 URL，但是我们想要的是“原始的”值。

### 修改文档（document）

- node.append(...nodes or strings) —— 在 node 末尾 插入节点或字符串，
- node.prepend(...nodes or strings) —— 在 node 开头 插入节点或字符串，
- node.before(...nodes or strings) —— 在 node 前面 插入节点或字符串，
- node.after(...nodes or strings) —— 在 node 后面 插入节点或字符串，
- node.replaceWith(...nodes or strings) —— 将 node 替换为给定的节点或字符串。

```html
<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
```

请注意：这里的文字都被“作为文本”插入，而不是“作为 HTML 代码”。因此像 <、> 这样的符号都会被作转义处理来保证正确显示。

```html
&lt;p&gt;Hello&lt;/p&gt;
<hr>
<div id="div"></div>
```

换句话说，字符串被以一种安全的方式插入到页面中，就像 elem.textContent 所做的一样。

所以，这些方法只能用来插入 DOM 节点或文本片段。

但如果我们想要将内容“作为 HTML 代码插入”，让内容中的所有标签和其他东西都像使用 elem.innerHTML 所表现的效果一样，那应该怎么办呢？

insertAdjacentHTML/Text/Element：

为此，我们可以使用另一个非常通用的方法：elem.insertAdjacentHTML(where, html)。

该方法的第一个参数是代码字（code word），指定相对于 elem 的插入位置。必须为以下之一：

- "beforebegin" — 将 html 插入到 elem 前插入，
- "afterbegin" — 将 html 插入到 elem 开头，
- "beforeend" — 将 html 插入到 elem 末尾，
- "afterend" — 将 html 插入到 elem 后。

DocumentFragment 是一个特殊的 DOM 节点，用作来传递节点列表的包装器（wrapper）

老式的 insert/remove 方法：

- parentElem.appendChild(node)
- parentElem.insertBefore(node, nextSibling)
- parentElem.replaceChild(node, oldChild)
- parentElem.removeChild(node)

这些方法都是些古老的方法。。。

document.write：这个方法来自于没有 DOM，没有标准的上古时期……

创建新节点的方法：

- document.createElement(tag) — 用给定的标签创建一个元素节点，
- document.createTextNode(value) — 创建一个文本节点（很少使用），
- elem.cloneNode(deep) — 克隆元素，如果 deep==true 则与其后代一起克隆。
  

插入和移除节点的方法：

- node.append(...nodes or strings) — 在 node 末尾插入，
- node.prepend(...nodes or strings) — 在 node 开头插入，
- node.before(...nodes or strings) — 在 node 之前插入，
- node.after(...nodes or strings) — 在 node 之后插入，
- node.replaceWith(...nodes or strings) — 替换 node。
- node.remove() — 移除 node。
文本字符串被“作为文本”插入。

这里还有“旧式”的方法：

- parent.appendChild(node)
- parent.insertBefore(node, nextSibling)
- parent.removeChild(node)
- parent.replaceChild(newElem, node)
这些方法都返回 node。

在 html 中给定一些 HTML，elem.insertAdjacentHTML(where, html) 会根据 where 的值来插入它：

- "beforebegin" — 将 html 插入到 elem 前面，
- "afterbegin" — 将 html 插入到 elem 的开头，
- "beforeend" — 将 html 插入到 elem 的末尾，
- "afterend" — 将 html 插入到 elem 后面。
另外，还有类似的方法，elem.insertAdjacentText 和 elem.insertAdjacentElement，它们会插入文本字符串和元素，但很少使用。

要在页面加载完成之前将 HTML 附加到页面：

document.write(html)
页面加载完成后，这样的调用将会擦除文档。多见于旧脚本。

```html
<!-- 编写一个接口，根据用户输入创建一个列表（list）。 -->
<!-- 如果用户输入了 HTML 标签，那么这些内容应该被视为文本进行后续处理。 -->
<script>
  let ul = document.createElement('ul');
  document.body.append(ul);

  while (true) {
    let data = prompt("Enter the text for the list item", "");

    if (!data) {
      break;
    }

    let li = document.createElement('li');
    li.textContent = data;
    ul.append(li);
  }
</script>
```

根据输入的对象生成树状结构：

```html
<div id="container"></div>
<script>
  let data = {
    "Fish": {
      "trout": {},
      "salmon": {}
    },

    "Tree": {
      "Huge": {
        "sequoia": {},
        "oak": {}
      },
      "Flowering": {
        "apple tree": {},
        "magnolia": {}
      }
    }
  };

  // 利用字符串方式创建dom
  // 字符创方式，就不要涉及创建元素的方法
  function createTreeText(obj) {
    let li = '';
    let ul;
    for (let key in obj) {
      li += `<li>${key}${createTreeText(obj[key])}</li>`
    }
    li && (ul = `<ul>${li}</ul>`);
    return ul || ''
  }

  // 利用dom方式创建元素
  // 如果是dom的话，就要考虑每个标签都是元素
  function createTreeDom(obj) {
    if (!Object.keys(obj).length) return;

    let ul = document.createElement('ul');

    for (let key in obj) {
      let li = document.createElement('li')
      li.innerHTML = key;

      let childrenUl = createTreeDom(obj[key]);
      if (childrenUl) {
        li.append(childrenUl)
      }
      ul.append(li)
    }
    return ul;
  }

  function createTree(container, obj) {
    // container.innerHTML = createTreeText(obj);
    container.append(createTreeDom(obj));
  }
  createTree(container, data);
</script>
```

```js
// 编写代码，将后代元素个数显示在父元素上，没有后代元素的不显示
// Animals [9]
//   Mammals [4]
//     Cows
//     Donkeys
//     Dogs
//     Tigers

function showSonsNum(container) {
  // 伪数组可以直接迭代，虽然没有数组的方法
  let lis = document.getElementsByTagName('li');

  for (let li of lis) {
    // 获取所有子元素都是li的长度
    let nums = li.getElementsByTagName('li').length;
    if (!nums) return;

    // 直接就可以拼接到现有的结构上
    li.firstChild.data += nums
  }
}
```



```html
<!DOCTYPE HTML>
<html>

<head>
  <style>
    table {
      border-collapse: collapse;
    }

    td,
    th {
      border: 1px solid black;
      padding: 3px;
      text-align: center;
    }

    th {
      font-weight: bold;
      background-color: #E6E6E6;
    }
  </style>
</head>

<body>


  <div id="calendar"></div>

  <script>
    // 1、使用 <th> 创建带有星期名的表头。
    // 2、创建日期对象 d = new Date(year, month-1)。它是 month 的第一天（考虑到 JavaScript 中的月份从 0 开始，而不是从 1 开始）。
    // 3、直到月份的第一天 d.getDay()，前面的几个单元格是空的。让我们用 <td></td> 填充它们。
    // 4、天数增长 d：d.setDate(d.getDate()+1)。如果 d.getMonth() 还没到下一个月，那么就将新的单元格 <td> 添加到日历中。如果那天是星期日，就添加一个新行 “</tr><tr>”。
    // 5、如果该月结束，但表格的行尚未填满，就用空的 <td> 补齐。
    function createCalendar(elem, year, month) {

      let mon = month - 1; // months in JS are 0..11, not 1..12
      let d = new Date(year, mon);

      let table = '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';

      // spaces for the first row
      // from Monday till the first day of the month
      // * * * 1  2  3  4
      for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
      }

      // <td> with actual dates
      while (d.getMonth() == mon) {
        table += '<td>' + d.getDate() + '</td>';

        if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
          table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
      }

      // add spaces after last days of month for the last row
      // 29 30 31 * * * *
      if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
          table += '<td></td>';
        }
      }

      // close the table
      table += '</tr></table>';

      elem.innerHTML = table;
    }

    function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
      let day = date.getDay();
      if (day == 0) day = 7; // make Sunday (0) the last day
      return day - 1;
    }

    createCalendar(calendar, 2020, 10);
  </script>

</body>
</html>
```

给表格根据某一列排序:


- 从 <tbody> 获取所有 <tr>。
- 然后将它们按第一个 <td>（name 字段）中的内容进行比较。
- 然后使用 .append(...sortedRows) 按正确的顺序插入节点。

**我们不必删除行元素，只需要“重新插入”，它们就会自动离开原来的位置。**

P.S. 在我们的例子中，表格中有一个明确的 <tbody>，但即使 HTML 中的表格没有 <tbody>，DOM 结构也总是具有它。
```html
<table>
<thead>
  <tr>
    <th>Name</th><th>Surname</th><th>Age</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>John</td><td>Smith</td><td>10</td>
  </tr>
  <tr>
    <td>Pete</td><td>Brown</td><td>15</td>
  </tr>
  <tr>
    <td>Ann</td><td>Lee</td><td>5</td>
  </tr>
  <tr>
    <td>...</td><td>...</td><td>...</td>
  </tr>
</tbody>
</table>

<!-- 原生绑定事件，务必加() -->
<button onclick="start()">start</button>

<script>
  function start() {
    console.log('table', table);
    let sortRows = Array.from(table.tBodies[0].rows).sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML))
    // 但是如果增加其他内容，则是叠加
    table.tBodies[0].append(...sortRows)
  }
</script>
```

### 样式和类

通常有两种设置元素样式的方式：

- 在 CSS 中创建一个类，并添加它：<div class="...">
- 将属性直接写入 style：<div style="...">。

在很旧以前，JavaScript 中有一个限制：像 "class" 这样的保留字不能用作对象的属性。这一限制现在已经不存在了，但当时就不能存在像 elem.class 这样的 "class" 属性。

```html
<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
```

如果我们对 elem.className 进行赋值，它将替换类中的整个字符串。这里还有另一个属性：elem.classList。它具有 add/remove/toggle 单个类的方法。

- elem.classList.add/remove(class) — 添加/移除类。
- elem.classList.toggle(class) — 如果类不存在就添加类，存在就移除它。
- elem.classList.contains(class) — 检查给定类，返回 true/false。

**元素样式：**

对于多词（multi-word）属性，使用驼峰式 camelCase：

```js
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth

// 前缀属性，对于有前缀的还可以这样
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```


**重置样式属性：**

用 style.cssText 进行完全的重写通常，我们使用 style.* 来对各个样式属性进行赋值。我们不能像这样的 div.style="color: red; width: 100px" 设置完整的属性，**因为 div.style 是一个对象，并且它是只读的**。

```html
<div id="div">Button</div>

<script>
  // 我们可以在这里设置特殊的样式标记，例如 "important"
  // 我们很少使用这个属性，因为这样的赋值会删除所有现有样式：它不是进行添加，而是替换它们。
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
  // 可以通过设置一个特性（attribute）来实现同样的效果：
  // 也是整个覆盖
  div.setAttribute('style', 'color: red...')
</script>
```

**计算样式：getComputedStyle**


style 属性仅对 "style" 特性（attribute）值起作用，而没有任何 CSS 级联（cascade）。其实就是无法使用elem.style读取来自css类的任何内容。

```html
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
    alert(document.body.style.color); // 空的
    alert(document.body.style.marginTop); // 空的
  </script>
</body>
```

如果想读取这些样式值，我们可以使用：getComputedStyle

- getComputedStyle(element, [pseudo])
- 参数二pseudo表示伪元素（如果需要），例如 ::before。空字符串或无参数则意味着元素本身。

```html
<style>
    h3 {
      color: red;
    }
    h3::after {
        content: "rocks!";
    }
</style>

<h3>generated content</h3> 

<script>
    let h3 = document.querySelector('h3');
    console.log(h3.style.color); // 空
    // 下面设计一个转换过程
    console.log(getComputedStyle(h3).color); // rgb(255, 0, 0)
    result = getComputedStyle(h3, '::after').content;
    console.log(`the generated content is: ${result}`); 
</script>
```

在 CSS 中有两个概念：

- 计算 (computed) 样式值是所有 CSS 规则和 CSS 继承都应用后的值，这是 CSS 级联（cascade）的结果。它看起来像 height:1em 或 font-size:125%。
- 解析 (resolved) 样式值是最终应用于元素的样式值值。诸如 1em 或 125% 这样的值是相对的。浏览器将使用计算（computed）值，并使所有单位均为固定的，且为绝对单位，例如：height:20px 或 font-size:16px。对于几何属性，解析（resolved）值可能具有浮点，例如：width:50.5px。

很久以前，创建了 getComputedStyle 来获取计算（computed）值，但事实证明，解析（resolved）值要方便得多，标准也因此发生了变化。

所以，**现在 getComputedStyle 实际上返回的是属性的解析值（resolved），其实就是绝对尺寸，而且标准**。

可以使用 CSS 伪类 :visited 对被访问过的链接进行着色。

但 getComputedStyle 没有给出访问该颜色的方式，因为否则，任意页面都可以通过在页面上创建它，并通过检查样式来确定用户是否访问了某链接。

JavaScript 看不到 :visited 所应用的样式。此外，CSS 中也有一个限制，即禁止在 :visited 中应用更改几何形状的样式。这是为了确保一个不好的页面无法测试链接是否被访问，进而窥探隐私。

**元素大小和滚动：**

![浏览器的各种宽度和高度](/jsArt/assets/images/css/cssWidth.png)

offsetParent 是最接近的祖先（ancestor），在浏览器渲染期间，它被用于计算坐标。属性 offsetLeft/offsetTop 提供相对于 offsetParent 左上角的 x/y 坐标。

```html
<main style="position: relative" id="main">
  <article>
    <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
  </article>
</main>
<script>
  alert(example.offsetParent.id); // main
  alert(example.offsetLeft); // 180（注意：这是一个数字，不是字符串 "180px"）
  alert(example.offsetTop); // 180
</script>
```

有以下几种情况下，offsetParent 的值为 null：

- 对于未显示的元素（display:none 或者不在文档中）。
- 对于 <body> 与 <html>。
- 对于带有 position:fixed 的元素。

**clientTop/Left：**

但准确地说 — 这些属性不是边框的 width/height，而是内侧与外侧的相对坐标。也就是说，假如滚动条在左侧的话，clientLeft的宽度会包含滚动条的宽度。

**clientWidth/height：**

它们包括了 “content width” 和 “padding”，但不包括滚动条宽度（scrollbar）：

**scrollLeft/scrollTop：**

大多数几何属性是只读的，但是 scrollLeft/scrollTop 是可修改的，并且浏览器会滚动该元素。

元素具有以下几何属性：

- offsetParent — 是最接近的 CSS 定位的祖先，或者是 td，th，table，body。
- offsetLeft/offsetTop — 是相对于 offsetParent 的左上角边缘的坐标。
- offsetWidth/offsetHeight — 元素的“外部” width/height，边框（border）尺寸计算在内。
- clientLeft/clientTop — 从元素左上角外角到左上角内角的距离。对于从左到右显示内容的操作系统来说，它们始终是左侧/顶部 border 的宽度。而对于从右到左显示内容的操作系统来说，垂直滚动条在左边，所以 clientLeft 也包括滚动条的宽度。
- clientWidth/clientHeight — 内容的 width/height，包括 padding，但不包括滚动条（scrollbar）。
- scrollWidth/scrollHeight — 内容的 width/height，就像 clientWidth/clientHeight 一样，但还包括元素的滚动出的不可见的部分。
- scrollLeft/scrollTop — 从元素的左上角开始，滚动出元素的上半部分的 width/height。

除了 scrollLeft/scrollTop 外，所有属性都是只读的。如果我们修改 scrollLeft/scrollTop，浏览器会滚动对应的元素。

getComputedStyle(elem).width 与 elem.clientWidth 之间有什么不同点？

- clientWidth 值是数值，而 getComputedStyle(elem).width 返回一个以 px 作为后缀的字符串。
- getComputedStyle 可能会返回非数值的 width，例如内联（inline）元素的 "auto"。
- clientWidth 是元素的内部内容区域加上 padding，而 CSS width（具有标准的 box-sizing）是内部内容区域，不包括 padding。
- 如果有滚动条，并且浏览器为其保留了空间，那么某些浏览器会从 CSS width 中减去该空间（因为它不再可用于内容），而有些则不会这样做。clientWidth 属性总是相同的：如果为滚动条保留了空间，那么将减去滚动条的大小。

```js
// elem.scrollTop 属性是从顶部滚动出来的部分的大小。如何获得底部滚动的大小（我们称其为 scrollBottom）？
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;

// 获取滚动条的宽度？
// 对于 Windows，它通常在 12px 和 20px 之间变化。如果浏览器没有为其保留任何空间（滚动条以半透明的形式处于文本上面，也是可能发生的），那么它可能是 0px。
let scrollWidth = div.offsetWidth - div.clientWidth;
```

### Window大小和滚动

为了获取窗口（window）的宽度和高度，我们可以使用 document.documentElement 的 clientWidth/clientHeight。

浏览器也支持 window.innerWidth/innerHeight 属性。它们看起来像我们想要的。那为什么不使用它们呢？

如果这里存在一个滚动条，并且滚动条占用了一些空间，那么 clientWidth/clientHeight 会提供没有滚动条（减去它）的 width/height。换句话说，它们返回的是可用于内容的文档的可见部分的 width/height。

……而 window.innerWidth/innerHeight 包括了滚动条。

**文档的widht和height：**

在 Chrome/Safari/Opera 中，如果没有滚动条，documentElement.scrollHeight 甚至可能小于 documentElement.clientHeight！听起来像胡话，很奇怪，对吧？

为了可靠地获得完整的文档高度，我们应该采用以下这些属性的最大值：

```js
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
// 为什么这样？最好不要问。这些不一致来源于远古时代，而不是“聪明”的逻辑。
```

获得当前滚动
DOM 元素的当前滚动状态在 elem.scrollLeft/scrollTop 中。

对于文档滚动，在大多数浏览器中，我们可以使用 document.documentElement.scrollLeft/Top，但在较旧的基于 WebKit 的浏览器中则不行，例如在 Safari（bug 5991）中，我们应该使用 document.body 而不是 document.documentElement。

幸运的是，我们根本不必记住这些特性，因为滚动在 window.pageXOffset/pageYOffset 中可用：

```js
alert('Current scroll from the top: ' + window.pageYOffset);
alert('Current scroll from the left: ' + window.pageXOffset);
```

滚动：scrollTo，scrollBy，scrollIntoView

对 elem.scrollIntoView(top) 的调用将滚动页面以使 elem 可见。它有一个参数：

- 如果 top=true（默认值），页面滚动，使 elem 出现在窗口顶部。元素的上边缘与窗口顶部对齐。
- 如果 top=false，页面滚动，使 elem 出现在窗口底部。元素的底部边缘与窗口底部对齐。

禁止滚动：要使文档不可滚动，只需要设置 document.body.style.overflow = "hidden"。该页面将冻结在其当前滚动上。

### 元素坐标

大多数 JavaScript 方法处理的是以下两种坐标系中的一个：

- 相对于窗口 — 类似于 position:fixed，从窗口的顶部/左侧边缘计算得出。
    我们将这些坐标表示为 clientX/clientY，当我们研究事件属性时，就会明白为什么使用这种名称来表示坐标。
- 相对于文档  — 与文档根（document root）中的 position:absolute 类似，从文档的顶部/左侧边缘计算得出。
    我们将它们表示为 pageX/pageY。

当文档滚动了：

- pageY — 元素在文档中的相对坐标保持不变，从文档顶部（现在已滚动出去）开始计算。
- clientY — 窗口相对坐标确实发生了变化（箭头变短了），因为同一个点越来越靠近窗口顶部。

**elementFromPoint(x, y)：**

对 document.elementFromPoint(x, y) 的调用会返回在窗口坐标 (x, y) 处嵌套最多（the most nested）的元素。其实就是给定一个位置，然后返回覆盖整个位置最多的元素。


**元素坐标：getBoundingClientRect**

方法 elem.getBoundingClientRect() 返回最小矩形的窗口坐标，该矩形将 elem 作为内建 DOMRect 类的对象。

主要的 DOMRect 属性：

- x/y — 矩形原点相对于窗口的 X/Y 坐标，
- width/height — 矩形的 width/height（可以为负）。
此外，还有派生（derived）属性：

- top/bottom — 顶部/底部矩形边缘的 Y 坐标，
- left/right — 左/右矩形边缘的 X 坐标。

为了显示元素附近的东西，我们可以使用 getBoundingClientRect 来获取其坐标，然后使用 CSS position 以及 left/top（或 right/bottom）。

页面上的任何点都有坐标：

- 相对于窗口的坐标 — elem.getBoundingClientRect()。
- 相对于文档的坐标 — elem.getBoundingClientRect() 加上当前页面滚动。
窗口坐标非常适合和 position:fixed 一起使用，文档坐标非常适合和 position:absolute 一起使用。

## 事件

### 浏览器事件简介

**事件**是某事发生的信号。**所有的 DOM 节点都生成这样的信号**（但事件不仅限于 DOM）。

鼠标事件：

- click —— 当鼠标点击一个元素时（触摸屏设备会在点击时生成）。
- contextmenu —— 当鼠标右键点击一个元素时。
- mouseover / mouseout —— 当鼠标指针移入/离开一个元素时。
- mousedown / mouseup —— 当在元素上按下/释放鼠标按钮时。
- mousemove —— 当鼠标移动时。

键盘事件：

- keydown 和 keyup —— 当按下和松开一个按键时。

表单（form）元素事件：

- submit —— 当访问者提交了一个 <form> 时。
- focus —— 当访问者聚焦于一个元素时，例如聚焦于一个 <input>。

Document 事件：

- DOMContentLoaded —— 当 HTML 的加载和处理均完成，DOM 被完全构建完成时。

CSS 事件：

transitionend —— 当一个 CSS 动画完成时。

事件处理程器：为了对事件作出响应，我们可以分配一个 处理程序（handler）—— 一个在事件发生时运行的函数。

有几种分配处理程序的方法：

- HTML 特性，处理程序可以设置在 HTML 中名为 on<event> 的特性（attribute）中。
- DOM 属性，我们可以使用 DOM 属性（property）on<event> 来分配处理程序。

```html
<input type="button" onclick="clickOne('click')" value="Button">
<input type="button" id="button" value="Button">

<!-- 处理函数中的this是对应的元素 -->
<button onclick="alert(this.innerHTML)">Click me</button>
<script>
  function clickOne(type) {
    console.log(type)
  }
  button.onclick = function() {
    alert('Click!');
  };
  // 移除一个处理程序：elem.onclick = null;

</script>
```

注意：
- HTML 特性名是大小写不敏感的，所以 ONCLICK 和 onClick 以及 onCLICK 都一样可以运行。但是特性通常是小写的：onclick。

在html特性里，务必要添加括号，因为当浏览器读取 HTML 特性（attribute）时，浏览器将会使用 特性中的内容 创建一个处理程序：

```js
button.onclick = function() {
  doSomething(); // <-- 特性（attribute）中的内容变到了这里
};
```

不要对处理程序使用 setAttribute。
```js
// 点击 <body> 将产生 error，
// 因为特性总是字符串的，函数变成了一个字符串
document.body.setAttribute('onclick', function() { alert(1) });
```

上述分配处理程序的方式的根本问题是 —— 我们**不能为一个事件分配多个处理程序**。

因此Web 标准的开发者很早就了解到了这一点，并提出了一种使用特殊方法 addEventListener 和 removeEventListener 来管理处理程序的替代方法。

```js
// 添加处理程序的语法：
element.addEventListener(event, handler[, options]);
// event：事件名
// handler：处理程序
// options：具有以下属性的可选对象
// 1、once：如果为 true，那么会在被触发后自动删除监听器。
// 2、capture：事件处理的阶段，我们稍后将在 冒泡和捕获 一章中介绍。由于历史原因，options 也可以是 false/true，它与 {capture: false/true} 相同。
// 3、passive：如果为 true，那么处理程序将不会调用 preventDefault()，

// 要移除处理程序，我们需要传入与分配的函数完全相同的函数。下面的不起作用
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

我们可以 同时 使用 DOM 属性和 addEventListener 来设置处理程序。但有些事件无法通过 DOM 属性进行分配。只能使用 addEventListener

如：DOMContentLoaded 事件，该事件在文档加载完成并且 DOM 构建完成时触发。

```js
// 永远不会运行
document.onDOMContentLoaded = function() {
  alert("DOM built");
};

// 这种方式可以运行
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built");
});
```


事件对象：
为了正确处理事件，我们需要更深入地了解发生了什么。不仅仅是 “click” 或 “keydown”，还包括鼠标指针的坐标是什么？按下了哪个键？等等。

当事件发生时，浏览器会创建一个 event 对象，将详细信息放入其中，并将其作为参数传递给处理程序。

```js
<button onclick="clickThis(this)">Click me</button>
<button onclick="clickEvent(event)">Click me</button>

<script>
function clickThis(_this) {
  console.log(_this.innerHTML, 'this')
}
function clickEvent(e) {
  console.log(e, 'e')
}
</script>
```
- event.type：事件类型，这里是 "click"。
- event.currentTarget：处理事件的元素。这与 this 相同，除非处理程序是一个箭头函数，或者它的 this 被绑定到了其他东西上，之后我们就可以从 event.currentTarget 获取元素了。
- event.clientX / event.clientY：指针事件（pointer event）的指针的窗口相对坐标。
- ...其他

我们不仅可以分配函数，还可以使用 addEventListener 将一个对象分配为事件处理程序。当事件发生时，就会调用该对象的 handleEvent 方法。

```js
<button id="elem">Click me</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

创建元素，点击时隐藏自己：
```html
<input type="button" onclick="this.hidden=true" value="Click to hide">
```

### 冒泡和捕获

当一个事件发生在一个元素上，它会首先运行在该元素上的处理程序，然后运行其父元素上的处理程序，然后一直向上到其他祖先上的处理程序。
```js
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```
几乎 所有事件都会冒泡。但也有例外，例如，focus 事件不会冒泡。同样，我们以后还会遇到其他例子。

**event.target：**

父元素上的处理程序始终可以获取事件实际发生位置的详细信息。

引发事件的那个嵌套层级最深的元素被称为目标元素,可以通过 event.target 访问。

注意与 this（=event.currentTarget）之间的区别：

- event.target —— 是引发事件的“目标”元素，它在冒泡过程中不会发生变化。
- this —— 是“当前”元素，其实就是当前正在运行的处理程序绑定的元素。

每个处理程序都可以访问 event 对象的属性：

- event.target —— 引发事件的层级最深的元素。
- event.currentTarget（=this）—— 处理事件的当前元素（具有处理程序的元素）
- event.eventPhase —— 当前阶段（capturing=1，target=2，bubbling=3）

**停止冒泡：**

冒泡事件从目标元素开始向上冒泡。通常，**它会一直上升到 <html>，然后再到 document 对象，有些事件甚至会到达 window，它们会调用路径上所有的处理程序**。

但是任意处理程序都可以决定事件已经被完全处理，并停止冒泡。用于停止冒泡的方法是 event.stopPropagation()。

例如，如果你点击 `<button>`，这里的 body.onclick 不会工作：

```js
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Click me</button>
</body>
```

如果一个元素在一个事件上有多个处理程序，即使其中一个停止冒泡，其他处理程序仍会执行。
换句话说，event.stopPropagation() 停止向上移动，但是当前元素上的其他处理程序都会继续运行。
有一个 **event.stopImmediatePropagation()** 方法，可以用于停止冒泡，并阻止当前元素上的处理程序运行。使用该方法之后，其他处理程序就不会被执行。

**捕获阶段：**

DOM 事件标准描述了事件传播的 3 个阶段：
- 捕获阶段（Capturing phase）—— 事件（从 Window）向下走近元素。
- 目标阶段（Target phase）—— 事件到达目标元素。
- 冒泡阶段（Bubbling phase）—— 事件从元素上开始冒泡。

```js
elem.addEventListener(..., {capture: true})
// 或者，用 {capture: true} 的别名 "true"
elem.addEventListener(..., true)
```

请注意，虽然形式上有 3 个阶段，但第 2 阶段（“目标阶段”：事件到达元素）没有被单独处理：捕获阶段和冒泡阶段的处理程序都在该阶段被触发。

```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```
上面这段代码为文档中的 每个 元素都设置了点击处理程序，以查看哪些元素上的点击事件处理程序生效了。

如果你点击了 <p>，那么顺序是：

1. HTML → BODY → FORM → DIV（捕获阶段第一个监听器）：
2. P（目标阶段，触发两次，因为我们设置了两个监听器：捕获和冒泡）
3. DIV → FORM → BODY → HTML（冒泡阶段，第二个监听器）。

### 事件代理

```js
// 单击表格中任意一个td会触发事件，但如果event.target不是td，就会有问题
// 但是可以借助closest，从而返回 匹配的最近的祖先
table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
```

例如，我们想要编写一个有“保存”、“加载”和“搜索”等按钮的菜单。并且，这里有一个具有 save、load 和 search 等方法的对象。如何匹配它们？
```js
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('saving');
    }

    load() {
      alert('loading');
    }

    search() {
      alert('searching');
    }

    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    };
  }

  new Menu(menu);
</script>
```

事件代理优势：
- 简化初始化并节省内存：无需添加许多处理程序。
- 更少的代码：添加或移除元素时，无需添加/移除处理程序。
- DOM 修改 ：我们可以使用 innerHTML 等，来批量添加/移除元素。

事件代理局限性：
- 首先，事件必须冒泡。而有些事件不会冒泡。此外，低级别的处理程序不应该使用 event.stopPropagation()。
- 其次，委托可能会增加 CPU 负载，因为容器级别的处理程序会对容器中任意位置的事件做出反应，而不管我们是否对该事件感兴趣。但是，通常负载可以忽略不计，所以我们不考虑它。


编写工具提示（tooltip）行为的 JavaScript 代码。
当鼠标在带有 data-tooltip 的元素的上方时，工具提示应显示在其上方，当鼠标移开时，工具提示将隐藏起来。
- 元素和工具提示之间的距离应为 5px。
- 如果可能，工具提示应相对于元素居中。
- 工具提示不应与窗口边缘交叉。通常，它应该在元素的上方，但是如果元素位于页面顶部，并且没有工具提示的空间，则应该在元素的下方。
- 工具提示的内容在 data-tooltip 属性中给定。它可以是任意 HTML。
```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
  <style>
    body {
      height: 2000px;
      /* make body scrollable, the tooltip should work after the scroll */
    }

    .tooltip {
      position: fixed;
      padding: 10px 20px;
      border: 1px solid #b3c9ce;
      border-radius: 4px;
      text-align: center;
      font: italic 14px/1.3 sans-serif;
      color: #333;
      background: #fff;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
    }
  </style>
</head>

<body>

  <p>LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa</p>
  <p>LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa LaLaLa</p>

  <button data-tooltip="the tooltip is longer than the element">Short button</button>
  <button data-tooltip="HTML<br>tooltip">One more button</button>

  <p>Scroll the page to make buttons appear on the top, check if the tooltips show up correctly.</p>


  <script>
    let tooltipElem;

    document.onmouseover = function(event) {
      let target = event.target;

      // if we have tooltip HTML...
      let tooltipHtml = target.dataset.tooltip;
      if (!tooltipHtml) return;

      // ...create the tooltip element

      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = tooltipHtml;
      document.body.append(tooltipElem);

      // position it above the annotated element (top-center)
      let coords = target.getBoundingClientRect();

      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0; // don't cross the left window edge

      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) { // if crossing the top window edge, show below instead
        top = coords.top + target.offsetHeight + 5;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    };

    document.onmouseout = function(e) {

      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }

    };
  </script>

</body>
</html>
```

### 浏览器默认行为

许多事件会自动触发浏览器执行某些行为。

例如：

- 点击一个链接 —— 触发导航（navigation）到该 URL。
- 点击表单的提交按钮 —— 触发提交到服务器的行为。
- 在文本上按下鼠标按钮并移动 —— 选中文本。

如果我们**使用 JavaScript 处理一个事件，那么我们通常不希望发生相应的浏览器行为。而是想要实现其他行为进行替代**。

**阻止浏览器行为：**

有两种方式来告诉浏览器我们不希望它执行默认行为：

- 主流的方式是使用 event 对象。有一个 event.preventDefault() 方法。
- 如果处理程序是使用 on<event>（而不是 addEventListener）分配的，那返回 false 也同样有效。
```html
<a href="/" onclick="return false">Click here</a>
or
<a href="/" onclick="event.preventDefault()">here</a>
```

某些事件会相互转化。如果我们阻止了第一个事件，那就没有第二个事件了。

例如，在 `<input> `字段上的 mousedown 会导致在其中获得焦点，以及 focus 事件。如果我们阻止 mousedown 事件，在这就没有焦点了。

尝试点击下面的第一个 `<input>` —— 会发生 focus 事件。但是如果你点击第二个，则没有聚焦。

```js
<input value="Focus works" onfocus="this.value=''">
<input onmousedown="return false" onfocus="this.value=''" value="Click me">
```
这是因为浏览器行为在 mousedown 上被取消。**如果我们用另一种方式进行输入，则仍然可以进行聚焦。例如，可以使用 Tab 键从第一个输入切换到第二个输入。但鼠标点击则不行**。

**处理程序选项 “passive”：**

addEventListener 的可选项 passive: true 向浏览器发出信号，表明处理程序将不会调用 preventDefault()。

为什么需要这样做？

移动设备上会发生一些事件，例如 touchmove（当用户在屏幕上移动手指时），默认情况下会导致滚动，但是可以使用处理程序的 preventDefault() 来阻止滚动。

因此，当浏览器检测到此类事件时，它必须首先处理所有处理程序，然后如果没有任何地方调用 preventDefault，则页面可以继续滚动。**但这可能会导致 UI 中不必要的延迟**和“抖动”。

passive: true 选项告诉浏览器，处理程序不会取消滚动。然后浏览器立即滚动页面以提供最大程度的流畅体验，并通过某种方式处理事件。

对于某些浏览器（Firefox，Chrome），默认情况下，touchstart 和 touchmove 事件的 passive 为 true。

**event.defaultPrevented：**

如果默认行为被阻止，那么 event.defaultPrevented 属性为 true，否则为 false。

默认情况下，浏览器在 contextmenu 事件（单击鼠标右键）时，显示带有标准选项的上下文菜单。我们可以阻止它并显示我们自定义的菜单，就像这样：
```html
<button>Right-click shows browser context menu</button>

<button oncontextmenu="alert('Draw our menu'); return false">
  Right-click shows our context menu
</button>
```

```html
<p>Right-click for the document menu (added a check for event.defaultPrevented)</p>
<button id="elem">Right-click for the button menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    // event.stopPropagation(); // 阻止事件冒泡的成本太大
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    // 这里只需根据是否已经阻止默认行为来判断就好
    if (event.defaultPrevented) return;

    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

有很多默认的浏览器行为：

- mousedown —— 开始选择（移动鼠标进行选择）。
- 在 <input type="checkbox"> 上的 click —— 选中/取消选中的 input。
- submit —— 点击 <input type="submit"> 或者在表单字段中按下 Enter 键会触发该事件，之后浏览器将提交表单。
- keydown —— 按下一个按键会导致将字符添加到字段，或者触发其他行为。
- contextmenu —— 事件发生在鼠标右键单击时，触发的行为是显示浏览器上下文菜单。
- ……还有更多……

如果我们只想通过 JavaScript 来处理事件，那么所有默认行为都是可以被阻止的。

想要阻止默认行为 —— 可以使用 event.preventDefault() 或 return false。**第二个方法只适用于通过 on<event> 分配的处理程序**。

addEventListener 的 passive: true 选项告诉浏览器该行为不会被阻止。这对于某些移动端的事件（像 touchstart 和 touchmove）很有用，**用以告诉浏览器在滚动之前不应等待所有处理程序完成**。

如果默认行为被阻止，event.defaultPrevented 的值会变成 true，否则为 false。

为什么下面这段代码中的 return false 不起作用？
```html
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">the browser will go to w3.org</a>
```

当浏览器读取诸如 onclick 之类的 on* 特性（attribute）时，浏览器会根据其内容创建对应的处理程序。

对于 onclick="handler()" 来说，函数是：

```js
function(event) {
  handler() // onclick 的内容
}
// 现在我们可以看到 handler() 的返回值并没有被使用，也没有对结果产生影响。
```

因此可以这样修复：

```html
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="return handler()">w3.org</a>

<!-- 或者下面 -->
<script>
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
</script>

<a href="https://w3.org" onclick="handler(event)">w3.org</a>
```

### 创建自定义事件

```js
// 我们可以像这样创建 Event 对象：
let event = new Event(type[, options]);
```
- type —— 事件类型，可以是像这样 "click" 的字符串，或者我们自己的像这样 "my-event" 的参数。

- options —— 具有两个可选属性的对象：

  - bubbles: true/false —— 如果为 true，那么事件会冒泡。
  - cancelable: true/false —— 如果为 true，那么“默认行为”就会被阻止。稍后我们会看到对于自定义事件，它意味着什么。

默认情况下，以上两者都为 false：{bubbles: false, cancelable: false}。

**dispatchEvent:**

事件对象被创建后，我们应该使用 elem.dispatchEvent(event) 在元素上“运行”它。

```html
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click event");
  elem.dispatchEvent(event);
</script>
```

```html
<h1 id="elem">Hello from the script!</h1>

<script>
  // 在 document 上捕获...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });

  // ...在 elem 上 dispatch！
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

  // 在 document 上的处理程序将被激活，并显示消息。

</script>
```

## 事件循环

例如，当引擎正在忙于执行一段 script 时，用户可能会移动鼠标而产生 mousemove 事件，setTimeout 或许也刚好到期，以及其他任务，这些任务组成了一个队列。

队列中的任务基于“先进先出”的原则执行。当浏览器引擎执行完 script 后，它会处理 mousemove 事件，然后处理 setTimeout 处理程序，依此类推。

两个细节：

- 引擎执行任务时永远不会进行渲染（render）。如果任务执行需要很长一段时间也没关系。仅在任务完成后才会绘制对 DOM 的更改。
- 如果一项任务执行花费的时间过长，浏览器将无法执行其他任务，无法处理用户事件，因此，在一定时间后浏览器会在整个页面抛出一个如“页面未响应”之类的警报，建议你终止这个任务。这种情况常发生在有大量复杂的计算或导致死循环的程序错误时。

**拆分 CPU 过载任务：**

当执行一个大任务时，甚至可能会导致浏览器“中断（hiccup）”甚至“挂起（hang）”一段时间，这是不可接受的。

因此此时，可以将大任务拆分为多个任务，这样不至于页面的其他的任务没法执行。比如下面的大任务：

```js
let i = 0;

let start = Date.now();

function count() {

  // 做一个繁重的任务
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```

如果拆分为多个任务，可以如下：

```js
let i = 0;

let start = Date.now();

function count() {

  // 做繁重的任务的一部分 (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count); // 安排（schedule）新的调用 (**)
  }

}

count();
```

还有对于进度条，如果不拆分的话，很容易只显示最后的一个值：

```js
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

如果拆分的话，则会有慢慢变化的效果：

```js
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // 做繁重的任务的一部分 (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
```

还有一个特殊的函数 queueMicrotask(func)，它对 func 进行排队，以在微任务队列中执行。说白了，就是包装成微任务：

```js
let urgentCallback = () => log("*** Oh noes! An urgent callback has run!");

let doWork = () => {
  let result = 1;
 
  queueMicrotask(urgentCallback);

  for (let i=2; i<=10; i++) {
    result *= i;
  }
  return result;
};

log("Main program started");
setTimeout(callback, 0);
log(`10! equals ${doWork()}`);
log("Main program exiting");

// Main program started
// 10! equals 3628800
// Main program exiting
// *** Oh noes! An urgent callback has run!
// Regular timeout callback has run
```

## Frame 和 window

### 弹窗和window

从窗口访问弹窗，open 调用会返回对新窗口的引用。它可以用来操纵弹窗的属性，更改位置，甚至更多操作。

```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Hello, world!");
```

```js
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus(); // 可以用于将新打开的窗口置为最顶

alert(newWindow.location.href); // (*) about:blank，加载尚未开始

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
};
```

弹窗也可以使用 window.opener 来访问 opener 窗口，其实就是父窗口

关闭窗口：关闭一个窗口：win.close()。

检查一个窗口是否被关闭：win.closed。

从技术上讲，close() 方法可用于任何 window，但是如果 window 不是通过 window.open() 创建的，那么大多数浏览器都会忽略 window.close()。因此，close() 只对弹窗起作用。

如果窗口被关闭了，那么 closed 属性则为 true。这对于检查弹窗（或主窗口）是否仍处于打开状态很有用。用户可以随时关闭它，我们的代码应该考虑到这种可能性。

```js
let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```

JavaScript 无法最小化或者最大化一个窗口。这些操作系统级别的功能对于前端开发者而言是隐藏的。移动或者调整大小的方法不适用于最小化/最大化的窗口。

从理论上讲，使用 window.focus() 和 window.blur() 方法可以使窗口获得或失去焦点。此外，这里还有 focus/blur 事件，可以聚焦窗口并捕获访问者切换到其他地方的瞬间。

### 跨窗口通信

实例：iframe

一个 `<iframe>` 标签承载了一个单独的嵌入的窗口，它具有自己的 document 和 window。

我们可以使用以下属性访问它们：

- iframe.contentWindow 来获取 `<iframe>` 中的 window。
- iframe.contentDocument 来获取 `<iframe>` 中的 document，是iframe.contentWindow.document 的简写形式。

当我们访问嵌入的窗口中的东西时，浏览器会检查 iframe 是否具有相同的源。如果不是，则会拒绝访问（对 location 进行写入是一个例外，它是会被允许的）。

```html
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // 我们可以获取对内部 window 的引用
    let iframeWindow = iframe.contentWindow; // OK
    try {
      // ...但是无法获取其中的文档
      let doc = iframe.contentDocument; // ERROR
    } catch(e) {
      alert(e); // Security Error（另一个源）
    }

    // 并且，我们也无法 **读取** iframe 中页面的 URL
    try {
      // 无法从 location 对象中读取 URL
      let href = iframe.contentWindow.location.href; // ERROR
    } catch(e) {
      alert(e); // Security Error
    }

    // ...我们可以 **写入** location（所以，在 iframe 中加载了其他内容）！
    iframe.contentWindow.location = '/'; // OK

    iframe.onload = null; // 清空处理程序，在 location 更改后不要再运行它
  };
</script>
```

iframe.onload 事件（在 `<iframe>` 标签上）与 iframe.contentWindow.onload（在嵌入的 window 对象上）基本相同。当嵌入的窗口的所有资源都完全加载完毕时触发。

……但是，我们无法使用 iframe.contentWindow.onload 访问不同源的 iframe。因此，请使用 iframe.onload，

**Iframe：错误文档陷阱:**

在创建 iframe 后，iframe 会立即就拥有了一个文档。但是该文档不同于加载到其中的文档！

```html
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
    // 加载的文档与初始的文档不同！
    alert(oldDoc == newDoc); // false
  };
</script>
```

我们不应该对尚未加载完成的 iframe 的文档进行处理，因为那是 错误的文档。如果我们在其上设置了任何事件处理程序，它们将会被忽略。

如何检测文档就位（加载完成）的时刻呢？

正确的文档在 iframe.onload 触发时肯定就位了。但是，只有在整个 iframe 和它所有资源都加载完成时，iframe.onload 才会触发。

集合：window.frames

获取 `<iframe>` 的 window 对象的另一个方式是从命名集合 window.frames 中获取：

通过索引获取：window.frames[0] —— 文档中的第一个 iframe 的 window 对象。
通过名称获取：window.frames.iframeName —— 获取 name="iframeName" 的 iframe 的 window 对象。

```js
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

一个 iframe 内可能嵌套了其他的 iframe。相应的 window 对象会形成一个层次结构（hierarchy）。

可以通过以下方式获取：

- window.frames —— “子”窗口的集合（用于嵌套的 iframe）。
- window.parent —— 对“父”（外部）窗口的引用。
- window.top —— 对最顶级父窗口的引用。

**iframes的沙盒特性：**

sandbox 特性（attribute）允许在 `<iframe>` 中禁止某些特定行为，以防止其执行不被信任的代码。它通过将 iframe 视为非同源的，或者应用其他限制来实现 iframe 的“沙盒化”。

对于 `<iframe sandbox src="...">`，有一个应用于其上的默认的限制集。但是，我们可以通过提供一个以空格分隔的限制列表作为特性的值，来放宽这些限制，该列表中的各项为不应该应用于这个 iframe 的限制，例如：`<iframe sandbox="allow-forms allow-popups">`。

换句话说，一个空的 "sandbox" 特性会施加最严格的限制，但是我们用一个以空格分隔的列表，列出要移除的限制。


**跨窗口通信：**

```html
<!-- iframe.html -->
<!doctype html>
<html>

<head>
  <meta charset="UTF-8">
</head>

<body>

  Receiving iframe.
  <script>
    window.addEventListener('message', function(event) {
      alert(`Received ${event.data} from ${event.origin}`);
    });
  </script>

</body>
</html>


<!-- index.html -->
<!doctype html>
<html>

<head>
  <meta charset="UTF-8">
</head>

<body>

  <form id="form">
    <input type="text" placeholder="Enter message" name="message">
    <input type="submit" value="Click to send">
  </form>

  <iframe src="iframe.html" id="iframe" style="display:block;height:60px"></iframe>

  <script>
    form.onsubmit = function() {
      iframe.contentWindow.postMessage(this.message.value, '*');
      return false;
    };
  </script>

</body>
</html>
```

postMessage 接口允许两个具有任何源的窗口之间进行通信：

- 发送方调用 targetWin.postMessage(data, targetOrigin)。
- 如果 targetOrigin 不是 '*'，那么浏览器会检查窗口 targetWin 是否具有源 targetOrigin。
- 如果它具有，targetWin 会触发具有特殊的属性的 message 事件：

- origin —— 发送方窗口的源（比如 http://my.site.com）。
- source —— 对发送方窗口的引用。
- data —— 数据，可以是任何对象。但是 IE 浏览器只支持字符串，因此我们需要对复杂的对象调用 JSON.stringify 方法进行处理，以支持该浏览器。

我们应该使用 addEventListener 来在目标窗口中设置 message 事件的处理程序。


### 点击劫持攻击

我们以 Facebook 为例，解释点击劫持是如何完成的：

- 访问者被恶意页面吸引。怎样吸引的不重要。
- 页面上有一个看起来无害的链接（例如：“变得富有”或者“点我，超好玩！”）。
-恶意页面在该链接上方放置了一个透明的 `<iframe>`，其 src 来自于 facebook.com，这使得“点赞”按钮恰好位于该链接上面。这通常是通过 z-index 实现的。
- 用户尝试点击该链接时，实际上点击的是“点赞”按钮。

点击劫持是对点击事件，而非键盘事件
此攻击仅影响鼠标行为（或者类似的行为，例如在手机上的点击）。

键盘输入很难重定向。从技术上讲，我们可以用 iframe 的文本区域覆盖原有的文本区域实现攻击。因此，当访问者试图聚焦页面中的输入时，实际上聚焦的是 iframe 中的输入。

但是这里有个问题。访问者键入的所有内容都会被隐藏，因为该 iframe 是不可见的。

当用户无法在屏幕上看到自己输入的字符时，通常会停止打字。

一个页面如果不想被别人通过iframe利用，可以设置`X-Frame-Options`，这样的话这个页面就不能嵌套在iframe里了，

服务器端 header X-Frame-Options 可以允许或禁止在 frame 中显示页面。

它必须被完全作为 HTTP-header 发送：如果浏览器在 HTML <meta> 标签中找到它，则会忽略它。因此，<meta http-equiv="X-Frame-Options"...> 没有任何作用。

这个 header 可能包含 3 个值：

- DENY，始终禁止在 frame 中显示此页面。
- SAMEORIGIN，允许在和父文档同源的 frame 中显示此页面。
- ALLOW-FROM domain，允许在来自给定域的父文档的 frame 中显示此页面。

**Samesite cookie 特性：**

samesite cookie 特性也可以阻止点击劫持攻击。

具有 samesite 特性的 cookie 仅在网站是通过直接方式打开（而不是通过 frame 或其他方式）的情况下才发送到网站。

## 二进制数据、文件

### ArrayBuffer，二进制数组

在 Web 开发中，当我们处理文件时（创建，上传，下载），经常会遇到二进制数据。另一个典型的应用场景是图像处理。

这些都可以通过 JavaScript 进行处理，而且二进制操作性能更高。

不过，在 JavaScript 中有很多种二进制数据格式，会有点容易混淆。仅举几个例子：

ArrayBuffer，Uint8Array，DataView，Blob，File 及其他。

基本的二进制对象是 **ArrayBuffer —— 对固定长度的连续内存空间的引用**。ArrayBuffer 是核心对象，是所有的基础，是原始的二进制数据。

```js
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer
alert(buffer.byteLength); // 16
// 它会分配一个 16 字节的连续内存空间，并用 0 进行预填充。
```

**ArrayBuffer 不是某种东西的数组**，让我们先澄清一个可能的误区。ArrayBuffer 与 Array 没有任何共同之处：

- 它的长度是固定的，我们无法增加或减少它的长度。
- 它正好占用了内存中的那么多空间。
- 要访问单个字节，需要另一个“视图”对象，而不是 buffer[index]。

ArrayBuffer 是一个内存区域。它里面存储了什么？无从判断。只是一个原始的字节序列。

如要操作 ArrayBuffer，我们需要使用“视图”对象。

视图对象本身并不存储任何东西。它是一副“眼镜”，透过它来解释存储在 ArrayBuffer 中的字节。

以下是几种视图对象：

- Uint8Array —— 将 ArrayBuffer 中的每个字节视为 0 到 255 之间的单个数字（每个字节是 8 位，因此只能容纳那么多）。这称为 “8 位无符号整数”。
- Uint16Array —— 将每 2 个字节视为一个 0 到 65535 之间的整数。这称为 “16 位无符号整数”。
- Uint32Array —— 将每 4 个字节视为一个 0 到 4294967295 之间的整数。这称为 “32 位无符号整数”。
- Float64Array —— 将每 8 个字节视为一个 5.0x10-324 到 1.8x10308 之间的浮点数。

![ArrayBuffer与视图对象](/jsArt/assets/images/css/ArrayBuffer.png)

因此，一个 16 字节 ArrayBuffer 中的二进制数据可以解释为 16 个“小数字”，或 8 个更大的数字（每个数字 2 个字节），或 4 个更大的数字（每个数字 4 个字节），或 2 个高精度的浮点数（每个数字 8 个字节）。

ArrayBuffer 是核心对象，是所有的基础，是原始的二进制数据。

但是，如果我们要写入值或遍历它，基本上几乎所有操作 —— 我们必须使用视图（view），例如：

```js
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer

let view = new Uint32Array(buffer); // 将 buffer 视为一个 32 位整数的序列

alert(Uint32Array.BYTES_PER_ELEMENT); // 每个整数 4 个字节

alert(view.length); // 4，它存储了 4 个整数
alert(view.byteLength); // 16，字节中的大小

// 让我们写入一个值
view[0] = 123456;

// 遍历值
for(let num of view) {
  alert(num); // 123456，然后 0，0，0（一共 4 个值）
}
```

### Blob

ArrayBuffer 和视图（view）都是 ECMA 标准的一部分，是 JavaScript 的一部分。

在浏览器中，还有其他更高级的对象，特别是 Blob，Blob 由一个可选的字符串 type（通常是 MIME 类型）和 blobParts 组成 —— 一系列其他 Blob 对象，字符串和 BufferSource。

ArrayBuffer，Uint8Array 及其他 BufferSource 是“二进制数据”，而 Blob 则表示“具有类型的二进制数据”。

这样可以方便 Blob 用于在浏览器中非常常见的上传/下载操作。

XMLHttpRequest，fetch 等进行 Web 请求的方法可以自然地使用 Blob，也可以使用其他类型的二进制数据。

我们可以轻松地在 Blob 和低级别的二进制数据类型之间进行转换：

我们可以使用 new Blob(...) 构造函数从一个类型化数组（typed array）创建 Blob。
我们可以使用 FileReader 从 Blob 中取回 ArrayBuffer，然后在其上创建一个视图（view），用于低级别的二进制处理。

**File 和 FileReader：**

File 对象继承自 Blob，并扩展了与文件系统相关的功能。

有两种方式可以获取它。

第一种，与 Blob 类似，有一个构造器：
new File(fileParts, fileName, [options])
- fileParts —— Blob/BufferSource/String 类型值的数组。
- fileName —— 文件名字符串。
- options —— 可选对象：
    - lastModified —— 最后一次修改的时间戳（整数日期）。

第二种，更常见的是，我们从 <input type="file"> 或拖放或其他浏览器接口来获取文件。在这种情况下，file 将从操作系统（OS）获得 this 信息。

由于 File 是继承自 Blob 的，所以 File 对象具有相同的属性，附加：

name —— 文件名，
lastModified —— 最后一次修改的时间戳。

```html
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  // 输入（input）可以选择多个文件，因此 input.files 是一个类数组对象。这里我们只有一个文件，所以我们只取 input.files[0]。
  let file = input.files[0];

  alert(`File name: ${file.name}`); // 例如 my.png
  alert(`Last modified: ${file.lastModified}`); // 例如 1552830408824
}
</script>
```

**FileReader:**

FileReader 是一个对象，其唯一目的是从 Blob（因此也从 File）对象中读取数据。它使用事件来传递数据，因为从磁盘读取数据可能比较费时间。

构造函数：

```js
let reader = new FileReader(); // 没有参数
```

主要方法:

- readAsArrayBuffer(blob) —— 将数据读取为二进制格式的 ArrayBuffer。
- readAsText(blob, [encoding]) —— 将数据读取为给定编码（默认为 utf-8 编码）的文本字符串。
- readAsDataURL(blob) —— 读取二进制数据，并将其编码为 base64 的 data url。
- abort() —— 取消操作。


## 网络请求

### Fetch

对于来自 JavaScript 的网络请求，有一个总称术语 “AJAX”（Asynchronous JavaScript And XML 的简称）。但是，我们不必使用 XML：这个术语诞生于很久以前，所以这个词一直在那儿。

有很多方式可以向服务器发送网络请求，并从服务器获取信息。

fetch() 方法是一种现代通用的方法，那么我们就从它开始吧。

```js
let promise = fetch(url, [options])
```

- url —— 要访问的 URL。
- options —— 可选参数：method，header 等。

没有 options，**那就是一个简单的 GET 请求，下载 url 的内容**。

浏览器立即启动请求，并返回一个该调用代码应该用来获取结果的 promise。

获取响应通常需要经过两个阶段。

1. 第一阶段，当服务器发送了响应头（response header），fetch 返回的 promise 就使用内建的 Response class 对象来对响应头进行解析。

在这个阶段，我们可以通过检查响应头，来检查 HTTP 状态以确定请求是否成功，当前还没有响应体（response body）。

2. 第二阶段，为了获取 response body，我们需要使用一个其他的方法调用。

- response.text() —— 读取 response，并以文本形式返回 response，
- response.json() —— 将 response 解析为 JSON，
- response.formData() —— 以 FormData 对象（在 下一章 有解释）的形式返回 response，
- response.blob() —— 以 Blob（具有类型的二进制数据）形式返回 response，
- response.arrayBuffer() —— 以 ArrayBuffer（低级别的二进制数据）形式返回 response，
- 另外，response.body 是 ReadableStream 对象，它允许你逐块读取 body，我们稍后会用一个例子解释它。

```js
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

let commits = await response.json(); // 读取 response body，并将其解析为 JSON

alert(commits[0].author.login);
```

**response header:**

Response header 位于 response.headers 中的一个类似于 Map 的 header 对象。

```js
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// 获取一个 header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// 迭代所有 header
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

**request header:**

要在 fetch 中设置 request header，我们可以使用 headers 选项。它有一个带有输出 header 的对象，如下所示：

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
```

但是有一些我们无法设置的 header，这些 header 保证了 HTTP 的正确性和安全性，所以它们仅由浏览器控制。

**post请求：**

要创建一个 POST 请求，或者其他方法的请求，我们需要使用 fetch 选项：

- method —— HTTP 方法，例如 POST，
- body —— request body，其中之一：
  - 字符串（例如 JSON 编码的），
  - FormData 对象，以 form/multipart 形式发送数据，
  - Blob/BufferSource 发送二进制数据，
  - URLSearchParams，以 x-www-form-urlencoded 编码形式发送数据，很少使用。

```js
let user = {
  name: 'John',
  surname: 'Smith'
};

let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});

let result = await response.json();
alert(result.message);
```

因为 Blob 对象具有内建的类型，不用手动设置 Content-Type header，这个类型就变成了 Content-Type 的值。

**FormData：**

我们可以使用XHR来模仿表单提交：首先将ContentType头部信息设置为application/xwww-form-urlencoded，也就是表单提交时的内容类型，其次是以适当的格式创建一个字符串。还需要将页面中表单的数据进行序列化，然后再通过XHR发送到服务器。。。比较麻烦。

使用FormData的方便之处体现在不必明确地在XHR对象上设置请求头部。XHR对象能够识别传入的数据类型是FormData的实例，并配置适当的头部信息。

```js
// 语法：
let formData = new FormData([form]);
// 如果提供了 HTML form 元素，它会自动捕获 form 元素字段。
```

比如：

```html
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
      body: new FormData(formElem)
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

**formData方法：**

- formData.append(name, value) —— 添加具有给定 name 和 value 的表单字段，可以添加重复名字的字段
- formData.append(name, blob, fileName) —— 添加一个字段，就像它是 <input type="file">，第三个参数 fileName 设置文件名（而不是表单字段名），因为它是用户文件系统中文件的名称，
- formData.delete(name) —— 移除带有给定 name 的字段，
- formData.get(name) —— 获取带有给定 name 的字段值，
- formData.has(name) —— 如果存在带有给定 name 的字段，则返回 true，否则返回 false。
- formData.set(name, value)，会先删除多个同名的，然后再新建
- formData.set(name, blob, fileName)。

**发送带有文件的表单：**

表单始终以 Content-Type: multipart/form-data 来发送数据，这个编码允许发送文件。因此 <input type="file"> 字段也能被发送，类似于普通的表单提交。因此其实就是多种数据格式的组合：

```html
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Picture: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
      body: new FormData(formElem)
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

**发送具有Blob数据的表单：**

实际上服务器通常更适合接收多部分编码的表单（multipart-encoded form），而不是原始的二进制数据。

```html
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      // toBlob是canvas的一个方法，用来生成Blob数据
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

### Fetch 下载进度

fetch 方法允许去跟踪 下载 进度。

请注意：到目前为止，fetch 方法无法跟踪 上传 进度。对于这个目的，请使用 XMLHttpRequest，我们在后面章节会讲到。

要跟踪下载进度，我们可以使用 response.body 属性。它是 ReadableStream —— 一个特殊的对象，它可以逐块（chunk）提供 body。与 response.text()，response.json() 和其他方法不同，response.body 给予了对进度读取的完全控制，我们可以随时计算下载了多少。

```js
// 代替 response.json() 以及其他方法
const reader = response.body.getReader();

// 在 body 下载时，一直为无限循环
while(true) {
  // 当最后一块下载完成时，done 值为 true
  // value 是块字节的 Uint8Array
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

`await reader.read() `调用的结果是一个具有两个属性的对象：

- done —— 当读取完成时为 true，否则为 false。
- value —— 字节的类型化数组：Uint8Array。


```js
// Step 1：启动 fetch，并获得一个 reader
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Step 2：获得总长度（length）
// 跨源请求中可能不存在这个 header，但一般都有
const contentLength = +response.headers.get('Content-Length');

// Step 3：读取数据
let receivedLength = 0; // 当前接收到了这么多字节
let chunks = []; // 接收到的二进制块的数组（包括 body）
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

// 我们现在有了一个 chunks —— 一个 Uint8Array 字节块数组。我们需要将这些块合并成一个结果。
// 但不幸的是，没有单个方法可以将它们串联起来，所以下面将数据拼接起来
// Step 4：将块连接到单个 Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1) 总长度的同类型数组。

let position = 0;
for(let chunk of chunks) {
  chunksAll.set(chunk, position); // (4.2)
  position += chunk.length;
}

// Step 5：将字节数组解码成字符串
let result = new TextDecoder("utf-8").decode(chunksAll);

// 我们完成啦！
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

上面是将类型化数组转为字符串，还可以直接将chunks转为Blob（new Blob(chunks)）

**Fetch中止：**

正如我们所知道的，**fetch 返回一个 promise。JavaScript 通常并没有“中止” promise 的概念**。那么我们怎样才能中止 fetch 呢？

为此有一个特殊的内建对象：AbortController，它不仅可以中止 fetch，还可以中止其他异步任务。

```js
// Step 1：创建一个控制器（controller）：
let controller = new AbortController();
// 它具有单个方法 abort()，和单个属性 signal。
// 当 abort() 被调用时：
//    abort 事件就会在 controller.signal 上触发
//    controller.signal.aborted 属性变为 true。
// 任何对 abort() 调用感兴趣的人，都可以在 controller.signal 上设置监听器来对其进行跟踪。
let signal = controller.signal;

// 当 controller.abort() 被调用时触发
signal.addEventListener('abort', () => alert("abort!"));

controller.abort(); // 中止！

alert(signal.aborted); // true
```

```js
// Step 2：将 signal 属性传递给 fetch 选项：
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
// fetch 方法知道如何与 AbortController 一起使用，它会监听 signal 上的 abort。

// Step 3：调用 controller.abort() 来中止：
controller.abort();
```

完整实例：

```js
// 1 秒后中止
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // handle abort()
    alert("Aborted!");
  } else {
    throw err;
  }
}
```

如果我们有自己的与 fetch 不同的异步任务，我们可以使用单个 AbortController 中止这些任务以及 fetch。

那axios的取消请求的逻辑，就和这个差不多了。

### Fetch 跨域请求

跨源请求 —— 那些发送到其他域（即使是子域）、协议或端口的请求 —— 需要来自远程端的特殊 header。

这个策略被称为 “CORS”：跨源资源共享（Cross-Origin Resource Sharing）。

**为什么需要 CORS？跨源请求简史：**

**使用表单：**

其中一种和其他服务器通信的方法是在那里提交一个 `<form>`。人们将它提交到 `<iframe>`，只是为了停留在当前页面，像这样：

```html
<!-- 表单目标 -->
<iframe name="iframe"></iframe>

<!-- 表单可以由 JavaScript 动态生成并提交 -->
<form target="iframe" method="POST" action="http://another.com/…">
  ...
</form>
```

因此，即使没有网络方法，也可以向其他网站发出 GET/POST 请求，因为表单可以将数据发送到任何地方。但是由于禁止从其他网站访问 `<iframe> `中的内容，因此就无法读取响应。

**jsonp:**

另一个技巧是使用 script 标签。script 可以具有任何域的 src，例如` <script src="http://another.com/…">`。也可以执行来自任何网站的 script。

如果一个网站，例如 another.com 试图公开这种访问方式的数据，则会使用所谓的 “JSONP (JSON with padding)” 协议。

不久之后，网络方法出现在了浏览器 JavaScript 中。

起初，跨源请求是被禁止的。但是，经过长时间的讨论，跨源请求被允许了，但是任何新功能都需要服务器明确允许，以特殊的 header 表述。

**简单请求：**

有两种类型的跨源请求：

- 简单的请求。
- 所有其他请求。

一个 简单的请求 是指满足以下两个条件的请求：

- 简单的方法：GET，POST 或 HEAD
- 简单的 header —— 仅允许自定义下列 header：
  - Accept，
  - Accept-Language，
  - Content-Language，
  - Content-Type 的值为 application/x-www-form-urlencoded，multipart/form-data 或text/plain。

**任何其他请求都被认为是“非简单请求”。**例如，具有 PUT 方法或 API-Key HTTP-header 的请求就不是简单请求。

**本质区别在于，可以使用 `<form> 或 <script>` 进行“简单请求”，而无需任何其他特殊方法。**

因此，即使是非常旧的服务器也能很好地接收简单请求。

与此相反，带有非标准 header 或者例如 DELETE 方法的请求，无法通过这种方式创建。在很长一段时间里，JavaScript 都不能进行这样的请求。所以，旧的服务器可能会认为此类请求来自具有特权的来源（privileged source），“因为网页无法发送它们”。

当我们尝试发送一个非简单请求时，浏览器会发送一个特殊的“预检（preflight）”请求到服务器 —— 询问服务器，你接受此类跨源请求吗？

并且，除非服务器明确通过 header 进行确认，否则非简单请求不会被发送。

**非简单请求：**

我们可以使用任何 HTTP 方法：不仅仅是 GET/POST，也可以是 PATCH，DELETE 及其他。

之前，没有人能够设想网页能发出这样的请求。因此，可能仍然存在有些 Web 服务将非标准方法视为一个信号：“这不是浏览器”。它们可以在检查访问权限时将其考虑在内。

因此，为了避免误解，任何“非标准”请求 —— 浏览器不会立即发出在过去无法完成的这类请求。即在它发送这类请求前，会先发送“预检（preflight）”请求来请求许可。

预检请求使用 OPTIONS 方法，它没有 body，但是有两个 header：

- Access-Control-Request-Method header 带有非简单请求的方法。
- Access-Control-Request-Headers header 提供一个以逗号分隔的非简单 HTTP-header 列表。

如果服务器同意处理请求，那么它会进行响应，此响应的状态码应该为 200，没有 body，具有 header：

- Access-Control-Allow-Methods 必须具有允许的方法。
- Access-Control-Allow-Headers 必须具有一个允许的 header 列表。
- 另外，header Access-Control-Max-Age 可以指定缓存此权限的秒数。因此，浏览器可以在缓存期间内不再发送预检请求。

**凭据（Credentials）：**

默认情况下，由 JavaScript 代码发起的跨源请求不会带来任何凭据（cookies 或者 HTTP 认证（HTTP authentication））。

这对于 HTTP 请求来说并不常见。通常，对 http://site.com 的请求附带有该域的所有 cookie。但是由 JavaScript 方法发出的跨源请求是个例外。

要在 fetch 中发送凭据，我们需要添加 credentials: "include" 选项，像这样：

```js
fetch('http://another.com', {
  credentials: "include"
});
```

如果服务器同意接受 带有凭据 的请求，则除了 Access-Control-Allow-Origin 外，服务器还应该在响应中添加 header Access-Control-Allow-Credentials: true。

```js
200 OK
// 对于具有凭据的请求，禁止 Access-Control-Allow-Origin 使用星号 *。如上所示，它必须有一个确切的源。这是另一项安全措施，以确保服务器真的知道它信任的发出此请求的是谁。
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

我们为什么需要源（Origin）？

我们需要 Origin，是因为有时会没有 Referer。例如，当我们从 HTTPS（从高安全性访问低安全性）fetch HTTP 页面时，便没有 Referer。

内容安全策略 可能会禁止发送 Referer。

正如我们将看到的，fetch 也具有阻止发送 Referer 的选项，甚至允许修改它（在同一网站内）。

根据规范，Referer 是一个可选的 HTTP-header。

正是因为 Referer 不可靠，才发明了 Origin。浏览器保证跨源请求的正确 Origin。

### Fetch Api

```js
let promise = fetch(url, {
  method: "GET", // POST，PUT，DELETE，等。
  headers: {
    // 内容类型 header 值通常是自动设置的
    // 取决于 request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string，FormData，Blob，BufferSource，或 URLSearchParams
  referrer: "about:client", // 或 "" 以不发送 Referer header，
  // 或者是当前源的 url
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer，origin，same-origin...
  mode: "cors", // same-origin，no-cors
  credentials: "same-origin", // omit，include
  cache: "default", // no-store，reload，no-cache，force-cache，或 only-if-cached
  redirect: "follow", // manual，error
  integrity: "", // 一个 hash，像 "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController 来中止请求
  window: window // null
});
```

参考：https://zh.javascript.info/fetch-api

**URL 对象：**

没有任何一个网络方法一定需要使用 URL 对象，字符串就足够了。所以从技术上讲，我们并不是必须使用 URL。但是有些时候 URL 对象真的很有用。

```js
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin

// 注意url的拼接方式，只是将最后一项替换掉了
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

URL对象允许我们立即访问其组件：

```js
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

通常，URL 对象可以替代字符串传递给任何方法，因为大多数方法都会执行字符串转换，这会将 URL 对象转换为具有完整 URL 的字符串。

**SearchParams “?…”：**

```js
new URL('https://google.com/search?query=JavaScript')
```

……但是，如果参数中包含空格，非拉丁字母等（具体参见下文），参数就需要被编码。因此有一个 URL 属性用于解决这个问题：url.searchParams，URLSearchParams 类型的对象。

它为搜索参数提供了简便的方法：

- append(name, value) —— 按照 name 添加参数，
- delete(name) —— 按照 name 移除参数，
- get(name) —— 按照 name 获取参数，
- getAll(name) —— 获取相同 name 的所有参数（这是可行的，例如 ?user=John&user=Pete），
- has(name) —— 按照 name 检查参数是否存在，
- set(name, value) —— set/replace 参数，
- sort() —— 按 name 对参数进行排序，很少使用，
- ……并且它是可迭代的，类似于 Map。

```js
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // 添加带有一个空格和一个 ! 的参数

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // 添加带有一个冒号 : 的参数

// 参数会被自动编码
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// 遍历搜索参数（被解码）
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!，然后是 tbs=qdr:y
}
```

**编码（encoding）：**

RFC3986 标准定义了 URL 中允许哪些字符，不允许哪些字符。

那些不被允许的字符必须被编码，例如非拉丁字母和空格 —— 用其 UTF-8 代码代替，前缀为 %，例如 %20（由于历史原因，空格可以用 + 编码，但这是一个例外）。

好消息是 URL 对象会自动处理这些。我们仅需提供未编码的参数，然后将 URL 转换为字符串：

```js
// 在此示例中使用一些西里尔字符

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```

**编码字符串：**

在过去，在出现 URL 对象之前，人们使用字符串作为 URL。如果使用字符串，则需要手动编码/解码特殊字符。

- encodeURI —— 编码整个 URL。
- decodeURI —— 解码为编码前的状态。
- encodeURIComponent —— 编码 URL 组件，例如搜索参数，或者 hash，或者 pathname。
- decodeURIComponent —— 解码为编码前的状态。

- encodeURI 仅编码 URL 中完全禁止的字符。
- encodeURIComponent 也编码这类字符，此外，还编码 #，$，&，+，,，/，:，;，=，? 和 @ 字符。

```js
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll

// 将其与 encodeURI 进行比较：
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

我们可以看到，encodeURI 没有对 & 进行编码，因为它对于整个 URL 来说是合法的字符。

但是，我们应该编码在搜索参数中的 & 字符，否则，我们将得到 q=Rock&Roll —— 实际上是 q=Rock 加上某个晦涩的参数 Roll。不符合预期。

因此，对于每个搜索参数，我们应该使用 encodeURIComponent，以将其正确地插入到 URL 字符串中。最安全的方式是对 name 和 value 都进行编码，除非我们能够绝对确保它只包含允许的字符。

```js
// encode* 与 URL 之间的编码差异
// 类 URL 和 URLSearchParams 基于最新的 URL 规范：RFC3986，而 encode* 函数是基于过时的 RFC2396。

// 它们之间有一些区别，例如对 IPv6 地址的编码方式不同：

// IPv6 地址的合法 url
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
// 正如我们所看到的，encodeURI 替换了方括号 [...]，这是不正确的，原因是：在 RFC2396 (August 1998) 时代，还不存在 IPv6 url。

// 这种情况很少见，encode* 函数在大多数情况下都能正常工作。
```

### XMLHttpRequest

XMLHttpRequest 是一个内建的浏览器对象，它允许使用 JavaScript 发送 HTTP 请求。

**虽然它的名字里面有 “XML” 一词，但它可以操作任何数据，而不仅仅是 XML 格式。我们可以用它来上传/下载文件，跟踪进度(进度fetch做不到)等**。

```js
// 1、创建 XMLHttpRequest，此构造器没有参数。
let xhr = new XMLHttpRequest();

// 2、初始化它，通常就在 new XMLHttpRequest 之后：
xhr.open(method, URL, [async, user, password])
// 此方法指定请求的主要参数：

//   method —— HTTP 方法。通常是 "GET" 或 "POST"。
//   URL —— 要请求的 URL，通常是一个字符串，也可以是 URL 对象。
//   async —— 如果显式地设置为 false，那么请求将会以同步的方式处理，我们稍后会讲到它。
//   user，password —— HTTP 基本身份验证（如果需要的话）的登录名和密码。

// 请注意，open 调用与其名称相反，不会建立连接。它仅配置请求，而网络活动仅以 send 调用开启。

// 3、发送请求
xhr.send([body])

// 4、监听 xhr 事件以获取响应。
  // load —— 当请求完成（即使 HTTP 状态为 400 或 500 等），并且响应已完全下载。
  // error —— 当无法发出请求，例如网络中断或者无效的 URL。
  // progress —— 在下载响应期间定期触发，报告已经下载了多少。

// 实例：
// 1. 创建一个 new XMLHttpRequest 对象
let xhr = new XMLHttpRequest();

// 2. 配置它：从 URL /article/.../load GET-request
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. 通过网络发送请求
xhr.send();

// 4. 当接收到响应后，将调用此函数
xhr.onload = function() {
  if (xhr.status != 200) { // 分析响应的 HTTP 状态
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // 例如 404: Not Found
  } else { // 显示结果
    alert(`Done, got ${xhr.response.length} bytes`); // response 是服务器响应
  }
};

// 定期触发
xhr.onprogress = function(event) {
  // event.lengthComputable = true，当服务器发送了 Content-Length header 时
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    // event.loaded —— 已经下载了多少字节
    // event.total —— 总字节数（如果 lengthComputable 为 true）
    alert(`Received ${event.loaded} bytes`); // 没有 Content-Length
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
```

一旦服务器有了响应，我们可以在以下 xhr 属性中接收结果：

- status，HTTP 状态码（一个数字）：200，404，403 等，如果出现非 HTTP 错误，则为 0。
- statusText，HTTP 状态消息（一个字符串）：状态码为 200 对应于 OK，404 对应于 Not Found，403 对应于 Forbidden。
- response（旧脚本可能用的是 responseText）服务器 response body。

我们还可以使用相应的属性指定超时（timeout）：`xhr.timeout = 10000;` timeout 单位是 ms，此处即 10 秒

**响应类型:**

我们可以**使用 xhr.responseType 属性来设置响应格式**：

- ""（默认）—— 响应格式为字符串，
- "text" —— 响应格式为字符串，
- "arraybuffer" —— 响应格式为 ArrayBuffer（对于二进制数据，请参见 ArrayBuffer，二进制数组），
- "blob" —— 响应格式为 Blob（对于二进制数据，请参见 Blob），
- "document" —— 响应格式为 XML document（可以使用 XPath 和其他 XML 方法），
- "json" —— 响应格式为 JSON（自动解析）。

在旧的脚本中，你可能会看到 xhr.responseText，甚至会看到 xhr.responseXML 属性。

它们是由于历史原因而存在的，以获取字符串或 XML 文档。如今，我们应该在 xhr.responseType 中设置格式，然后就能获取如上所示的 xhr.response 了。

**readyState:**

XMLHttpRequest 的状态（state）会随着它的处理进度变化而变化。可以通过 xhr.readyState 来了解当前状态。

- UNSENT = 0; // 初始状态
- OPENED = 1; // open 被调用
- HEADERS_RECEIVED = 2; // 接收到 response header
- LOADING = 3; // 响应正在被加载（接收到一个数据包）
- DONE = 4; // 请求完成

XMLHttpRequest 对象以 0 → 1 → 2 → 3 → … → 3 → 4 的顺序在它们之间转变。**每当通过网络接收到一个数据包**，就会重复一次状态 3。

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // 加载中
  }
  if (xhr.readyState == 4) {
    // 请求完成
  }
};
```

你可能**在非常老的代码中找到 readystatechange 这样的事件监听器，它的存在是有历史原因的，因为曾经有很长一段时间都没有 load 以及其他事件**。如今，它已被 load/error/progress 事件处理程序所替代。

可以随时终止请求。调用 xhr.abort() 即可，它会触发 abort 事件，**且 xhr.status 变为 0**。

**同步请求：**

如果在 open 方法中将第三个参数 async 设置为 false，那么请求就会以同步的方式进行。

换句话说，**JavaScript 执行在 send() 处暂停，并在收到响应后恢复执行。这有点儿像 alert 或 prompt 命令**。

这看起来好像不错，但是很少使用同步调用，因为它们会阻塞页面内的 JavaScript，直到加载完成。在某些浏览器中，滚动可能无法正常进行。如果一个同步调用执行时间过长，浏览器可能会建议关闭“挂起（hanging）”的网页。

XMLHttpRequest 的很多高级功能在同步请求中都不可用，例如向其他域发起请求或者设置超时。并且，正如你所看到的，没有进度指示。

**HTTP-header：**

XMLHttpRequest 允许发送自定义 header，并且可以从响应中读取 header。

HTTP-header 有三种方法：

- setRequestHeader(name, value)
- getResponseHeader(name) 获取具有给定 name 的 header（Set-Cookie 和 Set-Cookie2 除外）。
- getAllResponseHeaders() 获取具有给定 name 的 header（Set-Cookie 和 Set-Cookie2 除外）。


注意：

```js
// 一些 header 是由浏览器专门管理的，例如 Referer 和 Host。 
// 一旦设置了 header，就无法撤销了。也不会覆盖它
xhr.setRequestHeader('X-Auth', '123');
xhr.setRequestHeader('X-Auth', '456');

// header 将是：
// X-Auth: 123, 456

// header 之间的换行符始终为 "\r\n"（不依赖于操作系统），所以我们可以很容易地将其拆分为单独的 header。
// name 和 value 之间总是以冒号后跟一个空格 ": " 分隔。这是标准格式。
let headers = xhr
  .getAllResponseHeaders()
  .split('\r\n')
  .reduce((result, current) => {
    let [name, value] = current.split(': ');
    result[name] = value;
    return result;
  }, {});

// headers['Content-Type'] = 'image/png'
```

**POST，FormData：**

```js
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // 从表单预填充 FormData
  let formData = new FormData(document.forms.person);

  // 附加一个字段
  formData.append("middle", "Lee");

  // 将其发送出去
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
```

以 multipart/form-data 编码发送表单。

或者，如果我们更喜欢 JSON，那么可以使用 JSON.stringify 并以字符串形式发送。

只是，不要忘记设置 header Content-Type: application/json，只要有了它，很多服务端框架都能自动解码 JSON：

```js
let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  name: "John",
  surname: "Smith"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
```

.send(body) 方法就像一个非常杂食性的动物。它几乎可以发送任何 body，包括 Blob 和 BufferSource 对象。

**上传进度:**

progress 事件**仅在下载阶段触发**。

如果我们要上传的东西很大，那么我们肯定会对跟踪上传进度感兴趣。但是 xhr.onprogress 在这里并不起作用。

这里有另一个对象，它没有方法，它专门用于跟踪上传事件：xhr.upload。

它会生成事件，类似于 xhr，但是 xhr.upload 仅在上传时触发它们：

- loadstart —— 上传开始。
- progress —— 上传期间定期触发。
- abort —— 上传中止。
- error —— 非 HTTP 错误。
- load —— 上传成功完成。
- timeout —— 上传超时（如果设置了 timeout 属性）。
- loadend —— 上传完成，无论成功还是 error。

```js
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // 跟踪上传进度
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };

  // 跟踪完成：无论成功与否
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

就像 fetch 一样，默认情况下不会将 cookie 和 HTTP 授权发送到其他域。要启用它们，可以将 xhr.withCredentials 设置为 true.

**可恢复的文件上传：**

不太实用的进度事件：要恢复上传，我们需要知道在连接断开前已经上传了多少。

我们有 xhr.upload.onprogress 来跟踪上传进度。

不幸的是，它不会帮助我们在此处恢复上传，因为它会在数据 被发送 时触发，但是服务器是否接收到了？浏览器并不知道。

或许它是由本地网络代理缓冲的（buffered），或者可能是远程服务器进程刚刚终止而无法处理它们，亦或是它在中间丢失了，并没有到达服务器。

这就是为什么此事件仅适用于显示一个好看的进度条。

要恢复上传，我们需要 确切地 知道服务器接收的字节数。而且只有服务器能告诉我们，因此，我们将发出一个额外的请求。

完善的算法：

1. 创建一个文件id，标识要上传的文件
2. 请求服务器，得知当前已经上传了多少字节
3. 用Blob或者slice方法来发送从startByte开始的文件

### WebSocket

要打开一个 WebSocket 连接，我们需要在 url 中使用特殊的协议 ws 创建 new WebSocket：

```js
let socket = new WebSocket("ws://javascript.info");
```

始终使用 wss://
wss:// 协议不仅是被加密的，而且更可靠。

因为 ws:// 数据不是加密的，对于任何中间人来说其数据都是可见的。并且，旧的代理服务器不了解 WebSocket，它们可能会因为看到“奇怪的” header 而中止连接。

另一方面，**wss:// 是基于 TLS 的 WebSocket，类似于 HTTPS 是基于 TLS 的 HTTP）**，传输安全层在发送方对数据进行了加密，在接收方进行解密。因此，数据包是通过代理加密传输的。它们看不到传输的里面的内容，且会让这些数据通过。

**建立websocket：**

当 new WebSocket(url) 被创建后，它将立即开始连接。

**在连接期间，浏览器（使用 header）问服务器：“你支持 WebSocket 吗？”如果服务器回复说“我支持”，那么通信就以 WebSocket 协议继续进行，该协议根本不是 HTTP。**

```js
// 这是由 new WebSocket("wss://javascript.info/chat") 发出的请求的浏览器 header 示例。
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

- Origin —— 客户端页面的源，例如 https://javascript.info。WebSocket 对象是原生支持跨源的。没有特殊的 header 或其他限制。旧的服务器无法处理 WebSocket，因此不存在兼容性问题。但是Origin header 很重要，因为它允许服务器决定是否使用 WebSocket 与该网站通信。
- Connection: Upgrade —— 表示客户端想要更改协议。
- Upgrade: websocket —— 请求的协议是 “websocket”。
- Sec-WebSocket-Key —— 浏览器随机生成的安全密钥。
- Sec-WebSocket-Version —— WebSocket 协议版本，当前为 13。

### EventSource

|-|-|
| WebSocket	| EventSource |
| 双向：客户端和服务端都能交换消息| 	单向：仅服务端能发送消息 |
| 二进制和文本数据|	仅文本数据|
|WebSocket 协议	|	常规 HTTP 协议 |


与 WebSocket 相比，EventSource 是与服务器通信的一种不那么强大的方式。

我们为什么要使用它？

主要原因：简单。在很多应用中，WebSocket 有点大材小用。

我们需要从服务器接收一个数据流：可能是聊天消息或者市场价格等。这正是 EventSource 所擅长的。它还支持自动重新连接，而在 WebSocket 中这个功能需要我们手动实现。此外，它是一个普通的旧的 HTTP，不是一个新协议。

## 正则表达式

### 模式（Patterns）和修饰符（flags）

正则表达式（可叫作“regexp”或者“reg”）**包含 模式 和可选的 修饰符**。

```js
// 构造器语法
regexp = new RegExp("pattern", "flags");

// 斜杠语法
regexp = /pattern/; // 没有修饰符
regexp = /pattern/gmi; // 伴随修饰符 g、m 和 i（后面会讲到）
```

由于斜杠语法不支持变量，因此当构造一些动态的正则时，需要用到构造器语法：

```js
let str = 'abc'
/`${str}`/.test('abc'); // false
/abc/.test('abc'); // true
```

#### 修饰符

- i，使用此修饰符后，搜索时不区分大小写: A 和 a 没有区别（具体看下面的例子）。
- g，使用此修饰符后，搜索时会查找所有的匹配项，而不只是第一个（在下一章会讲到）。
- m，多行模式（详见章节 文章 "regexp-multiline" 未找到）。
- u，开启完整的 unicode 支持。该修饰符能够修正对于代理对的处理。更详细的内容见章节 Unicode：修饰符 “u” 和 class \p{...}。
- y，粘滞模式

str.search(regexp) 方法返回的是找到的匹配项的索引位置，如果没找到则返回 -1。

### 字符类

```js
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

alert( str.match(regexp) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

// let's make the digits-only phone number of them:
alert( str.match(regexp).join('') ); // 79035419441
```

- \d（“d” 来自 “digit”），数字：从 0 到 9 的字符。
- \s（“s” 来自 “space”），空格符号：包括空格，制表符 \t，换行符 \n 和其他少数稀有字符，例如 \v，\f 和 \r。
- \w（“w” 来自 “word”），“单字”字符：拉丁字母或数字或下划线 _。非拉丁字母（如西里尔字母或印地文）不属于 \w。

#### 反向类

对于**每个字符类，都有一个“反向类”，用相同的字母表示，但要以大写书写形式**。

- \D，非数字：除 \d 以外的任何字符，例如字母。
- \S，非空格符号：除 \s 以外的任何字符，例如字母。
- \W，非单字字符：除 \w 以外的任何字符，例如非拉丁字母或空格。

```js
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

#### 点（.）是匹配“任何字符”

点 . 是一种特殊字符类，它与 “除换行符之外的任何字符” 匹配。

```js
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
alert( "CS 4".match(regexp) ); // CS 4 (space is also a character)

// 请注意，点表示“任何字符”，而不是“缺少字符”。必须有一个与之匹配的字符：
alert( "CS4".match(/CS.4/) );
// null, no match because there's no character for the dot
```

#### 带有“s”标志时点字符类严格匹配任何字符

```js
alert( "A\nB".match(/A.B/) ); // null (no match)

// 如果我们希望用点来表示“任何字符”（包括换行符）时，可以使用s
alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
// 但s并不是所有的浏览器都支持，可以如下：
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (match!)
// 模式 [\s\S] 从字面上说：“空格字符或非空格字符”。换句话说，“任何东西”。
// 当然还可以，[\d\D]。甚至是 [^]
```

### Unicode：修饰符 “u” 和 class \p{...}

JavaScript 使用 Unicode 编码 （Unicode encoding）对字符串进行编码。大多数字符使用 2 个字节编码，但这种方式只能编码最多 65536 个字符。

这个范围不足以对所有可能的字符进行编码，这就是为什么一些罕见的字符使用 4 个字节进行编码，比如 𝒳 （数学符号 X）或者 😄 （笑脸），一些象形文字等等。

**很久以前，当 JavaScript 被发明出来的时候，Unicode 的编码要更加简单：当时并没有 4 个字节长的字符。所以，一部分语言特性在现在仍旧无法对 unicode 进行正确的处理**。比如：

```js
// 明明只有一个字符。。。
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

默认情况下，正则表达式同样把一个 4 个字节的“长字符”当成一对 2 个字节长的字符。正如在字符串中遇到的情况，这将导致一些奇怪的结果。

与字符串有所不同的是，正则表达式有一个修饰符 u 被用以解决此类问题。当一个正则表达式使用这个修饰符后，4 个字节长的字符将被正确地处理。同时也能够用上 **Unicode 属性（Unicode property）**来进行查找了。

#### Unicode 属性（Unicode properties）\p{…}

Unicode 中的**每一个字符都具有很多的属性**。它们**描述了一个字符属于哪个“类别”**，包含了各种关于字符的信息。

例如，如果一个字符具有 Letter 属性，这意味着这个字符归属于（任意语言的）一个字母表。而 Number 属性则表示这是一个数字：也许是阿拉伯语，亦或者是中文，等等。

我们可以查找具有某种属性的字符，写作 \p{…}。为了顺利使用 \p{…}，一个正则表达式必须使用修饰符 u。

举个例子，\p{Letter} 表示任何语言中的一个字母。我们也可以使用 \p{L}，**因为 L 是 Letter 的一个别名（alias）。对于每种属性而言，几乎都存在对应的缩写别名**。

在下面的例子中 3 种字母将会被查找出：英语、格鲁吉亚语和韩语。

```js
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null（没有匹配的文本，因为没有修饰符“u”）
```

有一个 unicode 属性 Script （一个书写系统），这个属性可以有一个值：Cyrillic，Greek，Arabic，Han （中文）等等.

为了实现查找一个给定的书写系统中的字符，我们需要使用 Script=`<value>`，例如对于西里尔字符：\p{sc=Cyrillic}, 中文字符：\p{sc=Han}，等等。

```js
let regexp = /\p{sc=Han}/gu; // returns Chinese hieroglyphs

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

表示货币的字符，例如 $，€，¥，具有 unicode 属性 \p{Currency_Symbol}，缩写为 \p{Sc}。

让我们使用这一属性来查找符合“货币，接着是一个数字”的价格文本：

```js
let regexp = /\p{Sc}\d/gu;

let  str = `Prices: $2, €1, ¥9`;

alert( str.match(regexp) ); // $2,€1,¥9
```

总结：

**修饰符 u 在正则表达式中提供对 Unicode 的支持**。

这意味着两件事：

- 4 个字节长的字符被以正确的方式处理：被看成单个的字符，而不是 2 个 2 字节长的字符。
- Unicode 属性可以被用于查找中 \p{…}。
- 有了 unicode 属性我们可以查找给定语言中的词，特殊字符（引用，货币）等等。

### 锚点（Anchors)：字符串开始 ^ 和末尾 $

插入符号 ^ 和美元符号 $ 在正则表达式中具有特殊的意义。它们被称为“锚点”。

插入符号 ^ 匹配文本开头，而美元符号 $ － 则匹配文本末尾。

锚点具有“零宽度”，**锚点 ^ 和 $ 属于测试。它们的宽度为零**。换句话来说，它们并不匹配一个具体的字符（其实就是不占用匹配的字符串），而是让正则引擎测试所表示的条件（文本开头/文本末尾）。

什么字符串可以匹配模式 ^$？
唯一一个匹配的字符串是空字符串：它的开始紧跟着结束。这个题目再一次说明了锚不是一个字符串，而是一个测试（其实就是空，不占用任何宽度，也就满足了题意）。对于空字符串 ""，正则表达式引擎将会首先匹配模式 ^（输入开始），匹配成功之后，会紧跟着检查模式 $，也匹配成功。所以空字符串是匹配 ^$ 的。

```js
/^$/.test(''); // true
/^$/.test('1'); // false
/^\d$/.test('1'); // true
```

### Flag "m" — 多行模式

通过 flag /.../m 可以开启多行模式。这仅仅会影响 ^ 和 $ 锚符的行为。在多行模式下，**它们不仅仅匹配文本的开始与结束，还匹配每一行的开始与结束**。

```js
// 默认情况下，锚符 ^ 仅仅匹配文本的开头，在多行模式下，它匹配行的开头。
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

alert( str.match(/^\d+/gm) ); // 1, 2, 33
alert( str.match(/^\d+/g) ); // 1


alert( str.match(/\w+$/gim) ); // Winnie,Piglet,Eeyore
alert( str.match(/\w+$/gi) ); // Eeyore
```

### 词边界：\b

词边界 \b 是一种检查，就像 ^ 和 $ 一样。

当正则表达式引擎（实现搜索正则表达式的程序模块）遇到 \b 时，它会检查字符串中的位置是否是词边界。其实就是检查单词的完整性。

```js
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)

// \b 既可以用于单词，也可以用于数字。
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
// 词边界 \b 不适用于非拉丁字母
```

### 转义，特殊字符

正如我们所看到的，一个反斜杠 "\" 是用来表示匹配字符类的。所以它是一个特殊字符。

还存在其它的特殊字符，这些字符在正则表达式中有特殊的含义。它们可以被用来做更加强大的搜索。

这里是包含所有特殊字符的列表：[ \ ^ $ . | ? * + ( )。

```js
// 原来{},]不需要转义啊。。。
/{/.test('{'); // true
/}/.test('}'); // true
// /[/.test('['); // Invalid regular expression: missing /
/]/.test(']'); // true

// 斜杠符号 '/' 并不是一个特殊符号，但是它被用于在 Javascript 中开启和关闭正则匹配：/...pattern.../，所以我们也应该转义它。
/\//.test('/'); // true
///.test('/'); // undefined

// 如果使用构造器，则不需要转义
"/".match(new RegExp("/"));  // /
(new RegExp("/")).test('/'); // true
```

#### 使用 new RegExp 创建正则实例

如果我们使用 new RegExp 来创建一个正则表达式实例，那么我们需要对其做一些额外的转义。

```js
let reg = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(reg) ); // null
```

它并没有正常发挥作用，但是为什么呢？

原因就在于字符串转义规则。看下面的例子：

```js
alert("\d\.\d");       // d.d
console.log("\d\.\d"); // d.d
```

在字符串中的反斜杠表示转义或者类似 \n 这种只能在字符串中使用的特殊字符。这个引用会“消费”并且解释这些字符，比如说：

- \n —— 变成一个换行字符，
- \u1234 —— 变成包含该码位的 Unicode 字符，
- 。。。其它有些并没有特殊的含义，就像 \d 或者 \z，碰到这种情况的话会把反斜杠移除。

所以调用 new RegExp 会获得一个没有反斜杠的字符串。

如果要修复这个问题，我们需要双斜杠，因为引用会把 \\ 变为 \：

```js
let regStr = "\\d\\.\\d";
alert(regStr); // \d\.\d (correct now)

let regexp = new RegExp(regStr);

alert( "Chapter 5.1".match(regexp) ); // 5.1
```

总结：

- 要在字面（意义）上搜索特殊字符 [ \ ^ $ . | ? * + ( )，我们需要在它们前面加上反斜杠 \（“转义它们”）。
- 如果我们在 /.../ 内部（但不在 new RegExp 内部），还需要转义 /。
- 传递一个字符串（参数）给 new RegExp 时，我们需要双倍反斜杠 \\，因为字符串引号会消费其中的一个。

### 集合和范围 [...]

在方括号 […] 中的几个字符或者字符类意味着**搜索给定的字符中的任意一个**。

#### 集合

比如说，[eao] 意味着查找在 3 个字符 'a'、'e' 或者 `‘o’ 中的任意一个。

这被叫做一个集合。集合可以在正则表达式中和其它常规字符一起使用。

```js
// 查找 [t 或者 m]，然后再匹配 “op”
alert( "Mop top tmop".match(/[tm]op/gi) ); // "Mop", "top" , 'mop'
```
**请注意尽管在集合中有多个字符，但它们在匹配中只会对应其中的一个**。

```js
// 查找 “V”，然后匹配 [o 或者 i]，之后再匹配 “la”
alert( "Voila".match(/V[oi]la/) ); // null，并没有匹配上
```

#### 范围

方括号也可以包含字符范围。

比如说，[a-z] 会匹配从 a 到 z 范围内的字母，[0-5] 表示从 0 到 5 的数字。

```js
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

[0-9A-F] 表示两个范围：它搜索一个字符，满足数字 0 到 9 或字母 A 到 F。

如果我们还想查找小写字母，则可以添加范围 a-f：[0-9A-Fa-f]。或添加标志 i。

- \d —— 和 [0-9] 相同，
- \w —— 和 [a-zA-Z0-9_] 相同，
- \s —— 和 [\t\n\v\f\r ] 外加少量罕见的 unicode 空格字符相同。

#### 排除范围

除了普通的范围匹配，还有类似 [^…] 的“排除”范围匹配，它会匹配所有除了给定的字符之外的任意字符。

- [^aeyo] —— 匹配任何除了 'a'、'e'、'y' 或者 'o' 之外的字符。
- [^0-9] —— 匹配任何除了数字之外的字符，也可以使用 \D 来表示。
- [^\s] —— 匹配任何非空字符，也可以使用 \S 来表示。

```js
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @  .
```

#### 在 […] 中不转义

```js

// 并不需要转义
let reg = /[[\\^$.|?*+()]/g;

conosole.log( "[[\^$.|?*+()]".match(reg) ); // ["[", "[", "^", "$", ".", "|", "?", "*", "+", "(", ")"]

// 但是如果你为了“以防万一”转义了它们，这也不会有任何问题：
//转义其中的所有字符
let reg = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(reg) ); // 仍能正常工作：+，-
```

#### 范围和标志u

如果集合中有代理对（surrogate pairs），则需要标志 u 以使其正常工作。

例如，让我们在字符串 𝒳 中查找 [𝒳𝒴]：

```js
alert( '𝒳'.match(/[𝒳𝒴]/) ); // 显示一个奇怪的字符，像 [?]
//（搜索执行不正确，返回了半个字符）
```

结果不正确，因为默认情况下正则表达式“不知道”代理对。

正则表达式引擎认为 [𝒳𝒴] —— 不是两个，而是四个字符：

```js
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

因此，以上示例查找并显示了 𝒳 的左半部分。

如果我们添加标志 u，那么行为将是正确的：

```js
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

当我们查找范围时也会出现类似的情况，就像 [𝒳-𝒴]。

如果我们忘记添加标志 u，则会出现错误：

```js
'𝒳'.match(/[𝒳-𝒴]/); // 错误：无效的正则表达式
```

原因是，没有标志 u 的代理对被视为两个字符，因此 [𝒳-𝒴] 被解释为 [<55349><56499>-<55349><56500>]（每个代理对都替换为其代码）。现在很容易看出范围 56499-55349 是无效的：其起始代码 56499 大于终止代码 55349。这就是错误的原因。

```js
// 查找字符从 𝒳 到 𝒵
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```

```js
let reg = /\b\d\d[-:]\d\d\b/g;
alert( "Breakfast at 09:00. Dinner at 21-300".match(reg) ); // 09:00
```
请注意，破折号 '-' 在方括号中有特殊含义，但这个含义只有当它位于其它字符之间而不是开头或结尾时才会发生作用，所以我们并不需要转义它。

### 量词 `+,*,?` 和 `{n}`

数量 {n}：最明显的量词便是一对引号间的数字：{n}。在一个字符（或一个字符类等等）后跟着一个量词，用来指出我们具体需要的数量。

- \d{5} 表示 5 位的数字，如同 \d\d\d\d\d。
- 某个范围的位数：{3,5}
- 我们可以省略上限。那么正则表达式 \d{3,} 就会查找位数大于或等于 3 的数字：

#### 缩写

大多数常用的量词都可以有缩写：

- `+` 代表“一个或多个”，相当于 {1,}。
- ?，代表“零个或一个”，相当于 {0,1}。换句话说，它使得符号变得可选。
- *，代表着“零个或多个”，相当于 {0,}。也就是说，这个字符可以多次出现或不出现。

```js
let str = "Should I write color or colour?";

alert( str.match(/colou?r/g) ); // color, colour

alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
alert( "100 10 1".match(/\d0+/g) ); // 100, 10
```

### 贪婪量词和惰性量词

量词，看上去十分简单，但实际上它可能会很棘手。

如果我们打算寻找比 /\d+/ 更加复杂的东西，就需要理解搜索工作是如何进行的。

比如你想匹配两个双引号之间的字符：

```js
let reg = /".+"/g;

let str = 'a "witch" and her "broom" is one';

// 结果却不是想要的。。。
alert( str.match(reg) ); // "witch" and her "broom"
```

这就是“贪婪是万恶之源”。

#### 贪婪搜索

为了查找到一个匹配项，正则表达式引擎采用了以下算法：

- 对于字符串中的每一个字符
  - 用这个模式来匹配此字符。
  - 若无匹配，移至下一个字符

整个过程如下:
1. 该模式的第一个字符是一个引号 "。正则表达式引擎企图在字符串第一个位置就匹配到目标。。。但失败，最终在第三个位置匹配到了引号
2. 检测到了引号后，引擎就尝试去匹配模式中的剩余字符。它试图查看剩余的字符串主体是否符合 .+"。在我们的用例中，模式中的下一个字符为 .（一个点）。它表示匹配除了换行符之外的任意字符，所以将会匹配下一个字符 'w'：
3. 然后因为量词 .+，模式中的点（.）将会重复。因为点（.）能够匹配所有字符，所以只有在移至字符串末尾时才停止匹配，也就是全部字符串
4. 现在引擎完成了对重复模式 .+ 的搜索，并且试图寻找模式中的下一个字符。这个字符是引号 "。但还有一个问题，对字符串的遍历已经结束，已经没有更多的字符了！正则表达式引擎明白它已经为 .+ 匹配了太多项了，所以开始回溯了。
5. 回溯也就是挨个去掉上一步匹配项的最后一位，然后尝试和引号匹配
6. 擎不断进行回溯：它减少了 '.' 的重复次数，直到模式的其它部分，这里也就是引号匹配上
7. 回溯到broom"处，匹配成功。。。接下来的搜索的起点位于第一次搜索的终点，但在 is one 中没有更多的引号了，所以没有其它的结果了。

这可能不是我们所想要的，但这就是它的工作原理。

**在贪婪模式下（默认情况下），量词都会尽可能地重复多次。正则表达式引擎尝试用 .+ 去获取尽可能多的字符，然后再一步步地筛选它们。**

#### 懒惰模式

懒惰模式中的量词与贪婪模式中的是相反的。它想要“重复最少次数”。

我们**能够通过在量词之后添加一个问号 '?' 来启用它**，所以匹配模式变为 *? 或 +?，甚至将 '?' 变为 ??。

这么说吧：通常，一个问号 ? 就是一个它本身的量词（0 或 1），但如果添加另一个量词（甚至可以是它自己），就会有不同的意思 —— 它将匹配的模式从贪婪转为懒惰。

```js
let reg = /".+?"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(reg) ); // witch, broom
```

然后整个过程如下：

1. 第一步依然相同：它在第三个位置开始 "
2. 下一步也是类似的：引擎为 '.' 找到了一个匹配项：w
3. 接下来就是搜索过程出现不同的时候了。因为我们对 +? 启用了懒惰模式，引擎不会去尝试多匹配一个点，并且开始了对剩余的 " 的匹配，如果有一个引号，搜索就会停止，但是有一个 'i'，所以没有匹配到引号。
4. 接着，正则表达式引擎增加对点的重复搜索次数，并且再次尝试，又失败了。然后重复次数一次又一次的增加…
5. 直到模式中的剩余部分找到匹配项
6. 接下来的搜索工作从当前匹配结束的那一项开始，就会再产生一个结果

#### 替代方法

在正则表达式中，通常有多种方法来达到某个相同目的。

```js
let reg = /"[^"]+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(reg) ); // witch, broom
```

请注意，这个逻辑并不能取代惰性量词！

```js
// 例如，我们想要找到 <a href="..." class="doc"> 形式的链接，或是任意 href。
// 首先可能会想到：/<a href=".*" class="doc">/g。

let str = '...<a href="link" class="doc">...';
let reg = /<a href=".*" class="doc">/g;

// Works!
alert( str.match(reg) ); // <a href="link" class="doc">

// 如果多个链接呢？
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let reg = /<a href=".*" class="doc">/g;

// Whoops! Two links in one match!
alert( str.match(reg) ); // <a href="link1" class="doc">... <a href="link2" class="doc">
// 现在这个结果和我们的 “witches” 用例结果的错误原因是一样的。量词 .* 占用太多字符了。
// 具体参考：https://zh.javascript.info/regexp-greedy-and-lazy
```

```js
// 题：
"123 456".match(/\d+? \d+?/g); // 123 4
// \d+?是惰性匹配，匹配到1后，接下来应该匹配空格，但没匹配到
// 继续向下匹配。。。直到匹配到空格，然后是4，然后就结束了

// 匹配注释
// 首先想到的是 <!--.*?-->，但 . 无法匹配换行符
let reg = /<!--[\s\S]*?-->/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

alert( str.match(reg) ); // '<!-- My -- comment \n test -->', '<!---->'

// 匹配标签
let reg = /<[^<>]+>/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(reg) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

### 捕获组

模式的一部分可以用括号括起来 (...)。这称为“捕获组（capturing group）”。

这有两个影响：

- 它允许将匹配的一部分作为结果数组中的单独项。
- 如果我们将量词放在括号后，则它将括号视为一个整体。

不带括号，模式 go+ 表示 g 字符，其后 o 重复一次或多次。例如 goooo 或 gooooooooo。

括号将字符组合，所以 (go)+ 匹配 go，gogo，gogogo等。

```js
// 匹配域名
 "site.com my.site.com".match(/((\w+)\.?)+/g); // site.com,my.site.com
 "site.com my.site.com".match(/(\w+\.)+\w+/g); // site.com,my.site.com

//  还可以增加匹配 - 的
 "site.com my-site.com".match(/([\w-]+\.)+\w+/g); // site.com,my-site.com

//  匹配邮箱（并不完美的，但多数情况下都可以工作，）
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
```

#### 匹配括号中的内容

括号从左到右编号。正则引擎会记住它们各自匹配的内容，并允许在结果中获得它。

方法 str.match(regexp)，如果 regexp 没有 g 标志，将查找第一个匹配并将它作为一个数组返回：

- 在索引 0 处：完全匹配。就是匹配到的整个字符串
- 在索引 1 处：第一个括号的内容。
- 在索引 2 处：第二个括号的内容。
- …等等…

```js
let str = '<h1>Hello, world!</h1>';

let tag = str.match(/<(.*?)>/); // 没有g

alert( tag[0] ); // <h1>，就是匹配的整个字符串
alert( tag[1] ); // h1
```

#### 嵌套组

括号可以嵌套。在这种情况下，编号也从左到右。

```js
let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"
```

#### 可选组

即使组是可选的并且在匹配项中不存在，也存在相应的 result 数组项，并且等于 undefined。

```js
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
alert( match[0] ); // a（完全匹配）
alert( match[1] ); // undefined，虽然没有匹配，但是有结果
alert( match[2] ); // undefined
```

```js
let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac（完全匹配）
alert( match[1] ); // undefined，因为 (z)? 没匹配项
alert( match[2] ); // c
```

#### 搜索所有具有组的匹配项：matchAll

当我们搜索所有匹配项（标志 g）时，match 方法不会返回组的详细内容。

但是实际上，我们通常需要在结果中获取捕获组的内容。

要获取它们，我们应该使用方法 str.matchAll(regexp) 进行搜索。

- 它返回的不是数组，而是一个可迭代的对象。
- 当标志 g 存在时，它将每个匹配组作为一个数组返回。
- 如果没有匹配项，则不返回 null，而是返回一个空的可迭代对象。

```js
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

// results - is not an array, but an iterable object
alert(results); // [object RegExp String Iterator]

alert(results[0]); // undefined (*)

results = Array.from(results); // let's turn it into array

alert(results[0]); // <h1>,h1 (1st tag)
alert(results[1]); // <h2>,h2 (2nd tag)

// 当然也可以遍历
for(let result of results) {
  alert(result);
  // 第一个结果: <h1>,h1
  // 第二个结果: <h2>,h2
}

// 解构
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
```

为什么 matchAll 的结果是可迭代对象而不是数组？

为什么这个方法这样设计？原因很简单 — 为了优化。

调用 matchAll 不会执行搜索。相反，它返回一个可迭代的对象，最初没有结果。每当我们对它进行迭代时才会执行搜索，例如在循环中。

因此，这将根据需要找到尽可能多的结果，而不是全部。

例如，文本中可能有 100 个匹配项，但是在一个 for..of 循环中，我们已经找到了 5 个匹配项，然后觉得足够了并做出一个 break。这时引擎就不会花时间查找其他 95 个匹配。

#### 命名组

用数字记录组很困难。对于简单模式，它是可行的，但对于更复杂的模式，计算括号很不方便。我们有一个更好的选择：给括号起个名字。

这是通过在开始括号之后立即放置 `?<name>` 来完成的。

例如，让我们查找 “year-month-day” 格式的日期：

```js
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
let str = "2019-04-30";

// 如您所见，匹配的组在 .groups 属性中。
let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30
```

#### 替换捕获组

方法 str.replace(regexp, replacement) 用 replacement 替换 str 中匹配 regexp 的所有捕获组。这使用 $n 来完成，其中 n 是组号。

```js
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```

对于命名括号，引用为 `$<name>`。

例如，让我们将日期格式从 “year-month-day” 更改为 “day.month.year”：

```js
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
```

#### 非捕获组 ?:

有时我们需要括号才能正确应用量词，但我们**不希望它们的内容出现在结果中**。

可以通过在开头添加 ?: 来排除组。

例如，如果我们要查找 (go)+，但不希望括号内容（go）作为一个单独的数组项，则可以编写：(?:go)+。

在下面的示例中，我们仅将名称 John 作为匹配项的单独成员：

```js
let str = "Gogogo John!";

// ?: 从捕获组中排除 'go'
let regexp = /(?:go)+ (\w+)/i;

let result = str.match(regexp);

alert( result[0] ); // Gogogo John（完全匹配）
alert( result[1] ); // John
alert( result.length ); // 2（数组中没有更多项）
```

#### 模式中的反向引用：\N 和 \k<name>

我们需要找到带引号的字符串：单引号 '...' 或双引号 "..."– 应匹配两种变体。

如何找到它们？

我们可以将两种引号放在方括号中：['"](.*?)['"]，但它会找到带有混合引号的字符串，例如 "...' 和 '..."。当一种引号出现在另一种引号内，比如在字符串 "She's the one!" 中时，便会导致不正确的匹配：

```js
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

// 不是我们想要的结果
alert( str.match(regexp) ); // "She'
```

如我们所见，该模式找到了一个开头的引号 "，然后文本被匹配，直到另一个引号 '，该匹配结束。

为了确保模式查找的结束引号与开始的引号完全相同，我们可以将其包装到捕获组中并对其进行反向引用：(['"])(.*?)\1。

这是正确的代码：

```js
let str = `He said: "She's the one!".`;

let regexp = /(['"])(.*?)\1/g;

alert( str.match(regexp) ); // "She's the one!"
```
现在可以了！正则表达式引擎会找到第一个引号 (['"]) 并记住其内容。那是第一个捕获组。

\1 在模式中进一步的含义是“查找与第一（捕获）分组相同的文本”，在我们的示例中为完全相同的引号。

与此类似，\2 表示第二（捕获）分组的内容，\3 – 第三分组，依此类推。

**按命名反向引用：`\k<name>`**

```js
// 还可以使用名字来前后匹配
let str = `He said: "She's the one!".`;

let regexp = /(?<quote>['"])(.*?)\k<quote>/g;

alert( str.match(regexp) ); // "She's the one!"
```

### 选择

选择是正则表达式中的一个术语，实际上是一个简单的“或”。

在正则表达式中，它用竖线 | 表示。

我们已知的一个相似符号 —— 方括号。就允许在许多字符中进行选择，例如 gr[ae]y 匹配 gray 或 grey。

**选择符号并非在字符级别生效，而是在表达式级别**。正则表达式 A|B|C 意思是命中 A、B 或 C 其一均可。

- gr(a|e)y 严格等同 gr[ae]y。
- gra|ey 匹配 “gra” or “ey”。

#### 时间正则表达式

简单的 \d\d:\d\d 过于模糊。它同时匹配 25:99。。。

```js
// 选择符 | 在 [01]\d 和 2[0-3]:[0-5]\d 之间
// 这是错误的，因为它只匹配符号左侧或右侧任一表达式。
// let reg = /[01]\d|2[0-3]:[0-5]\d/g; // wrong
let reg = /([01]\d|2[0-3]):[0-5]\d/g; // right

alert("12".match(reg)); // 12 (matched [01]\d)
```

务必注意：选择符号，只会匹配一个。。。

### 前瞻断言与后瞻断言

有时候我们需要匹配后面跟着特定模式的一段模式。比如，我们要从 1 turkey costs 30€ 这段字符中匹配价格数值。

我们需要获取 € 符号前面的数值（假设价格是整数）。

那就是前瞻断言要做的事情。

#### 前瞻断言

语法为：x(?=y)，它表示 “匹配 x, 仅在后面是 y 的情况"”

```js
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=€)/) ); // 30 （正确地跳过了单个的数字 1）
```

这次我们想要一个数量，它是一个不被 € 跟着的数值。

这里就要用到前瞻否定断言了。

语法为：x(?!y)，意思是 “查找 x, 但是仅在不被 y 跟随的情况下匹配成功”。

```js
let str = "2 turkeys cost 60€";

alert( str.match(/\d+(?!€)/) ); // 2（正确地跳过了价格）
```

#### 后瞻断言

前瞻断言允许添加一个“后面要跟着什么”的条件判断。

后瞻断言也是类似的，只不过它是在相反的方向上进行条件判断。也就是说，它只允许匹配前面有特定字符串的模式。

语法为:

- 后瞻肯定断言：(?<=y)x, 匹配 x, 仅在前面是 y 的情况。
- 后瞻否定断言：(?<!y)x, 匹配 x, 仅在前面不是 y 的情况。

```js
let str = "1 turkey costs $30";

alert( str.match(/(?<=\$)\d+/) ); // 30 （跳过了单个的数字 1）
alert( str.match(/(?<!\$)\d+/) ); // 1 (跳过了价格)
```

#### 捕获组

在前面的断言中，断言中的内容，都没有作为结果返回。。。但如果想要返回呢？

例如：在模式 \d+(?!€) 中，€ 符号就不会出现在匹配结果中。

但是如果我们想要捕捉整个环视表达式或其中的一部分，那也是有可能的。只需要将其包裹在另加的括号中。

例如，这里货币符号 (€|kr) 和金额一起被捕获了：

```js
let str = "1 turkey costs 30€";
let reg = /\d+(?=(€))/; // € 两边有额外的括号

alert( str.match(reg) ); // 30, €
```

### 正则表达式（RegExp）和字符串（String）的方法

#### str.match(regexp)
#### str.matchAll(regexp)
#### str.split(regexp|substr, limit)

```js
alert('12-34-56'.split('-')) // 数组 ['12', '34', '56']
alert('12, 34, 56'.split(/,\s*/)) // 数组 ['12', '34', '56']
```
#### str.search(regexp)

str.search(regexp) 返回第一个匹配项的位置，如果未找到，则返回 -1：

重要限制：search 仅查找第一个匹配项。





[nullandundefined(阮一峰)]: http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html "阮一峰"
[ieee_754url]: https://zh.wikipedia.org/wiki/IEEE_754 "维基百科"
[minusoperatorurl]: http://www.wenjiangs.com/article/javascript-string-number.html "减号运算符"
[addoperatorurl]: https://www.w3cplus.com/javascript/javascriptss-addition-operator-demystified.html "加号运算符"
[sysconverturl]: http://www.cnblogs.com/gaizai/p/4233780.html "任意进制转换"
[date&timefunurlmdn]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date "获取时间的一些方法"
[jssecretgardenurl]: https://bonsaiden.github.io/JavaScript-Garden/zh/ "js秘密花园"
[axiosanddatechangeurl]: https://blog.csdn.net/qq_35246620/article/details/95644327 "axios关于时间对象转换"
