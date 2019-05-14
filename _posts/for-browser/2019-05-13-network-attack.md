---
layout: post
title: 常见网络攻击
date: Fri May 10 2019 17:25:48 GMT+0800 (中国标准时间)
---
>写在前面：小时候听到黑客，总感觉很神秘的感觉，多年以后自己做了开发，或多或少的接触一些，但都不太系统，因此这里将。

### **参考资料**

《白帽子讲web安全》、[chrome开发者文档][chromeDevtoolUrl]

---

### **应用层拒绝服务攻击**

---

#### **DDOS简介**

`DDOS`又称**分布式拒绝服务**，全称是`Distributed Denial of Service`。`DDOS`是利用合理的请求造成资源过载，导致服务不可用。系统的资源毕竟有限，同一时间处理事情的数量也有限，当有很多没有意义的请求同时涌进来时，就会占用正常请求的处理，当占用的多了，就表现的像似服务宕机。。。

攻击是安全领域中最难解决的问题之一，迄今为止也没有一个完美的解决方案。

##### .**网络层DDOS**

常见的`DDOS`攻击有`SYN flood、UDP flood、ICMP flood`等。其中`SYN flood`是一种最为经典的`DDOS`攻击，其发现于1996年，但至今仍然保持着非常强大的生命力。`SYN flood`如此猖獗是因为它利用了`TCP`协议设计中的缺陷，而`TCP/IP`协议是整个互联网的基础，牵一发而动全身，如今想要修复这样的缺陷几乎成为不可能的事情。

正常情况下的，`TCP`三次握手过程如下：

1. 客户端向服务器端发送一个`SYN`包，包含客户端使用的端口号和初始序列号x；
2. 服务器端收到客户端发送来的`SYN`包后，向客户端发送一个`SYN`和ACK都置位的TCP报文，包含确认号x+1和服务器端的初始序列号y；
3. 客户端收到服务器端返回的`SYN+ACK`报文后，向服务器端返回一个确认号为y+1、序号为x+1的`ACK`报文，一个标准的`TCP`连接完成。

而SYN flood在攻击时，首先伪造大量的源IP地址(发起请求方)，分别向服务器端发送大量的SYN包，此时服务器端会返回SYN/ACK包，因为源地址是伪造的，所以伪造的IP并不会应答，服务器端没有收到伪造IP的回应，会重试3～5次并且等待一个SYN Time（一般为30秒至2分钟），如果超时则丢弃这个连接。攻击者大量发送这种伪造源地址的SYN请求，服务器端将会消耗非常多的资源（CPU和内存）来处理这种半连接，同时还要不断地对这些IP进行SYN+ACK重试。最后的结果是服务器无暇理睬正常的连接请求，导致拒绝服务。

对抗SYN flood的主要措施有SYN Cookie/SYN Proxy、safereset等算法。SYN Cookie的主要思想是**为每一个IP地址分配一个“Cookie”，并统计每个IP地址的访问频率。如果在短时间内收到大量的来自同一个IP地址的数据包，则认为受到攻击，之后来自这个IP地址的包将被丢弃**。

一般来说，大型网站之所以看起来比较能“抗”DDOS攻击，是因为大型网站的带宽比较充足，集群内服务器的数量也比较多。但一个集群的资源毕竟是有限的，在实际的攻击中，DDOS的流量甚至可以达到数G到几十G，遇到这种情况，只能与网络运营商合作，共同完成DDOS攻击的响应。

**注意：**上面说的攻击是**网络层的攻击**，因为此时连接还没有建立（仍然停留在`TCP`网络层）

##### .**应用层DDOS**

应用层DDOS，不同于网络层DDOS，由于发生在应用层，**因此TCP三次握手已经完成，连接已经建立，所以发起攻击的IP地址也都是真实的**。但应用层DDOS有时甚至比网络层DDOS攻击更为可怕，因为今天几乎所有的商业Anti-DDOS设备，只在对抗网络层DDOS时效果较好，而对应用层DDOS攻击却缺乏有效的对抗手段。

应用层`DDOS`什么意思呢？可以从`CC攻击`说起：

