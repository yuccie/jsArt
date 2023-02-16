## 其他

```
业绩
整体：
思路清晰，开发代码迅速，大部分代码质量较高，但出现了3次明显线上问题，还需更严谨一些。
做得好的：
（1）做事很有自己的想法，并时而跟随需求对部分代码逻辑进行优化。
（2）平时会主动去了解和学习新东西（离线包、研发/容器云、kswitch、容器相关、性能优化等）
（3）开发需求较迅速、即使多个需求并行，也能很好的把控各个时间点，不延期，bug数可控。
（4）平时开发涉及到多个项目，都能很快上手并介入开发。
有待提高：
（1）一次上线中，将PX改为了px，线上样式出现一些问题。
（2）一次上线中，由于加了reentry但是没有足够的验证和测试，导致返回到当前webview会重复上报埋点，进而导致页面pv提升20%左右。
（3）一次上线中，修改了指令的引入为require.context导致build后多出10多个js，线上多出很多无用资源。
（4）脾气有时候稍稍有点急（无事）。
（5）合并代码解决冲突时不够重视和严谨，经常独自完成，好几次都是我在cr时发现合并代码问题，并及时提出，否则上线会导致线上bug。
快手派
做得好的：
担当敢为：开发需求较迅速、即使多个需求并行，也能很好的把控各个时间点，不延期，bug数可控，做事情有担当，push能力很好

坦诚清晰：开会的时候，能够大胆提出自己的想法，组织大家讨论
```

- 无关其他，要提防东北人，要掌握他们的核心要素。。。


