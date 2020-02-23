---
layout: post
title: 服务器相关
date: Fri Jan 04 2019 14:24:26 GMT+0800 (中国标准时间)
---


## 正向和反向代理
***正向代理***<br/>
通常指的是代理服务器vpn，特点就是隐藏了真实的请求客户端，服务端不知道真实的客户端是谁，客户端请求的服务都由代理服务器代替来请求。

举个例子，国内的用户想要访问 Google 时，会被阻挡。所以这个时候把请求发送到另外一个代理服务器（可以访问 Google 的服务器）上，由其代为转发请求和接收响应内容。

***反向代理***<br/>
反向代理和正向代理相反，但反向代理一般是负载均衡的一个原理。正向代理是一对一或者多对一，而反向代理一般是一对多或多对多。

反向代理隐藏了真实的服务端，当我们请求 http://www.baidu.com 的时候，就像拨打 QQ 客服热线一样，背后可能有成千上万台服务器为我们服务，但具体是哪一台，你不知道，也不需要知道，你只需要知道反向代理服务器是谁就好了，http://www.baidu.com 就是我们的反向代理服务器，反向代理服务器会帮我们把请求转发到真实的服务器那里去。

因此二者的区别在于代理的对象不一样，正向代理代理的对象是客户端，反向代理代理的对象是服务端。


## nginx常用知识

***linux软件安装方式***<br/>

通常有三种方式在linux上安装软件：

1. 通过包管理器，比如npm，yum，homebrew等
2. 通过下载源代码，编译软件编译源代码
3. 通过二进制包

方式一：比较方便，只要安装了对应的包管理器，就可以搜索后安装，比如mac上必备的homebrew，通常安装完之后，环境变量也会配置好(但有时如果shell不是系统默认的，可能还需要针对当前shell配置)

**注意：**rpm也能安装软件，但因为一个软件通常会有很多依赖，rpm不会自动处理依赖，因此比较繁琐，而用yum就可以自动处理rpm包的依赖比较方便。

```bash
# 可以查看对应的命令，然后执行对应的操作
brew -h
# Example usage:
#   brew search [TEXT|/REGEX/]
#   brew info [FORMULA...]
#   brew install FORMULA...
#   brew update
#   brew upgrade [FORMULA...]
#   brew uninstall FORMULA...
#   brew list [FORMULA...]
```

方式二：源代码一般使用c语言或其他c++等比较底层的代码写的，要想在系统里运行，需要对应的编译器（比如：gcc,make,openssl等）将其编译成系统认识的二进制格式。一般步骤如下：

```bash
# 1. 生成编译配置文件(Makefile) 
# 2. 开始编译(make) 
# 3. 开始安装(make install)
```

方式三：二进制包可以通俗的理解为绿色安装，也就是已经经过编译，可以马上运行的程序，删除的时候也是直接删除包文件即可。但需要配置环境变量

***nginx安装与维护***<br/>

这里用 brew 安装 nginx，安装之后可以直接用brew来维护nginx

```bash
# 启动nginx
brew services start nginx

# 查看brew services相关的命令
brew services -h
# brew services subcommand:
# brew services list
# brew services run (formula|--all)
# brew services start (formula|--all)
# brew services stop (formula|--all)
# brew services restart (formula|--all)
```
nginx默认监听8080端口，在浏览器里直接输入：http://localhost:8080/，会出现nginx服务的默认欢迎页面。如果想修改这个默认页面，可以在nginx的安装目录里找到对应的文件

```bash
# 查找安装的路径，或者：which nginx
where nginx 
# /usr/local/bin/nginx

# 上面知道了nginx的执行文件在/usr/local/bin/nginx，因此可以在/usr/local查找nginx的html页面
# 其实大多数包安装的地址都在/usr/local里
find /usr/local -name html
# /usr/local/Cellar/nginx/1.17.1/html
```

***nginx实现跨域***<br/>
前端服务一般是静态文件，放在一个nginx服务器上，这个nginx还可以配置代理，以实现前端的接口请求后端不存在跨域问题。

跨域是浏览器的安全行为，从浏览器端发出的请求，确实到了服务器，服务器也响应的，只是浏览器检测如果存在跨域行为，浏览器拦截了响应，并在控制台报错。

而如果在nginx上配置代理，则相当于将所有前端的请求的前缀都换成服务器的了，这样的话，浏览器就会以为所有url都是相同的域名、协议和端口，也就是不是跨域了，具体配置可类似如下：

```bash
server {
    listen   9000;
    server_name  localhost;

    location /api/ {
        # 所有对后端的请求加一个api（这是前端需要做的，这里只是匹配后处理）前缀方便区分，真正访问的时候移除这个前缀
        # 这也说明，请求的地址不但在前端可以修改，在nginx这一层也是可以操作的
        rewrite ^/api/(.*)$ /$1 break; 
      
        # 将真正的请求代理到serverA,即真实的服务器地址，ajax的url为/api/user/1的请求将会访问http://www.serverA.com/user/1
        proxy_pass http://www.serverA.com; 
    }
}
```

**注意：**nginx配置跨域，是配置location里的proxy_pass，而不是配置如下相关，下面的是java端需要考虑的项，和nginx实现跨域比较的话，**二者压根原理就不同，前者是代理转发，后者是配置**，最后务必注意：**响应头的配置和请求头的配置是一一对应的，响应头允许的methods是get，请求就不能用post**，

响应头:
- Access-Control-Allow-Origin: 允许跨域访问的域，可以是一个域的列表，也可以是通配符”*”；
- Access-Control-Allow-Methods: 允许使用的请求方法，以逗号隔开；
- Access-Control-Allow-Headers: 允许自定义的头部，以逗号隔开，大小写不敏感；
- Access-Control-Expose-Headers: 允许脚本访问的返回头，请求成功后，脚本可以在XMLHttpRequest中访问这些头的信息
- Access-Control-Allow-Credentials: 是否允许请求带有验证信息，XMLHttpRequest请求的withCredentials标志设置为true时，认证通过，浏览器才将数据给脚本程序。
- Access-Control-Max-Age: 缓存此次请求的秒数。在这个时间范围内，所有同类型的请求都将不再发送预检请求而是直接使用此次返回的头作为判断依据，非常有用，大幅优化请求次数；

