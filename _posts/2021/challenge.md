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

还可以如下的配置node debugger启动的方式：
```js
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "runtimeExecutable": "npm",
            // 下面会拼接成最终的命令行，如：npm run dev ，注意控制台显示的npm一般都是绝对定位，拼上环境变量上
            "runtimeArgs": [
                "run",
                "dev"
            ],
            // 下面的命令是在执行 runtimeArgs 之前执行的任务，需要 cmd + shift + p -》 tasks： 配置任务
            // 会在.vscode下面生成类似下面的任务，其实就是前置钩子任务，用来切换node版本，当然也可以nvm设置默认的node版本，然后重启编辑器才生效
            "preLaunchTask": "node10"
        }
    ]
}


{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "shell",
			"label": "node10",
			"command": "nvm use 10"
		},
		{
			"type": "shell",
			"label": "node14",
			"command": "nvm use 14"
		},
	]
}
```

不过有时候，直接使用上面的方式，会提示：zsh:1: command not found: nvm，在正常终端里使用nvm没有问题。。。主要因为在vscode里开启的debugger环境里，环境变量并没有生效。

因此需要单独配置环境量，此时：which nvm，发现出现一大坨东西。。。并不是想要的环境变量PATH，这是因为 nvm并没有常规的bin启动文件，不像其他的启动脚本。此时可以查看对应的shell，可以看到类似如下：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion 自动补全
```

既然没有了环境变量，则需要将上面的内容都配置到command里，如下：

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "shell",
			"command": "export NVM_DIR=$HOME/.nvm && [ -s $NVM_DIR/nvm.sh ] && \\. $NVM_DIR/nvm.sh && nvm use 10",
			"label": "node10",
		}
	]
}
```
综上有几种方式：
1. 如果控制台可以找到对应的bin，说明环境变量没问题， nvm alias default 10 设置默认值，然后重启vscode生效
2. 增加preLaunchTask钩子，同时添加task任务配置。 参考：http://keep.ipromiseyourlife.com/2019/10/31/vscode%E4%B8%AD%E9%85%8D%E7%BD%AE%E4%B8%80%E9%94%AE%E5%88%87%E6%8D%A2node%E7%89%88%E6%9C%AC/

## 调试server端代码，还可以这样
1、在浏览器中输入： chrome://inspect/#devices  
2、点击 Open dedicated DevTools for Node

如果对 命令行不是很了解，可以将整个命令复制到：https://explainshell.com 搜索，可以简要的给出各个命令的含义。

## adb调试手机

adb的全称为Android Debug Bridge，就是起到调试桥的作用。

Android 调试桥 (adb) **是一种功能多样的命令行工具，可让您与设备进行通信**。**adb 命令可用于执行各种设备操作，例如安装和调试应用**。adb 提供对 Unix shell（可用来在设备上运行各种命令）的访问权限。它是一种客户端-服务器程序，包括以下三个组件：

- 客户端：用于发送命令。客户端在开发机器上运行。您可以通过发出 adb 命令从命令行终端调用客户端。
- 守护程序 (adbd)：用于在设备上运行命令。守护程序在每个设备上作为后台进程运行。
- 服务器：用于管理客户端与守护程序之间的通信。服务器在开发机器上作为后台进程运行。

### 工作原理

当您启动某个 adb 客户端时，该客户端会先检查是否有 adb 服务器进程已在运行。如果没有，它会启动服务器进程。服务器在启动后会与本地 TCP 端口 5037 绑定，并监听 adb 客户端发出的命令。

然后，服务器会与所有正在运行的设备建立连接。它通过扫描 5555 到 5585 之间（该范围供前 16 个模拟器使用）的奇数号端口查找模拟器。服务器一旦发现 adb 守护程序 (adbd)，便会与相应的端口建立连接。

综上：
- adb 会在本地启动客户端和服务器
- 而adbd 是安卓手机里自动启动的后台服务，然后adb的服务器能扫描到 adbd 守护进程，从而实现通信

```bash
# 第一次启动adb，会有如下信息
➜  platform-tools ./adb devices
* daemon not running; starting now at tcp:5037 # 服务器还没启动
* daemon started successfully				   # 服务器启动成功
List of devices attached
```

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

