
## Java 相关

### zookeeper（zk）

高可用HA(High Availability)是**分布式系统架构**设计中必须考虑的因素之一,成熟的架构大部分都自带高可用实现，只需配置即可，例如**基于zookeeper的storm、spark，kafka**，基于数据库的quartz（Terracotta不考虑）等等。很多组件都基于zookeeper，zookeeper也成为了后端人员必修功课之一。

zk本身就是一个服务端，它跟客户端直接就是一个长链接（tcp），通过的2181的端口。分布式有多个zk，它们之间的通信是通过2188，如果网络抖动的话2888也可以使用。

- 配置管理，很多服务的配置统一协调管理
- 名字服务，很多服务之间的寻址
- 分布式锁，防止并发
- 集群管理，节点退出及新增的集群管理

[更多参考](https://www.cnblogs.com/ultranms/p/9585191.html)

### dubbo

Dubbo是：

- 一款分布式服务框架
- 致力于提供高性能和透明化的RPC远程服务调用方案
- SOA服务治理方案

Dubbo是一款高性能的Java RPC框架。其前身是阿里巴巴公司开源的一个高性能、轻量级的开源Java RPC框架，可以和Spring框架无缝集成。

Dubbo采用全Spring配置方式，透明化接入应用，对应用没有任何API侵入，只需用Spring加载Dubbo的配置即可，Dubbo基于Spring的Schema扩展进行加载。

简单的说，dubbo就是个服务框架，如果没有分布式的需求，其实是不需要用的，只有在分布式的时候，才有dubbo这样的分布式服务框架的需求，并且本质上是个服务调用的东东，说白了就是个远程服务调用的分布式框架（告别Web Service模式中的WSdl，以服务者与消费者的方式在dubbo上注册）

RPC全称为remote procedure call，即远程过程调用。比如两台服务器A和B，A服务器上部署一个应用，B服务器上部署一个应用，A服务器上的应用想调用B服务器上的应用提供的方法，由于两个应用不在一个内存空间，不能直接调用，所以需要通过网络来表达调用的语义和传达调用的数据。

Dubbo提供了三大核心能力：面向接口的远程方法调用，智能容错和负载均衡，以及服务自动注册和发现。

RPC是一个泛化的概念，严格来说一切远程过程调用手段都属于RPC范畴。各种开发语言都有自己的RPC框架。Java中的RPC框架比较多，广泛使用的有RMI、Hessian、Dubbo等。

### SOA 

面向服务架构（SOA）是一个组件模型，它将应用程序的不同功能单元（称为服务）进行拆分，并通过这些服务之间定义良好的接口和协议联系起来。接口是采用中立的方式进行定义的，它应该独立于实现服务的硬件平台、操作系统和编程语言。这使得构建在各种各样的系统中的服务可以以一种统一和通用的方式进行交互。

### SOP标准作业程序

“SOP一般指标准作业程序。所谓SOP，是 Standard Operating Procedure三个单词中首字母的大写 ，即标准作业程序，指将某一事件的标准操作步骤和要求以统一的格式描述出来，用于指导和规范日常的工作。

## Dart 概览

Dart 是一种针对客户优化的语言，可在任何平台上开发快速的应用程序。其目标是为多平台开发提供最高效的编程语言，并为应用程序框架搭配了 灵活的运行时执行平台。

通常来说，编程语言会包含一些 技术壁垒，即语言在设计中的抉择决定了其功能和优势。 Dart 的语言设计针对客户端开发，它优先考虑多平台 (Web，移动端和桌面端) 上的开发 (亚秒级的状态热重载) 和高质量生产环境体验。

Dart 也是 Flutter 的基础。 Dart 作为 Flutter 应用程序的编程语言，为驱动应用运行提供了环境，同时 Dart 还支持许多核心的开发任务，例如格式化，分析和代码测试。

Dart 语言是类型安全的；它使用静态类型检查来确保变量的值 始终 与变量的静态类型相匹配。



## go

go语言（或 Golang）是Google开发的开源编程语言，诞生于2006年1月2日下午15点4分5秒，于2009年11月开源，2012年发布go稳定版。Go语言在多核并发上拥有原生的设计优势，Go语言从底层原生支持并发，无须第三方库、开发者的编程技巧和开发经验。

go是非常年轻的一门语言，它的主要目标是“兼具Python 等动态语言的开发速度和C/C++等编译型语言的性能与安全性”

Go 和 Rust 都属于优先考虑内存安全性的现代编程语言。数十年来，使用 C 和 C++ 等较旧的语言已经很清楚，导致错误和安全漏洞的最大原因之一是不安全或不正确地访问内存。

Go语言的并发是基于 goroutine 的，goroutine 类似于线程，但并非线程。可以将 goroutine 理解为一种虚拟线程。

Go 被直接编译成机器码，这就是它速度的来源。使用编译语言调试是相当容易的，因为你可以在早期捕获大量错误。Go 也是一种强类型的语言，它有助于数据完整，并可以在编译时查找类型错误。

Node 是一款基于 Google V8 虚拟机的 JavaScript 运行库，这使它成为一个轻量和快速的 Web 开发平台。

作为原来的 JavaScript 开发者，Go 简单和直观的语法很吸引我。由于**两种语言的语法可以说都是从 C 语言演变而来的**，所以它们的语法有很多相同之处。

因为它的非阻塞异步 I/O，Node 经常被认为是高性能的语言。另外，正如我之前提到的，Node 运行在针对动态语言进行了优化的 Google V8 引擎上。而 Go 的设计也考虑到速度。Google 的开发者们通过建立了一个“充满表现力而轻量级的类型系统；并发和垃圾回收机制；强制地指定依赖版本等等”，达成了这一目标。

要清楚，性能不是选择编程语言需要考虑的全部内容。如果您的应用不需要处理大量数据，那么 Node 和 Go 之间的性能差异可能是微不足道的。 

go 有如下的优点：接近底层语言的性能，简单的语法和相对简单的学习曲线使它成为构建可拓展和安全的 Web 应用的理想选择。


### go vs rust

[也许是最客观、全面的比较 Rust 与 Go：都想把 Rust 也学一下](https://jishuin.proginn.com/p/763bfbd31320)

#### 性能
我们已经说过，Go 和 Rust 都能生成非常快的程序，因为它们被编译为本机代码，而无需通过解释器或虚拟机。但是，Rust 的性能特别出色，它可与 C 和 C++ 相媲美（C/C++ 通常被认为是性能最高的编译语言），但与这些较旧的语言不同，它还提供了内存安全性和并发安全性，而执行速度却基本没有任何成本。Rust 还允许你创建复杂的抽象，而无需在运行时付出性能损失。

相比之下，**尽管 Go 程序的性能也非常好，但是 Go 的主要目的是提高开发速度（包括编译），而不是提高执行速度。Go 编译器不会花费很多时间来尝试生成尽可能高效的机器代码；它更关心快速编译大量代码。因此，Rust 通常会在运行时基准测试中击败 Go。**说白了，其实就是go用在编译阶段比较好，比如esbuild

Rust 的运行时性能也始终如一且可预测，因为它不使用垃圾回收。Go 的垃圾收集器非常高效，并且经过优化，可以使其 STW 的时间尽可能短（并且在每个新的 Go 版本中都变得更短）。但是垃圾回收不可避免地在程序的行为方式中引入了一些不可预测性，这在某些应用程序（例如嵌入式系统）中可能是一个严重的问题。

由于 Rust 旨在使程序员能够完全控制底层硬件，因此有可能将 Rust 程序优化为非常接近机器的最大理论性能。对于执行速度超过所有其他考虑因素的领域（例如游戏编程，操作系统内核，Web 浏览器组件和实时控制系统），Rust 使其成为绝佳的选择。

#### 并发

大多数语言都对并发编程提供某种形式的支持（一次执行多项操作），但是 Go 是专为这项工作而设计的。Go 不使用操作系统线程，而是提供了一种轻量级的替代方案：goroutines。每个 goroutine 是一个独立执行的 Go 函数，Go 调度程序会将其映射到其控制下的 OS 线程之一。这意味着调度程序仅使用有限数量的 OS 线程即可非常有效地管理大量并发的goroutine。

因此，你可以在一个程序中运行数百万个并发 goroutine，而不会造成严重的性能问题。这使 Go 成为 Web 服务器和微服务等大规模并发应用程序的理想选择。

Go 还提供了快速，安全，有效的方式，goroutine 使用 channel 进行通信和共享数据。Go 的并发支持设计良好，使用起来很愉快。通常很难对并发程序进行推理，而构建可靠，正确的并发程序对任何语言都是一个挑战。但是，由于它是从一开始就内置在语言中的，而不是事后才想到的，Go 中的并发编程简单、合理、良好的集成进语言中。

相比之下，Rust 中的并发是一个很新的特性，并且还有待稳定中，但是它的发展非常活跃，因此请留意这块。例如，Rust 的 rayon[11] 提供了一种非常优雅且轻巧的方法，可以将顺序计算转换为并行计算。

## rust 

Rust 语言旨在引导你自然地转向在**速度和内存使用方面高效且可靠的代码**。

在编程语言设计中，高层工程学和底层控制往往不能兼得；Rust 则试图挑战这一矛盾。通过权衡强大的技术能力与优秀的开发体验，Rust 允许你控制底层细节（比如内存使用），并免受以往进行此类控制所经受的所有烦恼。

Rust 适用于追求编程语言的速度与稳定性的开发者。所谓速度，是指你用 Rust 开发出的程序运行速度，以及 Rust 提供的程序开发速度。

### 通用编程概念

- 默认情况下变量是不可变的（immutable），充分利用 Rust 提供的安全和简单并发的方式来编写代码
- Rust 常量的命名约定是全部字母都使用大写，并使用下划线分隔单词，另外对数字字面量可插入下划线以提高可读性

```rust
// 在rust中，变量是通过let声明的，如果是可变变量，使用mut声明
const MAX_POINTS: u32 = 100_000;
```

将整个程序中用到的硬编码（hardcode）值命名为常量，对于将该值的含义传达给代码的未来维护者很有用。如果将来需要更改硬编码的值，则只需要在代码中改动一处就可以了。

```rust
// ok，这个相当于重新定义一个变量，有点类似js中的变量提升
let spaces = "   ";
let spaces = spaces.len();

// err，因为数据类型变化了
let mut spaces = "   ";
spaces = spaces.len();
```

#### 数据类型

 Rust 是一种**静态类型（statically typed）的语言，这意味着它必须在编译期知道所有变量的类型**。编译器通常可以根据值和使用方式推导出我们想要使用的类型。

- 标量类型，表示单个值；Rust 有 4 个标量类型：**整型、浮点型、布尔型和字符**。
- u32 类型。此类型声明表明了与其相关的值应为 32 位系统的无符号整型（i 是英文单词 integer 的首字母，与之相反的是 u，代表无符号 unsigned 类型）
- 有符号和无符号表示数字能否取负数或是只能取正数；也就是说，数字是否需要带一个符号（有符号类型），或数字只能表示正数故不需要包括符号（无符号类型）。
- **有符号数字以二进制补码形式存储**。
- i8 可存储数字范围是 -(2^7) ~ 2^7 - 1，即 -128 ~ 127。无符号类型可以存储的数字范围是 0 ~ 2^n - 1，所以 u8 能够存储的数字为 0 ~ 2^8 - 1，即 0 ~ 255。
- 此外，isize 和 usize 类型取决于程序运行的计算机类型：64 位（如果使用 64 位架构系统）和 32 位（如果使用 32 位架构系统）。
- Rust 的默认值通常是个不错的选择，整型默认是 i32：这通常是最快的，即便在 64 位系统上也是。
- 浮点类型数字 是带有小数点的数字，在 Rust 中浮点类型数字也有两种基本类型： f32 和 f64，分别为 32 位和 64 位大小。默认浮点类型是 f64，因为在现代的 CPU 中它的速度与 f32 几乎相同，但精度更高。
- Rust 的 char （字符）类型是该语言最原始的字母类型，（注意，char 字面量是用单引号括起来，而字符串字面量是用双引号扩起来）

```js
fn main() {
	let x = 2.0; // f64

	let y: f32 = 3.0; // f32
}

fn main() {
	let c = 'z';
	let z = 'ℤ';
	let heart_eyed_cat = '😻';
}
```

- Rust 的字符类型表示的是一个 Unicode 值，这意味着它可以表示的不仅仅是 ASCII。标音字母，中文/日文/韩文的表意文字，emoji，还有零宽空格(zero width space)在 Rust 中都是合法的字符类型。Unicode 值的范围从 U+0000~U+D7FF 和 U+E000~U+10FFFF。


#### 复合类型

- 复合类型（compound type）可以将其他类型的多个值合在一块组成一个类型。Rust 有两种基本的复合类型：元组（tuple）和数组（array）。
  - 元组是将多种类型的多个值组合到一个复合类型中的一种基本方式。元组的长度是固定的：声明后，它们就无法增长或缩小。

```rust
fn main() {
  let tup: (i32, f64, u8) = (500, 6.4, 1);
	let (x, y, z) = tup;

	println!("The value of y is: {}", y);
	// 除了通过模式匹配进行解构外，我们还可以使用一个句点（.）连上要访问的值的索引来直接访问元组元素。例如：
	let x_new = tup.0
}
```

- Rust 中的数组具有固定长度，跟元组一样。且每个元素必须具有相同的类型。
- vector 类型类似于标准库中提供的集合类型，其的大小允许增长或缩小。如果您不确定是使用数组还是 vector，那就应该使用一个 vector

```rust
// 在方括号中包含每个元素的类型，后跟分号，再后跟数组元素的数量。
let a: [i32; 5] = [1, 2, 3, 4, 5];

// 可以指定初始值，后跟分号，然后在方括号中指定数组的长度，
// 这种写法与 let a = [3, 3, 3, 3, 3]; 效果相同，但更简洁。
let a = [3; 5];

// 数组是在栈上分配的单个内存块。可以使用索引访问数组的元素
```

#### 函数

所有字母都是小写并使用下划线分隔单词。

```rust
fn main() {
	println!("Hello, world!");

	another_function();
}

fn another_function() {
	println!("Another function.");
}
```

- 在函数签名中，必须 声明每个参数的类型。
- 例如 C 和 Ruby，它们的赋值语句会返回所赋的值。在这些语言中，可以这么写 x = y = 6，这样 x 和 y 的值都是 6；Rust 中不能这样写。



## merchant-operation

### 按需加载

常用的ui组件库都支持按需加载，主要方式：
- 全部引入
- 按需引入

按需引入的方式，主要是以下两种：

```js
// 方式一：手动引入组件的样式
import Button from 'vant/lib/button';
import 'vant/lib/button/style';

// 方式二：借助插件，比如babel-plugin-import
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};

import { Button } from 'vant';
Vue.use(Button);


import { Button } from 'vant';
// 其实转换后的代码，
import "vant/es/button/style";
import _Button from "vant/es/button";
```

所谓的组件库按需加载是在 babel 编译 js 阶段进行了代码转换，将按需加载的模块，增加对应样式的导入。

[组件库按需加载原理分析](https://juejin.cn/post/6968505746757533710)

### storeChange 事件

- storage 事件，需要A页面触发，B页面监听到。另外是设置相同的key和val不会二次触发。
- 直接在application里修改stroage会触发原生的storage事件。
- 如果确实想利用，可以自定义storeage事件，进而在同一个页面监听。
- 注意设置后，只能通过localStorage.setItem来触发，并监听customSetItem才行。

```js
const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, val) {
	const customSetItem = new CustomEvent('customSetItem');
	customSetItem[key] = val;
	window.dispatchEvent(customSetItem);

	originalSetItem.apply(this, arguments);
}

// 先监听
window.addEventListener('customSetItem', e => {
	console.log('自定义storeChange事件', e)
})

// 再触发
localStorage.setItem('myKey', 'myVal')
```

## Vue

```js
{
	path: "/:catchAll(.*)",
	redirect: { name: 'dashboard' },
},

// The matching uses path-to-regexp, which is the matching engine used
// by express as well, so the same matching rules apply.
// For detailed rules, see https://github.com/pillarjs/path-to-regexp
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/' },
    // params are denoted with a colon ":"
    { path: '/params/:foo/:bar' },
    // a param can be made optional by adding "?"
    { path: '/optional-params/:foo?' },
    // a param can be followed by a regex pattern in parens
    // this route will only be matched if :id is all numbers
    { path: '/params-with-regex/:id(\\d+)' }, // 参数后面可以跟一个正则
    // asterisk can match anything
    { path: '/asterisk/*' },
    // make part of the path optional by wrapping with parens and add "?"
		// 还可以设置是否可选
    { path: '/optional-group/(foo/)?bar' }
  ]
})
```

## 基座

### 判断是否为代理模式

```js
// isProxyMode 是否为代理模式，根据url里是否携带/proxy-boss
const { pathname, host } = window.location
export const PROXY_PREFIX = '/proxy-boss'
export const isProxyMode = !process.env.IS_OE_BUILD_PRODUCTION && host.includes('local') && pathname.startsWith(PROXY_PREFIX)
export const URL_PREFIX = isProxyMode ? PROXY_PREFIX : ''


// 获取分支逻辑
// FE_ENV_BRANCH fe_env_branch -》sesstionStorage里获取
getSessionStorage(FE_ENV_BRANCH) || qs.parse(location.search.slice(1))?.branch || 'master'

// 设置分支后，会获取search，然后重新拼接到search上，利用qs;
// 利用 window.location.search = qs.stringify(mergeSearchs); 跳转
// 如果已在当前分支，或者在master上，则不会跳转


// 本地proxy，匹配 /mendian-micro- 然后访问
  '/mendian-micro-': {
    target: 'http://boss-sim.chengxinyouxuan.com/',
    changeOrigin: true,
  },

// 本地起的基座服务，访问的资源
// http://boss-local.chengxinyouxuan.com:9000/mendian-micro-purchase-new/entry-manifest.json?timestamp=1639056098906 -》 少了分支
// https://boss-sim.chengxinyouxuan.com/mendian-micro-purchase-new/master/entry-manifest.json?timestamp=1639057144184
// 静态资源，服务器怎么访问？ 没有堡垒机，直接物理机：ssh root@10.96.91.145， 密码：u;%O}3}%*oM)@ac


// 首次注册应用时，会根据当前路径，跳转，同时想下传入一些对象
opts: {
			getState: async () => {
				const { pathname, hash } = window.location;
				if (pathname === '/' && hash === '#/welcome') {
					window.history.pushState({}, '工作台', formatLocationPath('/datacenter/#/index'));
				}
				await userStore._initPromise;
				return {
					portalName: 'cx_cangdian',
					getUserStore: () => userStore,
					getCurrentOz: () => userStore?.currentMoz?.warehouseStoreOz,
					getCurrentGateway: () => API_URL,
					login,
				};
			},
		},


// 重写面包屑逻辑，监听
var originalSetItem = localStorage.setItem;

// 重写 setItem 函数
localStorage.setItem = function (key, newValue) {
	// bread_crumb_list 面包屑导航
	if (key === 'bread_crumb_list') {
		// 创建 setBreadCrumb 事件
		var event = new Event('setBreadCrumb');
		event.key = key;
		event.value = newValue;

		// 提交 setBreadCrumb 事件
		window.dispatchEvent(event);
	}
	originalSetItem.apply(this, arguments);
}

// 代码切换分支后，经常没有重新获取manifest.json文件，导致资源出错；此时可以多次修改分支
// 另外就是获取manifest.json文件的路径有时候有问题，需要查下。比如访问index页面就跳到了welcome（因为路由有个兜底，如果匹配不到就会跳转）
```
1. 注册主应用、注册子应用
2. 拉取本地的apps列表
3. 请求对应app的manifest.json，从而获取到对应子应用资源；基座的话，不拉取远程资源，而是加载本地的一个blob文件
4. 


## react-admin 技术栈

[react-admin github](https://github.com/yezihaohao/react-admin)

因为JSON不支持 Symbol 类型。所以即使服务器存在用JSON作为文本返回安全漏洞，JSON 里也不包含 Symbol.for('react.element')。React 会检测 element.$$typeof，如果元素丢失或者无效，会拒绝处理该元素。说白了，react为了防止服务端的xss漏洞的一个方式。

[为什么react元素有一个$$typeof元素](https://overreacted.io/zh-hans/why-do-react-elements-have-typeof-property/)

### dotenv

npm 官方文档的这样介绍 dotenv: Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中。将环境相关的配置独立于代码之外亦是 The Twelve-Factor App 的要素之一。

根目录下创建 .env 文件
```js
HOST=localhost
PORT=3000
MONGOOSE_URL=mongodb://localhost:27017/test
```
根目录下 app.js 下引入 dotenv 并使用 `require('dotenv').config({ path: '.env' })`

// 使用
```js
console.log(process.env.HOST) // localhost
console.log(process.env.PORT) // 3000
console.log(process.env.MONGOOSE_URL) // mongodb://localhost:27017/test
```

### redux-alita

redux-alita是一个封装了react + redux 操作的极简的工具插件，你可以用它来提升日常的开发效率。

为什么叫alita？卡导的《Alita》得名。本插件和她的特点一样，精致，迅捷，简单，（开发）速度快。

[官方github](https://github.com/yezihaohao/redux-alita)

### umbrella-storage

一个操作localStorage和sessionStorage的插件，避免同一个域名下部署不同前端web app，本地存储使用同样的key导致的冲突问题。

```js
import umbrella from 'umbrella-storage';
 
umbrella.setLocalStorage('test', 'test');
umbrella.getLocalStorage('test');
 
umbrella.setSessionStorage('sessionTest', { name: 'test' });
umbrella.getSessionStorage('sessionTest');

// 配置自定义前缀
umbrella.config(prefix: string);
```

## typescript

### 基本数据类型

#### unknown

就像所有类型都可以赋值给 any，所有类型也都可以赋值给 unknown。

但是，反过来，unknown类型的数据只能赋值给any 和 unknown

```js
let value: any;

value.foo.bar; // OK
value.trim(); // OK
value(); // OK
new value(); // OK
value[0][1]; // OK

// 改为unknown
let value: unknown

value.foo.bar; // Error
value.trim(); // Error
value(); // Error
new value(); // Error
value[0][1]; // Error
```

#### 元组

所周知，数组一般由**同种类型的值**组成，但有时我们需要在单个变量中存储不同类型的值

```js
let tupleType: [string, boolean];
// 在元组初始化的时候，必须类型一致
tupleType = ["Semlinker", true];
```

#### Void 类型

与any 正好相反，是没有任何类型，而any是任何类型


#### undefind  null

TypeScript 里，undefined 和 null 两者有各自的类型分别为 undefined 和 null。

```js
let u: undefined = undefined;
let n: null = null;
```

复制代码默认情况下 null 和 undefined 是所有类型的子类型。 

就是说你可以把 null 和 undefined 赋值给 number 类型的变量。然而，如果你指定了 `--strictNullChecks` 标记，null 和 undefined 只能赋值给 void 和它们各自的类型。

#### Never 类型

never 类型表示的是那些永不存在的值的类型。

```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```

使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。

### 类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。

#### as语法断言

```js
let someValue: any = "this is a string";
// 本来含有length属性的值，没有几个。这里就断言someValue为string
let strLength: number = (someValue as string).length;
```

#### 尖括号语法断言

```js
let someValue: any = "this is a string";
// 本来含有length属性的值，没有几个。这里就断言someValue为string
let strLength: number = (<string>someValue).length;
```

### 类型守卫

类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。

- in 关键字，其实就类似对象的in
- typeof 关键字
- instanceof 关键字

```js
if (padder instanceof XXX) {
  // padder的类型收窄为 'SpaceRepeatingPadder'
}
```

- 自定义类型保护的类型谓语
  
```js
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
```

### 类型别名

类型别名是用来给类型起个名字

难道 type 就是类型别名?

```js
type Message = string | string[];

let greet = (message: Message) => {
  // ...
};
```

### 交叉类型

TypeScript 交叉类型是将多个类型合并为一个类型。

```js
interface IPerson {
  id: string;
  age: number;
}

interface IWorker {
  companyId: string;
}

type IStaff = IPerson & IWorker;

const staff: IStaff = {
  id: 'E1006',
  age: 33,
  companyId: 'EFT'
};

console.dir(staff)
```

### 函数类型

```js
// 声明一个函数类型的变量
let IdGenerator: (chars: string, nums: number) => string;

// 定义一个函数
function createUserId(name: string, id: number): string {
  return name + id;
}
// 将函数赋值给变量
IdGenerator = createUserId;
```

### 函数重载

函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。

为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用。

```js
// 我们为 add 函数提供了多个函数类型定义，从而实现函数的重载。
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

### ts数组结构

```js
let x: number; let y: number; let z: number;
let five_array = [0,1,2,3,4];
[x,y,z] = five_array;
```


### type or interface

```js
type IProps = {
  name: string
}

const defaultProps = {
  age: 25,
}

// 类型定义 类型合并
type GreetProps = IProps & typeof defaultProps


class Point {
  x: number = 2;
  y: number = 3;
}

interface IShape {
  area(): number;
}

type Perimeter = {
  perimeter(): number;
};

type RectangleShape = (IShape | Perimeter) & Point;

class Rectangle implements RectangleShape {
  // 类只能实现具有静态已知成员的对象类型或对象类型的交集。
  x = 2;
  y = 3;
  area() {
    return this.x + this.y;
  }
}

interface ShapeOrPerimeter extends RectangleShape {}
// 接口只能扩展使用静态已知成员的对象类型或对象类型的交集


```

使用Type还是Interface？
有几种常用规则：

- 在定义公共 API 时(比如编辑一个库）使用 interface，这样可以方便使用者继承接口
- 在定义组件属性（Props）和状态（State）时，建议使用 type，因为 type的约束性更强

interface 和 type 在ts中是两个不同的概念，但在 React 大部分使用的 case 中，interface 和 type 可以达到相同的功能效果，type 和 interface 最大的区别是：
- type 类型不能二次编辑，而 interface 可以随时扩展

```js
interface Point {
    x: number;
    y: number;
}

// type keys = "x" | "y"
type keys = keyof Point;

// 返回对象的属性
const data = {
  a: 3,
  hello: 'world'
}

function get(o: object, name: string) {
  return o[name]
}

// =》进阶 
// 泛型其实就是类型的函数。
// 我们通过 K extends keyof T 确保参数 key 一定是对象中含有的键，这样就不会发生运行时错误。
// 这是一个类型安全的解决方案，与简单调用 let value = obj[key]; 不同。
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}

// 使用泛型前
function identity (value: Number) : Number {
  return value;
}
console.log(identity(1)) // 1

// 使用泛型后，其实就是加个<T>，同时将T这个类型，传递给入参和返回结果
function identity<T> (value: T) : T {
  return value;
}
// <T> 内部的 T 被称为类型变量，它是我们希望传递给 identity 函数的类型占位符，
// 同时它被分配给 value 参数用来代替它的类型：此时 T 充当的是类型，而不是特定的 Number 类型。
console.log(identity<Number>(1)) // 1
```

其中 T 代表 Type，在**定义泛型时通常用作第一个类型变量名称**。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：

- T（Type）：表示一个 TypeScript 类型
- K（Key）：表示对象中的键类型
- V（Value）：表示对象中的值类型
- E（Element）：表示元素类型

其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 U，用于扩展我们定义的 identity 函数：

```js
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity<Number, string>(68, "Semlinker"));

// 当然除了为类型变量显式设定值之外，一种更常见的做法是使编译器自动选择这些类型，从而使代码更简洁。
// 我们可以完全省略尖括号，比如：
console.log(identity(68, "Semlinker"));

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}
// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
```


### 泛型约束

```js
function identity<T>(arg: T): T {
  console.log(arg.length); // Error
  return arg;
}

// 在这种情况下，编译器将不会知道 T 确实含有 length 属性，尤其是在可以将任何类型赋给类型变量 T 的情况下。
// 我们需要做的就是让类型变量 extends 一个含有我们所需属性的接口，比如这样：
interface Length {
  length: number;
}

// T extends Length 用于告诉编译器，我们支持已经实现 Length 接口的任何类型。
function identity<T extends Length>(arg: T): T {
  console.log(arg.length); // 可以获取length属性
  return arg;
}

// extends 除了做约束类型，还可以做条件控制，相当于与一个三元运算符，只不过是针对 类型 的。
T extends U ? X : Y

// 含义：如果 T 可以被分配给 U，则返回 X，否则返回 Y。
// 一般条件下，如果 T 是 U 的子类型，则认为 T 可以分配给 U，例如：
type IsNumber<T> = T extends number ? true : false

type x = IsNumber<string>  // false
```

### 泛型默认值

泛型参数默认类型与普通函数默认值类似，

```js
interface A<T=string> {
  name: T;
}

const strA: A = { name: "Semlinker" };
const numB: A<number> = { name: 101 };
```

### 泛型条件类型

尽管以上代码中使用了 extends 关键字，也不一定要强制满足继承关系，而是检查是否满足结构兼容性。

`T extends U ? X : Y`

以上表达式的意思是：若 T 能够赋值给 U，那么类型是 X，否则为 Y。

### 泛型工具类型

为了方便开发者 TypeScript 内置了一些常用的工具类型，比如 Partial、Required、Readonly、Record 和 ReturnType 等。

#### Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?。

```js
/**
 * node_modules/typescript/lib/lib.es5.d.ts
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值。中间的 ? 号，用于将所有属性变为可选。

#### Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。

## 开课吧

### react源码调试

由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿，因此提出了解决办法——用可中断的异步更新代替同步的更新。

- Reconciler(协调器)，负责找出变化的组件
- Renderer（渲染器），负责将变化的组件渲染到页面
- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler（react16引入）

在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记，整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

16.6ms内：js执行-》布局-》样式绘制
[输入字符越多，渲染的节点越多，越考验性能](https://codesandbox.io/s/concurrent-ibzkq)

将同步更新更换为可中断的异步更新

React16采用新的Reconciler，主要解决大任务可以分片，从而避免渲染大任务卡顿。 Reconciler内部采用了Fiber的架构。

Fiber并不是计算机术语中的新名词，他的中文翻译叫做纤程，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

在很多文章中将纤程理解为协程的一种实现。在JS中，协程的实现便是Generator。

所以，我们可以将纤程(Fiber)、协程(Generator)理解为代数效应思想在JS中的体现。

React Fiber可以理解为：

React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。

**其中每个任务更新单元为React Element对应的Fiber节点**。

我们了解了Fiber的起源与架构，其中Fiber节点可以构成Fiber树。那么Fiber树和页面呈现的DOM树有什么关系，React又是如何更新DOM的呢？
****

## react

react用于构建用户界面的js库，

发送数据，处理数据都不干，只做操作dom层面页面

原生的痛点：操作真实dom（每次都重建真实dom，成本高；虚拟dom会重用之前的？），没有组件化，

- 命令式编码 -》 声明式组件，提高了开发效率和组件复用率
- react-native 使用js编写ios或者adroid应用
- diff算法 + 虚拟dom

### react入门

新建html，引入下面三个文件，直接操作：

- babel -》es6转es5，还可以解析import，jsx（转为js）等语法
- react：核心库
- react-dom：依赖react，操作dom

```html
<!-- 只在本地学习阶段使用，生产环境下，项目庞大，浏览器靠babel运行时解析很耗时 -->
<script type="text/babel">
    // 定义虚拟dom，右侧不是字符串，而是jsx，靠babel解析
    const vDom = <h1>hello,react</h1>

    React.render(vDom, document.getElementById('#app'))
</script>
```

### 虚拟dom的两种创建方式

 - 使用jsx，简洁方便
 - 使用js，React.createElement('h1', { id: 'titlt' }, 'hello, react')

因此使用jsx语法可以极大的减轻编码负担。虽然用jsx减轻了开发者的成本，但babel最终也会转为上面的js形式。

### 虚拟dom与真实dom

- 虚拟dom其实就是一般的Object对象而已。
- 比真实dom更加轻量。
- 虚拟dom最终会转为真实dom

### jsx的语法

- 全称javascript xml
- 一种类似xml的js扩展语法
- 本质是React.createElement()方法的语法糖
- 作用用来简化开发者创建虚拟dom

xml早期用于存储和传输数据，如下其实主要为了存储tom和17，多了很多东西，后来出现了更加方便的json数据格式

```xml
<student>
    <name>tom</name>
    <age>17</age>
</student>
```

语法规则：
- 虚拟dom，不要引号
- 混入js表达式需要{}，注意是表达式！！！。
- 样式的类名使用className
- 内敛样式不能是字符串，而是：style={{ key:value }}的形式
- jsx不能有多个根标签
- jsx里的标签必须闭合
- 小写标签都默认是html的同名标签，若html中没有该标签，则报错，但可以显示。
- 首字符大写的标签是自定义的组件。

### jsx小练习

- jsx如果接收一个数组，jsx会遍历渲染。但传入一个对象则不可以
- 表达式，一个表达式会产生一个值；判断是否为表达式，只需要用一个变量接收表达式的返回值即可，能接收到则为表达式

### react是面向组件编程

- 函数组件，名字首字母大写
- babel， 试一试，怎么增加es5的选项
- 函数组件被babel编译后，开启了严格模式，因此内部的this会指向undefined，整个函数都处在严格模式下

```js
class P {}
const p1 = new P();

console.log(p1);
// P {} ， 控制台的打印效果，P表示这个实例的类。后面的{}才是实例
// class里的this指向实例。
```

- 类中的构造器不是必须写的，
- 在react中，绑定函数只是将函数的引用赋值给了onClick等，并不是实例调用，因此会丢失一些信息。
- 类中的方法默认是开启了局部的严格模式，因此方法中的this会指向undefined
- 另外类中的render函数，之所以可以直接使用this，是因为react实例化组件后，通过实例调用的render方法，因此this并没有丢失
- 可以自己测试，实例化类组件，然后用实例去调用里面的非render方法，看看this就知道了。
- 在constructor里使用bind，其实相当于将原型上的方法绑定this后重新赋值到当前实例的同名属性上了，后续页面渲染变优先使用当前实例上的方法，然后才是原型上的。
- this.state是一个对象，然后setState用来更改state，当然还可以定义其他属性，比如peiqi等等

### props

- 展开运算符，主要用在数组上，但也可以使用在对象上，如下，需要{}语法，注意在react中只能使用在组件的属性传递中

```js
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// 克隆后的对象: { foo: "bar", x: 42 }
```
- 对组件的标签属性进行类型限制，需要引入独立的PropsTypes，在react中，这是一个独立的库

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 给组件的propTypes属性上添加，注意和PropTypes不容
Greeting.propTypes = {
  name: PropTypes.string
};

// 给类自身添加属性,而不是上面分开的写法
class Greeting extends React.Component {
    static propTypes = {
        name: PropTypes.string
    }
}

const p = { age: 1, name: 'jon' }
// 如下传递对象
ReactDOM.render(<Greeting {...p}/>, ele)
```

### 构造器

构造器默认接受props参数，并执行super(props)，这样的话才会在实例上使用this.props；如果写了constructor，但并没有传递props，则this.props是undefined

通常，在 React 中，构造函数仅用于以下两种情况：

- 通过给 this.state 赋值对象来初始化内部 state。
- 为事件处理函数绑定实例

### 函数式组件

```jsx
// 参数一props
function Person (props) {
    const { name, age } = props;
    return (
        <div>
            <p>{name}</p>
            <p>{age}</p>
        </div>
    )
}
Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number.isRequired
}
Person.defaultProps = {};
```

### refs

- ref最终拿到的是真实dom
- ref可以支持字符串(效率低，react本身帮你收集到refs上)、回调函数(其实就是在函数内部，将元素挂在实例上，然后再获取)、
- 回调函数执行次数？更新时会执行两次，可以将方法直接定义在class的方法里，当然也无关紧要
- jsx中注释如何写，需要 { // } 或者 { /* xxx */ }才可以，注意想使用js的注释方式，必须在js的环境中，也就是{} 
- React.createRef() 返回一个容器，该容器可以存储被ref标识的节点，从current属性上获取元素节点。而且是专人专用，也就是一个节点需要建一个createRef()。。。react推荐这种方式，虽然繁琐

- 避免频繁使用ref，可以借助event.target，也就是操作的元素和绑定事件的元素是同一个

React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：
- 转发 refs 到 DOM 组件
- 在高阶组件中转发 refs
  
React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
在上述的示例中，React 会将 `<FancyButton ref={ref}>` 元素的 ref 作为第二个参数传递给 React.forwardRef 函数中的渲染函数。该渲染函数会将 ref 传递给 `<button ref={ref}>` 元素。

因此，当 React 附加了 ref 属性之后，ref.current 将直接指向 <button> DOM 元素实例。


- useImperativeHandle(ref, createHandle, [deps])
useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />;
}
FancyInput = forwardRef(FancyInput);
```
在本例中，渲染 <FancyInput ref={inputRef} /> 的父组件可以调用 inputRef.current.focus()。



### 事件

- react的事件命名onClick方式，是为了更好的兼容性
- react中的事件都是利用事件代理

### 非受控组件

- 现用现取

### 受控组件

- 其实就是通过state来维护一些变量，有点类似vue中的双向数据绑定
- #region，#endregion 放在注释的两头，可以起到折叠效果

### 高阶函数

- 若函数接收一个函数，则为高阶，如Promise,setTimeout，数组方法等
- 若函数返回一个函数，也是高阶

### 函数柯力化

- 函数调用继续返回函数，最后统一处理(一般是无法同时接收到多个参数才使用)

### 旧的生命周期

挂载：mount
卸载：unmout

- ReactDOM.unmountComponentAtNode(el)，卸载组件
- componentDidMount
- componentWillUnmount
- render

挂载时：
1. constructor 
2. componentWillMount
3. render
3. componentDidMount

父组件render更新时：
1. componentWillReceiveProps，这里主要是子组件接到props，页面第一次渲染不会执行该钩子，后续的更新才会执行
2. shouldComponentUpdate
3. componentWillUpdate
4. render
5. componentDidUpdate

setState时：
1. setState调用
2. shouldComponentUpdate，返回布尔值，true则继续往下走
3. componentWillUpdate
4. render
5. componentDidUpdate


forceUpdate调用时：
0. forceUpdate调用时：
1. componenetWillUpdate
2. render
3. componentDidUpdate

卸载组件时，ReactDOM.unmountComponentAtNode()触发：
1. componentWillUnmount，没有像vue中的destroyed钩子

- 至于第一次的钩子没有执行，应该是框架初始化时的逻辑，待核实？？？
- 在componentDidMount钩子里发送请求，执行一些初始化的操作，那在componentWillMount里可以拿到this.state吗？也是可以的，因此请求可以放在这里吧

### 新的生命周期

- 新版本下的react还可以使用旧的钩子，但会控制台警告，但如果在就钩子里前面加上：UNSAFE_ 就可以干掉警告了
- 只有三个带will的钩子，才需要加 UNSAFE_，除了componentWillUnmount不需要。
- 为什么加UNSAFE_呢？这些生命周期方法经常被误解和滥用；此外，我们预计，在异步渲染中，它们潜在的误用问题可能更大。我们将在即将发布的版本中为这些生命周期添加 “UNSAFE_” 前缀。（**这里的 “unsafe” 不是指安全性，而是表示使用这些生命周期的代码在 React 的未来版本中更有可能出现 bug，尤其是在启用异步渲染之后。**）[为什么加UNSAFE_](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)

挂载时：
1. constructor
2. getDerivedStateFromProps，而且这个钩子需要添加static，添加到类上。还必须返回null或状态对象（会影响后续渲染，主要用于state的状态后续完全取决于props，极少用）
3. render
4. componentDidMount

更新时：
1. getDerivedStateFromProps
2. shouldComponentUpdate
3. render
4. getSnapshotBeforeUpdate，需要返回快照(任何值都行)或null，
5. componentDidUpdate，有两个参数，preProps和preState，新的 getSnapshotBeforeUpdate 生命周期方法在更新之前（如：更新 DOM 之前）被调用。此生命周期的返回值将作为第三个参数传递给 componentDidUpdate。（通常不需要，但在重新渲染过程中手动保留滚动位置等情况下非常有用。）

卸载时：
1. componentWillUnmount

总结：
- 即将废弃三个钩子
- 两个新增的钩子（其实后续几乎不用）

## react常见问题集

### 组件重复挂载

```jsx
const BoxStyle = ({ children })=><div className='card' >{ children }</div>

export default function Home(){
   const [ number , setNumber ] = useState(0)
   const NewIndex = () => <BoxStyle><Index number={number}  /></BoxStyle>
   return <div>
      <NewIndex  />
      <button onClick={ ()=>setNumber(number+1) } >点赞</button>
   </div>
}
```

在每一次 render 过程中，都形成一个新组件，**对于新组件，React 处理逻辑是直接卸载老组件，重新挂载新组件**，所以我们开发的过程中，注意一个问题那就是：
- 对于函数组件，不要在其函数执行上下文中声明新组件并渲染，这样每次函数更新会促使组件重复挂载。
- 对于类组件，不要在 render 函数中，做如上同样的操作，否则也会使子组件重复挂载。

### 

大家用函数组件+类组件开发的时候，如果用到 React.memo React.PureComponent等api，要注意给这些组件绑定事件的方式:
- 如果是函数组件，那么想要持续保持纯组件的渲染控制的特性的话，那么请用 useCallback,useMemo等api处理，
- 如果是类组件，请不要用箭头函数绑定事件，箭头函数同样会造成失效的情况。
- PureComponent是 React.memo只能对props的情况确定是否渲染，而PureComponent是针对props和state。
- React.memo: 第二个参数 返回 true 组件不渲染 ，返回 false 组件重新渲染。 参数2可以传入一个回调，回调内增加一些逻辑，进而定制更多场景。
- shouldComponentUpdate: 返回 true 组件渲染 ，返回 false 组件不渲染。



### react事件机制

React并不是将click事件绑定到了div的真实DOM上，而是在document处监听了所有的事件，当事件发生并且冒泡到document处的时候，React将事件内容封装并交由真正的处理函数运行。这样的方式不仅仅减少了内存的消耗，还能在组件挂在销毁时统一订阅和移除事件。

实现合成事件的目的如下：

- 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力；
- 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。
  
### React的事件和普通的HTML事件有什么不同？

区别：
- 事件名称不同，原生是全小写，而react的是驼峰
- react的事件不能使用return false阻止浏览器的默认行为。必须使用evt.preventDefault()
- 对于事件函数处理语法，原生事件为字符串，react 事件为函数；

合成事件是react模拟原生dom事件所有能力的一个事件对象。优点如下

- 兼容所有浏览器，更好的跨平台；
- 将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）。
- 方便 react 统一管理和事务机制。

原生事件与合成事件执行顺序，原生先执行，合成事件会冒泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到document 上合成事件才会执行。

## mobx-react

react有很多状态管理的组件，比如Redux，Mobx，Jumpsuit，Alt.js等。

都支持将store与React组件连接，如react-redux，mobx-react；

Mobx和Redux都是JavaScript应用状态管理库，都适用于React，Angular，VueJs等框架或库，而不是局限于某一特定UI库。

但redux写起来还是不如mobx简单明了。

使用Redux和React应用连接时，需要使用react-redux提供的Provider和connect（这里也能）

1. Provider：负责将Store注入React应用；
2. connect：负责将store state注入容器组件，并选择特定状态作为容器组件props传递；

对于Mobx而言，同样需要两个步骤：

1. Provider：使用mobx-react提供的Provider将所有stores注入应用；
2. 使用inject将特定store注入某组件，store可以传递状态或action；然后使用observer保证组件能响应store中的可观察对象（observable）变更，即store更新，组件视图响应式更新。


mobx的流程图如上，通常是：触发action，在action中修改state，通过computed拿到state的计算值，自动触发对应的reactions，这里包含autorun，渲染视图等。有一点需要注意：相对于react来说，mobx没有一个全局的状态树，状态分散在各个独立的store中。mobx的工作原理非常简单，使用Object.defineProperty来拦截对数据的访问，一旦值发生变化，将会调用react的render方法来实现重新渲染视图的功能或者触发autorun等。

Mobx的实现思想和Vue几乎一样，所以其优点跟Vue也差不多：通过监听数据（对象、数组）的属性变化，可以通过直接在数据上更改就能触发UI的渲染，从而做到MVVM、响应式、上手成本低、开发效率高，在数据管理上需要再详细阐述下其区别。

Redux是建议全局唯一Store的，多个Reducers也会在传递给react-redux之前被合并成一个root reducer，任何数据的更改（通过Reducer）都会通过这一个store来触发整个UI树的重新渲染，如果不做任何的性能优化（pureRender等），就算VD(Virtual Dom)有了再高的效率提升，当页面数据量、DOM数量大了，性能消耗也是非常大的。另外一点，Redux实现的对数据的管理是pull方式的，就是说其只能等待应用派发某个行为（Action），然后重新触发UI的渲染，而做不到对行为的可预期；Mobx则不一样，他是基于监听数据的属性变化来实现的，而且是多store的，对于任何的数据变更都是第一时间知道的，所以其实现方式是基于push的监听订阅模式而实现，这样，他就可以做到对数据的可预测以及细粒度的控制，甚至可以通过修改React组件生命周期的方式来减少性能的消耗，而无需使用者对这些细节关心。当然这一切肯定是有了mobx对组件做observe操作才能实现的，所以也就有了observer用的越多，应用性能越高的说法。

在 React 状态管理工具中，无论是 react-redux ，还是 mobx-react，一方面想要把 state 和 dispatch 函数传递给组件，另一方面订阅 state 变化，来促使业务组件更新，那么整个流程中，需要一个或多个 HOC 来搞定。于是 react-redux 提供了 connect，mobx-react 提供了 inject ，observer 等优秀的 hoc。

### observer / observable

- observable是将数据改为响应式，这样的话，当数据发生变化时，就可以将@observer监测的组件自动更新。
- 而且正常的让react页面更新需要使用this.setState才可以，使用装饰器后，只需@observable xxx = 1; 然后@observer 整个组件即可。

- observer 函数/装饰器可以用来将 React 组件转变成响应式组件。 它用 mobx.autorun 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件。 observer 是由单独的 mobx-react 包提供的。
- `import { useLocalObservable, Observer } from 'mobx-react'`，当然除了函数observer，还有组件Observer

### inject/provide

- 下面的含义是，从根组件provider的store拿出这三个对象，然后作为props传给FormSearch。
```js
export default inject(
  'commonStore',
  'supplierLevelStore',
  'afterClassifyNewStore'
)(observer(FormSearch));
```

- Provider是mobx-react的组件，然后将store里所有的导出都传给子组件
```js
<Provider {...stores}>
	<ConfigProvider locale={zhCN}>
		<HashRouter>
			<MyRouter />
		</HashRouter>
	</ConfigProvider>
</Provider>,
```

- ConfigProvider是antd配置语言包的。

### @action vs @action.bound

action 装饰器/函数遵循 javascript 中标准的绑定规则。 但是，action.bound 可以用来自动地将动作绑定到目标对象。 注意，与 action 不同的是，(@)action.bound 不需要一个name参数，名称将始终基于动作绑定的属性。

```js
class Ticker {
  @observable tick = 0

  @action.bound
  increment() {
      this.tick++ // 'this' 永远都是正确的
  }

  // 等价于下面的
  @action
  increment = () => {

  }
}

const ticker = new Ticker()
setInterval(ticker.increment, 1000)
```

注意: **action.bound 不要和箭头函数一起使用；箭头函数已经是绑定过的并且不能重新绑定。**


### 装饰器

## react全家桶路线

react写代码的方式，更像vue中render函数方式。

因为你是想学React，所以我给你联系一个整体的路线，也相当于React全家桶。
- 首先React框架基础，直接根据官方文档学习最新的版本。
- 然后React router，也就是路由，学习最新的v4版本。
- 当你需要进行数据管理时，就可以学习redux或者mobx，不过大多数公司都是使用redux。
- 当你需要进行复杂的异步操作或者进行异步action时，就需要用到rxjs配合redux-observable或者redux-saga。
- 当然，你还需要掌握一套UI组件库的用法。推荐蚂蚁金服的ant design。

- 我是前天刚来的新同学，昨天把项目和权限跑起来，然后评审一个需求，看下react相关的东西
- 今天主要结合项目，

## react、react-dom
- react
- react-dom

React在v0.14之前是没有react-dom的，所有功能都包含在react里。从v0.14(2015-10)开始，react才被拆分成react和react-dom。为什么要把react和react-dom分开呢？因为有了react-native。react只包含了Web和Mobile通用的核心部分，负责Dom操作的分到react-dom中，负责Mobile的包含在react-native中。

## react-router、react-router-dom
- react-router
- react-router-dom

react-router:具有switch route router等方法 ，但無法透過操作DOM來跳轉

react-router-dom :是以react-router為核心，提供BrowserRouter 、Route Link等等 ，可以用操作DOM的方式來改變path

所以實際上我們只要引入react-router-dom即可來實作react-router的功能

```
"react-router-dom": "^5.1.2",
```

exact默认为false，如果为true时，需要和路由相同时才能匹配，但是如果有斜杠也是可以匹配上的。 如果在父路由中加了exact，是不能匹配子路由的,建议在子路由中加exact

strict默认为false，如果为true时，路由后面有斜杠而url中没有斜杠，是不匹配的

在history模式下用popstate监听路由变化，在hash模式下用hashchange监听路由的变化。

## mobx、

其实@observable key = value; 只是extendObservable(this, { key: value })的语法糖。因此在ES5环境下你也能使用

## 一些点

- 安装pretter即可格式化 vscode里的代码。

## 一、todoList案例相关知识点
		1.拆分组件、实现静态组件，注意：className、style的写法
		2.动态初始化列表，如何确定将数据放在哪个组件的state中？
					——某个组件使用：放在其自身的state中
					——某些组件使用：放在他们共同的父组件state中（官方称此操作为：状态提升）
		3.关于父子之间通信：
				1.【父组件】给【子组件】传递数据：通过props传递
				2.【子组件】给【父组件】传递数据：通过props传递，要求父提前给子传递一个函数
		4.注意defaultChecked 和 checked的区别，类似的还有：defaultValue 和 value
		5.状态在哪里，操作状态的方法就在哪里

## 二、github搜索案例相关知识点
		1.设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办。
		2.ES6小知识点：解构赋值+重命名
					let obj = {a:{b:1}}
					const {a} = obj; //传统解构赋值
					const {a:{b}} = obj; //连续解构赋值
					const {a:{b:value}} = obj; //连续解构赋值+重命名
		3.消息订阅与发布机制
					1.先订阅，再发布（理解：有一种隔空对话的感觉）
					2.适用于任意组件间通信
					3.要在组件的componentWillUnmount中取消订阅
		4.fetch发送请求（关注分离的设计思想）
					try {
						const response= await fetch(`/api1/search/users2?q=${keyWord}`)
						const data = await response.json()
						console.log(data);
					} catch (error) {
						console.log('请求出错',error);
					}
				

## 三、路由的基本使用
			1.明确好界面中的导航区、展示区
			2.导航区的a标签改为Link标签
						<Link to="/xxxxx">Demo</Link>
			3.展示区写Route标签进行路径的匹配
						<Route path='/xxxx' component={Demo}/>
			4.<App>的最外侧包裹了一个<BrowserRouter>或<HashRouter>

## 四、路由组件与一般组件
			1.写法不同：
						一般组件：<Demo/>
						路由组件：<Route path="/demo" component={Demo}/>
			2.存放位置不同：
						一般组件：components
						路由组件：pages
			3.接收到的props不同：
						一般组件：写组件标签时传递了什么，就能收到什么
						路由组件：接收到三个固定的属性
											history:
														go: ƒ go(n)
														goBack: ƒ goBack()
														goForward: ƒ goForward()
														push: ƒ push(path, state)
														replace: ƒ replace(path, state)
											location:
														pathname: "/about"
														search: ""
														state: undefined
											match:
														params: {}
														path: "/about"
														url: "/about"

## 五、NavLink与封装NavLink
				1.NavLink可以实现路由链接的高亮，通过activeClassName指定样式名

## 六、Switch的使用
				1.通常情况下，path和component是一一对应的关系。
				2.Switch可以提高路由匹配效率(单一匹配)。

## 七、解决多级路径刷新页面样式丢失的问题
				1.public/index.html 中 引入样式时不写 ./ 写 / （常用）
				2.public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
				3.使用HashRouter

## 八、路由的严格匹配与模糊匹配
				1.默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
				2.开启严格匹配：<Route exact={true} path="/about" component={About}/>
				3.严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

## 九、Redirect的使用	
				1.一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
				2.具体编码：
						<Switch>
							<Route path="/about" component={About}/>
							<Route path="/home" component={Home}/>
							<Redirect to="/about"/>
						</Switch>

## 十、嵌套路由
				1.注册子路由时要写上父路由的path值
				2.路由的匹配是按照注册路由的顺序进行的

## 十一、向路由组件传递参数
				1.params参数
							路由链接(携带参数)：<Link to='/demo/test/tom/18'}>详情</Link>
							注册路由(声明接收)：<Route path="/demo/test/:name/:age" component={Test}/>
							接收参数：this.props.match.params
				2.search参数
							路由链接(携带参数)：<Link to='/demo/test?name=tom&age=18'}>详情</Link>
							注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
							接收参数：this.props.location.search
							备注：获取到的search是urlencoded编码字符串，需要借助querystring解析
				3.state参数
							路由链接(携带参数)：<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
							注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
							接收参数：this.props.location.state
							备注：刷新也可以保留住参数
				


## 十二、编程式路由导航
					借助this.prosp.history对象上的API对操作路由跳转、前进、后退
							-this.prosp.history.push()
							-this.prosp.history.replace()
							-this.prosp.history.goBack()
							-this.prosp.history.goForward()
							-this.prosp.history.go()

## 十三、BrowserRouter与HashRouter的区别
			1.底层原理不一样：
						BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
						HashRouter使用的是URL的哈希值。
			2.path表现形式不一样
						BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
						HashRouter的路径包含#,例如：localhost:3000/#/demo/test
			3.刷新后对路由state参数的影响
						(1).BrowserRouter没有任何影响，因为state保存在history对象中。
						(2).HashRouter刷新后会导致路由state参数的丢失！！！
			4.备注：HashRouter可以用于解决一些路径错误相关的问题。

## 十四、antd的按需引入+自定主题
			1.安装依赖：yarn add react-app-rewired customize-cra babel-plugin-import less less-loader
			2.修改package.json
					....
						"scripts": {
							"start": "react-app-rewired start",
							"build": "react-app-rewired build",
							"test": "react-app-rewired test",
							"eject": "react-scripts eject"
						},
					....
			3.根目录下创建config-overrides.js
					//配置具体的修改规则
					const { override, fixBabelImports,addLessLoader} = require('customize-cra');
					module.exports = override(
						fixBabelImports('import', {
							libraryName: 'antd',
							libraryDirectory: 'es',
							style: true,
						}),
						addLessLoader({
							lessOptions:{
								javascriptEnabled: true,
								modifyVars: { '@primary-color': 'green' },
							}
						}),
					);
				4.备注：不用在组件里亲自引入样式了，即：import 'antd/dist/antd.css'应该删掉

## 1.求和案例_redux精简版
		(1).去除Count组件自身的状态
		(2).src下建立:
						-redux
							-store.js
							-count_reducer.js

		(3).store.js：
					1).引入redux中的createStore函数，创建一个store
					2).createStore调用时要传入一个为其服务的reducer
					3).记得暴露store对象

		(4).count_reducer.js：
					1).reducer的本质是一个函数，接收：preState,action，返回加工后的状态
					2).reducer有两个作用：初始化状态，加工状态
					3).reducer被第一次调用时，是store自动触发的，
									传递的preState是undefined,
									传递的action是:{type:'@@REDUX/INIT_a.2.b.4}

		(5).在index.js中监测store中状态的改变，一旦发生改变重新渲染<App/>
				备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。


## 2.求和案例_redux完整版
		新增文件：
			1.count_action.js 专门用于创建action对象
			2.constant.js 放置容易写错的type值



## 3.求和案例_redux异步action版
		 (1).明确：延迟的动作不想交给组件自身，想交给action
		 (2).何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。
		 (3).具体编码：
		 			1).yarn add redux-thunk，并配置在store中
		 			2).创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
		 			3).异步任务有结果后，分发一个同步的action去真正操作数据。
		 (4).备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。





## 4.求和案例_react-redux基本使用
			(1).明确两个概念：
						1).UI组件:不能使用任何redux的api，只负责页面的呈现、交互等。
						2).容器组件：负责和redux通信，将结果交给UI组件。
			(2).如何创建一个容器组件————靠react-redux 的 connect函数
							connect(mapStateToProps,mapDispatchToProps)(UI组件)
								-mapStateToProps:映射状态，返回值是一个对象
								-mapDispatchToProps:映射操作状态的方法，返回值是一个对象
			(3).备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
			(4).备注2：mapDispatchToProps，也可以是一个对象


## 5.求和案例_react-redux优化
			(1).容器组件和UI组件整合一个文件
			(2).无需自己给容器组件传递store，给<App/>包裹一个<Provider store={store}>即可。
			(3).使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作。
			(4).mapDispatchToProps也可以简单的写成一个对象
			(5).一个组件要和redux“打交道”要经过哪几步？
							(1).定义好UI组件---不暴露
							(2).引入connect生成一个容器组件，并暴露，写法如下：
									connect(
										state => ({key:value}), //映射状态
										{key:xxxxxAction} //映射操作状态的方法
									)(UI组件)
							(4).在UI组件中通过this.props.xxxxxxx读取和操作状态



## 6.求和案例_react-redux数据共享版
			(1).定义一个Pserson组件，和Count组件通过redux共享数据。
			(2).为Person组件编写：reducer、action，配置constant常量。
			(3).重点：Person的reducer和Count的Reducer要使用combineReducers进行合并，
					合并后的总状态是一个对象！！！
			(4).交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”。

## 7.求和案例_react-redux开发者工具的使用
			(1).yarn add redux-devtools-extension
			(2).store中进行配置
					import {composeWithDevTools} from 'redux-devtools-extension'
					const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))

## 8.求和案例_react-redux最终版
			(1).所有变量名字要规范，尽量触发对象的简写形式。
			(2).reducers文件夹中，编写index.js专门用于汇总并暴露所有的reducer

## 1. setState

### setState更新状态的2种写法

```
	(1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
					
	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据, 
					要在第二个callback函数中读取
```



------



## 2. lazyLoad

### 路由组件的lazyLoad

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```



------



## 3. Hooks

#### 1. React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```


```js
export default function App() {
  const [visible, setVisible] = useState(true);

	// 5s后隐藏，会触发刷新
  setTimeout(() => {
    setVisible(false);
  }, 5000);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      {visible && <p>Start editing to see some magic happen :)</p>}
    </div>
  );
}
```

注意：
- useState方法使用的是覆盖的方式，因此在更新对象类型时，切记要合并旧的状态，否则旧的状态会丢失，
- useState使用后，会是页面重新render，因为其实就是this.setState的语法糖。

#### 4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

#### 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```



------



## 4. Fragment

### 使用

	<Fragment><Fragment>
	<></>

### 作用

> 可以不用必须有一个真实的DOM根标签了



<hr/>

## 5. Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

### 使用

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

	在应用开发中一般不用context, 一般都它的封装react插件



<hr/>


## 6. 组件优化

### Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render()
>
> 2. 只当前组件重新render(), 就会自动重新render子组件 ==> 效率低

### 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

### 原因

>  Component中的shouldComponentUpdate()总是返回true

### 解决

	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
	项目中一般使用PureComponent来优化



<hr/>


## 7. render props

### 如何向组件内部动态传入带内容的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <AA><BB/></AA>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构, 一般用render函数属性

### children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

### render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 



<hr/>

## 8. 错误边界

#### 理解：

错误边界：用来捕获后代组件错误，渲染出备用页面

#### 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

##### 使用方式：

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

## 9. 组件通信方式总结

#### 方式：

		props：
			(1).children props
			(2).render props
		消息订阅-发布：
			pubs-sub、event等等
		集中式管理：
			redux、dva等等
		conText:
			生产者-消费者模式

#### 组件间的关系

		父子组件：props
		兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)



## 注意

- 要接受react的不同，不要上来就向着vue改，要思考

### diff

- 使用索引作为key，当数据发生变化时，虚拟dom会重建，并不能有效利用之前已经纯在的虚拟dom；主要针对逆序添加或逆序删除等破坏顺序的操作会引发错误。
- 如果涉及到input输入的内容，数据会错乱。

## 脚手架

### public文件夹

- react创建的项目自动设置为git仓库了，还写了.gitignore
- %PUBLIC_URL%代表public文件夹的路径
- `<meta name="theme-color" content="#000000" />`仅用于配置浏览器页签+地址栏的颜色（仅支持安卓手机浏览器）
- `<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />`用于将指定网页添加到桌面上的图标
- `<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />` web应用也可以通过加个壳变成安卓或ios应用，而对应的配置文件就是通过manifest.json
- robots.text文件是给爬虫用的，指示爬虫哪些内容可以爬取，哪些不可以。其实就是爬虫协议

### src文件夹

- App.js，就是返回一个函数式组件，还可以是jsx，react会加载.js和.jsx两种资源文件
- App.css，样式文件
- index.css 是通用的样式，为了防止各组件样式冲突，可以采用模块化的方式，index.module.ccs，然后import cssModule1 from 'index.module.ccs'; 使用时就是直接cssModule1.test即可。
- index.js 文件 是webpack入口文件
- `<React.StrictMode>`主要用来检查组件里面的一些语法是否符合react最新的语法。
- reportWebVitals是使用web-vitals这个库，来检测页面性能的
- setUpTests.js是用于做组件测试，利用jest-dom


- ES7 React/Redux/GraphQL/React-Native snippets 这个插件提供很多代码片段，要善于使用

### todoList

- checkoutbox，默认选中用defaultChecked，这样后续就还可以更改，如果使用checked属性，则需要借助onChange事件；但需要注意defaultChecked只会在第一次使用时有效，后续状态变更了，还是需要从checked属性里获取值。类似的还有defaultValue和value
- 子组件给父组件传递数据，在vue中一般中emit，其实也可以直接通过props将父组件里的方法传进来，然后在子组件里调用，因为是引用类型，父组件里也就执行了，从而拿到数据
- 时间戳有可能重复，可以利用uui库，但比较大，可以使用更小的nanoid
- 引入东西的规范，第三方的尽量往上靠，自己的模块往后靠，样式放在最后。
- 状态在哪个组件里，操作状态的方法也在哪个组件里
- 在react中直接使用confirm类的方法时，可能出现警告，此时可以使用window.confirm

### ajax请求

- axios也是封装的XMLHttpRequest，但有了Promise的版本。
- feHelper chrome插件，可以将后台response.send返回的json数据自动格式化在浏览器窗口上，不用在复制到json.cn里了。
- 在react中解决跨域的一种简单方式，代理，在package.json里增加一行："proxy": "localhost:port"就可以了。比如本地express服务器开启一个3000端口，然后在5000端口的前端服务上请求3000这个肯定跨域，但如果增加一个"proxy": "localhost:5000"，则请求先会经过本地静态服务器处理，也就是3000端口的静态服务(比如可以获取index.html)；如果3000端口的前端服务没有，则会请求5000端口，从而绕过了跨域。也就是中间代理。。。缺点是只能配置一个后端地址。
- 其实上面的proxy只是http-proxy-middle的简写形式。因此可以在src里新增一个setupProxy.js文件，引入这个库，然后匹配规则转发到不同的服务器。注意这个文件名不能改，是react自动去找的文件名，专门用来设置代理。
- changeOrigin的作用，是服务器收到的请求头中host字段的值。其实是防止后端服务器对前端的host有校验，开是否通过源站还是代理服务器发出来的请求。
- pathRewrite的作用是先匹配带有xxx前缀的路径，匹配到后，再去掉前缀，因为后端地址上可能就没有这个前缀。
- 解构赋值还可以连续从子对象里继续解构如下：const { a: { aa: newAa }} = this，就是获取this.a.aa，同时重命名为了newAa
- 在react中多种场景下，就需要三元运算符了。

### 兄弟组件通信

- 订阅发布，利用PubSubJs这个库
- 还可以使用ros???
- axios
- fetch,xhr都是底层的实现，fetch支持promise，但可能有兼容性，关注分离的思想。

## 路由

### histroy

- 可以借助histroy这个库，

### react-router

### react-router-dom

- 家里买的小米或华为盒子就是路由器，然后路由器后面的网线接口就可以理解为路由。
- 印记中文，整合很多官网文档的中文版本
- Link相当于原生的a，这些Link标签需要用BrowserRouter等组件包括才行。但Link没有高亮效果，可以改为NavLink，还可以通过activeClassName来自定义高亮效果
- BrowserRouter，相当于路由器，里面具体的Link相当于跳转链接，而Route相当于具体的路由组件。这些都必须包裹在同一个路由器BroswerRouter(或者HashRouter)下，其实相当于vue中的router-view，包括下主应用。
- hash模式的路由，在#号后面的资源，后端服务器是获取不到的。
- 路由组件`<Route></Route>`其实就是每个路由匹配出来的component，路由器会给路由组件传递histroy,location，match等相关的信息，后续可以在组件constructor里打印测试。
- 标签体内部的值是作为props.children传到子组件里的。
- 一个path对应多个组件，则多个组件都会展示；按理说匹配完一个后，后来的就不应该再展示了。因此可以借助  react-router-dom里的Switch组件，就只展示匹配的第一个路由组件。
- 在react中，如果使用histroy模式，同时index.html里面引入的资源路径是相对路径时，在默写页面刷新时，这个资源可能加载不成功。。。因为路径错了，看下返回的资源即可。 可以改为绝对，或者使用%PUBLIC_URL%，或者使用hash模式，因为hash模式#号后面的路径不会发给后端服务器  
- 包安装器尽量不要混用安装，容易丢失资源；但启动时无所谓
- 正常情况下，如果给/a/b/c路径，可以匹配到/a路由组件；如果想严格匹配，可以使用extra开启严格匹配模式。也就是默认的模糊匹配，是否开启根据需要。比如要匹配二级路由就不要开启extra
- 进入首页，一般会默认一个路由组件，可以使用`<Redirect to="/home">`重定向组件，一般写在路由组件的最下方
- 动态路由，params方式需要声明/a/:id/:name接收，对应/a/12/josn这个路由，其实会将{ id:12, name: 'josn' }放在传给路由组件的对象的match属性上，其实类似vue中的params传参
- 动态路由，search方式，不需要声明如何接收。直接在props.loacation.search上。但不是对象模式，需要自己整理，也可以借助querystring这个库。（但需要注意获取到search是urlencoded编码的字符串）
- state参数，不会在url里显示，如下：`<Link to={{ pathname: 'xxx', state: { a: 'xx' } }}></Link>`，这种方式类似在vue中的this.$router.push({})，这种方式虽然在url里看不到，但刷新后依然可以保留参数，因为histroy对象上一直保留着呢。但对于hashRouter刷新后悔导致state参数丢失，因为没有利用histroy对象
- push,replace的方式，默认是push模式，想replace只需在组件上添加replace属性即可
- 上面的方式都是需要手动点击对应的组件才可以，那如果设置一个定时器5s后跳转呢？这就需要编程式导航，可以借助props.histroy.push上面的方法实现跳转。但一般组件的props上没有history对象。。。怎么办呢？可以给一般组件用withRouter组件包括一下，其实就是在组件导出时用react-router-dom里的withRouter包括一下，让一般组件具备路由组件所特有的api。withRouter是一个函数，返回新的组件

## react ui库

- 国外，material-ui
- 国内，ant-design

### 

- antd是使用less写的

- 按住option键，双击单词可以选择多个，然后再复制，比较方便

## redux

- dva等等也是集中式管理

### redux是什么

- 专门做状态管理的js库，但不仅仅是服务于react
- 但多数情况下与react配合使用
- 集中式管理react应用中多个组件共享的状态

- 读取redux的值，store.getState();
- 当state里的值发生变化时，需要store.subscribe(() => { this.setState() })
- 如果多个组件都需要订阅事件，可以将store的订阅放在index.jsx里了。 这样任何一个组件引起store的数据发生变化，都会触发订阅里的回调。从而触发从新渲染。。。不用考虑效率问题，因为有diff
- redux只负责数据的管理，页面的重新渲染需要自己渲染。
- redux可以有同步和异步action，异步action还得必须借助react中的applyMiddleware以及redux-thunk，。。。异步action的入参是dispatch

### react-redux

- react-redux是官方出的redux，目的就是更舒服的用redux，之前的redux并不是官方出的。 

react-redux的模型图：

- 所有的ui组件都应该被容器组件包裹。
- 容器组件才是真正与redux打交道的，里面可以随意的使用redux的api
- ui组件中不能使用任何redux的api
- 容器组件会传给ui组件一些状态或方法
- ui组件其实就是父容器组件接收props进而展示

- 容器组件并不是我们编写的普通组件，而是通过第三方库react-redux创建；可以理解为容器组件就是一个桥梁
- 桥梁连接的两侧分别是ui组件和store，
- 用react-redux中的connect函数关联ui组件和store
- react-redux的思想是连接，而不是之前常规父子组件的包裹。。。可能这是为函数式编程开启了大门吧。
- 使用了react-redux后，也不用在手动检测store的变化进而更新页面了。。。嚓嚓擦，封装的够狠。（这也是为何不自己创建容器组件的原因吧，因为connect函数实现了太多的功能）
- 如果不想每个都传到子组件，可以使用react-redux的provider组件，只需将传给子组件的对象传给provider就行。
- reduxer要求里面的操作是纯函数逻辑，如果采用shift或push这种改变数组的方式，就不是纯函数，因为改变了原数组。
- redux还有对应的调试工具：Redux DevTools，但还需要配合另外一个库redux-devtools-extension；利用这个开发工具就可以实现时间旅行了，牛逼啊
- 疯狂套娃
- 启动服务还可以借助一个serve库
- react中的lazy实现路由组件懒加载，当网速很慢时，需要用suspense组件兜底，其实就相当于过渡阶段的展示

### hooks

### 多级路由

- 点击一个链接，react的匹配顺序是从最开始注册的路由开始匹配，此时就需要父组件的模糊匹配。。。

## 一些点

- 在vue中显示和隐藏一个组件，可以使用v-if或者v-show，但在react中，因为没有模板，因此当为false时，需要返回null才表示隐藏组件。
- react hooks的由来，Hook 是 React 16.8 的新增特性。它可以**让你在不编写 class 的情况下使用 state 以及其他的 React 特性**。
  - 在组件之间复用状态逻辑很难
  - 复杂组件变得难以理解(比如分散在各个生命周期里的逻辑或状态等等)
  - class的行为古怪，比如this绑定，压缩效果差等

为了解决以上问题，Hook 使你在非 class 的情况下可以使用更多的 React 特性。其实说白了，hook的出现就是为了解决class组件的一些痛点。

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用
- useEffect hook的执行时机实在渲染完成后，有点类似vue中的nextTick。如果想在渲染前执行，则需要使用useLayoutEffect；当使用useEffect产生副作用后，想要清除这个副作用，则需要返回一个函数，函数内部就是清除副作用的逻辑（比如清除定时器）
- 因为hook主要用在函数组件中，函数组件本来是没有生命周期概念的，引入hook的原因之一也就是引入对应的生命周期，但又稍有不同，需要注意hook与生命周期钩子的对应关系。


- setState可以接收一个函数，函数有两个参数，参数一是旧的state对象，参数二是props对象，意味着无法直接拿到改变后的新值。
- 在react 类组件中定义的方法，需要显式的绑定this，因为this并不会继承，另外类组件里的方法，通常都希望引用组件的当前实例，所以可以使用bind或者直接定义一个箭头函数。还可以在html属性上使用箭头函数，箭头函数的作用就是从上层常规函数里获取this。但这个模式有个问题：就是组件每次渲染的时候，都会重新创建函数，如果子组件依赖这个函数则会相应的重新渲染。所以优先前两种方式绑定this

```js
// 箭头函数方式，必须显示传递事件对象e，因为箭头函数的入参其实继承至常规函数的入参
// 行内方式绑定函数的参数一就是事件对象
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// 下面的方式其实等价于this.deleteRow(id)，而且事件对象默认在最后一位传入
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

// 综上：在react中绑定的函数，其实是只是一个函数，而不像html里绑定的是函数的执行，如下
<button onClick={activateLasers}>
  Activate Lasers
</button>

<button onclick="activateLasers()">
  Activate Lasers
</button>
```


- 我们建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。
- componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行;(componentDidCatch生命周期可以捕获错误)
- 在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault 。
- React 事件与原生事件不完全相同。如果想了解更多，请查看 [SyntheticEvent](https://zh-hans.reactjs.org/docs/events.html) 参考指南。


```js
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```
此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。


```js
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {/* 注意这是注释的格式，另外就是注意下面的写法 */}
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

- 在组件的 render 方法中返回 null 并不会影响组件的生命周期。返回null就是不显示组件，但生命周期钩子依然会执行

- 这里使用了 ES6 计算属性名称的语法更新给定输入名称对应的 state 值

```js
this.setState({
  [name]: value
});
// 等同 ES5:
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

- 在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。

下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）

```js
// 其实就是vulue设置死了，所以改变不了
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
    // 但如果设置为null或undefined则可以编辑
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

在react中还有一种非受控组件，其实就是vue中的ref，数据改变后其实存储在本身的dom节点上，因此取值时也就可以直接获取dom节点上的值。

- 语义化的 HTML 是无障碍辅助功能网络应用的基础。 利用多种 HTML 元素来强化您网站中的信息通常可以使您直接获得无障碍辅助功能。

- 关于分包：当使用 Babel 时，你要确保 Babel 能够解析动态 import 语法而不是将其进行转换。对于这一要求你需要 @babel/plugin-syntax-dynamic-import 插件。

```js
// 这种语法，webpack并不会默认拆分包
import { add } from './math';
console.log(add(16, 26));

// 使用之后：
// 这种动态加载，因为是异步加载，因此必须拆分包
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

## 星河sdk

小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API。这一区别导致了前端开发非常熟悉的一些库，例如 jQuery、 Zepto 等，在小程序中是无法运行的。

同时 JSCore 的环境同 NodeJS 环境也是不尽相同，所以一些 NPM 的包在小程序中也是无法运行的。

### mpx接入星河小程序

目前mpx已经支持打出星河小程序的支持语法，即ddml、ddss、js、json文件

**注意：**mpx基础库2.6.76版本以上才支持ddml打包，2.6.76版本以下只能指定打包模式为wx，打包完成后参考微信原生项目进行接入

<!-- 导入橙心优选小程序dist包，报错信息 -->
<!-- Error: ENOENT: no such file or directory, open '/Users/didi/.dimina/builds/88830ab730da357226beb9352e2f2e68/__dist__/app/app-config.json'
at Object.openSync (fs.js:466:3)
at Object.func [as openSync] (electron/js2c/asar_bundle.js:5:1812)
at Object.readFileSync (fs.js:368:35)
at Object.e.readFileSync (electron/js2c/asar_bundle.js:5:8592)
at getFileContent (/Applications/星河开发者工具.app/Contents/Resources/app/app/app.js:2990:34)
at SimulatorSdkImpl._callee2$ (/Applications/星河开发者工具.app/Contents/Resources/app/app/app.js:3856:75)
at tryCatch (/Applications/星河开发者工具.app/Contents/Resources/app/node_modules/regenerator-runtime/runtime.js:63:40)
at Generator.invoke [as _invoke] (/Applications/星河开发者工具.app/Contents/Resources/app/node_modules/regenerator-runtime/runtime.js:294:22)
at Generator.next (/Applications/星河开发者工具.app/Contents/Resources/app/node_modules/regenerator-runtime/runtime.js:119:21)
at asyncGeneratorStep (/Applications/星河开发者工具.app/Contents/Resources/app/app/app.js:141:24)
at _next (/Applications/星河开发者工具.app/Contents/Resources/app/app/app.js:163:9)
at runMicrotasks (<anonymous>)
at processTicksAndRejections (internal/process/task_queues.js:97:5) -->

<!-- 导入原生项目时，提示：请使用1.4.4及以上版本基础库 -->

## 橙掌柜组件库工程化

### 包管理 lerna

将大型代码仓库分割成多个独立版本化的 软件包（package）对于代码共享来说非常有用。但是，如果某些更改 跨越了多个代码仓库的话将变得很 麻烦 并且难以跟踪，并且， 跨越多个代码仓库的测试将迅速变得非常复杂。

Lerna 是一个工具，它优化了使用 git 和 npm 管理多包存储库的工作流。

背景：
1. 将一个大的 package 分割成一些小的 packcage 便于分享，调试
2. 在多个 git 仓库中更改容易变得混乱且难以跟踪
3. 在多个 git 仓库中维护测试繁琐

问题一：假如有两个组件库，存在依赖的关系，目前联调是通过npm link的方式，性能并不好，时常出现卡顿的问题。

两种发布模式：
- Fixed/Locked mode (default)，发布时，所有包的版本都会更新，且一致
- Independent mode，独立模式，每个 package 都可以有自己的版本号。版本号维护在各自 package.json 的 version 中。每次发布前都会提示已经更改的包，以及建议的版本号或者自定义版本号。


- lerna list 可以查看当前项目下的package
- lerna link，类似npm link
- lerna add react --scope=xxx，代表我的react 依赖只安装在xxx 包名下面， 而不是全部都安装，如果需要全部安装的话， 则 lerna add react 即可
- 配置文件：lerna.json

[参考Lerna --多包存储管理工具（一）](https://segmentfault.com/a/1190000023954051)


### dumi 是一款为组件开发场景而生的文档工具，

dumi，中文发音嘟米，是一款为组件开发场景而生的文档工具，与 father 一起为开发者提供一站式的组件开发体验，**father 负责构建**，而 dumi 负责组件开发及组件文档生成。

配置：在项目根目录创建 .umirc.ts 或 config/config.ts 文件，都可对 dumi 进行配置：

```js
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'dumi',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site', // 用于设定文档的展现模式，默认为文档模式，配置为 site 时可无缝切换为站点模式。
  resolve: {
    includes: [
			// 配置 dumi 嗅探的文档目录，dumi 会尝试在配置的目录中递归寻找 markdown 文件，默认值为 docs 目录、src 目录（普通项目），
			// 如果环境为 lerna 项目，则 src 目录变为 packages/pkg/src 目录，通常不需要配置，除非自动嗅探出现了『误伤』。
      'packages/1/docs',
      'packages/Shorten/docs',
      'docs'
    ],
    excludes: [
      'packages/main'
    ]
  },
});
```

### 代码规范

在有了Husky赋能之后，我们有能力在Git的钩子里做一些事情，首先不得不提的是代码的提交规范和规范的校验，优雅的提交，方便团队协作和快速定位问题。首推Commitlint，另外@加神 推荐了Gitmoji也是一个很有意思的工具。

在项目的 .git/hooks 目录中，有一些 .sample 结尾的钩子示例脚本，如果想启用对应的钩子，只需手动删除后缀，即可。（删除某一个 hook 的后缀 .sample 即可启用该 hook 脚本，默认是不启用的。）

```
Git Hook	调用时机	说明
pre-applypatch	git am执行前	
applypatch-msg	git am执行前	
post-applypatch	git am执行后	不影响git am的结果
pre-commit	git commit执行前	可以用git commit --no-verify绕过
commit-msg	git commit执行前	可以用git commit --no-verify绕过
post-commit	git commit执行后	不影响git commit的结果
pre-merge-commit	git merge执行前	可以用git merge --no-verify绕过。
prepare-commit-msg	git commit执行后，编辑器打开之前	
pre-rebase	git rebase执行前	
post-checkout	git checkout或git switch执行后	如果不使用--no-checkout参数，则在git clone之后也会执行。
post-merge	git commit执行后	在执行git pull时也会被调用
pre-push	git push执行前	
pre-receive	git-receive-pack执行前	
update		
post-receive	git-receive-pack执行后	不影响git-receive-pack的结果
post-update	当 git-receive-pack对 git push 作出反应并更新仓库中的引用时	
push-to-checkout	当`git-receive-pack对git push做出反应并更新仓库中的引用时，以及当推送试图更新当前被签出的分支且receive.denyCurrentBranch配置被设置为updateInstead时	
pre-auto-gc	git gc --auto执行前	
post-rewrite	执行git commit --amend或git rebase时	
sendemail-validate	git send-email执行前	
fsmonitor-watchman	配置core.fsmonitor被设置为.git/hooks/fsmonitor-watchman或.git/hooks/fsmonitor-watchmanv2时	
p4-pre-submit	git-p4 submit执行前	可以用git-p4 submit --no-verify绕过
p4-prepare-changelist	git-p4 submit执行后，编辑器启动前	可以用git-p4 submit --no-verify绕过
p4-changelist	git-p4 submit执行并编辑完changelist message后	可以用git-p4 submit --no-verify绕过
p4-post-changelist	git-p4 submit执行后	
post-index-change	索引被写入到read-cache.c do_write_locked_index后	
```

【但是，我们一般不去改动 .git/hooks 里面的文件，因为我们使用 husky 】

假设你的 husky 安装是正常的，那么 husky 为你安装的 hooks 将会生效。这样我们在 **git commit 的时候会触发 pre-commit 钩子从而触发到 huksy**。

```json
"husky": {
	"hooks": {
		"pre-commit": "npm run lint", // 
		"commit-msg": "commitlint -e $GIT_PARAMS" // 使用commit-msg这个git hook来校验我们commit时添加的备注信息是否符合规范。
		// $GIT_PARAMS，这里是git的变量，意思是在’commit-msg’这个钩子内获取commit里的内容进行commitlint检测，如果果该钩子脚本以非零值退出，Git 将放弃提交
	}
}

// Git 钩子可以通过命令行参数和 stdin 获取参数。Husky （Husky）使它们可以通过 HUSKY_GIT_PARAMS 和 HUSKY_GIT_STDIN 环境变量进行访问。
// 参考：https://www.breword.com/typicode-husky
"commit-msg": "echo $HUSKY_GIT_PARAMS"
```

lint-staged 是一个在 git 暂存文件上（也就是被 git add 的文件）运行已配置的 linter（或其他）任务。lint-staged 总是将所有暂存文件的列表传递给任务。

```json
// 在 commit 之前，将暂存区的内容做一次 代码美化 和 代码检查，然后再添加到暂存区；然后再 commit，完美！！
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
	// 但是尽量不要使用prettier，因为会多出很多额外的问题
  "src/**/*.{js,vue}": ["prettier --write", "eslint --cache --fix", "git add"]
}
```

[参考husky为何放弃了传统的js配置](https://juejin.cn/post/7000186205224566791#heading-8)

prepare 是 NPM 操作生命周期中的一环，在执行 install 的时候会按生命周期顺序执行相应钩子：
NPM7： preinstall -> install -> postinstall -> prepublish -> preprepare -> prepare -> postprepare

综上利用：
1. 利用husky 配置 git hooks，
2. 然后在钩子里使用eslint对代码进行格式检查
3. 在git commit时再对提交的commit做格式校验，具体什么格式，就得有个规范比如是[commitlint](https://commitlint.js.org/#/) 


commitlint 校验提交信息，commitizen 辅助填写提交信息；在 Git 提交工作流程中，commitlint 作用于 commit-msg 阶段，commitizen作用于 pre-commit。互不干扰，各司其职，相辅相成。

[参考 commitlint 和 commitizen 共用规则配置](https://juejin.cn/post/6975836256441729032)

```json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint",
			"path": "config/cz-changelog/index.js" // 当然也可以使用我们自定义的，其实就是预设的规范集合，帮助我们生成commit message
    }
  }
}
```

[如何配置 Git Commit Message(字节)](https://zhuanlan.zhihu.com/p/69635847)
[让你的commit 更有价值](https://segmentfault.com/a/1190000023388007)

### 生成changeLog

### 提示组件库 plop

其实就是新建项目时，交互用的，命令式交互

配置文件就是根目录的：.plopfile.js



## react

react用于构建用户界面的js库，

发送数据，处理数据都不干，只做操作dom层面页面

原生的痛点：操作真实dom（每次都重建真实dom，成本高；虚拟dom会重用之前的？），没有组件化，

- 命令式编码 -》 声明式组件，提高了开发效率和组件复用率
- react-native 使用js编写ios或者adroid应用
- diff算法 + 虚拟dom

### react源码调试

由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿，因此提出了解决办法——用可中断的异步更新代替同步的更新。

- Reconciler(协调器)，负责找出变化的组件
- Renderer（渲染器），负责将变化的组件渲染到页面
- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler（react16引入）

在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记，整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

16.6ms内：js执行-》布局-》样式绘制
[输入字符越多，渲染的节点越多，越考验性能](https://codesandbox.io/s/concurrent-ibzkq)

将同步更新更换为可中断的异步更新

React16采用新的Reconciler，主要解决大任务可以分片，从而避免渲染大任务卡顿。 Reconciler内部采用了Fiber的架构。

Fiber并不是计算机术语中的新名词，他的中文翻译叫做纤程，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

在很多文章中将纤程理解为协程的一种实现。在JS中，协程的实现便是Generator。

所以，我们可以将纤程(Fiber)、协程(Generator)理解为代数效应思想在JS中的体现。

React Fiber可以理解为：

React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。

**其中每个任务更新单元为React Element对应的Fiber节点**。

我们了解了Fiber的起源与架构，其中Fiber节点可以构成Fiber树。那么Fiber树和页面呈现的DOM树有什么关系，React又是如何更新DOM的呢？
****

- 每一个函数组件用对应的函数组件的 fiber 对象去保存 hooks 信息。所以我们只能从 fiber找到线索。

### react入门

新建html，引入下面三个文件，直接操作：

- babel -》es6转es5，还可以解析import，jsx（转为js）等语法
- react：核心库
- react-dom：依赖react，操作dom

```html
<!-- 只在本地学习阶段使用，生产环境下，项目庞大，浏览器靠babel运行时解析很耗时 -->
<script type="text/babel">
    // 定义虚拟dom，右侧不是字符串，而是jsx，靠babel解析
    const vDom = <h1>hello,react</h1>

    React.render(vDom, document.getElementById('#app'))
