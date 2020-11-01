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

例如，如果你点击 <button>，这里的 body.onclick 不会工作：

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

例如，在 <input> 字段上的 mousedown 会导致在其中获得焦点，以及 focus 事件。如果我们阻止 mousedown 事件，在这就没有焦点了。

尝试点击下面的第一个 <input> —— 会发生 focus 事件。但是如果你点击第二个，则没有聚焦。

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

[nullandundefined(阮一峰)]: http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html "阮一峰"
[ieee_754url]: https://zh.wikipedia.org/wiki/IEEE_754 "维基百科"
[minusoperatorurl]: http://www.wenjiangs.com/article/javascript-string-number.html "减号运算符"
[addoperatorurl]: https://www.w3cplus.com/javascript/javascriptss-addition-operator-demystified.html "加号运算符"
[sysconverturl]: http://www.cnblogs.com/gaizai/p/4233780.html "任意进制转换"
[date&timefunurlmdn]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date "获取时间的一些方法"
[jssecretgardenurl]: https://bonsaiden.github.io/JavaScript-Garden/zh/ "js秘密花园"
[axiosanddatechangeurl]: https://blog.csdn.net/qq_35246620/article/details/95644327 "axios关于时间对象转换"
