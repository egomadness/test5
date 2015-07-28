var args = arguments[0] || {};
var navigation = require("navigation");
var uiHelper = require("uiHelper");

var alertText = args.alertText;
var faceOffId = args.faceOffId;
var faceOffTitle = args.faceOffTitle;
var alertTime = args.alertTime;
var alertsTab = navigation.getTabAlerts();

$.lblAlertText.text = alertText;
$.lblFaceOffName.text = faceOffTitle;
$.lblTime.text = alertTime;

$.lblFaceOffName.addEventListener('click', function () {
	uiHelper.showFaceOff(faceOffId, alertsTab);
});