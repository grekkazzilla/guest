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
// putRank < btnRank < boxHost < div_arena.js
OBJ_host.putRank=function(intRank){
  for(var i=0;i<5;i++){
    var btn=o('btnRank'+(i+1));
    var pth=btn.getElementsByTagName('path')[2];
    if(btn.intRank<=intRank) pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+')');
    else pth.setAttribute('transform','scale(0)');
  }
}
// loadPic < index.php
// loadPic < gPic < divPic < div_pic.js
OBJ_host.loadPic=function(lnkPic,fncBack){
  if(lnkPic=='none'){
    lnkPic=OBJ_host.lnkPic;
  }
  else{
    OBJ_host.lnkPic=lnkPic;
    setLocal('pic',lnkPic);
  }
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
    pth.setAttribute('transform','translate('+(btn.rx-wPic*z/2)+','+(btn.ry-hPic*z/2)+') scale('+z+')');
    pth.setAttribute('d',strPic);
    hideG('gLoad');
    showG(btn.getElementsByTagName('g')[0]);
    fncBack();
  });
}
// setImage < btnSubImage < divImage < div_img.js
OBJ_host.setImage=function(dataImage){
  OBJ_host.dataImage=dataImage;
  setLocal('img',dataImage);
}
// putImage < index.php
// putImage < btnSubImage < divImage < div_img.js
OBJ_host.putImage=function(){
  var dataImage=OBJ_host.dataImage;
  var gImg=o('gImgHost');
  var img=gImg.getElementsByTagName('image')[0];
  img.setAttribute('xlink:href',dataImage);
}
