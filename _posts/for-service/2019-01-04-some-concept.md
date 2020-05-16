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


# 有时候想指定nginx配置文件，可以拷贝一份默认配置文件
# 默认配置文件，可以通过find查找 nginx.conf
# 如下便可以指定并检测自定义的nginx配置是否正确
nginx -tc cusNginx.conf

# nginx日志功能，access_log和error_log，可以清晰的记录异常的原因，要善于利用
# 如果~/Desktop/js/index.html文件存在的话，nginx会报404 Not Found
# 查看错误日志可以发现：即nginx不支持~目录，所以需要用绝对路径/，如果不知道路径可以用：pwd，查看
# "/usr/local/Cellar/nginx/1.17.1/~/Desktop/js/index.html" is not found
access_log  /Users/yuccie/Desktop/js/nginx.log;
error_log   /Users/yuccie/Desktop/js/err.log;
location / {
  root   ~/Desktop/js/;
  index  index.html index.htm;
}
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

## rddis常用知识

**Redis 与其他 key - value 缓存产品有以下三个特点：**

- Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
- Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。
- Redis支持数据的备份，即master-slave模式的数据备份。

**Redis 优势：**

- 性能极高 – Redis能读的速度是110000次/s,写的速度是81000次/s 。
- 丰富的数据类型 – Redis支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。
- 原子 – Redis的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过MULTI和EXEC指令包起来。
- 丰富的特性 – Redis还支持 publish/subscribe, 通知, key 过期等等特性。

```bash
# 用homebrew安装后，提示如下：
# 多数情况下，安装的第三方包的配置文件都在 /usr/local/etc/ 下
To have launchd start redis now and restart at login:
  brew services start redis
Or, if you don't want/need a background service you can just run:
  redis-server /usr/local/etc/redis.conf
```

**启动与连接redis：**

```bash
# 启动redis
redis-server /usr/local/etc/redis.conf
# 或者
redis-server

# 新打开一个终端，查看 redis 是否启动？
redis-cli
# 以上命令会打开以下终端，127.0.0.1 是本机 IP ，6379 是 redis 服务端口。
redis 127.0.0.1:6379>
# 现在我们输入 PING 命令。会输出PONG，说明redis已经成功安装。
```

**redis常用命令：**

参考：https://www.runoob.com/redis/redis-tutorial.html

Redis是一个字典结构的存储服务器，而实际上一个Redis实例提供了多个用来存储数据的字典，客户端可以指定将数据存储在哪个字典中。这与我们熟知的在一个关系数据库实例中可以创建多个数据库类似，所以可以将其中的每个字典都理解成一个独立的数据库。

每个数据库对外都是一个从0开始的递增数字命名，Redis默认支持16个数据库，可以通过配置databases来修改这一数字。客户端与Redis建立连接后会自动选择0号数据库，不过可以随时使用SELECT命令更换数据库，如要选择1号数据库 `select 1`;

 然而这些以数字命名的数据库又与我们理解的数据库有所区别。首先Redis不支持自定义数据库的名字，每个数据库都以编号命名，开发者必须自己记录哪些数据库存储了哪些数据。另外Redis也不支持为每个数据库设置不同的访问密码，所以一个客户端要么可以访问全部数据库，要么连一个数据库也没有权限访问。最重要的一点是多个数据库之间并不是完全隔离的，比如FLUSHALL命令可以清空一个Redis实例中所有数据库中的数据。综上所述，这些数据库更像是一种命名空间，而不适宜存储不同应用程序的数据。比如可以使用0号数据库存储某个应用生产环境中的数据，使用1号数据库存储测试环境中的数据，但不适宜使用0号数据库存储A应用的数据而使用1号数据库B应用的数据，不同的应用应该使用不同的Redis实例存储数据。由于Redis非常轻量级，一个空Redis实例占用的内在只有1M左右，所以不用担心多个Redis实例会额外占用很多内存。

- 命令一般都是大写，但用小写也可以，建议都用大写。
- redis输入命令时，一般在控制台都有提示，很友好

```bash
# redis里面也有很多的db，可以切换
# 默认有16个（0-15），可以修改redis.conf下的databases数量
select index

# 1、通过 CONFIG 命令查看或设置配置项
CONFIG GET 配置项名字
# * 获取所有配置项
CONFIG GET *

# 1-1、可以通过修改 redis.conf 文件或使用 CONFIG set 命令来修改配置。
CONFIG SET 配置项名字 newValue

# 设置一个变量，并命名，在控制台输入时，会有命令的提示：
# set key value [expiration EX seconds|PX milliseconds] [NX|XX]
# 一个键最大能存储 512MB。
set testRedisNmae 'redis名字'
=> OK

# 获取设置的名字
get testRedisNmae
=> redis\xe5\x90\x8d\xe5\xad\x97

# 为了展示非编码格式的数据，可以采用
redis-cli --raw

# 删除设置的名字
e testRedisNmae
=> 1

# 2、Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。

# 2-1、String类型是二进制安全的。意思是 redis 的 string 可以包含任何数据。比如jpg图片或者序列化的对象。最大能存储 512MB。

# 2-2、Hash（哈希）
# 每个 hash 可以存储 2的32次方 -1 键值对（40多亿）。
redis 127.0.0.1:6379> HMSET runoob field1 "Hello" field2 "World"
"OK"
redis 127.0.0.1:6379> HGET runoob field1
"Hello"
redis 127.0.0.1:6379> HGET runoob field2
"World"

# 2-3、List (列表)
# Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。
# 列表最多可存储 2的32次方 -1元素 (4294967295, 每个列表可存储40多亿)。
redis 127.0.0.1:6379> lpush runoob redis
(integer) 1
redis 127.0.0.1:6379> lpush runoob mongodb
(integer) 2
redis 127.0.0.1:6379> lpush runoob rabitmq
(integer) 3
redis 127.0.0.1:6379> lrange runoob 0 10 # liange key start stop
1) "rabitmq"
2) "mongodb"
3) "redis"

# 2-3、Set(集合)
# Redis 的 Set 是 string 类型的无序集合。
# 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。

# sadd 命令
# 添加一个 string 元素到 key 对应的 set 集合中，成功返回 1，如果元素已经在集合中返回 0。
sadd mySet name1
1
sadd mySet name1
1
sadd mySet name1
1

# 即使插入两次，因为集合内元素的唯一性，第二次插入的name1将被忽略。
smemebers mySet
name
name1

# 2-4、zset(sorted set：有序集合)
# Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。
# 不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。

# zset的成员是唯一的,但分数(score)却可以重复。
# zadd 命令
# 添加元素到集合，元素在集合中存在则更新对应score
zadd key score member

redis 127.0.0.1:6379> zadd runoob 0 redis
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 mongodb
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabitmq
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabitmq
(integer) 0
redis 127.0.0.1:6379> > ZRANGEBYSCORE runoob 0 1000
1) "mongodb"
2) "rabitmq"
3) "redis"


# 3、Redis 命令用于在 redis 服务上执行操作。要在 redis 服务上执行命令需要一个 redis 客户端
# 启动redis客户端的命令：
redis-cli

# 3-1、连接远程redis服务
# 如何设置账户和密码？
redis-cli -h host -p port -a password

```

## mysql常用知识

在了解mysql之前，我们需要知道为何会产生数据库，

首先要知道，NoSQL是Not Only SQL，不仅仅是sql的意思，主要呈现的方式是键值对，类似js中的对象。而mysql则是相应的表。

用brew安装完mysql，一般会有如下提示：大意是安装的数据库没有密码，如果想安全的运行，其实就是设置密码等，可以运行mysql_secure_installation

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
==> **Summary**
🍺  /usr/local/Cellar/mysql/8.0.16: 275 files, 269.8MB
```

运行mysql_secure_installation会执行几个设置：

1. 为root用户设置密码
2. 删除匿名账号
3. 取消root用户远程登录
4. 删除test库和对test库的访问权限
5. 刷新授权表使修改生效

然后是mysql默认只允许localhost的连接。

连接数据库，用mysql -u root，因为刚开始是没有密码的

后台运行mysql的话，可以brew services start mysql

配置文件的话，一般路径在`/usr/local/etc/my.cnf`里。若想修改可以编辑该文件


***登录mysql***

```bash
# mysqladmin 工具来获取服务器状态
mysqladmin --version
=> mysqladmin  Ver 8.0.16 for osx10.14 on x86_64 (Homebrew)

