---
layout: post
title: vue的那些常见问题
date: Sat Nov 10 2018 20:16:33 GMT+0800
---
参考：[vue技术内幕][vueTechInsdStory]、[vue技术解密][vueTechDecrypt]<br/>


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

#### vue的模板里组件使用方式

注册组件时，既可以使用驼峰，也可以使用 - 连接符，原因在此：

```js
// 注册时，名字同时注册了驼峰和 - 连接符的。
Vue.component(`${prefix}recycle-scroller`, RecycleScroller)
Vue.component(`${prefix}RecycleScroller`, RecycleScroller)
```


#### 过滤器

```js
filters: {
  string2Date(item){
    return string2Date(item)
  },
  formatEnum: (val) => {
    // 打印{a:{}}, a何意？若非箭头函数，this为undefined
    console.log('this', this)
    return val
  }
},
```

#### v-if && v-show
如果一个弹窗里有多个组件，通过一个dialog来控制，为了降低损耗，用v-show。。。但有一个问题，就是页面初始化的时候，dialog内所有组件都不会初始化，但只要有一个组件显示，其他的组件都会被渲染(只是表现为display:none)。。。但这会造成一个问题，就是组件内钩子上的方法会被调用，进而出错。。。而是整个组件内的钩子都会被调用。。。
```js
<el-dialog
  :title="dialog.title"
  :visible.sync="dialog.visible"
> 
  <c-apply-remove
    v-show="dialog.type === menuMap.get('ORDER_APPLY')"
    :visible.sync="dialog.visible"
  ></c-apply-remove>

  <c-view-details 
    v-show="dialog.type === menuMap.get('VIEW_DETAIL')" 
    :orderId="dialog.currentData.orderId"
    :requestId="dialog.currentData.requestId"
    :visible.sync="dialog.visible"
  ></c-view-details>

  <c-review 
    v-show="dialog.type === menuMap.get('REVIEW')" 
    :orderId="dialog.currentData.orderId"
    :requestId="dialog.currentData.requestId"
    :status="dialog.currentData.status"
    :visible.sync="dialog.visible"
  ></c-review >

  <c-change-records 
    v-show="dialog.type === menuMap.get('STATUS_CHANGE_RECORDS')"
    :orderId="dialog.currentData.orderId"
    :visible.sync="dialog.visible"
  ></c-change-records>
</el-dialog>
```


***vue的.native修饰符***<br/>
参考：[.native监听组件根元素原生事件][vueNatvieModifierUrl]、[native原理(知乎)][vueNatvieModifierUrl(知乎)]<br/>
官方：你可能有很多次想要在一个组件的根元素上直接监听一个原生事件，这时可以用.native修饰符。
注意：必须是一个自定义组件上用native，在普通的标签上没有效果，所谓普通就是像div，a这些原生标签。
```html
<barProcess :barObj="barObj.rateOne" @click.native="clickMe"></barProcess>
```
这样就可以给整个组件绑定click的事件，所谓原生事件，不过是原生标签才具有的事件而已
但还要注意，给组件上添加.native，其实仍然是给定义的组件的根原生元素添加的事件，利用事件流冒泡的原理，如果对非根元素使用click.stop后，则父组件使用.native则捕捉不到对应区域的click事件

有个技巧但也不一定好，利用冒泡原理，使用了native后最外层根元素会监听到组件内的点击事件，相当于在子组件内不需要再使用emit暴露指定事件了，但这样适用于组件内点击事件比较少的情况下，多的时候会比较混乱。

***vue的.sync修饰符***<br/>
[.sync修饰符][vueSyncModifierUrl]
在之前的父子组件传递数据时，一般使用props，但是子组件不能直接修改props。。。但是有时候，props的值确实需要变更，只能emit出去，然后父组件再更改。。。但这样有点麻烦，因此.sync的修饰符，就不需要父组件再监听什么了，子组件直接emit出一个特殊事件名即可

```js
// 子组件emit出一个'update:xxx'即可
this.$emit('update:title', newTitle)
```

```html
// 父组件
<text-document v-bind:title.sync="doc.title"></text-document>

// 如果想多个值，比如对象，可以如下
<text-document v-bind.sync="doc"></text-document>
```

***vue的$attrs属性***<br/>

我们经常情况下，使用props进行父子组件传递数据，如果想进行爷孙或者更多层级组件传递的话，props也可以实现，就是嵌套的有点多。

vue从2.4开始，提供了一个$attrs的属性，用于方便的进行多级嵌套组件的传递数据，相比props而言，不需要在子或孙组件里声明props了，直接增加一个inheritAttrs: false,就可以获取从祖先组件里传递过来的属性(不包含class，style，以及props已经定义的属性)。如下是孙子组件：

```html
<template>
  <div></div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    top1Left: ''
  },
  created() {
    console.log('top2, this.$attrs', this.$attrs);
    // 输出：{}
    console.log('this.$top1Left', this.top1Left);
    // 输出：top1Left
  }
};
</script>
```

父组件如下：

```html
<template>
  <div class="top1">
    <!-- 如果想继续向下传递，需要用到这里v-bind="$attrs" -->
    <top2Comp v-bind="$attrs"/>
  </div>
</template>

<script>
import top2Comp from './top2Comp';
export default {
  components: { top2Comp },
  // 这个属性可不加，默认为true，也就是审查元素时，会看到组件上有从上级传过来的属性，类似如下：
  // <div top1left="top1Left"></div>
  // 如果为false，则上面的top1left="top1Left"不会显示。
  inheritAttrs: false,
  props: {
    top1: {
      type: String,
      defalut: 'top1Default'
    }
  },
  created() {
    // 爷爷组件传过来top1，top1Left两个属性，因为top1是props里的属性，因此$attrs只展示top1Left
    // 也就是非props里的属性，也没有class，style
    console.log('top1', this.$attrs);
    // {top1Left: "top1Left"}
  }
};
</script>
```

爷爷组件如下：

```html
<top1Comp :top1="'top1'" :top1Left="'top1Left'" class="top1Class" style="color:red"/>
```

那爷爷组件是如何监听孙子组件的事件的呢？只需三步：

1. 孙子组件$emit('formTop2', data)
2. 父组件添加 v-on="$listeners"
3. 爷爷组件添加：v-on:formTop2="handle"


[vueSyncModifierUrl]: https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6
[vueNatvieModifierUrl]: https://cn.vuejs.org/v2/guide/components-custom-events.html
[vueNatvieModifierUrl(知乎)]: https://zhuanlan.zhihu.com/p/36101632
[vueTechInsdStory]: http://hcysun.me/vue-design/
[vueTechDecrypt]: https://ustbhuangyi.github.io/vue-analysis/