function setPix(){
    OBJ_var.blnLock=true;
    var z=0.3, btn=o('btnClosePix');
    hideG(btn.getElementsByTagName('g')[0]);
    drawLoad(o('gLoad'),'url(#grdPale)',6,(btn.rx*2-100*z)/2,(btn.ry*2-100*z)/2,z,btn);
    var w=o('gPic0').rx*2, h=o('gPic0').ry*2;
    for(var i=0;i<12;i++){
        var g=o('gPic'+i);
        var pth=g.getElementsByTagName('path')[0];
        var z=0.15, p=picHour();
        pth.setAttribute('transform','translate('+(w-p[0]*z)/2+','+(h-p[1]*z)/2+') scale('+z+')');
        pth.setAttribute('fill','url(#grdSilver)');
        pth.setAttribute('d',p[2]);
    }
    sendRequest('async_pix.php','',function(){
        var rsp=xhr.responseText.split('~');
        if(rsp[0]=='pix_ok'){
            var wBox=o('gPic0').rx*2, z=0.225;
            var row=rsp[1].split('^');
            for(var i=0;i<row.length;i++){
                var col=row[i].split('`');
                var pic=col[1].split(':');
                var strFile=col[0];
                var wPic=pic[0];
                var hPic=pic[1];
                var strD=pic[2];
                var gBox=o('gPic'+i);
                var pth=gBox.getElementsByTagName('path')[0];
                pth.setAttribute('d',strD);
                pth.setAttribute('fill','url(#grdIcon)');
                pth.setAttribute('transform','translate('+(wBox-wPic*z)/2+','+(wBox-hPic*z)/2+') scale('+z+')');
                gBox.strFile=strFile;
            }
        }
        OBJ_var.blnLock=false;
        var btn=o('btnClosePix');
        showG(btn.getElementsByTagName('g')[0]);
        hideG('gLoad');
    });
}