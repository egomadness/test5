var args = arguments[0] || {};
var navigation = require("navigation");
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var accountGuid = args.userGuid;
var skip = args.skip;

var loadScreen = function () {
    var returnedClient = egomadnessApi.getFaceOffsByAccountId(accountGuid,skip);
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
			
			
			
				var rows = [];
				Ti.API.info(responseJson);	  
			_.each(responseJson.FaceOffs, function(item) {
				rows.push(Alloy.createController('/faceoff/faceOffRow', {
					title:  item.Title, 
					startTime: item.FormattedDate,
					requestorName: item.Requestor.UserName,
					requestorPhoto: egomadnessApi.getMediaUrl(item.Requestor.PhotoUrl),
					acceptorName: item.Acceptor.UserName,
					acceptorPhoto: egomadnessApi.getMediaUrl(item.Acceptor.PhotoUrl),
					acceptorGuid : item.Acceptor.AccountGuid,
					requestorGuid : item.Requestor.AccountGuid,
					Id: item.Id
												
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
