---
layout: post
title: Promise解析
date: Fri May 10 2019 17:25:32 GMT+0800 (中国标准时间)
---

一直以来，自己都对 promise 的理解模模糊糊，接下来我想仔细研究一番

#### 1、Promise 含义

#### 2、Promise 基本用法

ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

特点：

1. Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
2. resolve 函数的作用是，将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在**异步操作成功时调用，并将异步操作的结果，作为参数传递出去**；
3. reject 函数的作用是，将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在**异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去**。


**Promise 实例生成以后，可以用 then 方法分别指定 resolved 状态和 rejected 状态的回调函数。**

```js
promise.then(
  function(value) {
    // success
  },
  function(error) {
    // failure
  }
);
```

then 方法可以接受**两个回调函数**作为参数。第一个回调函数是 Promise 对象的状态变为 resolved 时调用，第二个回调函数是 Promise 对象的状态变为 rejected 时调用。其中，**第二个函数是可选的**，不一定要提供。这两个函数都接受 Promise 对象传出的值作为参数。

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    console.log("立即执行");
    // 除了前两个参数，setTimeout允许有多个参数，他们将作为参数被传入回调
    setTimeout(resolve, ms, "done");
  });
}
// 执行timeout()时，实例化Promise()立即执行，因此“立即执行”会立刻打印出来
timeout(10000).then(value => {
  console.log(value);
});
```

上面代码中，timeout 方法返回一个 Promise 实例，表示一段时间以后才会发生的结果。过了指定的时间（ms 参数）以后，Promise 实例的状态变为 resolved，就会触发 then 方法绑定的回调函数。

```js
let promise = new Promise(function(resolve, reject) {
  console.log("Promise");
  resolve();
});
promise.then(function() {
  console.log("resolved.");
});
console.log("Hi!");

// Promise
// Hi!
// resolved
```

上面代码中，Promise 新建后立即执行，所以首先输出的是 Promise。然后，**then 方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行**，所以 resolved 最后输出。

来看一个异步加载图片的例子

```js
function loadImgAsync(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error("could not load img at " + url));
    };
    img.src = url;
  });
}
```

上面代码中，使用 Promise 包装了一个图片加载的异步操作。如果加载成功，就调用 resolve 方法，否则就调用 reject 方法。

再来看一个 Promise 实现的 ajax 操作的例子

```js
const getJSON = url => {
  const promise = new Promise((resolve, reject) => {
    // 定义一个函数处理逻辑
    const handler = () => {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
  // 这里再命名返回
  return promise;
};

getJSON("/posts.json").then(
  json => {
    console.log(`contens: ${json}`);
  },
  err => {
    console.error("出错了", err);
  }
);
```

上面代码中，getJSON 是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个 Promise 对象。需要注意的是，在 getJSON 内部，resolve 函数和 reject 函数调用时，都带有参数。

如果调用 resolve 函数和 reject 函数时带有参数，那么它们的参数会被传递给回调函数。reject 函数的参数通常是 Error 对象的实例，表示抛出的错误；resolve 函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

```js
const p1 = new Promise((resolve, reject) => {
  // TODO
});
const p2 = new Promise((resolve, reject) => {
  // TODO
  resolve(p1);
});
```

上面代码中，p1 和 p2 都是 Promise 的实例，但是 p2 的 resolve 方法将 p1 作为参数，即一个异步操作的结果是返回另一个异步操作。

**注意，**这时 p1 的状态就会传递给 p2，也就是说，p1 的状态决定了 p2 的状态。如果 p1 的状态是 pending，那么 p2 的回调函数就会等待 p1 的状态改变；如果 p1 的状态已经是 resolved 或者 rejected，那么 p2 的回调函数将会立刻执行。

```js
var p1 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("fail")), 3000);
});
var p2 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(p1), 1000);
});
p2.then(result => console.log("res", result)).catch(error =>
  console.log("err", error)
);
// 因为p1回调的结果是reject，因此p2的状态也会是reject，因此触发catch
// err Error: fail
```

上面代码中由于 p2 返回的是另外一个 promise，因此 p2 的状态将由 p1 的状态决定，当 p1 一直是 pending，则 p2 也处于 pending 状态。当 p1 是确定的 resolve 或 reject，p2 的回调会立即执行(这里因为 p2 的定时器是 1 秒，再等待 p1 定时器结束)，只是将 p1 回调的结果传递出去，同时 p2 的状态由 p1 的状态来确定。。。

如果不写`p2.then().catch()`,也会打印错误，只不过是`Uncaught (in promise) Error: fail`。未捕获的错误

**注意**调用 resolve 或 reject 并不会终结后面函数体的执行。

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

上面代码中，调用 resolve(1)以后，后面的 console.log(2)还是会执行，并且会首先打印出来。这是因为**立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务**。一般来说，调用 resolve 和 reject 之后，promise 的使命就完成了，后继操作应该放到 then 里面，而不是在他们之后，因此最好添加 return 如下

```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
});
```

#### 3、Promise.prototype.then()

Promise 实例具有 then 方法，也就是说，**then 方法是定义在原型对象 Promise.prototype 上的**。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。

then **方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）**。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。

```js
getJSON("/posts.json")
  .then(function(json) {
    return json.post;
  })
  .then(function(post) {
    // ...
  });
