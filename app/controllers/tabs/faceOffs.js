var args = arguments[0] || {};
var navigation = require("navigation");
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var args = arguments[0] || {};
var skip = 0;



var callBack = function () {
	
	var json = JSON.stringify({Skip:skip, Filter:{FilterType:2}});
    var returnedClient = egomadnessApi.getFaceOffPageView(json);
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
			
			
			
				var rows = [];
				Ti.API.info(responseJson);	  
			_.each(responseJson.FaceOffs, function(item) {
				rows.push(Alloy.createController('/faceoff/faceOffRow', {
					title:  item.Title, 
					startTime: item.FormattedDate,
					requestorName: item.Requestor.UserName,
					requestorPhoto: egomadnessApi.getMediaUrl(item.Requestor.PhotoUrl),
					acceptorName: item.Acceptor.UserName,
					acceptorPhoto: egomadnessApi.getMediaUrl(item.Acceptor.PhotoUrl),
					acceptorGuid : item.Acceptor.AccountGuid,
					requestorGuid : item.Requestor.AccountGuid,
					Id: item.Id,
					tab: navigation.getTabFaceOff()
					
												
				}).getView());
			});
			Ti.API.info(rows);	
			
			
			if(_.size(rows) > 0) {
					
								
				$.table.setData(rows);
				
			}
			else {
				
				var isfollowingPpl = responseJson.IsFollowingPeople;
				var noResultsView = Alloy.createController('faceoff/faceOffsEmpty', {type : 1, isFollowingPeople: isfollowingPpl}).getView();
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


var addFollowers = function () {
	var faceOffTab = navigation.getTabFaceOff();
	var addFollowersView = Alloy.createController("findFollowers", {tab:faceOffTab }).getView();
	faceOffTab.open(addFollowersView );
	
};

$.addFollower.addEventListener("click", addFollowers);
 $.topWindow.addEventListener("focus", callBack);