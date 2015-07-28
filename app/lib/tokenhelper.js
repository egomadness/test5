

var apiTokenString = 'apiToken';

exports.getToken =  function(){
var token = '';
if(Ti.App.Properties.hasProperty(apiTokenString))
{
	token = Ti.App.Properties.getString(apiTokenString, '');
}
 return token;
};

exports.setToken =  function(token){

Ti.App.Properties.setString(apiTokenString, token);

};


exports.removeToken = function() {
	
	Ti.App.Properties.removeProperty(apiTokenString);
	
};

exports.tokenIsEmpty = function(token) {
	
return Boolean(token === '');	
	
};

