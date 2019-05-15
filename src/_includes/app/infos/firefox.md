> {% gemoji bulb %} [ESR (Extended Support Release)]({{ site.baseurl }}/app/firefox-esr-portable/) and [Developer Edition]({{ site.baseurl }}/app/firefox-developer-portable/) are also available

### Modifications

Some modifications have been made in this version of {{ include.app.label }} through policies to ensure portability :

* **Disable updater** : {{ include.app.label }} updates are turned off.
* **Don't check default browser** : Stops {{ include.app.label }} from checking if it is the default browser at startup.
* **Profile**: Profile path is overrided to `data\profile` folder (see below).

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

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

### How to change the interface to a different language ?

The release used for {{ include.app.label }} is the English one. If you want to change the interface to a different language you have to download and install your preferred language pack through {{ include.app.label }} settings :

![](/img/app/firefox/firefox-change-lang-01.png)

Choose an alternative language by clicking on **Set Alternatives...** :

![](/img/app/firefox/firefox-change-lang-02.png)

Choose your preferred languages :

![](/img/app/firefox/firefox-change-lang-03.png)

And click **Add** :

![](/img/app/firefox/firefox-change-lang-04.png)

Now restart {{ include.app.label }}.