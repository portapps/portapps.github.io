---
title: FAQ
permalink: /doc/faq/
sidebar: doc
---
{% include vars.html %}

* TOC
{:toc}

## Who is behind Portapps?

Hi, I'm [CrazyMax](https://crazymax.dev){:target="_blank"}. This project is self-funded and developed using my decade of experience building open source software.<br />
By [supporting me](https://www.patreon.com/{{ site.patreon }}){:target="_blank"}, you're not only sustaining this project, but rather all of [my open source projects](https://github.com/crazy-max){:target="_blank"}.

## How to be notified of new releases?

GitHub is the best way to receive notifications when a new version is released for your favorite application. First of all, have an account on [GitHub](https://github.com/), then go to the application repository by clicking on the GitHub logo on the app page and then click on Watch {% gemoji bell %} new releases on the repository. Here is an example for Firefox :

Go to [Firefox portable page]({{ var_seo_url | append: '/app/firefox-portable/' }}) and click on GitHub logo to access to the repository :

![](/img/faq/app-github-repository.png)

On GitHub choose **Watch releases only** :

![](/img/faq/github-watch-releases.png)

You can also **Star** {% gemoji star %} the repository to show your support {% gemoji heart %}

## How to trust your distributed binaries?

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

## How does it work?

Concerning the building process to make it "portapp", we are going to take Skype again as an example.

Everything is revealed on [Travis CI](https://travis-ci.com/portapps){:target="_blank"}. Here are the building steps :

* Install Golang, Java, ANT and NodeJS
* Load required libraries
  * ant-contrib
  * 7zip
  * [rcedit](https://github.com/electron/rcedit/){:target="_blank"} (to add icons to the final executable)
  * innoextract (to extract the original setup)
  * innosetup (to package the final portapp as a portable setup using innosetup)
  * upx (to compress the portapp executable)
  * hashmyfiles (to create checksums)
* Download the original setup from the official website
* Extract this setup
* Download go modules based on `go.mod` file
* "Go" generate (prepare versioning file for the final executable and rcedit resources)
* "Go" build (create the portapp executable)
* Compressing executable with UPX
* Load asar (tool to extract app.asar ; because Skype is based on Electron)
* [Replace paths in app.asar](https://github.com/portapps/skype-portable/blob/master/build.properties#L23-L28){:target="_blank"}
* Repackaging app.asar
* Create 7z portapp archive
* Create innosetup portapp setup
* Send artifacts to Github releases
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