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

10. vw及vh及rem<br/>
	10_1. rem代表html元素的font-size大小，vw是视口宽度的1/100，vh是视口高度的1/100<br/>
	10_2. 设置rem基准值，设备像素又称物理像素，是设备能控制显示的最小单位；下面的设备独立像素暂可理解为屏幕一个方向的像素数，待完善！！！
	```js
	(function(){
		'use strict';
		/**
		* 根节点
		* @type {Element}
		*/
		var el = document.documentElement,
			/**
			* 事件类型，如果不存在旋转事件，则以reisze代替
			* @type {String}
			*/
			eventType = 'orientationchange' in window ? 'orientationchange' : 'resize',
			/**
			* font size基准参考值
			* @type {Number}
			*/
			size = 16,
			/**
			* 设备独立像素基准参考值，以 iPhone 6(s) 为基准
			* @type {Number}
			*/
			dipWidth = 1600,
			/**
			* 设置根节点font-size
			*/
			setRootFontSize = function(){
				el.style.fontSize = el.clientWidth / dipWidth * size + 'px';
				window.$rootFontSize = el.style.fontSize.replace('px','')
			};
		setRootFontSize();
		window.addEventListener(eventType, setRootFontSize, false);
		// dom加载完毕后计算，而非文档加载完毕（load事件）
		document.addEventListener('DOMContentLoaded', setRootFontSize, false);
	})();
	```
	10_3. 屏幕缩放后页面要自适应，可以用vw，vh配合css的calc()函数进行页面布局，字体等通过rem来适配页面。<br/>
	10_4. 在屏幕宽高变化时，echarts图表会resize，但图表的尺寸依据的是容器的宽还是高并不固定，而是依据屏幕分辨率比（也就是我们常说的16:9的屏幕宽高比），当大于临界值时取哪个，当小于临界值时取哪个。<br/>
	```scss
	// 当屏幕宽高比小于1.665时应用此样式，也就是高的值取自宽，也就是以宽为基准。 
	// 这里子元素的宽高分别取之父元素的宽高，先calc()子元素宽高，然后将宽/高得出1.665。
	// 此处横向有三个元素，要计算每个父元素的一半尺寸；如果有3rem单位，可手动转换成px如：3 * (clientWidth/dipWidth) * baseFontSize
	@media screen and (max-aspect-ratio : 1665/1000){
		.main .circle {
			height: calc((34vw - 16px) / 3 * 0.5);
			width: calc((34vw - 16px) / 3* 0.5);   
		}
	}
	```

11. LED字体 <br/>
	11_1. @font-face 的CSS @规则 ，它允许网页开发者为其网页指定在线字体。意味着你可以为网页定制各种字体
	```scss
	// 下载需要的字体，然后定义字体，font-family即是名字，使用时将定义的字体导入，直接使用即可
	// TrueType是苹果与微软开发的字体格式,扩展名为：.ttf
	@font-face{
		font-family: "Digital7Mono";
		src:url("~assets/xxx/Digital-7Mono-font.ttf") format("truetype");
		font-style: normal;
		font-weight: normal;
	}
	```


