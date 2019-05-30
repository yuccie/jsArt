---
layout: post
title: 框架思想
date: Fri May 10 2019 17:25:35 GMT+0800 (中国标准时间)
---

### 框架

框架分好多种，比如说 ui 框架负责渲染 ui 层面，而像`react，vue`是数据到视图的映射，而`angular`不但有数据到视图的映射，还有自己的路由等。。。每种框架做的东西不同，但各有特点，需要根据业务需要来选择。

像我们常说的`react和vue`，他们核心虽然只解决一个很小的问题，但他们有各自的生态圈及配套的可选工具，当把这些工具一一加进来的时候，就可以组合成非常强大的栈，就可以涵盖其他的那些更完整的框架所涵盖的问题。

### MVVM 由来

在`html5`还没火起来的时候，`MVC`作为`web`应用的最佳实践是 ok 的。这时 web 应用的`view`层相对简单，前端所需要的数据在后端基本上已经处理好了，`view`层做一下展示就好，那时提倡的是`controller`来处理复杂的业务逻辑，`view`层相对轻量。

等到`html5`大火以后，相对`html4，html5`最大的亮点是为**移动设备提供了一些非常有用的功能，使得 HTML5 具备了开发 App 的能力**，另外就是**跨平台、快速迭代和上线，节省人力成本和提高效率**，因此很多企业开始对传统 app 进行改造，逐渐在 app 里使用了大量的 h5 页面。

既然要用 h5 来构建 app，那 view 层做的事情，就不仅仅是简单的数据展示，它不仅**要管理复杂的数据状态，还要处理移动设备上各种操作行为等**，因此前端也需要工程化，一个类似`MVC`的框架来管理这些复杂的逻辑。但相对之前的 MVC 发生了点变化如下：

传统 MVC:

1. View 用来把数据以某种方式呈现给用户。
2. Model 其实就是数据。
3. Controller 接收并处理来自用户的请求，并将 Model 返回给用户。

变化后的 MVC:

1. View UI 布局，展示数据。
2. Model 管理数据。
3. Controller 响应用户操作，并将 Model 更新到 View 上。

变化后的 MVC 架构对于简单的应用来说是 ok 的，也符合软件架构的分层思想。但随着 h5 的发展，人们更希望使用 H5 开发的应用能和 Native 媲美，或者接近于原生 App 的体验效果，于是前端应用的复杂程度已不同往日，今非昔比。这时前端开发就暴露出了三个痛点问题：

1. 开发者在代码中大量调用相同的 DOM API, 处理繁琐，操作冗余，使得代码难以维护。
2. 大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。
3. 当 Model 频繁发生变化，开发者需要主动更新到 View ；当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到 Model 中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

其实，早期 jquery 的出现就是为了前端能更简洁的操作 DOM 而设计的(也解决了原生 DOM api 兼容问题)，但它只解决了第一个问题，另外两个问题始终伴随着前端一直存在。

### MVVM 原理

`MVVM` 由 `Model,View,ViewModel` 三部分构成，Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，`ViewModel` 是一个同步 View 和 Model 的对象。

在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，**Model 和 ViewModel 之间的交互是双向的**，而 **View 与 ViewModel 之间是双向数据绑定**， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。而这一切都是通过框架的 VM 模型实现。。。

### Vue.js

可以说 Vue.js 是 MVVM 架构的最佳实践，专注于 MVVM 中的 VM，不仅做到了双向数据绑定，而且还是相对轻量级的 js 库。

几个名词：

1. Observer 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用 Object.defineProperty 的 getter 和 setter 来实现。
2. Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。
3. Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。
4. Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发 notify 函数，再调用订阅者的 update 方法。

当执行 new Vue() 时，Vue 就进入了初始化阶段，一方面 Vue 会遍历 data 选项中的属性，并用 Object.defineProperty 将它们转为 getter/setter，实现数据变化监听功能；另一方面，Vue 的指令编译器 Compile 对元素节点的指令进行扫描和解析，初始化视图，并订阅 Watcher 来更新视图， 此时 Wather 会将自己添加到消息订阅器中(Dep),初始化完毕。