# 启动mysql服务
mysqld
# 关闭mysql服务，如果没有命令，只能查进程号，然后杀进程

# 新建一个终端，第一次安装时，没有密码，可以直接登录
mysql -u root

# Mysql安装成功后，默认的root用户密码为空，你可以使用以下命令来创建root用户的密码：
mysqladmin -u root password 'new_password'
# 会提示如下，但是此时已经设置密码成功了，再用mysql -u root就登陆不上了。
# mysqladmin: [Warning] Using a password on the command line interface can be insecure.

# 当配置完密码后，就需要如下
# 连接mysql，输入以下命令后，需要输入数据库的连接密码
mysql -u root -p

mysql -h 主机名 -u 用户名 -p <数据库名>
# -h : 指定客户端所要登录的 MySQL 主机名, 登录本机(localhost 或 127.0.0.1)该参数可以省略;
# -u : 登录的用户名;
# -p : 告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。
# 如果要在-p选项后的 line 命令上提供密码，则必须在没有中间空格的情况下提供密码(对于 example，如-ppassword，而不是-p password)。但是，不建议将密码放在命令 line 上，因为这样做会使其暴露给在您的计算机上登录的其他用户。

# 如果直接运行mysql，一般会产生如下格式提示：
ERROR 1045 (28000): Access denied for user 'mac'@'localhost' (using password: NO)

# 查询版本号和当前日期
SELECT VERSION(), CURRENT_DATE;
# 执行mysql命令，会展示查询花了多长时间，它给你提供服务器性能的一个大致概念。因为他们表示时钟时间(不是 CPU 或机器时间)，并且因为他们受到诸如服务器负载和网络延时的影响，因此这些值是不精确的。
# 可以把mysql当做一个简单的计数器，但需要select 开头，如下会得到25
select (4+1)*5;
# 查询用户及当前时间
select user(), current_date;


# 断开mysql连接
mysql＞ quit
# 或者
mysql> exit
```

- MySQL 的SQL语句以分号 (;) 作为结束标识。
- sql语句大小写都行，但一般为大写

```bash
# MySQL 用户设置，只需要在 mysql 数据库中的 user 表添加新用户即可。

# 1、创建数据库，如果有重复的数据库，会提示database exists
create database <数据库名>;
# 1-1、通过mysqladmin创建
mysqladmin -u root -p create <数据库名>

# 2、删除数据库，如果有重复的数据库，会提示database exists
drop database <数据库名>;
# 1-1、通过mysqladmin创建
mysqladmin -u root -p drop <数据库名>

# 3、切换数据库，
mysql> use monitor;
Database changed
# 3-1、查看当前是哪个数据库
mysql> select database();

# 3-1、列出 MySQL 数据库管理系统的数据库列表。
mysql> SHOW DATABASES;

# 4、数据类型
# 三类：数值、日期/时间和字符串(字符)类型。

# 5、创建表，通用语法如下
CREATE TABLE table_name (column_name column_type);
# table_name 为表名，需要用反引号包裹：``
# column_name 为表字段名，需要用反引号包裹：``
# column_type 为如何定义每个表字段，什么数据类型，值，排序等配置等

