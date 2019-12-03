### Modifications

Here is what differs from the original release to ensure portability:

* Following switches are passed to the process.
  * `--user-data-dir=<data_path>` : Directory where the Electron stores the user data. `<data_path>` is dynamically generated at launch.
* Check for updates disabled

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  disable_delay: false
</code></pre></div></div>

* `disable_delay` : Disable delay on startup (default `false`)
