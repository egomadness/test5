var args = arguments[0] || {};
var egomadnessApi =  require('egoapiclient');



var callBack = function () {
	
	
    var returnedClient = egomadnessApi.getEgoMap();
	var ok = 200;
	
	
	returnedClient.onload = function(e) {
		
	    var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === ok) {			
				Ti.API.info(responseJson);	  
					
				var rows = [];
				Ti.API.info(responseJson);	  
			_.each(responseJson , function(item) {
				rows.push(Alloy.createController('/account/egoMapRow', {
					status :  item.Status, 
					photo: item.Image,
					pointsLow: item.PointsLow,
					pointsHigh: item.PointsHigh,
					showPointsHigh: item.ShowPointsHigh
					
												
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
    
 
	
};

callBack();