</script>
```

### 虚拟dom的两种创建方式

 - 使用jsx，简洁方便
 - 使用js，React.createElement('h1', { id: 'titlt' }, 'hello, react')

因此使用jsx语法可以极大的减轻编码负担。虽然用jsx减轻了开发者的成本，但babel最终也会转为上面的js形式。

### 虚拟dom与真实dom

- 虚拟dom其实就是一般的Object对象而已。
- 比真实dom更加轻量。
- 虚拟dom最终会转为真实dom

### jsx的语法

- 全称javascript xml
- 一种类似xml的js扩展语法
- 本质是React.createElement()方法的语法糖
- 作用用来简化开发者创建虚拟dom

xml早期用于存储和传输数据，如下其实主要为了存储tom和17，多了很多东西，后来出现了更加方便的json数据格式

```xml
<student>
    <name>tom</name>
    <age>17</age>
</student>
```

语法规则：
- 虚拟dom，不要引号
- 混入js表达式需要{}，注意是表达式！！！。
- 样式的类名使用className
- 内敛样式不能是字符串，而是：style={{ key:value }}的形式
- jsx不能有多个根标签
- jsx里的标签必须闭合
- 小写标签都默认是html的同名标签，若html中没有该标签，则报错，但可以显示。
- 首字符大写的标签是自定义的组件。

### jsx小练习

- jsx如果接收一个数组，jsx会遍历渲染。但传入一个对象则不可以
- 表达式，一个表达式会产生一个值；判断是否为表达式，只需要用一个变量接收表达式的返回值即可，能接收到则为表达式

### react是面向组件编程

- 函数组件，名字首字母大写
- babel， 试一试，怎么增加es5的选项
- 函数组件被babel编译后，开启了严格模式，因此内部的this会指向undefined，整个函数都处在严格模式下

```js
class P {}
const p1 = new P();

