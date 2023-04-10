
## 步骤
1. 题目
2. 考察知识点
3. 解答

拒绝题海，一个问题搞懂一类问题

## 亮点：

### 基础库

- 浏览器调试基础库，
- source-map的支持，
- 异步组件及异步js的支持

#### 基础库调试相关

- 需要开启浏览器允许跨域模式：`open -n /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir=/Users/didi/MyChromeDevUserData` 项目中太多资源，如果配置或代理比较麻烦，成本较高

### 货运小程序

- 分包架构之store、js部分
- 上传工具链
- 疑难杂症排除：


## 滴滴小程序基础库框架

### Mpx

Mpx支持跨平台小程序编译，不同于常规跨平台框架重新设计一套DSL（domain specific language，特定领域的语言），其实就是Mpx直接利用现有的语法，通过魔改然后编译成各个平台的目标代码。

#### 大致原理

1. 上层框架比如Mpx，通过跨平台抹平模版、组件/页面对象、json、api调用、webview bridge调用等各个方向，得到各个平台可以运行的目标代码，比如wxml，ddml等。
2. 然后wxml或者ddml会经过编译器（一般使用c++编写）编译成可以在webview和js引擎里使用的js和css文件。然后客户端提供webview容器和js引擎供这些js和css代码进行运行，而里面的html在编译器阶段就生成对应的渲染函数，作为js的形式存在。
3. 然后客户端负责去下载这些小程序资源，然后通过启动路径开始加载对应的资源，然后经过一系列的客户端与小程序通信，最终小程序得以渲染到页面上。

其实本质依然有以下几步：

1. 如何将上层框架 -> 转为各个平台的目标代码
2. 目标代码 -> 通过自家的编译器 -> 包含渲染函数的js和css文件
3. 客户端提供webview容器及js引擎，以执行 js 和 css，从而最终渲染出小程序页面

关键点：

- 双线程模型：视图层和逻辑层
- Bridge通信
- 客户端作为容器，提供运行的环境
- 基础库，作为小程序的运行时，提供组件、sdk、小程序实例引擎等

缺点：

- 双线程模型，通信延时且耗时
    - 若单线程，所有的js逻辑、dom树创建、css解析、样式计算、layout、Paint（composite）都在同一线程，很容易卡顿

#### 抹平的细节

- 模板语法差异抹平
- 组件/页面对象差异抹平
- json配置差异抹平
- api调用差异抹平，其实业务侧使用mpx调用，底层会自动适配到各个目标平台
- webview bridge差异抹平，其实就是提供了一个webview sdk，让通过小程序打开的h5，可以顺畅的与小程序进行通信

#### 条件编译

其实这个的目的，就是给用户一定的自由度，用户自己去根据平台差异去抹平框架没有抹平的部分。同时这个特性还可以实现一些平台差异化的逻辑。

主要有三个维度：
- 文件维度，其实就是多态文件，比如ali模式下，优先找 map.ali.mpx ，找不到则用 map.mpx 兜底
- 区块维度：在mpx文件中，一般有 template、js、style、json四个区块，只需在区块上添加 mode="ali" 即可
- 代码维度：其实就是使用编译时注入的环境变量，在代码里if else，definePlugin的原理是在构建阶段，webpack会扫描定义的全局变量，并替换为指定的值而已。但是务必注意，传入definePlugin里的值是表达式，不是单纯的字符串
- 属性维度：其实就是在标签内，使用 @wx，@ali等
- 当然，mpx还区分了mode 和 env，mode的目的是平台，而env则是该平台下，不同的业务线区分

```js
new webpack.DefinePlugin({
  // 正确的使用方法
  'process.env.NODE_ENV': JSON.stringify('production'),
  // 错误的使用方法
  'process.env.NODE_ENV': 'production'
})
```

解释，因为在 Webpack 的构建过程中，Webpack 会将所有的代码解析为 JavaScript 语法树（AST，Abstract Syntax Tree），并且会基于 AST 对代码进行优化和转换。JavaScript 语法树是一个以 JavaScript 代码为输入，以抽象语法树的形式表示代码结构的数据结构。它将 JavaScript 代码的每个部分都抽象为一个节点，这些节点之间通过不同的关系（例如父子关系、兄弟关系等）相互连接。

通过将代码解析为 AST，Webpack 可以分析和理解代码的结构和含义，并可以对代码进行优化和转换。

在构建过程中，Webpack 会将所有的代码文件（包括 JavaScript、CSS、HTML 等）都解析为 AST，并且会将它们合并到一个总的 AST 中，然后对总的 AST 进行优化和转换。

而普通的字符串是不能被解析成 JavaScript 语法树的。在 JavaScript 中，字符串只是一种基本数据类型，它本身并不是 JavaScript 代码。JavaScript 代码需要被解析成语法树，才能被 JavaScript 引擎执行。

在 Webpack 的构建过程中，所有的代码都会被解析成 JavaScript 语法树，并且会被执行 JavaScript 引擎执行。因此，在使用 Webpack 插件时，必须传递一个 JavaScript 表达式作为参数，而不能传递一个普通字符串。如果传递一个普通字符串作为参数，Webpack 会将其解析为一个字符串，而不是 JavaScript 代码，从而无法正确解析和替换变量值。


```js
if (process.env.NODE_ENV === 'production') {
  console.log('This is production environment');
} else {
  console.log('This is development environment');
}

// 如果只传入一个字符串，最终的结果会是如下：
"if(process.env.NODE_ENV === 'production')"

// 如果传入正确，则如下：
if ('production' === 'production') {
  console.log('This is production environment');
} else {
  console.log('This is development environment');
}
```
因此总结：process.env.NODE_ENV 本身就是一个全局变量，不要理解为是挂载在 process.env对象上的。因此为了简化，可以直接：__mpx_mode__

### skyline引擎

- web渲染技术，由于其繁重的历史包袱和复杂的渲染流程，性能与原生仍有很大差距
- skyline，在webview渲染之外，新增渲染引擎，从而提高渲染效率
    - 将 layout、Paint（composite）等渲染任务放到skyline里
    - 同时将js逻辑和dom树创建、css解析及样式计算逻辑，也尽可能的放到逻辑层

#### 特点
- webview线程更加薄，更不容易卡顿
- 不再需要为每个页面都创建一个js引擎实例，减少内存、时间开销
- 页面间数据可以共享更多，进一步减少运行时内存、时间开销
- jsBridge使用场景更少，减少大量通信时间

- wxs，挪到了逻辑层，效率有所下降，之前wxs的效率高，是因为其直接运行在视图层。

- Skyline 在渲染流程上较 WebView 更为精简，避免不可见区域的布局和绘制
- Skyline 采用的是同步光栅化的策略，WebView 是异步分块光栅化的策略，而异步光栅化会出现：快速滚动会出现白屏问题；滚动过程中的 DOM 更新会出现不同步的问题，进而影响到用户体验。
    - 光栅化：计算机图形学中将矢量图形数据转换为像素表示的过程
    - webveiw光栅化：这种技术通过将 Webview 中的内容转换为位图，并将其缓存到内存中，可以显著降低渲染时的 CPU 和 GPU 占用率，同时可以避免渲染引擎版本差异导致的兼容性问题

### 其他

### SemVer 
全称为Semantic Versioning(语义化版本表示)


## 正则表达式

## commander

## 微服务




