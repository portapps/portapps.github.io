---
title: Configuration
permalink: /doc/configuration/
sidebar: doc
---
{% include vars.html %}

## About

Each portable application can be configured through a simple [YAML](https://en.wikipedia.org/wiki/YAML){:target="_blank"} configuration file named `[appname]-portable.yml`.

This file is generated at first launch as a sample file named `[appname]-portable.sample.yml`. Rename this file `[appname]-portable.yml` and it would be used at runtime. It contains all the fields available to configure the application. Here is an example with [Firefox](/app/firefox-portable/) :

![](/img/faq/sample-configuration-file.png)

```yml
common:
  args: []
  env: {}
app:
  profile: default
  multiple_instances: false
  disable_telemetry: false
  disable_firefox_studies: false
```

Two main fields are to be taken into account :

### Common

This field is _common_ for all applications available in the Portapps catalogue.

* **args** : Pass additional arguments to the process.
* **env** : Add environment variables as an map. Placeholders for values can be used and will be replaced with the relevant data :
  * **@ROOT_PATH@** : Root path of the portable app
  * **@APP_PATH@** : Application binaries path
  * **@DATA_PATH@** : Data path
  * **@DRIVE_LETTER@** : Current drive letter

Here is an example :

```yml
common:
  args:
    - --debug
    - --key=value
  env:
    ENV_VAR_KEY: env_var_value
    ANOTHER: true
    A_PLACEHOLDER: "@ROOT_PATH@\\subfolder"
```

### App

This field is specific to each application and does not exist by default. It's up to the developer to set up the configuration.

```yml
app:
  ...
```