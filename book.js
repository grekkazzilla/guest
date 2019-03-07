function getBook(gRoot){
  var div=getG('divBook',gRoot,0,0,1,false,OBJ.w/2,OBJ.h/2);
  var z=0.15, p=picBook(); getPath(null,div,15,12,z,'url(#grdButton)','none',0,p[2]);
  getButton(null,div,350,10,40,40,true,'BXBX',picCross(),0.09,function(){showDiv('divArena');},null);
  var W=390, H=125, X=5, Y=60, S=10;
  for(var i=0;i<4;i++){
      var box=getG('gBook'+i,div,X,Y+(H+S)*i,1,true,W/2,H/2);
      getRect(null,box,0,0,W,H,0,'#808080','transparent',0).setAttribute('filter','url(#blr2)');
      getRect(null,box,0,0,W,H,0,'#fff','transparent',0);
      //getButton('btnWatchUser'+i,box,5,5,105,105,true,'CXAX',picUser(),0.225,function(){},null);
      getButton(null,box,W-65,H-65,60,60,true,'AAAX',picDown(),0.13,function(){},null);
      var w=60, h=40, g=getG('gWatchSide'+i,box,W-65,70,1,true,w/2,h/2);
      getRect(null,box,5,5,W/2-7.5,50,5,'url(#grdPale)','url(#grdButton)',1);
      getText(null,box,100,25,18,'Arial','url(#grdIcon)','none',0,'grekkazzilla','middle');
      getText(null,box,100,47,18,'Arial','url(#grdIcon)','none',0,'1','middle').style.fontWeight='normal';
      getRect(null,box,W/2+2.5,5,W/2-7.5,50,5,'url(#grdPale)','url(#grdButton)',1);
      getText(null,box,290,25,18,'Arial','url(#grdIcon)','none',0,'mahmud789','middle');
      getText(null,box,290,47,18,'Arial','url(#grdIcon)','none',0,'0','middle').style.fontWeight='normal';

      getRect(null,box,5,H-65,W-75,60,5,'transparent','#bdb76d',1);
      var z=0.16, p=picDate(); getPath(null,box,15,67,z,'url(#grdButton)','none',0,p[2]);
      getText(null,box,190,85,18,'Arial','url(#grdIcon)','none',0,'Aug-27-2019 18:32','middle');
      getText(null,box,190,110,18,'Arial','url(#grdIcon)','none',0,'Classical : 4 min 14 sec','middle');
  }
}
