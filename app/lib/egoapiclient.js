var webClient = require('webclient');
var production = false; 
var noAuth = false;
var yesAuth = true;
var baseUrl = 'https://10.0.0.2/EgomadnessWebApi/';
var baseWebUrl = 'https://10.0.0.2/EgomadnessWebSite/'; 
var tooManyRequests = 429;
var unauthorized = 401;
var noConnection = 0;
if(production){

   baseUrl = 'https://www.egomadness.com/EgomadnessWebApi/';
   baseWebUrl ='https://www.egomadness.com/EgomadnessWebSite/';

}
var urlTemplate = _.template(baseUrl + '<%=url%>');

// HELPERS *****************************************************************************
exports.getWebsiteUrl = function(){
	
	return baseWebUrl;
};

exports.getMediaUrl = function(mediaUrl)
{
	return baseUrl + mediaUrl;
	
};

exports.showWebClientError = function(webClient) {
	
	var message = "We've encountered an error. Please try again. ";
	var status = Number(webClient.status);
	if(status === tooManyRequests)
	  {
		message ="You have exceeded the amount of times this feature can be used. Please try again later";
	  }
	 if(status === unauthorized)
	 {
	 	
	 	message ="Please login, it looks like your session ended";
	 
	 }
	 if(status ===noConnection)
	 {
	 	
	 	message = "No internet connection, please connect to your network";
	 }
	   Ti.API.info("Webclient Error >>>> http status" + status + " text " + webClient.statusText);
		alert(message);
};
// END HELPERS *****************************************************************************************************************************************************


/// MEDIA AND INSTAGRAM **********************************************************************************************************************************************************
exports.getMediaPageView = function (json) {
	
	var getMediaPageView = "GetMediaPageView";	
	var requestUrl = urlTemplate({url:getMediaPageView});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl, json);
	return returnedClient;
	
};

