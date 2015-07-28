var navigation = require("navigation");
var uiHelper = require("uiHelper");

var egomadnessApi =  require('egoapiclient');
var args = arguments[0] || {};
var mediaUrl = args.mediaUrl;
var mediaType = args.mediaType;
var ownerName = args.ownerName;
var createDate = args.createDate;
var canFaceOff = args.canFaceOff;
var broadcastId = args.id;
var ownerProfileUrl = args.ownerProfileUrl;
var title = args.title;
var alreadyRequested = args.alreadyRequested;
var accountGuid = args.accountGuid;
var faceOffId = args.faceOffId;





var addMediaClick = function () {  
  	
  	var mediaTab = navigation.getTabMedia();
  	var createFaceOffRequestAddMedia = Alloy.createController('/faceOff/createFaceOffRequestAddMedia', 
  	{
  		broadcastId: broadcastId, 
  		broadcastMediaType:mediaType, 
  		broadcastTitle:title
    }).getView();
	mediaTab.open(createFaceOffRequestAddMedia);
  	
  };


var loadBroadcast = function () {
	
	
    var returnedClient = egomadnessApi.getFaceOffBroadcast(broadcastId);
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {			
				Ti.API.info(responseJson);	  
			
			if(responseJson.Id ==0)
			{
				$.lblTitle.text  = "Broadcast Not Found";
			}	
			else
			{
				$.listUsername.text = responseJson.AccountUserName;
				$.listUserPhoto.image = egomadnessApi.getMediaUrl(responseJson.OwnerProfileUrl);
				$.tm.text = responseJson.CreateDateTime;
				$.lblTitle.text = responseJson.Title;

			   var instagramMediaView = Alloy.createController('/media/instagramMediaView', {
					MediaUrl: egomadnessApi.getMediaUrl(responseJson.MediaUrl),
					MediaFaceOffType: responseJson.FaceOffMediaType				
				}).getView();
				
$.mediaView.add(instagramMediaView);
				
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

//Coming in from Tabs/Media.js 
var loadFromBroadcastList = function() {
	
$.listUsername.text = ownerName;
$.listUserPhoto.image = ownerProfileUrl;
$.tm.text = createDate;
$.lblTitle.text =  '"' + title + '"';

var instagramMediaView = Alloy.createController('/media/instagramMediaView', {
					MediaUrl: mediaUrl,
					MediaFaceOffType: mediaType				
				}).getView();
				
$.mediaView.add(instagramMediaView);


if(Boolean(canFaceOff)  &&  !Boolean(alreadyRequested)) {
	
var faceOffButton = Ti.UI.createButton({
	
	id: "btnFaceOff",
	title: "FaceOff",
	top: "-70",
	width: "140",
	height: "40",
	color: "white",
	
	 borderWidth:"3" ,
	 borderRadius :"3",
	 borderColor: "#57EF1E",
	 font: {
		fontSize: 25,
		fontWeight: "bold"
		
		
	},
	backgroundColor : "#57EF1E"
	
	
});

faceOffButton.addEventListener("click", addMediaClick);
							
$.mediaView.add(faceOffButton);

}




if(Boolean(alreadyRequested)) {
	
	
	var alreadyRequestedButton = Ti.UI.createButton({
	
	id: "btnFaceOff",
	title: "Requested",
	top: "-70",
	width: "140",
	height: "40",
	color: "gray",
	
	 borderWidth:"3" ,
	 borderRadius :"3",
	 borderColor: "gray",
	 font: {
		fontSize: 25,
		fontWeight: "bold"
		
		
	},
	backgroundColor: "#3B3939"
	
});
	
	$.mediaView.add(alreadyRequestedButton);
}


$.listUsername.addEventListener('click', function () {
	uiHelper.showProfile(accountGuid, navigation.getTabMedia());
});


$.listUserPhoto.addEventListener('click', function () {
	uiHelper.showProfile(accountGuid, navigation.getTabMedia());
});
	
	
};



var loadBroadcastPage = function () {
	
	
	if(!_.isUndefined(mediaUrl))
{
	
	loadFromBroadcastList();
	
}
else
{
	loadBroadcast();
	
}

	
};

loadBroadcastPage();
