### Modifications

Here is what differs from the original release to ensure portability :

* Java VM included
* Following switches are passed to the process.
  * `-data <data_path>` : Directory where DBeaver stores data. `<data_path>` is dynamically generated at launch.
  * `-vm <javavm_path>` : Use Java VM installed in this folder instead of default. `<javavm_path>` is dynamically generated at launch.
* Some core preferences located in `app\.metadata\.plugins\org.eclipse.core.runtime\.settings\org.jkiss.dbeaver.core.prefs` are also overriden :
  * `dialog.default.folder` : Default path for export output. Setted to `data\`.
  * `logs.debug.location` : Log debug file path. Setted to `data\.metadata\logs\dbeaver-debug.log`.
  * `qm.logDirectory` : QM log folder. Setted to `data\.metadata\logs\`.
  * `ui.auto.update.check` : Check for autoupdate. Setted to `false`.
  * `ui.drivers.home` : Downloaded drivers folder path. Setted to `data\.metadata\drivers\`.
