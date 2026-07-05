> {% gemoji warning %} Following a trademark violation report ([#4](https://github.com/{{ include.app.github.user }}/{{ include.app.github.repo }}/issues/4){:target="_blank"}) from Mozilla, Thunderbird portable has been named Stormhen portable on Portapps. Nothing changes except its name.

### Modifications

Some modifications have been made through distribution preferences to ensure portability:

* **Multilingual** : All languages are included in `app/langs` and can be enabled in config file (see below).
* **Disable updater** : Thunderbird updates are turned off.
* **Don't check default mail client** : Stops Thunderbird from checking if it is the default mail client at startup.
* **Profile**: Profile path is overrided to `data\profile` folder.
* **Disable WinSearch integration**: Don't use Windows Search to search for emails.
* **Add-ons**: Thunderbird's modern extension handling is left intact.
* **'Know your rights'**:  Don't show on first run.
* **WhatsNew**: Don't show WhatsNew on first run after every update.
* **Crash reporter**: Disabled by default and configurable.
* **Calendar**: Official multilingual Calendar extension used to handle locales switching.
* **OpenPGP GnuPG**: Can use an external GnuPG home and `gpg.exe` path (see below).

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  cleanup: true
  multiple_instances: false
  disable_telemetry: false
  disable_crash_reporter: true
  gnupg_home: ""
  gnupg_path: ""
  locale: en-US
</code></pre></div></div>

* `cleanup` : Cleanup leftover folders (default `false`)
* `multiple_instances` : Allow multiple instances (default `false`).
* `disable_telemetry` : If enabled, telemetry is not uploaded (default `false`).
* `disable_crash_reporter` : If enabled, the crash reporter is disabled (default `true`).
* `gnupg_home` : Path to GnuPG home directory. If empty, the current `GNUPGHOME` environment variable is reused when available.
* `gnupg_path` : Path to GnuPG executable `gpg.exe`. If empty, Thunderbird keeps its default OpenPGP behavior.
* `locale` : Locale located in `app\langs` can be used to change UI language without `.xpi` extension (default `en-US`).
