var uiHelper = require("uiHelper");
var dialogs = require('alloy/dialogs');
var egomadnessApi =  require('egoapiclient');
var args = arguments[0] || {};
var isFollowing = args.isFollowing;
var canFollow = args.canFollow;
var photo = args.photo;
var userName = args.userName;
var tab = args.tab;
var accountGuid = args.accountGuid;



$.alertUserPhoto.image = photo;
$.lblUserName.text = userName;

$.lblUserName.addEventListener('click', function () {
	uiHelper.showProfile(accountGuid,tab);
});


//Duplicate code from profile Refactor


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

toggleFollowing();
$.btnFollow.addEventListener("click",  followToggle);