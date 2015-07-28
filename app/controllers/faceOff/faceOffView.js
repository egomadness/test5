var args = arguments[0] || {};
var uiHelper = require("uiHelper");
var navigation = require("navigation");
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var faceOffId = args.faceOffId;
var rMedia;
var aMedia;
var mediaType;
var rId;
var aId;

var disableButtons = function () {
	$.btnVoteAcceptor.enabled = false;
	$.btnVoteAcceptor.backgroundColor ="gray";
	$.btnVoteRequestor.enabled = false;
	$.btnVoteRequestor.backgroundColor ="gray";	
	
};

var enableButtons = function () {
	
	$.btnVoteAcceptor.enabled = true;
    $.btnVoteAcceptor.backgroundColor ="green";
	$.btnVoteRequestor.enabled = true;
	$.btnVoteRequestor.backgroundColor ="green";
};
var callBack = function () {
	
	
    var returnedClient = egomadnessApi.getFaceOff(faceOffId);
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {			
				Ti.API.info(responseJson);	  
			
			if(responseJson.FaceOff.Id ==0)
			{
				$.lblTitle.text  = "FaceOff Not Found";
			}	
			else
			{
				
					$.listCreateDate.text = responseJson.FaceOff.FormattedDate;
					$.lblTitle.text = responseJson.FaceOff.Title;
					$.userNameRequestor.text = responseJson.FaceOff.Requestor.UserName;
					$.photoRequestor.image = egomadnessApi.getMediaUrl(responseJson.FaceOff.Requestor.PhotoUrl);
					$.userNameAcceptor.text = responseJson.FaceOff.Acceptor.UserName;
					$.photoAcceptor.image = egomadnessApi.getMediaUrl(responseJson.FaceOff.Acceptor.PhotoUrl);	
					rMedia = responseJson.FaceOff.Requestor.MediaUrl;	
					aMedia =  responseJson.FaceOff.Acceptor.MediaUrl;	
					mediaType = 	responseJson.FaceOff.MediaType;
					aId = responseJson.FaceOff.Acceptor.Id;
					rId = responseJson.FaceOff.Requestor.Id;
					 
					var canVote =  responseJson.FaceOff.CanVote;
					if(Boolean(canVote))
					{
						enableButtons();
					}
					else
					{
						disableButtons();
						
					}
					
					var comments = responseJson.FaceOff.Comments;
					var rows = [];
					Ti.API.info(comments);	  
				   _.each(comments, function(item) {
				   rows.push(Alloy.createController('/faceoff/faceOffCommentRow', {
					userName:  item.UserName, 
					text: item.CommentText,
					canDelete: item.CanDelete,
					Id: item.Id
												
				}).getView());
			});
			Ti.API.info(rows);	
			
			
			if(_.size(rows) > 0) {
					
								
				$.tblComments.setData(rows);	
			}		
					
					
					
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

var watchRequestor = function  (){
	
	var requestorMedia  = Alloy.createController('/media/instagramMediaView', {
					MediaUrl: egomadnessApi.getMediaUrl(rMedia),
					MediaFaceOffType: parseInt(mediaType)				
				}).getView();
	
	uiHelper.getModal(requestorMedia);
	
};

var watchAcceptor = function  (){
	
	var requestorMedia  = Alloy.createController('/media/instagramMediaView', {
					MediaUrl: egomadnessApi.getMediaUrl(aMedia),
					MediaFaceOffType: parseInt(mediaType)				
				}).getView();
	
	uiHelper.getModal(requestorMedia);
	
};

var voteContestant = function (voteJson) {
    var finalJson = JSON.stringify(voteJson);
	var returnedClient = egomadnessApi.voteFaceOff(finalJson);
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {			
				Ti.API.info(responseJson);	  
			if(Boolean(responseJson.WasSuccessful)) {
				disableButtons();
			alert("Thanks for the vote!");
				
			}
			else
			{
				alert("You can no longer vote for this FaceOff.");
				//refresh the screen
			}
			
			
		}
		else {
		
			egomadnessApi.showWebClientError(returnedClient);
			
		}
    };
	
	
	returnedClient.onerror = function(e){
    	
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
	
	
   returnedClient.send(finalJson);
    
 
	
	
};

var addComment = function()
{
	var faceOffTab = navigation.getTabFaceOff();
  	var faceOffCommentCreate = Alloy.createController('/faceOff/faceOffCommentCreate', {fId :faceOffId}).getView();
	faceOffTab.open(faceOffCommentCreate);
	
};



$.btnWatchRequestor.addEventListener('click', watchRequestor);
$.btnWatchAcceptor.addEventListener('click', watchAcceptor);
$.btnVoteRequestor.addEventListener('click',  function () {
	
	var voteJson = { FaceOffId:faceOffId, ContestantId: rId };
	voteContestant(voteJson);
});
$.btnVoteAcceptor.addEventListener('click',  function () {
	
	var voteJson = { FaceOffId:faceOffId, ContestantId: aId };
	voteContestant(voteJson);
});
$.btnComment.addEventListener('click', addComment);
callBack();
