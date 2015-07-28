var navigation = require("navigation");
var uiHelper = require("uiHelper");
var egomadnessApi =  require('egoapiclient');
var args = arguments[0] || {};
var mediaUrl = args.MediaUrl;
var mediaType = args.MediaFaceOffType;
var ownerName = args.ownerName;
var createDate = args.createDate;
var canFaceOff = args.canFaceOff;
var broadcastId = args.id;
var ownerProfileUrl = args.OwnerProfileUrl;
var title = args.title;
var alreadyRequested = args.alreadyRequested;
var accountGuid = args.accountGuid;







var broadcastView = Alloy.createController('/faceoff/broadcastView', {
					mediaUrl:  mediaUrl,
					mediaType: mediaType,
					ownerName: ownerName,
					createDate: createDate,
					canFaceOff: canFaceOff,
					id: broadcastId,
					ownerProfileUrl: ownerProfileUrl,
					title: title,
					alreadyRequested: alreadyRequested,
					accountGuid: accountGuid								
				}).getView();
				
$.tableRowMedia.add(broadcastView);
