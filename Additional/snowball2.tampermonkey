// ==UserScript==
// @name         Snowball2
// @namespace    http://tampermonkey.net/
// @version      2.71828189
// @description  KringleCon 2020: Win Snowball Impossible using WebSocket vulns
// @author       joergen's Elf
// @match        https://snowball2.kringlecastle.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var fl=document.getElementById("FriendlyLookout");
    if(fl){
      if(fl.innerHTML.includes('Redacted')){ // Impossible Game
        setTimeout(connect,1000);
      }
    }

})();

var connected=false;
var x=0; var y=0; var dir=1;
var mytargetx=0; var mytargety=0;

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
      var difficulty = document.getElementById("statusDifficulty").value;
      myws.send('{"Type":"Recon","Difficulty":'+difficulty+'}');
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
        inc();
      }
      if (messageIn.Type == "Redirect"){
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