请求头：
- Origin: 普通的HTTP请求也会带有，在CORS中专门作为Origin信息供后端比对,表明来源域，要与响应头中的Access-Control-Allow-Origin相匹配才能进行跨域访问；
- Access-Control-Request-Method: 将要进行跨域访问的请求方法，要与响应头中的Access-Control-Allow-Methods相匹配才能进行跨域访问；
- Access-Control-Request-Headers: 自定义的头部，所有用setRequestHeader方法设置的头部都将会以逗号隔开的形式包含在这个头中，要与响应头中的Access-Control-Allow-Headers相匹配才能进行跨域访问

***nginx修改配置***<br/>
nginx配置文件修改后，需要重启，一般重启前会执行以下相关命令

```bash
# 检查配置文件是否正确
nginx -t

# 重新加载nginx
nginx -s reload

# 如果安装了nginx，但并没有配置环境变量，则可以直接在安装目录里调用nginx
/usr/local/bin/nginx -t

# 帮助
# -v            : show version and exit
# -V            : show version and configure options then exit
# -t            : test configuration and exit
# -T            : test configuration, dump it and exit
# -q            : suppress non-error messages during configuration testing

# -s 只是发送一个信号给主进程，这个信号可以是stop，quit，reopen，reload
# -s signal     : send signal to a master process: stop, quit, reopen, reload
# -p prefix     : set prefix path (default: /usr/local/Cellar/nginx/1.17.1/)
# -c filename   : set configuration file (default: /usr/local/etc/nginx/nginx.conf)
# -g directives : set global directives out of configuration file

```

## mysql常用知识
在了解mysql之前，我们需要知道为何会产生数据库，

首先要知道，NoSQL是Not Only SQL，不仅仅是sql的意思，主要呈现的方式是键值对，类似js中的对象。而mysql则是相应的表。

用brew安装完mysql，一般会有如下提示：大意是安装的数据库没有密码，如果想安全的运行，其实就是设置密码等，可以运行mysql_secure_installation

运行mysql_secure_installation会执行几个设置：

1. 为root用户设置密码
2. 删除匿名账号
3. 取消root用户远程登录
4. 删除test库和对test库的访问权限
5. 刷新授权表使修改生效


然后是mysql默认只允许localhost的连接。

连接数据库，用mysql -u root，因为刚开始是没有密码的

后台运行mysql的话，可以brew services start mysql

```
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

To have launchd start mysql now and restart at login:
  brew services start mysql
Or, if you don't want/need a background service you can just run:
  mysql.server start
```

***登录mysql***<br/>

```bash
# 第一次安装时，没有密码，可以直接登录
mysql -u root

# 当配置完密码后，就需要如下
# 连接mysql，输入以下命令后，需要输入数据库的连接密码
mysql -u root -p
```
参考：[设置密码强度][reSetMysqlPWPolicyUrl]
参考：[找到mysql默认的配置文件][findMysqlConfFileUrl]
参考：[mysql没有默认的配置文件，需要自己建][findMysqlConfFileUrl1]

## appache常用知识

## Egg相关知识

Express 和 Koa 是 Node.js 社区广泛使用的框架，简单且扩展性强，非常适合做个人项目。但框架本身缺少约定，标准的 MVC 模型会有各种千奇百怪的写法。Egg 按照约定进行开发，奉行『约定优于配置』，团队协作成本低。

特性：
1. 提供基于 Egg 定制上层框架的能力 (就是扩展性强)
2. 高度可扩展的插件机制 
3. **内置多进程管理**(nodeJs理论上无法充分利用计算机多核性能，但egg可以)
4. 基于 Koa 开发，性能优异 
5. 框架稳定，测试覆盖率高 
6. 渐进式开发

在阿里的话，基础服务还是java提供，只是一些web服务相关的是node做底层。

### 初始化项目

初始化之前，需要先安装，如 npm i -g egg-init

初始化时可以直接：
- egg-init ,控制台会让选择安装的版本及目录
- egg-init dir --type=simple，或者命令行指定安装的版本

安装依赖后，可以直接 npm run start，但这样是后台运行且不是实时编译的，每次需要重启才可看到更新。用 npm run dev (具体命令是egg-bin dev)就可以修改后，刷新浏览器即可。

### egg项目目录结构

- app 项目开发主目录（控制器，路由，中间件，插件等）
- config 项目配置文件（整个项目及插件的配置目录）
- logs 日志文件
- run 运行项目需要的配置文件
- test 测试目录
- .autod.conf.js 是egg加载时需要用到的文件

在app目录里，还细分如下结构目录：
- public 静态资源，其实egg会自动启动一个静态文件服务器
- view 视图，模板，负责页面的展示
- controller 控制器，负责一些业务逻辑的处理
- 在mvc模型里，model其实就是和数据打交道，但在egg里其实就是service
- middleware，中间件，可以理解为vue项目中，权限的判断，在进入页面之前拦截判断。在egg里则是通过中间件。
- extend，扩展，比如要在模板里使用一些工具函数，这些工具函数就可以写在extend目录

egg的目的就是约束大家的规范，不然mvc的写法千奇百怪，所以使用egg就得遵循其规范。使用时，如果想使用提示功能，可以安装对应的插件。

egg基于koa，在koa中是：ctx.body = 'msg'，而在egg中是：this.ctx.body = 'msg'，打印下this，其实可以看出，ctx，app，config等都挂在上面。从 **Koa 继承而来的 4 个对象**（Application, Context, Request, Response) 以及框架扩展的一些对象（Controller, Service, Helper, Config, Logger

### egg之路由、模板引擎

```js
// 获取get方式的路由传值
this.ctx.query

// 获取动态路由，其实就是路径后面的值是变的，参考vue项目
// router.get('/news/:id', controller.home.news);
this.ctx.params
```

渲染页面的话，需要对应的模板引擎，其实就是页面，但这里的页面不像单纯的前端，需要接口来获取数据。。。因为egg本来就是后台服务，只是从一个地方拿到了模板引擎里而已。

常用的模板引擎：
- egg-view-ejs

