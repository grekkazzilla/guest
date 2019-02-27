function startGame(){
    if(OBJ_var.boxOn!==null) hideBox(OBJ_var.boxOn);
    hideG('gTop');
    showG('gTime');
    showG('gRobo');
    hideG('gBottom');
    showG('gGo');
    o('gGo').appendChild(o('btnHost'));
    //
    if(OBJ_var.strSide=='white'){
        OBJ_var.blnSide=true;
    }
    else if(OBJ_var.strSide=='black'){
        OBJ_var.blnSide=false;
    }
    else if(OBJ_var.strSide=='any'){
        var rnd=getRand(0,1);
        if(rnd==0) OBJ_var.blnSide=true;
        else if(rnd==1) OBJ_var.blnSide=false;
    }
    //
    if(OBJ_var.blnSide!==OBJ_board.blnSide) OBJ_board.flip(!OBJ_board.blnSide);
    //
    if(OBJ_var.strVS=='robo'){
        OBJ_var.objDrive=p4_fen2state(OBJ_var.arrHist[0][0]);
        changeTurn();
    }
}
function changeTurn(){
    if(OBJ_var.blnSide!==OBJ_chess.turn){
        setTimeout(function(){
            var find=OBJ_var.objDrive.findmove(OBJ_var.arrUser[0].intRank);
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
function play(gSquare){
    var pos=gSquare.pos;
    var last=OBJ_var.arrHist.length-1;
    OBJ_board.hideTake();
    if(!OBJ_chess.setPosA(pos)){
        var move=OBJ_chess.setPosB(pos);
        if(move){
            OBJ_board.hideCheck();
            if(!move[0]) OBJ_board.putMove(move,false,!OBJ_var.blnSide);
            else{
                if(OBJ_chess.turn) showBox('boxPromoteWhite');
                else showBox('boxPromoteBlack');
            }
            // finish move
            OBJ_var.arrHist[last][2]=pos;
            for(var key in OBJ_chess.arrSqu){
            if(OBJ_chess.arrSqu[key].boolPlay===true){
                var gSqu=o('g'+OBJ_chess.arrSqu[key].pos);
                    if(gSqu.pos==OBJ_var.arrHist[last][1]) var posA=gSqu.num;
                    if(gSqu.pos==OBJ_var.arrHist[last][2]) var posB=gSqu.num;
                }
            }
            OBJ_var.objDrive.move(posA,posB,12);
            OBJ_var.arrHist.push(new Array('',false,false,false));
            changeTurn();
            //
        }
        OBJ_board.hidePick();
    }
    else{
        OBJ_board.putTake();
        OBJ_board.putPick();
        OBJ_var.arrHist[last][1]=pos;
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