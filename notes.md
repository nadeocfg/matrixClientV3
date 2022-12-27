# Some notes for this project

## Commands for build Android apk

```
./gradlew clean
rm -rf ./android/app/src/main/res/drawable-*
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/
./gradlew assembleRelease
```

## For .aab format(less size than .apk)

```
./gradlew bundleRelease
```

## For correct work matrxi-js-sdk on React Native app:

### Libraries:

```
react-native-webrtc
@expo/browser-polyfill
expo-asset
expo-file-system
expo-modules-core
react-native-url-polyfill
```

### build.gradle:

```

  minSdkVersion = 24

  def jscFlavor = 'org.webkit:android-jsc-intl:+'

  android {

    ...

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
  }
```

### proguard-rules.pro:

```
  -keep class org.webrtc.** { *; }
```

### AndroidManifest.xml:

```
  <uses-feature android:name="android.hardware.camera" />
  <uses-feature android:name="android.hardware.camera.autofocus" />
  <uses-feature android:name="android.hardware.audio.output" />
  <uses-feature android:name="android.hardware.microphone" />

  <uses-permission android:name="android.permission.BLUETOOTH" android:maxSdkVersion="30" />
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" android:maxSdkVersion="30" />
  <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
  <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.INTERNET" />
```

Profile settings split Terms and Privacy
Create room design