`“CC攻击”`的前身是一个叫fatboy的攻击程序，当时黑客为了挑战绿盟的一款反DDOS设备开发了它。绿盟是中国著名的安全公司之一，它有一款叫“黑洞（Collapasar）”的反DDOS设备，能够有效地清洗SYN Flood等有害流量。而黑客则挑衅式地将fatboy所实现的攻击方式命名为：`Challenge Collapasar`（简称CC），意指在黑洞的防御下，仍然能有效完成拒绝服务攻击。

CC攻击的原理非常简单，就是**对一些消耗资源较大的应用页面不断发起正常的请求，以达到消耗服务端资源的目的**。

在Web应用中，查询数据库、读/写硬盘文件等操作，相对都会消耗比较多的资源。比如并发频繁触发数据库查询，查询无法立即完成，资源无法立即释放，会导致数据库请求连接过多，数据库阻塞，网站无法正常打开。

在互联网中充斥着各种搜索引擎、信息收集等系统的爬虫`（spider）`，**爬虫把小网站直接爬死的情况时有发生**，这与应用层DDOS攻击的结果很像。由此看来，应用层DDOS攻击与正常业务的界线比较模糊。

应用层攻击还可以通过将大流量的网站分流一部分完成，比如黑客篡改大流量页面

```html
 <iframe src="http://target" height=0 width=0 ></iframe>
```

这样，只要用户打开了大流量页面，都会对`target`发起一次`HTTP GET`请求，就可能导致`target`拒绝服务。

许多优化服务器性能的方法，或多或少的能缓解这种攻击，比如将使用频率高的数据放在`memcache`中，比查询数据库效率高出很多。但如果黑客想触发耗性能的操作，只需想法命中`memcache`里没有的数据即可，这样便会触发查询数据库。

##### .**IP&Cookie防御**

通过IP地址与Cookie定位一个客户端，如果客户端的请求在一定时间内过于频繁，则对之后来自该客户端的所有请求都重定向到一个出错页面。

从架构上看，这段代码需要放在业务逻辑之前，才能起到保护后端应用的目的，可以看做是一个“基层”的安全模块。

##### .**道高一尺，魔高一丈**

然而这种防御方法并不完美，因为它在客户端的判断依据上并不是永远可靠的。这个方案中有两个因素用以定位一个客户端：**一个是IP地址，另一个是Cookie**。但用户的IP地址可能会发生改变，而Cookie又可能会被清空，如果IP地址和Cookie同时都发生了变化，那么就无法再定位到同一个客户端了。

**如何让IP地址发生变化呢？**使用“代理服务器”是一个常见的做法。在实际的攻击中，大量使用代理服务器或傀儡机来隐藏攻击者的真实IP地址，已经成为一种成熟的攻击模式。攻击者使用这些方法可不断地变换IP地址，就可以绕过服务器对单个IP地址请求频率的限制了。

##### .**几个方面防御**

1. 首先，应用代码要做好性能优化。合理地使用memcache就是一个很好的优化方案，将数据库的压力尽可能转移到内存中。此外还需要及时地释放资源，比如及时关闭数据库连接，减少空连接等消耗。
2. 其次，在网络架构上做好优化。善于利用负载均衡分流，避免用户流量集中在单台服务器上。同时可以充分利用好CDN和镜像站点的分流作用，缓解主站的压力。
3. 最后，也是最重要的一点，实现一些对抗手段，比如限制每个IP地址的请求频率。

##### .**验证码**

验证码是互联网中常用的技术之一，它的英文简称是`CAPTCHA（Completely Automated Public Turing Test to Tell Computers and Humans Apart，全自动区分计算机和人类的图灵测试）`。在很多时候，如果可以忽略对用户体验的影响，那么引入验证码这一手段**能够有效地阻止自动化的重放行为**。

`CAPTCHA`设计的初衷是为了识别人和机器，过于简单和过于复杂都不太好，因此是把双刃剑。

有验证码，就会有验证码破解技术。除了直接利用**图像相关算法识别验证码**外，还可以利用Web实现上可能存在的漏洞破解验证码。

因为**验证码的验证过程，是比对用户提交的明文和服务器端Session里保存的验证码明文是否一致**。所以曾经有验证码系统出现过这样的漏洞：因为验证码消耗掉后SessionID未更新，导致使用原有的SessionID可以一直重复提交同一个验证码。(难道是登陆后SessionID未更新?)