当数据发生变化时，Observer 中的 setter 方法被触发，setter 会立即调用 Dep.notify()，Dep 开始遍历所有的订阅者，并调用订阅者的 update 方法，订阅者收到通知后对视图进行相应的更新。

参考：

- [mvvm 由来][mvvmfromurl]
- [阮一峰 MVVM][mvvm-阮一峰-url]
- [mvvm 是什么][mvvm-廖雪峰-url]
- [浅谈 mvvm][mvvm-other1-url]

#### **vue/cli 2.x**

现在公司里大多都是基于老版本的`vue-cli`，也就是[`2.96版本`][vuecli296url]。

```bash
# 安装cli
npm install -g vue-cli
# 初始化项目
vue init <template-name> <project-name>
# 比如
vue init webpack my-project
```

官方模板有以下几种，当然还可以自定义模板，具体参考文档：[`2.96版本`][vuecli296url]

vue/cli 3.x 官方文档参考：[vue/cli 3.x 官方文档][vuecli3xurl]

### 操作 dom 慢，但测试结果却比 React 快

来源：[操作 dom 慢，但测试结果却比 React 快][editdom&frameurl(youda)]

#### 原生 dom 操作与框架

框架的意义在于为你掩盖底层的 dom 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。

没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。框架给你的保证是，你在不需要手动优化的情况下，依然可以给你提供过得去的性能。

#### 对 React 的 virtual DOM 的误解

React 从来没有说过 “React 比原生操作 DOM 快”。React 的基本思维模式是每次有变动就整个重新渲染整个应用。如果没有 Virtual DOM，简单来想就是直接重置 innerHTML。很多人都没有意识到，在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作... 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。

我们可以比较一下 `innerHTML vs. Virtual DOM` 的重绘性能消耗：

- innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
- Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)

`Virtual DOM render + diff` 显然比渲染 html 字符串要慢，但是！它依然是纯 js 层面的计算，比起后面的 DOM 操作来说，依然便宜了太多。

可以看到，innerHTML 的总计算量不管是 js 计算还是 DOM 操作都是和整个界面的大小相关，但 Virtual DOM 的计算量里面，只有 js 计算和界面大小相关，DOM 操作是和数据的变动量相关的。前面说了，和 DOM 操作比起来，js 计算是极其便宜的。

这才是为什么要有 Virtual DOM：它保证了

1. 不管你的数据变化多少，每次重绘的性能都可以接受；
2. 你依然可以用类似 innerHTML 的思路去写你的应用。

#### MVVM 与 virtual DOM

相比起 React，其他 MVVM 系框架比如 `Angular, Knockout 以及 Vue、Avalon`采用的都是数据绑定：通过 `Directive/Binding` 对象，观察数据变化并保留对实际 `DOM` 元素的引用，当有数据变化时进行对应的操作。**MVVM 的变化检查是数据层面的，而 React 的检查是 DOM 结构层面的。**MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查使得任何变动都有固定的 O(watcher count) 的代价；`Knockout/Vue/Avalon` 都采用了依赖收集，在 js 和 DOM 层面都是 O(change)：

- 脏检查：scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)
- 依赖收集：重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)

可以看到，Angular 最不效率的地方在于任何小变动都有和 watcher 数量相关的性能代价。但是！当所有数据都变了的时候，Angular 其实并不吃亏。依赖收集在初始化和数据变化的时候都需要重新收集依赖，这个代价在小量更新的时候几乎可以忽略，但在数据量庞大的时候也会产生一定的消耗。

MVVM 渲染列表的时候，由于每一行都有自己的数据作用域，所以通常都是每一行有一个对应的 ViewModel 实例，或者是一个稍微轻量一些的利用原型继承的 "scope" 对象，但也有一定的代价。所以，MVVM 列表渲染的初始化几乎一定比 React 慢，因为创建 ViewModel / scope 实例比起 Virtual DOM 来说要昂贵很多。这里所有 MVVM 实现的一个共同问题就是在列表渲染的数据源变动时，尤其是当数据是全新的对象时，如何有效地复用已经创建的 ViewModel 实例和 DOM 元素。假如没有任何复用方面的优化，由于数据是 “全新” 的，MVVM 实际上需要销毁之前的所有实例，重新创建所有实例，最后再进行一次渲染！这就是为什么题目里链接的 angular/knockout 实现都相对比较慢。相比之下，React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。

