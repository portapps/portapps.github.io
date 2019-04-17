### Modifications

Here is what differs from the original release to ensure portability :

* Following switches are passed to the process.
  * `--user-data-dir=<data_path>` : Directory where the browser stores the user profile. `<data_path>` is dynamically generated at launch.
  * `--disable-brave-update` : Disable automatic update to avoid regressions.
  * `--no-default-browser-check` : Stops Brave from checking if it is the default browser at startup.
  * `--allow-outdated-plugins` : Don't block outdated plugins.
  * `--disable-logging` : Force logging to be disabled.
  * `--disable-breakpad` : Disables the crash reporting.
  * `--disable-machine-id` : Allows disabling the machine ID generation on Windows.
  * `--disable-encryption-win` : Allows disabling encryption on Windows for cookies, passwords, settings...
* A shortcut is created at launch to allow native notifications and removed when Brave is closed

`--disable-machine-id` and `--disable-encryption-win` have been specially crafted to ensure portability. This means that passwords, cookies and other settings will not be encrypted on your hard drive. It is therefore advisable to have this data on an encrypted hard disk. For more info see [portapps/brave-portable#4](https://github.com/portapps/brave-portable/issues/4), [portapps/brave-portable#15](https://github.com/portapps/brave-portable/issues/15) and [brave/brave-core#795](https://github.com/brave/brave-core/pull/795).
