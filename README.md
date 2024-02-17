# bCounter

## Run in emulator
```
npm run android
```

## Build apk

```
cd android
./gradlew assembleDebug
```

Output: android\app\build\outputs\apk\debug\app-debug.apk

## Build aab

```
npx react-native build-android --mode=release
```

Output: android\app\build\outputs\bundle\release\app-release.aab