console.log(p1);
// P {} ， 控制台的打印效果，P表示这个实例的类。后面的{}才是实例
// class里的this指向实例。
```

- 类中的构造器不是必须写的，
- 在react中，绑定函数只是将函数的引用赋值给了onClick等，并不是实例调用，因此会丢失一些信息。
- 类中的方法默认是开启了局部的严格模式，因此方法中的this会指向undefined
- 另外类中的render函数，之所以可以直接使用this，是因为react实例化组件后，通过实例调用的render方法，因此this并没有丢失
- 可以自己测试，实例化类组件，然后用实例去调用里面的非render方法，看看this就知道了。
- 在constructor里使用bind，其实相当于将原型上的方法绑定this后重新赋值到当前实例的同名属性上了，后续页面渲染变优先使用当前实例上的方法，然后才是原型上的。
- this.state是一个对象，然后setState用来更改state，当然还可以定义其他属性，比如peiqi等等

### props

- 展开运算符，主要用在数组上，但也可以使用在对象上，如下，需要{}语法，注意在react中只能使用在组件的属性传递中

```js
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// 克隆后的对象: { foo: "bar", x: 42 }
```
- 对组件的标签属性进行类型限制，需要引入独立的PropsTypes，在react中，这是一个独立的库

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 给组件的propTypes属性上添加，注意和PropTypes不容
Greeting.propTypes = {
  name: PropTypes.string
};

// 给类自身添加属性,而不是上面分开的写法
class Greeting extends React.Component {
    static propTypes = {
        name: PropTypes.string
    }
}

const p = { age: 1, name: 'jon' }
// 如下传递对象
ReactDOM.render(<Greeting {...p}/>, ele)
```

