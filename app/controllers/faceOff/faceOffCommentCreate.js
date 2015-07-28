var args = arguments[0] || {};
var uiHelper = require("uiHelper");
var navigation = require("navigation");
var egomadnessApi =  require('egoapiclient');
var instagramHelper =  require('instagramHelper');
var id= args.fId;


var callBack = function () {
	
	var commentJson = JSON.stringify({ CommentText : $.text.value, ResourceId : id });
    var returnedClient = egomadnessApi.createComment(commentJson);
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {			
				Ti.API.info(responseJson);	  
			if(responseJson.WasSuccessful)
			{
				
				//Titanium.UI.currentWindow.close();
				$.screen.close();
			}
			else
			{
				
				alert(_.first(_.toArray(responseJson.Errors)));
			}
					
					
					
					
					
			
		}
		else {
		
			egomadnessApi.showWebClientError(returnedClient);
			
		}
    };
	
	
	returnedClient.onerror = function(e){
    	
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
	
	
   returnedClient.send(commentJson);
    
 
	
};
var toggleEnable = function ()
{
	if ($.text.value == "")
	{
		$.btnPost.enabled = false;
		$.btnPost.backgroundColor = "gray";
		
		
		
	}
	else{
		$.btnPost.enabled = true;
		$.btnPost.backgroundColor ="green";
	}
	
};
$.text.addEventListener("change", toggleEnable);
$.btnPost.addEventListener("click", callBack);