```

上面的代码使用 then 方法，依次指定了两个回调函数，第一个回调函数完成之后，会将返回结果作为参数，传入第二个回调函数。

采用链式的 then，可以指定一组按照次序调用的回调函数。这时，**前一个回调函数，有可能返回的还是一个 Promise 对象（即有异步操作），这时后一个回调函数，就会等待该 Promise 对象的状态发生变化，才会被调用**。

```js
getJSON("/post/1.json")
  .then(function(post) {
    return getJSON(post.commentURL);
  })
  .then(
    function funcA(comments) {
      console.log("resolved: ", comments);
    },
    function funcB(err) {
      console.log("rejected: ", err);
    }
  );
```

上面代码中，第一个 then 方法指定的回调函数，返回的是另一个 Promise 对象。这时，第二个 then 方法指定的回调函数，就会等待这个新的 Promise 对象状态发生变化。如果变为 resolved，就调用 funcA，如果状态变为 rejected，就调用 funcB。
如果使用箭头函数则更简洁为：

```js
getJSON("/post/1.json")
  .then(post => getJSON(post.commentURL))
  .then(
    comments => console.log("resolved: ", comments),
    err => console.log("rejected: ", err)
  );
```

#### 4、Promise.prototype.catch()

Promise.prototype.catch 方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。这个**回调函数不但可以捕获 reject 抛出的错误，还可以捕获之前回调函数内部的运行错误，因此一般将 catch 写在最后用来捕获上面所有回调可能发生的错误**。。。如下三种方式等价：

```js
// 方式一
const promise = new Promise(function(resolve, reject) {
  throw new Error("test");
});
promise.catch(function(error) {
  console.log(error);
});
// Error: test

// 方式二
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error("test");
  } catch (e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 方式三
const promise = new Promise(function(resolve, reject) {
  reject(new Error("test"));
});
promise.catch(function(error) {
  console.log(error);
});
```

这里其实 reject 方法的作用等同于抛出错误

**注意点**，如果 Promise 的状态已经变成 resolve，再抛出错误是无效的，因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

```js
const promise = new Promise(function(resolve, reject) {
  // 同样，如果先抛出错误，则resolve也失效
  resolve("ok");
  throw new Error("test");
});
promise
  .then(function(value) {
    console.log(value);
  })
  .catch(function(error) {
    console.log(error);
  });
// ok
```

**注意点**，Promise 内部的错误即使没有被捕获，也不会影响 Promise 之外的代码执行，但会阻断 promise 内部之后的代码，如下

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
    // 下面一行不会打印
    console.log("不会打印我");
  });
};

someAsyncThing().then(function() {
  console.log("everything is great");
});

setTimeout(() => {
  console.log(123);
}, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

**注意点**，如果 Promise 指定在下一轮"事件循环"再抛出错误，因为此时 promise 运行已经结束，所以这个错误是在 promise 函数体外部抛出的，会冒泡到最外层，成了未捕获的错误，因此，一般总是建议在 promise 对象后跟 catch 方法；

```js
const promise = new Promise(function(resolve, reject) {
  resolve("ok");
  setTimeout(function() {
    throw new Error("test");
  }, 0);
});
promise.then(function(value) {
  console.log(value);
});
// ok
// Uncaught Error: test
```

**注意点**，如果有多个 catch，则最后一个 catch 捕获错误，如下：

```js
someAsyncThing()
  .then(function() {
    return someOtherAsyncThing();
  })
  .catch(function(error) {
    console.log("oh no", error);
    // 下面一行会报错，因为y没有声明
    y + 2;
  })
  .catch(function(error) {
    console.log("carry on", error);
  });
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
```

#### 5、Promise.prototype.finally()

finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

上面代码中，不管 promise 最后的状态，在执行完 then 或 catch 指定的回调函数以后，都会执行 finally 方法指定的回调函数。

**注意点**，finally 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是 fulfilled 还是 rejected。这表明，finally 方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。**而是总会返回原来的值**，如下是其实现：

```js
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};
```

从上面的实现可以看出，finally 方法总是返回原来的值，其实下面代码的意思是说，使用 finally 后，可以只写一个回调，因为不管是 resolve 还是 reject，都会执行 finally 里的回调，而且回调不接收任何参数。

```js
// resolve 的值是 undefined
// 会打印 success 2
Promise.resolve(2).then(
  val => {
    console.log("success", val);
  },
  () => {}
);

