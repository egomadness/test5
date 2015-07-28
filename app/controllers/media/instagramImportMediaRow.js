var egomadnessApi =  require('egoapiclient');
var dialogs = require('alloy/dialogs');
var instagramHelper =  require('instagramHelper');
var args = arguments[0] || {};
var mediaId = args.id;
var mediaType = args.MediaFaceOffType;
var mediaUrl = args.MediaUrl;
var broadcastId = args.broadcastId;
var broadcastTitle  = args.broadcastTitle;



var instagramMediaView = Alloy.createController('/media/instagramMediaView', {
					MediaUrl: mediaUrl,
					MediaFaceOffType:	mediaType				
				}).getView();
				
$.mediaView.add(instagramMediaView);




var callActivateMedia = function () {

var json = { MediaId: mediaId };	

var returnedClient = egomadnessApi.activateMedia(json);
var ok = 200;

	returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
			
			
			if(Boolean(responseJson.activateMediaResponse.WasSuccess)) {
				
				
				var isBroadcastResponse = instagramHelper.isBroadcast(broadcastId, mediaType, broadcastTitle);
				if(isBroadcastResponse)
				{
					var confirm = Alloy.createController('/faceOff/confirmBroadcast', 
					{
						
						broadcastId: broadcastId,
				 		broadcastTitle: broadcastTitle, 
						mediaId:  mediaId,
				 		mediaUrl : mediaUrl,
				 		broadcastMediaType: mediaType,
				
				    }).getView();
					confirm.open();
	
	
	           
				}
				else
				{
					
					var confirm = Alloy.createController('/faceOff/confirmFaceOff', 
					{
						mediaId:  mediaId,
				 		mediaUrl : mediaUrl,
				 		MediaFaceOffType: mediaType,
				
				    }).getView();
					confirm.open();
					
					
					
					
				}
				
				
				
								
			}
			else {
				
				egomadnessApi.showWebClientError(returnedClient);
				
	  			}
		}
		
	};

 	returnedClient.onerror = function(e) {
    	egomadnessApi.showWebClientError(returnedClient);
    	
 	};	
 	
 	
 	var formattedJson = JSON.stringify(json); 
 	returnedClient.send(formattedJson);
	
};

var importClick = function (){
	dialogs.confirm({title: "Use this media?", callback: callActivateMedia});
};
$.btnImport.addEventListener('click', importClick);

//var importButton = Alloy.createController('media/importMediaButton', { id: mediaId, mediaFaceOffType: mediaType, mediaUrl:mediaUrl }).getView();
//$.mediaView.add(importButton);




/*var instagramMediaView = Alloy.createController('/media/instagramMediaView', {
					MediaUrl: args.MediaUrl,
					MediaFaceOffType: args.MediaFaceOffType,
					showHeader: args.showHeader,
					ownerName: args.ownerName,
					createDate: args.createDate,
					canFaceOff: args.canFaceOff,
					id: args.id,
					OwnerProfileUrl: args.OwnerProfileUrl,
					ShowImportButton: args.ShowImportButton,
					context: FaceOffContext,
					ShowFaceOffButton : args.ShowFaceOffButton,
					
					
				}).getView();*/