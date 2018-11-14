---
layout: post
title: about echarts
date: 2018-11-13T11:25:48.469Ze
---


#### ECharts
ECharts是百度关于数据可视化的库，对外暴露一些接口，用来控制可视化图表的样式及展示的数据内容等等。相关的库还有[HighCharts](https://www.highcharts.com/)、[阿里G2](https://antv.alipay.com/zh-cn/g2/3.x/index.html)、[Chart.js](https://www.chartjs.org/)等，还有主打3d的[three.js](https://threejs.org/)。

#### ECharts 基本用法
现在的项目多是用webpack构建工具，因此直接如下：
```js
// # 安装echarts
npm install echarts -S

// 引入echarts，当然这是引入echarts的所有模块;如按需引入，需先引入主模块，然后再引入各个组件模块
// import引入模块，若是自执行模块，可以省略文件名，如：import '自执行模块'
import echarts from 'echarts'

// echarts实例化
// 有三个参数，参数1是元素必填，参数2是主题，参数3是选项（设备像素比，渲染器，宽高）
let newInstance = echarts.init(dom [,option])

// echarts实例初始化
// 一般情况会自定义图表组件，然后图表组件有props默认数据，然后父组件会通过props传递异步数据。图表组件watch props变化，然后更新。
// 但第一次初始化props数据时，不能触发watch，因此可以手动触发watch，即mounted时给props添加属性触发watch；还可以将watch里的逻辑抽离，然后在mounted里执行一次。
newInstance.setOption(option)

// 设置resize，echarts有自己的resize事件，无需自己控制。另外为resize时交互性更好，可以加节流
// 节流是间隔运行，防抖类似电梯，若有人上则一直停止运行
window.addEventLister('resize', throttle(() => {
  newInstance.resize();
}, 1000))
```

#### 相关的知识点
1. echarts结构
	- 其实也是类似ps的分层结构，series里的很多类型图表都可以叠加在一个echarts实例上
	- 可以对每一层设置zleave，然后然后可以根据api获取某一层的具体信息
	- 还可以将地图上的经纬度数据转换成坐标数据，进而可以基于具体地图上的点做些其他逻辑，如水波纹
2. 定义单个图表组件时
	- 在vue的mounted钩子里通常会实例化，通常还会初始化（setOption），其实没有必要初始化，
	- 因为第一次即使初始化也是假数据，没有意义。另外就是第一次初始化数据时也不会触发watch。
	- 但可以将watch里的逻辑抽离，然后在mounted里判断一下，如果有新数据则执行抽离的逻辑
3. 父子组件传值
	- props方式，写默认数据啰嗦，不写又不明了
	- vuex方式需要有清晰的逻辑，后续完善。。。
4. 大数据块
	- 在做关于地图类的图表时，option一般都需要很多很大的数据，可以将数据单独抽离成一个文件引入
	- vue里data函数里定义的是响应式数据，如果不是页面响应式数据，可定义在实例外侧
5. 动画
	- 因为很多元素都是靠js操作获取的，单纯靠css动画比较困难，因此还可以借助第三方动画库对元素做一些动画，比如 [animate](https://daneden.github.io/animate.css/)或者[tween](https://www.tweenmax.com.cn/about/)
	- 逐祯动画如果步幅很小，也容易出现抖动的问题，应该如何解决？
	- 这些动画库都是相互独立的动画单元，但如果对以施加一定的逻辑，也可以实现非常可观的动画……
6. 消除滚轮，鼠标等事件
	```js
	// window.addEventListener('scroll mousewheel', fn),无法像jq那样同时绑定多个事件
	['scroll','mousewheel'].forEach((item) => {
		window.addEventListener(item,(e) => {
			e.preventDefault && e.preventDefault();
			e.returnValue = false; // 已废除(但有旧浏览器支持)，用e.preventDefault()代替
			e.stopPropagation && e.stopPropagation();
			return false;
		})
	})
	```
7. 禁止页面文字选中
	```css
	/* 如果配合autoprefixer，可以只写user-select:none */
	body{
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	```
8. 背景图完全100%适配屏幕<br/>
	8.1. 不考虑背景图失真，只需让其在屏幕任意缩放时充满屏幕（**注意是不裁剪填充**）可以用如下：
	```css
	*{
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	.image{
		width:100vw;
		height:100vh;
		background-image:url('xxx');
		background-size:100% 100%;
	}
	```
	8.2. 上面的方式使得背景图比例失调，如果是可裁剪充满屏幕，可以如下：
	```css
	.box{
		width: 100vw;
		height: 100vh;
		background-image: url('xxx');
		background-position-x: 50%;
		background-position-y: 50%;
		background-size: cover;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
	}
	```
	8.3. 如果只使用cover属性值，则相比8.2只是一侧缩放，而8.2是两侧缩放
9. 引用数据类型，修改子组件影响父组件数据<br/>
	9.1. 栈(stack)分配固定大小内存（存放指针及基本数据类型），系统自动回收内存。堆(heap)是动态分配内存大小，不自动释放内存（引用数据类型的数据存放于此）<br/>
	9.2. 赋值和浅拷贝不同，赋值只是改变指针但仍指向同一个对象；浅拷贝是新建对象,但只复制一层对象的属性，不包括对象里面的为引用类型的数据,意味着仍然指向原始对象里的数据。参考[浅拷贝与深拷贝](https://juejin.im/post/59ac1c4ef265da248e75892b)。<br/>
	9.3. 如下:修改通过赋值得到的obj2中的基本数据和引用数据类型，都会改变原始对象obj1;而修改浅拷贝得到的obj2,只有修改引用数据才会改变原始对象。
	```js
	var obj1 = {
		'name' : 'zhangsan',
		'age' :  '18',
		'language' : [1,[2,3],[4,5]],
	};

	var obj2 = obj1;
	var obj3 = shallowCopy(obj1);
	function shallowCopy(src) {
		var dst = {};
		for (var prop in src) {
			if (src.hasOwnProperty(prop)) {
				dst[prop] = src[prop];
			}
		}
		return dst;
	}

	obj2.name = "lisi";
	obj3.age = "20";

	obj2.language[1] = ["二","三"];
	obj3.language[2] = ["四","五"];

	console.log(obj1);  
	//obj1 = {
	//    'name' : 'lisi',
	//    'age' :  '18',
	//    'language' : [1,["二","三"],["四","五"]],
	//};

	console.log(obj2);
	//obj2 = {
	//    'name' : 'lisi',
	//    'age' :  '18',
	//    'language' : [1,["二","三"],["四","五"]],
	//};

	console.log(obj3);
	//obj3 = {
	//    'name' : 'zhangsan',
	//    'age' :  '20',
	//    'language' : [1,["二","三"],["四","五"]],
	//};

	```
	9.4. 知道了赋值与浅拷贝的区别，那深拷贝就是递归浅拷贝了。可以借助第三方库lodash等实现，还可以通过如下方式：
	```js
	let deepCloneData = JSON.parse(JSON.stringify(originData))
	```
	9.5. 因此避免修改子组件的数据而影响到父组件的数据，那就用深拷贝吧。







如果动画正在执行时，数据发生更新应该如何处理？为看起来流畅，应该先等动画执行完，再更新数据，再开始动画，但又如何知道什么时候结束动画？如果不这样有没有其他方式？


以后不能说不知道，先思考一下如何才能得到？不会先留着

1. 支付逻辑
2. 埋点逻辑
3. docker
4. 小程序
5. 部署脚本
6. 框架
7. cas单点登录
8. vue源码
9. ts
10. jenkins
11. 数据结构及算法
13. 微信sdk,授权，支付，分享
14. 唤起app
15. 

#### 常用命令
*一般情况下，命令都有很多参数或选项，可通过：man 命令 查看*
```bash
# echo命令
# 用于输出字符串或变量的值，格式为：echo [字符串 | $变量]
$ echo hello world
=> hello world

# 变量名通常为大写，比如输出默认的shell
$ echo $SHELL
=> /bin/zsh
```

```bash
# date命令
# 用于显示及设置系统的时间或格式，格式为：date [选项] [格式]
$ date
=> 2018年11月11日 星期日 13时09分13秒 CST

# 当前具体时间
$ date "+%Y-%m-%d %H:%M:%S"
=> 2018-11-11 13:09:31

# 查看今天是当前中第几天
$ date "+%j"
=> 315
```

```bash
# reboot命令
# 用于重启系统，格式为：reboot
$ reboot

# poweroff命令
# 用于关闭系统，格式为：poweroff
$ poweroff

# ps命令，常结合管道符命令使用
# 用于查看系统中的进程状态，格式为：ps
$ ps

# top命令
# 用于动态实时监视进程活动与系统负载信息，格式为：top
$ top
```

```bash
# lsof（list open files）命令
# 用于列出当前系统打开的文件，常用查看端口占用情况如下：
$ lsof -i tcp:4000
=> ruby    66206 finup   10u  IPv4 0x1179df194c90da5b      0t0  TCP localhost:terabase (LISTEN)
```

```bash
# kill命令
# 用于终止某个指定PID的服务进程，格式为：kill [参数] [PID]，如下默认是强删
$ kill 1234

# killall命令
# 用于终止某个指定名称的服务所对应的全部进程，格式为：kill [参数] [服务名]
$ killall node
```

```bash
# wget命令
# 用于在终端下载网络文件，格式为：wget [参数] 下载地址（省略则下载到当前目录）
$ wget http://www.linuxprobe.com/docs/LinuxProbe.pdf 
```

系统状态监测命令
```bash
# ifconfig命令
# 用于获取网卡配置与网络状态，格式为：ifconfig [网络设备] [参数]
$ ifconfig

# uname命令
# 用于查看系统内核与系统版本等信息，格式为：uname [选项]
$ uname -a 
=> Darwin xxx.local 16.7.0 Darwin Kernel Version 16.7.0: Thu Jun 15 17:36:27 PDT 2017; root:xnu-3789.70.16~2/RELEASE_X86_64 x86_64

# uptime命令
# 用于查看系统的负载信息，格式为：uptime
$ uptime 
=> 13:50  up 22:53, 3 users, load averages: 2.28 2.69 2.46

# who命令
# 用于查看当前登入主机的用户终端信息，格式为：who [选项]
$ who

# history命令，默认显示近1000条
# 用于显示历史执行过的命令，格式为：history [选项]
$ history 
```

工作目录切换命令
```bash
# pwd命令
# 用于显示当前用户所处的工作目录，格式为：pwd [选项]
$ pwd
=> /etc

# cd命令
# 用于切换工作路径，格式为：cd [工作目录]
# 切换到家目录（其他用户家目录：~username）
$ cd ~

# ls命令
# 用于显示目录中的文件信息，格式为：ls [选项][文件]
# -a参数查看全部文件（含隐藏），-l查看文件属性，大小的等详细信息
$ ls -al
-r--------     1 finup  staff         9  6 19  2017 .CFUserTextEncoding
-rw-r--r--@    1 finup  staff     34820 11  8 17:24 .DS_Store
...
```

文件目录管理命令
```bash
# touch命令
# 用于创建空白文件或设置文件的时间，格式为：touch [选项] [文件]
$ touch

# mkdir命令
# 用于创建空白的目录，格式为：mkdir [选项] 目录，-p选项是递归嵌套
$ mkdir -p a/b/c/d

# cp命令
# 用于复制文件或目录，格式为：cp [选项] 源文件 目标文件
# 如果目标文件是目录，则会把源文件复制到该目录中
# 如果目标文件也是普通文件，则会询问是否要覆盖它
# 如果目标文件不存在，则执行正常的复制操作
$ cp

# mv命令
# 用于剪切文件或将文件重命名，格式为：mv[选项] 源文件 [目标路径|目标文件名]
$ mv

# rm命令
# 用于删除文件或目录，格式为：rm [选项] 文件
$ rm test.log

# file命令
# 用于查看文件的类型，格式为：file 文件名
$ file test
=> test: directory

# tar命令
# 用于对文件进行打包压缩或解压，格式为：tar [选项] [文件]
# -c   创建压缩文件
# -x   解开压缩文件
# -t   查看压缩包内有哪些文件
# -z   用 Gzip 压缩或解压
# -j   用 bzip2 压缩或解压
# -v   显示压缩或解压的过程
# -f   目标文件名
# -p   保留原始的权限与属性
# -P   使用绝对路径来压缩
# -C   指定解压到的目录

# 把/etc 目录通 过 gzip 格式进行打包压缩，并把文件命名为 etc.tar.gz
$ tar -czvf etc.tar.gz /etc

# 打包后的压缩包文件指定解压到/root/etc 目录中
$ tar xzvf etc.tar.gz -C /root/etc

# grep命令
# 用于在文本中执行关键词搜索，并显示匹配的结果，格式为：grep [选项][文件]
$ grep 

# find命令
# 用于按照指定条件来查找文件，格式为：find [查找路径] 寻找条件 操作
# 获取etc目录中所有以 host 开头的文件列表
find /etc -name "host*" -print
```


