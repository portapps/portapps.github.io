### Dependencies

HandBrake portable requires the Microsoft .NET Desktop Runtime to be installed
on the computer. The runtime is not included in the portable package.

For HandBrake 1.10.2, install the [x64 .NET Desktop Runtime 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0/runtime){:target="_blank"}.

Other HandBrake versions may require a different runtime version; check the
[HandBrake release notes](https://github.com/HandBrake/HandBrake/releases){:target="_blank"}
for the version you downloaded.

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
