var uiHelper = require("uiHelper");
var navigation = require("navigation");
var egomadnessApi = require("egoapiclient");
var dialogs = require('alloy/dialogs');
var tokenhelper = require('tokenhelper');
var navigation = require("navigation");
var accountGuid;



var logoutCallBack = function () {
	tokenhelper.removeToken();
	var index = Alloy.createController('index').getView();
	index.open();
};

var logout = function() {

	dialogs.confirm({title: "Log Out?", callback: logoutCallBack});
	
};

var showRemoveInstagram = function () {
	
	var ok = 200;
	var returnedClient = egomadnessApi.linkAccounts();
	returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok)
		{
			accountGuid = responseJson.AccountGuid;
			if(Boolean(responseJson.HasInstagram)) {
			
			$.btnRemoveInstagram.visible= true;
			}
			
    		
    		 			
		}
		else
		{
			egomadnessApi.showWebClientError(returnedClient);
			
		}
				
	};
	
	
    returnedClient.onerror = function(e){
    	
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
    
    
    returnedClient.send();

	
	
	
};

var removeInstagramCallBack = function() {
	
	var returnedClient = egomadnessApi.removeInstagram();
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
			if(Boolean(responseJson.Success) === true) {
			
				
			
			var home =  Alloy.createController('home', {moreMenu : true}).getView();
            home.open();
    	   
			}
		}
		else {
		
			egomadnessApi.showWebClientError(returnedClient);
			
		}
    };
	
	
	returnedClient.onerror = function(e){
    	
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
	
    returnedClient.send();
	
};

var btnRemoveInstagramClick = function() {
	
	dialogs.confirm({title: "Remove Instagram?", callback: removeInstagramCallBack});
};

var showMyProfile = function () {
	
	if(!_.isUndefined(accountGuid)) {
	uiHelper.showProfile(accountGuid, navigation.getTabMore());
	}
};
	

var addFollowers = function () {
	var moreTab = navigation.getTabMore();
	var addFollowersView = Alloy.createController("findFollowers", {tab:moreTab}).getView();
	moreTab.open(addFollowersView );
	
};

$.addFollower.addEventListener("click", addFollowers);


showRemoveInstagram();
$.btnRemoveInstagram.addEventListener('click', btnRemoveInstagramClick);
$.lblProfile.addEventListener("click", showMyProfile);
$.lblLogOut.addEventListener("click", logout);
