### Dependencies

Before using {{ include.app.label }} portable you have to install the TAP driver. The setup file is located in `app\tap-windows.exe`.

### Modifications

Here is what differs from the original release to ensure portability :

* Following switches are passed to the process.
  * `--exe_path <app_path>bin/openvpn.exe` : Path to openvpn.exe
  * `--config_dir <data_path>/config` : Path to configuration files
  * `--ext_string ovpn` : Configuration files extension
  * `--log_dir <data_path>/log` : Log path
  * `--priority_string NORMAL_PRIORITY_CLASS` : Priority value
  * `--append_string 0` : Truncate log file on connection
* Registry key `HKLM\SOFTWARE\OpenVPN` is imported and exported (`reg` folder) at runtime
