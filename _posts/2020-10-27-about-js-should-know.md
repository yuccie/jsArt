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

它适用于 NaN：Object.is（NaN，NaN）=== true，这是件好事。
值 0 和 -0 是不同的：Object.is（0，-0）=== false，从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。
在所有其他情况下，Object.is(a，b) 与 a === b 相同。

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
  - HTMLInputElement — \<input> 元素的类，
  - HTMLBodyElement — <body> 元素的类，
  - HTMLAnchorElement — <a> 元素的类，
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




[nullandundefined(阮一峰)]: http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html "阮一峰"
[ieee_754url]: https://zh.wikipedia.org/wiki/IEEE_754 "维基百科"
[minusoperatorurl]: http://www.wenjiangs.com/article/javascript-string-number.html "减号运算符"
[addoperatorurl]: https://www.w3cplus.com/javascript/javascriptss-addition-operator-demystified.html "加号运算符"
[sysconverturl]: http://www.cnblogs.com/gaizai/p/4233780.html "任意进制转换"
[date&timefunurlmdn]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date "获取时间的一些方法"
[jssecretgardenurl]: https://bonsaiden.github.io/JavaScript-Garden/zh/ "js秘密花园"
[axiosanddatechangeurl]: https://blog.csdn.net/qq_35246620/article/details/95644327 "axios关于时间对象转换"
