### Modifications

Here is what differs from the original release to ensure portability :

* Following switches are passed to the process.
  * `-PATH:<app_path>` : Path to application folder
  * `-DATADIR:<data_path>` : Path to data folder
* Registry key `HKCU\Software\HLSW` is imported and exported (`reg` folder) at runtime