// resolve 的值是 2
// 会打印 val undefined,因为finally不接受任何参数，返回的也是上一个回调
Promise.resolve(2).finally(val => {
  console.log("val", val);
});

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {});

// reject 的值是 3
Promise.reject(3).finally(() => {});

// reject 的值是 3，执行完finally后，依然可以继续then
Promise.reject(3)
  .finally(() => {})
  .then(
    () => {},
    val => {
      console.log("val", val);
    }
  ); // 'val' 3
```

#### 6、Promise.all()

该方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。接受一个数组作为参数（可以不是数组，但必须具有 Iterator 接口，且返回的成员必须是 Promise 实例），假如参数不是 Promise 实例，会调用 Promise.resolve 方法将参数转为 Promise 实例，再进一步处理。

```js
const p = Promise.all([p1, p2, p3]);
```

注意：其实 Promise.resolve(2) 等价于 new Promise( resolve => resolve(2))

此时 p 的状态，根据这三者来确定，

1. 当所有参数实例状态都为 resolved，则 p 才为 resolved，此时 p1,p2,p3 的返回值组成一个数组，传递给 p 的回调函数。
2. 只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

**注意：**如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦是 rejected，并不会触发 Promise.all()的 catch 方法。但是由于 p2 有自己的 catch 方法，而返回的实例又是新的 Promise 实例，因此该实例执行完本身的 catch 方法后，也会变成 resolved，导致 Promise.all([p1,p2])总的状态为 resolved，因此不会调用 Promise.all([p1,p2]).then().catch()的 catch 方法

```js
const p1 = new Promise((resolve, reject) => {
  resolve("hello");
})
  .then(result => result)
  .catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error("报错了");
})
  .then(result => result)
  .catch(e => e);

Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(e => console.log(e));
// ["hello", Error: 报错了]
```

#### 7、迭代器 Iterator,Iterable 和 Gennerator

对于集合中每个元素进行处理是很常见的操作，比如操作数组遍历，对象的属性遍历。以往的操作是通过 for 循环，forEach,map 等方式。同时提供定制 for...of 的机制。 借由迭代器机制为 Map、Array、String 等对象**提供了统一的遍历语法**，以及**更方便的相互转换（不同数据类型转换）**。 为**方便编写迭代器还提供了生成器（Generator）**语法。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 遍历器过程：

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。其中，value 属性是当前成员的值，done 属性是一个布尔值，表示遍历是否结束。如下：

```js
var it = makeIterator(["a", "b"]);

it.next(); // { value: "a", done: false }
it.next(); // { value: "b", done: false }
it.next(); // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true };
    }
  };
}

