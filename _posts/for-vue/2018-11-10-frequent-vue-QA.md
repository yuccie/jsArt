---
layout: post
title: vue的那些常见问题
date: Sat Nov 10 2018 20:16:33 GMT+0800
---

<!-- 参考：[阮一峰-常用git命令操作](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html) 

参考：[阮一峰-远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)  -->


#### token
token是客户端登录的身份凭证，若做了异地登录判断，则会在异地登陆后，之前的token就会过期。。。另外，当退出当前app也会导致之前的token过期

#### Object.assign
Object.assign把数组视为属性名为 0 、 1 、 2 的对象，因此目标数组的 0 号属性4覆盖了原数组的 0 号属性1。
```js
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```

#### prop 单向数据流
>
所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
>
额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。


但有些情况下，确实需要试图改变一个prop的值，如下：

1，这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：
```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```
2，这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：
```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

>
注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。


#### prop 初始化时不触发watch
通常情况下，子组件会定义props的默认值，然后在父组件里还会定义一些props的假数据，然后父组件会去请求接口更新父组件的假数据。。。但通常接口是异步的，意味着页面会先用假数据渲染页面（如果假数据为空，此时即使子组件有默认数据也不会用，相当于直接覆盖），而这个初始渲染过程中props的更新不会触发watch钩子，也就意味着初始化时watch里的逻辑无法执行。。。

但有时候还必须让其更新，暂有两种方式：
**方式一：**可以人为强制触发子组件的watch，即渲染子组件时，修改子组件的props属性值，如下：
```js
mounted () {
	// xxx表示子组件定义的props属性
	this.$set(this.xxx,'trigger',true)
}
```

**方式二：**之所以想让第一次触发，是因为我们想要的数据确实到达了子组件，而我们实现出发后具体的更新逻辑一般在watch里，因此可以将这部分逻辑单独抽离出来，然后在mounted里判断一下，如果有更新数据达到，就执行一下抽离出来的逻辑。。。

