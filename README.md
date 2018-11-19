
#### 目录结构

#### _config.yml
站点的总配置文件，有很多选项可以通过命令行方式指定

#### _drafts
未发布的草稿，文件名不需要带有日期

#### _includes
代码片段，可以通过include进行引用

#### _layouts
布局，布局文件可以被继承，{{ content }} 用于表示被继承者的内容。

#### _posts
文件，命名需要以日期开头，如：2016-12-01-my-article.md

#### _sass
sass文件，可以通过插件完成编译，也可以选择引入原生css或less等

#### _site
目标文件

#### index.html
首页

#### Front Matter
jekyll整个站点的配置是站点根目录下的_config.yml文件，而 _layout, _posts 等目录下的文件中也可以有自己的变量。文件头部的 yaml 配置被称作 Front Matter。

可以使用defaults设置一个路径下Front Matter默认值
```yml
defaults:
  - scope:
      path: ""
      type: weekly
    values:
      layout: weekly
      title: 技术周刊
```

#### 分页
Jekyll 没有内置分页功能，而是提供了一个分页插件 jekyll-paginate。jekyll-paginate 仅在特定的默认条件下生效，如果你对网站结构有自己的一套风格，jekyll-paginate 可能是无法满足需求的。

限制如下：
- 分页功能必须在 HTML 格式文件中调用，如：index.html
- 必须使用默认的链接格式 permalink

#### 文章摘要
Jekyll 提供了文章摘要摘取功能，通过 post.excerpt 就可以获得摘要内容。

我们也可以设置摘取摘要的分隔符：
```yml
excerpt_separator: <! --more-- >
```

#### 评论
由于是静态站点，我们没法内建评论系统，因此需要引入一些纯前端就可以使用的评论系统。
国外推荐：disqus，国内推荐：duoshuo。

#### page
可以认为，不在_post目录下的页面都是page而不是post，其他方面区别不大
国外推荐：disqus，国内推荐：duoshuo。

#### Collection
并不是每个页面都是独立“页面”和以日期为顺序的“博文”，因此 Jekyll 引入了 Collection。Collection 可以根据路径定义一类具有相同属性的页面集合。Collection 也可以通过 Front Matter 设定默认值。

#### data
Data 相当于动态页面中的数据库，Jekyll Data 支持 yaml, json, CSV 三种格式，可以通过 **site.data**直接访问。

#### Liquid模板
Liquid 是一个开源模版语言，由电商公司 Shopify 实现，用 Ruby 编写。Shopify 自己使用 Liquid 来构建自己电商网站模板生态。[参考]( https://shopify.github.io/liquid/)
Jekyll 使用 Liquid 作为模版引擎，构建页面。

##### 变量
```xml
<title>
{{ page.title }}
</title>
```
其中，jekyll 预设了`site,layout,page,content`四个全局变量

##### 逻辑判断
##### 遍历
##### 赋值
##### [过滤](http://jekyllrb.com/docs/templates/#filters)

##### 使用插件
插件简介
Jekyll 支持使用插件进行扩展，插件的类型分为：Generators、Converters、Commands、Hooks、Liquid Tag、Liquid Filter 等。

如果希望开发插件，请参考 http://jekyllrb.com/docs/plugins/

使用插件
基于 Gem 的方式

对于已经发布到 RubyGems 的插件，推荐使用这种方式。只需要在 _config.yml 中 gems 字段加入相应插件名称即可。Jekyll 3.5.0 版之后请使用 plugins 字段配置。

基于本地文件

对于没有发布的插件，可以在 _plugins 文件夹中直接引入 *.rb Ruby 源文件。


## Vno - Jekyll

[Vno Jekyll](https://github.com/onevcat/vno-jekyll) is a theme for [Jekyll](http://jekyllrb.com). It is a port of my Ghost theme [vno](https://github.com/onevcat/vno), which is originally developed from [Dale Anthony's Uno](https://github.com/daleanthony/uno).

## Live Demo

See [Vno - Jekyll](http://vno.onevcat.com) site and [my blog](http://onevcat.com).

You can also find some instruction as well as other sites using Vno theme in [this page](http://vno.onevcat.com/2016/02/hello-world-vno/).

## Licence

Great thanks to [Dale Anthony](https://github.com/daleanthony) and his [Uno](https://github.com/daleanthony/uno). Vno Jekyll is based on Uno, and contains a lot of modification on page layout, animation, font and some more things I can not remember. Vno Jekyll is followed with Uno and be licensed as [Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/). See the link for more information.
