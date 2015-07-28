var args = arguments[0] || {};
var egomadnessApi =  require('egoapiclient');
var tokenhelper = require('tokenhelper');
var validate = require('hdjs.validate');
var validator = new validate.FormValidator();


function saveData(jsonData)
{
	var indicator =  Alloy.createController('indicator').getView();
    indicator.open();
	var ok = 200;
	var returnedClient = egomadnessApi.login(jsonData);
	
	returnedClient.onload = function(e) {
		indicator.close();
		var responseJson = JSON.parse(this.responseText);
		var statusCode = returnedClient.status;
		if(Number(statusCode) === Number(ok)) {
			
			var token = responseJson.Token;
			if(!_.isUndefined(token)) {
						
				try {
					
					tokenhelper.setToken(String(token));
					var home =  Alloy.createController('home').getView();
    				home.open();
					
    				
				}
				catch(err) {
					
             		showError();
				}			
				
			}
			//No auth token 
			else {
				
				var locked = 2;
				var suspended = 3;
				if(Boolean(responseJson.WasAuthenticated)) {
					
					var status = Number(responseJson.AccountStatus);
					if(status === locked) {
						$.lblError.visible = true;
					    $.lblError.text = "your account is locked please try again later.";
						
					}
										
					else if(status === suspended) {
						
						$.lblError.visible = true;
					    $.lblError.text = "your account is suspended";
					}
					
					else {
					
						showError();
					}
										
				}
				else {
					
					$.lblError.visible = true;
					$.lblError.text = "username or password is incorrect";
				}
				
			} // end no auth token
			
			
		}
		else		{			
			
			showError();
						
		}
				
	};
	 returnedClient.onerror = function(e){
	 	
    	indicator.close();
    	egomadnessApi.showWebClientError(returnedClient);
    	
    };
	var formattedJson = JSON.stringify(jsonData); 
    returnedClient.send(formattedJson);
}

function resetValidation(){	
	$.txtUsername.borderColor ='white';
	$.txtPassword.borderColor ='white';
	$.lblError.visible = false;
	$.lblError.text ='';
}

function setValidation(name){
	
	 if(name === 'username')
	{		
		$['txtUsername'].borderColor = 'red';		
	}
	else if(name==='password')
	{
		$['txtPassword'].borderColor = 'red';
			
	}
			
}

function showError() {
	$.lblError.visible = true;
	$.lblError.text = "We've encountered an error. Please try again. \n Make sure you have internet connection.";
}

var validationCallback = function(errors) {
	resetValidation();
	if(errors.length > 0) {
		
		var fieldName = errors[0].name;
		setValidation(fieldName);
		alert(errors[0].message);		
		
	} else {
		
		saveData({UserName: $.txtUsername.value, Password: $.txtPassword.value });
		
	}
};

var returnCallback = function() {
	validator.run([				
				{
					id: 'txtUsername',
				    value: $.txtUsername.value,
				    display: 'username',    
				    rules: 'required|alpha_numeric'
				},
				{
					id: 'txtPassword',
				    value: $.txtPassword.value,
				    display: 'password',    
				    rules: 'required|alpha_numeric'
				}
				
			], validationCallback);	
};

var onChangeReset = function onChangeCallback(e)
{
	
	//e.source.borderColor ='white';
	resetValidation();
};

$.txtUsername.addEventListener("change", onChangeReset);
$.txtPassword.addEventListener("change", onChangeReset);
$.btnSubmit.addEventListener('click', returnCallback);

if(Boolean(Number(_.size(args)) === 2))
{
	$.txtUsername.visible = false;
	$.txtPassword.visible = false;
	$.btnSubmit.visible = false;
	
	saveData({UserName: args.username, Password: args.password });
	
	
}


