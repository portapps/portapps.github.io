### Modifications

Here is what differs from the original release to ensure portability :

* `VSCODE_APPDATA` environment variable is overriden at launch and points to `data\appdata`
* `VSCODE_LOGS` environment variable is overriden at launch and points to `data\logs`
* `VSCODE_EXTENSIONS` environment variable is overriden at launch and points to `data\extensions`
* Check for updates disabled

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  cleanup: true
</code></pre></div></div>

* `cleanup` : Cleanup leftover folders (default `false`)
