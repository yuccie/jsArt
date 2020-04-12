---
layout: post
title: 了解一下java
date: Mon Nov 26 2017 16:18:51 GMT+0800 (中国标准时间)
---
#### 关于java学习的几点建议
[框架与基础哪个重要][baseOrFrameWhoisImportantUrl]<br/>
[学习java需要哪些技能点][needWhatKillsMukeUrl]<br/>
[哪些技能才能胜任java开发岗位](https://zhuanlan.zhihu.com/p/34852879)<br/>
[java后端需要哪些技能-知乎](https://www.zhihu.com/question/20323977)<br/>
[各公司对java技能要求知识点](https://www.jianshu.com/p/5080bf0f7f9c)<br/>


[如何系统地学习java web技术？](https://www.zhihu.com/question/23335551)<br/>
[JavaWeb开发入门](http://www.cnblogs.com/xdp-gacl/p/3729033.html)<br/>

1. 学习网络 操作系统 算法等相关的理论知识
  - 比如《计算机网络-自顶向下》


#### **学习java之前需要知道的几个概念**

#### **Spring Boot**
之前搭建一个spring web项目的时候需要怎么做？
1. 配置web.xml，加载spring和spring mvc
2. 配置数据库连接、配置spring事务
3. 配置加载配置文件的读取，开启注解
4. 配置日志文件
5. 配置完部署tomcat调试
6. ...

如果您编写过基于 Spring 的应用程序，就会知道只是完成 “Hello, World” 就需要大量配置工作。这不是一件坏事：Spring 是一个优雅的框架集合，需要小心协调配置才能正确工作。但这种优雅的代价是配置变得很复杂（别跟我提 XML）

>Spring Boot 使您能轻松地创建独立的、生产级的、基于 Spring 且能直接运行的应用程序。我们对 Spring 平台和第三方库有自己的看法，所以您从一开始只会遇到极少的麻烦。

基本上讲，这意味着您只需极少的配置，就可以快速获得一个正常运行的 Spring 应用程序。这些**极少的配置采用了注释的形式，所以没有 XML**。

Spring Boot 拥有观点。换句话说，**Spring Boot 拥有合理的默认值，所以您可以使用这些常用值**快速构建应用程序。例如，Tomcat 是一个非常流行的 Web 容器。**默认情况下，Spring Boot Web 应用程序使用了一个嵌入式 Tomcat 容器**。

当然除了默认配置，还可以自定义配置。如，如果喜欢 Maven，可以轻松地在 POM 文件中更改 <dependency> 来替换 Spring Boot 默认值。

某人说：
>spring boot其实不是什么新的框架，它默认配置了很多框架的使用方式，就像maven整合了所有的jar包，spring boot整合了所有的框架

下面看一个controller内容，对于mvc架构，这就是控制器
```java
// 注解的意思就是controller里面的方法都以json格式输出，不用再写什么jackjson配置的了！
// 等价于@Controller+@ResponseBody的结合，使用这个注解的类里面的方法都以json格式输出。
@RestController
public class HelloWorldController {
  // 注解会将 HTTP 请求映射到 MVC 和 REST 控制器的处理方法上
  @RequestMapping("/hello")
  public String index() {
    return "Hello World";
  }
}
```

- **pom.xml**: Maven构建说明文件
- **xxxApplication.java**: 一个带有main()方法的类，用于启动应用程序（关键）
- **xxxApplicationTests.java**: 一个空的unit测试类，它加载了一个使用Spring Boot字典配置功能的Spring应用程序上下文。
- **@RestController**: 等价于@Controller+@ResponseBody的结合，使用这个注解的类里面的方法都以json格式输出
- **@SpringBootApplication**: Sprnig Boot项目的核心注解，主要目的是开启自动配置。
- **@RequestMapping("/hello")**: 注解会将 HTTP 请求映射到 MVC 和 REST 控制器的处理方法上

参考链接:<br/>
[Spring Boot 基础][springBootBaseUrl]<br/>
[Spring Boot入门篇][springBootEnterDoorUrl]<br/>
[Spring Boot优雅入门篇][springBootBeautifulEnterDoorUrl]<br/>


#### **Maven**
Maven 翻译为"专家"、"内行"，是 Apache 下的一个纯 Java 开发的开源项目。基于**项目对象模型**（缩写：POM）概念，Maven利用一个中央信息片断能管理一个项目的构建、报告和文档等步骤。

Maven 是一个项目管理工具，可以对 Java 项目进行构建、依赖管理，为开发者提供了一套完整的构建生命周期框架。Maven 也可被用于构建和管理各种项目，例如 C#，Ruby，Scala 和其他语言编写的项目。

Maven 能够帮助开发者完成以下工作：
- 构建
- 文档生成
- 报告
- 依赖
- SCMs
- 发布
- 分发
- 邮件列表
总的来说，Maven 简化了工程的构建过程，并对其标准化。它无缝衔接了编译、发布、文档生成、团队合作和其他任务。Maven 提高了重用性，负责了大部分构建相关的任务。

#### **War,Jar,Ear**
Jar、War、EAR、在文件结构上，三者并没有什么不同，它们都采用zip或jar档案文件压缩格式。但是它们的使用目的有所区别：

- Jar文件（扩展名为. Jar，Java Application Archive）包含Java类的普通库、资源（resources）、辅助文件（auxiliary files）等。java编译好之后生成class文件，但如果直接发布这些class文件的话会很不方便，所以就把许多的class文件打包成一个jar，jar中除了class文件还可以包括一些资源和配置文件，通常一个jar包就是一个java程序或者一个java库

- War文件（扩展名为.War,Web Application Archive）包含全部Web应用程序。在这种情形下，一个Web应用程序被定义为单独的一组文件、类和资源，用户可以对jar文件进行封装，并把它作为小型服务程序（servlet）来访问。与jar基本相同，但它通常表示这是一个Java的Web应用程序的包，tomcat这种Servlet容器会认出war包并自动部署。

- Ear文件（扩展名为.Ear,Enterprise Application Archive）包含全部企业应用程序。在这种情形下，一个企业应用程序被定义为多个jar文件、资源、类和Web应用程序的集合。

　　每一种文件（.jar, .war, .ear）只能由应用服务器（application servers）、小型服务程序容器（servlet containers）、EJB容器（EJB containers）等进行处理。


#### **servlet**
事实上，servlet就是一个Java接口，而且只有5个方法
1. init(ServletConfig):void
2. getServletConfig():ServletConfig
3. service(ServletRequest,ServletResponse)
4. getServletInfo():String
5. destory():void

**那servlet是干嘛的？很简单，接口的作用是什么？规范呗！**

servlet接口定义的是一套处理网络请求的规范，所有实现servlet的类，都需要实现它那五个方法，其中最主要的是两个生命周期方法 init()和destroy()，还有一个处理请求的service()，也就是说，所有实现servlet接口的类，或者说，所有想要处理网络请求的类，都需要回答这三个问题：
- 你初始化时要做什么
- 你销毁时要做什么
- 你接受到请求时要做什么
这是Java给的一种规范！

servlet是一个规范，那实现了servlet的类，就能处理请求了吗？
答案是，**不能**。

你可以随便谷歌一个servlet的hello world教程，里面都会让你写一个servlet，相信我，你从来不会在servlet中写什么监听8080端口的代码，servlet不会直接和客户端打交道！那请求怎么来到servlet呢？答案是servlet容器，比如我们最常用的tomcat，同样，你可以随便谷歌一个servlet的hello world教程，里面肯定会让你把servlet部署到一个容器中，不然你的servlet压根不会起作用。

tomcat才是与客户端直接打交道的家伙，他监听了端口，请求过来后，根据url等信息，确定要将请求交给哪个servlet去处理，然后调用那个servlet的service方法，service方法返回一个response对象，tomcat再把这个response返回给客户端。


参考链接:<br/>
[servlet的本质是什么?][whatIsServletUrl]<br/>

#### **jsp**
JSP（全称Java Server Pages）是由 Sun Microsystems 公司倡导和许多公司参与共同创建的一种使软件开发者可以响应客户端请求，而动态生成 HTML、XML 或其他格式文档的Web网页的技术标准。

JSP 技术是以 Java 语言作为脚本语言的，JSP 网页为整个服务器端的 Java 库单元提供了一个接口来服务于HTTP的应用程序。

#### **JDBC**
Java数据库连接，（Java Database Connectivity，简称JDBC）是Java语言中用来规范客户端程序如何来访问数据库的应用程序接口，提供了诸如查询和更新数据库中数据的方法。JDBC也是Sun Microsystems的商标。JDBC是面向关系型数据库的。

#### **mybatis**
MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的 POJOs(Plain Old Java Objects,普通的 Java对象)映射成数据库中的记录。

在我们传统的 JDBC 中，我们除了需要自己提供 SQL 外，还必须操作 Connection、Statment、ResultSet，不仅如此，为了访问不同的表，不同字段的数据，我们需要些很多雷同模板化的代码，闲的繁琐又枯燥。

而我们在使用了 MyBatis 之后，只需要提供 SQL 语句就好了，其余的诸如：建立连接、操作 Statment、ResultSet，处理 JDBC 相关异常等等都可以交给 MyBatis 去处理，我们的关注点于是可以就此集中在 SQL 语句上，关注在增删改查这些操作层面上。


#### **JDK**
编写 Java 小应用程序和应用程序需要类似于 JDK 的开发工具。JDK 包括 Java 运行时环境、Java 编译器和 Java API。


#### **JVM**
Java 虚拟机 Java 虚拟机（Java virtual machine，JVM）是运行 Java 程序必不可少的机制。JVM实现了Java语言最重要的特征：即平台无关性。原理：编译后的 Java 程序指令并不直接在硬件系统的 CPU 上执行，而是由 JVM 执行。JVM屏蔽了与具体平台相关的信息，使Java语言编译程序只需要生成在JVM上运行的目标字节码（.class）,就可以在多种平台上不加修改地运行。Java 虚拟机在执行字节码时，把字节码解释成具体平台上的机器指令执行。因此实现java平台无关性。它是 Java 程序能在多平台间进行无缝移植的可靠保证，同时也是 Java 程序的安全检验引擎（还进行安全检查）。

JVM 是 编译后的 Java 程序（.class文件）和硬件系统之间的接口 （ 编译后：javac 是收录于 JDK 中的 Java 语言编译器。该工具可以将后缀名为. java 的源文件编译为后缀名为. class 的可以运行于 Java 虚拟机的字节码。）
#### **MySql**

MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。

数据库（Database）是按照数据结构来组织、存储和管理数据的仓库。

每个数据库都有一个或多个不同的 API 用于创建，访问，管理，搜索和复制所保存的数据。

我们也可以将数据存储在文件中，但是在文件中读写数据速度相对较慢。

所以，现在我们使用关系型数据库管理系统（RDBMS）来存储和管理的大数据量。所谓的关系型数据库，是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。

#### **webSocket**

WebSocket是一种在单个TCP连接上进行全双工通信的协议。WebSocket通信协议于2011年被IETF定为标准RFC 6455，并由RFC7936补充规范。WebSocket API也被W3C定为标准。

WebSocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。


[whatIsServletUrl]: https://www.zhihu.com/question/21416727
[baseOrFrameWhoisImportantUrl]: https://book.douban.com/review/6650285/
[needWhatKillsMukeUrl]: https://www.imooc.com/article/13851
[springBootBaseUrl]: https://www.ibm.com/developerworks/cn/java/j-spring-boot-basics-perry/index.html
[springBootEnterDoorUrl]: https://www.cnblogs.com/ityouknow/p/5662753.html
[springBootBeautifulEnterDoorUrl]: http://tengj.top/2017/02/26/springboot1/

