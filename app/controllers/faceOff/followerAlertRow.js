var args = arguments[0] || {};
var navigation = require("navigation");
var uiHelper = require("uiHelper");
var egomadnessApi =  require('egoapiclient');
var alertText = args.alertText;
var userName = args.userName;
var userPhoto = args.userPhoto;
var userGuid = args.userGuid;
var alertTime = args.alertTime;
var alertsTab = navigation.getTabAlerts();


$.alertUserPhoto.image =  egomadnessApi.getMediaUrl(userPhoto);
$.lblUserName.text = userName;
$.lblAlertText.text = alertText;
$.lblTime.text = alertTime;

$.lblUserName.addEventListener('click', function () {
	uiHelper.showProfile(userGuid, alertsTab);
});
$.alertUserPhoto.addEventListener('click', function () {
	uiHelper.showProfile(userGuid, alertsTab);
});
