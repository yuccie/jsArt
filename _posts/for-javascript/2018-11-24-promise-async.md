---
layout: post
title: Promise解析
date: Sat Nov 24 2018 18:08:15 GMT+0800 (中国标准时间)
---

一直以来，自己都对promise的理解模模糊糊，接下来我想仔细研究一番
#### 1、Promise含义
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

Promise对象有以下两个特点。

1. 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

**注意**为了行文方便，本章后面的resolved统一只指fulfilled状态，不包含rejected状态。

Promise也有一些缺点：
1. 一旦新建就会立即执行，且中途无法取消
2. 内部的错误必须有回调函数，否则错误无法抛出
3. 处于pending状态时，无法得知目前处于什么阶段(是刚开始还是快结束)

#### 2、Promise基本用法
ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。
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
1. Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

2. resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在**异步操作成功时调用，并将异步操作的结果，作为参数传递出去**；

3. reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在**异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去**。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
then方法可以接受**两个回调函数**作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，**第二个函数是可选的**，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    console.log("立即执行")
    // 除了前两个参数，setTimeout允许有多个参数，他们将作为参数被传入回调
    setTimeout(resolve, ms, 'done');
  });
}
// 执行timeout()时，实例化Promise()立即执行，因此“立即执行”会立刻打印出来
timeout(10000).then((value) => {
  console.log(value);
});
```
上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。过了指定的时间（ms参数）以后，Promise实例的状态变为resolved，就会触发then方法绑定的回调函数。

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});
promise.then(function() {
  console.log('resolved.');
});
console.log('Hi!');

// Promise
// Hi!
// resolved
```
上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

来看一个异步加载图片的例子
```js
function loadImgAsync(url){
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => { resolve(img) }
    img.onerror = () => { reject(new Error('could not load img at '+ url)) }
    img.src = url
  })
}
```
上面代码中，使用Promise包装了一个图片加载的异步操作。如果加载成功，就调用resolve方法，否则就调用reject方法。

再来看一个Promise实现的ajax操作的例子
```js
const getJSON = (url) => {
  const promise = new Promise((resolve, reject) => {
    // 定义一个函数处理逻辑
    const handler = () => {
      if(this.readyState !== 4){ return }
      if(this.status === 200){ 
        resolve(this.response) 
      }else{
        reject(new Error(this.statusText))
      }
    }
    const client = new XMLHttpRequest()
    client.open("GET", url)
    client.onreadystatechange = handler
    client.responseType = "json"
    client.setRequestHeader("Accept", "application/json")
    client.send()
  })
  // 这里再命名返回
  return promise
}

getJSON("/posts.json").then((json) => { 
  console.log(`contens: ${json}`) 
},(err) => {
  console.error('出错了', err)
})
```
上面代码中，getJSON是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个Promise对象。需要注意的是，在getJSON内部，resolve函数和reject函数调用时，都带有参数。

如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

```js
const p1 = new Promise((resolve, reject) => { 
  // TODO
})
const p2 = new Promise((resolve, reject) => {
  // TODO
  resolve(p1)
})
```
上面代码中，p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。
```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})
const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})
p2
  .then(result => console.log("res", result))
  .catch(error => console.log("err", error))
// 因为p1回调的结果是reject，因此p2的状态也会是reject，因此触发catch
// err Error: fail
```
上面代码中由于p2返回的是另外一个promise，因此p2的状态将由p1的状态决定，当p1一直是pending，则p2也处于pending状态。当p1是确定的resolve或reject，p2的回调会立即执行(这里因为p2的定时器是1秒，再等待p1定时器结束)，只是将p1回调的结果传递出去，同时p2的状态由p1的状态来确定。。。

如果不写`p2.then().catch()`,也会打印错误，只不过是`Uncaught (in promise) Error: fail`。未捕获的错误

**注意**调用resolve或reject并不会终结 Promise 的参数函数的执行。
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
上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为**立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务**。一般来说，调用resolve和reject之后，promise的使命就完成了，后继操作应该放到then里面，而不是在他们之后，因此最好添加return 如下
```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

#### 3、Promise.prototype.then()
Promise 实例具有then方法，也就是说，**then方法是定义在原型对象Promise.prototype上的**。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
```js
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```
上面的代码使用then方法，依次指定了两个回调函数，第一个回调函数完成之后，会将返回结果作为参数，传入第二个回调函数。

采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
```js
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("resolved: ", comments);
}, function funcB(err){
  console.log("rejected: ", err);
});
```
上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用funcA，如果状态变为rejected，就调用funcB。
如果使用箭头函数则更简洁为：
```js
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
```

#### 4、Promise.prototype.catch()
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。这个**回调函数不但可以捕获reject抛出的错误，还可以捕获之前回调函数内部的运行错误，因此一般将catch写在最后用来捕获上面所有回调可能发生的错误**。。。如下三种方式等价：
```js
// 方式一
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});
// Error: test

