---
layout: post
title: 框架思想
date: Fri May 10 2019 17:25:35 GMT+0800 (中国标准时间)
---

### 框架

框架分好多种，比如说ui框架负责渲染ui层面，而像`react，vue`是数据到视图的映射，而`angular`不但有数据到视图的映射，还有自己的路由等。。。每种框架做的东西不同，但各有特点，需要根据业务需要来选择。

像我们常说的`react和vue`，他们核心虽然只解决一个很小的问题，但他们有各自的生态圈及配套的可选工具，当把这些工具一一加进来的时候，就可以组合成非常强大的栈，就可以涵盖其他的那些更完整的框架所涵盖的问题。

### MVVM由来

在`html5`还没火起来的时候，`MVC`作为`web`应用的最佳实践是ok的。这时web应用的`view`层相对简单，前端所需要的数据在后端基本上已经处理好了，`view`层做一下展示就好，那时提倡的是`controller`来处理复杂的业务逻辑，`view`层相对轻量。

等到`html5`大火以后，相对`html4，html5`最大的亮点是为**移动设备提供了一些非常有用的功能，使得 HTML5 具备了开发App的能力**，另外就是**跨平台、快速迭代和上线，节省人力成本和提高效率**，因此很多企业开始对传统app进行改造，逐渐在app里使用了大量的h5页面。

既然要用h5来构建app，那view层做的事情，就不仅仅是简单的数据展示，它不仅**要管理复杂的数据状态，还要处理移动设备上各种操作行为等**，因此前端也需要工程化，一个类似`MVC`的框架来管理这些复杂的逻辑。但相对之前的MVC发生了点变化如下：

传统MVC:

1. View 用来把数据以某种方式呈现给用户。
2. Model 其实就是数据。
3. Controller 接收并处理来自用户的请求，并将 Model 返回给用户。

变化后的MVC:

1. View UI布局，展示数据。
2. Model 管理数据。
3. Controller 响应用户操作，并将 Model 更新到 View 上。

变化后的MVC架构对于简单的应用来说是ok的，也符合软件架构的分层思想。但随着h5的发展，人们更希望使用H5 开发的应用能和Native 媲美，或者接近于原生App 的体验效果，于是前端应用的复杂程度已不同往日，今非昔比。这时前端开发就暴露出了三个痛点问题：

1. 开发者在代码中大量调用相同的 DOM API, 处理繁琐，操作冗余，使得代码难以维护。
2. 大量的DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验。
3. 当 Model 频繁发生变化，开发者需要主动更新到View ；当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到Model 中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

其实，早期jquery 的出现就是为了前端能更简洁的操作DOM 而设计的(也解决了原生DOM api兼容问题)，但它只解决了第一个问题，另外两个问题始终伴随着前端一直存在。

### MVVM原理

`MVVM` 由 `Model,View,ViewModel` 三部分构成，Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI 展现出来，`ViewModel` 是一个同步View 和 Model的对象。

在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，**Model 和 ViewModel 之间的交互是双向的**，而 **View 与 ViewModel 之间是双向数据绑定**， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。而这一切都是通过框架的VM模型实现。。。

### Vue.js

可以说Vue.js是MVVM架构的最佳实践，专注于MVVM中的VM，不仅做到了双向数据绑定，而且还是相对轻量级的js库。

几个名词：

1. Observer 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用Object.defineProperty的getter和setter来实现。
2. Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。
3. Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。
4. Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发notify 函数，再调用订阅者的 update 方法。

当执行 new Vue() 时，Vue 就进入了初始化阶段，一方面Vue 会遍历 data 选项中的属性，并用 Object.defineProperty 将它们转为 getter/setter，实现数据变化监听功能；另一方面，Vue 的指令编译器Compile 对元素节点的指令进行扫描和解析，初始化视图，并订阅Watcher 来更新视图， 此时Wather 会将自己添加到消息订阅器中(Dep),初始化完毕。

