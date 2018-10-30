Simple User Authentication Plugin for Cordova
==============================================

Plugin for Cordova (or PhoneGap) 3.0+ to enable user login,registration.

How does it work?
-----------------

This plugin enables developers to check auth and allow users to signup/signin.

If you find that the plugin doesn't work as you might like on a specific device or Android configuration you're using, don't forget that this project is open source, so feel free to fork the project and adapt it to work in any way you like!

Installation
------------

**Cordova**

`cordova plugin add https://github.com/shuhailshuvo/cordova-plugin-SimpleLogin.git`

**PhoneGap**

`phonegap local plugin add https://github.com/shuhailshuvo/cordova-plugin-SimpleLogin.git`

Code example
------------

Using the plugin in your app:

```js
// Display signup form
SimpleLogin.signUp(1);

// Display signip form
SimpleLogin.signUp(1);

// Display Password reset form
SimpleLogin.resetPassword(1);
``

Check the example for more facts.
