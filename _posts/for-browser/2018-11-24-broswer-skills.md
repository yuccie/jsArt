---
layout: post
title: 浏览器的那些黑科技
date: Sat Nov 24 2018 14:53:50 GMT+0800 (中国标准时间)
---


### chrome浏览器正确查询姿势，搜索技巧

#### or或+，一次搜索多个内容

可以搜索一个单词或短语以及第二个单词或短语。这有助于缩小搜索范围，以帮助你找到所需内容。如下：

- 谷歌 or 百度
- 谷歌 + 百度

#### 精确搜索

其实就是完全匹配搜索，我们经常搜索时，直接输入关键词，然后空格隔开，比如：vue watch，其实这样得到的结果是vue、watch、vue watch等相关的内容，比较多。

此时输入："vue watch"，则只会得到 vue watch 相关的内容。尤其对于想搜索关键词顺序且连续的场合。

#### 连字符排除或增加关键词

连字符与后面关键词注意没有空格。

- 前端 -百度，搜索结果将会排除 百度 的内容，
- 前端 +掘金，搜索结果将会只包含 知乎 的内容


#### 搜索特定网站里的内容

- 前端 site:juejin.im，只搜索掘金网站里的内容

#### 找到链接到其他页面的页面

比如你发布了一篇文章，想看看都谁引用了你的这篇文章，可以如下查询：

- link:wenzhang.com

#### 使用星号通配符

通配符星号，会留下一个占位符，占位符表示一个或多个之后可能被搜索引擎自动填充

- "where * you now"，将会搜索出fade歌曲

#### 搜索同义词

- ～喜欢
- ～喜欢 -喜欢 只搜索喜欢的同义词不要原词

#### 查找和其他站点类似的网站，常用于竞争对手检索

如果想查找类似某个网站的网站，比如类似知乎的网站，都有哪些：

- related:zhihu.com，将会搜索出豆瓣、bilibili等

#### 搜索url相关

- inurl:科幻，搜索url包含 科幻 关键词的页面
- allinurl:SEO 搜索引擎优化，相当于：inurl:SEO inurl:搜索引擎优化

#### 搜索title相关

指令返回的是页面title 中包含关键词的页面，Google 和百度都支持intitle 指令。
使用intitle 指令找到的文件是更准确的竞争页面。如果关键词只出现在页面可见文字中，而没有出现在title 中，大部分情况是并没有针对关键词进行优化，所以也不是有力的竞争对手。

- intitle:前端，搜索页面title里包含前端的页面
- allintitle:SEO 搜索引擎优化，相当于intitle:SEO intitle:搜索引擎优化

#### 搜索某类图片

只搜索某类图片

- image:美食，只搜索关于美食的图片

#### 搜索范围之内

使用两个点（..）就能让谷歌在..后面范围内进行搜索。

- 奥斯卡 ..2010，将只会搜索2010年之前的奥卡斯信息。
- 奥斯卡 1990.. 2010，将只会搜索2010年之前，1990之后的奥卡斯信息。

#### 位置搜索

比如说你需要搜索附近的kfc店铺

- kfc places nearby，谷歌搜索将获取你的位置，并提供关于你附近kfc的各种结果。

#### 查找指定位置的新闻

查找指定位置处相关xianmi的新闻

- xiaomi location:india，查找印度关于小米的新闻

#### 查找特定文件

谷歌搜索中经常被遗忘的功能是搜索特定文件或文件类型的能力。如果你需要先前查看过或需要用于其他项目的特定PDF或PowerPoint文件，这将是莫大的帮助。

xxx filetype:pdf

使用filetype的命令，（filetype）后加你想要的任何文件类型的扩展名。将只会搜索pdf格式

#### 单位转换

- 10 miles to km 将显示10英里转换成多少公里
- 10 人民币 to 美元 将显示10人民币转化多少美元
- 100rmb = ?hkd
- 绘制图表：例如：graph for six(x)  或者 graph for x^2 + y^2

#### 快捷方式

- 菜单 to english，翻译
- time 纽约，将显示你输入地方的时间
- Calculator，计算器
- BAIDU，根据股票名将显示股票信息
- weatcher in beijing，北京的天气
- sunrise & sunset shanghai，上海的日出和日落时间
- play pacman，就可以玩pacman游戏了







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

[consoleImporterUrl]: https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related
[juejinChromeSkillUrl]: https://juejin.im/post/5c0a0d5ff265da61117a1c75
[webviewUseUrl]: https://juejin.im/entry/5a3513daf265da43305e89bf
[diffWebviewCommunicationUrl]: https://blog.csdn.net/luofen521/article/details/77869834
[jsBridgeAnalysisUrl]: http://zjutkz.net/2016/04/17/%E5%A5%BD%E5%A5%BD%E5%92%8Ch5%E6%B2%9F%E9%80%9A%EF%BC%81%E5%87%A0%E7%A7%8D%E5%B8%B8%E8%A7%81%E7%9A%84hybrid%E9%80%9A%E4%BF%A1%E6%96%B9%E5%BC%8F/

[chromeDevtoolUrl]: https://developers.google.com/web/tools/chrome-devtools/?hl=zh-cn '开发者文档'


