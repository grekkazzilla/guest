function startGame(){
    if(OBJ_var.boxOn!==null) hideBox(OBJ_var.boxOn);
    hideG('gTop');
    hideG('gBottom');
    if(OBJ_var.strVS=='robo'){
        showG('gRobo');
        setTimeout(function(){showG(o('gRobo').getElementsByTagName('g')[0]);},1000);
        var btn=o('btnTimeHost');
        btn.x=170; btn.y=530; showG(btn);
        showG('btnRoboBack'); showG('btnRoboStop');
    }
    //var arena=ARR_arena[NUM_arena];
    //arena.objDrive=p4_fen2state(arena.arrHist[0][0]);
    //changeTurn();
}
/*function play(gSquare){
    var pos=gSquare.pos;
    var arena=ARR_arena[NUM_arena];
    var last=arena.arrHist.length-1;
    board.hideTake();
    if(!chess.setPosA(pos)){
        var move=chess.setPosB(pos);
        if(move){
            board.hideCheck();
            if(!move[0]) board.putMove(move,false,!ARR_arena[NUM_arena].blnSide);
            else{
                if(chess.turn) openBox('boxPromoteWhite');
                else openBox('boxPromoteBlack');
            }
            // finish move
            arena.arrHist[last][2]=pos;
            for(var key in chess.arrSqu){
            if(chess.arrSqu[key].boolPlay===true){
                var gSqu=o('g'+chess.arrSqu[key].pos);
                    if(gSqu.pos==arena.arrHist[last][1]) var posA=gSqu.num;
                    if(gSqu.pos==arena.arrHist[last][2]) var posB=gSqu.num;
                }
            }
            arena.objDrive.move(posA,posB,12);
            arena.arrHist.push(new Array('',false,false,false));
            changeTurn();
            //
        }
        board.hidePick();
    }
    else{
        board.putTake();
        board.putPick();
        arena.arrHist[last][1]=pos;
    }
}

function changeTurn(){
    var arena=ARR_arena[NUM_arena];
    if(arena.blnSide!==chess.turn){
        setTimeout(function(){
            var find=arena.objDrive.findmove(arena.skl);
            for(var key in chess.arrSqu){
                if(chess.arrSqu[key].boolPlay===true){
                    var gSqu=o('g'+chess.arrSqu[key].pos);
                    if(gSqu.num==find[0]) var gSquA=gSqu;
                    if(gSqu.num==find[1]) var gSquB=gSqu;
                }
            }
            play(gSquA);
            play(gSquB);
        },50);
    }
}*/
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