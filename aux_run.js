function startGame(){
  if(OBJ.strMode=='standby'){
    if(OBJ_arena.strVS=='robo'){
      if(OBJ.boxOn!==null) hideBox(OBJ.boxOn);
      hideG('gTop');
      showG('gTime');
      showG('gRobo');
      hideG('gBottom');
      showG('gGo');
      o('gGo').appendChild(o('btnHost'));
      setHistoryButtons();
      //
      if(OBJ_arena.strSide=='white'){
          OBJ_arena.blnSide=true;
      }
      else if(OBJ_arena.strSide=='black'){
        OBJ_arena.blnSide=false;
      }
      else if(OBJ_arena.strSide=='any'){
        var rnd=getRand(0,1);
        if(rnd==0) OBJ_arena.blnSide=true;
        else if(rnd==1) OBJ_arena.blnSide=false;
      }
      //
      if(OBJ_arena.blnSide!==OBJ_board.blnSide) OBJ_board.flip(!OBJ_board.blnSide);
      //
      if(OBJ_arena.strVS=='robo'){
        OBJ_arena.objDrive=p4_fen2state(OBJ_arena.arrHist[0][0]);
        changeTurn();
      }
      OBJ_arena.arrHist.push(new Array('',false,false,false,false));
      OBJ.strMode='play';
    }
    else if(OBJ_arena.strVS=='human'){
      var btn=o('btnMatch');
      var z=0.5;hideG(btn.getElementsByTagName('g')[0]);drawLoad('gLoad','url(#grdButton)',6,(btn.rx*2-100*z)/2,(btn.ry*2-100*z)/2,z,btn);
      OBJ.strMode='watch';
      findArena();
    }
  }
  else if(OBJ.strMode=='watch'){
    var btn=o('btnMatch');
    showG(btn.getElementsByTagName('g')[0]);hideG('gLoad');
    OBJ.strMode='standby';
  }
}
function changeTurn(){
    if(OBJ_arena.strVS=='robo'){
        if(OBJ_arena.blnSide!==OBJ_chess.turn){
            setTimeout(function(){
                var find=OBJ_arena.objDrive.findmove(OBJ_host.intRank);
                for(var key in OBJ_chess.arrSqu){
                    if(OBJ_chess.arrSqu[key].boolPlay===true){
                        var gSqu=o('g'+OBJ_chess.arrSqu[key].pos);
                        if(gSqu.num==find[0]) var gSquA=gSqu;
                        if(gSqu.num==find[1]) var gSquB=gSqu;
                    }
                }
                play(gSquA);
                play(gSquB);
            },50);
        }
    }
    else OBJ_arena.blnSide!=OBJ_arena.blnSide;
}
function play(gSquare){
    if(OBJ.strMode=='play' && OBJ.blnLock===false){
        if(OBJ_arena.numShowMove==0){
          var pos=gSquare.pos;
          var numLast=OBJ_arena.arrHist.length-1;
          OBJ_board.hideTake();
          if(!OBJ_chess.setPosA(pos)){
              var arrMove=OBJ_chess.setPosB(pos);
              if(arrMove){
                  OBJ_board.hideCheck();
                  if(!arrMove[0]) OBJ_board.putMove(arrMove,false,!OBJ_arena.blnSide);
                  else{
                      if(OBJ_chess.turn) showBox('boxPromoteWhite');
                      else showBox('boxPromoteBlack');
                    }
                    // finish move
                    OBJ_arena.arrHist[numLast][0]=OBJ_chess.getFen();
                    OBJ_arena.arrHist[numLast][2]=pos;
                    OBJ_arena.arrHist[numLast][4]=arrMove[4];
                    setHistoryButtons();
                    // p4wn.js engine
                    if(OBJ_arena.strVS=='robo'){
                      for(var key in OBJ_chess.arrSqu){
                          if(OBJ_chess.arrSqu[key].boolPlay===true){
                              var gSqu=o('g'+OBJ_chess.arrSqu[key].pos);
                              if(gSqu.pos==OBJ_arena.arrHist[numLast][1]) var posA=gSqu.num;
                              else if(gSqu.pos==OBJ_arena.arrHist[numLast][2]) var posB=gSqu.num;
                          }
                      }
                      OBJ_arena.objDrive.move(posA,posB,12);
                    }
                    //
                    OBJ_arena.arrHist.push(new Array('',false,false,false,false));
                    changeTurn();
                    //
                  }
                  OBJ_board.hidePick();
              }
              else{
                OBJ_board.putTake();
                OBJ_board.putPick();
                OBJ_arena.arrHist[numLast][1]=pos;
            }
        }
        else{
          setLatestHistory();
          setHistoryButtons();
        }
    }
}
/*
returning flags from move function
// castling
flag==17 || flag==33
// checkmate
flag==7 || flag==15
// stalemate
flag==5 || flag==13
// draw
flag==65 || flag==67
// en passant

// promotion

function swingWhiteHorse(c,d,g,r,s){
    c+=d*s;
    if((d==-1 && c<(-180-r)) || (d==1 && c>(-180+r))){
        r=Math.floor(r*0.7);
        d*=-1;
        if(s>0.5) s-=0.5;
    }
    if(MODE=='menu') c=0;
    else if(r>0) requestAnimationFrame(function(){swingWhiteHorse(c,d,g,r,s);});
    else c=-180;
    turnG(g,c);
}
function swingBlackHorse(c,d,g,r,s){
    c+=d*s;
    if((d==-1 && c<(180-r)) || (d==1 && c>(180+r))){
        r=Math.floor(r*0.7);
        d*=-1;
        if(s>0.5) s-=0.5;
    }
    if(MODE=='menu') c=0;
    else if(r>0) requestAnimationFrame(function(){swingBlackHorse(c,d,g,r,s);});
    else c=180;
    turnG(g,c);
}
*/
/*
state.move returns:
flags: <integer flags>,
string: <algebraic notation>,
ok: <boolean>

P4_MOVE_FLAG_OK = 1             the move is OK
P4_MOVE_FLAG_CHECK = 2          a king is in check
P4_MOVE_FLAG_MATE = 4           checkmate or stalemate
P4_MOVE_FLAG_CAPTURE = 8        a piece has been taken
P4_MOVE_FLAG_CASTLE_KING = 16   king side castle
P4_MOVE_FLAG_CASTLE_QUEEN = 32  queen side castle
P4_MOVE_FLAG_DRAW = 64          a draw is available

PROMOTION:
the options are P4_ROOK, P4_KNIGHT, P4_BISHOP, and P4_QUEEN, equating to 4, 6, 8, and 12 respectively
*/
