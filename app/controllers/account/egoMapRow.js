var args = arguments[0] || {};
var status = args.status;
var photo = args.photo;
var pointsLow = args.pointsLow;
var pointsHigh = args.pointsHigh;
var showPointsHigh = args.showPointsHigh;


	$.photoStatus.image = photo;
	if(Boolean(showPointsHigh))
	{
		$.lblPoints.text = pointsLow + " ego points - " + pointsHigh + " ego points";
		
	}
	else
	{
		$.lblPoints.text = pointsLow + " ego points and up";
		
	}
	
	$.lblStatus.text = status;
	