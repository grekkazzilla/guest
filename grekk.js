var grekk=new Object();
grekk.getBoard=function(qtyHor,qtyVer,qtyBan,strName){
  grekk.strName=strName; // chess variant name
  grekk.arrSqu=new Array(); // collection of fields on board
  grekk.arrUnit=new Array(); // collection of pieces on board
  grekk.blnTurn=true; // true for white to move, false for black to move
  grekk.blnLock=false; // if true, locking the program from ending a move and from selecting a new pos
  grekk.qtyHor=qtyHor; // quantity of horizontal playable squares
  grekk.qtyVer=qtyVer; // quantity of vertical playable squares
  grekk.qtyBan=qtyBan; // forbidden margin of unplayable squares around the board, on each side
  grekk.qtyFullHor=qtyHor+qtyBan*2; // horizontal full distance of squares, both forbidden and playable
  grekk.qtyFullVer=qtyVer+qtyBan*2; // vertical full distance of squares, both forbidden and playable
  grekk.posA=0; // the position with the picked piece on it, ready to move
  grekk.posB=0; // the position where the picked piece moves
  grekk.blnMove=false; // if true, move in progress, posA picked, posB not yet
  grekk.arrCheck=new Array(); // field positions with currently checked kings
  grekk.posEnPassant=0; // a field position which a pawn has jumped over in case it moves two squares
  grekk.arrHist=new Array(); // history of data changes after each move [(0)blnTurn,(1)posA,(2)posB,(3)arrTake,(4)arrCheck,(5)arrCastle,(6)posEnPassant,(7)numHalfMove,(8)numFullMove,(9)strFen,(10)strNota]
  grekk.numFullMove=1; // incremented only after black have moved, counting full moves
  grekk.numHalfMove=0; // incremented after each move, resets to zero after a pawn advanced or after any piece captured
  var numHor=grekk.qtyHor+1; // horizontal line number
  var numVer=0; // vertical line number
  var arrABC=new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
  for(var i=0;i<grekk.qtyFullHor*grekk.qtyFullVer;i++){
     var squ=new Object();
     squ.blnBan=true; // forbidden or playable field
     squ.pos=i; // field position on board, accounted by program
     squ.unit=null; // a piece on this square
     grekk.arrSqu.push(squ); // adding all fields with their position numbers to collection
     if(numVer%grekk.qtyFullVer==0){
        numHor--;
        numVer=0;
     }
     if(numHor>qtyBan && numHor<(qtyHor+qtyBan*2)-(qtyBan-1) && numVer>(qtyBan-1) && numVer<(qtyVer+qtyBan*2)-qtyBan) squ.blnBan=false;
     squ.numHor=numHor-qtyBan; // horizontal line number
     squ.numVer=numVer-qtyBan+1; // vertical line number
     // square notation
     if(squ.blnBan===false) squ.strNota=arrABC[numVer-qtyBan]+squ.numHor;
     else squ.strNota='';
     numVer++;
  }
}
grekk.setBoard=function(){

}
grekk.drawBoard=function(gRoot,strID,x,y,z,wSquare,pntLight,pntDark,blnShow){
  var qtyHor=grekk.qtyHor;
  var qtyVer=grekk.qtyVer;
  var qtyBan=grekk.qtyBan;
  var wBoard=wSquare*qtyVer;
  var hBoard=wSquare*qtyHor;
  var gBoard=getG(strID,gRoot,x,y,z,blnShow,wBoard/2,hBoard/2);
  grekk.gBoard=gBoard;
  grekk.blnSide=true;
  var x=0, y=0;
  for(var i=qtyBan;i<qtyHor+qtyBan;i++){
      for(var j=qtyBan;j<qtyVer+qtyBan;j++){
          var pos=j+i*grekk.qtyFullVer;
          var squ=grekk.arrSqu[pos];
          if((squ.numHor%2==0 && squ.numVer%2==0) || (squ.numHor%2>0 && squ.numVer%2>0)) var pnt=pntDark;
          else pnt=pntLight;
          var gSquare=getG('g'+pos,gBoard,x,y,1,true,wSquare/2,wSquare/2);
          getRect(null,gSquare,0,0,wSquare,wSquare,0,pnt,'none',0);
          gSquare.pos=pos;
          gSquare.onclick=function(){grekk.play(this);}
          x+=wSquare;
          //getText(null,gSquare,25,20,15,'Arial','#000','none',0,pos,'middle');
      }
      x=0;
      y+=wSquare;
  }
  grekk.pthPick=getPath(null,gBoard,-9999,-9999,1,'red','none',0,'M 0 0 L 15 0 L 0 15 Z M 35 0 L 50 0 L 50 15 Z M 50 35 L 50 50 L 35 50 Z M 0 35 L 15 50 L 0 50 Z');
  grekk.pthPick.setAttribute('opacity','0.5');
  grekk.arrAsset=new Array(); // circles - highlighters for where a unit can move, frames - highlighters for where a unit can capture, blurs for where a king unit gets checked
  return gBoard;
}
grekk.setPosA=function(){

}
grekk.setPosB=function(){

}
grekk.setMove=function(){

}
grekk.isUnitCaptured=function(){

}
grekk.isPositionValid=function(){

}
grekk.isKingChecked=function(){

}
grekk.isCheckMate=function(){

}
grekk.isStaleMate=function(){

}
grekk.isPawnJumped=function(){

}
grekk.isEnPassant=function(){

}
grekk.isPawnPromoted=function(){

}
grekk.setPromotion=function(){

}
grekk.isKingCastled=function(){

}
grekk.setFen=function(){

}
