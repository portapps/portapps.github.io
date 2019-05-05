{% include callout.html type="warning" text="This portapp is a self-extracting package and does not launch anything." %}

### Configuration

GnuPG portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  silent: false
</code></pre></div></div>

* `silent` : If true, change `GNUPGHOME` environment variable to `data\.gnupg` silently on your computer and refresh your environment (default `false`)

### Modifications

Nothing differs except everything is packaged as self-extracting files through the portable setup or 7z archive.
