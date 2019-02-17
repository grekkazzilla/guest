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