> {% gemoji bulb %} Stable portable version of {{ include.app.label }} is available [here]({{ site.baseurl }}/app/discord-portable/)

### Modifications

Here is what differs from the original release to ensure portability :

* Electron `userData` path is forced to `data` folder path.
* Check for updates disabled (not for modules)
* A shortcut is created at launch to allow native notifications and removed when {{ include.app.label }} is closed

### BetterDiscord

{{ include.app.label }} portable is also compatible with [BetterDiscord](https://betterdiscord.net).<br />
Download the latest release of BetterDiscord, launch the setup wizard, choose the install location `discord-ptb-portable\app\app-x.x.x` and press `Install` :

<div class="language-text highlighter-rouge"><div class="highlight"><pre class="highlight"><code>Deleting old cached files
Deleting temp path
Downloading Resource: BetterDiscord.zip
Extracting BetterDiscord
node_modules doesn't exist, creating
Extracting app.asar
Moving BetterDiscord to resources\node_modules\
Spicing index
Writing index
Finished installation, verifying installation...
Finished installing BetterDiscord with 0 errors
</code></pre></div></div>