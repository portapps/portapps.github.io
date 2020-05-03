### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/:

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  cleanup: true
  verbose: 1
</code></pre></div></div>

* `cleanup`: Cleanup leftover folders (default `false`)
* `verbose`: The level of verbosity for log messages (default `1`)