- 绩效对事，影响什么事？
- c没有年终奖？
- 上线埋点影响pv偏高？造成业务影响？
- 线上样式？PX？
- require.context？
- 想法？代码逻辑？主动学习？
- [ast在线体验](https://astexplorer.net/)？
- `grep xxx -rn ./node_modules/webpack`在目录下的文件里查找字符串xxx？

### 德邦快递

- 你们二次打包，需要把每个盒子都拆开吗？那新增的包装盒费用收费标准？
- 新增的包装盒有没有清单啥的？我们买的那个大箱子也不能用吗？
- 有些类似催风机的东西，也不能邮寄吗？这个是有什么原因吗？
- 有些东西如果不能邮寄怎么办？还得让我们拿回来？
- 这些东西都得到付？
- 有个箱子写着的，注意点哈，里面都是大件，我们包装的应该还好，都不用了吗？
- 发货的司机可以留联系方式没？
- 从开始发货到最后到，大概多久？
- 保丢不报损？
- 我们的东西，能装一个车同时到吧？中间还会中转其他的车吗？


## single-spa

- 在同一页面上使用多个前端框架 而不用刷新页面 (React, AngularJS, Angular, Ember, 你正在使用的框架)
- 独立部署每一个单页面应用
- 新功能使用新框架，旧的单页应用不用重写可以共存
- 改善初始加载时间，迟加载代码
- Single-spa 从现代框架组件生命周期中获得灵感，将生命周期应用于整个应用程序。 


## typescript

```
npm install -g typescript

# 以上命令会在全局环境下安装 tsc 命令，然后就可以编译一个ts文件

tsc hello.ts
```


```js
// hello.ts
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));

// 编译ts文件
tsc hello.ts

// 输出编译好的文件
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

## 重新梳理vite

### 为什么选择vite

在浏览器支持 ES 模块之前，JavaScript 并没有提供的原生机制让开发者以模块化的方式进行开发。这也正是我们对 “打包” 这个概念熟悉的原因：使用工具抓取、处理并将我们的源码模块串联成可以在浏览器中运行的文件。

时过境迁，我们见证了诸如 webpack、Rollup 和 Parcel 等工具的变迁，它们极大地改善了前端开发者的开发体验。

然而，当我们开始构建越来越大型的应用时，需要处理的 JavaScript 代码量也呈指数级增长。包含数千个模块的大型项目相当普遍。我们开始遇到性能瓶颈 —— 使用 JavaScript 开发的工具通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用 HMR，文件修改后的效果也需要几秒钟才能在浏览器中反映出来。如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。

Vite 旨在利用生态系统中的新进展解决上述问题：浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写。


#### 缓慢的服务器启动
当冷启动开发服务器时，基于打包器的方式启动必须优先抓取并构建你的整个应用，然后才能提供服务。

Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类，改进了开发服务器启动时间

依赖：依赖大多为在开发时不会变动的纯 JavaScript。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）。

Vite 将会使用 esbuild 预构建依赖。[Esbuild](https://esbuild.github.io/) 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。



go语言（或 Golang）是Google开发的开源编程语言，诞生于2006年1月2日下午15点4分5秒，于2009年11月开源，2012年发布go稳定版。Go语言在多核并发上拥有原生的设计优势，Go语言从底层原生支持并发，无须第三方库、开发者的编程技巧和开发经验。

go是非常年轻的一门语言，它的主要目标是“兼具Python 等动态语言的开发速度和C/C++等编译型语言的性能与安全性”

源码 通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。
Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。


缓慢的更新



Vite 使用 esbuild 将 TypeScript 翻译到 JavaScript，约是 tsc 速度的 20~30 倍，同时 HMR 更新反映到浏览器的时间小于 50ms。

## vite

Vite (法语意为 "快速的"，发音 /vit/) 是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：
- 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。
- 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可以输出用于生产环境的优化过的静态资源。
- 

- degit — straightforward project scaffolding，相比git clone快很多，因为其只会克隆最后一次提交记录。
- 默认情况下 Vite 只处理语法转译，并 不默认包含任何 polyfill。你可以前往 Polyfill.io 查看，这是一个基于用户浏览器 User-Agent 字符串自动生成 polyfill 包的服务。

### 比较

- Snowpack 也是一个与 Vite 十分类似的非构建式原生 ESM 开发服务器。
- Vite 使用 esbuild 而不是 Rollup 来进行**依赖预构建**。这为开发服务器冷启动和依赖项失活的重新构建方面带来了显著的性能改进。

### 出现原因

开发大型应用，有性能瓶颈，使用 JavaScript 开发的工具通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用 HMR，文件修改后的效果也需要几秒钟才能在浏览器中反映出来。如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。

### 解决思路

Vite 旨在利用生态系统中的新进展解决上述问题：
- 浏览器开始原生支持 ES 模块，
- 越来越多 JavaScript 工具使用编译型语言编写。

### 其他框架

- react
- preact，一个旨在替代react的[轻量型框架](https://preactjs.com/)
- vanilla，Vanilla JS is a joke，就是指原生JS而已。
- [lit-element](https://github.com/lit/lit-element)，LitElement is simple base class for creating fast, lightweight web components with lit-html.
- [svelte](https://www.sveltejs.cn/)

lit-html其实是借助模板字符串可以配置模板函数能力，我们知道 jsx 是需要编译的它的底层最终还是 createElement....。而 lit-html 就不一样了，它是基于 tagged template 的，使得它不用编译就可以在浏览器上运行，并且和 HTML Template 结合想怎么玩怎么玩，扩展能力更强，不香吗？

[参考](https://segmentfault.com/a/1190000037691531)

### svelet 

Svelte 在 构建/编译阶段 将你的应用程序转换为理想的 JavaScript 应用，而不是在 运行阶段 解释应用程序的代码。

- 强大的计算属性，不但可以返回值，还可以返回表达式和代码块。
- svelte优点类似模板引擎的语法，可以在html里使用插值语法实现很多功能，例如await请求，相比vue


### 手写vite

- 默认采用的是es6原生的模块（import 语法在es6中默认会发送一个请求）
- 默认会将项目里依赖的模块增加路径前缀 `/node_modules/.vite`
- 把.vue文件在后端解析成了一个js对象
- 利用koa搭建http服务
- 热更新，就是在前端和后端分别注入脚本，然后后端变了之后会通知前端重新渲染。


### 待解决问题

- promise 的 polyfill如何使用？以及源码查看？a

### 一些点

- 新建.html，输入! + tab 可以生成html文件

## webpack

### 为什么需要构建工具?

- 转换es6语法
- 转换jsx
- css前缀补全/预处理器
- 压缩混淆
- 图片压缩

grunt -> gulp/fis3 -> rollup/webapck/parcel

### webpack的优势？

- star多
- 社区活跃，
- 插件众多
- 配置灵活
- 官方更新迭代快

### webapck的配置文件

- 默认是webpack.config.js
- 还可以webpack --config 指定配置文件
- 零配置的webpack其实就是默认指定了entry（src/index.js）和output（dist/main.js）
- webpack4将webpack内核和cli分开了
- 安装好的文件，可以在`node_modules/.bin/`目录下找到，其实就是局部安装的模块会在这个目录里创建软连接，之所以会有软连接，是因为这个包的package.json里的bin选项定义了执行文件的路径
- package.json的script脚本默认会从`node_modules/.bin/`这里找命令

### entry

- 依赖图的入口entry
- 单入口，entry只是一个字符串
- 多入口，则是对象

### output

- 输出到磁盘的目录
- output没有单出口和多出口概念，而是通过占位符来实现不同的出口

### loader

- webpack原生只支持js和json
- loader将webpack不支持的资源解析成支持的，并添加到依赖图里
- 本身是一个函数，接受源文件，返回转换的结果


- babel-loader,转换es6+等js新特性语法
- less-loader，将less文件转换成css
- file-loader，图片、字体等的打包，将文件的 import/require ()解析为一个 url，并将该文件发送到输出目录
- url-loader，类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
- raw-loader，将文件以字符串的形式导入
- thread-loader，多线程打包js和css

### plugins

- loader主要是处理资源，使得webpack可以处理
- 而plugin主要是增强处理资源的能力，比如boundle的优化，环境变量的注入，目录的删除等
- 作用于整个构建过程，开始到结束都可以使用插件

- CommonsChunkPlugin，将共用的模块代码提取成公共js
- CleanWebpackPlugin，清理构建目录
- ExtractTextWebpackPlugin，将css从boundle文件里抽离
- CopyWebpackPlugin，拷贝文件或文件夹
- HtmlWebpackPlugin，创建html文件去承载输出的boundle
- UglifyjsWebpackPlugin，压缩js
- ZipWebpackPlugin，将打包出的资源生成一个zip包。
- 。。。

### mode

- 指定当前的额构建环境：production，development，none
- 默认是production
- development模式下会默认开启：NamedChunksPlugin和NamedModulesPlugins（这两个主要是热更新时使用）
- none模式下，不开启任何优化

### 解析Es6

- 使用babel-loader
- babel-loader 依赖babel，而babel的配置文件为.babelrc
- presets 和 plugins，前者是集合，后者是单个功能
- 解析es6只需安装`@babel/preset-env`这个preset即可 `@babel/core、@babel/preset-env、babel-loader`
- plugins 则按需添加即可

### 解析css、解析less

- css-loader用于加载.css文件，并转换为commonjs对象
- style-loader是将样式文件通过<style>标签插入到head中
- loader的执行顺序是从右向左
- less-loader依赖less

### 解析图片和字体

- file-loader用于处理文件，比如图片
- 解析字体，和解析图片配置一样
- 处理文件使用file-loader即可，**但是url-loader在file-loader的基础上更强大**
- url-loader可以设置小于某个尺寸则自动转为base64格式
- url-loader内部基于file-loader

### 文件监听

- 代码变动，自动构建
- 启动webpack时增加 --watch
- 或者在配置文件中增加 watch: true选项
- 唯一缺点：需要手动刷新浏览器

**监听原理：**

轮训判断文件的最后编辑时间是否发生变化

文件发生变化，并不会立即告诉监听者，而是先缓存起来，等aggregateTimeout

```js
module.exports = {
  //...
  watch: true,
  watchOptions: {
      // 这段时间内进行的任何其他更改都聚合到一次重新构建里
      aggregateTimeout: 600,
      // 不监听哪些文件，提高性能
      // ignored: ['node_modules'],
      ignored: ['**/node_modules'] // glob模式
      poll: 1000, // 每秒检查一次变动，其实就是1秒问一次，文件变了没有啊
  }
};
```

### webpack-dev-server（WDS） 热更新

- 为了不手动刷新浏览器
- WDS不输出文件，没有磁盘io，而是放在内存中
- 通常结合HotModuleReplacementPlugin（webpack内置）插件使用（配置了 hot: true 会自动引入这个 plugin）

热更新有最核心的是 HMR Server 和 HMR runtime。

HMR Server 是服务端，用来将变化的 js 模块通过 websocket 的消息通知给浏览器端。

HMR Runtime是浏览器端，用于接受 HMR Server 传递的模块数据，浏览器端可以看到 .hot-update.json 的文件过来。

webpack 构建出来的 bundle.js本身是不具备热更新的能力的，HotModuleReplacementPlugin 的作用就是将 HMR runtime 注入到 bundle.js，使得bundle.js可以和HMR server建立websocket的通信连接，一旦磁盘里面的文件修改，那么 HMR server 会将有修改的 js module 信息发送给 HMR runtime，然后 HMR runtime 去局部更新页面的代码。因此这种方式可以不用刷新浏览器。

webpack-dev-server 默认是会在内容编译完成后自动刷新(liveload)浏览器的，此处增加了 HotModuleReplacementPlugin 插件之后可以做到 HMR的。如果HMR失败的话会降级使用 liveload 自动刷新浏览器模式。


**热更新除了WDS配合HMR实现，还可以借助webpack-dev-middleware配合服务器来实现**

```js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js'); 
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, 
    { 
        publicPath: config.output.publicPath
    }
));

