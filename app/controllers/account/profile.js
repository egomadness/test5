var args = arguments[0] || {};
var uiHelper = require("uiHelper");
var navigation = require("navigation");
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var dialogs = require('alloy/dialogs');
var tab = args.tab;
var accountGuid = args.accountGuid;
var isFollowing;
var canFollow;

var showFaceOffs = function () {
	
var view = Alloy.createController('/faceOff/faceOffsForAccount', {				
					userGuid: accountGuid,
					skip: 0												
				}).getView();
				
				tab.open(view);

};
var showFollowers = function () {
	
	var view = Alloy.createController('/account/accountList', {				
					showFollowers: true,
					userGuid: accountGuid,
					currentTab: tab												
				}).getView();
				
				tab.open(view);
	
};
var showEgoMap = function () {
	
	var view = Alloy.createController("/account/egoMap").getView();
	tab.open(view);
	
};

var showFollowing = function () {
	
	var view = Alloy.createController('/account/accountList', {				
					showFollowers: false,
					userGuid: accountGuid,
					currentTab: tab												
				}).getView();
				
				tab.open(view);
	
};

var unFollow = function ()
{
	
	 var json = JSON.stringify({AccountId: accountGuid});
			 var returnedClient = egomadnessApi.unFollow(json);
	         var ok = 200;
	
           returnedClient.onload = function(e) {
		   var responseJson = JSON.parse(this.responseText);
		   var statusCode = returnedClient.status;
		   if(statusCode === ok) {			
				Ti.API.info(responseJson);	  
			     var following = Boolean(responseJson.Following);
			     if(following == false)
			     {
			     	
					isFollowing =  following;
					canFollow = true;
					toggleFollowing();
				     	
			     	
			     }
			     else
			     {
			     	alert("This user cannot be followed");
			     	
			     }
			
								
		}
		else {
		
			egomadnessApi.showWebClientError(returnedClient);
			
		}
    };
	
	
	returnedClient.onerror = function(e){
    	
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
	
	
   returnedClient.send(json);
    
 
	
	
};

var toggleFollowing = function ()
{
	if(Boolean(canFollow)){
		if (Boolean(isFollowing))
		{
		
		$.btnFollow.backgroundColor ="green";	
		$.btnFollow.color = "white";
		$.btnFollow.title = "Following";
		
		}
		else{
		$.btnFollow.enabled = true;
		$.btnFollow.backgroundColor = "white";
		$.btnFollow.color = "gray";
		$.btnFollow.title = "Follow +";
		}
	}
	else
	{
		$.btnFollow.visible= false;
	
	}
	
};


var followToggle = function () {
		if(Boolean(canFollow)) {
		if (Boolean(isFollowing)) {
						
		dialogs.confirm({title: "Unfollow ?", callback: unFollow});	
			
									
		}
		else {
			 
			 var json = JSON.stringify({AccountId: accountGuid});
			 var returnedClient = egomadnessApi.follow(json);
	         var ok = 200;
	
           returnedClient.onload = function(e) {
		   var responseJson = JSON.parse(this.responseText);
		   var statusCode = returnedClient.status;
		   if(statusCode === ok) {			
				Ti.API.info(responseJson);	  
			     var followSuccess = Boolean(responseJson.Following);
			     if(followSuccess)
			     {
			     	
					isFollowing =  followSuccess;
					canFollow = followSuccess;
					toggleFollowing();
				     	
			     	
			     }
			     else
			     {
			     	alert("This user cannot be followed");
			     	
			     }
			
								
		}
		else {
		
			egomadnessApi.showWebClientError(returnedClient);
			
		}
    };
	
	
	returnedClient.onerror = function(e){
    	
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
	
	
   returnedClient.send(json);
    			
			
		}
		
		
		}
	
};

var loadScreen = function () {
	
	
    var returnedClient = egomadnessApi.getProfile(accountGuid);
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {			
				Ti.API.info(responseJson);	  
			     
			     if(Boolean(responseJson.Found))
			     {
			     	$.egoMap.image =responseJson.Profile.EgoMapPicUrl;
			     	$.lblPoints.text = "Ego Points: " + responseJson.Profile.EgoPoints;
			     	$.lblStatus.text = 	"Ego Status: " + responseJson.Profile.EgoMapStatus;		     	
					$.username.text = responseJson.Profile.UserName;
					$.imgProfile.image = egomadnessApi.getMediaUrl(responseJson.Profile.ProfilePicUrl);
					isFollowing =  responseJson.Profile.IsFollowing;
					canFollow = responseJson.Profile.CanFollow;
					toggleFollowing();
					var totalWins = responseJson.Profile.TotalWins;
					if(totalWins > 0)
					{
						$.lblwins.text = "Total Wins: " + totalWins;
					}
				     	
			     	
			     }
			     else
			     {
			     	$.username.text = "User Not Found";
			     	
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

$.btnFollow.addEventListener("click",  followToggle);
$.lblFollowing.addEventListener("click", showFollowing);
$.lblFollowers.addEventListener("click", showFollowers);
$.lblFaceOffsActive.addEventListener("click", showFaceOffs);
$.egoMap.addEventListener("click", showEgoMap);
loadScreen();