// 手写一个迭代器
function makeIterator(arr) {
  let nextIdx = 0;
  // 返回一个对象，对象里有个next方法
  return {
    next: function() {
      // 每次执行next，都会返回当前成员的value以及一个布尔值
      return nextIndex < arr.length
      ? { value: arr[nextIndex++], done: false }
      : { value: undefined, done: true }
    }
  }
}
```

其实上面 makeIterator 函数，就是一个遍历器生成函数，作用是返回一个遍历器对象，也就是指针对象。指针对象的 next 方法，用来移动指针。从上也可以知道，数据结构与遍历器其实是可以分开的，也就是说对于不具有遍历功能的对象添加遍历器对象之后，就可以遍历了

**综上**Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即 for...of 循环（详见下文）。当使用 for...of 循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是"可遍历的"（iterable）

ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说一个数据结构只要具有 Symbol.iterator 属性，就认为是可以遍历的。Symbol.iterator 属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名 Symbol.iterator，它是一个表达式，返回 Symbol 对象的 iterator 属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内

如下实现一个 50 以内的斐波那契额数列：

```js
let obj = {
  [Symbol.iterator]() {
    let a = 0,
      b = 0;
    return {
      next() {
        let value = 0;
        if (!a) {
          value = a = 1;
        } else if (!b) {
          value = b = 1;
        } else if (b < 50) {
          value = a + b;
          a = b;
          b = value;
        }
        return { done: value === 0, value };
      }
    };
  }
};
for (let i of obj) {
  console.log(i); // 1 1 2 3 5 8 13 21 34 55
}
```

上面的 obj 因为有了 Symbol.iterator 属性，因此是可以遍历的，所以 for...of 可以打印出来。
直接调用 obj[Symbol.iterator]()会返回一个迭代器对象，然后再调用这个对象上的 next 方法，可以打印迭代器的每个成员。

#### Gennerator

```js
var x = 1;
// function* foo(){}、function *foo(){}、function*foo(){}功能与语法都相同
function* foo() {
  x++;
  console.log("x:", x);
  yield; // 暂停!
  bar();
  console.log("x:", x);
}
function bar() {
  x++;
}

var it = foo();
it.next();
// x: 2
// {value: undefined, done: false}
it.next();
// x: 3
// {value: undefined, done: true}
```

(1) it = foo() 运算并没有执行生成器 *foo()，而只是构造了一个迭代器(iterator)，这个 迭代器会控制它的执行。后面会介绍迭代器。
(2) 第一个 it.next() 启动了生成器 *foo()，并运行了 *foo() 内的 x++, console.log("x:", x)。
(3) *foo() 在 yield 语句处暂停，在这一点上第一个 it.next() 调用结束。此时 *foo() 仍
在运行并且是活跃的，但处于暂停状态。
(4) 我们查看 x 的值，此时为 2。
(5) 我们调用 bar()，它通过 x++ 再次递增 x。
(6) 我们再次查看 x 的值，此时为 3。
(7) 最后的 it.next() 调用从暂停处恢复了生成器 *foo() 的执行，并运行 bar(), console.log(..)
语句，这条语句使用当前 x 的值 3。

生成器函数是一个特殊的函数，具有上面新的执行方式，同时，它仍然是一个函数，这意味着它仍然有一些基本的特性没有改变，比如，它仍然可以接受参数，也能够返回值

```js
function* foo() {
  return x * y;
}
var it = foo(6, 7);
var res = it.next();
res.value; // 42
```

我们向 `*foo(..)` 传入实参 6 和 7 分别作为参数 x 和 y。\*foo(..) 向调用代码返回 42。

现在我们可以看到生成器和普通函数在调用上的一个区别。显然 foo(6,7) 看起来很熟悉。
但难以理解的是，**生成器 \*foo(..) 并没有像普通函数一样实际运行**。

事实上，我们只是创建了一个**迭代器对象**，把它赋给了一个变量 it，用于控制生成器
*foo(..)。然后调用 it.next()，指示生成器 *foo(..) 从当前位置开始继续运行，停在下一个 yield 处或者直到生成器结束。

这个 next(..) 调用的结果是一个对象，它有一个 value 属性，持有从 \*foo(..) 返回的值
（如果有的话）。换句话说，yield 会导致生成器在执行过程中发送出一个值，这有点类似
于中间的 return。

通过一个迭代器控制生成器的时候，似乎是在控制声明的生成器函数本身。但有一个细微之处很容易忽略：**每次构建一个迭代器，实际上就隐式构建了生成器的一个实例，通过这个迭代器来控制的是这个生成器实例**

同一个生成器的多个实例可以同时运行，他们甚至可以彼此交互。

上面说了手写迭代器，其实 ES6 里提供了专门用来生成迭代器的 api，也就是 Gennerator Function 生成器方法，以方便上述迭代器的实现。生成器方法返回的 Gennerator 对象直接就是一个实现了 Iterator Protocol 的对象

然后我们用生成器方法重新实现 50 以内的斐波那契数列

```js
let obj = {
  [Symbol.iterator]: function*() {
    let a = 1,
      b = 1;
    yield a;
    yield b;
    while (b < 50) {
      yield (b = a + b);
      a = b - a;
    }
  }
};
for (let i of obj) {
  console.log(i); // 1 1 2 3 5 8 13 21 34 55
}
```

形式上，Generator 函数是一个普通函数，但是有两个特征。

1. function 关键字与函数名之间有一个星号；
2. 函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）。

```js
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}

