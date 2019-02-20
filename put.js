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
function putSide(){
    var strSide=OBJ_var.strSide;
    var btn=o('btnSide');
    var arrG=btn.getElementsByTagName('g'), gWhite=arrG[1], gBlack=arrG[2];
    if(strSide=='white'){
        gWhite.x=btn.rx-25;
        showG(gWhite);
        hideG(gBlack);
        OBJ_board.flip(true);
    }
    else if(strSide=='black'){
        gBlack.x=btn.rx-25;
        hideG(gWhite);
        showG(gBlack);
        OBJ_board.flip(false);
    }
    else if(strSide=='any'){
        gWhite.x=btn.rx-25-9;
        gBlack.x=btn.rx-25+9;
        showG(gWhite);
        showG(gBlack);
    }
}
function putVS(){
    var strVS=OBJ_var.strVS;
    var btn=o('btnMatch');
    var pth=btn.getElementsByTagName('path')[1];
    if(strVS==='human'){
        var z=0.12, y=5, p=picUser();
    }
    else if(strVS=='robo'){
        var z=0.16, y=9, p=picRobo();
    }
    else if(strVS=='friend'){
        var z=0.12, y=6, p=picGlad();
    }
    pth.setAttribute('transform','translate('+(btn.rx-p[0]*z/2)+','+y+') scale('+z+')');
    pth.setAttribute('d',p[2]);
}