// express默认cors是关闭的，另外本地起两个服务，如果用script获取资源是不跨域的，
// app.all('*',function (req, res, next) {
//     res.header('Access-Control-Allow-Origin','*');     // 当允许携带cookies此处的白名单不能写’*’
//     res.header('Access-Control-Allow-Headers','content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //允许的请求头
//     res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); // 允许的请求方法
//     res.header('Access-Control-Allow-Credentials',true);                   // 允许携带cookies
//     next();
// });

app.get('*', function(req, res) {
    console.log('req', req.headers)
    // console.log('res', res)
    res.send('收到了')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});
```

### chunk生成算法

1. webpack 先将 entry 中对应的 module 都生成一个新的 chunk
2. 遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中
3. 如果一个依赖 module 是动态引入的模块，那么就会根据这个 module 创建一个 新的 chunk，继续遍历依赖
4. 重复上面的过程，直至得到所有的 chunks

### 文件指纹

- 其实类似hash
- 用于文件的版本管理

- bundle：打包最终生成的文件
- chunk：每个chunk是由多个module组成，可以通过代码分割成多个chunk。
- module：webpack中的模块（js、css、图片等等）,源码里的每个文件都是一个module
- compiler，webpack启动只创建一次
- compileration，每次文件变动重新构建都会生成一个新的
- hash，和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会有修改，其实就是和compileration有直接关联
- chunkhash，和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值
- contenthash，根据文件内容有关

对于多页面应用会有多个入口，每个入口其实都会生成一个chunk，不同入口之间的chunk不共用，这样其实就入口之间互相不影响了。

但是如果一个chunk里既有css又有js，而你只修改了css，如果选择chunkhash模式会导致js资源也失效，此时可以选择contenthash，这样只会重新生成css部分的指纹。

总结：
- 一般js资源使用chunkhash
- css资源使用contenthash
- chunkhash 是没办法在热更新时使用的

### 代码压缩

- html压缩
- css压缩
- js压缩

- 内置了uglifyjs-webpack-plugin压缩js
- 使用optimize-css-assets-webpack-plugin压缩css

```js
plugins: [
    new OptimizeCSSAssetsPlugin(
    { 
        assetNameRegExp: /\.css$/g,
        // cssnano基于node，是postcss插件
        // 和 gzip 之类的保留 CSS 文件的原始语义（即无损失）的技术不同，
        // 缩减（minification） 天生是一个有损失的过程，例如，其中某些值可能会被替换为更简化的 等价语法，或者选择器被合并。
        cssProcessor: require('cssnano’)
    }
]
```
- html-webpack-plugin压缩html，注意HtmlWebpackPlugin 里面的minify 的 minifyCSS 参数和minifyJS参数是用于去**压缩一开始就内联在 html 里面的css和js，而不是打包生成的 css 和 js**

比如我某个js，没变过，但是打包的时候，这个文件还是被重新生成到dist目录了，这样部署到服务器的时候，本来只需要增量更新文件，这样一来，就变成全量更新了。非常浪费时间？

答：准确的说这个增量更新还是全量更新并不是 webpack 去做的，而是部署脚本或者部署服务器去关注的，webpack 只负责构建。

通常的做法是： webpack 打包的时候会给每个文件生成文件指纹(这个通常可以理解成静态资源的版本)。然后部署脚本进行部署操作，比如: scp、rsync 等操作把资源发布到 生产机器或者 cdn 的时候。发布上去后，部署系统会将当前的静态资源的列表存起来，下次再次进行部署会将新的资源列表和前一次的资源列表进行比对。如果文件指纹没有变化，则不会进行覆盖操作，从而达到增量部署。

### 自动清理构建目录产物

可以在构建命令之前添加：
- rm -rf ./dist && webpack
- rimraf ./dist && webapck
- && 表示串行，前面的执行完了才会执行后面的命令
- 当然还可以使用clean-webpack-plugin，默认会删除output指定的输出目录。

### css3属性前缀

- 浏览器的标准并不统一，
- trident（-ms）
- geko（-mos）
- webkit（-webkit）
- presto（-o）
- autoprefixer是后置处理，而less-loader等是前置处理。
- autoprefixer是postcss的插件，自动补全css3前缀 

postcss-loader 执行顺序必须保证在 css-loader 之前，建议还是放在 less或者 sass 等预处理器之后更好。即 loader 顺序：
less-loader -> postcss-loader -> css-loader -> style-loader 或者 MiniCssExtractPlugin.loader

其实 postcss-loader 放在 less-loader 之前问题也不大，平时使用的 less 里面的语法基本不会和 autoprefixer 处理产生冲突的。

作者回复: **postcss-loader 的执行顺序写在 css-loader 之前即可，也就是需要在 css-loader 将样式转换成 cjs 对象插入到 js 代码前**。

### 移动端css px 自动转换rem

- 移动设备的分辨率很多，比如414x896,375x812,375x667等，注意这是逻辑分辨率，单位是pt(point，磅)：是一个物理长度单位，指的是72分之一英寸。
- 设备分辨率，单位是px，是一个虚拟长度单位，如果px要换算成物理长度，需要指定精度DPI(Dots Per Inch，每英寸像素数)，在扫描打印时一般都有DPI可选。Windows系统默认是96dpi，Apple系统默认是72dpi。
- em(相对长度单位，相对于当前对象内文本的字体尺寸),最初是指字母M的宽度，故名em
- `pt = 1/72(英寸), px = 1/dpi(英寸)`

总结：其实逻辑分辨率就是物理分辨率，是一个绝对尺寸，单位pt，而px是一个虚拟单位，可以动态变化。

- 媒体查询实现响应式布局
- 使用rem，font-size of the root element
- 使用px2rem-loader将px转为rem，可以设置转换精度和转换基准
- 现在所有的单位都是rem了，rem是相对于根元素大小的，因此为了适应不同屏幕尺寸，还需要动态的设置根元素的大小，可以使用lib-flxble动态计算根元素的大小
- 对于不想转换的可以使用`/*no*/`，在样式的后面使用
- 还可以exclude 的，可以把 node_modules 里面的模块 exclude 掉。这样第三方库里的单位就不会转了

```js
var px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 75 // 75px = 1rem
      remPrecision: 8 // rem的小数点后位数
    }
 }