exports.activateMedia = function (mediaJson) {
	
	var activateMediaUrl = "ActivateMedia";
	var requestUrl = urlTemplate({url:activateMediaUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl, mediaJson);
	return returnedClient;
	
};

exports.resetMedia = function (mediaJson) {
	
	var resetMediaUrl = "ResetMedia";
	var requestUrl = urlTemplate({url:resetMediaUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl, mediaJson);
	return returnedClient;
	
};


//NOT USING
exports.activateAllMedia = function () {
	var activateAllUrl = "ActivateAllMedia";
	var requestUrl = urlTemplate({url:activateAllUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
};

exports.getImportedInstagramMedia = function(broadcastMediaType) {
	
	var importedMediaUrl = "GetImportedInstagramMedia";
	if(!_.isUndefined(broadcastMediaType)) {
		var baseUrl ="GetImportedInstagramMedia?faceOffMediaType=";
		importedMediaUrl =  encodeURI(baseUrl.concat(broadcastMediaType.toString()));
	}
	var requestUrl = urlTemplate({url:importedMediaUrl});	
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
};


exports.getActiveInstagramMedia = function(broadcastMediaType) {
	
	var activeMediaUrl = "GetActiveInstagramMedia";
	if(!_.isUndefined(broadcastMediaType)) {
		var baseUrl ="GetActiveInstagramMedia?faceOffMediaType=";
		activeMediaUrl =  encodeURI(baseUrl.concat(broadcastMediaType.toString()));
	}
	var requestUrl = urlTemplate({url:activeMediaUrl});	
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
};



exports.ImportInstagramMedia = function( ) {
	
	
	var importInstagramUrl = "ImportInstagramMedia";
	var requestUrl = urlTemplate({url:importInstagramUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
};

exports.removeInstagram = function()
{
	var removeInstagramUrl = "RemoveInstagramAccount";
	var requestUrl = urlTemplate({url:removeInstagramUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
};

// END MEDIA AND INSTAGRAM **********************************************************************************************************************************************************



/// ACCOUNT **********************************************************************************************************************************************************


exports.getInstagramAccountsToFollow = function () {
   
    var tofollowUrl = "GetInstagramAccountsToFollow";
	var requestUrl =urlTemplate({url:tofollowUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
    return returnedClient;	
	
};

exports.searchUser = function (userName) {

	var baseUrl = "SearchUser?userName="+ userName; 	
	searchUrl =  encodeURI(baseUrl);
	var requestUrl = urlTemplate({url:searchUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
	
};

exports.getFollowers = function(externalId, skip){
	
	var baseUrl = "GetFollowers?externalId="+ externalId + "&skip=" + skip;	
	getFollowersUrl =  encodeURI(baseUrl);
	var requestUrl = urlTemplate({url:getFollowersUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
	
};

exports.getFollowing = function(externalId, skip){
	
	var baseUrl = "GetFollowing?externalId="+ externalId + "&skip=" + skip;	
	getFollowingUrl =  encodeURI(baseUrl);
	var requestUrl = urlTemplate({url:getFollowingUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
	
};


exports.follow = function (accountGuid) {
    var followUrl = "Follow";
	var requestUrl =urlTemplate({url:followUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl,accountGuid);
    return returnedClient;

	
};

exports.unFollow = function (accountGuid) {
    var unfollowUrl = "UnFollow";
	var requestUrl =urlTemplate({url:unfollowUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl,accountGuid);
    return returnedClient;

	
};

exports.getProfile = function (accountGuid)
{  
	var baseUrl =  "Profile?id=";
	var getProfileUrl = encodeURI(baseUrl.concat(accountGuid));
	var requestUrl =urlTemplate({url:getProfileUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
    return returnedClient;
	
};

exports.getCurrentAccount = function(){
	
	var getAccountUrl = "GetAccount";
	var requestUrl =urlTemplate({url:getAccountUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
    return returnedClient;
	
};

exports.createAccount = function(accountJson){

var createAccountUrl = 'Account';
var requestUrl =urlTemplate({url:createAccountUrl});
var returnedClient = webClient.getWebClient(noAuth,requestUrl, accountJson);

return returnedClient;


};

exports.login = function(loginJson){
	
var loginUrl = 'Login';
var requestUrl = urlTemplate({url:loginUrl});
var returnedClient = webClient.getWebClient(noAuth,requestUrl, loginJson);
return returnedClient;
		
};

exports.linkAccounts = function(){
	var linkAccountsUrl = 'LinkAccounts';
	var requestUrl = urlTemplate({url:linkAccountsUrl});
	var returnedClient = webClient.getWebClient(yesAuth, requestUrl);
	return returnedClient;
	
};

exports.reactivateAccount = function(loginJson){
	
var loginUrl = 'ReactivateAccount';
var requestUrl = urlTemplate({url:loginUrl});
var returnedClient = webClient.sendRequest(noAuth,requestUrl, loginJson);
return returnedClient;
		
};

exports.getEgoMap = function ()
{
	var getEgoMap = 'GetEgoMap';	
	var requestUrl =  urlTemplate({url:getEgoMap});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
};

//END ACCOUNT **********************************************************************************************************************************************************


/// FACEOFF **********************************************************************************************************************************************************
exports.addFaceoffBroadcast = function (broadcastJson) {

var addFaceOffBroadcastUrl = 'AddFaceOffBroadcast';	
var requestUrl =  urlTemplate({url:addFaceOffBroadcastUrl});
var returnedClient = webClient.getWebClient(yesAuth,requestUrl, broadcastJson);
return returnedClient;
	
};
exports.addFaceOffRequest = function(faceOffJson) {

var addFaceOff = 'AddFaceOff';	
var requestUrl =  urlTemplate({url:addFaceOff});
var returnedClient = webClient.getWebClient(yesAuth,requestUrl, faceOffJson);
return returnedClient;
	
};

exports.getExplorePageView = function()
{
	var getExplore = "GetExplorePageView";
	var requestUrl =  urlTemplate({url:getExplore});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
};



exports.getFaceoffBroadcastView = function (json) {
	
	var getMediaPageView = "GetBroadcastPageView";	
	var requestUrl = urlTemplate({url:getMediaPageView});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl, json);
	return returnedClient;
	
};

exports.getFaceOffPageView = function (json) {
	
	var getFaceOffPageView = "GetFaceOffPageView";	
	var requestUrl = urlTemplate({url:getFaceOffPageView});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl, json);
	return returnedClient;
	
};


exports.getFaceOffBroadcast = function (id) {
	
	var baseUrl ="FaceOffBroadcast?id=";
    var getFaceOffUrl =  encodeURI(baseUrl.concat(id.toString()));
	var requestUrl = urlTemplate({url:getFaceOffUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
};


exports.getFaceOff = function (id) {
	
	var baseUrl ="GetFaceOff?id=";
    var getFaceOffUrl =  encodeURI(baseUrl.concat(id.toString()));
	var requestUrl = urlTemplate({url:getFaceOffUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
};

exports.getFaceOffsByAccountId = function(accountGuid, skip)
{
	var baseUrl = "GetFaceOffsByAccountId?accountId=" + accountGuid + "&skip=" + skip;
	var getFaceOffsByAccountUrl = encodeURI(baseUrl);
	var requestUrl = urlTemplate({url:getFaceOffsByAccountUrl});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
};



exports.getAlerts = function (skip) {
	
	var getAlerts = "GetAlerts";
	/*if(!_.isUndefined(skip)) {
		var baseUrl = "GetAlerts?skip=" + skip;
		getAlerts = encodeURI(baseUrl);
	}
	*/
	
	var requestUrl = urlTemplate({url:getAlerts});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl);
	return returnedClient;
	
};


exports.acceptFaceOff = function(faceOffJson)
{
	var acceptFaceOff = 'AcceptFaceOff';	
	var requestUrl =  urlTemplate({url:acceptFaceOff});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl, faceOffJson);
	return returnedClient;
	
	
};


exports.rejectFaceOff = function(faceOffJson)
{
	var rejectFaceOff = 'RejectFaceOff';	
	var requestUrl =  urlTemplate({url:rejectFaceOff});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl, faceOffJson);
	return returnedClient;
	
	
};

exports.voteFaceOff = function(faceOffJson)
{
	
	var voteFaceOff = 'VoteFaceOff';	
	var requestUrl =  urlTemplate({url:voteFaceOff});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl, faceOffJson);
	return returnedClient;
};

exports.createComment = function (commentJson)
{
	var commentFaceOff = 'CommentFaceOff';	
	var requestUrl =  urlTemplate({url:commentFaceOff});
	var returnedClient = webClient.getWebClient(yesAuth,requestUrl, commentJson);
	return returnedClient;
	
};


// END FACEOFF **********************************************************************************************************************************************************

