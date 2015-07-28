var args = arguments[0] || {};
var type= args.type;
var isFollowingPeople = args.isFollowingPeople;
var faceOffType = 1;
var broadcastType = 2;
var noFaceOffs ="Hurry up little turtle and follow egos so you can watch FaceOffs!!";
var noFaceOffsFollowing ="The egos you're following suck!! They aren't FacingOff. Follow more egos!!";
var noBroadcasts = "Get to it!! Follow egos so you can see FaceOff requests!!";
var noBroadcastsFollowing ="Aww! The egos you're following aren't posting FaceOff requests. Follow more egos!!";

if(type === faceOffType)
{
	
	if(isFollowingPeople)
	{
		$.imgView.image = "suck.png";
		$.lblMessage.text = noFaceOffsFollowing;
		
	}
	else
	{
		$.imgView.image = "turtle.png";
		$.lblMessage.text = noFaceOffs;
	}
	
	
	
}
else 
{
	if(type === broadcastType)
	{
		
		if(isFollowingPeople)
		{
			$.lblMessage.text = noBroadcastsFollowing;
	        $.imgView.image = "cry.png";
			
			
			
		}
		else
		{
			$.lblMessage.text = noBroadcasts;
	        $.imgView.image = "rabbit.png";
			
		}
		
		
		
	}
	
	
	
}
