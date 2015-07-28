var navigation = require("navigation");
var egomadnessApi =  require('egoapiclient');
var dialogs = require('alloy/dialogs');




// this was done to keep addInstagram internal, it should only get called here
exports.requestNewToken = function (broadcastResponsejson) {
	
	addInstagram(broadcastResponsejson);
	
};
// broadcastResponsejson only gets sent when responding to a broadcast request see broadcastMediaRow.js
//broadcastResponsejson will be undefined if the user is creating a broadcast request see media.js add click
exports.addMediaClick = function (broadcastResponsejson) {
	
	var ok = 200;
	var returnedClient = egomadnessApi.linkAccounts();
	returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok)
		{
			var hasInstagram = Boolean(responseJson.HasInstagram);
			if(hasInstagram === true)
			{
				addMedia(broadcastResponsejson);
				         
			}
			else {
				
				addInstagram(broadcastResponsejson);
				
			}			
		}
		else
		{
			egomadnessApi.showWebClientError(returnedClient);
			
		}
				
	};
	
    returnedClient.onerror = function(e){
    	
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
    
    
    returnedClient.send();

	
	
	
};



exports.addFaceOffMediaClick =function (broadcastResponsejson)
{
	var tabMedia = navigation.getTabMedia();
 	var addMediaView;
 	if(!_.isUndefined(broadcastResponsejson) && exports.isBroadcast(broadcastResponsejson.broadcastId,broadcastResponsejson.broadcastMediaType, broadcastResponsejson.broadcastTitle ))
 	{
 		
 		
 		  addMediaView = Alloy.createController('/media/activeMedia', broadcastResponsejson).getView(); 		
 	}
 	else
 	{
 		
 		addMediaView = Alloy.createController('/media/activeMedia').getView();
 		
 	}
 	
 	tabMedia.open(addMediaView);
	
	
};
exports.isBroadcast = function(broadcastId, broadcastMediaType, broadcastTitle) {
	
	return !_.isUndefined(broadcastId) && !_.isUndefined(broadcastMediaType) && !_.isUndefined(broadcastTitle);
};

exports.resetMedia = function(mediaId)
{
		
		
var json = { MediaId: mediaId };	

var returnedClient = egomadnessApi.resetMedia(json);
var ok = 200;

	returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
			
			
			if(Boolean(responseJson.WasSuccess)) {
				
			exports.doneCallBack();
								
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


exports.doneCallBack = function ()
{
  var home =  Alloy.createController('home', {RequestsMenu: true}).getView();
  home.open();
	
};



var addMedia = function (broadcastResponsejson) {
 	
 	
 	var tabMedia = navigation.getTabMedia();
 	var addMediaView;
 	if(!_.isUndefined(broadcastResponsejson) && exports.isBroadcast(broadcastResponsejson.broadcastId,broadcastResponsejson.broadcastMediaType, broadcastResponsejson.broadcastTitle ))
 	{
 		
 		  addMediaView = Alloy.createController('/media/instagramImport', broadcastResponsejson).getView(); 		
 	}
 	else
 	{
 		
 		addMediaView = Alloy.createController('/media/instagramImport').getView();
 		
 	}
 	
 	tabMedia.open(addMediaView);
	
 };
 

exports.addInstagramFromFollows = function (currentTab) {
	
var returnedClient = egomadnessApi.getCurrentAccount();
var ok = 200;

returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok)
		{
			if(responseJson.UniuqueId != 0)
			{
			   						 	
			 	
			 		var addInstagramView =  Alloy.createController('/account/addInstagram', {uid1: responseJson.UniuqueId, uid2: responseJson.LinkAccountId, tab:currentTab, addInstaFollowing: true}).getView();
    	     		currentTab.open(addInstagramView);
    	    	
    	    	
   			}
		}
};

returnedClient.onerror = function(e){
    	
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
	
returnedClient.send();
	
	
	
};

var addInstagram = function(broadcastResponsejson) {
	
var returnedClient = egomadnessApi.getCurrentAccount();
var ok = 200;

returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok)
		{
			if(responseJson.UniuqueId != 0)
			{
			   			
			 	var tabMedia = navigation.getTabMedia();
			 	if(_.isUndefined(broadcastResponsejson) ) {
			 		var addInstagramView =  Alloy.createController('/account/addInstagram', {uid1: responseJson.UniuqueId, uid2: responseJson.LinkAccountId, tab:tabMedia}).getView();
    	     		tabMedia.open(addInstagramView);
    	    	}
    	    	else
    	    	{
    	    		var addInstagramView =  Alloy.createController('/account/addInstagram', { uid1: responseJson.UniuqueId, 
    	    																				  uid2: responseJson.LinkAccountId, 
    	    																				  tab:tabMedia,
    	    																				  broadcastId : broadcastResponsejson.broadcastId,
    	    																				  broadcastMediaType : broadcastResponsejson.broadcastMediaType,
    	    																				  broadcastTitle : broadcastResponsejson.broadcastTitle
    	    																				  
    	    																				   }).getView();
    	    																				  
    	    																				  
    	     		tabMedia.open(addInstagramView);
    	    	}
   			}
		}
};

returnedClient.onerror = function(e){
    	
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
	
returnedClient.send();
	
	
};
