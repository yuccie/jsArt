## mpx 部分逻辑的生命周期

- 页面
- 组件
- mixins


### 生命周期集合

#### app实例生命周期

App(Object object)
注册小程序。接受一个 Object 参数，其指定小程序的生命周期回调等。

App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。

- onLaunch	function		否	生命周期回调——监听小程序初始化。	
- onShow	function		否	生命周期回调——监听小程序启动或切前台。	
- onHide	function		否	生命周期回调——监听小程序切后台。	
- onError	function		否	错误监听函数。	
- onPageNotFound	function		否	页面不存在监听函数。	1.9.90
- onUnhandledRejection	function		否	未处理的 Promise 拒绝事件监听函数。	2.10.0
- onThemeChange

#### 页面生命周期
Page(Object object)
注册小程序中的一个页面。接受一个 Object 类型参数，其指定页面的初始数据、生命周期回调、事件处理函数等。


- data	Object			页面的初始数据
- options	Object			页面的组件选项，同 Component 构造器 中的 options ，需要基础库版本 2.10.1
- behaviors	String Array			类似于mixins和traits的组件间代码复用机制，参见 behaviors，需要基础库版本 2.9.2
- onLoad	function			生命周期回调—监听页面加载
- onShow	function			生命周期回调—监听页面显示
- onReady	function			生命周期回调—监听页面初次渲染完成
- onHide	function			生命周期回调—监听页面隐藏
- onUnload	function			生命周期回调—监听页面卸载
- onPullDownRefresh	function			监听用户下拉动作
- onReachBottom	function			页面上拉触底事件的处理函数
- onShareAppMessage	function			用户点击右上角转发
- onShareTimeline	function			用户点击右上角转发到朋友圈
- onAddToFavorites	function			用户点击右上角收藏
- onPageScroll	function			页面滚动触发事件的处理函数
- onResize	function			页面尺寸改变时触发，详见 响应显示区域变化
- onTabItemTap	function			当前是 tab 页时，点击 tab 时触发
- onSaveExitState	function			页面销毁前保留状态回调
- 其他	any			开发者可以添加任意的函数或数据到 Object 参数中，在页面的函数中用 this 可以访问。这部分属性会在页面实例创建时进行一次深拷贝。

#### 组件生命周期

```js
Component({
  behaviors: [],

  properties: {
    myProperty: { // 属性名
      type: String,
      value: ''
    },
    myProperty2: String // 简化的定义方式
  },
  
  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    onMyButtonTap: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function(){
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange: function(newVal, oldVal) {

    }
  }

})
```

```js
  // app实例级
  onLaunch() {
    console.log('djch mixins lifecycle onLaunch')
  },
  onShow() {
    console.log('djch mixins lifecycle onShow')
  },
  onHide() {
    console.log('djch mixins lifecycle onHide')
  },
  onError() {
    console.log('djch mixins lifecycle onError')
  },
  onPageNotFound() {
    console.log('djch mixins lifecycle onPageNotFound')
  },
  onUnhandledRejection() {
    console.log('djch mixins lifecycle onUnhandledRejection')
  },
  onThemeChange() {
    console.log('djch mixins lifecycle onThemeChange')
  }

// page页面级
  onLoad() {
    console.log('djch mixins lifecycle onLoad')
  },
  onShow() {
    console.log('djch mixins lifecycle onShow')
  },
  onReady() {
    console.log('djch mixins lifecycle onReady')
  },
  onHide() {
    console.log('djch mixins lifecycle onHide')
  },


// component组件级
lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
        console.log('djch mixins lifecycle attached')
     },
    moved: function () { 
        console.log('djch mixins lifecycle moved')
     },
    detached: function () { 
        console.log('djch mixins lifecycle detached')
     },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { 
     console.log('djch mixins lifecycle attached outside')
   }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { 
    console.log('djch mixins lifecycle ready outside')
   },
    detached: function () { 
        console.log('djch mixins lifecycle detached outside')
    },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
        console.log('djch mixins lifecycle show pageLifetimes')
     },
    hide: function () {
        console.log('djch mixins lifecycle hide pageLifetimes')
     },
    resize: function () { 
         console.log('djch mixins lifecycle resize pageLifetimes')
     },
  },
```

