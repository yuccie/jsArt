---
layout: post
title: 服务器的一些概念
date: Fri Jan 04 2019 14:24:26 GMT+0800 (中国标准时间)
---


#### 正向和反向代理
***正向代理***<br/>
通常指的是代理服务器vpn，特点就是隐藏了真实的请求客户端，服务端不知道真实的客户端是谁，客户端请求的服务都由代理服务器代替来请求。

举个例子，国内的用户想要访问 Google 时，会被阻挡。所以这个时候把请求发送到另外一个代理服务器（可以访问 Google 的服务器）上，由其代为转发请求和接收响应内容。

***反向代理***<br/>
反向代理和正向代理相反，但反向代理一般是负载均衡的一个原理。正向代理是一对一或者多对一，而反向代理一般是一对多或多对多。

反向代理隐藏了真实的服务端，当我们请求 http://www.baidu.com 的时候，就像拨打 QQ 客服热线一样，背后可能有成千上万台服务器为我们服务，但具体是哪一台，你不知道，也不需要知道，你只需要知道反向代理服务器是谁就好了，http://www.baidu.com 就是我们的反向代理服务器，反向代理服务器会帮我们把请求转发到真实的服务器那里去。

因此二者的区别在于代理的对象不一样，正向代理代理的对象是客户端，反向代理代理的对象是服务端。


#### nginx常用知识

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

server {
  listen       8080; # 8080端口 - 不要修改
  server_name  localhost;

  # 添加前端静态文件 - 不要修改
  location / {
      root   /data/app; # 此处为容器内的文件路径，不需要修改
      index index.html index.htm;
      try_files $uri $uri/ /index.html?$query_string;
  }

  # 修改这里
  # 添加对后端的依赖，根据业务需要进行修改
  # https://www.cnblogs.com/jpfss/p/10418150.html
  location ~ ^/(api|auth|admin|tms|zuul) {
      set $b "xxx";
      proxy_pass http://$b;
      proxy_set_header Host $http_host;
      proxy_redirect off;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Scheme $scheme;
  }
}
```

```js
// proxy_pass
// 在nginx中配置proxy_pass代理转发时，如果在proxy_pass后面的url加/，表示绝对根路径；
// 如果没有/，表示相对路径，把匹配的路径部分也给代理走。

// 假设下面四种情况分别用 http://192.168.1.1/proxy/test.html 进行访问。

// 第一种：
location /proxy/ {
  proxy_pass http://127.0.0.1/;
}
// 代理到URL：http://127.0.0.1/test.html


// 第二种（相对于第一种，最后少一个 / ）
location /proxy/ {
  proxy_pass http://127.0.0.1;
}
// 代理到URL：http://127.0.0.1/proxy/test.html


第三种：
location /proxy/ {
  proxy_pass http://127.0.0.1/aaa/;
}
// 代理到URL：http://127.0.0.1/aaa/test.html


// 第四种（相对于第三种，最后少一个 / ）
location /proxy/ {
  proxy_pass http://127.0.0.1/aaa;
}
// 代理到URL：http://127.0.0.1/aaatest.html
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

~~有时候，用postman就可以调通接口，但用浏览器就调不同？原因在于：postman都是绝对地址，另外就是一些header信息，也很少，所以不会触发后台的拦截机制。~~ postman之所以请求接口没有跨域，是因为跨域只存在于浏览器。。。

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

#### mysql常用知识
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

连接数据库，用mysql -uroot，因为刚开始是没有密码的

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
mysql -uroot

# 当配置完密码后，就需要如下如数
# 连接mysql，输入以下命令后，需要输入数据库的连接密码
mysql -u root -p
```
参考：[设置密码强度][reSetMysqlPWPolicyUrl]
参考：[找到mysql默认的配置文件][findMysqlConfFileUrl]
参考：[mysql没有默认的配置文件，需要自己建][findMysqlConfFileUrl1]

#### appache常用知识





[whatForwardProxyOrReverseUrl]: https://zhuanlan.zhihu.com/p/25707362
[reSetMysqlPWPolicyUrl]: https://mal-suen.github.io/2018/05/27/MySQL%E5%AE%89%E5%85%A8%E8%AE%BE%E7%BD%AE%E5%91%BD%E4%BB%A4mysql_secure_installation/
[findMysqlConfFileUrl]: https://blog.csdn.net/qq_42689877/article/details/82844260
[findMysqlConfFileUrl1]: https://blog.csdn.net/StriverLi/article/details/78637026


