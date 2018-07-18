# 学习 git 的艰难路程

- git init
- .gitingore ./node_modules
- git add ./
- git commit -m 'intorduce'
- git push git@github.com:wenlong201807/practise071801.git master
- git remote add origin git@github.com:wenlong201807/practise071801.git
- git push origin -u master
- git push
- git pull
- git log --oneline
- git reflog
- git clone
- git branch devzhu
- git checkout devzhu
- git branch
- ssh -keygen -t rsa -C '1573511441@qq.com'

## 项目使用教程

1.  在桌面新建一个空文件夹，取名 cloneproject
2.  进入该文件夹，打开 git bash
3.  在 git bash 中输入

```git
15735@DESKTOP-PL46AV2 MINGW64 ~/Desktop/clonepreject
$ git clone git@github.com:wenlong201807/practise071801.git master
```

4.  返回消息为以下内容则为克隆成功

```
Cloning into 'master'...
remote: Counting objects: 58, done.
remote: Compressing objects: 100% (55/55), done.
remote: Total 58 (delta 1), reused 57 (delta 0), pack-reused 0
Receiving objects: 100% (58/58), 1.25 MiB | 256.00 KiB/s, done.
Resolving deltas: 100% (1/1), done.

15735@DESKTOP-PL46AV2 MINGW64 ~/Desktop/clonepreject
```

5.  进入 clonepreject>master 中的 npm 命令行黑匣子

```
键入cnpm i
PS C:\Users\15735\Desktop\clonepreject\master> cnpm i
下载好相应的node_modules
```

6.  启动项目在浏览器中查看真是效果

```
键入gulp dev
PS C:\Users\15735\Desktop\clonepreject\master> gulp dev
依据gulpfile.js中的任务命令开启服务，打通链接，打开网页页面，查看实际效果
```
