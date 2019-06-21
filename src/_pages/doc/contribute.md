---
title: Contribute
permalink: /doc/contribute/
sidebar: doc
---
{% include vars.html %}

* TOC
{:toc}

# Requirements

Several SDK and tools are required to build and create a portapp.

## Go

[Go](https://golang.org){:target="_blank"} is the programing language used to create the portapp executable wrapper.<br />
You need **Go 1.12** that you can download on the [Golang website](https://golang.org/dl/){:target="_blank"}.<br />
Add the path to `go.exe` (eg. `C:\go\bin`) to your environment variable PATH (must be already added if you install through the MSI).<br />
To check if you have Go in your path, open a command prompt and type `go version` :

```text
go version go1.12.4 windows/amd64
```

## OpenJDK

You need OpenJDK 11 that you can download [here](https://download.java.net/java/GA/jdk11/9/GPL/openjdk-11.0.2_windows-x64_bin.zip){:target="_blank"}.<br />
Extract the archive on your computer (eg. `C:\jdk`) and add the path to `java.exe` (eg. `C:\jdk\bin`) to your environment variable PATH.<br />
To check if you have Java in your path, open a command prompt and type `java -version` :

```text
openjdk version "11.0.2" 2019-01-15
OpenJDK Runtime Environment 18.9 (build 11.0.2+9)
OpenJDK 64-Bit Server VM 18.9 (build 11.0.2+9, mixed mode)
```

## Apache Ant

[Apache Ant](https://ant.apache.org/){:target="_blank"} is used with the OpenJDK to build and package the portapp.<br />
You need at least Apache Ant 1.10.5 that you can download on the [Apache website](https://ant.apache.org/bindownload.cgi){:target="_blank"}.<br />
Extract the archive on your computer (eg. `C:\apache-ant`) and add the path to `ant.bat` (eg. `C:\apache-ant\bin`) to your environment variable PATH.<br />
To check if you have Apache Ant in your path, open a command prompt and type `ant -version` :

```text
Apache Ant(TM) version 1.10.5 compiled on July 10 2018
```

## NodeJS

[NodeJS](https://nodejs.org/en/){:target="_blank"} is used to extract and compress ASAR files for apps based on Electron.<br />
Download and install the latest LTS version for your system.
Add the path to `node.exe` (eg. `C:\Program Files\nodejs`) to your environment variable PATH (must be already added if you install through the MSI).<br />
To check if you have Node in your path, open a command prompt and type `node --version` :

```text
v10.16.0
```

# Build

Now we are going to prepare our environment in `C:\portapps-dev` folder and build [Brave portable](https://github.com/portapps/brave-portable) :

```
$ mkdir C:\portapps-dev
$ cd C:\portapps-dev\
$ git clone https://github.com/portapps/brave-portable
$ git clone https://github.com/portapps/portapps
$ cd brave-portable\
$ ant release
```

This should take a while and release files should be available in `C:\portapps-dev\brave-portable\bin\release`.

# Create your first portapp

_TODO_