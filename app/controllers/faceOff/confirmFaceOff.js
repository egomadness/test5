var egomadnessApi =  require('egoapiclient');
var dialogs = require('alloy/dialogs');
var instagramHelper =  require('instagramHelper');
var args = arguments[0] || {};
var mediaId = args.mediaId;
var mediaUrl = args.mediaUrl;
var mediaType = args.MediaFaceOffType;
var validate = require('hdjs.validate');
var validator = new validate.FormValidator();
var createMessage = "Your FaceOff request was created. We will notify you if anyone responds.";
var cancelRequestMessage = "Your FaceOff request will be deleted";



var instagramMediaView = Alloy.createController('/media/instagramMediaView', {
					MediaUrl: mediaUrl,
					MediaFaceOffType: mediaType				
				}).getView();
			
$.mediaView.add(instagramMediaView);


var callbackCancel = function () {
		
	var json = { MediaId: mediaId };	

var returnedClient = egomadnessApi.resetMedia(json);
var ok = 200;

	returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		Ti.API.info(responseJson);
		if(statusCode === ok) {
			
		//Was success can be either true or false
		//it can be false if the media was not reste due to the fact that it was already used in a faceoff	
				
			 var home =  Alloy.createController('home', {RequestsMenu: true}).getView();
             home.open();
								
			
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




var cancelClick = function () {
	
	dialogs.confirm({title: "Your FaceOff request will be deleted", callback:   callbackCancel });
	
};



var returnCallback = function() {
	
	validator.run([
				
				{
					id: 'txtFaceOffTitle',
				    value: $.txtFaceOffTitle.value,
				    display: 'faceOff title',    
				    rules: 'required|min_length[3]|max_length[25]'
				}
				
				
			], validationCallback);	
};

var validationCallback = function(errors) {
	resetValidation();
	if(errors.length > 0) {
		
		var fieldName = errors[0].name;
		setValidation(fieldName);
		alert(errors[0].message);		
		
	} 
	else {
		
	callCreateBroadcast();
	
		 
	}
	
	
};

var callCreateBroadcast = function () {

var json = {AcceptorMediaId: mediaId, Title: $.txtFaceOffTitle.value };
var returnedClient = egomadnessApi.addFaceoffBroadcast(json);
var ok = 200;

	returnedClient.onload = function(e) {
		
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {
			
			
			if(Boolean(responseJson.WasSuccess)) {
				
				alert(createMessage);
	            instagramHelper.doneCallBack();
				
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

function setValidation(name){
	
	$.txtFaceOffTitle.borderColor = 'red';
				
}

function resetValidation(){
	$.txtFaceOffTitle.borderColor ='white';
		
}

var onChangeReset = function onChangeCallback(e)
{
	resetValidation();
};

$.txtFaceOffTitle.addEventListener("change", onChangeReset);
$.btnSubmit.addEventListener('click', returnCallback);
$.btnCancel.addEventListener("click", cancelClick);