CREATE TABLE IF NOT EXISTS `runoob_tbl`(
  `runoob_id` INT UNSIGNED AUTO_INCREMENT,
  `runoob_title` VARCHAR(100) NOT NULL,
  `runoob_author` VARCHAR(40) NOT NULL,
  `submission_date` DATE,
  PRIMARY KEY ( `runoob_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 如果你不想字段为 NULL 可以设置字段的属性为 NOT NULL， 在操作数据库时如果输入该字段的数据为NULL ，就会报错。
# AUTO_INCREMENT定义列为自增的属性，一般用于主键，数值会自动加1。
# PRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。
# ENGINE 设置存储引擎，CHARSET 设置编码。

# 5-1、命令行模式创建表
上面方式需要一次写完，可能不太方便，其实还可以命令行模式，其实就是一行一行输入：

CREATE TABLE runoob_tbl(
  -> runoob_id INT NOT NULL AUTO_INCREMENT,
  -> runoob_title VARCHAR(100) NOT NULL,
  -> runoob_author VARCHAR(40) NOT NULL,
  -> submission_date DATE,
  -> PRIMARY KEY ( runoob_id )
  -> )ENGINE=InnoDB DEFAULT CHARSET=utf8;

注意：MySQL命令终止符为分号 ; 。
注意： -> 是换行符标识，不要复制，只需在后面输入命令即可。

# 5-2、查看创建表里的字段，其实就是看看表里有哪些字段，字段的属性啥的。
desc runoob_tbl;

# 6、删除表
drop table runoob_tbl;

# 7、插入数据，之前是创建表时插入数据，怎么向已有表插入数据呢？
INSERT INTO table_name ( field1, field2,...fieldN )
                      VALUES
                      ( value1, value2,...valueN );
insert into runoob_tbl (date) values (now());
# now()是mysql里获取日期的方法，不支持js的方法，mongodb支持。
# 如果数据是字符型，必须使用单引号或者双引号，如："value"。
# 7-1、插入数据后，如何查看具体的数据？
select * from runoob_tbl;

# 8、查询数据，语法如下：
SELECT column_name,column_name FROM table_name,table_name [WHERE Clause] [LIMIT N][ OFFSET M]
# 查询语句中你可以使用一个或者多个表，表之间使用逗号(,)分割，并使用WHERE语句来设定查询条件。
# SELECT 命令可以读取一条或者多条记录。
# 你可以使用星号（*）来代替其他字段，表示“所有列”
# 你可以使用 WHERE 语句来包含任何条件。
# 你可以使用 LIMIT 属性来设定返回的记录数。
# 你可以通过OFFSET指定SELECT语句开始查询的数据偏移量。默认情况下偏移量为0。

# 我们执行完 SELECT 语句后，释放游标内存是一个很好的习惯。？

# 9、where语句，表示哪些条件
SELECT field1, field2 FROM table_name1, table_name2 [WHERE condition1 [AND [OR]] condition2;
select * from runoob_tbl where id=1;

# 9-1、where语句在匹配字符串时，默认是不区分字母大小写，如果想区分，可以用binary如下
select * from runoob_tbl where binary title="Test";

# where：数据库中常用的是where关键字，用于在初始表中筛选查询。它是一个约束声明，用于约束数据，在返回结果集之前起作用。条件中String类型通常是 不区分大小写的(case-insensitive)
# group by:对select查询出来的结果集按照某个字段或者表达式进行分组，获得一组组的集合，然后从每组中取出一个指定字段或者表达式的值。
# having：用于对where和group by查询出来的分组经行过滤，查出满足条件的分组结果。它是一个过滤声明，是在查询返回结果集以后对查询结果进行的过滤操作。
# 执行顺序： select –>where –> group by–> having–>order by

# 10、update更新
UPDATE table_name SET field1=new-value1, field2=new-value2 [WHERE Clause];

# 11、删除某条记录
DELETE FROM table_name [WHERE Clause]

# 12、like子句，其实就是通配符，比如在正则里*号，而like里是使用 % 号表示任意字符。
SELECT field1,field2 FROM table_name WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue';
# 比如，找出所有runoob_author字段里包含COM的数据。
SELECT * from runoob_tbl  WHERE runoob_author LIKE '%COM';

# 13、UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中，
# 其实相当于将不同数据库表里的数据，搜集到一块去。但是UNION 只会选取不同的值。请使用 UNION ALL 来选取重复的值！
# 如下从两个表里查出所有含有country字段的数据，如果country有重复的值，只会出现一次。
SELECT country FROM Websites
UNION
SELECT country FROM apps
ORDER BY country;

# 14、排序，
SELECT field1, field2 FROM table_name1, table_name2
ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]];
# ASC 升序，DESC 降序
SELECT * from runoob_tbl ORDER BY submission_date ASC;
# 与所有其他比较操作一样，排序通常以不区分大小写 (case-insensitive) 方式执行
# 可以使用BINARY强制对列进行 区分大小写的(case-sensitive)排序
SELECT * from runoob_tbl ORDER BY BINARY submission_date ASC;

# 15、group by语句，可以对数据进行分组，比如100条数据里，A出现了多少次。
# function是sql函数（count,sum,avg等），参数就是列名或者*号
# operator是运算符，比如like，= 等
SELECT column_name, function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name;

# 如下，是使用 GROUP BY 语句 将数据表按名字进行分组，并统计每个人有多少条记录：
SELECT name, COUNT(*) FROM employee_tbl GROUP BY name;
# 其实这里COUNT(*) 既作为查出来的数据的字段，同时函数 COUNT(*) 的结果还是对应的值。
# 如果想自定义字段，可以用as，如下：
select name, count(*) as new_count from employee_tbl group by name;

# 上方虽然分组是按name，但函数里的参数*代表的就是 name，而不是其他列名，即使改为其他列名也不会生效。
# 如果分组想用name，但统计又想用其他字段，可以用WITH ROLLUP
SELECT name, SUM(singin) as singin_count FROM employee_tbl GROUP BY name WITH ROLLUP;
# 查出来的数据中，其中记录 NULL 表示所有人的登录次数。
# 如果不想显示null，可以用 coalesce(a,b,c) 函数，如果a==null,则选择b；如果b==null,则选择c；如果a!=null,则选择a；如果a b c 都为null ，则返回为null（没意义）。
SELECT coalesce(name, '总数'), SUM(singin) as singin_count FROM  employee_tbl GROUP BY name WITH ROLLUP;


# 16、连表处理，其实就是如何连接不同的表，然后处理交并补集的数据而已。
# 比如A表里的a，在表B里出现了几次等，大致分三类：
# INNER JOIN（内连接,或等值连接）：获取两个表中字段匹配关系的记录。
# LEFT JOIN（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。
# RIGHT JOIN（右连接）： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。
# 参考：https://www.runoob.com/mysql/mysql-join.html

# 17、处理null值，
# IS NULL: 当列的值是 NULL,此运算符返回 true。
# IS NOT NULL: 当列的值不为 NULL, 运算符返回 true。
# <=>: 比较操作符（不同于 = 运算符），当比较的的两个值相等或者都为 NULL 时返回 true。

# 18、正则表达式，sql语句里可以用LIKE ...% 来进行模糊匹配，也可以使用正则
# 参考：https://www.runoob.com/mysql/mysql-regexp.html

# 19、MySQL 事务
# MySQL 事务主要用于处理操作量大，复杂度高的数据。比如说，在人员管理系统中，你删除一个人员，你既需要删除人员的基本资料，
# 也要删除和该人员相关的信息，如信箱，文章等等，这样，这些数据库操作语句就构成一个事务！
# 1、在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。
# 2、事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。
# 3、事务用来管理 insert,update,delete 语句

# 一般来说，事务是必须满足4个条件（ACID）：：原子性（Atomicity，或称不可分割性）、一致性（Consistency）、隔离性（Isolation，又称独立性）、持久性（Durability）。

# 原子性：一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。
# 一致性：在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。
# 隔离性：数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。
# 持久性：事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

# 在 MySQL 命令行的默认设置下，事务都是自动提交的，即执行 SQL 语句后就会马上执行 COMMIT 操作。因此要显式地开启一个事务务须使用命令 BEGIN 或 START TRANSACTION，或者执行命令 SET AUTOCOMMIT=0，用来禁止使用当前会话的自动提交。

# 其实事务，可以理解为将一系列操作包装一下，然后整体执行而已。
# 参考：https://www.runoob.com/mysql/mysql-transaction.html

# 19、ALTER命令，改数据表名或者修改数据表字段时，就需要使用到MySQL ALTER命令。
# 19-1，删除表runoob_tbl里 i 字段
 ALTER TABLE runoob_tbl DROP i;
# 19-2，添加表 i 字段，并定义数据类型，会自动添加到数据表字段的末尾。
 ALTER TABLE runoob_tbl ADD i INT;
# 19-2，添加表 i 字段，并定义数据类型(必须定义)，会自动添加到数据表字段的末尾。
 ALTER TABLE runoob_tbl ADD i INT;
# 19-3，添加表 i 字段，并定义数据类型，并指定新增字段的位置。
# FIRST (设定位第一列)， AFTER 字段名（设定位于某个字段之后）
ALTER TABLE runoob_tbl ADD i INT FIRST; # 设定第一列
ALTER TABLE runoob_tbl ADD i INT AFTER c; # 放在c字段之后

# 19-4，修改数据类型。使用MODIFY 或 CHANGE 子句 。
ALTER TABLE runoob_tbl MODIFY c CHAR(10);
# 使用 CHANGE 子句, 语法有很大的不同。 在 CHANGE 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型
ALTER TABLE runoob_tbl CHANGE i j BIGINT;

# 19-5，默认值，指定是否包含值或者是否设置默认值。
# 指定字段 j 为 NOT NULL 且默认值为100 。
ALTER TABLE runoob_tbl MODIFY j BIGINT NOT NULL DEFAULT 100;
# 如果你不设置默认值，MySQL会自动设置该字段默认为 NULL。

# 19-6，修改字段默认值
ALTER TABLE runoob_tbl ALTER i SET DEFAULT 1000;
#  ALTER 命令及 DROP子句来删除字段的默认值
ALTER TABLE runoob_tbl ALTER i DROP DEFAULT;

# 19-7，修改表名
ALTER TABLE runoob_tbl RENAME TO alter_tbl;

# 20，索引
# 参考：https://www.runoob.com/mysql/mysql-index.html

# 显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息。
# 注意 COLUMNS 就是对的，不用再改为其他具体的列字段。
mysql> SHOW COLUMNS FROM runoob_tbl;

# 显示数据表的详细索引信息，包括PRIMARY KEY（主键）。
mysql> SHOW INDEX FROM runoob_tbl;

# 输出Mysql数据库管理系统的性能及统计信息。
mysql> SHOW TABLE STATUS  FROM RUNOOB;   # 显示数据库 RUNOOB 中所有表的信息
mysql> SHOW TABLE STATUS from RUNOOB LIKE 'runoob%';     # 表名以runoob开头的表的信息
mysql> SHOW TABLE STATUS from RUNOOB LIKE 'runoob%'\G;   # 加上 \G，查询结果按列打印
```

参考：[设置密码强度][reSetMysqlPWPolicyUrl]
参考：[找到mysql默认的配置文件][findMysqlConfFileUrl]
参考：[mysql没有默认的配置文件，需要自己建][findMysqlConfFileUrl1]

### mysql、redis、mongodb对比

文档

**一、mongodb：**

- 它是一个内存数据库，数据都是放在内存里面的。
- 对数据的操作大部分都在内存中，但mongodb并不是单纯的内存数据库。

**mongodb持久化方式：**

mongodb的所有数据实际上是存放在硬盘的，所有要操作的数据通过mmap的方式映射到内存某个区域内。然后，mongodb就在这块区域里面进行数据修改，避免了零碎的硬盘操作。至于mmap上的内容flush到硬盘就是操作系统的事情了，所以，如果，mongodb在内存中修改了数据后，mmap数据flush到硬盘之前，系统宕机了，数据就会丢失。

mmap详解链接：http://www.cnblogs.com/techdoc/archive/2010/12/22/1913521.html

**二、redis：**

它就是一个不折不扣的内存数据库了。

**redis持久化方式：**
redis所有数据都是放在内存中的，持久化是使用RDB方式或者aof方式。

解密redis持久化：http://blog.nosqlfan.com/html/3813.html

**三、mysql**：

无论数据还是索引都存放在硬盘中。到要使用的时候才交换到内存中。能够处理远超过内存总量的数据。

- Redis是完全在内存中保存数据的数据库，使用磁盘只是为了持久性目的,Redis数据全部存在内存，定期写入磁盘，当内存不够时，可以选择指定的LRU算法删除数据,持久化是使用RDB方式或者aof方式。
- mongodb是文档型的非关系型数据库，MongoDB更类似MySQL，支持字段索引、游标操作，其优势在于查询功能比较强大，擅长查询JSON数据，能存储海量数据，但是不支持事务。
- Redis 事务支持比较弱，只能保证事务中的每个操作连续执行，mongodb不支持事务
- MongoDB 内置了数据分析的功能(mapreduce),Redis不支持
- Redis只能使用单线程，性能受限于CPU性能

参考：https://www.cnblogs.com/klb561/p/9085772.html

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

egg基于koa，在koa中是：ctx.body = 'msg'，而在egg中是：this.ctx.body = 'msg'，打印下this，其实可以看出，ctx，app，config等都挂在上面。从 **Koa 继承而来的 4 个对象**（Application, Context, Request, Response) 以及框架扩展的一些对象（Controller, Service, Helper, Config, Logger)

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

