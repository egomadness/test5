var egomadnessApi =  require('egoapiclient');

var ok = 200;
var alertFaceOffRequest = 1;
var alertFaceOffAccepted = 4;
var alertFaceOffStarted = 5;
var newFollower = 6;
var commentOnFaceOff = 7


var callBack = function () {
var returnedClient = egomadnessApi.getAlerts();
returnedClient.onload = function(e) {


 		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
						
				var rows = [];
				Ti.API.info(responseJson);	  
				_.each(responseJson, function(item) {
				
				
				
				if(item.AlertType === commentOnFaceOff) {
				
				rows.push(Alloy.createController('/faceoff/faceOffCommentAlert', {
					alertText: item.AlertText,
					faceOffTitle: item.FaceOffInfoRequestAlertInfo.FaceOffTitle,
					requestorName: item.FaceOffInfoRequestAlertInfo.UserName,
					profilePhoto: egomadnessApi.getMediaUrl(item.FaceOffInfoRequestAlertInfo.UserProfilePhoto),
					alertTime: item.FormattedDate,
					userGuid: item.FaceOffInfoRequestAlertInfo.UserGuid,
					id: item.FaceOffInfoRequestAlertInfo.FaceOffId,
					broadcastId: item.FaceOffInfoRequestAlertInfo.FaceOffBroadcastId															
				}).getView());
				
				}
				
				
				
				if(item.AlertType === alertFaceOffRequest) {
				
				rows.push(Alloy.createController('/faceoff/faceOffAlertRow', {
					alertText: item.AlertText,
					faceOffTitle: item.FaceOffInfoRequestAlertInfo.FaceOffTitle,
					requestorName: item.FaceOffInfoRequestAlertInfo.UserName,
					profilePhoto: egomadnessApi.getMediaUrl(item.FaceOffInfoRequestAlertInfo.UserProfilePhoto),
					alertTime: item.FormattedDate,
					userGuid: item.FaceOffInfoRequestAlertInfo.UserGuid,
					id: item.FaceOffInfoRequestAlertInfo.FaceOffId,
					broadcastId: item.FaceOffInfoRequestAlertInfo. FaceOffBroadcastId															
				}).getView());
				
				}
				
				if(item.AlertType === alertFaceOffAccepted || item.AlertType === alertFaceOffStarted)
				{
					
				   rows.push(Alloy.createController('/faceoff/faceOffStartedRow', {
					alertText: item.AlertText,
					faceOffId: item.FaceOffAcceptedAlertInfo.FaceOffId,
					faceOffTitle: item.FaceOffAcceptedAlertInfo.FaceOffTitle,
					alertTime: item.FormattedDate
																					
				}).getView());
					
					
				
					
				}
				
			    if(item.AlertType === newFollower)
			    {
                    rows.push(Alloy.createController('/faceoff/followerAlertRow', {
					alertText: item.AlertText,
					alertTime: item.FormattedDate,
					userPhoto : item.AlertUserInfo.ProfilePic,
					userGuid :  item.AlertUserInfo.AccountGuid,
					userName: item.AlertUserInfo.UserName
																					
				}).getView());
			    	
			    	
			    }
				
				
			});
						
			if(_.size(rows) > 0) {
					
								
				$.table.setData(rows);	
				$.table.separatorColor = "white";
			}
			else{
				
				$.table.separatorColor = "transparent";
			}		
						

		}
		else{
		
		egomadnessApi.showWebClientError(returnedClient);	
	
		}
};

returnedClient.onerror = function(e){

    egomadnessApi.showWebClientError(returnedClient);

};

returnedClient.send(); 

 $.topWindow.removeEventListener("focus", callBack);
};

$.topWindow.addEventListener("focus", callBack);