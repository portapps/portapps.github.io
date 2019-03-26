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
<br />{{ include.app.desc }}

| **Latest version**   | {{ include.app.releases[0].version }} |
| **Internal release** | {{ include.app.releases[0].release }} |
| **Last updated**     | {{ include.app.releases[0].date }} |
| **Links**            | [<i class="fa fa-github fa-lg" aria-hidden="true" style="color:#4078C0" data-toggle="tooltip" data-placement="top" title="GitHub repository"></i>](https://github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}){:target="_blank"} [<i class="fa fa-bug fa-lg" aria-hidden="true" style="color:#d9534f" data-toggle="tooltip" data-placement="top" title="Bug tracker"></i>](https://github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}/issues){:target="_blank"} [<i class="fa fa-rss fa-lg" aria-hidden="true" style="color:orange" data-toggle="tooltip" data-placement="top" title="RSS feed"></i>](feed.xml){:target="_blank"} |
| **Maintainer**       | [{{ include.app.maintainer.name }}]({{ include.app.maintainer.url }}){:target="_blank"} |
| **Homepage**         | [{{ include.app.homepage }}]({{ include.app.homepage }}){:target="_blank"} |
| **License**          | [{{ include.license.name }}]({{ include.license.link }}){:target="_blank"} |
| **Changelog**        | [CHANGELOG.md](https://github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}/blob/master/CHANGELOG.md){:target="_blank"} |

## Installation

### Fresh installation

Download and install the [latest portable setup](#download) where you want then run `{{ include.app.name }}-portable.exe`.

### App already installed

If **you have already installed {{ include.app.label }} from the original setup**, do the same thing as a fresh installation and move files :
{% for move in include.app.move %}
* `{{ move.from }}` to `{{ move.to }}`{% endfor %}

Run `{{ include.app.name }}-portable.exe` and then you can [remove](https://support.microsoft.com/en-us/instantanswers/ce7ba88b-4e95-4354-b807-35732db36c4d/repair-or-remove-programs){:target="_blank"} {{ include.app.label }} from your computer.

### Upgrade

**For an upgrade**, simply download and install the [latest portable setup](#download).

## Infos

{% for win in include.app.wincompat %}![](/img/wincompat/{{ win }}.png) {% endfor %}

{% include app/infos/{{ include.app.name }}.md %}

## Download

{% endmarkdown %}<span></span></div>

{% include app/download-list.html app=include.app %}
