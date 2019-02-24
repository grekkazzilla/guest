function init(strHost,strClub){
    var sct=document.getElementsByTagName('section')[0];
    var svg=sct.getElementsByTagName('svg')[0];
    var gWrap=svg.getElementsByTagName('g')[0];
    gWrap.id='gWrap';
    var dfs=svg.getElementsByTagName('defs')[0];
    FLT_scale=fullArena(svg,gWrap,W_arena,H_arena,10);
    //drawGrid(gWrap,W_arena,H_arena,50);
    getPaint(dfs);
    getLoad('gLoad',gWrap,-9999,-9999,1,'none',0);
    getSay(gWrap,W_arena,H_arena,'url(#blr3)');
    // PARAMS
    var div,arr,tmp,W,H,Z,R,X,Y,w,h,z,x,y,s,G,g,p,pth,box,btn,icn,s,ml,mr,mt,mb,nh,nv;
    // CREATE DIVISIONS
    var divArena=getG('divArena',gWrap,0,0,1,true,0,0);
    var divBoard=getG('divBoard',gWrap,0,0,1,false,0,0);
    var divLog=getG('divLog',gWrap,0,0,1,false,0,0);
    var divBest=getG('divBest',gWrap,0,0,1,false,0,0);
    var divSave=getG('divSave',gWrap,0,0,1,false,0,0);
    // BTN DEFAULT
    var arrBtnRct=new Array(5,'url(#Button)','none',0);
    var arrBtnBrd=new Array(5,'url(#Button_rvs)',1);
    var arrBtnIcn=new Array('url(#Icon)','none',0);
    var arrBtnOn=new Array(['rect',0,'fill','url(#Button)','#bdb76d'],['rect',1,'stroke','url(#Button_rvs)','#eee8aa'],['path',0,'fill','url(#Icon)','#eee8aa']);
    var arrBtnRct00=new Array(5,'url(#Icon)','none',0);
    var arrBtnBrd00=new Array(5,'url(#Icon_rvs)',1);
    var arrBtnIcn00=new Array('url(#Pale)','none',0);
    var arrBtnOn00=new Array(['rect',0,'fill','url(#Icon)','#000'],['rect',1,'stroke','url(#Icon_rvs)','#fff']);
    // G BOTTOM
    var grp=getG('grpBottom',divArena,4,533,1,true,0,0);
    // BTN MENU
    var w=60, h=w;
    makeButton('btnMenu',grp,0,0,w,h,true,arrBtnRct,arrBtnBrd,[graphMenu(),0.11,arrBtnIcn],function(){
        openBox('boxMenu');
    },arrBtnOn,null)
    // BTN BOARD
    s=7, z=0.13;
    arr=new Array(
        function(){switchArena(0);},
        function(){switchArena(1);},
        function(){switchArena(2);},
        function(){switchArena(3);},
        function(){switchArena(4);}
    );
    for(var i=0;i<5;i++){
        btn=makeButton('btnBoard'+i,grp,(w+s)*(i+1),0,w,h,true,arrBtnRct,arrBtnBrd,[graphChess(),z,arrBtnIcn],arr[i],arrBtnOn,null);
    }
    chess.getBoard(8,8,2,'standard');
    for(var i=0;i<5;i++){
        var objArena=new Object();
        objArena.objChess=deepCopy(chess);
        objArena.objDrive=null;             // drive for machine
        objArena.arrHist=new Array();       // history of fen positions
        objArena.ctgMode='blank';           // wait challenging challenged match watch read
        objArena.intNum=i;
        ARR_arena.push(objArena);
    }
    NUM_arena=0;
    chess=ARR_arena[NUM_arena].objChess;
    // G CHESSBOARD
    var gBoard=board.drawBoard(divArena,4,129,1,49,'#eee8aa','#bdb76d',true);
    gBoard.id='gBoard';
    var pos=110;
    var num=21;
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            var gSqu=o('g'+(pos+j)*1);
            gSqu.num=num+j;
            //getText(null,gSqu,25,40,15,'Arial','#f00','none',0,gSqu.num,'middle');
        }
        pos-=12;
        num+=10;
    }
    // BOXES
    var boxBoard=getBoardBox('boxBoard',divArena,5,7,false);
    boxBoard.style.cursor='pointer';
    boxBoard.onclick=function(){
        openBox('boxSide');
    }
    getUserBox('boxUserA',divArena,5,7,false);
    getUserBox('boxUserB',divArena,205,7,false);
    var wBox=190, hBox=110, boxStart=getG('boxStart',divArena,205,7,1,false,wBox/2,hBox/2);
    getRect(null,boxStart,0,0,wBox,hBox,0,'#808080','transparent',0).setAttribute('filter','url(#blr2)');
    getRect(null,boxStart,0,0,wBox,hBox,0,'url(#Pale)','transparent',0);
    var wBtn=120, hBtn=60;
    makeButton('btnStart',boxStart,(wBox-wBtn)/2,(hBox-hBtn)/2,wBtn,hBtn,true,arrBtnRct,arrBtnBrd,[graphFence(),0.13,arrBtnIcn],function(){
        
    },arrBtnOn,null);
    // BOX SIDE
    var w=60, h=60, m=10, ml=m, mr=ml, mt=130, mb=ml, nh=3, nv=1, W=w*nh+ml+mr+(nh-1)*m, H=h*nv+mt+mb+(nv-1)*m, X=gBoard.x+gBoard.rx*gBoard.z-W/2, Y=gBoard.y+gBoard.ry*gBoard.z-H/2, R=5;
    var box=getG('boxSide',divArena,X,Y,1,false,W/2,H/2);
    var arr=new Array(
        [graphListA(),0.1,function(){openBox('boxVar');}],
        [graphClock(),0.13,function(){
            openBox('boxTimeSimple');
        }],
        [graphVS(),0.11,function(){openBox('boxVS');}]
    );
    for(var i in arr){
        makeButton(null,box,m+(w+m)*i,60,w,h,true,arrBtnRct,arrBtnBrd,[arr[i][0],arr[i][1],arrBtnIcn],arr[i][2],arrBtnOn,null);
    }
    var arr=new Array(
        [null,function(){setSide(true);}],
        [null,function(){setSide(false);}],
        [null,function(){setSide(undefined);}]
    );
    for(var i=0;i<arr.length;i++){
        var btn=makeButton(arr[i][0],box,(W-(w*3+20))/2+i*(w+m),H-h-m,w,h,true,arrBtnRct,arrBtnBrd,null,arr[i][1],[arrBtnOn[0],arrBtnOn[1]],null);
        if(i==0){
            draw_white_pawn('icnWhite',btn,(w-50)/2,(h-50)/2,1,true);
            btn.getElementsByTagName('path')[0].setAttribute('stroke','url(#Icon)');
            btn.on.push(['path',0,'stroke','url(#Icon)','#000']);
        }
        else if(i==1){
            draw_black_pawn('icnBlack',btn,(w-50)/2,(h-50)/2,1,true);
            btn.getElementsByTagName('path')[0].setAttribute('fill','url(#Icon)');
            btn.getElementsByTagName('path')[0].setAttribute('stroke','url(#Icon)');
            btn.on.push(['path',0,'fill','url(#Icon)','#000'],['path',0,'stroke','url(#Icon)','#000']);
        }
        else if(i==2){
            icn=getG('icnAny',btn,(w-50)/2,(h-50)/2,1,true,W/2,H/2);
            draw_black_pawn(null,icn,8.5,0,1,true);
            draw_white_pawn(null,icn,-8.5,0,1,true);
            btn.getElementsByTagName('path')[0].setAttribute('fill','url(#Icon)');
            btn.getElementsByTagName('path')[0].setAttribute('stroke','url(#Icon)');
            btn.getElementsByTagName('path')[1].setAttribute('stroke','url(#Icon)');
            btn.on.push(['path',0,'fill','url(#Icon)','#000'],['path',0,'stroke','url(#Icon)','#000'],['path',1,'stroke','url(#Icon)','#000']);
        }
    }
    // BOX PLAYER
    var W=260, H=260, R=5;
    var box=getG('boxPlayer',divArena,gBoard.x+gBoard.rx*gBoard.z-W/2,gBoard.y+gBoard.ry*gBoard.z-H/2,1,false,W/2,H/2);
    getText('txtPlayerName',box,W/2,80,18,'Arial','#bdb76d','none',0,'','middle').style.fontWeight='bold';
    var w=40, h=w, s=10;
    var z=0.11, p=graphStar(), arr=new Array(
        [function(){setSkill(1);}],
        [function(){setSkill(2);}],
        [function(){setSkill(3);}],
        [function(){setSkill(4);}],
        [function(){setSkill(5);}]
    );
    for(var i=0;i<arr.length;i++){
        btn=makeButton('btnSkill'+(i+1),box,(W-(w*5+s*4))/2+(w+s)*i,H-w-s,w,h,true,null,null,[p,z,['transparent','#808080',35]],arr[i][0],[['path',1,'fill','url(#Button)','#bdb76d'],['path',2,'fill','url(#Gold)','#aa8800'],['path',2,'stroke','url(#Gold_brd)','#aa8800']],null);
        oo(btn,'path').setAttribute('filter','url(#blr14)');
        btn.appendChild(getPath(null,btn,0,0,1,'url(#Button)','#bdb76d',0.5,'M 5 0 C 2.23 0 0 2.23 0 5 L 0 35 C 0 37.77 2.23 40 5 40 L 35 40 C 37.77 40 40 37.77 40 35 L 40 5 C 40 2.23 37.77 0 35 0 L 5 0 z M 19.90625 5.21875 C 20.356973 5.21375 20.758674 5.49315 20.9375 5.90625 L 24.5 14.15625 C 24.66421 14.53895 25.021181 14.7805 25.4375 14.8125 L 34.40625 15.5 C 34.855902 15.5336 35.231836 15.8226 35.375 16.25 C 35.518162 16.6775 35.4015 17.1398 35.0625 17.4375 L 28.3125 23.375 C 27.999716 23.65 27.86925 24.0948 27.96875 24.5 L 30.09375 33.21875 C 30.2015 33.65595 30.01781 34.13805 29.65625 34.40625 C 29.294815 34.67435 28.824393 34.69815 28.4375 34.46875 L 20.6875 29.875 C 20.328208 29.6617 19.885626 29.6558 19.53125 29.875 L 11.90625 34.59375 C 11.522383 34.83085 11.023861 34.8236 10.65625 34.5625 C 10.28871 34.3005 10.12014 33.84595 10.21875 33.40625 L 12.1875 24.625 C 12.27874 24.2188 12.13046 23.80155 11.8125 23.53125 L 4.96875 17.71875 C 4.6257348 17.42755 4.4900292 16.96085 4.625 16.53125 C 4.7600971 16.10185 5.1452959 15.791 5.59375 15.75 L 14.53125 14.9375 C 14.94637 14.899 15.311409 14.6358 15.46875 14.25 L 18.875 5.90625 C 19.045762 5.48915 19.456535 5.22875 19.90625 5.21875 z'));
        btn.appendChild(getPath(null,btn,(w-p[0]*z)/2,(w-p[1]*z)/2,z,'url(#Gold)','url(#Gold_brd)',5,p[2]));
    }
    // BOX VAR
    w=115.275, h=60, s=10, ml=10, mr=ml, mt=60, mb=ml, x=ml, y=mt, nh=3, nv=3, W=w*nh+ml+mr+(nh-1)*s, H=h*nv+mt+mb+(nv-1)*s, R=5;
    box=getG('boxVar',divArena,gBoard.x+gBoard.rx*gBoard.z-W/2,gBoard.y+gBoard.ry*gBoard.z-H/2,1,false,W/2,H/2);
    getPath(null,box,20,15,0.1,'url(#Button)','none',0,graphListA()[2]);
    arr=new Array(
        [1,'Classic',''],
        [0,'Shuffle',''],
        [6,'Random',''],
        [7,'Horde',''],
        [4,'Revolt',''],
        [2,'End','Game'],
        [5,'Pawn','Attack'],
        [3,'Three','Queens'],
        [8,'Triangle','']
    );
    for(var i=0;i<arr.length;i++){
        var yTxt=37;if(arr[i][2]!='') yTxt=25;
        btn=makeButton('btnVar',box,x,y,w,h,true,arrBtnRct,arrBtnBrd,null,function(){},[arrBtnOn[0],arrBtnOn[1],['circle',0,'fill','url(#Button_rvs)','#eee8aa'],['text',0,'fill','url(#Icon)','#eee8aa'],['text',1,'fill','url(#Icon)','#eee8aa']],arr[i][1]+'|18|Arial|74|'+yTxt+'|middle|url(#Icon)~'+arr[i][2]+'|18|Arial|74|47|middle|url(#Icon)');
        btn.var=arr[i][0];
        btn.do=function(){
            ARR_arena[NUM_arena].intVar=this.var;
            chooseVar(ARR_arena[NUM_arena],true);
            hideG(o('boxVar'));
            o('boxBoard').getElementsByTagName('text')[0].firstChild.nodeValue=ARR_var[this.var];
        }
        getCircle(null,btn,25,30,10,'url(#Button_rvs)','none',0);
        x+=(w+s);if((i+1)%nh==0){x-=(w+s)*nh;y+=(h+s);}
    }
    // BOX TIME
    var W=gBoard.rx*2, H=gBoard.ry*2, w=70, h=60, ml=9, mt=60, m=6;
    var box=getG('boxTime',divArena,gBoard.x,gBoard.y,1,false,W/2,H/2);
    getPath(null,box,100,10,0.13,'url(#Button)','none',0,graphClock()[2]);
    makeButton(null,box,10,10,40,40,true,arrBtnRct00,null,[graphArrowC(),0.1,['transparent','#fff',15]],function(){
        openBox('boxTimeClassic');
    },[['rect',0,'fill','url(#Icon)','#000']],null);
    getText(null,box,W/2,25,18,'Arial','url(#Button)','none',0,'Time','middle').style.fontWeight='bold';
    getText(null,box,W/2,45,18,'Arial','url(#Button)','none',0,'Tuning','middle').style.fontWeight='bold';
    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){
            var x=ml+(w+m)*i;
            var y=mt+(h+m)*j;
            if(j==0){
                if(i==0 || i==2 || i==4){
                    var btn=makeButton('btnTime'+i,box,x,y,w,h,true,arrBtnRct,arrBtnBrd,null,function(){
                        setSlide(this);
                    },[arrBtnOn[0],arrBtnOn[1]],'15|18|Arial|35|25|middle|#fff~min|18|Arial|35|45|middle|url(#Pale)');
                    btn.getElementsByTagName('text')[0].style.fontWeight='bold';
                    btn.getElementsByTagName('text')[1].style.fontWeight='bold';
                    btn.out=false;
                }
                else if(i==1 || i==3){
                    var g=getG('gTimeSet'+i,box,x,y,1,true,w/2,h/2);
                    var z=0.12,arr=graphCrossB();getPath(null,g,(w-arr[0]*z)/2,(h-arr[1]*z)/2,z,'transparent','none',0,arr[2]);
                    var z=0.12,arr=graphArrowD();getPath(null,g,(w-arr[0]*z)/2,(h-arr[1]*z)/2,z,'transparent','none',0,arr[2]);
                    var z=0.11,arr=graphReturn();getPath(null,g,(w-arr[0]*z)/2,(h-arr[1]*z)/2,z,'transparent','none',0,arr[2]);
                }
            }
            else if(j==1){
                if(i==0 || i==2 || i==4){
                    var btn=makeButton('btnClock'+i,box,x,y,w,h,true,arrBtnRct,arrBtnBrd,[graphClockA(),0.13,['url(#Pale)','none',0]],function(){
                        setSlide(this);
                    },[arrBtnOn[0],arrBtnOn[1],['path',0,'fill','url(#Pale)','#fff']],null);
                    btn.out=false;
                }
                else if(i==1 || i==3){
                    var btn=makeButton('btnMove'+i,box,x,y,w,h,true,arrBtnRct,arrBtnBrd,null,function(){
                        setSlide(this);
                    },[arrBtnOn[0],arrBtnOn[1]],'move|18|Arial|35|25|middle|#fff~40|18|Arial|35|45|middle|url(#Pale)');
                    btn.getElementsByTagName('text')[0].style.fontWeight='bold';
                    btn.getElementsByTagName('text')[1].style.fontWeight='bold';
                    btn.out=false;
                }
            }
            else if(j==2){
                if(i==0 || i==2 || i==4){
                    var btn=makeButton('btnAdd'+i,box,x,y,w,h,true,arrBtnRct,arrBtnBrd,null,function(){
                        setSlide(this);
                    },[arrBtnOn[0],arrBtnOn[1]],'15|18|Arial|35|25|middle|#fff~sec|18|Arial|35|45|middle|url(#Pale)');
                    btn.getElementsByTagName('text')[0].style.fontWeight='bold';
                    btn.getElementsByTagName('text')[1].style.fontWeight='bold';
                    btn.out=false;
                }
                else if(i==1 || i==3){
                    makeToggle('tglSum'+i,box,x,y-5,50,50,function(){
                        if(o('gSlide').control===false) setSlide(null);
                        if(this.id=='tglSum1'){
                            ARR_arena[NUM_arena].blnSumA=this.on;
                            if(ARR_arena[NUM_arena].blnSumA===true) o('boxBoard').getElementsByTagName('g')[0].getElementsByTagName('text')[3].firstChild.nodeValue='+';
                            else o('boxBoard').getElementsByTagName('g')[0].getElementsByTagName('text')[3].firstChild.nodeValue='';
                            if(this.on===true && ARR_arena[NUM_arena].intMoveA==0){
                                onTimeBoxButton(['btnMove1']);
                                putSlideSet(o('gTimeSet1'),'loop');
                            }
                        }
                        if(this.id=='tglSum3'){
                            ARR_arena[NUM_arena].blnSumB=this.on;
                            if(ARR_arena[NUM_arena].blnSumB===true) o('boxBoard').getElementsByTagName('g')[2].getElementsByTagName('text')[3].firstChild.nodeValue='+';
                            else o('boxBoard').getElementsByTagName('g')[2].getElementsByTagName('text')[3].firstChild.nodeValue='';
                            if(this.on===true && ARR_arena[NUM_arena].intMoveB==0){
                                onTimeBoxButton(['btnMove1','btnTime2','btnClock2','btnAdd2','btnMove3']);
                                putSlideSet(o('gTimeSet1'),'add');
                                putSlideSet(o('gTimeSet3'),'loop');
                            }
                        }
                    },'add +',40,63,'middle');
                }
            }
            else if(j==4){
                if(i==0){
                    var btn=makeButton('btnSlideDown',box,x,y,w,h,true,arrBtnRct,arrBtnBrd,[graphNone(),0.1,['url(#Pale)','none',0]],function(){
                        putSlide(o('gSlide').rctOn.previousSibling);
                    },[arrBtnOn[0],arrBtnOn[1],['path',0,'fill','url(#Pale)','#fff']],null);
                    var z=0.1, arr=graphArrow();
                    var pth=btn.getElementsByTagName('path')[0];
                    pth.setAttribute('transform','translate('+((btn.rx*2-arr[0]*z)/2+arr[0]*z)+','+(btn.ry*2-arr[1]*z)/2+') scale('+z*-1+','+z+')');
                    pth.setAttribute('d',arr[2]);
                }
                else if(i==1) makeButton('btnTimeDelay',box,x,y,w,h,true,arrBtnRct,arrBtnBrd,[graphClockA(),0.13,['url(#Pale)','none',0]],function(){
                    putSlideClock(o('gSlide').pth,o('gSlide').btn,'delay');
                    setSlide(o('gSlide').btn);
                },[arrBtnOn[0],arrBtnOn[1],['path',0,'fill','url(#Pale)','#fff']],null);
                else if(i==2) makeButton('btnTimeGrow',box,x,y,w,h,true,arrBtnRct,arrBtnBrd,[graphUpLoad(),0.12,['url(#Pale)','none',0]],function(){
                    putSlideClock(o('gSlide').pth,o('gSlide').btn,'grow');
                    setSlide(o('gSlide').btn);
                },[arrBtnOn[0],arrBtnOn[1],['path',0,'fill','url(#Pale)','#fff']],null);
                else if(i==3) makeButton('btnTimeHeap',box,x,y,w,h,true,arrBtnRct,arrBtnBrd,[graphHeap(),0.12,['url(#Pale)','none',0]],function(){
                    putSlideClock(o('gSlide').pth,o('gSlide').btn,'heap');
                    setSlide(o('gSlide').btn);
                },[arrBtnOn[0],arrBtnOn[1],['path',0,'fill','url(#Pale)','#fff']],null);
                else if(i==4){
                    makeButton('btnSlideUp',box,x,y,w,h,true,arrBtnRct,arrBtnBrd,[graphArrow(),0.1,['url(#Pale)','none',0]],function(){
                        putSlide(o('gSlide').rctOn.nextSibling);
                    },[arrBtnOn[0],arrBtnOn[1],['path',0,'fill','url(#Pale)','#fff']],null);
                }
            }
        }
    }
    var gSlide=getG('gSlide',box,2,263,1,true,194,25);
    var pth=getPath(null,gSlide,0,0,1,'transparent','#808080',3,'M 25.21875 5.71875 C 15.17045 6.235763 7.125 14.689729 7.125 25 C 7.125 35.64286 15.6875 44.28125 26.1875 44.28125 L 360.78125 44.28125 C 371.56696 44.28125 380.28125 35.64286 380.28125 25 C 380.28125 14.35714 371.56696 5.71875 360.78125 5.71875 L 26.1875 5.71875 C 25.85937 5.71875 25.54289 5.70207 25.21875 5.71875 z');
    pth.setAttribute('filter','url(#blr2)');
    getPath(null,gSlide,0,0,1,'#fff','none',0,'M 8.90625 0 C 3.97601 0 0 4.84975 0 10.875 L 0 39.125 C 0 45.15024 3.97601 50 8.90625 50 L 378.53125 50 C 383.46149 50 387.4375 45.15024 387.4375 39.125 L 387.4375 10.875 C 387.4375 4.84975 383.46149 0 378.53125 0 L 8.90625 0 z M 25.21875 5.71875 C 25.54289 5.70207 25.85937 5.71875 26.1875 5.71875 L 360.78125 5.71875 C 371.56696 5.71875 380.28125 14.35714 380.28125 25 C 380.28125 35.64286 371.56696 44.28125 360.78125 44.28125 L 26.1875 44.28125 C 15.6875 44.28125 7.125 35.64286 7.125 25 C 7.125 14.689729 15.17045 6.235763 25.21875 5.71875 z');
    var btnSlide=getG('btnSlide',gSlide,60,0,1,true,18,25);
    getRect(null,btnSlide,0,0,36,50,10,'url(#Button)','#bdb76d',1);
    getCircle(null,btnSlide,18,25,13,'url(#Button_rvs)','none',0);
    //
    var rct=getRect(null,gSlide,0,0,20,50,0,'transparent','none',0);
    rct.onmousedown=function(){
        o('btnSlide').blnHold=true;
        putSlide(o('rctSlide0'));
    }
    rct.onmouseover=function(){
        if(o('btnSlide').blnHold===true) putSlide(o('rctSlide0'));
    }
    rct.onmouseup=function(){
        o('btnSlide').blnHold=false;
    }
    var rct=getRect(null,gSlide,gSlide.rx*2-20,0,20,50,0,'transparent','none',0);
    rct.onmousedown=function(){
        o('btnSlide').blnHold=true;
        putSlide(o('gSlide').rctMax);
    }
    rct.onmouseover=function(){
        if(o('btnSlide').blnHold===true) putSlide(o('gSlide').rctMax);
    }
    rct.onmouseup=function(){
        o('btnSlide').blnHold=false;
    }
    //
    for(var i=0;i<246;i++){
        var rct=getRect('rctSlide'+i,gSlide,-9999,0,0,50,0,'transparent','none',0);
        rct.onmousedown=function(){
            o('btnSlide').blnHold=true;
            putSlide(this);
        }
        rct.onmouseover=function(){
            if(o('btnSlide').blnHold===true) putSlide(this);
        }
        rct.onmouseup=function(){
            o('btnSlide').blnHold=false;
        }
    }
    gSlide.rctOn=null;
    gSlide.rctMax=rct;
    gSlide.ctg='';
    gSlide.btn=null;
    gSlide.txt=null;
    gSlide.pth=null;
    gSlide.control=false;
    // BOX SIMPLE TIME
    var w=120, h=60, s=6.4, ml=10, mr=ml, mt=60, mb=s, x=ml, y=mt, nh=3, nv=5, W=w*nh+ml+mr+(nh-1)*s, H=h*nv+mt+mb+(nv-1)*s, R=5;
    var box=getG('boxTimeSimple',divArena,gBoard.x+gBoard.rx*gBoard.z-W/2,gBoard.y+gBoard.ry*gBoard.z-H/2,1,false,W/2,H/2);
    getPath(null,box,80,10,0.13,'url(#Button)','none',0,graphClock()[2]);
    makeButton(null,box,10,10,40,40,true,arrBtnRct00,null,[graphArrowC(),0.1,['transparent','#fff',15]],function(){
        openBox('boxTime');o('gSlide').control=false;
        putSlideTime(null,o('btnTime0'),ARR_arena[NUM_arena].intTimeA);
        putSlideTime(null,o('btnTime2'),ARR_arena[NUM_arena].intTimeB);
        putSlideTime(null,o('btnTime4'),ARR_arena[NUM_arena].intTimeC);
        putSlideAdd(null,o('btnAdd0'),ARR_arena[NUM_arena].intAddA);
        putSlideAdd(null,o('btnAdd2'),ARR_arena[NUM_arena].intAddB);
        putSlideAdd(null,o('btnAdd4'),ARR_arena[NUM_arena].intAddC);
        putSlideMove(null,o('btnMove1'),ARR_arena[NUM_arena].intMoveA);
        putSlideMove(null,o('btnMove3'),ARR_arena[NUM_arena].intMoveB);
        putSlideClock(null,o('btnClock0'),ARR_arena[NUM_arena].ctgClockA);
        putSlideClock(null,o('btnClock2'),ARR_arena[NUM_arena].ctgClockB);
        putSlideClock(null,o('btnClock4'),ARR_arena[NUM_arena].ctgClockC);
        pushToggle(o('tglSum1'),ARR_arena[NUM_arena].blnSumA);
        pushToggle(o('tglSum3'),ARR_arena[NUM_arena].blnSumB);
        if(ARR_arena[NUM_arena].intTimeB>0 && ARR_arena[NUM_arena].intTimeC>0){
            putSlideSet(o('gTimeSet1'),'add');
            putSlideSet(o('gTimeSet3'),'add');
        }
        else if(ARR_arena[NUM_arena].intMoveA==0){
            putSlideSet(o('gTimeSet1'),'end');
            putSlideSet(o('gTimeSet3'),'end');
        }
        else if(ARR_arena[NUM_arena].intMoveA>0 && ARR_arena[NUM_arena].intTimeB==0){
            putSlideSet(o('gTimeSet1'),'loop');
            putSlideSet(o('gTimeSet3'),'end');
        }
        else if(ARR_arena[NUM_arena].intMoveB>0 && ARR_arena[NUM_arena].intTimeC==0){
            putSlideSet(o('gTimeSet1'),'add');
            putSlideSet(o('gTimeSet3'),'loop');
        }
        else if(ARR_arena[NUM_arena].intMoveB==0 && ARR_arena[NUM_arena].intTimeC==0){
            putSlideSet(o('gTimeSet1'),'add');
            putSlideSet(o('gTimeSet3'),'end');
        }
        setSlide(null);
        putBoardBox2(o('boxBoard'),ARR_arena[NUM_arena],true);
    },[['rect',0,'fill','url(#Icon)','#000']],null);
    getText(null,box,W/2,25,18,'Arial','url(#Button)','none',0,'Quick Time','middle').style.fontWeight='bold';
    getText(null,box,W/2,45,18,'Arial','url(#Button)','none',0,'Settings','middle').style.fontWeight='bold';
    var arr=new Array(
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],5*60,0,0,'delay','delay','delay',0,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'5 min',''],
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],5*60,0,0,'delay','delay','delay',5,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'5 min','5 sec'],
        [graphHeap(),0.11,function(){
            setArena(ARR_arena[NUM_arena],5*60,0,0,'heap','delay','delay',5,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'5 min','5 sec'],
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],10*60,0,0,'delay','delay','delay',0,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'10 min',''],
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],15*60,0,0,'delay','delay','delay',0,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'15 min',''],
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],20*60,0,0,'delay','delay','delay',0,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'20 min',''],
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],25*60,0,0,'delay','delay','delay',0,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'25 min',''],
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],30*60,0,0,'delay','delay','delay',0,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'30 min',''],
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],45*60,0,0,'delay','delay','delay',0,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'45 min',''],
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],60*60,0,0,'delay','delay','delay',0,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'60 min',''],
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],120*60,0,0,'delay','delay','delay',0,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'2 hour',''],
        [graphClockA(),0.11,function(){
            setArena(ARR_arena[NUM_arena],180*60,0,0,'delay','delay','delay',0,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'3 hour',''],
        [graphUpLoad(),0.11,function(){
            setArena(ARR_arena[NUM_arena],12*60*60,0,0,'grow','delay','delay',12*60*60,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'12 hour','12 hour'],
        [graphUpLoad(),0.11,function(){
            setArena(ARR_arena[NUM_arena],36*60*60,0,0,'grow','delay','delay',36*60*60,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'36 hour','36 hour'],
        [graphUpLoad(),0.11,function(){
            setArena(ARR_arena[NUM_arena],48*60*60,0,0,'grow','delay','delay',48*60*60,0,0,0,0,false,false);
            putBoardBox(o('boxBoard'),ARR_arena[NUM_arena],false);
            closeBox('boxTimeSimple');
        },'48 hour','48 hour']
    );
    for(var i in arr){
        var yTxt=37;if(arr[i][4]!='') yTxt=25;
        var btn=makeButton(null,box,x,y,w,h,true,arrBtnRct,arrBtnBrd,[arr[i][0],arr[i][1],arrBtnIcn00],arr[i][2],[arrBtnOn[0],arrBtnOn[1],['path',0,'fill','url(#Pale)','#fff'],['text',0,'fill','url(#Icon)','#fff'],['text',1,'fill','url(#Icon)','#fff']],arr[i][3]+'|18|Arial|80|'+yTxt+'|middle|url(#Icon)~'+arr[i][4]+'|18|Arial|80|45|middle|url(#Icon)');
        var pth=btn.getElementsByTagName('path')[0];
        pth.setAttribute('transform','translate(13,'+pth.y+') scale('+pth.z+')');
        x+=(w+s);if((i+1)%nh==0){x-=(w+s)*nh;y+=(h+s);}
    }
    // BOX CLASSIC TIME
    var W=gBoard.rx*2, H=gBoard.ry*2, w=70, h=60, ml=9, mt=60, m=10;
    var box=getG('boxTimeClassic',divArena,gBoard.x,gBoard.y,1,false,W/2,H/2);
    getPath(null,box,100,10,0.13,'url(#Button)','none',0,graphClock()[2]);
    makeButton(null,box,10,10,40,40,true,arrBtnRct00,null,[graphArrowC(),0.1,['transparent','#fff',15]],function(){
        openBox('boxTimeSimple');
    },[['rect',0,'fill','url(#Icon)','#000']],null);
    getText(null,box,W/2+33,25,18,'Arial','url(#Button)','none',0,'Standard Time','middle').style.fontWeight='bold';
    getText(null,box,W/2+33,45,18,'Arial','url(#Button)','none',0,'Control','middle').style.fontWeight='bold';
    for(var i=0;i<2;i++){
        var boxBoard=getBoardBox('boxStandardTime'+i,box,135,90+i*140,true);
        boxBoard.objBoard=new Object();
        if(i==0){
            setArena(boxBoard.objBoard,200*60,60*60,60*60,'heap','heap','heap',30,30,30,60,40,false,false);
            putBoardBox(boxBoard,boxBoard.objBoard,true);
        }
        else if(i==1){
            setArena(boxBoard.objBoard,200*60,60*60,0,'delay','delay','heap',30,30,0,60,0,true,false);
            putBoardBox(boxBoard,boxBoard.objBoard,true);
        }
    }
    // BOX VS
    w=120, h=w, s=10, ml=s, mr=ml, mt=60, mb=ml, nh=2, nv=1, W=w*nh+ml+mr+(nh-1)*s, H=h*nv+mt+mb+(nv-1)*s, X=gBoard.x+gBoard.rx*gBoard.z-W/2, Y=gBoard.y+gBoard.ry*gBoard.z-H/2, R=5;
    box=getG('boxVS',divArena,X,Y,1,false,W/2,H/2);
    getPath(null,box,20,15,0.13,'url(#Button)','none',0,graphRankA()[2]);
    getText(null,box,W/2,35,18,'Arial','url(#Icon)','none',0,'VS','middle');
    var arr=new Array(
        [null,ml,'url(#Button)',function(){setVS(false);}],
        [null,ml+w+s,'url(#Icon)',function(){setVS(true);}]
    );
    Z=0.35;
    for(var i=0;i<arr.length;i++){
        btn=makeButton(arr[i][0],box,arr[i][1],60,w,h,true,[5,'url(#Pale)','url(#Button)',1],null,[graphHead(),Z,[arr[i][2],'none',0]],arr[i][3],[['rect',0,'fill','url(#Pale)','#bdb76d'],['rect',0,'stroke','url(#Button)','#bdb76d'],['path',0,'fill',arr[i][2],'#000']],null);
        if(i==0){
            getPath(null,btn,10,8,Z,'#fff','none',0,'M 150.8125 20.53125 C 142.23166 20.649011 133.77351 21.738763 125.6875 23.9375 C 97.476949 31.608545 75.888382 40.919518 62.65625 61.46875 C 48.139048 84.013668 46.658714 118.80442 61.0625 133.34375 C 84.590096 157.0928 148.9015 132.89243 169.59375 153.90625 C 185.13814 169.69221 183.625 205.90625 183.625 205.90625 C 183.625 205.90625 203.71848 209.09576 221.21875 206.0625 C 225.28586 173.47627 250.99893 165.25705 258.90625 136.59375 C 263.84646 118.68614 262.8774 99.610612 255.71875 82.46875 C 247.2828 62.268205 225.31432 42.412494 205.625 32.84375 C 189.04438 24.785735 169.69006 20.272178 150.8125 20.53125 z');
            z=0.1, p=graphGear();
            getPath(null,btn,39,21,z,'url(#Icon)','none',0,p[2]);
            pth=getPath(null,btn,66,33,z,'url(#Icon)','none',0,p[2]);
            pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+z+') rotate(25,'+p[0]/2+','+p[1]/2+')');
            btn.setAttribute('transform','translate('+(btn.x+btn.rx*2)+','+btn.y+') scale(-1,1)');
            btn.on.push(['path',1,'fill','#fff','#bdb76d'],['path',2,'fill','url(#Icon)','#fff'],['path',3,'fill','url(#Icon)','#fff']);
        }
        else{
            x=10, y=6;
            getPath(null,btn,x,y,Z,'url(#Brain)','none',0,'M 149.71875,30.84375 C 139.88213,13.621626 99.966923,23.567615 104.75,42.59375 81.013503,35.786955 63.09487,59.874892 71.78125,74.5625 47.70203,84.174724 47.88273,103.19077 53.9375,117.4375 59.99836,131.69857 74.80883,144.06908 97.21875,134.375 120.06502,155.77418 142,136.0625 142,136.0625 c 0,0 23.03388,5.93899 26.40625,16.3125 4.45302,13.69731 1.4375,53.15625 1.4375,53.15625 12.1259,6.3128 26.07209,5.58737 36.03125,0.0937 0,0 -3.60519,-22.12751 5.53125,-22.40625 19.89695,-0.60702 50.01297,-21.83416 35.125,-40.5 20.34995,-0.86524 23.78991,-34.688 2.125,-43.90625 21.48307,-9.311746 -2.27502,-46.028717 -18.375,-37.65625 C 240.4482,42.907054 197.30804,22.136436 188.75,40.71875 188.51801,19.835603 159.09786,14.579847 149.71875,30.84375 z');
            pth=getPath(null,btn,x,y,Z,'#bdb76d','none',0,'M 128.875 28.34375 L 121.875 38.125 C 124.04186 39.672761 127.65321 45.172054 128.90625 51.53125 C 130.00989 57.132226 129.58595 63.130059 126.96875 68.15625 C 120.5826 71.22332 115.66776 76.022071 112.03125 80.875 C 111.805 81.17693 111.59572 81.478271 111.375 81.78125 C 108.24042 68.105692 98.786805 55.874919 87.34375 48.75 L 81 58.9375 C 94.216846 67.166853 104.03086 85.198972 99.03125 100.3125 C 89.230803 109.7786 83.631096 108.72246 79.0625 106.59375 C 74.3967 104.41975 71.34375 99.875 71.34375 99.875 L 61.1875 106.28125 C 61.1875 106.28125 65.555473 113.53408 74 117.46875 C 82.444527 121.40342 95.533839 120.76333 108.125 108.25 C 113.83019 102.58007 116.74126 94.579852 121.625 88.0625 C 126.50874 81.545148 131.8427 76.894435 141.53125 76.84375 C 151.47056 76.79175 156.47554 81.199307 159.875 85.9375 C 161.9217 88.790212 163.07296 91.607838 163.6875 93.40625 C 161.59453 95.134613 159.71847 97.175402 158.1875 99.5 C 153.67407 97.156779 148.9316 96.072932 144.28125 96.09375 C 138.3126 96.12047 132.52713 97.920598 127.6875 101.09375 C 118.00825 107.44005 111.50213 118.98439 112.21875 132.0625 L 124.1875 131.40625 C 123.71005 122.69279 128.10797 115.15209 134.25 111.125 C 140.192 107.22906 147.2189 106.42934 154.3125 111.09375 C 153.88113 117.9838 156.20761 125.71523 161.5 134.0625 L 171.625 127.625 C 166.58827 119.68095 165.76827 114.11688 166.5 110.28125 C 167.23173 106.44562 169.58027 103.58176 173.4375 101.15625 C 177.29473 98.730741 182.55056 97.092367 187.53125 96.46875 C 192.51194 95.845133 197.2979 96.314133 199.53125 97.09375 C 210.58709 100.95312 215.20982 106.28111 217 111.625 C 218.79018 116.96889 217.69672 123.1884 214.5625 128.84375 C 211.57562 134.23323 207.40385 136.94865 202.28125 140.09375 C 197.15865 143.23885 190.79142 146.78544 187.15625 154.15625 C 182.48693 163.62393 181.72877 176.44594 181.53125 187.4375 C 181.33373 198.42906 182.09375 207.46875 182.09375 207.46875 L 194.03125 206.46875 C 194.03125 206.46875 193.34579 197.97687 193.53125 187.65625 C 193.71671 177.33563 195.18327 165.05334 197.9375 159.46875 C 199.76387 155.76554 203.26323 153.54689 208.53125 150.3125 C 210.03513 149.38917 211.65463 148.37598 213.3125 147.21875 C 217.42996 147.93523 220.1266 149.11099 221.625 150.625 C 223.58919 152.60965 224.99222 156.09996 224.1875 164.28125 L 236.125 165.46875 C 237.11137 155.44064 235.35642 147.44184 230.15625 142.1875 C 228.12493 140.13502 225.79706 138.65506 223.25 137.5625 C 223.8867 136.64785 224.48938 135.69039 225.0625 134.65625 C 228.17428 129.04141 230.10337 122.53412 229.84375 115.90625 C 232.79796 115.59993 235.22145 116.11214 237.25 117.15625 C 240.57718 118.86877 243.36546 122.32683 244.96875 128 L 256.53125 124.75 C 254.25385 116.69149 249.57232 109.98024 242.75 106.46875 C 239.33884 104.71301 235.50645 103.86962 231.46875 103.875 C 229.96451 103.87686 228.42512 104.00576 226.875 104.25 C 224.9315 100.37352 222.00001 96.758947 218.09375 93.625 C 220.20058 88.440056 223.92513 85.378366 228 83.65625 C 232.77885 81.636616 238.01609 82.202824 239.625 83.15625 L 245.75 72.84375 C 242.5245 70.932345 238.85749 70.057778 235.03125 70.0625 C 231.20501 70.0672 227.22314 70.954247 223.34375 72.59375 C 217.1733 75.201502 211.27225 80.189916 207.75 87.46875 C 206.38145 86.867305 204.96472 86.303462 203.46875 85.78125 C 200.94875 84.901572 198.18061 84.402033 195.25 84.21875 C 194.70319 84.184552 194.15098 84.169149 193.59375 84.15625 C 196.32781 68.580022 205.88097 58.966879 218.90625 56.125 L 216.34375 44.375 C 197.74673 48.43253 183.93123 64.069129 181.3125 85.375 C 178.94882 85.88412 176.56293 86.560034 174.25 87.4375 C 173.25316 84.96868 171.79236 81.958377 169.625 78.9375 C 168.17114 76.911105 166.32419 74.887381 164.125 73 C 176.24997 62.39507 179.03979 45.360529 174.03125 31.21875 L 162.71875 35.25 C 166.8167 46.820683 164.30461 59.652531 152.65625 66.53125 C 149.32859 65.45824 145.60051 64.822135 141.46875 64.84375 C 141.21394 64.845083 140.9706 64.868456 140.71875 64.875 C 141.79601 59.544092 141.63056 54.132117 140.65625 49.1875 C 138.92415 40.39707 135.06655 32.766285 128.875 28.34375 z');
            pth.setAttribute('stroke-linecap','butt');
            btn.on.push(['path',1,'fill','url(#Brain)','#bdb76d'],['path',2,'fill','#bdb76d','#fff']);
        }
    }
    // BOX MENU
    if(BLN_auth===false) nh=5,nv=3;
    else if(BLN_auth===true) nh=5,nv=4;
    w=60, h=w, s=10, ml=10, mr=ml, mt=60, mb=ml, x=ml, y=mt, W=w*nh+ml+mr+(nh-1)*s, H=h*nv+mt+mb+(nv-1)*s, R=5;
    box=getG('boxMenu',divArena,gBoard.x+gBoard.rx*gBoard.z-W/2,gBoard.y+gBoard.ry*gBoard.z-H/2,1,false,W/2,H/2);
    var arr=new Array(
        [graphExit(),0.13,function(){
            BLN_lock=true;
            var z=0.375; hideG(oo(this,'g'));drawLoad(o('gLoad'),'url(#Pale)',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,this);
            window.location.href='out.php';
        }],
        [graphEnter(),0.13,function(){
            hideG('boxMenu');
            setForm('login','divArena');
            hideG('divArena');
            showG('divForm');
        }],
        [graphUser(),0.13,function(){
            hideG('boxMenu');
            if(AUTH===false){
                setForm('newreg','divArena');
                hideG('divArena');
                showG('divForm');
            }
            else if(AUTH===true){
                openBox('boxPlayer');
            }
        }],
        [graphEnvelope(),0.13,function(){
            
        }],
        [graphBook(),0.13,function(){}],
        [graphEye(),0.12,function(){
            openDiv('divClub');
        }],
        [graphGear(),0.13,function(){openBox('boxSetUp');}],
        [graphCup(),0.13,function(){}],
        [graphAwardA(),0.13,function(){
            
        }],
        [graphHour(),0.12,function(){
            openDiv('divSee');
            WBS.send('get~'+CNT_get);
        }],
        [graphTV(),0.13,function(){}],
        [graphLock(),0.12,function(){
            
        }],
        [graphCoin_0(),0.13,function(){
            
        }],
        [graphGlobe(),0.13,function(){}],
        [graphCam(),0.13,function(){
            if(AUTH===true){
                openBox('boxImage');
            }
            else if(AUTH===false){
                BLN_lock=true;
                var z=0.375;hideG(oo(this,'g'));drawLoad(o('gLoad'),'url(#Icon)',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,this);
                sendRequest('../async/pix.php','',function(){
                    hideG(o('boxPlayer'));
                    hideG(o('divArena'));
                    showG(o('divPic'));
                    var rsp=xhr.responseText.split('~');
                    if(rsp[0]=='pix_ok'){
                        var row=rsp[1].split('`');
                        var w=o('gPic0').rx*2, z=0.225;
                        for(var i=0;i<12;i++){
                            var pth=oo(o('gPic'+i),'path');
                            var col=row[i].split(':');
                            pth.setAttribute('d',col[2]);
                            pth.setAttribute('fill','url(#Icon)');
                            pth.setAttribute('transform','translate('+(w-col[0]*z)/2+','+(w-col[1]*z)/2+') scale('+z+')')
                        }
                    }
                });
            }
        }],
        [graphPenA(),0.12,function(){
            
        }],
        [graphBoot(),0.14,function(){}],
        [graphBulb(),0.14,function(){}],
        [graphHand(),0.14,function(){}]
        
    );
    if(BLN_auth===false){
        arr.splice(0,1);
        arr.splice(2,1);
        arr.splice(2,1);
        arr.splice(5,1);
        arr.splice(7,1);
        arr.splice(7,1);
    }
    else if(BLN_auth===true){
        arr.splice(1,1);
    }
    for(var i=0;i<arr.length;i++){
        var btn=makeButton(null,box,x,y,w,h,true,arrBtnRct,arrBtnBrd,[arr[i][0],arr[i][1],arrBtnIcn],arr[i][2],arrBtnOn,null);
        x+=(w+s);if((i+1)%nh==0){x-=(w+s)*nh;y+=(h+s);}
    }
    // BOX IMAGE
    var W=220, H=340, R=0;
    var box=getG('boxImage',divArena,gBoard.x+gBoard.rx*gBoard.z-W/2,gBoard.y+gBoard.ry*gBoard.z-H/2,1,false,W/2,H/2);
    var x=10, y=60;
    var g=getG('gImage',box,10,60,1,true,0,0);
    var w=200, h=200;
    var img=o('imgPlayer');
    img.setAttribute('width','200');
    img.setAttribute('height','200');
    img.setAttribute('x','10');
    img.setAttribute('y','60');
    img.setAttribute('xlink:href','../graph/upic.png');
    box.appendChild(img);
    var w=60, m=10;
    makeButton('btnImageUpload',box,(W-w)/2,H-w-s,w,w,true,arrBtnRct,arrBtnBrd,[graphUpLoad(),0.12,arrBtnIcn],function(){
        o('inpFindFile').click();
    },arrBtnOn,null);
    
    // BOX SETUP
    var w=200, h=42, s=10, ml=10, mr=ml, mt=ml, mb=ml, x=ml, y=mt, nh=1, nv=4, W=w*nh+ml+mr+(nh-1)*s, H=h*nv+mt+mb+(nv-1)*s, box=getG('boxSetUp',divArena,gBoard.x+gBoard.rx*gBoard.z-W/2,gBoard.y+gBoard.ry*gBoard.z-H/2,1,false,W/2,H/2);
    var arr=new Array(
        ['tgl','show user pics'], 
        ['tgl','enable chat'],
        ['tgl','animation'],
        ['tgl','search my favs']
    );
    for(var i=0;i<arr.length;i++){
        //makeToggle(arr[i][0],box,x,y,w,h,null,arr[i][1]);
        //x+=(w+s);if((i+1)%nh==0){x-=(w+s)*nh;y+=(h+s);}
    }
    // BOX PROMOTE WHITE
    var w=100, h=w, s=10, ml=10, mr=ml, mt=ml, mb=ml, x=ml, y=mt, nh=4, nv=1, W=w*nh+ml+mr+(nh-1)*s, H=h*nv+mt+mb+(nv-1)*s, R=5, box=getG('boxPromoteWhite',divArena,gBoard.x+gBoard.rx*gBoard.z-W/2,gBoard.y+gBoard.ry*gBoard.z-H/2,1,false,W/2,H/2);
    var arr=new Array('bishop','knight','rook','queen');
    for(var i=0;i<arr.length;i++){
        var btn=makeButton(null,box,s+(w+s)*i,s,w,h,true,[5,'#eee8aa','#bdb76d',1],null,null,function(){
            var move=chess.promotePawn(this.name,true);
            board.putMove(move,this.name,!ARR_arena[NUM_arena].blnSide);
            hideG('boxPromoteWhite');
        },[['rect',0,'fill','#eee8aa','#bdb76d'],['rect',1,'fill','url(#Opac)','transparent']],null);
        btn.name=arr[i];
        if(i==0) draw_white_bishop(null,btn,0,0,2,true);
        else if(i==1) draw_white_knight(null,btn,0,0,2,true);
        else if(i==2) draw_white_rook(null,btn,0,0,2,true);
        else if(i==3) draw_white_queen(null,btn,0,0,2,true);
        getRect(null,btn,0,0,w,h,5,'url(#Opac)','none',0);
    }
    // BOX PROMOTE BLACK
    var w=100, h=w, s=10, ml=10, mr=ml, mt=ml, mb=ml, x=ml, y=mt, nh=4, nv=1, W=w*nh+ml+mr+(nh-1)*s, H=h*nv+mt+mb+(nv-1)*s, R=5, box=getG('boxPromoteBlack',divArena,gBoard.x+gBoard.rx*gBoard.z-W/2,gBoard.y+gBoard.ry*gBoard.z-H/2,1,false,W/2,H/2);
    for(var i=0;i<arr.length;i++){
        var btn=makeButton(null,box,s+(w+s)*i,s,w,h,true,[5,'#eee8aa','#bdb76d',1],null,null,function(){
            var move=chess.promotePawn(this.name,false);
            board.putMove(move,this.name,!ARR_arena[NUM_arena].blnSide);
            hideG('boxPromoteBlack');
        },[['rect',0,'fill','#eee8aa','#bdb76d'],['rect',1,'fill','url(#Opac)','transparent']],null);
        btn.name=arr[i];
        if(i==0) draw_black_bishop(null,btn,0,0,2,true);
        else if(i==1) draw_black_knight(null,btn,0,0,2,true);
        else if(i==2) draw_black_rook(null,btn,0,0,2,true);
        else if(i==3) draw_black_queen(null,btn,0,0,2,true);
        getRect(null,btn,0,0,w,h,5,'url(#Opac)','none',0);
    }
    // SCT CHAT
    // SCT FEEDBACK
    // BTN BOX CLOSE
    makeButton('btnBoxClose',gWrap,-9999,-9999,40,40,true,arrBtnRct00,null,[graphCross(),0.09,['transparent','#fff',18]],function(){
        closeBox(this.parentNode.id);
    },[arrBtnOn00[0]],null);
    // G BG
    var g=getG('gBG',gWrap,0,0,1,true,0,0)
    getRect(null,g,0,0,0,0,5,'#808080','none',0).setAttribute('filter','url(#blr2)');
    getRect(null,g,0,0,0,0,5,'#fff','none',0);
    ///////////////////////////////////
    /////////// DIV FORM //////////////
    ///////////////////////////////////
    div=getG('divForm',gWrap,0,0,1,false,0,0);
    getForm(div,'url(#blr2)','url(#blr3)',arrBtnRct,arrBtnBrd,arrBtnIcn,arrBtnOn);
    o('btnSubForm').do=function(){
        BLN_lock=true;
        var z=0.45;hideG(oo(this,'g'));drawLoad(o('gLoad'),'url(#Pale)',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,this);
        var frm=o('frmWrite');
        var str00=o('inp00').getElementsByTagName('text')[1].innerHTML;
        var str01=o('inp01').getElementsByTagName('text')[1].innerHTML;
        //
        if(frm.ctg=='login' || frm.ctg=='newreg'){
            if(frm.ctg=='login') var fileAct='../async/in.php';
            else if(frm.ctg=='newreg') var fileAct='../async/reg.php';
            var strReq='name='+str00+'&pass='+str01;
        }
        else if(frm.ctg=='search'){
            var fileAct='../async/find.php';
            var strReq='find='+str00+'&shot='+STR_shot;
        }
        //
        sendRequest(fileAct,strReq,function(){
            var rsp=xhr.responseText.split('~');
            var spn=o('spnCursor');clearInterval(spn.tmr);spn.style.display='none';
            if(rsp[0]=='in_ok'){
                window.location.href='.';
            }
            else if(rsp[0]=='reg_fail' || rsp[0]=='in_fail' || rsp[0]=='find_fail'){
                hideG(o('gLoad'));showG(oo(o('btnSubForm'),'g'));
                showSay(rsp[1],o('divForm'));
                o('btnCloseSay').do=function(){
                    hideG(o('boxSay'));
                    o('spnCursor').style.display='inline';
                    blinkCursor();
                    BLN_lock=false;
                }
            }
            else if(rsp[0]=='reg_ok'){
                hideG(o('gLoad'));showG(oo(o('btnSubForm'),'g'));
                showSay(rsp[1],o('divForm'));
                o('btnCloseSay').do=function(){
                    BLN_lock=true;
                    var btn=o('btnCloseSay');
                    btn.exc=false;
                    var z=0.375;hideG(oo(btn,'g'));drawLoad(o('gLoad'),'#fff',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,btn);
                    window.location.href='.';
                }
            }
            else if(rsp[0]=='find_ok'){
                hideG('gLoad');
                showG(oo('btnSubForm','g'));
                hideG('divForm');
                showG('divClub');
                setClubFromStr(rsp[1],'find');
                BLN_lock=false;
            }
            else window.location.href='.';
        });
    }
    //////////// DIV CLUB /////////////
    var div=getG('divClub',gWrap,0,0,1,false,0,0);
    var gBar=getG('gClubBar',div,0,15,1,true,0,0);
    var w=40, h=w, s=7, arr=new Array(
        ['btnClubFind',graphMagniA(),0.1,function(){
            hideG(o('divClub'));
            setForm('search','divClub');
            if(BOX_on!=''){
                hideG(BOX_on);
                BOX_on='';
            }
            hideG('divClub');
            showG('divForm');
        }],
        ['btnClubClose',graphCross(),0.09,function(){
            setClub(1,'club');
        }],
        ['btnClubSetUp',graphGear(),0.11,function(){}]
    );
    for(var i in arr){
        makeButton(arr[i][0],gBar,0,0,w,h,false,arrBtnRct00,null,[arr[i][1],arr[i][2],['transparent','#fff',15]],arr[i][3],new Array(['rect',0,'fill','url(#Icon)','#000']),null);
    }
    // page buttons
    for(var i=0;i<6;i++){
        var btn=makeButton('btnClubPage'+i,gBar,-9999,-9999,w,h,false,arrBtnRct00,arrBtnBrd00,null,function(){
            asmClub(this.goToPage);
        },arrBtnOn00,'0|18|Arial|'+w/2+'|25|middle|#fff');
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
    for(i=0;i<6;i++) getUserBox('boxClub'+i,div,-9999,-9999,false);
    /////////// DIV MEMBER ////////////
    var div=getG('divMember',gWrap,0,0,1,false,0,0);
    var w=40, s=7, arr=new Array(
        [null,-1,graphArrowC(),0.1,function(){
            hideG('divMember');
            showG('divAbout');
            o('divAbout').appendChild(o('grpBottom'));
        }],
        ['btnMemberClose',+1,graphCross(),0.09,function(){
            openDiv(this.div)
        }]
    );
    for(var i=0;i<arr.length;i++){
        makeButton(arr[i][0],div,(400-w+(w+s)*arr[i][1])/2,15,w,w,true,arrBtnRct00,null,[arr[i][2],arr[i][3],['transparent','#fff',15]],arr[i][4],[arrBtnOn00[0]],null);
    }
    // BOX MEMBER
    getUserBox('boxMember',div,(W_arena-190)/2,70,true);
    // buttons
    var w=60, arr=new Array(
        ['btnMemberChallenge',graphFence(),0.14,function(){},null],
        ['btnMemberWrite',graphPenA(),0.13,function(){},null],
        ['btnMemberAdd',graphEye(),0.08,function(){
            BLN_lock=true;
            var zLoad=0.375;hideG(oo(this,'g'));drawLoad(o('gLoad'),'#fff',6,(this.rx*2-100*zLoad)/2,(this.ry*2-100*zLoad)/2,zLoad,this);
            
            var objUser=o('boxMember').objUser;
            sendRequest('../async/add.php','name='+objUser.strName+'&shot='+STR_shot,function(){
                hideG(o('gLoad'));
                showG(oo('btnMemberAdd','g'));
                var rsp=xhr.responseText.split('~');
                if(rsp[0]=='add_ok'){
                    showSay(rsp[1],o('divMember'));
                    addClub(rsp[2],rsp[3],'fav');
                    o('btnCloseSay').do=function(){
                        setClub(1,'fav');
                        hideG(o('boxSay'));
                        hideG('divMember');
                        showG('divClub');
                        o('divClub').appendChild(o('grpBottom'));
                        BLN_lock=false;
                    }
                }
            });
        },'add|18|Arial|'+w/2+'|52|middle|#000'],
        ['btnPlayerLock',graphLock(),0.13,function(){},null],
        ['btnPlayerCam',graphCam(),0.13,function(){},null]
    );
    for(var i in arr){
        var btn=makeButton(arr[i][0],div,0,195,w,w,false,arrBtnRct,arrBtnBrd,[arr[i][1],arr[i][2],arrBtnIcn],arr[i][3],arrBtnOn,arr[i][4]);
        if(i==2){
            var pth=oo(btn,'path');
            pth.setAttribute('transform','translate('+pth.x+','+(pth.y-9)+') scale('+pth.z+')');
            btn.on.push(['text',0,'fill','#000','#fff']);
        }
    }
    // star & heart buttons for marking
    var arr=new Array(
        ['btnMemberHeart',graphHeart(),0.08,function(){}],
        ['btnMemberStar',graphStarA(),0.08,function(){}]
    );
    for(var i in arr) makeButton(arr[i][0],div,0,195,w,w,false,[5,'url(#Pale)','url(#Button)',1],null,[arr[i][1],arr[i][2],arrBtnIcn],arr[i][3],[['rect',0,'fill','url(#Pale)','url(#Icon)'],['rect',0,'stroke','url(#Button)','url(#Icon)'],['path',0,'fill','url(#Icon)','#fff']],null);
    // remove button
    var w=60;
    makeButton('btnMemberOff',div,0,195,w,w,false,arrBtnRct,null,[graphBin(),0.13,['url(#Pale)','none',0]],function(){
        BLN_lock=true;
        var zLoad=0.375;hideG(oo(this,'g'));drawLoad(o('gLoad'),'#fff',6,(this.rx*2-100*zLoad)/2,(this.ry*2-100*zLoad)/2,zLoad,this);
        var objUser=o('boxMember').objUser;
        sendRequest('../async/rem.php','name='+objUser.strName+'&shot='+STR_shot,function(){
            hideG(o('gLoad'));
            showG(oo('btnMemberOff','g'));
            var rsp=xhr.responseText.split('~');
            if(rsp[0]=='rem_ok'){
                showSay(rsp[1],o('divMember'));
                // remove from favourites
                var strName=rsp[2];
                for(var i in OBJ_club.arrFav){
                    if(OBJ_club.arrFav[i]==strName){
                        OBJ_club.arrFav.splice(i,1);
                        break;
                    }
                }
                if(!inArray(strName,OBJ_club.arrFind)){
                    for(var i in ARR_user){
                        if(ARR_user[i].strName==strName){
                            ARR_user.splice(i,1);
                            WBS.send('away~'+strName);
                            break;
                        }
                    }
                }
                else{
                    var objUser=getClubUserByName(strName);
                    objUser.ctgUser='member';
                }
                //
                o('btnCloseSay').do=function(){
                    setClub(1,'fav');
                    hideG(o('boxSay'));
                    hideG('divMember');
                    showG('divClub');
                    o('divClub').appendChild(o('grpBottom'));
                    BLN_lock=false;
                }
            }
        });
    },[arrBtnOn[0],['path',0,'fill','url(#Pale)','#fff']],null);
    //
    var s=10, arr=new Array(
        ['btnMemberWait',200-w*2-s,w,graphHour(),0.12,function(){}],
        ['btnMemberRead',200-w,w*2,graphBook(),0.15,function(){}],
        ['btnMemberWatch',200+w+s,w,graphTV(),0.14,function(){}]
    );
    for(var i in arr) makeButton(arr[i][0],div,arr[i][1],460,arr[i][2],w,true,[5,'transparent','url(#Silver)',2],null,[arr[i][3],arr[i][4],['url(#Silver)','none',0]],arr[i][5],arrBtnOn,null);
    var y=495;
    getText('txtMemberWait',div,38,y,18,'Arial','url(#Silver)','none',0,'0','middle').style.fontWeight='bold';
    getText('txtMemberWatch',div,362,y,18,'Arial','url(#Silver)','none',0,'0','middle').style.fontWeight='bold';
    // test to del later
    var W=380, H=50, R=0;
    for(var i=0;i<3;i++){
        var g=getG(null,div,10,275+(H+10)*i,1,true,W/2,H/2);
        getRect(null,g,0,0,W,H,R,'#808080','transparent',0).setAttribute('filter','url(#blr2)');
        getRect(null,g,0,0,W,H,R,'url(#Pale)','transparent',0);
        getText(null,g,W/2,30,18,'Arial','url(#Icon)','none',0,'','middle');
        getPath(null,g,5,5,0.13,'url(#Icon)','none',0,graphAwardA()[2]);
        getPath(null,g,345,12,0.08,'url(#Silver)','none',0,graphChart()[2]);
    }
    //
    var div=getG('divAbout',gWrap,0,0,1,false,0,0);
    ///////////// DIV SEE ////////////
    var div=getG('divSee',gWrap,0,0,1,false,0,0);
    var w=40, h=w, s=7, arr=new Array(
        ['btnSeeSetUp',graphGear(),0.11,function(){}],
        ['btnSeeClose',graphCross(),0.09,function(){
            
        }],
        ['btnSeeNext',graphArrowC(),0.1,function(){
           
        }]
    );
    var g=getG('gSeeBar',div,0,15,1,true,0,0);
    for(var i in arr){
        makeButton(arr[i][0],g,(w+s)*i,0,w,h,true,arrBtnRct00,null,[arr[i][1],arr[i][2],['transparent','#fff',15]],arr[i][3],new Array(['rect',0,'fill','url(#Icon)','#000']),null);
    }
    var w=190, h=110, m=10, x=(W_arena-(w*2+m))/2, y=(H_arena-h)/2-m-h;
    for(i=0;i<3;i++){
        var g=getG('gSee'+i,div,x,y+i*(h+m),1,true,(w*2+m)/2,h/2);
        var boxUser=getUserBox('boxSeeUser'+i,g,0,0,true);
        putUserBox(boxUser,null);
        var boxBoard=getBoardBox('boxSeeBoard'+i,g,(w+m),0,true);
    }
    /*
    var W=190, H=110, R=0, s=10;
    for(i=0;i<3;i++){
        var box=getG('boxSee'+i,div,(400-(W*2+s))/2,-9999,1,false,(W*2+s)/2,H/2);
        // g user
        var gUser=getG(null,box,(W+s)*0,0,1,true,W/2,H/2);
        getRect(null,gUser,0,0,W,H,R,'#808080','transparent',0).setAttribute('filter','url(#blr2)');
        getRect(null,gUser,0,0,W,H,R,'url(#Pale)','transparent',0);
        var p=graphUser(), z=0.2;getPath(null,gUser,(W-p[0]*z)/2,(H-p[1]*z)/2,z,'url(#Button)','none',0,p[2]);
        getText(null,gUser,W/2,103,18,'Arial','#c0c0c0','none',0,'','middle').style.fontWeight='bold';
        // g board
        var gBoard=getG(null,box,(W+s)*1,0,1,true,W/2,H/2);
        var gBoard=getG(null,box,(W+s)*1,0,1,true,W/2,H/2);
        getRect(null,gBoard,0,0,W,H,R,'#808080','transparent',0).setAttribute('filter','url(#blr2)');
        getRect(null,gBoard,0,0,W,H,R,'url(#Pale)','transparent',0);
        var p=graphChess(), z=0.2;getPath(null,gBoard,(W-p[0]*z)/2,(H-p[1]*z)/2,z,'url(#Button)','none',0,p[2]);
        //
        box.strUser='';
        box.intVar=1;
        box.intBase=0;
        box.intDelay=0;
        box.intGrow=0;
        box.intAdd=0;
        box.blnSide=true;
        box.blnRand=false;
    }
    */
    ///////////////////////////////////
    ///////////// DIV PIC /////////////
    ///////////////////////////////////
    var div=getG('divPic',gWrap,0,0,1,false,0,0);
    var w=40, h=w, s=10, r=5, x=200-w-s/2, y=20, arr=new Array(
        [null,graphCross(),0.1,function(){
            for(var i=0;i<8;i++){
                oo(o('gPic'+i),'path').setAttribute('d','');
            }
            hideG(o('divPic'));
            showG(o('divArena'));
        }],
        ['btnReqPix',graphArrowC(),0.11,function(){
            reqPix();
        }]
    );
    for(var i=0;i<arr.length;i++){
        makeButton(arr[i][0],div,x+(w+s)*i,y,w,h,true,[r,'url(#Icon)','none',0],null,[arr[i][1],arr[i][2],['transparent','#fff',16]],arr[i][3],[['rect',0,'fill','url(#Icon)','#000']],null);
    }
    var w=90, h=w, r=0, s=15, nh=3, nv=4, x=(400-w*nh-s*(nh-1))/2, y=(600-h*nv-s*(nv-1)+60)/2;
    for(var i=0;i<12;i++){
        var g=getG('gPic'+i,divPic,x,y,1,true,w/2,h/2);
        getRect(null,g,0,0,w,h,r,'#808080','none',0).setAttribute('filter','url(#blr2)');
        getRect(null,g,0,0,w,h,r,'#fff','none',0);
        getPath(null,g,0,0,0,'none','none',0,'');
        g.style.cursor='pointer';
        g.onclick=function(){
            BLN_lock=true;
            var z=0.375, btn=o('btnReqPix');hideG(oo(btn,'g'));drawLoad(o('gLoad'),'#fff',6,(btn.rx*2-100*z)/2,(btn.ry*2-100*z)/2,z,btn);
            sendRequest('../async/pic.php','file='+this.file+'&shot='+STR_shot,function(){
                var rsp=xhr.responseText.split('~');
                if(rsp[0]=='change_pic_ok'){
                    var filePlayerPic=rsp[1];
                    var img=o('imgPlayer');
                    img.setAttribute('xlink:href','../upx/'+filePlayerPic+'?v='+getRnd(0,1000));
                    BLN_lock=false;
                }
                else{
                    showSay(rsp[1],o('divArena'));
                    o('btnCloseSay').do=function(){
                        hideG(o('boxSay'));
                        BLN_lock=false;
                    }
                }
                hideG(o('divPic'));
                showG(o('divArena'));
            });
        }
        x+=(w+s);if((i+1)%nh==0){x-=(w+s)*nh;y+=(h+s);}
    }
    ///////////////////////////////////
    ///////////////////////////////////
    ///////////////////////////////////
    // LOCAL STORAGE & LOADED PARAMS
    for(var i in ARR_arena){
        ARR_arena[i].intVar=getLocal('var'+i,1)*1; // chess variant, 1 - classic by default
        if(ARR_arena[i].intVar<0 && ARR_arena[i].intVar>8) ARR_arena[i].intVar=1;
        ARR_arena[i].intTimeA=getLocal('timeA'+i,600)*1;
        if(ARR_arena[i].intTimeA<60 || ARR_arena[i].intTimeA>172800) ARR_arena[i].intTimeA=600;
        ARR_arena[i].intTimeB=getLocal('timeB'+i,600)*1;
        if(ARR_arena[i].intTimeB<0 || ARR_arena[i].intTimeB>172800) ARR_arena[i].intTimeB=600;
        ARR_arena[i].intTimeC=getLocal('timeC'+i,600)*1;
        if(ARR_arena[i].intTimeC<0 || ARR_arena[i].intTimeC>172800) ARR_arena[i].intTimeC=600;
        ARR_arena[i].intAddA=getLocal('addA'+i,5)*1;
        if(ARR_arena[i].intAddA<0 || ARR_arena[i].intAddA>172800) ARR_arena[i].intAddA=5;
        ARR_arena[i].intAddB=getLocal('addB'+i,5)*1;
        if(ARR_arena[i].intAddB<0 || ARR_arena[i].intAddB>172800) ARR_arena[i].intAddB=5;
        ARR_arena[i].intAddC=getLocal('addC'+i,5)*1;
        if(ARR_arena[i].intAddC<0 || ARR_arena[i].intAddC>172800) ARR_arena[i].intAddC=5;
        ARR_arena[i].ctgClockA=getLocal('clockA'+i,'delay');
        if(ARR_arena[i].ctgClockA!='delay' && ARR_arena[i].ctgClockA!='grow' && ARR_arena[i].ctgClockA!='heap') ARR_arena[i].ctgClockA='delay';
        ARR_arena[i].ctgClockB=getLocal('clockB'+i,'delay');
        if(ARR_arena[i].ctgClockB!='delay' && ARR_arena[i].ctgClockB!='grow' && ARR_arena[i].ctgClockB!='heap') ARR_arena[i].ctgClockB='delay';
        ARR_arena[i].ctgClockC=getLocal('clockC'+i,'delay');
        if(ARR_arena[i].ctgClockC!='delay' && ARR_arena[i].ctgClockC!='grow' && ARR_arena[i].ctgClockC!='heap') ARR_arena[i].ctgClockC='delay';
        ARR_arena[i].intMoveA=getLocal('moveA'+i,40)*1;
        if(ARR_arena[i].intMoveA<0 || ARR_arena[i].intMoveA>60) ARR_arena[i].intMoveA=40;
        ARR_arena[i].intMoveB=getLocal('moveB'+i,20)*1;
        if(ARR_arena[i].intMoveB<0 || ARR_arena[i].intMoveB>60) ARR_arena[i].intMoveB=20;
        ARR_arena[i].blnSumA=getLocal('sumA'+i,false);
        if(ARR_arena[i].blnSumA!==true && ARR_arena[i].blnSumA!==false) ARR_arena[i].blnSumA=false;
        ARR_arena[i].blnSumB=getLocal('sumB'+i,false);
        if(ARR_arena[i].blnSumB!==true && ARR_arena[i].blnSumB!==false) ARR_arena[i].blnSumB=false;
        

        var blnDrive=getLocal('vs'+i,false);if(blnDrive!==true && blnDrive!==false) blnDrive=false;
        var intSkill=getLocal('skl'+i,3)*1;if(intSkill<1 || intSkill>5) intSkill=3;
        var blnSide=getLocal('side'+i,true);if(blnSide!==true && blnSide!==false) blnSide=true;
        var blnRand=getLocal('rnd'+i,true);if(blnRand!==true && blnRand!==false) blnRand=true;
       
        ARR_arena[i].blnDrive=blnDrive;     // machine or human
        ARR_arena[i].intSkill=intSkill;     // from 1 to 5, difficulty skill level
        ARR_arena[i].blnSide=blnSide;
        ARR_arena[i].blnRand=blnRand;
        chooseVar(ARR_arena[i],false);
    }
    NUM_arena=getLocal('arena_num',0)*1;if(NUM_arena<0 && NUM_arena>4) NUM_arena=0;
    switchArena(NUM_arena);
    // SHOW ARENA SECTION AND REMOVE LOAD INDICATOR
    sendRequest('../upx/'+LNK_pic,'',function(){
        var row=xhr.responseText.split(':');
        W_pic=row[0];
        H_pic=row[1];
        STR_pic=row[2];
        var zPic=0.225, box=o('boxPlayer');
        o('txtPlayerName').firstChild.nodeValue=STR_ID;
        getPath(null,box,(box.rx-W_pic*zPic/2),(box.ry-H_pic*zPic/2),zPic,'url(#Icon)','none',0,STR_pic);
        setTimeout("openBox('boxPlayer')",200);
        //
        var PCN = new Peer({host: strHost,port: 8001,path: '/peerjs'});
        PCN.on('open', function(pid){
            WBS = new WebSocket('ws://'+strHost+':8000', 'echo-protocol');
            STR_peer=pid;
            WBS.addEventListener('message',function(e){
                var msg = e.data;
                var rsp=msg.split('~');
                if(rsp[0]=='hello'){
                    WBS.send('hello~'+STR_ID+'~'+STR_shot+'~'+STR_peer);
                    var img=document.getElementsByTagName('img')[0];
                    img.parentNode.removeChild(img);
                    sct.style.display='block';
                    setClubFromStr(strClub,'club');
                    BLN_lock=false;
                }
                else if(rsp[0]=='ban'){
                    console.log('ban');
                }
                else if(rsp[0]=='in' || rsp[0]=='out'){
                    var strID=rsp[1];
                    var  blnOn=false, strFill='#c0c0c0', strPID='0';
                    if(rsp[0]=='in'){
                        blnOn=true, strFill='url(#Icon)', strPID=rsp[2];
                    }   
                    // club array
                    for(var i in ARR_user){
                        if(ARR_user[i].strID==strID){
                            var objUser=ARR_user[i];
                            objUser.blnOn=blnOn;
                            objUser.strPID=strPID;
                            break;
                        }
                    }
                    for(var i in objUser.arrBox) putBoxOn(objUser.arrBox[i]);
                }
                else if(rsp[0]=='get_1'){
                    var row=rsp[4].split(':');
                    for(var i in row){
                        var col=row[i].split('`');
                        var intVar=col[0]*1;
                        var intBase=col[1]*1;
                        var intDelay=col[2]*1;
                        var intGrow=col[3]*1;
                        var intAdd=col[4]*1;
                        var blnSide=getBool(col[5]);
                        var blnRand=getBool(col[6]);
                        var boxBoard=o('boxSeeBoard'+i);
                        //putBoardBox(boxBoard,intVar,intBase,intDelay,intGrow,intAdd,blnSide,blnRand);
                    }
                }
                else if(rsp[0]=='get_0'){
                    console.log('no arenas');
                }
            });
            /*
            var pcn = PCN.connect(strPeer);
            pcn.on('open', function(){
                this.send('get');
                this.on('data',function(rsp){
                                
                });
            });
            PCN.on('connection',function(pcn){
                pcn.on('data',function(rsp){
                    
                });
            });
            */
        });
    });
}
function openDiv(strDiv){
    if(BOX_on!=''){
        closeBox(BOX_on);
        BOX_on='';
    }
    if(DIV_on!=strDiv){
        hideG(DIV_on);
        DIV_on=strDiv;
        showG(DIV_on);
        o(DIV_on).appendChild(o('boxMenu'));
        o(DIV_on).appendChild(o('grpBottom'));
    }
}
////
function deepCopy(obj) {
    if (typeof obj != "object") {
        return obj;
    }
    var copy = obj.constructor();
    for (var key in obj) {
        if (typeof obj[key] == "object") {
            copy[key] = this.deepCopy(obj[key]);
        } else {
            copy[key] = obj[key];
        }
    }
    return copy;
}
/*
// GET FALLING INTRO CUBES & START INTRO
var strTxt='VARCHESS';
for(var i=0;i<strTxt.length;i++){
    var fill='url(#linGold)';
    var stroke=DARKCOLOR;
    if(i<3){fill='url(#linSilver)';stroke='#c0c0c0';}       
    var g=getG(('drop'+i),ARENA,xStart+73+45*i,-50,1,false,20,20);
    getRect(null,g,0,0,40,40,5,fill,stroke,1);
    getText(null,g,20,33,40,'Arial','white',stroke,1,strTxt.charAt(i),'middle');
    moveG(g,g.x,g.y,g.x,340,1,1,0,360*1,10,(1*1+i*5));
}
MODE='intro';
o('drop0').fnc=function(){intro_00()};
animG();
*/
//   + 0123456789
//   0 ##########
//  10 ##########
//  20 #RNBQKBNR#
//  30 #PPPPPPPP#
//  40 #........#
//  50 #........#
//  60 #........#
//  70 #........#
//  80 #pppppppp#
//  90 #rnbqkbnr#
// 100 ##########
// 110 ##########