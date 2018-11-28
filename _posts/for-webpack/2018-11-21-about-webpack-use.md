---
layout: post
title: webpack使用
date: Tue Nov 20 2018 16:48:56 GMT+0800 (中国标准时间)
---
#### webpack中文文档
1. [老版本][oldWebpackUrl]
2. [v4.15.1版本][v4.15.1WebpackUrl]
3. [v4.26.0版本(最新)][v4.26.0WebpackUrl]


#### 1、webpack管理pageage的好处
很早之前，我们引用第三方依赖的方式，是通过script标签引入，这会有以下几个问题：
1. 需要确保依赖下载完成之后才能使用
2. 需要确保依赖的引入顺序
3. 引入的依赖如果没有被使用，浏览器也会下载，占带宽
4. 第三方依赖发生变化后，需要重新引入新的url地址

因此，我们用webpack来管理这些脚本，从而解决以上的痛点
1. 包管理器负责依赖的安装
2. package.json定义项目需要的各种模块及项目的配置信息

```bash
# bin目录是存放二进制执行程序的
# 直接在node_modules/.bin目录找webpack脚本执行
$ node node_modules/.bin/webpack

# 有的在.bin目录没有，则需要去对应依赖包里找
$ node node_modules/webpack/bin/webpack.js

# npx 会自动查找webpack这个命令的执行脚本，如果没有找到，则下载
$ npx webpack

# 还可以指定具体的构建配置参数，如下
$ npx webpack --config webpack.config.js

# 这种的话就是直接去package.json里找scripts下的build字段
$ npm run build
```
**注意：**
>如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 - -config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。


#### 2、webpack输入与输出
以下会在dist目录生成一个名为`mainName.js`的文件。
```js
const path = require('path')

module.exports = {
  // 默认是production，代码压缩丑化
  mode: 'development',
  entry: {
    mainName: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
    }
}
```

以下会在dist目录生成一个名为`main.js`的文件。
```js
const path = require('path')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
**综上**：默认情况下会构建出一个名为main的js文件，除非自定义文件名(如上的mainName)。然后在output里面[name]就是取自entry定义的名字。

上面的 [name] 其实就是内置的name变量，这时可以把它看作一个字符串模板函数，每个要输出的文件（也叫chunk）都会通过这个函数去拼接出要输出的文件名称。

内置变量除了上面的name，还有下面几个：
- id : chunk的唯一标识，从0开始(但我这里打印的依然是:main)
- name : chunk的名称
- hash ：compilation对象的hash值
- chunkhash ：chunk内容的hash值

其中hash和chunkhash的长度是可指定的，如[hash:8]代表8位的hash值，默认是20位。

**注意**：hash与chunkhash的区别，[参考](https://www.cnblogs.com/ihardcoder/p/5623411.html)
1. [hash] `is replaced by the hash of the compilation.`
  - compilation对象针对的是随时可变的项目文件，只要文件有变动，就会重建
  - hash是compilation对象计算所得，可以理解为项目总体文件的hash值
  - 因此当输出很多文件时，你肯定不想因为一个文件的改变，把所有其他文件的文件名都改变了。。。
2. [chunkhash] `is replaced by the hash of the chunk.`
  - 代表具体模块(chunk)的hash值
  - 当输出多文件，同时想利用缓存，[chunkhash]无疑是最佳选择

但hash与chunkhash一块使用会报错，如下：
```js
const path = require('path')
module.exports = {
  // 默认是production，代码压缩丑化
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[hash][chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  }
}
// 错误信息
// ERROR in chunk main [entry]
// [hash][chunkhash].js
// Cannot use [chunkhash] or [contenthash] for chunk in '[hash][chunkhash].js' (use [hash] instead)
```

**注意**：webpack编译的文件入口是js文件，不支持其他类型的文件， 因此要编译style文件，需要将其导入到js文件中然后再编译。但这样会造成一个问题，就是**此时无论修改style文件还是js文件，都会导致chunkhash改变**，因为将style样式文件打包到js文件里了，因此此时可以配合插件`extract-text-webpack-plugin`提供的`contenthash`来解决，表示文本内容的hash值，也就是只有style文件hash值。

#### 3、**webpack管理资源**
在webpack之前，我们利用grunt和gulp来处理资源，并将它们从 /src 文件夹移动到 /dist 或 /build 目录中。同样方式也被用于 JavaScript 模块，但是，像 webpack 这样的工具，将动态打包(dynamically bundle)所有依赖项（创建所谓的依赖图(dependency graph)）。这是极好的创举，因为现在每个模块都可以明确表述它自身的依赖，我们将避免打包未使用的模块。

还可以通过loader来引入任何其他类型的文件

#### 3.1、**处理css等样式文件**
[参考1](https://github.com/zhengweikeng/blog/issues/9) <br/>
[参考2](https://blog.csdn.net/u010982507/article/details/81337529)<br/>
[现在推荐使用mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)<br/>
[webpack加载css,sass,less等资源并集成postcss](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/load-css-with-webpack/README.md)

我们要知道，webpack从入口文件开始解析，然后遇到各种类型的资源会尝试寻找对应的loader规则，匹配上了就使用相应的loader处理，处理完再输出到指定目录。然后我们的页面引用的最终文件也是打包完成的，因此如果某些资源处理的不对，页面就会出现错误，同时构建日志会报错。。。

处理样式文件配置流程应为：
1. 安装`npm i -D style-loader,css-loader`
2. 配置webpack匹配css规则

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader','css-loader']
    }
  ]
}
```
3. 编辑css文件，引入并使用