var hw = helloWorldGenerator();
```

如上是一个 Generator 函数，调用方式与普通函数一样，但不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是之前说过的遍历器对象（Iterator Object）

下一步，必须调用遍历器对象的 next 方法，使得指针移向下一个状态。也就是说，每次调用 next 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式（或 return 语句）为止。换言之，Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行。如下：

```js
hw.next();
// { value: 'hello', done: false }

hw.next();
// { value: 'world', done: false }

hw.next();
// { value: 'ending', done: true }

hw.next();
// { value: undefined, done: true }
```

#### 不同的数据结构相互转化

因为 ES6 给出了统一的迭代接口，使得不同类型的数据结构相互之间转换更加方便。如下：

从 Array 生成 Set，还可用于数组去重（[Set][setmaptheoryurl]本身是构造函数，类似于数组，但是成员的值都是唯一）

```js
new Set(["Alice", "Bob", "Carol"]); // {'Alice', 'Bob', 'Carol'}
// 等价于
new Set(["Alice", "Bob", "Carol"][Symbol.iterator]());
```

从 Set 生成 Array

```js
let set = new Set(['Alice', 'Bob', 'Carol'])
Array.from(set) // 'Alice', 'Bob', 'Carol'
// 等价于
Array.from(set[Symbol.iterator]())

Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。


Array.from(arrayLike[, mapFn[, thisArg]]);
// arrayLike
// 想要转换成数组的伪数组对象或可迭代对象。
// mapFn (可选参数)
// 如果指定了该参数，新数组中的每个元素会执行该回调函数。
// thisArg (可选参数)
// 可选参数，执行回调函数 mapFn 时 this 对象。
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]

// 还可以使用展开运算符 ...
let names = [...set] // 'Alice', 'Bob', 'Carol'

```

从 String 到 Set，得到字符串中具体的字符

```js
let alphabet = "abcdefghijklmnopqrstuvwxyz";
new Set(alphabet); // {'a', 'b', 'c', ...}
// 等价于
new Set("alice bob"[Symbol.iterator]());
```

从 Object 生成[Map][setmaptheoryurl](类似 Object，只是键不再局限于字符串，各种类型的值都可以作为键)
Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现

```js
let mapping = {
  foo: "bar"
};
new Map(Object.entries(mapping)); // {"foo" => "bar"}
```

Promise 的定义方式使得它只能被决议一次。如果出于某种原因，Promise 创建代码试图调用 resolve(..) 或 reject(..) 多次，或者试图两者都调用，那么这个 Promise 将只会接受第一次决议，并默默地忽略任何后续调用。

如果使用多个参数调用 resovle(..) 或者 reject(..)，第一个参数之后的所有参数都会被默默忽略。

参考链接：

- [阮一峰 js 标准教程][js-ruanyifeng-url]
- [ES6 迭代器][es6-iterator-url]

[es6-iterator-url]: https://harttle.land/2018/09/29/es6-iterators.html
[js-ruanyifeng-url]: http://es6.ruanyifeng.com/#docs/generator
[setmaptheoryurl]: http://es6.ruanyifeng.com/#docs/set-map
