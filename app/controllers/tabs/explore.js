var args = arguments[0] || {};
var navigation = require("navigation");
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var uiHelper =  require('uiHelper');
var args = arguments[0] || {};
var skip = 0;



var callBack = function () {
	
	uiHelper.getExplore($.table);
    /*var returnedClient = egomadnessApi.getExplorePageView();
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
					tab: navigation.getTabExplore()
												
				}).getView());
			});
			Ti.API.info(rows);	
			
			
			if(_.size(rows) > 0) {
					
								
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
	
	
   returnedClient.send();
   */
 
	
};

 $.topWindow.addEventListener("focus",  function () {
 	callBack();
 	$.topWindow.removeEventListener("focus", callBack);
 	
 });
 
var search = function () {
	
	var tab =navigation.getTabExplore();
	var searchView = Alloy.createController("/account/search").getView();
	tab.open(searchView);
	
};
$.btnSearch.addEventListener("click", search);
