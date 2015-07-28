var args = arguments[0] || {};
var egomadnessApi =  require('egoapiclient');
var navigation = require("navigation");
var currentTab = navigation.getTabExplore();


var searchForUser = function () {
	
	var userName = $.txtSearch.value;
    var returnedClient = egomadnessApi.searchUser(userName);
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {			
				Ti.API.info(responseJson);	  
			     
			     if(Boolean(responseJson.Found))
			     {
			     	var aGuid = responseJson.AccountGuid;
				    $.lblNotFound.visible= false;
				    var profileView = Alloy.createController("/account/profile", {accountGuid: aGuid, tab: currentTab}).getView();
			     	currentTab.open(profileView);
			     }
			     else
			     {
			     	$.lblNotFound.visible= true;
			     	
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

var toggleEnable = function ()
{
	$.lblNotFound.visible=false;
	if ($.txtSearch.value == "")
	{
		$.btnSubmit.enabled = false;
		$.btnSubmit.borderColor = "gray";
		
		
		
	}
	else{
		$.btnSubmit.enabled = true;
		$.btnSubmit.borderColor ="#57EF1E";
	}
	
};

$.btnSubmit.addEventListener("click", searchForUser);
$.txtSearch.addEventListener("change", toggleEnable);
toggleEnable();
