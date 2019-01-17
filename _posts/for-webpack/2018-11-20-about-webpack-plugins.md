---
layout: post
title: webpack的那些插件们
date: Tue Nov 20 2018 16:48:56 GMT+0800 (中国标准时间)
---

#### 插件的作用
插件可以理解为webpack构建过程中的中间件，配合不同的插件可以构建出不同效果的目标文件。

#### webpack插件的分类
- 内置插件
- 第三方插件

**内置插件**可以通过`new webpack[plugin-name](option)`方式实例化，其中option是传入插件的配置选项<br/>

**第三方插件**需要如下操作：
```bash
# 比如安装混淆插件
npm i -D uglifyjs-webpack-plugin
```

```js
// webpack.config.js
// 引入插件
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry:[],
  output:{},
  plugin:[
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          // 构建过程中不显示各种警告或错误信息
          warnings: false
        },
      },
      sourceMap: true,
      
      // 可理解多进程，true时为os.cpus().length - 1
      // 还可以为具体的number类型，效果的话小项目感觉不出来。。。
      parallel: true
    }),
  ]
}
```


// 实例化插件

```js
const a = 'test'
```


#### eslint快速使用
参考：[eslint快速使用][eslintUseUrl]






[eslintUseUrl]: https://www.jianshu.com/p/ad1e46faaea2


