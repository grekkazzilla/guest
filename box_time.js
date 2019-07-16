function drawTimeHead(gRoot){
 var g=getG('gTimeHead',gRoot,0,0,1,true,OBJ.w/2,28);
 getRect(null,g,0,0,g.rx*2,g.ry*2,0,'transparent','#000',0);
 getText(null,g,g.rx,g.ry*1.25,18,'Arial','url(#grdIcon)','none',0,'Time control','middle');
}
function drawTimeBox(gRoot){
  var box=getBox('boxTime',gRoot,392,392,false,'#fff');
  box.arrBase=new Array(0,15,30,45,60,120,180,240,300,360,420,480,540,600,900,1200,1500,1800,45*60,60*60,90*60,100*60,120*60,180*60);
  box.arrDelay=new Array(0,1,2,3,4,5,6,7,8,9,10,15,20,25,30,45,60,90,100,120,180);
  box.arrMove=new Array(5,10,15,20,25,30,35,40,45,50,55,60,65,1000);
  getText(null,box,10,35,18,'Arial','url(#grdButton)','none',0,'Time control','start');
  getToggle(null,box,137,8,300/5,210/5,function(){},'increment',68,27,'start');
  var m=10, w=89, h=60, s=5, y=20;
  // head
  var g=getG('gStageHead',box,0,h,1,true,box.rx,30);
  getRect(null,g,m,0,w,h*2+s,5,'transparent','#d0d0d0',1);
  getRect(null,g,m+(w+s)*1,0,w,h,5,'transparent','#d0d0d0',1);
  getRect(null,g,m+(w+s)*2,0,w,h,5,'transparent','#d0d0d0',1);
  getRect(null,g,m+(w+s)*3,0,w,h,5,'transparent','#d0d0d0',1);
  getText(null,g,54,35,18,'Arial','url(#grdIcon)','none',0,'Stage','middle');
  getText(null,g,54+(w+s)*1,27,18,'Arial','url(#grdIcon)','none',0,'Base','middle');
  getText(null,g,54+(w+s)*1,47,18,'Arial','url(#grdIcon)','none',0,'Time','middle');
  getText(null,g,54+(w+s)*2,35,18,'Arial','url(#grdIcon)','none',0,'Delay','middle');
  getText(null,g,54+(w+s)*3,35,18,'Arial','url(#grdIcon)','none',0,'Moves','middle');
  //  stage A
  var g=getG('gStageA',box,0,125,1,true,box.rx,30);
  getButton('btnBaseA',g,m+(w+s)*1,0,w,h,true,'AAAD',picNone(),0,function(){onTimeButton(this);},'x~x').arrSlide=box.arrBase;
  getButton('btnDelayA',g,m+(w+s)*2,0,w,h,true,'AAAD',picNone(),0,function(){onTimeButton(this);},'x~x').arrSlide=box.arrDelay;
  getButton('btnMoveA',g,m+(w+s)*3,0,w,h,true,'AAAD',picNone(),0,function(){onTimeButton(this);},'x~x').arrSlide=box.arrMove;
  //  stage B
  var g=getG('gStageB',box,0,190,1,true,box.rx,30);
  getRect(null,g,m,0,w,60,5,'transparent','#d0d0d0',1);
  getToggle('tglTimeStageB',g,23,8,300/5,210/5,function(){
    var objArena=OBJ_arena.arr[OBJ_arena.numOn];
    if(this.blnOn===true){
      objArena.intMoveB=1000;
      objArena.intBaseB=1800;
      objArena.intDelayB=0;
      if(objArena.intMoveA==1000) objArena.intMoveA=40;
    }
    else{
      objArena.intMoveB=0;
      if(objArena.intMoveA<1000) objArena.intMoveA=1000;
      if(objArena.intMoveC>0) objArena.intMoveC=0;
    }
    putTime();
  },'',0,0,'start');
  getButton('btnBaseB',g,m+(w+s)*1,0,w,h,true,'AAAD',picNone(),0,function(){onTimeButton(this);},'x~x').arrSlide=box.arrBase;
  getButton('btnDelayB',g,m+(w+s)*2,0,w,h,true,'AAAD',picNone(),0,function(){onTimeButton(this);},'x~x').arrSlide=box.arrDelay;
  getButton('btnMoveB',g,m+(w+s)*3,0,w,h,true,'AAAD',picNone(),0,function(){onTimeButton(this);},'x~x').arrSlide=box.arrMove;
  //  stage C
  var g=getG('gStageC',box,0,255,1,true,box.rx,30);
  getRect(null,g,m,0,w,60,5,'transparent','#d0d0d0',1);
  getToggle('tglTimeStageC',g,23,8,300/5,210/5,function(){
    var objArena=OBJ_arena.arr[OBJ_arena.numOn];
    if(this.blnOn===true){
      objArena.intMoveC=1000;
      objArena.intBaseC=900;
      objArena.intDelayC=0;
      if(objArena.intMoveA==1000) objArena.intMoveA=40;
      if(objArena.intMoveB==1000 || objArena.intMoveB==0) objArena.intMoveB=20;
    }
    else{
      objArena.intMoveC=0;
      if(objArena.intMoveB<1000) objArena.intMoveB=1000;
    }
    putTime();
  },'',0,0,'start');
  getButton('btnBaseC',g,m+(w+s)*1,0,w,h,true,'AAAD',picNone(),0,function(){onTimeButton(this);},'x~x').arrSlide=box.arrBase;
  getButton('btnDelayC',g,m+(w+s)*2,0,w,h,true,'AAAD',picNone(),0,function(){onTimeButton(this);},'x~x').arrSlide=box.arrDelay;
  getButton('btnMoveC',g,m+(w+s)*3,0,w,h,true,'AAAD',picNone(),0,function(){onTimeButton(this);},'x~x').arrSlide=box.arrMove;
  //
  box.btnOn=o('btnBaseA');
  //
  var gSlide=getG('gTimeSlide',box,1,330,1,true,194,25);
  var pth=getPath(null,gSlide,0,0,1,'transparent','#808080',3,'M 25.21875 5.71875 C 15.17045 6.235763 7.125 14.689729 7.125 25 C 7.125 35.64286 15.6875 44.28125 26.1875 44.28125 L 360.78125 44.28125 C 371.56696 44.28125 380.28125 35.64286 380.28125 25 C 380.28125 14.35714 371.56696 5.71875 360.78125 5.71875 L 26.1875 5.71875 C 25.85937 5.71875 25.54289 5.70207 25.21875 5.71875 z');
  pth.setAttribute('filter','url(#blr2)');
  getPath(null,gSlide,0,0,1,'#fff','none',0,'M 8.90625 0 C 3.97601 0 0 4.84975 0 10.875 L 0 39.125 C 0 45.15024 3.97601 50 8.90625 50 L 378.53125 50 C 383.46149 50 387.4375 45.15024 387.4375 39.125 L 387.4375 10.875 C 387.4375 4.84975 383.46149 0 378.53125 0 L 8.90625 0 z M 25.21875 5.71875 C 25.54289 5.70207 25.85937 5.71875 26.1875 5.71875 L 360.78125 5.71875 C 371.56696 5.71875 380.28125 14.35714 380.28125 25 C 380.28125 35.64286 371.56696 44.28125 360.78125 44.28125 L 26.1875 44.28125 C 15.6875 44.28125 7.125 35.64286 7.125 25 C 7.125 14.689729 15.17045 6.235763 25.21875 5.71875 z');
  var btnSlide=getG('btnTimeSlide',gSlide,box.rx*2-20-40,0,1,true,18,25);
  getRect(null,btnSlide,0,0,36,50,10,'url(#grdButton)','#bdb76d',0.5);
  getCircle(null,btnSlide,18,25,13,'url(#grdButtonRvs)','none',0);
  btnSlide.blnHold=false;
  var mRct=20;
  var rct=getRect(null,gSlide,0,0,mRct,50,0,'transparent','green',0);
  rct.onmousedown=function(){setTime(o('rctTimeSlide0'));}
  rct.onmouseup=function(){o('btnTimeSlide').blnHold=false;}
  gSlide.arr=new Array();
  for(var i=0;i<300;i++){
    var rct=getRect('rctTimeSlide'+i,gSlide,-9999,0,0,50,0,'transparent','red',0);
    gSlide.arr.push(rct);
    rct.onmousedown=function(){
      o('btnTimeSlide').blnHold=true;
      setTime(this);
    }
    rct.onmouseover=function(){
      if(o('btnTimeSlide').blnHold===true){
        setTime(this);
      }
    }
    rct.onmouseup=function(){o('btnTimeSlide').blnHold=false;}
  }
  var rct=getRect(null,gSlide,gSlide.rx*2-mRct,0,mRct,50,0,'transparent','green',0);
  rct.onmousedown=function(){
    setTime(o('rctTimeSlide'+(o('boxTime').btnOn.arrSlide.length-1)));
  }
  rct.onmouseup=function(){o('btnTimeSlide').blnHold=false;}
}
function setTime(rct){
  var box=o('boxTime');
  var btn=box.btnOn;
  var val=rct.val;
  if(btn.id.substr(0,7)=='btnBase'){
   if(btn.id.substr(7,1)=='A') OBJ_arena.arr[OBJ_arena.numOn].intBaseA=val;
   else if(btn.id.substr(7,1)=='B') OBJ_arena.arr[OBJ_arena.numOn].intBaseB=val;
   else if(btn.id.substr(7,1)=='C') OBJ_arena.arr[OBJ_arena.numOn].intBaseC=val;
  }
  else if(btn.id.substr(0,8)=='btnDelay'){
   if(btn.id.substr(8,1)=='A') OBJ_arena.arr[OBJ_arena.numOn].intDelayA=val;
   else if(btn.id.substr(8,1)=='B') OBJ_arena.arr[OBJ_arena.numOn].intDelayB=val;
   else if(btn.id.substr(8,1)=='C') OBJ_arena.arr[OBJ_arena.numOn].intDelayC=val;
  }
  else if(btn.id.substr(0,7)=='btnMove'){
   if(btn.id.substr(7,1)=='A'){
     OBJ_arena.arr[OBJ_arena.numOn].intMoveA=val;
     if(val==1000){
       OBJ_arena.arr[OBJ_arena.numOn].intMoveB=0;
       OBJ_arena.arr[OBJ_arena.numOn].intMoveC=0;
       putTime();
     }
   }
   else if(btn.id.substr(7,1)=='B') OBJ_arena.arr[OBJ_arena.numOn].intMoveB=val;
   else if(btn.id.substr(7,1)=='C') OBJ_arena.arr[OBJ_arena.numOn].intMoveC=val;
  }
  putTimeSlide(rct);
}
function putTime(){
  var numOn=OBJ_arena.numOn;
  var objArena=OBJ_arena.arr[numOn];
  // head
  var strBaseA=objArena.intBaseA/60;
  var strDelayA=objArena.intDelayA;
  var strMoveA=objArena.intMoveA;
  if(strMoveA==1000) strMoveA='G';
  var strA=strMoveA+'/'+strBaseA+'+'+strDelayA;
  var txt=o('gTimeHead').getElementsByTagName('text')[0];
  txt.firstChild.nodeValue=strA;
  // box
  var ggg=o('gStageA').getElementsByTagName('g');
  var btnBaseA=ggg[0], btnDelayA=ggg[2], btnMoveA=ggg[4];
  btnBaseA.val=objArena.intBaseA;
  btnDelayA.val=objArena.intDelayA;
  btnMoveA.val=objArena.intMoveA;
  putTimeButton(btnBaseA,objArena.intBaseA);
  putTimeButton(btnDelayA,objArena.intDelayA);
  putTimeButton(btnMoveA,objArena.intMoveA);
  //
  var ggg=o('gStageB').getElementsByTagName('g');
  var btnBaseB=ggg[2], btnDelayB=ggg[4], btnMoveB=ggg[6];
  if(objArena.intMoveB==0){
    pushToggle('tglTimeStageB',false);
    offTimeButton(['btnMoveB','btnBaseB','btnDelayB']);
  }
  else{
   pushToggle('tglTimeStageB',true);
   outTimeButton(['btnMoveB','btnBaseB','btnDelayB']);
   btnBaseB.val=objArena.intBaseB;
   btnDelayB.val=objArena.intDelayB;
   btnMoveB.val=objArena.intMoveB;
   putTimeButton(btnBaseB,objArena.intBaseB);
   putTimeButton(btnDelayB,objArena.intDelayB);
   putTimeButton(btnMoveB,objArena.intMoveB);
  }
  //
  var ggg=o('gStageC').getElementsByTagName('g');
  var btnBaseB=ggg[2], btnDelayB=ggg[4], btnMoveB=ggg[6];
  if(objArena.intMoveC==0){
    pushToggle('tglTimeStageC',false);
    offTimeButton(['btnMoveC','btnBaseC','btnDelayC']);
  }
  else{
   pushToggle('tglTimeStageC',true);
   outTimeButton(['btnMoveC','btnBaseC','btnDelayC']);
   btnBaseC.val=objArena.intBaseC;
   btnDelayC.val=objArena.intDelayC;
   btnMoveC.val=objArena.intMoveC;
   putTimeButton(btnBaseC,objArena.intBaseC);
   putTimeButton(btnDelayC,objArena.intDelayC);
   putTimeButton(btnMoveC,objArena.intMoveC);
  }
}
function putTimeSlide(rct){
 var btnSlide=o('btnTimeSlide');
 var btnOn=o('boxTime').btnOn;
 btnSlide.setAttribute('transform','translate('+(rct.getAttribute('x')*1+rct.getAttribute('width')*1/2-btnSlide.rx)+','+btnSlide.y+')');
 putTimeButton(btnOn,rct.val);
}
function putTimeButton(btn,val){
 var strA='', strB='', y=27;
 if(btn.id.substr(0,7)=='btnBase'){
  if(val<60) strA=val, strB='sec';
  else strA=val/60, strB='min';
 }
 else if(btn.id.substr(0,8)=='btnDelay'){
  strA=val, strB='sec';
 }
 else if(btn.id.substr(0,7)=='btnMove'){
  if(val<1000) strA=val, strB='', y=37;
  else strA='All', strB='Game';
 }
 btn.getElementsByTagName('text')[0].firstChild.nodeValue=strA;
 btn.getElementsByTagName('text')[1].firstChild.nodeValue=strB;
 btn.getElementsByTagName('text')[0].setAttribute('y',y);
 btn.val=val;
}
function onTimeButton(btn){
  btn.getElementsByTagName('rect')[0].setAttribute('fill','url(#grdIcon)');
  btn.getElementsByTagName('rect')[1].setAttribute('stroke','url(#grdIconRvs)');
  btn.getElementsByTagName('text')[0].setAttribute('fill','#fff');
  btn.getElementsByTagName('text')[1].setAttribute('fill','#fff');
  btn.arrOn[0]=['rect',0,'fill','url(#grdIcon)','#000'];
  btn.arrOn[1]=['rect',1,'stroke','url(#grdIconRvs)','#fff'];
  btn.arrOn[3]=['text',0,'fill','#fff','#fff'];
  btn.arrOn[4]=['text',1,'fill','#fff','#fff'];
  var box=o('boxTime');
  if(btn!=box.btnOn){
   outTimeButton([box.btnOn])
   box.btnOn=btn;
  }
  //
  var gSlide=o('gTimeSlide');
  var btnSlide=o('btnTimeSlide');
  var arr=btn.arrSlide
  var mRct=20, wRct=(gSlide.rx*2-mRct*2)/arr.length;
  for(var i=0;i<gSlide.arr.length;i++){
   var rct=o('rctTimeSlide'+i);
   if(i<arr.length){
     rct.setAttribute('width',wRct);
     rct.setAttribute('x',(mRct+i*wRct));
     rct.val=arr[i];
     if(rct.val==btn.val){
      putTimeSlide(rct);
     }
   }
   else{
     rct.setAttribute('width','0');
     rct.setAttribute('x','-9999');
   }
  }
}
function outTimeButton(arr){
 for(var i=0;i<arr.length;i++){
  var btn=arr[i];
  if(typeof(btn)=='string') btn=o(btn);
  btn.getElementsByTagName('rect')[0].setAttribute('fill','url(#grdButton)');
  btn.getElementsByTagName('rect')[1].setAttribute('stroke','url(#grdButtonRvs)');
  btn.getElementsByTagName('text')[0].setAttribute('fill','url(#grdIcon)');
  btn.getElementsByTagName('text')[1].setAttribute('fill','#000');
  btn.arrOn[0]=['rect',0,'fill','url(#grdButton)','#bdb76d'];
  btn.arrOn[1]=['rect',1,'stroke','url(#grdButtonRvs)','#eee8aa'];
  btn.arrOn[3]=['text',0,'fill','url(#grdIcon)','#eee8aa'];
  btn.arrOn[4]=['text',1,'fill','#000','#eee8aa'];
  if(btn.blnLock===true) btn.blnLock=false;
 }
}
function offTimeButton(arr){
 var box=o('boxTime');
 for(var i=0;i<arr.length;i++){
  var btn=o(arr[i]);
  if(box.btnOn==btn) onTimeButton(o('btnBaseA'));
  btn.getElementsByTagName('rect')[0].setAttribute('fill','url(#grdSilver)');
  btn.getElementsByTagName('rect')[1].setAttribute('stroke','url(#grdSilverRvs)');
  btn.getElementsByTagName('text')[0].setAttribute('fill','#a0a0a0');
  btn.getElementsByTagName('text')[1].setAttribute('fill','#808080');
  btn.getElementsByTagName('text')[0].setAttribute('y','37');
  btn.getElementsByTagName('text')[0].firstChild.nodeValue='0';
  btn.getElementsByTagName('text')[1].firstChild.nodeValue='';
  btn.blnLock=true;
 }
}
