## 挑战清单

完成的都会被划掉：
1. 小的demo，需要完成todolist级别


- 还是得学英语。。。
- 文件上传功能，支持断点续传等
- 文件上传vscode插件
- chrome插件
- ~~vscode调试node~~
- 开发一个electron应用
- 开发一个鸿蒙简单应用
- 编译原理，
- rust原理
- 

## 完成列表

### vscode上调试node代码

有几种方式，[参考](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_auto-attach)，这里使用方式一：

1. `⇧⌘P` 搜索 Toggle Auto Attach ，打开start模式，当然也可以always
2. 在控制台直接 node inspect xx.js 即可

注意：**每次切换Auto Attach都需要重启控制台，或者无效。**

### 开发一个鸿蒙简单todolist

HarmonyOS 是一款“面向未来”、面向全场景（移动办公、运动健康、社交通信、媒体娱乐等）的分布式操作系统。在传统的单设备系统能力的基础上，HarmonyOS 提出了基于同一套系统能力、适配多种终端形态的分布式理念，能够支持手机、平板、智能穿戴、智慧屏、车机、PC、智能音箱、耳机、AR/VR 眼镜等多种终端设备。

[卡颂：前端视角看harmonyOS](https://mp.weixin.qq.com/s?__biz=MzkzMjIxNTcyMA==&mid=2247487356&idx=2&sn=85fa258366570498baebd5a74d7dab7e&chksm=c25e61bbf529e8ad893dc01a8a0ee705ed03739f1666f7785a057e392ad501c5c1c746153a4c&scene=132#wechat_redirect)

一些入口
- [开发文档](https://developer.harmonyos.com/cn/)
- [仓库地址](https://gitee.com/openharmony)
- [鸿蒙系统应用在线开发](https://playground.harmonyos.com/#/cn/onlineDemo)
- 

一些点：
- 在Java语言规范中，规定了Java语言中基本数据类型的取值范围和行为。其次，所有Java文件要编译成统一的Class文件。最后，通过Java虚拟机将Class文件转成对应平台的二进制文件。
- Java的平台无关性是建立在Java虚拟机的平台有关性基础之上的，是因为Java虚拟机屏蔽了底层操作系统和硬件的差异。

总结：
- 开发阶段，使用方舟编译器将源码编译成适配各个终端的机器码，而不像常规安卓应用打包完还是java代码，还需要在用户手机的虚拟机去编译
- 安卓只支持java开发，但鸿蒙可以支持多个语言：Java、XML（Extensible Markup Language）、C/C++ 、 JS（JavaScript）、CSS（Cascading Style Sheets）和 HML（HarmonyOS Markup Language）。
- 鸿蒙不光是个手机操作系统，还是个IOT(internet of things)操作系统
- 鸿蒙系统可以让处于局域网内的设备互连，并共享数据等
- 前端开发鸿蒙应用，可以使用类似小程序的语言开发。

