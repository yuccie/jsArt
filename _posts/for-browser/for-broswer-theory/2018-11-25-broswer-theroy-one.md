---
layout: post
title: 浏览器工作原理和实践
date: Sat Nov 24 2018 14:53:50 GMT+0800 (中国标准时间)
---


### 前言

### 宏观视角下的浏览器

#### 1、熟悉常见Web技术，理解JavaScript语言核心技术(DOM,BOM,Ajax,JSON,事件)等。

##### web安全，egg，node+express,算法，浏览器缓存，开发中的一些坑，一些好的代码集合？

##### 常见的web技术有哪些？

常见web技术：框架，ui库，动画库，时间库，js工具库，特定组件库（selectTree），工程化：webpack，babel，loader，plugin，server，proxy等等，新特性Es2020（需要使用几个？），pwa，webworker，service worker，

##### 什么是BOM？

BOM是浏览器对象模型，是用来访问浏览器的功能，比如window对象，而window对象即是访问Bom的接口，又是ecmaJs规定的全局对象
参考：https://mp.weixin.qq.com/s/2JWXRVfqIlx_C1avkesNxw

知识点：虽然定义在全局的变量 就会变成window对象的属性。但与直接定义window对象的属性还是不同的。
直接定义的全局变量不能使用delete删除。
因为使用var定义的变量都有一个Configurable的特性，这个特性的值被设置为false，所以这样定义的属性不能被delete删除（若删除则返回 false）。

```js
var test = 'msg';
Object.getOwnPropertyDescriptor(window, 'test');

value: "msg"
writable: true
enumerable: true
configurable: false
```

知识点：location也是一个非常特别的属性。因为，它即是window的属性，也是document的属性。即
window.location === document.location === location

##### 什么是DOM

Dom是文档对象模型，浏览器渲染引擎无法直接理解html文档，需要转换成dom才可以，另外由于dom是对象，因此也就提供了与之相关的命令来操作dom，比如document.queryslsect()等等。

##### 分析下Ajax

Ajax可以说是前端发展的分水岭，Ajax之前页面刷新的方式是整个页面刷新，而Ajax提供了另外一种方式：局部页面刷新，体验更好。而Ajax即“Asynchronous Javascript And XML”，
异步js和xml，说白了就是异步获取js代码或者xml，进而利用获取的js和xml来更新页面的对应部分，所以是局部刷新……相比获取整个页面文档，显然体积小很多。
底层用的是XMLHttpRequest对象（IE6及以下使用ActiveXObject对象），常见请求格式参考：
https://mp.weixin.qq.com/s/DL06fe2bwEdiAbiIwOqbog

注意：

- xml.open(method，url，async)，参数三为是否同步，ture为异步(默认),false为同步。
- get和post除了请求方式和请求体不同，还有一点就是get请求会被缓存
- 相比XMLHttpRequest对象这种最原始的请求方式，不但不方便而且结构啰嗦，Fetch被称为下一代Ajax技术,采用Promise方式来处理数据。 是一种简洁明了的API，比XMLHttpRequest更加简单易用。说白了Ajax是使用事件监听，而Fetch是使用promise处理响应。但现在还不能做到所有浏览器支持，可以引入polyfill。fetch是浏览器原生支持的，并有没利用XMLHttpRequest 来封装。
- 代码里若是调用XMLHttpRequest，则是直接走网络进程，不需要浏览器主进程介入。

#### 2、深刻理解MV*、数据驱动视图、web语义化等并熟练掌握Vue相关框架

#### 什么是MV*?

Mv*模型，说白了就是数据，逻辑，显示之间的关系，像vue这种mvvm，v就可以理解为视图，也就是template，而m就是数据，而vm就是data，视图和数据就是通过data联系起来的。在vue里的methods以及各种生命周期无不是为了在不同阶段增删改查data，data修改完后，框架会批量更新到页面，也就利用到了事件队列。

而mvc模型，在egg里体现比较明显，c是控制器，主要执行一些复杂的数据处理，比如增删改查数据库里的数据，v就是页面，当然页面有很多模板，比如ejs，pug等。然后m就可以理解为数据库里的数据(而有时候我们说的redis和真正意义上的数据库还不同，操作数据库成本较高，而redis主要解决的问题是如何快速的响应给用户经常访问的信息，比如用户的登陆信息等)，其实egg项目里就有model目录，就是用来存放数据库相关的逻辑。

Redis参考：https://mp.weixin.qq.com/s/OYu_dwA3BvSFt_5T2VYE1Q

##### 如何理解数据驱动视图？

数据驱动视图，相比很早之前，获取元素标签，然后直接去更新里面的内容，现在只需更改对应的数据就可以自动把变化更新到页面。只是框架帮我们做了

#### 3、熟练掌握Web及Mobile相关的开发技术，考虑页面加载、执行、渲染等性能优化

#### 无头浏览器

参考：https://www.zhihu.com/question/314668782

我们日常使用浏览器的步骤为：启动浏览器、打开一个网页、进行交互。而无头浏览器指的是我们使用脚本来执行以上过程的浏览器，能模拟真实的浏览器使用场景。

有了无头浏览器，我们就能做包括但不限于以下事情：

- 对网页进行截图保存为图片或 pdf。
- 抓取单页应用(SPA)执行并渲染(解决传统 HTTP 爬虫抓取单页应用难以处理异步请求的问题)。
- 做表单的自动提交、UI的自动化测试、模拟键盘输入等。
- 用浏览器自带的一些调试工具和性能分析工具帮助我们分析问题。
- 在最新的无头浏览器环境里做测试、使用最新浏览器特性。
- 写爬虫做你想做的事情。

无头浏览器很多，包括但不限于：

- PhantomJS, 基于 Webkit
- SlimerJS, 基于 Gecko
- HtmlUnit, 基于 Rhnio
- TrifleJS, 基于 Trident
- Splash, 基于 Webkit

#### 浏览器的架构？