在egg里，处理数据相关的逻辑、或者逻辑比较复杂、共用的一些逻辑一般都放在service里，使用的时候依然是this.service.home.getList()，这样egg便会自动去app/service/home.js文件里找getList方法了，但**务必注意这些方法是异步，因此获取值时需要await**.

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

比如想扩展Application，则需要在extend目录里增加 application.js文件，比如增加foo方法，然后使用的时候就可以直接：this.app.foo()即可。其实原理就是：框架会把 app/extend/application.js 中定义的对象与 Koa Application 的 prototype 对象进行合并，在应用启动时会基于扩展后的 prototype 生成 app 对象。而app对象又挂在this上。

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

但如果想增加一个工具函数，一般都在 helper 对象上扩展。扩展方法如上：
1. 在extend目录里增加 helper.js 文件
2. 定义格式化方法，比如formatDate，当然也可以安装第三方时间库进行格式化
3. 使用时，在模板里直接以js语法使用即可，helper.formatDate(date)

**注意**：正常的时间戳位数是13位，如果碰到10位，不要忘了乘以1000，因为有的工具无法识别。


### egg之中间件

在vue项目中，一般在全局拦截器里做一些关于权限的逻辑，这些逻辑可以抽象成一个中间件，比如就是校验权限的中间件。

中间件，一般是在匹配路由之前和之后做的逻辑。

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

// 当然参数app的话，其实就是Application的实例
```

综上可以得出：
1. 中间件可以是全局的（后面还可以设置局部的），可以做一些全局拦截操作，比如权限，比如访问ip白名单
2. 中间件的功能比较单一，因此一个中间件应该也只有一个方法

```js
// 例子：实现一个访问ip白名单的中间件。

// 思路:
// 1. 如何获取访问者的ip？
// 2. ip白名单哪里来？
// 3. 校验规则

// app/middleware/forbidIp.js
module.exports = (opts, app) => {
  return async function main(ctx, next) {
    // 要屏蔽的ip
    const ips = '127.0.0.1'

    // 访问者的ip
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

而路由匹配，一般可以指定请求方式，比如
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
    // 其实就是将后台生成的随机字符串渲染到页面
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

// 当然还可以直接通过action来实现，其实就是通过指定方式，把csrf token传给后台
// 比如：action="/add?_csrf=<%=csrf%>"
```

但上面的方式，是需要给每个页面都加csrf，如果有多个页面岂不是很蛋疼。。。所以中间件的全局性就可以用上了。
```js
// app/middleware/forCsrf.js
module.exports = (opts, app) => {
  return async function main(ctx, next) {
    // 这样就把随机字符串挂到全局了？其实就是都执行中间件的缘故
    // 然后页面就可以直接拿到csrf了，不需要控制器再传csrf了
    ctx.state.csrf = ctx.csrf;
    await next();
  }
}
// 当然，使用之前，还需要注册中间件
```

然后正常提交后，就可以在add控制器里获取到提交的内容了，
```js
// 处理表单post请求提交的控制器
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
- 默认情况下，浏览器退出后（**注意是浏览器退出进程后**）cookie就会自动销毁

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
    enable: true,       // 开启，就不需要在middleware配置了
    match: '/static',   // 只有符合哪些规则的请求会经过中间件
    ignore: '/static',  // 符合哪些规则的请求不经过中间件
  },
};

// 当然match，ignore不但可以是字符串，还可以是正则，函数等。比如：
match(ctx) {
  // 只有 ios 设备才开启
  const reg = /iphone|ipad|ipod/i;
  return reg.test(ctx.get('user-agent'));
},
```

当然上面这种方式，更加普实一些，既没有全局的那样大范围，也没有单个引入的繁琐，只需配置规则即可。

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
'user.fetch'              // 可以简写为字符串形式
```

上面匹配路由的方式，需要明确的指定哪些路由匹配哪些控制器，还有一种方式，就是 restfull 风格的定义方式，可以快速的生成一组 CRUD 风格的路由及对应的控制器。

```js
// 语法
app.resources('routerName', 'pathMatch', controller)

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

  // 如果校验报错，会抛出异常???
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

无非就是遵循一定的编写规范，然后通过一些配置项，定时的去执行一些逻辑。

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
- 这里比较麻烦的点是解析返回的数据

### Mongodb4.x

#### 安装方式

安装软件有几种方式：

- 官方安装包
- 下载源文件
- mac终端软件管理器 homebrew

```bash
# homebrew基本使用

# 搜索包
brew search mongodb

# 安装包
brew install mongodb

# brew -h
```

#### Mongodb4.x之基本配置

数据库默认会有一个数据存储目录，而Mongodb的默认目录为： /data/db，当然如果不是的话，可以重新设定：mongod --dbpath=/data/db

```bash
# 如果没有 /data/db 目录，启动mondod会报如下错误
# Data directory /data/db not found

# 创建了目录还有可能有写入权限问题，如下
# Attempted to create a lock file on a read-only directory: /data/db
# 可以使用，下面命令，递归将这个文件夹下的所有权限改为当前用户，以后就不用sudo了。
sudo chown -R $(whoami) /data
```

另外要清楚，**数据库服务分两部分：服务部分、客户端部分**。其实可以理解平时项目的前端和后端，要想看到整个服务的效果，需要后端服务起来，同时前端访问。。。数据库也是同理。

一般homebrew安装的软件，都会自动配置好环境变量，这样便可全局执行：mongod，但如果环境变量未能正确配置，则还可以直接找到安装包的位置进行启动。

```bash
# 当然下面的命令都是找出当前系统正在运行的进程，如果nginx服务并没有起来是找不到的
# 列出所有进程中关于nginx的，
ps aux | grep nginx
# 同理列出所有进程关于mongod的
ps aux | grep mongod

# which指令会在环境变量$PATH设置的目录里查找符合条件的文件。
# 当然如果没有配置环境变量，则也是获取不到的
which nginx
=> /usr/local/bin/nginx

# 可以用whereis查找
whereis nginx

# 如果都不行，可以用find
find / -name nginx
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
# 1.1、查看数据库，一个数据库里可以有多个表
show dbs

# 2、创建超级管理员，先切换，再创建
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
# 连接远程数据库
mongo 远程IP地址:端口号/仓库 -u 用户名 -p 密码

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

参考：https://blog.csdn.net/MCpang/article/details/7714744

SQL | NoSql
-|-
表格 | 集合
行 | 文档
列 | 字段
表联合 | 嵌入文档
主键 | 主键 (MongoDB 提供了 key 为 _id )

**其实，在NoSql中，文档其实就相当于一条数据，对应着Sql里的一行（也就是一条记录）。然后一个集合里可以有多个文档，就像一个表格里可以有多行。而多个集合就构成了数据库。**

关系型数据库，在安装数据库的时候数据库实例创建，同时存在系统默认的管理员用户。之后可以创建多个用户并进行赋权，创建的表存在于不同的用户之下，不同的用户存储着不同的数据。mongodb以文档的形式保存在集合中，可以同一数据库存储不同的数据或者集合。

mongodb服务器可以存在多应用或者用户的数据，可以相互独立。数据的命名规则：

- 不能使空字符串（""）
- 不得含有''（空格）、.、$、/、|和\0（空字符）
- 应全部小写
- 最多64字节

保留数据库名：admin、local、config

mongoose数据库基本操作：
参考：https://www.runoob.com/mongodb/mongodb-create-database.html

