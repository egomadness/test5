var tabFaceOff = null;
var tabMedia = null; 
var tabExplore = null;
var tabAlerts = null;
var tabMore= null;


exports.setTabs = function (tbFaceOff, tbMedia, tbExplore, tbAlerts, tbMore) {

tabFaceOff = tbFaceOff;
tabMedia = tbMedia;
tabExplore = tbExplore;
tabAlerts = tbAlerts;
tabMore = tbMore;

		/*if(tabFaceOff == null){
	
				tabFaceOff = tbFaceOff;
	
		}

		if(tabMedia == null) {
	
			tabMedia = tbMedia;
		}
		
		if(tabExplore == null) {
			
			tabExplore = tbExplore;
			
		}
		if(tabAlerts == null) {
			
			tabAlerts = tbAlerts;
			
			
		}
		if(tabMore ==null) {
			
			tabMore = tbMore;
			
		}
		
		*/

};

exports.setMoreTab = function (tbMore)
{
	tabMore = tbMore;
	
};

exports.setMediaTab = function (tbMedia)
{
	
	tabMedia = tbMedia;
	
};

exports.getTabFaceOff = function () {
	
	return tabFaceOff;
};

exports.getTabMedia = function () {
	Ti.API.info(tabMedia);
	return tabMedia;
};

exports.getTabExplore = function () {

	return tabExplore;
	
};

exports.getTabAlerts = function () {
	
	return tabAlerts;
	
};

exports.getTabMore = function () {
	Ti.API.info(tabMore);
	return tabMore;
};