其中[style-loader][styleLoaderUrl]插件作用是在最终页面插入`style`标签，同时自动引入对应的css文件。而且还要在页面中查看（不要检查页面源代码，因为它不会显示结果），查看head标签，就可以看到style标签。

**疑问？**在不使用分离插件时，css文件被打包到了main.js文件里，👆的过程是如何实现的？<br/>
**答:**将原生的css文件打包成js文件时，会在js文件中生成很多额外的函数，用于在运行时将css注入到style标签里。这就会造成文件臃肿，如一个1KB的未被压缩的CSS文件生成的对应的js文件大约有16KB，这导致了输出文件过于庞大，影响传输速度。

先来看看如何分离css,这里用到插件`extract-text-webpack-plugin`,因此先安装，然后增加配置如下：

```js
// 插件使用：https://webpack.docschina.org/plugins/extract-text-webpack-plugin/
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // ExtractTextPlugin.extract(options: loader | object)
        use: ExtractTextPlugin.extract({
          // 应用于没有被提取的css
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  // 注册插件
  plugins: [
    // 实例化插件,ExtractTextPlugin(option: filename | object)
    new ExtractTextPlugin('style.css')
  ]
}
```
**注意**在webpack4中，若直接`npm i -D extract-text-webpack-plugin`,然后配置如上，构建时会报错`Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead`。<br/>
**答:**可以安装时添加`@next`解决(因为当前版本不支持webpack4.0.0以上版本)。

如上处理时优缺点如下：
```
优点    更少 style 标签 (旧版本的 IE 浏览器有限制，IE8有上限)
缺点    额外的 HTTP 请求
优点    CSS SourceMap (使用 devtool: "source-map" 和 extract-text-webpack-plugin?sourceMap 配置)
缺点    css字符串转为style需要更长的编译时间，
优点    CSS 请求并行
缺点    没有运行时(runtime)的公共路径修改
优点    CSS 单独缓存
缺点    没有热替换
优点    更快的浏览器运行时(runtime) (更少代码和 DOM 操作)
缺点    ...
```
`extract-text-webpack-plugin`插件还有不同的参数选项，[点击查看插件详情][extractTextWebpackPluginUrl]
当然插件`extract-text-webpack-plugin`可以分离各种被匹配的资源，但经过上面处理后，文件是被分离出来了，**但style-loader失效了？？？**<br/>
**答:**单纯使用分离插件会使得热更新失效，因为每次生成的文件名都会变(这句说辞待完善)，因此要么手动每次引入，要么就是借助[html-webpack-plugin][htmlWebpackPluginUrl]插件


#### 3.2、**处理图片类文件**
页面需要的图片类文件一般都是用相对路径引用，或使用[vue中的资源路径处理][vueHandleAssetsPath]。

