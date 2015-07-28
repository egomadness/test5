var args = arguments[0] || {};
var egomadnessApi =  require('egoapiclient');
var dialogs = require('alloy/dialogs');
var tab = args.tab;



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



$.btnRemoveInstagram.addEventListener('click', btnRemoveInstagramClick);

