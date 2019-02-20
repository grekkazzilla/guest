function putPic(objPage,objUser){
    OBJ_var.blnLock=true;
    if(typeof(objPage)=='string') objPage=o(objPage);
    var lnkPic=objUser.lnkPic;
    var zLoad=0.6; hideG(objPage.getElementsByTagName('g')[0]);drawLoad(o('gLoad'),'url(#grdButton)',5,(objPage.rx*2-100*zLoad)/2,(objPage.ry*2-100*zLoad)/2,zLoad,objPage);
    sendRequest('../upx/'+lnkPic,'',function(){
        hideG('gLoad');
        var arrPic=xhr.responseText.split(':');
        var wPic=arrPic[0]*1;
        var hPic=arrPic[1]*1;
        var strPic=arrPic[2];
        objUser.wPic=wPic;
        objUser.hPic=hPic;
        objUser.strPic=strPic;
        var zPic=0.225, btnPic=o('btnHost'), pthPic=btnPic.getElementsByTagName('path')[0]
        showG(btnPic.getElementsByTagName('g')[0]);
        pthPic.setAttribute('transform','translate('+(btnPic.rx-wPic*zPic/2)+','+(btnPic.ry-hPic*zPic/2)+') scale('+zPic+')');
        pthPic.setAttribute('d',strPic);
        OBJ_var.blnLock=false;
    });
}
function putRank(intRank){
    for(var i=0;i<5;i++){
        var btn=o('btnRank'+(i+1));
        var pth=btn.getElementsByTagName('path')[2];
        if(btn.intRank<=intRank) pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+')');
        else pth.setAttribute('transform','scale(0)');
    }
}
function setSide(blnSide){
    //var objArena=ARR_arena[NUM_arena];
    var objArena=OBJ_var.objArena;
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
        //pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+')');
        //o('btnAny').appendChild(o('icnAny'));
        turnG(o('gBoard'),r);
    }
    else{
        objArena.blnRand=true;
        //o('icnSide').setAttribute('transform','scale(0)');
        //o('btnSide').appendChild(o('icnAny'));
        var r=o('gBoard').r;
    }
    //
    for(var i=0;i<objArena.objBoard.arrUnit.length;i++){
        var g=objArena.objBoard.arrUnit[i];
        if(g.shown===true) turnG(g,r);
    }
    //
    if(blnSet===true){
        setLocal('side'+NUM_arena,objArena.blnSide);
        setLocal('rnd'+NUM_arena,objArena.blnRand);
        hideG('boxSide');
    }
}