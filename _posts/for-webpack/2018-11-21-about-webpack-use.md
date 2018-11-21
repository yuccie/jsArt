---
layout: post
title: webpack使用
date: Tue Nov 20 2018 16:48:56 GMT+0800 (中国标准时间)
---

#### webpack管理pageage的好处
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
>如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。


#### webpack输入与输出
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

上面的 [name] 其实就是内置的name变量，这时可以把它看作一个字符串模板函数，每个要输出的文件（也叫chunk）都会通过这个函数去拼接处要输出的文件名称。

内置变量除了上面的name，还有下面几个：
- id : chunk的唯一标识，从0开始(但我这里打印的依然是:main)
- name : chunk的名称
- hash ：compilation对象的hash值(如默认20位：1cdec354500d2419a5c8)
- chunkhash ：chunk内容的hash值(如默认20位：76cf6ec9cda20554951d)
其中hash和chunkhash的长度是可指定的，[hash:8]代表8位的hash值，默认是20位。

**注意**：hash与chunkhash的区别，[参考](https://www.cnblogs.com/ihardcoder/p/5623411.html)
1. [hash] is replaced by the hash of the compilation.
  - compilation对象针对的是随时可变的项目文件，只要文件有变动，就会重建
  - hash是compilation对象计算所得，可以理解为项目总体文件的hash值
  - 因此当输出很多文件时，你肯定不想因为一个文件的改变，把所有其他文件都改变了。。。
2. [chunkhash] is replaced by the hash of the chunk.
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

**注意**：webpack编译的文件入口是js文件，不支持其他类型的文件， 因此要编译style文件，需要将其导入到js文件中然后再编译。但这样会造成一个问题，就是*此时无论修改style文件还是js文件，都会导致chunkhash改变*，因此此时需要配合插件`extract-text-webpack-plugin`提供的`contenthash`来解决，表示文本内容的hash值，也就是只有style文件hash值。

#### webpack管理资源
在webpack之前，我们利用grunt和gulp来处理资源，并将它们从 /src 文件夹移动到 /dist 或 /build 目录中。同样方式也被用于 JavaScript 模块，但是，像 webpack 这样的工具，将动态打包(dynamically bundle)所有依赖项（创建所谓的依赖图(dependency graph)）。这是极好的创举，因为现在每个模块都可以明确表述它自身的依赖，我们将避免打包未使用的模块。

还可以通过loader来引入任何其他类型的文件

#### 处理css等样式文件
[参考1](https://github.com/zhengweikeng/blog/issues/9)
[参考2](https://blog.csdn.net/u010982507/article/details/81337529)
[现在推荐使用mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
[webpack加载css,sass,less等资源并集成postcss](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/load-css-with-webpack/README.md)

我们要知道，webpack从入口文件开始解析，然后遇到各种类型的资源会尝试寻找对应的loader规则，匹配上了就使用相应的loader处理，处理完再输出到指定目录。然后我们的页面引用的最终文件也是打包完成的。。。

因此如果某些资源处理的不对，页面就会出现错误，同时构建日志会报错。。。
因此流程应为：
1. 安装`npm i -D style-loader,css-loader`
2. 配置webpack匹配css规则
```js
module:{
  rules:[
    {
      test: /\.css$/,
      use: ['style-loader','css-loader']
    }
  ]
}
```
3. 编辑css文件，引入并使用

其中`style-loader`插件作用是在最终页面插入`style`标签，同时自动引入对应的css文件。而且还要在页面中查看（不要检查页面源代码，因为它不会显示结果），查看head标签，就可以看到style标签。

**疑问？**在不使用分离插件时，css文件被打包到了main.js文件里，👆的过程是如何实现的？
答：将原生的css文件打包成js文件时，会在js文件中生成很多额外的函数，用于在运行时将css注入到style标签里。这就会造成文件臃肿，如一个1KB的未被压缩的CSS文件生成的对应的JavaScript文件大约有16KB，这导致了输出文件过于庞大，影响传输速度。

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
**注意**在webpack4中，若直接`npm i -D extract-text-webpack-plugin`,然后配置如上，构建时会报错`Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead`。可以安装时添加`@next`解决(因为当前版本不支持webpack4.0.0以上版本)。

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
当然插件`extract-text-webpack-plugin`可以分离各种被匹配的资源，但经过上面处理后，文件是被分离出来了，**但style-loader失效了？？？**


#### 处理图片类文件
页面需要的图片类文件一般都是用相对路径引用，或使用[vue中的资源路径处理][vueHandleAssetsPath]。

先来看看webpack上关于解析图片路径的原理：当使用 `import myImg from './xxx/my-img.png`引入图像时，webpack会利用`file-loader`处理图片并输出到output目录，并且用`myImg`变量指向该图像在处理后的最终url。当使用 css-loader 时，如上所示，你的 CSS 中的 url('./my-img.png') 会使用类似的过程去处理。loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。html-loader 以相同的方式处理 <img src="./my-image.png" />。

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
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name (file){
              if(env === 'development'){
                return '[path][name].[ext]'
              }
              return '[hash].[ext]'
            }
          }
        }
      ]
    }
  ]
}
import myImg from './my-img.png'
```
3. 编辑图片文件，引入并使用
```js
// 可以直接这样引入图片，并直接使用
import myImg from './my-img.png'
const newImg = new Image()
newImg.src = myImg
document.appendChild(newImg)
```
**注意**在上述操作后，图片路径少个`/dist/`，因此找不到图片...
答：index.html的位置应该和dist在同一个目录

上面说到file-loader，其实还有url-loader，这两个loader功能相似，只是后者可以设置阈值，当小于阈值时返回DataURL格式的路径。其实DataURL是没有路径可言的，本身就是一个图片资源。

配置如下:
```js
module: [
  {
    test: /\.(png|jpg|svg|gif)$/,
    // use是数组，子元素可以传入对象
    use: [
      {
        loader: 'url-loader',
        option: {
          // 小于10k的转换为dataURL格式
          limit: 10000,
          // 浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理文档,终端：file xxx查看
          // 由类型与子类型两个字符串中间用'/'分隔而组成
          // 这里是指定要转换成的dataurl的子类型，用到jimp插件(专门修改资源mime类型)
          mimetype: 'image/png',
          // 大于limit的先经过fallback处理，若无fallback则交由file-loader处理
          fallback: 'responsive-loader'
        }
      }
    ]
  }
]
```


[vueHandleAssetsPath]: https://vue-loader-v14.vuejs.org/zh-cn/configurations/asset-url.html
[extractTextWebpackPluginUrl]: https://webpack.docschina.org/plugins/extract-text-webpack-plugin/