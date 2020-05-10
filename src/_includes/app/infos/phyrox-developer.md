> {% gemoji warning %} Following a trademark violation report ([#5](https://github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}/issues/5){:target="_blank"}) from Mozilla, Firefox Developer Edition portable has been named Phyrox Developer Edition portable on Portapps. Nothing changes except its name.

> {% gemoji bulb %} [Standard]({{ site.baseurl }}/app/phyrox-portable/) and [ESR (Extended Support Release)]({{ site.baseurl }}/app/phyrox-esr-portable/) are also available

### Modifications

Some modifications have been made through policies to ensure portability:

* **Disable updater** : Firefox Developer Edition updates are turned off.
* **Don't check default browser** : Stops Firefox Developer Edition from checking if it is the default browser at startup.
* **Profile**: Profile path is overrided to `data\profile` folder (see below).
* A shortcut is created at launch to allow native notifications and removed when Firefox is closed

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/):

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  profile: default
  multiple_instances: false
  cleanup: false
</code></pre></div></div>

* `profile` : Name of the profile created in `data\profile\<name>` (default `default`)
* `multiple_instances` : Allow multiple instances (default `false`)
* `cleanup` : Cleanup leftover folders (default `false`)

### Policies

You can use [custom policies](https://support.mozilla.org/en-US/kb/customizing-firefox-using-policiesjson) by creating `data/policies.json` file like this one:

<div class="language-json highlighter-rouge"><div class="highlight"><pre class="highlight"><code>{
  "policies": {
    "DisableFirefoxStudies": true,
    "DisableTelemetry": true
  }
}</code></pre></div></div>

> `DisableAppUpdate` and `DontCheckDefaultBrowser` are forced to `true`.
