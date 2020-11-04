---
layout: post
title: Docker Toolbox portable abandoned
date: 2020-11-04 21:11:00 +0100
app: docker-toolbox
tags: [docker-toolbox, abandoned]
---
{% include vars.html %}

Docker Toolbox portable is not maintained anymore and is abandoned. Docker has deprecated this product as stated
on [their repository](https://github.com/docker/toolbox):

> This project and repository is now deprecated and is no longer in active development. Please use [Docker Desktop](https://www.docker.com/products/docker-desktop)
> instead where possible. 
> 
> Docker released the Docker Toolbox project to make it easier for developers who work on Mac and Windows to get started
> using Docker. In 2016 Docker released Docker Desktop which superseded toolbox and was significantly easier for the
> majority of users to get started.  This still left some users behind, predominantly users who were on Windows Home
> editions, Windows 7, Windows 8 and users of VirtualBox.
> 
> Since 2016 there have been a number of changes. Windows 7 is no longer supported and the mainstream support of
> Windows 8.1 has ended. The majority of Windows users are now on a version of Windows 10.
> Since [VirtualBox 6.0](https://docs.oracle.com/en/virtualization/virtualbox/6.0/admin/hyperv-support.html#:~:text=Oracle%20VM%20VirtualBox%20can%20be,engine%20for%20the%20host%20system)
> users have been able to run VirtualBox and Hyper-V at the same time on their Windows machines, allowing users to use
> VirtualBox and Docker Desktop side by side on Hyper-V. For Windows Home users, WSL 2 is available and Docker Desktop
> now uses this to provide [Desktop for Windows Home](https://docs.docker.com/docker-for-windows/install-windows-home/)
> 
> Given these changes Docker has decided to archive the Toolbox project to allow us to make it clear that we are no
> longer supporting or developing this product and to give us time to focus on making further improvements to Docker Desktop.
> Please provide any feedback via the [Docker Public Roadmap](https://github.com/docker/roadmap/issues/110)

Therefore no development or support will be brought to this portapp from now on but feel free to fork
[the repository](https://github.com/portapps/docker-toolbox-portable) and make your own changes if needed.
