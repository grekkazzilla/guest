var OBJ_chess=new Object();
// string variables: str, chr, name, ctg (category), pnt (paint, color)
// integer variables: int, qty (quantity), num (number), dst (distance), mrg (margin), pos (position), x, y, z (scale), w (width), h (height), d (direction), s (step)
OBJ_chess.getBoard=function(qtyHor, qtyVer, mrgBan, nameVar){
   OBJ_chess.nameVar=nameVar; // chess variant name
   OBJ_chess.arrSqu=new Array(); // collection of squares on board
   OBJ_chess.arrUnit=new Array(); // collection of units on board
   OBJ_chess.qtyHor=qtyHor; // quantity of horizontal playable squares
   OBJ_chess.qtyVer=qtyVer; // quantity of vertical playable squares
   OBJ_chess.mrgBan=mrgBan; // forbidden margin of unplayable squares around the board, on each side
   OBJ_chess.dstVer=qtyVer+mrgBan*2; // vertical full distance of squares, both forbidden and playable
   OBJ_chess.dstHor=qtyHor+mrgBan*2; // horizontal full distance of squares, both forbidden and playable
   OBJ_chess.blnTurn=false; // true for white to move, false for black to move
   OBJ_chess.posA=false; // the position with the picked unit on it, ready to move
   OBJ_chess.posB=false; // the position where the picked unit moves
   OBJ_chess.blnLock=false; // if true, locking the program from ending a move and from selecting a new pos
   OBJ_chess.arrCheck=new Array(); // squares with currently checked kings
   OBJ_chess.arrTake=new Array(); // squares where the picked unit can go
   OBJ_chess.posEnPassant=false; // if a pawn has moved two squares, for fen notation
   OBJ_chess.numHalfClock=0; // for fen notation
   OBJ_chess.numFullMove=1; // for fen notation
   var numHor=OBJ_chess.dstHor+1; // horizontal line number
   var numVer=0; // vertical line number
   var arrABC=new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
   for(var i=0;i<OBJ_chess.dstHor*OBJ_chess.dstVer;i++){
      var squ=new Object();
      squ.blnPlay=false; // forbidden or playable square
      squ.pos=i; // square position on board
      squ.unit=false; // a unit on this square
      OBJ_chess.arrSqu.push(squ); // adding all squares to collection
      if(numVer%OBJ_chess.dstVer==0){
         numHor--;
         numVer=0;
      }
      if(numHor>mrgBan && numHor<(qtyHor+mrgBan*2)-(mrgBan-1) && numVer>(mrgBan-1) && numVer<(qtyVer+mrgBan*2)-mrgBan) squ.blnPlay=true;
      squ.numHor=numHor-mrgBan; // horizontal line number
      squ.numVer=numVer-mrgBan+1; // vertical line number
      // square notation
      if(squ.blnPlay) squ.strNota=arrABC[numVer-mrgBan]+squ.numHor;
      else squ.strNota='';
      numVer++;
   }
}
OBJ_chess.setBoard=function(strFen){
    OBJ_chess.clearBoard();
    var arr=strFen.split(' ');
    var row=arr[0].split('/');
    var pos=OBJ_chess.dstVer*OBJ_chess.mrgBan-OBJ_chess.mrgBan;
    for(var i=0;i<row.length;i++){
        pos+=OBJ_chess.mrgBan*2;
        var str=row[i];
        for(var j=0;j<str.length;j++){
            var chr=str.charAt(j);
            if(chr=="p") OBJ_chess.getUnit("pawn", false, pos);
            else if(chr=="b") OBJ_chess.getUnit("bishop", false, pos);
            else if(chr=="n") OBJ_chess.getUnit("knight", false, pos);
            else if(chr=="r") OBJ_chess.getUnit("rook", false, pos);
            else if(chr=="q") OBJ_chess.getUnit("queen", false, pos);
            else if(chr=="k") OBJ_chess.getUnit("king", false, pos);
            else if(chr=="g") OBJ_chess.getUnit("grasshopper", false, pos);
            else if(chr=="P") OBJ_chess.getUnit("pawn", true, pos);
            else if(chr=="B") OBJ_chess.getUnit("bishop", true, pos);
            else if(chr=="N") OBJ_chess.getUnit("knight", true, pos);
            else if(chr=="R") OBJ_chess.getUnit("rook", true, pos);
            else if(chr=="Q") OBJ_chess.getUnit("queen", true, pos);
            else if(chr=="K") OBJ_chess.getUnit("king", true, pos);
            else if(chr=="G") OBJ_chess.getUnit("grasshopper", true, pos);
            else{
                var chrNext='';
                if(j<str.length-1 && '0123456789'.indexOf(str.charAt(j+1))>=0){
                    chrNext=str.charAt(j+1);
                    j++;
                }
                pos--;
                chr+=chrNext;
                pos+=parseInt(chr);
            }
            pos++;
        }
    }
    if(arr[1]=='w') OBJ_chess.blnTurn=true;
    else OBJ_chess.blnTurn=false;
    // CASTLING RULES
    // [pos if free], [pos if checked], [castled unit 1], [castled unit 2]
    if(OBJ_chess.nameVar=='double12x16'){
        if(arr[2].indexOf('Q')>=0){
            OBJ_chess.arrSqu[266].unit.arrCastle=new Array([[265,264,263],[265],[266,264],[262,265]]);
            OBJ_chess.arrSqu[262].unit.objCastle=OBJ_chess.arrSqu[266].unit;
        }
        if(arr[2].indexOf('K')>=0){
            OBJ_chess.arrSqu[274].unit.arrCastle=new Array([[275,276],[275],[274,276],[277,275]]);
            OBJ_chess.arrSqu[277].unit.objCastle=OBJ_chess.arrSqu[274].unit;
        }
        if(arr[2].indexOf('q')>=0){
            OBJ_chess.arrSqu[46].unit.arrCastle=new Array([[45,44,43],[45],[46,44],[42,45]]);
            OBJ_chess.arrSqu[42].unit.objCastle=OBJ_chess.arrSqu[46].unit;
        }
        if(arr[2].indexOf('k')>=0) {
            OBJ_chess.arrSqu[54].unit.arrCastle=new Array([[55,56],[55],[54,56],[57,55]]);
            OBJ_chess.arrSqu[57].unit.objCastle=OBJ_chess.arrSqu[54].unit;
        }
    }
    else if(OBJ_chess.nameVar=='standard'){
        if(arr[2].indexOf('Q')>=0){
            OBJ_chess.arrSqu[114].unit.arrCastle.push([[113,112,111],[113],[114,112],[110,113]]);
            OBJ_chess.arrSqu[110].unit.objCastle=OBJ_chess.arrSqu[114].unit;
        }
        if(arr[2].indexOf('K')>=0){
            OBJ_chess.arrSqu[114].unit.arrCastle.push([[115,116],[115],[114,116],[117,115]]);
            OBJ_chess.arrSqu[117].unit.objCastle=OBJ_chess.arrSqu[114].unit;
        }
        if(arr[2].indexOf('q')>=0){
            OBJ_chess.arrSqu[30].unit.arrCastle.push([[29,28,27],[29],[30,28],[26,29]]);
            OBJ_chess.arrSqu[26].unit.objCastle=OBJ_chess.arrSqu[30].unit;
        }
        if(arr[2].indexOf('k')>=0){
            OBJ_chess.arrSqu[30].unit.arrCastle.push([[31,32],[31],[30,32],[33,31]]);
            OBJ_chess.arrSqu[33].unit.objCastle=OBJ_chess.arrSqu[30].unit;
        }
    }
    // EN PASSANT
    if(arr[3]!='-'){
        for(var i in OBJ_chess.arrSqu){
            var squ=OBJ_chess.arrSqu[i];
            if(squ.strNota==arr[3]){
                var posEnPassant=squ.pos;
                break;
            }
        }
        var d=1;
        if(OBJ_chess.blnTurn===false) d=-1;
        var posPawn=posEnPassant+OBJ_chess.dstVer*d;
        var unitPawn=OBJ_chess.arrSqu[posPawn].unit;
        for(var i=-1;i<=1;i+=2){
            var squ=OBJ_chess.arrSqu[posPawn+i];
            if(squ.unit!==false){
                var unitOpp=squ.unit;
                if(unitOpp.name=='pawn' && unitOpp.side!==unitPawn.side){
                    unitOpp.arrTake.push([posEnPassant,[posPawn]]);
                }
            }
        }
    }
    // HALFMOVE CLOCK
    OBJ_chess.numHalfClock=arr[4]*1;
    // FULLMOVE
    OBJ_chess.numFullMove=arr[5]*1;
    //
    OBJ_chess.setArrMove(OBJ_chess.blnTurn);
}
OBJ_chess.kingCastled=function(unit,pos){
   if(unit.king===true){
      if(unit.arrCastle.length>0){
         for(var i=0;i<unit.arrCastle.length;i++){
            var arr=unit.arrCastle[i];
            if(arr[2][1]==pos){
               return new Array(arr[2],arr[3]);
            }
         }
         return false;
      }
      else return false;
   }
   else return false;
}
OBJ_chess.getUnit=function(name,side,pos){
    var obj=false;
    for(var i=0;i<OBJ_chess.arrUnit.length;i++){
        var unit=OBJ_chess.arrUnit[i];
        if(!unit.pos){
            obj=unit;
            break;
        }
    }
    if(!obj){
        obj=new Object();
        OBJ_chess.arrUnit.push(obj);
    }
    obj.name=name;
    obj.side=side;
    obj.pos=pos;
    obj.arrTake=new Array(); // one-move valid positions which this unit can take, e. g. en passant
    obj.arrCastle=new Array(); // castling rules;
    obj.objCastle=false; // links to unit having castling rules defined
    obj.king=false;
    obj.arrMove=new Array(); // // all possible moves with respective takes [[posMoveA, [posTake0, posTake1, posTake2, ...]], [posMoveB, [posTake0, posTake1, ...]], ...] filled in addMove()
    switch(name){
        case "pawn": obj.strFen="p";obj.ctg='none';break;
        case "bishop": obj.strFen="b";obj.ctg='slide';break;
        case "knight": obj.strFen="n";obj.ctg='leap';break;
        case "rook": obj.strFen="r";obj.ctg='slide';break;
        case "queen": obj.strFen="q";obj.ctg='slide';break;
        case "king":
            obj.strFen="k";
            obj.king=true;
            obj.ctg='leap';
            break;
        case "grasshopper": obj.strFen="g";obj.ctg='hop';break;
    }
    if(side) obj.strFen=obj.strFen.toUpperCase();
    OBJ_chess.arrSqu[pos].unit=obj;
    return obj;
}
OBJ_chess.setPosA=function(posA){
    if(!OBJ_chess.blnLock){
        var squA=OBJ_chess.arrSqu[posA];
        var unitA=squA.unit;
        if(unitA && unitA.side===OBJ_chess.blnTurn){
            OBJ_chess.posA=posA;
            //if(unitA.arrTake.length>0) for(var key in unitA.arrTake) OBJ_chess.arrTake.push(unitA.arrTake[key]);
            return true;
        }
        else return false;
    }
    else return false;
}
OBJ_chess.setPosB=function(pos){
    if(!OBJ_chess.blnLock){
        var posA=OBJ_chess.posA;
        var posB=pos;
        if(posA){
            var squA=OBJ_chess.arrSqu[posA];
            var squB=OBJ_chess.arrSqu[posB];
            var unitA=squA.unit;
            var unitB=squB.unit;
            OBJ_chess.posA=false;
            if(OBJ_chess.inArrMove(unitA,posB)){
                if(!OBJ_chess.pawnPromoted(posA,posB)){
                    var arrTake=OBJ_chess.setMove(posA,posB);
                    var arrMove=OBJ_chess.setArrMove(OBJ_chess.blnTurn);
                    if(arrMove[0]===true) console.log('checkmate!');
                    var arrCastle=OBJ_chess.kingCastled(unitA,posB);
                    if(arrCastle) OBJ_chess.setCastle(arrCastle);
                    var arrCheck=OBJ_chess.kingChecked();
                    OBJ_chess.enPassant(unitA,posA,posB);
                    // CLEAR ALL UNIT TAKES
                    for(var key in OBJ_chess.arrUnit){
                        var unit=OBJ_chess.arrUnit[key];
                        if(unit.side!==OBJ_chess.blnTurn) unit.arrTake=new Array();
                    }
                    // CLEAR CASTLING IF MOVED
                    if(unitA.arrCastle.length>0) unitA.arrCastle=new Array();
                    if(unitA.objCastle) unitA.objCastle=false;
                    // HALFMOVE CLOCK
                    if(unitA.name=='pawn' || arrTake.length>0) OBJ_chess.numHalfClock=0;
                    else OBJ_chess.numHalfClock++;
                    //
                    return [false,posA,posB,arrTake,arrCheck,arrCastle];
                }
                else return [true,false,false,false,false,false];
            }
            else return false;
        }
        else return false;
    }
    else return false;
}
OBJ_chess.setMove=function(posA,posB){
    var arrTake=new Array();
    var squA=OBJ_chess.arrSqu[posA];
    var squB=OBJ_chess.arrSqu[posB];
    var unitA=squA.unit;
    squA.unit=false;
    for(var i=0;i<unitA.arrMove.length;i++){
      if(posB==unitA.arrMove[i][0]){
        for(var j=0;j<unitA.arrMove[i][1].length;j++){
          var posC=unitA.arrMove[i][1][j];
          var squC=OBJ_chess.arrSqu[posC];
          var unitC=squC.unit;
          if(unitC){
            unitC.pos=false;
            squC.unit=false;
            arrTake.push(posC);
          }
        }
        break;
      }
    }
    squB.unit=unitA;
    unitA.pos=posB;
   //
   if(OBJ_chess.blnTurn===false) OBJ_chess.numFullMove++;
   OBJ_chess.blnTurn=!OBJ_chess.blnTurn;
   if(arrTake.length>0) return arrTake;
   return false;
}
OBJ_chess.addMove=function(unit){
   var v=OBJ_chess.dstVer;
   unit.arrMove=new Array();
   var posA=unit.pos;
   var posB, squB, arrStep=new Array();
   if(unit.name=='pawn'){
      if(unit.side) arrStep=[-v,-v+1,-v-1];
      else arrStep=[v,v+1,v-1];
      for(var i=0;i<arrStep.length;i++){
         var s=arrStep[i];
         posB=posA+s;
         squB=OBJ_chess.arrSqu[posB];
         if(squB.blnPlay){
            if((i==0 && !squB.unit) || (i>0 && squB.unit && squB.unit.side!=unit.side)){
               unit.arrMove.push([posB,[posB]]);
            }
         }
      }
      // ADD PAWN JUMP
      var squA=OBJ_chess.arrSqu[posA];
      if((unit.side && squA.numHor==2) || (!unit.side && squA.numHor==OBJ_chess.qtyHor-1)){
         var d=1;
         if(unit.side) d=-1;
         var intJump=2;
         if(OBJ_chess.nameVar=='double12x16') intJump=4;
         var boolPush=true;
         for(var i=1;i<=intJump;i++){
            var posJump=posA+v*i*d;
            var squJump=OBJ_chess.arrSqu[posJump];
            if(squJump.unit){
               boolPush=false;
               break;
            }
         }
         if(boolPush){
           unit.arrMove.push([posJump,[posJump]]);
         }
      }
   }
   else if(unit.ctg=='slide'){
      if(unit.name=='bishop') arrStep=[v+1,v-1,-v-1,-v+1];
      else if(unit.name=='rook') arrStep=[1,v,-1,-v];
      else if(unit.name=='queen') arrStep=[1,v,-1,-v,v+1,v-1,-v-1,-v+1];
      for(var i=0;i<arrStep.length;i++){
         var s=arrStep[i];
         posB=posA+s;
         squB=OBJ_chess.arrSqu[posB];
         if(squB.unit && squB.unit.side!=unit.side){
           unit.arrMove.push([posB,[posB]]);
         }
         while(squB.blnPlay && !squB.unit){
            unit.arrMove.push([posB,[posB]]);
            posB+=s;
            squB=OBJ_chess.arrSqu[posB];
            if(squB.unit && squB.unit.side!=unit.side){
              unit.arrMove.push([posB,[posB]]);
            }
         }
      }
   }
   else if(unit.ctg=='leap'){
      if(unit.name=='knight') arrStep=[v+2,-v+2,v*2-1,v*2+1,v-2,-v-2,-v*2-1,-v*2+1];
      else if(unit.name=='king') arrStep=[1,v+1,v,v-1,-1,-v-1,-v,-v+1];
      for(var i=0;i<arrStep.length;i++){
         var s=arrStep[i];
         posB=posA+s;
         squB=OBJ_chess.arrSqu[posB];
         if(squB.blnPlay){
            if(!squB.unit || (squB.unit.side!=unit.side)){
               unit.arrMove.push([posB,[posB]]);
            }
         }
      }
   }
}
OBJ_chess.addCastle=function(unitA){
    // posA, squA, unitA - king
    // posB, squB, unitB - rook
    if(unitA.arrCastle.length>0 && !inArray(unitA.pos,OBJ_chess.arrCheck)){
        for(var i=0;i<unitA.arrCastle.length;i++){
            var bool=true;
            var posA=unitA.pos;
            var squA=OBJ_chess.arrSqu[posA];
            var posB=unitA.arrCastle[i][3][0];
            var squB=OBJ_chess.arrSqu[posB];
            var unitB=squB.unit;
            if(unitB && unitB.objCastle==unitA){
                var arr=unitA.arrCastle[i][0]; // if free
                for(var j=0;j<arr.length;j++){
                    var posC=arr[j];
                    if(OBJ_chess.arrSqu[posC].unit) bool=false;
                    if(!bool) break;
                }
                if(bool){
                    var arr=unitA.arrCastle[i][1]; // if checked
                    var arrTmp=unitA.arrMove;
                    for(var j=0;j<arr.length;j++){
                        var posC=arr[j];
                        var squC=OBJ_chess.arrSqu[posC];
                        unitA.pos=posC;
                        squA.unit=false;
                        squC.unit=unitA;
                        if(OBJ_chess.kingChecked()) bool=false;
                        unitA.pos=posA;
                        squA.unit=unitA;
                        squC.unit=false;
                        if(!bool) break;
                    }
                    unitA.arrMove=arrTmp;
                }
            }
            else bool=false;
            if(bool){
                var posD=unitA.arrCastle[i][2][1];
                unitA.arrMove.push([posD,[posD]]);
            }
        }
    }
}
OBJ_chess.kingChecked=function(){
    var boolSide=OBJ_chess.blnTurn;
    var arrKingPos=new Array();
    OBJ_chess.arrCheck=new Array();
    for(var i=0;i<OBJ_chess.arrUnit.length;i++){
        var unit=OBJ_chess.arrUnit[i];
        if(unit.pos && unit.king && unit.side===boolSide) arrKingPos.push(unit.pos);
    }
    for(var i=0;i<OBJ_chess.arrSqu.length;i++){
        var squ=OBJ_chess.arrSqu[i];
        var unit=squ.unit;
        if(unit && unit.side!==boolSide){
            OBJ_chess.addMove(unit);
            for(var j=0;j<arrKingPos.length;j++){
                var posKing=arrKingPos[j];
                if(OBJ_chess.inArrTake(unit,posKing)) OBJ_chess.arrCheck.push(posKing);
            }
        }
    }
    if(OBJ_chess.arrCheck.length>0) return OBJ_chess.arrCheck;
    else return false;
}
OBJ_chess.pawnPromoted=function(posA,posB){
   var squ=OBJ_chess.arrSqu[posA];
   var unit=squ.unit;
   if(unit && unit.name=='pawn'){
      if((unit.side && squ.numHor==OBJ_chess.qtyHor-1) || (!unit.side && squ.numHor==2)){
          OBJ_chess.posA=posA;
          OBJ_chess.posB=posB;
          OBJ_chess.blnLock=true;
          OBJ_chess.arrTake=new Array([posB,[posB]]);
          //unit.arrMove=new Array([posB,[posB]]);
          return true;
      }
   }
   return false;
}
OBJ_chess.promotePawn=function(name,side){
    if(OBJ_chess.blnLock){
        var posA=OBJ_chess.posA;
        var posB=OBJ_chess.posB;
        var squ=OBJ_chess.arrSqu[posA];
        var unit=squ.unit;
        unit=OBJ_chess.getUnit(name,side,posA);
        OBJ_chess.posB=false;
        OBJ_chess.blnLock=false;
        var move=OBJ_chess.setPosB(posB);
        return move;
    }
    return false;
}
OBJ_chess.setCastle=function(arrCastle){
   var posA=arrCastle[1][0];
   var posB=arrCastle[1][1];
   var squA=OBJ_chess.arrSqu[posA];
   var squB=OBJ_chess.arrSqu[posB];
   var unit=squA.unit;
   squA.unit=false;
   squB.unit=unit;
   unit.pos=posB;
}
OBJ_chess.enPassant=function(unit,posA,posB){
   OBJ_chess.posEnPassant=false;
   if(unit.name=='pawn'){
      // check if jumped
      if(Math.abs(posA-posB)>=OBJ_chess.dstVer*2){
         // find an opponent pawn to attack en passant
         var c=Math.abs(posA-posB)/OBJ_chess.dstVer-1;
         var d=1;
         if(!unit.side) d=-1;
         OBJ_chess.posEnPassant=(posB+OBJ_chess.dstVer*d);
         for(var i=0;i<c;i++){
            var pos=posB+OBJ_chess.dstVer*i*d;
            for(var j=-1;j<=1;j+=2){
               var squ=OBJ_chess.arrSqu[pos+j];
               if(squ.blnPlay){
                  var unitOpp=squ.unit;
                  if(unitOpp && unitOpp.name=='pawn' && unitOpp.side!==unit.side){
                     // save take attr [pos to ocupy, [pos with unit to take]]
                     unitOpp.arrTake.push([pos+OBJ_chess.dstVer*d,[posB]]);
                  }
               }
            }
         }
      }
   }
}
OBJ_chess.inArrMove=function(unit,pos){
   for(var i=0;i<unit.arrMove.length;i++){
       if(unit.arrMove[i][0]==pos) return true;
   }
   return false;
}
OBJ_chess.inArrTake=function(unit,pos){
    for(var i=0;i<unit.arrMove.length;i++){
      for(var j=0;j<unit.arrMove[i][1].length;j++){
        if(unit.arrMove[i][1][j]==pos) return true;
      }
    }
   return false;
}
OBJ_chess.clearBoard=function(){
    for(var i=0;i<OBJ_chess.arrSqu.length;i++){
        var squ=OBJ_chess.arrSqu[i];
        if(squ.unit){
            var unit=squ.unit;
            unit.pos=false;
            squ.unit=false;
        }
    }
}
OBJ_chess.getFen=function(){
    var strFen='';
    var cntTotal=0;
    var cntEmpty=0;
    var arrCastle=new Array();
    for(var i in OBJ_chess.arrSqu){
        var squ=OBJ_chess.arrSqu[i];
        if(squ.blnPlay===true){
            var unit=squ.unit;
            if(unit===false) cntEmpty++;
            else{
                if(cntEmpty>0){
                    strFen+=cntEmpty;
                    cntEmpty=0;
                }
                strFen+=unit.strFen;
                // CASTLING
                if(OBJ_chess.nameVar=='standard'){
                    for(var j in unit.arrCastle){
                        var posKing=unit.arrCastle[j][2][0];
                        var posCastle=unit.arrCastle[j][3][0];
                        var squCastle=OBJ_chess.arrSqu[posCastle];
                        var unitCastle=squCastle.unit;
                        if(unitCastle!==false && unitCastle.objCastle!==false){
                            if(posKing==114 && posCastle==110) arrCastle.push('Q');
                            else if(posKing==114 && posCastle==117) arrCastle.push('K');
                            else if(posKing==30 && posCastle==26) arrCastle.push('q');
                            else if(posKing==30 && posCastle==33) arrCastle.push('k');
                        }
                    }
                }
            }
            cntTotal++;
            if(cntTotal%OBJ_chess.qtyHor==0){
                if(cntEmpty>0){
                    strFen+=cntEmpty;
                    cntEmpty=0;
                }
                if(cntTotal/OBJ_chess.qtyVer<OBJ_chess.qtyHor) strFen+='/';
            }

        }
    }
    // TURN
    if(OBJ_chess.blnTurn===true) strFen+=' w';
    else strFen+=' b';
    // CASTLING
    var strCastle='';
    if(inArray('K',arrCastle)) strCastle+='K';
    if(inArray('Q',arrCastle)) strCastle+='Q';
    if(inArray('k',arrCastle)) strCastle+='k';
    if(inArray('q',arrCastle)) strCastle+='q';
    if(strCastle=='') strFen+=' -';
    else strFen+=' '+strCastle;
    // EN PASSANT
    if(OBJ_chess.posEnPassant===false) strFen+=' -';
    else strFen+=' '+OBJ_chess.arrSqu[OBJ_chess.posEnPassant].strNota;
    //
    return strFen+' '+OBJ_chess.numHalfClock+' '+OBJ_chess.numFullMove;
}
//
OBJ_chess.setArrMove=function(blnTurn){
  var blnCheckMate=true;
  var blnStaleMate=true;
  for(var i in OBJ_chess.arrSqu){
    var objSqu=OBJ_chess.arrSqu[i];
    var objUnit=objSqu.unit;
    if(objUnit!==false && objUnit.side==blnTurn){
      OBJ_chess.addMove(objUnit);
      OBJ_chess.addCastle(objUnit);
      OBJ_chess.banMove(objUnit);
      if(objUnit.arrMove.length>0 && blnCheckMate===true) blnCheckMate=false;
    }
  }
  return new Array(blnCheckMate,blnStaleMate);
}
OBJ_chess.banMove=function(objUnit){
  // ban moves if after checked
  var posA=objUnit.pos;
  var squA=OBJ_chess.arrSqu[objUnit.pos];
  var arrNew=new Array();
  var arrOld=objUnit.arrMove;
  for(var i=0;i<arrOld.length;i++){
    var posB=arrOld[i][0];
    var squB=OBJ_chess.arrSqu[posB];
    // move forward
    objUnit.pos=posB;
    squA.unit=false;
    var arrTest=new Array();
    for(var j=0;j<arrOld[i][1].length;j++){
      var posC=arrOld[i][1][j];
      var squC=OBJ_chess.arrSqu[posC];
      var unitC=squC.unit;
      if(unitC){
        unitC.pos=false;
        squC.unit=false;
        arrTest.push([posC,unitC]);
      }
    }
    squB.unit=objUnit;
    // see if checked
    if(!OBJ_chess.kingChecked()) arrNew.push(arrOld[i]);
    // move back
    objUnit.pos=posA;
    squA.unit=objUnit;
    squB.unit=false;
    for(var j=0;j<arrTest.length;j++){
      var posC=arrTest[j][0];
      var unitC=arrTest[j][1];
      var squC=OBJ_chess.arrSqu[posC];
      unitC.pos=posC;
      squC.unit=unitC;
    }
  }
  objUnit.arrMove=arrNew;
}