先来看看webpack上关于解析图片路径的原理：<br/>
当使用 `import myImg from './xxx/my-img.png`引入图像时，webpack会利用[file-loader][fileLoaderUrl]处理图片并输出到output目录，并且用`myImg`变量指向该图片处理后的最终url。当使用 [css-loader][cssLoaderUrl] 时，如上所示，你的 CSS 中的 url('./my-img.png') 会使用类似的过程去处理。loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。[html-loader][htmlLoaderUrl] 以相同的方式处理 `<img src="./my-image.png" />`。

`file-loader`生成的文件名就是文件内容的md5哈希值并会保留所引用资源的原始扩展名。

再来看看vue中说的：
例如，`url(./image.png)` 会被转换为 `require('./image.png')` <br/>
而`<img src="../image.png">`会被编译为
```js
createElement('img', { attrs: { src: require('../image.png') }})
```

处理图片步骤：
1. 安装`npm i -D file-loader`
2. 配置webpack匹配图片规则
```js
module:{
  rules:[
    {
      // 要熟记常用正则的用法
      test: /\.(png|svg|jpe?g|gif)$/,
      // use是数组，子元素可以是字符串，可以是对象
      use: [
        {
          loader: 'file-loader',
          options: {
            name (file){
              // [name] type: String default: file.basename
              // [path] type: String default: file.dirname
              // 这里的[name][path]都是插件提供的
              if(env === 'development'){
                return '[path][name].[ext]'
              }
              // hash默认算法是md5,处理的值是文件内容，意味着不是每次编译都变，因为内容不变
              return '[hash].[ext]'
            }
          }
        }
      ]
    }
  ]
}
```
3. 编辑图片文件，引入并使用
```js
// 可以直接这样引入图片，并直接使用
import myImg from './my-img.png'
const newImg = new Image()
newImg.src = myImg
document.appendChild(newImg)
```
**注意**在上述操作后，图片路径少个`/dist/`，因此找不到图片... <br/>
**答:**index.html的位置应该和dist在同一个目录

上面说到[file-loader][fileLoaderUrl]，其实还有[url-loader][urlLoaderUrl]，这两个loader功能相似，只是后者可以设置阈值，当小于阈值时返回DataURL格式的路径。其实DataURL是没有路径可言的，本身就是一个图片资源。

配置如下:
```js
module: [
  {
    test: /\.(png|jpe?g|svg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        option: {
          // 小于10k的转换为dataURL格式
          limit: 10000,
          // 浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理文档,终端：file xxx查看
          // 由类型与子类型两个字符串中间用'/'分隔而组成
          // 这里是指定要转换成的dataurl的文件子类型，需要用到jimp插件(专门修改资源mime类型)
          mimetype: 'image/png',
          // 大于limit的先经过fallback处理，若无fallback则交由file-loader处理
          fallback: 'responsive-loader'
          //  还可以设置处理的质量
          quality: 85,
          // 可以设置name
          name: '[hash:8].[ext]'
        }
      }
    ]
  }
]
```
上面显式的，分别使用了[file-loader][fileLoaderUrl]或者[url-loader][urlLoaderUrl]，如果二者同时使用，则会把[url-loader][urlLoaderUrl]处理的结果再输出到dist目录，也就是说，[url-loader][urlLoaderUrl]处理生成的图片(普通url)或dataURL图片，[file-loader][fileLoaderUrl]会将这些详细信息再输出到dist目录。

**注意：**上面操作生效的前提是，在配置文件里[file-loader][fileLoaderUrl]优先配置，也就是说和顺序有关。

比如：[url-loader][urlLoaderUrl]处理生成的图片文件名为：`020f95e5.png`
然后经过[file-loader][fileLoaderUrl]处理会输出一个新文件如：`1bae1637.png`,图片里的内容为：`module.exports = __webpack_public_path__ + "020f95e5.png";`
注意文件名

**注意：**经过上面的处理，文件内容变成了代码，就不是有效的图片格式，也就打不开了。

**综上：**
上面处理了css，图片等文件类型，其实还可以加载字体类型，数据类型(如：json文件，csv,tsv和xml等)，原理都是相似的。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 [csv-loader][csvLoaderUrl] 和 [xml-loader][xmlLoaderUrl]。


#### 4、**自动更新引入的文件**
上面我们在index.html写死了引入的文件名如`<script src="main.js"></script>`,但如果我们更改了入口名或增加了入口数量，那岂不是每次都得手动改这个index.html。。。

