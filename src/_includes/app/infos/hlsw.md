### Dependencies

Before using {{ include.app.label }} portable you have to install the following dependencies on your computer:

* **Microsoft Visual C++ 2008 Redistributable Setup** available [here](https://www.microsoft.com/en-us/download/details.aspx?id=29){:target="_blank"}.

### Modifications

Here is what differs from the original release to ensure portability:

* Following switches are passed to the process.
  * `-PATH:<app_path>`: Path to application folder
  * `-DATADIR:<data_path>`: Path to data folder
* Registry key `HKCU\Software\HLSW` is imported and exported (`reg` folder) at runtime

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  cleanup: true
</code></pre></div></div>

* `cleanup`: Cleanup leftover registry key (default `false`)