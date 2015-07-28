var args = arguments[0] || {};
var validate = require('hdjs.validate');
var validator = new validate.FormValidator();

var selectedTab = args.tab;

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
	
	 var addMediaView = Alloy.createController('/faceOff/createFaceOffRequestAddMedia', {title: $.txtFaceOffTitle.value, tab: selectedTab}).getView();
	 selectedTab.open(addMediaView);

 
	}
	
	
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