使用egg-view-ejs时，其实模板引擎也是插件，因此需要先注册，然后还得告诉egg解析模板用的引擎是哪个，所以配置如下：
```js
// 下面是注册插件
// {app_root}/config/plugin.js
module.exports = {
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
};

// 下面是告诉egg，要使用egg-view-ejs解析后缀.html的文件
// {app_root}/config/config.default.js
module.exports = appInfo => {
  const config = exports = {};
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  return {
    ...config,
  };
};

// 1、在view目录可以直接新建一个home.html文件
// 2、在控制器里本来是：ctx.body = 'msg'，可以直接 ctx.render('home')即可。。。(框架的力量，直接找view下面名为home的文件)
// 但需要注意render是异步的，如果此时直接刷新页面会404，因此需要 await ctx.render('home') 

// 但多数情况下，我们的数据都不是写死的，因此需要传入，比如
ctx.render('home', {msg, list})

// 在模板里就可以直接使用传过来的数据，当然需要遵循模板引擎的语法，如下：
<p>这是传过来的消息 <%=msg%> </p>
<ul>
    <% for(let i = 0; i < list.length; i++) {%>
    <li><%=list[i]%></li>
    <%}%>
</ul>

// ejs如果要解析html，语法为 <%- htmlData %>，即=改为-
```

上面是只是数据，那如何加载css或者图片等静态资源呢？其实关键在public目录，egg就是起了一个静态文件服务器，只需要把文件放到public下，就可以获取到，如下：

```html
<!-- 比如 public/images/logo.png -->
<img src="/public/images/logo.png" alt="">
<!-- css等资源同理 -->
```

##### egg之service

在egg里，处理数据相关的逻辑一般都放在service里，使用的时候依然是this.service.home.getList()，这样egg便会自动去app/service/home.js文件里找getList方法了，但**务必注意这些方法是异步，因此获取值时需要await**.

```js
// 控制器里可以调用服务，服务里也可以调用服务
// 其实就是控制器去调用服务拿数据，而服务之间也是可以调用的。
const list = await this.service.home.getList();

// 服务的文件命名有一定规则，为避免出问题，都用驼峰命名
```

当然如果直接在/config/config.default.js里定义一些变量，也可以在控制器或服务等里获取，类似定义了一些全局变量。比如：
```js
// 在config/config.default.js里
config.api = 'http://baidu.com'

// 然后其他的地方，比如servce，controller里都可以获取到
console.log(this.config.api)
// 主要是因为，这些所有的config，app，ctx，service，logger等都是挂载在this上的。
```

### egg之爬虫、extend

其实爬虫，说白了就是请求别人的接口数据，然后渲染到页面上。请求接口就需要用到请求相关的api了。

在node里可以用http模块进行请求，但在egg里封装了curl方法，并挂载在ctx上，因此可以直接使用。

```js
// 其实就是将公共部分设置在config里
const api = `${this.config.api}xxx`;
// curl其实底层封装的还是http，https模块，返回的是promise
const data = await ctx.curl(api);

// 但返回的数据格式，一般都是16进制的Buffer类型，因此还需要转换，如下
// 一般用JSON.parse就可以直接转换，但前提是源数据就是json类型。还可以尝试.toString()方法
<Buffer 3c 21 64 3e 3c 6d 65 74 61 20 68 ... >
```

如果想格式化返回的时间戳，一般有两种方式：
- 数据响应回来后，遍历数组然后处理，但这样会遍历很多次，性能可能有点损伤
- 将数据放在模板里，通过调用工具函数来处理，效果更好些，类似vue中的过滤器或单独方法

在egg里如果想增加工具函数，可以使用extend扩展，这个extend可以扩展几个指定的对象。。。其实就是说，你想扩展，只能在这几个对象上增加方法或属性：
- Application
- Context
- Request
- Response
- Helper

比如如果扩展Application，则需要在extend目录里增加 application.js文件，比如增加foo方法，然后使用的时候就可以直接：this.app.foo()即可。其实原理就是：框架会把 app/extend/application.js 中定义的对象与 Koa Application 的 prototype 对象进行合并，在应用启动时会基于扩展后的 prototype 生成 app 对象。而app对象又挂在this上。

同理如果想扩展Context，则需要增加 context.js 文件，并增加foo方法，调用时 this.ctx.foo();

当然如果想扩展属性时，考虑到性能问题，一般都是需要缓存的，因为属性的计算在同一次请求中只需进行一次：

```js
// app/extend/context.js
const BAR = Symbol('Context#bar');

module.exports = {
  get bar() {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    if (!this[BAR]) {
      // 例如，从 header 中获取，实际情况肯定更复杂
      this[BAR] = this.get('x-bar');
    }
    return this[BAR];
  },
};
```

**注意一点：**，在对应的扩展文件里，比如 application.js 里的this，其实就是app，在context.js 的this就是 ctx ，因此不要与最外层的this混淆了，如果想在 context.js 获取query参数，则可以直接：this.query 即可。

因此如果想增加一个工具函数，一般都在helper对象上扩展。扩展方法如上：
1. 在extend目录里增加 helper.js 文件
2. 定义格式化方法，比如formatDate，当然也可以安装第三方时间库进行格式化
3. 使用时，在模板里直接以js语法使用即可，helper.formatDate(date)

**注意**：正常的时间戳位数是13位，如果碰到10位，不要忘了乘以1000，因为有的工具无法识别。


### egg之中间件

在vue项目中，一般在全局拦截器里做一些关于权限的逻辑，这些逻辑可以抽象成一个中间件，比如就是校验权限的中间件。

1、中间件的写法，就是在middleware目录里增加对应的中间件即可，比如printDate中间件：
```js
// app/middleware/printDate.js
module.exports = (opts, app) => {
  return async function printDateMain(ctx, next) {
    console.log('时间为:',new Date());
    await next();
  }
}
```

2、中间件写完之后，还需要注册才可以使用，直接在 config.default.js 配置即可：

```js
// 配置要使用的中间件，注意printDate是文件名
config.middleware = ['printDate']
// 疑问：难道一个中间件，只能实现一个功能？
// 答案：是的，因为中间件的功能一般单一且全局，这类的还是少数
```

3、这样配置之后，访问任何页面都会打印当前的日期，这也未免太直接暴力了啊。。。

那中间件的参数，opts，app什么意思呢？

```js
// opts 是传入当前中间件的参数，也得需要在config.default.js配置，比如：
config.printDate = {
  curTime: new Date()
}

// 然后在中间件里，打印opts就是上面的对象。
// 因此opts对象的值其实就是：this.config[${middlewareName}]，
// 比如这里中间件名字为printDate，其实也就是 config.printDate

// 当然app的话，其实就是Application的实例
```