当数据发生变化时，Observer 中的 setter 方法被触发，setter 会立即调用Dep.notify()，Dep 开始遍历所有的订阅者，并调用订阅者的 update 方法，订阅者收到通知后对视图进行相应的更新。

参考：

- [mvvm由来][MVVMFromUrl]
- [阮一峰MVVM][MVVM-阮一峰-Url]
- [mvvm是什么][MVVM-廖雪峰-Url]
- [浅谈mvvm][MVVM-other1-Url]

#### **vue/cli 2.x**

现在公司里大多都是基于老版本的`vue-cli`，也就是[`2.96版本`][vueCli296Url]。

```bash
# 安装cli
npm install -g vue-cli
# 初始化项目
vue init <template-name> <project-name>
# 比如
vue init webpack my-project
```

官方模板有以下几种，当然还可以自定义模板，具体参考文档：[`2.96版本`][vueCli296Url]

vue/cli 3.x官方文档参考：[vue/cli 3.x官方文档][vueCli3xUrl]

### 操作dom慢，但测试结果却比React快

来源：[操作dom慢，但测试结果却比React快][editDom&frameUrl(youda)]

#### 原生dom操作与框架

框架的意义在于为你掩盖底层的dom操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。

没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。框架给你的保证是，你在不需要手动优化的情况下，依然可以给你提供过得去的性能。

#### 对React的virtual DOM的误解

React 从来没有说过 “React 比原生操作 DOM 快”。React 的基本思维模式是每次有变动就整个重新渲染整个应用。如果没有 Virtual DOM，简单来想就是直接重置 innerHTML。很多人都没有意识到，在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作... 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。

我们可以比较一下 `innerHTML vs. Virtual DOM` 的重绘性能消耗：

- innerHTML:  render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
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

