---
layout: post
title: 浏览器的那些黑科技
date: Sat Nov 24 2018 14:53:50 GMT+0800 (中国标准时间)
---


### [Console Importer][consoleImporterUrl]
我们经常使用npm包，但使用的场合一般需要借助加载器才行，但还可以直接在浏览器开发者控制器里使用，只需安装chrome插件[Console Importer][consoleImporterUrl]即可。使用时在控制台直接：`$i('npm包名')`即可，然后控制台就会自动下载包，然后就可以使用包里的api了。


### copy()
在控制台可以使用全局方法`copy()`复制任何你想要复制的变量，然后再粘贴到编辑器里即可。。。**而且还是json格式化好的**

参考：[juejinChromeSkillUrl]

### webview进程之间通信
App中大量Web页面的使用容易导致App内存占用巨大，存在内存泄露，崩溃率高等问题，WebView独立进程的使用是解决Android WebView相关问题的一个合理的方案。

jsBridge解析：[jsBridgeAnalysisUrl]<br/>
多进程webview：[webviewUseUrl]<br/>
不同webview之间通信参考：[diffWebviewCommunicationUrl]<br/>


### 




[consoleImporterUrl]: https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related
[juejinChromeSkillUrl]: https://juejin.im/post/5c0a0d5ff265da61117a1c75
[webviewUseUrl]: https://juejin.im/entry/5a3513daf265da43305e89bf
[diffWebviewCommunicationUrl]: https://blog.csdn.net/luofen521/article/details/77869834
[jsBridgeAnalysisUrl]: http://zjutkz.net/2016/04/17/%E5%A5%BD%E5%A5%BD%E5%92%8Ch5%E6%B2%9F%E9%80%9A%EF%BC%81%E5%87%A0%E7%A7%8D%E5%B8%B8%E8%A7%81%E7%9A%84hybrid%E9%80%9A%E4%BF%A1%E6%96%B9%E5%BC%8F/

[chromeDevtoolUrl]: https://developers.google.com/web/tools/chrome-devtools/?hl=zh-cn '开发者文档'


