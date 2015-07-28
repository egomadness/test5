var egomadnessApi =  require('egoapiclient');
var dialogs = require('alloy/dialogs');
var instagramHelper =  require('instagramHelper');
var args = arguments[0] || {};
var broadcastId = args.broadcastId;
var broadcastTitle = args.broadcastTitle;
var mediaId = args.mediaId;
var mediaUrl = args.mediaUrl;
var broadcastMediaType = args.broadcastMediaType;
var createMessage = "Your request to FaceOff was sent. We will notify you if it is accepted.";	
var cancelRequestMessage = "Your request to FaceOff will be deleted";

var instagramMediaView = Alloy.createController('/media/instagramMediaView', {
					MediaUrl: mediaUrl,
					MediaFaceOffType:broadcastMediaType				
				}).getView();
			
$.mediaView.add(instagramMediaView);

$.lblFaceOffTitle.text = broadcastTitle;

var cancelClick = function () {
	
	
	dialogs.confirm({title:  cancelRequestMessage, callback: instagramHelper.resetMedia(mediaId)});
};


var callCreateFaceOffRequest = function () {

var json = {RequestorMediaId: mediaId, FaceOffBroadcastId:broadcastId };
var returnedClient = egomadnessApi.addFaceOffRequest(json);
var ok = 200;

	returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
			
			
			if(Boolean(responseJson.WasSuccessful)) {
				
				alert(createMessage);
	            instagramHelper.doneCallBack();
				
			}
			else {
				
				egomadnessApi.showWebClientError(returnedClient);
				
	  			}
		}
		else {
				
				egomadnessApi.showWebClientError(returnedClient);
				
	  			}
		
	};

 	returnedClient.onerror = function(e) {
    	egomadnessApi.showWebClientError(returnedClient);
    	
 	};	
 	
 	
 	var formattedJson = JSON.stringify(json); 
 	returnedClient.send(formattedJson);
	
};

$.btnSubmit.addEventListener('click', callCreateFaceOffRequest);
$.btnCancel.addEventListener("click", cancelClick);