### 构造器

构造器默认接受props参数，并执行super(props)，这样的话才会在实例上使用this.props；如果写了constructor，但并没有传递props，则this.props是undefined

通常，在 React 中，构造函数仅用于以下两种情况：

- 通过给 this.state 赋值对象来初始化内部 state。
- 为事件处理函数绑定实例

### 函数式组件

- 是一个纯函数
- 没有自身状态，只接收外部数据
- 产出 VNode 的方式：单纯的函数调用

```jsx
// 参数一props
function Person (props) {
    const { name, age } = props;
    return (
        <div>
            <p>{name}</p>
            <p>{age}</p>
        </div>
    )
}
Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number.isRequired
}
Person.defaultProps = {};
```

### refs

- ref最终拿到的是真实dom
- ref可以支持字符串(效率低，react本身帮你收集到refs上)、回调函数(其实就是在函数内部，将元素挂在实例上，然后再获取)、
- 回调函数执行次数？更新时会执行两次，可以将方法直接定义在class的方法里，当然也无关紧要
- jsx中注释如何写，需要 { // } 或者 { /* xxx */ }才可以，注意想使用js的注释方式，必须在js的环境中，也就是{} 
- React.createRef() 返回一个容器，该容器可以存储被ref标识的节点，从current属性上获取元素节点。而且是专人专用，也就是一个节点需要建一个createRef()。。。react推荐这种方式，虽然繁琐

- 避免频繁使用ref，可以借助event.target，也就是操作的元素和绑定事件的元素是同一个

React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：
- 转发 refs 到 DOM 组件
- 在高阶组件中转发 refs
  
React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
在上述的示例中，React 会将 `<FancyButton ref={ref}>` 元素的 ref 作为第二个参数传递给 React.forwardRef 函数中的渲染函数。该渲染函数会将 ref 传递给 `<button ref={ref}>` 元素。

因此，当 React 附加了 ref 属性之后，ref.current 将直接指向 <button> DOM 元素实例。


- useImperativeHandle(ref, createHandle, [deps])
useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />;
}
FancyInput = forwardRef(FancyInput);
```
在本例中，渲染 <FancyInput ref={inputRef} /> 的父组件可以调用 inputRef.current.focus()。



### 事件

- react的事件命名onClick方式，是为了更好的兼容性
- react中的事件都是利用事件代理

### 非受控组件

- 现用现取

### 受控组件

- 其实就是通过state来维护一些变量，有点类似vue中的双向数据绑定
- #region，#endregion 放在注释的两头，可以起到折叠效果

### 高阶函数

- 若函数接收一个函数，则为高阶，如Promise,setTimeout，数组方法等
- 若函数返回一个函数，也是高阶

### 函数柯力化

- 函数调用继续返回函数，最后统一处理(一般是无法同时接收到多个参数才使用)

### 旧的生命周期

挂载：mount
卸载：unmout

- ReactDOM.unmountComponentAtNode(el)，卸载组件
- componentDidMount
- componentWillUnmount
- render

挂载时：
1. constructor 
2. componentWillMount
3. render
3. componentDidMount

父组件render更新时：
1. componentWillReceiveProps，这里主要是子组件接到props，页面第一次渲染不会执行该钩子，后续的更新才会执行
2. shouldComponentUpdate
3. componentWillUpdate
4. render
5. componentDidUpdate

setState时：
1. setState调用
2. shouldComponentUpdate，返回布尔值，true则继续往下走
3. componentWillUpdate
4. render
5. componentDidUpdate


forceUpdate调用时：
0. forceUpdate调用时：
1. componenetWillUpdate
2. render
3. componentDidUpdate

卸载组件时，ReactDOM.unmountComponentAtNode()触发：
1. componentWillUnmount，没有像vue中的destroyed钩子

- 至于第一次的钩子没有执行，应该是框架初始化时的逻辑，待核实？？？
- 在componentDidMount钩子里发送请求，执行一些初始化的操作，那在componentWillMount里可以拿到this.state吗？也是可以的，因此请求可以放在这里吧

### 新的生命周期

- 新版本下的react还可以使用旧的钩子，但会控制台警告，但如果在就钩子里前面加上：UNSAFE_ 就可以干掉警告了
- 只有三个带will的钩子，才需要加 UNSAFE_，除了componentWillUnmount不需要。
- 为什么加UNSAFE_呢？这些生命周期方法经常被误解和滥用；此外，我们预计，在异步渲染中，它们潜在的误用问题可能更大。我们将在即将发布的版本中为这些生命周期添加 “UNSAFE_” 前缀。（**这里的 “unsafe” 不是指安全性，而是表示使用这些生命周期的代码在 React 的未来版本中更有可能出现 bug，尤其是在启用异步渲染之后。**）[为什么加UNSAFE_](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)

挂载时：
1. constructor
2. getDerivedStateFromProps，而且这个钩子需要添加static，添加到类上。还必须返回null或状态对象（会影响后续渲染，主要用于state的状态后续完全取决于props，极少用）
3. render
4. componentDidMount

更新时：
1. getDerivedStateFromProps
2. shouldComponentUpdate
3. render
4. getSnapshotBeforeUpdate，需要返回快照(任何值都行)或null，
5. componentDidUpdate，有两个参数，preProps和preState，新的 getSnapshotBeforeUpdate 生命周期方法在更新之前（如：更新 DOM 之前）被调用。此生命周期的返回值将作为第三个参数传递给 componentDidUpdate。（通常不需要，但在重新渲染过程中手动保留滚动位置等情况下非常有用。）

卸载时：
1. componentWillUnmount

总结：
- 即将废弃三个钩子
- 两个新增的钩子（其实后续几乎不用）

## react常见问题集

### react事件机制

React并不是将click事件绑定到了div的真实DOM上，而是在document处监听了所有的事件，当事件发生并且冒泡到document处的时候，React将事件内容封装并交由真正的处理函数运行。这样的方式不仅仅减少了内存的消耗，还能在组件挂在销毁时统一订阅和移除事件。

实现合成事件的目的如下：

- 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力；
- 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。
  
### React的事件和普通的HTML事件有什么不同？

区别：
- 事件名称不同，原生是全小写，而react的是驼峰
- react的事件不能使用return false阻止浏览器的默认行为。必须使用evt.preventDefault()
- 对于事件函数处理语法，原生事件为字符串，react 事件为函数；

合成事件是react模拟原生dom事件所有能力的一个事件对象。优点如下

- 兼容所有浏览器，更好的跨平台；
- 将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）。
- 方便 react 统一管理和事务机制。

原生事件与合成事件执行顺序，原生先执行，合成事件会冒泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到document 上合成事件才会执行。

## mobx-react

react有很多状态管理的组件，比如Redux，Mobx，Jumpsuit，Alt.js等。

都支持将store与React组件连接，如react-redux，mobx-react；

Mobx和Redux都是JavaScript应用状态管理库，都适用于React，Angular，VueJs等框架或库，而不是局限于某一特定UI库。

但redux写起来还是不如mobx简单明了。

使用Redux和React应用连接时，需要使用react-redux提供的Provider和connect（这里也能）

1. Provider：负责将Store注入React应用；
2. connect：负责将store state注入容器组件，并选择特定状态作为容器组件props传递；

对于Mobx而言，同样需要两个步骤：

1. Provider：使用mobx-react提供的Provider将所有stores注入应用；
2. 使用inject将特定store注入某组件，store可以传递状态或action；然后使用observer保证组件能响应store中的可观察对象（observable）变更，即store更新，组件视图响应式更新。


mobx的流程图如上，通常是：触发action，在action中修改state，通过computed拿到state的计算值，自动触发对应的reactions，这里包含autorun，渲染视图等。有一点需要注意：相对于react来说，mobx没有一个全局的状态树，状态分散在各个独立的store中。mobx的工作原理非常简单，使用Object.defineProperty来拦截对数据的访问，一旦值发生变化，将会调用react的render方法来实现重新渲染视图的功能或者触发autorun等。

Mobx的实现思想和Vue几乎一样，所以其优点跟Vue也差不多：通过监听数据（对象、数组）的属性变化，可以通过直接在数据上更改就能触发UI的渲染，从而做到MVVM、响应式、上手成本低、开发效率高，在数据管理上需要再详细阐述下其区别。

Redux是建议全局唯一Store的，多个Reducers也会在传递给react-redux之前被合并成一个root reducer，任何数据的更改（通过Reducer）都会通过这一个store来触发整个UI树的重新渲染，如果不做任何的性能优化（pureRender等），就算VD(Virtual Dom)有了再高的效率提升，当页面数据量、DOM数量大了，性能消耗也是非常大的。另外一点，Redux实现的对数据的管理是pull方式的，就是说其只能等待应用派发某个行为（Action），然后重新触发UI的渲染，而做不到对行为的可预期；Mobx则不一样，他是基于监听数据的属性变化来实现的，而且是多store的，对于任何的数据变更都是第一时间知道的，所以其实现方式是基于push的监听订阅模式而实现，这样，他就可以做到对数据的可预测以及细粒度的控制，甚至可以通过修改React组件生命周期的方式来减少性能的消耗，而无需使用者对这些细节关心。当然这一切肯定是有了mobx对组件做observe操作才能实现的，所以也就有了observer用的越多，应用性能越高的说法。


### observer / observable

- observable是将数据改为响应式，这样的话，当数据发生变化时，就可以将@observer监测的组件自动更新。
- 而且正常的让react页面更新需要使用this.setState才可以，使用装饰器后，只需@observable xxx = 1; 然后@observer 整个组件即可。

- observer 函数/装饰器可以用来将 React 组件转变成响应式组件。 它用 mobx.autorun 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件。 observer 是由单独的 mobx-react 包提供的。
- `import { useLocalObservable, Observer } from 'mobx-react'`，当然除了函数observer，还有组件Observer

### inject/provide

- 下面的含义是，从根组件provider的store拿出这三个对象，然后作为props传给FormSearch。
```js
export default inject(
  'commonStore',
  'supplierLevelStore',
  'afterClassifyNewStore'
)(observer(FormSearch));
```

- Provider是mobx-react的组件，然后将store里所有的导出都传给子组件
```js
<Provider {...stores}>
	<ConfigProvider locale={zhCN}>
		<HashRouter>
			<MyRouter />
		</HashRouter>
	</ConfigProvider>
