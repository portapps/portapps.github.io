{% include vars.html %}

<p align="center">
  <a href="https://github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}"><img src="https://img.shields.io/github/stars/{{ include.app.github.user }}/{{ include.app.github.repo }}.svg?style=flat-quare&label=Stars" alt="GitHub Stars"></a>
  <a href="#download"><img src="https://img.shields.io/github/release/{{ include.app.github.user }}/{{ include.app.github.repo }}.svg" alt="Latest release"></a>
  <a href="#download"><img src="https://img.shields.io/github/downloads/{{ include.app.github.user }}/{{ include.app.github.repo }}/total.svg" alt="Total downloads"></a>
  <a href="https://goreportcard.com/report/github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}"><img src="https://goreportcard.com/badge/github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}" alt="Go Report"></a>
</p>

<div class="markdown-body">{% markdown %}

* [About](#about)
* [Installation](#installation)
* [Infos](#infos)
* [Download](#download)
* [All releases](#all-releases)

## About

[{{ include.app.label }}]({{ include.app.homepage }}){:target="_blank"} portable app made with {% gemoji rocket %} **Portapps**.
<br />{{ include.app.desc | capitalize }}

| **Latest version**   | {{ include.app.releases[0].version }} |
| **Internal release** | {{ include.app.releases[0].release }} |
| **Last updated**     | {{ include.app.releases[0].date }} |
| **Links**            | [<i class="fa fa-github fa-lg" aria-hidden="true" style="color:#4078C0"></i>](https://github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}){:target="_blank"} [<i class="fa fa-bug fa-lg" aria-hidden="true" style="color:#d9534f"></i>](https://github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}/issues){:target="_blank"} [<i class="fa fa-rss fa-lg" aria-hidden="true" style="color:orange"></i>](feed.xml){:target="_blank"} |
| **Maintainer**       | [{{ include.app.maintainer.name }}]({{ include.app.maintainer.url }}){:target="_blank"} |
| **Homepage**         | [{{ include.app.homepage }}]({{ include.app.homepage }}){:target="_blank"} |
| **Changelog**        | [CHANGELOG.md](https://github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}/blob/master/CHANGELOG.md){:target="_blank"} |

## Installation

### Fresh installation

Download and install the [latest portable setup](#portable-setup) where you want then run `{{ include.app.name }}-portable.exe`.

### App already installed

If **you have already installed {{ include.app.label }} from the original setup**, do the same thing as a fresh installation and move files :
{% for move in include.app.move %}
* `{{ move.from }}` to `{{ move.to }}`{% endfor %}

Run `{{ include.app.name }}-portable.exe` and then you can [remove](https://support.microsoft.com/en-us/instantanswers/ce7ba88b-4e95-4354-b807-35732db36c4d/repair-or-remove-programs){:target="_blank"} {{ include.app.label }} from your computer.

### Upgrade

**For an upgrade**, simply download and install the [latest portable setup](#portable-setup).

## Infos

{% include app/infos/{{ include.app.name }}.md %}

## Download

{% endmarkdown %}<span></span></div>

<div class="markdown-body">
  <h3 id="portable-setup">Portable setup</h3>
  <p>Full portable release of {{ include.app.label }} as a portable setup. <strong>Recommended way!</strong></p>
  <span></span>
</div>
<p>
  {% for platform in include.app.releases[0].platforms %}{% capture platform_color %}{% if platform == 'win32' or platform == 'ia32' %}btn-warning{% else %}btn-success{% endif %}{% endcapture %}{% capture platform_version %}{% if platform != '' %}{{ platform }}-{% endif %}{{ include.app.releases[0].version }}-{{ include.app.releases[0].release }}{% endcapture %}
  <a href="{{ site.baseurl }}/download/{{ include.app.name }}-portable-{{ platform_version }}-setup.exe" class="btn {{ platform_color }}" style="text-align: left">
    <span class="fa fa-download"></span>&nbsp;&nbsp;{{ include.app.label }} portable {{ platform }} (setup)
    <br /><small>{{ include.app.name }}-portable-{{ platform_version }}-setup.exe</small>
  </a>{% endfor %}
</p>

{% for format in include.app.releases[0].formats %}

{% if format == '7z' %}
<div class="markdown-body">
  <h3 id="portable-7z">7z archive</h3>
  <p>Full portable release of {{ include.app.label }} as a 7z archive.</p>
  <span></span>
</div>
<p>
  {% for platform in include.app.releases[0].platforms %}{% capture platform_color %}{% if platform == 'win32' or platform == 'ia32' %}btn-warning{% else %}btn-success{% endif %}{% endcapture %}{% capture platform_version %}{% if platform != '' %}{{ platform }}-{% endif %}{{ include.app.releases[0].version }}-{{ include.app.releases[0].release }}{% endcapture %}
  <a href="{{ site.baseurl }}/download/{{ include.app.name }}-portable-{{ platform_version }}.7z" class="btn {{ platform_color }}" style="text-align: left">
    <span class="fa fa-download"></span>&nbsp;&nbsp;{{ include.app.label }} portable {{ platform }} (7z)
    <br /><small>{{ include.app.name }}-portable-{{ platform_version }}.7z</small>
  </a>
  {% endfor %}
</p>
{% endif %}

{% if format == 'zip' %}
<div class="markdown-body">
  <h3 id="portable-zip">zip archive</h3>
  <p>Full portable release of {{ include.app.label }} as a zip archive.</p>
  <span></span>
</div>
<p>
  {% for platform in include.app.releases[0].platforms %}{% capture platform_color %}{% if platform == 'win32' or platform == 'ia32' %}btn-warning{% else %}btn-success{% endif %}{% endcapture %}{% capture platform_version %}{% if platform != '' %}{{ platform }}-{% endif %}{{ include.app.releases[0].version }}-{{ include.app.releases[0].release }}{% endcapture %}
  <a href="{{ site.baseurl }}/download/{{ include.app.name }}-portable-{{ platform_version }}.zip" class="btn {{ platform_color }}" style="text-align: left">
    <span class="fa fa-download"></span>&nbsp;&nbsp;{{ include.app.label }} portable {{ platform }} (zip)
    <br /><small>{{ include.app.name }}-portable-{{ platform_version }}.zip</small>
  </a>
  {% endfor %}
</p>
{% endif %}

{% endfor %}

<div class="markdown-body">{% markdown %}
## All releases

| Version | Date | Format | Platform | Download |
| ------- | ---- | ------ | -------- | -------- |{% for release in include.app.releases %}{% for format in release.formats %}{% for platform in release.platforms %}
| **{{ release.version }}-{{ release.release }}** | {{ release.date }} | {{ format }} | {{ platform }} | {% include app/download-link.html name=include.app.name version=release.version release=release.release format=format platform=platform %} |{% endfor %}{% endfor %}{% endfor %}

{% endmarkdown %}<span></span></div>