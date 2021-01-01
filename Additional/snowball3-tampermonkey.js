// ==UserScript==
// @name         Snowball3
// @namespace    http://tampermonkey.net/
// @version      2.71828189
// @description  KringleCon 2020: Win Snowball Impossible using Prediction
// @author       joergen's Elf
// @match        https://snowball2.kringlecastle.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var fl=document.getElementById("FriendlyLookout");
    if(fl){
      if(fl.innerHTML.includes('Redacted')){ // Impossible Game
        var findComments = function(el) {
          var arr = [];
          for(var i = 0; i < el.childNodes.length; i++) {
            var node = el.childNodes[i];
            if(node.nodeType === 8) {
              arr.push(node);
            } else {
              arr.push.apply(arr, findComments(node));
            }
          }
          return arr;
        }
        var MT = [],
        index = 0,
        init = false;
         var commentNodes = findComments(document);
         var rndarray=commentNodes[0].nodeValue.split(/\n/);
         var g=0;
         rndarray.forEach(function(e){
           var n=e.match(/\d+/);
           if(n){
             MT[g]=untemper(n[0]);
             g++;
           }
         });
         index=0;
         var rnd=extractNumber();
	 // start second game on level easy with predicted seed
         post(rnd);
         setTimeout(connect,1000);
       }
     }

var connected=false;
var x=0; var y=0; var dir=1;
var mytargetx=0; var mytargety=0;
    var curx=0; var cury=0;

function inc(){
  if(y%2==0){ x++; dir=1; }
  else{ x--; dir=-1; }
  if(x>9){ x--; y++; }
  if(x<0){ x++; y++; }
}

function connect(){
    var myws=new WebSocket('wss://snowball2.kringlecastle.com/ws');
    myws.onopen = function (event) {
      console.log("myws Connected!");
      myws.send('{"Type":"Recon","Difficulty":0}');
    }
    myws.onmessage = function (event) {
      console.log("Incoming myws: " + event.data);
      var messageIn = JSON.parse(event.data);
      var box;
      if (messageIn.Type == "SALUTE"){
        console.log("Salut! Ça va?");
        connected=true;
        if(mytargetx>=0){
          //document.getElementById('0,'+mytargetx+','+mytargety).style.backgroundColor="";
          document.getElementById('0,'+mytargetx+','+mytargety).style.backgroundImage="";
          document.getElementById('0,'+mytargetx+','+mytargety).style.backgroundSize="";
          document.getElementById('0,'+mytargetx+','+mytargety).style.transform="";
        }
        document.getElementById('0,'+x+','+y).style.backgroundColor="#ffff80";
        document.getElementById('0,'+x+','+y).style.transform="scaleX("+dir+")";
        document.getElementById('0,'+x+','+y).style.backgroundImage="url('https://2020.kringlecon.com/images/avatars/hen2.png')";
        box=document.getElementById('0,'+x+','+y);
        document.getElementById('0,'+x+','+y).style.backgroundSize=box.offsetWidth+"px "+box.offsetHeight+"px";
        myws.send('{"Type":"FireForEffect","Cell":['+y+', '+x+']}');
        cury=y; curx=x;
        inc();
      }
      if (messageIn.Type == "Incoming"){
        if(mytargetx>=0){
          //document.getElementById('0,'+mytargetx+','+mytargety).style.backgroundColor="";
          document.getElementById('0,'+mytargetx+','+mytargety).style.backgroundImage="";
          document.getElementById('0,'+mytargetx+','+mytargety).style.backgroundSize="";
          document.getElementById('0,'+mytargetx+','+mytargety).style.transform="";
        }
        document.getElementById('0,'+x+','+y).style.backgroundColor="#ffff80";
        document.getElementById('0,'+x+','+y).style.transform="scaleX("+dir+")";
        document.getElementById('0,'+x+','+y).style.backgroundImage="url('https://2020.kringlecon.com/images/avatars/hen2.png')";
        box=document.getElementById('0,'+y+','+x);
        document.getElementById('0,'+x+','+y).style.backgroundSize=box.offsetWidth+"px "+box.offsetHeight+"px";
        myws.send('{"Type":"FireForEffect","Cell":['+y+', '+x+']}');
        cury=y; curx=x;
        inc();
      }
      if (messageIn.Type == "Redirect"){
        if(messageIn.Location.indexOf("win")>-1){
          ws.send('{"Type":"SplashOut"}');
          ws.send('{"Type":"FireForEffect","Cell":['+cury+', '+curx+']}');
        }
        myws.close();
        connect();
      }
      if(messageIn.Type == "SplashOver"){
          var status=messageIn.Message;
          mytargety = messageIn.Cell[0];
          mytargetx = messageIn.Cell[1];
          if(status == "HIT!"){
            document.getElementById('0,'+mytargetx+','+mytargety).style.backgroundColor="";
            document.getElementById('0,'+mytargetx+','+mytargety).style.backgroundImage="";
            document.getElementById('0,'+mytargetx+','+mytargety).style.backgroundSize="";
            document.getElementById('0,'+mytargetx+','+mytargety).style.transform="";
            ws.send('{"Type":"SplashOut"}');
            ws.send('{"Type":"FireForEffect","Cell":['+mytargety+', '+mytargetx+']}');
            mytargetx=-1; mytargety=-1;
          }
          myws.send('{"Type":"SplashOut"}');
      }
    }
}

