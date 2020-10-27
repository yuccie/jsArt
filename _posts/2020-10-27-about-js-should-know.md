---
layout: post
title: 关于javascript你需要知道的
date: Fri May 10 2019 17:25:55 GMT+0800 (中国标准时间)
---

> 写在前面：平时开发中总是遇见相同的问题，但很多时候都需要重新查找相关资料才可以，不但浪费了时间，而且每次都有种重新开始的感觉。。。因此将这些常见问题总结在一起，后续再有相关问题，都将其归为一类进行总结对比学习。

### **参考资料**

[参考 js 秘密花园][jssecretgardenurl]、JavaScript 高级程序设计、你不知道的 JavaScript 系列、

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


[nullandundefined(阮一峰)]: http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html "阮一峰"
[ieee_754url]: https://zh.wikipedia.org/wiki/IEEE_754 "维基百科"
[minusoperatorurl]: http://www.wenjiangs.com/article/javascript-string-number.html "减号运算符"
[addoperatorurl]: https://www.w3cplus.com/javascript/javascriptss-addition-operator-demystified.html "加号运算符"
[sysconverturl]: http://www.cnblogs.com/gaizai/p/4233780.html "任意进制转换"
[date&timefunurlmdn]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date "获取时间的一些方法"
[jssecretgardenurl]: https://bonsaiden.github.io/JavaScript-Garden/zh/ "js秘密花园"
[axiosanddatechangeurl]: https://blog.csdn.net/qq_35246620/article/details/95644327 "axios关于时间对象转换"
