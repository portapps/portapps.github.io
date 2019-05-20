### Modifications

Here is what differs from the original release to ensure portability :

* Following environment variables are passed to the process.
  * `KITTY_INI_FILE=<data_path>\kitty.ini`: Path to configuration file
* Some configuration settings are overrided.
  * `savemod=dir`
  * `configdir=<data_path>\config`
* Registry settings are converted to dir mode in `data/config` if folder is empty.
