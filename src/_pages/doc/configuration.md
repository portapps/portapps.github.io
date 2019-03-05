---
title: Configuration
permalink: /doc/configuration/
sidebar: doc
---
{% include vars.html %}

## About

Each portable application can be configured through a simple [YAML](https://en.wikipedia.org/wiki/YAML){:target="_blank"} configuration file named `<appname>-portable.yml`.

This file is generated at first launch as a sample file named `<appname>-portable.sample.yml`. Rename this file `<appname>-portable.yml` and it would be used at runtime. It contains all the fields available to configure the application. Here is an example with [Firefox](/app/firefox-portable/) :

![](/img/faq/sample-configuration-file.png)

```yml
common:
  args: []
app:
  profile: default
  multiple_instances: false
  disable_telemetry: false
  disable_firefox_studies: false
```

Two main fields are to be taken into account :

### Common

This field is _common_ for all applications available in the Portapps catalogue :

```yml
common:
  args: []
```

* **args** : Pass additional arguments to the process

### App

This field is specific to each application and does not exist by default. It's up to the developer to set up the configuration.

```yml
app:
  ...
```