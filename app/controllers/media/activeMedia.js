var args = arguments[0] || {};
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var broadcastId = args.broadcastId;
var broadcastMediaType = args.broadcastMediaType;
var broadcastTitle  = args.broadcastTitle;


var getActiveMedia = function ()  {


var returnedClient;
returnedClient = egomadnessApi.getActiveInstagramMedia(broadcastMediaType);  
var ok = 200;

	returnedClient.onload = function(e) {
		Ti.API.info('getActiveCalledOnload');
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
				
				
				if(_.isUndefined(broadcastMediaType))
				{
					emptyMessage = "Aww! You don't have any FaceOff media that is still active. ";
				}
				else{
					
					if(broadcastMediaType ===1)
					{
						emptyMessage = "Aww! You don't have any  PHOTOS used in FaceOffs that are still active.";
						
					}
					if(broadcastMediaType ===3)
					{
						emptyMessage = "Aww! You don't have any  VIDEOS used in FaceOffs that are still active.";

						
					}
					
				}
				
				
				
				
				
				var noResultsView = Alloy.createController('noResultsTableView',{message: emptyMessage }).getView();
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


getActiveMedia();
