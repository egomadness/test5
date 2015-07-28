var args = arguments[0] || {};
var egomadnessApi =  require('egoapiclient');
var dialogs = require('alloy/dialogs');
var instagramHelper =  require('instagramHelper');
var broadcastId = args.broadcastId;
var broadcastMediaType = args.broadcastMediaType;
var broadcastTitle  = args.broadcastTitle;
 

var callImportMedia = function () {
	
var returnedClient = egomadnessApi.ImportInstagramMedia();
var ok = 200;

	returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
			
			if(Boolean(responseJson.WasSuccessful)) {
				getImportedMedia();
				
			}
			else { //Was not successful
				
				if(Boolean(responseJson.NeedsNewToken))
				{
					var isBroadcast = instagramHelper.isBroadcast(broadcastId, broadcastMediaType, broadcastTitle);
					if(Boolean(isBroadcast))
					{
						instagramHelper.requestNewToken({broadcastId: broadcastId, broadcastMediaType:broadcastMediaType, broadcastTitle:broadcastTitle});
						
					}
					else
					{
						instagramHelper.requestNewToken();
						
					}
					
					
				}
				else
				{
						var errors = '';
					_.each(responseJson.Errors, function(i){
						errors =  errors + i + '\n'; 
			    	});
				
				alert(errors);
					
				}
							
			}
			
		}
		else{
			
		egomadnessApi.showWebClientError(returnedClient);
			
			 
		}
		
		
	};

 	returnedClient.onerror = function(e) {
    	egomadnessApi.showWebClientError(returnedClient);
    	
 	};	
 	
 	returnedClient.send();
	
};

var getImportedMedia = function ()  {


var returnedClient;
var isBroadcast = instagramHelper.isBroadcast(broadcastId, broadcastMediaType, broadcastTitle);
if(isBroadcast)
{
	    returnedClient = egomadnessApi.getImportedInstagramMedia(broadcastMediaType);       	
}
else 
{
	returnedClient = egomadnessApi.getImportedInstagramMedia();
}


var ok = 200;

	returnedClient.onload = function(e) {
		Ti.API.info('getimportedCalledOnload');
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		Ti.API.info(statusCode +" " + responseJson);
		if(statusCode === ok) {
		
				var media = responseJson;
				var rows = [];
				Ti.API.info(responseJson);	  
			_.each(media, function(item) {
				rows.push(Alloy.createController('/media/instagramImportMediaRow', {
					MediaUrl: item.MediaUrl,
					MediaFaceOffType: item.MediaFaceOffType,
					id: item.EgoMadnessId,
					broadcastId: broadcastId,
					broadcastTitle: broadcastTitle
										
				}).getView());
			});
			Ti.API.info(rows);
			if(_.size(rows) > 0) {
				
				
					
				$.table.setData(rows);	
			}
			else {
				
				var emptyMessage;
				if(_.isUndefined(broadcastMediaType))
				{
					emptyMessage = "Aww! You dont have any new media on Instagram. Add new media on Instagram and then come back to the FaceOff.";
				}
				else{
					
					if(broadcastMediaType ===1)
					{
						emptyMessage = "Aww! You need an Instagram PHOTO for this FaceOff. Add a photo on Instagram and then come back to the FaceOff.";
						
					}
					if(broadcastMediaType ===3)
					{
						emptyMessage = "Aww! You need an Instagram VIDEO for this FaceOff. Add a video on Instagram and then come back to the FaceOff.";
						
					}
					
				}
				
				
				var noResultsView = Alloy.createController('noResultsTableView', {message: emptyMessage }).getView();
				rows.push(noResultsView);
				$.table.setData(rows);	
			}
    	   
			
		}
		else {
		
			egomadnessApi.showWebClientError(returnedClient);
			
		}
    };

    returnedClient.onerror = function(e) {

    egomadnessApi.showWebClientError(returnedClient);
    	
    };	
 
 
 			
			
   	returnedClient.send();
			
 
 
 			


};


callImportMedia();


//$.instagramImport.open();	