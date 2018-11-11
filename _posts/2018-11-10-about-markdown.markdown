---
layout: post
title: About Markdown
date: Sat Nov 10 2018 15:16:33 GMT+0800
---


#### 待解决
1. 如何给某些文字添加颜色
2. 如何给链接添加下划线
3. 想终点突出某些文字，怎么搞？

#### 添加一个已有的仓库
```bash
# 只是初始化一个仓库的后两个步骤
git remote add origin git@xxx/xxx.git
git push -u origin master
```

### git 远程主机常用操作

```bash
# 查看远程主机名(-v 查看远程主机的详细地址)
$ git remote  
// origin

# 查看远程主机详细信息
$ git remote show <主机名>

# 添加远程主机
$ git remote add <主机名> <仓库地址>

# 删除远程主机
$ git remote rm <主机名>

# 重命名远程主机名
$ git remote rename <原主机名> <新主机名>

```


### bash 常用操作

```bash
# 查看别名命令的全称
$ which gcam
// gcam: aliased to git commit -a -m

# 删除工作区指定文件修改
$ which gcam

```




### oh my zsh 常用操作
```bash
# 查看所有别名
$ alias

# 管道符查看含gcam的别名
$ alias | grep gcam
// gcam='git commit -a -m'

# 删除本地分支
$ git branch -d xxx

# 删除远程某个分支
$ git push origin --delete xxx
```