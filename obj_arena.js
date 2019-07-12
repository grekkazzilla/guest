var OBJ_arena=new Object();
OBJ_arena.arrName=new Array('Shuffle','Classic','End Game','Three Queens','Revolt','Pawn Attack','Random','Horde','Wedge'),
OBJ_arena.arr=new Array();
var numOn=getLocal('arena_num_on',0)*1; if((typeof numOn)!='number' || numOn<0 || numOn>4) numOn=0;
OBJ_arena.numOn=numOn;
class arena{
 constructor(num){
  this.num=num;
  var intVar=getLocal('var'+num,1)*1; if((typeof intVar)!='number' || intVar<0 || intVar>8) intVar=1;
  var strSide=getLocal('str_side'+num,'any'); if((typeof strSide)!='string' || (strSide!='white' && strSide!='black' && strSide!='any')) strSide='any';
  var blnSide=getLocal('bln_side'+num,true); if((typeof blnSide)!='boolean' || (blnSide!==true && blnSide!==false)) blnSide=true;
  this.intVar=intVar;
  this.strSide=strSide;
  this.blnSide=blnSide;
  this.objMatch=null;
  var intBaseA=getLocal('baseA'+num,900)*1; if((typeof intBaseA)!='number' || intBaseA<0 || intBaseA>172800) intBaseA=900;
  var intBaseB=getLocal('baseB'+num,0)*1; if((typeof intBaseB)!='number' || intBaseB<0 || intBaseB>172800) intBaseB=0;
  var intBaseC=getLocal('baseC'+num,0)*1; if((typeof intBaseC)!='number' || intBaseC<0 || intBaseC>172800) intBaseC=0;
  var intBaseD=getLocal('baseD'+num,0)*1; if((typeof intBaseD)!='number' || intBaseD<0 || intBaseD>172800) intBaseD=0;
  var intDelayA=getLocal('delayA'+num,15)*1; if((typeof intDelayA)!='number' || intDelayA<0 || intDelayA>172800) intDelayA=15;
  var intDelayB=getLocal('delayB'+num,15)*1; if((typeof intDelayB)!='number' || intDelayB<0 || intDelayB>172800) intDelayB=15;
  var intDelayC=getLocal('delayC'+num,15)*1; if((typeof intDelayC)!='number' || intDelayC<0 || intDelayC>172800) intDelayC=15;
  var intDelayD=getLocal('delayD'+num,15)*1; if((typeof intDelayD)!='number' || intDelayD<0 || intDelayD>172800) intDelayD=15;
  var intMoveA=getLocal('moveA'+num,1000)*1; if((typeof intMoveA)!='number' || intMoveA<0 || intMoveA>1000) intMoveA=1000;
  var intMoveB=getLocal('moveB'+num,20)*1; if((typeof intMoveB)!='number' || intMoveB<0 || intMoveB>1000) intMoveB=20;
  var intMoveC=getLocal('moveC'+num,20)*1; if((typeof intMoveC)!='number' || intMoveC<0 || intMoveC>1000) intMoveC=20;
  var intMoveD=getLocal('moveD'+num,1000)*1; if((typeof intMoveD)!='number' || intMoveD<0 || intMoveD>1000) intMoveD=1000;
  var blnIncrementA=getLocal('incrementA'+num,false); if((typeof blnIncrementA)!='boolean' || (blnIncrementA!==true && blnIncrementA!==false)) blnIncrementA=false;
  var blnIncrementB=getLocal('incrementB'+num,false); if((typeof blnIncrementB)!='boolean' || (blnIncrementB!==true && blnIncrementB!==false)) blnIncrementB=false;
  var blnIncrementC=getLocal('incrementC'+num,false); if((typeof blnIncrementC)!='boolean' || (blnIncrementC!==true && blnIncrementC!==false)) blnIncrementC=false;
  var blnIncrementD=getLocal('incrementD'+num,false); if((typeof blnIncrementD)!='boolean' || (blnIncrementD!==true && blnIncrementD!==false)) blnIncrementD=false;
  this.intBaseA=intBaseA;
  this.intBaseB=intBaseB;
  this.intBaseC=intBaseC;
  this.intBaseD=intBaseD;
  this.intDelayA=intDelayA;
  this.intDelayB=intDelayB;
  this.intDelayC=intDelayC;
  this.intDelayD=intDelayD;
  this.intMoveA=intMoveA;
  this.intMoveB=intMoveB;
  this.intMoveC=intMoveC;
  this.intMoveD=intMoveD;
  this.blnIncrementA=blnIncrementA;
  this.blnIncrementB=blnIncrementB;
  this.blnIncrementC=blnIncrementC;
  this.blnIncrementD=blnIncrementD;
 }
}
for(var i=0;i<5;i++){
 var objArena=new arena(i);
 OBJ_arena.arr.push(objArena);
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
//
function sendArena(objClub){
  var strSend='';
  objClub.conn.send('send_arena~'+strSend);
}
