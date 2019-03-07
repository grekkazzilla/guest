function getPic(gRoot){
  var div=getG('divPic',gRoot,0,0,1,false,OBJ.w/2,OBJ.h/2);
  getButton(null,div,div.rx-20,10,40,40,true,'BXBX',picCross(),0.09,function(){showDiv('divArena');},null);
  getButton('btnRefreshPix',div,div.rx-30,div.ry*2-70,60,60,true,'DXCX',picRefresh(),0.13,function(){setPix();},null);
  var w=90, h=w, r=0, s=15, nh=3, nv=4, x=(400-w*nh-s*(nh-1))/2, y=(600-h*nv-s*(nv-1)-15)/2;
  for(var i=0;i<12;i++){
      var g=getG('gPic'+i,divPic,x,y,1,true,w/2,h/2);
      getRect(null,g,0,0,w,h,r,'#808080','none',0).setAttribute('filter','url(#blr2)');
      getRect(null,g,0,0,w,h,r,'#fff','none',0);
      getPath(null,g,0,0,0,'none','none',0,'');
      g.style.cursor='pointer';
      g.onclick=function(){
          if(OBJ.blnLock===false){
              OBJ.blnLock=true;
              showDiv('divArena');
              var lnkPic=this.strFile;
              OBJ_host.lnkPic=lnkPic;
              setLocal('pic',lnkPic);
              var btn=o('btnHost');
              var z=0.5;hideG(btn.getElementsByTagName('g')[0]);drawLoad('gLoad','url(#grdButton)',6,(btn.rx*2-100*z)/2,(btn.ry*2-100*z)/2,z,btn);
              sendRequest('../upx/'+lnkPic,'',function(){
                  hideG('gLoad');
                  var btn=o('btnHost');showG(btn.getElementsByTagName('g')[0]);
                  var arrPic=xhr.responseText.split(':');
                  var wPic=arrPic[0]*1;
                  var hPic=arrPic[1]*1;
                  var strPic=arrPic[2];
                  OBJ_host.wPic=wPic;
                  OBJ_host.hPic=hPic;
                  OBJ_host.strPic=strPic;
                  var zPic=0.225, btnPic=o('btnHost'), pthPic=btnPic.getElementsByTagName('path')[0]
                  showG(btnPic.getElementsByTagName('g')[0]);
                  pthPic.setAttribute('transform','translate('+(btnPic.rx-wPic*zPic/2)+','+(btnPic.ry-hPic*zPic/2)+') scale('+zPic+')');
                  pthPic.setAttribute('d',strPic);
                  OBJ.blnLock=false;
              });
          }
      }
      x+=(w+s);if((i+1)%nh==0){x-=(w+s)*nh;y+=(h+s);}
  }
}
function setPix(){
    OBJ.blnLock=true;
    var z=0.4, btn=o('btnRefreshPix');hideG(btn.getElementsByTagName('g')[0]);drawLoad(o('gLoad'),'url(#grdPale)',6,(btn.rx*2-100*z)/2,(btn.ry*2-100*z)/2,z,btn);
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
        OBJ.blnLock=false;
        var btn=o('btnRefreshPix');
        showG(btn.getElementsByTagName('g')[0]);
        hideG('gLoad');
    });
}
