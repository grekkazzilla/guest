var watch=new Object();
watch.msgArena=function(objClub){
  var strReq=OBJ_var.intVar+':'+OBJ_var.strSide;
  objClub.conn.send('msg_arena~'+strReq);
}
function setWatch(){

}
function putwatch(){

}
function getWatch(gRoot){
  var div=getG('divWatch',gRoot,0,0,1,false,OBJ_var.wArena/2,OBJ_var.hArena/2);
  getRect(null,div,10,7,105,45,5,'transparent','url(#grdButton)',1);
  var z=0.12, p=picEye(); getPath(null,div,14,11,z,'url(#grdButton)','none',0,p[2]);
  getText(null,div,80,35,18,'Arial','url(#grdIcon)','none',1,'003','middle');
  getButton(null,div,305,10,40,40,true,'BXBX',picGear(),0.1,function(){},null);
  getButton(null,div,350,10,40,40,true,'BXBX',picCross(),0.09,function(){showDiv('divArena');},null);
  var W=390, H=170, X=5, Y=60, S=10;
  for(var i=0;i<3;i++){
    var box=getG('gWatch'+i,div,X,Y+(H+S)*i,1,true,W/2,H/2);
    box.objUser=null;
    getRect(null,box,0,0,W,H,0,'#808080','none',0).setAttribute('filter','url(#blr2)');
    getRect(null,box,0,0,W,H,0,'#fff','none',0);
    getButton('btnWatchUser'+i,box,5,5,105,105,true,'CXAX',picUser(),0.225,function(){},null);
    getButton(null,box,W-65,5,60,60,true,'AAAX',picFence(),0.13,function(){},null);
    getText(null,box,130,25,18,'Arial','url(#grdIcon)','none',0,'','start');
    for(var j=1;j<getRand(2,5);j++){
      getPath(null,box,95+35*j,33,0.09,'url(#grdGold)','none',0,picStar()[2]);
    }
    getText(null,box,130,95,18,'Arial','url(#grdIcon)','none',0,'Classical','start');
    getRect(null,box,115,5,205,60,5,'transparent','#bdb76d',1);
    getRect(null,box,115,70,270,40,5,'transparent','#bdb76d',1);
    var w=60, h=40, g=getG('gWatchSide'+i,box,W-65,70,1,true,w/2,h/2);
    draw_white_pawn(null,g,(w-50)/2-9,(h-50)/2,0.985,true);
    draw_black_pawn(null,g,(w-50)/2+9,(h-50)/2,1,true);
    g.getElementsByTagName('path')[0].setAttribute('fill','transparent');
    g.getElementsByTagName('path')[0].setAttribute('stroke','url(#grdIcon)');
    g.getElementsByTagName('path')[0].setAttribute('stroke-width','2.5');
    g.getElementsByTagName('path')[1].setAttribute('fill','url(#grdIcon)');
    g.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
    var w=W-10, h=50;
    var g=getG(null,box,5,H-h-5,1,true,w/2,h/2);
    getRect(null,g,0,0,w,h,5,'transparent','#bdb76d',1);
    var dx=75;
    var wIn=100, hIn=50, gIn=getG('gWatchTimeA'+i,g,0+dx,0,1,true,wIn/2,hIn/2);
    getRect(null,gIn,0,0,wIn,hIn,0,'transparent','red',0);
    var z=0.11, p=picHeap(); getPath(null,gIn,5,9,z,'url(#grdButton)','none',0,p[2]);
    getText(null,gIn,70,20,18,'Arial','url(#grdIcon)','none',0,'120 m','middle');
    getText(null,gIn,70,40,18,'Arial','url(#grdIcon)','none',0,'10 s','middle');
    var wIn=40, hIn=50, gIn=getG(null,g,100+dx,0,1,true,wIn/2,hIn/2);
    getRect(null,gIn,0,0,wIn,hIn,0,'transparent','blue',0);
    getText(null,gIn,wIn/2,20,18,'Arial','#bdb76d','none',0,'40','middle');
    getText(null,gIn,wIn/2,40,18,'Arial','#bdb76d','none',0,'+>','middle');
    var wIn=100, hIn=50, gIn=getG('gWatchTimeB'+i,g,g.rx-wIn/2+dx,0,1,true,wIn/2,hIn/2);
    getRect(null,gIn,0,0,wIn,hIn,0,'transparent','red',0);
    var z=0.11, p=picHeap(); getPath(null,gIn,5,9,z,'url(#grdButton)','none',0,p[2]);
    getText(null,gIn,70,20,18,'Arial','url(#grdIcon)','none',0,'120 m','middle');
    getText(null,gIn,70,40,18,'Arial','url(#grdIcon)','none',0,'10 s','middle');
    var wIn=40, hIn=50, gIn=getG(null,g,240+dx,0,1,false,wIn/2,hIn/2);
    getRect(null,gIn,0,0,wIn,hIn,0,'transparent','blue',0);
    getText(null,gIn,wIn/2,20,18,'Arial','#bdb76d','none',0,'20','middle');
    getText(null,gIn,wIn/2,40,18,'Arial','#bdb76d','none',0,'<+>','middle');
    var wIn=100, hIn=50, gIn=getG('gWatchTimeC'+i,g,g.rx*2-wIn+dx,0,1,false,wIn/2,hIn/2);
    getRect(null,gIn,0,0,wIn,hIn,0,'transparent','red',0);
    var z=0.13, p=picClock(); getPath(null,gIn,5,5,z,'url(#grdButton)','none',0,p[2]);
    getText(null,gIn,70,20,18,'Arial','url(#grdIcon)','none',0,'15 m','middle');
    getText(null,gIn,70,40,18,'Arial','url(#grdIcon)','none',0,'10 s','middle');
  }
}
