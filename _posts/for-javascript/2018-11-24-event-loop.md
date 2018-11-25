---
layout: post
title: 事件循环eventLoop
date: Sat Nov 24 2018 18:06:10 GMT+0800 (中国标准时间)
---

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
4. 主线程不断重复上面步骤

**注意：**只有等到异步任务有了结果才会进入任务队列(task queu)，而在有结果之前异步任务进入task table注册并开始计时。也就是说js代码从上向下执行，碰到异步任务就放到task table里，对于定时器如果时间到了就放进任务队列里，对于ajax请求，则等到返回响应才会进入任务队列

只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。

#### 三、事件及回调函数
"任务队列"是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在"任务队列"中添加一个事件，表示相关的异步任务可以进入"执行栈"了。主线程读取"任务队列"，就是读取里面有哪些事件。

所谓"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数(没有回调函数将无法向主线程反馈异步任务的结果)，当主线程开始执行异步任务，就是执行对应的回调函数。

**"任务队列"是一个先进先出的数据结构**，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。**但是**，由于存在后文提到的"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。

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


#### 五、定时器
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



#### 宏任务和微任务
首先我们要知道宏任务和微任务都是异步任务

**宏任务：**包括整体代码script，[setTimeout][YouDoNotKonwSetTimeoutUrl] ，setInterval，setImmediate
**微任务：**原生promise（有些实现的promise将then方法放到宏任务），process.nextTick，MutationObserve

知道了异步任务是如何进入任务队列(task queue)，对于setTimeout(fn,time)是从注册后time毫秒后才会进入任务队列，而setInterval(fn, time)则是每隔time毫秒就会进入到任务队列。**注意**此时若setInterval的回调fn执行时间大于延迟时间time，则就看不出来有时间间隔了。。。

一开始执行栈的同步任务执行完毕，会去 microtasks queues 找， 然后清空 microtasks queues ，输出Promise1，同时会生成一个异步任务 setTimeout1
去宏任务队列查看此时队列是 setTimeout1 在 setTimeout2 之前，因为setTimeout1执行栈一开始的时候就开始异步执行,所以输出 setTimeout1
在执行setTimeout1时会生成Promise2的一个 microtasks ，放入 microtasks queues 中，接着又是一个循环，去清空 microtasks queues ，输出 Promise2
清空完 microtasks queues ，就又会去宏任务队列取一个，这回取的是 setTimeout2


[requestAnimationFrame-ruanyifeng-Url]: https://javascript.ruanyifeng.com/htmlapi/requestanimationframe.html
[requestAnimationFrame-taobao-FED-Url]: http://taobaofed.org/blog/2017/03/02/thinking-in-request-animation-frame/
[requestAnimationFrame-zhangxinxu-Url]: https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/
[YouDoNotKonwSetTimeoutUrl]: https://www.jeffjade.com/2016/01/10/2016-01-10-javacript-setTimeout/