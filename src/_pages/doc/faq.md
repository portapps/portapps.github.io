---
title: FAQ
permalink: /doc/faq/
sidebar: doc
---
{% include vars.html %}

* TOC
{:toc}

## How to trust your distributed binaries ?

In a word, you can trust portapps binaries over those provided by other systems offering portable applications.<br />
Why ? Because the whole process is open source as well as the build process for the executable wrapper. Let's take Skype as an example.

The "main" file of each portapps repositories is the [`build.properties`](https://github.com/portapps/skype-portable/blob/master/build.properties){:target="_blank"} file. It's a spec file for the building procedure of a portapp using [Apache Ant](https://ant.apache.org/){:target="_blank"}.

In this file you have the [original source of the distributed package from the official website](https://github.com/portapps/skype-portable/blob/master/build.properties#L34){:target="_blank"}.
For Skype this file is at the following url : `https://endpoint920510.azureedge.net/s4l/s4l/download/win/Skype-8.25.0.5.exe`.

If you go on the official website of Skype the link to the artifact is `https://go.skype.com/windows.desktop.download`, but it redirects to an azure CDN :

```
> https://go.skype.com/windows.desktop.download
HTTP/1.1 301 Moved Permanently
> https://get.skype.com/go/getskype-skypeforwindows
HTTP/1.1 302 Found
> https://endpoint920510.azureedge.net/s4l/s4l/download/win/Skype-8.25.0.5.exe
```

## How does it work ?

Concerning the building process to make it "portapp", we are going to take Skype as an example.

Everything is revealed in the [logs on Appveyor](https://ci.appveyor.com/project/portapps/skype-portable/build/18?fullLog=true){:target="_blank"}. Here are the building steps :

* Install Golang, Java and ANT
* Load required libraries
  * ant-contrib
  * 7zip
  * dep (dependency manager for golang)
  * [rcedit](https://github.com/electron/rcedit/){:target="_blank"} (to add icons to the final executable)
  * innoextract (to extract the original setup)
  * innosetup (to package the final portapp as a portable setup using innosetup)
  * upx (to compress the portapp executable)
* Download the original setup from the official website
* Extract this setup
* Download go dependencies using dep (based on Gopkg.toml)
* "Go" generate (prepare versioning file for the final executable and rcedit resources)
* "Go" build (create the portapp executable)
* Compressing executable with UPX
* Load asar (tool to extract app.asar ; because Skype is based on Electron)
* [Replace paths in app.asar](https://github.com/portapps/skype-portable/blob/master/build.properties#L23-L28){:target="_blank"}
* Repackaging app.asar
* Create 7z portapp archive
* Create innosetup portapp setup
* Send artefacts from Appveyor to Github releases
* Done {% gemoji tada %}

This process is quite the same for the current portapps available [but can differ following the original setup](https://github.com/portapps/portapps/tree/master/.build){:target="_blank"} (can be archive, electron app, innosetup, etc...).

## Antivirus complains about the wrapper

Wrapper `[appname]-portable.exe` of all portapps are scanned by [VirusTotal](https://www.virustotal.com){:target="_blank"} and a link is provided in the description of GitHub releases page.<br />
Checkout [brave-portable releases page](https://github.com/portapps/brave-portable/releases){:target="_blank"} on GitHub as an example :

![](/img/faq/brave-portable-github-releases-page.png)

Every detections found by VirusTotal scans are generic. Most likely based on a heuristic detection. Heuristics are more prone to false-positive detections :

![](/img/faq/virustotal-detection.png)

This [happens quite often](https://github.com/golang/go/issues?utf8=%E2%9C%93&q=is%3Aissue%20antivirus){:target="_blank"} with programs written in [Golang](https://golang.org/){:target="_blank"}. The best you can do is to report this to your Antivirus software vendor as a false positive :

* Adaware : [https://www.adaware.com/report-false-positives](https://www.adaware.com/report-false-positives){:target="_blank"}
* Avast : [https://www.avast.com/false-positive-file-form.php](https://www.avast.com/false-positive-file-form.php){:target="_blank"}
* AVG : [https://www.avg.com/en-us/false-positive-file-form](https://www.avg.com/en-us/false-positive-file-form){:target="_blank"}
* Bitdefender : [https://www.bitdefender.com/submit/](https://www.bitdefender.com/submit/){:target="_blank"}
* F-Secure : [https://www.f-secure.com/en/web/labs_global/submit-a-sample](https://www.f-secure.com/en/web/labs_global/submit-a-sample){:target="_blank"}
* Kaspersky : [https://virusdesk.kaspersky.com/](https://virusdesk.kaspersky.com/){:target="_blank"}
* McAfee : [https://kc.mcafee.com/corporate/index?page=content&id=KB85567](https://kc.mcafee.com/corporate/index?page=content&id=KB85567){:target="_blank"}
* Windows Defender : [https://www.microsoft.com/en-us/wdsi/filesubmission](https://www.microsoft.com/en-us/wdsi/filesubmission){:target="_blank"}

And this is often quickly solved : [portapps/skype-portable#4](https://github.com/portapps/skype-portable/issues/4#issuecomment-407733857){:target="_blank"}, [portapps/postman-portable#1](https://github.com/portapps/postman-portable/issues/1#issuecomment-378915884){:target="_blank"}