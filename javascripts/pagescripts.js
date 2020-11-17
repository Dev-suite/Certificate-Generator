// JavaScript Document

// IE Exclusion variable.
// A value of '6' means that all IE versions 6 and earlier will receive a warning message. Later versions will be accepted.
// If site is available to all versions of IE, set to zero '0';
var IEexclusion = 6;

// Apple Portable Exlusion variable.
// A value of 'true' will display a warning message to users of Apple portable devices (iPad, iPod and iPhone).
var ApplePortableExclusion = false;

//Variable for loading functions to be triggered upon window.onload
var loadItems = new Array();

//Function for triggering functions upon window.onload
function initPage(){
	for(var i = 0;i < loadItems.length;i++){
    	eval(loadItems[i]);
	}
}

//Function for adding functions to be triggered upon window.onload
function initAdd(func){
  loadItems[loadItems.length] = func;
}

//Variable for loading functions to be triggered upon window.resize
var resizeItems = new Array();

//Function for triggering functions upon window.resize
function resizePage(){
	for(var i = 0;i < resizeItems.length;i++){
    	eval(resizeItems[i]);
	}
}

//Function for adding functions to be triggered upon window.resize
function resizeAdd(func){
  resizeItems[resizeItems.length] = func;
}

//Code to ascertain IE Version.
if (navigator.appName == 'Microsoft Internet Explorer') {
	var ua = navigator.userAgent;
	var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if (re.exec(ua) != null){
		iev = parseFloat(RegExp.$1);
		if(iev <= IEexclusion){
			alert("I can't help but notice that you are using Internet Explorer version "+iev+".\n\nUnfortunately this website content requires Internet Explorer version "+(IEexclusion+1)+" or newer.\n\nTo enjoy all that this website has to offer, please update your browser.");		
		}
	}
}

//Code to ascertain Apple Portable Device.
var device = false;
if (navigator.userAgent.match(/iPhone/i)) {
	device = "iPhone";
} else if (navigator.userAgent.match(/iPod/i)) {
	device = "iPod";
} else if (navigator.userAgent.match(/iPad/i)) {
	device = "iPad";
}
if(ApplePortableExclusion && device){
	alert("Unfortunately this website content will not display correctly on your "+device+". We apologise for any inconvenience.");
}

//Function to retrieve active window area.
function getWindowSize(){
	windowSize=new Object();
	if( typeof( window.innerWidth ) == 'number' ) {
		windowSize.height = window.innerHeight; windowSize.width = window.innerWidth;
		windowSize.scrollHeight = window.pageYOffset; windowSize.scrollWidth = window.pageXOffset;
	} else if( document.documentElement && document.documentElement.clientWidth ) {
		windowSize.height = document.documentElement.clientHeight; windowSize.width = document.documentElement.clientWidth;
		windowSize.scrollHeight = document.documentElement.scrollTop; windowSize.scrollWidth = document.documentElement.scrollLeft;
	} else if( document.body && document.body.clientWidth ) {
		windowSize.height = document.body.clientHeight; windowSize.width = document.body.clientWidth;
		windowSize.scrollHeight = document.body.scrollTop; windowSize.scrollWidth = document.body.scrollLeft;
	}	
	return windowSize;
}

//Just a demo function. Can be deleted.
function showLoad(){
	alert("Page has loaded.");
}

//Just a demo function. Can be deleted.
function showWidthAndHeight(){
	windowSize = getWindowSize();
	document.getElementById("showStatus").innerHTML = windowSize.width + " x " + windowSize.height + " pixels visible area";
}














function str_replace(searchFor,replaceWith,subject){
	return 	subject.split(searchFor).join(replaceWith);
}

function updateURL(){
	var fields = new Array('certificate_id','certificate_title','certificate_action','certificate_recipient','certificate_reason','certificate_date');
	var prefix = new Array('cert','title','action','rec','reason','date');
	var url = "http://www.branchus.com.au/certificatemagic/create.php?";
	var amp = "";
	for(var i=0; i<fields.length; i++){
		var obj = document.getElementById(fields[i]);
		if(i==0){ amp = ""; } else { amp="&"; }
		url += amp + prefix[i] + "=" + str_replace(" ","%20",obj.value);
	}
	document.getElementById("generatedURL").value = url;
}




