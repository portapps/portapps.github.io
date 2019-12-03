> {% gemoji bulb %} PTB (Public Test Build) portable version of {{ include.app.label }} is available [here]({{ site.baseurl }}/app/discord-ptb-portable/)

### Modifications

Here is what differs from the original release to ensure portability :

* Electron `userData` path is forced to `data` folder path.
* Check for updates disabled (not for modules)
* A shortcut is created at launch to allow native notifications and removed when {{ include.app.label }} is closed
