### Modifications

Some modifications have been made in this version of Thunderbird through distribution preferences to ensure portability :

* **Disable updater** : Thunderbird updates are turned off.
* **Don't check default mail client** : Stops Thunderbird from checking if it is the default mail client at startup.
* **Profile**: Profile path is overrided to `data\profile` folder.
* **Disable WinSearch integration**: Don't use Windows Search to search for emails.
* **Add-ons**: Disable compatibility checking.
* **'Know your rights'**:  Don't show on first run.
* **WhatsNew**: Don't show WhatsNew on first run after every update.
* **Crash reporter**: Disabled.
* **GnuPG Agent**: Automatically set GnuPG Agent path to be ready to use with [Enigmail](https://addons.thunderbird.net/en-US/thunderbird/addon/enigmail/) extension (see below).

### Configuration

Waterfox portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  multiple_instances: false
  disable_telemetry: false
  gnupg_agent_path: ""
</code></pre></div></div>

* `multiple_instances` : Allow multiple instances (default `false`)
* `disable_telemetry` : If enabled, telemetry is not uploaded (default `false`)
* `gnupg_agent_path` : Path to GnuPG agent `gpg.exe`. If empty, Portapps will search in `PATH` or will use the embedded version.