</Provider>,
```

- ConfigProvider是antd配置语言包的。

### @action vs @action.bound

action 装饰器/函数遵循 javascript 中标准的绑定规则。 但是，action.bound 可以用来自动地将动作绑定到目标对象。 注意，与 action 不同的是，(@)action.bound 不需要一个name参数，名称将始终基于动作绑定的属性。

```js
class Ticker {
  @observable tick = 0

  @action.bound
  increment() {
      this.tick++ // 'this' 永远都是正确的
  }

  // 等价于下面的
  @action
  increment = () => {

  }
}

const ticker = new Ticker()
setInterval(ticker.increment, 1000)
```

注意: **action.bound 不要和箭头函数一起使用；箭头函数已经是绑定过的并且不能重新绑定。**


### 装饰器

## react全家桶路线

因为你是想学React，所以我给你联系一个整体的路线，也相当于React全家桶。
- 首先React框架基础，直接根据官方文档学习最新的版本。
- 然后React router，也就是路由，学习最新的v4版本。
- 当你需要进行数据管理时，就可以学习redux或者mobx，不过大多数公司都是使用redux。
- 当你需要进行复杂的异步操作或者进行异步action时，就需要用到rxjs配合redux-observable或者redux-saga。
- 当然，你还需要掌握一套UI组件库的用法。推荐蚂蚁金服的ant design。

- 我是前天刚来的新同学，昨天把项目和权限跑起来，然后评审一个需求，看下react相关的东西
- 今天主要结合项目，

## react、react-dom
- react
- react-dom

React在v0.14之前是没有react-dom的，所有功能都包含在react里。从v0.14(2015-10)开始，react才被拆分成react和react-dom。为什么要把react和react-dom分开呢？因为有了react-native。react只包含了Web和Mobile通用的核心部分，负责Dom操作的分到react-dom中，负责Mobile的包含在react-native中。

## react-router、react-router-dom
- react-router
- react-router-dom

react-router:具有switch route router等方法 ，但無法透過操作DOM來跳轉

react-router-dom :是以react-router為核心，提供BrowserRouter 、Route Link等等 ，可以用操作DOM的方式來改變path

所以實際上我們只要引入react-router-dom即可來實作react-router的功能

```
"react-router-dom": "^5.1.2",
```

exact默认为false，如果为true时，需要和路由相同时才能匹配，但是如果有斜杠也是可以匹配上的。 如果在父路由中加了exact，是不能匹配子路由的,建议在子路由中加exact

strict默认为false，如果为true时，路由后面有斜杠而url中没有斜杠，是不匹配的

## mobx、

其实@observable key = value; 只是extendObservable(this, { key: value })的语法糖。因此在ES5环境下你也能使用

## 一些点

- 安装pretter即可格式化 vscode里的代码。

## 一、todoList案例相关知识点
		1.拆分组件、实现静态组件，注意：className、style的写法
		2.动态初始化列表，如何确定将数据放在哪个组件的state中？
					——某个组件使用：放在其自身的state中
					——某些组件使用：放在他们共同的父组件state中（官方称此操作为：状态提升）
		3.关于父子之间通信：
				1.【父组件】给【子组件】传递数据：通过props传递
				2.【子组件】给【父组件】传递数据：通过props传递，要求父提前给子传递一个函数
		4.注意defaultChecked 和 checked的区别，类似的还有：defaultValue 和 value
		5.状态在哪里，操作状态的方法就在哪里

## 二、github搜索案例相关知识点
		1.设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办。
		2.ES6小知识点：解构赋值+重命名
					let obj = {a:{b:1}}
					const {a} = obj; //传统解构赋值
					const {a:{b}} = obj; //连续解构赋值
					const {a:{b:value}} = obj; //连续解构赋值+重命名
		3.消息订阅与发布机制
					1.先订阅，再发布（理解：有一种隔空对话的感觉）
					2.适用于任意组件间通信
					3.要在组件的componentWillUnmount中取消订阅
		4.fetch发送请求（关注分离的设计思想）
					try {
						const response= await fetch(`/api1/search/users2?q=${keyWord}`)
						const data = await response.json()
						console.log(data);
					} catch (error) {
						console.log('请求出错',error);
					}
				

## 三、路由的基本使用
			1.明确好界面中的导航区、展示区
			2.导航区的a标签改为Link标签
						<Link to="/xxxxx">Demo</Link>
			3.展示区写Route标签进行路径的匹配
						<Route path='/xxxx' component={Demo}/>
			4.<App>的最外侧包裹了一个<BrowserRouter>或<HashRouter>

## 四、路由组件与一般组件
			1.写法不同：
						一般组件：<Demo/>
						路由组件：<Route path="/demo" component={Demo}/>
			2.存放位置不同：
						一般组件：components
						路由组件：pages
			3.接收到的props不同：
						一般组件：写组件标签时传递了什么，就能收到什么
						路由组件：接收到三个固定的属性
											history:
														go: ƒ go(n)
														goBack: ƒ goBack()
														goForward: ƒ goForward()
														push: ƒ push(path, state)
														replace: ƒ replace(path, state)
											location:
														pathname: "/about"
														search: ""
														state: undefined
											match:
														params: {}
														path: "/about"
														url: "/about"

## 五、NavLink与封装NavLink
				1.NavLink可以实现路由链接的高亮，通过activeClassName指定样式名

## 六、Switch的使用
				1.通常情况下，path和component是一一对应的关系。
				2.Switch可以提高路由匹配效率(单一匹配)。

## 七、解决多级路径刷新页面样式丢失的问题
				1.public/index.html 中 引入样式时不写 ./ 写 / （常用）
				2.public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
				3.使用HashRouter

## 八、路由的严格匹配与模糊匹配
				1.默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
				2.开启严格匹配：<Route exact={true} path="/about" component={About}/>
				3.严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

## 九、Redirect的使用	
				1.一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
				2.具体编码：
						<Switch>
							<Route path="/about" component={About}/>
							<Route path="/home" component={Home}/>
							<Redirect to="/about"/>
						</Switch>

## 十、嵌套路由
				1.注册子路由时要写上父路由的path值
				2.路由的匹配是按照注册路由的顺序进行的

## 十一、向路由组件传递参数
				1.params参数
							路由链接(携带参数)：<Link to='/demo/test/tom/18'}>详情</Link>
							注册路由(声明接收)：<Route path="/demo/test/:name/:age" component={Test}/>
							接收参数：this.props.match.params
				2.search参数
							路由链接(携带参数)：<Link to='/demo/test?name=tom&age=18'}>详情</Link>
							注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
							接收参数：this.props.location.search
							备注：获取到的search是urlencoded编码字符串，需要借助querystring解析
				3.state参数
							路由链接(携带参数)：<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
							注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
							接收参数：this.props.location.state
							备注：刷新也可以保留住参数
				


## 十二、编程式路由导航
					借助this.prosp.history对象上的API对操作路由跳转、前进、后退
							-this.prosp.history.push()
							-this.prosp.history.replace()
							-this.prosp.history.goBack()
							-this.prosp.history.goForward()
							-this.prosp.history.go()

## 十三、BrowserRouter与HashRouter的区别
			1.底层原理不一样：
						BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
						HashRouter使用的是URL的哈希值。
			2.path表现形式不一样
						BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
						HashRouter的路径包含#,例如：localhost:3000/#/demo/test
			3.刷新后对路由state参数的影响
						(1).BrowserRouter没有任何影响，因为state保存在history对象中。
						(2).HashRouter刷新后会导致路由state参数的丢失！！！
			4.备注：HashRouter可以用于解决一些路径错误相关的问题。

## 十四、antd的按需引入+自定主题
			1.安装依赖：yarn add react-app-rewired customize-cra babel-plugin-import less less-loader
			2.修改package.json
					....
						"scripts": {
							"start": "react-app-rewired start",
							"build": "react-app-rewired build",
							"test": "react-app-rewired test",
							"eject": "react-scripts eject"
						},
					....
			3.根目录下创建config-overrides.js
					//配置具体的修改规则
					const { override, fixBabelImports,addLessLoader} = require('customize-cra');
					module.exports = override(
						fixBabelImports('import', {
							libraryName: 'antd',
							libraryDirectory: 'es',
							style: true,
						}),
						addLessLoader({
							lessOptions:{
								javascriptEnabled: true,
								modifyVars: { '@primary-color': 'green' },
							}
						}),
					);
				4.备注：不用在组件里亲自引入样式了，即：import 'antd/dist/antd.css'应该删掉

## 1.求和案例_redux精简版
		(1).去除Count组件自身的状态
		(2).src下建立:
						-redux
							-store.js
							-count_reducer.js

		(3).store.js：
					1).引入redux中的createStore函数，创建一个store
					2).createStore调用时要传入一个为其服务的reducer
					3).记得暴露store对象

		(4).count_reducer.js：
					1).reducer的本质是一个函数，接收：preState,action，返回加工后的状态
					2).reducer有两个作用：初始化状态，加工状态
					3).reducer被第一次调用时，是store自动触发的，
									传递的preState是undefined,
									传递的action是:{type:'@@REDUX/INIT_a.2.b.4}

		(5).在index.js中监测store中状态的改变，一旦发生改变重新渲染<App/>
				备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。


## 2.求和案例_redux完整版
		新增文件：
			1.count_action.js 专门用于创建action对象
			2.constant.js 放置容易写错的type值



## 3.求和案例_redux异步action版
		 (1).明确：延迟的动作不想交给组件自身，想交给action
		 (2).何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。
		 (3).具体编码：
		 			1).yarn add redux-thunk，并配置在store中
		 			2).创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
		 			3).异步任务有结果后，分发一个同步的action去真正操作数据。
		 (4).备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。





## 4.求和案例_react-redux基本使用
			(1).明确两个概念：
						1).UI组件:不能使用任何redux的api，只负责页面的呈现、交互等。
						2).容器组件：负责和redux通信，将结果交给UI组件。
			(2).如何创建一个容器组件————靠react-redux 的 connect函数
							connect(mapStateToProps,mapDispatchToProps)(UI组件)
								-mapStateToProps:映射状态，返回值是一个对象
								-mapDispatchToProps:映射操作状态的方法，返回值是一个对象
			(3).备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
			(4).备注2：mapDispatchToProps，也可以是一个对象


## 5.求和案例_react-redux优化
			(1).容器组件和UI组件整合一个文件
			(2).无需自己给容器组件传递store，给<App/>包裹一个<Provider store={store}>即可。
			(3).使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作。
			(4).mapDispatchToProps也可以简单的写成一个对象
			(5).一个组件要和redux“打交道”要经过哪几步？
							(1).定义好UI组件---不暴露
							(2).引入connect生成一个容器组件，并暴露，写法如下：
									connect(
										state => ({key:value}), //映射状态
										{key:xxxxxAction} //映射操作状态的方法
									)(UI组件)
							(4).在UI组件中通过this.props.xxxxxxx读取和操作状态



## 6.求和案例_react-redux数据共享版
			(1).定义一个Pserson组件，和Count组件通过redux共享数据。
			(2).为Person组件编写：reducer、action，配置constant常量。
			(3).重点：Person的reducer和Count的Reducer要使用combineReducers进行合并，
					合并后的总状态是一个对象！！！
			(4).交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”。

## 7.求和案例_react-redux开发者工具的使用
			(1).yarn add redux-devtools-extension
			(2).store中进行配置
					import {composeWithDevTools} from 'redux-devtools-extension'
					const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))

## 8.求和案例_react-redux最终版
			(1).所有变量名字要规范，尽量触发对象的简写形式。
			(2).reducers文件夹中，编写index.js专门用于汇总并暴露所有的reducer

## 1. setState

### setState更新状态的2种写法

```
	(1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
					
	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据, 
					要在第二个callback函数中读取
```



------



## 2. lazyLoad

### 路由组件的lazyLoad

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```



------



## 3. Hooks

#### 1. React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```


```js
export default function App() {
  const [visible, setVisible] = useState(true);

	// 5s后隐藏，会触发刷新
  setTimeout(() => {
    setVisible(false);
  }, 5000);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      {visible && <p>Start editing to see some magic happen :)</p>}
    </div>
  );
}
```

注意：
- useState方法使用的是覆盖的方式，因此在更新对象类型时，切记要合并旧的状态，否则旧的状态会丢失，
- useState使用后，会是页面重新render，因为其实就是this.setState的语法糖。

#### 4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

#### 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```



------



## 4. Fragment

### 使用

	<Fragment><Fragment>
	<></>

### 作用

> 可以不用必须有一个真实的DOM根标签了



<hr/>

## 5. Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

### 使用

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

	在应用开发中一般不用context, 一般都它的封装react插件



<hr/>


## 6. 组件优化

### Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render()
>
> 2. 只当前组件重新render(), 就会自动重新render子组件 ==> 效率低

### 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

### 原因

>  Component中的shouldComponentUpdate()总是返回true

### 解决

	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
	项目中一般使用PureComponent来优化



<hr/>


## 7. render props

### 如何向组件内部动态传入带内容的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <AA><BB/></AA>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构, 一般用render函数属性

### children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

### render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 



<hr/>

## 8. 错误边界

#### 理解：

错误边界：用来捕获后代组件错误，渲染出备用页面

#### 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

##### 使用方式：

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

// 如果某个组件定义了 componentDidCatch，那么这个组件中所有的子组件在渲染过程中抛出异常时，这个 componentDidCatch 函数就会被调用。
componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}

