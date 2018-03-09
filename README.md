
<a href="https://garson.co/en/"><h1 align="center">
  <img src="./logo.jpg"/><br>  
</h1></a>

<div align="center">
	<a href="https://play.google.com/store/apps/details?id=com.smallorder&amp;hl=ru"><img src="./assets/google-play.png" height=50px alt=""></a>
	<a href="https://itunes.apple.com/us/app/dgarson/id1247782976?mt=8"><img src="./assets/appstore.svg" height=50px alt=""></a>
</div>

___

* [About](#remote-food-order)
* [Start to use](#start-to-use-dgarson)
* [Deploying](#deploying)
* [Problems](#problems)
* [Support](#support-dgarson)
* [Change Log](#change-log)
* [Contributing](#change-log)
* [Created by](#change-log)

# **Remote food order**

**Client**

Project dGarson helps meet a hungry person and a cook who wants to feed him without the participation of third parties. The client simply walking on the street or being in the office using a mobile application can find a cafe nearby, order food, choose time when he wants to pick up an order, and online to find out the status of his order without spending time in the queue. Thanks to the Push Notification technology.   When order status is redy client go to the cafe and receives his order.

**Cafe**

For a cafe you need to register and get access to the admin area. After this you will receive orders online and you simply transfer them to the kitchen. Where the chef changes the status of the order. Please watch video below.

**For you my dear reader**

For the development of business ideas. You can add to the order menu the delivery. Where the customer enters his address and time of delivery. Also you will need to connect SMS service and sign contract with the сourier service or taxi service  in your city. When the order comes from the client, the server sends sms to the courier service and they deliver the order. Good luck!

# **Start to use dGarson**

[![](https://img.youtube.com/vi/zBIbe6KM9ZA/0.jpg)](https://www.youtube.com/watch?v=zBIbe6KM9ZA)

You can independently test the application in action. 
Download the application from [PlayMarket](https://play.google.com/store/apps/details?id=com.smallorder&amp;hl=ru) or [AppStore](https://itunes.apple.com/us/app/dgarson/id1247782976?mt=8). 

Then install it and go through simple registration using `any phone number` and confirmation code (`9999`). Note this path will test the application in `test mode`. 

Real institutions will `not accept your orders`.

 After successful registration you get to the list of available companies. For convenience institutions you should visit the resource https://app.garson.co/ (login: `admin@admin.com`; password: `secret`) and log in to the test account with administrator rights. After these steps, you can use the application according to the [video](https://www.youtube.com/watch?v=zBIbe6KM9ZA).

**`Please pay attention to the possibility of using the application in the test mode simultaneously by several users. This can lead to unexpected orders or changes in the menu of institutions.`**

*`Also, in order to avoid the possibility of downloading obscene content, each uploaded photo (to a menu component or an institution) will be replaced by a similar one from our database.`*

**For greater responsiveness of the application every day at 0:00 AM TCB database is completely cleared**

**Visit:** The [Acropolium website](https://acropolium.com/) and follow on:<br />
* [Facebook](https://www.facebook.com/acrornd)
* [LinkedIn](https://www.linkedin.com/company/acropolium)
* [Xing](https://www.xing.com/companies/acropolium)
* [Twitter](https://twitter.com/acropolium)


# **Deploying**
### **Installing dependencies**
You will need Node, the React Native command line interface, Python2, a JDK, and Android Studio.

While you can use any editor of your choice to develop your app, you will need to install Android Studio in order to set up the necessary tooling to build your React Native app for Android.

### **Node**

#### Linux
Follow the [installation instructions for your Linux](https://nodejs.org/en/download/package-manager/) distribution to install Node 6 or newer.
#### MacOS
We recommend installing Node and Watchman using [Homebrew](http://brew.sh/). Run the following commands in a Terminal after installing Homebrew:

    brew install node
    brew install watchman
#### Windows
We recommend installing Node and Python2 via  [Chocolatey](https://chocolatey.org), a popular package manager for Windows. 

choco install -y nodejs.install python2 jdk8

React Native also requires a recent version of the [Java SE Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html), as well as Python 2. Both can be installed using Chocolatey.

### **The React Native CLI**
Node comes with npm, which lets you install the React Native command line interface.

Run the following command in a Command Prompt or shell:

    npm install -g react-native-cli

### **Android development environment**
Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

1. Install Android Studio
[Download and install Android Studio](https://developer.android.com/studio/index.html). Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked:
* Android SDK
* Android SDK Platform
* Performance (Intel ® HAXM)
* Android Virtual Device

2. Install the Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the `Android 6.0 (Marshmallow)` SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

Then make sure the following items are all checked:

* Google APIs
* Android SDK Platform 23
* Intel x86 Atom_64 System Image
* Google APIs Intel x86 Atom_64 System Image

Look for and expand the "Android SDK Build-Tools" entry, then make sure that `23.0.1` is selected.

3. Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your $HOME/.bash_profile config file:

export ANDROID_HOME=$HOME/Android/Sdk<br>
export PATH=$PATH:$ANDROID_HOME/tools<br>
export PATH=$PATH:$ANDROID_HOME/platform-tools

`Add path to SDK in to Environment Variables`

### **Create GoogleFirebase project**

https://console.firebase.google.com/  Enter name of the project. And push button add project. 
When you do this you must choose "Notifications" in menu.<br>

* Android

Click Android icon.Enter package name "com.dgarson". Push button "Register app"  and follow the instructions.Step three you are missing. 

* IOS

Click Android icon.Enter package name "com.dgarson". Push button "Register app"  and follow the instructions.

### **Receive android geo ApiKey**

* Android/ IOS

https://developers.google.com/maps/documentation/android-api/signup?hl=en  And push button "Get a Key". Choose your project and click "next". After that you may copy key and go to file "$_PROJECT_DIR/android/app/src/main/AndroidManifest.xml" go to string 48 "android:value="{your android.geo.API_KEY}"/>" and paste your key. 





### **Receive fabric ApiKey**

* Android/ IOS

Registration fabric https://fabric.io/kits?show_signup=true&utm_campaign=fabric-marketing&utm_medium=natural and follow the instructions. After install plugin and restart AndroidStudio go to fabric menu in the upper left part of the screen your AndroidStudio.Create App. After this go to https://www.fabric.io/settings/organizations choose your app copy key  go to file "$_PROJECT_DIR/android/app/src/main/AndroidManifest.xml" to string 44 "android:value="{your io.fabric.ApiKey}"" and paste your key. 



### **Install project dependencies**
When you complete all the steps described above run the command  "cd $_PROJECT_DIR/android" next "./gradlew clean" if successful, "cd .." and run the command "npm install" or "npm install" only (for IOS)

## **Problems**

#### **`We wont recomend use Cocoapods for IOS. Link dependencies manually.`** 

* "failed to find target with hash string 'android-23' in:...."

### solution ###

Go to the menu Tools in your AndroidStudio  Android->SDK-Manager->SDKPlatforms and install AndroidSDKPlatform 23. "cd $_PROJECT_DIR/android" ./gradlew clean

* "failed to find target with hash string 'android-25' in:...."

### solution ###

Go to the menu Tools in your AndroidStudio  Android->SDK-Manager->SDKPlatforms and install AndroidSDKPlatform 25."cd $_PROJECT_DIR/android" ./gradlew clean

* "A problem occurred configuring project ':app'.
 A problem occurred configuring project ':react-native-fcm'.
    failed to find Build Tools revision 25.0.2
"
### solution ###

Go to the menu Tools in your AndroidStudio  Android->SDK-Manager->SDKTools and install  AndroidSDKBuildTools 25.0.2."cd $_PROJECT_DIR/android" ./gradlew clean

* A problem occurred configuring project ':app'.
 A problem occurred configuring project ':react-native-vector-icons'.
   failed to find Build Tools revision 26.0.1

### solution ###

Go to the menu Tools in your AndroidStudio  Android->SDK-Manager->SDKTools and install  AndroidSDKBuildTools 26.0.1."cd $_PROJECT_DIR/android" ./gradlew clean




# **Support dGarson**

### Project structure

Open the folder "$_PROJECT_DIR/src".

* Folder "services" described classe access to the state store and access to external services. If you want something to add or change in the logic of the project, please do it here. 
* Folder "helpers" contains module for working with FCM and platform. 
* Folder "media" contains images for project. 
* Folder "components"  сontains a nested structure of components. If you want to add or change a component please follow our structure.
* Folder "realm" contains classes work with Realm DB.
* Folder "translations" contains constants. If you want to add support for additional languages, expand this module. 
* Folders "reducers" and "store" content modules for FLUX technology.

### Background img

You can modify or add your own img in the folder "$_PROJECT_DIR/android/app/src/main/res".

### Fonts

You can modify or add your own fonts in the folder "$_PROJECT_DIR/android/app/src/main/assets/fonts".

### Custom Styles

You can modify or add your own styles in the folder "$_PROJECT_DIR/src/styles/".



# **Change Log**

## Version 1.0.0 - Lemon Tart - 23th February 2018

### Updates

* We are using new version react-native (0.52).
* Also we optimized the code. What about the code? Our team took care of the extensibility and easy support. 
* We have implemented nesting of components for ease of understanding of the application. 
* Also you can easily implement your components thanks to compact rendering methods.
* We take care of using the latest version of FCM.
* Also our team optimized structure of data storage.


### Bug Fixes

* When viewing the location of a cafe, automatic scale-up is fixed.

# **Contributiіng**

Found a bug? Report it on GitHub Issues and include a code sample. Please state which version of React/ReactNative you are using! This is vitally important.

Written something cool in d'Garson? Please tell us about it in the  email support@dgarson.com

# **Created by**

<div align='center'>d'Garson is a <a href="https://acropolium.com/">Acropolium</a> production.</div><BR/>

<div align='center'> 
<p>
 <a href="https://acropolium.com/">
<img src="./assets/company-logo.svg" alt="Acropolium" ></div>
</a>
</p>
<div align='center'>Created by <a href="https://acropolium.com/">Acropolium command</a>.</div>


<div align='center'>All rights reserved.</div>


