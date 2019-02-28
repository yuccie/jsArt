---
layout: post
title: 事件循环eventLoop
date: Sat Nov 24 2018 18:06:10 GMT+0800 (中国标准时间)
---

>文章中难免有相互矛盾的地方，会逐渐完善，下面是关于js事件循环的一些内容

#### 一、js为何单线程
浏览器进程里有多个线程，比如定时器，http请求等，但页面的渲染过程是单线程的，也就是说ui渲染和j解析是同一个线程，也就是同一时间只能执行二者其中一个。。。

js用途是与用户互动以及操作dom，为避免复杂性，从一诞生就是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

#### 二、任务队列
单线程意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，CPU忙不过来，倒也算了，但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着结果出来，再往下执行。

JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）
1. 所有同步任务都在主线程执行，形成一个执行栈（execution context stack）
2. 主线程之外，还有一个任务队列（task queue），只要异步任务有了运行结果，就在任务队列里放置一个事件。
3. 一旦主线程的执行栈所有同步任务执行完毕，系统就会读取任务队列，看看里面有哪些事件，那些对应的异步任务于是就结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面步骤··

**注意：**只有等到异步任务有了结果才会进入任务队列(task queu)，而在有结果之前异步任务进入task table注册并开始计时。也就是说js代码从上向下执行，碰到异步任务就放到task table里，对于定时器如果时间到了就放进任务队列里，对于ajax请求，则等到返回响应才会进入任务队列

只要主线程空了(js引擎存在monitoring process进程，会持续不断检查主线程执行栈是否为空)，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。

#### 三、事件及回调函数
"任务队列"是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在"任务队列"中添加一个事件，表示相关的异步任务可以进入"执行栈"了。主线程读取"任务队列"，就是读取里面有哪些事件。

所谓"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数(没有回调函数将无法向主线程反馈异步任务的结果)，当主线程开始执行异步任务，就是执行对应的回调函数。

**"任务队列"是一个先进先出的数据结构**，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。**但是**，由于存在后文提到的"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。因此此时定时器前没有其他任务，定时任务没到时间也不会进入执行栈。。。还有种情况，定时器前有任务，即使到时间了，也得等着。。。

#### 四、Event Loop
主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。

>栈(stack)分配固定大小内存（存放指针及基本数据类型），系统自动回收内存。堆(heap)是动态分配内存大小，不自动释放内存（引用数据类型的数据存放于此）。

执行栈中的代码（同步任务），总是在读取"任务队列"（异步任务）之前执行。请看下面这个例子。
```js
var req = new XMLHttpRequest();
req.open('GET', url);    
req.onload = function (){};    
req.onerror = function (){};    
req.send();
```
上面代码中的req.send方法是Ajax操作向服务器发送数据，它是一个异步任务(意味着不会立刻有结果。。。)，意味着只有当前脚本的所有代码执行完，系统才会去读取"任务队列"。所以，它与下面的写法等价。
```js
var req = new XMLHttpRequest();
req.open('GET', url);    
req.send();
req.onload = function (){};    
req.onerror = function (){};    
```
也就是说，指定回调函数的部分（onload和onerror），在send()方法的前面或后面无关紧要，因为它们属于执行栈的一部分，系统总是执行完它们，才会去读取"任务队列"。

再看下面代码
```js
let data = []
$.ajax({
  url: 'www.js.com',
  data: data,
  success: ()=>{
    console.log('发送成功')
  }
})
console.log('代码执行结束')
```
上面代码执行的顺序：
1. ajax进入Event Table，注册回调函数success。
2. 执行console.log('代码执行结束')。
3. ajax事件完成，回调函数success进入Event Queue。
4. 主线程从Event Queue读取回调函数success并执行。


#### 五、定时器
[w3c更多标准][w3cOfficalSetTimeoutUrl]<br/>
[从event loop规范探究javaScript异步及浏览器更新渲染时机][setTimeoutAndSetIntervalUrl]
除了放置异步任务的事件，"任务队列"还可以放置定时事件，即指定某些代码在多少时间之后执行。这叫做"定时器"（timer）功能，也就是定时执行的代码。