综上可以得出：
1. 中间件是全局的，适合做一些全局拦截操作，比如权限，比如访问ip白名单
2. 中间件的功能比较单一，因此一个中间件应该也只有一个方法

```js
// 例子：实现一个访问ip白名单的中间件。

// 思路:
// 1. 如何获取访问的ip？
// 2. ip白名单哪里来？
// 3. 校验规则

// app/middleware/forbidIp.js
module.exports = (opts, app) => {
  return async function main(ctx, next) {
    // 要屏蔽的ip
    const ips = '127.0.0.1'

    // 访问服务的ip
    const curIp = ctx.request.ip;

    // 校验规则
    if (ips === curIp) {
      ctx.status = 403;
      ctx.body = '您的ip非法，已被屏蔽';
    } else {
      await next();
    }
  }
}

// 如果用localhost访问，显示的ip为 ::1
// 上面的ips是写死的，还可以通过数据库获取，还可以通过传入插件的配置opts实现。
```

### egg之post请求、csrf防范

我们要知道，直接在地址栏里的url其实就是get请求，而一般我们提交的表单都是post请求，不管是get还是post，对于egg服务来说，都需要一个对应的路由去匹配，然后交由具体的控制器去处理逻辑，而每个控制器的写法都是相同的。。。

而路由匹配，一般是指定请求方式，比如
```js
router.get('/', controller.home.index);
router.post('/add', controller.home.add);
```

如果在页面直接定义个表单，并提交，egg服务器会提示：invalid csrf token，其实说白了，egg框架做了防止csrf攻击的安全机制。

原因就是，不能任意页面构建一个post请求就可以访问服务器，即使是自己的用户访问也不行。

解决方案，可以直接关闭这个机制，当然最好根据egg框架要求去实现：
- 首先前端访问页面时，需要接收并存储来自服务器端的一个随机字符串
- 前端页面发送post请求时，需要再将这个随机字符串通过一定方式传到后台

```js
// 前端页面访问的控制器为：controller.home.index
async index() {
  const { ctx } = this;
  await ctx.render('home', {
    // 其实就是将后台生成的随机字符串返给前端
    csrf: this.ctx.csrf,
  });
}

// 前端发起post请求时，需要携带，可以通过隐藏域来实现
// 注意隐藏域的name为：_csrf
<form action="/add" method="POST">
  <p>用户名：<input type="text" name="userName"/></p>
  <p>密  码：<input type="password" name="pwd"/></p>
  <input type="hidden" name="_csrf" value="<%=csrf%>"/>
  <button type="submit">提交</button>
</form>

// 当然还可以直接通过url来实现，
// 比如：action="/add?_csrf=<%=csrf%>"
```

但上面的方式，是需要给每个页面都加csrf，如果有多个页面岂不是很蛋疼。。。所以中间件的全局性就可以用上了。
```js
// app/middleware/forCsrf.js
module.exports = (opts, app) => {
  return async function main(ctx, next) {
    // 这样就把随机字符串挂到全局了？
    // 然后页面就可以直接拿到csrf了，不需要控制器再传csrf了
    ctx.state.csrf = ctx.csrf;
    await next();
  }
}
// 当然，使用之前，还需要注册中间件
```

然后正常提交后，就可以在add控制器里获取到提交的内容了，
```js
// 处理表单提交的post请求
async add() {
  const { ctx } = this;
  // 将获取到的表单数据，再返给浏览器
  // 这里原封不动的将数据返给浏览器端，就可能造成反射性xss攻击
  // 因为返给浏览器，浏览器会解析并执行脚本
  ctx.body = ctx.request.body;
}
```

### egg之cookie，

