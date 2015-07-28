var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var args = arguments[0] || {};
var broadcastId  = args.broadcastId;
var broadcastMediaType = args.broadcastMediaType;
var broadcastTitle = args.broadcastTitle;
var tab = args.tab;
var addInstaFollowing = args.addInstaFollowing; // if next step is add ppl following from insta, came from findFollowers.js

Titanium.Network.removeHTTPCookiesForDomain('instagram.com');
$.viewAddInstagram.addEventListener('load', function() {
	var url = $.viewAddInstagram.url;
	Ti.API.info(url);
	if(url.indexOf('ImportInstagram?code') > -1)
	{
		
		if(_.isUndefined(addInstaFollowing)) {
		$.lblAddMedia.visible = true;
		importMediaCall();
		}
		else {
		 if(Boolean(addInstaFollowing) == true)	
		 {
		 	var view = Alloy.createController('/account/addInstagramFollowing', { currentTab : tab }).getView();
		    tab.open(view);
		 	
		 }
			
			
		}
		
		
		
	}
	
});

var showInstaFollowing = function() {
	
	
	
};
var importMediaCall = function ( ) {
	

var isBroadcast = instagramHelper.isBroadcast(broadcastId, broadcastMediaType, broadcastTitle);
if(isBroadcast){

		var importInstagram =  Alloy.createController('/media/instagramImport', {broadcastId: broadcastId, broadcastMediaType: broadcastMediaType, broadcastTitle: broadcastTitle }).getView();
	   tab.open(importInstagram);

}
else {
	    var importInstagram =  Alloy.createController('/media/instagramImport').getView();
	    tab.open(importInstagram);
	
}
	
	
	
};
$.lblAddMedia.addEventListener('click', importMediaCall);

var url = egomadnessApi.getWebsiteUrl() + "Account/LinkInstagram?uniuqueIdOne=" + args.uid1 + "&uniuqueIdTwo=" + args.uid2;
$.viewAddInstagram.url = url;



