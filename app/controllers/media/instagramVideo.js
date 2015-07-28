var args = arguments[0] || {};

var id= args.id;
var videoPlayerHtml = "<video  style='position:absolute; top:0px; left:0px;' id='vid' preload='auto' width='306', height='306' src='" + args.url +  "'> </video>  <script>document.getElementById('vid').load(); </script>";
var webview = Titanium.UI.createWebView({html:videoPlayerHtml, width:'306', height:'306', backgroundImage:'loading.gif', backgroundColor:'black'});
$.listMedia.add(webview );
