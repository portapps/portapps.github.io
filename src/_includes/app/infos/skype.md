### Modifications

Here is what differs from the original release to ensure portability :

* Following switches are passed to the process.
  * `--data-path=<data_path>` : Directory where user profile is stored. `<data_path>` is dynamically generated at launch.
* A shortcut is created at launch to allow native notifications and removed when {{ include.app.label }} is closed
* Data collector on `RtcPalVideoEtwSession` is stopped when {{ include.app.label }} is closed
