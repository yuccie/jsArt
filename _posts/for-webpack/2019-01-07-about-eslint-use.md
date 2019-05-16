---
layout: post
title: eslint使用
date: Mon Jan 07 2019 15:01:05 GMT+0800 (中国标准时间)
---
#### eslint中文文档

1. [eslint简单使用][eslintSampleUseUrl]
2. [几种不同的代码规范][diffKindsEslintUrl]
3. [官方eslint][officalEslintUrl]

1、[eslint代码检测工具][eslintSampleUseUrl]

注意事项:  

1. eslint可以使用使用全局的(usr/local/lib/node_modules/eslint)，也可以是用项目内安装的(node_modules/.bin/eslint)
2. 若项目里有.eslintrc文件，且root：true，则不会读取全局环境的配置，只会读项目内的
3. 所有规则默认是禁用的，使用 "extends": "eslint:recommended" 可以开启配置
4. 有没有办法，一条一条的修复，而不是eslint --fix修复全部？


#### Condition always false

在使用`UglifyJsPlugin`压缩文件时，若开启警告信息，有时会报`Condition always false`的错误，其实是在警告类似下面的情况

```js
if(true) foo = 1
// has been removed to
foo = 1
```

#### Dropping unreachable code

在使用`UglifyJsPlugin`压缩文件时，若开启警告信息，有时会报`Dropping unreachable code`的错误，其实是在警告有些代码无用的意思

`Dropping side-effect-free statement`放弃无用的声明

`Side effects in initialization of unused variable methods`初始化未使用的变量方法的副作用

`Condition left of || always true` 左侧变量一直为true

#### 


[eslintSampleUseUrl]: https://www.jianshu.com/p/ad1e46faaea2
[diffKindsEslintUrl]: https://www.css88.com/archives/8405
[officalEslintUrl]: https://cn.eslint.org/docs/rules/