还有的验证码实现方式，是提前将所有的验证码图片生成好，以**哈希过的字符串作为验证码图片的文件名**。在使用验证码时，则直接从图片服务器返回已经生成好的验证码，这种设计原本的想法是为了提高性能。

但这种一一对应的验证码文件名会存在一个缺陷：**攻击者可以事先采用枚举的方式，遍历所有的验证码图片，并建立验证码到明文之间的一一对应关系，从而形成一张“彩虹表”**，这也会导致验证码形同虚设。修补的方式是验证码的文件名需要随机化，满足“不可预测性”原则。

##### .**防御应用层DDOS**

一种比较可靠的方法是让客户端解析一段JavaScript，并给出正确的运行结果。**因为大部分的自动化脚本都是直接构造HTTP包完成的，并非在一个浏览器环境中发起的请求**。因此**一段需要计算的JavaScript，可以判断出客户端到底是不是浏览器**。类似的，发送一个flash让客户端解析，也可以起到同样的作用。但需要注意的是，这种方法并不是万能的，有的自动化脚本是内嵌在浏览器中的“内挂”，就无法检测出来了。

**除了人机识别外，还可以在web server这一层做些防御，其好处是请求尚未到达后端的应用程序里**，因此可以起到一个保护的作用。

在Apache的配置文件中，有一些参数可以缓解DDOS攻击。比如调小Timeout、KeepAliveTimeout值，增加MaxClients值。但需要注意的是，这些参数的调整可能会影响到正常应用，因此需要视实际情况而定。

如果黑客使用了代理服务器、傀儡机进行攻击，该如何有效地保护网站呢？

Yahoo为我们提供了一个解决思路。因为发起**应用层DDOS攻击的IP地址都是真实的，所以在实际情况中，攻击者的IP地址其实也不可能无限制增长**。假设攻击者有1000个IP地址发起攻击，如果请求了10000次，则平均每个IP地址请求同一页面达到10次，攻击如果持续下去，单个IP地址的请求也将变多，但无论如何变，都是在这1000个IP地址的范围内做轮询。

为此Yahoo实现了一套算法，根据IP地址和Cookie等信息，可以计算客户端的请求频率并进行拦截。Yahoo设计的这套系统也是为Web Server开发的一个模块，但在整体架构上会有一台master服务器集中计算所有IP地址的请求频率，并同步策略到每台WebServer上。

##### .**资源耗尽攻击**

`. Slowloris攻击`  
Slowloris是在2009年由著名的Web安全专家RSnake提出的一种攻击方法，其**原理是以极低的速度往服务器发送HTTP请求**。由于Web Server对于**并发的连接数都有一定的上限，因此若是恶意地占用住这些连接不释放，那么Web Server的所有连接都将被恶意连接占用，从而无法接受新的请求，导致拒绝服务**。

在正常的HTTP包头中，是以两个CLRF表示HTTP Headers部分结束的。`Content-Length: 42\r\n\r\n`，但恶意请求只包含一个CLRF。。。

```html
GET / HTTP/1.1\r\n
Host: host\r\n
User-Agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.503l3; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; MSOffice 12)\r\n
Content-Length: 42\r\n
```

由于Web Server只收到了一个\r\n，因此将认为HTTP Headers部分没有结束，并保持此连接不释放，继续等待完整的请求。此时客户端再发送任意HTTP头，保持住连接即可。

当构造多个连接后，服务器的连接数很快就会达到上限。此类拒绝服务攻击的本质，实际上是对有限资源的无限制滥用。上面案例中，有限资源就是`web server`的连接数。

`. HTTP POST DOS攻击`  

原理是在发送HTTP POST包时，指定一个非常大的Content-Length值，然后以很低的速度发包，比如10～100s发一个字节，保持住这个连接不断开。这样当客户端连接数多了以后，占用住了Web Server的所有可用连接，从而导致DOS。



```js
var s1 = 'some text';
var s2 = s1.substring(2); // "me text"
```

如上变量`s1`包含一个字符串，当然就是**基本类型值**，而下一行就调用了`substring()`方法。。。我们知道**基本类型值不是对象**，因而从**逻辑上讲他们不应该有方法**。

其实为了实现这种直观的操作，后台自动完成了一些列的处理。当第二行访问`s1`时，访问过程处于一种读取模式，也就是要从内存中读取这个字符串的值，而在读取模式中访问字符串时，后台会自动完成下面操作：