定时器功能主要由setTimeout()和setInterval()这两个函数来完成，它们的内部运行机制完全一样，区别在于前者指定的代码是一次性执行，后者则为反复执行。以下主要讨论setTimeout()。
```js
console.log(1);
setTimeout(function(){console.log(2);},1000);
console.log(3);   
```
上面代码的执行结果是1，3，2，因为setTimeout()将第二行推迟到1000毫秒之后执行。

如果将setTimeout()的第二个参数设为0，就表示当前代码执行完（执行栈清空）以后，立即执行（0毫秒间隔）指定的回调函数
```js
setTimeout(function(){console.log(1);}, 0);
console.log(2);
```
上面代码的执行结果总是2，1，因为只有在执行完第二行以后，系统才会去执行"任务队列"中的回调函数。

总之，setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件(可以理解为正在执行一个异步任务)都处理完，才会得到执行。

HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔），不得低于4毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为10毫秒。另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每16毫秒执行一次。这时使用requestAnimationFrame()的效果要好于setTimeout()。

需要注意的是，setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。

>requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。

>设置这个API的目的是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。代码中使用这个API，就是告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘。

>requestAnimationFrame的优势，在于充分利用显示器的刷新机制，比较节省系统资源。显示器有固定的刷新频率（60Hz或75Hz），也就是说，每秒最多只能重绘60次或75次，**requestAnimationFrame的基本思想就是与这个刷新频率保持同步，利用这个刷新频率进行页面重绘**。此外，使用这个API，一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了CPU、GPU和电力。

>不过有一点需要注意，**requestAnimationFrame是在主线程上完成。这意味着，如果主线程非常繁忙，requestAnimationFrame的动画效果会大打折扣**。

参考：
1. [阮一峰-requestAnimationFrame][requestAnimationFrame-ruanyifeng-Url]
2. [淘宝FED-requestAnimationFrame][requestAnimationFrame-taobao-FED-Url]
3. [张鑫旭-requestAnimationFrame][requestAnimationFrame-zhangxinxu-Url]

#### 六、Node.js的Event Loop
Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器

除了setTimeout和setInterval这两个方法，Node.js还提供了另外两个与"任务队列"有关的方法：process.nextTick和setImmediate。它们可以帮助我们加深对"任务队列"的理解。

process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。也就是说，它指定的任务总是发生在所有异步任务之前。setImmediate方法则是在当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像。
```js
process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){console.log(2);});
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)
// 1
// 2
// TIMEOUT FIRED
```
由于process.nextTick方法指定的回调函数，总是在当前"执行栈"的尾部触发，所以不仅函数A比setTimeout指定的回调函数timeout先执行，而且函数B也比timeout先执行。这说明，如果有多个process.nextTick语句（不管它们是否嵌套），将全部在当前"执行栈"执行。

**注意:**到这里应该对Event Loop有深刻理解了吧，所谓的Event Loop是周而复始读取任务队列的过程。而process.nextTick方法会在当前执行栈的尾部触发回调，也就是在当前执行栈的最后执行位置。而setImmediate也是在当前任务队列的尾部添加事件。(待完善)


#### 宏任务和微任务
首先我们要知道宏任务和微任务都是异步任务

**宏任务：**包括整体代码script，[setTimeout][YouDoNotKonwSetTimeoutUrl] ，setInterval，setImmediate
**微任务：**原生promise（有些实现的promise将then方法放到宏任务），process.nextTick，MutationObserve

知道了异步任务是如何进入任务队列(task queue)，对于setTimeout(fn,time)是从注册后time毫秒后才会进入任务队列，而setInterval(fn, time)则是每隔time毫秒就会进入到任务队列。**注意**此时若setInterval的回调fn执行时间大于延迟时间time，则就看不出来有时间间隔了。。。

先来看个简单的
```js
setTimeout(()=>{
  console.log('setTimeout1')
},0)
let p = new Promise((resolve,reject)=>{
  console.log('Promise1')
  resolve()
})
p.then(()=>{
  console.log('Promise2')    
})
// 输出 Promise1，Promise2，setTimeout1
```
Promise参数中的Promise1是同步执行的 其次是因为Promise的then()是microtasks，会在同步任务执行完后会去清空microtasks queues， 最后清空完微任务再去宏任务队列取值


