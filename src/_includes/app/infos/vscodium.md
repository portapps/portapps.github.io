### Modifications

Everything happens in [main.go](https://github.com/portapps/vscodium-portable/blob/master/main.go){:target="_blank"} and [build.xml](https://github.com/portapps/vscodium-portable/blob/master/build.xml){:target="_blank"} files during build and launch process. Here is what differs from the original release to ensure portability :

* `VSCODE_APPDATA` environment variable is overriden at launch and points to `data\appdata`
* `VSCODE_LOGS` environment variable is overriden at launch and points to `data\logs`
* `VSCODE_EXTENSIONS` environment variable is overriden at launch and points to `data\extensions`