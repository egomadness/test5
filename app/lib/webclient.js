var tokenHelper = require('tokenhelper');

exports.getWebClient = function(isAuthenticated,url, jsonPost) {

var isPost = Boolean(_.isUndefined(jsonPost)===false);
var client = Ti.Network.createHTTPClient({
        	
     timeout : 15000,  // in milliseconds
     validatesSecureCertificate : false
 });
    
    
 if(isPost) {
 
 	client.open('POST', url);
 	client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
 }
 
 else {
 	client.open('GET', url);
 }
 
 
 if(Boolean(isAuthenticated)) {
 
 	var token = tokenHelper.getToken();
 	if(!Boolean(tokenHelper.tokenIsEmpty(token)))
 	{
 	    
 		client.setRequestHeader('Authorization', 'Bearer '  + token);
  
 	}
 }
 
 return client;

	   
  
 
  
};