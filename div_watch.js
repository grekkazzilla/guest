function drawWatch(gRoot){
  var div=getG('divWatch',gRoot,0,0,1,false,OBJ.w/2,OBJ.h/2);
  getRect(null,div,10,7,105,45,5,'transparent','url(#grdButton)',1);
  var z=0.12, p=picEye(); getPath(null,div,14,11,z,'url(#grdButton)','none',0,p[2]);
  getText('txtWatchQuantity',div,80,35,18,'Arial','url(#grdIcon)','none',1,'','middle');
  getText(null,div,165,23,18,'Arial','url(#grdButton)','none',1,'page','middle');
  getText('txtWatchPage',div,165,47,18,'Arial','url(#grdIcon)','none',1,'1 / 1','middle');
  getButton('btnWatchNext',div,260,10,40,40,true,'BXBX',picArrowC(),0.09,function(){},null);
  mirrHor(getButton('btnWatchPrev',div,215,10,40,40,true,'BXBX',picArrowC(),0.09,function(){},null));
  getButton(null,div,305,10,40,40,true,'BXBX',picGear(),0.1,function(){},null);
  getButton(null,div,350,10,40,40,true,'BXBX',picCross(),0.09,function(){showDiv('divArena');},null);
  var W=390, H=170, X=5, Y=60, S=10;
  for(var i=0;i<3;i++){
    var box=getG('boxWatch'+i,div,X,Y+(H+S)*i,1,true,W/2,H/2);
    box.objWatch=null;
    box.num=i;
    getRect(null,box,0,0,W,H,0,'#808080','none',0).setAttribute('filter','url(#blr2)');
    getRect(null,box,0,0,W,H,0,'#fff','none',0);
    getButton('btnWatchUser'+i,box,5,5,105,105,false,'CXAX',picNone(),0,function(){},null);
    getButton('btnWatchMatch'+i,box,W-65,5,60,60,false,'AAAX',picFence(),0.13,function(){
      OBJ.blnLock=true;
      var z=0.375;hideG(this.getElementsByTagName('g')[0]);drawLoad('gLoad','url(#grdPale)',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,this);
      var objWatch=this.parentNode.objWatch;
      var objUser=objWatch.objUser;
      link_pcn_msg(objUser.pid,null,'match_req~'+OBJ_host.strName+':'+OBJ_host.lnkPic+':'+OBJ_host.intRank);
    },null);
    getText(null,box,130,25,18,'Arial','url(#grdIcon)','none',0,'','start');
    for(var j=0;j<5;j++){
      getPath('pthWatchStar'+i+j,box,130+35*j,33,0,'url(#grdGold)','none',0,picStar()[2]);
    }
    getText('txtWatchVar'+i,box,130,95,18,'Arial','url(#grdIcon)','none',0,'','start').style.fontWeight='bold';
    getRect(null,box,115,5,205,60,5,'transparent','#bdb76d',1);
    getRect(null,box,115,70,270,40,5,'transparent','#bdb76d',1);
    var w=60, h=40, icn=getG('icnWatchSide'+i,box,W-65,70,1,false,w/2,h/2);
    draw_white_pawn('gWhite'+i,icn,(w-50)/2,(h-50)/2,0.985,true); // x-9
    draw_black_pawn('gBlack'+i,icn,(w-50)/2,(h-50)/2,1,true); // x+9
    icn.getElementsByTagName('path')[0].setAttribute('fill','transparent');
    icn.getElementsByTagName('path')[0].setAttribute('stroke','url(#grdIcon)');
    icn.getElementsByTagName('path')[0].setAttribute('stroke-width','2.5');
    icn.getElementsByTagName('path')[1].setAttribute('fill','url(#grdIcon)');
    icn.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
    var w=W-10, h=50;
    var g=getG(null,box,5,H-h-5,1,true,w/2,h/2);
    getRect(null,g,0,0,w,h,5,'transparent','#bdb76d',1);
    var wIn=130, hIn=50, gIn=getG('gWatchTime'+i,g,150,0,1,false,wIn/2,hIn/2);
    var z=0, p=picNone(); getPath(null,gIn,0,0,z,'url(#grdButton)','none',0,p[2]);
    getText(null,gIn,90,21,18,'Arial','url(#grdIcon)','none',0,'','middle');
    getText(null,gIn,90,44,18,'Arial','url(#grdIcon)','none',0,'','middle');
  }
}
