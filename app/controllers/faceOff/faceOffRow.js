var args = arguments[0] || {};
var title = args.title;
var startTime = args.startTime;
var requestorName = args.requestorName;
var acceptorName = args.acceptorName;
var requestorPhoto = args.requestorPhoto;
var acceptorPhoto = args.acceptorPhoto;
var id = args.Id;
var navigation = require("navigation");
var uiHelper = require("uiHelper");
var acceptorGuid = args.acceptorGuid;
var requestorGuid = args.requestorGuid;
var faceOffTab = args.tab;




$.listCreateDate.text = startTime;
$.lblTitle.text = title;
$.userNameRequestor.text = requestorName;
$.photoRequestor.image = requestorPhoto;
$.userNameAcceptor.text = acceptorName;
$.photoAcceptor.image = acceptorPhoto;
	
var showFaceOff = function () {
	
	uiHelper.showFaceOff(id, faceOffTab);
  
	
};

$.btnSubmit.addEventListener('click', showFaceOff);
$.userNameAcceptor.addEventListener('click', function () {
	uiHelper.showProfile(acceptorGuid,faceOffTab);
});
$.userNameRequestor.addEventListener('click', function () { 
	uiHelper.showProfile(requestorGuid,faceOffTab);
});