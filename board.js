var OBJ_board=new Object();
OBJ_board.drawBoard=function(gRoot,strID,x,y,z,wSquare,pntLight,pntDark,boolShown){
    var qtyHor=OBJ_chess.qtyHor;
    var qtyVer=OBJ_chess.qtyVer;
    var mrgBan=OBJ_chess.mrgBan;
    var wBoard=wSquare*qtyVer;
    var hBoard=wSquare*qtyHor;
    var gBoard=getG(strID,gRoot,x,y,z,boolShown,wBoard/2,hBoard/2);
    OBJ_board.gBoard=gBoard;
    OBJ_board.blnSide=true;
    var x=0, y=0;
    for(var i=mrgBan;i<qtyHor+mrgBan;i++){
        for(var j=mrgBan;j<qtyVer+mrgBan;j++){
            var pos=j+i*OBJ_chess.dstVer;
            var squ=OBJ_chess.arrSqu[pos];
            if((squ.numHor%2==0 && squ.numVer%2==0) || (squ.numHor%2>0 && squ.numVer%2>0)) var pnt=pntDark;
            else pnt=pntLight;
            var gSquare=getG('g'+pos,gBoard,x,y,1,true,wSquare/2,wSquare/2);
            getRect(null,gSquare,0,0,wSquare,wSquare,0,pnt,'none',0);
            gSquare.pos=pos;
            gSquare.onclick=function(){play(this);}
            x+=wSquare;
            //getText(null,gSquare,25,20,15,'Arial','#000','none',0,pos,'middle');
        }
        x=0;
        y+=wSquare;
    }
    OBJ_board.pthPick=getPath(null,gBoard,-9999,-9999,1,'red','none',0,'M 0 0 L 15 0 L 0 15 Z M 35 0 L 50 0 L 50 15 Z M 50 35 L 50 50 L 35 50 Z M 0 35 L 15 50 L 0 50 Z');
    OBJ_board.pthPick.setAttribute('opacity','0.5');
    OBJ_board.arrUnit=new Array();
    OBJ_board.arrCircle=new Array();   // highlighters for where a unit can move
    OBJ_board.arrFrame=new Array();  // highlighters for where a unit can capture
    OBJ_board.arrCheck=new Array(); // highlighters for where a king unit gets checked
    return gBoard;
}
OBJ_board.putBoard=function(){
    OBJ_board.clearBoard();
    var qtyHor=OBJ_chess.qtyHor;
    var qtyVer=OBJ_chess.qtyVer;
    var mrgBan=OBJ_chess.mrgBan;
    var dstVer=OBJ_chess.dstVer;
    for(var i=mrgBan;i<qtyHor+mrgBan;i++){
        for(var j=0;j<qtyVer+mrgBan;j++){
            var pos=j+i*dstVer;
            var squ=OBJ_chess.arrSqu[pos];
            var gSquare=o('g'+pos);
            var name=squ.unit.name;
            var side=squ.unit.side;
            if(squ.unit) var gUnit=OBJ_board.drawUnit(name,side,gSquare);
        }
    }
}
OBJ_board.flip=function(blnSide){
    OBJ_board.blnSide=blnSide;
    if(blnSide===true) var r=0;
    else var r=180;
    turnG(OBJ_board.gBoard,r);
    for(var i=0;i<OBJ_board.arrUnit.length;i++){
        var g=OBJ_board.arrUnit[i];
        g.r=r;
        if(g.shown===true) var z=1;
        else z=0;
        g.setAttribute('transform','translate('+g.x+','+g.y+') scale('+z+') rotate('+g.r+','+g.rx+','+g.ry+')')
    }
}
OBJ_board.drawUnit=function(name,side,gSquare){
    var gUnit=false;
    for(var i=0;i<OBJ_board.arrUnit.length;i++){
        var g=OBJ_board.arrUnit[i];
        if(g.name==name && g.side==side && g.parentNode==OBJ_board.gBoard){
            gUnit=g;
            gSquare.appendChild(gUnit);
            break;
        }
    }
    if(!gUnit){
        if(name=='pawn' && side) gUnit=draw_white_pawn(null,gSquare,0,0,1,true);
        else if(name=='bishop' && side) gUnit=draw_white_bishop(null,gSquare,0,0,1,true);
        else if(name=='bishop' && !side) gUnit=draw_black_bishop(null,gSquare,0,0,1,true);
        else if(name=='knight' && side) gUnit=draw_white_knight(null,gSquare,0,0,1,true);
        else if(name=='knight' && !side) gUnit=draw_black_knight(null,gSquare,0,0,1,true);
        else if(name=='rook' && side) gUnit=draw_white_rook(null,gSquare,0,0,1,true);
        else if(name=='rook' && !side) gUnit=draw_black_rook(null,gSquare,0,0,1,true);
        else if(name=='queen' && side) gUnit=draw_white_queen(null,gSquare,0,0,1,true);
        else if(name=='queen' && !side) gUnit=draw_black_queen(null,gSquare,0,0,1,true);
        else if(name=='king' && side) gUnit=draw_white_king(null,gSquare,0,0,1,true);
        else if(name=='king' && !side) gUnit=draw_black_king(null,gSquare,0,0,1,true);
        else if(name=='grasshopper' && side) gUnit=draw_white_grasshopper(null,gSquare,0,0,1,true);
        else if(name=='grasshopper' && !side) gUnit=draw_black_grasshopper(null,gSquare,0,0,1,true);
        else gUnit=draw_black_pawn(null,gSquare,0,0,1,true);
        OBJ_board.arrUnit.push(gUnit);
    }
    if(OBJ_board.blnSide===true) gUnit.r=0;
    else gUnit.r=180;
    showG(gUnit);
    return gUnit;
}
OBJ_board.putPick=function(){
    var pos=OBJ_chess.posA;
    var gSquare=o('g'+pos);
    gSquare.appendChild(OBJ_board.pthPick);
    OBJ_board.pthPick.setAttribute('transform','translate(0,0)');
}
OBJ_board.hidePick=function(){
    OBJ_board.gBoard.appendChild(OBJ_board.pthPick);
    OBJ_board.pthPick.setAttribute('transform','translate(-9999,-9999)');
}
OBJ_board.putTake=function(){
    var arrTake=OBJ_chess.arrTake;
    for(var i=0;i<arrTake.length;i++){
        var pos=arrTake[i][0];
        var squ=OBJ_chess.arrSqu[pos];
        var gSquare=o('g'+pos);
        if(squ.unit){
            // highlight where a unit can capture
            var pth=false;
            for(var i=0;i<OBJ_board.arrFrame.length;i++){
                var w=OBJ_board.arrFrame[i];
                if(w.parentNode==OBJ_board.gBoard){
                    pth=w;
                    pth.setAttribute('transform','translate(0,0)');
                    gSquare.appendChild(pth);
                    break;
                }
            }
            if(!pth) OBJ_board.drawFrame(gSquare);
        }
        else{
            // highlight where a unit can move
            var circ=false;
            for(var i=0;i<OBJ_board.arrCircle.length;i++){
                var w=OBJ_board.arrCircle[i];
                if(w.parentNode==OBJ_board.gBoard){
                    circ=w;
                    circ.setAttribute('cx',gSquare.rx);
                    circ.setAttribute('cy',gSquare.ry);
                    gSquare.appendChild(circ);
                    break;
                }
            }
            if(!circ) OBJ_board.drawCircle(gSquare); 
        }
    }
}
OBJ_board.hideTake=function(){
    for(var i=0;i<OBJ_board.arrCircle.length;i++){
        var circ=OBJ_board.arrCircle[i];
        circ.setAttribute('cx','-9999');
        circ.setAttribute('cy','-9999');
        OBJ_board.gBoard.appendChild(circ);
    }
    for(var i=0;i<OBJ_board.arrFrame.length;i++){
        var pth=OBJ_board.arrFrame[i];
        pth.setAttribute('transform','translate(-9999,-9999)');
        OBJ_board.gBoard.appendChild(pth);
    }
}
OBJ_board.drawFrame=function(gSquare){
    var pth=getPath(null,gSquare,0,0,1,'green','none',0,'M 0 0 L 15 0 L 0 15 Z M 35 0 L 50 0 L 50 15 Z M 50 35 L 50 50 L 35 50 Z M 0 35 L 15 50 L 0 50 Z');
    pth.setAttribute('opacity','0.5');
    OBJ_board.arrFrame.push(pth);
}
OBJ_board.drawCircle=function(gSquare){
    var circ=getCircle(null,gSquare,gSquare.rx,gSquare.ry,10,'green','none',0);
    circ.setAttribute('opacity','0.5');
    OBJ_board.arrCircle.push(circ);
}
OBJ_board.putCheck=function(arrCheck){
    for(var i=0;i<arrCheck.length;i++){
        var pos=arrCheck[i];
        var gSquare=o('g'+pos);
        var gUnit=oo(gSquare,'g');
        var rct=false;
        for(var j=0;j<OBJ_board.arrCheck.length;j++){
            var w=OBJ_board.arrCheck[j];
            if(w.parentNode==OBJ_board.gBoard){
                rct=w;
                rct.setAttribute('x','5');
                rct.setAttribute('y','5');
                gSquare.appendChild(rct);
                gSquare.appendChild(gUnit);
                break;
            }
        }
        if(!rct) OBJ_board.drawCheck(gSquare);
    }
}
OBJ_board.drawCheck=function(gSquare){
    var rct=getRect(null,gSquare,5,5,40,40,5,'url(#Red)','none',0);
    rct.setAttribute('filter','url(#blr6)');
    OBJ_board.arrCheck.push(rct);
    var gUnit=oo(gSquare,'g');
    gSquare.appendChild(gUnit);
}
OBJ_board.hideCheck=function(){
    for(var i=0;i<OBJ_board.arrCheck.length;i++){
        var rct=OBJ_board.arrCheck[i];
        rct.setAttribute('x','-9999');
        rct.setAttribute('y','-9999');
        OBJ_board.gBoard.appendChild(rct);
    }
}
OBJ_board.takeUnit=function(arrTake){
    for(var i=0;i<arrTake.length;i++){
        var pos=arrTake[i];
        var gSquare=o('g'+pos);
        var gUnit=oo(gSquare,'g');
        hideG(gUnit);
        OBJ_board.gBoard.appendChild(gUnit);
    }
}
OBJ_board.putMove=function(move,namePromote){
    var posA=move[1];
    var posB=move[2];
    var arrTake=move[3];
    var arrCheck=move[4];
    var arrCastle=move[5];
    var gSquA=o('g'+posA);
    var gSquB=o('g'+posB);
    var gUnitA=oo(gSquA,'g');
    if(arrTake) OBJ_board.takeUnit(arrTake);
    if(arrCheck) OBJ_board.putCheck(arrCheck);
    if(namePromote){
        OBJ_board.takeUnit([posA]);
        gUnitA=OBJ_board.drawUnit(namePromote,OBJ_chess.arrSqu[posB].unit.side,gSquA);
    }
    gSquB.appendChild(gUnitA);
    //CASTLING
    if(arrCastle){
        var posA=arrCastle[1][0];
        var posB=arrCastle[1][1];
        var gSquA=o('g'+posA);
        var gSquB=o('g'+posB);
        var gUnit=oo(gSquA,'g');
        gSquB.appendChild(gUnit);
    }
}
OBJ_board.clearBoard=function(){
    for(var i=0;i<OBJ_board.arrUnit.length;i++){
        var gUnit=OBJ_board.arrUnit[i];
        hideG(gUnit);
        OBJ_board.gBoard.appendChild(gUnit);
    }
    OBJ_board.hidePick();
    OBJ_board.hideTake();
    OBJ_board.hideCheck();
}