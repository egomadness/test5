var tokenhelper = require('tokenhelper');

function pulsate() {
    
  /*  var tr_init = Titanium.UI.create2DMatrix();
    var tr_start = tr_init.translate(7,0);
    var tr_anim = tr_init.translate(-14,0);
    
    //Translation to start from
    view.transform=tr_start;
   
    //Animation
    var a = Titanium.UI.createAnimation();
    a.transform = tr_anim;
    a.duration = 150;
    a.autoreverse = true;
    a.repeat = 50;
    a.delay = 0;

    //Return to initial position
    a.addEventListener('complete',function() {    
      view.transform=tr_init;
    });

    //Execute Animation
    view.animate(a);
    */
   var view = $.imgLogo; 
   view.animate({
	height:200,
	width:200,
	repeat:7,
	autoreverse: true,
	curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT,
	duration :600
});
   
  }//shake



function signup(e) {
    var signup =  Alloy.createController('SignUp').getView();
    
    //NavGroup Name
    $.index.openWindow(signup);
		
}

function login(e) {
    var login =  Alloy.createController('login').getView();
    
    //NavGroup Name
    $.index.openWindow(login);
		
}


// AutoLogin ********
var token = tokenhelper.getToken();
var tokenIsEmpty = tokenhelper.tokenIsEmpty(token);
if(!(Boolean(tokenIsEmpty)))
{
	var home =  Alloy.createController('home').getView();
    home.open();
}
else{
	
$.index.open();	

pulsate();
}

//*******************


