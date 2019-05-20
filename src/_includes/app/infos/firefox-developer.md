> {% gemoji bulb %} [Standard]({{ site.baseurl }}/app/firefox-portable/) and [ESR (Extended Support Release)]({{ site.baseurl }}/app/firefox-esr-portable/) are also available

### Modifications

Some modifications have been made in this version of {{ include.app.label }} through policies to ensure portability :

* **Disable updater** : {{ include.app.label }} updates are turned off.
* **Don't check default browser** : Stops {{ include.app.label }} from checking if it is the default browser at startup.
* **Profile**: Profile path is overrided to `data\profile` folder (see below).

### Configuration

F{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  profile: default
  multiple_instances: false
  disable_telemetry: false
  disable_firefox_studies: false
</code></pre></div></div>

* `profile` : Name of the profile created in `data\profile\<name>` (default `default`)
* `multiple_instances` : Allow multiple instances (default `false`)
* `disable_telemetry` : If enabled, {{ include.app.label }} telemetry is not uploaded (default `false`)
* `disable_firefox_studies` : If enabled, {{ include.app.label }} will never run SHIELD studies or do Heartbeat surveys. (default `false`)
