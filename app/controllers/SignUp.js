var egomadnessApi =  require('egoapiclient');
var validate = require('hdjs.validate');
var validator = new validate.FormValidator();


function resetValidation(){
	$.txtEmail.borderColor ='white';
	$.txtUsername.borderColor ='white';
	$.txtPassword.borderColor ='white';
	$.lblError.text = '';
	$.lblError.visible = false;
	
}

function setValidation(name){
	
	if(name ==='email')
	{
		$['txtEmail'].borderColor = 'red';
	}
	else if(name === 'username')
	{		
		$['txtUsername'].borderColor = 'red';		
	}
	else if(name==='password')
	{
		$['txtPassword'].borderColor = 'red';
			
	}
			
}

function saveData(jsonData)
{
	
   var indicator =  Alloy.createController('indicator').getView();
   indicator.open();
 
	var created = 201;
	var returnedClient = egomadnessApi.createAccount(jsonData);
	returnedClient.onload = function(e) {
		indicator.close();
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(statusCode === created)
		{
			
			
			var login =  Alloy.createController('login', {username: $.txtUsername.value, password: $.txtPassword.value}).getView();
    	    login.open();
			
		}
		else
		{
			//Show error in the panel
			$.lblError.visible = true;
			_.each(responseJson.Errors, function(i){
				
				$.lblError.text =  $.lblError.text + i + '\n'; 
			});
			
		}
				
	};
    returnedClient.onerror = function(e){
    	indicator.close();
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
    
    var formattedJson = JSON.stringify(jsonData); 
    returnedClient.send(formattedJson);

	
}

var validationCallback = function(errors) {
	resetValidation();
	if(errors.length > 0) {
		
		var fieldName = errors[0].name;
		setValidation(fieldName);
		alert(errors[0].message);		
		
	} 
	else {
	
	 saveData({Email:$.txtEmail.value, UserName: $.txtUsername.value, Password: $.txtPassword.value });

 
	}
	
	
};

var returnCallback = function() {
	
	validator.run([
				{
					id: 'txtEmail',
				    value: $.txtEmail.value,
				    display: 'email',    
				    rules: 'required|valid_email'
				},
				{
					id: 'txtUsername',
				    value: $.txtUsername.value,
				    display: 'username',    
				    rules: 'required|min_length[3]|max_length[12]|alpha_numeric'
				},
				{
					id: 'txtPassword',
				    value: $.txtPassword.value,
				    display: 'password',    
				    rules: 'required|min_length[5]|alpha_numeric'
				}
				
			], validationCallback);	
};

var onChangeReset = function onChangeCallback(e)
{
	resetValidation();
};

$.txtUsername.addEventListener("change", onChangeReset);
$.txtPassword.addEventListener("change", onChangeReset);
$.txtEmail.addEventListener("change", onChangeReset);
$.btnSubmit.addEventListener('click', returnCallback);


