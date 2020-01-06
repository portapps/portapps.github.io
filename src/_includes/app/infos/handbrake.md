### Modifications

`portable.ini` file is embedded to ensure portability with the following content :

```ini
storage.dir = ../data/storage
tmp.dir = ../data/tmp
update.check = false
```

### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  cleanup: true
</code></pre></div></div>

* `cleanup` : Cleanup leftover folders (default `false`)
