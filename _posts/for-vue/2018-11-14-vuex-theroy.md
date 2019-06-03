---
layout: post
title: 状态管理器
date: Fri May 10 2019 17:25:32 GMT+0800 (中国标准时间)
---
参考：
[React，flux，redux](https://juejin.im/entry/576cb79a2e958a0078d08b67)
[阮一峰说redux](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
[阮一峰说flux](http://www.ruanyifeng.com/blog/2016/01/flux.html)
#### 状态管理的由来
一般来说，程序猿们大部分时间关注的可能不是研发某个具体算法，这是算法工程师／数学家们擅长的东东。程序猿的工作主要是通过调用编程环境中现成的工具函数或接口来实现具体的应用功能，将各个底层接口或算法模块用代码有秩序地拼装联接起来，实现酷炫好用的产品功能，如同组装一件乐高玩具一样。

也就是说程序猿的很多工作往往不是围绕某个高大上的具体算法（“我们不生产算法，我们只是算法的搬运工”），而是像代码界的城管、或者清洁工一样，关注怎样组织文件结构，怎样理清编程思路，怎样命名变量，怎样降低代码耦合度，怎样提高代码的复用性和一致性，提高代码的可读性和健壮性，怎样优化分工协作、减少沟通成本等等。不管是`OOP、FP`等编程思想，还是`MVC`等设计模式、或是各种编程语言下的应用开发框架，很多都是为了帮助程序猿完成这些脏活、累活儿。

在早期网页开发时，页面几乎不需要什么交互，前端只需要将后台提供的网页内容排版呈现出来即可。用户的交互行为一般仅限于填写一个表单，然后把数据提交到服务器，提交成功后，**直接刷新整个页面**。

然而，当页面交互变得复杂后，这种基于服务器维护数据（等价于state），然后整体刷新页面的方式存在以下两个缺陷
1. 反复刷新页面
2. 由交互产生的很多细腻的前端数据，其实也很难交给后台处理，因为这是我们无处安放的临时状态。例如一个菜单是收起还是打开，一个面板是隐藏还是弹出，如果前端不去记录这些view对应的状态，那么后台就要记录这些状态，否则页面刷新后，这些状态信息就会丢失。

#### Flux及redux
React 只是 DOM 的一个抽象层，并不是 Web 应用的完整解决方案。有两个方面，它没涉及。如下:
1. 代码结构
2. 组件之间的通信
对于大型应用，这两方面恰恰是最关键的。

为了解决这个问题，2014年 Facebook 提出了 Flux 架构的概念，引发了很多的实现。
简单说，`Flux`是一种架构思想，专门解决软件的结构问题。它跟`MVC`架构是同一类东西，但是更加简单和清晰。

2015年，Redux 出现，将 Flux 与函数式编程结合一起，很短时间内就成为了最热门的前端架构。

但我们需要知道redux是一个有用的框架，但是并不是非用不可，其实在大多数情况下，我们并不需要。。。那什么时候需要呢，也就是当你遇到实在解决不了的问题时，你才需要。

当以下情况才考虑使用redux
1. 用户的使用方式复杂
2. 不同身份的用户有不同的使用方式（比如普通用户和管理员）
3. 多个用户之间可以协作
4. 与服务器大量交互，或者使用了WebSocket
5. View要从多个来源获取数据

从组件角度考虑，当应用中有一下情景时，可以考虑用redux
- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

现在社区由又出现新的状态管理机制Mobx。React 提供了优化UI渲染的机制， 这种机制就是通过使用虚拟DOM来减少昂贵的DOM变化的数量。MobX 提供了优化应用状态与 React 组件同步的机制，这种机制就是使用响应式虚拟依赖状态图表，它只有在真正需要的时候才更新并且永远保持是最新的。
综合：Mobx数据流太随意，不易追踪，适合小项目，大项目还是用redux等
参考[Mobx](https://cn.mobx.js.org/)

#### vuex

知道了数据状态管理的作用以及由来，我们对vuex就更容易理解了，只是vuex是为vue量身定制的状态管理器，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
另外对于Redux 事实上无法感知视图层，所以它能够轻松的通过一些简单绑定和 Vue 一起使用。

如下一个简单的例子：

```js
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

这个状态自管理应用包含以下几个部分：

- state，驱动应用的数据源；
- view，以声明方式将 state 映射到视图；
- actions，响应在 view 上的用户输入导致的状态变化。

![mini-program-logo](/jsArt/assets/images/vuex/dataDirection.png)
上图是一个单向数据流理念的极简示意图，但是，当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：
- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

>对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

>因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

>另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。

>这就是 Vuex 背后的基本思想，借鉴了 Flux、Redux、和 The Elm Architecture。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

经常被忽略的是，Vue应用中原始数据对象的实际来源，当访问数据对象时，一个vue实例只是简单的代理访问。所以，如果你有一处需要被多个实例间共享的状态，可以简单地通过维护一份数据来实现共享

```js
const sourceOfTruth = {}

const vmA = new Vue({
  data: sourceOfTruth
})

const vmB = new Vue({
  data: sourceOfTruth
})
```

现在当 sourceOfTruth 发生变化，vmA 和 vmB 都将自动的更新引用它们的视图。子组件们的每个实例也会通过 this.$root.$data 去访问。现在我们有了唯一的数据来源，但是，调试将会变为噩梦。任何时间，我们应用中的任何部分，在任何数据改变后，都不会留下变更过的记录。

为了解决这个问题，我们采用一个简单的 store 模式：

```js
var store = {
  debug: true,
  state: {
    message: 'Hello!'
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}
```

需要注意，所有 store 中 state 的改变，都放置在 store 自身的 action 中去管理。这种集中式状态管理能够被更容易地理解哪种类型的 mutation 将会发生，以及它们是如何被触发。当错误出现时，我们现在也会有一个 log 记录 bug 之前发生了什么。

*注意：*因为某个store中的数据改变只有一种方式可以改变，也就是store中的action，其实这个debug模式，只是说，当开启debug模式后，可以跟踪newValue的变化？ 但话又说回来，即使不开启debug也可以打印有关newValue的值啊？？

### store中的各个属性

#### state

```js
// 这里用函数是保证每次都返回新的对象
const state = () => ({
  loanData: {},
  pointData: [],
  currentLoanData: []
});
```

#### Getter

有时候需要从store的state里派生一些状态，其实就可以理解为计算属性，而getters的第一个参数就是state，第二个参数是其他的getters
**注意：**store没有`Setter`，而`Getter`其实就是store的计算属性

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

// Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]

// Getter 也可以接受其他 getter 作为第二个参数：
getters: {
  // ...
  doneTodosCount: ( state, getters ) => {
    return getters.doneTodos.length
  }
}

// 我们可以很容易地在任何组件中使用它：
computed: {
  doneTodosCount: () => {
    return this.$store.getters.doneTodosCount
  };
}

// 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
getters: {
  // ...
  getTodoById: ( state ) => ( id ) => {
    return state.todos.find( todo => todo.id === id )
  }
}
store.getters.getTodoById( 2 ) // -> { id: 2, text: '...', done: false }
// getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果

// mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性，还可以重命名：
export default {
  // ...
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters( {
      doneCount: 'doneTodosCount',
      anotherGetter
      // ...
    } )
  }
}

// mapGetters(namespace?: string, map: Array<string> | Object<string>): Object
// 为组件创建计算属性以返回 getter 的返回值。
// 第一个参数是可选的，可以是一个命名空间字符串。
// 其他的mapActions，mapMutations，mapState参数和上面的类似
```

#### Mutation

更改vuex中的store中的状态的唯一方法是提交mutation。但这里的mutation handler更像是注册事件，并不能直接执行，而是需要触发。。。类似`window.addEventListener('eventType', handler)`只是注册了事件。
另外，handler接受两个参数，参数一是state，参数二是payload

```js
const store = new Vuex.Store( {
  state: {
    count: 1
  },
  // 这里的increment其实就是函数名，因为increment不能直接调用，因此常将函数名改为常量，然后单独抽离出来，便于多人维护开发
  mutations: {
    increment ( state ) {
      // 变更状态
      state.count++
    },
    // 如下,将mutation事件类型定义为常量，可以将这些常量单独放在一个文件里，都挂载在mutationTypes上
    // 但务必注意，mutation事件里执行的都是同步代码
    [ mutationTypes.SET_INCREMENT_DATA ] ( state ) {
      state.count++
    }
  }
} )
```

#### Action

Action 类似于 Mutation，不同在于：

- Action提交的是Mutation，而不是直接变更state状态
- Action可以包含任何的异步操作

```js
const store = new Vuex.Store( {
  state: {
    count: 0
  },
  // 直接变更state状态
  mutations: {
    increment ( state ) {
      state.count++
    }
  },
  // 提交Mutation，让Mutation改变state
  // 这里的context是与store实例具有相同属性和方法的上下文对象，意味着可以借助这个对象来调用store上的api
  // 比如常用的commit(提交mutation),dispath(分发action，其实相当于调用mutation的handler，可接受参数)
  actions: {
    increment ( context ) {
      context.commit( 'increment' )
    },
    // context是对象，上面挂载有commit，dispath的api，可以用解构赋值，如下
    // 尤其是当多次提交mutations的时候
    increment ( { commit } ) {
      commit( 'increment' )
    }
  },
} )
```

上面我们在actions里通过store对象上挂载的commit来提交mutation，进而触发变更state。那**action应该如何触发呢**？

```js
// action通过store.dispatch触发，参数二可以有，是载荷
store.dispatch( 'increment'[, payload ] )
// 还可以以对象方式
store.dispatch( {
  type: 'increment',
  key: value
} )
```

#### 定义在vuex中的*state，mutations, actions*如何在页面方便使用呢？

```js
this.$store.commit('key',value) //提交的mutation，其实就是让mutation里对应逻辑执行
this.$store.dispatch('action') //提交的action，其实就是让action里对应逻辑执行
```

但还可以更方便的利用组件的辅助方法`mapState,mapGetters,mapMutations,mapActions`引入组件内使用，当然首先需要

```js
import { mapState,mapGetters,mapMutations,mapActions } form 'vuex'
```

这些辅助方法有对应的参数，可以接受不同的参数，从而实现**不同形式的引入方式**。

**方式一：**当我们想在组件内使用自定义的名称时，可以传入对象，如下：

```js
computed: {
  // 以下是将state里值引入到页面中
   ...mapState( {
  // 箭头函数可使代码更简练
  count: state => state.count,

  // 传字符串参数 'count' 等同于 `state => state.count`
  countAlias: 'count',

  // 为了能够使用 `this` 获取局部状态，必须使用常规函数
  countPlusLocalState ( state ) {
    return state.count + this.localCount
  }
} )
},
methods: {
   ...mapMutations( [
  'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

  // `mapMutations` 也支持载荷：
  'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
] ),
  
   ...mapActions( [
  'foo', // -> this.foo()
  'bar' // -> this.bar()
] ),
  
   ...mapMutations( {
  add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
} ),
```

上面我们看到mutation与action都是在methods里使用对象展开运算符引入到页面内的，因为二者其实都是方法，只是mutation是同步的，而action一般执行异步操作的情况。

**方式二：**当我们在组件内使用的名称与state里的名称一致时，可以传入数组：

```js
computed: {
  // 映射 this.count 为 store.state.count
  ...mapState(['count'])
}
```

**方式三：**当我们将store中的状态分模块后，也就相当于每个模块就是命令空间了，因此可以只引入某个命名空间下的状态：

```js
computed: {
  // 此时引入的全是module模块里的state
  ...mapState( 'some/nested/module', {
  a: state => state.a,
  b: state => state.b
} )
},
methods: {
  // 此时引入的全是module模块里的actions
  ...mapActions( 'some/nested/module', [
  'foo', // -> this.foo()
  'bar' // -> this.bar()
] ),
}
```

#### 常见问题  

1，若一个mixin在父组件引入，在子组件也引入，而mixin在created里有请求，则页面加载时会请求两次。。。因为都是在created里，请求相当于并行发送。。。

#### 使用vuex的目录结构

使用vuex一般有一定的目录结构，可以参考如下：

```js
src
  |--views
  |  |--pages1
  |  |--pages2
  |  |--pages3
  |--vuex
  |  |--index.js              主store文件
  |  |--mutations-types.js    mutation常量方法名
  |  |--modules               各个数据模块
  |  |  |--moduleOne.js
  |  |  |--moduleTwo.js
  |  |  |--moduleThree.js
  |--app.js
  |--...
  ...
```