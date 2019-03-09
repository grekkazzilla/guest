// GETTING
var OBJ_host=new Object();
// get < index.php
OBJ_host.get=function(){
  var strName=getLocal('name','Stranger'); if((typeof strName)!='string') strName='Stranger';
  var lnkPic=getLocal('pic','00007.txt'); if((typeof lnkPic)!='string') lnkPic='00007.txt';
  var intRank=getLocal('rank',3)*1; if(intRank<1 || intRank>5 || (typeof intRank)!='number') intRank=3;
  var dataImage=getLocal('img','');
  this.strName=strName;
  this.lnkPic=lnkPic;
  this.conn=null; // object peer established connection
  this.pid=''; // string peer id
  this.intRank=intRank;
  this.lnkPic=lnkPic;
  this.strPic='';
  this.wPic=0;
  this.hPic=0;
  this.dataImage=dataImage;
}
// SETTING AND PUTTING ONLY AFTER DRAWING
// setName < btnSubForm < divForm < div_form.js
OBJ_host.setName=function(strName){
  OBJ_host.strName=strName;
  setLocal('name',strName);
}
// putName < index.php
// putName < btnSubForm < divForm < div_form.js
OBJ_host.putName=function(){o('txtName').firstChild.nodeValue=OBJ_host.strName;}
// setRank < btnRank < boxHost < aux_host.js
OBJ_host.setRank=function(intRank){
  OBJ_host.intRank=intRank;
  setLocal('rank',intRank);
}
// putRank < index.php
// putRank < btnRank < boxHost < aux_host.js
OBJ_host.putRank=function(intRank){
  for(var i=0;i<5;i++){
    var btn=o('btnRank'+(i+1));
    var pth=btn.getElementsByTagName('path')[2];
    if(btn.intRank<=intRank) pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+')');
    else pth.setAttribute('transform','scale(0)');
  }
}
OBJ_host.setPic=function(lnkPic){
  setLocal('pic',lnkPic);
  OBJ_host.lnkPic=lnkPic;
}
// loadPic < index.php
// loadPic < gPic < divPic < div_pic.js
OBJ_host.loadPic=function(){
  OBJ.blnLock=true;
  var z=0.5, btn=o('btnHost');
  hideG(btn.getElementsByTagName('g')[0]);
  drawLoad('gLoad','url(#grdButton)',6,(btn.rx*2-100*z)/2,(btn.ry*2-100*z)/2,z,btn);
  sendRequest('../upx/'+OBJ_host.lnkPic,'',function(){
    var arrPic=xhr.responseText.split(':');
    var wPic=arrPic[0]*1;
    var hPic=arrPic[1]*1;
    var strPic=arrPic[2];
    OBJ_host.wPic=wPic;
    OBJ_host.hPic=hPic;
    OBJ_host.strPic=strPic;
    var z=0.225, btn=o('btnHost'), pth=btn.getElementsByTagName('path')[0]
    pthPic.setAttribute('transform','translate('+(btnPic.rx-wPic*zPic/2)+','+(btnPic.ry-hPic*zPic/2)+') scale('+zPic+')');
    pthPic.setAttribute('d',strPic);
    hideG('gLoad');
    showG(btn.getElementsByTagName('g')[0]);
  }
}
OBJ_host.putPic=function(){

}
// DRAWING FIRST BEFORE SETTING AND PUTTING
OBJ_host.drawButton=function(){
  var btnHost=o('btnHost'), gRoot=btnHost.parentNode; gRoot.removeChild(btnHost);
  var btn=getButton(btnHost.id,gRoot,btnHost.x,btnHost.y,btnHost.w,btnHost.h,true,'CXDX',picNone(),0,function(){
    showBox('boxHost');
  },null);
  btn.arrOn[2]=['path',0,'fill','#bdb76d','url(#grdPale)'];
}
OBJ_host.drawBox=function(gRoot){
  var box=getBox('boxHost',gRoot,0,0,false,'#fff');
  getText('labName',box,0,35,18,'Arial','url(#grdButton)','none',0,'My Name','start');
  getRect('rctName',box,10,60,0,40,5,'transparent','#eee8aa',1);
  getText('txtName',box,0,85,18,'Arial','url(#grdIcon)','none',0,'','middle');
  var w=125, gImage=getG('gImgHost',box,10,110,1,true,w/2,w/2);
  getRect(null,gImage,0,0,w,w,0,'transparent','url(#grdButton)',1);
  var img=document.getElementsByTagName('image')[0].cloneNode(true);
  gImage.appendChild(img);
  img.setAttribute('x','0');
  img.setAttribute('y','0');
  img.setAttribute('width',w);
  img.setAttribute('height',w);
  getButton('btnName',box,0,110,60,60,true,'AAAX',picPenA(),0.12,function(){setForm('name');showDiv('divForm');},null);
  getButton('btnPic',box,0,110,60,60,true,'AAAX',picImage(),0.13,function(){showDiv('divPic');setPix();},null);
  getButton('btnImage',box,0,0,60,60,true,'AAAC',picCam(),0.13,function(){o('inpImage').click();},null);
  getButton('btnBin',box,210,175,60,60,false,'AACX',picBin(),0.13,function(){ showBox(box);},null);
  getText('labRank',box,0,0,18,'Arial','url(#grdButton)','none',0,'Self Ranking','start');
  var w=40, h=40, s=10, z=0.11, p=picStar();
  var gRank=getG('gRank',box,0,0,1,true,(40*5+s*4)/2,20);
  for(var i=0;i<5;i++){
      var btn=getButton('btnRank'+(i+1),gRank,(w+s)*i,0,w,h,true,'XXAX',p,z,function(){
          OBJ_host.setRank(this.intRank);
          OBJ_host.putRank(this.intRank);
      },null);
      var pth=btn.getElementsByTagName('path')[0];
      pth.setAttribute('fill','transparent');
      pth.setAttribute('stroke','#000');
      pth.setAttribute('stroke-width','10');
      pth.setAttribute('filter','url(#blr12)');
      getPath(null,btn,0,0,1,'url(#grdButton)','#bdb76d',0.5,'M 5 0 C 2.23 0 0 2.23 0 5 L 0 35 C 0 37.77 2.23 40 5 40 L 35 40 C 37.77 40 40 37.77 40 35 L 40 5 C 40 2.23 37.77 0 35 0 L 5 0 z M 19.90625 5.21875 C 20.356973 5.21375 20.758674 5.49315 20.9375 5.90625 L 24.5 14.15625 C 24.66421 14.53895 25.021181 14.7805 25.4375 14.8125 L 34.40625 15.5 C 34.855902 15.5336 35.231836 15.8226 35.375 16.25 C 35.518162 16.6775 35.4015 17.1398 35.0625 17.4375 L 28.3125 23.375 C 27.999716 23.65 27.86925 24.0948 27.96875 24.5 L 30.09375 33.21875 C 30.2015 33.65595 30.01781 34.13805 29.65625 34.40625 C 29.294815 34.67435 28.824393 34.69815 28.4375 34.46875 L 20.6875 29.875 C 20.328208 29.6617 19.885626 29.6558 19.53125 29.875 L 11.90625 34.59375 C 11.522383 34.83085 11.023861 34.8236 10.65625 34.5625 C 10.28871 34.3005 10.12014 33.84595 10.21875 33.40625 L 12.1875 24.625 C 12.27874 24.2188 12.13046 23.80155 11.8125 23.53125 L 4.96875 17.71875 C 4.6257348 17.42755 4.4900292 16.96085 4.625 16.53125 C 4.7600971 16.10185 5.1452959 15.791 5.59375 15.75 L 14.53125 14.9375 C 14.94637 14.899 15.311409 14.6358 15.46875 14.25 L 18.875 5.90625 C 19.045762 5.48915 19.456535 5.22875 19.90625 5.21875 z');
      getPath(null,btn,(w-p[0]*z)/2,(w-p[1]*z)/2,z,'url(#grdGold)','url(#grdGoldBrd)',5,p[2]);
      btn.intRank=i+1;
      btn.arrOn[0]=['path', 0, 'filter', 'url(#blr12)', 'url(#blr8)'];
      btn.arrOn[1]=['path', 1, 'fill', 'url(#grdButton)', '#bdb76d'];
      btn.arrOn[2]=['path', 2, 'fill', 'url(#grdGold)', '#aa8800'];
      btn.arrOn[3]=['path', 2, 'stroke', 'url(#grdGoldBrd)', '#aa8800'];
  }
}