// componentDidCatch 可以捕获异常，它接受两个参数：
// 1 error —— 抛出的错误。
// 2 info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。

// componentDidCatch原理应该很好理解，内部可以通过try{}catch(error){}来捕获渲染错误，处理渲染错误。
try {
  //尝试渲染子组件
} catch (error) {
  // 出现错误，componentDidCatch被调用，
}
```

## 9. 组件通信方式总结

#### 方式：

		props：
			(1).children props
			(2).render props
		消息订阅-发布：
			pubs-sub、event等等
		集中式管理：
			redux、dva等等
		conText:
			生产者-消费者模式

#### 组件间的关系

		父子组件：props
		兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)



## 注意

- 要接受react的不同，不要上来就向着vue改，要思考

### diff

- 使用索引作为key，当数据发生变化时，虚拟dom会重建，并不能有效利用之前已经纯在的虚拟dom；主要针对逆序添加或逆序删除等破坏顺序的操作会引发错误。
- 如果涉及到input输入的内容，数据会错乱。

## 脚手架

### public文件夹

- react创建的项目自动设置为git仓库了，还写了.gitignore
- %PUBLIC_URL%代表public文件夹的路径
- `<meta name="theme-color" content="#000000" />`仅用于配置浏览器页签+地址栏的颜色（仅支持安卓手机浏览器）
- `<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />`用于将指定网页添加到桌面上的图标
- `<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />` web应用也可以通过加个壳变成安卓或ios应用，而对应的配置文件就是通过manifest.json
- robots.text文件是给爬虫用的，指示爬虫哪些内容可以爬取，哪些不可以。其实就是爬虫协议

### src文件夹

- App.js，就是返回一个函数式组件，还可以是jsx，react会加载.js和.jsx两种资源文件
- App.css，样式文件
- index.css 是通用的样式，为了防止各组件样式冲突，可以采用模块化的方式，index.module.ccs，然后import cssModule1 from 'index.module.ccs'; 使用时就是直接cssModule1.test即可。
- index.js 文件 是webpack入口文件
- `<React.StrictMode>`主要用来检查组件里面的一些语法是否符合react最新的语法。
- reportWebVitals是使用web-vitals这个库，来检测页面性能的
- setUpTests.js是用于做组件测试，利用jest-dom


- ES7 React/Redux/GraphQL/React-Native snippets 这个插件提供很多代码片段，要善于使用

### todoList

- checkoutbox，默认选中用defaultChecked，这样后续就还可以更改，如果使用checked属性，则需要借助onChange事件；但需要注意defaultChecked只会在第一次使用时有效，后续状态变更了，还是需要从checked属性里获取值。类似的还有defaultValue和value
- 子组件给父组件传递数据，在vue中一般中emit，其实也可以直接通过props将父组件里的方法传进来，然后在子组件里调用，因为是引用类型，父组件里也就执行了，从而拿到数据
- 时间戳有可能重复，可以利用uui库，但比较大，可以使用更小的nanoid
- 引入东西的规范，第三方的尽量往上靠，自己的模块往后靠，样式放在最后。
- 状态在哪个组件里，操作状态的方法也在哪个组件里
- 在react中直接使用confirm类的方法时，可能出现警告，此时可以使用window.confirm

### ajax请求

- axios也是封装的XMLHttpRequest，但有了Promise的版本。
- feHelper chrome插件，可以将后台response.send返回的json数据自动格式化在浏览器窗口上，不用在复制到json.cn里了。
- 在react中解决跨域的一种简单方式，代理，在package.json里增加一行："proxy": "localhost:port"就可以了。比如本地express服务器开启一个3000端口，然后在5000端口的前端服务上请求3000这个肯定跨域，但如果增加一个"proxy": "localhost:5000"，则请求先会经过本地静态服务器处理，也就是3000端口的静态服务(比如可以获取index.html)；如果3000端口的前端服务没有，则会请求5000端口，从而绕过了跨域。也就是中间代理。。。缺点是只能配置一个后端地址。
- 其实上面的proxy只是http-proxy-middle的简写形式。因此可以在src里新增一个setupProxy.js文件，引入这个库，然后匹配规则转发到不同的服务器。注意这个文件名不能改，是react自动去找的文件名，专门用来设置代理。
- changeOrigin的作用，是服务器收到的请求头中host字段的值。其实是防止后端服务器对前端的host有校验，开是否通过源站还是代理服务器发出来的请求。
- pathRewrite的作用是先匹配带有xxx前缀的路径，匹配到后，再去掉前缀，因为后端地址上可能就没有这个前缀。
- 解构赋值还可以连续从子对象里继续解构如下：const { a: { aa: newAa }} = this，就是获取this.a.aa，同时重命名为了newAa
- 在react中多种场景下，就需要三元运算符了。

### 兄弟组件通信

- 订阅发布，利用PubSubJs这个库
- 还可以使用ros???
- axios
- fetch,xhr都是底层的实现，fetch支持promise，但可能有兼容性，关注分离的思想。

## 路由

### histroy

- 可以借助histroy这个库，

### react-router

### react-router-dom

- 家里买的小米或华为盒子就是路由器，然后路由器后面的网线接口就可以理解为路由。
- 印记中文，整合很多官网文档的中文版本
- Link相当于原生的a，这些Link标签需要用BrowserRouter等组件包括才行。但Link没有高亮效果，可以改为NavLink，还可以通过activeClassName来自定义高亮效果
- BrowserRouter，相当于路由器，里面具体的Link相当于跳转链接，而Route相当于具体的路由组件。这些都必须包裹在同一个路由器BroswerRouter(或者HashRouter)下，其实相当于vue中的router-view，包括下主应用。
- hash模式的路由，在#号后面的资源，后端服务器是获取不到的。
- 路由组件`<Route></Route>`其实就是每个路由匹配出来的component，路由器会给路由组件传递histroy,location，match等相关的信息，后续可以在组件constructor里打印测试。
- 标签体内部的值是作为props.children传到子组件里的。
- 一个path对应多个组件，则多个组件都会展示；按理说匹配完一个后，后来的就不应该再展示了。因此可以借助  react-router-dom里的Switch组件，就只展示匹配的第一个路由组件。
- 在react中，如果使用histroy模式，同时index.html里面引入的资源路径是相对路径时，在默写页面刷新时，这个资源可能加载不成功。。。因为路径错了，看下返回的资源即可。 可以改为绝对，或者使用%PUBLIC_URL%，或者使用hash模式，因为hash模式#号后面的路径不会发给后端服务器  
- 包安装器尽量不要混用安装，容易丢失资源；但启动时无所谓
- 正常情况下，如果给/a/b/c路径，可以匹配到/a路由组件；如果想严格匹配，可以使用extra开启严格匹配模式。也就是默认的模糊匹配，是否开启根据需要。比如要匹配二级路由就不要开启extra
- 进入首页，一般会默认一个路由组件，可以使用`<Redirect to="/home">`重定向组件，一般写在路由组件的最下方
- 动态路由，params方式需要声明/a/:id/:name接收，对应/a/12/josn这个路由，其实会将{ id:12, name: 'josn' }放在传给路由组件的对象的match属性上，其实类似vue中的params传参
- 动态路由，search方式，不需要声明如何接收。直接在props.loacation.search上。但不是对象模式，需要自己整理，也可以借助querystring这个库。（但需要注意获取到search是urlencoded编码的字符串）
- state参数，不会在url里显示，如下：`<Link to={{ pathname: 'xxx', state: { a: 'xx' } }}></Link>`，这种方式类似在vue中的this.$router.push({})，这种方式虽然在url里看不到，但刷新后依然可以保留参数，因为histroy对象上一直保留着呢。但对于hashRouter刷新后悔导致state参数丢失，因为没有利用histroy对象
- push,replace的方式，默认是push模式，想replace只需在组件上添加replace属性即可
- 上面的方式都是需要手动点击对应的组件才可以，那如果设置一个定时器5s后跳转呢？这就需要编程式导航，可以借助props.histroy.push上面的方法实现跳转。但一般组件的props上没有history对象。。。怎么办呢？可以给一般组件用withRouter组件包括一下，其实就是在组件导出时用react-router-dom里的withRouter包括一下，让一般组件具备路由组件所特有的api。withRouter是一个函数，返回新的组件

## react ui库

- 国外，material-ui
- 国内，ant-design

### 

- antd是使用less写的

- 按住option键，双击单词可以选择多个，然后再复制，比较方便

## redux

- dva等等也是集中式管理

### redux是什么

- 专门做状态管理的js库，但不仅仅是服务于react
- 但多数情况下与react配合使用
- 集中式管理react应用中多个组件共享的状态

- 读取redux的值，store.getState();
- 当state里的值发生变化时，需要store.subscribe(() => { this.setState() })
- 如果多个组件都需要订阅事件，可以将store的订阅放在index.jsx里了。 这样任何一个组件引起store的数据发生变化，都会触发订阅里的回调。从而触发从新渲染。。。不用考虑效率问题，因为有diff
- redux只负责数据的管理，页面的重新渲染需要自己渲染。
- redux可以有同步和异步action，异步action还得必须借助react中的applyMiddleware以及redux-thunk，。。。异步action的入参是dispatch

### react-redux

- react-redux是官方出的redux，目的就是更舒服的用redux，之前的redux并不是官方出的。 

react-redux的模型图：

- 所有的ui组件都应该被容器组件包裹。
- 容器组件才是真正与redux打交道的，里面可以随意的使用redux的api
- ui组件中不能使用任何redux的api
- 容器组件会传给ui组件一些状态或方法
- ui组件其实就是父容器组件接收props进而展示

- 容器组件并不是我们编写的普通组件，而是通过第三方库react-redux创建；可以理解为容器组件就是一个桥梁
- 桥梁连接的两侧分别是ui组件和store，
- 用react-redux中的connect函数关联ui组件和store
- react-redux的思想是连接，而不是之前常规父子组件的包裹。。。可能这是为函数式编程开启了大门吧。
- 使用了react-redux后，也不用在手动检测store的变化进而更新页面了。。。嚓嚓擦，封装的够狠。（这也是为何不自己创建容器组件的原因吧，因为connect函数实现了太多的功能）
- 如果不想每个都传到子组件，可以使用react-redux的provider组件，只需将传给子组件的对象传给provider就行。
- reduxer要求里面的操作是纯函数逻辑，如果采用shift或push这种改变数组的方式，就不是纯函数，因为改变了原数组。
- redux还有对应的调试工具：Redux DevTools，但还需要配合另外一个库redux-devtools-extension；利用这个开发工具就可以实现时间旅行了，牛逼啊
- 疯狂套娃
- 启动服务还可以借助一个serve库
- react中的lazy实现路由组件懒加载，当网速很慢时，需要用suspense组件兜底，其实就相当于过渡阶段的展示

### hooks

### 多级路由

- 点击一个链接，react的匹配顺序是从最开始注册的路由开始匹配，此时就需要父组件的模糊匹配。。。

## 一些点

```js
function Index({ offset }){
    const card  = React.useRef(null)
    React.useEffect(()=>{
       card.current.style.left = offset
    },[])
    return <div className='box' >
        <div className='card custom' ref={card}   >《 React进阶实践指南 》</div>
    </div>
}

