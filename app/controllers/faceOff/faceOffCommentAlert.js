var args = arguments[0] || {};
var uiHelper = require("uiHelper");
var navigation = require("navigation");
var FId = args.id;
var args = arguments[0] || {};
var alertText = args.alertText;
var faceOffTitle = args.faceOffTitle;
var requestorName = args.requestorName;
var profilePhoto = args.profilePhoto;
var alertTime = args.alertTime;
var alertsTab = navigation.getTabAlerts();
var userGuid = args.userGuid;
var broadcastId = args.broadcastId;


		
$.alertUserPhoto.image = profilePhoto;
$.lblUserName.text = requestorName;
$.lblAlertText.text = alertText;
$.lblFaceOffName.text = faceOffTitle;
$.lblTime.text = alertTime;


$.lblUserName.addEventListener('click', function () {
	uiHelper.showProfile(userGuid, alertsTab);
});
$.alertUserPhoto.addEventListener('click', function () {
	uiHelper.showProfile(userGuid, alertsTab);
});
$.lblFaceOffName.addEventListener('click', function () {
	uiHelper.showFaceOff(FId, alertsTab);
});