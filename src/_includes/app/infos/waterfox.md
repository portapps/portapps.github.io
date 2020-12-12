### Modifications

Some modifications have been made through policies to ensure portability:

* **Disable updater** : Waterfox updates are turned off.
* **Don't check default browser** : Stops Waterfox from checking if it is the default browser at startup.
* **'Know your rights'**:  Don't show on first run.
* **WhatsNew**: Don't show WhatsNew on first run after every update.
* **Profile**: Profile path is overrided to `data\profile` folder (see below).
* A shortcut is created at launch to allow native notifications and removed when Waterfox is closed

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
