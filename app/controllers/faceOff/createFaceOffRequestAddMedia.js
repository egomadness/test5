var args = arguments[0] || {};
var broadcastId = args.broadcastId;
var broadcastMediaType = args.broadcastMediaType;
var broadcastTitle = args.broadcastTitle;
var instagramHelper =  require('instagramHelper');
var photoMediaType = 1;
var videoType=3;

if(instagramHelper.isBroadcast(broadcastId, broadcastMediaType, broadcastTitle)) 
{
	
	var mediaType;
	if(broadcastMediaType === photoMediaType)
	{
		mediaType = " Photo";
		
	}
	if(broadcastMediaType === videoType)
	{
		
		mediaType = "Video";
	} 
	$.description.text = "This FaceOff requires a " + mediaType + "." ;
	$.btnImportMedia.title = "Get an Instagram " + mediaType;
	$.btnFaceOffMedia.title ="Get a FaceOff " + mediaType;
}
else
{
	$.description.text = "Add media to your FaceOff by clicking one of the buttons below. ";
	$.btnImportMedia.title = "Get from Instagram";
	$.btnFaceOffMedia.title ="Get from FaceOffs";
	
}


var addInstagramMedia = function () {

	
 	if(instagramHelper.isBroadcast(broadcastId, broadcastMediaType, broadcastTitle)) {
	
	var broadcastJson = {broadcastId: broadcastId, broadcastMediaType: broadcastMediaType,broadcastTitle:broadcastTitle };
	instagramHelper.addMediaClick(broadcastJson);
	
	}
	else {
		
     instagramHelper.addMediaClick();
	 
	 
	}
	
	
	
	
};



var addFaceOffMedia = function () {
   
	
 	if(instagramHelper.isBroadcast(broadcastId, broadcastMediaType, broadcastTitle)) {
	
	var broadcastJson = {broadcastId: broadcastId, broadcastMediaType: broadcastMediaType,broadcastTitle:broadcastTitle };
	instagramHelper.addFaceOffMediaClick(broadcastJson);
	
	}
	else {
		
     instagramHelper.addFaceOffMediaClick();
	 
	 
	}
	
	
	
	
};


$.btnImportMedia.addEventListener('click', addInstagramMedia);
$.btnFaceOffMedia.addEventListener('click', addFaceOffMedia );