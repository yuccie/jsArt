---
layout: post
title: 你好，数学
date: Wed Jan 30 2019 11:55:28 GMT+0800 (中国标准时间)
---

>大学的时候，为了让自己的人生稍微完整一点，就体验了一把考研，顺便学习了很久的莱布尼兹等方程，当时虽然不太明白，但心中依然感叹数学的确很美。。。几年后，成为了程序猿，数学却又成为了必须。。。真是，你欠的债早晚得还。。。这里的数学只是为了更好的学习算法

#### 关于数学
数学它其实是一种思维模式，考验的是一个人归纳、总结和抽象的能力...不管是数据结构与算法还是程序设计，其实底层很多原理或者思路都，如果编程语言是血肉，数学的思想和知识就是灵魂

***哪又如何学习数学呢？***<br/>
1. 先用起来
2. 了解原理
3. 然后了解为什么

时刻谨记，数学是工具而非问题，是手段而非目的。。。同时数学又绝不仅仅是算术，把主要精力放在计算上未免因小失大。针对程序猿的话，数学应该围绕下图：
![dpr&ppi](/jsArt/assets/images/math/programer-math-map.jpg)

***二进制，不了解计算机的源头，你学什么编程***<br/>
计算机使用二进制和现代计算机系统的硬件实现有关。组成计算机系统的逻辑电路通常只有两个状态，即开关的接通和断开，断开用0表示，而连接则用1表示，所以系统受到一定的干扰时，依然能够可靠地分辨数字是0还是1。

因此，在具体的系统实现中，二进制的数据表达具有抗干扰能力强、可靠性高的有点。相比之下如果用十进制设计就具有10中状态，情况将会非常复杂，判断状态的时候出错的几率就会大大提高。

另外二进制还很适合逻辑运算，比如逻辑或、与、非、异或等

在js中，可以将数字进行进制转换
```js
// 参数1是string类型，若不是则调用toSting转换，字符串开头空白将会省略
// 参数2就是基数，不写则通常默认是10进制
parseInt(string, radix);

// 注意这里基数虽然是2，但返回值确实10进制表示
parseInt('111', 2) // 返回 7 => 1*2^2 + 1*2^1 + 1*2^0 = 7

// 另外被解析参数的第一个字符若无法被转换，则返回NAN
parseInt('211', 2) // 返回 NAN，因为二进制不可能有2
parseInt('a11', 2) // 返回 NAN，因为二进制无法转换a字符
```
虽然平时编程中，用的二进制比较少，确实，那是因为目前的高级语言可以帮助我们将人类的思维逻辑转为1和0的机器语言。。。

二进制贯穿在很多常用的概念和思想中，例如逻辑分析、二分法、二叉树等。
![dpr&ppi](/jsArt/assets/images/math/math-1.jpg)

***余数***<br/>
整数是没有边界的，他可能是正无穷，也可能是负无穷。余数却总是在一个固定的范围内。生活中，余数可以用来算星期，web编程中可以用在分页中等。。。

求余过程就是个哈希函数，每个编程语言都有对应的哈希函数。哈希有的时候也会被翻译成散列，简单来说就是将任意长度的输入，通过哈希算法压缩为某一固定长度的输出。

***迭代法，不用编程语言的自带函数，如何求平方根？***<br/>
迭代法，简单来说，其实就是不断地用旧的变量值，递推计算新的变量值。比如后者都是前者的2倍，当前记为Xn，前者记为Xn−1，则有下图

![dpr&ppi](/jsArt/assets/images/math/math-2-Iterator.jpg)



#### Usage

```bash
$ git clone https://github.com/onevcat/vno-jekyll.git your_site
$ cd your_site
$ bundler install
$ bundler exec jekyll serve
```

Your site with `Vno Jekyll` enabled should be accessible in http://127.0.0.1:4000.

For more information about Jekyll, please visit [Jekyll's site](http://jekyllrb.com).

#### Configuration

All configuration could be done in `_config.yml`. Remember you need to restart to serve the page when after changing the config file. Everything in the config file should be self-explanatory.

#### Background image and avatar

You could replace the background and avatar image in `assets/images` folder to change them.

#### Sites using Vno

[My blog](http://onevcat.com) is using `Vno Jekyll` as well, you could see how it works in real. There are some other sites using the same theme. You can find them below:

| Site Name    | URL                                                |
| ------------ | ---------------------------------------------------|
| OneV's Den   | [http://onevcat.com](http://onevcat.com)           |
| July Tang    | [http://blog.julytang.xyz](http://onevcat.com)     |
| Harry Lee    | [http://qiuqi.li](http://qiuqi.li)                 |

> If you happen to be using this theme, welcome to [send me a pull request](https://github.com/onevcat/vno-jekyll/pulls) to add your site link here. :)

#### License

Great thanks to [Dale Anthony](https://github.com/daleanthony) and his [Uno](https://github.com/daleanthony/uno). Vno Jekyll is based on Uno, and contains a lot of modification on page layout, animation, font and some more things I can not remember. Vno Jekyll is followed with Uno and be licensed as [Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/). See the link for more information.
