var args = arguments[0] || {};
var navigation = require("navigation");
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var args = arguments[0] || {};
var showFollowers = args.showFollowers;
var userGuid = args.userGuid;
var currentTab = args.currentTab;

var returnedClient;



var loadScreen = function () {
	

	if(Boolean(showFollowers))
	{
		returnedClient = egomadnessApi.getFollowers(userGuid,0);
	}
	else
	{
		returnedClient = egomadnessApi.getFollowing(userGuid,0);
	}
    
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
					
				var rows = [];
				Ti.API.info(responseJson);	  
			_.each(responseJson, function(item) {
				rows.push(Alloy.createController('/account/accountRow', {				
					isFollowing: item.IsFollowing,
 					canFollow: item.CanFollow,
					photo : egomadnessApi.getMediaUrl(item.Photo),
					userName : item.UserName,
					tab:currentTab,
					accountGuid: item.AccountGuid												
				}).getView());
			});
			Ti.API.info(rows);	
			
			
			if(_.size(rows) > 0) {
					
								
				$.table.setData(rows);	
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


loadScreen();
