### Dependencies

Before using {{ include.app.label }} portable you have to install the following apps available in `app\deps\` on your computer :

* **Microsoft Visual C++ Redistributable Package** through `vcredist_x86.exe` or `vcredist_x86.exe` setup depending on your platform (required)
* **Npcap** which is required for packet capture (recommended)
* **USBPcap** for USB Packet capture (optional)

### Modifications

Here is what differs from the original release to ensure portability :

* Following environment variables are passed to the process.
  * `WIRESHARK_APPDATA=<data_path>`: Path to application data
