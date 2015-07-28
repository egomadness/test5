var navigation = require("navigation");
var args = arguments[0] || {};

if(args.RequestsMenu === true)
{
	$.mainTabGroup.setActiveTab(1);	
}
 
if(args.moreMenu === true)
{
	$.mainTabGroup.setActiveTab(4);		
}

if(args.exploreMenu === true)
{
	$.mainTabGroup.setActiveTab(2);
}

navigation.setTabs($.tbFaceOff,$.tbMedia, $.tbExplore, $.tbAlerts,$.tbMore);


	
	