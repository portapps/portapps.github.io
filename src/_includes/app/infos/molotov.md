### Modifications

Here is what differs from the original release to ensure portability :

* Electron `userData` path is forced to `data` folder path.
* Check for updates disabled

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  cleanup: true
</code></pre></div></div>

* `cleanup` : Cleanup leftover folders (default `false`)