```js
// 1、创建数据库
// 如果数据库不存在，则创建数据库，否则切换到指定数据库。
use monitor
=> switched to db monitor

// 将该数据库的连接赋值给全局变量db，因此 db 可以理解为指向数据库monitor的指针
db
=> monitor

// 此时如果直接：show dbs 查看数据库，其实并没有monitor，只需插入一条数据即可
// 注意，其实此时，相当于在 monitor 数据库下又增加了一个 monitor 集合，
// 为了防止干扰，可以在其他集合里添加数据
db.monitor.insert({desc: '数据库下面可以有同样名字的集合'})

// 1-1、切换数据库
// 切换数据库，是用 use，而集合之间无需切换，因为可以直接：db.集合名

// 1-2、删除数据库
// 删除前，务必要切换到指定的数据库，db 查看是否为要删除的数据库
db.dropDatabase()
=> { "dropped" : "monitor", "ok" : 1 }

// 1-3、查看数据库
show dbs

// 2、创建集合
// db.createCollection(name, options)
db.createCollection('errdb')
=> { "ok" : 1 } // 不像数据库，这里即使是空的集合，show collections查看集合时也会显示

// 2-1、创建集合
// 在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合。如下，至少传一个空对象
db.errdb.insert({})

// 2-2、查看集合
show collectios
// or
show tables

// 2-3、删除集合，这里的删除不但删除了集合里的数据，而且集合也删除了
db.集合名.drop()

// 3、插入文档
// MongoDB 使用 insert() 或 save() 方法向集合中插入文档，语法如下：
// 如果该集合不在该数据库中， MongoDB 会自动创建该集合并插入文档。
// db.COLLECTION_NAME.insert(document)，比如在errdb集合中，插入一条空对象
db.errdb.insert({})
=> WriteResult({ "nInserted" : 1 })
// 或者
db.errdb.save({test: '这是用save插入的'})
=> WriteResult({ "nInserted" : 1 })

// 3-1、save不但可以插入文档，还可以更新指定的文档
// 注意：插入文档时 db.col.save(document) 命令。如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。注意这里需要：ObjectId(_id)
db.errdb1.save({_id: ObjectId('5eb8fe6bc9d8726e8eb83fea'), a: '33'})
=> WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

// 3-2、查看已经插入的文档
db.COLLECTION_NAME.find()
```

```bash
# 4、更新文档
# update() 方法用于更新已存在的文档。语法格式如下：
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
# query : update的查询条件，类似sql update查询内where后面的。
# update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
# upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
# multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
# writeConcern :可选，抛出异常的级别。

>db.col.insert({
  title: 'MongoDB 教程', 
  description: 'MongoDB 是一个 Nosql 数据库',
  by: '菜鸟教程',
  url: 'http://www.runoob.com',
  tags: ['mongodb', 'database', 'NoSQL'],
  likes: 100
})

>db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })   # 输出信息

> db.col.find().pretty()
{
  "_id" : ObjectId("56064f89ade2f21f36b03136"),
  "title" : "MongoDB",
  "description" : "MongoDB 是一个 Nosql 数据库",
  "by" : "菜鸟教程",
  "url" : "http://www.runoob.com",
  "tags" : [
    "mongodb",
    "database",
    "NoSQL"
  ],
  "likes" : 100
}

# 以上语句只会修改第一条发现的文档，如果你要修改多条相同的文档，则需要设置 multi 参数为 true。
>db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},{multi:true})

# 4-1、更新文档
# 当然 save 也可以直接更新，也就没有那么多选项，因为 ObjectId(id) 是唯一的

# 5、删除文档，语法如下
db.collection.remove(
  <query>,
  {
    justOne: <boolean>,
    writeConcern: <document>
  }
)
# query 是必须项，
# justOne : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
# writeConcern :（可选）抛出异常的级别。

# 5-1、全部移除指定项
# 下面两种效果一样，都是全部移除匹配的项
db.errdb1.remove({a:'33'}, {justOne: false})
db.errdb1.remove({a:'33'})

# 5-2、移除所有项
db.errdb1.remove({})

# 6、查询文档，但是是以非结构化的方式来显示所有文档。因此不易读，语法如下：
db.collection.find(query, projection)
# query ：可选，使用查询操作符指定查询条件
# projection ：可选，返回的数据里是否含有指定的字段。查询时返回文档中所有键值，只需省略该参数即可（默认省略）。
# { field1: <value>, field2: <value> ... }
# value，可以是：1 or true是含有，0或false表示不含，如下示例
db.errdb1.find({},{a:0})
# { "_id" : ObjectId("5eb909adc9d8726e8eb83ff0") }

db.errdb1.find({},{a:1})
# { "_id" : ObjectId("5eb909adc9d8726e8eb83ff0"), "a" : "33" }

# 6-1、想通过结构化的形式展示数据，可以如下
db.errdb1.find().pretty()

# 6-2、有时候想 and 或者 or 来查找，其实就是交并补集方式
db.errdb1.find({$or: [{a: '33'}, {b: '44'}]}) # 其实就是a为33和b为44的合集

db.errdb1.find({c: '55', $or: [{a: '33'}, {b: '44'}]}) # 其实就是c必须为55，然后必须有a或者b
# 类似sql中 where c = '55' AND (a = '33' OR b = '44')

# 7、条件操作符、$type操作符，无非是根据数据大小或者类型来过滤

# 8、分页 Limit，
>db.COLLECTION_NAME.find().limit(NUMBER)

# 8-1、Skip，不能每次都取前多多少项，还需要跳过之前的项，也就实现了分页
>db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)

# 9、sort排序
# sort() 方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于降序排列。
>db.COLLECTION_NAME.find().sort({KEY:1})

# 10、索引
# 索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。
# 索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构
>db.COLLECTION_NAME.createIndex(keys, options)

>db.COLLECTION_NAME.createIndex({open: 1, close: 1}, {background: true})

# 建好索引之后，如何使用？其实一个集合里搜集了数据之后，再增加索引即可，然后搜索时，就可用对应字段进行查找
# 比如，创建key为 item，stock，且升序的索引，
db.products.createIndex( { "item": 1, "stock": 1 } )

# 这个 index 引用的 document 首先会根据 item 排序，然后在 每个 item 中，又会根据 stock 排序，
# 以下语句都满足该索引：
db.products.find( { item: "Banana" } )
db.products.find( { item: "Banana", stock: { $gt: 5 } } )

# 1、查看集合索引
db.col.getIndexes()

# 2、查看集合索引大小
db.col.totalIndexSize()

# 3、删除集合所有索引
db.col.dropIndexes()

# 4、删除集合指定索引
db.col.dropIndex("索引名称")

参考：https://www.runoob.com/mongodb/mongodb-indexing.html

# 11、聚合

```


创建一个新的集合，并插入一个文档，在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合。

```bash
# 下面便可以创建一个egg的数据库
db.egg.insert({ type: 'eggDb' })
# show dbs，就可以看到egg数据库

# 给egg这个数据库增加用户，必须切换到这个集合上，相当于给这个集合添加用户
db.createUser(
  {
    user: "eggOwner", 
    pwd: "123456", 
    roles: [ { role: "dbOwner", db: "egg" } ] 
  }
)

# 连接egg这个数据库，登陆时直接登录指定的集合
mongo egg -u eggOwner -p 123456

# 查看数据库
show dbs # 只会看到egg数据库
# 但为何我 我先直接 mongo 后，可以看到所有的数据库？
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

#### 数据库的基本操作

在开始使用之前，需要补充有关数据库的基本操作：

新建、查看、删除数据库，插入、查看、删除文档、
```bash
# 新建数据库（还是新建集合呢?）
use 数据库名 # 不存在则新建，存在则切换

# 查看当前的数据库,
db

# 查看集合下的文档，而不是数据库
db.表.find() # 若集合为空则什么都不会输出

# 在当前的表/文档中插入文档
db.表名.insert({ text: 'testMsg' })

# 再次查看集合，应该看到：'testMsg'，和其他的一些信息
db.表名.find()
=> { "_id" : ObjectId("5e528fdd3975d37cc58fba4c"), "text" : "testMsg" }

# 这是删除当前所在的数据库
db.dropDatabase()
=> { "dropped" : "数据库名", "ok" : 1 }

# 删除数据库中具体的集合
db.表名.drop()
=> true

# 全部删除集合中数据
db.表名.remove({})
=> WriteResult({ "nRemoved" : 1 })

