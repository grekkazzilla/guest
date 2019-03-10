var OBJ_arena=new Object({
  intVar:1,
  blnSide:true,
  strSide:'any',
  strVS:'human',
  arrHist:new Array(),
  objDrive:null,
  numShowMove:0
});
// get < index.php
OBJ_arena.get=function(){
  var intVar=getLocal('var',1)*1; if((typeof intVar)!='number' || intVar<0 || intVar>8) intVar=1;
  var strSide=getLocal('side','any'); if((typeof strSide)!='string' || (strSide!='white' && strSide!='black' && strSide!='any')) strSide='any';
  var strVS=getLocal('vs','human'); if((typeof strVS)!='string' || (strVS!='human' && strVS!='robo' && strVS!='friend')) strVS='human';
  OBJ_arena.intVar=intVar;
  OBJ_arena.strSide=strSide;
  OBJ_arena.strVS=strVS;
}
//
OBJ_arena.setSide=function(strSide){
  OBJ_arena.strSide=strSide;
  setLocal('side',strSide);
}
// putSide < index.php
OBJ_arena.putSide=function(){
  var strSide=OBJ_arena.strSide;
  var btn=o('btnSide');
  var arrG=btn.getElementsByTagName('g'), gWhite=arrG[1], gBlack=arrG[2];
  if(strSide=='white'){
      gWhite.x=btn.rx-25;
      showG(gWhite);
      hideG(gBlack);
      OBJ_board.flip(true);
  }
  else if(strSide=='black'){
      gBlack.x=btn.rx-25;
      hideG(gWhite);
      showG(gBlack);
      OBJ_board.flip(false);
  }
  else if(strSide=='any'){
      gWhite.x=btn.rx-25-9;
      gBlack.x=btn.rx-25+9;
      showG(gWhite);
      showG(gBlack);
  }
}
//
function sendArena(objClub){
  var strSend='';
  objClub.conn.send('send_arena~'+strSend);
}
function putVS(){
    var strVS=OBJ_arena.strVS;
    var btn=o('btnMatch');
    var pth=btn.getElementsByTagName('path')[1];
    if(strVS==='human'){
        var z=0.12, y=5, p=picUser();
    }
    else if(strVS=='robo'){
        var z=0.14, y=10, p=picRobo();
    }
    else if(strVS=='friend'){
        var z=0.10, y=8, p=picGlad();
    }
    pth.setAttribute('transform','translate('+(btn.rx-p[0]*z/2)+','+y+') scale('+z+')');
    pth.setAttribute('d',p[2]);
}
