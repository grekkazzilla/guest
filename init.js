function init(strClub,strHost){
    // DEFINE ROOT ELEMENTS
    var sctRoot=document.getElementById('sctRoot');
    var svgRoot=document.getElementsByTagName('svg')[0];
    var gWrap=svgRoot.getElementsByTagName('g')[0];
    var dfs=svgRoot.getElementsByTagName('defs')[0];
    // GRADIENTS & EFFECTS
    getLinGrd('grdButton','#eee8aa','#bdb76d',1,1,false,'down',dfs);
    getLinGrd('grdButtonRvs','#bdb76d','#eee8aa',1,1,false,'down',dfs);
    getLinGrd('grdIcon','#a0a0a0','#000',1,1,false,'down',dfs);
    getLinGrd('grdIconRvs','#505050','#909090',1,1,false,'down',dfs);
    getLinGrd('grdPale','#fff','#eee8aa',1,1,false,'down',dfs);
    getLinGrd('grdGold','#ffeeaa','#aa8800',1,1,false,'down',dfs);
    getLinGrd('grdGoldBrd','#d3bc5f','#2b2200',1,1,false,'down',dfs); // gold border
    getLinGrd('grdSilver','#ececec','#999999',1,1,false,'down',dfs);
    getLinGrd('grdSilverRvs','#999999','#ececec',1,1,false,'down',dfs);
    getLinGrd('grdBrain','#fff','#bdb76d',1,1,false,'down',dfs);
    getBlurFilter('blr2',2,dfs);
    getBlurFilter('blr3',3,dfs);
    getBlurFilter('blr8',8,dfs);
    getBlurFilter('blr14',14,dfs);
    // FULL SCALE UP
    OBJ_var.fltScale=getScale(svgRoot,gWrap,OBJ_var.wArena,OBJ_var.hArena,10);
    //getGrid(gWrap,OBJ_var.wArena,OBJ_var.hArena,50);
    //
    getLoad('gLoad',gWrap,-9999,-9999,1,'none',0);
    getSay(gWrap,OBJ_var.wArena,OBJ_var.hArena,'url(#blr3)');
    ////////////////////
    // DIV ARENA ///////
    ////////////////////
    var div=getG('divArena',gWrap,0,0,1,true,OBJ_var.wArena/2,OBJ_var.hArena/2);
    OBJ_var.divOn=div;
    // OBJ CHESS
    OBJ_chess.getBoard(8,8,2,'standard');
    // OBJ ARENA
    for(var i=0;i<10;i++){
        var objArena=new Object();
        objArena.objChess=copyObject(OBJ_chess);
        objArena.objDrive=null;             // drive for machine
        objArena.arrHist=new Array();       // history of fen positions
        objArena.ctgMode='blank';           // wait challenging challenged match watch read
        objArena.blnSide=true;              // true for white, false for black
        objArena.num=i;
        var objMatch=getObjMatch();
        objArena.objMatch=objMatch;
        // LOCAL STORAGE & LOADED PARAMS
        objMatch.intVar=getLocal('var'+i,1)*1; // chess variant, 1 - classic by default
        if(objMatch.intVar<0 && objMatch.intVar>8) objMatch.intVar=1;
        objMatch.intTimeA=getLocal('timeA'+i,600)*1;
        if(objMatch.intTimeA<60 || objMatch.intTimeA>172800) objMatch.intTimeA=600;
        objMatch.intTimeB=getLocal('timeB'+i,600)*1;
        if(objMatch.intTimeB<0 || objMatch.intTimeB>172800) objMatch.intTimeB=600;
        objMatch.intTimeC=getLocal('timeC'+i,600)*1;
        if(objMatch.intTimeC<0 || objMatch.intTimeC>172800) objMatch.intTimeC=600;
        objMatch.intAddA=getLocal('addA'+i,5)*1;
        if(objMatch.intAddA<0 || objMatch.intAddA>172800) objMatch.intAddA=5;
        objMatch.intAddB=getLocal('addB'+i,5)*1;
        if(objMatch.intAddB<0 || objMatch.intAddB>172800) objMatch.intAddB=5;
        objMatch.intAddC=getLocal('addC'+i,5)*1;
        if(objMatch.intAddC<0 || objMatch.intAddC>172800) objMatch.intAddC=5;
        objMatch.ctgClockA=getLocal('clockA'+i,'simple_delay');
        if(objMatch.ctgClockA!='simple_delay' && objMatch.ctgClockA!='compensation' && objMatch.ctgClockA!='accumulation') objMatch.ctgClockA='simple_delay';
        objMatch.ctgClockB=getLocal('clockB'+i,'simple_delay');
        if(objMatch.ctgClockB!='simple_delay' && objMatch.ctgClockB!='compensation' && objMatch.ctgClockB!='accumulation') objMatch.ctgClockB='simple_delay';
        objMatch.ctgClockC=getLocal('clockC'+i,'simple_delay');
        if(objMatch.ctgClockC!='simple_delay' && objMatch.ctgClockC!='compensation' && objMatch.ctgClockC!='accumulation') objMatch.ctgClockC='simple_delay';
        objMatch.intMoveA=getLocal('moveA'+i,40)*1;
        if(objMatch.intMoveA<0 || objMatch.intMoveA>60) objMatch.intMoveA=40;
        objMatch.intMoveB=getLocal('moveB'+i,20)*1;
        if(objMatch.intMoveB<0 || objMatch.intMoveB>60) objMatch.intMoveB=20;
        objMatch.blnSumA=getLocal('sumA'+i,false);
        if(objMatch.blnSumA!==true && objMatch.blnSumA!==false) objMatch.blnSumA=false;
        objMatch.blnSumB=getLocal('sumB'+i,false);
        if(objMatch.blnSumB!==true && objMatch.blnSumB!==false) objMatch.blnSumB=false;
        //
        OBJ_var.arrArena.push(objArena);
    }
    OBJ_chess=OBJ_var.arrArena[OBJ_var.numArena].objChess;
    // G CHESSBOARD
    var g=OBJ_board.drawBoard(div,'gBoard',4,129,1,49,'#eee8aa','#bdb76d',true);
    var pos=110; // for pawnjs engine purposes
    var num=21;
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            var gSqu=document.getElementById('g'+(pos+j)*1);
            gSqu.num=num+j;
            //getText(null,gSqu,25,40,15,'Arial','#f00','none',0,gSqu.num,'middle');
        }
        pos-=12;
        num+=10;
    }
    // BOX MATCH
    var boxMatch=getBoxMatch('boxMatch',div,5,7,true);
    boxMatch.onclick=function(){
        showBox('menuMatch');
    }
    boxMatch.style.cursor='pointer';
    putBoxMatch(boxMatch,OBJ_var.arrArena[OBJ_var.numArena].objMatch);
    // BOX PLAY
    var box=getBox('boxPlay',div,205,7,190,110,true,'url(#grdPale)');
    getButton(null,box,40,40,110,60,true,'AAAX',picFence(),0.13,function(){},null);
    // BOX USER A
    
    // BOX USER B
    
    // BTN BOX CLOSE
    getButton('btnBoxClose',div,-9999,-9999,40,40,false,'BXBX',picCross(),0.09,function(){hideBox(OBJ_var.boxOn)},null);
    // MENU MATCH
    var w=60, h=60, m=10, s=10;
    var menu=getMenu('menuMatch',div,w,h,m,s,4,4,false);
    menu.getElementsByTagName('rect')[0].setAttribute('height',310);
    menu.getElementsByTagName('rect')[1].setAttribute('height',310);
    getButton(null,menu,m,60,w,h,true,'AAAX',picListA(),0.1,function(){
        showBox('menuVar');
    },null);
    getButton(null,menu,m+w+s,60,w,h,true,'AAAX',picClock(),0.13,function(){
        showBox('menuTime');
        putMenuTime(null);
    },null);
    var btn=getButton('btnWhite',menu,m+w*2+s*2,60,w,h,true,'AAXX',null,0,function(){
        if(o('btnBlack').shown==false){o('btnBlack').x=this.x;o('btnBlack').y=this.y;showG('btnBlack');}
        if(o('btnAny').shown==false){o('btnAny').x=this.x;o('btnAny').y=this.y;showG('btnAny');}
        hideG(this);
    },null);
    draw_white_pawn(null,btn,(w-50)/2,(h-50)/2,1,true);
    btn.getElementsByTagName('path')[0].setAttribute('stroke','url(#grdIcon)');
    btn.arrOn.push(['path',0,'stroke','url(#grdIcon)','#000']);
    var btn=getButton('btnBlack',menu,m+w*3+s*3,60,w,h,true,'AAXX',null,0,function(){
        if(o('btnWhite').shown==false){o('btnWhite').x=this.x;o('btnWhite').y=this.y;showG('btnWhite');}
        if(o('btnAny').shown==false){o('btnAny').x=this.x;o('btnAny').y=this.y;showG('btnAny');}
        hideG(this);
    },null);
    draw_black_pawn('icnBlack',btn,(w-50)/2,(h-50)/2,1,true);
    btn.getElementsByTagName('path')[0].setAttribute('fill','url(#grdIcon)');
    btn.getElementsByTagName('path')[0].setAttribute('stroke','url(#grdIcon)');
    btn.arrOn.push(['path',0,'fill','url(#grdIcon)','#000'],['path',0,'stroke','url(#grdIcon)','#000']);
    var btn=getButton('btnAny',menu,m+w*4+s*4,60,w,h,false,'AAXX',null,0,function(){
        if(o('btnWhite').shown==false){o('btnWhite').x=this.x;o('btnWhite').y=this.y;showG('btnWhite');}
        if(o('btnBlack').shown==false){o('btnBlack').x=this.x;o('btnBlack').y=this.y;showG('btnBlack');}
        hideG(this);
    },null);
    draw_black_pawn(null,btn,(w-50)/2+8.5,(h-50)/2,1,true);
    draw_white_pawn(null,btn,(w-50)/2-8.5,(h-50)/2,1,true);
    btn.getElementsByTagName('path')[0].setAttribute('fill','url(#grdIcon)');
    btn.getElementsByTagName('path')[0].setAttribute('stroke','url(#grdIcon)');
    btn.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
    btn.arrOn.push(['path',0,'fill','url(#grdIcon)','#000'],['path',0,'stroke','url(#grdIcon)','#000'],['path',1,'stroke','url(#grdIcon)','#000']);
    var w=120, h=120, zIcon=0.35, btn=getButton('btnRobo',menu,menu.rx-s/2-w-1,60+60+s,w,h,true,'CXDX',picHead(),zIcon,function(){
        
    },null);
    getPath(null,btn,10,8,zIcon,'#fff','none',0,'M 150.8125 20.53125 C 142.23166 20.649011 133.77351 21.738763 125.6875 23.9375 C 97.476949 31.608545 75.888382 40.919518 62.65625 61.46875 C 48.139048 84.013668 46.658714 118.80442 61.0625 133.34375 C 84.590096 157.0928 148.9015 132.89243 169.59375 153.90625 C 185.13814 169.69221 183.625 205.90625 183.625 205.90625 C 183.625 205.90625 203.71848 209.09576 221.21875 206.0625 C 225.28586 173.47627 250.99893 165.25705 258.90625 136.59375 C 263.84646 118.68614 262.8774 99.610612 255.71875 82.46875 C 247.2828 62.268205 225.31432 42.412494 205.625 32.84375 C 189.04438 24.785735 169.69006 20.272178 150.8125 20.53125 z');
    var z=0.1, p=picGear();
    getPath(null,btn,39,21,z,'url(#grdIcon)','none',0,p[2]);
    var pth=getPath(null,btn,66,33,z,'url(#grdIcon)','none',0,p[2]);
    pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+z+') rotate(25,'+p[0]/2+','+p[1]/2+')');
    btn.setAttribute('transform','translate('+(btn.x+btn.rx*2)+','+btn.y+') scale(-1,1)');
    btn.arrOn.push(['path',1,'fill','#fff','#bdb76d'],['path',2,'fill','url(#grdIcon)','#fff'],['path',3,'fill','url(#grdIcon)','#fff']);
    var xIcon=10, yIcon=6, btn=getButton('btnHuman',menu,menu.rx+s/2+1,60+60+s,w,h,true,'CXAX',picHead(),zIcon,function(){
        
    },null); 
    getPath(null,btn,xIcon,yIcon,zIcon,'url(#grdBrain)','none',0,'M 149.71875,30.84375 C 139.88213,13.621626 99.966923,23.567615 104.75,42.59375 81.013503,35.786955 63.09487,59.874892 71.78125,74.5625 47.70203,84.174724 47.88273,103.19077 53.9375,117.4375 59.99836,131.69857 74.80883,144.06908 97.21875,134.375 120.06502,155.77418 142,136.0625 142,136.0625 c 0,0 23.03388,5.93899 26.40625,16.3125 4.45302,13.69731 1.4375,53.15625 1.4375,53.15625 12.1259,6.3128 26.07209,5.58737 36.03125,0.0937 0,0 -3.60519,-22.12751 5.53125,-22.40625 19.89695,-0.60702 50.01297,-21.83416 35.125,-40.5 20.34995,-0.86524 23.78991,-34.688 2.125,-43.90625 21.48307,-9.311746 -2.27502,-46.028717 -18.375,-37.65625 C 240.4482,42.907054 197.30804,22.136436 188.75,40.71875 188.51801,19.835603 159.09786,14.579847 149.71875,30.84375 z');
    pth=getPath(null,btn,xIcon,yIcon,zIcon,'#bdb76d','none',0,'M 128.875 28.34375 L 121.875 38.125 C 124.04186 39.672761 127.65321 45.172054 128.90625 51.53125 C 130.00989 57.132226 129.58595 63.130059 126.96875 68.15625 C 120.5826 71.22332 115.66776 76.022071 112.03125 80.875 C 111.805 81.17693 111.59572 81.478271 111.375 81.78125 C 108.24042 68.105692 98.786805 55.874919 87.34375 48.75 L 81 58.9375 C 94.216846 67.166853 104.03086 85.198972 99.03125 100.3125 C 89.230803 109.7786 83.631096 108.72246 79.0625 106.59375 C 74.3967 104.41975 71.34375 99.875 71.34375 99.875 L 61.1875 106.28125 C 61.1875 106.28125 65.555473 113.53408 74 117.46875 C 82.444527 121.40342 95.533839 120.76333 108.125 108.25 C 113.83019 102.58007 116.74126 94.579852 121.625 88.0625 C 126.50874 81.545148 131.8427 76.894435 141.53125 76.84375 C 151.47056 76.79175 156.47554 81.199307 159.875 85.9375 C 161.9217 88.790212 163.07296 91.607838 163.6875 93.40625 C 161.59453 95.134613 159.71847 97.175402 158.1875 99.5 C 153.67407 97.156779 148.9316 96.072932 144.28125 96.09375 C 138.3126 96.12047 132.52713 97.920598 127.6875 101.09375 C 118.00825 107.44005 111.50213 118.98439 112.21875 132.0625 L 124.1875 131.40625 C 123.71005 122.69279 128.10797 115.15209 134.25 111.125 C 140.192 107.22906 147.2189 106.42934 154.3125 111.09375 C 153.88113 117.9838 156.20761 125.71523 161.5 134.0625 L 171.625 127.625 C 166.58827 119.68095 165.76827 114.11688 166.5 110.28125 C 167.23173 106.44562 169.58027 103.58176 173.4375 101.15625 C 177.29473 98.730741 182.55056 97.092367 187.53125 96.46875 C 192.51194 95.845133 197.2979 96.314133 199.53125 97.09375 C 210.58709 100.95312 215.20982 106.28111 217 111.625 C 218.79018 116.96889 217.69672 123.1884 214.5625 128.84375 C 211.57562 134.23323 207.40385 136.94865 202.28125 140.09375 C 197.15865 143.23885 190.79142 146.78544 187.15625 154.15625 C 182.48693 163.62393 181.72877 176.44594 181.53125 187.4375 C 181.33373 198.42906 182.09375 207.46875 182.09375 207.46875 L 194.03125 206.46875 C 194.03125 206.46875 193.34579 197.97687 193.53125 187.65625 C 193.71671 177.33563 195.18327 165.05334 197.9375 159.46875 C 199.76387 155.76554 203.26323 153.54689 208.53125 150.3125 C 210.03513 149.38917 211.65463 148.37598 213.3125 147.21875 C 217.42996 147.93523 220.1266 149.11099 221.625 150.625 C 223.58919 152.60965 224.99222 156.09996 224.1875 164.28125 L 236.125 165.46875 C 237.11137 155.44064 235.35642 147.44184 230.15625 142.1875 C 228.12493 140.13502 225.79706 138.65506 223.25 137.5625 C 223.8867 136.64785 224.48938 135.69039 225.0625 134.65625 C 228.17428 129.04141 230.10337 122.53412 229.84375 115.90625 C 232.79796 115.59993 235.22145 116.11214 237.25 117.15625 C 240.57718 118.86877 243.36546 122.32683 244.96875 128 L 256.53125 124.75 C 254.25385 116.69149 249.57232 109.98024 242.75 106.46875 C 239.33884 104.71301 235.50645 103.86962 231.46875 103.875 C 229.96451 103.87686 228.42512 104.00576 226.875 104.25 C 224.9315 100.37352 222.00001 96.758947 218.09375 93.625 C 220.20058 88.440056 223.92513 85.378366 228 83.65625 C 232.77885 81.636616 238.01609 82.202824 239.625 83.15625 L 245.75 72.84375 C 242.5245 70.932345 238.85749 70.057778 235.03125 70.0625 C 231.20501 70.0672 227.22314 70.954247 223.34375 72.59375 C 217.1733 75.201502 211.27225 80.189916 207.75 87.46875 C 206.38145 86.867305 204.96472 86.303462 203.46875 85.78125 C 200.94875 84.901572 198.18061 84.402033 195.25 84.21875 C 194.70319 84.184552 194.15098 84.169149 193.59375 84.15625 C 196.32781 68.580022 205.88097 58.966879 218.90625 56.125 L 216.34375 44.375 C 197.74673 48.43253 183.93123 64.069129 181.3125 85.375 C 178.94882 85.88412 176.56293 86.560034 174.25 87.4375 C 173.25316 84.96868 171.79236 81.958377 169.625 78.9375 C 168.17114 76.911105 166.32419 74.887381 164.125 73 C 176.24997 62.39507 179.03979 45.360529 174.03125 31.21875 L 162.71875 35.25 C 166.8167 46.820683 164.30461 59.652531 152.65625 66.53125 C 149.32859 65.45824 145.60051 64.822135 141.46875 64.84375 C 141.21394 64.845083 140.9706 64.868456 140.71875 64.875 C 141.79601 59.544092 141.63056 54.132117 140.65625 49.1875 C 138.92415 40.39707 135.06655 32.766285 128.875 28.34375 z');
    pth.setAttribute('stroke-linecap','butt');
    btn.arrOn.push(['path',1,'fill','url(#grdBrain)','#bdb76d'],['path',2,'fill','#bdb76d','#fff']);
    var w=40, h=w, s=10;
    var z=0.11, p=picStar(), arr=new Array(
        [function(){setSkill(1);}],
        [function(){setSkill(2);}],
        [function(){setSkill(3);}],
        [function(){setSkill(4);}],
        [function(){setSkill(5);}]
    );
    for(var i in arr){
        var btn=getButton('btnSkill'+(i+1),menu,menu.rx-(w*5+s*4)/2+(w+s)*i,o('btnRobo').y+o('btnRobo').ry*2+s,w,h,true,'AAAX',picStar(),z,function(){
        
        },null);
        btn.getElementsByTagName('path')[0].setAttribute('filter','url(#blr14)');
        btn.appendChild(getPath(null,btn,0,0,1,'url(#grdButton)','#bdb76d',0.5,'M 5 0 C 2.23 0 0 2.23 0 5 L 0 35 C 0 37.77 2.23 40 5 40 L 35 40 C 37.77 40 40 37.77 40 35 L 40 5 C 40 2.23 37.77 0 35 0 L 5 0 z M 19.90625 5.21875 C 20.356973 5.21375 20.758674 5.49315 20.9375 5.90625 L 24.5 14.15625 C 24.66421 14.53895 25.021181 14.7805 25.4375 14.8125 L 34.40625 15.5 C 34.855902 15.5336 35.231836 15.8226 35.375 16.25 C 35.518162 16.6775 35.4015 17.1398 35.0625 17.4375 L 28.3125 23.375 C 27.999716 23.65 27.86925 24.0948 27.96875 24.5 L 30.09375 33.21875 C 30.2015 33.65595 30.01781 34.13805 29.65625 34.40625 C 29.294815 34.67435 28.824393 34.69815 28.4375 34.46875 L 20.6875 29.875 C 20.328208 29.6617 19.885626 29.6558 19.53125 29.875 L 11.90625 34.59375 C 11.522383 34.83085 11.023861 34.8236 10.65625 34.5625 C 10.28871 34.3005 10.12014 33.84595 10.21875 33.40625 L 12.1875 24.625 C 12.27874 24.2188 12.13046 23.80155 11.8125 23.53125 L 4.96875 17.71875 C 4.6257348 17.42755 4.4900292 16.96085 4.625 16.53125 C 4.7600971 16.10185 5.1452959 15.791 5.59375 15.75 L 14.53125 14.9375 C 14.94637 14.899 15.311409 14.6358 15.46875 14.25 L 18.875 5.90625 C 19.045762 5.48915 19.456535 5.22875 19.90625 5.21875 z'));
        btn.appendChild(getPath(null,btn,(w-p[0]*z)/2,(w-p[1]*z)/2,z,'url(#grdGold)','url(#grdGoldBrd)',5,p[2]));
    }
    // MENU VAR
    var w=150, h=60, m=10, s=10, x=m, y=60, qtyHor=2, qtyVer=4;
    var menu=getMenu('menuVar',div,w,h,m,s,qtyHor,qtyVer,false);
    getPath(null,menu,15,16,0.1,'url(#grdButton)','none',0,picListA()[2]);
    var arr=new Array(['Classic',''],['Shuffle',''],['Chess','960'],['Three','Queens'],['Pawn','Attack'],['Racing','Kings'],['Knight','King'],['Checkers','']);
    for(var i=0;i<arr.length;i++){
        var btn=getButton(null,menu,x,y,w,h,true,'AAXC',null,0,function(){
       
        },arr[i][0]+'~'+arr[i][1]);
        btn.strVar=arr[i][0]+' '+arr[i][1];
        btn.do=function(){
            /*ARR_arena[NUM_arena].intVar=this.var;
            chooseVar(ARR_arena[NUM_arena],true);
            hideG(o('boxVar'));
            o('boxBoard').getElementsByTagName('text')[0].firstChild.nodeValue=ARR_var[this.var];*/
        }
        getCircle(null,btn,25,30,10,'url(#grdButtonRvs)','none',0);
        btn.arrOn.push(['circle',0,'fill','url(#grdButtonRvs)','#eee8aa']);
        var arrText=btn.getElementsByTagName('text');
        arrText[0].setAttribute('x',btn.rx+15);arrText[1].setAttribute('x',btn.rx+15);
        if(arrText[1].firstChild.nodeValue=='') arrText[0].setAttribute('y',37);
        else{arrText[0].setAttribute('y',25);arrText[1].setAttribute('y',45);}
        x+=w+s;if((i+1)%qtyHor==0){x-=(w+s)*qtyHor;y+=h+s;}
    }
    // MENU TIME
    var w=70, h=60, m=9, s=6;
    var menu=getMenu('menuTime',div,w,h,m,s,5,5,false);
    getPath(null,menu,25,10,0.13,'url(#grdButton)','none',0,picClock()[2]);
    getText(null,menu,menu.rx,35,18,'Arial','url(#grdButton)','none',0,'Time Control','middle').style.fontWeight='bold';
    for(var i=0;i<5;i++){
        var x=m+(w+s)*i;
        for(var j=0;j<5;j++){
            var y=60+(h+s)*j;
            if(j==0){
                if(i==0 || i==2 || i==4){
                    var btn=getButton('btnTime'+i,menu,x,y,w,h,true,'AAXB',null,0,function(){
                        setMenuTime(this);
                    },'15~min');
                    var arrText=btn.getElementsByTagName('text');
                    arrText[0].setAttribute('y',25);arrText[1].setAttribute('y',45);
                    if(i==0) var n=1; else if(i==2) var n=5; else var n=9;
                    btn.elemBox=document.getElementById('boxMatch').getElementsByTagName('text')[n];
                    btn.intVal=15*60;
                    btn.blnOn=true;
                }
                else if(i==1 || i==3){
                    var gSet=getG('gSet'+i,menu,x,y,1,true,w/2,h/2);
                    var z=0.12, p=picCrossB();getPath(null,gSet,(w-p[0]*z)/2,(h-p[1]*z)/2,z,'#c0c0c0','none',0,p[2]);
                }
            }
            else if(j==1){
                if(i==0 || i==2 || i==4){
                    var btn=getButton('btnClock'+i,menu,x,y,w,h,true,'AACX',picTime(),0.13,function(){
                        setMenuTime(this);
                    },null);
                    if(i==0) var n=0; else if(i==2) var n=1; else var n=2;
                    btn.elemBox=document.getElementById('boxMatch').getElementsByTagName('path')[n];
                    btn.ctgVal='simple_delay';
                    btn.blnOn=true;
                }
                else if(i==1 || i==3){
                    var btn=getButton('btnMove'+i,menu,x,y,w,h,true,'AAXB',null,0,function(){
                        setMenuTime(this);
                    },'move~40');
                    var arrText=btn.getElementsByTagName('text');
                    arrText[0].setAttribute('y',25);arrText[1].setAttribute('y',45);
                    if(i==1) var n=3; else if(i==3) var n=7;
                    btn.elemBox=document.getElementById('boxMatch').getElementsByTagName('text')[n];
                    btn.intVal=40;
                    btn.blnOn=true;
                }
            }
            else if(j==2){
                if(i==0 || i==2 || i==4){
                    var btn=getButton('btnAdd'+i,menu,x,y,w,h,true,'AAXB',null,0,function(){
                        setMenuTime(this);
                    },'15~sec');
                    var arrText=btn.getElementsByTagName('text');
                    arrText[0].setAttribute('y',25);arrText[1].setAttribute('y',45);
                    if(i==0) var n=2; else if(i==2) var n=6; else var n=10;
                    btn.elemBox=document.getElementById('boxMatch').getElementsByTagName('text')[n];
                    btn.intVal=15;
                    btn.blnOn=true;
                }
                else if(i==1 || i==3){
                    var tgl=getToggle('tglSum'+i,menu,x,y-5,50,50,function(){
                        setMenuTime(this);
                    },'add +',40,65,'middle');
                }
            }
            else if(j==4){
                if(i==0){
                    mirrHor(getButton('btnSlideDown',menu,x,y,w,h,true,'AACX',picArrow(),0.1,function(){
                       putMenuTime(o('menuTime').rctOn.previousSibling);
                    },null));
                }
                else if(i==1){
                    var btn=getButton('btnSimpleDelay',menu,x,y,w,h,true,'AACX',picTime(),0.13,function(){
                        putMenuTime(this);
                    },null);
                    btn.ctgVal='simple_delay';
                }
                else if(i==2){
                    var btn=getButton('btnCompensation',menu,x,y,w,h,true,'AACX',picUp(),0.12,function(){
                        putMenuTime(this);
                    },null);
                    btn.ctgVal='compensation';
                }
                else if(i==3){
                    var btn=getButton('btnAccumulation',menu,x,y,w,h,true,'AACX',picHeap(),0.12,function(){
                        putMenuTime(this);
                    },null);
                    btn.ctgVal='accumulation';
                }
                else if(i==4){
                    getButton('btnSlideUp',menu,x,y,w,h,true,'AACX',picArrow(),0.1,function(){
                       putMenuTime(o('menuTime').rctOn.nextSibling);
                    },null);
                    
                }
            }
        }
    }
    //
    var gSlide=getG('gSlide',menu,2,263,1,true,194,25);
    var pth=getPath(null,gSlide,0,0,1,'transparent','#808080',3,'M 25.21875 5.71875 C 15.17045 6.235763 7.125 14.689729 7.125 25 C 7.125 35.64286 15.6875 44.28125 26.1875 44.28125 L 360.78125 44.28125 C 371.56696 44.28125 380.28125 35.64286 380.28125 25 C 380.28125 14.35714 371.56696 5.71875 360.78125 5.71875 L 26.1875 5.71875 C 25.85937 5.71875 25.54289 5.70207 25.21875 5.71875 z');
    pth.setAttribute('filter','url(#blr2)');
    getPath(null,gSlide,0,0,1,'#fff','none',0,'M 8.90625 0 C 3.97601 0 0 4.84975 0 10.875 L 0 39.125 C 0 45.15024 3.97601 50 8.90625 50 L 378.53125 50 C 383.46149 50 387.4375 45.15024 387.4375 39.125 L 387.4375 10.875 C 387.4375 4.84975 383.46149 0 378.53125 0 L 8.90625 0 z M 25.21875 5.71875 C 25.54289 5.70207 25.85937 5.71875 26.1875 5.71875 L 360.78125 5.71875 C 371.56696 5.71875 380.28125 14.35714 380.28125 25 C 380.28125 35.64286 371.56696 44.28125 360.78125 44.28125 L 26.1875 44.28125 C 15.6875 44.28125 7.125 35.64286 7.125 25 C 7.125 14.689729 15.17045 6.235763 25.21875 5.71875 z');
    var btnSlide=getG('btnSlide',gSlide,0,0,1,true,18,25);
    getRect(null,btnSlide,0,0,36,50,10,'url(#grdSilver)','#c0c0c0',1);
    getCircle(null,btnSlide,18,25,13,'url(#grdSilverRvs)','none',0);
    //
    var rct=getRect(null,gSlide,0,0,20,50,0,'transparent','none',0);
    rct.onmousedown=function(){
        o('btnSlide').blnHold=true;
        putMenuTime(o('rctSlide0'));
    }
    rct.onmouseover=function(){
        if(o('btnSlide').blnHold===true) putMenuTime(o('rctSlide0'));
    }
    rct.onmouseup=function(){
        o('btnSlide').blnHold=false;
    }
    var rct=getRect(null,gSlide,gSlide.rx*2-20,0,20,50,0,'transparent','none',0);
    rct.onmousedown=function(){
        o('btnSlide').blnHold=true;
        putMenuTime(o('menuTime').rctMax);
    }
    rct.onmouseover=function(){
        if(o('btnSlide').blnHold===true) putMenuTime(o('menuTime').rctMax);
    }
    rct.onmouseup=function(){
        o('btnSlide').blnHold=false;
    }
    //
    for(var i=0;i<246;i++){
        var rct=getRect('rctSlide'+i,gSlide,-9999,0,0,50,0,'transparent','none',0);
        rct.onmousedown=function(){
            o('btnSlide').blnHold=true;
            putMenuTime(this);
        }
        rct.onmouseover=function(){
            if(o('btnSlide').blnHold===true) putMenuTime(this);
        }
        rct.onmouseup=function(){
            o('btnSlide').blnHold=false;
        }
        rct.intVal=undefined;
    }
    menu.elemSet=null;
    menu.rctOn=o('rctSlide0');
    menu.rctMax=rct;
    setMenuTime(null);
    // G BOTTOM
    var w=60, h=60, s=6.4, g=getG('gBottom',div,4,533,1,true,0,0);
    getButton('btnMenu',g,0,0,60,60,true,'AAAX',picMenu(),0.11,function(){showBox('menuMain');},null);
    for(var i=0;i<5;i++){
        getButton('btnArena',g,(w+s)*(i+1),0,w,h,true,'AAAX',picChess(),0.13,function(){
            switchArena(i);
        },null);
    }
    // MENU MAIN
    if(OBJ_var.blnAuth===false){
        var qtyHor=4, qtyVer=2, w=60, h=60, x=10, y=60, m=10, s=10;
        var menu=getMenu('menuMain',div,w,h,m,s,qtyHor,qtyVer,false);
        getText(null,menu,menu.rx+10,50,18,'Arial','#bdb76d','none',0,'Guest','middle');
        var k=25;
        var arr=new Array(
            [picEnter(),0.13,function(){
                setForm('login');
                showDiv('divForm');
            }],
            [picPenA(),0.12,function(){}],
            [picImage(),0.13,function(){
                showDiv('divPic');
                setPix();
            }],
            [picSpiral(),0.38,function(){}],
            [picBoot(),0.14,function(){}],
            [picCup(),0.13,function(){}],
            [picBulb(),0.14,function(){}],
            [picHand(),0.14,function(){}]
        );
        for(var i=0;i<arr.length;i++){
            var btn=getButton('btnArena',menu,x,y+k,w,h,true,'AAAX',arr[i][0],arr[i][1],arr[i][2],null);
            if(i==3){
                var pth=btn.getElementsByTagName('path')[0];
                pth.setAttribute('stroke-width',8);
                pth.setAttribute('stroke','url(#grdIcon)');
                btn.arrOn.push(['path',0,'stroke','url(#grdIcon)','#eee8aa']);
            }
            x+=w+s;if((i+1)%qtyHor==0){x-=(w+s)*qtyHor;y+=h+s;}
        }
    }
    else if(OBJ_var.blnAuth===true){
        var qtyHor=5, qtyVer=4, w=60, h=60, x=10, y=60, m=10, s=6.4;
        var menu=getMenu('menuMain',div,w,h,m,s,qtyHor,qtyVer,false);
        getText(null,menu,menu.rx+10,50,18,'Arial','#bdb76d','none',0,'@varchess.com','middle');
        var k=25;
        getButton(null,menu,m,60+k,w,w,true,'AAAX',picExit(),0.13,function(){
            OBJ_var.blnLock=true;
            var z=0.375; hideG(this.getElementsByTagName('g')[0]);drawLoad(o('gLoad'),'url(#grdPale)',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,this);
            window.location.href='out.php';
        },null);
        getButton(null,menu,(m+w+s),60+k,w,w,true,'AAAX',picLockA(),0.13,function(){},null);
        getButton(null,menu,(m+w*2+s*2),60+k,w,w,true,'AAAX',picPenA(),0.12,function(){

        },null);
        getButton(null,menu,(m+w*3+s*3),60+k,w,w,true,'AAAX',picGear(),0.13,function(){showBox('menuSetUp');},null);
        getButton(null,menu,(m+w*4+s*4),60+k,w,w,true,'AAAX',picCup(),0.13,function(){},null);
        var btn=getButton(null,menu,m,(60+w+s+k),(w*3+s*2),w,true,'AAAX',picAward(),0.135,function(){},null);
        var pth=btn.getElementsByTagName('path')[0];
        pth.setAttribute('transform','translate('+(pth.x-66)+','+pth.y+') scale('+pth.z+')');
        getText('txtPlayerRankA',btn,30,35,18,'Arial','#eee8aa','none',0,'2','middle').style.fontWeight='bold';
        getText('txtPlayerRankB',btn,120,25,18,'Arial','url(#grdIcon)','none',0,'Chess 960','middle');
        getText('txtPlayerRankC',btn,120,45,18,'Arial','#404040','none',0,'Standard','middle');
        getButton(null,menu,(m+w*3+s*3),(60+w+s+k),w,w,true,'AAAX',picTV(),0.13,function(){},null);
        var btn=getButton(null,menu,(m+w*4+s*4),(60+w+s+k),w,w,true,'AAAX',picSpiral(),0.38,function(){},null);
        var pth=btn.getElementsByTagName('path')[0];
        pth.setAttribute('stroke-width',8);
        pth.setAttribute('stroke','url(#grdIcon)');
        btn.arrOn.push(['path',0,'stroke','url(#grdIcon)','#eee8aa']);
        var btn=getButton(null,menu,m,(60+w*2+s*2+k),(w*2+s),w,true,'AAAX',picCoin_0(),0.13,function(){},null);
        var pth=btn.getElementsByTagName('path')[0];
        pth.setAttribute('transform','translate('+(pth.x-30)+','+pth.y+') scale('+pth.z+')');
        getText('txtCoin',btn,85,37,18,'Arial','url(#grdIcon)','none',0,'346','middle').style.fontWeight='bold';
        var btn=getButton(null,menu,(m+w*2+s*2),(60+w*2+s*2+k),(w*2+s),w,true,'AAAX',picEnvelope(),0.12,function(){},null);
        var pth=btn.getElementsByTagName('path')[0];
        pth.setAttribute('transform','translate('+(pth.x-33)+','+pth.y+') scale('+pth.z+')');
        getText('txtPlayerMail',btn,85,37,18,'Arial','url(#grdIcon)','none',0,'1','middle').style.fontWeight='bold';
        getButton(null,menu,(m+w*4+s*4),(60+w*2+s*2+k),w,w,true,'AAAX',picBook(),0.13,function(){},null);
        getButton(null,menu,m,(60+w*3+s*3+k),w,w,true,'AAAX',picBoot(),0.15,function(){},null);
        getButton(null,menu,(m+w+s),(60+w*3+s*3+k),w,w,true,'AAAX',picBulb(),0.13,function(){},null);
        getButton(null,menu,(m+w*2+s*2),(60+w*3+s*3+k),w,w,true,'AAAX',picHand(),0.14,function(){},null);
        getButton(null,menu,(m+w*3+s*3),(60+w*3+s*3+k),w,w,true,'AAAX',picDown(),0.13,function(){},null);
        getButton(null,menu,(m+w*4+s*4),(60+w*3+s*3+k),w,w,true,'AAAX',picEye(),0.13,function(){
            setClubPage(1,'watch');
            showDiv('divClub');
        },null);
    }
    var wPic=70, gPic=getG('gPlayerPicA',menu,10,7,1,true,wPic/2,wPic/2);
    getPath(null,gPic,0,0,0,'url(#grdButton)','none',0,'');
    getText('txtPlayerNameA',menu,menu.rx+10,27,18,'Arial','url(#grdIcon)','none',0,OBJ_var.arrClub[0].strName,'middle').style.fontWeight='bold';
    // MENU SETUP
    if(OBJ_var.blnAuth===true){
        var w=300, h=60, x=10, y=60, m=10, s=10;
        var menu=getMenu('menuSetUp',div,w,h,m,s,1,4,false);
        getPath(null,menu,20,10,0.13,'url(#grdButton)','none',0,picGear()[2]);
        getButton(null,menu,menu.rx*2-97,10,40,40,true,'BXBX',picArrowC(),0.1,function(){},null);
        var wPic=140, gPic=getG('gPlayerPicB',menu,menu.rx-wPic-5,80,1,true,wPic/2,wPic/2);
        getRect(null,gPic,0,0,wPic,wPic,0,'transparent','url(#grdButton)',1);
        getPath(null,gPic,0,0,0,'url(#grdIcon)','none',0,'');
        getButton(null,gPic,gPic.rx-30,(wPic+25),60,60,true,'AAAX',picImage(),0.13,function(){
            showDiv('divPic');
            setPix();
        },null);
        var wImage=140, gImage=getG('gPlayerImage',menu,menu.rx+5,80,1,true,wImage/2,0);
        var img=document.getElementsByTagName('image')[0].cloneNode(true);
        img.id='imgPlayer';
        gImage.appendChild(img);
        img.setAttribute('x','0');
        img.setAttribute('y','0');
        img.setAttribute('width',wImage);
        img.setAttribute('height',wImage);
        getButton('btnImageUp',gImage,gImage.rx-30,(wImage+25),60,60,true,'AAAX',picCam(),0.13,function(){
            OBJ_var.blnLock=true;
            o('inpImage').click();
        },null);
        getButton('btnImageOff',gImage,gImage.rx+3,(wImage+25),60,60,false,'AXCX',picBin(),0.15,function(){
            showBox('boxConfirm');
            o('btnConfirmYes').do=function(){
                OBJ_var.blnLock=true;
                var z=0.45;hideG(this.getElementsByTagName('g')[0]);drawLoad(o('gLoad'),'url(#grdPale)',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,this);
                sendRequest('async_img_del.php','shot='+OBJ_var.strShot,function(){
                    hideG('gLoad');showG(o('btnConfirmYes').getElementsByTagName('g')[0]);
                    var rsp=xhr.responseText.split('~');
                    if(rsp[0]=='img_del_ok'){
                        o('imgPlayer').setAttribute('xlink:href','uimg.png');
                        hideG('btnImageOff');
                        var btn=o('btnImageUp');jumpG(btn,o('gPlayerImage').rx-30,btn.y);
                        showBox('menuSetUp');
                        OBJ_var.blnLock=false;
                    }
                    else {
                        showSay('Sorry`An error has occurred`The image has not been deleted.`Please try again later.',divArena);
                        o('btnCloseSay').do=function(){
                            hideG('boxSay');
                            showBox('menuSetUp');
                        };
                    }
                });
            }
            o('btnConfirmNo').do=function(){showBox('menuSetUp');}
        },null);
    }
    ////////////////////
    // DIV FORM ////////
    ////////////////////
    var div=getG('divForm',gWrap,0,0,1,false,OBJ_var.wArena/2,OBJ_var.hArena/2);
    var blnTouch=isTouch();
    var frm=getG('frmWrite',div,5,95,1,true,0,0);
    getRect(null,frm,0,0,389,150,15,'#808080','none',0).setAttribute('filter','url(#blr3)');
    getRect(null,frm,13,21,298,42,15,'#ffffff','#808080',2).setAttribute('filter','url(#blr2)');
    getRect(null,frm,13,86,298,42,15,'#ffffff','#808080',2).setAttribute('filter','url(#blr2)');
    getPath(null,frm,0,0,1,'#eee8aa','none',0,'M 15 0 C 6.69 0 0 6.69 0 15 L 0 135 C 0 143.31 6.69 150 15 150 L 374 150 C 382.31 150 389 143.31 389 135 L 389 15 C 389 6.69 382.31 0 374 0 L 15 0 z M 27.46875 20.875 L 297.0625 20.875 C 305.3725 20.875 312.0625 27.565 312.0625 35.875 L 312.0625 47.15625 C 312.0625 55.46625 305.3725 62.15625 297.0625 62.15625 L 27.46875 62.15625 C 19.15875 62.15625 12.46875 55.46625 12.46875 47.15625 L 12.46875 35.875 C 12.46875 27.565 19.15875 20.875 27.46875 20.875 z M 27.46875 86.125 L 297.0625 86.125 C 305.3725 86.125 312.0625 92.815 312.0625 101.125 L 312.0625 112.4375 C 312.0625 120.7475 305.3725 127.4375 297.0625 127.4375 L 27.46875 127.4375 C 19.15875 127.4375 12.46875 120.7475 12.46875 112.4375 L 12.46875 101.125 C 12.46875 92.815 19.15875 86.125 27.46875 86.125 z');
    getInput('inp00',13,21,298,42,frm);
    getInput('inp01',13,86,298,42,frm);
    // ICN ENTER
    var z=0.19, p=picEnter();
    var icn=getG('icnLogIn',div,(400-p[0]*z)/2-35,15,1,false,0,0);
    var pth=getPath(null,icn,0,0,z,'url(#grdButton)','none',0,p[2]);
    // ICN USER
    var z=0.18, p=picUser();
    var icn=getG('icnNewReg',div,(400-p[0]*z)/2+32,15,1,false,0,0);
    getPath(null,icn,0,0,z,'url(#grdButton)','none',0,p[2]);
    // ICN FIND
    var z=0.22, p=picMagni();
    var icn=getG('icnFind',div,(400-p[0]*z)/2,12,1,false,0,0);
    getPath(null,icn,0,0,z,'url(#grdButton)','none',0,p[2]);
    // BUTTON LOGIN && NEWREG
    var arr=new Array(
        ['btnLogIn',-1,picEnter(),0.14,function(){
            hideG('btnLogIn');
            hideG('icnNewReg');
            showG('icnLogIn');
            showG('btnNewReg');
            o('frmWrite').ctg='login';
        }],
        ['btnNewReg',+1,picUser(),0.13,function(){
            hideG('icnLogIn');
            hideG('btnNewReg');
            showG('btnLogIn');
            showG('icnNewReg');
            o('frmWrite').ctg='newreg';
        }]
    );
    for(var i=0;i<arr.length;i++) getButton(arr[i][0],div,(400-60)/2+35*arr[i][1],12,60,60,true,'AAAX',arr[i][2],arr[i][3],arr[i][4],null);
    // G HIDER
    var g=getG('gHide',frm,10,84,1,false,0,0);
    getRect(null,g,0,0,302,46,0,'#eee8aa','none',0);
    getText(null,g,151,22,18,'Arial','#bdb76d','none',0,'three chars at least required then','middle');
    getText(null,g,151,43,18,'Arial','#bdb76d','none',0,'push yes button to find matches','middle');
    // BTN CLOSE & SUBMIT
    var w=60, h=w, arr=new Array(
        ['btnCloseForm',10,picNo(),function(){
            clearInterval(o('spnCursor').tmr);
            showDiv(OBJ_var.divPrev);
        }],
        ['btnSubForm',80,picYes(),function(){
            OBJ_var.blnLock=true;
            var z=0.45;hideG(this.getElementsByTagName('g')[0]);drawLoad(o('gLoad'),'url(#grdPale)',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,this);
            var frm=o('frmWrite');
            var str00=o('inp00').getElementsByTagName('text')[1].innerHTML;
            var str01=o('inp01').getElementsByTagName('text')[1].innerHTML;
            //
            if(frm.ctg=='login' || frm.ctg=='newreg'){
                if(frm.ctg=='login') var fileAct='async_in.php';
                else if(frm.ctg=='newreg') var fileAct='async_reg.php';
                var strReq='name='+str00+'&pass='+str01;
            }
            else if(frm.ctg=='search'){
                var fileAct='async_find.php';
                var strReq='find='+str00+'&shot='+OBJ_var.strShot;
            }
            //
            sendRequest(fileAct,strReq,function(){
                var rsp=xhr.responseText.split('~');
                var spn=o('spnCursor');clearInterval(spn.tmr);spn.style.display='none';
                if(rsp[0]=='in_ok'){
                    window.location.href='.';
                }
                else if(rsp[0]=='reg_fail' || rsp[0]=='in_fail' || rsp[0]=='find_fail'){
                    hideG(o('gLoad'));showG(o('btnSubForm').getElementsByTagName('g')[0]);
                    showSay(rsp[1],o('divForm'));
                    o('btnCloseSay').do=function(){
                        hideG(o('boxSay'));
                        o('spnCursor').style.display='inline';
                        blinkCursor();
                        OBJ_var.blnLock=false;
                    }
                }
                else if(rsp[0]=='reg_ok'){
                    hideG(o('gLoad'));showG(o('btnSubForm').getElementsByTagName('g')[0]);
                    showSay(rsp[1],o('divForm'));
                    o('btnCloseSay').do=function(){
                        OBJ_var.blnLock=true;
                        var btn=o('btnCloseSay');
                        btn.blnUnlock=false;
                        var z=0.375;hideG(btn.getElementsByTagName('g')[0]);drawLoad(o('gLoad'),'#fff',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,btn);
                        window.location.href='.';
                    }
                }
                else if(rsp[0]=='find_ok'){
                    hideG('gLoad');
                    showG(o('btnSubForm').getElementsByTagName('g')[0]);
                    setClubFromStr(rsp[1],'find');
                    showDiv('divClub');
                    OBJ_var.blnLock=false;
                }
                else window.location.href='.';
            });
        }]);
    for(var i=0;i<arr.length;i++) getButton(arr[i][0],frm,320,arr[i][1],w,h,true,'DXEX',arr[i][2],0.16,arr[i][3],null);
    // KEYBOARD
    var w=50, h=w, s=w*1.05, x=0, y=0, gKeyBoard=getG('gKeyBoard',div,9,270,1,true,0,0);
    for(var i=0;i<39;i++){
        var strChar='', strText=null;
        var pic=null, z=0;
        w=h;
        switch(i){
            case 0:strChar='q';break;
            case 1:strChar='w';break;
            case 2:strChar='e';break;
            case 3:strChar='r';break;
            case 4:strChar='t';break;
            case 5:strChar='y';break;
            case 6:strChar='u';break;
            case 7:strChar='i';break;
            case 8:strChar='o';break;
            case 9:strChar='p';break;
            case 10:strChar='a';break;
            case 11:strChar='s';break;
            case 12:strChar='d';break;
            case 13:strChar='f';break;
            case 14:strChar='g';break;
            case 15:strChar='h';break;
            case 16:strChar='j';break;
            case 17:strChar='k';break;
            case 18:strChar='l';break;
            case 19:strChar='z';break;
            case 20:strChar='x';break;
            case 21:strChar='c';break;
            case 22:strChar='v';break;
            case 23:strChar='b';break;
            case 24:strChar='n';break;
            case 25:strChar='m';break;
            case 26:strChar='<';break;
            case 27:strChar='0';break;
            case 28:strChar='1';break;
            case 29:strChar='2';break;
            case 30:strChar='3';break;
            case 31:strChar='4';break;
            case 32:strChar='^';break;
            case 33:strChar='5';break;
            case 34:strChar='6';break;
            case 35:strChar='7';break;
            case 36:strChar='8';break;
            case 37:strChar='9';break;
            case 38:strChar='_';break;
        }
        if(i==26) pic=picArrow(), z=0.09;
        if(i==38 || i==26 || i==32) w*=2;
        else strText=strChar;
        var btn=getButton(null,gKeyBoard,x,y,w,h,true,'EBFA',pic,z,function(){
            
        },strText);
        btn.str=strChar;
        //
        if(i==32){
            btn.id='btnCase';
            btn.up=false;
            getText(null,btn,50,32,20,'Arial','#fff','none',0,'CAP','middle');
        }
        else if(i==26){var pth=btn.getElementsByTagName('path')[0];pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+') rotate(-180,'+pth.w/2+','+pth.h/2+')');}
        else if(i==38) getPath(null,btn,35,23,1,'transparent','#fff',2,'M 0 0 L 0 5 L 30 5 L 30 0');
        btn.onmousedown=function(){
            if(OBJ_var.blnLock===false){
                OBJ_var.blnLock=true;
                onBtn(this,1);
                var btn=this;
                setTimeout(function(){
                    if(btn.str=='^'){
                        o('btnCase').up=!o('btnCase').up;
                        changeCase();
                    }
                    else if(btn.str=='<') backSpace();
                    else printBtn(btn.str);
                    onBtn(btn,0);
                    OBJ_var.blnLock=false;
                },100);
            }
        }
        x+=s;
        switch(i){
            case 6:x=50/3;y+=s;break;
            case 13:x=0;y+=s;break;
            case 20:x=50/3;y+=s;break;
            case 26:x=0;y+=s;break;
            case 32:x=50/3;y+=s;break;
        }
    }
    // SPN CURSOR
    var spn=getSVG('tspan','spnCursor',o('inp00').getElementsByTagName('text')[1]);
    spn.innerHTML='|';
    spn.arr=new Array();
    ////////////////////
    // DIV CLUB ////////
    ////////////////////
    var div=getG('divClub',gWrap,0,0,1,false,OBJ_var.wArena/2,OBJ_var.hArena/2);
    var gBar=getG('gClubBar',div,0,15,1,true,0,0);
    /*var w=40, h=w, s=7, arr=new Array(
        ['btnClubFind',picMagniA(),0.1,function(){
            hideG(o('divClub'));
            setForm('search','divClub');
            if(BOX_on!=''){
                hideG(BOX_on);
                BOX_on='';
            }
            hideG('divClub');
            showG('divForm');
        }],
        ['btnClubClose',picCross(),0.09,function(){
            setClub(1,'club');
        }],
        ['btnClubSetUp',picGear(),0.11,function(){}]
    );
    for(var i in arr){
        makeButton(arr[i][0],gBar,0,0,w,h,false,arrBtnRct00,null,[arr[i][1],arr[i][2],['transparent','#fff',15]],arr[i][3],new Array(['rect',0,'fill','url(#Icon)','#000']),null);
    }*/
    getButton('btnClubFind',gBar,0,0,40,40,false,'BXBX',picMagniA(),0.1,function(){
        setForm('search');
        showDiv('divForm');
    },null);
    getButton('btnClubClose',gBar,0,0,40,40,false,'BXBX',picCross(),0.09,function(){
        setClub(1,'club');
    },null);
    getButton('btnClubSetUp',gBar,0,0,40,40,false,'BXBX',picGear(),0.11,function(){
        
    },null);
    // page buttons
    for(var i=0;i<6;i++){
        var btn=getButton('btnClubPage'+i,gBar,-9999,-9999,40,40,false,'BBXA',null,0,function(){
            asmClub(this.goToPage);
        },'');
        btn.goToPage=0;
    }
    // page number
    var gNum=getG('gClubPageNum',gBar,-9999,-9999,1,false,w/2,h/2);
    getRect(null,gNum,1,1,w-2,h-2,5,'transparent','url(#Icon)',2);
    getText(null,gNum,w/2,25,18,'Arial','url(#Icon)','none',0,'0','middle');
    // set bar width
    gBar.w=o('btnClubFind').rx*2;
    jumpG(gBar,(400-gBar.w)/2,gBar.y);
    // USERS SHOWN SQUARES PER PAGE
    for(i=0;i<6;i++) getBoxClub('boxClub'+i,div,-9999,-9999,false);
    ////////////////////
    // DIV PLAYER //////
    ////////////////////
    if(OBJ_var.blnAuth===true){
        /*var div=getG('divPlayer',gWrap,0,0,1,false,OBJ_var.wArena/2,OBJ_var.hArena/2);
        var z=0.14, p=picUser(); getPath(null,div,div.rx-p[0]*z/2,45,z,'url(#grdButton)','none',0,p[2]);
        var box=getBoxClub('boxPlayer',div,5,140,true);
        getButton(null,box,5,5,60,60,true,'AAAX',picImage(),0.13,function(){
            showDiv('divPic');
            setPix();
        },null);
        box.getElementsByTagName('g')[0].x+=35;
        box.onclick=function(){}
        putBoxClub(box,OBJ_var.arrClub[0]);
        var box=getBox('boxPlayerImage',div,205,140,190,110,true,'#fff');
        getButton(null,box,5,5,60,60,true,'AAAX',picCam(),0.13,function(){
            o('inpImage').click();
        },null);
        var img=document.getElementsByTagName('image')[0].cloneNode(true);
        box.appendChild(img);
        img.setAttribute('xlink:href','upic.png');
        img.setAttribute('x','75');
        img.setAttribute('y','0');
        img.setAttribute('width','110');
        img.setAttribute('height','110');
        var box=getBox(null,div,5,260,390,160,true,'url(#grdPale)');
        getButton(null,box,5,5,60,60,true,'AAAX',picPenA(),0.12,function(){},null);*/
    }
    ////////////////////
    // DIV MEMBER //////
    ////////////////////
    var div=getG('divMember',gWrap,0,0,1,false,OBJ_var.wArena/2,OBJ_var.hArena/2);
    var box=getBox(null,div,5,7,390,55,true,'#fff');
    getToggle(null,box,0,2.5,50,50,function(){},'',70,30,'start');
    getButton(null,box,390-10-40,55/2-20,40,40,true,'BXBX',picArrowC(),0.09,function(){
        
    },null);
    var box=getBoxClub('boxMember',div,4,75,true);
    var box=getBox('boxMemberImage',div,205,75,190,110,true,'#fff');
    var z=0.12, p=picCam(); getPath(null,box,20,10,z,'url(#grdButton)','none',0,p[2]);
    getToggle('tglMemberImage',box,3,50,50,50,function(){},'',70,30,'start');
    var img=document.getElementsByTagName('image')[0].cloneNode(true);
    box.appendChild(img);
    img.setAttribute('xlink:href','upic.jpg');
    img.setAttribute('x','80');
    img.setAttribute('y','0');
    img.setAttribute('width','110');
    img.setAttribute('height','110');
    // DIV MEMBER MENU
    var w=60, s=6.4;
    var menu=getG('menuMember',div,4,195,1,true,0,0);
    var btn=getButton(null,menu,0,0,(w*2+s),w,true,'AAAX',picTV(),0.13,function(){},null);
    var pth=btn.getElementsByTagName('path')[0];
    pth.setAttribute('transform','translate('+(pth.x-30)+','+pth.y+') scale('+pth.z+')');
    getText('txtMemberWatch',btn,85,37,18,'Arial','url(#grdIcon)','none',0,'1','middle').style.fontWeight='bold';
    var btn=getButton(null,menu,(w*2+s*2),0,(w*2+s),w,true,'AAAX',picEnvelope(),0.12,function(){},null);
    var pth=btn.getElementsByTagName('path')[0];
    pth.setAttribute('transform','translate('+(pth.x-33)+','+pth.y+') scale('+pth.z+')');
    getText('txtMemberMail',btn,85,37,18,'Arial','url(#grdIcon)','none',0,'1','middle').style.fontWeight='bold';
    var btn=getButton(null,menu,(w*4+s*4),0,(w*2+s),w,true,'AAAX',picSpiral(),0.38,function(){},null);
    var pth=btn.getElementsByTagName('path')[0];
    pth.setAttribute('stroke-width',8);
    pth.setAttribute('stroke','url(#grdIcon)');
    btn.arrOn.push(['path',0,'stroke','url(#grdIcon)','#eee8aa']);
    pth.setAttribute('transform','translate('+(pth.x-30)+','+(pth.y+2)+') scale('+pth.z+')');
    getText('txtMemberWait',btn,85,37,18,'Arial','url(#grdIcon)','none',0,'3','middle').style.fontWeight='bold';
    var btn=getButton('btnMemberRank',menu,0,(w+s),(w*3+s*2),w,true,'AAAX',picAward(),0.135,function(){},null);
    var pth=btn.getElementsByTagName('path')[0];
    pth.setAttribute('transform','translate('+(pth.x-66)+','+pth.y+') scale('+pth.z+')');
    getText(null,btn,30,35,18,'Arial','#eee8aa','none',0,'2','middle').style.fontWeight='bold';
    getText(null,btn,120,25,18,'Arial','url(#grdIcon)','none',0,'Chess 960','middle');
    getText(null,btn,120,45,18,'Arial','#404040','none',0,'Standard','middle');
    getButton(null,menu,(w*3+s*3),(w+s),w,w,true,'AAAX',picBook(),0.13,function(){},null);
    getButton(null,menu,(w*4+s*4),(w+s),(w*2+s),w,true,'AAAX',picFence(),0.13,function(){},null);
    var box=getBox('boxMemberRankA',menu,0,(w+s)*2,(w*3+s*2),w,true,'url(#grdPale)');
    var z=0.14, p=picAward(); getPath(null,box,10,box.ry-p[1]*z/2,z,'url(#grdButton)','none',0,p[2]);
    var box=getBox('boxMemberRankB',menu,(w*3+s*3),(w+s)*2,(w*3+s*2),w,true,'url(#grdPale)');
    var z=0.14, p=picAward(); getPath(null,box,10,box.ry-p[1]*z/2,z,'url(#grdButton)','none',0,p[2]);
    //
    getButton('btnMemberHeart',div,-9999,-9999,60,60,false,'AACX',picHeart(),0.08,function(){},null);
    getButton('btnMemberStar',div,-9999,-9999,60,60,false,'AACX',picNone(),0.08,function(){},null);
    //
    var box=getBox(null,div,5,400,390,126,true,'url(#grdPale)');
    var z=0.11, p=picPenA(); getPath(null,box,10,10,z,'url(#grdButton)','none',0,p[2]);
    ////////////////////
    // DIV PIC /////////
    ////////////////////
    var div=getG('divPic',gWrap,0,0,1,false,OBJ_var.wArena/2,OBJ_var.hArena/2);
    getButton('btnClosePix',div,div.rx-43,10,40,40,true,'BXBX',picArrowC(),0.09,function(){
        setPix();
    },null);
    getButton(null,div,div.rx+3,10,40,40,true,'BXBX',picCross(),0.09,function(){
        showDiv('divPlayer')
    },null);
    var w=90, h=w, r=0, s=15, nh=3, nv=4, x=(400-w*nh-s*(nh-1))/2, y=(600-h*nv-s*(nv-1)-15)/2;
    for(var i=0;i<12;i++){
        var g=getG('gPic'+i,divPic,x,y,1,true,w/2,h/2);
        getRect(null,g,0,0,w,h,r,'#808080','none',0).setAttribute('filter','url(#blr2)');
        getRect(null,g,0,0,w,h,r,'#fff','none',0);
        getPath(null,g,0,0,0,'none','none',0,'');
        g.style.cursor='pointer';
        g.onclick=function(){
            if(OBJ_var.blnLock===false){
                OBJ_var.blnLock=true;
                showDiv('divArena');
                showBox('menuMain');
                var z=0.6, gPic=o('gPlayerPicA'), pthPic=gPic.getElementsByTagName('path')[0];
                pthPic.setAttribute('d','');
                drawLoad('gLoad','url(#grdButton)',6,(gPic.rx*2-100*z)/2,(gPic.ry*2-100*z)/2,z,gPic);
                sendRequest('async_pic.php','file='+this.strFile+'&shot='+OBJ_var.strShot,function(){
                    hideG('gLoad');
                    var rsp=xhr.responseText.split('~');
                    if(rsp[0]=='change_pic_ok'){
                        hideG('gLoad');
                        var arrPic=rsp[2].split(':');
                        var wPic=arrPic[0]*1;
                        var hPic=arrPic[1]*1;
                        var strPicD=arrPic[2];
                        var zPic=0.225, gPic=o('gPlayerPicA'), pthPic=gPic.getElementsByTagName('path')[0];
                        pthPic.setAttribute('transform','translate('+(gPic.rx-wPic*zPic/2)+','+(gPic.ry-hPic*zPic/2)+') scale('+zPic+')');
                        pthPic.setAttribute('d',strPicD);
                        var zPic=0.3, gPic=o('gPlayerPicB'), pthPic=gPic.getElementsByTagName('path')[0];
                        pthPic.setAttribute('transform','translate('+(gPic.rx-wPic*zPic/2)+','+(gPic.ry-hPic*zPic/2)+') scale('+zPic+')');
                        pthPic.setAttribute('d',strPicD);
                        OBJ_var.blnLock=false;
                    }
                    else{
                        showSay(rsp[1],'divArena');
                        o('btnCloseSay').do=function(){
                            hideG('boxSay');
                            OBJ_var.blnLock=false;
                        }
                    }
                });
            }
        }
        x+=(w+s);if((i+1)%nh==0){x-=(w+s)*nh;y+=(h+s);}
    }
    ////////////////////
    // DIV IMAGE ///////
    ////////////////////
    var div=getG('divImage',gWrap,0,0,1,false,OBJ_var.wArena/2,OBJ_var.hArena/2);
    var btn=getButton(null,div,200-5-60-60-10,10,60,60,true,'DXEX',picMagniA(),0.17,null,null);
    getPath(null,btn,14,24,0.085,'#eee8aa','#bdb76d',20,picMinus()[2]);
    btn.arrOn.push(['path',1,'fill','#eee8aa','transparent'],['path',1,'stroke','#bdb76d','#eee8aa']);
    if(isTouch()===true){
        btn.ontouchstart=function(){setImageZoom(this,-1);}
        btn.ontouchend=function(){o('rctChangeSelect').blnZoom=false;}
        btn.ontouchleave=function(){o('rctChangeSelect').blnZoom=false;}
    }
    else{
        btn.onmousedown=function(){setImageZoom(this,-1);}
        btn.onmouseup=function(){o('rctChangeSelect').blnZoom=false;}
        btn.onmouseout=function(){o('rctChangeSelect').blnZoom=false;}
    }
    var btn=getButton(null,div,200-5-60,10,60,60,true,'DXEX',picMagniA(),0.17,null,null);
    getPath(null,btn,14,15,0.085,'#eee8aa','#bdb76d',20,picPlus()[2]);
    btn.arrOn.push(['path',1,'fill','#eee8aa','transparent'],['path',1,'stroke','#bdb76d','#eee8aa']);
    if(isTouch()===true){
        btn.ontouchstart=function(){setImageZoom(this,+1);}
        btn.ontouchend=function(){o('rctChangeSelect').blnZoom=false;}
        btn.ontouchleave=function(){o('rctChangeSelect').blnZoom=false;}
    }
    else{
        btn.onmousedown=function(){setImageZoom(this,+1);}
        btn.onmouseup=function(){o('rctChangeSelect').blnZoom=false;}
        btn.onmouseout=function(){o('rctChangeSelect').blnZoom=false;}
    }
    getButton('btnSubImage',div,200+5,10,60,60,true,'DXEX',picYes(),0.16,function(){
        OBJ_var.blnLock=true;
        var z=0.45;hideG(this.getElementsByTagName('g')[0]);drawLoad('gLoad','url(#grdPale)',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,this);
        var inp=document.getElementById('inpImage');
        var dat=new FormData();
        var doc=inp.files[0];
        dat.append('doc',doc);
        dat.append('shot',OBJ_var.strShot);
        var rct=o('rctChangeSelect');
        dat.append('xSelect',rct.xThis);
        dat.append('ySelect',rct.yThis);
        dat.append('xImage',rct.xImage0);
        dat.append('yImage',rct.yImage0);
        dat.append('wSelect',rct.wThis);
        dat.append('type',rct.strType);
        dat.append('scale',rct.fltScale);
        inp.xhr=new XMLHttpRequest();
        inp.xhr.open('POST','async_img.php',true);
        inp.xhr.onreadystatechange = checkState;
        inp.xhr.send(dat);
        inp.xhr.onreadystatechange = function(){
            if(this.readyState==4){
                if(this.status==200){
                    var rsp=this.responseText.split('~');
                    if(rsp[0]=='img_ok' || rsp[0]=='img_fail'){
                        showDiv('divArena');
                        showBox('menuSetUp');
                        o('imgPlayer').setAttribute('xlink:href','../u/'+OBJ_var.arrClub[0].strName+'/img.jpeg?v='+getRand(0,1000));
                        showSay(rsp[1],'divArena');
                        if(rsp[0]=='img_ok'){
                            var btnImageUp=o('btnImageUp'), gPlayerImage=o('gPlayerImage');
                            jumpG(btnImageUp,gPlayerImage.rx-btnImageUp.rx*2-3,btnImageUp.y);
                            showG('btnImageOff');
                        }
                        o('btnCloseSay').do=function(){
                            hideG(o('boxSay'));
                            OBJ_var.blnLock=false;
                        }
                        hideG('gLoad');
                        showG(o('btnSubImage').getElementsByTagName('g')[0]);
                    }
                    else window.location.href='';
                }
            }
        }
    },null);
    getButton(null,div,200+5+10+60,10,60,60,true,'DXEX',picNo(),0.16,function(){showDiv('divArena');},null);
    var z=0.13, p=picCam(); getPath(null,div,(OBJ_var.wArena-p[0]*z)/2,82,z,'url(#grdButton)','none',0,p[2]);
    var w=396, gImage=getG('gImage',div,4,125,1,true,w/2,w/2);
    getRect(null,gImage,0,0,w,w,0,'transparent','url(#grdButton)',1);
    var img=document.getElementsByTagName('image')[0].cloneNode(true);
    gImage.appendChild(img);
    img.setAttribute('x','0');
    img.setAttribute('y','0');
    img.setAttribute('width',w);
    img.setAttribute('height',w);
    getRect('rctChangeTop',gImage,0,0,0,0,0,'#fff','none',0).setAttribute('opacity','0.5');
    getRect('rctChangeLeft',gImage,0,0,0,0,0,'#fff','none',0.0).setAttribute('opacity','0.5');
    getRect('rctChangeBottom',gImage,0,0,0,0,0,'#fff','none',0).setAttribute('opacity','0.5');
    getRect('rctChangeRight',gImage,0,0,0,0,0,'#fff','none',0.0).setAttribute('opacity','0.5');
    //
    var rctSelect=getRect('rctChangeSelect',gImage,0,0,0,0,0,'transparent','#000',0.5);
    rctSelect.style.cursor='pointer';
    rctSelect.blnMove=false;
    rctSelect.blnZoom=false;
    if(isTouch()===true){
        rctSelect.ontouchstart=function(){this.blnMove=true;this.x0=event.touches[0].pageX;this.y0=event.touches[0].pageY;}
        rctSelect.ontouchend=function(){this.blnMove=false;}
        rctSelect.ontouchleave=function(){this.blnMove=false;}
        rctSelect.ontouchmove=function(){putImageMove(this,event.touches[0].pageX,event.touches[0].pageY);}
    }
    else{
        rctSelect.onmousedown=function(){this.blnMove=true;this.x0=event.pageX;this.y0=event.pageY;}
        rctSelect.onmouseup=function(){this.blnMove=false;}
        rctSelect.onmouseout=function(){this.blnMove=false;}
        rctSelect.onmousemove=function(){putImageMove(this,event.pageX,event.pageY);}
    }
    // BOX CONFIRM
    var gBoard=o('gBoard');
    var wBox=250, hBox=150, xBox=gBoard.x+gBoard.rx*gBoard.z-wBox/2, yBox=gBoard.y+gBoard.ry*gBoard.z-hBox/2;
    var box=getBox('boxConfirm',o('divArena'),xBox,yBox,wBox,hBox,false,'url(#grdPale)');
    var wIcon=60, zPic=0.15, arrPic=picBin();
    var icn=getG('icnConfirm',box,1,1,1,true,wIcon/2,wIcon/2);
    getPath(null,icn,(icn.rx-arrPic[0]*zPic/2),(icn.ry-arrPic[1]*zPic/2),zPic,'url(#grdButton)','none',0,arrPic[2]);
    getText('txtConfirmA',box,box.rx,40,18,'Arial','url(#grdIcon)','none',0,'Yes or no?','middle').style.fontWeight='bold';
    getButton('btnConfirmYes',box,box.rx-70,75,60,60,true,'DXEX',picYes(),0.16,function(){},null);
    getButton('btnConfirmNo',box,box.rx+5,75,60,60,true,'DXEX',picNo(),0.16,function(){},null);
    ////////////////////
    // END SHOW ////////
    ////////////////////
    var imgLoad=document.getElementsByTagName('img')[0];
    imgLoad.parentNode.removeChild(imgLoad);
    sctRoot.style.display='block';
}