```

```js
// lib-flexible.js
// https://registry.npmjs.org/lib-flexible/-/lib-flexible-0.3.2.tgz
;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }


    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));
```

感觉现在rem这种适配方案应该逐渐过时了吧（大屏手机，不是为了看到更大的字，而是为了看到更多的内容），可以用 vw，vh方案，加上PostCSS 中的 postcss-px-to-viewport 再结合 flex布局。


请问vm布局和rem哪个适配好，都有什么不同？

主要是兼容性上。rem兼容性更好，支持android2.2以上的机型。但是vm只支持android4.4和ios8以上的。另外rem需要的计算需要在头部内联一个脚本，vm是纯css去实现的。如果不考虑兼容性，vm完全没问题

### 静态资源内敛

代码层面
- 页面框架的初始化脚本，比如rem计算
- 上报相关打点
- css内敛避免页面闪动（比如ssr时，如果不内敛，html返回后还需要再请求css）

请求层面：
- 减少http请求数（小图）


- index.html模板一般默认使用ejs引擎
- raw-loader的原理其实就是读取文件，然后返回字符串
- 不能使用最新的 raw-loader 版本，它最新的 3.x 版本导出模块直接使用了 export default 的写法，html 里面的模块这么写的话webpack解析不了，需要是 cjs 的写法才行。


```html
<!--内敛html-->
${require('raw-loader!babel-loader!./meta.html')}

<!--内敛js-->
<script>${require('raw-loader!babel-loader!./node_modules/lib-flexible')}</script>
```

**style-loader 插入样式是一个动态的过程，你可以直接查看打包后的 html 源码并不会看到 html 有 style 样式的。**

css-loader 的作用是将 css 转换成 commonjs 对象，也就是样式代码会被放到 js 里面去了。style-loader 是代码运行时动态的创建 style 标签，然后将 css style 插入到 style 标签里面去，对应的源码：https://github.com/webpack-contrib/style-loader/blob/master/src/runtime/injectStylesIntoStyleTag.js#L260

CSS 内联的思路是：先将 css 提取打包成一个独立的 css 文件（使用MiniCssExtractPlugin.loader），然后读取提取出的 css 内容注入到页面的 style 里面去。这个过程在构建阶段完成。

CSS 内联的演示已经以文章的形式更新到博客里面（https://github.com/cpselvis/blog/issues/5）
CSS 内联的例子（https://github.com/cpselvis/geektime-webpack-course/tree/master/code/chapter03/inline-resource）

内敛样式如何转为rem？

答：可以实现一个 loader，然后这个 loader 去匹配 html，然后将 html 里面的 px 都转换成 rem就好了

### 多页面应用打包

- 有利于seo
- entry里多个key，每个key都需要对应一个html-webpack-plugin
- 如果手动维护entry，则每次新增页面都需要改配置，可以动态获取指定目录下的文件，然后再动态设置html-webpack-plugin

```js
// 利用glob这个库，读取指定目录下的文件，然后遍历设置
const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
```

### 使用source-map

基本上开发环境直接用source-map。
production环境就把source-map添加到Error Reporting Tool（e.g. Sentry）上。这样既不直接暴露源代码，也能方便解决production环境遇到的bug。

一般情况下公司内应该是有前端监控系统的，一旦报错，可以把 sourcemap 上传到这个监控系统里面。但是不要把 sourcemap 文件和静态资源的 cdn 一起发布到线上就好了。

### 提取公共资源

- 基础库分离，设置externals，然后利用cdn引入；有一个单独的插件htmlWebpackExternalsPlugin可以手动实现分离并自动引入配置的cdn资源或者本地资源
- 也可以使用splitChunks（早起使用CommonsChunkPlugin）

htmlWebpackExternalsPlugin做的有三件事：1.修改webpack配置，将公共模块添加到配置的externals属性中，这样webpack就不会把React、ReactDOM打包进去；2.使用copy-webpack-plugin复制文件到output，如果是本地资源的话；3.使用html-webpack-include-assets-plugin添加模块到html。在这里，因为插件的执行顺序是从上到下的，3没效果；因为不是本地文件，2也没效果；真正生效的是从bundle文件中剥离了react、react-dom；然后再在html模版文件中引入cdn，使react代码能够正常允许。

跟插件的执行顺序有关，老师的demo将HtmlWebpackExternalsPlugin写在了htmlWebpackPlugins前面，导致HtmlWebpackExternalsPlugin执行时找不到html插入对应的entry地址。只需将对应htmlWebpackPlugins的执行顺序写在HtmlWebpackExternalsPlugin前面即可解决还需手动在html中引入cdn地址的问题。

### tree shaking

- webpack默认支持，在.babelrc里设置 modules: false 即可
- production模式下默认开启
- 必须es6的语法，cjs的方式不支持。

DCE（Elimination）
- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量（只写不读）
- 代码不能有副作用
- 副作用这个概念来源于函数式编程(FP)，纯函数是没有副作用的，也不依赖外界环境或者改变外界环境。纯函数的概念是：接受相同的输入，任何情况下输出都是一样的。

原理：

- 编译阶段就需要知道哪些代码用到
- es6模块只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binging 是 immutable 的

代码擦除：编译阶段知道哪些代码没有用到，会添加一些注释，等到uglify阶段删除无用代码。

### scope hoisting

- webpack构建完的代码，拥有大量的闭包函数代码，这些包裹代码会导致体积增大(模块越多越明显)
- 这些闭包代码运行时，创建的函数作用域也会变多，内存开销变大-

**webpack的模块机制**

- 打包出来的是一个IIFE（匿名闭包）
- modules是一个数组，每一项是一个模块初始化函数
- `__webpack_require` 用来加载模块，返回module.exports
- 通过`__webpack_require` 来启动程序


### 动态加载

方式：
- commonjs 使用 require.ensure
- es6 使用 import（现在原生支持不好，需要babel插件）

```js
{
    "plugins": [
        "@babel/plugin-syntax-dynamic-import"
    ]
}
```

最后动态加载资源的原理，还是利用jsonp的方式加载，动态添加script标签，并引入资源文件。

### eslint

- 在vue项目中关闭eslint，在vue.config.js里配置：lintOnSave: false

方式：
- 本地开发阶段增加precommit钩子，然后利用husky、lint-staged在代码提交阶段检查，但可以通过工具来绕过。因此需要在其他地方来添加兜底逻辑
-  webpack 配合 eslint-loader来做代码检查


### webapck 打包库和组件

webpack出来可以用来打包应用，还可以打包js库

- 需要打包压缩版本和非压缩版本
- 支持amd、cmd、esm模块引入

如何将库暴露出去：

在output选项里配置如下：
- filename: '[name].js' 因为需要webapck没有多出口的概念，因此需要通过占位符来实现，而占位符字段的来源就是entry里的key
- library 指定库的全局变量，其实就是挂载在全局变量的下名字
- libraryTarget 支持库引入的方式(umd，amd，cmd)等
- libraryExport 导出对象挂载在哪

整体过程：
1. 创建项目，并初始化项目结构
2. 编写源码
3. 编写webpack.config.js，配置entry，output；(默认mode是production，这个模式会将所有文件进行压缩，因此需要关闭生产模式，匹配指定文件进行压缩，生产模式会使用terser-webpack-plugin压缩，这个插件可以压缩es6语法，而早期版本的uglify只可以压缩es5，不过现在新版本也可以压缩es6语法，terser就是基于uglify；)
4. 配置入口文件，比如开发环境暴露非压缩版本，生产环境暴露压缩版本
5. 然后是配置package.json，main是模块的入口，还可以添加prepublish钩子
6. npm publish发布npm包，需要添加账号

```js
// 具体项目中使用时，会有环境变量，根据用户的环境变量导出不同的包
if (process.env.NODE_ENV === 'production') { 
  module.exports = require('./dist/big-num.min.js');
} else {
  module.exports = require('./dist/big-num.js')
}