浏览器原理李冰老师哔哩哔哩主页[二进制学院](https://space.bilibili.com/37364459?spm_id_from=333.788.b_765f7570696e666f.2)

页面加载过程，先来了解一下浏览器的架构：

- 浏览器进程：主要负责用户交互、子进程管理和文件储存等功能。

- 网络进程：是面向渲染进程和浏览器进程等提供网络下载功能。

- 渲染进程：的主要职责是把从网络下载的 HTML、JavaScript、CSS、图片等资源解析为可以显示和交互的页面。因为渲染进程所有的内容都是通过网络获取的，会存在一些恶意代码利用浏览器漏洞对系统进行攻击，所以运行在渲染进程里面的代码是不被信任的。这也是为什么 Chrome 会让渲染进程运行在安全沙箱里，就是为了保证系统的安全。
。

- GPU进程，GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。

- 插件进程，主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。

请求长时间处于pending状态或者脚本执行死循环，这时刷新或前进后退页面不响应，刷新或前进后退页面是属于浏览器主进程的UI交互行为，为什么渲染进程里的js引擎执行会影响到主进程？

答：因为前进或者后退也需要执行当前页面脚本啊，比如要执行beforeunload事件，执行的时候页面没响应了，所以前进后退也就失效了

渲染进程有个主线程，DOM解析，样式计算，执行JavaScript，执行垃圾回收等等操作都是在这个主线程上执行的，没有所谓的渲染引擎线程和js引擎线程的概念，你可以把渲染和执行JavaScript是一种功能，如果要执行这些功能的话，需要在一个线程上执行，在chrome中，他们都是执行在渲染进程的主线程上。正是因为他们都是执行在同一个线程之上的，所以同一时刻只能运行一个功能，也就是你说的互斥。

#### 从输入URL到页面展示，这中间发生了什么？

1. 当用户在地址栏中输入一个查询关键字时，地址栏会判断输入的关键字是搜索内容，还是请求的 URL，进而处理拼装成对应的URL格式。（按下回车后，浏览器给当前页面一次执行 beforeunload 事件的机会，意味着你可以在页面退出前做些什么）
2. 浏览器进程会通过进程间通信（IPC）把 拼装好的URL 请求发送至网络进程，网络进程首先查找本地是否有缓存(这里缓存可以理解为资源和域名缓存等)，有则直接返回，没有则进行DNS解析获取ip，如果是https则还需要建立TLS连接。
3. 浏览器构建请求头(头和行)，发送给服务器，服务器解析请求头，然后返回响应头，网络进程收到响应头便开始解析，需要根据code码做适当处理，比如301，302等重定向的，就会获取Location字段，重新发起请求。还会根据响应头里的`content-type:application/octet-stream;charset=UTF-8`来判断是下载还是普通页面。下载的话就直接交给下载管理器，同时该URL的导航过程也就结束了。如果是页面，因为页面是在渲染进程里，所以下一步就是准备渲染进程
4. 默认情况下，Chrome会为每个标签页分配一个渲染进程，但一个站点(相同协议和根域名，比同源要求低)下的页面一般共用一个渲染进程，准备好了渲染进程，但现在页面资源还在网络进程那，所以下一步就需要提交文档。
5. 所谓提交文档，就是指浏览器进程将网络进程接收到的 HTML 数据提交给渲染进程（其实浏览器收到网络进程的响应头后，就给渲染进程发消息，说你要准备渲染页面啦，渲染进程收到消息就会与网络进程建立连接来获取页面数据，等页面数据传输完毕后，会告诉浏览器主进程，主进程收到确认提交消息后就会更新浏览器界面状态，包括了安全状态、地址栏的 URL、前进后退的历史状态，并更新 Web 页面）
6. 一旦主进程收到确认提交消息后，渲染进程就开始页面解析及子资源加载了。而一旦页面生成完成，渲染进程会发消息给主进程，然后浏览器主进程就会停止标签图标的加载动画。

**关于渲染进程数量，这里再详细说下：**

在默认情况下，如果打开一个标签页，那么浏览器会默认为其创建一个渲染进程。但如果从一个标签页中打开了另一个新标签页，当新标签页和当前标签页属于**同一站点(相同协议，相同根域名)**的话，那么新标签页会复用当前标签页的渲染进程。

如果如果我们分别打开这两个标签页，比如先打开极客邦的标签页，然后再新建一个标签页，再在这个新标签页中打开极客时间，这时候我们可以看到这两个标签页分别使用了两个不同的渲染进程。这里既然都是同一站点，**为什么从 A 标签页中打开 B 标签页，就会使用同一个渲染进程，而分别打开这两个标签页，又会分别使用不同的渲染进程**？

这就需要知道，**浏览器标签页之间是可以通过js脚本进行连接**的，常用的方式有：

**第一种是通过标签来和新标签建立连接**:

```html
<a href="https://time.geekbang.org/" target="_black">极客时间</a>
```

这是从极客邦官网中打开极客时间的链接，点击该链接会打开新的极客时间标签页，新标签页中的 window.opener 的值就是指向极客邦标签页中的 window，这样就可以在新的极客时间标签页中通过 opener 来操作上个极客邦的标签页了。这样我们可以说，这**两个标签页是有连接的**。

还可以**通过 JavaScript 中的 window.open 方法来和新标签页建立连接**:

```js
new_window = window.open("http://time.geekbang.org")
```

当前标签页中通过 new_window 来控制新标签页，还可以在新标签页中通过 window.opener 来控制当前标签页。所以我们也可以说，如果从 A 标签页中通过 window.open 的方式打开 B 标签页，那么 A 和 B 标签页也是有连接的

其实通过上述两种方式打开的新标签页，**不论这两个标签页是否属于同一站点，他们之间都能通过 opener 来建立连接，所以他们之间是有联系的**。在 WhatWG 规范中，把这一类具有相互连接关系的标签页称为**浏览上下文组** ( browsing context group)。

通常情况下，我们把一个**标签页所包含的内容，诸如 window 对象，历史记录，滚动条位置等信息称为浏览上下文。这些通过脚本相互连接起来的浏览上下文就是浏览上下文组**。

也就是说，如果在极客邦的标签页中，通过链接打开了多个新的标签页，不管这几个新的标签页是否是同一站点，他们都和极客邦的标签页构成了浏览上下文组，因为这些标签页中的 opener 都指向了极客邦标签页。

**Chrome 浏览器会将浏览上下文组中属于同一站点的标签分配到同一个渲染进程中**，这是因为如果一组标签页，既在同一个浏览上下文组中，又属于同一站点，那么它们可能**需要在对方的标签页中执行脚本**。因此，它们必须运行在同一渲染进程中。

多个页面放在同一个渲染进程中，可以共用一些脚本同时节约进程，但有一个缺点，就是如果一个页面挂了，整个进程都会挂掉。。。因此有时候如果不想放在同一个渲染进程里，可以通过代码断开页面之间的连接。比如[阿里云](https://linkmarket.aliyun.com/)的站点：

```html
<a target="_blank" rel="noopener noreferrer" href="/search?xxx">智能城市</a>
```

**通常，将 noopener 的值引入 rel 属性中，就是告诉浏览器通过这个链接打开的标签页中的 opener 值设置为 null，引入 noreferrer 是告诉浏览器，新打开的标签页不要有引用关系**。

##### 渲染进程渲染页面的详细过程是什么？

上面我们知道了URL到页面展示的大概过程，那渲染进程是如何解析页面资源的呢？页面资源包含html,css,js等，按照渲染流水线可以分如下几个阶段：**构建 DOM 树、样式计算、布局阶段、分层、绘制、分块、光栅化和合成。**

1. 构建DOM树，浏览器无法直接理解html，所以需要转化为浏览器可以理解的格式DOM树。构建DOM树的输入是html文件，然后经过html解析器生成DOM树，控制台输入document即可看到DOM树。DOM树几乎和html是一模一样的，只是前者存在于内存中，可以通过js来增删改查。
2. 样式计算，和 HTML 文件一样，浏览器也是无法直接理解这些纯文本的 CSS 样式，所以当渲染引擎接收到 CSS 文本时，会执行一个转换操作，将 CSS 文本转换为浏览器可以理解的结构——styleSheets。控制台输入：document.styleSheets即可查看。同样可以通过js来增删改查，另外需要注意，因为编写代码时，我们用了很多不同的单位比如rem，em，red，blod等，这些都会再转换为一个标准的基准，比如1em转为16px，red转为rgb(255,0,0)等。最后根据css的继承和层叠规则(控制台可以看到层叠顺序，UserAgent表示浏览器默认样式)，最终输出每个DOM节点的样式，并保存在ComputedStyle结构里。
3. 布局树，现在有了DOM树和DOM树的样式，下一步就是创建布局树，因为有些节点是display:node，因此这些节点将不会出现在布局树上。接下来就是根据布局树，详细计算出布局树中相应节点的准确位置了(过程复杂)，并将这些位置信息保存在布局树中。
4. 分层，页面中有很多复杂的效果，如一些复杂的 3D 变换、页面滚动，或者使用 z-index 做 z 轴排序等，为了更加方便地实现这些效果**，渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树（LayerTree）**，可以在控制台打开layers查看图层信息。但并不是每个元素占用一个图层，一般有层叠上下文(z-index或三维属性)和剪裁特性(超出视图滚动)的元素，才会被提升为一个单独的图层。
5. 图层绘制，想象一下我们如何画画，是不是先画底色，然后一层一层的叠加画。而图层绘制原理差不多，会将每个图层绘制拆分为很多小的绘制指令，然后再把这些指令按照顺序组成一个待绘制列表。可以通过控制台-Layers-document查看
6. 栅格化操作，绘制列表只是用来记录绘制顺序和绘制指令的列表，而实际上绘制操作是由渲染引擎中的合成线程来完成的。当图层的绘制列表准备好之后，主线程会把该绘制列表提交（commit）给合成线程。有的图层很大，全部一下子绘制，开销太大，一般会将图层划分为图块（tile），而根据视口的大小，只绘制可见视口上下一定范围优先级高的图块（大小一般为256x256 或者 512x512），但有时候即使优先级高，也会耗时很多造成白屏，此时chrome首次合成时采用低分辨率的图片，等正常比例内容绘制好之后再替换之前低分辨率内容。也就是栅格化，是指合成线程会按照视口附近的图块来优先生成位图。而栅格化一般都会借助GPU
7. 合成与显示，一旦所有图块都被光栅化，合成线程就会生成一个绘制图块的命令——“DrawQuad”，然后将该命令提交给浏览器进程。浏览器进程里面有一个叫 viz 的组件，用来接收合成线程发过来的 DrawQuad 命令，然后根据 DrawQuad 命令，将其页面内容绘制到内存中，最后再将内存显示在屏幕上。

知道了渲染过程，也就知道了为何重排，重绘的代价高了，而**CSS3的动画性能比较好，原因就在于其避开了重排和重绘，直接在非主线程上执行合成动画操作，没有占用主线程的资源，因此绘制效率大大提升**。

##### 变量提升，JavaScript代码是按顺序执行的吗？

所谓的变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined。

“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，但，这并不准确。实际上变量和函数声明在代码里的位置是不会改变的，而是在编译阶段被 JavaScript 引擎放入内存中。对，你没听错，一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，编译完成之后，才会进入执行阶段

输入一段代码，经过编译，会生成两部分：**执行上下文（Execution context）和可执行代码。**

执行上下文是 JavaScript 执行一段代码时的运行环境，比如调用一个函数，就会进入这个函数的执行上下文，确定该函数在执行期间用到的诸如 this、变量、对象以及函数等。在执行上下文中存在一个变量环境的对象（Viriable Environment），该对象中保存了变量提升的内容，比如下面代码：

```js
showName()
console.log(myname)
var myname = '极客时间'
function showName() { console.log('函数showName被执行');}

// 变量提升的部分
var myname = undefined
function showName() { console.log('函数showName被执行');}

// 执行部分的代码
showName()
console.log(myname)
myname = '极客时间'
```

在变量环境中，就有如下存在：

```bash
VariableEnvironment:
     myname -> undefined,
     showName ->function : {console.log(myname)}
```

**注意：**如果一个函数带有参数，编译过程中，参数会通过参数列表保存到变量环境中

js引擎会逐行分析代码，遇见可变量提升的就会在变量环境的对象里初始化，接下来 JavaScript 引擎会把声明以外的代码编译为字节码。接下来JavaScript 引擎开始执行“可执行代码”，按照顺序一行一行地执行。遇到变量，便在变量环境中查找，找不到就会报错。

**另外需要注意**：变量提升时，后者会覆盖前者，若是变量和函数同名，则函数优先级高。

总结：

- JavaScript 代码执行过程中，需要先做变量提升，而**之所以需要实现变量提升，是因为 JavaScript 代码在执行之前需要先编译**。
- 在编译阶段，变量和函数会被存放到变量环境中，变量的默认值会被设置为 undefined；在代码执行阶段，JavaScript 引擎会从变量环境中去查找自定义的变量和函数
- 如果在编译阶段，存在两个相同的函数，那么最终存放在变量环境中的是最后定义的那个，这是因为后定义的会覆盖掉之前定义的。

##### 调用栈：为什么JavaScript代码会出现栈溢出？

当一段代码被执行时，JavaScript引擎会对齐进行编译，并创建执行上下文，但哪种代码才会在执行前编译并创建执行上下文呢？

1. 当 JavaScript 执行全局代码的时候，会编译全局代码并创建全局执行上下文，而且在整个页面的生存周期内，全局执行上下文只有一份。
2. 当调用一个函数的时候，函数体内的代码会被编译，并创建函数执行上下文，一般情况下，函数执行结束之后，创建的函数执行上下文会被销毁。
3. 当使用 eval 函数的时候，eval 的代码也会被编译，并创建执行上下文。

代码中经常会出现函数调用函数的情况，而**调用栈就是用来管理函数调用关系的一种数据结构。**

```js
var a = 2
function add(){
    var b = 10
    return  a+b
}
add()

// 全局执行上下文之变量环境
a = undefined
add = function () {
  b = 10;
  return a + b;
}
```

执行过程：

1. 执行到add()之前，js引擎会首先创建全局执行上下文，包含声明的函数和变量。
2. 全局执行上下文准备好之后，开始执行全局代码，从全局执行上文中取出add函数声明代码
3. 然后对add函数进行编译，并创建函数的执行上下文和可执行代码。
4. 最后执行代码。

因此我们知道，当执行到 add 函数的时候，我们就有了两个执行上下文了——**全局执行上下文和 add 函数的执行上下文**。也就是说，在执行 JavaScript 时，可能会存在多个执行上下文，而这个**多个执行上下文就是通过栈这种数据结构来管理的**。

栈结构类似一个一端封死的单行道，先进去的只能最后出来，最后进去的先出来。即：**后进先出**

在执行上下文创建好后，JavaScript 引擎会将执行上下文压入栈中，通常把这种用来管理执行上下文的栈称为执行上下文栈，又称调用栈。

***实际应用**：*

- 开发者工具 - source - 断点 - 刷新页面 - 右侧call stack即可查看。栈的最底部一般是anonymous表示全局的函数的入口
- 可以直接在代码里执行console.trace()

栈溢出：调用栈是有大小的（容量和深度，任何一个指标超过即溢出），当入栈的执行上下文超过一定数目，JavaScript 引擎就会报错，我们把这种错误叫做栈溢出。 比如以下递归逻辑：

```js
function division(a,b){
  return division(a,b)
}
console.log(division(1,2))
// 执行函数division，并创建执行上下文，由于是递归，则一直创建执行上下文
// 并压入到执行栈中，最后导致执行栈溢出
// 超过了最大栈调用大小（Maximum call stack size exceeded）。
```

知道了，因为不断压入执行上下文才会出现栈溢出，所以如果降低压入执行栈的次数，不就解决了吗？

#### 块级作用域：var缺陷以及为什么要引入let和const？

由于 JavaScript 存在变量提升这种特性，从而导致了很多与直觉不符的代码，这也是 JavaScript 的一个重要设计缺陷。

ECMAScript6（以下简称 ES6）已经通过引入块级作用域并配合 let、const 关键字，来避开了这种设计缺陷，但是由于 JavaScript 需要保持向下兼容，所以变量提升在相当长一段时间内还会继续存在。

**那为何会有变量提升呢？**
这个问题需要先说作用域，**作用域是指在程序中定义变量的区域，该位置决定了变量的生命周期。通俗地理解，作用域就是变量与函数的可访问范围，即作用域控制着变量和函数的可见性和生命周期**。

在ES6之前，作用域只有两种：全局和函数。而其他语言都普遍支持块级作用域。**块级作用域**就是使用一对大括号包裹的一段代码，比如函数、判断语句、循环语句，甚至单独的一个{}都可以被看作是一个块级作用域。

和 Java、C/C++ 不同，ES6 之前是不支持块级作用域的，因为当初设计这门语言的时候，并没有想到 JavaScript 会火起来，所以只是按照最简单的方式来设计。没有了块级作用域，再把作用域内部的变量统一提升无疑是最快速、最简单的设计，不过这也直接导致了函数中的变量无论是在哪里声明的，在编译阶段都会被提取到执行上下文的变量环境中，所以这些变量在整个函数体内部的任何地方都是能被访问的，这也就是 JavaScript 中的变量提升。

由于变量提升会导致一些莫名其妙的问题：

- 变量值在莫名的情况下被覆盖
- 本应销毁的变量没有被销毁。

```js
// 按道理讲，for循环结束后，i应该被销毁
// 但实际上，i由于变量提升，没有被销毁
function foo(){
  for (var i = 0; i < 7; i++) {
  }
  console.log(i);
}
foo() // 7
```

这些问题导致一些表现和其他支持块级作用域的语言表现不一致，必然给人一些误解。因此ES6引入let和const关键字来支持块级作用域。

**但js是如何支持块级作用域的呢？**
其实块级作用域就是通过词法环境的栈结构来实现的，而变量提升是通过变量环境来实现，通过这两者的结合，JavaScript 引擎也就同时支持了变量提升和块级作用域了。

也就是说，在执行上下文中，除了变量环境，还维护一个词法环境，这个词法环境里通过维护一个栈结构来支持块级作用域。而当代码需要一个变量时，从执行上下文里查找的顺序是：先词法环境后变量环境，因此就实现了块级作用域。

#### 作用域链和闭包 ：代码中出现相同的变量，JavaScript引擎是如何选择的？

根据执行栈里的执行上下文顺序，下面代码执行后，应该打印‘极客邦’，但结果却是‘极客时间’。。。这里就涉及到另一个概念：**作用域链**

```js
function bar() {
    console.log(myName)
}
function foo() {
    var myName = "极客邦"
    bar()
}
var myName = "极客时间"
foo()
```

其实在每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文，我们把这个外部引用称为 outer。当一段代码使用了一个变量时，JavaScript 引擎首先会在“当前的执行上下文”中查找该变量，如果在当前的变量环境中没有查找到，那么 JavaScript 引擎会继续在 outer 所指向的执行上下文中查找。我们把这个**通过作用域查找变量的链条叫做作用域链，切记切记：作用域链的顺序与执行栈的顺序不一定相同**

作用域链：通过作用域查找变量的链条，而作用域可以理解为执行上下文。但和调用栈的顺序还不相同

**那这个作用域链的顺序是由什么确定的呢**？答案是：词法作用域，词法作用域就是指作用域是由代码中**函数声明的位置**来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。而词法作用域是代码阶段就决定好的，和函数是在哪调用的没有关系。

因此上面bar函数虽然在foo函数内部调用的，但bar定义在全局，因此依然去全局执行上下文的变量环境中去找myName。

在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。

```js
function foo() {
    var myName = "极客时间"
    let test1 = 1
    const test2 = 2
    var innerBar = {
        getName:function(){
            console.log(test1)
            // debugger
            return myName
        },
        setName:function(newName){
            myName = newName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName("极客邦")
bar.getName()
console.log(bar.getName())

// 栈顶foo函数执行上下文之变量环境：
myName = ‘极客时间’;
innerBar = function() {}
outer // 指向外部作用域

// 栈顶foo函数执行上下文之词法环境：
test2 = 2
test1 = 1

// 栈底全局执行上下文之变量环境
bar = undefined
outer = null
// 栈底全局执行上下文之词法环境为空
```

当执行完foo()后，foo的执行上下文从栈顶弹出，但是由于返回的 setName 和 getName 方法中使用了 foo 函数内部的变量 myName 和 test1，所以这两个变量依然保存在内存中。如下：
```js
// 栈顶foo函数执行上下文之变量环境为空：


// 栈顶foo函数执行上下文之词法环境：
myName = '极客时间'
test1 = 1

// 栈底全局执行上下文之变量环境
bar = undefined
outer = null
// 栈底全局执行上下文之词法环境为空
```

根据执行栈里上下文顺序以及作用域链，可以知道结果为1，极客邦(setName先修改了)。

**实际应用**：可以在getName内部打断点，然后控制台查看右侧scope，可以看到作用域链的顺序：Local–>Closure(foo)–>Global，其中Closure(foo)就是foo函数的闭包，Local 就是当前的 getName 函数的作用域。

通常，如果引用闭包的函数是一个全局变量，那么闭包会一直存在直到页面关闭；但如果这个闭包以后不再使用的话，就会造成内存泄漏。

如果引用闭包的函数是个局部变量，等函数销毁后，在下次 JavaScript 引擎执行垃圾回收时，判断闭包这块内容如果已经不再被使用了，那么 JavaScript 引擎的垃圾回收器就会回收这块内存。

所以在使用闭包的时候，你要尽量注意一个原则：**如果该闭包会一直使用，那么它可以作为全局变量而存在；但如果使用频率不高，而且占用内存又比较大的话，那就尽量让它成为一个局部变量**。

```js
var bar = {
    myName:"time.geekbang.com",
    printName: function () {
        console.log(myName)
    }
}
function foo() {
    let myName = "极客时间"
    return bar.printName
}
let myName = "极客邦"
let _printName = foo()
_printName()
bar.printName()
```

分析以上代码，看结果如何，务必注意，闭包产生条件：**内层函数引用外层函数作用域下的变量，并且内层函数在全局可以访问**。

解析：

1. bar 不是一个函数，因此 bar 当中的 printName 其实是一个全局声明的函数，bar 当中的 myName 只是对象的一个属性，也和 printName 没有联系，如果要产生联系，需要使用 this 关键字，表示这里的 myName 是对象的一个属性，不然的话，printName 会通过词法作用域链去到其声明的环境，也就是全局，去找 myName

2. foo 函数返回的 printName 是全局声明的函数，因此和 foo 当中定义的变量也没有任何联系，这个时候 foo 函数返回 printName 并不会产生闭包。因此打印两次极客邦

#### this：从JavaScript执行上下文的视角讲清楚this

前面的例题，其实就是想实现**在对象内部的方法中使用对象内部的属性**，但结果却不是想要的效果。。。这确实是一个需求，但是 JavaScript 的作用域机制并不支持这一点，**基于这个需求，JavaScript 又搞出来另外一套 this 机制**

如下即可实现实现对象内部的方法使用对象内部的属性：

```js
printName: function () {
  console.log(this.myName)
}
```

**务必注意：**this机制和作用域链是两套不同的机制。

前面我们知道，执行时上下文中有变量环境、词法环境、外部环境，但其实还有一个 this。this 是和执行上下文绑定的，也就是说每个执行上下文中都有一个 this。

执行上下文主要分三种：全局，函数，eval。因此this也对应着这三种。

全局执行上下文中的 this 是指向 window 对象的。这也是 this 和作用域链的唯一交点，作用域链的最底端包含了 window 对象，全局执行上下文中的 this 也是指向 window 对象。全局函数中的this也指向window。。。那有没有什么方式可以修改this指向呢？

答案是肯定的

1. 常用call,apply,bind三种方式之一。
2. 对象来调用其内部的一个方法，该方法的 this 是指向对象本身的，obj.f()可以理解为obj.f.call(obj)，但是务必注意如果将一个函数赋值给一个全局变量，this将指向全局

```js
var myObj = {
  name : "极客时间",
  showThis: function(){
    this.name = "极客邦"
    console.log(this)
  }
}
var foo = myObj.showThis
foo() // 全局
```

3. 通过构造函数，通过new 关键字构建好了一个新对象，并且构造函数中的 this 其实就是新对象本身。代码如下：

```js
var o = new Foo();
// 等价于
var o = new Object();             //1、新建空对象
o.__proto__ = Foo.prototype;      //2、建立连接
let returnVal = Foo.call(o)       //3、执行
if(typeof returnVal === 'object'){//4、判断返回值
  return returnVal;
} else {
  return o
}
```

**this的设计缺陷以及应对方案：**

1. 嵌套函数中的 this 不会从外层函数中继承

```js
// bar函数里的this是什么呢？
var myObj = {
  name : "极客时间",
  showThis: function(){
    console.log(this)
    function bar(){console.log(this)}
    bar()
  }
}
myObj.showThis()
```

函数 bar 中的 this 指向的是全局 window 对象，而函数 showThis 中的 this 指向的是 myObj对象。可以通过新增self或_this变量传递一下，就可以保证bar里的 this与其所在函数的this指向相同了。其实这样就是**将this体系转为了作用域体系**。

当然还可以利用箭头函数，因为**箭头函数并不会创建其自身的执行上下文，所以箭头函数中的this取决于它的外部函数**。

1. 普通函数中的this默认指向window
实际工作中，我们并不想让this默认指向window，这时可以利用call,apply,bind等来显示改变，当然还可以设置js的严格模式，该模式下this默认指向undefined。

**普通函数和箭头函数的区别：**

参考：https://segmentfault.com/a/1190000018609721/

箭头函数的this指向规则：

1、箭头函数没有prototype(原型)，所以箭头函数本身没有this

```js
let a = () => {};
a.prototype; // undefinwd
```

2、箭头函数的this指向在定义的时候继承自外层第一个普通函数的this。

```js
let a;
let barObj = { msg: 'barObj' };
let fooObj = { msg: 'fooObj' };

function foo() {
  a();
}
function bar() {
  a = () => {
    console.log(this.msg);
  };
  a()
}

bar.call(barObj); // barObj
foo.call(fooObj); // barObj
```

`bar.call(barObj)`相当于给箭头函数注册this，此时箭头函数的this就指向了`barObj`。而`foo.call(fooObj)`只是在别的地方再次调用箭头函数而已，并没有显示改变this指向，因此依然打印`barObj`。所以：

- 被继承的普通函数的this指向改变，箭头函数的this指向会跟着改变(因此想修改箭头函数的this指向，可以修改外层)
- 箭头函数的this指向定义时所在的外层第一个普通函数，跟使用位置没有关系。

3、不能直接修改箭头函数的this指向

```js
let fnObj = { msg: '尝试直接修改箭头函数的this指向' };
function foo() {
  a.call(fnObj);
}
foo();// 依然是 barObj
```

4、箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)

```js
var arrowFn1 = () => {
  // 'use strict'
  console.log(this);
}
arrowFn1(); // window


// 但需要普通函数在是否严格模式下的this指向
function foo() {
  "use strict";
  // 此时函数体处于严格模式下，会被绑定到undefined
  console.log(this.a);
}
var a = 2;
foo(); // TypeError: Cannot read property 'a' of undefined

// 如下，函数体在非严格模式，而执行在严格模式
function foo() {
  console.log(this.a);
}
var a = 2;
(function() {
  "use strict";
  foo(); // 2，正常打印
})();
```

5、箭头函数的arguments

如果箭头函数的this指向window(全局对象)使用arguments会报错，未声明arguments。

```js
let b = () => {
  console.log(arguments);
};
b(1, 2, 3, 4); // Uncaught ReferenceError: arguments is not defined
```

如果箭头函数的this指向普通函数时,它的argumens继承于该普通函数。

```js
function bar() {
  console.log(arguments); // 1

  bb(1.1);
  function bb() {
    console.log(arguments); // 1.1
    let a = () => {
      console.log(arguments, 'arrow'); // 1.1 arrow
    };
    a(2); // 这里传入的参数无效，因为arguments继承于外层的普通函数
  }
}
bar(1);
```

6、使用new调用箭头函数会报错

```js
let Foo = () => {};
let b = new Foo(); // Foo is not a constructor
```

7、箭头函数不支持new.target

es6引入新属性，new.target属性，普通函数如果通过new调用，new.target会返回该函数的引用。

```js
function Foo() {
  console.log(new.target)
}
new Foo(); // Foo {}

let Bar = () => {
  console.log(new.target); // new.target expression is not allowed here
}
Bar(); // 这里不能使用new，
```

箭头函数的this指向普通函数，它的new.target就是指向该普通函数的引用。

```js
new Bar();
function Bar() {
  let a = () => {
    console.log(new.target); // Bar {}
  };
  a();
}
```

8、箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名

```js
function func1(a, a) {
  console.log(a, arguments); // 2 [1,2]
}
func1(1, 2);

var func2 = (a,a) => {
  console.log(a); // Duplicate parameter name not allowed in this context
};
func2(1, 2);
```

项目中经常有下面的写法：

```js
const obj = {
  array: [1, 2, 3],
  sum: () => {
    // 外层没有普通函数this会指向全局对象
    return this.array.push('全局对象下没有array，这里会报错'); // 找不到push方法
  }
};
obj.sum();

// 只需
const obj = {
  array: [1, 2, 3],
  sum() {
    return this.array.push('全局对象下没有array，这里会ok');
  }
};
```

### v8工作原理

#### 栈空间和堆空间：数据是如何存储的？

每种编程语言都具有内建的数据类型，但它们的数据类型常有不同之处，使用方式也很不一样，比如C语言在定义变量之前，就需要确定变量的类型，**我们把这种在使用之前就需要确认其变量数据类型的称为静态语言。**

**相反地，我们把在运行过程中需要检查数据类型的语言称为动态语言**，比如js，因为在声明之前不需要确定是哪种数据类型。

虽然C语言定义时声明了具体的数据类型，但依然可以将一个 int类型赋值给布尔类型的变量，这是因为：C编译器会把int型的变量悄悄转换为 bool 型的变量。而**支持隐式类型转换的语言称为弱类型语言，不支持隐式类型转换的语言称为强类型语言。在这点上，C 和 JavaScript 都是弱类型语言。**

而常见语言的类型分类：

- 动态弱类型：Perl,PHP,VB,JavaScript
- 动态强类型：Python,Ruby
- 静态弱类型：C,C++
- 静态强类型：C#,Java

`ECMAScript`标准规定了7种数据类型，分两种：**原始类型和引用类型**

原始类型：

- Null：只包含一个值：null
- Undefined：只包含一个值：undefined
- Boolean：包含两个值：true和false
- Number：整数或浮点数，还有一些特殊值（-Infinity、+Infinity、NaN）
- String：一串表示文本值的字符序列
- Symbol：一种实例是唯一且不可改变的数据类型
- BigInt：es10（ECMAScript2019）

引用类型：

- Object

之所以把它们区分为两种不同的类型，是因为它们在内存中存放的位置不一样。

在 JavaScript 的执行过程中，主要有三种类型内存空间，分别是**代码空间、栈空间和堆空间**。其中代码空间主要用来存储可执行代码的。

**栈空间和堆空间：**
栈空间就是之前提及的调用栈，是用来存储执行上下文的，而执行上下文可以有多个，比如全局，某函数等等。原始类型的数据值都是直接保存在“栈”中的，引用类型的值是存放在“堆”中的。堆空间很大，能存放很多大的数据，不过缺点是分配内存和回收内存都会占用一定的时间。

不过你也许会好奇，为什么一定要分“堆”和“栈”两个存储空间呢？所有数据直接存放在“栈”中不就可以了吗？
答案是不可以的。**这是因为JavaScript引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了话，所有的数据都存放在栈空间里面，那么会影响到上下文切换的效率，进而又影响到整个程序的执行效率。**

在 JavaScript 中，赋值操作和其他语言有很大的不同，原始类型的赋值会完整复制变量值，而引用类型的赋值是复制引用地址。

#### 垃圾回收：垃圾数据是如何自动回收的？

通常情况下，垃圾数据回收分为**手动回收和自动回收**两种策略。

如 C/C++ 就是使用**手动回收**策略，何时分配内存、何时销毁内存都是由代码控制的。

另外一种使用的是**自动垃圾回收**的策略，如 JavaScript、Java、Python 等语言，产生的垃圾数据是由垃圾回收器来释放的，并不需要手动通过代码来释放。对于 JavaScript而言，也正是这个“自动”释放资源的特性带来了很多困惑，也让一些 JavaScript开发者误以为可以不关心内存管理，这是一个很大的误解。

垃圾回收策略一般分为手动回收和自动回收，java python JavaScript等高级预言为了减轻程序员负担和出错概率采用了自动回收策略。JavaScript的原始类型数据和引用数据是分别存储在栈和椎中的，由于栈和堆分配空间大小差异，垃圾回收方式也不一样。栈中分配空间通过ESP的向下移动销毁保存在栈中数据；堆中垃圾回收主要通过副垃圾回收器（新生代）和主垃圾回收器（老生代）负责的，副垃圾回收器采用scavenge算法将区域分为对象区域和空闲区域，通过两个区域的反转让新生代区域无限使用下去。主垃圾回收器采用Mark-Sweep（Mark-Compact Incremental Marking解决不同场景下问题的算法改进）算法进行空间回收的。无论是主副垃圾回收器的策略都是标记-清除-整理三个大的步骤。另外还有新生代的晋升策略（两次未清除的），大对象直接分配在老生代。

#### 编译器和解释器：V8是如何执行一段JavaScript代码的？

前端工具和框架的自身更新速度非常块，而且还不断有新的出现。要想追赶上前端工具和框架的更新速度，你就需要抓住那些本质的知识，然后才能更加轻松地理解这些上层应用。比如我们接下来要介绍的 V8 执行机制，能帮助你从底层了解 JavaScript，也能帮助你深入理解语言转换器 Babel、语法检查工具 ESLint、前端框架 Vue 和 React 的一些底层实现机制

要深入理解 V8 的工作原理，你需要搞清楚一些概念和原理，比如接下来我们要详细讲解的**编译器（Compiler）、解释器（Interpreter）、抽象语法树（AST）、字节码（Bytecode）、即时编译器（JIT）**

**编译器和解释器**
之所以存在编译器和解释器，是**因为机器不能直接理解我们所写的代码，所以在执行程序之前，需要将我们所写的代码“翻译”成机器能读懂的机器语言**。按语言的执行流程，可以把语言划分为**编译型语言和解释型**语言。

**编译型语言在程序执行之前，需要经过编译器的编译过程，并且编译之后会直接保留机器能读懂的二进制文件，这样每次运行程序时，都可以直接运行该二进制文件，而不需要再次重新编译了**。比如 C/C++、GO 等都是编译型语言。

而由**解释型语言编写的程序，在每次运行时都需要通过解释器对程序进行动态解释和执行**。比如 Python、JavaScript 等都属于解释型语言。

**V8 是如何执行一段 JavaScript 代码的？**

V8 在执行过程中既有解释器 Ignition，又有编译器 TurboFan。

1. 生成抽象语法树（AST）和执行上下文。
高级语言是开发者可以理解的语言，但是让编译器或者解释器来理解就非常困难了。对于编译器或者解释器来说，它们可以理解的就是 AST 了。所以无论你使用的是解释型语言还是编译型语言，在编译过程中，它们都会生成一个 AST。这和渲染引擎将 HTML 格式文件转换为计算机可以理解的 DOM 树的情况类似。其实**可以把AST看成看成代码的结构化表示**，**编译器或者解释器后续的工作都需要依赖于 AST，而不是源代码**

AST 是非常重要的一种数据结构，在很多项目中有着广泛的应用，Babel 的工作原理就是先将 ES6 源码转换为 AST，然后再将 ES6 语法的 AST 转换为 ES5 语法的 AST，最后利用 ES5 的 AST 生成 JavaScript 源代码。

还有 ESLint 也使用 AST。ESLint 是一个用来检查 JavaScript 编写规范的插件，其检测流程也是**需要将源码转换为 AST，然后再利用 AST 来检查代码规范化的问题。**

第一阶段是分词（tokenize），又称为词法分析，其作用是将一行行的源码拆解成一个个 token。所谓token，指的是语法上不可能再分的、最小的单个字符或字符串。例如var myName = “极客时间”简单地定义了一个变量，其中关键字“var”、标识符“myName” 、赋值运算符“=”、字符串“极客时间”四个都是 token，而且它们代表的属性还不一样。

第二阶段是解析（parse），又称为语法分析。将上一步生成的 token 数据，根据语法规则转为 AST，若有语法错误，则会停止解析并报错。

第三阶段，有了 AST 后，那接下来 V8 就会生成该段代码的执行上下文

2. 生成字节码
有了AST和执行上下文后，解释器就登场了，它会根据AST生成字节码，并执行字节码。

其实一开始 V8 并没有字节码，而是直接将 AST 转换为机器码，由于执行机器码的效率是非常高效的，所以这种方式在发布后的一段时间内运行效果是非常好的。但是随着 Chrome 在手机上的广泛普及，特别是运行在 512M 内存的手机上，内存占用问题也暴露出来了，因为 V8 需要消耗大量的内存来存放转换后的机器码。为了解决内存占用问题，V8 团队大幅重构了引擎架构，引入字节码，并且抛弃了之前的编译器，最终花了将进四年的时间，实现了现在的这套架构。

**字节码就是介于AST和机器码之间的一种代码。但是与特定类型的机器码无关，字节码需要通过解释器将其转换为机器码后才能执行**。注意机器码是和机器相关的，不同的机器对应的机器码不同。机器码占用内容大的原因是因为生成了大量的机器码，而字节码比较简短，占用空间小。

3. 执行代码
生成字节码之后，接下来就进入执行阶段。

通常，如果有一段第一次执行的字节码，解释器 Ignition 会逐条解释执行。到了这里，相信你已经发现了，解释器 Ignition 除了负责生成字节码之外，它还有另外一个作用，就是解释执行字节码。在 Ignition 执行字节码的过程中，如果发现有热点代码（HotSpot），比如一段代码被重复执行多次，这种就称为热点代码，那么后台的编译器 TurboFan 就会把该段热点的字节码编译为高效的机器码，然后当再次执行这段被优化的代码时，只需要执行编译后的机器码就可以了，这样就大大提升了代码的执行效率。

V8 的解释器和编译器的取名也很有意思。解释器 Ignition 是点火器的意思，编译器TurboFan是涡轮增压的意思，寓意着代码启动时通过点火器慢慢发动，一旦启动，涡轮增压介入，其执行效率随着执行时间越来越高效率，因为热点代码都被编译器TurboFan转换了机器码，直接执行机器码就省去了字节码“翻译”为机器码的过程。

其实字节码配合解释器和编译器是最近一段时间很火的技术，比如 Java 和 Python 的虚拟机也都是基于这种技术实现的，**我们把这种技术称为即时编译（JIT）。具体到 V8，就是指解释器Ignition在解释执行字节码的同时，收集代码信息，当它发现某一部分代码变热了之后，TurboFan编译器便闪亮登场，把热点的字节码转换为机器码，并把转换后的机器码保存起来，**以备下次使用。

对于 JavaScript 工作引擎，除了 V8 使用了“字节码 +JIT”技术之外，苹果的 SquirrelFish Extreme 和 Mozilla 的 SpiderMonkey 也都使用了该技术。

**JavaScript的性能优化：**

在 V8 诞生之初，也出现过一系列针对 V8 而专门优化 JavaScript 性能的方案，比如隐藏类、内联缓存等概念都是那时候提出来的。不过随着 V8 的架构调整，你越来越不需要这些微优化策略了，

相反，对于优化 JavaScript执行效率，你应该将优化的中心聚焦在单次脚本的执行时间和脚本的网络下载上，主要关注以下三点内容：

1. 提升单次脚本的执行速度，避免JavaScript的长任务霸占主线程，这样可以使得页面快速响应交互；
2. 避免大的内联脚本，因为在解析HTML的过程中，解析和编译也会占用主线程；
3. 减少 JavaScript文件的容量，因为更小的文件会提升下载速度，并且占用更低的内存。

**注意：**

- 编译的单位是全局代码或函数，比如下载完一个js文件，先编译这个js文件,但是js文件内定义的函数是不会编译的。等调用到该函数的时候，Javascript引擎才会去编译该函数！
- 最后反正都需要字节码，为何不直接编译成字节码？可以认为WebAssembly就是，WebAssembly经过TuboFan处理下就能执行
- 字节码最终也会转为机器码，因为最后都是cpu来执行，cpu只执行机器码（机器码？二进制文件？一样？这里应该是二进制文件吧）

### 浏览器中的页面循环系统

#### 消息队列和事件循环：页面是怎么“活”起来的？

每个**渲染进程都有一个主线程，并且主线程非常繁忙，既要处理 DOM，又要计算样式，还要处理布局，同时还需要处理 JavaScript 任务以及各种输入事件**。要让这么多不同类型的任务在主线程中有条不紊地执行，这就需要一个系统来统筹调度这些任务。

首先，我们可以使用单线程来处理已经安排好的的任务，但是，有时候会在执行安排好的任务时，又收到新任务改如何执行的？这就需要一个循环系统，来监听是否有新任务，而监听是否有新任务是通过事件机制。因此也就是事件循环机制。

前面接受的任务都是来自于线程内部，那如果是新任务来自另一个线程呢？这就需要一个消息队列，其他线程的任务就会压入消息队列，渲染主线程会循环地从消息队列头部中读取任务，执行任务。

但如何处理其他进程的消息呢？渲染进程专门有一个IO线程用来接收其他进程传进来的消息，然后再消息组装成任务，放在消息队列（队列里就是待执行的任务）。

那消息队列里的任务都有哪些类型呢？如输入事件（鼠标滚动、点击、移动）、微任务、文件读写、WebSocket、JavaScript定时器等等。除此之外，消息队列中还包含了很多与页面相关的事件，如 JavaScript 执行、解析 DOM、样式计算、布局计算、CSS 动画等。以上这些事件都是在主线程中执行的，所以在编写 Web 应用时，你还需要衡量这些事件所占用的时长，并想办法解决单个任务占用主线程过久的问题。

**页面使用单线程的缺点**

- 如何处理高优先级的任务。

如果一个高优先级的任务来了，立马就执行回调，则会影响当前任务的执行效率。如果采用异步方式，添加到消息队列的尾部，又会影响实时性。如何权衡实时性和效率性？针对这种情况就出现了微任务

通常我们把**消息队列中的任务称为宏任务，每个宏任务中都包含了一个微任务队列**，在执行宏任务的过程中，如果DOM有变化，那么就会将该变化添加到微任务列表中，这样就不会影响到宏任务的继续执行，因此也就解决了执行效率的问题。

等宏任务中的主要功能都直接完成之后，这时候，渲染引擎并不着急去执行下一个宏任务，而是执行当前宏任务中的微任务，因为 DOM 变化的事件都保存在这些微任务队列中，这样也就解决了实时性问题。

- 如何解决单个任务执行时长过久的问题？

因为所有的任务都是在单线程中执行的，所以每次只能执行一个任务，而其他任务就都处于等待状态。如果其中一个任务执行时间过久，那么下一个任务就要等待很长时间，对这种情况，JavaScript可以通过回调功能来规避这种问题，也就是让要执行的 JavaScript 任务滞后执行。

#### WebAPI：setTimeout是如何实现的？

执行一段异步任务，需要先将任务添加到消息队列中。不过通过定时器设置回调函数有点特别，它们需要在指定的时间间隔内被调用，但消息队列中的任务是按照顺序执行的，所以为了保证回调函数能在指定时间内执行，你不能将定时器的回调函数直接添加到消息队列中。

在 Chrome 中除了正常使用的消息队列之外，还有另外一个消息队列，这个队列中维护了需要**延迟执行的任务列表**，包括了定时器和 Chromium 内部一些需要延迟执行的任务，可以理解为一个延迟队列（其实是hashmap结构，这里只是和消息队列区分开）。

在执行完一个消息队列里的任务后，会检查延迟队列，若不为空，则会检查这些延迟队列里的任务是否到期，到期的话就会执行。等到期的任务执行完成之后，再继续执行下一个循环过程。

设置定时器，js引擎会返回一个定时器的ID，通常一个定时器的任务在没有被执行的时候，可以取消。其实浏览器内部实现取消定时器的操作也是非常简单的，就是直接从延迟队列中，通过ID查找到对应的任务，然后再将其从队列中删除掉就可以了。

**使用 setTimeout 的一些注意事项：**

1. 如果当前任务执行时间过久，会影响延迟队里里到期定时器任务的执行
2. 如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒

也就是说在定时器函数里面嵌套调用定时器，也会延长定时器的执行时间，如下：

```js
function cb() { setTimeout(cb, 0); }
setTimeout(cb, 0);
```

通过Performance可以看到，前面五次调用的时间间隔比较小，嵌套调用超过五次以上，后面每次的调用最小时间间隔是 4 毫秒。之所以出现这样的情况，是因为在 Chrome 中，定时器被嵌套调用 5 次以上，系统会判断该函数方法被阻塞了，如果定时器的调用时间间隔小于 4 毫秒，那么浏览器会将每次调用的时间间隔设置为 4 毫秒。

3. 未激活的页面，setTimeout 执行最小间隔是 1000 毫秒

除了前面的 4 毫秒延迟，还有一个很容易被忽略的地方，那就是未被激活的页面中定时器最小值大于 1000 毫秒，也就是说，如果标签不是当前的激活标签，那么定时器最小的时间间隔是 1000 毫秒，目的是为了优化后台页面的加载损耗以及降低耗电量。

4. 延时执行时间有最大值

Chrome、Safari、Firefox 都是以 32 个 bit 来存储延时值的，32bit 最大只能存放的数字是 2147483647 毫秒，这就意味着，如果 setTimeout 设置的延迟值大于 2147483647 毫秒（大约 24.8 天）时就会溢出，那么相当于延时值被设置为 0 了，这导致定时器会被立即执行。你可以运行下面这段代码：

```js
function showName(){
  console.log("极客时间")
}
var timerID = setTimeout(showName,2147483648);//会被理解调用执行
```

5. 使用 setTimeout 设置的回调函数中的 this 不符合直觉

如果被 setTimeout 推迟执行的回调函数是某个对象的方法，那么该方法中的 this 关键字将指向全局环境，而不是定义时所在的那个对象。

```js
var name= 1;
var MyObj = {
  name: 2,
  showName: function(){
    console.log(this.name);
  }
}
setTimeout(MyObj.showName,1000) // 1

// 解决办法
//箭头函数
setTimeout(() => {
  MyObj.showName()
}, 1000);

//或者function函数
setTimeout(function() {
  MyObj.showName();
}, 1000)

// 或者bind
setTimeOut(MyObj.showName.bind(MyObj), 1000)
```

综上：setTimeout 设置的回调任务实时性并不是太好，所以很多场景并不适合使用 setTimeout。比如你要使用 JavaScript 来实现动画效果，函数 requestAnimationFrame 就是个很好的选择。

**requestAnimationFrame是如何实现高性能动画的呢？**

假如你一秒能准备60张图片，而眼睛一秒也只能看60张图片，此时比较完美，不会错过或看不到哪一张图片。但是如果你一秒准备100张图片的话，就出问题了，就会有40张图片会被你错过。。。那如果你一秒只能准备40张图片，那对不起，你的页面看起来很不连贯。

因此一个解决方案是，将我看图片的频率和准备图片的频率进行绑定，即：当显示器将一帧画面绘制完成后，并在准备读取下一帧之前，显示器会发出一个垂直同步信号（vertical synchronization）给 GPU，简称 VSync。

具体地讲，当 GPU 接收到 VSync 信号后，会将 VSync 信号同步给浏览器进程，浏览器进程再将其同步到对应的渲染进程，渲染进程接收到 VSync 信号之后，就可以准备绘制新的一帧了。

我们知道 CSS 动画是由渲染进程自动处理的，所以渲染进程会让 CSS 渲染每帧动画的过程与 VSync 的时钟保持一致, 这样就能保证 CSS 动画的高效率执行。但是 JavaScript 是由用户控制的，如果采用 setTimeout 来触发动画每帧的绘制，那么其绘制时机是很难和 VSync 时钟保持一致的，所以 JavaScript 中又引入了 window.requestAnimationFrame，用来和 VSync 的时钟周期同步。而window.requestAnimationFrame的回调任务执行时机也就是在绘制新一帧的开始执行。

当然如果requestAnimationFrame的回调任务执行时间过长，也会影响渲染帧率。但js不会说在执行过程中就退出，而是执行完才会执行下一个任务，即使下一个任务优先级很高。

#### WebAPI：XMLHttpRequest是怎么实现的？

```js
 function GetWebData(URL){
    /**
     * 1:新建XMLHttpRequest请求对象
     */
    let xhr = new XMLHttpRequest()

    /**
     * 2:注册相关事件回调处理函数 
     */
    xhr.onreadystatechange = function () {
        switch(xhr.readyState){
          case 0: //请求未初始化
            console.log("请求未初始化")
            break;
          case 1://OPENED
            console.log("OPENED")
            break;
          case 2://HEADERS_RECEIVED
            console.log("HEADERS_RECEIVED")
            break;
          case 3://LOADING  
            console.log("LOADING")
            break;
          case 4://DONE
            if(xhr.status === 200 || xhr.status === 304){
                console.log(xhr.responseText);
              }
            console.log("DONE")
            break;
        }
    }

    xhr.ontimeout = function(e) { console.log('ontimeout') }
    xhr.onerror = function(e) { console.log('onerror') }

    /**
     * 3:打开请求
     */
    xhr.open('Get', URL, true);//创建一个Get请求,采用异步

    /**
     * 4:配置参数
     */
    xhr.timeout = 3000 //设置xhr请求的超时时间
    xhr.responseType = "text" //设置响应返回的数据格式
    xhr.setRequestHeader("X_TEST","time.geekbang")

    /**
     * 5:发送请求
     */
    xhr.send();
}
```

**第一步：创建 XMLHttpRequest 对象。**

**第二步：为 xhr 对象注册回调函数。**

因为网络请求比较耗时，所以要注册回调函数，这样后台任务执行完成之后就会通过调用回调函数来告诉其执行结果。

**第三步：配置基础的请求信息。**

注册好回调事件之后，接下来就需要配置基础的请求信息了，通过 open 接口配置一些基础的请求信息，包括请求的地址、请求方法（是 get 还是 post）和请求方式（同步还是异步请求）

还可以通过xhr.responseType = "text"来配置服务器返回的格式，将**服务器返回的数据自动转换为自己想要的格式**，如果将 responseType 的值设置为 json，那么浏览器会自动将服务器返回的数据转换为 JavaScript 对象格式。还可以通过 xhr.setRequestHeader 来添加自定义请求头

**第四步：发起请求。**

渲染进程会将请求发送给网络进程，然后网络进程负责资源的下载，等网络进程接收到数据之后，就会利用 IPC 来通知渲染进程；渲染进程接收到消息之后，会将 xhr 的回调函数封装成任务并添加到消息队列中，等主线程循环系统执行到该任务的时候，就会根据相关的状态来调用对应的回调函数。

**XMLHttpRequest 使用过程中的“坑”?**

- 跨域问题

```js
var xhr = new XMLHttpRequest()
var url = 'https://time.geekbang.org/'
function handler() {
    switch(xhr.readyState){
        case 0: //请求未初始化
        console.log("请求未初始化")
        break;
        case 1://OPENED
        console.log("OPENED")
        break;
        case 2://HEADERS_RECEIVED
        console.log("HEADERS_RECEIVED")
        break;
        case 3://LOADING  
        console.log("LOADING")
        break;
        case 4://DONE
        if(xhr.status == 200||xhr.status == 304){
            console.log(xhr.responseText);
            }
        console.log("DONE")
        break;
    }
}

function callOtherDomain() {
  if(xhr) {
    xhr.open('GET', url, true)
    xhr.onreadystatechange = handler
    xhr.send();
  }
}
callOtherDomain()
```

在控制台打开上面代码，就会提示跨域 。

- https混合内容的问题。

HTTPS 混合内容是 HTTPS 页面中包含了不符合 HTTPS 安全要求的内容，比如包含了 HTTP 资源，通过 HTTP 加载的图像、视频、样式表、脚本等，都属于混合内容。通常，如果 HTTPS 请求页面中使用混合内容，浏览器会针对 HTTPS 混合内容显示警告，用来向用户表明此 HTTPS 页面包含不安全的资源。

通过 HTML 文件加载的混合资源，虽然给出警告，**但大部分类型还是能加载的。而使用 XMLHttpRequest请求时，浏览器认为这种请求可能是攻击者发起的，会阻止此类危险的请求。**比如我通过浏览器打开地址 https://www.iteye.com/groups ，然后通过控制台，使用 XMLHttpRequest 来请求 http://img-ads.csdn.net/2018/201811150919211586.jpg ，这时候请求就会报错：

`Mixed Content: The page at 'https://www.google.com/search?q=%E7%99%BE%E5%BA%A6%E5%9C%B0%E5%9B%BE&rlz=1C5CHFA_enUS880US881&oq=%E7%99%BE%E5%BA%A6%E5%9C%B0%E5%9B%BE&aqs=chrome..69i57j0l7.5259j0j4&sourceid=chrome&ie=UTF-8' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://img-ads.csdn.net/2018/201811150919211586.jpg'. This request has been blocked; the content must be served over HTTPS.`

如何解决：？
- 让浏览器自动升级请求。在服务器的响应头中加入：`header("Content-Security-Policy: upgrade-insecure-requests");`
- 如果我们不方便在服务器/Nginx 上操作，也可以在页面中加入 meta 头：`<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />`

综上：这里不单纯地讲一个问题，而是将回调类型、循环系统、网络请求和安全问题“串联”起来了。

**setTimeout 是直接将延迟任务添加到延迟队列中，而 XMLHttpRequest 发起请求，是由浏览器的其他进程或者线程去执行，然后再将执行结果利用 IPC 的方式通知渲染进程，之后渲染进程再将对应的消息添加到消息队列中**。

#### 宏任务和微任务：不是所有任务都是一个待遇

**宏任务**

前面我们已经知道，页面中的大部分任务都是在主线程上执行的，这些任务包括了：

- 渲染事件（如解析 DOM、计算布局、绘制）；
- 用户交互事件（如鼠标点击、滚动页面、放大缩小等）；
- JavaScript 脚本执行事件；
- 网络请求完成、文件读写完成事件。

为了协调这些任务有条不紊地在主线程上执行，页面进程引入了消息队列和事件循环机制，渲染进程内部会维护多个消息队列，比如延迟执行队列和普通的消息队列。然后主线程采用一个for循环，不断地从这些任务队列中取出任务并执行任务。我们把这些消息队列中的任务称为**宏任务**。

宏任务可以满足我们大部分的日常需求，不过如果有对时间精度要求较高的需求，宏任务就难以胜任了。页面的渲染事件、各种 IO 的完成事件、执行 JavaScript 脚本的事件、用户交互的事件等都随时有可能被添加到消息队列中，而且添加事件是由系统操作的，JavaScript代码不能准确掌控任务要添加到队列中的位置，控制不了任务在消息队列中的位置，所以很难控制开始执行任务的时间。

**微任务**

先来了解一下异步回调放入任务队列的方式，主要有两种：

**第一种**是把异步回调函数封装成一个宏任务，添加到消息队列尾部，当循环系统执行到该任务的时候执行回调函数。如 setTimeout 和 XMLHttpRequest 的回调函数都是通过这种方式来实现的。

**第二种**方式的执行时机是在主函数执行结束之后、当前宏任务结束之前执行回调函数，这通常都是以微任务形式体现的，其实就是放入微任务队列里。

**产生微任务的方式**：

**第一种**方式是使用 MutationObserver 监控某个 DOM 节点，然后再通过 JavaScript 来修改这个节点，或者为这个节点添加、删除部分子节点，当 DOM 节点发生变化时，就会产生 DOM 变化记录的微任务。

**第二种方式**是使用 Promise，当调用 Promise.resolve() 或者 Promise.reject() 的时候，也会产生微任务。

**微任务的执行时刻**：在当前宏任务中的 JavaScript 快执行完成时，也就在 JavaScript 引擎准备退出全局执行上下文并清空调用栈的时候，JavaScript 引擎会检查全局执行上下文中的微任务队列，然后按照顺序执行队列中的微任务。

在执行微任务的过程中，产生了新的微任务，同样会将该微任务添加到微任务队列中，V8 引擎一直循环执行微任务队列中的任务，直到队列为空才算执行结束。也就是说在执行微任务过程中产生的新的微任务并不会推迟到下个宏任务中执行，而是在当前的宏任务中继续执行。

**监听 DOM 变化方法演变**

早起使用Mutation Event这种观察者的设计模式，当DOM有变动时就会立刻触发相应的事件，这种方式属于同步回调，缺点是频繁调用js接口造成严重性能问题。

后来MutationObserver 来代替 Mutation Event，MutationObserver 将响应函数改成异步调用，可以不用在每次DOM变化都触发异步调用，而是等多次 DOM 变化后，一次触发异步调用，并且还会使用一个数据结构来记录这期间所有的 DOM 变化。这样即使频繁地操纵DOM，也不会对性能造成太大的影响。

通过**异步调用和减少触发次数来缓解了性能问题，那么如何保持消息通知的及时性呢**？

这时候，微任务就可以上场了，在每次DOM节点发生变化的时候，渲染引擎将变化记录封装成微任务，并将微任务添加进当前的微任务队列中。这样当执行到检查点的时候，V8 引擎就会按照顺序执行微任务了。

总结：

- 通过**异步**操作解决了同步操作的**性能问题**
- 通过**微任务**解决了**实时性的问题**

#### Promise：使用Promise，告别回调函数

学习一门新技术，最好的方式是先了解这门技术是如何诞生的，以及它所 解决的问题是什么。**而Promise解决的是异步编码风格的问题**。

先来了解一下**JavaScript的异步编程模型**：页面主线程发起了一个耗时的任务，并将任务交给另外一个进程去处理，这时页面主线程会继续执行消息队列中的任务。**等该进程处理完这个任务后，会将该任务添加到渲染进程的消息队列中（等到处理完这个任务后）**，并排队等待循环系统的处理。排队结束之后，循环系统会取出消息队列中的任务进行处理，并触发相关的回调操作。

而web页面的单线程结构决定了异步回调，而异步回调影响了我们的编码方式，代码逻辑不连续及回调地狱（后面的请求依赖于前面的请求），因此解决思路：消灭嵌套调用，合并多个任务的错误处理。

Promise 通过回调函数延迟绑定和回调函数返回值穿透的技术，解决了循环嵌套。

因为 Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被 onReject 函数处理或catch语句捕获为止（项目里Project.reject()抛出的会被catch拦截到）。具备了这样“冒泡”的特性后，就不需要在每个 Promise 对象中单独捕获异常了

#### async/await：使用同步的方式去写异步代码

使用Promise会让逻辑里充满大量的then，使得代码不易阅读 ，基于这个原因，ES7引入了async/await，这是JavaScript异步编程的一个重大改进，提供了在**不阻塞主线程的情况下使用同步代码实现异步访问资源的能力**，并且使得代码逻辑更加清晰。

```js

fetch('https://www.geekbang.org')
      .then((response) => {
          console.log(response)
          return fetch('https://www.geekbang.org/test')
      }).then((response) => {
          console.log(response)
      }).catch((error) => {
          console.log(error)
      })

// 使用await/async
async function foo(){
  try{
    let response1 = await fetch('https://www.geekbang.org')
    console.log('response1')
    console.log(response1)
    let response2 = await fetch('https://www.geekbang.org/test')
    console.log('response2')
    console.log(response2)
  }catch(err) {
       console.error(err)
  }
}
foo()
```

整个异步处理的逻辑都是使用同步代码的方式来实现的，而且还支持 try catch 来捕获异常，这就是完全在写同步代码，所以是非常符合人的线性思维的。

要想明白async和await到底是怎么工作的，我们首先需要介绍生成器(Generator)是如何工作的，然后分析Generator的底层实现机制——**协程**，而async/await使用Generator和Promise两种技术。

**生成器VS协程**

生成器函数是一个带星号函数，而且是可以暂停执行和恢复执行的。

```js

function* genDemo() {
    console.log("开始执行第一段")
    yield 'generator 2'

    console.log("开始执行第二段")
    yield 'generator 2'

    console.log("开始执行第三段")
    yield 'generator 2'

    console.log("执行结束")
    return 'generator 2'
}

console.log('main 0')
let gen = genDemo()
console.log(gen.next().value)
console.log('main 1')
console.log(gen.next().value)
console.log('main 2')
console.log(gen.next().value)
console.log('main 3')
console.log(gen.next().value)
console.log('main 4')
```

生成器函数的具体使用方式：

1. 在生成器函数内部执行一段代码，如果遇到 yield 关键字，那么 JavaScript 引擎将**返回关键字后面的内容给外部，并暂停该函数的执行**。
2. 外部函数可以通过 next 方法恢复函数的执行。

**那函数为何为暂停和恢复呢**？原因就在于协程，协程是一种比线程更加轻量级的存在。你可以把协程看成是跑在线程上的任务，一个线程上可以存在多个协程，但是在线程上同时只能执行一个协程，比如当前执行的是 A 协程，要启动 B 协程，那么 A 协程就需要将主线程的控制权交给 B 协程，这就体现在 A 协程暂停执行，B 协程恢复执行；

正如一个进程可以拥有多个线程一样，一个线程也可以拥有多个协程。最重要的是，**协程不是被操作系统内核所管理，而完全是由程序所控制（也就是在用户态执行）。这样带来的好处就是性能得到了很大的提升，不会像线程切换那样消耗资源**。

则根据上面代码看出协程的执行顺序：

1. 通过调用生成器函数 genDemo 来创建一个协程 gen，创建之后，gen 协程并没有立即执行。
2. 要让 gen 协程执行，需要通过调用 gen.next。
3. 当协程正在执行的时候，可以通过 yield 关键字来暂停 gen 协程的执行，并返回主要信息给父协程。
4. 如果协程在执行期间，遇到了 return 关键字，那么 JavaScript 引擎会结束当前协程，并将 return 后面的内容返回给父协程。

**注意：**

1. gen 协程和父协程是在主线程上交互执行的，并不是并发执行的，它们之间的切换是通过 yield 和 gen.next 来配合完成的。
2. 当在 gen 协程中调用了 yield 方法时，JavaScript 引擎会保存 gen 协程当前的调用栈信息，并恢复父协程的调用栈信息。同样，当在父协程中执行 gen.next 时，JavaScript 引擎会保存父协程的调用栈信息，并恢复 gen 协程的调用栈信息。

**其实在js中，生成器只是协程的一种具体实现方式，协程还能运用在更多的场合**

再用生成器和promise来改造开始的代码：

```js
// 生成器foo函数
function* foo() {
  let response1 = yield fetch('https://www.geekbang.org')
  console.log('response1')
  console.log(response1)
  let response2 = yield fetch('https://www.geekbang.org/test')
  console.log('response2')
  console.log(response2)
}

// 执行生成器foo函数的代码，也就是执行器
let gen = foo()
function getGenPromise(gen) {
  return gen.next().value
}

getGenPromise(gen).then((response) => {
    console.log('response1')
    console.log(response)
    return getGenPromise(gen)
}).then((response) => {
    console.log('response2')
    console.log(response)
})
```

不过通常，我们把**执行生成器的代码封装成一个函数，并把这个执行生成器代码的函数称为执行器**（可参考著名的 co 框架），如下面这种方式：

```js
function* foo() {
  let response1 = yield fetch('https://www.geekbang.org')
  console.log('response1')
  console.log(response1)
  let response2 = yield fetch('https://www.geekbang.org/test')
  console.log('response2')
  console.log(response2)
}
co(foo());
```

通过使用生成器配合执行器，就能实现使用同步的方式写出异步代码了。但程序员的追求是无止境的，因此又在ES7中引入了async/await，这种方式彻底告别了执行器和生成器。async/await 技术背后的秘密就是 Promise 和生成器应用，往低层说就是微任务和协程应用

**1. async**
根据 MDN 定义，async 是一个通过**异步执行**并**隐式返回 Promise 作**为结果的函数。

```js
async function foo() {
  return 2
}
console.log(foo())  // Promise {<resolved>: 2}
```

执行这段代码，可以看到async声明的foo函数返回一个promise对象，状态是resolved。

**2. await**
我们知道了async函数返回一个Promise对象，那下面的await到底是什么呢？

```js
async function foo() {
  console.log(1)
  let a = await 100
  console.log(a)
  console.log(2)
}
console.log(0)
foo()
console.log(3)
// 0 1 3 100 2

async function foo() {
  console.log(1)
  // 注意await里面会执行
  let a = await console.log(4)
  console.log(a)
  console.log(2)
}
console.log(0)
foo()
console.log(3)
// 0 1 4 3 undefined 2
```

执行顺序：

1. 首先，执行console.log(0)这个语句，打印出来 0。
2. 紧接着就是执行foo函数，由于foo函数是被async标记过的，所以当进入该函数的时候，JavaScript引擎会保存当前的调用栈等信息，然后执行 foo 函数中的console.log(1)语句，并打印出 1。
3. 当执行到await 100时，会默认创建一个 Promise 对象，代码如下：

```js
let promise_ = new Promise((resolve,reject){
  resolve(100)
})
```

在这个 promise_ 对象创建的过程中，我们可以看到在executor函数中调用了 resolve 函数，JavaScript 引擎会将该任务提交给微任务队列。
4. 然后 JavaScript引擎会暂停当前协程的执行，将主线程的控制权转交给父协程执行，同时会将promise_ 对象返回给父协程。**这时候父协程要做的一件事是调用 promise_.then 来监控 promise 状态的改变**。
5. 接下来继续执行父协程的流程，这里我们执行console.log(3)，并打印出来 3。随后**父协程将执行结束，在结束之前，会进入微任务的检查点**，然后执行微任务队列，微任务队列中有resolve(100)的任务等待执行，执行到这里的时候，会触发promise_.then中的回调函数，该回调函数被激活以后，会将主线程的控制权交给 foo函数的协程，并同时将value值传给该协程。
6. foo 协程激活之后，会把刚才的 value 值赋给了变量 a，然后 foo 协程继续执行后续语句，执行完成之后，将控制权归还给父协程。

### 浏览器中的页面

#### Chrome开发者工具：利用网络面板做性能分析

Chrome 开发者工具（简称DevTools）是一组网页制作和调试的工具，内嵌于 Google Chrome 浏览器中。

一共包含了 10 个功能面板，包括了Elements、Console、Sources、NetWork、Performance、Memory、Application、Security、Audits 和 Layers。简单来说，Chrome 开发者工具为我们提供了通过界面访问或者编辑 DOM 和 CSSOM 的能力，还提供了强大的调试功能和查看性能指标的能力。

这里只查看单个资源的时间线：NetWork - 点击任意一个下载资源 - 右侧Timing查看

**第一个是 Queuing**，也就是排队的意思，当浏览器发起一个请求的时候，会有很多原因导致该请求不能被立即执行，而是需要排队等待。导致请求处于排队状态的原因有很多。

1. 首先，页面中的资源是有优先级的，比如 CSS、HTML、JavaScript 等都是页面中的核心文件，所以优先级最高；而图片、视频、音频这类资源就不是核心资源，优先级就比较低。通常当后者遇到前者时，就需要“让路”，进入待排队状态。
2. 其次，我们前面也提到过，浏览器会为每个域名最多维护 6 个 TCP 连接，如果发起一个 HTTP 请求时，这 6 个 TCP 连接都处于忙碌状态，那么这个请求就会处于排队状态。
3.最后，网络进程在为数据分配磁盘空间时，新的HTTP请求也需要短暂地等待磁盘分配结束。

**第二个是Stalled，**等待排队完成之后，就要进入发起连接的状态了。不过在发起连接之前，还有一些原因可能导致连接过程被推迟，这个推迟就表现在面板中的 Stalled 上，它表示停滞的意思。

如果你使用了代理服务器，还会增加一个 Proxy Negotiation 阶段，也就是代理协商阶段，它表示代理服务器连接协商所用的时间

**第三个是Initial connection/SSL 阶段**，也就是和服务器建立连接的阶段，这包括了建立 TCP 连接所花费的时间；不过如果你使用了 HTTPS 协议，那么还需要一个额外的 SSL 握手时间，这个过程主要是用来协商一些加密信息的。

**第四个是Request sent阶段**，和服务器建立好连接之后，网络进程会准备请求数据，并将其发送给网络，这就是 Request sent阶段。通常这个阶段非常快，因为只需要把浏览器缓冲区的数据发送出去就结束了，并不需要判断服务器是否接收到了，所以这个时间通常不到 1 毫秒。

第五个是Waiting (TTFB)，数据发送出去了，接下来就是**等待接收服务器第一个字节的数据，这个阶段称为 Waiting (TTFB)**，通常也称为“第一字节时间”。 TTFB 是反映服务端响应速度的重要指标，对服务器来说，TTFB 时间越短，就说明服务器响应越快。

**第五个是Content Download阶段**，接收到第一个字节之后，进入陆续接收完整数据的阶段，也就是 Content Download阶段，这意味着从第一字节时间到接收到全部响应数据所用的时间。

看下多数的接口请求，大多数时间，都是Waiting时间很慢，这也就是服务器处理的时间过久导致的，因此下次遇见接口问题就可以明确知道哪个方面出问题了。

**优化时间线上耗时项：**

1. 排队（Queuing）时间过久

排队时间过久，大概率是由浏览器为每个域名最多维护 6 个连接导致的。那么基于这个原因，你就可以让 1 个站点下面的资源放在多个域名下面，比如放到 3 个域名下面，这样就可以同时支持 18 个连接了，这种方案称为域名分片技术。除了域名分片技术外，我个人还建议你把站点升级到 HTTP2，因为 HTTP2 已经没有每个域名最多维护 6 个 TCP 连接的限制了。

2. 第一字节时间（TTFB）时间过久

- 服务器生成页面数据的时间过久。对于动态网页来说，服务器收到用户打开一个页面的请求时，首先要从数据库中读取该页面需要的数据，然后把这些数据传入到模板中，模板渲染后，再返回给用户。服务器在处理这个数据的过程中，可能某个环节会出问题。
- 网络的原因。比如使用了低带宽的服务器，或者本来用的是电信的服务器，可联通的网络用户要来访问你的服务器，这样也会拖慢网速。
- 发送请求头时带上了多余的用户信息。比如一些不必要的 Cookie 信息，服务器接收到这些 Cookie 信息之后可能需要对每一项都做处理，这样就加大了服务器的处理时长。（额外的cookie可能会造成服务器解读的压力）

面对第一种服务器的问题，你可以想办法去提高服务器的处理速度，比如通过增加各种缓存的技术；
针对第二种网络问题，你可以使用 CDN 来缓存一些静态文件；
至于第三种，你在发送请求时就去尽可能地减少一些不必要的 Cookie 数据信息。

1. Content Download 时间过久

如果单个请求的 Content Download花费了大量时间，有可能是字节数太多的原因导致的。这时候你就需要减少文件大小，比如压缩、去掉源码中不必要的注释等方法。

#### DOM树：JavaScript是如何影响DOM树构建的？

**什么是 DOM**

从网络传给渲染引擎的HTML文件字节流是无法直接被渲染引擎理解的，所以要将其转化为渲染引擎能够理解的内部结构，这个结构就是 DOM。DOM 提供了对 HTML 文档结构化的表述，在渲染引擎中，DOM 有三个层面的作用：

- 从页面的视角来看，DOM 是生成页面的基础数据结构
- 从 JavaScript 脚本视角来看，DOM 提供给 JavaScript 脚本操作的接口，通过这套接口，JavaScript 可以对 DOM 结构进行访问，从而改变文档的结构、样式和内容。
- 从安全视角来看，DOM 是一道安全防护线，一些不安全的内容在 DOM 解析阶段就被拒之门外了。

简言之，DOM 是表述 HTML 的内部数据结构，**它会将 Web 页面和 JavaScript 脚本连接起来，并过滤一些不安全的内容**。

在渲染引擎内部，有一个叫HTML解析器（HTMLParser）的模块，它的职责就是负责将 HTML 字节流转换为DOM结构。**HTML解析器并不是等整个文档加载完成之后再解析的，而是网络进程加载了多少数据，HTML 解析器便解析多少数据**。

那详细解析HTML的流程是怎样的呢？网络进程接收到响应头之后，会根据响应头中的 content-type 字段来判断文件的类型，比如 content-type 的值是“text/html”，那么浏览器就会判断这是一个 HTML 类型的文件，然后为该请求选择或者创建一个渲染进程。渲染进程准备好之后，网络进程和渲染进程之间会建立一个共享数据的管道，网络进程接收到数据后就往这个管道里面放，而渲染进程则从管道的另外一端不断地读取数据，并同时将读取的数据“喂”给 HTML 解析器。你可以把这个管道想象成一个“水管”，网络进程接收到的字节流（其实可以理解为html文档）像水一样倒进这个“水管”，而“水管”的另外一端是渲染进程的 HTML 解析器，它会动态接收字节流，并将其解析为 DOM。

**JavaScript 是如何影响 DOM 生成的**

```html
<html>
<body>
    <div>1</div>
    <script>
      let div1 = document.getElementsByTagName('div')[0]
      div1.innerText = 'time.geekbang'
    </script>
    <div>test</div>
</body>
</html>
```

当解析到`<script>`标签时，渲染引擎判断这是一段脚本，此时 HTML 解析器就会暂停 DOM 的解析，因为接下来的 JavaScript 可能要修改当前已经生成的 DOM 结构。

如果是外链js脚本，当执行到 JavaScript 标签时，暂停整个 DOM 的解析，执行 JavaScript 代码，不过这里执行 JavaScript 时，需要先下载这段 JavaScript 代码。这里需要重点关注下载环境，因为 JavaScript 文件的下载过程会阻塞 DOM 解析，而通常下载又是非常耗时的，会受到网络环境、JavaScript 文件大小等因素的影响。

不过 Chrome 浏览器做了很多优化，其中一个主要的优化是预解析操作。**当渲染引擎收到字节流之后，会开启一个预解析线程，用来分析 HTML 文件中包含的 JavaScript、CSS 等相关文件，解析到相关文件之后，预解析线程会提前下载这些文件。**

我们可以使用 CDN 来加速 JavaScript 文件的加载，压缩 JavaScript 文件的体积。另外，**如果 JavaScript 文件中没有操作 DOM 相关代码**，就可以将该 JavaScript 脚本设置为异步加载，通过 async 或 defer 来标记代码，async加载完立即执行，而defer是在DOMContentLoaded 事件之前执行。

```html
<html>
    <head>
        <style src='theme.css'></style>
    </head>
<body>
    <div>1</div>
    <script>
        let div1 = document.getElementsByTagName('div')[0]
        div1.innerText = 'time.geekbang' //需要DOM
        div1.style.color = 'red'  //需要CSSOM
    </script>
    <div>test</div>
</body>
</html>
```

JavaScript 代码出现了 div1.style.color = ‘red' 的语句，它是用来操纵 CSSOM 的，所以在执行 JavaScript 之前，需要先解析 JavaScript 语句之上所有的 CSS 样式。所以如果代码里引用了外部的 CSS 文件，那么在执行 JavaScript 之前，还需要等待外部的 CSS 文件下载完成，并解析生成 CSSOM 对象之后，才能执行 JavaScript 脚本。

而 JavaScript 引擎在解析 JavaScript 之前，是不知道 JavaScript 是否操作 CSSOM 的，**所以渲染引擎在遇到 JavaScript 脚本时，不管该脚本是否操做了 CSSOM，都会执行先 CSS 文件下载，解析操作，再执行 JavaScript 脚本**。

综上，**我们知道了 JavaScript 会阻塞 DOM 生成，而样式文件又会阻塞 JavaScript 的执行。**

额外说明一下，渲染引擎还有一个安全检查模块叫 XSSAuditor，是用来检测词法安全的。在分词器解析出来 Token 之后，它会检测这些模块是否安全，比如是否引用了外部脚本，是否符合 CSP 规范，是否存在跨站点请求等。如果出现不符合规范的内容，XSSAuditor 会对该脚本或者下载任务进行拦截。

#### 渲染流水线：CSS如何影响首次加载时的白屏时间？

渲染流水线为什么需要 CSSOM 呢？

和 HTML 一样，渲染引擎也是无法直接理解CSS文件内容的，所以需要将其解析成**渲染引擎能够理解的结构，这个结构就是 CSSOM**。和 DOM 一样，CSSOM 也具有两个作用，第一个是提供给JavaScript操作样式表的能力，第二个是为布局树的合成提供基础的样式信息。

**场景一：**

```html
<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
</body>
</html>
```

首先是发起主页面的请求，发起方可能是渲染进程也可能是浏览器进程，请求被送到网络进程，网络进程收到返回的HTML数据之后，将其发送给渲染进程，渲染进程会解析 HTML 数据并构建 DOM。这里你需要特别注意下，请求 HTML 数据和构建 DOM 中间有一段空闲时间，这个空闲时间有可能成为页面渲染的瓶颈。

我们还知道，当渲染进程接收 HTML 文件字节流时，会先开启一个**预解析线程**，如果遇到 JavaScript 文件或者 CSS 文件，那么预解析线程会提前下载这些数据。对于上面的代码，预解析线程会解析出来一个外部的 theme.css 文件，并发起 theme.css 的下载。这里也有一个空闲时间需要你注意一下，就是在 DOM 构建结束之后、theme.css 文件还未下载完成的这段时间内，渲染流水线无事可做，因为下一步是合成布局树，而合成布局树需要 CSSOM 和 DOM，所以这里需要等待 CSS 加载结束并解析成 CSSOM。

**场景二：**

```html
<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
    <script>
        console.log('time.geekbang.org')
    </script>
    <div>geekbang com</div>
</body>
</html>
```

这个场景只是在 body 标签内部加了一个简单的 JavaScript。渲染流程就变了。。。

在解析 DOM 的过程中，如果遇到了 JavaScript 脚本，那么需要先暂停 DOM 解析去执行 JavaScript，因为 JavaScript 有可能会修改当前状态下的 DOM。不过在执行 JavaScript 脚本之前，如果页面中包含了**外部 CSS 文件的引用，或者通过 style 标签内置了 CSS** 内容，那么渲染引擎还需要将这些内容转换为 CSSOM，因为 **JavaScript 有修改 CSSOM 的能力，所以在执行 JavaScript 之前，还需要依赖 CSSOM**。也就是说 CSS 在部分情况下也会阻塞 DOM 的生成。

**场景三：**

```html
<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
    <script src='foo.js'></script>
    <div>geekbang com</div>
</body>
</html>
```

页面通过外部引用，分别引用了css和js，渲染流程又如何呢？

在接收到 HTML 数据之后的预解析过程中，HTML 预解析器识别出来了有 CSS 文件和 JavaScript 文件需要下载，然后就同时发起这两个文件的下载请求，需要注意的是，这两个文件的下载过程是重叠的，所以下载时间按照最久的那个文件来算。

不管 CSS 文件和 JavaScript 文件谁先到达，**都要先等到 CSS 文件下载完成并生成 CSSOM，然后再执行 JavaScript 脚本，最后再继续构建 DOM，构建布局树，绘制页面。**

综上可知，**其实只要有js和css共存的情况下，css都会阻塞dom的生成，因为dom生成依赖js，而js又依赖cssom(这里只是说js有操作cssom的可能，因此必须生成cssom后，js才可以执行)**。

**影响页面展会的因素以及优化策略？**

从发起URL请求开始，到首次显示页面的内容，在视觉上经历三个阶段：

1. 第一个阶段，等请求发出去之后，到提交数据阶段，这时页面展示出来的还是之前页面的内容。
2. 第二个阶段，提交数据之后渲染进程会创建一个空白页面，我们通常把这段时间称为解析白屏，并等待 CSS 文件和 JavaScript 文件的加载完成，生成 CSSOM 和 DOM，然后合成布局树，最后还要经过一系列的步骤准备首次渲染。
3. 等首次渲染完成之后，就开始进入完整页面的生成阶段了，然后页面会一点点被绘制出来。

阶段一影响因素主要集中在网络或者服务器处理这块。

阶段二的主要任务为：解析 HTML、下载 CSS、下载 JavaScript、生成 CSSOM、执行 JavaScript、生成布局树、绘制页面一系列操作。因此瓶颈主要在下载 CSS 文件、下载 JavaScript 文件和执行 JavaScript，则可以采取以下优化措施：

- 通过内联 JavaScript、内联 CSS 来移除这两种类型的文件下载，这样获取到 HTML 文件之后就可以直接开始渲染流程了。
- 但并不是所有的场合都适合内联，那么还可以尽量减少文件大小，比如通过 webpack 等工具移除一些不必要的注释，并压缩 JavaScript 文件。
- 还可以将一些不需要在解析 HTML 阶段使用的 JavaScript（比如不操作dom的js） 标记上 async 或者 defer。
- 对于大的 CSS 文件，可以通过媒体查询属性，将其拆分为多个不同用途的 CSS 文件，这样只有在特定的场景下才会加载特定的 CSS 文件。

#### 分层和合成机制：为什么CSS动画比JavaScript高效？

**显示器是怎么显示图像的?**

每个显示器都有固定的刷新频率，通常是 60HZ，也就是每秒更新 60 张图片，更新的图片都来自于显卡中一个叫前缓冲区的地方，显示器所做的任务很简单，就是每秒固定读取 60 次前缓冲区中的图像，并将读取的图像显示到显示器上。

**那么这里显卡做什么呢？**

显卡的职责就是合成新的图像，并将图像保存到后缓冲区中，一旦显卡把合成的图像写到后缓冲区，系统就会让后缓冲区和前缓冲区互换，这样就能保证显示器能读取到最新显卡合成的图像。通常情况下，显卡的更新频率和显示器的刷新频率是一致的。但有时候，在一些复杂的场景中，显卡处理一张图片的速度会变慢，这样就会造成视觉上的卡顿。

**帧 VS 帧率**

大多数设备屏幕的更新频率是 60 次 / 秒，这也就意味着正常情况下要实现流畅的动画效果，渲染引擎需要每秒更新 60 张图片到显卡的后缓冲区。我们把渲染流水线生成的每一副图片称为一帧，把渲染流水线每秒更新了多少帧称为帧率，比如滚动过程中 1 秒更新了 60 帧，那么帧率就是 60Hz（或者 60FPS）。

如果在一次动画过程中，渲染引擎生成某些帧的时间过久，那么用户就会感受到卡顿，为此 Chrome 对浏览器渲染方式做了大量的工作，其中最卓有成效的策略就是引入了**分层和合成机制**

而生成一帧的方式有：重排、重绘和合成三种方式。很明显越是涉及的方式越多，生成图像发费的时间也就越多。如果只是利用了合成，且有GPU参与，则会大大缩短时间。其中**重排和重绘操作都是在渲染进程的主线程上执行的**，比较耗时；而合成操作是在渲染进程的合成线程上执行的，执行速度快，且不占用主线程。

**而Chrome 浏览器是怎么实现合成操作的?**

用三个词来概括总结：分层、分块和合成。

你可以把一张网页想象成是由很多个图片叠加在一起的，每个图片就对应一个图层，Chrome 合成器最终将这些图层合成了用于显示页面的图片。在这个过程中，将素材分解为多个图层的操作就称为分层，最后将这些图层合并到一起的操作就称为合成。所以，分层和合成通常是一起使用的。

如果将一个页面被划分为两个层，当进行到下一帧的渲染时，上面的一帧可能需要实现某些变换，如平移、旋转、缩放、阴影或者 Alpha 渐变，这时候合成器只需要将两个层进行相应的变化操作就可以了，显卡处理这些操作驾轻就熟，所以这个合成过程时间非常短。

#### 页面性能：如何系统地优化页面？

这里我们所谈论的页面优化，其实就是要让页面更快地显示和响应。由于一个页面在它不同的阶段，所侧重的关注点是不一样的，所以如果我们要讨论页面优化，就要分析一个页面生存周期的不同阶段。

通常一个页面有三个阶段：加载阶段、交互阶段和关闭阶段。

- 加载阶段，是指从发出请求到渲染出完整页面的过程，影响到这个阶段的主要因素有网络和 JavaScript 脚本。
- 交互阶段，主要是从页面加载完成到用户交互的整合过程，影响到这个阶段的主要因素是 JavaScript 脚本。
- 关闭阶段，主要是用户发出关闭指令后页面所做的一些清理操作。

***加载阶段***

我们知道了并非所有的资源都会阻塞页面的首次绘制，比如图片、音频、视频等文件就不会阻塞页面的首次渲染；而 JavaScript、首次请求的 HTML 资源文件、CSS 文件是会阻塞首次渲染的，因为在构建 DOM 的过程中需要 HTML 和 JavaScript 文件，在构造渲染树的过程中需要用到 CSS 文件。

我们把这些能阻塞网页首次渲染的资源称为**关键资源**。基于关键资源，我们可以继续细化出来三个影响页面首次渲染的核心因素。

**第一个是关键资源个数**。关键资源个数越多，首次页面的加载时间就会越长。

**第二个是关键资源大小。**通常情况下，所有关键资源的内容越小，其整个资源的下载时间也就越短，那么阻塞渲染的时间也就越短。

**第三个是请求关键资源需要多少个 RTT（Round Trip Time）**当使用 TCP 协议传输一个文件时，比如这个文件大小是 0.1M，由于 TCP 的特性，这个数据并不是一次传输到服务端的，而是需要拆分成一个个数据包来回多次进行传输的。RTT 就是这里的往返时延。它是网络中一个重要的性能指标，表示从发送端发送数据开始，到发送端收到来自接收端的确认，总共经历的时延。通常 1 个 HTTP 的数据包在 14KB 左右，所以 1 个 0.1M 的页面就需要拆分成 8 个包来传输了，也就是说需要 8 个 RTT。

注意：至于 JavaScript 和 CSS 文件，这里需要注意一点，由于渲染引擎有一个预解析的线程，在接收到 HTML 数据之后，预解析线程会快速扫描 HTML 数据中的关键资源，一旦扫描到了，会立马发起请求，你可以认为 JavaScript 和 CSS 是同时发起请求的(如果同时存在外链js和css)，所以它们的请求是重叠的，那么计算它们的 RTT 时，只需要计算体积最大的那个数据就可以了。

因此综上，在加载阶段优化措施主要从减少关键资源个数，降低关键资源大小，降低关键资源的 RTT 次数几个方面入手即可。

- 如何减少关键资源的个数？一种方式是可以将 JavaScript 和 CSS 改成内联的形式，比如上图的 JavaScript 和 CSS，若都改成内联模式，那么关键资源的个数就由 3 个减少到了 1 个。另一种方式，如果 JavaScript 代码没有 DOM 或者 CSSOM 的操作，则可以改成 async 或者 defer 属性；同样对于 CSS，如果不是在构建页面之前加载的，则可以添加媒体取消阻止显现的标志。当 JavaScript 标签加上了 async 或者 defer、CSSlink 属性之前加上了取消阻止显现的标志后，它们就变成了非关键资源了。
- 如何减少关键资源的大小？可以压缩 CSS 和 JavaScript 资源，移除 HTML、CSS、JavaScript 文件中一些注释内容，也可以通过前面讲的取消 CSS 或者 JavaScript 中关键资源的方式。
- 如何减少关键资源 RTT 的次数？可以通过减少关键资源的个数和减少关键资源的大小搭配来实现。除此之外，还可以使用 CDN 来减少每次 RTT 时长。

***交互阶段***

交互阶段的优化，其实就是在**谈渲染进程渲染帧的速度，因为在交互阶段，帧的渲染速度决定了交互的流畅度**。因此讨论页面优化实际上就是讨论渲染引擎是如何渲染帧的，否则就无法优化帧率。

和加载阶段的渲染流水线有一些不同的地方是，在交互阶段没有了加载关键资源和构建 DOM、CSSOM 流程，通常是由 JavaScript 或css触发交互动画的。因此一个大的优化原则就是让单个帧的生成速度变快。

**1. 减少 JavaScript 脚本执行时间：**

有时 JavaScript 函数的一次执行时间可能有几百毫秒，这就严重霸占了主线程执行其他渲染任务的时间。针对这种情况我们可以采用以下两种策略：

- 一种是将一次执行的函数分解为多个任务，使得每次的执行时间不要过久
- 另一种是采用 Web Workers。你可以把 Web Workers 当作主线程之外的一个线程，在 Web Workers 中是可以执行 JavaScript 脚本的，不过 Web Workers 中没有 DOM、CSSOM 环境，这意味着在 Web Workers 中是无法通过 JavaScript 来访问 DOM 的，所以我们可以把一些和 DOM 操作无关且耗时的任务放到 Web Workers 中去执行。

**2. 避免强制同步布局：**

通过 DOM 接口执行添加元素或者删除元素等操作后，是需要重新计算样式和布局的，不过正常情况下**这些操作都是在另外的任务中异步完成的（也就是执行操作dom的函数，和函数内具体的逻辑生效其实是两个任务）**，这样做是为了避免当前的任务占用太长的主线程时间。

而**强制同步布局**，是指 JavaScript 强制将计算样式和布局操作提前到当前的任务中，这也就将本来两个任务合并成一个任务了，也就拉长了任务时间。比如下面

```js
function foo() {
  let main_div = document.getElementById("mian_div")
  let new_node = document.createElement("li")
  let textnode = document.createTextNode("time.geekbang")
  new_node.appendChild(textnode);
  document.getElementById("mian_div").appendChild(new_node);
  //由于要获取到offsetHeight，
  //但是此时的offsetHeight还是老的数据，
  //所以需要立即执行布局操作
  console.log(main_div.offsetHeight)
}
```

而为了避免强制布局，可以如下：

```js
function foo() {
  let main_div = document.getElementById("mian_div")
  //为了避免强制同步布局，在修改DOM之前查询相关值
  console.log(main_div.offsetHeight)
  let new_node = document.createElement("li")
  let textnode = document.createTextNode("time.geekbang")
  new_node.appendChild(textnode);
  document.getElementById("mian_div").appendChild(new_node);
}
```

**3. 避免布局抖动**

还有一种比强制同步布局更坏的情况，那就是布局抖动。所谓**布局抖动，是指在一次 JavaScript 执行过程中，多次执行强制布局和抖动操作**。

```js
function foo() {
  let time_li = document.getElementById("time_li")
  for (let i = 0; i < 100; i++) {
    let main_div = document.getElementById("mian_div")
    let new_node = document.createElement("li")
    let textnode = document.createTextNode("time.geekbang")
    new_node.appendChild(textnode);
    new_node.offsetHeight = time_li.offsetHeight;
    document.getElementById("mian_div").appendChild(new_node);
  }
}
```

我们在一个 for 循环语句里面不断读取属性值，每次读取属性值之前都要进行计算样式和布局。这种情况的避免方式和强制同步布局一样，**都是尽量不要在修改 DOM 结构后再去查询一些相关值**。

**4. 合理利用 CSS 合成动画**

**5. 避免频繁的垃圾回收**
我们知道 JavaScript 使用了自动垃圾回收机制，如果在一些函数中频繁创建临时对象，那么垃圾回收器也会频繁地去执行垃圾回收策略。这样当垃圾回收操作发生时，就会占用主线程，从而影响到其他任务的执行，严重的话还会让用户产生掉帧、不流畅的感觉。所以要尽量避免产生那些临时垃圾数据。

那该怎么做呢？可以**尽可能优化储存结构，尽可能避免小颗粒对象的产生**。

#### 虚拟DOM：虚拟DOM和实际的DOM有何不同？

虚拟 DOM 是最近非常火的技术，两大著名前端框架 React 和 Vue 都使用了虚拟 DOM。

真实dom操作，一般会涉及重排，重绘和合同等，有时候还会引发强制**同步布局和布局抖动**的问题，这些操作都会大大降低渲染效率。对于简单页面还好，若是复杂页面，则会带来严重的性能问题。

所以我们需要有一种方式来减少 JavaScript 对 DOM 的操作，这时候虚拟 DOM 就上场了。

我们先来看看虚拟 DOM 到底要解决哪些事情：

- 将页面改变的内容应用到虚拟 DOM 上，而不是直接应用到 DOM 上。
- 变化被应用到虚拟 DOM 上时，虚拟 DOM 并不急着去渲染页面，而仅仅是调整虚拟 DOM 的内部状态，这样操作虚拟 DOM 的代价就变得非常轻了。
- 在虚拟 DOM 收集到足够的改变时，再把这些变化一次性应用到真实的 DOM 上。

react常见虚拟dom的过程：

- **创建阶段。**首先依据 JSX 和基础数据创建出来虚拟 DOM，它反映了真实的 DOM 树的结构。然后由虚拟 DOM 树创建出真实 DOM 树，真实的 DOM 树生成完后，再触发渲染流水线往屏幕输出页面。
- **更新阶段。**如果数据发生了改变，那么就需要根据新的数据创建一个新的虚拟 DOM 树；然后 React 比较两个新旧虚拟DOM树，找出变化的地方，并把变化的地方一次性更新到真实的 DOM 树上；最后渲染引擎更新渲染流水线，并生成新的页面。

**再站在双缓存的角度如何理解虚拟dom？**

在开发游戏或者处理其他图像的过程中，屏幕从前缓冲区读取数据然后显示。但是很多图形操作都很复杂且需要大量的运算，比如一幅完整的画面，可能需要计算多次才能完成，如果每次计算完一部分图像，就将其写入缓冲区，那么就会造成一个后果，那就是在显示一个稍微复杂点的图像的过程中，你看到的页面效果可能是一部分一部分地显示出来，因此在刷新页面的过程中，会让用户感受到界面的闪烁。

而使用双缓存，可以让你先将计算的中间结果存放在另一个缓冲区中，等全部的计算结束，该缓冲区已经存储了完整的图形之后，再将该缓冲区的图形数据一次性复制到显示缓冲区，这样就使得整个图像的输出非常稳定。

在这里，你可以把虚拟 DOM 看成是 DOM 的一个 buffer，和图形显示一样，它会在完成一次完整的操作之后，再把结果应用到 DOM 上，这样就能减少一些不必要的更新，同时还能保证 DOM 的稳定输出。

#### 补充：不同图片类型以及区别

在页面加载过程中，如果是多图场景，需要考虑图片的加载优化，而不同类型的图片加载性能是不同的。主要有以下几种类型：

参考：https://www.jianshu.com/p/ff63d71678d3
参考：https://www.cnblogs.com/wizcabbit/p/web-image-optimization.html#auto

图片格式 | 压缩方式 | 动画 | 适应浏览器
| - | - | - | - |
JPG | 有损 | 不支持 | 所有
PNG | 无损 | 不支持 | 所有
GIF | 无损 | 支持 | 所有
APNG | 无损 | 支持 | firefox、safari
WebP | 有损/无损 | 支持 | chrome、opera

- `矢量图`：通过组成图形的一些基本元素，如点、线、面，边框，填充色等信息通过计算的方式来显示图形的。一般来说矢量图表示的是几何图形，文件相对较小，并且放大缩小不会失真。( font-awesome ,svg)
- `位图`：又叫像素图或栅格图，它是通过记录图像中每一个点的颜色、深度、透明度等信息来存储和显示图像。位图的优点是利于显示色彩层次丰富的写实图像。缺点则是文件大小较大，放大和缩小图像会失真。(jpg,png,gif)
- `有损压缩`：是对图像数据进行处理，去掉那些图像上会被人眼忽略的细节，然后使用附近的颜色通过渐变或其他形式进行填充。这样既能大大降低图像信息的数据量，又不会影响图像的还原效果。JPG是我们最常见的采用有损压缩对图像信息进行处理的图片格式。我们在保存图片为jpg格式时，会有一个品质选项这里指的就是对图片的损耗程度，如果压缩的话一般选择品质在60-80之间，60以下图片失真会很严重。
- `无损压缩`：先判断图像上哪些区域的颜色是相同的，哪些是不同的，然后把这些相同的数据信息进行压缩记录，（例如一片蓝色的天空之需要记录起点和终点的位置就可以了），而把不同的数据另外保存（例如天空上的白云和渐变等数据）。PNG是我们最常见的一种采用无损压缩的图片格式。无损压缩只是一种相对的“无损”压缩，并不是说无论如何压缩图片都不会失真。这点在PNG8中体现的尤为明显。PNG8最多只能索引256种颜色，所以在图像上出现的颜色数量大于我们可以保存的颜色数量时，我们就不能真实的记录和还原图像了。
- `GIF`：是一种正在逐渐被抛弃的图片格式。PNG格式的出现就是为了替代它。PNG 8除了不支持动画外，PNG8有GIF所有的特点，但是比GIF更加具有优势的是它支持alpha透明和更优的压缩（GIF仅支持索引透明）。
- `JPG`：压缩方式为有损，支持摄影图像或写实图像的高级压缩，并且可利用压缩比例控制图像文件大小。对于图片中，没有透明效果的，以及图片更为颜色丰富的图片，我们多可以采用压缩60%-80%的jpg图像。
- `PNG`：PNG可以细分为三种格式:PNG8，PNG24，PNG32。后面的数字代表这种PNG格式最多可以索引和存储的颜色值。”8″代表2的8次方也就是256色，而24则代表2的24次方大概有1600多万色。
- `APNG`：作为想取代gif的新格式，他比我们常用的gif更为优秀。从其名称中可以看出，APNG其实可以说是会动png，因为png支持24位的颜色，而gif最多仅支持8位的颜色，因此，APNG的显示效果比gif更为清晰。可惜APNG并没有加入png标准，因此我们日常生产中很难将其纳入使用。
- `WebP`：是由谷歌推出的图片格式，想让其作为web中专用的图片格式。
是一种支持有损压缩和无损压缩的图片文件格式，派生自图像编码格式 VP8。WebP 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量。根据 Google 的测试，无损压缩后的 WebP 比 PNG 文件少了 45％ 的文件大小，即使这些 PNG 文件经过其他压缩工具压缩之后，WebP 还是可以减少 28％ 的文件大小。
与jpg作对比，WebP有对透明的支持，以及完全不亚于JPG的压缩率。而与PNG对比，WebP更小，加载更快。不过可惜的是，其兼容性也是不太友好。
同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都非常优秀、稳定和统一。
- `base64`：概念：Base64编码是一种图片处理格式，通过特定的算法将图片编码成一长串字符串，在页面上显示的时候，可以用该字符串来代替图片的url属性。写法：
img的src属性开头是data:image/png;base64，这种开头表示的就是Base64编码后的图片格式，鼠标放在src属性上，可以看出实际的图片。
图片采用Base64编码后的字符串非常长，可能达到几十KB。
优点：
1.减少网络请求。采用Base64格式的编码，将图片转化为字符串后，图片文件会随着html元素一并加载，这样就可以减少http请求的次数，对于网页优化是一种比较好的手段。
2.采用Base64编码的图片是随着页面一起加载的，不会造成跨域请求的问题。
3.不会造成清理图片缓存的问题
缺点：
1.Base64格式编码，生成的字符串体积可能会大于原图片或url，使 css文件的大小剧增，造成代码可读性差，请求传输的数据量递增。
2.兼容性问题，对于IE8以下的浏览器，不支持data url格式，IE8开始支持data url，却对大小作出了限制，在使用时不是很方便。
对于极小或者极简单的图片，例如只有几像素的图片不用考虑跨域问题不想页面的图片缓存，可以用base64编码
- `svg`：可缩放矢量图形是基于可扩展标记语言（标准通用标记语言的子集），用于描述二维矢量图形的一种图形格式。它由万维网联盟制定，是一个开放标准。
- `雪碧图`：雪碧图被运用在众多使用了很多小图标的网站上。相对于把每张小图标以.png格式文件的形式引用到页面上，使用雪碧图只需要引用一张图片，对内存和带宽更好。优点：1.将多张图片合并到一张图片中，可以减小图片的总大小。2.将多张图片合并成一张图片后，下载全部所需的资源，只需一次请求。可以减小建立连接的消耗。
- `图标、矢量图标、图标字体`：

#### 渐进式网页应用（PWA）：它究竟解决了Web应用的哪些问题？

提到过浏览器的三大进化路线：

- 第一个是应用程序 Web 化；
- 第二个是 Web 应用移动化；
- 第三个是 Web 操作系统化；

Web 应用移动化是 Google梦寐以求而又一直在发力的一件事，不过对于移动设备来说，前有本地 App，后有移动小程序，想要浏览器切入到移动端是相当困难的一件事，因为浏览器的运行性能是低于本地 App 的，并且 Google 也没有类似微信或者 Facebook 这种体量的用户群体。

但是要让浏览器切入到移动端，让其取得和原生应用同等待遇可是 Google 的梦想，那该怎么做呢？也就是PWA，全称是 Progressive Web App，它是一套理念，渐进式增强 Web 的优势，并通过技术手段渐进式缩短和本地应用或者小程序的距离。

***Web 应用 VS 本地应用***

相对于本地应用，web页面到底缺少什么呢？

- 首先，Web 应用缺少离线使用能力，在离线或者在弱网环境下基本上是无法使用的。而用户需要的是沉浸式的体验，在离线或者弱网环境下能够流畅地使用是用户对一个应用的基本要求。
- 其次，Web 应用还缺少了消息推送的能力，因为作为一个 App 厂商，需要有将消息送达到应用的能力。
- 最后，Web 应用缺少一级入口，也就是将 Web 应用安装到桌面，在需要的时候直接从桌面打开 Web 应用，而不是每次都需要通过浏览器来打开。

针对以上 Web 缺陷，PWA 提出了两种解决方案：**通过引入 Service Worker 来试着解决离线存储和消息推送的问题，通过引入 manifest.json 来解决一级入口的问题**。

***什么是 Service Worker***

在Service Worker之前，尝试过使用App Cache标准来缓存页面，但问题比较多最终也被废弃。而Service Worker理念是在页面和网络之间增加一个拦截器，用来缓存和拦截请求。

在没有安装 Service Worker 之前，WebApp 都是直接通过网络模块来请求资源的。安装了 Service Worker 模块之后，WebApp 请求资源时，会先通过 Service Worker，让它判断是返回 Service Worker 缓存的资源还是重新去网络请求资源。一切的控制权都交由 Service Worker 来处理。

***Service Worker架构***

**1. 架构：**

为了避免 JavaScript 过多占用页面主线程时长的情况，**浏览器实现了 Web Worker 的功能**。Web Worker 的目的是让 JavaScript 能够运行在页面主线程之外，不过由于 Web Worker 中是没有当前页面的 DOM 环境的，所以在 Web Worker 中只能执行一些和 DOM 无关的 JavaScript 脚本，并通过 postMessage 方法将执行的结果返回给主线程。**所以说在 Chrome 中， Web Worker 其实就是在渲染进程中开启的一个新线程，它的生命周期是和页面关联的**。

另外，由于 Service Worker 还需要会为多个页面提供服务，所以还不能把 Service Worker 和单个页面绑定起来。**在目前的 Chrome 架构中，Service Worker 是运行在浏览器进程中的，因为浏览器进程生命周期是最长的**，所以在浏览器的生命周期内，能够为所有的页面提供服务。

**2. 消息推送：**

消息推送也是基于 Service Worker 来实现的。因为**消息推送时，浏览器页面也许并没有启动，这时就需要 Service Worker 来接收服务器推送的消息，并将消息通过一定方式展示给用户**。具体细节网络搜索吧。

**3. 安全：**

支持 Service Worker的前提是，站点要支持https，Service Worker 还需要同时支持 Web 页面默认的安全策略、储入同源策略、内容安全策略（CSP）等。

#### WebComponent：像搭积木一样构建Web应用

之所诞生这个技术，主要是想前端组件化，对于js我们可以做到组件化，组件之前可以互相不干扰，但对于DOM（页面中至于一个dom，任何地方都可以读取和修改dom）和CSS（样式有可能污染），就不太容易做到。。。

而WebComponent 给出了解决思路，它**提供了对局部视图封装能力，可以让 DOM、CSSOM 和 JavaScript 运行在局部环境中，这样就使得局部的 CSS 和 DOM 不会影响到全局**。

WebComponent 是**一套技术的组合**，具体涉及到了 Custom elements（自定义元素）、Shadow DOM（影子 DOM）和HTML templates（HTML 模板）

其实WebComponent的核心就是影子 DOM。而其主要作用无非以下两点：

- 影子 DOM 中的元素对于整个网页是不可见的；
- 影子 DOM 的 CSS 不会影响到整个网页的 CSSOM，影子 DOM 内部的 CSS 只对内部的元素起作用。

其实说白了，webComponents就是页面的组件化，将DOM，CSSOM，js等封装成一个模块，类似vue中的组件。

### 浏览器中的网络

#### HTTP/1：HTTP性能优化

HTTP 是浏览器中最重要且使用最多的协议，是浏览器和服务器之间的通信语言，也是互联网的基石。先来介绍http的发展史，再来看发展过程中所遇到的各种瓶颈以及对应的解决办法。

**1. 超文本传输协议 HTTP/0.9：**

最早的 HTTP/0.9是于1991年提出的，主要用于学术交流，需求很简单——用来在网络之间传递 HTML 超文本的内容，所以被称为超文本传输协议。当时的需求很简单，就是用来传输体积很小的 HTML 文件，所以 HTTP/0.9 的实现有以下三个特点。

- 第一个是只有一个请求行，并没有 HTTP 请求头和请求体，因为只需要一个请求行就可以完整表达客户端的需求了。
- 第二个是服务器也没有返回头信息，这是因为服务器端并不需要告诉客户端太多信息，只需要返回数据就可以了。
- 第三个是返回的文件内容是以 ASCII 字符流来传输的，因为都是 HTML 格式的文件，所以使用 ASCII 字节码来传输是最合适的。

**2. 被浏览器推动的 HTTP/1.0：**

1994 年底出现了拨号上网服务，同年网景又推出一款浏览器，从此万维网就不局限于学术交流了，而是进入了高速的发展阶段。随之而来的是万维网联盟（W3C）和 HTTP 工作组（HTTP-WG）的创建，它们致力于 HTML 的发展和 HTTP 的改进。

万维网的告诉发展，导致在在浏览器中展示的不单是 HTML 文件了，还包括了 JavaScript、CSS、图片、音频、视频等不同类型的文件。因此支持多种类型的文件下载是 HTTP/1.0 的一个核心诉求，而且文件格式不仅仅局限于 ASCII 编码，还有很多其他类型编码的文件。

在http0.9中，浏览器和服务器只会发送简单的请求行和响应行，并没有其他途径告诉服务器更多的消息，如文件编码、文件类型等。为了**让客户端和服务器能更深入地交流**，HTTP/1.0 引入了请求头和响应头，它们都是以为 Key-Value 形式保存的，在HTTP发送请求时，会带上请求头信息，服务器返回数据时，会**先**返回响应头信息。

那 HTTP/1.0 是怎么通过请求头和响应头来支持多种不同类型的数据呢？

要支持多种类型的文件，我们就需要解决以下几个问题。

- 首先，浏览器需要知道服务器返回的数据是什么类型的，然后浏览器才能根据不同的数据类型做针对性的处理。
- 其次，由于万维网所支持的应用变得越来越广，所以单个文件的数据量也变得越来越大。为了减轻传输性能，服务器会对数据进行压缩后再传输，所以浏览器需要知道服务器压缩的方法，然后浏览器才能进行解压缩
- 再次，由于万维网是支持全球范围的，所以需要提供国际化的支持，服务器需要对不同的地区提供不同的语言版本，这就需要浏览器告诉服务器它想要什么语言版本的页面。
- 最后，由于增加了各种不同类型的文件，而每种文件的编码形式又可能不一样，为了能够准确地读取文件，浏览器需要知道文件的编码类型。

基于以上问题，HTTP/1.0 的方案是通过请求头和响应头来进行协商，在发起请求时候会通过 HTTP 请求头告诉服务器它期待服务器返回什么类型的文件、采取什么形式的压缩、提供什么语言的文件以及文件的具体编码。最终发送出来的请求头内容如下：

```bash
accept: text/html
accept-encoding: gzip, deflate, br
accept-Charset: ISO-8859-1,utf-8
accept-language: zh-CN,zh
```

其中第一行表示**期望服务器返回html类型**的文件，第二行表示**期望服务器可以采用 gzip、deflate 或者 br 其中的一种压缩方式**，第三行**表示期望返回的文件编码是 UTF-8 或者 ISO-8859-1**，第四行是表示**期望页面的优先语言是中文**。

服务器接收到浏览器发送的请求头信息后，会根据请求头信息准备响应数据，不过有时候会有一些意外情况发生，比如**浏览器请求的压缩类型是 gzip，但是服务器不支持 gzip，只支持 br 压缩，那么它会通过响应头中的 content-encoding 字段告诉浏览器最终的压缩类型**，也就是说最终浏览器需要根据响应头的信息来处理数据。下面是一段响应头的数据信息：

```bash
content-encoding: br
content-type: text/html; charset=UTF-8
```

其中第一行表示服务器采用了 br 的压缩方法，第二行表示服务器返回的是 html 文件，并且该文件的编码类型是 UTF-8。

有了响应头的信息，浏览器**就会使用 br 方法来解压文件，再按照 UTF-8 的编码格式来处理原始文件，最后按照 HTML 的方式来解析该文件**。(这里也再次证明了，浏览器会处理来自服务器的文件)

另外http1.0还增加了几个典型的特性：

- 有的请求服务器可能无法处理，或者处理出错，这时候就需要告诉浏览器服务器最终处理该请求的情况，这就引入了**状态码**。状态码是通过响应行的方式来通知浏览器的。
- 为了减轻服务器的压力，在 HTTP/1.0 中提供了 **Cache** 机制，用来缓存已经下载过的数据。
- 服务器需要统计客户端的基础信息，比如 Windows 和 macOS 的用户数量分别是多少，所以 HTTP/1.0 的请求头中还加入了**用户代理**的字段。

**3. 缝缝补补的 HTTP/1.1：**

1. 改进持久连接

HTTP/1.0 **每进行一次 HTTP 通信，都需要经历建立 TCP 连接、传输 HTTP 数据和断开 TCP 连接三个阶段**，而TCP连接很耗时，因此引入持久连接，即**在一个 TCP 连接上可以传输多个 HTTP 请求**，持久连接在 HTTP/1.1 中是默认开启的，如果你不想要采用持久连接，可以在 HTTP 请求头中加上Connection: close。目前浏览器中对于同一个域名，默认允许同时建立 6 个 TCP 持久连接。

2. 不成熟的 HTTP 管线化

持久连接虽然能减少TCP的建立和断开次数，但是它**需要等待前面的请求返回之后，才能进行下一次请求。如果 TCP 通道中的某个请求因为某些原因没有及时返回，那么就会阻塞后面的所有请求，这就是著名的队头阻塞**的问题。

HTTP/1.1 中试图通过管线化的技术来解决队头阻塞的问题。HTTP/1.1 中的管线化是指**将多个 HTTP 请求整批提交给服务器的技术，虽然可以整批发送请求，不过服务器依然需要根据请求顺序来回复浏览器的请求**。FireFox、Chrome 都做过管线化的试验，但是由于各种原因，它们**最终都放弃了管线化技术**。

3. 提供虚拟主机的支持

在 HTTP/1.0 中，每个域名绑定了一个唯一的 IP 地址，因此一个服务器只能支持一个域名。但是随着虚拟主机技术的发展，需要实现在一台**物理主机上绑定多个虚拟主机**，每个虚拟主机都有自己的单独的域名，这些单独的域名都公用同一个 IP 地址。因此，HTTP/1.1 的请求头中增加了 Host 字段，用来表示当前的域名地址，这样服务器就可以根据不同的 Host 值做不同的处理。

4. 对动态生成的内容提供了完美支持

在设计 HTTP/1.0 时，需要在响应头中设置完整的数据大小，如Content-Length: 901，这样浏览器就可以根据设置的数据大小来接收数据。不过随着服务器端的技术发展，很多页面的内容都是动态生成的，因此在传输数据之前并不知道最终的数据大小，这就导致了浏览器不知道何时会接收完所有的文件数据。

HTTP/1.1 通过引入 Chunk transfer 机制来解决这个问题，服务器会将数据分割成若干个任意大小的数据块，每个数据块发送时会附上上个数据块的长度，最后使用一个零长度的块作为发送数据完成的标志。这样就提供了对动态内容的支持。

5. 客户端 Cookie、安全机制

#### HTTP/2：如何提升网络速度？

虽然 HTTP/1.1 已经做了大量的优化，但是依然存在很多性能瓶颈，而HTTP/1.1 为网络效率做了大量的优化，最核心的有如下三种方式：

- 增加了持久连接；
- 浏览器为每个域名最多同时维护 6 个 TCP 持久连接；
- 使用 CDN 实现域名分片机制（如果需要下载的文件数量很多，该技术会加快很多）。

CDN的作用其实相当于前端可以同时从多个服务器获取资源，比如没有CDN的话，如果有100个资源，则一次获取6个，需要 100 / 6 ，如果有10个CDN，则相当于缩短十倍：100 / (6 * 10)

**HTTP/1.1 的主要问题?**

1. 对带宽的利用率不理想

带宽是指每秒最大能发送或者接收的字节数。我们把每秒能发送的最大字节数称为上行带宽，每秒能够接收的最大字节数称为下行带宽。

我们常说的 100M 带宽，实际的下载速度能达到 12.5M/S，而采用 HTTP/1.1 时，也许在加载页面资源时最大只能使用到 2.5M/S，很难将 12.5M 全部用满。

主要有以下几个原因导致：

- **第一个原因，TCP 的慢启动**。
一旦一个 TCP 连接建立之后，就进入了发送数据状态，**刚开始 TCP 协议会采用一个非常慢的速度去发送数据，然后慢慢加快发送数据的速度**，直到发送数据的速度达到一个理想状态，我们把这个过程称为慢启动。慢启动是 TCP 为了减少网络拥塞的一种策略，我们是没有办法改变的。而之所以说慢启动会带来性能问题，是因为页面中常用的一些关键资源文件本来就不大，如 HTML 文件、CSS 文件和 JavaScript 文件，通常这些文件在 TCP 连接建立好之后就要发起请求的，但这个过程是慢启动，所以耗费的时间比正常的时间要多很多，这样就推迟了宝贵的首次渲染页面的时长了。
- **第二个原因，同时开启了多条 TCP 连接，那么这些连接会竞争固定的带宽**。比如系统同时建立了多条 TCP 连接，当带宽充足时，每条连接发送或者接收速度会慢慢向上增加；而一旦带宽不足时，这些 TCP 连接又会减慢发送或者接收的速度。比如一个页面有 200 个文件，使用了 3 个 CDN，那么加载该网页的时候就需要建立 6 * 3，也就是 18 个 TCP 连接来下载资源；在下载过程中，当发现带宽不足的时候，各个 TCP 连接就需要动态减慢接收数据的速度。这样就会出现一个问题，因为有的 TCP 连接下载的是一些关键资源，如 CSS 文件、JavaScript 文件等，而有的 TCP 连接下载的是图片、视频等普通的资源文件，但是多条 TCP 连接之间又不能协商让哪些关键资源优先下载，这样就有可能影响那些关键资源的下载速度了。
- **第三个原因，HTTP/1.1 队头阻塞的问题**。出现对头阻塞的问题时，带宽、cpu都被白白的浪费了。而在浏览器处理页面过程中，是非常希望能提前接收到数据的，这样就可以对这些数据做预处理操作，比如提前接收到了图片，那么就可以提前进行编解码操作，等到需要使用该图片的时候，就可以直接给出处理后的数据了，这样能让用户感受到整体速度的提升。

**HTTP/2 的多路复用?**

HTTP/1.1 所存在的一些主要问题：**慢启动和 TCP 连接之间相互竞争带宽是由于 TCP 本身的机制导致的，而队头阻塞是由于 HTTP/1.1 的机制导致的**。

基于此，HTTP/2 的思路就是**一个域名只使用一个 TCP 长连接来传输数据，这样整个页面资源的下载过程只需要一次慢启动，同时也避免了多个 TCP 连接竞争带宽所带来的问题**。

另外，就是队头阻塞的问题，等待请求完成后才能去请求下一个资源，这种方式无疑是最慢的，所以 HTTP/2 需要实现资源的并行请求，也就是任何时候都可以将请求发送给服务器，而并不需要等待其他请求的完成，然后服务器也可以随时返回处理好的请求资源给浏览器。

HTTP/2 使用了最核心、最重要且最具颠覆性的**多路复用**技术，可以将请求分成一帧一帧的数据去传输，这样带来了一个额外的好处，就是当收到一个优先级高的请求时，比如接收到 JavaScript 或者 CSS 关键资源的请求，服务器可以暂停之前的请求来优先处理关键资源的请求。

**多路复用是如何实现的呢？**

HTTP/2 添加了一个**二进制分帧层**（在传输层和应用层之间），其实也就是在浏览器发送给服务端或服务端发送给浏览器端，数据都会经过二进制分帧层处理，然后再经过网络模型的其他层进行传输(类似https的TLS层)。

基于二进制分帧层，还可以实现以下功能：

- 可以设置请求的优先级
- 服务器推送
- 头部压缩

HTTP/2 协议规范于 2015 年 5 月正式发布，在那之后，该协议已在互联网和万维网上得到了广泛的实现和部署。从目前的情况来看，国内外一些排名靠前的站点基本都实现了 HTTP/2 的部署。**使用 HTTP/2 能带来 20%～60% 的效率提升，至于 20% 还是 60% 要看优化的程度**。

#### HTTP/3：甩掉TCP、TLS 的包袱，构建高效网络

**一、TCP 的队头阻塞:**

虽然 HTTP/2 解决了**应用层面的队头阻塞问题**，不过和 HTTP/1.1 一样，HTTP/2 依然是基于 TCP 协议的，而 **TCP 最初就是为了单连接而设计的**。你可以把 TCP 连接看成是两台计算机之前的一个虚拟管道，计算机的一端将要传输的数据按照顺序放入管道，最终数据会以相同的顺序出现在管道的另外一头。

从一端发送给另外一端的数据会被**拆分为一个个按照顺序排列的数据包**，这些数据包通过网络传输到了接收端，接收端再按照顺序将这些数据包组合成原始数据，这样就完成了数据传输。

如果在数据传输的过程中，有一个数据包因为**网络故障或者其他原因而丢包了，那么整个 TCP 的连接就会处于暂停状态，需要等待丢失的数据包被重新传输**过来。

我们就把在 **TCP 传输过程中，由于单个数据包的丢失而造成的阻塞称为 TCP 上的队头阻塞**。

在 HTTP/2 中，**多个请求是跑在一个 TCP 管道中的，如果其中任意一路数据流中出现了丢包的情况**，那么就会阻塞该 TCP 连接中的所有请求。这不同于 HTTP/1.1，使用 HTTP/1.1 时，浏览器为每个域名开启了 6 个 TCP 连接，如果其中的 1 个 TCP 连接发生了队头阻塞，那么其他的 5 个连接依然可以继续传输数据。

所以随着丢包率的增加，HTTP/2 的传输效率也会越来越差。有测试数据表明，当系统达到了 2% 的丢包率时，HTTP/1.1 的传输效率反而比 HTTP/2 表现得更好。

**二、TCP 建立连接的延时?**

除了 TCP 队头阻塞之外，TCP 的握手过程也是影响传输效率的一个重要因素。

**网络延迟又称为 RTT（Round Trip Time）**。我们把从浏览器发送一个数据包到服务器，再从服务器返回数据包到浏览器的整个往返时间称为 RTT。RTT 是反映网络性能的一个重要指标。

那建立 TCP 连接时，需要花费多少个 RTT 呢？

我们知道 HTTP/1 和 HTTP/2 都是使用 TCP 协议来传输的，而如果使用 HTTPS 的话，还需要使用 TLS 协议进行安全传输，而使用 TLS 也需要一个握手过程，这样就需要有两个握手延迟过程。

- 在建立 TCP 连接的时候，需要和服务器进行三次握手来确认连接成功，也就是说需要在消耗完 1.5 个 RTT 之后才能进行数据传输。
- 进行 TLS 连接，TLS 有两个版本——TLS1.2 和 TLS1.3，每个版本建立连接所花的时间不同，大致是需要 1～2 个 RTT

总之，在传输数据之前，我们需要花掉3～4个RTT。如果浏览器和服务器的物理距离较近，那么 1 个 RTT 的时间可能在 10 毫秒以内，也就是说总共要消耗掉 30～40 毫秒。这个时间也许用户还可以接受，但如果服务器相隔较远，那么 1 个 RTT 就可能需要 100 毫秒以上了，这种情况下整个握手过程需要 300～400 毫秒，这时用户就能明显地感受到“慢”了。

**三、TCP 协议僵化:**

我们知道了 TCP 协议存在队头阻塞和建立连接延迟等缺点，那我们是不是可以通过改进 TCP 协议来解决这些问题呢？

答案是：非常困难。之所以这样，主要中间设备的僵化和操作系统更新滞后。

**四、QUIC 协议:**

HTTP/2 存在一些比较严重的与 TCP 协议相关的缺陷，但由于 TCP 协议僵化，我们几乎不可能通过修改 TCP 协议自身来解决这些问题，那么解决问题的思路是绕过 TCP 协议，发明一个 TCP 和 UDP 之外的新的传输协议。但是这也面临着和修改 TCP 一样的挑战，因为中间设备的僵化，这些设备只认 TCP 和 UDP，如果采用了新的协议，新协议在这些设备同样不被很好地支持。

因此，**HTTP/3 选择了一个折衷的方法——UDP 协议，基于 UDP 实现了类似于 TCP 的多路数据流、传输可靠性等功能，我们把这套功能称为 QUIC 协议**。

HTTP/3 中的 QUIC 协议集合了以下几点功能：

- **实现了类似 TCP 的流量控制、传输可靠性的功能**。虽然 UDP 不提供可靠性的传输，**但 QUIC 在 UDP 的基础之上增加了一层来保证数据可靠性传输**。它提供了数据包重传、拥塞控制以及其他一些 TCP 中存在的特性。
- **集成了 TLS 加密功能**。目前 QUIC 使用的是 TLS1.3，相较于早期版本 TLS1.3 有更多的优点，其中最重要的一点是减少了握手所花费的 RTT 个数。
- **实现了 HTTP/2 中的多路复用功能**。和 TCP 不同，QUIC 实现了在同一物理连接上可以有多个独立的逻辑数据流（可以理解为一个tcp，但同时有多个管道，每个管道只会影响该管道内的数据包）。实现了数据流的单独传输，就解决了 TCP 中队头阻塞的问题。
- **实现了快速握手功能**。由于 QUIC 是基于 UDP 的，所以 QUIC 可以实现使用 0-RTT 或者 1-RTT 来建立连接，这意味着 QUIC 可以用最快的速度来发送和接收数据，这样可以大大提升首次打开页面的速度。

**五、HTTP/3 的挑战:**

虽然理论上HTTP/3很好的解决了http/2的问题，但距离真正的部署还有很长的距离要走。因为动了底层协议，所以 HTTP/3 的增长会比较缓慢，这和 HTTP/2 有着本质的区别

### 浏览器安全

浏览器安全可以分为三大块——**Web 页面安全、浏览器网络安全和浏览器系统安全**，

#### 暴力破解

暴力破解 = 连续性尝试 + 字典 + 自动化

有效的字典，可以大大提高破解的效率：

- 常用的账号和密码（弱口令），比如常用用户名/密码TOP 500等
- 互联网上被脱裤后账号密码（社工库）
- 使用指定的字符串使用工具按照指定的规则进行排列组合。

一个网站是否存在暴力破解的漏洞的标准是，网站是否对登陆接口添加防暴力破解的措施，或者不合理的措施。比如从以下几个角度：

- 是否要求用户设置复杂的密码(多少位，字母数字组合等)
- 是否每次认证都使用安全的验证码(有些验证码可以被绕过，比如前端控制)
- 是否对尝试性登陆进行判断和限制(比如多次输入失败后如何限制等)
- 是否在必要的情况下使用双因素认证(除了用户名和密码还有短信验证码等)

**如何确实一个网站是否有漏洞？**

可以尝试去登陆，然后抓包，然后多次登录，观察验证条件和响应，判断是否存在暴利破解漏洞。可以利用[burp suite](https://portswigger.net/burp/releases/professional-community-2-1-07)这个软件来操作

#### 同源策略：为什么XMLHttpRequest不能跨域请求资源？

如果两个 URL 的协议、域名和端口都相同，我们就称这两个 URL 同源。浏览器默认两个相同的源之间是可以**相互访问资源和操作 DOM 的**。两个不同的源之间若想要相互访问资源或者操作 DOM，那么会有一套基础的安全策略的制约，我们把这称为同源策略。

具体来讲，**同源策略主要表现在 DOM、Web 数据和网络这三个层面**。

**第一个，DOM 层面**。同源策略限制了来自不同源的 JavaScript 脚本对当前 DOM 对象读和写的操作。

比如打开极客时间的官网，然后再从官网中打开另外一个专栏页面，由于第一个页面和第二个页面是同源关系，所以我们可以在第二个页面中操作第一个页面的 DOM，比如将第一个页面全部隐藏掉，代码如下所示：

```js
{
  let pdom = opener.document
  pdom.body.style.display = "none"
}
```

该代码中，对象 opener 就是指向第一个页面的 window 对象，我们可以通过操作 opener 来控制第一个页面中的 DOM。

**第二个，数据层面**。同源策略限制了不同源的站点读取当前站点的 Cookie、IndexDB、LocalStorage 等数据。由于同源策略，我们依然无法通过第二个页面的 opener 来访问第一个页面中的 Cookie、IndexDB 或者 LocalStorage 等内容。

**第三个，网络层面**。同源策略限制了通过 XMLHttpRequest 等方式将站点的数据发送给不同源的站点。

不过**安全性和便利性是相互对立的，让不同的源之间绝对隔离，无疑是最安全的措施，但这也会使得 Web 项目难以开发和使用**。因此我们就要在这之间做出权衡，出让一些安全性来满足灵活性；而出让安全性又带来了很多安全问题，最典型的是 XSS 攻击和 CSRF 攻击。这两种攻击后续再说，先来看看**浏览器出让了同源策略的哪些安全性**？

**1. 页面中可以嵌入第三方资源**，同源策略要让一个页面的所有资源都来自于同一个源，也就是要将该页面的所有 HTML 文件、JavaScript 文件、CSS 文件、图片等资源都部署在同一台服务器上，这无疑违背了 Web 的初衷，也带来了诸多限制。比如将不同的资源部署到不同的 CDN 上时，CDN 上的资源就部署在另外一个域名上，因此我们就需要同源策略对页面的引用资源开一个“口子”，让其任意引用外部文件。

所以最初的浏览器都是支持外部引用资源文件的，不过这也带来了很多问题。之前在开发浏览器的时候，遇到最多的一个问题是浏览器的首页内容会被一些恶意程序劫持，劫持的途径很多，其中最常见的是恶意程序通过各种途径往 HTML 文件中插入恶意脚本，也就是xss攻击。

为了解决 XSS 攻击，浏览器中引入了**内容安全策略，称为 CSP。CSP 的核心思想是让服务器决定浏览器能够加载哪些资源，让服务器决定浏览器是否能够执行内联 JavaScript 代码**。通过这些手段就可以大大减少 XSS 攻击。

**2. 跨域资源共享和跨文档消息机制**，前者其实就是当前域去请求其他域的一些资源，可以使用跨域资源共享（CORS）来解决。而有时候我们需要在不同源的DOM之间进行通信，可以通过 window.postMessage来实现。

鱼和熊掌不可兼得，**要绝对的安全就要牺牲掉便利性**，因此我们要在这二者之间做权衡，找到中间的一个平衡点，也就是目前的页面安全策略原型。总结起来，它具备以下三个特点：

- 页面中可以引用第三方资源，不过这也暴露了很多诸如 XSS 的安全问题，因此又在这种开放的基础之上引入了 CSP 来限制其自由程度。
- 使用 XMLHttpRequest 和 Fetch 都是无法直接进行跨域请求的，因此浏览器又在这种严格策略的基础之上引入了跨域资源共享策略，让其可以安全地进行跨域操作。
- 两个不同源的 DOM 是不能相互操纵的，因此，浏览器中又实现了跨文档消息机制，让其可以比较安全地通信。

#### 跨站脚本攻击（XSS）：为什么Cookie中有HttpOnly属性？

**什么是 XSS 攻击：**

XSS 全称是 Cross Site Scripting，为了与“CSS”区分开来，故简称 XSS，翻译过来就是“跨站脚本”。XSS 攻击是指黑客往 HTML 文件中或者 DOM 中注入恶意脚本，从而在用户浏览页面时利用注入的恶意脚本对用户实施攻击的一种手段。

最开始的时候，这种攻击是通过跨域来实现的，所以叫“跨域脚本”。但是发展到现在，往 HTML 文件中注入恶意代码的方式越来越多了，所以是否跨域注入脚本已经不是唯一的注入手段了，但是 XSS 这个名字却一直保留至今。

当页面被注入了恶意 JavaScript 脚本时，浏览器无法区分这些脚本是被恶意注入的还是正常的页面内容，所以恶意注入 JavaScript 脚本也拥有所有的脚本权限。下面我们就来看看，如果页面被注入了恶意 JavaScript 脚本，恶意脚本都能做哪些事情。

- 可以窃取 Cookie 信息。恶意 JavaScript 可以通过“document.cookie”获取 Cookie 信息，然后通过 XMLHttpRequest 或者 Fetch 加上 CORS 功能将数据发送给恶意服务器；
- 恶意服务器拿到用户的 Cookie 信息之后，就可以在其他电脑上模拟用户的登录，然后进行转账等操作。可以监听用户行为。
- 恶意 JavaScript 可以使用“addEventListener”接口来监听键盘事件，比如可以获取用户输入的信用卡等信息，将其发送到恶意服务器。黑客掌握了这些信息之后，又可以做很多违法的事情。
- 可以通过修改 DOM 伪造假的登录窗口，用来欺骗用户输入用户名和密码等信息。
- 还可以在页面内生成浮窗广告，这些广告会严重地影响用户体验。

**恶意脚本是怎么注入的**？主要有存储型XSS攻击，反射性XSS攻击和基于DOM的XSS攻击。

1. 存储型 XSS 攻击
2. 反射型 XSS 攻击
3. DOM型 XSS 攻击

我们知道**存储型 XSS 攻击和反射型 XSS 攻击都是需要经过 Web 服务器**来处理的，因此可以认为**这两种类型的漏洞是服务端的安全漏洞**。而基于 DOM 的 XSS 攻击全部都是在浏览器端完成的，因此**基于 DOM 的 XSS 攻击是属于前端的安全漏洞**。

但无论是何种类型的 XSS 攻击，**它们都有一个共同点**，那就是**首先往浏览器中注入恶意脚本，然后再通过恶意脚本将用户信息发送至黑客部署的恶意服务器上**。**所以要阻止 XSS 攻击，我们可以通过阻止恶意 JavaScript 脚本的注入和恶意消息的发送来实现。**

一些常用的阻止 XSS 攻击的策略。

1. 服务器对输入脚本进行过滤或转码（这样前端拿到之后，就执行不了了）
2. 充分利用 CSP（主要限制加载其他域下的资源文件，禁止向第三方域提交数据，禁止执行内联脚本和未授权的脚本，还提供了上报机制）
3. 使用 HttpOnly 属性，由于很多 XSS 攻击都是来盗用 Cookie 的，设置HttpOnly后，Cookie只能使用在http请求过程中，无法被js读取。
4. 还可以设置secure，只有https下才可以传输。

当然除了以上策略之外，我们还可以通过**添加验证码防止脚本冒充用户提交**危险操作。而对于**一些不受信任的输入，还可以限制其输入长度**，这样可以增大 XSS 攻击的难度。

#### CSRF攻击：陌生链接不要随便点

CSRF 英文全称是 Cross-site request forgery，所以又称为“跨站请求伪造”，是指黑客引诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。简单来讲，CSRF 攻击就是黑客利用了用户的登录状态，并通过第三方的站点来做一些坏事。

主要有以下三种方式实施CSRF攻击：

1. 自动发起 Get 请求
2. 自动发起 Post 请求
3. 引诱用户点击链接

和 XSS 不同的是，CSRF 攻击不需要将恶意代码注入用户的页面，仅仅是利用服务器的漏洞（未对请求做身份校验）和用户的登录状态来实施攻击。

而实施CSRF攻击的必要条件：

- 第一个，目标站点一定要有 CSRF 漏洞；
- 第二个，用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态；
- 第三个，需要用户打开一个第三方站点，可以是黑客的站点，也可以是一些论坛。

要让服务器避免遭受到 CSRF 攻击，通常有以下几种途径。

**1. 充分利用好 Cookie 的 SameSite 属性**，通常 CSRF 攻击都是从第三方站点发起的，要防止 CSRF 攻击，我们**最好能实现从第三方站点发送请求时禁止 Cookie 的发送**，Cookie 中的 SameSite 属性正是为了解决这个问题的，SameSite 选项通常有 Strict、Lax 和 None 三个值。如果 SameSite 的值是 **Strict**，那么浏览器会完全禁止第三方 Cookie。**Lax 相对宽松一点**从第三方站点的链接打开和从第三方站点提交 Get 方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通过 img、iframe 等标签加载的 URL，这些场景都不会携带 Cookie。而如果使用 None的话，在任何情况下都会发送 Cookie 数据。

对于防范 CSRF 攻击，我们**可以针对实际情况将一些关键的 Cookie 设置为 Strict 或者 Lax 模式，这样在跨站点请求时，这些关键的 Cookie 就不会被发送到服务器**，从而使得黑客的 CSRF 攻击失效。

**2. 验证请求的来源站点**，由于 CSRF 攻击大多来自于第三方站点，因此服务器可以禁止来自第三方站点的请求。那么该怎么判断请求是否来自第三方站点呢？

答案就是请求头中的 Referer 和 Origin 属性了，Referer 是 HTTP 请求头中的一个字段，记录了该 HTTP 请求的来源地址。比如我从极客时间的官网打开了 InfoQ 的站点，那么请求头中的 Referer 值是极客时间的 URL(包含路径信息)。但是**有一些场景是不适合将来源 URL 暴露给服务器的**，因此浏览器提供给开发者一个选项，可以不用上传 Referer 值，具体可参考 Referrer Policy。但在服务器端验证请求头中的 Referer 并不是太可靠，因此标准委员会又制定了 Origin 属性，在一些重要的场合，比如通过 XMLHttpRequest、Fecth 发起跨站请求或者通过 Post 方法发送请求时，都会带上 Origin 属性

**Origin 属性只包含了域名信息，并没有包含具体的 URL 路径，这是 Origin 和 Referer 的一个主要区别。**服务器的策略是优先判断 Origin，如果请求头中没有包含 Origin 属性，再根据实际情况判断是否使用 Referer 值。

**3. CSRF Token**，其实就是每次页面打开时，服务器都会生成一个csrf token写入到页面的隐藏域里，等到用户发起请求时会写到这个csrf token值，服务端进行校验。而如果请求是第三方站点发出的，则无法获取到csrf token值，所以即使发出了请求，服务器也会因为没有或csrf token不正确而拒绝请求。

综上：我们可以得出页面安全问题的主要原因就**是浏览器为同源策略开的两个“后门”**：一个是在页面中可以任意引用第三方资源，另外一个是通过 CORS 策略让 XMLHttpRequest 和 Fetch 去跨域请求资源。

为了解决这些问题，我们引入了 CSP 来限制页面任意引入外部资源，引入了 HttpOnly 机制来禁止 XMLHttpRequest 或者 Fetch 发送一些关键 Cookie，引入了 SameSite 和 Origin 来防止 CSRF 攻击。

#### 安全沙箱：页面和系统之间的隔离墙

我们知道浏览器被划分为**浏览器内核和渲染内核**两个核心模块，其中**浏览器内核是由网络进程、浏览器主进程和 GPU 进程组成的，渲染内核就是渲染进程**。那如果我们在浏览器中打开一个页面，这两个模块是怎么配合的呢？

所有的网络资源都是通过浏览器内核来下载的，下载后的资源会通过 IPC 将其提交给渲染进程（浏览器内核和渲染进程之间都是通过 IPC 来通信的）。然后渲染进程会对这些资源进行解析、绘制等操作，最终生成一幅图片。但是渲染进程并不负责将图片显示到界面上，而是将最终生成的图片提交给浏览器内核模块，由浏览器内核模块负责显示这张图片。

或许你有疑问，为什么一定要通过浏览器内核去请求资源，再将数据转发给渲染进程，而不直接从进程内部去请求网络资源？为什么渲染进程只负责生成页面图片，生成图片还要经过 IPC 通知浏览器内核模块，然后让浏览器内核去负责展示图片？这样不是复杂了吗？

其实这主要是从安全的角度考虑的，由于渲染进程需要执行 DOM 解析、CSS 解析、网络图片解码等操作，如果渲染进程中存在系统级别的漏洞，那么以上操作就有可能让恶意的站点获取到渲染进程的控制权限，进而又获取操作系统的控制权限，这对于用户来说是非常危险的。

因为网络资源的内容存在着各种可能性，所以浏览器会默认所有的网络资源都是不可信的，都是不安全的。但谁也不能保证浏览器不存在漏洞，只要出现漏洞，黑客就可以通过网络内容对用户发起攻击。

我们知道，如果你下载了一个恶意程序，但是没有执行它，那么恶意程序是不会生效的。同理，浏览器之于网络内容也是如此，浏览器可以安全地下载各种网络资源，但是如果要执行这些网络资源，比如解析 HTML、解析 CSS、执行 JavaScript、图片编解码等操作，就需要非常谨慎了，因为一不小心，黑客就会利用这些操作对含有漏洞的浏览器发起攻击。

基于以上原因，我们需要在渲染进程和操作系统之间建一道墙，即便渲染进程由于存在漏洞被黑客攻击，但由于这道墙，黑客就获取不到渲染进程之外的任何操作权限。将渲染进程和操作系统隔离的这道墙就是我们要聊的安全沙箱。

浏览器中的安全沙箱是利用操作系统提供的安全技术，让**渲染进程在执行过程中无法访问或者修改操作系统中的数据，在渲染进程需要访问系统资源的时候，需要通过浏览器内核来实现，然后将访问的结果通过 IPC 转发给渲染进程**。

**安全沙箱最小的保护单位是进程。因为单进程浏览器需要频繁访问或者修改操作系统的数据，所以单进程浏览器是无法被安全沙箱保护的，而现代浏览器采用的多进程架构使得安全沙箱可以发挥作用**。

安全沙箱最小的保护单位是进程，并且能限制进程对操作系统资源的访问和修改，这就意味着如果要让安全沙箱应用在某个进程上，**那么这个进程必须没有读写操作系统的功能，比如读写本地文件、发起网络请求、调用 GPU 接口等**。

再看下渲染进程和浏览器内核分别复杂哪些职责：

- 渲染进程：html解析，css解析，图片解码，js执行，布局，绘制，xml解析
- 浏览器内核：Cookie存储，Cache存储，网络请求，文件读取，下载管理，ssl/tls，浏览器窗口管理等。

那安全沙箱是如何影响到各个模块功能的呢？

**1. 持久存储：**

由于安全沙箱需要负责确保渲染进程无法直接访问用户的文件系统，但是在渲染进程内部有访问 Cookie 的需求、有上传文件的需求，为了解决这些文件的访问需求，所以现代浏览器将读写文件的操作全部放在了浏览器内核中实现，然后通过 IPC 将操作结果转发给渲染进程。

**2. 网络访问：**

同样有了安全沙箱的保护，在渲染进程内部也是不能直接访问网络的，如果要访问网络，则需要通过浏览器内核。不过浏览器内核在处理 URL 请求之前，会检查渲染进程是否有权限请求该 URL，比如检查 XMLHttpRequest 或者 Fetch 是否是跨站点请求（难道跨域的请求没有被发出去吗？不对啊，之前项目里如果设置自定义请求头没和服务器对应起来，服务器可以接受到请求啊。。。不对，此时协议，域名，端口是匹配的，只是不满足cors规则而已），或者检测 HTTPS 的站点中是否包含了 HTTP 的请求。

**3. 用户交互：**

通常情况下，如果你要实现一个 UI 程序，操作系统会提供一个界面给你，该界面允许应用程序与用户交互，允许应用程序在该界面上进行绘制，比如 Windows 提供的是 HWND，Linux 提供的 X Window，我们就把 HWND 和 X Window 统称为窗口句柄。应用程序可以在窗口句柄上进行绘制和接收键盘鼠标消息。

不过在现代浏览器中，由于每个渲染进程都有安全沙箱的保护，所以在渲染进程内部是无法直接操作窗口句柄的，这也是为了限制渲染进程监控到用户的输入事件。

由于渲染进程不能直接访问窗口句柄，所以渲染进程需要完成以下两点大的改变。

**第一点**渲染进程需要渲染出位图。为了向用户显示渲染进程渲染出来的位图，渲染进程需要将生成好的位图发送到浏览器内核，然后浏览器内核将位图复制到屏幕上。

**第二点**操作系统没有将用户输入事件直接传递给渲染进程，而是将这些事件传递给浏览器内核。然后浏览器内核再根据当前浏览器界面的状态来判断如何调度这些事件，如果当前焦点位于浏览器地址栏中，则输入事件会在浏览器内核内部处理；如果当前焦点在页面的区域内，则浏览器内核会将输入事件转发给渲染进程。

之所以这样设计，就是为了限制渲染进程有监控到用户输入事件的能力，所以所有的键盘鼠标事件都是由浏览器内核来接收的，然后浏览器内核再通过 IPC 将这些事件发送给渲染进程。

**4、站点隔离（Site Isolation）：**

所谓站点隔离是指 Chrome 将同一站点（包含了相同根域名和相同协议的地址）中相互关联的页面放到同一个渲染进程中执行。

最开始 Chrome 划分渲染进程是以标签页为单位，也就是说整个标签页会被划分给某个渲染进程。但是，按照标签页划分渲染进程存在一些问题，原因就是一个标签页中可能包含了多个 iframe，而这些 iframe 又有可能来自于不同的站点，这就导致了多个不同站点中的内容通过 iframe 同时运行在同一个渲染进程中。

目前所有操作系统都面临着两个 A 级漏洞——幽灵（Spectre）和熔毁（Meltdown），这两个漏洞是由处理器架构导致的，很难修补，黑客通过这两个漏洞可以直接入侵到进程的内部，如果**入侵的进程没有安全沙箱的保护，那么黑客还可以发起对操作系统的攻击**。

所以如果一个银行站点包含了一个恶意 iframe，然后这个恶意的 iframe 利用这两个 A 级漏洞去入侵渲染进程，那么恶意程序就能读取银行站点渲染进程内的所有内容了，这对于用户来说就存在很大的风险了。

因此 Chrome 几年前就开始重构代码，将标签级的渲染进程重构为 iframe 级的渲染进程，目前 Chrome 浏览器已经默认实现了站点隔离的功能，这意味着标签页中的 iframe 也会遵守同一站点的分配原则，如果标签页中的 iframe 和标签页是同一站点，并且有连接关系，那么标签页依然会和当前标签页运行在同一个渲染进程中，如果 iframe 和标签页不属于同一站点，那么 iframe 会运行在单独的渲染进程中。

实现了站点隔离，就可以将恶意的 iframe 隔离在恶意进程内部，使得它无法继续访问其他 iframe 进程的内容，因此也就无法攻击其他站点了。

值得注意是，2019 年 10 月 20 日 Chrome 团队宣布安卓版的 Chrome 已经全面支持站点隔离，你可以[参考](https://www.digitalinformationworld.com/2019/10/google-improves-site-isolation-for-stronger-chrome-browser-security.html)。

#### HTTPS：让数据传输更安全

前面分别从页面安全，系统安全角度说了，这里再说说网络安全。

起初设计 HTTP 协议的目的很单纯，就是为了传输超文本文件，那时候也没有太强的加密传输的数据需求，所以 HTTP 一直保持着明文传输数据的特征。但这样的话，在传输过程中的每一个环节，数据都有可能被窃取或者篡改，很容易出现中间人攻击。

具体来讲，在将 HTTP 数据提交给 TCP 层之后，数据会经过用户电脑、WiFi 路由器、运营商和目标服务器，在这中间的每个环节中，数据都有可能被窃取或篡改。比如用户电脑被黑客安装了恶意软件，那么恶意软件就能抓取和篡改所发出的 HTTP 请求的内容。或者用户一不小心连接上了 WiFi 钓鱼路由器，那么数据也都能被黑客抓取或篡改。

我们可以看出 HTTPS 并非是一个新的协议，**通常 HTTP 直接和 TCP 通信，HTTPS 则先和安全层通信，然后安全层再和 TCP 层通信**。也就是说 HTTPS 所有的安全核心都在安全层，它不会影响到上面的 HTTP 协议，也不会影响到下面的 TCP/IP，因此要搞清楚 HTTPS 是如何工作的，就要弄清楚安全层是怎么工作的。

总的来说，安全层有两个主要的职责：对**发起 HTTP 请求的数据进行加密操作和对接收到 HTTP 的内容进行解密操作**。

https协议过程：

1. 首先浏览器向服务器发送对称加密套件列表、非对称加密套件列表（其实就是支持哪些加密算法）和随机数 client-random；
2. 服务器保存随机数 client-random，选择对称加密和非对称加密的套件，然后生成随机数 service-random，向浏览器发送选择的加密套件、service-random 和公钥（这是RSA的公钥）；
3. 浏览器保存公钥，并生成随机数 pre-master，然后利用公钥对 pre-master 加密，并向**服务器发送加密后的数据**；
4. 最后服务器拿出自己的私钥，解密出 pre-master 数据，并返回确认消息。
5. 服务器和浏览器就有了共同的 client-random、service-random 和 pre-master，然后服务器和浏览器会使用这三组随机数生成对称密钥，因为服务器和浏览器使用同一套方法来生成密钥，所以最终生成的密钥也是相同的。
6. 生成对称加密的密钥之后，双方就可以使用对称加密的方式来传输数据了

需要特别注意的一点，**pre-master 是经过公钥加密之后传输的，所以黑客无法获取到 pre-master，这样黑客就无法生成密钥，也就保证了黑客无法破解传输过程中的数据了**。

**通过对称和非对称混合方式，我们完美地实现了数据的加密传输**。不过这种方式依然存在着问题，比如我要打开极客时间的官网，但是黑客通过 DNS 劫持将极客时间官网的 IP 地址替换成了黑客的 IP 地址，这样我访问的其实是黑客的服务器了，黑客就可以在自己的服务器上实现公钥和私钥，而对浏览器来说，它完全不知道现在访问的是个黑客的站点。

因此还需要服务器向浏览器提供证明“你现在访问的服务器就是对的”，那怎么证明呢？

比如你要买房子，首先你需要给房管局提交你买房的材料，包括银行流水、银行证明、身份证等，然后房管局工作人员在验证无误后，会发给你一本盖了章的房产证，房产证上包含了你的名字、身份证号、房产地址、实际面积、公摊面积等信息。

在这个例子中，你之所以能证明房子是你自己的，是因为引进了房管局这个权威机构，并通过这个权威机构给你颁发一个证书：房产证。

同理，极客时间要证明这个服务器就是极客时间的，也需要使用权威机构颁发的证书，这个权威机构称为 **CA（Certificate Authority），颁发的证书就称为数字证书（Digital Certificate)**。

而数字证书的作用：

- 一个是通过数字证书向浏览器证明服务器的身份，
- 另一个是数字证书里面包含了服务器公钥。

相较于之前的https协议流程，添加了数字证书的流程有以下两点改变：

- 服务器没有直接返回公钥给浏览器，而是返回了数字证书，而RSA公钥正是包含在数字证书中的；
- 在浏览器端多了一个证书验证的操作，验证了证书之后，才继续后续流程。

通过引入数字证书，我们就实现了服务器的身份认证功能，这样即便黑客伪造了服务器，但是由于证书是没有办法伪造的，所以依然无法欺骗用户。

**数字证书如何申请呢？**

- 首先极客时间需要准备一套私钥和公钥，私钥留着自己使用（不需要给CA机构）；
- 然后极客时间向 CA 机构提交公钥、公司、站点等信息并等待认证，这个认证过程可能是收费的；
- CA 通过线上、线下等多种渠道来验证极客时间所提供信息的真实性，如公司是否存在、企业是否合法、域名是否归属该企业等
- 如信息审核通过，CA 会向极客时间签发认证的数字证书，包含了极客时间的公钥、组织信息、CA 的信息、有效时间、证书序列号等，这些信息都是明文的，同时包含一个 CA 生成的签名。

最后一步数字签名的过程还需要解释下：**首先 CA 使用 Hash 函数来计算极客时间提交的明文信息，并得出信息摘要；然后 CA 再使用CA自己的私钥对信息摘要进行加密，加密后的密文就是 CA 颁给极客时间的数字签名**。

**浏览器如何验证数字证书？**

有了 CA 签名过的数字证书，当浏览器向极客时间服务器发出请求时，服务器会返回数字证书给浏览器。

浏览器接收到数字证书之后，会对数字证书进行验证。首先浏览器读取证书中相关的明文信息，采用 CA 签名时相同的 Hash 函数来计算并得到信息摘要 A；然后再利用对应 CA 的公钥(系统内置)解密签名数据，得到信息摘要 B；对比信息摘要 A 和信息摘要 B，如果一致，则可以确认证书是合法的，即证明了这个服务器是极客时间的；同时浏览器还会验证证书相关的域名信息、有效时间等信息。

这时候相当于验证了 CA 是谁，但是这个 CA 可能比较小众，浏览器不知道该不该信任它，然后**浏览器会继续查找给这个 CA 颁发证书的 CA**，再以同样的方式验证它上级 CA 的可靠性。通常情况下，操作系统中会内置信任的顶级 CA 的证书信息（包含公钥），如果这个 CA 链中没有找到浏览器内置的顶级的 CA，证书也会被判定非法。

**浏览器是如何拿到CA的公钥的呢？**

这里其实有两种方式：

- 建立https链接时，服务器会将两个证书(网站的数字证书和CA机构的证书)都返给浏览器（这种方式无法证明CA机构证书的可信性）
- 将可信的CA机构的证书内置在浏览器操作系统中(当然是通过证书链的方式内置)

我们知道CA是一个机构，它的职责是给一些公司或者个人颁发数字证书，在颁发证书之前，有一个重要的环节，就是审核申请者所提交资料的合法性和合规性。

不过申请者的类型有很多：

- 如果申请者是个人，CA只需要审核所域名的所有权就行了，审核域名所有权有很多种方法，在常用的方法是让申请者在域名上放一个文件(有时候调用微信的sdk也需要在根目录放置一个文件，应该原理是一样的)，然后CA验证该文件是否存在，即可证明该域名是否是申请者的。我们把这类数字证书称为DV，审核这种个人域名信息是最简单的，因此CA收取的费用也是最低的，有些CA甚至免费为个人颁发数字证书。参考[freessl.cn](https://freessl.cn/)

- 如果申请者是普通公司，那么CA除了验证域名的所有权之外，还需要验证公司公司的合法性，这类证书通常称为OV。由于需要验证公司的信息，所有需要额外的资料，而且审核过程也更加复杂，申请OV证书的价格也更高，主要是由于验证公司的合法性是需要人工成本的。

- 如果申请者是一些金融机构、银行、电商平台等，所以还需额外的要验证一些经营资质是否合法合规，这类证书称为EV。申请EV的价格非常高，甚至达到好几万一年，因为需要人工验证更多的内容。

好了，我们了解了证书有很多种不同的类型，DV这种就可以自动审核，不过OV、EV这种类型的证书就需要人工验证了，而每个地方的验证方式又可能不同，比如你是一家美国本地的CA公司，要给中国的一些金融公司发放数字证书，这过程种验证证书就会遇到问题，因此就需要本地的CA机构，他们验证会更加容易。

因此，就全球就有很多家CA机构，然后就出现了一个问题，这些CA是怎么证明它自己是安全的？如果一个恶意的公司也成立了一个CA机构，然后给自己颁发证书，那么这就非常危险了，因此我们必须还要实现一个机制，让CA证明它自己是安全无公害的。

这就涉及到数字证书链了。

要讲数字证书链，就要了解我们的CA机构也是分两种类型的，中间CA(Intermediates CAs)和根CA(Root CAs)，通常申请者都是向中间CA去申请证书的，而根CA作用就是给中间CA做认证，通常，一个根CA会认证很多中间的CA，而这些中间CA又可以去认证其它的中间CA。

 比如你可以在Chrome上打开极客时间的官网，然后点击地址栏前面的那把小锁，你就可以看到*.geekbang,org的证书是由中间CA GeoTrust RSA CA2018颁发的，而中间CA GeoTrust RSA CA2018又是由根CA DigiCert Global Root CA颁发的，所以这个证书链就是：*.geekbang,org--->GeoTrust RSA CA2018-->DigiCert Global Root CA。

因此浏览器验证极客时间的证书时，会先验证*.geekbang,org的证书，如果合法再验证中间CA的证书，如果中间CA也是合法的，那么浏览器会继续验证这个中间CA的根证书。

这时候问题又来了，怎么证明根证书是合法的？

浏览器的做法很简单，它会查找系统的根证书，如果这个根证书在操作系统里面，那么浏览器就认为这个根证书是合法的，如果验证的根证书不在操作系统里面，那么就是不合法的。

而操作系统里面这些内置的根证书也不是随便内置的，这些根CA都是通过WebTrust国际安全审计认证。

那么什么又是WebTrust认证？

WebTrust（网络信任）认证是电子认证服务行业中唯一的国际性认证标准，主要对互联网服务商的系统及业务运作的商业惯例和信息隐私，交易完整性和安全性。WebTrust认证是各大主流的浏览器、微软等大厂商支持的标准，是规范CA机构运营服务的国际标准。在浏览器厂商根证书植入项目中，必要的条件就是要通过WebTrust认证，才能实现浏览器与数字证书的无缝嵌入。

目前通过WebTrust认证的根CA有 Comodo，geotrust，rapidssl，symantec，thawte，digicert等。也就是说，这些根CA机构的根证书都内置在个大操作系统中，只要能从数字证书链往上追溯到这几个根证书，浏览器会认为使用者的证书是合法的。

当然如果黑客攻入了用户的电脑系统，伪造根证书，则安全性也就全无了，https并非绝对安全，只是增加了攻破的难度。

### 页面性能工具分析

关于 Web 应用的速度，我们需要从两个阶段来考虑：**页面加载阶段、页面交互阶段**

如果没有工具来**模拟各种不同的场景并统计各种性能指标**，那么定位 Web 应用的性能瓶颈将是一件非常困难的任务。幸好，Chrome 为我们提供了非常完善的性能检测工具：Performance 和 Audits，它们能够准确统计页面在加载阶段和运行阶段的一些核心数据，诸如任务执行记录、首屏展示花费的时长等，有了这些数据我们就能很容易定位到 Web 应用的性能瓶颈 。

Perfomance 提供了非常多的运行时数据，能让我们看到更多细节数据，但是更加复杂，Audits 就比较智能，但是隐藏了更多细节，只提供给我们一些直观的性能数据，同时，还会给我们提供一些优化建议。

检测web的性能指标之前，需要配置工作环境：Chrome Canary 版的浏览器(开发者工具和浏览器特性都是最新的)和隐身模式

#### 加载阶段性能：使用Audits来优化Web性能

打开控制台，然后选择Audits，会看到一些配置模块，主要两大类：**监测类型 (Categories)，设备类型 (Device)**。

**监控类型 (Categories) **是指需要监控哪些内容：

- 监测并分析 Web 性能 (Performance)；
- 监测并分析 PWA(Progressive Web App) 程序的性能；
- 监测并分析 Web 应用是否采用了最佳实践策略 (Best practices)；
- 监测并分析是否实施了无障碍功能 (Accessibility)，无障碍功能让一些身体有障碍的人可以方便地浏览你的 Web 应用。
- 监测并分析 Web 应用是否采实施了 SEO 搜素引擎优化 (SEO)。

**设备 (Device) 部分**主要用来模拟移动设备（Mobile）环境和桌面环境（Desktop）的。

点击生成报告的按钮之后，我们大约需要等待一分钟左右，Audits 就可以生成最终的分析报告了：

报告主要会以下几个方面：

- 报告中心的得分就是总体web性能得分，总分100分。
- 第一个部分是性能指标 (Metrics)
- 第二个部分是可优化项 (Opportunities)
- 第三部分是手动诊断 (Diagnostics)
- 最后一部分是运行时设置 (Runtime Settings)

如果选择移动设备模式，你可以看到发送网络请求时的 User Agent 会变成设备相关信息，还有会模拟设备的网速，这个体现在网络限速上。

**性能指标的六项分别什么意思？**

在性能指标下面一共有六项内容，这六项内容分别对应了从Web应用的加载到页面展示完成的这段时间中，各个阶段所消耗的时长。在中间还有一个 View Trace 按钮，点击该按钮可以跳转到 Performance 标签。

- 首次绘制 (First Paint)；
- 首次有效绘制 (First Meaningfull Paint)；
- 首屏时间 (Speed Index)；
- 首次 CPU 空闲时间 (First CPU Idle)；
- 完全可交互时间 (Time to Interactive)；
- 最大估计输入延时 (Max Potential First Input Delay)。

**首次绘制 (First Paint)**，在渲染进程确认要渲染当前的请求后，渲染进程会创建一个空白页面，我们把创建空白页面的这个时间点称为 First Paint，简称 FP。

然后渲染进程继续请求关键资源，关键资源包括了 JavaScript 文件和 CSS 文件，因为关键资源会阻塞页面的渲染，所以我们需要等待关键资源加载完成后，才能执行进一步的页面绘制。等到关键资源加载完毕后，然后脚本会修改 DOM，引发重绘和重排等一系列操作，当页面中绘制了第一个像素时，我们把这个时间点称为 First Content Paint，简称 FCP。

接下来继续执行 JavaScript 脚本，当**首屏内容完全绘制完成时，我们把这个时间点称为 Largest Content Paint，简称 LCP**。

在 FCP 和 LCP 中间，**还有一个 FMP，这个是首次有效绘制，由于 FMP 计算复杂，而且容易出错，现在不推荐使用该指标**。

接下来 JavaScript 脚本执行结束，**渲染进程判断该页面的 DOM 生成完毕，于是触发 DOMContentLoad 事件。等所有资源都加载结束之后，再触发 onload 事件**。

**了解了每一项的意义，那如何优化呢？**

**第一项指标 FP**，如果 FP 时间过久，那么直接说明了一个问题，那就是页面的 HTML 文件可能由于网络原因导致加载时间过久。（这里需要注意，浏览器需要根据HTTP响应头来判断要不要继续执行导航流程，如果content-type是下载类型，就不需要渲染进程创建空白页面了）

**第二项是 FMP**，上面也提到过由于 FMP 计算复杂，所以现在不建议使用该指标了，另外由于 LCP 的计算规则简单，所以推荐使用 LCP 指标，具体文章你可以参考[这里](https://web.dev/lcp/)。不过是 FMP 还是 LCP，优化它们的方式都是类似的，如果 FMP 和 LCP 消耗时间过久，那么有可能是**加载关键资源花的时间过久，也有可能是 JavaScript 执行过程中所花的时间过久**。

**第三项是首屏时间 (Speed Index)**，这就是我们上面提到的 LCP，它表示填满首屏页面所消耗的时间，首屏时间的值越大，那么加载速度越慢，具体的优化方式同优化第二项 FMP 是一样。

**第四项是首次 CPU 空闲时间 (First CPU Idle)**，也称为 First Interactive，它表示页面达到最小化可交互的时间，也就是说并不需要等到页面上的所有元素都可交互，只要可以对大部分用户输入做出响应即可。要缩短首次 CPU 空闲时长，我们就需要尽可能快地加载完关键资源，尽可能快地渲染出来首屏内容，因此优化方式和第二项 FMP 和第三项 LCP 是一样的。

**第五项是完全可交互时间 (Time to Interactive)，**简称 **TTI**，它表示页面中所有元素都达到了可交互的时长。简单理解就这时候页面的内容已经完全显示出来了，所有的 JavaScript 事件已经注册完成，页面能够对用户的交互做出快速响应，通常满足响应速度在 50 毫秒以内。如果要解决 TTI 时间过久的问题，我们可以推迟执行一些和生成页面无关的 JavaScript 工作。

**第六项是最大估计输入延时 (Max Potential First Input Delay）**，这个指标是估计你的 Web 页面在加载最繁忙的阶段， 窗口中响应用户输入所需的时间，为了改善该指标，我们可以使用 WebWorker 来执行一些计算，从而释放主线程。另一个有用的措施是重构 CSS 选择器，以确保它们执行较少的计算。

#### 页面性能工具：如何使用Performance？

分析页面性能时，如果**说 Audits 是道开胃菜，那么 Performance 才是正餐，之所这样说，主要是因为 Performance 可以记录站点在运行过程中的性能数据**，有了这些性能数据，我们就可以回放整个页面的执行过程，这样就方便我们来定位和诊断每个时间段内页面的运行情况，从而有效帮助我们找出页面的性能瓶颈。

不同于 Audits，**Perofrmance 不会给出性能得分，也不会给出优化建议，它只是单纯地采集性能数据，并将采集到的数据按照时间线的方式来展现**，我们要做的就是依据原始数据来分析 Web 应用的性能问题。

我们在 Chrome 中任意打开一个站点，再打开 Chrome 开发者工具，然后选择 Performance 标签，点击右上角齿轮可以查看配置项：可以设置该区域中的“Network”来限制网络加载速度，设置“CPU”来限制 CPU 的运算速度，通过设置，我们就可以在 Chrome 浏览器上来模拟手机等性能不高的设备了。在这里我将 CPU 的运算能力降低到了 1/6，将网络的加载速度设置为“快的 3G(Fast 3G)”用来模拟 3G 的网络状态

不同于 **Audits 只能监控加载阶段的性能数据**，Performance 还可以监控交互阶段的性能数据，黑色圆点按钮是用来记录交互阶段性能数据的，带箭头的圆圈形按钮用来记录加载阶段的性能数据。

两种录制方式稍微不同：

- 当你录制加载阶段的性能数据时，Performance 会重新刷新页面，并等到页面完全渲染出来后，Performance 就会自动停止录制。
- 如果你是录制交互阶段的性能时，那么需要手动停止录制过程。

不管哪种录制，最后生成的报告页都是相同的，主要包含三个部分：分别为**概览面板、性能指标面板和详情面板**。

要熟练掌握这三个面板，我们需要先明白时间线的概念，这是因为概览面板和性能指标面板都依赖于时间线，其实这个阶段持续的时间轴，每个时间点上都会对应的参数。

**1. 概览面板：**

诸如页面帧速 (FPS)、CPU 资源消耗、网络请求流量、V8 内存使用量 (堆内存) 等，按照时间顺序做成图表的形式展现出来，这就是概览面板

- 如果 FPS 图表上出现了红色块，那么就表示**红色块附近渲染出一帧所需时间过久，帧的渲染时间过久，就有可能导致页面卡顿**。
- 如果 CPU 图形占用面积太大，表示 CPU 使用率就越高，那么就有可能因为某个 JavaScript 占用太多的主线程时间，从而影响其他任务的执行。
- 如果 V8 的内存使用量一直在增加，就有可能是某种原因导致了内存泄漏。

除了以上指标以外，概览面板还展示加载过程中的几个关键时间节点，**如 FP、LCP、DOMContentLoaded、Onload** 等事件产生的时间点。这些关键时间点体现在了**几条不同颜色的竖线**上。

**2. 性能面板：**

通常，我们通过概览面板来定位到可能存在问题的时间节点，接下来需要更进一步的数据，来分析导致该问题的原因，那么应该怎么分析呢？

这就需要引入性能面板了，在性能面板中，记录了非常多的性能指标项，**比如 Main 指标记录渲染主线程的任务执行过程，Compositor 指标记录了合成线程的任务执行过程，GPU 指标记录了 GPU 进程主线程的任务执行过程**。

简而言之，我们通过概览面板来定位问题的时间节点，然后再使用性能面板分析该时间节点内的性能数据。**具体地讲，比如概览面板中的 FPS 图表中出现了红色块，那么我们点击该红色块，性能面板就定位到该红色块的时间节点内了**

如果你想要查看事件范围更广的性能指标，你只需要将鼠标放到时间线上，滚动鼠标滚轮就可以就行缩放了。如果放大之后，要查看的内容如果超出了屏幕，那么你可以点击鼠标左键来拖动时间线，直到找到需要查看的内容，你也可以通过键盘上的“WASD”四个键来进行缩放和位置的移动。

**3. 性能面板各项指标的含义：**

**Main 指标**，它记录了渲染进程的主线程的任务执行记录，在 Perofrmace 录制期间，在渲染主线程上执行的所有记录都可以通过 Main 指标来查看。点击 Main 来展开主进程的任务执行记录，可以看到一段段横条代表执行一个个任务，长度越长，花费的时间越多；竖向代表该任务的执行记录。我们知道主线程上跑了特别多的任务，诸如渲染流水线的大部分流程，JavaScript 执行、V8 的垃圾回收、定时器设置的回调任务等等

**Compositor 指标**，我们知道了渲染主线程在生成层树 (LayerTree) 之后，然后根据层树生成每一层的绘制列表，我们把这个过程称为绘制 (Paint)。在绘制阶段结束之后，渲染主线程会将这些绘列表制提交 (commit)给合成线程，并由合成线程合成出来漂亮的页面。

在合成线程执行任务的过程中，还需要 GPU 进程的配合来生成位图，我们把这个 **GPU 生成位图的过程称为光栅化**。如果合成线程直接和 GPU 进程进行通信，那么势必会阻塞后面的合成任务，因此合成线程又维护了一个**光栅化线程池 (Raster)**，用来让 GPU 执行光栅化的任务。因为光栅化线程池和 GPU 进程中的任务执行也会影响到页面的性能，所以性能面板也添加了这两个指标，分别是 Raster 指标和 GPU 指标。因为 Raster 是线程池，所以如果你点开 Raster 项，可以看到它维护了多个线程。

**渲染进程中除了有主线程、合成线程、光栅化线程池之外，还维护了一个 IO 线程**，**该 IO 线程主要用来接收用户输入事件、网络事件、设备相关等事件，如果事件需要渲染主线程来处理，那么 IO 线程还会将这些事件转发给渲染主线程**。在性能面板上，Chrome_ChildIOThread 指标对应的就是 IO 线程的任务记录。

**Network 指标**，网络记录展示了页面中的每个网络请求所消耗的时长，并以瀑布流的形式展现。

**Timings 指标，**用来记录一些关键的时间节点在何时产生的数据信息，诸如 FP、FCP、LCP 等。

**Frames 指标，**也就是浏览器生成每帧的记录，我们知道页面所展现出来的画面都是由渲染进程一帧一帧渲染出来的，帧记录就是用来记录渲染进程生成所有帧信息，包括了渲染出每帧的时长、每帧的图层构造等信息，

**Interactions 指标**，用来记录用户交互操作，比如点击鼠标、输入文字等交互信息。

**4. 详情面板：**

主线程上执行了解析 HTML(ParserHTML) 的任务，对应于性能面板就是一个长条和多个竖条组成图形。通过上面的图形我们只能得到一个大致的信息，如果想要查看这些记录的详细信息，就需要引入**详情面板**了。

你可以通过在性能面板中选中性能指标中的任何历史数据，然后选中记录的细节信息就会展现在详情面板中了。比如我点击了 Main 指标中的 ParserHTML 这个过程，就可以看到相关的一些信息，可[参考](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool?hl=zh-CN)

#### 性能分析工具：如何分析Performance中的Main指标？

打开 Chrome 的开发者工具，选择 Performance 标签，然后录制加载阶段任务执行记录，然后关注 Main 指标，Main 指标就记录渲染主线上所执行的全部**任务**，以及每个任务的详细执行**过程**。

生成的报告上，有很多一段一段灰色横条，**每个灰色横条就对应了一个任务**，灰色长条的长度对应了任务的执行时长。通常，渲染主线程上的任务都是比较复杂的，如果只单纯记录任务执行的时长，那么依然很难定位问题，因此，**还需要将任务执行过程中的一些关键的细节记录下来，这些细节就是任务的过程**，灰线下面的横条就是一个个过程，同样这些横条的长度就代表这些过程执行的时长。

直观地理解，你可以把**任务看成是一个 Task 函数，在执行 Task 函数的过程中，它会调用一系列的子函数，这些子函数就是我们所提到的过程**。

**分析页面加载过程：**

其实 Main 指标，在加载过程中无非是下面三个阶段：

- 导航阶段，该阶段主要是从网络进程接收 HTML 响应头和 HTML 响应体。
- 解析 HTML 数据阶段，该阶段主要是将接收到的 HTML 数据转换为 DOM 和 CSSOM。
- 生成可显示的位图阶段，该阶段主要是利用 DOM 和 CSSOM，经过计算布局、生成层树 (LayerTree)、生成绘制列表 (Paint)、完成合成等操作，生成最终的图片。

**导航阶段：**，当你点击了 Performance 上的重新录制按钮之后，浏览器进程会通知网络进程去请求对应的 URL 资源；一旦网络进程从服务器接收到 URL 的响应头，便立即判断该响应头中的 content-type 字段是否属于 text/html 类型；如果是，那么浏览器进程会让当前的页面执行退出前的清理操作，比如执行 JavaScript 中的 beforunload 事件，清理操作执行结束之后就准备显示新页面了，这包括了解析、布局、合成、显示等一系列操作。

点击重新加载按钮后，详细过程如下：

- 第一个子过程就是 Send request，该过程表示网络请求已被发送。然后该任务进入了等待状态。
- 接着由网络进程负责下载资源，当接收到响应头的时候，该任务便执行 Receive Respone 过程，该过程表示接收到 HTTP 的响应头了。
- 接着执行 DOM 事件：pagehide、visibilitychange 和 unload 等事件，如果你注册了这些事件的回调函数，那么这些回调函数会依次在该任务中被调用。
- 这些事件被处理完成之后，那么接下来就接收 HTML 数据了，这体现在了 Recive Data 过程，Recive Data 过程表示请求的数据已被接收，如果 HTML 数据过多，会存在多个 Receive Data 过程。
- 等到所有的数据都接收完成之后，渲染进程会触发另外一个任务，该任务主要执行 Finish load 过程，该过程表示网络请求已经完成。

**解析 HTML 数据阶段**，导航阶段结束之后，就进入到了解析 HTML 数据阶段了，这个阶段的主要任务就是通过解析 HTML 数据、解析 CSS 数据、执行 JavaScript 来生成 DOM 和 CSSOM。具体过程如下：

- 在 ParserHTML 的过程中，如果解析到了 script 标签，那么便进入了脚本执行过程，也就是 Evalute Script。
- 我们知道，要执行一段脚本我们需要首先编译该脚本，于是在 Evalute Script 过程中，先进入了脚本编译过程，也就是 Complie Script。脚本编译好之后，就进入程序执行过程，执行全局代码时，V8 会先构造一个 anonymous 过程，在执行 anonymous 过程中，会调用 setNewArea 过程，setNewArea 过程中又调用了 createElement，由于之后调用了 document.append 方法，该方法会触发 DOM 内容的修改，所以又强制执行了 ParserHTML 过程生成的新的 DOM。
- DOM 生成完成之后，会触发相关的 DOM 事件，比如典型的 DOMContentLoaded，还有 readyStateChanged。
- DOM 生成之后，ParserHTML 过程继续计算样式表，也就是 Reculate Style，这就是生成 CSSOM 的过程

**生成可显示位图阶段**,生成了 DOM 和 CSSOM 之后，就进入了第三个阶段：生成页面上的位图。通常这需要经历布局 (Layout)、分层、绘制、合成等一系列操作,同样详细过程如下：

- 在生成完了 DOM 和 CSSOM 之后，渲染主线程首先执行了一些 DOM 事件，诸如 readyStateChange、load、pageshow。具体地讲，如果你使用 JavaScript 监听了这些事件，那么这些监听的函数会被渲染主线程依次调用。
- 首先执行布局，这个过程即Layout。
- 然后更新层树 (LayerTree)，这个过程对应图中的 Update LayerTree。
- 有了层树之后，就需要为层树中的每一层准备绘制列表了，这个过程就称为 Paint。
- 准备每层的绘制列表之后，就需要利用绘制列表来生成相应图层的位图了，这个过程对应图中的 Composite Layers。

走到了 Composite Layers 这步，主线程的任务就完成了，接下来主线程会将合成的任务完全教给合成线程来执行，再来梳理下最终图像是怎么显示出来的：

- 首先主线程执行到 Composite Layers 过程之后，便会将绘制列表等信息提交给合成线程，合成线程的执行记录你可以通过 Compositor 指标来查看。
- 合成线程维护了一个 Raster 线程池，线程池中的每个线程称为 Rasterize，用来执行光栅化操作，对应的任务就是 Rasterize Paint。
- 当然光栅化操作并不是在 Rasterize 线程中直接执行的，而是在 GPU 进程中执行的，因此 Rasterize 线程需要和 GPU 线程保持通信。
- 然后 GPU 生成图像，最终这些图层会被提交给浏览器进程，浏览器进程将其合成并最终显示在页面上。

### 图解JavaScript 引擎V8

#### 如何学习谷歌高性能 JavaScript 引擎V8？

**V8 是 JavaScript 虚拟机的一种**。我们可以简单地把 JavaScript 虚拟机理解成是一个翻译程序，将人类能够理解的编程语言 JavaScript，翻译成机器能够理解的机器语言。

目前市面上**有很多种 JavaScript 引擎，诸如 SpiderMonkey、V8、JavaScriptCore 等**。而由谷歌开发的开源项目 V8 是当下使用最广泛的 JavaScript 虚拟机，全球有超过 25 亿台安卓设备，而这些设备中都使用了 Chrome 浏览器，所以我们写的 JavaScript 应用，大都跑在 V8 上。

**在 V8 出现之前，所有的 JavaScript 虚拟机所采用的都是解释执行的方式，这是 JavaScript 执行速度过慢的一个主要原因**。而 V8 率先引入了即时编译（JIT）的双轮驱动的设计，这是一种权衡策略，**混合编译执行和解释执行**这两种手段，给 JavaScript 的执行速度带来了极大的提升。

V8 出现之后，各大厂商也都在自己的 JavaScript 虚拟机中引入了 JIT 机制，所以你会看到目前市面上 JavaScript 虚拟机都有着类似的架构。另外，V8 也是早于其他虚拟机引入了惰性编译、内联缓存、隐藏类等机制，进一步优化了 JavaScript 代码的编译执行效率。

**有时项目的占用内存过高，或者页面响应速度过慢，又或者使用 Node.js 的时候导致任务被阻塞等问题**，都与 V8 的基本运行机制有关。如果你熟悉 V8 的工作机制，就会有系统性的思路来解决这些问题。

**V8 的主要功能，就是结合 JavaScript 语言的特性和本质来编译执行它。**

**如何学习V8：**

JavaScript **借鉴**了很多语言的特性，比如 **C 语言的基本语法、Java 的类型系统和内存管理、Scheme 的函数作为一等公民**，还有 Self 基于原型（prototype）的继承机制。毫无疑问，JavaScript 是一门非常优秀的语言，特别是“原型继承机制”和“函数是一等公民”这两个设计。

V8 是 JavaScript 的实现，在学习 V8 工作原理时，我们就要格外关注 JavaScript 这些独特的设计思想和特性背后的实现。比如，为了实现函数是一等公民的特性，JavaScript 采取了基于对象的策略；再比如为了实现原型继承，V8 为每个对象引入了 __proto__ 属性。

编译流水线本身并不复杂，但是其中涉及到了很多技术，诸如 JIT、延迟解析、隐藏类、内联缓存等等。这些技术决定着一段 JavaScript 代码能否正常执行，以及代码的执行效率。

比如 V8 中使用的隐藏类（Hide Class），这是将 JavaScript 中动态类型转换为静态类型的一种技术，可以消除动态类型的语言执行速度过慢的问题，如果你熟悉 V8 的工作机制，在你编写 JavaScript 时，就能充分利用好隐藏类这种强大的优化特性，写出更加高效的代码。

再比如，V8 实现了 JavaScript 代码的惰性解析，目的是为了加速代码的启动速度，通过对惰性解析机制的学习，你可以优化你的代码更加适应这个机制，从而提高程序性能。

要想充分了解 V8 是怎么工作的，除了要分析编译流水线，我们还需要了解另外两个非常重要的特性，那就是事件循环系统和垃圾回收机制。事件循环系统和 JavaScript 中的难点——异步编程特性紧密相关。我们知道，JavaScript 是单线程的，JavaScript 代码都是在一个线程上执行，如果同一时间发送了多个 JavaScript 执行的请求，就需要排队，也就是进行异步编程。

V8 的事件循环系统会调度这些排队任务，保证 JavaScript 代码被 V8 有序地执行。因此也可以说，事件循环系统就是 V8 的心脏，它驱动了 V8 的持续工作。

另外，JavaScript 是一种自动垃圾回收的语言，V8 在执行垃圾回收时，会占用主线程的资源，如果我们编写的程序频繁触发垃圾回收，那么无疑会阻塞主线程，这也是我们经常会遇到的一个问题。你需要知道 V8 是如何分配内存数据的，以及这些数据是如何被回收的，打通整个链路，建立完整的系统，当下次遇到内存问题时，就知道如何去排查了。

#### 01 | V8是如何执行一段JavaScript代码的？

**什么是 V8？**

首先从宏观层面看下v8，V8 是一个由 Google 开发的开源 JavaScript 引擎，目前用在 Chrome 浏览器和 Node.js 中，其核心功能是执行易于人类理解的 JavaScript 代码。

执行js的关键步骤：编译和执行，首先需要将 JavaScript 代码转换为低级中间代码或者机器能够理解的机器代码，然后再执行转换后的代码并输出执行结果。

你可以把 **V8 看成是一个虚构出来的计算机，也称为虚拟机**，虚拟机通过模拟实际计算机的各种功能来实现代码的执行，如模拟实际计算机的 CPU、堆栈、寄存器等，虚拟机还具有它自己的一套指令系统。（原来虚拟机是这样理解的啊）

所以对于 JavaScript 代码来说，V8 就是它的整个世界，当 V8 执行 JavaScript 代码时，你并不需要担心现实中不同操作系统的差异，也不需要担心不同体系结构计算机的差异，你只需要按照虚拟机的规范写好代码就可以了。

**高级代码为什么需要先编译再执行？**

我们先从 CPU 是怎么执行机器代码讲起，你可以把 CPU 看成是一个非常小的运算机器，我们可以通过二进制的指令和 CPU 进行沟通，比如我们给 CPU 发出“1000100111011000”的二进制指令，这条指令的意思是将一个寄存器中的数据移动到另外一个寄存器中，当处理器执行到这条指令的时候，便会按照指令的意思去实现相关的操作。

为了能够完成复杂的任务，工程师们为 CPU 提供了一大堆指令，来实现各种功能，我们就把这一大堆指令称为指令集（Instructions），也就是**机器语言**。

注意，CPU 只能识别二进制的指令，但是对程序员来说，二进制代码难以阅读和记忆，于是我们又将二进制指令集转换为人类可以识别和记忆的符号，这就是**汇编指令集**，你可以参考下面的代码：

```js
1000100111011000  机器指令
mov ax,bx         汇编指令
```
同样如果你使用汇编编写了一段程序，你还需要一个**汇编编译器**，其作用是将汇编代码编程成机器代码，因为CPU 并不能直接识别汇编语言

虽然汇编语言对机器语言做了**一层抽象**，减少了程序员理解机器语言的复杂度，但是汇编语言依然是复杂且繁琐的，即便你写一个非常简单的功能，也需要实现大量的汇编代码，这主要表现在以下两点。

- 首先，不同的 CPU 有着不同的指令集，如果要使用机器语言或者汇编语言来实现一个功能，那么你需要为每种架构的 CPU 编写特定的汇编代码，这会带来巨大的、枯燥繁琐的操作
- 其次，在编写汇编代码时，我们还需要了解和处理器架构相关的硬件知识，比如你需要使用寄存器、内存、操作 CPU 等。大部分程序员在编写应用的时候，只想专心处理业务逻辑，并不想要过多地理会这些处理器架构相关的细节。

因此我们需要一种**屏蔽了计算机架构细节**的语言，能适应多种不同 CPU 架构的语言，能专心处理业务逻辑的语言，诸如 C、C++、Java、C#、Python、JavaScript 等，这些“高级语言”就应运而生了。

和汇编语言一样，处理器也不能直接识别由高级语言所编写的代码，那怎么办呢？通常，要有两种方式（**解释执行和编译执行**）来执行这些代码。

- 第一种是解释执行，需要先将输入的源代码通过**解析器编译成中间代码**，之后直接使用**解释器解释执行中间代码**，然后直接输出结果
- 第二种是编译执行。采用这种方式时，也需要先将源代码转换为中间代码，然后我们的编译器再将中间代码编译成机器代码。通常编译成的**机器代码是以二进制文件形式存储的**，需要执行这段程序的时候直接执行二进制文件就可以了。还可以使用虚拟机将编译后的机器代码保存在内存中，然后直接执行内存中的二进制代码。 

但是针对不同的高级语言，这个实现方式还是有很大差异的，比如要执行 C 语言编写的代码，你需要将其编译为二进制代码的文件，然后再直接执行二进制代码。而**对于像 Java 语言、JavaScript 语言等，则需要不同虚拟机，模拟计算机的这个编译执行流程**。执行 Java 语言，需要经过 Java 虚拟机的转换，执行 JavaScript 需要经过 JavaScript 虚拟机的转换。

**V8 是怎么执行 JavaScript 代码的？**

那么，V8 作为 JavaScript 的虚拟机的一种，它到底是怎么执行 JavaScript 代码的呢？是解释执行，还是编译执行呢？

实际上，V8 并没有采用某种单一的技术，而是**混合编译执行和解释执行**这两种手段，我们把这种**混合使用编译器和解释器的技术称为 JIT（Just In Time）技术**。

- 解释执行的启动速度快，但是执行时的速度慢，
- 编译执行的启动速度慢，但是执行时的速度快。

V8 执行一段 JavaScript 代码所经历的主要流程了，这包括了：

1. 初始化基础环境（“堆空间”“栈空间”“全局执行上下文”“全局作用域”“消息循环系统”“内置函数”等）
2. 解析源码生成 AST 和作用域；
3. 依据 AST 和作用域生成字节码；
4. 解释执行字节码；
5. 监听热点代码；
6. 优化热点代码为二进制的机器代码；
7. 反优化生成的二进制机器代码。

这里你需要注意的是，JavaScript 是一门动态语言，在运行过程中，某些被优化的结构可能会被 V8 动态修改了，这会导致之前被优化的代码失效，如果某块优化之后的代码失效了，那么编译器需要执行反优化操作。

#### 02 | 函数即对象：一篇文章彻底搞懂JavaScript的函数特点

我们来看下**函数是一等公民**背后的含义。

如果你熟悉了一门其他流行语言，再来使用 JavaScript，那么 JavaScript 中的函数可能会给你造成一些误解，**比如在 JavaScript 中，你可以将一个函数赋值给一个变量，还可以将函数作为一个参数传递给另外一个函数，甚至可以使得一个函数返回另外一个函数**，这在一些主流语言中都很难实现。

JavaScript 中的函数非常灵活，其根本原因在于 JavaScript 中的函数就是一种特殊的对象，我们把 JavaScript 中的函数称为一等公民 (First Class Function)。

**基于函数是一等公民的设计，使得 JavaScript 非常容易实现一些特性，比如闭包，还有函数式编程等**，而其他语言要实现这些特性就显得比较困难，比如要在 C++ 中实现闭包需要实现大量复杂的代码，而且使用起来也异常复杂。

函数式编程（函数式编程关心数据的映射，命令式编程关心解决问题的步骤）和闭包在实际的项目中会经常遇到，如果不了解这些特性，那么在你使用第三方代码时就会非常吃力，同时自己也很难使用这些特性写出优雅的代码，因此我们很有必要了解这些特性的底层机制。

函数式编程参考：https://www.zhihu.com/question/28292740?sort=created

**什么是 JavaScript 中的对象？**

既然在 JavaScript 中，函数就是一种特殊的对象，那我们首先要明白，什么是 JavaScript 中的“对象”？

它和**面向对象语言中的“对象”有什么区别？和其他主流语言不一样的是，JavaScript 是一门基于对象 (Object-Based) 的语言**，可以说 JavaScript 中大部分的内容都是由对象构成的，诸如函数、数组，也可以说 JavaScript 是建立在对象之上的语言。

虽然 **JavaScript 是基于对象设计的，但是它却不是一门面向对象的语言** (Object-Oriented Programming Language)，因为**面向对象语言天生支持封装、继承、多态**，但是 JavaScript 并没有直接提供多态的支持，因此要在 JavaScript 中使用多态并不是一件容易的事。

除了对多态支持的不好，JavaScript 实现继承的方式和面向对象的语言实现继承的方式同样存在很大的差异。

面向对象语言是由语言本身对继承做了充分的支持，并提供了大量的关键字，如 public、protected、friend、interface 等，众多的关键字使得面向对象语言的继承变得异常繁琐和复杂，而 JavaScript 中实现继承的方式却非常简单清爽，**只是在对象中添加了一个称为原型的属性，把继承的对象通过原型链接起来，就实现了继承，我们把这种继承方式称为基于原型链继承**。

**函数的本质：**

在 JavaScript 中，**函数是一种特殊的对象，它和对象一样可以拥有属性和值，但是函数和普通对象不同的是，函数可以被调用**。

那么，V8 内部是怎么实现函数可调用特性的呢？

其实在 V8 内部，我们会为函数对象添加了两个隐藏属性：

也就是说，函数除了可以拥有常用类型的属性值之外，还拥有两个隐藏属性，分别是 name 属性和 code 属性。

隐藏 name 属性的值就是函数名称，如果某个函数没有设置函数名，如下面这段函数：

```js
(function (){
    var test = 1
    console.log(test)
})()
```

该函数对象的默认的 name 属性值就是 anonymous，表示该函数对象没有被设置名称。另外一个隐藏属性是 code 属性，其值表示函数代码，以字符串的形式存储在内存中。当执行到一个函数调用语句时，V8 便会从函数对象中取出 code 属性值，也就是函数代码，然后再解释执行这段函数代码。

**函数是一等公民:**

因为函数是一种特殊的对象，所以在 JavaScript 中，函数可以赋值给一个变量，也可以作为函数的参数，还可以作为函数的返回值。**如果某个编程语言的函数可以和它的数据类型做一样的事情，我们就把这个语言中的函数称为一等公民**。支持函数是一等公民的语言可以使得代码逻辑更加清晰，代码更加简洁。

但是由于函数的“可被调用”的特性，使得实现函数的可赋值、可传参和可作为返回值等特性变得有一点麻烦。为什么？

我们知道，在执行 JavaScript 函数的过程中，为了实现变量的查找，V8 会为其维护一个作用域链，如果函数中使用了某个变量，但是在函数内部又没有定义该变量，那么函数就会沿着作用域链去外部的作用域中查找该变量。（其实就是为了实现可调用，V8需要额外做很多工作）

另外基于函数是一等公民，我们可以轻松使用 **JavaScript 来实现目前比较流行的函数式编程，函数式编程规则很少，非常优美**。

#### 03｜快属性和慢属性：V8采用了哪些策略提升了对象属性的访问速度？

JavaScript 语言的角度来看，JavaScript 对象像一个字典，字符串作为键名，任意对象可以作为键值，可以通过键名读写键值。

然而在 V8 实现对象存储时，并没有完全采用字典的存储方式，这主要是出于性能的考量。因为**字典是非线性的数据结构，查询效率会低于线性的数据结构**，V8 为了提升存储和查找效率，采用了一套复杂的存储策略。

**常规属性 (properties) 和排序属性 (element)：**

```js
function Foo() {
    this[100] = 'test-100'
    this[1] = 'test-1'
    this["B"] = 'bar-B'
    this[50] = 'test-50'
    this[9] =  'test-9'
    this[8] = 'test-8'
    this[3] = 'test-3'
    this[5] = 'test-5'
    this["A"] = 'bar-A'
    this["C"] = 'bar-C'
}
var bar = new Foo()


for(key in bar){
    console.log(`index:${key}  value:${bar[key]}`)
}

// 输出结果：
index:1  value:test-1
index:3  value:test-3
index:5  value:test-5
index:8  value:test-8
index:9  value:test-9
index:50  value:test-50
index:100  value:test-100
index:B  value:bar-B
index:A  value:bar-A
index:C  value:bar-C
```

观察打印出来的顺序：

- 设置的数字属性被最先打印出来了，并且按照数字大小的顺序打印的；
- 设置的字符串属性依然是按照之前的设置顺序打印的，比如我们是按照 B、A、C 的顺序设置的，打印出来依然是这个顺序。

之所以出现这样的结果，是因为在 ECMAScript 规范中定义了**数字属性应该按照索引值大小升序排列，字符串属性根据创建时的顺序升序排列**。**在这里我们把对象中的数字属性称为排序属性，在 V8 中被称为 elements，字符串属性就被称为常规属性，在 V8 中被称为 properties。**

在 V8 内部，为了有效地提升存储和访问这两种属性的性能，分别使用了两个线性数据结构来分别保存排序属性和常规属性。分解成这两种线性数据结构之后，如果执行索引操作，那么 V8 会先从 elements 属性中按照顺序读取所有的元素，然后再在 properties 属性中读取所有的元素，这样就完成一次索引操作。

**快属性和慢属性：**

将不同的属性分别保存到 elements 属性和 properties 属性中，无疑简化了程序的复杂度，但是在查找元素时，却多了一步操作，比如执行 bar.B这个语句来查找 B 的属性值，那么在 V8 会先查找出 properties 属性所指向的对象 properties，然后再在 properties 对象中查找 B 属性，这种方式在查找过程中增加了一步操作，因此会影响到元素的查找效率。

基于这个原因，V8 采取了一个权衡的策略以加快查找属性的效率，这个策略是将部分常规属性直接存储到对象本身，我们把这称为对象内属性 (in-object properties)。

采用对象内属性之后，常规属性就被保存到 bar 对象本身了，这样当再次使用bar.B来查找 B 的属性值时，V8 就可以直接从 bar 对象本身去获取该值就可以了，这种方式减少查找属性值的步骤，增加了查找效率。

不过对象内属性的数量是固定的，默认是 10 个，如果添加的属性超出了对象分配的空间，则它们将被保存在常规属性存储中。虽然属性存储多了一层间接层，但可以自由地扩容。

通常，我们将**保存在线性数据结构中的属性称之为“快属性”，因为线性数据结构中只需要通过索引即可以访问到属性，虽然访问线性结构的速度快，但是如果从线性结构中添加或者删除大量的属性时，则执行效率会非常低，这主要因为会产生大量时间和内存开销**。因此，如果一个对象的属性过多时，V8 为就会采取另外一种存储策略，那就是“慢属性”策略，但慢属性的对象内部会有独立的非线性数据结构 (词典) 作为属性存储容器。所有的属性元信息不再是线性存储的，而是直接保存在属性字典中。

**实践：在 Chrome 中查看对象布局**

可以通过控制台来验证，上面说的快速性和慢属性的的存储情况。

打开 Chrome 开发者工具，先选择控制台标签，然后在控制台中执行以下代码查看内存快照：

```js
function Foo(property_num,element_num) {
  //添加可索引属性
  for (let i = 0; i < element_num; i++) {
      this[i] = `element${i}`
  }
  //添加常规属性
  for (let i = 0; i < property_num; i++) {
      let ppt = `property${i}`
      this[ppt] = ppt
  }
}
var bar = new Foo(10,10)
```

创建了函数对象，接下来我们就来看看构造函数和对象在内存中的状态。你可以将 Chrome 开发者工具切换到 Memory 标签，然后点击左侧的小圆圈就可以捕获当前的内存快照就会自动生成。当前内存快照的界面，要想查找我们刚才创建的对象，你可以在搜索框里面输入构造函数 Foo，Chrome 会列出所有经过构造函数 Foo 创建的对象，点开 Foo 的那个下拉列表，第一个就是刚才创建的 bar 对象，我们可以看到 bar 对象有一个 elements 属性，这里面就包含我们创造的所有的排序属性，那么**怎么没有常规属性对象呢**？

这是因为只创建了 10 个常规属性，所以 V8 将这些常规属性直接做成了 bar 对象的对象内属性。

所以这时候的数据内存布局是这样的：

- 10 个常规属性作为对象内属性，存放在 bar 函数内部；
- 10 个排序属性存放在 elements 中。

接下来我们可以将创建的对象属性的个数调整到 20 个，你可以在控制台执行下面这段代码：

```js
var bar2 = new Foo(20,10)
```

此时再次生成内存快照查看，会发现由于创建的常用属性超过了 10 个，所以另外 10 个常用属性就被保存到 properties 中了，注意因为 properties 中只有 10 个属性，所以依然是线性的数据结构，我们可以看其都是按照创建时的顺序来排列的。

所以这时候属性的内存布局是这样的：

- 10 属性直接存放在 bar2 的对象内 ;
- 10 个常规属性以线性数据结构的方式存放在 properties 属性里面 ;
- 10 个数字属性存放在 elements 属性里面。

如果常用属性太多了，比如创建了 100 个，那么我们再来看看其内存分布，你可以执行下面这段代码：

```js
var bar3 = new Foo(100,10)
```

再次生成快照查看，我们可以看到，这时候的 properties 属性里面的数据并不是线性存储的，而是以非线性的字典形式存储的(其实就是顺序乱了)，所以这时候属性的内存布局是这样的：

- 10 属性直接存放在 bar3 的对象内 ;
- 90 个常规属性以非线性字典的这种数据结构方式存放在 properties 属性里面 ;
- 10 个数字属性存放在 elements 属性里面。

除了 elements 和 properties 属性，V8 还为每个对象实现了 map 属性和 __proto__ 属性。__proto__ 属性就是原型，是用来实现 JavaScript 继承的；而 map 则是隐藏类。

通过引入这两个属性，加速了 V8 查找属性的速度，为了更加进一步提升查找效率，V8 还实现了内置内属性的策略，当常规属性少于一定数量时，V8 就会将这些常规属性直接写进对象中，这样又节省了一个中间步骤。

但是如果对象中的属性过多时，或者存在反复添加或者删除属性的操作，那么 V8 就会将线性的存储模式降级为非线性的字典存储模式，这样虽然降低了查找速度，但是却提升了修改对象的属性的速度。

我们不建议使用 delete 来删除属性，你能结合文中介绍的快属性和慢属性，给出不建议使用 delete 的原因吗？

#### 04 | 函数表达式：涉及大量概念，函数表达式到底该怎么学？

函数表达式涉及到了很多底层概念，比如表达式、语句、函数即对象（在 JavaScript 中）等，而且函数表达式和函数声明看起来类似，都是定义一个函数，然后再调用该函数，很容易把二者搞混淆了。

实际上，函数表达式和函数声明有着本质上的差异。理解了这种差异，你对函数表达式的理解也就加深了。

**函数声明与函数表达式的差异**

```js
// 下面是表达式，因为执行这段代码，它会返回一个值
x = 5
// 返回false
6 === 5

// 语句则不同了，比如你定义了一个变量
// 这就是一个语句，执行该语句时，V8 并不会返回任何值给你。
var x
```

**V8 是怎么处理函数声明的？**

函数声明定义了一个具有指定参数的函数，其声明语法如下所示：

```js
function name([param,[, param,[..., param]]]) {
  [statements]
}
```

又是如何处理函数声明的呢？

```js
var x = 5
function foo(){
    console.log('Foo')
}
```

编译阶段，如果解析到函数声明，那么 V8 会将这个函数声明转换为内存中的函数对象，并将其放到作用域中。同样，如果解析到了某个变量声明，也会将其放到作用域中，但是会将其值设置为 undefined，表示该变量还未被使用。然后在 V8 执行阶段，如果使用了某个变量，或者调用了某个函数，那么 V8 便会去作用域查找相关内容。

因为在执行之前，这些变量都被提升到作用域中了，所以在执行阶段，V8 当然就能获取到所有的定义变量了。我们把这种在**编译阶段，将所有的变量提升到作用域的过程称为变量提升**

了解了变量提升，我们就能解释，**为什么可以在函数声明之前调用该函数了，这是因为声明的函数在编译阶段就被提升到作用域中，在执行阶段，只要是在作用域中存在的变量或者对象，都是可以使用的**。

我们知道，在 V8 执行`var x = 5`这段代码时，会认为它是两段代码，一段是定义变量的语句，一段是赋值的表达式，如下所示：

```js
var x = undefined
x = 5
```

首先，**在变量提升阶段，V8 并不会执行赋值的表达式，该阶段只会分析基础的语句**，比如变量的定义，函数的声明。而这两行代码是在不同的阶段完成的，var x 是在编译阶段完成的，也可以说是在变量提升阶段完成的，而**x = 5是表达式，所有的表达式都是在执行阶段完成的**。

在变量提升阶段，V8 将这些变量存放在作用域时，还会给它们赋一个默认的 undefined 值，所以在定义一个普通的变量之前，使用该变量，那么该变量的值就是 undefined。

现在我们知道，**表达式是不会在编译阶段执行的，那么函数声明是表达式还是语句呢**？

```js
function foo(){
    console.log('Foo')
}
```

执行上面这段代码，它并没有输出任何内容，所以可以肯定，**函数声明并不是一个表达式，而是一个语句**。V8 在变量提升阶段，如果遇到函数声明，那么 V8 同样会对该函数声明执行变量提升操作。

函数也是一个对象，所以在编译阶段，V8 就会将整个函数对象提升到作用域中，并不是给该函数名称赋一个 undefined，理解这一点尤为重要。

总的来说，在 V8 解析 JavaScript 源码的过程中，如果遇到普通的变量声明，那么便会将其提升到作用域中，并给该变量赋值为 undefined，如果遇到的是函数声明，那么 V8 会在内存中为声明生成函数对象，并将该对象提升到作用域中。

函数表达式与函数声明的最主要区别有以下三点：

- 函数表达式是在表达式语句中使用 function 的，最典型的表达式是“a=b”这种形式，因为函数也是一个对象，我们把“a = function (){}”这种方式称为函数表达式；
- 在函数表达式中，可以省略函数名称，从而创建匿名函数（anonymous functions）；
- 一个函数表达式可以被用作一个即时调用的函数表达式——IIFE（Immediately Invoked Function Expression）。

**立即调用的函数表达式（IIFE）**

现在我们知道了，在编译阶段，V8 并不会处理函数表达式，而** JavaScript 中的立即函数调用表达式正是使用了这个特性来实现了非常广泛的应用**，下面我们就来一起看看立即函数调用表达式。

```js
// 括号里面是一个表达式，整个语句也是一个表达式，最终输出 3。
(a=3)

// 如果在小括号里面放上一段函数的定义，如下所示：
// 因为小括号之间存放的必须是表达式，所以如果在小阔号里面定义一个函数，
// 那么 V8 就会把这个函数看成是函数表达式，执行时它会返回一个函数对象。
(function () {
    //statements
})

// 存放在括号里面的函数便是一个函数表达式，它会返回一个函数对象，
// 如果我直接在表达式后面加上调用的括号，这就称立即调用函数表达式（IIFE），比如下面代码：
(function () {
    //statements
})()
```

因为**函数立即表达式也是一个表达式，所以 V8 在编译阶段，并不会为该表达式创建函数对象。这样的一个好处就是不会污染环境，函数和函数内部的变量都不会被其他部分的代码访问到**。

另外，因为函数立即表达式是立即执行的，所以**将一个函数立即表达式赋给一个变量时，不是存储 IIFE 本身，而是存储 IIFE 执行后返回的结果**。如下所示：

```js
var a = (function () {
    return 1
})()
```

```js
var n = 1;
(function foo(){
  n = 100;
  console.log(n);
}())
console.log(n);
// 打印两个100
```

#### 05｜原型链: V8是如何实现对象继承的？

简单地理解，继承就是一个对象可以访问另外一个对象中的属性和方法。比如我有一个 B 对象，该对象继承了 A 对象，那么 B 对象便可以直接访问 A 对象中的属性和方法。

不同的语言实现继承的方式是不同的，其中最典型的两种方式是**基于类的设计和基于原型继承的设计**。

**C++、Java、C# 这些语言都是基于经典的类继承的设计模式**，这种模式最大的特点就是提供了非常复杂的规则，并提供了非常多的关键字，诸如 class、friend、protected、private、interface 等，通过组合使用这些关键字，就可以实现继承。

JavaScript 的继承方式和其他面向对象的继承方式有着很大差别，**JavaScript 本身不提供一个 class 实现。虽然标准委员会在 ES2015/ES6 中引入了 class 关键字，但那只是语法糖，JavaScript 的继承依然和基于类的继承没有一点关系**。所以当你看到 JavaScript 出现了 class 关键字时，不要以为 JavaScript 也是面向对象语言了。

JavaScript **仅仅在对象中引入了一个原型的属性，就实现了语言的继承机制**，基于原型的继承省去了很多基于类继承时的繁文缛节，简洁而优美。

**原型继承是如何实现的？**

假如一个对象 C，它包含了一个属性“type”，那么对象 C 是可以直接访问它自己的属性 type 的，这点毫无疑问。

怎样让 C 对象像访问自己的属性一样，访问 B 对象呢？

我们从 V8 的内存快照看到，JavaScript 的**每个对象都包含了一个隐藏属性** __proto__ ，我们就把该隐藏属性 __proto__ 称之为该对象的原型 (prototype)，__proto__ 指向了内存中的另外一个对象，我们就把 __proto__ **指向的对象称为该对象的原型对象**，那么该对象就可以直接访问其原型对象的方法或者属性。

当 C 对象将它的 __proto__ 属性指向了 B 对象后，那么通过对象 C 来访问对象 B 中的 name 属性时，V8 会先从对象 C 中查找，但是并没有查找到，接下来 V8 继续在其原型对象 B 中查找，因为对象 B 中包含了 name 属性，那么 V8 就直接返回对象 B 中的 name 属性值，虽然 C 和 B 是两个不同的对象，但是使用的时候，B 的属性看上就像是 C 的属性一样。我们把这个查找属性的路径称为原型链

我们再来回顾下继承的概念：**继承就是一个对象可以访问另外一个对象中的属性和方法，在JavaScript 中，我们通过原型和原型链的方式来实现了继承特性**。

通过上面的分析，你可以看到在 JavaScript 中的继承非常简洁，就是**每个对象都有一个原型属性，该属性指向了原型对象，查找属性的时候，JavaScript 虚拟机会沿着原型一层一层向上查找，直至找到正确的属性**

**注意**：
- 对象的原型和原型对象不同
- 不要将原型链接和作用域链搞混淆了，作用域链是沿着函数的作用域一级一级来查找变量的，而原型链是沿着对象的原型一级一级来查找属性的，虽然它们的实现方式是类似的，但是它们的用途是不同的，
- 不应该直接通过 _proto_ 来访问或者修改该属性，因为并非标准，另外就是使用该属性会造成严重的性能问题

**构造函数是怎么创建对象的？**

```js
// 构造函数
function DogFactory(type,color){
  this.type = type
  this.color = color
}
// 结合关键字“new”就可以创建对象了
var dog = new DogFactory('Dog','Black')
```

其实当 V8 执行上面这段代码时，V8 会在背后悄悄地做了以下几件事情，模拟代码如下所示：

```js
var dog = {}  
dog.__proto__ = DogFactory.prototype
DogFactory.call(dog,'Dog','Black')
```

**构造函数怎么实现继承？**

```js
function DogFactory(type,color){
  this.type = type
  this.color = color
  //Mammalia
  //恒温
  this.constant_temperature = 1
}
var dog1 = new DogFactory('Dog','Black')
var dog2 = new DogFactory('Dog','Black')
var dog3 = new DogFactory('Dog','Black')
```

我利用上面这段代码创建了三个 dog 对象，每个对象都占用了一块空间，但是对象 dog1 到 dog3 中的 constant_temperature 属性都占用了一块空间，但是这是一个通用的属性，表示所有的 dog 对象都是恒温动物，所以没有必要在每个对象中都为该属性分配一块空间，我们可以将该属性设置公用的。

怎么设置呢？

我们介绍函数时提到关于函数有两个隐藏属性吗？这**两个隐藏属性就是 name 和 code，其实函数还有另外一个隐藏属性，那就是 prototype**。

**每个函数对象中都有一个公开的 prototype 属性，当你将这个函数作为构造函数来创建一个新的对象时，新创建对象的原型对象就指向了该函数的 prototype 属性**。当然了，如果你只是正常调用该函数，那么 prototype 属性将不起作用。

因此，我们可以将 constant_temperature 属性添加到 DogFactory 的 prototype 属性上

```js
function DogFactory(type,color){
  this.type = type
  this.color = color
  //Mammalia
}
DogFactory.prototype.constant_temperature = 1
var dog1 = new DogFactory('Dog','Black')
var dog2 = new DogFactory('Dog','Black')
var dog3 = new DogFactory('Dog','Black')
```

这样我们三个 dog 对象的原型对象都指向了 prototype，而 prototype 又包含了 constant_temperature 属性，这就是我们实现继承的正确方式。

**一段关于 new 的历史:**

JavaScript 是 Brendan Eich 发明的，那是个“战乱”的时代，各种大公司相互争霸，有 Sun、微软、网景、甲骨文等公司，它们都有推出自己的语言，其中最如日中天的编程语言是 Sun 的 Java，而 JavaScript 就是这个时候诞生的。当时创造 JavaScript 的目的仅仅是为了让浏览器页面可以动起来，所以尽可能采用简化的方式来设计 JavaScript，所以本质上来说，Java 和 JavaScript 的关系就像雷锋和雷峰塔的关系。

那么之所以叫 JavaScript 是出于市场原因考量的，因为一门新的语言需要吸引新的开发者，而当时最大的开发者群体就是 Java，于是 JavaScript 就蹭了 Java 的热度，事后，这一招被证明的确有效果。

虽然叫 JavaScript，但是其编程方式和 Java 比起来，依然存在着非常大的差异，其中 Java 中使用最频繁的代码就是创建一个对象，如下所示：

```js
CreateInstance instance = new CreateInstance();
```

当时 JavaScript 并没有使用这种方式来创建对象，因为 JavaScript 中的对象和 Java 中的对象是完全不一样的，因此，完全没有必要使用关键字 new 来创建一个新对象的，但是为了进一步吸引 Java 程序员，依然需要在语法层面去蹭 Java 热点，所以 JavaScript 中就被硬生生地强制加入了非常不协调的关键字 new，然后使用 new 来创造对象就变成这样了.

Java 程序员看到这段代码时，当然会感到倍感亲切，觉得 Java 和 JavaScript 非常相似，那么使用 JavaScript 也就天经地义了。不过代码形式只是表象，其背后原理是完全不同的。了解了这段历史之后，我们知道 JavaScript 的 new 关键字设计并不合理，但是站在市场角度来说，它的出现又是非常成功的，成功地推广了 JavaScript。

思考：
我们知道函数也是一个对象，所以函数也有自己的 __proto__ 属性，那么今天留给你的思考题是：DogFactory 是一个函数，那么“DogFactory.prototype”和“DogFactory._proto_”这两个属性之间有关联吗？

DogFactory 是 Function 构造函数的一个实例，所以 DogFactory.__proto__ === Function.prototype
DogFactory.prototype 是调用 Object 构造函数的一个实例，所以 DogFactory.prototype.__proto__ === Object.prototype
因此 DogFactory._proto_ 和 DogFactory.prototype 没有直接关系

#### 06｜作用域链：V8是如何查找变量的？

JavaScript **的继承是基于原型链的，原型链将一个个原型对象串起来，从而实现对象属性的查找，今天我们要聊一个和原型链类似的话题，那就是作用域链**。

**作用域链就是将一个个作用域串起来，实现变量查找的路径。讨论作用域链，实际就是在讨论按照什么路径查找变量的问题**。

词法作用域是根据函数在代码中的位置来确定的，作用域是在声明函数时就确定好的了，所以我们也将词法作用域称为静态作用域。和静态作用域相对的是动态作用域，动态作用域并不关心函数和作用域是如何声明以及在何处声明的，只关心它们从何处调用。换句话说，作用域链是基于调用栈的，而不是基于函数定义的位置的。

#### 07｜类型转换：V8是怎么实现1+“2”的？

在js中，`1 + '2' 会得到 '12'`，这是如何发生的呢？而在python中，这样会直接报错。。。

**对机器语言来说，所有的数据都是一堆二进制代码，CPU 处理这些数据的时候，并没有类型的概念，CPU 所做的仅仅是移动数据，比如对其进行移位，相加或相乘。**

**而在高级语言中，我们都会为操作的数据赋予指定的类型，类型可以确认一个值或者一组值具有特定的意义和目的。所以，类型是高级语言中的概念。**

但在js或python中，直接定义变量并不需要声明类型，因为虚拟机会根据数据自动推导出类型，每种语言都定义了自己的类型，还定义了如何操作这些类型，另外还定义了这些类型应该如何相互作用，我们就把这称为类型系统。

直观地理解，一门语言的类型系统定义了各种类型之间应该如何相互操作，比如，两种不同类型相加应该如何处理，两种相同的类型相加又应该如何处理等。还规定了各种不同类型应该如何相互转换，比如字符串类型如何转换为数字类型。

一个语言的类型系统越强大，那编译器能帮程序员检查的东西就越多，程序员定义“检查规则”的方式就越灵活。

**V8 是怎么执行加法操作的？**

当两个数相加时，V8 会严格根据 ECMAScript 规范来执行操作。**ECMAScript 是一个语言标准，JavaScript 就是 ECMAScript 的一个实现**。

通俗地理解，V8 会提供了一个 `ToPrimitve` 方法，其作用是将 a 和 b 转换为原生数据类型，其转换流程如下：

1. 先检测该对象中是否存在 valueOf 方法，如果有并返回了原始类型，那么就使用该值进行强制类型转换；
2. 如果 valueOf 没有返回原始类型，那么就使用 toString 方法的返回值；
3. 如果 vauleOf 和 toString 两个方法都不返回基本类型值，便会触发一个 TypeError 的错误。

```js
var Obj = {
  toString() {
    return new Object()
  },
  valueOf() {
    return new Object()
  }
}
Obj+3 // Cannot convert object to primitive value
```

因为 ToPrimitve 会先调用 valueOf 方法，发现返回的是一个对象，并不是原生类型，当 ToPrimitve 继续调用 toString 方法时，发现 toString 返回的也是一个对象，都是对象，就无法执行相加运算了，这时候虚拟机就会抛出一个异常`VM621:9 Uncaught TypeError: Cannot convert object to primitive value`，提示的是类型错误，错误原因是无法将对象类型转换为原生类型。

总结：在执行加法操作的时候，V8 会通过 ToPrimitve 方法将对象类型转换为原生类型，最后就是两个原生类型相加

- 如果其中一个值的类型是字符串时，则另一个值也需要强制转换为字符串，然后做字符串的连接运算。
- 在其他情况时，所有的值都会转换为数字类型值，然后做数字的相加。

#### 08｜答疑：如何构建和使用V8的调试工具d8？

此篇待实践整理

#### 09 | 运行时环境：运行JavaScript代码的基石

我们理解了 JavaScript 是一门基于对象的语言，它能实现非常多的特性，诸如函数是一等公民、闭包、函数式编程、原型继承等，搞懂了这些特性，我们就可以来打开 V8 这个黑盒，深入了解它的编译流水线了。

我们知道，当你想执行一段 JavaScript 代码时，只需要将代码丢给 V8 虚拟机，V8 便会执行并返回给你结果。

其实在执行 JavaScript 代码之前，V8 就**已经准备好了代码的运行时环境，这个环境包括了堆空间和栈空间、全局执行上下文、全局作用域、内置的内建函数、宿主环境提供的扩展函数和对象，还有消息循环系统**。准备好运行时环境之后，V8 才可以执行 JavaScript 代码，这包括解析源码、生成字节码、解释执行或者编译执行这一系列操作。

对**运行时环境有足够的了解，能够帮助我们更好地理 V8 的执行流程**。比如事件循环系统可以让你清楚各种回调函数是怎么被执行的，栈空间可以让你了解函数是怎么被调用的，堆空间和栈空间让你了解为什么要有传值和传引用，等等。

**什么是宿主环境？**

可以把 V8 和浏览器的渲染进程的关系看成病毒和细胞的关系，浏览器为 V8 提供基础的消息循环系统、全局变量、Web API，而 V8 的核心是实现了 ECMAScript 标准，这相当于病毒自己的 DNA 或者 RNA，V8 只提供了 ECMAScript 定义的一些对象和一些核心的函数，这包括了 Object、Function、String。除此之外，V8 还提供了垃圾回收器、协程等基础内容，不过这些功能依然需要宿主环境的配合才能完整执行。

如果 V8 使用不当，比如不规范的代码触发了频繁的垃圾回收，或者某个函数执行时间过久，这些都会占用宿主环境的主线程，从而影响到程序的执行效率，甚至导致宿主环境的卡死。

其实，**除了浏览器可以作为 V8 的宿主环境，Node.js 也是 V8 的另外一种宿主环境**，它提供了不同的宿主对象和宿主的 API，但是整个流程依然是相同的，比如 Node.js 也会提供一套消息循环系统，也会提供一个运行时的主线程。

我们知道了，要执行 V8，则需要有一个宿主环境，**宿主环境可以是浏览器中的渲染进程，可以是 Node.js 进程, 也可以是其他的定制开发的环境，而这些宿主则提供了很多 V8 执行 JavaScript 时所需的基础功能部件**。

**基础部件之构造数据存储空间：堆空间和栈空间？**

由于 V8 是寄生在浏览器或者 Node.js 这些宿主中的，因此，**V8 也是被这些宿主启动的。比如，在 Chrome 中，只要打开一个渲染进程，渲染进程便会初始化 V8，同时初始化堆空间和栈空间**。

栈空间主要是用来**管理 JavaScript 函数调用的，栈是内存中连续的一块空间，同时栈结构是“先进后出”的策略**。在函数调用过程中，涉及到上下文相关的内容都会存放在栈上，比如原生类型、引用到的对象的地址、函数的执行状态、this 值等都会存在在栈上。当一个函数执行结束，那么该函数的执行上下文便会被销毁掉。

栈空间的最大的特点是**空间连续，所以在栈中每个元素的地址都是固定的，因此栈空间的查找效率非常高，但是通常在内存中，很难分配到一块很大的连续空间**，因此，V8 对栈空间的大小做了限制，如果函数调用层过深，那么 V8 就有可能抛出栈溢出的错误。你可以在控制台执行下面这样一段代码：

```js
function factorial(n){
  if(n === 1) {return 1;}
    return n*factorial(n-1);
}
console.log(factorial(50000))
// VM68:1 Uncaught RangeError: Maximum call stack size exceeded
```

如果**有一些占用内存比较大的数据，或者不需要存储在连续空间中的数据**，使用栈空间就显得不是太合适了，所以 V8 又使用了堆空间。

堆空间是一种**树形的存储结构，用来存储对象类型的离散的数据**，宿主在启动 V8 的过程中，会同时创建堆空间和栈空间，再继续往下执行，产生的新数据都会存放在这两个空间中。

**基础部件之全局执行上下文和全局作用域？**

V8 初始化了基础的存储空间之后，接下来就需要初始化全局执行上下文和全局作用域了，这两个内容是 V8 执行后续流程的基础。

当 V8 开始执行一段可执行代码时，会生成一个执行上下文。V8 用执行上下文来维护执行当前代码所需要的变量声明、this 指向等。

执行上下文中主要包含了三部分，变量环境、词法环境、和 this 关键字。比如在浏览器的环境中，全局执行上下文中就包括了 window 对象，还有默认指向 window 的 this 关键字，另外还有一些 Web API 函数，诸如 setTimeout、XMLHttpRequest 等内容。

而词法环境中，则包含了使用 let、const 等变量的内容。

全局执行上下文在 V8 的生存周期内是不会被销毁的，它会一直保存在堆中，这样当下次在需要使用函数或者全局变量时，就不需要重新创建了。另外，当你执行了一段全局代码时，如果全局代码中有声明的函数或者定义的变量，那么函数对象和声明的变量都会被添加到全局执行上下文中。比如下面这段代码：

```js
var x = 1
function show_x(){
    console.log(x)
}
```

V8 在执行这段代码的过程中，会在全局执行上下文中添加变量 x 和函数 show_x。

在这里还有一点需要注意下，**全局作用域和全局执行上下文的关系，其实你可以把作用域看成是一个抽象的概念，比如在 ES6 中，同一个全局执行上下文中，都能存在多个作用域**。

**基础部件之构造事件循环系统？**

有了堆空间和栈空间，生成了全局执行上下文和全局作用域，接下来就可以执行 JavaScript 代码了吗？

答案是不行，因为 **V8 还需要有一个主线程，用来执行 JavaScript 和执行垃圾回收等工作。V8 是寄生在宿主环境中的，它并没有自己的主线程，而是使用宿主所提供的主线程，V8 所执行的代码都是在宿主的主线程上执行的**。

只有一个主线程依然不行，因为如果你开启一个线程，在该线程执行一段代码，那么当该线程执行完这段代码之后，就会自动退出了，执行过程中的一些栈上的数据也随之被销毁，下次再执行另外一个段代码时，你还需要重新启动一个线程，重新初始化栈数据，这会严重影响到程序执行时的性能。

为了在执行完代码之后，让线程继续运行，通常的做法是在代码中添加一个循环语句，在循环语句中监听下个事件，比如你要执行另外一个语句，那么激活该循环就可以执行了。比如下面的模拟代码：

```js
while(1){
  Task task = GetNewTask()；
  RunTask(task)；
}
```

总结:

因为 V8 并不是一个完整的系统，所以在执行时，它的一部分基础环境是由宿主提供的，这包括了全局执行上下文、事件循环系统，堆空间和栈空间。除了需要宿主提供的一些基础环境之外，V8 自身会提供 JavaScript 的核心功能和垃圾回收系统。

宿主环境在启动过程中，会构造堆空间，用来存放一些对象数据，还会构造栈空间，用来存放原生数据。由于堆空间中的数据不是线性存储的，所以堆空间可以存放很多数据，**但是读取的速度会比较慢，而栈空间是连续的，所以堆空间中的查找速度非常快，但是要在内存中找到一块连续的区域却显得有点难度，于是所有的程序都限制栈空间的大小，这就是我们经常容易出现栈溢出的一个主要原因。**

如果在浏览器中，JavaScript 代码会频繁操作 window(this 默认指向 window 对象)、操作 dom 等内容，如果在 node 中，JavaScript 会频繁使用 global(this 默认指向 global 对象)、File API 等内容，这些内容都会在启动过程中准备好，我们把这些内容称之为全局执行上下文。

全局执行上下文中和函数的执行上下文生命周期是不同的，函数执行上下文在函数执行结束之后，就会被销毁，而全局执行上下文则和 V8 的生命周期是一致的，所以在实际项目中，如果不经常使用的变量或者数据，最好不要放到全局执行上下文中。

另外，宿主环境还需要构造事件循环系统，事件循环系统主要用来处理任务的排队和任务的调度。

问：宿主环境和V8的关系 里面堆栈空间是属于 宿主环境的，但是我看很多文章写的都是 堆栈是属于 v8 引擎提供的？
答：因为是一个进程内部的，所以宿主和v8共同一套内存空间，通常在启动V8的过程中，宿主会创建好堆和栈的空间，在V8中叫isolate，然后V8利用创建好的堆和栈！所以不用纠结谁创建的，因为他们使用的是一套内存

#### 10 | 机器代码：二进制机器码究竟是如何被CPU执行的？

首先，在程序执行之前，我们的程序需要被装进内存，比如在 Windows 下面，你可以通过鼠标点击一个可执行文件，当你点击该文件的时候，系统中的程序加载器会将该文件加载到内存中。

那么到底什么是内存呢？

你可以把内存看成是一个快递柜，比如当你需要寄件的时候，你可以打开快递柜中的第 100 号单元格，并存放你的物品，有时候你会收到快递，提示你在快递柜的 105 号单元格中，你就可以打开 105 号单元格取出的你的快递。

这里有三个重要的内容，分别是快递柜、快递柜中的每个单元格的编号、操作快递柜的人，你可以把它们对比成点算机中的内存、内存地址和 CPU。

另外，内存还是一个临时存储数据的设备，之所以是临时的存储器，是因为断电之后，内存中的数据都会消失。

总结：

我们从如何执行一段 C 代码讲起，由于 CPU 只能执行机器代码，所以我们需要将 C 代码转换为机器代码，这个转换过程就是由 C 编译器完成的。

CPU 执行机器代码的逻辑非常简单，首先编译之后的二进制代码被加载进内存，然后 CPU 就按照指令的顺序，一行一行地执行。

在执行指令的过程中，CPU 需要对数据执行读写操作，如果直接读写内存，那么会严重影响程序的执行性能，因此 CPU 就引入了寄存器，将一些中间数据存放在寄存器中，这样就能加速 CPU 的执行速度。

有了寄存器之后，CPU 执行指令的操作就变得复杂了一点，因为需要寄存器和内存之间传输数据，或者寄存器和寄存器之间传输数据。我们通常有以下几种方式来使用寄存器，这包括了加载指令、存储指令、更新指令。通过配合这几种类型的指令，我们就可以实现完整的程序功能了。

#### 11 | 堆和栈：函数调用是如何影响到内存布局的？

相信你在使用 JavaScript 的过程中，经常会遇到栈溢出的错误，比如执行下面这样一段代码：

```js
function foo() {
  foo()
}
foo(); // 堆栈溢出错误
```

V8 就会报告栈溢出的错误，为了解决栈溢出的问题，我们可以在 foo 函数内部使用 setTimeout 来触发 foo 函数的调用，改造之后的程序就可以正确执行 。

```js
function foo() {
  setTimeout(foo, 0);
}
foo();
```

如果使用 Promise 来代替 setTimeout，在 Promise 的 then 方法中调用 foo 函数，改造的代码如下：

```js
function foo() {
  Promise.resolve().then(foo);
}
foo();
```

在浏览器中执行这段代码，并没有报告栈溢出的错误，但是你会发现，执行这段代码会让整个页面卡住了。

为什么这三段代码，第一段造成栈溢出的错误，第二段能够正确执行，而第三段没有栈溢出的错误，却会造成页面的卡死呢？

- 第一段代码是在**同一个任务中重复调用嵌套**的 foo 函数；
- 第二段代码是使用 **setTimeout 让 foo 函数在不同的任务中**执行；
- 第三段代码是在**同一个任务中执行 foo 函数，但是却不是嵌套执行**。

这是因为，V8 执行这三种不同代码时，它们的内存布局是不同的，而不同的内存布局又会影响到代码的执行逻辑，因此我们需要了解 JavaScript 执行时的内存布局。

**为什么使用栈结构来管理函数调用？**

我们知道，大部分高级语言都不约而同地采用栈这种结构来管理函数调用，为什么呢？

这与函数的特性有关。通常函数有两个主要的特性：

- 第一个特点是函数可以被调用，你可以在一个函数中调用另外一个函数，当函数调用发生时，执行代码的控制权将从父函数转移到子函数，子函数执行结束之后，又会将代码执行控制权返还给父函数；
- 第二个特点是函数具有作用域机制，所谓作用域机制，是指函数在执行的时候可以将定义在函数内部的变量和外部环境隔离，在函数内部定义的变量我们也称为临时变量，临时变量只能在该函数中被访问，外部函数通常无权访问，当函数执行结束之后，存放在内存中的临时变量也随之被销毁。
  
**既然有了栈，为什么还要堆？**

我们现在理解了栈是怎么管理函数调用的了，使用栈有非常多的优势：

- 栈的结构和非常适合函数调用过程。
- 在栈上分配资源和销毁资源的速度非常快，这主要归结于栈空间是连续的，分配空间和销毁空间只需要移动下指针就可以了。

虽然操作速度非常快，但是栈也是有缺点的，其中最大的缺点也是它的优点所造成的，那就是栈是连续的，所以要想在内存中分配一块连续的大空间是非常难的，因此栈空间是有限的。

因为栈空间是有限的，这就导致我们在编写程序的时候，经常一不小心就会导致栈溢出，比如函数循环嵌套层次太多，或者在栈上分配的数据过大，都会导致栈溢出，基于栈不方便存放大的数据，因此我们使用了另外一种数据结构用来保存一些大数据，这就是堆。

和栈空间不同，存放在堆空间中的数据是不要求连续存放的，从堆上分配内存块没有固定模式的，你可以在任何时候分配和释放它。

#### 12 | 延迟解析：V8是如何实现闭包的？

V8 执行 JavaScript 代码，需要经过编译和执行两个阶段，其中编译过程是指 V8 将 JavaScript 代码转换为字节码或者二进制机器代码的阶段，而执行阶段则是指解释器解释执行字节码，或者是 CPU 直接执行二进制机器代码的阶段。

在编译 JavaScript 代码的过程中，V8 并不会一次性将所有的 JavaScript 解析为中间代码，这主要是基于以下两点：

- 首先，如果一次解析和编译所有的 JavaScript 代码，过多的代码会增加编译时间，这会严重影响到首次执行 JavaScript 代码的速度，让用户感觉到卡顿。因为有时候一个页面的 JavaScript 代码都有 10 多兆，如果要将所有的代码一次性解析编译完成，那么会大大增加用户的等待时间；
- 其次，解析完成的字节码和编译之后的机器代码都会存放在内存中，如果一次性解析和编译所有 JavaScript 代码，那么这些中间代码和机器代码将会一直占用内存，特别是在手机普及的年代，内存是非常宝贵的资源。

基于以上的原因，所有主流的 JavaScript 虚拟机都实现了惰性解析。

所谓**惰性解析是指解析器在解析的过程中，如果遇到函数声明，那么会跳过函数内部的代码，并不会为其生成 AST 和字节码**，而仅仅生成顶层代码的 AST 和字节码。

和JavaScript 闭包相关的三个重要特性：

- 可以在 JavaScript 函数内部定义新的函数(因为函数也是对象)；
- 内部函数中访问父函数中定义的变量；
- 因为 JavaScript 中的函数是一等公民，所以函数可以作为另外一个函数的返回值。

这也是 JavaScript 过于灵活的一个原因，比如在 C/C++ 中，你就不可以在一个函数中定义另外一个函数，所以也就没了内部函数访问外部函数中变量的问题了。

```js
function foo() {
  var d = 20
  return function inner(a, b) {
    const c = a + b + d
    return c
  }
}
const f = foo()
```

在执行 foo 函数的阶段，虽然采取了惰性解析，不会解析和执行 foo 函数中的 inner 函数，但是 V8 还是需要判断 inner 函数是否引用了 foo 函数中的变量，怎么办呢？

这就需要**预解析器**。

**预解析器如何解决闭包所带来的问题？**

V8 引入预解析器，比如当解析顶层代码的时候，遇到了一个函数，虽然不会直接解析函数内部代码，但预解析器并不会直接跳过该函数，而是对该函数做一次快速的预解析，其主要目的有两个。

- 第一，是判断当前函数是不是存在一些语法上的错误，
- 除了检查语法错误之外，预解析器另外的一个重要的功能就是检查函数内部是否引用了外部变量，如果引用了外部的变量，预解析器会将栈中的变量复制到堆中，在下次执行到该函数的时候，直接使用堆中的引用，这样就解决了闭包所带来的问题(因为正常情况下，函数执行完后执行上下文就会销毁，为了还能访问到，因此需要放到堆中)。

总结：

惰性解析是指解析器在解析的过程中，如果遇到函数声明，那么会跳过函数内部的代码，并不会为其生成 AST 和字节码，而仅仅生成顶层代码的 AST 和字节码。

利用惰性解析可以加速 JavaScript 代码的启动速度，如果要将所有的代码一次性解析编译完成，那么会大大增加用户的等待时间。

由于 JavaScript 是一门天生支持闭包的语言，由于闭包会引用当前函数作用域之外的变量，所以当 V8 解析一个函数的时候，还需要判断该函数的内部函数是否引用了当前函数内部声明的变量，如果引用了，那么需要将该变量存放到堆中，即便当前函数执行结束之后，也不会释放该变量。

#### 8、熟悉常见数据结构及算法、理解编译原理，异步开发等。

#### 9、熟悉TypeScript、AST、可以编写各种loader及插件，具有良好的编码风格等。

#### 10、计算机二级、英语六级，可以流畅阅读英文文档，熟悉类Unix系统原理及常用终端编辑器。