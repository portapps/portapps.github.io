### Modifications

Here is what differs from the original release to ensure portability :

* Following switches are passed to the process.
  * `--user-data-dir=<data_path>` : Directory where the Electron stores the user data. `<data_path>` is dynamically generated at launch.
* Check for updates disabled