1. 创建`String`类型的一个实例(`var s1 = new String('some text')`)
2. 在实例上调用指定的方法(`var s2 = s1.substring(2)`)
3. 销毁这个实例(`s1 = null`)

经过上面的处理，基本的字符串就变得跟对象一样了，而且上面的过程也分别适用于`Boolean、Number`类型对应的布尔值和数字值。

**引用类型与基本包装类型**的主要区别就是**对象的内存期**。使用`new`操作符**创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中**。而**自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁**。意味着，我们不能在运行时会基本类型添加属性或方法，如下：

```js
var s1 = 'some text';
s1.color = 'red';
s1.color              // undefined
```

原因就是第二行创建的`String`对象在执行第三行代码时已经被销毁了。第三行代码又创建自己的`String`对象，而该对象没有`color`属性。

当然可以显式调用`String、Boolean、Number`来创建基本包装类型的对象，但最好不要这样做，因为很容易让人分不清自己处理的是基本类型还是引用类型的值。对**基本包装类型的实例（用new构造）调用`typeof`会返回`'object'`**，而且所有基本包装类型的对象都会被转换为布尔值`true`(因为是对象了)

`Object`构造函数也像工厂方法一样，根据传入值的类型返回相应基本包装类型的实例。

```js
var str = new Object('test string');
str instanceof String;             // true

var num = new Object(666);
num instanceof Number;             // true

var booleanVal = new Object(true);
booleanVal instanceof Boolean;     // true
```

**注意：使用`new`调用基本包装类型的构造函数，与直接调用同名的转型函数时不一样的**。例如：

```js
var val1 = Number('25'); // 转型函数
typeof val1;             // 'number'

var val2 = new Number('25'); // 构造函数
typeof val2;                 // 'object'
```

##### .**String类型**

`String`对象的方法可以在所有基本的字符串值中访问到，继承的`valueOf()、toLocaleString()、toString()`方法都返回对象所表示的基本字符串值。且每个实例都有`length`属性，`String`类型还提供了很多方法，用于完成对字符串的解析和操作。

`1. 字符方法`  
两个用于访问字符串特定字符的方法：`charAt()、charCodeAt()`,参数都是一个基于0的字符位置。前者返回对应位置的字符，而后者返回字符的编码。

```js
var str = 'hello world';
str.charAt(1);           // 'e'
str[1];                  // 'e'
str.charCodeAt(1);       // 101
```

`2. 字符串操作方法`  

```js
// concat()返回拼接后的新字符串，不影响原有字符串
var str1 = 'hello';
str1.concat(' world'); // 'hello world'
str1; // 'hello'
```

`slice()、substring()、substr()`三个方法都是基于子字符串创建新字符串的方法，返回新的子字符串，都接受1或2个参数，参数一指定子字符串的开始位置，参数二表示子字符串到哪里结束（不包含）。**不同的是`substr()`的参数二指定的是返回的字符个数，而不是位置**。。。

```js
var str2 = 'hello world';
str2.slice(3);            // 'lo world'
str2.substring(3);        // 'lo world'
str2.substr(3);           // 'lo world'

str2.slice(3, 7);         // 'lo w' ，从3开始，不包含索引为7的字符
str2.substring(3, 7);     // 'lo w' ，同上
str2.slice(3, 7);         // 'lo worl'，从3开始，共7个字符
```

当`slice()、substring()、substr()`参数里有负数时，行为就不尽相同了，其实`slice()`方法会将传入的负数与字符串的长度相加。`substr()`方法将的负的第一参数加上字符串的长度，而将负的第二个参数转换为0。`substring()`则将所有负数都转换为0。

```js
var str3 = 'hello';
str3.slice(-2);           // 'lo'
str3.substr(-2);          // 'lo'
str3.substring(-2);       // 'hello'

str3.slice(-2, -1);       // 'l', 等价于slice(3, 4)
str3.substr(-2, -1);      // '', 等价于substr(3, 0)
str3.substring(-2, -1);   // '', 等价于slice(0, 0)
```

`3. 字符串位置方法`  
有两个从字符串中查找子字符串的方法：`indexOf()、lastIndexOf()`，都是从一个字符串搜索给定的子字符串，然后返回子字符串的位置，没有找到则返回-1，前者是从字符串的开头向后搜索子字符串，而后者反之。都可选第二个参数，表示索引开始的位置。