[参考egg之cookie官网链接](https://eggjs.org/zh-cn/core/cookie-and-session.html)：

因为http协议是无状态协议，服务器并不知道当前访问服务的浏览器用户是哪位？因此需要一个标识，这就是cookie，有了标识，服务器就可以针对同一个用户打开多个浏览器页，并共享用户信息。

**cookie 是存在浏览器端的变量，里面有些 key 和 value 的键值对**。

只需简单几步就可以实现
```js
// 1、比如在home页面的控制器，设置cookie，
ctx.cookies.set('userName', 'zhangsan');
// 2、在admin页面的控制器获取cookie
ctx.cookies.get('userName');
// 其实可以在该域下的所有页面都可以访问cookie
// 其实现在在浏览器控制台-application-Cookies里就可以看到userName，userName.sig
```

上面简单可总结为：
- 同一个浏览器访问同一个域下的页面，所有页面都共享cookie
- 默认情况下，浏览器退出后（**注意是退出后**）cookie就会自动销毁

现实中，我们都会给cookie设置一个过期时间，当然还有其他的一些配置，这里就通过 cookies.set 的第三个参数来实现。

```js
ctx.cookies.set(key, value, options)
```

options原生支持下面属性：
- {Number} maxAge: 设置这个键值对在浏览器的最长保存时间。是一个从服务器当前时刻开始的毫秒数。
- {Date} expires: 设置这个键值对的失效时间，如果设置了 maxAge，expires 将会被覆盖。如果 maxAge 和 expires 都没设置，Cookie 将会在浏览器的会话失效（一般是退出浏览器时）的时候失效。
- {String} path: 设置键值对生效的 URL 路径，默认设置在根路径上（/），也就是当前域名下的所有 URL 都可以访问这个 Cookie。
- {String} domain: 设置键值对生效的域名，默认没有配置，可以配置成只在指定域名才能访问。
- {Boolean} httpOnly: 设置键值对是否可以被 js 访问，默认为 true，不允许被 js 访问。
- {Boolean} secure: 设置键值对只在 HTTPS 连接上传输，框架会帮我们判断当前是否在 HTTPS 连接上自动设置 secure 的值。

当然Egg还扩展了几个属性：
- {Boolean} overwrite：设置 key 相同的键值对如何处理，如果设置为 true，则后设置的值会覆盖前面设置的，否则将会发送两个 set-cookie 响应头。
- {Boolean} signed：设置是否对 Cookie 进行签名，如果设置为 true，则设置键值对的时候会同时对这个键值对的值进行签名，后面取的时候做校验，可以防止前端对这个值进行篡改。默认为 true。
- {Boolean} encrypt：设置是否对 Cookie 进行加密，如果设置为 true，则在发送 Cookie 前会对这个键值对的值进行加密，客户端无法读取到 Cookie 的明文值。默认为 false。

结合上面的属性说明，我们知道了 userName.sig 便是Egg自动给Cookie做的签名，防止前端修改。当然这样会增加一个cookie字段，还可以加密传输，这样不但看不到cookie的明文还少一个字段，缺点是接受是需要指定解密才可以看到明文cookie。如下：
```js
// 加密传输cookie
ctx.cookies.set('userName', 'zhangsan', {
  encrypt: true,
});
// 解密获取cookie，不然为undefined
ctx.cookies.get('userName', {
  encrypt: true,
});
// 这样的还可以自动取消签名，因为签名也没有意义了
```

这里需要几个问题：
- 由于浏览器和其他客户端实现的不确定性，为了保证 Cookie 可以写入成功，建议 value 通过 base64 编码或者其他形式 encode 之后再写入。(其实默认情况下设置中文就会报错，此时可以添加加密配置便可解决)
- 由于浏览器对 Cookie 有长度限制限制，所以尽量不要设置太长的 Cookie。一般来说不要超过 4093 bytes（单个不超过4k）。当设置的 Cookie value 大于这个值时，框架会打印一条警告日志。
- 
- 如果设置的时候指定为 signed，获取时未指定，则不会在获取时对取到的值做验签，导致可能被客户端篡改。
- 如果设置的时候指定为 encrypt，获取时未指定，则无法获取到真实的值，而是加密过后的密文。

那加密和加签名用到的秘钥在哪里配置的呢？答案就是 config/config.default.js 里的 config.keys。
```js
config.keys = 'key1, key2'
// 加密和加签时只会使用第一个秘钥。
// 解密和验签时会遍历 keys 进行解密。
// 如果我们想要更新 Cookie 的秘钥，但是又不希望之前设置到用户浏览器上的 Cookie 失效，可以将新的秘钥配置到 keys 最前面，等过一段时间之后再删去不需要的秘钥即可。
```

当然清除cookie有以下几种方式：
- ctx.cookies.set(key, null); 其实就是重新设置为null
- ctx.cookies.set(key, null, { maxAge: 0 }); 设置过期时间

### egg之session

session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session是保存在服务器上。

这里再回顾上面的cookie，其实上面cookie并没有和sesion有任何关联。其实之前设置的cookie都是写死的，而且也没有与具体的业务关联什么的。其实现实中，session是需要与cookie进行关联，事实上，session也是基于cookie的。

当浏览器访问服务器并发送第一次请求时，服务器端会创建一个 session 对象，生成一个类似于 key,value 的键值对， 然后将 key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带 key(cookie)，找到对应的 session(value)。

```js
// 设置session
ctx.session.userInfo = {
  name: '李四',
  age: 29,
};
// 获取session
const session = ctx.session.userInfo;
```

这里不像cookie那样还有 set 和 get 方法，session直接就是赋值。当然设置属性也可以直接赋值：

```js
// 设置过期时间
ctx.session.maxAge = 5000; // 5秒后过期

// 当然上边的设置比较零散，可以在config/config.default.js统一配置：
// 下面的是其默认配置，可以修改
config.session = {
  key: 'EGG_SESS', // 其实就是session中cookie的key
  maxAge: 24 * 3600 * 1000, // 1 天
  httpOnly: true,
  encrypt: true,
}

// 当然清除session可以直接：
ctx.session = null
```

session设置时注意：
- key不要以 _ 开头
- key不能为 isNew

我们现在知道，其实session是基于cookie的，而session设置完以后，又是通过cookie存储在浏览器端的。但这样一直**存在浏览器端也是有问题的**：

- 浏览器通常都有限制最大的 Cookie 长度，当设置的 Session 过大时，浏览器可能拒绝保存。
- Cookie 在每次请求时都会带上，当 Session 过大时，每次请求都要额外带上庞大的 Cookie 信息。

因此为了项目的可扩展性，还是需要考虑其他的存储方案，egg便提供了一个，只需要设置 app.sessionStore 即可将 Session 存储到指定的存储中。

```js
// app.js
module.exports = app => {
  app.sessionStore = {
    // support promise / async
    async get (key) {
      // return value;
    },
    async set (key, value, maxAge) {
      // set key to store
    },
    async destroy (key) {
      // destroy key
    },
  };
};
```
sessionStore 的实现我们也可以封装到插件中，例如 egg-session-redis 就提供了将 Session 存储到 redis 中的能力，在应用层，我们只需要引入 egg-redis 和 egg-session-redis 插件即可。

```js
// plugin.js
exports.redis = {
  enable: true,
  package: 'egg-redis',
};
exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};
```

**注意**：**一旦选择了将 Session 存入到外部存储中，就意味着系统将强依赖于这个外部存储，当它挂了的时候，我们就完全无法使用 Session 相关的功能了。因此我们更推荐大家只将必要的信息存储在 Session 中，保持 Session 的精简并使用默认的 Cookie 存储，用户级别的缓存不要存储在 Session 中**。

最佳实践：
- 项目中，如果有 记住我 的选项，可以获取到用户，针对性修改maxAge时间
- 项目中，我们经常在session还剩一半有效时间时，就重置，避免用户隔一段时间就登录

```js
// 当用户 Session 的有效期仅剩下最大有效期一半的时候，重置 Session 的有效期
// 当然前提是，过期之前浏览器一直与服务端交互。
config.session = {
  renew: true
}
```

综上cookie与session对比：
- cookie 数据存放在客户的浏览器上，session 数据放在服务器上。
- cookie 相比 session 没有 session 安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE
欺骗。
- session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
考虑到减轻服务器性能方面，应当使用 COOKIE。
- 单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie。

### egg之中间件进阶

#### 路由级别中间件
之前我们定义的中间件都是作用于全局的，现实中，很多中间件都是针对部分路由的。。。其实步骤也很简单：

- 编写中间件（和之前一样）
- 不要在config/config.default.js配置了
- 在具体的路由里，通过 app.middleware.xxx来获取中间件
- 传递参数只需要直接：app.middleware.xxx(opts)即可
- 在路由里使用时，第二个参数便是中间件

```js
module.exports = app => {
  const { router, controller } = app;

  const opts = { key: '路由级中间件' };
  const printDateMiddleware = app.middleware.printDate(opts);

  router.get('/', printDateMiddleware, controller.home.index);
}
```

#### 框架内置中间件

除了我们自己写的一些中间件，egg框架还内置了一些中间件，比如bodyParser，如果想配置的话，可以在 config/config.default.js 里配置

```js
// 限制post请求体大小为10M
config.bodyParser: {
  jsonLimit: '10mb',
},
```

#### 使用规范的koa中间件

egg是基于koa，因此使用koa相关的中间件毫无压力。步骤和其他中间件差不多，如果想全局就在config.default.js里配置，如果不想则可以配置路由级别。

主要区别就是，koa的中间件不用在单独编写，只需要在 app/middleware 里新增对应文件，然后引入koa中间件即可(当然需要先安装)

```js
// app/middleware/jsonp.js
module.exports = require('koa-jsonp');
// 使用时根据情况注册即可
// 其他的中间件用法也是同理
```

**例子**：之前我们用的jsonp，无非是后端返回给前端数据 data，然后前端接收 data，并传入前端定义好的 callback 进行执行，也就是 callback(data)。这个过程可以通过 koa-jsonp 中间件来更好的支持。

```js
// 未使用jsonp中间件
async testJsonp() {
  const { ctx } = this;
  ctx.body = {
    name: 'test-jsonp',
  };
}
// 此时前端访问：xxx/testJsonp?callback=handleJsonp，页面会打印
{"name":"test-jsonp"}


// 使用jsonp中间件后
// 此时前端访问：xxx/testJsonp?callback=handleJsonp，页面会打印
;handleJsonp({"name":"test-jsonp"});
```

其实 koa-jsonp 中间件就会解析url里的query，如果有callback，则会把ctx.body的数据传给callback。

**例子**：前端请求的页面，如果很大的话会耗时很长，因此可以开启 gzip 压缩会压缩 html 大小，进而可以大幅提升传输效率；

```js
// app/middleware/compress.js
// koa-compress 暴露的接口(`(options) => middleware`)和框架对中间件要求一致
module.exports = require('koa-compress');

// 但压缩的话，也会占用cpu，因此不是所有页面都压缩，只有大于多少的才开启压缩
// config/config.default.js
module.exports = {
  middleware: [ 'compress' ],
  compress: {
    threshold: 2048, // Default 1024 bytes or 1kb.
  },
};

// 控制台network默认不显示 Content-Encoding 栏，可以右键点击 tab 栏，选择要展示的 Response Headers
```

#### 中间件的通用配置

其实就是一些配置项，对所有的中间件适用，其实就是自定义一些规则，让这些中间件处理哪些请求。

```js
// config/config.default.js
module.exports = {
  middleware: [ 'compress' ],
  compress: {
    enable: true, // 开启，就不需要在middleware里删除了
    match: '/static', // 只有符合哪些规则的请求会经过中间件
    ignore: '/static', // 符合哪些规则的请求不经过中间件
  },
};

// 当然match，ignore不但可以是字符串，还可以是正则，函数等。比如：
match(ctx) {
  // 只有 ios 设备才开启
  const reg = /iphone|ipad|ipod/i;
  return reg.test(ctx.get('user-agent'));
},
```

#### egg之路由重定向，restfull,

router匹配不同的路径，还有很多方式，比如：
```js
router.verb('path-match', app.controller.action);
router.verb('router-name', 'path-match', app.controller.action);
router.verb('path-match', middleware1, ..., middlewareN, app.controller.action);
router.verb('router-name', 'path-match', middleware1, ..., middlewareN, app.controller.action);
```

- verb支持 get，post 等所有 HTTP 方法(不是说代码里写verb啊，这里verb只是表示多个)
- path-match 就是具体的url匹配路径
- router-name 其实就是给路由起一个别名(如何获取?)，比如vue项目每个路由的name
- middleware，中间的所有参数都为中间件，可有可无，可多个
- app.controller.action 就是具体匹配到路由，要执行的控制器了

```js
// 控制器两种写法
app.controller.user.fetch // 直接指定一个具体的 controller
'user.fetch'              //可以简写为字符串形式
```

上面的方式，需要明确的指定哪些路由匹配哪些控制器，还有一种方式，就是 restfull 风格的定义方式，可以快速的生成一组 CRUD 风格的路由及对应的控制器。

```js
// 语法
// app.resources('routerName', 'pathMatch', controller)

// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.resources('posts', '/api/posts', controller.posts);
};
```

其实上面的一行resources代码就生成了一组路由，和一组与之匹配的控制器。当然控制器里如果没有对应的方法，这样对应 URL 路径也不会注册到 Router。

Method | Path |  Route Name | Controller.Action
-|-|-|-
GET |	/posts | posts | app.controllers.posts.index
GET	| /posts/new | new_post	| app.controllers.posts.new
GET |	/posts/:id | post | app.controllers.posts.show
GET | /posts/:id/edit | edit_post | app.controllers.posts.edit
POST | /posts | posts | app.controllers.posts.create
PUT | /posts/:id | post | app.controllers.posts.update
DELETE | /posts/:id | post | app.controllers.posts.destroy

在具体的控制器，不但可以获取请求的各种参数，还可以对提交的表单进行校验：
```js
async new() {
  let { ctx } = this;

  const createRule = {
    username: {
      type: 'email',
    },
    password: {
      type: 'password',
      compare: 're-password',
    },
  };

  // 如果校验报错，会抛出异常
  ctx.validate(createRule);
  ctx.body = ctx.request.body;
}
```

路由重定向：
- 单个路由直接配置重定向(参数二是要去的目标地址)
- 在控制器里重定向

```js
// 单个路由直接配置重定向
router.redirect('/', '/home/index');
//控制台code: 301 Moved Permanently，永久
router.redirect('/', '/home/index', 302);
//控制台code: 302 Found

// 在控制器里重定向，
ctx.redirect('www.baidu.com');
// 控制台code: 302 Found
ctx.redirect('www.baidu.com', 301);
// 控制台code: 302 Found

// 这里设置参数没有用，如果想改变状态，需要
ctx.status = 301
ctx.redirect('www.baidu.com');
```

**注意**：301重定向有缓存，当成功执行一次301跳转后，浏览器会缓存下来，下次再访问时即时改为302，也会直接301。。。需要无痕模式或者其他？而如果第一次是302，再改为301，则直接就是301，再次访问，又变为缓存了 301 Moved Permanently (from disk cache)

另外就是302也是有利于浏览器的SEO的，因为访问地址并不会被爬虫删除


#### egg之控制器基类，兼容写法

在es6中，定义一个基类，然后在基类里定义一些方法，其他的类便可以继承这个基类的方法，从而使用基类里的方法。

在egg项目里，如果想定义基类，一般新建一个core目录，然后在里面定义一些基类：
```js
// app/core/base_controller.js
const { Controller } = require('egg');
class BaseController extends Controller {
  // 这个就是属性
  get user() {
    return this.ctx.session.user;
  }

  success(data) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
```

然后在具体的控制器里便可以继承这个基类：
```js
//app/controller/post.js
const Controller = require('../core/base_controller');
class PostController extends Controller {
  async list() {
    const posts = await this.service.listByUser(this.user);
    // 调用基类里的方法
    this.success(posts);
  }
}
```

站在后端角度去理解http，参考[egg官方文档关于http的解析](https://eggjs.org/zh-cn/basics/controller.html)

#### egg之定时任务

无非也是遵循一定的编写规范，然后通过一些配置项，定时的去执行一些逻辑。

定时任务经常做的事情：
- 检查网站是否挂掉
- 检查网站是否被串改

其实原理就是：定时去获取网站的一些页面信息，如果获取不到的话，基本就是挂了。如果获取到的数据和预想的数据不同，那八成网站被人串改了，检测到这样的情况就可以给网站管理人员发送提醒邮件或通知了。

**例子**：检查百度官网是否被串改？

步骤：
1. 设置定时任务，抓取百度首页数据
2. 解析首页数据
3. 拿到指定的数据，比如侧边栏的标题
4. 对比拿到的数据与预想的数据

- 关于解析数据：网络传输的数据，一般都是Buffer类型，需要转字符串
- 关于拿到指定数据：从解析出来的字符串，如何快速拿到指定的数据，可以用正则，但还可以借助专门解析网页字符串为dom结构的cheerio库（使用方式类似jquery获取dom）。

```js
// app/schedule/
const Subscription = require('egg').Subscription;

// 安装并引入cheerio
const cheerio = require('cheerio');

class HealthCheck extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '5s', // 5s间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const res = await this.ctx.curl('http://news.baidu.com/', {
      // dataType: 'json',
    });

    // 解析html为dom结构
    let $ = cheerio.load(res.data.toString(), {decodeEntities: false});

    // 获取抓取到的数据
    let curHtml = $('#footer > a').html()

    // 比较，看似否被串改
    const targetHtml = '用户协议'

    if (targetHtml !== curHtml) {
      console.log('您的网页已被串改');
    } else {
      console.log('网站正常');
    }
  }
}

module.exports = HealthCheck;
```

```js
// cheerio的简单用法如下，主要就是解析html字符串，然后类似jquery操作dom
const cheerio = require('cheerio')
const $ = cheerio.load('<h2 class="title">Hello world</h2>')

$('h2.title').text('Hello there!')
$('h2').addClass('welcome')

$.html()
//=> <h2 class="title welcome">Hello there!</h2>
```

**注意：**
- ctx.curl传入的参数二，可以设置返回的数据格式，默认情况下res.data是16进制Buffer类型，需要toString()或JSON.parse()转化。
- cheerio.load解析字符换后，就可以利用类似jquery的语法获取指定的元素
- {decodeEntities: false} 配置是处理中文用的，不然拿到的中文是编码格式。
- 这里比价麻烦的点是解析返回的数据


### Mongodb4.x

#### 安装方式

安装软件有几种方式：
- 官方安装包
- 下载源文件
- mac终端软件管理器 homebrew

#### Mongodb4.x之基本配置

数据库默认会有一个数据存储目录，而Mongodb的默认目录为： /data/db，当然如果不是的话，可以重新设定：mongod --dbpath=/data/db

```bash
# 如果没有 /data/db 目录，启动mondod会报如下错误
# Data directory /data/db not found

# 创建了目录还有可能有写入权限问题，如下
# Attempted to create a lock file on a read-only directory: /data/db
```

另外要清楚，**数据库服务分两部分：服务部分、客户端部分**。其实可以理解为前端和后端，要想看到整个服务的效果，需要后端服务起来，同时前端访问。。。数据库也是同理。

一般homebrew安装的软件，都会自动配置好环境变量，这样便可全局执行：mongod，但如果环境变量未能正确配置，则还可以直接找到安装包的位置进行启动。

```bash
# 当然下面的命令都是找出当前系统正在运行的进程，如果nginx服务并没有起来是找不到的
# 列出所有进程中关于nginx的，
ps aux | grep nginx
# 同理列出所有进程关于mongod的
ps aux | grep mongod

# which指令会在环境变量$PATH设置的目录里查找符合条件的文件。
which nginx
=> /usr/local/bin/nginx
```

使用homebrew安装完以后，会提示如下内容：

```
To have launchd start mongodb now and restart at login:
  brew services start mongodb
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf
```

安装成功后，在控制台输入：which mongod，会输出mongodb的环境变量：/usr/local/bin/mongod


```bash
# 初次连接，还会提示：
# 下面的意思，为了安全起见，需要给数据库创建管理员，其实也就是创建一个管理员账号
WARNING: Access control is not enabled for the database.
  Read and write access to data and configuration is unrestricted.

# 就是现在数据库的ip绑定的是localhost，远程无法连接，可以改为绑定至ip地址。
WARNING: This server is bound to localhost
   Remote systems will be unable to connect to this server
   Start the server with --bind_ip <address> to specify which IP
   addresses it should serve responses from, or with --bind_ip_all to
   bind to all interfaces. If this behavior is desired, start the
   server with --bind_ip 127.0.0.1 to disable this warning.

```

#### Mongodb数据库的启动与连接

```bash
# 启动服务，务必注意是 mongod，其实可以理解为服务端，一般服务都带d
mongod

# 连接服务，务必注意是 mongo，其实可以理解为客户端
mongo
```

```bash
# 1、连接数据库，
mongo
# 1.1、查看数据库
show dbs

# 2、创建超级管理员，先切换，在创建
# 2.1 切换数据库（超级管理员必须在admin里建）
use admin
# 2.2 创建管理员, 删除是dropUser
db.createUser(
  {
    user: "admin", //用户名
    pwd: "123456", //密码
    roles: [ { role: "root", db: "admin" } ] 
  }
)
# => Successfully added user

# 2.3 查看人员
show users

# 3、修改配置
# 3.1 查找配置文件在哪？
/usr/local/etc/mongod.conf
# 3.2 添加安全校验，其实就是下次连接时需要用户名和密码
security:
    authorization: enabled

# 4、重新启动服务，端口号可省略，默认就是27017
mongod --auth -p 27017 --dbpath /data/db

# 5、重新连接数据库
mongo -u "admin" -p "123456" --authenticationDatabase "admin"
```

#### Mongodb数据库基本术语及操作

不管什么数据库，都应该知道里面的一些基本概念，在mongodb中基本的概念是文档、集合、数据库

SQL术语/概念 | MongoDB术语/概念 |  解释 
-|-|-|
database | database | 数据库
table | collection | 数据库表/集合
row | document | 数据记录行/文档
column | field | 数据字段/域
index | index | 索引
table | joins | 表连接,MongoDB不支持
primary key | primary key | 主键,MongoDB自动将_id字段设置为主键

一个mongodb中可以建立多个数据库。MongoDB的默认数据库为"db"，该数据库存储在data目录中。

- show dbs，可以显示所有数据库的列表
- db 命令可以显示当前数据库对象或集合
- use命令，可以连接到一个指定的数据库
- show users，查看数据库用户
- db.dropUser('xxx')，删除用户
- db.updateUser('admin', { pwd: 'password' })，修改密码
- db.auth("用户名","password")，密码认证

db.auth()什么时候用呢？其实除了直接输入用户名和密码进行登录连接外，还可以如下:
```bash
# 1、连接数据库，当然虽然连接了，但是无法执行命令
mongo admin

# 2、执行命令会报错，Unauthorized
show dbs

# 3、密码认证，调用db.auth即可认证成功
db.auth('admin', '123456') # 成功的话会输出 1 
```

有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库。
- admin： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限（一般超级管理员就是在这里添加）。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
- local: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合
- config: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。

SQL数据库与NoSql数据库，在一些名字的叫法上也不同：
SQL | NoSql
-|-
表格 | 集合
行 | 文档
列 | 字段
表联合 | 嵌入文档
主键 | 主键 (MongoDB 提供了 key 为 _id )


创建一个新的集合，并插入一个文档，在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合。

```bash
# 下面便可以创建一个egg的数据库
db.egg.insert({ type: 'eggDb' })
# show dbs，就可以看到egg数据库

# 给egg这个数据库增加用户，
db.createUser(
  {
    user: "eggOwner", 
    pwd: "123456", 
    roles: [ { role: "dbOwner", db: "egg" } ] 
  }
)

# 连接egg这个数据库
mongo egg -u eggOwner -p 123456

# 查看数据库
show dbs # 只会看到egg数据库
```

数据库的一些角色
- 1.数据库用户角色:read、readWrite; 
- 2.数据库管理角色:dbAdmin、dbOwner、userAdmin; 
- 3.集群管理角色:clusterAdmin、clusterManager、clusterMonitor、hostManager; 
- 4.备份恢复角色:backup、restore; 
- 5.所有数据库角色:readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、 dbAdminAnyDatabase
- 6.超级用户角色:root

#### 第三方库操作Mongodb

我们可以通过终端或GUI程序操作数据库，但是在程序里，更多的是借助第三方库来实现。

使用第三方库，而第三方库更像是插件，比如处理模板的view-ejs，这里只是用来操作数据库，因此也需要安装、注册、配置。

插件为 egg-mongo-native 基于 node-mongodb-native，提供了 MongoDB 官方 driver 及 API。插件对一些常用 API 进行了简单封装以简化使用，同时保留了所有原版属性（非 Egg.js 用户请使用 easy-mongodb。）

```js
// 安装 
npm i egg-mongo-native

// 注册
// config/plugin.js
exports.mongo = {
  enable: true,
  package: 'egg-mongo-native',
};

// 配置
// {app_root}/config/config.default.js
exports.mongo = {
  // client其实就是客户端
  client: {
    host: '127.0.0.1', // 根据情况改为数据库ip
    port: '27017', // 一般为27017
    name: 'egg', // 数据库名
    user: 'eggOwner', // 用户名
    password: '123456',
    options: {},
  },
};

// 配置完，如何使用呢？mongo挂在哪个对象下呢？
let myDb = await app.mongo.find('egg'); // egg是集合
console.log(myDb, 'myDb'); // 这里会打印集合里的所有文档
```

在开始使用之前，需要补充有关数据库的基本操作：

新建、查看、删除数据库，插入、查看、删除文档、
```bash
# 新建数据库（还是新建集合呢?）
use 数据库名 # 不存在则新建，存在则切换

# 查看当前的数据库,
db

# 查看数据库下的数据(其实应该说查看集合下的文档)
db.数据库名.find() # 若空集合则什么都不会输出

# 在当前的数据库中插入文档
db.数据库名.insert({ text: 'testMsg' })

# 再次查看集合，应该看到：'testMsg'，和其他的一些信息
db.数据库名.find()
=> { "_id" : ObjectId("5e528fdd3975d37cc58fba4c"), "text" : "testMsg" }

# 删除数据库
db.dropDatabase()
=> { "dropped" : "数据库名", "ok" : 1 }
# 还可以
db.数据库名.drop()
=> true
```


### 项目

在做具体的项目时，我们可以采用前后端分离的模式，但如果采用前后端都用egg去实现的话，就需要对项目进行一下结构上的改造，以提高代码的可维护性和可拓展性。

其实说白了，就是讲后台相关的、前端相关的、api相关的等，分别建不同的目录进行管理，比如
- controller/admin 后台相关的控制器
- controller/api api控制器
- controller/fe 前端相关的控制器

其他的文件夹的配置原理一样。


[whatForwardProxyOrReverseUrl]: https://zhuanlan.zhihu.com/p/25707362
[reSetMysqlPWPolicyUrl]: https://mal-suen.github.io/2018/05/27/MySQL%E5%AE%89%E5%85%A8%E8%AE%BE%E7%BD%AE%E5%91%BD%E4%BB%A4mysql_secure_installation/
[findMysqlConfFileUrl]: https://blog.csdn.net/qq_42689877/article/details/82844260
[findMysqlConfFileUrl1]: https://blog.csdn.net/StriverLi/article/details/78637026


