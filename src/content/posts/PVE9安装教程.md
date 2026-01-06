---
title: PVE9安装教程
date: "2025-08-20"
description: 事情的起因还要从我升级PVE8to9说起。升级前期一直没有问题，但由于一次莫名其妙的网络断联，导致apt升级错误，配置进程全部锁死。。。尝试抢救了2h，但一直无法恢复apt进程，半夜实在被折磨疯了，于是下定决心直接从头开始！（当然前提是我的重要资料基本在另外一台稳定的NAS上有备份，不然也不至于走到这一步。。）
tags: ['技术','PVE']
draft: false
---
# PVE9安装记录

事情的起因还要从我升级PVE8to9说起。升级前期一直没有问题，但由于一次莫名其妙的网络断联，导致apt升级错误，配置进程全部锁死。。。

尝试抢救了2h，但一直无法恢复apt进程，半夜实在被折磨疯了，于是下定决心直接从头开始！（当然前提是我的重要资料基本在另外一台稳定的NAS上有备份，不然也不至于走到这一步。。）

## 开始安装

PVE9的安装流程基本和之前的一样，下载iso文件，rufus写入U盘，bios修改启动项，然后按部就班安装就行了。不出意外的话，5min之内就可以成功启动**IP:8006**，进入web界面了。

### 换源

关键的操作差异主要是安装后的一些配置。PVE 9基于Debian 13，换源时除了debian的软件源，还要分别处理企业源、ceph源、无订阅源、CT模板源等。

换源的操作和Debian 13相同，和以往的PVE版本有所不同，软件源变更为 ``DEB822`` 格式，使用 ``/etc/apt/sources.list.d/debian.sources``。

#### Debian 软件源

替换 ``/etc/apt/sources.list.d/debian.sources`` 中的内容：

```
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/debian
Suites: trixie trixie-updates trixie-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb-src
URIs: https://mirrors.tuna.tsinghua.edu.cn/debian
Suites: trixie trixie-updates trixie-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg


Types: deb
URIs: https://security.debian.org/debian-security
Suites: trixie-security
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

# Types: deb-src
# URIs: https://security.debian.org/debian-security
# Suites: trixie-security
# Components: main contrib non-free non-free-firmware
# Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
```

#### 企业源

由于我不需要这个所以直接删除即可。

#### Ceph源

替换 ``/etc/apt/sources.list.d/ceph.sources``为：

```
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian/ceph-squid
Suites: trixie
Components: main
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
```

#### 无订阅源

创建 ``/etc/apt/sources.list.d/pve-no-subscription.sources``，填入：

```
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian/pve
Suites: trixie
Components: pve-no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
```

#### CT模板源

使用以下命令修改，重启生效：

```
cp /usr/share/perl5/PVE/APLInfo.pm /usr/share/perl5/PVE/APLInfo.pm_back
sed -i 's|http://download.proxmox.com|https://mirrors.tuna.tsinghua.edu.cn/proxmox|g' /usr/share/perl5/PVE/APLInfo.pm
```

全部完成之后，使用 ``apt update``和 ``apt-get update``更新一下即可。

### 添加硬盘

可参考Debian 挂载硬盘的教程将硬盘挂载到PVE上，随后再 ``数据中心-存储-添加-目录`` 中填写id和目录，添加即可。

## 总结

到这里，PVE 9的基础配置就已经完成了，接下来就要开始把原来的那些虚拟机重新配置一遍了。。