function post(rnd){
	var r = null;

	if(window.XMLHttpRequest)
	{
		r = new XMLHttpRequest();
	}
	else if(window.ActiveXObject)
	{
		try
		{
			r = new ActiveXObject('Msxml2.XMLHTTP');
		}
		catch(e1)
		{
			try
			{
				r = new ActiveXObject('Microsoft.XMLHTTP');
			}
			catch(e2)
			{
				console.log("XHR not possible");
			}
		}
	}
	if(r != null)
	{
		r.open('POST', 'https://snowball2.kringlecastle.com/game', true);
		r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		r.send('difficulty=0&playerName='+rnd+'&playerID=HughRansomDrysdale');

		console.log("POST ok");
	}
}

// Initialize the generator from a seed
function initializeGenerator(seed) {
    MT[0] = seed;
    for (var i = 1; 624 > i; ++i) { // loop over each other element
        MT[i] = (0x6c078965 * (MT[i-1] ^ (MT[i] >> 30)) + i) & 0xffffffff;
    }
}

// Extract a tempered pseudorandom number based on the index-th value,
// calling generateNumbers() every 624 numbers
function extractNumber() {
    if (index == 0) {
        generateNumbers();
    }
    var y = MT[index];
    y=y>>>0;
    var yy=(y/(2**11)) & 0x7fffffff;
    yy=yy>>>0;
    y ^= yy; // ((y >> 11) >>>0);
    y=y>>>0;
    y ^= (y << 7) & 0x9d2c5680;
    y=y>>>0;
    y ^= (y << 15) & 0xefc60000;
    y=y>>>0;
    yy=(y/(2**18)) & 0x7fffffff;
    y ^= yy; // (y >> 18);
    y=y>>>0;
    index = (index + 1) % 624;
    return y;
}

// Generate an array of 624 untempered numbers
function generateNumbers() {
    for (var i = 0; 624 > i; ++i) {
        var y = (MT[i] & 0x80000000) | (MT[(i+1) % 624] & 0x7fffffff);
        y=y>>>0;
        var xA = (y/2) & 0x7fffffff;
        xA=xA>>>0;
        if((y % 2) != 0){ xA = xA ^ 0x9908b0df; }
        xA=xA>>>0;
        MT[i]=MT[(i+397)%624] ^ xA;
        MT[i]=MT[i]>>>0;
    }
}

function untemper(y){
    y ^= (y >>> 18);
    y ^= ((y << 15 >>> 0) & 0xefc60000) >>> 0;
    for(var i = 0; i<7; i++){
        y ^= (y << 7) & 0x9d2c5680;
    }
    for(i = 0; i<3; i++){
        y ^= (y >>> 11) & 0xffffffff
    }
    y=y>>>0;
    return y;
}

})();