Angular 和 Vue 都提供了列表重绘的优化机制，也就是 “提示” 框架如何有效地复用实例和 DOM 元素。比如数据库里的同一个对象，在两次前端 API 调用里面会成为不同的对象，但是它们依然有一样的 uid。这时候你就可以提示 track by uid 来让 Angular 知道，这两个对象其实是同一份数据。那么原来这份数据对应的实例和 DOM 元素都可以复用，只需要更新变动了的部分。或者，你也可以直接 track by $index 来进行 “原地复用”：直接根据在数组里的位置进行复用。在题目给出的例子里，如果 angular 实现加上 track by $index 的话，后续重绘是不会比 React 慢多少的。甚至在 dbmonster 测试中，Angular 和 Vue 用了 track by \$index 以后都比 React 快: dbmon (注意 Angular 默认版本无优化，优化过的在下面）

顺道说一句，React 渲染列表的时候也需要提供 key 这个特殊 prop，本质上和 track-by 是一回事。

#### 性能比较也要看场合

在比较性能的时候，要分清楚初始渲染、小量数据更新、大量数据更新这些不同的场合。Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求。Virtual DOM 为了提升小量数据更新时的性能，也需要针对性的优化，比如 shouldComponentUpdate 或是 immutable data。

- 初始渲染：Virtual DOM > 脏检查 >= 依赖收集
- 小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
- 大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

不要天真地以为 Virtual DOM 就是快，diff 不是免费的，batching 么 MVVM 也能做，而且最终 patch 的时候还不是要用原生 API。
在我看来 Virtual DOM 真正的价值从来都不是性能，而是:

1. 为函数式的 UI 编程方式打开了大门；
2. 可以渲染到 DOM 以外的 backend，比如 ReactNative。

主流的框架 + 合理的优化，足以应对绝大部分应用的性能需求。如果是对性能有极致需求的特殊情况，其实应该牺牲一些可维护性采取手动优化

### Vue.js 内部运行机制之全局概览

![dpr&ppi](/jsArt/assets/images/vue-source/总览图.png)

#### **初始化及挂载**

在 new Vue() 之后。 Vue 会调用 \_init 函数进行初始化，也就是这里的 init 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。其中最重要的是通过 Object.defineProperty 设置 setter 与 getter 函数，用来实现「响应式」以及「依赖收集」，后面会详细讲到，这里只要有一个印象即可。

初始化之后调用 \$mount 会挂载组件，如果是运行时编译，即不存在 render function 但是存在 template 的情况，需要进行**编译**步骤。

#### **编译**

**parse**:  
parse 会用正则等方式解析 template 模板中的指令、class、style 等数据，形成 AST。

**optimize**:  
**optimize 的主要作用是标记 static 静态节点**，这是 Vue 在编译过程中的一处优化，后面当 update 更新界面时，会有一个 patch 的过程， **diff 算法会直接跳过静态节点**，从而减少了比较的过程，优化了 patch 的性能。

**generate**:
generate 是将 AST 转化成 render function 字符串的过程，得到结果是 render 的字符串以及 staticRenderFns 字符串。

在经历过 parse、optimize 与 generate 这三个阶段以后，组件中就会存在渲染 VNode 所需的 render function 了。

compile 编译可以分成 parse、optimize 与 generate 三个阶段，最终需要得到 render function。

**注意：**虚拟DOM和AST很相似，只是AST是侧重模板的映射，而虚拟DOM是侧重真实DOM的映射

`render function`为何？  
在实例化 vue 实例时，代码会有代码`render: h => h(App)`，这里的 render 就是`render function`。

```js
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});

// 等价于

new Vue({
  el: "#app",
  router,
  render: function(createElement) {
    return createElement(App);
  }
});
```

其实就是调用`createElement`函数**创建一个虚拟 Dom(也是 VNode 的总称)并返回**。

#### **响应式**

这里的 getter 跟 setter 已经在之前介绍过了，在 init 的时候通过 Object.defineProperty 进行了绑定，它使得当被设置的对象被读取的时候会执行 getter 函数，而在当被赋值的时候会执行 setter 函数。

**当 render function 被渲染的时候，因为会读取所需对象的值，所以会触发 getter 函数进行「依赖收集」，「依赖收集」的目的是将观察者 Watcher 对象存放到当前闭包中的订阅者 Dep 的 subs 中**。

**注意：**当 render function 被渲染的时候，其实是说，当用`createElement`函数创建虚拟 DOM 的时候，会去获取对象的值，因此会触发 getter 函数进行「依赖收集」

在修改对象的值的时候，会触发对应的 setter， setter 通知之前「依赖收集」得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 Watcher 就会开始调用 update （**每个 Watcher 都有自己的 update 方法**）来更新视图，当然这中间还有一个 patch 的过程以及使用队列来异步更新的策略。

#### **Virtual DOM**

我们知道，**render function 会被转化成 VNode 节点**。Virtual DOM 其实就是一棵以 JavaScript 对象（ VNode 节点）作为基础的树，用对象属性来描述节点，**实际上它只是一层对真实 DOM 的抽象**。最终可以通过一系列操作使这棵树映射到真实环境上。由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。

```html
<script>
  {
    tag: 'div',             /*说明这是一个div标签*/
    children: [             /*存放该标签的子节点*/
      {
        tag: 'a',           /*说明这是一个a标签*/
        text: 'click me'    /*标签的内容*/
      }
    ]
  }
</script>

<!-- 可以渲染成如下 -->

<div>
  <a>click me</a>
</div>
```

这只是一个简单的例子，实际上的节点有**更多的属性来标志节点**，比如 **isStatic （代表是否为静态节点）、 isComment （代表是否为注释节点）等**。

#### **更新视图**

前面我们说到，在修改一个对象值的时候，会通过 `setter -> Watcher -> update` 的流程来修改对应的视图，那么最终是如何更新视图的呢？

当**数据变化后，执行 render function 就可以得到一个新的 VNode 节点**，**我们如果想要得到新的视图，最简单粗暴的方法就是直接解析这个新的 VNode 节点，然后用 innerHTML 直接全部渲染到真实 DOM 中**。但是其实我们只对其中的一小块内容进行了修改，这样做似乎有些「浪费」。

那么我们为什么不能只修改那些「改变了的地方」呢？这个时候就要介绍我们的「patch」了。我们会将新的 VNode 与旧的 VNode 一起传入 patch 进行比较，经过 diff 算法得出它们的「差异」。最后我们只需要将这些「差异」的对应 DOM 进行修改即可。

### **Vue.js 内部运行机制之响应式系统**

响应式系统基于`Object.defineProperty`

```js
/*
  obj: 目标对象
  prop: 需要操作的目标对象的属性名
  descriptor: 描述符
*/
Object.defineProperty(obj, prop, descriptor);
```

- enumerable，属性是否可枚举，默认 false。
- configurable，属性是否可以被修改或者删除，默认 false。
- get，获取属性的方法。
- set，设置属性的方法。

#### **实现 oberserver**

在 init 的阶段会进行初始化，对数据进行「响应式化」。我们可以实现一个简单的响应式系统

**步骤一：**首先我们定义一个 cb 函数，这个函数用来模拟视图更新，调用它即代表更新视图，内部可以是一些更新视图的方法。

```js
function cb() {
  // 渲染视图
  console.log("视图更新啦");
}
```

**步骤二：**然后我们定义一个 defineReactive，劫持数据

```js
// 这里将Object.defineProperty用函数包装起来，其实也是防止堆栈溢出的方式
// 即函数内作用域私有化变量
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true /* 属性可枚举 */,
    configurable: true /* 属性可被修改或删除 */,
    get: function reactiveGetter() {
      return val; /* 实际上会依赖收集，下一小节会讲 */
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      cb(newVal);
    }
  });
}
```

**步骤三：**上面劫持数据只是针对单个对象，我们需要对多层对象递归监听

```js
function observer(value) {
  if (!value || typeof value !== "object") {
    return;
  }

  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });
}
```

**步骤四：**将`observer`放在`Vue`的构造函数里，因此当实例化`Vue`时，就已经将`data`里的数据进行**响应化**了。

```js
class Vue {
  constructor(options) {
    this._data = options.data; // 获取data
    observer(this._data); // 数据响应化
  }
}

// 因此当下面修改test时，就会触发回调函数cb
let o = new Vue({
  data: {
    test: "I am test."
  }
});
o._data.test = "hello,world."; /* 视图更新啦～ */
```

### **Vue.js 内部运行机制之依赖收集**

依赖收集的目的无非就是，当某些数据变化了，如果这些数据被页面或其他的实例引用，则需要告知他们，数据变化了，你们可以更新了

#### **订阅者 Dep**

订阅者 Dep 主要用来存放`Watcher`观察者对象的，其实就是个数组，然后有一些方法，简单实现如下：

```js
class Dep {
  constructor(){
    // 用来存放watcher对象的数组
    this.subs = [];
  },

  addSub(sub){
    // 添加watcher
    this.subs.push(sub);
  },

  notify(){
    // 通知所有watcher对象更新视图
    this.subs.forEach(sub => {
      // update方法是watcher自己的
      sub.update()
    })
  }
}
```

#### **观察者 Watcher**

```js
class Watcher {
  constructor() {
    // 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到
    // 其实就是watcher对象本身
    Dep.target = this;
  },

  // 更新视图的方法
  update(){
    console.log('视图更新啦');
  }
}

Dep.target = null;
```

#### **依赖收集**

```js
function defineReactive(obj, key, val) {
  /* 一个Dep类对象 */
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
      dep.addSub(Dep.target);
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
      dep.notify();
    }
  });
}

class Vue {
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
    new Watcher();
    /* 在这里模拟render的过程，为了触发test属性的get函数 */
    console.log("render~", this._data.test);
  }
}
```

**注意：**上面的`console.log("render~", this._data.test);`就是为了模拟`render`的过程，因为`render`的过程中依赖的对象会被读取，进而触发`getter`，此时观察者`watcher`已经实例化，也就是此时`Dep.target === new Wathcer`，因此便会将其添加进`dep`数组里。

因此依赖收集的两个前提条件：

1. 触发 get 方法
2. 新建一个 watcher

### **Vue.js 内部运行机制之虚拟 DOM**

前面我们知道了，**`render function` 会被转化成 VNode 节点**，Virtual DOM 其实就是一棵以 JavaScript 对象（VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上。由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。

因此，也可以理解成很多的`VNode`节点组成了`Virtual DOM`。

#### **实现 VNode**

VNode 归根结底就是一个 JavaScript 对象，只要这个类的一些属性可以正确直观地描述清楚当前节点的信息即可，**其实也就是一个类**。我们来实现一个简单的 VNode 类，加入一些基本属性，为了便于理解，我们先不考虑复杂的情况。

```js
class VNode {
  constructor (tag, data, children, text, elm) {
    /*当前节点的标签名*/
    this.tag = tag;
    /*当前节点的一些数据信息，比如props、attrs等数据*/
    this.data = data;
    /*当前节点的子节点，是一个数组*/
    this.children = children;
    /*当前节点的文本*/
    this.text = text;
    /*当前虚拟节点对应的真实dom节点*/
    this.elm = elm;
  }
}
```

比如下面的一个vue组件

```html
<template>
  <span class="demo" v-show="isShow">
    This is a span.
  </span>
</template>
```

用js代码形式(其实也就可以理解为渲染函数，只是下面的是直接实例化VNode)就是如下：

```js
function render () {
  // 下面虽然用new VNode，但感觉用createElement更加合适一些？
  return new VNode(
    'span',
    {
      /* 指令集合数组 */
      directives: [
        {
          /* v-show指令 */
          rawName: 'v-show',
          expression: 'isShow',
          name: 'show',
          value: true
        }
      ],
      /* 静态class */
      staticClass: 'demo'
    },
    [ new VNode(undefined, undefined, undefined, 'This is a span.') ]
  );
}
```

转成真正的VNode的情况就是：

```js
// 再来看VNode的格式就和构造函数里的参数一一对应起来了。
{
  tag: 'span',
  data: {
    /* 指令集合数组 */
    directives: [
      {
        /* v-show指令 */
        rawName: 'v-show',
        expression: 'isShow',
        name: 'show',
        value: true
      }
    ],
    /* 静态class */
    staticClass: 'demo'
  },
  text: undefined,
  children: [
    /* 子节点是一个文本VNode节点 */
    {
      tag: undefined,
      data: undefined,
      text: 'This is a span.',
      children: undefined
    }
  ]
}
```

VNode是一个类，用来产生具体的节点，但还可以将其封装一些，以产生更多类型的节点，比如文本节点，空节点。。。只是根据不同的条件，传入的参数不同而已

比如下面几种方法：

```js
// 创建空节点
function createEmptyVNode () {
  const node = new VNode();
  node.text = '';
  return node;
}

// 创建文本节点
function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// 克隆节点
function cloneVNode (node) {
  const cloneVnode = new VNode(
    node.tag,
    node.data,
    node.children,
    node.text,
    node.elm
  );
  return cloneVnode;
}
```

**总的来说**，VNode 就是一个 JavaScript 对象，用 JavaScript 对象的属性来描述当前节点的一些状态，用 VNode 节点的形式来模拟一棵 Virtual DOM 树。

### **Vue.js 内部运行机制之模板编译**

compile 编译可以分成 parse、optimize 与 generate 三个阶段，最终需要得到 render function。

```html
<div :class="c" class="demo" v-if="isShow">
  <span v-for="item in sz">{{item}}</span>
</div>

<script>
// 定义成字符串
var html = '<div :class="c" class="demo" v-if="isShow"><span v-for="item in sz">{{item}}</span></div>';
</script>
```

#### **parse**

首先是 parse，parse 会用正则等方式将 template 模板中进行字符串解析，得到指令、class、style等数据，形成 AST（在计算机科学中，抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。）。

而得到的AST类似下面代码：

```js
{
  /* 标签属性的map，记录了标签上属性 */
  'attrsMap': {
    ':class': 'c',
    'class': 'demo',
    'v-if': 'isShow'
  },
  /* 解析得到的:class */
  'classBinding': 'c',
  /* 标签属性v-if */
  'if': 'isShow',
  /* v-if的条件 */
  'ifConditions': [
    {
      'exp': 'isShow'
    }
  ],
  /* 标签属性class */
  'staticClass': 'demo',
  /* 标签的tag */
  'tag': 'div',
  /* 子标签数组 */
  'children': [
    {
      'attrsMap': {
        'v-for': "item in sz"
      },
      /* for循环的参数 */
      'alias': "item",
      /* for循环的对象 */
      'for': 'sz',
      /* for循环是否已经被处理的标记位 */
      'forProcessed': true,
      'tag': 'span',
      'children': [
        {
          /* 表达式，_s是一个转字符串的函数 */
          'expression': '_s(item)',
          'text': '{{item}}'
        }
      ]
    }
  ]
}
```

因为我们解析 template 采用循环进行字符串匹配的方式，所以每匹配解析完一段我们需要将已经匹配掉的去掉，头部的指针指向接下来需要匹配的部分。

```js
function advance (n) {
  index += n
  html = html.substring(n)
}
```

#### **optimize**

optimize 主要作用就跟它的名字一样，用作「优化」。

这个涉及到后面要讲 patch 的过程，因为 patch 的过程实际上是将 VNode 节点进行一层一层的比对，然后将「差异」更新到视图上。那么一些静态节点是不会根据数据变化而产生变化的，这些节点我们没有比对的需求，是不是可以跳过这些静态节点的比对，从而节省一些性能呢？

那么我们就需要为静态的节点做上一些「标记」，在 patch 的时候我们就可以直接跳过这些被标记的节点的比对，从而达到「优化」的目的。

经过 optimize 这层的处理，每个节点会加上 static 属性，用来标记是否是静态的。上面的实例代码因为都是有可能变得，因此都不是静态的：
```js
{
  /* 标签属性的map，记录了标签上属性 */
  'attrsMap': {
    ':class': 'c',
    'class': 'demo',
    'v-if': 'isShow'
  },
  /* 解析得到的:class */
  'classBinding': 'c',
  /* 标签属性v-if */
  'if': 'isShow',
  /* v-if的条件 */
  'ifConditions': [
    {
      'exp': 'isShow'
    }
  ],
  /* 标签属性class */
  'staticClass': 'demo',
  /* 标签的tag */
  'tag': 'div',
  /* 标签的tag */
  'static': false,
  /* 子标签数组 */
  'children': [
    {
      'attrsMap': {
        'v-for': "item in sz"
      },
      'static': false
      /* for循环的参数 */
      'alias': "item",
      /* for循环的对象 */
      'for': 'sz',
      /* for循环是否已经被处理的标记位 */
      'forProcessed': true,
      'tag': 'span',
      'children': [
        {
          /* 表达式，_s是一个转字符串的函数 */
          'expression': '_s(item)',
          'text': '{{item}}',
          'static': false
        }
      ]
    }
  ]
}
```

当然判断一个节点是否为静态是与规则的，首先实现一个 isStatic 函数，传入一个 node 判断该 node 是否是静态节点。判断的标准是当 type 为 2（表达式节点）则是非静态节点，当 type 为 3（文本节点）的时候则是静态节点，当然，如果存在 if 或者 for这样的条件的时候（表达式节点），也是非静态节点。

```js
function isStatic (node) {
  if (node.type === 2) {
    return false
  }
  if (node.type === 3) {
    return true
  }
  return (!node.if && !node.for);
}
```

既然知道了哪些是静态，哪些是非静态，则就可以遍历所有节点并标记，如果子节点是非静态，则父节点也是非静态。

```js
function markStatic (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i];
      markStatic(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}
```

接下来是 markStaticRoots 函数，用来标记 staticRoot（静态根）。这个函数实现比较简单，简单来将就是如果当前节点是静态节点，同时满足该节点并不是只有一个文本节点左右子节点（作者认为这种情况的优化消耗会大于收益）时，标记 staticRoot 为 true，否则为 false。

```js
function markStaticRoots (node) {
  if (node.type === 1) {
    if (node.static && node.children.length && !(
    node.children.length === 1 &&
    node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return;
    } else {
      node.staticRoot = false;
    }
  }
}
```

最终则可以实现`optimize`了：

```js
function optimize (rootAst) {
  markStatic(rootAst);
  markStaticRoots(rootAst);
}
```

#### **generate**

generate 会将 AST 转化成 render funtion 字符串，最终得到 render 的字符串以及 staticRenderFns 字符串。

经历过这些过程以后，我们已经把 template 顺利转成了 render function 了，接下来我们将介绍 patch 的过程，来看一下具体 VNode 节点如何进行差异的比对。

#### **实现 oberserver**
#### **实现 oberserver**
#### **实现 oberserver**

### 参考链接

[mvvmfromurl]: https://www.cnblogs.com/onepixel/p/6034307.html
[mvvm-阮一峰-url]: http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
[mvvm-other1-url]: https://draveness.me/mvx
[mvvm-廖雪峰-url]: https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001475449022563a6591e6373324d1abd93e0e3fa04397f000
[vuecli296url]: https://github.com/vuejs/vue-cli/tree/v2#vue-cli-- "vue/cli 2.x版本"
[vuecli3xurl]: https://cli.vuejs.org/zh/guide/#%E8%AF%A5%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%BB%84%E4%BB%B6 "vue/cli 3.x"
[editdom&frameurl(youda)]: https://www.zhihu.com/question/31809713/answer/53544875 "操作dom慢与框架"