Angular 和 Vue 都提供了列表重绘的优化机制，也就是 “提示” 框架如何有效地复用实例和 DOM 元素。比如数据库里的同一个对象，在两次前端 API 调用里面会成为不同的对象，但是它们依然有一样的 uid。这时候你就可以提示 track by uid 来让 Angular 知道，这两个对象其实是同一份数据。那么原来这份数据对应的实例和 DOM 元素都可以复用，只需要更新变动了的部分。或者，你也可以直接 track by $index 来进行 “原地复用”：直接根据在数组里的位置进行复用。在题目给出的例子里，如果 angular 实现加上 track by $index 的话，后续重绘是不会比 React 慢多少的。甚至在 dbmonster 测试中，Angular 和 Vue 用了 track by $index 以后都比 React 快: dbmon (注意 Angular 默认版本无优化，优化过的在下面）

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

### Vue.js内部运行机制之全局概览

![dpr&ppi](/jsArt/assets/images/vue-source/总览图.png)

#### **初始化及挂载**

在 new Vue() 之后。 Vue 会调用 _init 函数进行初始化，也就是这里的 init 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。其中最重要的是通过 Object.defineProperty 设置 setter 与 getter 函数，用来实现「响应式」以及「依赖收集」，后面会详细讲到，这里只要有一个印象即可。

初始化之后调用 $mount 会挂载组件，如果是运行时编译，即不存在 render function 但是存在 template 的情况，需要进行**编译**步骤。

#### **编译**

**parse**:  
parse 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST。

**optimize**:  
**optimize 的主要作用是标记 static 静态节点**，这是 Vue 在编译过程中的一处优化，后面当 update 更新界面时，会有一个 patch 的过程， **diff 算法会直接跳过静态节点**，从而减少了比较的过程，优化了 patch 的性能。

**generate**:
generate 是将 AST 转化成 render function 字符串的过程，得到结果是 render 的字符串以及 staticRenderFns 字符串。

在经历过 parse、optimize 与 generate 这三个阶段以后，组件中就会存在渲染 VNode 所需的 render function 了。

compile编译可以分成 parse、optimize 与 generate 三个阶段，最终需要得到 render function。

`render function`为何？  
在实例化vue实例时，代码会有代码`render: h => h(App)`，这里的render就是`render function`。

```js
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

// 等价于

new Vue({
  el: '#app',
  router,
  render: function(createElement){
    return createElement(App);
  }
});
```

其实就是调用`createElement`函数**创建一个虚拟Dom(也是VNode的总称)并返回**。

#### **响应式**

这里的 getter 跟 setter 已经在之前介绍过了，在 init 的时候通过 Object.defineProperty 进行了绑定，它使得当被设置的对象被读取的时候会执行 getter 函数，而在当被赋值的时候会执行 setter 函数。

**当 render function 被渲染的时候，因为会读取所需对象的值，所以会触发 getter 函数进行「依赖收集」，「依赖收集」的目的是将观察者 Watcher 对象存放到当前闭包中的订阅者 Dep 的 subs 中**。

**注意：**当 render function 被渲染的时候，其实是说，当用`createElement`函数创建虚拟DOM的时候，会去获取对象的值，因此会触发 getter 函数进行「依赖收集」

在修改对象的值的时候，会触发对应的 setter， setter 通知之前「依赖收集」得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 Watcher 就会开始调用 update （**每个Watcher都有自己的update方法**）来更新视图，当然这中间还有一个 patch 的过程以及使用队列来异步更新的策略。

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

### **Vue.js内部运行机制之响应式系统**

响应式系统基于`Object.defineProperty`

```js
/*
  obj: 目标对象
  prop: 需要操作的目标对象的属性名
  descriptor: 描述符
*/
Object.defineProperty(obj, prop, descriptor)
```

- enumerable，属性是否可枚举，默认 false。
- configurable，属性是否可以被修改或者删除，默认 false。
- get，获取属性的方法。
- set，设置属性的方法。

#### **实现oberserver**

在 init 的阶段会进行初始化，对数据进行「响应式化」。我们可以实现一个简单的响应式系统

**步骤一：**首先我们定义一个 cb 函数，这个函数用来模拟视图更新，调用它即代表更新视图，内部可以是一些更新视图的方法。

```js
function cb (){
  // 渲染视图
  console.log('视图更新啦');
}
```

**步骤二：**然后我们定义一个 defineReactive，劫持数据

```js
function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,                   /* 属性可枚举 */
    configurable: true,                 /* 属性可被修改或删除 */
    get: function reactiveGetter () {
      return val;                       /* 实际上会依赖收集，下一小节会讲 */
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return;
      cb(newVal);
    }
  });
}
```

**步骤三：**上面劫持数据只是针对单个对象，我们需要对多层对象递归监听

```js
function observer(value){
  if(!value || typeof value !== 'object'){
    return;
  }

  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  })
}
```

**步骤四：**将`observer`放在`Vue`的构造函数里，因此当实例化`Vue`时，就已经将`data`里的数据进行**响应化**了。

```js
class Vue {
  constructor(options){
    this._data = options.data;  // 获取data
    observer(this._data);       // 数据响应化
  }
}

// 因此当下面修改test时，就会触发回调函数cb
let o = new Vue({
  data: {
    test: "I am test."
  }
});
o._data.test = "hello,world.";  /* 视图更新啦～ */
```



#### **实现oberserver**

#### **实现oberserver**

#### **实现oberserver**

### 参考链接

[MVVMFromUrl]: https://www.cnblogs.com/onepixel/p/6034307.html
[MVVM-阮一峰-Url]: http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
[MVVM-other1-Url]: https://draveness.me/mvx
[MVVM-廖雪峰-Url]: https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001475449022563a6591e6373324d1abd93e0e3fa04397f000
[vueCli296Url]: https://github.com/vuejs/vue-cli/tree/v2#vue-cli-- 'vue/cli 2.x版本'
[vueCli3xUrl]: https://cli.vuejs.org/zh/guide/#%E8%AF%A5%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%BB%84%E4%BB%B6 'vue/cli 3.x'
[editDom&frameUrl(youda)]: https://www.zhihu.com/question/31809713/answer/53544875 '操作dom慢与框架'