```js
var str4 = 'hello world';
str4.indexOf('o');        // 4
str4.lastIndexOf('o');    // 7

str4.indexOf('o', 5);      // 7
str4.lastIndexOf('o', 8);  // 7
str4.lastIndexOf('o', 1);  // -1，索引的位置都是从前向后数的，即使从最后开始遍历
```

利用上面的特性，则可以循环获取所有匹配的项

```js
var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
var positions = [];
var pos = stringValue.indexOf("e");

while(pos > -1){
  positions.push(pos);
  pos = stringValue.indexOf("e", pos + 1);
}

console.log(positions);    // [3, 24, 32, 35, 52]
```

`4. trim()方法`  
`ECMAScipt 5`为所有字符串定义了`trim()`方法，该方法会创建一个字符串的副本，并删除前置和后置的所有空格，然后返回结果。

`5. 字符串大小写转换方法`  
`ECMAScipt`中涉及字符串大小写转换的方法有四个：`toLowerCase()、toLocaleLowerCase()、toUpperCase()、toLocaleUpperCase()`，其中`toLowerCase()、toUpperCase()`是两个经典的方法，借鉴自`java.lang.String`中的同名方法。**而其他两个则是针对特定地区的实现。对有些地方，针对地区的方法和通用方法得到的结果相同，但少数语言(如土耳其语)会为`Unicode`大小转换应用特殊的规则，这时候就必须使用针对特定地区的方法来保证实现正确的转换。**

**注意：**一般来说，在不知道自己的代码将在那种语言环境中运行的情况下，还是使用针对地区的方法更加稳妥一些。

`6. 字符串的模式匹配方法`  
`String`类型定义了几个用于在字符串中匹配模式的方法。第一个方法就是`match()`，在字符串上调用这个方法，本质上与调用`RegExp`的`exec()`方法相同。`match()`只接受一个参数，要么是一个正则表达式，要么是一个`RegExp`对象。

```js
var text = "cat, bat, sat, fat";
var pattern = /.at/;

var matches = text.match(pattern);// ["cat", index: 0, input: "cat, bat, sat, fat", groups: undefined]
matches.index;                   // 0
matches[0];                      // "cat"
pattern.lastIndex;               // 0，可以给正则表达式对象设置lastIndex，但对match方法无效，匹配总是从字符串的第一个字符开始
```

`match()`返回一个数组，第一项是与整个模式匹配的字符串，之后的每一项(如果有)保存着匹配的字符串相关的数据。`index`表示匹配到的字符串索引(`.`匹配所有字符)，`input`则是目标字符串，`groups`是？

```js
var text = "cat, bat, sat, fat";
var pattern = /.at/g;             // g开启全局搜索模式，匹配到所有匹配的项
pattern.lastIndex = 2;

var matches = text.match(pattern);// ["cat", "bat", "sat", "fat"]，全局模式不含index，input等信息
matches.index;                    // undefined
pattern.lastIndex;                // 0，上面设置无效
```

另一个用于查找的方法是`search()`，参数为字符串或正则表达式，返回第一个匹配的索引，否则返回-1，始终从字符串开头查找。

为了简化替换子字符串的操作，`ECMAScript`提供了`replalce()`方法，两个参数：参数一是字符串或正则表达式，参数二可以是字符串或者一个函数。如果第一个参数是字符串，则只会替换第一个子字符串，要想替换所有的，则需要用正则，而且需要加上全局`g`标识。

```js
var text = "cat, bat, sat, fat";
var result = text.replace("at", "ond");
alert(result);                          //"cond, bat, sat, fat"

result = text.replace(/at/g, "ond");
alert(result);                          //"cond, bond, sond, fond"
```

**如果第二个参数是字符串**，那么还可以使用一些特殊的字符序列，将正则表达式得到的值插入到结果字符串中。如下表：

变量名      | 代表的值                        |
:--------- | :-----------                   |
$$         | 插入一个'$'                     |
$&         | 插入匹配的子串                   |
$`         | 插入当前匹配的子串左边的内容        |
$'         | 插入当前匹配的子串右边的内容        |
$n         | 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始        |

```js
var text = "cat, bat, sat, fat";
text.replace(/(.at)/g, "word ($1)");
// "word (cat), word (bat), word (sat), word (fat)"

