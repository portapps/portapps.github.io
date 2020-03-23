### Modifications

Here is what differs from the original release to ensure portability:

* Following switches are passed to the process.
  * `--user-data-dir=<data_path>`: Directory where the browser stores the user profile. `<data_path>` is dynamically generated at launch.
  * `--no-default-browser-check`: Stops {{ include.app.label }} from checking if it is the default browser at startup.
  * `--disable-logging`: Force logging to be disabled.
  * `--disable-breakpad`: Disables the crash reporting.
  * `--disable-machine-id`: Allows disabling the machine ID generation on Windows.
  * `--disable-encryption-win`: Allows disabling encryption on Windows for cookies, passwords, settings...

`--disable-machine-id` and `--disable-encryption-win` have been specially crafted to ensure portability. This means that passwords, cookies and other settings will not be encrypted on your hard drive. It is therefore advisable to have this data on an encrypted hard disk. For more info see [Eloston/ungoogled-chromium#444](https://github.com/Eloston/ungoogled-chromium/issues/444) and [Eloston/ungoogled-chromium#591](https://github.com/Eloston/ungoogled-chromium/pull/591).

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  cleanup: true
</code></pre></div></div>

* `cleanup` : Cleanup leftover folders (default `false`)