```js
export default {
  // app实例级
  onLaunch() {
    console.log('djch mixins lifecycle onLaunch')
  },
  onShow() {
    console.log('djch mixins lifecycle onShow')         // [✅] 打开顺序：4
  },
  onHide() {
    console.log('djch mixins lifecycle onHide')
  },
  onError() {
    console.log('djch mixins lifecycle onError')
  },
  onPageNotFound() {
    console.log('djch mixins lifecycle onPageNotFound')
  },
  onUnhandledRejection() {
    console.log('djch mixins lifecycle onUnhandledRejection')
  },
  onThemeChange() {
    console.log('djch mixins lifecycle onThemeChange')
  },

  // page页面级
  onLoad() {
    console.log('djch mixins lifecycle onLoad')              // [✅] 打开顺序：2
  },
  // onShow() {
  //   console.log('djch mixins lifecycle onShow')
  // },
  onReady() {
    console.log('djch mixins lifecycle onReady')             // [✅] 打开顺序：6
  },
  onHide() {
    console.log('djch mixins lifecycle onHide')
  },


  // component组件级
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log('djch mixins lifecycle attached')         // [✅] 打开顺序：1
    },
    moved: function () {
      console.log('djch mixins lifecycle moved')
    },
    ready: function () {
      console.log('djch mixins lifecycle ready')                // [✅] 打开顺序：5
    },
    detached: function () {
      console.log('djch mixins lifecycle detached')
    },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  // 此处attached的声明会被lifetimes字段中的声明覆盖
  attached: function () {
    console.log('djch mixins lifecycle attached outside')      // [❌]
  }, 
  ready: function () {
    console.log('djch mixins lifecycle ready outside')          // [❌]
  },
  detached: function () {
    console.log('djch mixins lifecycle detached outside')
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log('djch mixins lifecycle show pageLifetimes')     // [✅] 打开顺序：3
    },
    hide: function () {
      console.log('djch mixins lifecycle hide pageLifetimes')
    },
    resize: function () {
      console.log('djch mixins lifecycle resize pageLifetimes')
    },
  },
}
```



### minxs 

Mpx 提供了一套完善的 mixin 机制，有人可能要问，原生小程序中已经支持了 behaviors，为何我们还需要提供 mixin 呢？主要有以下两点原因：

- Behaviors 是平台限度的，只有在部分小程序平台中可以使用，而且内置 behaviors 承载了除了 mixin 外的其他功能，框架提供的 mixin 是一个与平台无关的基础能力；
- Behaviors 只有组件支持使用，页面不支持，而且只支持局部声明，框架提供的 mixin 与组件页面无关，且支持全局 mixin 声明。

#### 局部mixins

Mixin 混合实例对象可以像正常的实例对象一样包含选项，相同选项将进行逻辑合并。举例：如果 mixin1 包含一个钩子 ready,而创建组件 Component 也有一个钩子 ready，两个函数将被调用。 Mixin 钩子按照传入顺序(数组顺序)依次调用，并在调用组件自身的钩子之前被调用。

```js
// mixin.js
export default {
  data: {
    list: {
      'phone': '手机',
      'tv': '电视',
      'computer': '电脑'
    }
  },
  ready () {
    console.log('mixins ready:', this.list.phone)
  }
}
```

```vue
<template>
  <view class="list">
    <view wx:for="{{list}}" wx:key="index">{{item}}</view>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'
  import mixins from '../common/mixins'

  createComponent({
    mixins: [mixins],
    data: {
      list: ['手机', '电视', '电脑']
    },
    ready () {
      console.log('component ready:', this.list.phone)
    }
  })
</script>
```

```bash
// 输出结果为
mixins ready: 手机
component ready: 手机
```

局部mixins总结：
- mixins会先于组件及页面的钩子执行
- 多个页面或组件，引入同一个mixins，mixins只会执行一次。


#### 全局mixins

Mpx 中可以使用 mpx.injectMixins 方法配置全局 mixin，能够按照 App / 组件 / 页面维度自由配置，简单示例如下：

```js
import mpx from '@mpxjs/core'

// 第一个参数为 mixins，可以混入任意配置，第二个参数为混入生效范围，可传递 'app' / 'page' / 'component' 字符串或由其组成的数组
mpx.injectMixins([
  {
    data: {
      customData: '123'
    }
  }
], ['page'])

// mpx.mixin 为 mpx.injectMixins 的别名，混入单个 mixin 时可以直接传递对象，生效范围可传递字符串
mpx.mixin({
  methods: {
    useCustomData () {
      console.log(this.customData)
    }
  }
}, 'component')

// 当未传递生效范围时默认为全局生效，对 app / page / component 都生效
mpx.mixin({
  computed: {
    processedCustomData () {
      return this.customData + '321'
    }
  }
})
```

#### mixins 里都有哪些选项？

- 如何通过代码，或者源码看到最底层的mixins