export default function Home({ offset = '300px' }){
   const [ isRender , setRender ] = React.useState(false)
   return <div>
       { isRender && <Index offset={offset}  /> }
       <button onClick={ ()=>setRender(true) } > 挂载</button>
   </div>
}
```

useEffect 的第一个参数 create，**采用的异步调用的方式**，那么闪现就很好理解了，在点击按钮组件第一次渲染过程中，首先执行函数组件render，然后commit替换真实dom节点,然后浏览器绘制完毕。此时浏览器已经绘制了一次，然后浏览器有空余时间执行异步任务，所以执行了create，修改了元素的位置信息，因为上一次元素已经绘制，此时又修改了一个位置，所以感到闪现的效果，此案已破。，

那么我们怎么样解决闪现的现象呢，那就是 React.useLayoutEffect ，useLayoutEffect的 create是同步执行的，所以浏览器绘制一次，直接更新了最新的位置。


- 在vue中显示和隐藏一个组件，可以使用v-if或者v-show，但在react中，因为没有模板，因此当为false时，需要返回null才表示隐藏组件。
- react hooks的由来，Hook 是 React 16.8 的新增特性。它可以**让你在不编写 class 的情况下使用 state 以及其他的 React 特性**。
  - 在组件之间复用状态逻辑很难
  - 复杂组件变得难以理解(比如分散在各个生命周期里的逻辑或状态等等)
  - class的行为古怪，比如this绑定，压缩效果差等

为了解决以上问题，Hook 使你在非 class 的情况下可以使用更多的 React 特性。其实说白了，hook的出现就是为了解决class组件的一些痛点。

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用
- useEffect hook的执行时机实在渲染完成后，有点类似vue中的nextTick。如果想在渲染前执行，则需要使用useLayoutEffect；当使用useEffect产生副作用后，想要清除这个副作用，则需要返回一个函数，函数内部就是清除副作用的逻辑（比如清除定时器）
- 因为hook主要用在函数组件中，函数组件本来是没有生命周期概念的，引入hook的原因之一也就是引入对应的生命周期，但又稍有不同，需要注意hook与生命周期钩子的对应关系。


- setState可以接收一个函数，函数有两个参数，参数一是旧的state对象，参数二是props对象，意味着无法直接拿到改变后的新值。
- 在react 类组件中定义的方法，需要显式的绑定this，因为this并不会继承，另外类组件里的方法，通常都希望引用组件的当前实例，所以可以使用bind或者直接定义一个箭头函数。还可以在html属性上使用箭头函数，箭头函数的作用就是从上层常规函数里获取this。但这个模式有个问题：就是组件每次渲染的时候，都会重新创建函数，如果子组件依赖这个函数则会相应的重新渲染。所以优先前两种方式绑定this

```js
// 箭头函数方式，必须显示传递事件对象e，因为箭头函数的入参其实继承至常规函数的入参
// 行内方式绑定函数的参数一就是事件对象
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// 下面的方式其实等价于this.deleteRow(id)，而且事件对象默认在最后一位传入
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

