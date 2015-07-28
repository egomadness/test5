var args = arguments[0] || {};
var currentTab = args.tab;
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');



var addInstagram = function() {
	
	instagramHelper.addInstagramFromFollows(currentTab);

};


var addFollowersInstagram = function () {
	
var ok = 200;
	var returnedClient = egomadnessApi.linkAccounts();
	returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok)
		{
			var hasInstagram = Boolean(responseJson.HasInstagram);
			if(hasInstagram === true)
			{
				
				var tab = currentTab;				
				var view =Alloy.createController('/account/addInstagramFollowing', { currentTab : tab  }).getView();
				tab.open(view);
						
				         
			}
			else {
				
				addInstagram();
				
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


$.btnExplore.addEventListener("click", function () {
	
	var view = Alloy.createController('/account/exploreFromHome').getView();
	currentTab.open(view);
});



$.btnInstagram.addEventListener("click", addFollowersInstagram);
