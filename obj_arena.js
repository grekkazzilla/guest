var OBJ_arena=new Object({
  intVar:1,
  arrName:new Array('Shuffle','Classic','End Game','Three Queens','Revolt','Pawn Attack','Random','Horde','Wedge'),
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
  var intBase=getLocal('base',900)*1; if((typeof intBase)!='number' || intBase<60 || intBase>86400) intVar=900;
  var intAdd=getLocal('add',0)*1; if((typeof intAdd)!='number' || intAdd<0 || intAdd>86400) intAdd=0;
  var strClock=getLocal('clock','simple_delay'); if((typeof strClock)!='string' || (strClock!='simple_delay' && strClock!='accumulation' && strClock!='compensation')) strClock='simple_delay';
  OBJ_arena.intBase=intBase;
  OBJ_arena.intAdd=intAdd;
  OBJ_arena.strClock=strClock;
}
// < boxVar
OBJ_arena.setVar=function(intVar){
  OBJ_arena.intVar=intVar;
  setLocal('var',intVar);
}
// < index.php
// < boxVar
OBJ_arena.putVar=function(){
  var strFen='';
  switch(OBJ_arena.intVar){
    case 0: strFen=shuffleFen();break;
    case 2: strFen=endgameFen();break;
    case 3: strFen='nnnnknnn/pppppppp/8/8/8/8/PPPPPPPP/1Q1QK1Q1 w - - 0 1';break;
    case 4: strFen='1nn1k1n1/4p3/8/8/8/8/PPPPPPPP/4K3 w - - 0 1';break;
    case 5: strFen='rnbqkbnr/pppppppp/8/8/2PPPP2/1PP2PP1/PPPPPPPP/RNB1KBNR w KQkq - 0 1';break;
    case 6: strFen=randomFen();break;
    case 7: strFen='nnnnknnn/pppppppp/2p2p2/1pppppp1/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1';break;
    case 8: strFen='prbknrp1/1pnqbp2/2ppp3/3p4/4P3/3PPP2/2PBQNP1/1PRNKBRP w - - 0 1';break;
    default: strFen='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';break; // classic by default
  }
  OBJ_chess.setBoard(strFen);
  OBJ_board.putBoard();
  OBJ_arena.arrHist=new Array();
  OBJ_arena.arrHist[0]=new Array(strFen,false,false,false,false); // fen position, posA, posB, move notation, arrCheck
}
// < boxSide
OBJ_arena.setSide=function(strSide){
  OBJ_arena.strSide=strSide;
  setLocal('side',strSide);
}
// < index.php
// < boxSide
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
// < boxVS
OBJ_arena.setVS=function(strVS){
  OBJ_arena.strVS=strVS;
  setLocal('vs',strVS);
}
// < index.php
// < boxVS
OBJ_arena.putVS=function(){
  var strVS=OBJ_arena.strVS;
  var btn=o('btnMatch');
  var pth=btn.getElementsByTagName('path')[1];
  if(strVS==='human') var z=0.12, y=5, p=picUser();
  else if(strVS=='robo') var z=0.14, y=10, p=picRobo();
  else if(strVS=='friend') var z=0.10, y=8, p=picGlad();
  pth.setAttribute('transform','translate('+(btn.rx-p[0]*z/2)+','+y+') scale('+z+')');
  pth.setAttribute('d',p[2]);
}
// < boxTime
OBJ_arena.setTime=function(intBase,intAdd,strClock){
  OBJ_arena.intBase=intBase;
  OBJ_arena.intAdd=intAdd;
  OBJ_arena.strClock=strClock;
  setLocal('base',intBase);
  setLocal('add',intAdd);
  setLocal('clock',strClock);
}
// < index.php
// < boxTime
OBJ_arena.putTime=function(){
  var intBase=OBJ_arena.intBase;
  var intAdd=OBJ_arena.intAdd;
  var strClock=OBJ_arena.strClock;
  var btn=o('btnTime');
  var pth=btn.getElementsByTagName('path')[0];
  var txtA=btn.getElementsByTagName('text')[0];
  var txtB=btn.getElementsByTagName('text')[1];
  var strA=intBase/60+' min', strB=intAdd+' sec', yA=25;
  if(intAdd==0) strB='', yA=37;
  txtA.firstChild.nodeValue=strA;
  txtB.firstChild.nodeValue=strB;
  txtA.setAttribute('y',yA);
  if(strClock=='simple_delay') var p=picClock(), z=0.13, x=14;
  else if(strClock=='accumulation') var p=picHeap(), z=0.12, x=12;
  else if(strClock=='compensation') var p=picUp(), z=0.12, x=15;
  pth.setAttribute('transform','translate('+x+','+(btn.ry-p[1]*z/2)+') scale('+z+')');
  pth.setAttribute('d',p[2]);
}
//
function sendArena(objClub){
  var strSend='';
  objClub.conn.send('send_arena~'+strSend);
}