再来看看这个
```js
function testQueue (){
  // part1
  Promise.resolve().then(()=>{
    console.log('Promise1')
    setTimeout(()=>{
      console.log('setTimeout2')
    },0)
    Promise.resolve().then(()=>{
      console.log('Promise3')    
    })  
  })
  // part2
  console.log('begin')
  // part3
  setTimeout(()=>{
    console.log('setTimeout1')
    Promise.resolve().then(()=>{
      console.log('Promise2')    
    })
  },0)
  // part4
  setTimeout(()=>{
    console.log('s1')
    Promise.resolve().then(()=>{
      console.log('p2')    
    })
  },0)
}
testQueue()
// 浏览器环境
// begin,Promise1,Promise3,setTimeout1,Promise2,s1,P2,setTimeout2

// node环境
// begin,Promise1,Promise3,setTimeout1,s1,Promise2,p2,setTimeout2
```
浏览器环境执行过程：
1. 第一轮，主线程有part2先执行即打印begin，并注册一个微任务part1,两个宏任务part3,part4
2. 第二轮，主线程为空了，开始执行微任务即part1,在微任务执行过程中遇到的所有微任务都执行，即打印Promise1，Promise3，并注册下一轮宏任务setTimeout
3. 第三轮，开始执行第一轮注册的宏任务，即先执行part3,打印setTimeout1，并执行遇到的所有微任务，即再打印Promise2，继续执行第一轮注册的宏任务，即打印s1，并执行遇到的微任务即打印p2
4. 第四轮，在上一步已经执行完了第一轮注册的宏任务，这次开始执行第二轮注册的宏任务，即打印setTimeout2

node环境执行过程：
1. 第一轮，主线程有part2先执行即打印begin，并注册一个微任务part1,两个宏任务part3,part4
2. 第二轮，主线程为空了，开始执行微任务即part1,在微任务执行过程中遇到的所有微任务都执行，即打印Promise1，Promise3，并注册下一轮宏任务setTimeout
3. 第三轮，开始执行第一轮注册的宏任务，即先执行part3并打印setTimeout1，并注册下一轮微任务Promise2，然后再执行第一轮注册的宏任务part4，即打印s1,并注册下一轮的微任务p2。
4. 第四轮，在第二轮没有微任务，在第三轮注册两个微任务，因此依次执行并打印Promise2，p2
5. 第五轮，上一轮把所有微任务执行完了，最后打印setTimeout2


**综上**：在浏览器和node环境下，事件循环处理的机制不同。前者在执行宏任务或微任务过程中，如果遇到新注册的微任务则全部执行。而在node环境下，如果有同一循环下注册的宏任务，则先执行这些宏任务，然后再去执行微任务

在**node环境**下，还有process.nextTick,**是在当前执行栈的末尾执行**,意味着要早于宏任务或微任务
```js
function test(){

  setTimeout(()=>{
    console.log('setTimeout')
  })

  process.nextTick(()=>{
    console.log('process.nextTick')
  })

  new Promise((resolve,reject)=>{
    console.log('resolved')
    resolve()
  }).then(()=>{
    console.log('then')
    setTimeout(()=>{
      console.log('then-setTimeout')
      Promise.resolve().then(()=>{
        console.log('setTimeout-then')
      })
    })
    Promise.resolve().then(()=>{
      console.log('then then')
    })
  })

  console.log('begin')
}
test()
// resolved,begin,process.nextTick,then,then then,setTimeout,then-setTimeout,setTimeout-then
```
执行过程：
1. 第一轮，注册宏任务setTimeout，主线程上Promise实例化立即执行即打印resolved，并注册微任务，然后打印begin，process.nextTick在当前主线程尾部执行，因此再打印process.nextTick
2. 第二轮，上一轮是主线程，接下来该执行微任务队列了，即打印then，然后遇见微任务，则一并执行即打印then then,同时注册宏任务
3. 第三轮，再执行第一轮注册的宏任务，即打印setTimeout
4. 第四轮，因为没有微任务，因此执行第二轮注册的宏任务，因此打印then-setTimeout，然后没有其他宏任务了，因此打印setTimeout-then


