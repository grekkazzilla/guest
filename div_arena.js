function getArena(gRoot){
  var div=getG('divArena',gRoot,0,0,1,true,OBJ.w/2,OBJ.h/2);
  getButton('btnClose',div,-9999,-9999,40,40,false,'BXBX',picCross(),0.09,function(){hideBox(OBJ.boxOn)},null);
  // OBJ CHESS
  OBJ_chess.getBoard(8,8,2,'standard');
  // G CHESSBOARD
  OBJ_board.drawBoard(div,'gBoard',4,104,1,49,'#eee8aa','#bdb76d',true);
  var pos=110; // for pawnjs engine purposes
  var num=21;
  for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
          var gSqu=document.getElementById('g'+(pos+j)*1);
          gSqu.num=num+j;
          //getText(null,gSqu,25,40,15,'Arial','#f00','none',0,gSqu.num,'middle');
      }
      pos-=12;
      num+=10;
  }
  // G TOP
  var w=60, h=60, s=6.4, g=getG('gTop',div,4,6,1,true,w*6+s*4,90);
  getButton('btnVar',g,0,30,w,h,true,'AAAX',picListA(),0.11,function(){showBox('boxVar');},null);
  var btn=getButton('btnSide',g,(w+s),30,w,h,true,'AAAX',picNone(),0.11,function(){showBox('boxSide');},null);
  draw_white_pawn(null,btn,(w-50)/2-9,(h-50)/2,0.985,true);
  draw_black_pawn(null,btn,(w-50)/2+9,(h-50)/2,1,true);
  btn.getElementsByTagName('path')[1].setAttribute('fill','transparent');
  btn.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
  btn.getElementsByTagName('path')[1].setAttribute('stroke-width','2.5');
  btn.getElementsByTagName('path')[2].setAttribute('fill','url(#grdIcon)');
  btn.getElementsByTagName('path')[2].setAttribute('stroke','url(#grdIcon)');
  btn.arrOn.push(['path',1,'stroke','url(#grdIcon)','#000'],['path',2,'fill','url(#grdIcon)','#000'],['path',2,'stroke','url(#grdIcon)','#000']);
  var btn=getButton('btnMatch',g,(w+s)*2,0,(w*2+s),h+30,true,'CXAX',picFence(),0.13,null,null);
  var gPath=btn.getElementsByTagName('g')[0];
  var pth=gPath.getElementsByTagName('path')[0]; pth.setAttribute('transform','translate('+(pth.x)+','+(pth.y+20)+') scale('+pth.z+')');
  getPath(null,gPath,0,0,0,'url(#grdButton)','none',0,picNone()[2]);
  btn.arrOn.push(['path',1,'fill','url(#grdButton)','#eee8aa']);
  btn.intHold=0;
  btn.blnHeld=false;
  if(isTouch()){
      btn.ontouchstart=function(){
          if(OBJ.blnLock===false){
              OBJ.blnLock=true;
              if(this.blnHeld===false){
                  this.blnHeld=true;
                  onBtn(this,1);
                  this.tmr=setInterval(function(){
                      var btn=o('btnMatch');
                      btn.intHold++;
                      if(btn.intHold>=7 || btn.blnHeld===false){
                          if(btn.intHold>=7) showBox('boxVS');
                          else startGame();
                          onBtn(btn,0);
                          btn.intHold=0;
                          btn.blnHeld=false;
                          OBJ.blnLock=false;
                          clearInterval(btn.tmr);
                      }
                  },100);
              }
          }
      }
      btn.ontouchend=function(){this.blnHeld=false;}
  }
  else{
      btn.onmousedown=function(){
          if(OBJ.blnLock===false){
              OBJ.blnLock=true;
              if(this.blnHeld===false){
                  this.blnHeld=true;
                  onBtn(this,1);
                  this.tmr=setInterval(function(){
                      var btn=o('btnMatch');
                      btn.intHold++;
                      if(btn.intHold>=7 || btn.blnHeld===false){
                          if(btn.intHold>=7) showBox('boxVS');
                          else startGame();
                          onBtn(btn,0);
                          btn.intHold=0;
                          btn.blnHeld=false;
                          OBJ.blnLock=false;
                          clearInterval(btn.tmr);
                      }
                  },100);
              }
          }
      }
      btn.onmouseup=function(){this.blnHeld=false;}
      btn.onmouseout=function(){this.blnHeld=false;}
  }
  var btn=getButton('btnTime',g,(w+s)*4,30,(w*2+s),h,true,'AAAX',picClock(),0.13,function(){showBox('boxTime');},null);
  var pth=btn.getElementsByTagName('path')[0];
  pth.setAttribute('transform','translate('+(pth.x-35)+','+pth.y+') scale('+pth.z+')');
  getText(null,btn,83,25,18,'Arial','url(#grdIcon)','none',0,'15 min','middle');
  getText(null,btn,83,47,18,'Arial','url(#grdIcon)','none',0,'10 sec','middle');
  btn.arrOn.push(['text',0,'fill','url(#grdIcon)','#eee8aa'],['text',1,'fill','url(#grdIcon)','#eee8aa']);
  // G BOTTOM
  var w=60, h=60, s=6.4, g=getG('gBottom',div,4,504,1,true,w*6+s*4,90);
  getButton('btnMenu',g,0,0,w,h,true,'AAAX',picMenu(),0.11,function(){showBox('boxMenu');},null);
  getButton('btnBook',g,(w+s),0,w,h,true,'AAAX',picBook(),0.135,function(){showDiv('divBook');},null);
  var btn=getButton('btnHost',g,(w+s)*2,0,(w*2+s),(h+30),true,'CXDX',picNone(),0,function(){
    showBox('boxHost');
  },null);
  btn.arrOn[2]=['path',0,'fill','#bdb76d','url(#grdPale)'];
  getButton('btnSetUp',g,(w+s)*4,0,w,h,true,'AAAX',picGear(),0.13,function(){},null);
  getButton('btnWatch',g,(w+s)*5,0,w,h,true,'AAAX',picEye(),0.13,function(){
    putWatch(OBJ_watch.numPage);
    showDiv('divWatch');
    if(OBJ.blnWatch===false){
      OBJ.blnWatch=true;
      OBJ.wbs.send('watch_on~'+asmFind());
    }
  },null);
  // BOX VAR
  var w=150, h=60, m=10, s=10, x=m, y=60, qtyHor=2, qtyVer=5;
  var box=getMenu('boxVar',div,w,h,m,s,qtyHor,qtyVer,false);
  getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'Game','start');
  var arr=new Array(['Classic','',1],['Shuffle','',0],['End','Game',2],['Three','Queens',3],['Pawn','Attack',5],['Revolt','',4],['Random','',6],['Knight','Horde',7],['Triangle','',8],['Checkers','',1]);
  for(var i=0;i<arr.length;i++){
      var btn=getButton(null,box,x,y,w,h,true,'AAXC',null,0,function(){
          OBJ_arena.setVar(this.intVar);
          OBJ_arena.putVar();
          hideBox('boxVar');
      },arr[i][0]+'~'+arr[i][1]);
      btn.intVar=arr[i][2];
      btn.strVar=arr[i][0]+' '+arr[i][1];
      getCircle(null,btn,25,30,10,'url(#grdButtonRvs)','none',0);
      btn.arrOn.push(['circle',0,'fill','url(#grdButtonRvs)','#eee8aa'],['text',0,'fill','url(#grdIcon)','#eee8aa'],['text',1,'fill','url(#grdIcon)','#eee8aa']);
      var arrText=btn.getElementsByTagName('text');
      arrText[0].setAttribute('x',btn.rx+15);arrText[1].setAttribute('x',btn.rx+15);
      if(arrText[1].firstChild.nodeValue=='') arrText[0].setAttribute('y',37);
      else{arrText[0].setAttribute('y',25);arrText[1].setAttribute('y',45);}
      x+=w+s;if((i+1)%qtyHor==0){x-=(w+s)*qtyHor;y+=h+s;}
  }
  // G ROBO
  var W=126.4, H=90, G=getG('gRobo',div,200-W/2,6,1,false,W/2,H/2);
  getRect(null,G,0,0,W,H,5,'transparent','url(#grdButton)',1);
  var z=0.225, p=picRobo(); getPath(null,G,W/2-p[0]*z/2,H/2-p[1]*z/2,z,'url(#grdButton)','none',0,p[2]);
  var w=50, h=20, gEye=getG('gRedEye',G,W/2-w/2,H/2-h/2,1,true,w/2,h/2);
  getCircle(null,gEye,13,15,5,'#ffaaaa','none',0);
  getCircle(null,gEye,37,15,5,'#ffaaaa','none',0);
  getText(null,G,W/2,90,18,'Arial','url(#grdButton)','none',0,'','middle');
  // G TIME
  var W=400, H=90, G=getG('gTime',div,0,6,1,false,W/2,H/2);
  var w=70, h=70, btn=getButton('btnTimeHost',G,30,10,w,h,true,'CXDX',picNone(),0,function(){},null);
  getLine(null,btn,35,6,35,12,'#eee8aa',3).setAttribute('stroke-linecap','butt');
  getLine(null,btn,32,6,38,6,'#eee8aa',5);
  getPath(null,btn,0,3,1,'transparent','url(#grdButton)',3,describeArc(35,35,25,0,359)+describeArc(35,35,5,0,359));
  var pth=getPath(null,btn,0,3,1,'transparent','url(#grdButton)',12,describeArc(35,35,15,90,359)+'M 35 50');
  pth.setAttribute('stroke-linecap','butt');
  btn.arrOn.push(['path',1,'stroke','url(#grdButton)','#eee8aa'],['path',2,'stroke','url(#grdButton)','#eee8aa']);
  var btn=getButton('btnTimeUser',G,300,10,w,h,true,'CXDX',picNone(),0,function(){},null);
  getLine(null,btn,35,6,35,12,'#eee8aa',3).setAttribute('stroke-linecap','butt');
  getLine(null,btn,32,8.5,38,8.5,'#eee8aa',5);
  getLine(null,btn,32,8.5,38,8.5,'#eee8aa',5);
  getPath(null,btn,0,3,1,'transparent','url(#grdButton)',3,describeArc(35,35,25,0,359)+describeArc(35,35,5,0,359));
  var pth=getPath(null,btn,0,3,1,'transparent','url(#grdButton)',12,describeArc(35,35,15,90,359)+'M 35 50');
  pth.setAttribute('stroke-linecap','butt');
  btn.arrOn.push(['path',1,'stroke','url(#grdButton)','#eee8aa'],['path',2,'stroke','url(#grdButton)','#eee8aa']);
  // G GO
  var w=60, h=60, s=6.4, g=getG('gGo',div,4,504,1,false,w*6+s*4,90);
  getButton(null,g,0,0,w,h,true,'AAEX',picMenu(),0.11,function(){showBox('boxGo')},null);
  var btn=getButton('btnChat',g,(w+s),0,w,h,true,'AAEX',picChatA(),0.13,function(){},null);
  mirrHor(btn);
  mirrHor(getButton('btnHistBack',g,(w+s)*4,0,w,h,true,'AAEX',picArrow(),0.1,function(){
      setHistoryShow(-1);
      setHistoryButtons();
  },null));
  btn.getElementsByTagName('path')[0].setAttribute('fill','transparent');
  var btn=getButton('btnHistFrwd',g,(w+s)*5,0,w,h,true,'AAEX',picArrow(),0.1,function(){
      setHistoryShow(+1);
      setHistoryButtons();
  },null);
  getText('txtHist',g,327,86,18,'Arial','url(#grdButton)','none',0,'','middle');
  // BOX GO
  var w=60, h=60, box=getMenu('boxGo',div,w,h,10,10,2,2,false);
  getButton(null,box,10,60,w,h,true,'BXCX',picFlag(),0.14,function(){
    showG('gTop');
    hideG('gTime');
    hideG('gRobo');
    showG('gBottom');
    hideG('gGo');
    o('gBottom').appendChild(o('btnHost'));
    hideBox('boxGo');
    chooseVar();
    OBJ_chess.strMode='standby';
  },null).blnUnlock=true;
  var btn=getButton('btnMoveBack',box,10+70,60,w,h,true,'CXEX',picArrowC(),0.11,function(){
      var d=0; // if not my turn, the opponent has not moved yet
      if(OBJ_arena.blnSide==OBJ_chess.turn) d=-1; // if my turn to move now
      if(OBJ_arena.arrHist.length-3+d>=0){
          var strFen=OBJ_arena.arrHist[OBJ_arena.arrHist.length-3+d][0];
          var arrCheck=OBJ_arena.arrHist[OBJ_arena.arrHist.length-3+d][4];
          OBJ_chess.setBoard(strFen);
          OBJ_board.putBoard();
          if(arrCheck!==false) OBJ_board.putCheck(arrCheck);
          OBJ_arena.objDrive=p4_fen2state(strFen);
          OBJ_arena.arrHist.splice(OBJ_arena.arrHist.length-2+d);
          OBJ_arena.arrHist.push(new Array('',false,false,false,false));
          setHistoryButtons();
      }
      hideBox('boxGo');
  },null);
  btn.blnUnlock=true;
  mirrHor(btn);
  getButton(null,box,10,60+70,w*2+10,h,true,'AAAX',picAgree(),0.17,function(){
    hideBox('boxGo');
  },null).blnUnlock=true;
  // BOX SIDE
  var w=60, h=60, m=10, s=10, x=m, y=60, qtyHor=3, qtyVer=1;
  var box=getMenu('boxSide',div,w,h,m,s,qtyHor,qtyVer,false);
  getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'Take your side','start');
  var btn=getButton(null,box,10,60,w,h,true,'AAAX',picNone(),0,function(){
      hideBox('boxSide');
      OBJ_arena.setSide('white');
      OBJ_arena.putSide();
  },null);
  draw_white_pawn(null,btn,(w-50)/2,(h-50)/2,1,true);
  btn.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
  btn.arrOn.push(['path',1,'stroke','url(#grdIcon)','#000']);
  var btn=getButton(null,box,10+w+s,60,w,h,true,'AAAX',picNone(),0,function(){
      hideBox('boxSide');
      OBJ_arena.setSide('black');
      OBJ_arena.putSide();
  },null);
  draw_black_pawn(null,btn,(w-50)/2,(h-50)/2,1,true);
  btn.getElementsByTagName('path')[1].setAttribute('fill','url(#grdIcon)');
  btn.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
  btn.arrOn.push(['path',1,'fill','url(#grdIcon)','#000'],['path',1,'stroke','url(#grdIcon)','#000']);
  var btn=getButton(null,box,10+(w+s)*2,60,w,h,true,'AAAX',picNone(),0,function(){
      hideBox('boxSide');
      OBJ_arena.setSide('any');
      OBJ_arena.putSide();
  },null);
  draw_white_pawn(null,btn,(w-50)/2-9,(h-50)/2,1,true);
  draw_black_pawn(null,btn,(w-50)/2+9,(h-50)/2,1,true);
  btn.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
  btn.getElementsByTagName('path')[2].setAttribute('fill','url(#grdIcon)');
  btn.getElementsByTagName('path')[2].setAttribute('stroke','url(#grdIcon)');
  btn.arrOn.push(['path',1,'stroke','url(#grdIcon)','#000'],['path',2,'fill','url(#grdIcon)','#000'],['path',2,'stroke','url(#grdIcon)','#000']);
  // BOX VS
  var box=getBox('boxVS',div,270,260,false,'#fff');
  getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'VS','start');
  var w=120, h=120, zIcon=0.35, btn=getButton('btnRobo',box,box.rx-s/2-w-1,60,w,h,true,'CXDX',picHead(),zIcon,function(){
    OBJ_arena.setVS('robo');
    OBJ_arena.putVS();
    hideBox('boxVS');
  },null);
  getPath(null,btn,10,8,zIcon,'#fff','none',0,'M 150.8125 20.53125 C 142.23166 20.649011 133.77351 21.738763 125.6875 23.9375 C 97.476949 31.608545 75.888382 40.919518 62.65625 61.46875 C 48.139048 84.013668 46.658714 118.80442 61.0625 133.34375 C 84.590096 157.0928 148.9015 132.89243 169.59375 153.90625 C 185.13814 169.69221 183.625 205.90625 183.625 205.90625 C 183.625 205.90625 203.71848 209.09576 221.21875 206.0625 C 225.28586 173.47627 250.99893 165.25705 258.90625 136.59375 C 263.84646 118.68614 262.8774 99.610612 255.71875 82.46875 C 247.2828 62.268205 225.31432 42.412494 205.625 32.84375 C 189.04438 24.785735 169.69006 20.272178 150.8125 20.53125 z');
  var z=0.1, p=picGear();
  getPath(null,btn,39,21,z,'url(#grdIcon)','none',0,p[2]);
  var pth=getPath(null,btn,66,33,z,'url(#grdIcon)','none',0,p[2]);
  pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+z+') rotate(25,'+p[0]/2+','+p[1]/2+')');
  btn.setAttribute('transform','translate('+(btn.x+btn.rx*2)+','+btn.y+') scale(-1,1)');
  btn.arrOn.push(['path',1,'fill','#fff','#bdb76d'],['path',2,'fill','url(#grdIcon)','#fff'],['path',3,'fill','url(#grdIcon)','#fff']);
  var xIcon=10, yIcon=6, btn=getButton('btnHuman',box,box.rx+s/2+1,60,w,h,true,'CXAX',picHead(),zIcon,function(){
    OBJ_arena.setVS('human');
    OBJ_arena.putVS();
    hideBox('boxVS');
  },null);
  getPath(null,btn,xIcon,yIcon,zIcon,'url(#grdBrain)','none',0,'M 149.71875,30.84375 C 139.88213,13.621626 99.966923,23.567615 104.75,42.59375 81.013503,35.786955 63.09487,59.874892 71.78125,74.5625 47.70203,84.174724 47.88273,103.19077 53.9375,117.4375 59.99836,131.69857 74.80883,144.06908 97.21875,134.375 120.06502,155.77418 142,136.0625 142,136.0625 c 0,0 23.03388,5.93899 26.40625,16.3125 4.45302,13.69731 1.4375,53.15625 1.4375,53.15625 12.1259,6.3128 26.07209,5.58737 36.03125,0.0937 0,0 -3.60519,-22.12751 5.53125,-22.40625 19.89695,-0.60702 50.01297,-21.83416 35.125,-40.5 20.34995,-0.86524 23.78991,-34.688 2.125,-43.90625 21.48307,-9.311746 -2.27502,-46.028717 -18.375,-37.65625 C 240.4482,42.907054 197.30804,22.136436 188.75,40.71875 188.51801,19.835603 159.09786,14.579847 149.71875,30.84375 z');
  pth=getPath(null,btn,xIcon,yIcon,zIcon,'#bdb76d','none',0,'M 128.875 28.34375 L 121.875 38.125 C 124.04186 39.672761 127.65321 45.172054 128.90625 51.53125 C 130.00989 57.132226 129.58595 63.130059 126.96875 68.15625 C 120.5826 71.22332 115.66776 76.022071 112.03125 80.875 C 111.805 81.17693 111.59572 81.478271 111.375 81.78125 C 108.24042 68.105692 98.786805 55.874919 87.34375 48.75 L 81 58.9375 C 94.216846 67.166853 104.03086 85.198972 99.03125 100.3125 C 89.230803 109.7786 83.631096 108.72246 79.0625 106.59375 C 74.3967 104.41975 71.34375 99.875 71.34375 99.875 L 61.1875 106.28125 C 61.1875 106.28125 65.555473 113.53408 74 117.46875 C 82.444527 121.40342 95.533839 120.76333 108.125 108.25 C 113.83019 102.58007 116.74126 94.579852 121.625 88.0625 C 126.50874 81.545148 131.8427 76.894435 141.53125 76.84375 C 151.47056 76.79175 156.47554 81.199307 159.875 85.9375 C 161.9217 88.790212 163.07296 91.607838 163.6875 93.40625 C 161.59453 95.134613 159.71847 97.175402 158.1875 99.5 C 153.67407 97.156779 148.9316 96.072932 144.28125 96.09375 C 138.3126 96.12047 132.52713 97.920598 127.6875 101.09375 C 118.00825 107.44005 111.50213 118.98439 112.21875 132.0625 L 124.1875 131.40625 C 123.71005 122.69279 128.10797 115.15209 134.25 111.125 C 140.192 107.22906 147.2189 106.42934 154.3125 111.09375 C 153.88113 117.9838 156.20761 125.71523 161.5 134.0625 L 171.625 127.625 C 166.58827 119.68095 165.76827 114.11688 166.5 110.28125 C 167.23173 106.44562 169.58027 103.58176 173.4375 101.15625 C 177.29473 98.730741 182.55056 97.092367 187.53125 96.46875 C 192.51194 95.845133 197.2979 96.314133 199.53125 97.09375 C 210.58709 100.95312 215.20982 106.28111 217 111.625 C 218.79018 116.96889 217.69672 123.1884 214.5625 128.84375 C 211.57562 134.23323 207.40385 136.94865 202.28125 140.09375 C 197.15865 143.23885 190.79142 146.78544 187.15625 154.15625 C 182.48693 163.62393 181.72877 176.44594 181.53125 187.4375 C 181.33373 198.42906 182.09375 207.46875 182.09375 207.46875 L 194.03125 206.46875 C 194.03125 206.46875 193.34579 197.97687 193.53125 187.65625 C 193.71671 177.33563 195.18327 165.05334 197.9375 159.46875 C 199.76387 155.76554 203.26323 153.54689 208.53125 150.3125 C 210.03513 149.38917 211.65463 148.37598 213.3125 147.21875 C 217.42996 147.93523 220.1266 149.11099 221.625 150.625 C 223.58919 152.60965 224.99222 156.09996 224.1875 164.28125 L 236.125 165.46875 C 237.11137 155.44064 235.35642 147.44184 230.15625 142.1875 C 228.12493 140.13502 225.79706 138.65506 223.25 137.5625 C 223.8867 136.64785 224.48938 135.69039 225.0625 134.65625 C 228.17428 129.04141 230.10337 122.53412 229.84375 115.90625 C 232.79796 115.59993 235.22145 116.11214 237.25 117.15625 C 240.57718 118.86877 243.36546 122.32683 244.96875 128 L 256.53125 124.75 C 254.25385 116.69149 249.57232 109.98024 242.75 106.46875 C 239.33884 104.71301 235.50645 103.86962 231.46875 103.875 C 229.96451 103.87686 228.42512 104.00576 226.875 104.25 C 224.9315 100.37352 222.00001 96.758947 218.09375 93.625 C 220.20058 88.440056 223.92513 85.378366 228 83.65625 C 232.77885 81.636616 238.01609 82.202824 239.625 83.15625 L 245.75 72.84375 C 242.5245 70.932345 238.85749 70.057778 235.03125 70.0625 C 231.20501 70.0672 227.22314 70.954247 223.34375 72.59375 C 217.1733 75.201502 211.27225 80.189916 207.75 87.46875 C 206.38145 86.867305 204.96472 86.303462 203.46875 85.78125 C 200.94875 84.901572 198.18061 84.402033 195.25 84.21875 C 194.70319 84.184552 194.15098 84.169149 193.59375 84.15625 C 196.32781 68.580022 205.88097 58.966879 218.90625 56.125 L 216.34375 44.375 C 197.74673 48.43253 183.93123 64.069129 181.3125 85.375 C 178.94882 85.88412 176.56293 86.560034 174.25 87.4375 C 173.25316 84.96868 171.79236 81.958377 169.625 78.9375 C 168.17114 76.911105 166.32419 74.887381 164.125 73 C 176.24997 62.39507 179.03979 45.360529 174.03125 31.21875 L 162.71875 35.25 C 166.8167 46.820683 164.30461 59.652531 152.65625 66.53125 C 149.32859 65.45824 145.60051 64.822135 141.46875 64.84375 C 141.21394 64.845083 140.9706 64.868456 140.71875 64.875 C 141.79601 59.544092 141.63056 54.132117 140.65625 49.1875 C 138.92415 40.39707 135.06655 32.766285 128.875 28.34375 z');
  pth.setAttribute('stroke-linecap','butt');
  btn.arrOn.push(['path',1,'fill','url(#grdBrain)','#bdb76d'],['path',2,'fill','#bdb76d','#fff']);
  var w=120, h=60, btn=getButton('btnFriend',box,box.rx-w/2,190,w,h,true,'CXAX',picGlad(),0.1,function(){
    OBJ_arena.setVS('friend');
    OBJ_arena.putVS();
    hideBox('boxVS');
  },null);
  var pth=btn.getElementsByTagName('path')[0]; pth.setAttribute('transform','translate('+(pth.x-25)+','+pth.y+') scale('+pth.z+')');
  var z=0.12, p=picEnvelope(); getPath(null,btn,70,btn.ry-p[1]*z/2,z,'url(#grdIcon)','none',0,p[2]);
  btn.arrOn.push(['path',1,'fill','url(#grdIcon)','#eee8aa']);
  // BOX TIME
  var w=126.4, h=60, m=10, s=10, x=m, y=60, qtyHor=2, qtyVer=4, arr=new Array(
      ['simple_delay',1,5],
      ['simple_delay',3,3],
      ['simple_delay',5,0],
      ['compensation',5,30],
      ['simple_delay',10,0],
      ['simple_delay',15,0],
      ['accumulation',15,15],
      ['simple_delay',30,0]
  );
  var box=getMenu('boxTime',div,w,h,m,s,qtyHor,qtyVer,false);
  getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'Time Control','start');
  for(var i=0;i<arr.length;i++){
      if(arr[i][0]=='simple_delay') var p=picClock(), z=0.13, dx=30;
      else if(arr[i][0]=='accumulation') var p=picHeap(), z=0.12, dx=33;
      else if(arr[i][0]=='compensation') var p=picUp(), z=0.12, dx=30;
      var btn=getButton(null,box,x,y,w,h,true,'AAAC',p,z,function(){
        OBJ_arena.setTime(this.intBase,this.intAdd,this.strClock);
        OBJ_arena.putTime();
        hideBox('boxTime');
      },'a~b');
      var pth=btn.getElementsByTagName('path')[0]; pth.setAttribute('transform','translate('+(pth.x-dx)+','+pth.y+') scale('+pth.z+')');
      if(arr[i][2]==0) var yA=37, strB='';
      else var yA=25, strB=arr[i][2]+' sec';
      var txtA=btn.getElementsByTagName('text')[0]; txtA.setAttribute('x','85'); txtA.setAttribute('y',yA); txtA.firstChild.nodeValue=arr[i][1]+' min';
      var txtB=btn.getElementsByTagName('text')[1]; txtB.setAttribute('x','85'); txtB.setAttribute('y','47'); txtB.firstChild.nodeValue=strB;
      x+=w+s;if((i+1)%qtyHor==0){x-=(w+s)*qtyHor;y+=h+s;}
      btn.arrOn.push(['text',0,'fill','url(#grdIcon)','#eee8aa'],['text',1,'fill','url(#grdIcon)','#eee8aa']);
      btn.strClock=arr[i][0];
      btn.intBase=arr[i][1]*60;
      btn.intAdd=arr[i][2]*1;
  }
  // BOX MENU
  var w=60, h=60, m=10, s=10, x=m, y=60, qtyHor=2, qtyVer=2, arr=new Array(
      [picEnter(),0.13,function(){}],
      [picBulb(),0.13,function(){}],
      [picBoot(),0.145,function(){}],
      [picHand(),0.14,function(){}]
  );
  var box=getMenu('boxMenu',div,w,h,m,s,qtyHor,qtyVer,false);
  getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'Menu','start');
  for(var i=0;i<arr.length;i++){
      getButton(null,box,x,y,w,h,true,'AAAC',arr[i][0],arr[i][1],arr[i][2],null);
      x+=w+s;if((i+1)%qtyHor==0){x-=(w+s)*qtyHor;y+=h+s;}
  }
  // BOX CONFIRM
  var box=getBox('boxConfirm',div,250,150,false,'url(#grdPale)');
  var wIcon=60, zPic=0.15, arrPic=picBin();
  var icn=getG('icnConfirm',box,1,1,1,true,wIcon/2,wIcon/2);
  getPath(null,icn,(icn.rx-arrPic[0]*zPic/2),(icn.ry-arrPic[1]*zPic/2),zPic,'url(#grdButton)','none',0,arrPic[2]);
  getText('txtConfirmA',box,box.rx,40,18,'Arial','url(#grdIcon)','none',0,'Yes or no?','middle').style.fontWeight='bold';
  getButton('btnConfirmYes',box,box.rx-70,75,60,60,true,'DXEX',picYes(),0.16,function(){
      OBJ_host.dataImage='';
      setLocal('img','');
      showBox('boxHost');
  },null);
  getButton('btnConfirmNo',box,box.rx+5,75,60,60,true,'DXEX',picNo(),0.16,function(){
      showBox('boxHost');
  },null);
  // BOX HOST
  var box=getBox('boxHost',div,0,0,false,'#fff');
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
  ////////////////////
  // BOX PROMOTE WHITE
  ////////////////////
  var w=50, h=w, s=10, ctgStyle='AXAX', arr=new Array('bishop','knight','rook','queen');
  var box=getMenu('boxPromoteWhite',div,w,h,s,s,4,1,false);
  for(var i=0;i<arr.length;i++){
      var btn=getButton(null,box,s+(w+s)*i,s,w,h,true,ctgStyle,picNone(),0,function(){
          var move=OBJ_chess.promotePawn(this.name,true);
          OBJ_board.putMove(move,this.name,!OBJ_board.blnSide);
          hideBox('boxPromoteWhite');
          changeTurn();
      },null);
      btn.name=arr[i];
      if(i==0) draw_white_bishop(null,btn,0,0,1,true);
      else if(i==1) draw_white_knight(null,btn,0,0,1,true);
      else if(i==2) draw_white_rook(null,btn,0,0,1,true);
      else if(i==3) draw_white_queen(null,btn,0,0,1,true);
      getRect(null,btn,0,0,w,h,5,'url(#Opac)','none',0);
  }
  ////////////////////
  // BOX PROMOTE BLACK
  ////////////////////
  var box=getMenu('boxPromoteBlack',div,w,h,s,s,4,1,false);
  for(var i=0;i<arr.length;i++){
      var btn=getButton(null,box,s+(w+s)*i,s,w,h,true,ctgStyle,picNone(),0,function(){
          var move=OBJ_chess.promotePawn(this.name,false);
          OBJ_board.putMove(move,this.name,!OBJ_board.blnSide);
          hideBox('boxPromoteBlack');
          changeTurn();
      },null);
      btn.name=arr[i];
      if(i==0) draw_black_bishop(null,btn,0,0,1,true);
      else if(i==1) draw_black_knight(null,btn,0,0,1,true);
      else if(i==2) draw_black_rook(null,btn,0,0,1,true);
      else if(i==3) draw_black_queen(null,btn,0,0,1,true);
      getRect(null,btn,0,0,w,h,5,'url(#Opac)','none',0);
  }
  return div;
}
// HISTORY CONTROL
function setHistoryShow(d){
	OBJ_arena.numShowMove+=d;
	var strFen=OBJ_arena.arrHist[OBJ_arena.arrHist.length-2+OBJ_arena.numShowMove][0];
	var arrCheck=OBJ_arena.arrHist[OBJ_arena.arrHist.length-2+OBJ_arena.numShowMove][4];
	OBJ_chess.setBoard(strFen);
	OBJ_board.putBoard();
	if(arrCheck!==false) OBJ_board.putCheck(arrCheck);
}
function setLatestHistory(){
	var strFen=OBJ_arena.arrHist[OBJ_arena.arrHist.length-2][0];
	OBJ_chess.setBoard(strFen);
	OBJ_board.putBoard();
	OBJ_arena.numShowMove=0;
}
function setHistoryButtons(){
	var btnBack=o('btnHistBack'), btnFrwd=o('btnHistFrwd');
	if(OBJ_arena.arrHist.length+OBJ_arena.numShowMove>2){
		btnBack.getElementsByTagName('path')[0].setAttribute('fill','#eee8aa');
		btnBack.blnLock=false;
	}
	else{
		btnBack.getElementsByTagName('path')[0].setAttribute('fill','transparent');
		btnBack.blnLock=true;
	}
	if(OBJ_arena.numShowMove<0){
		btnFrwd.getElementsByTagName('path')[0].setAttribute('fill','#eee8aa');
		btnFrwd.blnLock=false;
	}
	else{
		btnFrwd.getElementsByTagName('path')[0].setAttribute('fill','transparent');
		btnFrwd.blnLock=true;
	}
}
