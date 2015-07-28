var navigation = require("navigation");
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var args = arguments[0] || {};
var skip = 0;


var callBack = function () {
	
	var json = JSON.stringify({Skip: skip, Filter: {FilterType:2}});
	var returnedClient = egomadnessApi.getFaceoffBroadcastView(json);
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {		
				var rows = [];
				Ti.API.info(responseJson);	  
			_.each(responseJson.broadcastPageView.Broadcasts, function(item) {
				rows.push(Alloy.createController('/faceoff/broadcastMediaRow', {
					MediaUrl: egomadnessApi.getMediaUrl(item.MediaUrl),
					MediaFaceOffType: item.FaceOffMediaType,
					ownerName: item.AccountUserName,
					createDate: item.CreateDateTime,
					canFaceOff: item.CanRequest,
					id: item.Id,
					OwnerProfileUrl: egomadnessApi.getMediaUrl(item.OwnerProfileUrl),
					title: item.Title,
					alreadyRequested: item.AlreadyRequested,
					accountGuid: item.AccountGuid								
				}).getView());
			});
			Ti.API.info(rows);	
			
			
			if(_.size(rows) > 0) {
					
								
				$.table.setData(rows);	
				
			}
			else {
				
				var isfollowingPpl = responseJson.broadcastPageView.IsFollowingPeople;
				var noResultsView = Alloy.createController('faceoff/faceOffsEmpty', {type : 2, isFollowingPeople: isfollowingPpl}).getView();
				rows.push(noResultsView);
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
	
	
   returnedClient.send(json);
  $.topWindow.removeEventListener("focus", callBack);
 
 };

  var addMediaClick = function () {
  	
  	var mediaTab = navigation.getTabMedia();
  	var createFaceOffRequestAddMedia = Alloy.createController('/faceOff/createFaceOffRequestAddMedia').getView();
	mediaTab.open(createFaceOffRequestAddMedia);
  	
  };

var addFollowers = function () {
	var mediaTab = navigation.getTabMedia();
	var addFollowersView = Alloy.createController("findFollowers", {tab:mediaTab }).getView();
	mediaTab.open(addFollowersView );
	
};

$.addFollower.addEventListener("click", addFollowers);

$.topWindow.addEventListener("focus", callBack);

$.btnAddMedia.addEventListener("click", addMediaClick);
