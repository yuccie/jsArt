---
layout: post
title: 了解一下android
date: Mon Nov 26 2017 16:18:51 GMT+0800 (中国标准时间)
---

## 关于flutter

要运行flutter，首先需要有运行环境，因为应用是运行在安卓和ios上，因此一般都需要先配置这两个环境，当然首先还是先安装flutter

### 配置flutter

从官网下载或者github仓库下载即可，下载完只需要解压到某个文件夹即可，解压完需要配置环境变量。

```
# flutter
# /Applications/flutter 就是flutter sdk的目录
export PATH="$PATH:/Applications/flutter/bin"
```

然后运行：flutter doctor，会自动检测还缺少哪些环境没有配置，根据提示再去安装。

#### 安装安卓相关的环境

安卓相关的环境通过 ide Android studio就可以自动配置，首先下载安装，安装后初次打开会自动下载安卓相关的sdk。然后因为vs code 需要创建安卓相关的模拟器，因此还需要在Android studio下载模拟器（说白了就是各个手机的模拟器）。

[参考](https://blog.csdn.net/qq_40259641/article/details/90475896)

#### 安装ios相关的环境

ios相关的环境，需要安装x-code(有时候系统不支持新的x-code，还需要更新系统)。安装完之后，不像安卓，ios不需要手动增加模拟器，安装成功后，vscode自动就会多出ios相关的模拟器。


### 安装依赖

不像npm依赖的安装方式，在flutter中需要`flutter packages get`方式安装依赖



#### 关于android学习的几点建议
[开发android需要哪些技能][http://www.imooc.com/article/1350]

