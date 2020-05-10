> {% gemoji warning %} Following a trademark violation report ([#11](https://github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}/issues/11){:target="_blank"}) from Mozilla, Firefox portable has been named Phyrox portable on Portapps. Nothing changes except its name.

> {% gemoji bulb %} [ESR (Extended Support Release)]({{ site.baseurl }}/app/phyrox-esr-portable/) and [Developer Edition]({{ site.baseurl }}/app/phyrox-developer-portable/) are also available

### Modifications

Some modifications have been made through policies to ensure portability:

* **Multilingual** : All languages are included in `app\langs` and can be enabled in config file (see below).
* **Disable updater** : Firefox updates are turned off.
* **Don't check default browser** : Stops Firefox from checking if it is the default browser at startup.
* **'Know your rights'**:  Don't show on first run.
* **WhatsNew**: Don't show WhatsNew on first run after every update.
* **Profile**: Profile path is overrided to `data\profile` folder (see below).
* A shortcut is created at launch to allow native notifications and removed when Firefox is closed

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/):

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  profile: default
  multiple_instances: false
  locale: en-US
  cleanup: false
</code></pre></div></div>

* `profile` : Name of the profile created in `data\profile\<name>` (default `default`)
* `multiple_instances` : Allow multiple instances (default `false`)
* `locale` : Locale located in `app\langs` can be used to change UI language without `.xpi` extension (default `en-US`).
* `cleanup` : Cleanup leftover folders (default `false`)

### Policies

You can use [custom policies](https://support.mozilla.org/en-US/kb/customizing-firefox-using-policiesjson) by creating `data/policies.json` file like this one:

```json
{
  "policies": {
    "DisableFirefoxStudies": true,
    "DisableTelemetry": true
  }
}
```

> `DisableAppUpdate` and `DontCheckDefaultBrowser` are forced to `true`.