// 方式二
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 方式三
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```
这里其实reject方法的作用等同于抛出错误

**注意点**，如果Promise的状态已经变成resolve，再抛出错误是徐晓的，因为Promise的状态一旦改变，就永久保持该状态，不会再变了。
```js
const promise = new Promise(function(resolve, reject) {
  // 同样，如果先抛出错误，则resolve也失效
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

**注意点**，Promise内部的错误即使没有被捕获，也不会影响Promise之外的代码执行，但会阻断promise内部之后的代码，如下
```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
    // 下面一行不会打印
    console.log("不会打印我")
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

**注意点**，如果Promise指定在下一轮"事件循环"再抛出错误，因为此时promise运行已经结束，所以这个错误时在promise函数体外部抛出的，会冒泡到最外层，成了未捕获的错误，因此，一般总是建议在promise对象后跟catch方法；
```js
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 0)
});
promise.then(function (value) { console.log(value) });
// ok
// Uncaught Error: test
```

**注意点**，如果有多个catch，则最后一个catch捕获错误，如下：
```js
someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明
  y + 2;
}).catch(function(error) {
  console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
```

#### 5、Promise.prototype.finally() 
finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```
上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。

**注意点**，finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。**而是总会返回原来的值**，如下是其实现：
```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```
从上面的实现可以看出，finally方法总是返回原来的值，其实下面代码的意思是说，使用finally后，可以只写一个回调，因为不管是resolve还是reject，都会执行finally里的回调。
```js
// resolve 的值是 undefined
// 会打印 success 2
Promise.resolve(2).then((val) => { console.log('success',val) }, () => {})

// resolve 的值是 2
// 会打印 val undefined,因为finally不接受任何参数，返回的也是上一个回调
Promise.resolve(2).finally((val) => {console.log('val',val)})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})

// reject 的值是 3
Promise.reject(3).finally(() => {})
```

#### 6、Promise.all() 
该方法用于将多个Promise实例，包装成一个新的Promise实例。接受一个数组作为参数（可以不是数组，但必须具有Iterator接口，且返回的成员必须是Promise实例），假如参数不是Promise实例，会调用Promise.resolve方法将参数转为Promise实例，再进一步处理。
```js
const p = Promise.all([p1, p2, p3]);
```

注意：其实Promise.resolve(2) 等价于 new Promise( resolve => resolve(2))

此时p的状态，根据这三者来确定，
1. 当所有参数实例状态都为resolved，则p才为resolved，此时p1,p2,p3的返回值组成一个数组，传递给p的回调函数。
2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

**注意：**如果作为参数的Promise实例，自己定义了catch方法，那么它一旦是rejected，并不会触发Promise.all()的catch方法。由于p2有自己的catch方法，而返回的实例又是新的Promise实例，因此该实例执行完本身的catch方法后，也会变成resolved，导致Promise.all([p1,p2])总的状态为resolved，因此不会调用Promise.all([p1,p2]).then().catch()的catch方法
```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```

#### 7、迭代器Iterator,Iterable和Gennerator
对于集合中每个元素进行处理是很常见的操作，比如操作数组遍历，对象的属性遍历。以往的操作是通过for循环，forEach,map等方式。同时提供定制 for...of 的机制。 借由迭代器机制为 Map、Array、String 等对象**提供了统一的遍历语法**，以及**更方便的相互转换（不同数据类型转换）**。 为**方便编写迭代器还提供了生成器（Generator）**语法。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator遍历器过程：
1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。如下：
```js
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```
其实上面makeIterator函数，就是一个遍历器生成函数，作用是返回一个遍历器对象，也就是指针对象。指针对象的next方法，用来移动指针。从上也可以知道，数据结构与遍历器其实是可以分开的，也就是说对于不具有遍历功能的对象添加遍历器对象之后，就可以遍历了

**综上**Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环（详见下文）。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

一种数据结构只要部署了Iterator接口，我们就称这种数据结构是"可遍历的"（iterable）

ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，或者说一个数据结构只要具有Symbol.iterator属性，就认为是可以遍历的。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内

如下实现一个50以内的斐波那契额数列：
```js
let obj = {
  [Symbol.iterator](){
    let a = 0, b =0
    return {
      next(){
        let value = 0
        if(!a){ 
          value = a = 1 
        }else if(!b){
          value = b = 1
        }else if(b < 50){
          value = a + b
          a = b 
          b = value
        }
        return { done: value === 0, value }
      }
    }
  }
}
for(let i of obj){
  console.log(i) // 1 1 2 3 5 8 13 21 34 55
}
```
上面的obj因为有了Symbol.iterator属性，因此是可以遍历的，所以for...of可以打印出来。
直接调用obj[Symbol.iterator]()会返回一个迭代器对象，然后再调用这个对象上的next方法，可以打印迭代器的每个成员。

#### Gennerator
```js
var x = 1;
// function* foo(){}、function *foo(){}、function*foo(){}功能与语法都相同
function *foo() {
  x++;
  console.log("x:", x)
  yield; // 暂停!
  bar()
  console.log( "x:", x );
}
function bar() {
  x++;
}

var it = foo()
it.next() 
// x: 2
// {value: undefined, done: false}
it.next()
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
(7) 最后的 it.next() 调用从暂停处恢复了生成器 *foo() 的执行，并运行bar(), console.log(..)
语句，这条语句使用当前 x 的值 3。

生成器函数是一个特殊的函数，具有上面新的执行方式，同时，它仍然是一个函数，这意味着它仍然有一些基本的特性没有改变，比如，它仍然可以接受参数，也能够返回值
```js
function *foo() {
  return x * y
}
var it = foo(6, 7)
var res = it.next()
res.value ; // 42
```
我们向 `*foo(..)` 传入实参 6 和 7 分别作为参数 x 和 y。*foo(..) 向调用代码返回 42。

现在我们可以看到生成器和普通函数在调用上的一个区别。显然 foo(6,7) 看起来很熟悉。
但难以理解的是，**生成器 *foo(..) 并没有像普通函数一样实际运行**。

事实上，我们只是创建了一个**迭代器对象**，把它赋给了一个变量 it，用于控制生成器
*foo(..)。然后调用 it.next()，指示生成器 *foo(..) 从当前位置开始继续运行，停在下一个 yield 处或者直到生成器结束。

这个 next(..) 调用的结果是一个对象，它有一个 value 属性，持有从 *foo(..) 返回的值
（如果有的话）。换句话说，yield 会导致生成器在执行过程中发送出一个值，这有点类似
于中间的 return。

上面说了手写迭代器，其实ES6里提供了专门用来生成迭代器的api，也就是Gennerator Function生成器方法，以方便上述迭代器的实现。生成器方法返回的Gennerator对象直接就是一个实现了Iterator Protocol的对象

然后我们用生成器方法重新实现50以内的斐波那契数列
```js
let obj = {
  [Symbol.iterator]: function *() {
    let a = 1, b = 1
    yield a
    yield b
    while (b < 50) {
      yield b = a + b
      a = b - a
    }
  }
}
for (let i of obj) {
  console.log(i)  // 1 1 2 3 5 8 13 21 34 55
}
```
形式上，Generator 函数是一个普通函数，但是有两个特征。
1. function关键字与函数名之间有一个星号；
2. 函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```
如上是一个Generator函数，调用方式与普通函数一样，但不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是之前说过的遍历器对象（Iterator Object）

下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。如下：
```js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

#### 不同的数据结构相互转化
因为ES6给出了统一的迭代接口，使得不同类型的数据结构相互之间转换更加方便。如下：

从Array生成Set，还可用于数组去重（[Set][SetMapTheoryUrl]本身是构造函数，类似于数组，但是成员的值都是唯一）
```js
new Set(['Alice', 'Bob', 'Carol'])    // {'Alice', 'Bob', 'Carol'}
// 等价于
new Set(['Alice', 'Bob', 'Carol'][Symbol.iterator]())
```

从Set生成Array
```js
let set = new Set(['Alice', 'Bob', 'Carol'])
Array.from(set) // 'Alice', 'Bob', 'Carol'
// 等价于
Array.from(set[Symbol.iterator]())

Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。
```js
Array.from(arrayLike[, mapFn[, thisArg]])
```

// 还可以使用展开运算符 ...
let names = [...set]  // 'Alice', 'Bob', 'Carol'
```

从String到Set，得到字符串中具体的字符
```js
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
new Set(alphabet) // {'a', 'b', 'c', ...}
// 等价于
new Set('alice bob'[Symbol.iterator]())
```

从Object生成[Map][SetMapTheoryUrl](类似Object，只是键不再局限于字符串，各种类型的值都可以作为键)
Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现
```js
let mapping = {
  "foo": "bar"
}
new Map(Object.entries(mapping))    // {"foo" => "bar"}
```

Promise 的定义方式使得它只能被决议一次。如果出于某种原因，Promise 创建代码试图调用 resolve(..) 或 reject(..) 多次，或者试图两者都调用，那么这个 Promise 将只会接受第一次决议，并默默地忽略任何后续调用。

如果使用多个参数调用 resovle(..) 或者 reject(..)，第一个参数之后的所有参数都会被默默忽略。

参考链接：
- [阮一峰js标准教程][js-ruanyifeng-url]
- [ES6迭代器][es6-iterator-url]

[es6-iterator-url]: https://harttle.land/2018/09/29/es6-iterators.html
[js-ruanyifeng-url]: http://es6.ruanyifeng.com/#docs/generator
[SetMapTheoryUrl]: http://es6.ruanyifeng.com/#docs/set-map