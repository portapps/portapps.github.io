### Modifications

Here is what differs from the original release to ensure portability:

* `VSCODE_APPDATA` environment variable is overriden at launch and points to `data\appdata`
* `VSCODE_LOGS` environment variable is overriden at launch and points to `data\logs`
* `VSCODE_EXTENSIONS` environment variable is overriden at launch and points to `data\extensions`
* Check for updates disabled

### CLI

[Command Line Interface (CLI)](https://code.visualstudio.com/docs/editor/command-line) is available through `code` in the root folder.