text.replace(/(.at)/, 'hello $&');
// "hello cat, bat, sat, fat"

text.replace(/(.at)/g, 'hello $&');
// "hello cat, hello bat, hello sat, hello fat"

text.replace(/(.at)/, 'hello $`')
// "hello , bat, sat, fat"

text.replace(/(.at)/g, 'hello $`')
// "hello , hello cat, , hello cat, bat, , hello cat, bat, sat, "

text.replace(/(.at)/, 'hello $\'') // 需转义，或双引号包裹
// "hello , bat, sat, fat, bat, sat, fat"
```

`replace()`方法的第二个参数也可以是一个函数，在只有一个匹配项时，会向这个函数传递3个参数：模式的匹配项、模式匹配项的索引和原始字符串。

如果参数一定义了多个捕获组的情况下，传递给函数的参数依次为：模式的匹配项，第一个捕获组的匹配项、第二个捕获组的匹配项......，但最后两个参数仍然分别是模式的匹配项在字符串中的位置和原始字符串。

变量名      | 代表的值                        |
:--------- | :-----------                   |
match      | 匹配的子串。（对应于上述的$&。）                    |
p1,p2, ... | 假如replace()方法的第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。（对应于上述的$1，$2等。）例如，如果是用 /(\a+)(\b+)/ 这个来匹配，p1 就是匹配的 \a+，p2 就是匹配的 \b+。                   |
offset         | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 'abcd'，匹配到的子字符串是 'bc'，那么这个参数将会是 1）        |
string         | 被匹配的原字符串。        |


```js
function replacer(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join(' - ');
}
// [^\d]中括号里的^表示除了，这里匹配除了数字项，因此匹配到'abc'
// ()表示分组，每一组作为一个整体进行匹配，(\d*)匹配到'12345'
// 同理([^\w]*)匹配特殊字符，这里匹配到'#$*%'
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
```

下面是一个转义`HTML`代码的函数：

```js
var text = "cat, bat, sat, fat";

function htmlEscape(text){
  return text.replace(/[<>"&]/g, function(match, pos, originalText){
    switch(match){
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "\"":
        return "&quot;";
    }
  });
}

htmlEscape("<p class=\"greeting\">Hello world!</p>");
//&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;
```

最后一个与模式匹配有关的方法是`split()`方法，该方法可以基于指定的分隔符将一个字符串分割成多个字符串，并将结果放到一个数组里。分隔符还可以是正则，还可以接受第二个参数，用于指定数组的大小。

```js
var colorText = "red,blue,green,yellow";

var colors1 = colorText.split(",");
//["red", "blue", "green", "yellow"]

var colors2 = colorText.split(",", 2);  // 指定数组长度
//["red", "blue"]

colorText.replace(/[^\,]+/g, '$');       // [$,$,$,$]
var colors3 = colorText.split(/[^\,]+/);
//["", ",", ",", ",", ""]
```

**注意：**最后一次调用`split()`返回的数组中，第一项和最后一项是两个空字符串，因为**通过正则表达式指定的分隔符出现在了字符串的开头和末尾**。

`7. fromCharCode()方法`  
`String`构造函数本身有一个静态方法：`fromCharCode()`，接收一个或多个字符编码，然后将他们转换为字符串，其实就是`charCodeAt()`的逆操作。。。

```js
String.fromCharCode(104, 101, 108, 108, 111)
// "hello"
```



[nullAndundefined(阮一峰)]: http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html '阮一峰'
[IEEE_754URL]: https://zh.wikipedia.org/wiki/IEEE_754 '维基百科'
[minusOperatorUrl]: http://www.wenjiangs.com/article/javascript-string-number.html '减号运算符'
[addOperatorUrl]: https://www.w3cplus.com/javascript/javascriptss-addition-operator-demystified.html '加号运算符'
[SysConvertUrl]:http://www.cnblogs.com/gaizai/p/4233780.html '任意进制转换'
[date&timeFunUrlMdn]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date '获取时间的一些方法'
[jsSecretGardenUrl]: https://bonsaiden.github.io/JavaScript-Garden/zh/ 'js秘密花园'
[chromeDevtoolUrl]: https://developers.google.com/web/tools/chrome-devtools/?hl=zh-cn '开发者文档'