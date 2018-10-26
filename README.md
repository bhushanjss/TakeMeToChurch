# TakeMeToChurch

#yarn add eslint-config-rallycoding firebase lodash react-native-datepicker react-native-elements react-native-router-flux react-native-vector-icons react-redux redux redux-thunk

#run command
#react-native link react-native-vector-icons

#Facebook OAuth Settings
`Using react-native-facebook-login
pod install
https://github.com/magus/react-native-facebook-login#setup
	Follow Facebook setting till step 4 https://developers.facebook.com/docs/facebook-login/ios 
set "Allow Non-modular Includes in Framework Modules" to YES `

#react-native-image-picker
`In the XCode's "Project navigator", right click on your project's Libraries folder ➜ Add Files to <...>
Go to node_modules ➜ react-native-image-picker ➜ ios ➜ select RNImagePicker.xcodeproj
Add RNImagePicker.a to Build Phases -> Link Binary With Libraries
For iOS 10+, Add the NSPhotoLibraryUsageDescription, NSCameraUsageDescription, and NSMicrophoneUsageDescription (if allowing video) keys to your Info.plist with strings describing why your app needs these permissions. `