{
  "main": "index.js",
  "scripts": {
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1",
    "prepublish": "webpack"
  },
}

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'big-num': './src/index.js',
    'big-num.min': './src/index.js',
  },
  output: {
    filename: '[name].js',
    library: 'bigNumer',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js/
      })
    ]
  }
}
```


npm 支持运行package.json里“scripts”属性中的脚本，包括：

- prepublish：在npm publish命令之前运行（也会在不带参数的npm install命令前运行，详情在下段描述）
- prepare: 在两种情况前运行，一是npm publish命令前，二是不带参数的npm install命令；它会在prepublish之后、prepublishOnly之前执行
- prepublishOnly: 在npm publish命令前执行
- publish,postpublish： 在npm publish命令后执行
- preinstall: 在npm install命令前执行
- install,postinstall： 在npm install命令后执行
- preuninstall，uninstall: 在npm uninstall命令前执行
- postuninstall ： 在npm uninstall命令后执行
- preversion：在改变包的version前执行
- version： 在改变包的version后，但提交之前执行
- postversion： 在提交version变更后执行
- pretest， test， posttest： 伴随npm test命令
- prestop， stop， poststop： 伴随npm stop命令
- restart, start, poststart: 伴随 npm start命令
- pre restart， restart， poststart： 伴随 npm restart命令。提示：假如scripts里没有写restart命令，npm默认会运行start、stop
- preshrinkwrap, shrinkwrap, postshrinkwrap: 伴随 npm shrinkwrap 命令（用于固定依赖包版本）

### 服务端渲染

ssr打包存在的问题：

浏览器的全局变量（node.js中没有document,window）
- 组件适配，将不兼容的组件根据打包环境进行适配
- 请求适配，将fetch或者ajax发送请求的写法改为isomorphic-fetch或者axios

样式问题（node.js无法解析css）
- 服务端打包通过ignore-loader忽略掉css的解析
- 将style-loader替换成isomorphic-style-loader

### 服务端渲染

下面有一些大概的思路，其实就是获取打包后的文件，转为字符串，然后将占位替换为mock的数据或者css等。

```js
// 处理一些全局对象
if (typeof window === 'undefined') {
    global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
// react-dom这个库中刚好实现了编译虚拟DOM，
// 因为页面最终还是要将虚拟dom专为真实dom，renderToString就是中间的一步
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server');
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
const data = require('./data.json');

const server = (port) => {
    const app = express();

    app.use(express.static('dist'));
    app.get('/search', (req, res) => {
        const html = renderMarkup(renderToString(SSR));
        res.status(200).send(html);
    });

    app.listen(port, () => {
        console.log('Server is running on port:' + port);
    });
};

server(process.env.PORT || 3000);

const renderMarkup = (str) => {
    const dataStr = JSON.stringify(data);
    return template.replace('<!--HTML_PLACEHOLDER-->', str)
        .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`);
}
```

### 统计信息 stats

### webpack-cli

### 手动实现webpack

可以将 ES6 语法转换成 ES5 的语法 
- 通过 babylon 生成AST
- 通过 babel-core 将AST重新生成源码

可以分析模块之间的依赖关系

- 通过 babel-traverse 的 ImportDeclaration 方法获取依赖属性

生成的 JS 文件可以在浏览器中运行

整体过程：
1. 接受配置项，并格式化配置项
2. 挂载内置插件以及传入的插件
3. 从入口文件开始编译
4. 利用工具将文件解析为ast(可以利用babylon)
5. 递归分析ast文件，找出所有的依赖，并生成modules数组（可以利用babel-traverse）
6. 然后将ast文件在转为es5的源码(可以利用babel-core里的transformFromAst方法)
7. 将依赖项用函数包裹下，传入最后的自执行函数

```js
// index.js
const Compiler = require('./compiler.js');
const webpackConf = require('../simple.config.js');

new Compiler(webpackConf).run();

// compiler.js
const fs = require('fs');
const path = require('path');
const { getAst, getDeps, transform } = require('./parser.js');

module.exports = class Compiler {
    // 构造函数，接受参数
    constructor(opts) {
        const { entry, output } = opts;

        this.entry = entry;
        this.output = output;
        // 将所有的模块都需要遍历出来
        this.modules = [];
    }

    // run
    run() {
        this.entryModule = this.buildModule(this.entry, true)

        this.modules.push(this.entryModule);

        // 递归所有模块，并将依赖放到modules数组里
        this.modules.map(_module => {
            _module.deps.map(dep => {
                this.modules.push(this.buildModule(dep))
            })
        })
        // 得到所有的构建文件以及源码，可以将这文件输出出来了
        this.emitFiles();
    }

    buildModule(filename, isEntry) {
        let ast = '';
        if (isEntry) {
            ast = getAst(filename);
        } else {
            const absolutePath = path.join(process.cwd(), './src', filename);
            ast = getAst(absolutePath);
        }
        return {
            filename,
            deps: getDeps(ast),
            source: transform(ast)
        }
    }

    emitFiles() {
        const { path: url, filename } = this.output;
        const outputPath = path.join(url, filename)

        // 将数组中得到的所有依赖模块，都通过键值对放在字符串里
        let modules = '';
        this.modules.map(_module => {
            modules += `'${_module.filename}': function(require, module, exports) { ${_module.source} },`
        })

        // 自执行函数，传入解析出来的modules，modules是字符串，需要包裹一下
        const boundle = `(function(modules) {
            function require(filename) {
                const fn = modules[filename];

                const module = { exports: {} };

                fn(require, module, module.exports)

                return module.exports;
            }

            // 启动程序
            require('${this.entry}');
        })({${ modules }})`

        fs.writeFileSync(outputPath, boundle, 'utf-8')
    }
}

// parser.js
// 定义一些列方法，用来转换ast，获取依赖等
const fs = require('fs');
const path = require('path')

// 将源码解析为ast
const babylon = require('babylon');

// 转为ast的目的就是要分析依赖
const traverse = require('babel-traverse').default;

// 将ast转为es5源码
const { transformFromAst } = require('babel-core')

// 导出对象

module.exports = {
    // 获取AST
    getAst(path) {
        // 读取源文件，并解析为ast
        const content = fs.readFileSync(path, 'utf-8');

        return babylon.parse(content, {
            sourceType: 'module'
        })
    },
    
    // 获取依赖
    getDeps(ast) {
        const deps = [];

        traverse(ast, {
            ImportDeclaration({ node }) {
                deps.push(node.source.value)
            }
        })
        
        return deps;
    },

    // 将ast转为源码
    transform(ast) {
        const { code } = transformFromAst(ast, null, {
            presets: ['env']
        })
        return code;
    }
}
```

### loader

函数组合的两种情况
- unix中的pipline
- componse（webpack采用）

函数组合在函数式编程中被称为组合(composition)

估计这也是vue的compoition api的叫法吧。

组合吗，顾名思义就是抽离很多小的功能模块，然后再根据需要去组合他们。

在linux系统中，经常 `ps -ef | grep node` 这样使用，其实理念就是：**每一个程序的输出可以是另一个程序的输入**，这也就是pipeline的一种代码组合方式吧。

同样，还可以利用 compose 函数来实现。

```js
function compose(...fns) {
    // ...
}
compose(f,g)(x) == f(g(x))
compose(f,g,m)(x) == f(g(m(x)))

// 例子
let n = '3.56';
let number = compose(Math.round, parseFloat)
let result = number(n); 

// 实现函数组合
function compose(...fns) {
    return x => {
        return fns.reduceRight((arg, fn) => {
            return fn(arg)
        }, x)
    }
}

// 当然也可以实现从左到右
function composeLeft(...fns) {
    return x => {
        return fns.reduce((arg, fn) => {
            return fn(arg);
        }, x)
    }
}
```

与组合相比，有些人更喜欢管道，这只是个人偏好，其实pipe和compose做的是同样的事情，只是数据流放行方式不同。


### loader-runner

```js
// raw-loader.js
module.exports = function(source) {
    // 为了处理es6模板字符串的安全问题
    const json = JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')

    return `export defult ${json}`
}
```

loader-runner 可以在不安装 webpack的情况下运行loaders.

```js
const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
	resource: path.join(__dirname, './src/data.txt'),
	loaders: [path.join(__dirname, './src/raw-loader.js')],
	context: { minimize: true },
	readResource: fs.readFile.bind(fs)
}, (err, res) => {
    err ? console.log(err) : console.log(res);
})
```

loaders还可以传递参数，并通过工具去获取参数

```js
// loaders: [path.join(__dirname, './src/raw-loader.js')],

loaders: [
    {
        loader: path.join(__dirname, './src/raw-loader.js'),
        options: { name: 'rawLoader' }
    }
]

// raw-loader.js
const { getOptions } = require('loader-utils')
module.exports = function(source) {
    const opts = getOptions(this);
    console.log(opts, 'opts');
    // { name: 'rawLoader' } opts
    // 为了处理es6模板字符串的安全问题
    const json = JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')

    return `export defult ${json}`
    // 也可以通过this.callback()方式返回结果，而且还可以返回错误对象以及多个值
    // this.callback是loader里的
    this.callback(null, json, 1,2,3)
}
```

上面的方式是同步loader，还可以定义异步loader

```js
// raw-loader.js
module.exports = function(source) {
    const callback = this.async();
    
    // 为了处理es6模板字符串的安全问题
    const json = JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')

    
    callback(null, json)
}
```

loader里还有很多其他的工具，比如将处理的文件emit出去等等

- [loader-utils](https://github.com/webpack/loader-utils#readme)
- [file-loader](https://github.com/webpack-contrib/file-loader/blob/master/src/index.js)


### 插件

插件不像loader那样有自己的运行环境（比如loader-runner），需要加载项目里才可以。

错误处理
- 参数校验阶段，通过throw
- 如果进入到hooks里，可以通过compilation.warning.push('warning')或者compilation.errors.push('error')
- compilation上的assets可以用于文件写入，文件内容也有很多类型，参考[webpack-source](https://www.npmjs.com/package/webpack-sources)
- 我们编写的插件一般是基于webpack，其实还可以通过插件暴露出来的hooks编写插件，也就是插件的插件。比如html-webpack-plugin插件就暴露很多自己的hooks


编写一个生成zip包的插件
- 文件名需要可以传入
- 需要使用compiler对象上的特地hooks进行资源的生成

知识点：
- 利用jsZip库来压缩文件
- webpack最终会将compilation.assets上挂载的资源输出到dist目录里，因此只需要在emit钩子上将zip包挂载上去即可
- cp -r xxx1 xxx2 拷贝目录

```js
const JSZip = require('jszip');
const path = require('path');
const RawSource = require('webpack-sources').RawSource;
const zip = new JSZip();

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            const folder = zip.folder(this.options.filename);

            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source();
                folder.file(filename, source);
            }

            zip.generateAsync({
                type: 'nodebuffer'
            }).then((content) => {
                const outputPath = path.join(
                    compilation.options.output.path, 
                    this.options.filename + '.zip'
                );
                
                // 获取相对路径
                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                );
                compilation.assets[outputRelativePath] = new RawSource(content);

                callback();
            });
        });
    }
}
```

### 实战

- json web token, jwt健全
- 数据库基于sequelize

- 渲染优化：ssr或native渲染，预渲染渲染出没有数据的效果
- 弱网优化：使用离线包，pwa等离线包缓存技术
- webview优化，打开webview的同时并行加载页面数据。

## 包管理器

### yarn，npm，pnpm

通过`npm config set save-exact true`命令关闭在版本号前面使用^的默认行为，但这个只会影响顶级依赖关系。由于每个依赖的库都有自己的package.json文件，而在它们自己的依赖关系前面可能会有^符号，所以无法通过package.json文件为嵌套依赖的内容提供保证。


npm必须首先遍历所有的项目依赖关系，然后再决定如何生成扁平的node_modules目录结构。npm必须为所有使用到的模块构建一个完整的依赖关系树，这是一个耗时的操作，是npm安装速度慢的一个很重要的原因。

Yarn一开始的主要目标是解决由于语义版本控制而导致的npm安装的不确定性问题。

像npm一样，yarn使用本地缓存。与npm不同的是，yarn无需互联网连接就能安装本地缓存的依赖项，它提供了离线模式。

通常情况下不建议通过npm进行安装。npm安装是非确定性的，程序包没有签名，并且npm除了做了基本的SHA1哈希之外不执行任何完整性检查，这给安装系统程序带来了安全风险。

pnpm运行起来非常的快，甚至超过了npm和yarn。为什么这么快呢？ 因为它采用了一种巧妙的方法，利用硬链接和符号链接来避免复制所有本地缓存源文件，这是yarn的最大的性能弱点之一。使用链接并不容易，会带来一堆问题需要考虑。正如Sebastian在Twitter上指出的那样，他最初是打算在yarn中使用符号链接的，但是由于其他一些原因放弃了它。

此外，截至2017年3月，pnpm继承了yarn的所有优点，包括离线模式和确定性安装。

无论这场竞争的结果是什么，我很感谢yarn在npm的脚下点了一把火，提供了另外一个选择。

我确信yarn是一个更安全的选择，但是pnpm可能是一些测试用例的更好的选择。例如，它可以在运行大量集成测试并希望尽可能快地安装依赖关系的中小型团队中发挥作用。

最后，我认为，npm仍然提供了一个非常有用的解决方案，支持大量的测试用例。大多数开发人员使用原始npm客户端仍然可以做得很好。


```bash
pnpm install -g @tarojs/cli
 ERR_PNPM_NO_GLOBAL_BIN_DIR  Unable to find the global bin directory

Run "pnpm setup" to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.

➜  react_taro pnpm install -g @tarojs/cli
 ERR_PNPM_NO_GLOBAL_BIN_DIR  Unable to find the global bin directory

Run "pnpm setup" to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.

➜  react_taro which pnpm
/Users/yq/.npm-global/bin/pnpm

➜  react_taro pnpm setup
# Appended new lines to /Users/yq/.zshrc

# Next configuration changes were made:
export PNPM_HOME="/Users/yq/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"

# To start using pnpm, run:
source /Users/yq/.zshrc



# Just put the following line to your .bashrc, .zshrc, or config.fish:
alias pn=pnpm
```


### Monorepo 

Monorepo 是管理项目代码的一个方式，指在一个项目仓库 (repo) 中管理多个模块/包 (package)，不同于常见的每个模块建一个 repo。

正常情况下，一个仓库就是一个项目，但是如果将多个独立的项目融合到一块去，项目也可以理解为模块，每个模块都有自己的依赖，如果都分别安装，则肯定就会有很多的重复依赖，势必造成仓库的越来越大。

因此当项目到一定的复杂度，需要且可以划分模块、但模块间联系紧密的，比较适合用 monorepo 组织代码。

最常见的 monorepo 解决方案是 Lerna 和 yarn 的 workspaces 特性，

放在同一个repo中来管理的时候通常使用Monorepos的方式来管理此repo，使用这种方式的有很多我们经常使用的js包，比如Babel, React, Vue, Angular, Jest等

然而，仅仅进行拆分并使用Monorepos管理远远是不够的，比如测试，管理依赖，发布多个包等变得复杂起来。 这是一些工具比如Lerna就派上了用场

### lerna 

[lerna](https://lernajs.bootcss.com/)

Lerna是一个对多个子模块工程管理进行优化的工具。简而言之，Lerna会安装在工程中的每个package，并在 相互依赖的package之间创建软链接。

然而，作为一个包管理的装饰器，Lerna不能有效的控制node_module中的内容。 比如多个子模块都依赖同一个包。Lerna会安装多次而不是一次。

### Workspaces是什么

感觉vue-cli写得相当不错，想瞅瞅源码，于是就进入package.json中找找main字段吧，因为main 字段就是工程的入口文件嘛。

上下看了三遍，卧槽，没有！

好吧，main字段没有，bin总该有吧。

上下又看了三遍，卧槽，还是没有，唯一可疑的发现了个workspaces字段。

Workspaces能够让用户根据根package.json中的workspace字段从多个子文件中的package.json中安装以依赖。同时去除冗余的包。

总结：

- workspaces并没有使Lerna过时
- Lerna有他的长处和优点，可以和workspaces共存

- [Workspaces的来龙去脉](https://ysyfff.github.io/diary/blog/2018/06/14/workspaces.html)
- [Workspaces在yarn中的解释](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/)

### spawn

spawn...系列函数可以加载并运行称为子进程的其它文件。

### midway

Midway (中途岛) 是淘系架构团队（前淘宝UED）研发的一款面向未来的的 Node.js 框架。在大规模编程和 Serverless 等多种场景中，Midway 通过 TypeScript 和完全自研的依赖注入能力，将用户体验打造到极致。

Midway 2.0 集成了 Serverless 能力，同时扩展了 RPC、Socket、微服务、前后端一体化研发等能力，不同的场景之间可以组合、协作，给用户提供相对灵活又可靠的使用体验。

### 下一代框架解决什么问题

 Midway 是淘宝的 Node.js Web 应用解决方案，目的是为了更好的做前后端分离，让前端同学开发更简单，生活更幸福（笑）。


其实前端框架发展至今，其实可以分为基础框架与上层框架两个视角。

- 基础框架（Vue/React/Angular/Svelte...），解决如何更好编写代码的问题，包括效率、质量等。比如说通过 mvvm 解决 DOM 操作的问题，通过 React Hooks/Vue Composition/Svelte Reactive 等解决状态、副作用等问题。这些都是框架上的创新之处，基础框架的改进会进一步带来用户编程方式的变化。
- 上层框架（Next.js/Nuxt/Midway Hooks 等），解决好特定领域的问题。例如经典的 Next.js 解决的就是 SSR 的问题，目前也非常成功的拓展了许多周边功能，并开始引领 JAMStack 概念。而我们最近开源的 Midway Hooks（midwayjs/hooks），则专注于解决前后端一体化开发的问题，通过 Hooks  统一前后端开发，来实现极致的一体化体验。类似的竞品还有 blitz.js/redwood.js。
。

即便midway很务实的只挑选了视图层作为主攻方向，但不可避免的控制器层还会带进来大量技术问题需要解决，比如配管、部署、日志监控、运维工具、SOA、加解密、事务、缓存策略、消息队列、异步调用、安全问题，总有避不开的暗礁。对阿里目前的后端技术栈来说，这些技术背后是无数的系统和平台，缺一不可，midway目前还是个玩具。更何况nodejs/web framework本身都在飞速演变之中，ES5到ES6，技术特性变化剧烈。即便由前期探路者完成了基础设施建设，后期他人进入的学习成本也非常高。时间长了，前端工程师本身又自然会分化成纯前端和nodejs工程师，如此前后端天然又产生了隔阂，呵呵，分久必合，合久必分。

好处不够明显，推广困难。这才是midway真正的死穴。如前文所说，目前的前后端分离运动还是部分前端工程师的孤立行为，绝大多数后端工程师和一线主管对此毫不关心（我除外），因为midway宣称的痛点不是他们的痛点，宣称的优点只有节约后端人力这一条对他们有点意义，而这些人才是决定midway命运的人！
。

不客气的说，很多前端工程师一直在一维空间里存活，是单线程思维模式，对并发、事务、一致性、分布式等问题的理解基本空白，技术场景后移以后，要学习的东西真的很多很多！所以我的意见是，如果前后端真的分离了，最后必然出现NodeJS工程师，以区分纯前端工程师，不要奢望每个人都是大牛，这不科学。

## IOC

### 控制翻转

- [控制反转（IoC）与依赖注入（DI）](https://www.jianshu.com/p/07af9dbbbc4b)

软件中的对象就像齿轮一样，协同工作，但是互相耦合，一个零件不能正常工作，整个系统就崩溃了。这是一个强耦合的系统。

为了解决对象间耦合度过高的问题，软件专家Michael Mattson提出了IoC理论，用来实现对象之间的“解耦”。

控制反转：之前的各个齿轮是相互挨着，具有很强的耦合性，现在这些齿轮相互之间不再挨着，而是通过一个中间位置的第三方，也就是IOC容器来统一调度。

**控制反转（Inversion of Control）**是一种是面向对象编程中的一种设计原则，用来减低计算机代码之间的耦合度。其基本思想是：借助于“第三方”实现具有依赖关系的对象之间的解耦。

全部对象的控制权全部上缴给“第三方”IOC容器，所以，IOC容器成了整个系统的关键核心，它起到了一种类似“粘合剂”的作用，把系统中的所有对象粘合在一起发挥作用，如果没有这个“粘合剂”，对象与对象之间会彼此失去联系，这就是有人把IOC容器比喻成“粘合剂”的由来。


控制反转(IOC)到底为什么要起这么个名字？我们来对比一下：

- 软件系统在没有引入IOC容器之前，如图1所示，对象A依赖于对象B，那么对象A在初始化或者运行到某一点的时候，自己必须主动去创建对象B或者使用已经创建的对象B。无论是创建还是使用对象B，控制权都在自己手上。

- 软件系统在引入IOC容器之后，这种情形就完全改变了，如图2所示，由于IOC容器的加入，对象A与对象B之间失去了直接联系，所以，当对象A运行到需要对象B的时候，IOC容器会主动创建一个对象B注入到对象A需要的地方。
通过前后的对比，我们不难看出来：对象A获得依赖对象B的过程,由主动行为变为了被动行为，控制权颠倒过来了，这就是“控制反转”这个名称的由来。


### 依赖注入

非自己主动初始化依赖，而通过外部来传入依赖的方式，我们就称为依赖注入。

在vue项目初始化过程中，一些依赖是在其他地方初始化好的，然后通过一种方式注入进去。。。然后页面就可以使用这些依赖了。


控制反转和依赖注入的关系

我们已经分别解释了控制反转和依赖注入的概念。有些人会把控制反转和依赖注入等同，但实际上它们有着本质上的不同。

- 控制反转是一种思想
- 依赖注入是一种设计模式

IoC框架使用依赖注入作为实现控制反转的方式，但是控制反转还有其他的实现方式，例如说ServiceLocator，所以不能将控制反转和依赖注入等同。

## 进程通信

### node中进程间通信

[Nodejs进程间通信](http://www.ayqy.net/blog/nodejs%E8%BF%9B%E7%A8%8B%E9%97%B4%E9%80%9A%E4%BF%A1/)

通信方式与进程产生方式有关，而Node有4种创建进程的方式：spawn()，exec()，execFile()和fork()

```js
const { spawn } = require('child_process');
const child = spawn('pwd');
// 带参数的形式
// const child = spawn('find', ['.', '-type', 'f']);
```

spawn()返回ChildProcess实例，ChildProcess同样基于事件机制（EventEmitter API），提供了一些事件：

- exit：子进程退出时触发，可以得知进程退出状态（code和signal）
- disconnect：父进程调用child.disconnect()时触发
- error：子进程创建失败，或被kill时触发
- close：子进程的stdio流（标准输入输出流）关闭时触发
- message：子进程通过process.send()发送消息时触发，父子进程之间可以通过这种内置的消息机制通信


### midway

[阿里 Midway 正式发布 Serverless v1.0，研发提效 50%](https://zhuanlan.zhihu.com/p/153423501)