通过[html-webpack-plugin][htmlWebpackPluginUrl]解决上面的问题，这个插件的作用就是在每次compilation发生变化时，都会重新生成html文件。

引入插件步骤：
1. `npm i -D html-webpack-plugin`
2. 增加`webpack.config.js`配置如下
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'output Management',
      // 默认index.html，还可以加子目录：assets/admin.html
      filename: 'my-index.html'
    })
  ]
}
```
经过[html-webpack-plugin][htmlWebpackPluginUrl]插件的处理，不但修复了使用分离css插件后[style-loader][styleLoaderUrl]失效的问题，还每次都重新生成index.html。因此这时把整个dist目录删除了也没问题了。而且生成的index.html就已经包含了各种标签。。。

**注意**如果你在output里配置了publicPath，则在使用[html-webpack-plugin][htmlWebpackPluginUrl]生成的html文件里生成的引用文件路径前缀就是publicPath了


#### 5、**定制输出模板**
到这里你应该思考，这个`index.html`应该是某个模板文件生成，那既然如此，是不是可以定制这个模板呢，没错就是[html-webpack-template][htmlWebpackTemplateUrl],安装然后增加配置如下即可使用：

```js
const HtmlWebpackTemplatePlugin = require('html-webpack-template')
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // required 必填选项
      inject: false,
      template: HtmlWebpackTemplatePlugin
      // template: './src/index.html' //还可以自定义模板

      // Optional 选填选项
      title: 'output Management',
      filename: 'my-index.html',
      // 还可以增加meta等等标签
      meta: [
        {
          name: 'description',
          content: 'A better default template for html-webpack-plugin.'
        }
      ],
    })
  ]
}
```
**注意：**这样意味着，可以根据业务需求自定义模板，可以灵活加以应用。。。


#### 6、**插件删除dist目录**
到目前为止，dist目录里的文件，一直都是手动删除，这不符合程序猿懒的特质，因此[clean-webpack-plugin][cleanWebpcakPluginUrl]需要了解一下：
```js
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  plugins: [
    // new CleanWebpackPlugin(paths [, {options}]) 
    // 参数一：paths是数组或字符串，数组的话可以匹配多个
    // 参数二：paths配置相关的配置
    new CleanWebpackPlugin(['dist','build/*.*','web/*.js'],{
      // __dirname脚本执行的目录
      root:  __dirname
    })
  ]
}
```

#### 7、**webpack管理资源的原理**
你可能会感兴趣，webpack及其插件似乎“知道”应该哪些文件生成？<br/>
答案是，通过 manifest，webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪。这里我们只需知道，webpack背后通过一定的策略来控制模块间的交互。。。（待完善）


#### 8、**开发环境配置**
1. scource map
2. webpack's Watch Mode 
3. webpack-dev-server
4. webpack-dev-middleware

以上我们在修改一个文件以后，需要重新构建，然后刷新浏览器才能看到效果，这在开发环境下无疑是繁琐且笨拙的，这里我们说说开发环境配置。。。

**1. [scource map][sourceMapUrl]** <br/>
当使用webpack打包文件以后，一般会将很多模块打包到一个文件里，因此当具体某个文件错误时debug将变得异常困难，只能粗略的指向打包出来的那个大文件，而无法准确定位到源代码的具体位置，因此`scource map`就需要了解一下

source map,它是一个信息文件,里面存储着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。不过目前好像只有chrome浏览器支持（在开发者工具的`setting`中开启`Enable source maps`）

在开启source map后，打包出来的文件底部会有类似`//@ sourceMappingURL=/path/to/file.js.map`这样的内容，意思是说，具体的map文件在/path/to/file.js.map这里。

只需在webpack.config.js添加下面代码即可
```js
module.exports = {
  // devtool有很多选项,这里说几项，详情参考：https://webpack.docschina.org/configuration/devtool

  // 打包出来的文件底部有sourceMappingURL字样，点击错误定位到的是没经处理的源码位置
  devtool: 'source-map'

  // 打包出来的文件底部没有sourceMappingURL字样，点击错误定位到的是压缩后的代码位置
  // 此时dist目录里有map文件
  devtool: 'hidden-source-map'

  // 和上面不同的是，该模式生成的文件不但有sourceMappingURL字样，而且把具体的map文件内容内联在打包的文件里了，而前两者sourceMappingURL的值只是一个地址
  // 注意此时dist目录没有map文件，因为相当于将map文件内敛到chunk里了，但这样会使得打包出来的文件变大
  devtool: 'inline-source-map'
}
```
>避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
更多请参考：<br/>
[滴滴出行说devtool的几种模式][didiDevtoolUrl]<br/>
[阮一峰-sourceMap详解][ruanyifeng-sourceMapUrl]<br/>


