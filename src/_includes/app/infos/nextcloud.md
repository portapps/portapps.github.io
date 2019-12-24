### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  cleanup: true
</code></pre></div></div>

* `cleanup` : Cleanup leftover folders (default `false`)

### Add folder sync connection

When you choose what you want to synchronize from {{ include.app.label }} Desktop Client, be sure to enter the following path `..\data\storage\example` to make the content portable (replace `example` with a value of your choice) :

![](/img/app/nextcloud/localfolder.png)

![](/img/app/nextcloud/localfolder2.png)

Data will be stored here :

![](/img/app/nextcloud/localfolder3.png)