// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


//5 = 320 5s = 320 6=375 6+ = 414
var getDevice = function () {

var deviceWidth = Ti.Platform.displayCaps.platformWidth;
var OS = Ti.Platform.osname;
if(deviceWidth === 320 && OS =='iphone' )
{
	return "Iphone5";
}	

if(deviceWidth === 375 && OS =='iphone' )
{
	return "Iphone6";
}

if(deviceWidth === 414 && OS =='iphone' )
{
	return "Iphone6plus";
}		
	
return "unknown";	
	
};

var device = getDevice();

Alloy.Globals.Device = device;
Alloy.Globals.isIphone5 = device == "Iphone5";
Alloy.Globals.isIphone6 = device == "Iphone6";
Alloy.Globals.isIphone6plus = device == "Iphone6plus";
Alloy.Globals.isUnknownDevice = device =="unknown"; 







