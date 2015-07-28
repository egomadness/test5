var args = arguments[0] || {};
var navigation = require("navigation");
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var args = arguments[0] || {};

var currentTab = args.currentTab;




var loadScreen = function () {

	var returnedClient =  egomadnessApi.getInstagramAccountsToFollow();
    var ok = 200;	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
					
				if(responseJson.WasSuccessful)	
				{
					
					var rows = [];
				Ti.API.info(responseJson);	  
			_.each(responseJson.Accounts, function(item) {
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
			else {
				
				
				var noResultsView = Alloy.createController('noResultsTableView', {message: "There's no one from your Instagram account to add"}).getView();
				rows.push(noResultsView);
				$.table.setData(rows);	
			}		
					
				}
			
			else { //Not successful
				
				
				if(Boolean(responseJson.NeedsNewToken))
				{
					
					instagramHelper.addInstagramFromFollows(currentTab);
			     	       										
														
				}
				else
				{
					egomadnessApi.showWebClientError(returnedClient);
					
				}
							
				
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
