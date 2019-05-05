### Modifications

Some modifications have been made in this version of Waterfox through policies to ensure portability :

* **Disable updater** : Waterfox updates are turned off.
* **Don't check default browser** : Stops Waterfox from checking if it is the default browser at startup.
* **Profile**: Profile path is overrided to `data\profile` folder (see below).
* **Add-ons**: Disable compatibility checking
* **'Know your rights'**:  Don't show on first run
* **WhatsNew**: Don't show WhatsNew on first run after every update
* **Crash reporter**: Disabled

### Configuration

Waterfox portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  profile: default
  multiple_instances: false
  disable_telemetry: false
</code></pre></div></div>

* `profile` : Name of the profile created in `data\profile\<name>` (default `default`)
* `multiple_instances` : Allow multiple instances (default `false`)
* `disable_telemetry` : If enabled, telemetry is not uploaded (default `false`)
