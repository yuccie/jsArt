---
layout: post
title: eslint使用
date: Mon Jan 07 2019 15:01:05 GMT+0800 (中国标准时间)
---
#### webpack中文文档
1. [eslint简单使用][eslintSampleUseUrl]
2. [几种不同的代码规范][diffKindsEslintUrl]
3. [官方eslint][officalEslintUrl]


#### 1、[eslint代码检测工具][eslintSampleUseUrl]
注意事项:<br/>
1. eslint可以使用使用全局的(usr/local/lib/node_modules/eslint)，也可以是用项目内安装的(node_modules/.bin/eslint)
2. 若项目里有.eslintrc文件，且root：true，则不会读取全局环境的配置，只会读项目内的
3. 所有规则默认是禁用的，使用 "extends": "eslint:recommended" 可以开启配置
4. 有没有办法，一条一条的修复，而不是eslint --fix修复全部？


[eslintSampleUseUrl]: https://www.jianshu.com/p/ad1e46faaea2
[diffKindsEslintUrl]: https://www.css88.com/archives/8405
[officalEslintUrl]: https://cn.eslint.org/docs/rules/



