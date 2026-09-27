## First-run setup

Start Android Studio with `android-studio-portable.exe`. In the setup wizard,
choose **Custom** and set the Android SDK location to the `data\sdk` directory
inside the portable installation. The wizard's **Standard** setup can choose
`%LOCALAPPDATA%\Android\Sdk` even when the portable launcher sets `ANDROID_HOME`.

If you already installed the SDK outside the portable installation, copy it to
`data\sdk` and select that location in Android Studio's SDK Manager. Projects
are saved wherever you choose when creating them.

## Configuring JVM options

You can control [Android Studio JVM options](https://developer.android.com/studio/intro/studio-config#customize_vm){:target="_blank"}
in `data\studio.vmoptions` file. If this file does not exist, it will be created
at first launch.
