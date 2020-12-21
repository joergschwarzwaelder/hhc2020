// ==UserScript==
// @name         Snowball
// @namespace    http://tampermonkey.net/
// @version      2.71828189
// @description  KringleCon 2020: Win Snowball Impossible
// @author       joergen's Elf
// @match        https://snowball2.kringlecastle.com/*
// @grant    GM_openInTab
// @grant    GM_setValue
// @grant    GM_getValue
// @grant    GM_addValueChangeListener
// ==/UserScript==

(function() {
    'use strict';
    var fl=document.getElementById("FriendlyLookout");
    if(fl){
      if(fl.innerHTML.includes('Redacted')){ // Impossible Game
        GM_openInTab('https://snowball2.kringlecastle.com/?managedby=elf');
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
      }else{ // Easy Game
        setTimeout(solve,5000);
        return;
    }
    }else{ // Game selection page
        if(location.search.includes("managedby=elf")){
          var r=GM_getValue("ELF",0);
          document.getElementById("playerName").value=r;
          document.forms[0].submit();
        }
        return;
    };

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
    GM_setValue("ELF",extractNumber());
    var lastx,lasty,mytimeout;
    GM_addValueChangeListener("CHECK", (name, old_value, new_value, remote) => {
      if(mytimeout)window.clearTimeout(mytimeout);
      var coord=new_value.split("-");
      if(lastx){
        document.getElementById('0,'+lastx+','+lasty).style.backgroundColor="";
        document.getElementById('0,'+lastx+','+lasty).style.backgroundImage="";
        document.getElementById('0,'+lastx+','+lasty).style.backgroundSize="";
      }
      document.getElementById('0,'+coord[0]+','+coord[1]).style.backgroundColor="#ffff80";
      document.getElementById('0,'+coord[0]+','+coord[1]).style.backgroundImage="url('https://2020.kringlecon.com/images/avatars/hen2.png')";
      var box=document.getElementById('0,'+coord[0]+','+coord[1]);
      document.getElementById('0,'+coord[0]+','+coord[1]).style.backgroundSize=box.offsetWidth+"px "+box.offsetHeight+"px";
      lastx=coord[0]; lasty=coord[1];
      mytimeout=window.setTimeout(function(){
        console.log("last hit: "+lastx+","+lasty);
        ws.send('{"Type":"FireForEffect","Cell":['+lasty+','+lastx+']}');
      }, 3000);
    });

    GM_addValueChangeListener("HIT", (name, old_value, new_value, remote) => { // console.log(name);
    var coord=new_value.split("-");
    ws.send('{"Type":"FireForEffect","Cell":['+coord[1]+','+coord[0]+']}');
    ws.send('{"Type":"SplashOut"}');
    })

async function solve(){
  for(var x=0;x<=9;x++){
    for(var y=0;y<=9;y++){ var yy=y; if(x%2==1){ yy=9-y; }
      GM_setValue("CHECK",x+"-"+yy);
      ws.send('{"Type":"FireForEffect","Cell":['+yy+','+x+']}');
      await sleep(500);
      var cell=document.getElementById('0,'+x+','+yy);
      if(cell.className.includes('hit')){ console.log(x+","+yy); GM_setValue("HIT",x+"-"+yy); }
      ws.send('{"Type":"SplashOut"}');
    }
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
