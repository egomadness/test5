var args = arguments[0] || {};
var egomadnessApi =  require('egoapiclient');
var navigation = require("navigation");
var dialogs = require('alloy/dialogs');
var uiHelper = require("uiHelper");
var FId = args.id;
var args = arguments[0] || {};
var alertText = args.alertText;
var faceOffTitle = args.faceOffTitle;
var requestorName = args.requestorName;
var profilePhoto = args.profilePhoto;
var json = JSON.stringify({FaceOffId: FId}); 
var alertTime = args.alertTime;
var alertsTab = navigation.getTabAlerts();
var userGuid = args.userGuid;
var broadcastId = args.broadcastId;


		
$.alertUserPhoto.image = profilePhoto;
$.lblUserName.text = requestorName;
$.lblAlertText.text = alertText;
$.lblFaceOffName.text = faceOffTitle;
$.lblTime.text = alertTime;
alert(broadcastId);
var showBroadcast = function () {
	
	uiHelper.showBroadcast(broadcastId, alertsTab);
  	
	
};



var acceptFaceOff = function () {

var returnedClient = egomadnessApi.acceptFaceOff(json);
var ok = 200;

returnedClient.onload = function(e) {


 		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok && Boolean(responseJson.WasSuccessful)) {
						
			alert("The FaceOff will start now. You have a day to get as many votes as possible. Good Luck!");	
				var home =  Alloy.createController('home').getView();
    			home.open();		

		}
		else{
		
		egomadnessApi.showWebClientError(returnedClient);	
	
		}
};

returnedClient.onerror = function(e){

    egomadnessApi.showWebClientError(returnedClient);

};

returnedClient.send(json); 
	
	
};

var acceptClick = function() {

	dialogs.confirm({title: "Accept The Request?", callback: acceptFaceOff});
	
};

var rejectFaceOff = function () {


var returnedClient = egomadnessApi.rejectFaceOff(json);
var ok = 200;


returnedClient.onload = function(e) {


 		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok && Boolean(responseJson.WasSuccessful)) {
						
			alert("The FaceOff Request was rejected");	
				var home =  Alloy.createController('home').getView();
    			home.open();		

		}
		else{
		
		egomadnessApi.showWebClientError(returnedClient);	
	
		}
};

returnedClient.onerror = function(e){

    egomadnessApi.showWebClientError(returnedClient);

};

returnedClient.send(json); 
	
	
};


var rejectClick = function () {
	
	dialogs.confirm({title: "Reject The Request?", callback: rejectFaceOff});
};

$.lblUserName.addEventListener('click', function () {
	uiHelper.showProfile(userGuid, alertsTab);
});

$.alertUserPhoto.addEventListener('click', function () {
	uiHelper.showProfile(userGuid, alertsTab);
});
$.lblFaceOffName.addEventListener('click', showBroadcast);
$.btnAccept.addEventListener("click", acceptClick);
$.btnReject.addEventListener("click", rejectFaceOff);