# 查看一个数据库里有多少表/文档，如果用上面方式删除，再查看就会少一个表
show collections
```

mongoDB其实是基于js的，也就是说，在mongo语句里，不但支持正常的语句，还支持js表达式

```bash
# 插入日期
db.egg.insert({ curDate: 2020-03-08 }) 
# 数据库里插入的是：curDate: 2009，因为2020-03-08没有引号，按表达式执行了

# 如下还可以插入一些js
db.egg.insert({ curDate: new Date() }) 
=> { "_id" : ObjectId("xxx"), "curDate" : ISODate("2020-03-08T15:15:13.647Z") }

db.egg.insert({ randomNum: Math.random() }) 
=> { "_id" : ObjectId("xxx"), "randomNum" : 0.8126414322847024 }
```

另外，我们熟悉json，其实还有bson，BSON是一种类json的一种二进制形式的存储格式，简称Binary JSON，它和JSON一样，支持内嵌的文档对象和数组对象，但是BSON有JSON没有的一些数据类型，如Date和BinData类型。BSON可以做为网络数据交换的一种存储形式，优点是灵活性高，但它的缺点是空间利用率不是很理想，

{"hello":"world"} 这是一个BSON的例子，其中"hello"是key name，它一般是cstring类型，字节表示是cstring::= (byte*) "/x00" ,其中*表示零个或多个byte字��，/x00表示结束符;后面的"world"是value值，它的类型一般是string,double,array,binarydata等类型。

MongoDB使用了BSON这种结构来存储数据和网络数据交换，当然也还是支持json的。

#### 关系型数据库表（集合）与表（集合）的关系

在关系型数据库中，表与表之间一般有三种关系：

- 一对一关系
- 一对多关系
- 多对多关系

一对一情形：一个人对应一个身份证号

一对多情形：一个商品可以对应商品价格，商品名称，商品产地等多个信息，还有一个订单信息对应多个具体订单详情，一个班级对应多个学生，但一个学生只属于一个班级。

多对多情形：一个商品可以被多个人收藏，而一个人同时又可以收藏多个商品，还比如一个学生可以学多门课程，每门课程又可以被多个学生学习。

对于多对多学生学习的情况，如何在数据库中存储呢？首先肯定需要两个表，一个表存储学生名单、一个表存储课程。然后还需要一个中间表或临时表，存储学生和所学课程的对应关系。。。比如从学生名单选一个学生，然后从中间表里查找该学生选了哪些课程，然后根据这些课程名再去课程表里获取具体课程的信息。


#### Mongodb中的聚合管道

我们经常利用map来操作数组，操作完之后返回一个新的数组，其实在数据库中，使用聚合管道可以对集合中的文档进行变换和组合，进而起到：表关联查询、数据的统计的作用。

其实说白了，就是Mongodb的语句，用来操作数据库。 对比如下：

SQL | Nosql 
-|-|
WHERE | $match
GROUP BY | $group
HAVING | $match
SELECT | $project 
ORDER BY | $sort
LIMIT | $limit
SUM() | $sum
COUNT() | $sum
join | $lookup

- $project ，用来筛选哪些字段才展示。
- $match ，过滤文档，用法类似于 find() 方法中的参数。
- $group，主要用来对文档进行分组，
- $sort，用来排序
- $limit，用来分页
- $skip，跳过几条数据
- $lookup 表关联查询，

但这个语句又分为：管道操作符 + 管道表达式

- 管道操作符，对应的就是上面表格的命令
- 管道表达式，对应就是命令后面的语句

例如{$match:{status:"A"}}，$match称为管道操作符，而status:"A"称为管道表达式，是管道操作符的操作数(Operand)。

**注意：**：
- 每个管道表达式是一个文档结构，它是由字段名、字段值、和一些表达式操作符组成的。
- 数据库下划线命名方式，只是一种规范，一种多数人和很久就沿袭下来的规范。


例子：
```bash
# 1、连接数据库，并切换至 egg 数据库，创建两个表
# 2、首先在order表里创建如下数据：
db.order.insert({"order_id":"1","uid":10,"trade_no":"111","all_price":100,"all_num":2})
db.order.insert({"order_id":"2","uid":7,"trade_no":"222","all_price":90,"all_num":2})
db.order.insert({"order_id":"3","uid":9,"trade_no":"333","all_price":20,"all_num":6})

# 3、再创建 order_item 表，并插入如下数据：
# 这些语句可以一下子输入，还可以单个输入。只是单个输入成功后，会提示：WriteResult({ "nInserted" : 1 })
db.order_item.insert({"order_id": "1", "title": "商品鼠标1", "price": 50, num: 1})
db.order_item.insert({"order_id": "2", "title": "牛奶", "price": 150, num: 2})
db.order_item.insert({"order_id": "2", "title": "面包", "price": 150, num: 2})
db.order_item.insert({"order_id": "3", "title": "薯条", "price": 200, num: 3})

# 上面的order和order_item其实就是一对多的关系，比如订单为2的表，对应order_item表中的两条数据：牛奶、面包
# 在order_item中查找(find()里传入参数，即可实现条件查找) 订单为2的数据：
db.order_item.find({"order_id": "2"})

# 4、如果一条数据有很多字段，想只查看部分字段的话，如何操作？如下即可
db.order_item.find({},{"order_id": "2"})
# 该操作会打印所有包含 order_id 字段的数据，而且只打印 order_id 字段，如下
{ "_id" : ObjectId("5e6f1f57bf059a0f0f027c2b"), "order_id" : "1" }
{ "_id" : ObjectId("5e6f1f58bf059a0f0f027c2c"), "order_id" : "2" }
{ "_id" : ObjectId("5e6f1f75bf059a0f0f027c2d"), "order_id" : "2" }
{ "_id" : ObjectId("5e6f2220bf059a0f0f027c2e"), "order_id" : "3" }
# 上面的操作，只能每次操作一次，无法形成链条，也无法关联多个表，因此管道符就很有必要了，比如实现同样效果的如下：
db.order_item.aggregate([ { $project: {order_id : "1"} } ])

# 5、在4的基础上，再添加 $match 过滤具体的规则，
# 如下过滤出order_id大于等于2的项目
db.order_item.aggregate([
  { $project: {order_id : "1"} },
  { $match: { order_id: { $gte: 2 } } },
])

{ "_id" : ObjectId("5e6f1f58bf059a0f0f027c2c"), "order_id" : 2 }
{ "_id" : ObjectId("5e6f1f75bf059a0f0f027c2d"), "order_id" : 2 }
{ "_id" : ObjectId("5e6f2220bf059a0f0f027c2e"), "order_id" : 3 }

# 6、如果想统计各个order_id系列里，price的总和，可以使用 $group 分组
# 下面写法意思：以order_id作为分组的关键词，然后每组内price加和，最后赋值给total
db.order_item.aggregate([
  { $group: { _id : "$order_id", total: { $sum : "$price" }} }
])
{ "_id" : "3", "total" : 200 }
{ "_id" : "2", "total" : 350 }
{ "_id" : "1", "total" : 50 }

# 7、如果想根据某些字段排序，只需如下
# -1标识降序，1表示升序
db.order_item.aggregate([
  { $sort: { price : -1 } }
])

# 8、如果想分页，则可以如下
# 其实就是$limit就是输出多少条数据，一般正好用来分页
db.order_item.aggregate([
  { $project: {order_id : "1"} },
  { $limit: 2 }
])
{ "_id" : ObjectId("5e6f1f57bf059a0f0f027c2b"), "order_id" : 1 }
{ "_id" : ObjectId("5e6f1f58bf059a0f0f027c2c"), "order_id" : 2 }

# 9、如果想跳过几条数据，可以如下
# 但有什么场景需要用呢？
db.order_item.aggregate([
  { $project: {order_id : "1"} },
  { $limit: 2 },
  { $skip: 1 }
])
{ "_id" : ObjectId("5e6f1f58bf059a0f0f027c2c"), "order_id" : "2" }

