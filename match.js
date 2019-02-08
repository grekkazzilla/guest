function getObjMatch(){
    var objMatch=new Object();
    objMatch.intVar=1;
    objMatch.ctgSide='any';
    objMatch.intTimeA=10*60;
    objMatch.intTimeB=10*60;
    objMatch.intTimeC=10*60;
    objMatch.ctgClockA='simple_delay';
    objMatch.ctgClockB='simple_delay';
    objMatch.ctgClockC='simple_delay';
    objMatch.intAddA=5;
    objMatch.intAddB=5;
    objMatch.intAddC=5;
    objMatch.intMoveA=40;
    objMatch.intMoveB=20;
    objMatch.blnSumA=false;
    objMatch.blnSumB=false;
    return objMatch;
}
function setObjMatch(objMatch,intVar,ctgSide,intTimeA,intTimeB,intTimeC,ctgClockA,ctgClockB,ctgClockC,intAddA,intAddB,intAddC,intMoveA,intMoveB,blnSumA,blnSumB){
    objMatch.intVar=intVar;
    objMatch.ctgSide=ctgSide;
    objMatch.intTimeA=intTimeA;
    objMatch.intTimeB=intTimeB;
    objMatch.intTimeC=intTimeC;
    objMatch.ctgClockA=ctgClockA;
    objMatch.ctgClockB=ctgClockB;
    objMatch.ctgClockC=ctgClockC;
    objMatch.intAddA=intAddA;
    objMatch.intAddB=intAddB;
    objMatch.intAddC=intAddC;
    objMatch.intMoveA=intMoveA;
    objMatch.intMoveB=intMoveB;
    objMatch.blnSumA=blnSumA;
    objMatch.blnSumB=blnSumB;
}
function getBoxMatch(strID,objRoot,xBox,yBox,blnShow){
    var wBox=190, hBox=110;
    var boxMatch=getBox(strID,objRoot,xBox,yBox,wBox,hBox,blnShow,'url(#grdPale)');
    getText(null,boxMatch,wBox/2,19,18,'Arial','#bdb76d','none',0,'Three Queens','middle').style.fontWeight='bold';
    //
    var wSet=wBox/3, hSet=hBox-25;
    var arr=new Array(true,true,true);
    for(var i=0;i<3;i++){
        // SET
        var gSet=getG(null,boxMatch,0+wSet*i,25,1,arr[i],wSet/2,hSet/2);
        // BASE
        var txt=getText(null,gSet,wSet/2,19,18,'Arial','url(#grdIcon)','none',0,'15m','middle');
        txt.style.fontWeight='bold';
        txt.strFill='url(#grdIcon)';
        // ADD
        var txt=getText(null,gSet,wSet/2,78,18,'Arial','url(#grdIcon)','none',0,'5s','middle');
        txt.style.fontWeight='bold';
        txt.strFill='url(#grdIcon)';
        // MOVE & SUM
        if(i<2){
            var txt=getText(null,gSet,wSet,48,18,'Arial','#bdb76d','none',0,'40','middle');
            txt.style.fontWeight='bold';
            txt.strFill='#bdb76d';
            getText(null,gSet,wSet,57,24,'Arial','#bdb76d','none',0,'','middle').style.fontWeight='bold'
        }
        // ICON
        var wIcon=wSet, hIcon=40, icnClock=getG(null,gSet,0,(hSet-hIcon)/2,1,true,wIcon/2,hIcon/2);
        var arrPic=picTime(), zPic=0.1, xPic=(wIcon-arrPic[0]*zPic)/2, yPic=(hIcon-arrPic[1]*zPic)/2;
        var pthPic=getPath(null,icnClock,xPic,yPic,zPic,'#c0c0c0','none',0,arrPic[2]);
        pthPic.setAttribute('fill','#bdb76d');
        pthPic.strFill='#bdb76d';
    }
    //
    var wPawn=50, hPawn=45, gPawn=getG(null,boxMatch,10,0,1,true,wPawn/2,hPawn/2); // 0.6 160 80
    //getCircle(null,boxMatch,20,13,6,'#fff','url(#grdButton)',3);
    //getCircle(null,boxMatch,170,13,6,'url(#grdButton)','url(#grdButton)',3);
    draw_black_pawn(null,gPawn,-5,50,0.9,false);
    draw_white_pawn(null,gPawn,-11,50,0.75,false);
    gPawn.getElementsByTagName('path')[0].setAttribute('fill','#bdb76d');
    gPawn.getElementsByTagName('path')[0].setAttribute('stroke','#bdb76d');
    //
    boxMatch.objMatch=getObjMatch();
    return boxMatch;
}
function putBoxMatch(boxMatch,objMatch){
    boxMatch.objMatch=objMatch;
    var arr=new Array(
        [objMatch.intTimeA,1],
        [objMatch.intTimeB,5],
        [objMatch.intTimeC,9]
    );
    for(var i in arr){
        var intSec=arr[i][0];
        var txtBox=boxMatch.getElementsByTagName('text')[arr[i][1]];
        if(intSec<=3*60*60+20*60){
            if(objMatch.intTimeB==0) txtBox.firstChild.nodeValue=intSec/60+' min';
            else txtBox.firstChild.nodeValue=intSec/60+'m';
        }
        else{
            if(objMatch.intTimeB==0) txtBox.firstChild.nodeValue=intSec/60/60+' hour';
            else txtBox.firstChild.nodeValue=intSec/60/60+'h';
        }
    }
    var arr=new Array(
        [objMatch.intAddA,2],
        [objMatch.intAddB,6],
        [objMatch.intAddC,10]
    );
    for(var i in arr){
        var intSec=arr[i][0];
        var txtBox=boxMatch.getElementsByTagName('text')[arr[i][1]];
        if(intSec<60){
            if(objMatch.intTimeB==0) txtBox.firstChild.nodeValue=intSec+' sec';
            else txtBox.firstChild.nodeValue=intSec+'s';
        }
        else if(intSec<60*60){
            if(objMatch.intTimeB==0) txtBox.firstChild.nodeValue=intSec/60+' min';
            else txtBox.firstChild.nodeValue=intSec/60+'m'
        }
        else{
            if(objMatch.intTimeB==0) txtBox.firstChild.nodeValue=intSec/60/60+' hour';
            else txtBox.firstChild.nodeValue=intSec/60/60+'h';
        }
    }
    var arr=new Array(
        [objMatch.intMoveA,3],
        [objMatch.intMoveB,7]
    );
    for(var i in arr){
        var intMove=arr[i][0];
        var txtBox=boxMatch.getElementsByTagName('text')[arr[i][1]];
        txtBox.firstChild.nodeValue=intMove;
        if(intMove==0) txtBox.firstChild.nodeValue='';
        if(i==0){
            if(objMatch.blnSumA===true) txtBox.setAttribute('y','40');
            else txtBox.setAttribute('y','48');
        }
        if(i==1){
            if(objMatch.blnSumB===true) txtBox.setAttribute('y','40');
            else txtBox.setAttribute('y','48');
        }
    }
    var arr=new Array(
        [objMatch.blnSumA,4],
        [objMatch.blnSumB,8]
    );
    for(var i in arr){
        var blnSum=arr[i][0];
        var txtBox=boxMatch.getElementsByTagName('text')[arr[i][1]];
        if(blnSum===true) txtBox.firstChild.nodeValue='+';
        else txtBox.firstChild.nodeValue='';
        
    }
    var arr=new Array(
        [objMatch.ctgClockA,1],
        [objMatch.ctgClockB,3],
        [objMatch.ctgClockC,5]
    );
    for(var i in arr){
        var ctgClock=arr[i][0];
        var icnClock=boxMatch.getElementsByTagName('g')[arr[i][1]];
        var pthPic=icnClock.getElementsByTagName('path')[0];
        if(ctgClock=='simple_delay') var zPic=0.1, arrPic=picTime();
        else if(ctgClock=='compensation') var zPic=0.1, arrPic=picUp();
        else if(ctgClock=='accumulation') var zPic=0.1, arrPic=picHeap();
        pthPic.setAttribute('transform','translate('+(icnClock.rx-arrPic[0]*zPic/2)+','+(icnClock.ry-arrPic[1]*zPic/2)+') scale('+zPic+')')
        pthPic.setAttribute('d',arrPic[2]);
    }
    //
    var arrG=boxMatch.getElementsByTagName('g');
    if(objMatch.intTimeB==0){
        arrG[0].setAttribute('transform','translate('+(arrG[0].x+arrG[0].rx*2)+','+arrG[0].y+')');
        hideG(arrG[2]);
        hideG(arrG[4]);
    }
    else if(objMatch.intTimeC==0){
        arrG[0].setAttribute('transform','translate('+(arrG[0].x+arrG[0].rx)+','+arrG[0].y+')');
        arrG[2].setAttribute('transform','translate('+(arrG[2].x+arrG[2].rx)+','+arrG[2].y+')');
        hideG(arrG[4]);
    }
    else{
        arrG[0].setAttribute('transform','translate('+arrG[0].x+','+arrG[0].y+')');
        arrG[2].setAttribute('transform','translate('+arrG[2].x+','+arrG[2].y+')');
        arrG[4].setAttribute('transform','translate('+arrG[4].x+','+arrG[4].y+')');
    }
}
function setMenuTime(elemSet){
    var menuTime=document.getElementById('menuTime');
    var btnSlide=document.getElementById('btnSlide');
    // null button
    if(elemSet===null || elemSet==menuTime.elemSet && elemSet.id.substr(3,1)!='S'){
        elemSet=null;
    }
    // out old button
    if(menuTime.elemSet!==null && menuTime.elemSet.id.substr(3,1)!='S'){
        if(menuTime.elemSet.blnOn===true) onMenuTimeButton([menuTime.elemSet.id]);
        else outMenuTimeButton([menuTime.elemSet.id],false);
        menuTime.elemSet.elemBox.setAttribute('fill',menuTime.elemSet.elemBox.strFill);
    }
    // on new button
    if(elemSet!==null && elemSet.id.substr(3,1)!='S' && elemSet!=menuTime.elemSet){
        elemSet.elemBox.setAttribute('fill','orange');
    }
    menuTime.elemSet=elemSet;
    // toggle buttons
    if(elemSet!==null && elemSet.id.substr(3,1)=='S'){
        putMenuTime(elemSet);
    }
    // on slider
    if(elemSet!==null && elemSet.id.substr(3,1)!='S' && elemSet.id.substr(3,1)!='C'){
        onMenuTimeButton(['btnSlideDown','btnSlideUp']);
        btnSlide.getElementsByTagName('rect')[0].setAttribute('fill','url(#grdButton)');
        btnSlide.getElementsByTagName('rect')[0].setAttribute('stroke','#bdb76d');
        btnSlide.getElementsByTagName('circle')[0].setAttribute('fill','url(#grdButtonRvs)');
        o('gSlide').style.cursor='pointer';
        var arrVal=new Array();
        if(elemSet.id.substr(3,1)=='T'){
            if(elemSet.id!='btnTime0') arrVal[0]=0;
            for(var i=60;i<=180*60+20*60;i+=60) arrVal.push(i);
            for(var i=4*60*60;i<=48*60*60;i+=60*60) arrVal.push(i);
        }
        else if(elemSet.id.substr(3,1)=='M'){
            for(var i=0;i<=60;i++) arrVal.push(i);
        }
        else if(elemSet.id.substr(3,1)=='A'){
            for(var i=0;i<60;i++) arrVal.push(i);
            for(var i=60;i<60*60;i+=60) arrVal.push(i);
            for(var i=60*60;i<=48*60*60;i+=60*60) arrVal.push(i);
        }
        //
        var xStart=20, xEnd=gSlide.rx*2-20;
        var wRct=(xEnd-xStart)/arrVal.length;
        for(var i=0;i<246;i++){
            var rctPut=document.getElementById('rctSlide'+i);
            if(i<arrVal.length){
                rctPut.intVal=arrVal[i];
                rctPut.setAttribute('x',xStart+wRct*i);
                rctPut.setAttribute('width',wRct);
                if(i==arrVal.length-1) menuTime.rctMax=rctPut;
                if(arrVal[i]==elemSet.intVal){
                    putMenuTime(rctPut);
                }
            }
            else{
                rctPut.intVal=undefined;
                rctPut.setAttribute('x','-9999');
                rctPut.setAttribute('width','0');
            }   
        }
    }
    // out slider
    if(elemSet===null || elemSet.id.substr(3,1)=='S' || elemSet.id.substr(3,1)=='C'){
        outMenuTimeButton(['btnSlideDown','btnSlideUp'],true);
        btnSlide.getElementsByTagName('rect')[0].setAttribute('fill','url(#grdSilver)');
        btnSlide.getElementsByTagName('rect')[0].setAttribute('stroke','#c0c0c0');
        btnSlide.getElementsByTagName('circle')[0].setAttribute('fill','url(#grdSilverRvs)');
        btnSlide.setAttribute('transform','translate('+(menuTime.rx-btnSlide.rx)+','+btnSlide.y+')');
        o('gSlide').style.cursor='default';
    }
    // on clock button
    if(elemSet!==null && elemSet.id.substr(3,1)=='C'){
        if(elemSet.ctgVal=='simple_delay') putMenuTime(o('btnSimpleDelay'));
        else if(elemSet.ctgVal=='compensation') putMenuTime(o('btnCompensation'));
        else if(elemSet.ctgVal=='accumulation') putMenuTime(o('btnAccumulation'));
    }
    // out clock button
    if(elemSet===null || elemSet.id.substr(3,1)!='C'){
        outMenuTimeButton(['btnSimpleDelay','btnCompensation','btnAccumulation'],true);
    }
}
function putMenuTime(elemPut){
    var menuTime=o('menuTime');
    var elemSet=menuTime.elemSet;
    var objArena=OBJ_var.arrArena[OBJ_var.numArena];
    var objMatch=objArena.objMatch;
    var boxMatch=o('boxMatch');
    if(elemPut!==null && elemPut.tagName=='rect' && (elemSet==null || elemSet.id.substr(3,1)=='C' || elemSet.id.substr(3,1)=='S')){}
    else{
        if(elemPut!==null){
            if(elemPut.id=='tglSum1'){
                objMatch.blnSumA=elemPut.blnOn;
                if(objMatch.blnSumA===true && objMatch.intMoveA==0){
                    objMatch.intMoveA=20;
                }
            }
            else if(elemPut.id=='tglSum3'){
                objMatch.blnSumB=elemPut.blnOn;
                if(objMatch.blnSumB===true && objMatch.intMoveB==0){
                    objMatch.intMoveB=20;
                    if(objMatch.intMoveA==0) objMatch.intMoveA=40;
                    if(objMatch.intTimeB==0) objMatch.intTimeB=30*60;
                }
            }
            else if(elemPut.tagName=='rect'){
                var btnSlide=document.getElementById('btnSlide');
                btnSlide.setAttribute('transform','translate('+((elemPut.getAttribute('x')*1+elemPut.getAttribute('width')/2)-btnSlide.rx)+',0)');
                menuTime.rctOn=elemPut;
                if(elemPut.id=='rctSlide0') outMenuTimeButton(['btnSlideDown'],true);
                else onMenuTimeButton(['btnSlideDown']);
                if(elemPut==menuTime.rctMax) outMenuTimeButton(['btnSlideUp'],true);
                else onMenuTimeButton(['btnSlideUp']);
                if(elemSet.id=='btnTime0') objMatch.intTimeA=elemPut.intVal;
                else if(elemSet.id=='btnTime2'){
                    objMatch.intTimeB=elemPut.intVal;
                    if(objMatch.intTimeB>0 && objMatch.intMoveA==0){
                        objMatch.intMoveA=40;
                    }
                    else if(objMatch.intTimeB==0){
                        objMatch.intTimeC=0;
                        objMatch.ctgClockB='simple_delay';objMatch.ctgClockC='simple_delay';
                        objMatch.intAddB=0;objMatch.intAddC=0;
                        objMatch.intMoveB=0;
                        objMatch.blnSumB=false;
                    }
                }
                else if(elemSet.id=='btnTime4'){
                    objMatch.intTimeC=elemPut.intVal;
                    if(objMatch.intTimeC>0){
                        if(objMatch.intMoveB==0) objMatch.intMoveB=20;
                        if(objMatch.intTimeB==0) objMatch.intTimeB=30*60;
                        if(objMatch.intMoveA==0) objMatch.intMoveA=40;
                    }
                    else if(objMatch.intTimeC==0){
                        objMatch.ctgClockC='simple_delay'
                        objMatch.intAddC=0;
                    }
                }
                else if(elemSet.id=='btnMove1'){
                    objMatch.intMoveA=elemPut.intVal;
                    if(objMatch.intMoveA==0){
                        objMatch.intTimeB=0;objMatch.intTimeC=0;
                        objMatch.ctgClockB='simple_delay';objMatch.ctgClockC='simple_delay';
                        objMatch.intAddB=0;objMatch.intAddC=0;
                        objMatch.intMoveB=0;
                        objMatch.blnSumA=false;objMatch.blnSumB=false;
                    }
                }
                else if(elemSet.id=='btnMove3'){
                    objMatch.intMoveB=elemPut.intVal;
                    if(objMatch.intMoveB==0){
                        objMatch.intTimeC=0;
                        objMatch.ctgClockC='simple_delay';
                        objMatch.intAddC=0;
                        objMatch.blnSumB=false;
                    }
                    else if(objMatch.intMoveB>0){
                        if(objMatch.intTimeB==0) objMatch.intTimeB=30*60;
                        if(objMatch.intMoveA==0) objMatch.intMoveA=40;
                    }
                }
                else if(elemSet.id=='btnAdd0'){
                    objMatch.intAddA=elemPut.intVal;
                    if(objMatch.intAddA==0) objMatch.ctgClockA='simple_delay';
                }
                else if(elemSet.id=='btnAdd2'){
                    objMatch.intAddB=elemPut.intVal;
                    if(objMatch.intAddB>0){
                        if(objMatch.intTimeB==0) objMatch.intTimeB=30*60;
                        if(objMatch.intMoveA==0) objMatch.intMoveA=40;
                    }
                    else if(objMatch.intAddB==0) objMatch.ctgClockB='simple_delay';    
                }
                else if(elemSet.id=='btnAdd4'){
                    objMatch.intAddC=elemPut.intVal;
                    if(objMatch.intAddC>0){
                        if(objMatch.intTimeB==0) objMatch.intTimeB=30*60;
                        if(objMatch.intMoveA==0) objMatch.intMoveA=40;
                        if(objMatch.intTimeC==0) objMatch.intTimeC=30*60;
                        if(objMatch.intMoveB==0) objMatch.intMoveB=20;
                    }
                    else if(objMatch.intAddC==0) objMatch.ctgClockC='simple_delay';
                }
            }
            else if(elemSet.id.substr(3,1)=='C'){
                var arrOn=new Array('btnSimpleDelay','btnCompensation','btnAccumulation'), arrOut=new Array();
                if(elemPut.ctgVal=='simple_delay') arrOut.push(arrOn.splice(0,1));
                else if(elemPut.ctgVal=='compensation') arrOut.push(arrOn.splice(1,1));
                else if(elemPut.ctgVal=='accumulation') arrOut.push(arrOn.splice(2,1));
                onMenuTimeButton(arrOn);
                outMenuTimeButton(arrOut,true);
                if(elemSet.id=='btnClock0'){
                    objMatch.ctgClockA=elemPut.ctgVal;
                    if(objMatch.ctgClockA!='simple_delay' && objMatch.intAddA==0){
                        objMatch.intAddA=5;
                    }
                }
                else if(elemSet.id=='btnClock2'){
                    objMatch.ctgClockB=elemPut.ctgVal;
                    if(objMatch.ctgClockB!='simple_delay'){
                        if(objMatch.intTimeB==0) objMatch.intTimeB=30*60;
                        if(objMatch.intMoveA==0) objMatch.intMoveA=40;
                        if(objMatch.intAddB==0) objMatch.intAddB=5;
                    }
                }
                else if(elemSet.id=='btnClock4'){
                    objMatch.ctgClockC=elemPut.ctgVal;
                    if(objMatch.ctgClockC!='simple_delay'){
                        if(objMatch.intTimeB==0) objMatch.intTimeB=30*60;
                        if(objMatch.intMoveA==0) objMatch.intMoveA=40;
                        if(objMatch.intAddB==0) objMatch.intAddB=5;
                        if(objMatch.intTimeC==0) objMatch.intTimeC=30*60;
                        if(objMatch.intMoveB==0) objMatch.intMoveB=20;
                        if(objMatch.intAddC==0) objMatch.intAddC=5;
                    }
                }
            }
        }
        //
        var arrOn=new Array(), arrOut=new Array(), arrButton=new Array(
            ['btnTime0',objMatch.intTimeA],
            ['btnTime2',objMatch.intTimeB],
            ['btnTime4',objMatch.intTimeC],
            ['btnMove1',objMatch.intMoveA],
            ['btnMove3',objMatch.intMoveB],
            ['tglSum1',objMatch.blnSumA],
            ['tglSum3',objMatch.blnSumB],
            ['btnAdd0',objMatch.intAddA],
            ['btnAdd2',objMatch.intAddB],
            ['btnAdd4',objMatch.intAddC],
            ['btnClock0',objMatch.ctgClockA],
            ['btnClock2',objMatch.ctgClockB],
            ['btnClock4',objMatch.ctgClockC]
        );
        for(var i in arrButton){
            var elemMenu=o(arrButton[i][0]);
            var val=arrButton[i][1];
            if(elemMenu.id.substr(3,1)=='T'){
                if(val<=3*60*60+20*60) var strText00=val/60, strText01='min';
                else var strText00=val/60/60, strText01='hour';
                elemMenu.getElementsByTagName('text')[0].firstChild.nodeValue=strText00
                elemMenu.getElementsByTagName('text')[1].firstChild.nodeValue=strText01;
                elemMenu.intVal=val;
                if(elemMenu.id=='btnTime2'){
                    if(elemMenu.intVal>0 && elemMenu.blnOn===false) arrOn.push('btnTime2','btnClock2','btnAdd2');
                    else if(elemMenu.intVal==0 && elemMenu.blnOn===true) arrOut.push('btnTime2','btnClock2','btnAdd2');
                }
                else if(elemMenu.id=='btnTime4'){
                    if(elemMenu.intVal>0 && elemMenu.blnOn===false) arrOn.push('btnTime4','btnClock4','btnAdd4');
                    else if(elemMenu.intVal==0 && elemMenu.blnOn===true) arrOut.push('btnTime4','btnClock4','btnAdd4');
                }
            }
            else if(elemMenu.id.substr(3,1)=='M'){
                elemMenu.getElementsByTagName('text')[1].firstChild.nodeValue=val;
                elemMenu.intVal=val;
                if(elemMenu.id=='btnMove1'){
                    var gSet=o('gSet1'), pthSet=gSet.getElementsByTagName('path')[0];
                    if(elemMenu.intVal>0){
                        if(elemMenu.blnOn===false) arrOn.push('btnMove1');
                        if(objMatch.intTimeB>0) var zPic=0.12, arrPic=picArrowD();
                        else if(objMatch.intTimeB==0) var zPic=0.11,arrPic=picLoop();
                    }
                    else if(elemMenu.intVal==0){
                        if(elemMenu.blnOn===true) arrOut.push('btnMove1');
                        var zPic=0.12, arrPic=picCrossB();
                    }
                    pthSet.setAttribute('transform','translate('+(gSet.rx-arrPic[0]*zPic/2)+','+(gSet.ry-arrPic[1]*zPic/2)+') scale ('+zPic+')')
                    pthSet.setAttribute('d',arrPic[2]);
                }
                else if(elemMenu.id=='btnMove3'){
                    var gSet=o('gSet3'), pthSet=gSet.getElementsByTagName('path')[0];
                    if(elemMenu.intVal>0){
                        if(elemMenu.blnOn===false) arrOn.push('btnMove3');
                        if(objMatch.intTimeC>0) var zPic=0.12, arrPic=picArrowD();
                        else if(objMatch.intTimeC==0) var zPic=0.11,arrPic=picLoop();
                    }
                    else if(elemMenu.intVal==0){
                        if(elemMenu.blnOn===true) arrOut.push('btnMove3');
                        var zPic=0.12, arrPic=picCrossB();
                    }
                    pthSet.setAttribute('transform','translate('+(gSet.rx-arrPic[0]*zPic/2)+','+(gSet.ry-arrPic[1]*zPic/2)+') scale ('+zPic+')')
                    pthSet.setAttribute('d',arrPic[2]);
                }
            }
            else if(elemMenu.id.substr(3,1)=='A'){
                if(val<60) var strText00=val, strText01='sec';
                else if(val<60*60) var strText00=val/60, strText01='min';
                else var strText00=val/60/60, strText01='hour';
                elemMenu.getElementsByTagName('text')[0].firstChild.nodeValue=strText00
                elemMenu.getElementsByTagName('text')[1].firstChild.nodeValue=strText01;
                elemMenu.intVal=val;
            }
            else if(elemMenu.id.substr(3,1)=='C'){
                if(val=='simple_delay') var zPic=0.13, arrPic=picTime();
                else if(val=='compensation') var zPic=0.12, arrPic=picUp();
                else if(val=='accumulation') var zPic=0.12, arrPic=picHeap();
                var pthPic=elemMenu.getElementsByTagName('path')[0];
                pthPic.setAttribute('transform','translate('+(elemMenu.rx-arrPic[0]*zPic/2)+','+(elemMenu.ry-arrPic[1]*zPic/2)+') scale('+zPic+')')
                pthPic.setAttribute('d',arrPic[2]);
                elemMenu.ctgVal=val;
            }
            else if(elemMenu.id.substr(3,1)=='S') pushToggle(elemMenu,val);
        }
        if(arrOn.length>0) onMenuTimeButton(arrOn);
        if(arrOut.length>0) outMenuTimeButton(arrOut,false);
        if(elemSet!==null && elemSet.id.substr(3,1)!='S'){
            elemSet.getElementsByTagName('rect')[0].setAttribute('fill','url(#grdIcon)');
            elemSet.getElementsByTagName('rect')[1].setAttribute('stroke','url(#grdIconRvs)');
        }
        //
        putBoxMatch(boxMatch,objMatch);
    }
}
function onMenuTimeButton(arrButton){
    for(var i in arrButton){
        var btnMenu=o(arrButton[i]);
        btnMenu.getElementsByTagName('rect')[0].setAttribute('fill','url(#grdButton)');
        btnMenu.getElementsByTagName('rect')[1].setAttribute('stroke','url(#grdButtonRvs)');
        btnMenu.arrOn[0]=['rect',0,'fill','url(#grdButton)','#bdb76d'];
        btnMenu.arrOn[1]=['rect',1,'stroke','url(#grdButtonRvs)','#eee8aa'];
        var arrPath=btnMenu.getElementsByTagName('path');
        for(var i=0;i<arrPath.length;i++) arrPath[i].setAttribute('fill','url(#grdPale)');
        btnMenu.blnLock=false;
        btnMenu.blnOn=true;
        btnMenu.style.cursor='pointer';
    }
}
function outMenuTimeButton(arrButton,blnLock){
    for(var i in arrButton){
        var btnMenu=o(arrButton[i]);
        btnMenu.getElementsByTagName('rect')[0].setAttribute('fill','url(#grdSilver)');
        btnMenu.getElementsByTagName('rect')[1].setAttribute('stroke','url(#grdSilverRvs)');
        btnMenu.arrOn[0]=['rect',0,'fill','url(#grdSilver)','#999999'];
        btnMenu.arrOn[1]=['rect',1,'stroke','url(#grdSilverRvs)','#fff'];
        var arrPath=btnMenu.getElementsByTagName('path');
        for(var i=0;i<arrPath.length;i++) arrPath[i].setAttribute('fill','#fff');
        btnMenu.blnLock=blnLock;
        btnMenu.blnOn=false;
        if(blnLock===true) btnMenu.style.cursor='default';
    }
}