// 综上：在react中绑定的函数，其实是只是一个函数，而不像html里绑定的是函数的执行，如下
<button onClick={activateLasers}>
  Activate Lasers
</button>

<button onclick="activateLasers()">
  Activate Lasers
</button>
```


- 我们建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。
- componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行;(componentDidCatch生命周期可以捕获错误)
- 在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault 。
- React 事件与原生事件不完全相同。如果想了解更多，请查看 [SyntheticEvent](https://zh-hans.reactjs.org/docs/events.html) 参考指南。


```js
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```
此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。




```js
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {/* 注意这是注释的格式，另外就是注意下面的写法 */}
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

- 在组件的 render 方法中返回 null 并不会影响组件的生命周期。返回null就是不显示组件，但生命周期钩子依然会执行

- 这里使用了 ES6 计算属性名称的语法更新给定输入名称对应的 state 值

```js
this.setState({
  [name]: value
});
// 等同 ES5:
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

- 在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。

下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）

```js
// 其实就是vulue设置死了，所以改变不了
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
    // 但如果设置为null或undefined则可以编辑
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

在react中还有一种非受控组件，其实就是vue中的ref，数据改变后其实存储在本身的dom节点上，因此取值时也就可以直接获取dom节点上的值。

- 语义化的 HTML 是无障碍辅助功能网络应用的基础。 利用多种 HTML 元素来强化您网站中的信息通常可以使您直接获得无障碍辅助功能。

- 关于分包：当使用 Babel 时，你要确保 Babel 能够解析动态 import 语法而不是将其进行转换。对于这一要求你需要 @babel/plugin-syntax-dynamic-import 插件。

```js
// 这种语法，webpack并不会默认拆分包
import { add } from './math';
console.log(add(16, 26));

// 使用之后：
// 这种动态加载，因为是异步加载，因此必须拆分包
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```