var args = arguments[0] || {};
var message = args.message;

if(!_.isUndefined(message))
{
	
	$.lblMessage.text = message;
	
}
