### Dependencies

If you want to use HDMI CEC, you have to install the driver setup located in `app\cec\p8-usbcec-driver-installer.exe`.

### Modifications

Here is what differs from the original release to ensure portability :

* `ProgramDataPath` is forced to `data` folder.
* Disable installation of HDMI CEC driver at launch.
* Check for updates disabled.
