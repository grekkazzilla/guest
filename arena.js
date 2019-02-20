function switchArena(num){
    openDiv('divArena');
    // old button
    var btn=o('btnBoard'+NUM_arena);
    btn.getElementsByTagName('rect')[0].setAttribute('fill','url(#Button)');
    btn.getElementsByTagName('rect')[1].setAttribute('stroke','url(#Button_rvs)');
    var pth=btn.getElementsByTagName('path')[0];
    pth.setAttribute('fill','url(#Icon)');
    // new button
    btn=o('btnBoard'+num);
    btn.getElementsByTagName('rect')[0].setAttribute('fill','url(#Icon)');
    btn.getElementsByTagName('rect')[1].setAttribute('stroke','url(#Icon_rvs)');
    var pth=btn.getElementsByTagName('path')[0];
    pth.setAttribute('fill','url(#Pale)');
    // save & set
    NUM_arena=num;
    var objArena=ARR_arena[NUM_arena];
    modeArena(null);
    chess=objArena.objChess;
    board.putBoard(!objArena.blnSide);
    setSide(null);
    //
    //setTime(null,null,null);
    putBoardBox(o('boxBoard'),objArena,true);
    //setVS(null);
    setSkill(null);
    setLocal('arena_num',num);
}
function modeArena(ctgMode){
    var objArena=ARR_arena[NUM_arena];
    if(ctgMode!==null) objArena.ctgMode=ctgMode;
    else ctgMode=objArena.ctgMode;
    if(ctgMode=='blank'){
        showG('boxBoard');
        showG('boxStart');
        var z=0.13, p=graphChess();
    }
    else if(ctgMode=='wait'){
        hideG('gTop');
        var gMatch=o('gMatch');
        showG(gMatch);
        var g=o('gUser');
        g.x=205;
        showG(g);
        var z=0.12, p=graphHour();
        o('pthUserPic').setAttribute('d','');
        showLoad(o('gLoadUser'));
        showG('btnMatchOpen');
        showG('btnMatchClose');
        o('txtMatchBase').firstChild.nodeValue=getStrTime(objArena.intBase);
        var intDelay=0;
        if(objArena.intDelay>0){
            intDelay=objArena.intDelay;
            var pMatchDelay=graphClockA();
            var y=5, z=0.11;
        }
        else if(objArena.intGrow>0){
            intDelay=objArena.intGrow;
            var pMatchDelay=graphHeap();
            var y=10, z=0.1;
        }
        else if(objArena.intAdd>0){
            intDelay=objArena.intAdd;
            var pMatchDelay=graphHeap();
            var y=7, z=0.1;
        }
        o('txtMatchDelay').firstChild.nodeValue=intDelay+' sec';
        var pth=o('pthMatchDelay');
        pth.setAttribute('transform','translate('+(gMatch.rx-p[0]*z/2)+','+y+') scale('+z+')');
        pth.setAttribute('d',pMatchDelay[2]);
    }
    else if(ctgMode=='match'){
        hideG('gTop');
        showG('gUser');
        var z=0.13, p=graphWheel();
    }
    var pth=oo('btnBoard'+NUM_arena,'path');
    pth.setAttribute('transform','translate('+(60-p[0]*z)/2+','+(60-p[1]*z)/2+') scale('+z+')');
    pth.setAttribute('d',p[2]);
}
function setArena(obj,intTimeA,intTimeB,intTimeC,ctgClockA,ctgClockB,ctgClockC,intAddA,intAddB,intAddC,intMoveA,intMoveB,blnSumA,blnSumB){
    obj.intTimeA=intTimeA;obj.intTimeB=intTimeB;obj.intTimeC=intTimeC;
    obj.ctgClockA=ctgClockA;obj.ctgClockB=ctgClockB;obj.ctgClockC=ctgClockC;
    obj.intAddA=intAddA;obj.intAddB=intAddB;obj.intAddC=intAddC;
    obj.intMoveA=intMoveA;obj.intMoveB=intMoveB;
    obj.blnSumA=blnSumA;obj.blnSumB=blnSumB;
}
function setTime(intBase,intDelay,intAdd){
    var objArena=ARR_arena[NUM_arena];
    if(intBase===null){
        intBase=objArena.intBase;
        intDelay=objArena.intDelay;
        intAdd=objArena.intAdd;
    }
    else{
        objArena.intBase=intBase;
        objArena.intDelay=intDelay;
        objArena.intAdd=intAdd;
        setLocal('base'+objArena.intNum,intBase);
        setLocal('delay'+objArena.intNum,intDelay);
        setLocal('add'+objArena.intNum,intAdd);
        hideG('boxTime');
    }
    var txt00=o('txtTime00');
    var txt01=o('txtTime01');
    var pth=o('pthHeap');
    //txt00.firstChild.nodeValue=getStrTime(intBase);
    if(intAdd==0){
        //txt01.firstChild.nodeValue='';
        //if(intDelay>0) txt00.firstChild.nodeValue+=' + '+intDelay+' sec';
        //pth.setAttribute('transform','scale(0)');
        //txt00.setAttribute('x','100');
    }
    else{
        txt00.setAttribute('x','48');
        txt01.firstChild.nodeValue=intAdd+' sec';
        pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+')');
    }
}
function getStrTime(intBase){
    var intMin=Math.floor(intBase/60);
    var strMin=intMin;
    if(intMin<10) strMin='0'+strMin;
    var intSec=intBase-intMin*60;
    var strSec=intSec;
    if(intSec<10) strSec='0'+strSec;
    var strTime=strMin+' : '+strSec;
    return strTime;
}
function setVS(bln){
    var objArena=ARR_arena[NUM_arena];
    var btn=o('btnVS');
    //var pth=oo(btn,'path');
    if(bln===null) bln=objArena.blnDrive;
    else{
        objArena.blnDrive=bln;
        setLocal('vs'+objArena.intNum,bln);
    }
    if(bln===true){
        var p=graphGlad();
        var z=0.11;
    }
    else{
        var p=graphRobo();
        var z=0.14;
    }
    //pth.setAttribute('d',p[2]);
    //pth.setAttribute('transform','translate('+(btn.rx*2-p[0]*z)/2+','+(btn.ry*2-p[1]*z)/2+') scale('+z+')');
}
function setSkill(intSkill){
    var objArena=ARR_arena[NUM_arena];
    if(intSkill===null) intSkill=objArena.intSkill;
    else{
        objArena.intSkill=intSkill;
        setLocal('skl'+objArena.intNum,intSkill);
    }
    var arr=new Array();
    for(var i=1;i<6;i++){
        // btn & icn
        var btn=o('btnSkill'+i);
        var icn=o('icnSkill'+i);
        var pth=btn.getElementsByTagName('path')[2];
        var x=-9999,y=-9999;
        //hideG(icn);
        if(i<=intSkill){
            x=pth.x;
            y=pth.y;
            arr.push(icn);
        }
        pth.setAttribute('transform','translate('+x+','+y+') scale('+pth.z+')');
    }
    //evenG(arr,205,395,18,300*0.075,10);
}
function setSide(blnSide){
    var objArena=ARR_arena[NUM_arena];
    var btn=o('btnSide');
    var blnSet=true;
    if(blnSide===null){
        if(objArena.blnRand===true) blnSide=undefined;
        else blnSide=objArena.blnSide;
        blnSet=false;
    }
    if(blnSide===true || blnSide===false){
        if(blnSide===true){
            objArena.blnSide=true;
            objArena.blnRand=false;
            var r=0;
        }
        else if(blnSide===false){
            objArena.blnSide=false;
            objArena.blnRand=false;
            var r=180;
        }
        var pth=o('icnSide');
        pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+')');
        o('btnAny').appendChild(o('icnAny'));
        turnG(o('gBoard'),r);
    }
    else{
        objArena.blnRand=true;
        //o('icnSide').setAttribute('transform','scale(0)');
        //o('btnSide').appendChild(o('icnAny'));
        var r=o('gBoard').r;
    }
    //
    for(var i=0;i<board.arrUnit.length;i++){
        var g=board.arrUnit[i];
        if(g.shown===true) turnG(g,r);
    }
    //
    if(blnSet===true){
        setLocal('side'+NUM_arena,objArena.blnSide);
        setLocal('rnd'+NUM_arena,objArena.blnRand);
        hideG('boxSide');
    }
}