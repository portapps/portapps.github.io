### Modifications

Here is what differs from the original release to ensure portability :

* Following switches are passed to the process.
  * `-r<data_path>` : Sets the data path where mIRC saves mirc.ini as well as other files and data. `<data_path>` is dynamically generated at launch.
  * `-noreg` : Makes mIRC avoid use of the registry. This includes not adding irc:// and ircs:// link support.