/* Personalise page */

function clearExamples(obj,checkText){
	var objID = parseInt(obj.id.substr(5,10));
	//alert(obj.id+"  "+objID);
	if(!exampleCleared[objID]){
		if(obj.value == checkText){
			//obj.value = "";
			exampleCleared[objID] = true;
		}
	}
	//obj.style.color = "#58585A";
	updateCert();
}

function updateCert(){
	setTimeout("doUpdate()",100);
}

function doUpdate(){
	for(var i = 0; i< chars.length ; i++){
		var fieldText = document.getElementById("field"+i).value;
		var count = fieldText.length;
		document.getElementById("wordcount"+i).innerHTML = count+"/"+chars[i];
		document.getElementById("textline"+i).innerHTML = fieldText;
	}
	Cufon.refresh();
}

function prepPreview(){
	var certificateWidth = 279.4;
	var certificateHeight = 215.9;
	var displayWidth = 396;
	var displayHeight = 306;
	var displayUnit = displayWidth/certificateWidth;
	
	for(var i=0 ; i< cufonFont.length ; i++){
		var textBox = document.getElementById("textline"+i);
		var pointsizeInMM = (pointsize[i]/72)*25.4;
		var lineHeight = Math.floor(pointsizeInMM*displayUnit);
		
		
		var offsetunit = 1.168/11;
		
		var baselineoffset = (pointsize[i]*offsetunit)*2.7;
		
		textBox.style.fontSize = lineHeight+"px";
		textBox.style.top = ((yloc[i]-baselineoffset)*displayUnit)+"px";
		
		switch (align[i])
		{
		case 'c':
		  textBox.style.left = Math.floor((xloc[i]*displayUnit) -( displayWidth/2)) + "px";
		  textBox.style.width = displayWidth+"px";
		  textBox.style.textAlign = "center";
		  break;
		case 'l':
		  textBox.style.left = Math.floor(xloc[i]*displayUnit)+"px";
		  textBox.style.textAlign = "left";
		  break;
		case 'r':
		  textBox.style.right = Math.floor(xloc[i]*displayUnit)+"px";
		  textBox.style.textAlign = "right";
		}
		
		var colours = colour[i].split(",");
		//alert( rgbToHex(parseInt(colours[0]),parseInt(colours[1]),parseInt(colours[2])) );
		textBox.style.color = rgbToHex(parseInt(colours[0]),parseInt(colours[1]),parseInt(colours[2]));
		
	}
	Cufon.refresh();
}

function generateCert(){
	document.getElementById("form1").submit();
}
	
	
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}



function displayit(addressnumber)
{
	if(addressnumber == 1){
		var s = "nbjmup;bddpvoutAdfsujgjdbufnbhjd/dpn";
		var extra = "%20accounts%20enquiry";
	} else if(addressnumber == 2){
		var s = "nbjmup;gffecbdlAdfsujgjdbufnbhjd/dpn";
		var extra = "%20feedback";
	} else {
		var s = "nbjmup;tvqqpsuAdfsujgjdbufnbhjd/dpn";
		var extra = "%20support%20enquiry";
	}
	var n = 0;
	var r = "";
	for( var i = 0; i < s.length; i++)
	{
		n = s.charCodeAt( i );
		if( n >= 8364 )
		{
			n = 128;
		}
		r += String.fromCharCode( n - 1 );
	}
	
	location.href=r+"?subject=[Certificate%20Magic"+extra+"]";
}

function populateDate(){
	var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = months[d.getMonth()];
	var curr_year = d.getFullYear();
	var allDivs = document.getElementsByTagName("input");
	var currentItem;
	var i = 0;
	var longdate = curr_date+" "+curr_month+" "+curr_year;
	
	var allItems = new Array();
	while (currentItem = allDivs.item(i++)) {
		currentItem.value = currentItem.value.split("[date]").join(longdate);
	}
}


	
window.onload=initPage;
window.onresize=resizePage;


//Just a demo. These can be deleted.
//initAdd("showLoad()");
//initAdd("showWidthAndHeight()");

//resizeAdd("showWidthAndHeight()");
//