
var args = arguments[0] || {};
var instagramPhoto = 1;
var instagramVideo = 3;
var mediaType = parseInt(args.MediaFaceOffType);
var urlPath = String(args.MediaUrl);
var _showHeader = args.showHeader;
var _ownerName  = args.ownerName;
var _createDate = args.createDate;
var egomadnessApi =  require('egoapiclient');
//var mediaType = args.MediaType;
var mediaUrl = args.MediaUrl;
var instagramPhoto = 1;
var instagramVideo = 3;

if(mediaType === instagramPhoto)
{
	var imageView = Alloy.createController('/media/instagramPhoto', 
	{
	 url: mediaUrl,     
     }).getView();
	$.mainConatiner.add(imageView);
	
}
else {
	
	if(mediaType ===instagramVideo) {
		var videoView = Alloy.createController('/media/instagramVideo', 
		{
			url:mediaUrl,
		}).getView();
		$.mainConatiner.add(videoView);
	}
	
} 