# 10、如果数据分别存放在不同的表里，如何关联查询呢？
db.order.aggregate([
  {
    # 注意，这里的value都需要用引号
    $lookup: {
      from: "order_item",         # 与order_item表关联
      localField: "order_id",     # localField，主表order里的字段为：order_id
      foreignField: "order_id",   # foreignField，附表order_item里的字段：order_id，也可以其他字段
      as: "items"                 # 匹配到的数据，放在items下面
    }
  }
])
# 另外需要注意的是，数据库里的字段和value必须严格一致（类型及值）才能匹配上。匹配完会出来类似如下结果：
{
	"_id": ObjectId("5b743d8c2c327f8d1b360540"),
	"order_id": "1",
	"items": [
    {
		"_id": ObjectId("5b743d9c2c327f8d1b360543"),
		"order_id": "1",
		"title": "商品鼠标1",
		"price": 50,
		"num": 1
	}]
}
```

#### Egg中借助 egg-mongo-native 实现聚合管道

`egg-mongo-native` 作为插件需要先安装、注册、配置、使用。。。当然聚合管道相关用法可以参考文档，

```js
let { ctx } = this;
ctx.body = '这是操作MongoDb数据库的页面';

// 打印egg数据库
// let myOrderDb = await app.mongo.find('order');
// ctx.body = myOrderDb

// 查找order数据库中，order_id为 "3" 的数据
// let orderIdDetail = await app.mongo.find('order', { query: { 'order_id': "3" } });
// ctx.body = orderIdDetail


// 插入一个新的文档，
// await app.mongo.insertOne("testInsert", { doc: { "title": '这是通过egg-mongo-native插入的' } })

// 修改文档
// await app.mongo.findOneAndUpdate( 'testInsert' ,{
//     filter: {"title": '这是通过egg-mongo-native插入的'},
//     update: { $set: { "title": "这是通过findOneAndUpdate更新的" } }
// })

// 删除
// await app.mongo.findOneAndDelete( 'testInsert', { filter: { "title": '这是通过egg-mongo-native插入的' } } );

// 通过id来查找
// 在控制器里直接定义的方法node里的方法，在当前文件内不能使用？需在控制器外定义
// var ObjectID = require('mongodb').ObjectID;
// function getObjectId(param) {
//     return ObjectID(param);
// }

// let objectIdData = app.mongo.find( 'testInsert', {
//     query: { "_id": getObjectId('5e71d0bbb87f0a22c877f053') }
// } );
// ctx.body = objectIdData

// 管道查询
let aggregateData = await app.mongo.aggregate('order' , {
  pipeline: [
    {
      $lookup: {
          from: 'order_item',
          localField: 'order_id',
          foreignField: 'order_id',
          as: 'list'
        }
      },
    {
      $match: { 'all_price': { $gte: 50 } }
    },
    { $limit: 1 }
  ],
  options: {}
});

ctx.body = aggregateData;
```

注意：
- 务必要加await
- 在控制器内定义的方法，不是太合适，应该在控制器外或者extends里增加方法
- [Api文档](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#aggregate)
- 其实aggregate操作理解为表关联查询，还可[参考](https://docs.mongodb.com/manual/reference/command/aggregate/)



#### Mongoose之增删改查数据库

操作数据库，如果只是用原生的方法操作，会比较繁琐，因此可以借助一些上层工具(基于原生api封装的工具)来操作，进而极大的利于开发。而Mongoose就是一种。

Mongoose 是在 node.js 异步环境下对 mongodb 进行便捷操作的对象模型工具。Mongoose 是 NodeJS 的驱动，不能作为其他语言的驱动。

主要有两个特点：
- 通过关系型数据库的思想来设计非关系型数据库 
- 基于 mongodb 驱动，简化操作

使用Monogoose的步骤：
```js
// 1、安装
npm i mongoose --save

// 2、引入并连接数据库
const mongoose = require('mongoose');

// mongo连接数据库时，会提示：mongodb://127.0.0.1:27017，而这就是连接的语句
// 后面便是要连接的具体数据库，比如此处的egg
mongoose.connect('mongodb://127.0.0.1:27017/egg');
// 如果有账户密码需要采用下面的连接方式: 
// mongoose.connect('mongodb://eggOwner:123456@127.0.0.1:27017/egg');

// 3、定义 Schema，其实就是定义数据库的数据格式
var UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    status: 'number' // 也是字符串类型
})

// 4、生成 Model，model 是由 schema 生成的模型，可以操作数据库
// mongoose.model(参数 1:模型名称(首字母大写)，参数 2:Schema，参数 3:要操作数据库集合的名称)
// 如果不传参数3，则默认操作模型名称对应的复数名称的数据库，
// 比如User，默认对应users，当然也可以通过参数3指定要操作的数据库
let User = mongoose.model('User', UserSchema);

// 5、查找数据，此时还没新建，数据库为空
// 模型都会接受回调函数。
User.find({}, function (err, docs) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('应该为空', docs);
})

// 6、增加数据
//实例化模型 传入增加的数据
var u = new User({
    name: 'lisi2222333',
    age: 20,
    status: true
})
u.save((err) => {
  if (err) return console.log(err);
  console.log('成功');
});

// 7、修改数据
// User.updateOne({ name: 'lisi2222333' }, { name: '哈哈哈' }, function (err, res) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('成功')
// });

// 8、删除数据
// 之前操作_id还需要借助，ObjectID，现在可以直接使用_id
// User.deleteOne({ _id: '5e724525966a001fc002f623' }, function (err) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     // deleted at most one tank document
//     console.log('成功');
// });

```

#### Mongoose之默认参数，及模块化

其实定义Schema，类似定义类，当类定义好以后，就可以用这个类来实例化实例了。[更多参考](http://www.mongoosejs.net/docs/connections.html)

```js
// connect方法，参数有以下三个。
mongoose.connect(uri, options, function(error) {
  // Check error in initial connection. There is no 2nd param to the callback.
});

var UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  status: {
    type: String,
    defalut: 'success'
  }
})

let User = mongoose.model('User', UserSchema);

// 1、status使用默认值
// 2、实例化时，如果传入自定义参数，该自定义字段并不会创建成功，比如下面的sex
var u = new User({
    name: 'lisi2222333',
    age: 20,
    // status: true,
    sex: 'girl'
})
u.save((err) => {
  if (err) return console.log(err);
  console.log('成功');
});
```

#### 一些技巧点

**技巧一：**测试一些逻辑时，我们经常先创建一个js文件，然后再运行这个文件，其实还可以直接开启node环境，并输入相关代码，比如：

```js
// 先开启node环境
node

// 引入并执行url模块
const url = require('url');
url.parse('a/b?c=query#id');

// 终端会输出如下内容：
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: '#id',
  search: '?c=query',
  query: 'c=query',
  pathname: 'a/b',
  path: 'a/b?c=query',
  href: 'a/b?c=query#id'
}

```

#### Egg中借助 egg-mongo-native 实现聚合管道
#### Egg中借助 egg-mongo-native 实现聚合管道
#### Egg中借助 egg-mongo-native 实现聚合管道
#### Egg中借助 egg-mongo-native 实现聚合管道

### egg仿小米商城项目

#### 目录结构

在做具体的项目时，我们可以采用前后端分离的模式，但如果采用前后端都用egg去实现的话，就需要对项目进行一下结构上的改造，以提高代码的可维护性和可拓展性。

其实说白了，就是将后台相关的、前端相关的、api相关的等，分别建不同的目录进行管理，比如
- controller/admin 后台相关的控制器
- controller/api api控制器
- controller/fe 前端相关的控制器

其他的文件夹的配置原理一样。

- 后台管理系统，无非就是后台的页面，展示给运营人员的界面
- 前端，则是展示给用户的界面。
- api，则是提供给前端和后端的接口，当然前端还可以是小程序，公众号啥的
- 其他的就是，域名解析，服务部署，nginx配置，以及redis缓存数据等等

#### 商城项目之基类，session，tools服务（验证码）

在项目中，我们一般会采用模块化的思想，比如后台页面的布局，侧边栏和顶部栏都是公共的，可以抽离。

还有登录，登录模块一般是前端界面，然后后端提供接口即可，因此只需要写在控制器里即可。

但比如验证码的话，可能前端页面需要用，后端页面也需要用，如果写在后台的控制器里，前端需要用，如果写在前端的控制器，后台也需要用，因此此时可以将验证码的功能封装在一个服务里，然后不管是后台和前台的控制器都可以直接调用，更加合理。其实到这里，就可以更加体会：**服务可以理解为一些公共的工具函数，而控制器只是匹配一些路由，然后处理一些简单的逻辑**

```js
// app/service/tools.js
'use strict';

