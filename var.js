// CHOOSING CHESS VARIANTS
function chooseVar(){
    var strFen='';
    switch(OBJ_var.intVar){
        case 0: strFen=shuffleFen();break;
        case 2: strFen=endgameFen();break;
        case 3: strFen='nnnnknnn/pppppppp/8/8/8/8/PPPPPPPP/1Q1QK1Q1 w - - 0 1';break;
        case 4: strFen='1nn1k1n1/4p3/8/8/8/8/PPPPPPPP/4K3 w - - 0 1';break;
        case 5: strFen='rnbqkbnr/pppppppp/8/8/2PPPP2/1PP2PP1/PPPPPPPP/RNB1KBNR w KQkq - 0 1';break;
        case 6: strFen=randomFen();break;
        case 7: strFen='nnnnknnn/pppppppp/2p2p2/1pppppp1/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1';break;
        case 8: strFen='prbknrp1/1pnqbp2/2ppp3/3p4/4P3/3PPP2/2PBQNP1/1PRNKBRP w - - 0 1';break;
        default: strFen='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';break; // classic by default
        //default: strFen='k7/8/7P/8/8/8/8/K7 w - - 0 1';break; // classic by default
    }
    OBJ_chess.setBoard(strFen);
    OBJ_board.putBoard();
    OBJ_var.arrHist=new Array();
    OBJ_var.arrHist[0]=new Array(strFen,false,false,false,false); // fen position, posA, posB, move notation, arrCheck
}
function endgameFen(){
    var arrSquW=new Array('R','N','0','0','K','0','N','R');
	var arrSquB=new Array('r','n','0','0','k','0','n','r');
    var arrPawnW=new Array('P','P','P','P','P','P','P','P');
    var arrPawnB=new Array('p','p','p','p','p','p','p','p');
    var arr=new Array(0,1,6,7);
    var intForceW=0;
    var intForceB=0;
    for(var i=0;i<2;i++){
        do{
            var rnd=getRand(0,3);
            var squ=arr[rnd];
        }
        while(arrSquW[squ]=='0');
        arrSquW[squ]='0';
        if(squ==1 || squ==6) intForceW++;
        //
        do{
            var rnd=getRand(0,3);
            var squ=arr[rnd];
        }
        while(arrSquB[squ]=='0');
        arrSquB[squ]='0';
        if(squ==1 || squ==6) intForceB++;
    }
    //
    var intForce=intForceW-intForceB;
    if(intForce>0){
        for(var i=0;i<intForce*2;i++){
            do var rnd=getRand(1,6);
            while(rnd==4 || arrPawnW[rnd]=='0');
            arrPawnW[rnd]='0';
        }
    }
    else if(intForce<0){
        for(var i=0;i<Math.abs(intForce)*2;i++){
            do var rnd=getRand(1,6);
            while(rnd==4 || arrPawnB[rnd]=='0');
            arrPawnB[rnd]='0';
        }
    }
    var str01=removeZeroFromFen(arrSquB.join(''));
    var str02=removeZeroFromFen(arrPawnB.join(''));
    var str03=removeZeroFromFen(arrPawnW.join(''));
    var str04=removeZeroFromFen(arrSquW.join(''));
    var fen=str01+'/'+str02+'/8/8/8/8/'+str03+'/'+str04+' w - - 0 1';
    return fen;
}
function removeZeroFromFen(str){
    str=str.replace(new RegExp('00000','g'),'5');
    str=str.replace(new RegExp('0000','g'),'4');
    str=str.replace(new RegExp('000','g'),'3');
    str=str.replace(new RegExp('00','g'),'2');
    str=str.replace(new RegExp('0','g'),'1');
    return str;
}
function randomFen(){
    var arrSquW=new Array('0','0','0','0','K','0','0','0');
	var arrSquB=new Array('0','0','0','0','k','0','0','0');
    var arrPcW=new Array('N','R','Q');
    var arrPcB=new Array('n','r','q');
    var intFree=7;
    for(var j=0;j<getRand(0,3);j++){
        for(var i=0;i<2;i++){
            do{var rnd=getRand(0,7);}
            while(arrSquW[rnd]!='0' || rnd%2==i);
            arrSquW[rnd]='B';
        }
        for(var i=0;i<2;i++){
            do{var rnd=getRand(0,7);}
            while(arrSquB[rnd]!='0' || rnd%2==i);
            arrSquB[rnd]='b';
        }
        intFree-=2;
    }
    do{
        var intPiece=getRand(0,2);
        do{var rnd=getRand(0,7);}
        while(arrSquW[rnd]!='0');
        arrSquW[rnd]=arrPcW[intPiece];
        do{var rnd=getRand(0,7);}
        while(arrSquB[rnd]!='0');
        arrSquB[rnd]=arrPcB[intPiece];
        intFree--;
    }
    while(intFree>0);
    return arrSquB.join('')+'/pppppppp/8/8/8/8/PPPPPPPP/'+arrSquW.join('')+' w - - 0 1';
}
function shuffleFen(){
	// this is to make fen string for random chess start positions
	// the eight squares of the chessboard first line for the white pieces, 0 is empty
	var arrWhite=new Array('0','0','0','0','0','0','0','0');
	var arrBlack=new Array('0','0','0','0','0','0','0','0');
	// kings random position
	arrWhite[getRand(0,7)]='K';
	arrBlack[getRand(0,7)]='k';
	// bishops random position
	for(var i=0;i<2;i++){
		do{var rnd=getRand(0,7);}
		while(arrWhite[rnd]!='0' || rnd%2==i);
		arrWhite[rnd]='B';
	}
	for(var i=0;i<2;i++){
		do{var rnd=getRand(0,7);}
		while(arrBlack[rnd]!='0' || rnd%2==i);
		arrBlack[rnd]='b';
	}
	// queens random position
	do{var rnd=getRand(0,7);}
	while(arrWhite[rnd]!='0');
	arrWhite[rnd]='Q';
	do{var rnd=getRand(0,7);}
	while(arrBlack[rnd]!='0');
	arrBlack[rnd]='q';
	// rooks random position
	for(var i=0;i<2;i++){
		do{var rnd=getRand(0,7);}
		while(arrWhite[rnd]!='0');
		arrWhite[rnd]='R';
	}
	for(var i=0;i<2;i++){
		do{var rnd=getRand(0,7);}
		while(arrBlack[rnd]!='0');
		arrBlack[rnd]='r';
	}
	// knights left two positions
	for(var i=0;i<=7;i++){if(arrWhite[i]=='0') arrWhite[i]='N';}
	for(var i=0;i<=7;i++){if(arrBlack[i]=='0') arrBlack[i]='n';}
	// glue fen string, castling KQkq not allowed for classic chess engine
	return arrBlack.join('')+'/pppppppp/8/8/8/8/PPPPPPPP/'+arrWhite.join('')+' w - - 0 1';
}
function setOutFromFen(strFen){
    clearBoard();
	var arr=strFen.split(' ');
	var str=arr[0];
	str=str.replace(new RegExp('8','g'),'00000000');
	str=str.replace(new RegExp('7','g'),'0000000');
	str=str.replace(new RegExp('6','g'),'000000');
	str=str.replace(new RegExp('5','g'),'00000');
	str=str.replace(new RegExp('4','g'),'0000');
	str=str.replace(new RegExp('3','g'),'000');
	str=str.replace(new RegExp('2','g'),'00');
	str=str.replace(new RegExp('1','g'),'0');
	var arr=str.split('/');
	var str=arr[7]+arr[6]+arr[5]+arr[4]+arr[3]+arr[2]+arr[1]+arr[0];
	for(var i=0;i<64;i++){
        var strUnitFen=str.charAt(i);
        var gSquare=o(arrCHESSBOARD[i]);
        if(strUnitFen=='0') gSquare.unit=null;
        else{
            var gUnit=getUnit(strUnitFen);
            gSquare.unit=gUnit;
            gSquare.appendChild(gUnit);
            gUnit.x=0;
            gUnit.y=0;
            fadeInG(gUnit,0.05,0,null);
        }
	}
}
function getUnit(strUnitFen){
    var gUnit=null;
    for(var i=0;i<ARR.length;i++){
        if(ARR[i].ctg=='unit' && ARR[i].fen==strUnitFen && ARR[i].shown===false){
            gUnit=ARR[i];
            break;
        }
    }
    if(gUnit===null){
        o('gBoard');
        switch(strUnitFen){
            case 'R':gUnit=get_white_rook(null,gBoard,-9999,-9999,1,false);break;
            case 'N':gUnit=get_white_knight(null,gBoard,-9999,-9999,1,false);break;
            case 'B':gUnit=get_white_bishop(null,gBoard,-9999,-9999,1,false);break;
            case 'Q':gUnit=get_white_queen('white_queen',gBoard,-9999,-9999,1,false);break;
            case 'K':gUnit=get_white_king('white_king',gBoard,-9999,-9999,1,false);break;
            case 'P':gUnit=get_white_pawn(null,gBoard,-9999,-9999,1,false);break;
            case 'r':gUnit=get_black_rook(null,gBoard,-9999,-9999,1,false);break;
            case 'n':gUnit=get_black_knight(null,gBoard,-9999,-9999,1,false);break;
            case 'b':gUnit=get_black_bishop(null,gBoard,-9999,-9999,1,false);break;
            case 'q':gUnit=get_black_queen('black_queen',gBoard,-9999,-9999,1,false);break;
            case 'k':gUnit=get_black_king('black_king',gBoard,-9999,-9999,1,false);break;
            case 'p':gUnit=get_black_pawn(null,gBoard,-9999,-9999,1,false);break;
        }
        if(CLR==false) turnG(gUnit,180);
        gUnit.ctg='unit';
    }
    return gUnit;
}
