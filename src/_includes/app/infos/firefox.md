> {% gemoji bulb %} Firefox [ESR (Extended Support Release)]({{ site.baseurl }}/app/firefox-esr-portable/) and [Developer Edition]({{ site.baseurl }}/app/firefox-developer-portable/) are also available

### Modifications

Some modifications have been made in this version of Firefox through policies to ensure portability :

* **Disable updater** : Firefox updates are turned off.
* **Don't check default browser** : Stops Firefox from checking if it is the default browser at startup.
* **Profile**: Profile path is overrided to `data\profile` folder (see below).

### Configuration

Firefox portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  profile: default
  multiple_instances: false
  disable_telemetry: false
  disable_firefox_studies: false
</code></pre></div></div>

* `profile` : Name of the profile created in `data\profile\<name>` (default `default`)
* `multiple_instances` : Allow multiple instances (default `false`)
* `disable_telemetry` : If enabled, Firefox telemetry is not uploaded (default `false`)
* `disable_firefox_studies` : If enabled, Firefox will never run SHIELD studies or do Heartbeat surveys. (default `false`)