var svgCaptcha = require('svg-captcha'); //引入验证
const Service = require('egg').Service;

class ToolsService extends Service {
  //生成验证码
  async captcha (){
    var captcha = svgCaptcha.create({ 
        size:6,
        fontSize: 50, 
        width: 100, 
        height:40,
        background:"#cc9966" 
      });
    this.ctx.session.code = captcha.text;   /*验证码上面的信息*/
    return captcha;
  }
}

module.exports = ToolsService;

// 在admin/verify控制器里使用
async verify() {
  var captcha = await this.service.tools.captcha();  //服务里面的方法
  this.ctx.response.type = 'image/svg+xml';   /*指定返回的类型*/
  this.ctx.body = captcha.data;      /*给页面返回一张图片*/
}

// 页面上使用
// 这里src对应的地址就是后台的接口地址，每次点击都会获取新的
<dd>验　证　码：
  <input id="verify" type="text" name="verify">
  <img id="verify_img" src="/admin/verify" title="看不清？点击刷新" onclick="javascript:this.src='/admin/verify?mt='+Math.random()">
</dd>	
```

以上代码，可以明白，前端获取的验证码其实就是后台，通过一种库生成的图片，然后这个库会把明文保存起来(这里保存在session里)，前端提交验证码时，后台进行校验。


#### 商城项目之登录流程

1. 获取表单提交的数据
2. 校验验证码是否正确
  - 若验证码正确
  1. 对密码进行加密，比如md5
  2. 在用户表(或集合)中，查询当前用户是否存在
  3. 如果存在，则保存用户信息，并调到指定页面
  4. 否则跳转至登录页面，提示用户不存在或者错误
  - 若验证码不正确，跳转至登录页面

```js
// 控制登录的控制器
//执行登录的方法  post
async doLogin() {

  var username=this.ctx.request.body.username;
  // 将md5等工具函数放在服务里
  var password=await this.service.tools.md5(this.ctx.request.body.password);
  var code=this.ctx.request.body.code;

  // 不区分大小写
  if(code.toUpperCase()==this.ctx.session.code.toUpperCase()){

    // model文件夹下面是对应的数据库model
    var result=await this.ctx.model.Admin.find({"username":username,"password":password});
  
    if(result.length>0){
      //登录成功
      // 1、保存用户信息，因为查出来的数据库的数据格式是[{}]
      this.ctx.session.userinfo=result[0];

      //2、跳转到用户中心
      this.ctx.redirect('/admin/manager');
    }else{
      // 如果没有找到，则用户名或密码不正确
      await this.error('/admin/login','用户名或者密码不对');
    }
  }else{
    //注意：异步和  await
    await this.error('/admin/login','验证码错误');
  }
}


async loginOut() {
  // 退出登录，其实就是清空session
  this.ctx.session.userinfo=null;
  this.ctx.redirect('/admin/login');
}
```

上面有提到 `this.ctx.model.Admin.find({})`，其实是数据库的查找，只是连接并定义数据库model的部分已经被抽离出去，这里只是调用。

```js
// /app/model/admin.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();

  // 定义schema
  const AdminSchema = new Schema({
    username: { type: String },
    password: { type: String },
    mobile: { type: String },
    email: { type: String },
    status: { type: Number, default: 1 },
    role_id: { type: Schema.Types.ObjectId },
    add_time: {
      type: Number,
      default: d.getTime()
    },
    is_super: { type: Number }
  });

  // 连接admin集合
  return mongoose.model('Admin', AdminSchema, 'admin');
}

// 当然还需要注册并配置数据库
// /app/config/plugin.js
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose'
};

// /app/config/config.default.js
//配置mongoose连接mongodb数据库
exports.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1/eggxiaomi',
    options: {},
  }
};
```
[更多mongoose使用参考](https://www.npmjs.com/package/egg-mongoose)

👆的逻辑只是登录校验，在vue项目中，我们还会通过路由守卫进行判断，哪些页面需要登录，哪些页面不需要登录就可以访问，在node项目里，也是同样道理。

只是node项目里，充当路由守卫的模块变为了中间件，而中间件可以通过配置，只匹配指定规则的路由。比如这里的adminauth中间件：

```js
// 配置 adminauth 中间件
// /app/config/config.default.js
config.middleware = ['adminauth'];
config.adminauth={
  // 只匹配/admin的路由
  match: '/admin',
}

// 中间件具体逻辑
// /app/middleware/adminauth.js
var url = require('url');

module.exports = (options, app) => {
  return async function adminauth(ctx, next) {
    /*
      1、用户没有登录跳转到登录页面
      2、只有登录以后才可以访问后台管理系统
    */
    ctx.state.csrf = ctx.csrf;   //全局变量

    // /admin/verify?mt=0.7466881301614958  转换成  /admin/verify
    var pathname = url.parse(ctx.request.url).pathname;

    // 这里就利用了上面保存的用户信息
    if (ctx.session.userinfo) {
      //全局变量 ，页面有可能需要使用
      ctx.state.userinfo = ctx.session.userinfo;           
      await next();
    } else {
      //排除不需要做权限判断的页面  /admin/verify?mt=0.7466881301614958
      if (pathname == '/admin/login' || pathname == '/admin/doLogin' || pathname == '/admin/verify') {
        await next();
      } else {
        ctx.redirect('/admin/login');
      }
    }       
  };
};
```


#### 商城项目之权限管理

在后台项目中，我们经会遇到权限相关的东西，比如这个人是管理员角色，可以看到哪些菜单，这个人是运营角色，可以看到哪些菜单等等。。。

这里的管理员，运营等就是角色，而所有的菜单就是权限列表，而具体的人的话就是用户，用户属于哪个角色是需要配置的。

- 用户，一般情况下，一个用户对应一个角色，但也可能多个角色，这里先讨论前者
- 角色，一个角色往往对应多个用户，同样一个角色往往也拥有多个菜单权限
- 菜单，一个菜单也往往属于多个角色。

而业内就有种基于角色的权限访问控制(Role-Based Access Control)系统。在 RBAC 中，权限与角色相关联，用户通过成为适当角色的成员而得到这些角色的权限。这就极大地简化了权限的管理。

#### 商城项目之增加、编辑角色

增加角色，其实就是建立一个存放角色的集合，然后获取到前台传过来的参数后，存放在数据库里即可。而编辑的话，无非就是拿到要编辑用户的id，查询数据库，然后更新而已。

操作数据库中的集合，首先需要配置集合的Schema（连接数据库的部分，前面有）
```js
// /app/model/role.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();

  const RoleSchema = new Schema({
    title: { type: String },
    description: { type: String },
    status: { type: Number, default: 1 },
    add_time: {
      type: Number,
      default: d.getTime()
    }
  });

  return mongoose.model('Role', RoleSchema, 'role');
}

// 在控制器里使用
// 增加角色
async doAdd() {
  // 这里是实例化模型，并传入参数。
  var role=new this.ctx.model.Role({
    title:this.ctx.request.body.title,
    description:this.ctx.request.body.description,
  })
  await role.save();   //注意
  await this.success('/admin/role','增加角色成功');
} 

// 编辑角色，接受编辑的内容，然后更新即可
async doEdit() {
  var _id = this.ctx.request.body._id;
  var title = this.ctx.request.body.title;
  var description = this.ctx.request.body.description;

  await this.ctx.model.Role.updateOne({ "_id": _id }, {
    title, description
  })
  await this.success('/admin/role', '编辑角色成功');
}
```

#### 商城项目之增加、编辑角色


[whatForwardProxyOrReverseUrl]: https://zhuanlan.zhihu.com/p/25707362
[reSetMysqlPWPolicyUrl]: https://mal-suen.github.io/2018/05/27/MySQL%E5%AE%89%E5%85%A8%E8%AE%BE%E7%BD%AE%E5%91%BD%E4%BB%A4mysql_secure_installation/
[findMysqlConfFileUrl]: https://blog.csdn.net/qq_42689877/article/details/82844260
[findMysqlConfFileUrl1]: https://blog.csdn.net/StriverLi/article/details/78637026


