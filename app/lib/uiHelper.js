var egomadnessApi =  require('egoapiclient');
var navigation = require("navigation");

exports.getModal = function (view){
	
	var modalWindow = Ti.UI.createWindow({backgroundColor:'transparent'});
	var wrapperView = Ti.UI.createView();
	var backgroundView = Ti.UI.createView({backgroundColor: '#000', opacity : 0.8});
	
	var closeButton = Ti.UI.createButton({title: "X", layout: "absolute", right:0, top:10});
	closeButton.addEventListener("click", function () {
		modalWindow.close();
	});
	 backgroundView.add(closeButton);
	 wrapperView.add(backgroundView);
	 wrapperView.add(view);
	 modalWindow.add(wrapperView);
	 modalWindow.open({animate:true});
	 				
	
	
	
};


exports.showProfile = function (guid, currentTab)
{
	
	var view = Alloy.createController("/account/profile", {accountGuid:guid, tab: currentTab}).getView();
	currentTab.open(view);
	
	
	
};

exports.showFaceOff = function(id, currentTab)
{
	var faceOffView = Alloy.createController('/faceOff/faceOffView', 
  	{faceOffId: id}).getView();
  
  	
	currentTab.open(faceOffView);

	
};

exports.showBroadcast = function(id, currentTab)
{
	var broadcast = Alloy.createController('faceOff/broadcastView', {id: id}).getView();
		var window = Titanium.UI.createWindow ();
		
  	window.add(broadcast);
  	window.barColor = "black";
	currentTab.open(window);
};
exports.getExplore = function (table) {
	
	
    var returnedClient = egomadnessApi.getExplorePageView();
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
					
								
				table.setData(rows);
				
			}
			else {
				
				
				var noResultsView = Alloy.createController('noResultsTableView', {message: " Where is everyone ?? "}).getView();
				rows.push(noResultsView);
				table.setData(rows);	
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