知道了上面的理论，再看看下面的
```js
function test(){
  // part1
  setTimeout(()=>{
    console.log('setTimeout1')
    Promise.resolve().then(()=>{
      console.log('setTimeout1 Promise1')    
    })
  },0)

  // part2
  Promise.resolve().then(()=>{
    process.nextTick(()=>{
      console.log('Promise1 nextTick')
    })
    console.log('Promise1')  
    setTimeout(()=>{
      console.log('setTimeout3')
      process.nextTick(()=>{
        console.log('setTimeout3 Promise1 nextTick')
      })
    },0)
  })

  // part3
  process.nextTick(()=>{
    console.log('nextTick')
  })

  // part4
  setTimeout(()=>{
    console.log('setTimeout2')
    Promise.resolve().then(()=>{
      console.log('setTimeout2 Promise2')    
    })
  },0)
}
test()
// nextTick
// Promise1
// Promise1 nextTick
// setTimeout1
// setTimeout2
// setTimeout1 Promise1
// setTimeout2 Promise2
// setTimeout3
// setTimeout3 Promise1 nextTick
```

```js
function testQueue(){
  console.log('1');

  setTimeout(function() {
    console.log('2');
    new Promise(function(resolve) {
      console.log('4');
      resolve();
    }).then(function() {
      console.log('5')
    })
    process.nextTick(function() {
      console.log('3');
    })
  })
  
  process.nextTick(function() {
    console.log('6');
  })

  new Promise(function(resolve) {
    console.log('7');
    resolve();
  }).then(function() {
    console.log('8')
  })
  
  setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
      console.log('10');
    })
    new Promise(function(resolve) {
      console.log('11');
      resolve();
    }).then(function() {
      console.log('12')
    })
  })
}
testQueue()
// 因为有process.nextTick,因此需要node环境下打印
// procee.nextTick是当前执行栈的末尾，意味着若前面有其他级别更高的代码，则优先执行级别高的
// 1,7,6,8,2,4,9,11,3,10,5,12  

// 原文答案
// 1,7,6,8,2,4,3,5,9,11,10,12
```

再来回顾一下浏览器环境
```js
function test(){
  setTimeout(function() {
    console.log(1)
    new Promise(function(resolve){
      console.log(3)
      setTimeout(function(){
        console.log(5)
      })
      resolve();
    }).then(function(){
      console.log(4)
    });  
  });

  Promise.resolve().then(function(){
    console.log(9)
    setTimeout(function(){
      console.log(10)
    })
  })

  setTimeout(function() {
    console.log(2)
    new Promise(function(resolve){
      console.log(6)
      setTimeout(function(){
        console.log(7)
      })
      resolve();
    }).then(function(){
      console.log(8)
    });      
  });
}
// 9,1,3,4,2,6,8,10,5,7
```


```js
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}
// 等价于
async function async1() {
	console.log('async1 start');
	Promise.resolve(async2()).then(() => {
    console.log('async1 end');
  })
}

// 
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1

// 打印顺序
'1' 1
'2' 10
```
1. 首先函数 `b` 先执行，在执行到 `await 10` 之前变量 `a` 还是 0，因为 `await` 内部实现了 `generator` ，**`generator` 会保留堆栈中东西，所以这时候 `a = 0` 被保存了下来**
2. 因为 `await` 是异步操作，后面的表达式不返回 `Promise` 的话，就会包装成 `Promise.reslove(返回值)`，然后会去执行函数外的同步代码
3. 同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 0 + 10`

上述解释中提到了 `await` 内部实现了 `generator`，其实 `await` 就是 `generator` 加上 `Promise`的语法糖，且内部实现了自动执行 `generator`。如果你熟悉 co 的话，其实自己就可以实现这样的语法糖。



[requestAnimationFrame-ruanyifeng-Url]: https://javascript.ruanyifeng.com/htmlapi/requestanimationframe.html
[requestAnimationFrame-taobao-FED-Url]: http://taobaofed.org/blog/2017/03/02/thinking-in-request-animation-frame/
[requestAnimationFrame-zhangxinxu-Url]: https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/
[YouDoNotKonwSetTimeoutUrl]: https://www.jeffjade.com/2016/01/10/2016-01-10-javacript-setTimeout/
[w3cOfficalSetTimeoutUrl]: https://www.w3.org/TR/html5/webappapis.html#timers
[setTimeoutAndSetIntervalUrl]: https://github.com/aooy/blog/issues/5