当然打包处理的代码有很多优点：
1. 压缩混淆
2. 多个文件合并，减少http请求
3. 将其他类型文件编译成js，如ts

**2. [webpack's Watch Mode]** <br/>
现在我们每次修改都需要重新构建，并刷新浏览器才能看到结果，这在开发过程中很繁琐，因此我们可以添加watch模式，也就是webapck会自动开启watch模式观察依赖图中的所有的文件，当文件发生变化时，就自动重新构建。。。

修改package.json的scripts如下，然后运行`npm run watch`即可：
```json
{
  "scripts": {
    "watch": "webapck --watch",
    "build": "webpack"
  },
}
```
**注意点**虽然自动重建，但仍然需要刷新浏览器才可以看到效果

**3. [webpack-dev-server][webpackDevServerUrl]** <br/>

在watch模式下，虽然可以监听文件的变动并自动构建，但需要刷新浏览器才可以，因此我们需要借助[webpack-dev-server][webpackDevServerUrl]来帮我们自动刷新浏览。(可以先思考一下，watch模式下，webpack监视的原理是什么？)

[webpack-dev-server][webpackDevServerUrl]提供了一个web服务器，并能够自动重新加载，同样需要先安装。

**注意：**此时是重新加载也就是liveReload，是重新加载整个页面。。。

```bash
npm i -D webpack-dev-server 
```
然后配置webpack服务器监视哪个目录下的文件变动，因为watch模式下已经将变化的文件重新构建并输出到dist目录了，当然devServer肯定集成了watch。。。增加配置文件如下：
```js
// 和entry等同等级
devServer: {
  // 推荐用绝对路径;值为false时表示禁用(此时遍历的目录是？);数组时表示多个目录
  contentBase: path.join(__dirname, "dist"),
  // 当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。
  lazy: true
  // 使用 filename，可以只在某个文件被请求时编译。
  filename:'boundle.js',
  // 在所有响应中添加首部内容：
  headers: {
  "X-Custom-Foo": "bar"
  }
},
```
再修改package.json文件如下：
```json
{
  "scripts": {
    "dev": "webpack-dev-server --open",
    "watch": "webapck --watch",
    "build": "webpack"
  },
}
```
上面的配置--open是说当第一次构建时，自动打开浏览器，当后续修改文件了，会自动构建并重新刷新浏览器。。。<br/>
**注意：**这里的构建只是发生在内存中，并没有dist目录生成，这些看不见的工作webpack在后台处理(详情看devServer原理)。

使用了[webpack-dev-server][webpackDevServerUrl]虽然可以自动构建并自动重新加载，但是**整个页面的重新加载**，浪费资源。因此需要用到[模块热替换(Hot Module Replacement 或 HMR)][hotModuleReplacementUrl]

**[模块热替换(Hot Module Replacement 或 HMR)][hotModuleReplacementUrl]** <br/>
HMR也就是在程序运行的时候替换，添加或删除模块，而无需重新加载整个页面。。。相比LiveReload而言，只刷新改变的部分。

开启HMR的两种方式：
1. 当使用了webapck-dev-server后，可以在配置了`hot:true`以后，还需要实例化`HotModuleReplacementPlugin`插件，这是webpack内置插件
```js
plugins: [
  // 为了更容易查看要修补(patch)的依赖
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
]
```
2. 通过命令行实现，如修改脚本`webpack-dev-server --open --hot`

哪些方式加快开发速度：
- 保留在完全重新加载页面时丢失的应用程序状态。
- 只更新变更内容，以节省宝贵的开发时间。
- 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。

**HMR监听js文件变动** <br/>
HMR是热模块替换，当主文件引用了另一个js文件，当这个js文件发生变化时，可以将这个变化的文件传递给[module.hot][moduleHotUrl]这个属性下的`accept`接口。也就是说，通过[HotModuleReplacementPlugin][hotModuleReplacementUrl]插件开启了HMR以后，同时还提供一些相关接口，这些接口可以接受依赖模块的更新，并触发一个回调函数。还可以获取模块热替换进程的状态等信息。。。如下：
```js
if(module.hot){
  // 当更新lazy.js文件后，会在控制台打印module is updated...
  module.hot.accept('./views/lazy',function(){
    console.log('module is updated...');
  })
}
```

**注意：**监听的这个js文件不能作为入口，参考[启用HMR](https://www.webpackjs.com/guides/hot-module-replacement/#%E5%90%AF%E7%94%A8-hmr)


**HMR监听样式文件变动** <br/>
此前说过style-loader，其实当更新css依赖模块时，此loader在后台使用[module.hot.accept][moduleHotUrl]来修补**(patch)** `<style>`标签。

此处出现了patch，意思是修补，可以理解为更新的意思。另外如果此时像监听js一样监听css,则不会触发如下：
```js
if(module.hot){
  // 此时更新style.css，则不会触发回调。。。猜测是被style-loader拦截了
  module.hot.accept('./views/style.css',function(){
    console.log('css module is updated...');
  })
}
```
综上：
>HMR 是可选功能，只会影响包含 HMR 代码的模块。举个例子，通过 style-loader 为 style 样式追加补丁。 为了运行追加补丁，style-loader 实现了 HMR 接口；当它通过 HMR 接收到更新，它会使用新的样式替换旧的样式。

>类似的，当在一个模块中实现了 HMR 接口，你可以描述出当模块被更新后发生了什么。然而在多数情况下，不需要强制在每个模块中写入 HMR 代码。如果一个模块没有 HMR 处理函数，更新就会冒泡。这意味着一个简单的处理函数能够对整个模块树(complete module tree)进行更新。如果在这个模块树中，一个单独的模块被更新，那么整组依赖模块都会被重新加载。

**4. [webpack-dev-middleware][webpackDevMiddlewareUrl]** <br/>
`webpack-dev-middleware` 是一个容器(wrapper)，他可以把webpack处理后的文件传递给一个服务器(server)。webpack-dev-server在内部使用了它，它也可以作为一个单独的包来使用，接下来我们配合express来使用它。

1. `npm i -D express webpack-dev-middleware`
2. 增加webpack.config.js里output的publicPath

```js
output: {
  filename: '[name].js',
  // 这个只是本地硬盘上的路径
  path: path.resolve(__dirname, 'dist'),
  // 所有通过html-webpack-plugin插件插入到页面的资源，前缀都会添加/spa/,如果是/spa，则是/spaxxx
  // 绝对路径则会拼接上服务名，很少用相对路径
  // 完整的路径如https://www.baidu.com，一般是将资源托管到第三方平台
  publicPath: '/spa/'
}
```

3. 增加服务器文件。

```js
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

// 将webpackDevMiddleware插件挂载在express上，用webpack.config.js的配置路径来配置服务器的地址
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.listen(3000, function(){
  console.log('server is running : http://localhost:3000')
})
```

4. 在package.json里增加

```json
"scripts": {
  "server": "node server.js"
}
```
5. 启动服务`npm run server`

这时你会发现访问`http://localhost:3000`失败，因为我们给服务配置了`publicPath`,因此需要访问`http://localhost:3000/spa/`

**总结**
[webpack-dev-middleware][webpackDevMiddlewareUrl]的作用是生成一个与wabpack的compiler绑定的中间件，然后在express启动的服务上调用这个中间件。

[webpack-dev-middleware][webpackDevMiddlewareUrl]插件作用主要有三点：
1. 通过watch mode，监听资源的变更，然后自动打包
2. 快速编译，走内存
3. 返回中间件，支持express的use格式

**特别注明：**webpack明明可以用watch mode，可以实现一样的效果，但是为什么还需要这个中间件呢？<br/>
**答:**，第二点所提到的，采用了内存方式。如果，只依赖webpack的watch mode来监听文件变更，自动打包，每次变更，都将新文件打包到本地，就会很慢。而[webpack-dev-middleware][webpackDevMiddlewareUrl]插件每次构建及打包都是在内存中完成，意味着此时不会生成dist



#### 9、**tree shaking**
随着项目越来越大，项目里可能会引入大量用不到的模块，如果这些模块都打包到chunk里，势必造成带宽浪费，因此需要一种手段将其清除，也就是`tree shaking`

新的 webpack 4 正式版本，扩展了这个检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

***9.1、tree shaking原理***<br/>
tree shaking是一个术语，通常用于描述移除js上下文中的未引用代码（dead-code）。它依赖于es6模块系统的[静态结构特性][es6StaticDataFeatureUrl],例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。

Es6引入自己的模块格式的一个原因是为了支持静态结构，有以下几个好处。
1. dead code elimination during bundling
- 加载打包后的文件，可以检索更少的文件
- 压缩打包后的文件，比压缩单独的文件更有效
- bunding过程中可以删除dead code

2. compact bundling, no custom bundle format
	- 它们的静态结构意味着 bundle 格式不必考虑有条件加载的模块
	- 导入是导出的只读视图，这意味着您不必复制导出，可以直接引用它们

3.  faster lookup of imports (更快的查找导入)
	- es6模块导入的库，可以静态的知道并优化

4. variable checking (检查变量)
	- 静态模块结构，您总是静态地知道哪些变量在模块内的任何位置都是可见的
	- 全局变量: 唯一完全的全局变量将越来越多地来自语言本身。 其他的一切都将来自模块(包括来自标准库和浏览器的功能)。 
	- 对检查给定标识符是否拼写正确非常有帮助(其实就是语法检查)
5. ready for macros （可以使用宏了，在编译期间可操作语法树）

***9.2、tree shaking使用***<br/>
使用步骤：
1. 定义类似如下文件
```js
// math.js
export function square {
	return x * x
}
export function cube {
	return x * x * x
}
```
2. 在主文件中引入math.js中一个函数并使用
```js
import {cube} from './views/math'
console.log(cube(2))
```
3. 开启 production模式这个webpack 编译标记，来启用 uglifyjs 压缩插件
查看处理后的代码已经删除了未用的到的代码，而且处理后的代码类似如下：
```js
"./src/views/math.js":function(n,t,r){"use strict";function e(n){return n*n*n}r.d(t,"a",function(){return e})}});
```

**注意：**sideEffects在webpack的rules里配置没有效果。。。你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。


#### 10、**生产环境构建**





[vueHandleAssetsPath]: https://vue-loader-v14.vuejs.org/zh-cn/configurations/asset-url.html
[extractTextWebpackPluginUrl]: https://webpack.docschina.org/plugins/extract-text-webpack-plugin/
[cssLoaderUrl]: https://github.com/webpack-contrib/css-loader
[styleLoaderUrl]: https://github.com/webpack-contrib/style-loader
[fileLoaderUrl]: https://github.com/webpack-contrib/file-loader
[urlLoaderUrl]: https://github.com/webpack-contrib/url-loader
[htmlLoaderUrl]: https://github.com/webpack-contrib/html-loader
[oldWebpackUrl]: https://zhaoda.net/webpack-handbook/
[v4.15.1WebpackUrl]: https://webpack.css88.com/loaders/node-loader.html
[v4.26.0WebpackUrl]: https://www.webpackjs.com/configuration/target/
[csvLoaderUrl]: https://github.com/theplatapi/csv-loader
[xmlLoaderUrl]: https://github.com/gisikw/xml-loader
[htmlWebpackPluginUrl]: https://github.com/jantimon/html-webpack-plugin
[htmlWebpackTemplateUrl]: https://github.com/jaketrent/html-webpack-template
[cleanWebpcakPluginUrl]: https://www.npmjs.com/package/clean-webpack-plugin
[sourceMapUrl]: https://webpack.docschina.org/configuration/devtool
[didiDevtoolUrl]: https://juejin.im/post/58293502a0bb9f005767ba2f
[ruanyifeng-sourceMapUrl]: http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
[webpackDevServerUrl]: https://www.webpackjs.com/configuration/dev-server/
[hotModuleReplacementUrl]: https://webpack.docschina.org/guides/hot-module-replacement
[moduleHotUrl]: https://www.webpackjs.com/api/hot-module-replacement/
[webpackDevMiddlewareUrl]: https://www.webpackjs.com/api/hot-module-replacement/
[treeShakingUrl]: https://webpack.docschina.org/guides/tree-shaking/
[es6StaticDataFeatureUrl]: http://exploringjs.com/es6/ch_modules.html#static-module-structure