---
layout: post
title: 基础知识
---

## RxJs

RxJS 是一个库，它通过使用 observable 序列来编写异步和基于事件的程序。它提供了一个核心类型 Observable，附属类型 (Observer、 Schedulers、 Subjects) 和受 [Array#extras] 启发的操作符 (map、filter、reduce、every, 等等)，这些数组操作符可以把异步事件作为集合来处理。

>可以把 RxJS 当做是用来处理事件的 Lodash 。

### 拉取 (Pull) vs. 推送 (Push)

**什么是拉取？** - 在拉取体系中，由消费者来决定何时从生产者那里接收数据。生产者本身不知道数据是何时交付到消费者手中的。

每个 JavaScript 函数都是拉取体系。函数是数据的生产者，调用该函数的代码通过从函数调用中“取出”一个单个返回值来对该函数进行消费。

ES2015 引入了 generator 函数和 iterators (function*)，这是另外一种类型的拉取体系。调用 iterator.next() 的代码是消费者，它会从 iterator(生产者) 那“取出”多个值。

**什么是推送？** - 在推送体系中，由生产者来决定何时把数据发送给消费者。消费者本身不知道何时会接收到数据。

在当今的 JavaScript 世界中，Promises 是最常见的推送体系类型。Promise(生产者) 将一个解析过的值传递给已注册的回调函数(消费者)，但不同于函数的是，由 Promise 来决定何时把值“推送”给回调函数。

RxJS 引入了 Observables，**一个新的 JavaScript 推送体系。Observable 是多个值的生产者，并将值“推送”给观察者(消费者)**。

- Function 是惰性的评估运算，调用时会同步地返回一个单一值。
- Generator 是惰性的评估运算，调用时会同步地返回零到(有可能的)无限多个值。
- Promise 是最终可能(或可能不)返回单个值的运算。
- Observable 是惰性的评估运算，它可以从它被调用的时刻起同步或异步地返回零到(有可能的)无限多个值。

### Observables 作为函数的泛化

- 订阅 Observable 类似于调用函数。
- Observables 传递值可以是同步的，也可以是异步的。
- 那么 Observable 和 函数的区别是什么呢？Observable 可以随着时间的推移“返回”多个值，这是函数所做不到的

```js
// 函数只能返回一个值
function foo() {
  console.log('RxJs');
  return 42;
  return 41; // 永远不会执行
}

// Observables可以返回多个值（有点类似生成器）
const foo = Rx.Observable.create(function(observer) {
  console.log('RxJs');
  observer.next(42);
  observer.next(41); // 可以继续返回
})
foo.subscribe(x => console.log(x)); // 订阅（类似调用）才可以产生值。
```

结论：
- fn.call(); 同步的返回一个值
- observable.subscribe(); 给我任意数量的值，无论是同步还是异步。


### 订阅 Observables

订阅 Observable 像是调用函数, 并提供接收数据的回调函数。

这与像 addEventListener / removeEventListener 这样的事件处理方法 API 是完全不同的。使用 observable.subscribe，在 Observable 中不会将给定的观察者注册为监听器。Observable 甚至不会去维护一个附加的观察者列表。

subscribe 调用是启动 “Observable 执行”的一种简单方式， 并将值或事件传递给本次执行的观察者。

### Subject (主体)

什么是 Subject？ - RxJS Subject 是一种特殊类型的 Observable，它允许将值多播给多个观察者，所以 Subject 是多播的，而普通的 Observables 是单播的(每个已订阅的观察者都拥有 Observable 的独立执行)。

单播：点对点通信
多播：点对指定多个点通信，比如视频会议
广播：点对所有点通信

>Subject 像是 Observable，但是可以多播给多个观察者。Subject 还像是 EventEmitters，维护着多个监听器的注册表

- 每个Subject是Observable
- 每个Subject都是观察者

```js
// 我们为 Subject 添加了两个观察者，然后给 Subject 提供一些值：
var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(1);
subject.next(2);

// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

因为 Subject 是观察者，这也就在意味着你可以把 Subject 作为参数传给任何 Observable 的 subscribe 方法，

```js
var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

var observable = Rx.Observable.from([1, 2, 3]);

observable.subscribe(subject); // 你可以提供一个 Subject 进行订阅

// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

通过 Subject 将单播的 Observable 执行转换为多播的。这也说明了 Subjects 是将任意 Observable 执行共享给多个观察者的唯一方式。“多播 Observable” 通过 Subject 来发送通知，这个 Subject 可能有多个订阅者，然而普通的 “单播 Observable” 只发送通知给单个观察者。

### 项目案例

```js
export declare type Stream<T = unknown> = (cb: (payload: T) => void) => () => void;

export interface ISubject<T> {
  next: (value: T) => void;
  stream: Stream<T>;
}

export declare function Subject<T>(): ISubject<T>;
```


## vue3

### watchEffect

为了根据响应式状态自动应用和重新应用副作用，我们可以使用 watchEffect 方法。它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

停止侦听：

```js
const stop = watchEffect(() => {
  /* ... */
})

// later
stop()
```

清除副作用：

有时副作用函数（可以理解为watchEffect的入参）会执行一些异步的副作用，这些响应需要在其失效时清除 (即完成之前状态已改变了) 。所以侦听副作用传入的函数可以接收一个 onInvalidate 函数作入参，用来注册清理失效时的回调。当以下情况发生时，这个失效回调会被触发：

- 副作用即将重新执行时
- 侦听器被停止 (如果在 setup() 或生命周期钩子函数中使用了 watchEffect，则在组件卸载时)

```js
watchEffect(onInvalidate => {
  const token = performAsyncOperation(id.value)
  onInvalidate(() => {
    // id has changed or watcher is stopped.
    // invalidate previously pending async operation 是以前挂起的异步操作失效
    token.cancel()
  })
})
```
