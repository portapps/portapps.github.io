### Configuration

{{ include.app.label }} portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  cleanup: true
</code></pre></div></div>

* `cleanup` : Cleanup leftover folders (default `false`)

### Add folder sync connection

When you choose what you want to synchronize from {{ include.app.label }} Desktop
Client, be sure to enter the following path `..\data\storage\example` to make
the content portable (replace `example` with a value of your choice) :

![](/img/app/nextcloud/localfolder.png)

![](/img/app/nextcloud/localfolder2.png)

Data will be stored here :

![](/img/app/nextcloud/localfolder3.png)

### Launch on Windows startup

Nextcloud's **Launch on system startup** setting starts `app\nextcloud.exe` directly.
This bypasses the portable launcher and can make Nextcloud ask you to set up your
account again after a reboot.

To start the portable app when you sign in to Windows:

1. Finish setting up your account, then turn off **Launch on system startup** in Nextcloud's General settings.
2. Press `Win+R`, enter `shell:startup`, and press Enter.
3. Add a shortcut to `nextcloud-portable.exe` in that folder. Set its target to the full path of the launcher followed by `--background`, for example `"D:\NextcloudPortable\nextcloud-portable.exe" --background`.

Keep the portable app at the same path and make sure its drive is available when
you sign in. Update the shortcut if you move the app.
