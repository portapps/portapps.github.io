### Modifications

Here is what differs from the original release to ensure portability :

* Electron `userData` path is forced to `data` folder path.
* Automatic update disabled

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  disable_delay: false
</code></pre></div></div>

* `disable_delay` : Disable delay on stratup (default `false`)
