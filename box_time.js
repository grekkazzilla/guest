function getBoxTime(gRoot){
  var box=getBox('boxTime',gRoot,392,392,false,'#fff');
  getText(null,box,10,35,18,'Arial','url(#grdButton)','none',0,'Time control :','start');
  getToggle(null,box,137,8,300/5,210/5,function(){},'increment',68,27,'start');
  var m=10, w=89, s=5, y=20;
  // head
  var g=getG('gStageHead',box,0,60,1,true,box.rx,30);
  getRect(null,g,m,0,w,60*2+s,5,'transparent','#d0d0d0',1);
  getRect(null,g,m+(w+s)*1,0,w,60,5,'transparent','#d0d0d0',1);
  getRect(null,g,m+(w+s)*2,0,w,60,5,'transparent','#d0d0d0',1);
  getRect(null,g,m+(w+s)*3,0,w,60,5,'transparent','#d0d0d0',1);
  getText(null,g,54,35,18,'Arial','url(#grdIcon)','none',0,'Stage','middle');
  getText(null,g,54+(w+s)*1,27,18,'Arial','url(#grdIcon)','none',0,'Base','middle');
  getText(null,g,54+(w+s)*1,47,18,'Arial','url(#grdIcon)','none',0,'Time','middle');
  getText(null,g,54+(w+s)*2,35,18,'Arial','url(#grdIcon)','none',0,'Delay','middle');
  getText(null,g,54+(w+s)*3,35,18,'Arial','url(#grdIcon)','none',0,'Moves','middle');
  //  stage A
  var g=getG('gStageA',box,0,125,1,true,box.rx,30);
  getButton(null,g,m+(w+s)*1,0,w,60,true,'AAAD',picNone(),0.12,function(){},'120~min');
  getButton(null,g,m+(w+s)*2,0,w,60,true,'AAAD',picNone(),0,function(){},'15~sec');
  getButton(null,g,m+(w+s)*3,0,w,60,true,'AAAE',picNone(),0,function(){},'60');
  //  stage B
  var g=getG('gStageB',box,0,190,1,true,box.rx,30);
  getRect(null,g,m,0,w,60,5,'transparent','#d0d0d0',1);
  getToggle(null,g,23,8,300/5,210/5,function(){},'',0,0,'start');
  getButton(null,g,m+(w+s)*1,0,w,60,true,'AAAD',picNone(),0.12,function(){},'60~min');
  getButton(null,g,m+(w+s)*2,0,w,60,true,'AAAD',picNone(),0,function(){},'15~sec');
  getButton(null,g,m+(w+s)*3,0,w,60,true,'AAAE',picNone(),0,function(){},'40');
  //  stage C
  var g=getG('gStageB',box,0,255,1,true,box.rx,30);
  getRect(null,g,m,0,w,60,5,'transparent','#d0d0d0',1);
  getToggle(null,g,23,8,300/5,210/5,function(){},'',0,0,'start');
  getButton(null,g,m+(w+s)*1,0,w,60,true,'AAAD',picNone(),0.12,function(){},'30~min');
  getButton(null,g,m+(w+s)*2,0,w,60,true,'AAAD',picNone(),0,function(){},'15~sec');
  getButton(null,g,m+(w+s)*3,0,w,60,true,'AAAD',picNone(),0,function(){},'Until~End');

  var m=10;


  //
  var gSlide=getG('gSlideBaseTime',box,1,160,1,false,194,25);
  //

  var w=70;
  //getToggle(null,box,10+(w+10)*4-5,83,300/5,210/5,function(){},'add',30,60,'middle');
  //
  //btn.getElementsByTagName('text')[0].setAttribute('y','27');btn.getElementsByTagName('text')[1].setAttribute('y','47');
  //btn.getElementsByTagName('text')[0].setAttribute('fill','#eee8aa');
  //btn.getElementsByTagName('text')[1].setAttribute('fill','#eee8aa');
  //btn.getElementsByTagName('rect')[0].setAttribute('fill','#bdb76d');
  //btn.getElementsByTagName('rect')[1].setAttribute('stroke','#eee8aa');
  //var btn=getButton(null,box,10+w+10,87,w,60,true,'AAAC',picNone(),0.12,function(){},'for 40~moves');
  //btn.getElementsByTagName('text')[0].setAttribute('y','27');btn.getElementsByTagName('text')[1].setAttribute('y','47');
  //var btn=getButton(null,box,10+(w+10)*2,87,w,60,true,'AAAC',picNone(),0.12,function(){},'+15~sec');
  //btn.getElementsByTagName('text')[0].setAttribute('y','27');btn.getElementsByTagName('text')[1].setAttribute('y','47');
  //getButton(null,box,10+(w+10)*3,87,w,60,true,'AAAX',picClock(),0.13,function(){},null);

  //
  getText(null,gSlide,15,-93,18,'Arial','transparent','none',0,'Base time : ','start');
  //getText(null,gSlide,15,-90,18,'Arial','url(#grdIcon)','none',0,'Base time by moves :','start');
  var pth=getPath(null,gSlide,0,0,1,'transparent','#808080',3,'M 25.21875 5.71875 C 15.17045 6.235763 7.125 14.689729 7.125 25 C 7.125 35.64286 15.6875 44.28125 26.1875 44.28125 L 360.78125 44.28125 C 371.56696 44.28125 380.28125 35.64286 380.28125 25 C 380.28125 14.35714 371.56696 5.71875 360.78125 5.71875 L 26.1875 5.71875 C 25.85937 5.71875 25.54289 5.70207 25.21875 5.71875 z');
  pth.setAttribute('filter','url(#blr2)');
  getPath(null,gSlide,0,0,1,'#fff','none',0,'M 8.90625 0 C 3.97601 0 0 4.84975 0 10.875 L 0 39.125 C 0 45.15024 3.97601 50 8.90625 50 L 378.53125 50 C 383.46149 50 387.4375 45.15024 387.4375 39.125 L 387.4375 10.875 C 387.4375 4.84975 383.46149 0 378.53125 0 L 8.90625 0 z M 25.21875 5.71875 C 25.54289 5.70207 25.85937 5.71875 26.1875 5.71875 L 360.78125 5.71875 C 371.56696 5.71875 380.28125 14.35714 380.28125 25 C 380.28125 35.64286 371.56696 44.28125 360.78125 44.28125 L 26.1875 44.28125 C 15.6875 44.28125 7.125 35.64286 7.125 25 C 7.125 14.689729 15.17045 6.235763 25.21875 5.71875 z');
  var btnSlide=getG('btnSlideBaseTime',gSlide,box.rx*2-20-40,0,1,true,18,25);
  getRect(null,btnSlide,0,0,36,50,10,'url(#grdButton)','#bdb76d',0.5);
  getCircle(null,btnSlide,18,25,13,'url(#grdButtonRvs)','none',0);
  btnSlide.blnHold=false;
  var arr=new Array(0,0.25,0.5,0.75,1,2,3,4,5,6,7,8,9,10,15,20,25,30,45,60,90,120,150,180);
  gSlide.len=arr.length;
  var mRct=20, wRct=(gSlide.rx*2-mRct*2)/arr.length;
  var rct=getRect(null,gSlide,0,0,mRct,50,0,'transparent','none',0);
  rct.onmousedown=function(){putBaseTime(o('rctSlideBaseTime0'));}
  rct.onmouseup=function(){o('btnSlideBaseTime').blnHold=false;}
  for(var i=0;i<arr.length;i++){
    var rct=getRect('rctSlideBaseTime'+i,gSlide,(mRct+i*wRct),0,wRct,50,0,'transparent','none',0);
    rct.onmousedown=function(){
      o('btnSlideBaseTime').blnHold=true;
      putBaseTime(this);
    }
    rct.onmouseover=function(){
      if(o('btnSlideBaseTime').blnHold===true){
        putBaseTime(this);
      }
    }
    rct.onmouseup=function(){o('btnSlideBaseTime').blnHold=false;}
    rct.val=arr[i]*60;
    rct.ctg='slide';
  }
  var rct=getRect(null,gSlide,gSlide.rx*2-mRct,0,mRct,50,0,'transparent','none',0);
  rct.onmousedown=function(){putBaseTime(o('rctSlideBaseTime'+(this.parentNode.len-1)));}
  rct.onmouseup=function(){o('btnSlideBaseTime').blnHold=false;}
  //
  var gSlide=getG('gSlideAddTime',box,1,330,1,true,194,25);
  getText(null,gSlide,15,-10,18,'Arial','transparent','none',0,'Per move : ','start');
  var pth=getPath(null,gSlide,0,0,1,'transparent','#808080',3,'M 25.21875 5.71875 C 15.17045 6.235763 7.125 14.689729 7.125 25 C 7.125 35.64286 15.6875 44.28125 26.1875 44.28125 L 360.78125 44.28125 C 371.56696 44.28125 380.28125 35.64286 380.28125 25 C 380.28125 14.35714 371.56696 5.71875 360.78125 5.71875 L 26.1875 5.71875 C 25.85937 5.71875 25.54289 5.70207 25.21875 5.71875 z');
  pth.setAttribute('filter','url(#blr2)');
  getPath(null,gSlide,0,0,1,'#fff','none',0,'M 8.90625 0 C 3.97601 0 0 4.84975 0 10.875 L 0 39.125 C 0 45.15024 3.97601 50 8.90625 50 L 378.53125 50 C 383.46149 50 387.4375 45.15024 387.4375 39.125 L 387.4375 10.875 C 387.4375 4.84975 383.46149 0 378.53125 0 L 8.90625 0 z M 25.21875 5.71875 C 25.54289 5.70207 25.85937 5.71875 26.1875 5.71875 L 360.78125 5.71875 C 371.56696 5.71875 380.28125 14.35714 380.28125 25 C 380.28125 35.64286 371.56696 44.28125 360.78125 44.28125 L 26.1875 44.28125 C 15.6875 44.28125 7.125 35.64286 7.125 25 C 7.125 14.689729 15.17045 6.235763 25.21875 5.71875 z');
  var btnSlide=getG('btnSlideAddTime',gSlide,box.rx*2-20-40,0,1,true,18,25);
  getRect(null,btnSlide,0,0,36,50,10,'url(#grdButton)','#bdb76d',0.5);
  getCircle(null,btnSlide,18,25,13,'url(#grdButtonRvs)','none',0);
  btnSlide.blnHold=false;
  var arr=new Array(0,1,2,3,4,5,6,7,8,9,10,15,20,25,30,45,60,90,120,150,180);
  gSlide.len=arr.length;
  var mRct=20, wRct=(gSlide.rx*2-mRct*2)/arr.length;
  var rct=getRect(null,gSlide,0,0,mRct,50,0,'transparent','none',0);
  rct.onmousedown=function(){putAddTime(o('rctSlideAddTime0'));}
  rct.onmouseup=function(){o('btnSlideAddTime').blnHold=false;}
  for(var i=0;i<arr.length;i++){
    var rct=getRect('rctSlideAddTime'+i,gSlide,(mRct+i*wRct),0,wRct,50,0,'transparent','none',0);
    rct.onmousedown=function(){
      o('btnSlideAddTime').blnHold=true;
      putAddTime(this);
    }
    rct.onmouseover=function(){
      if(o('btnSlideAddTime').blnHold===true){
        putAddTime(this);
      }
    }
    rct.onmouseup=function(){o('btnSlideAddTime').blnHold=false;}
    rct.val=arr[i];
    rct.ctg='slide';
  }
  var rct=getRect(null,gSlide,gSlide.rx*2-mRct,0,mRct,50,0,'transparent','none',0);
  rct.onmousedown=function(){putAddTime(o('rctSlideAddTime'+(this.parentNode.len-1)));}
  rct.onmouseup=function(){o('btnSlideAddTime').blnHold=false;}
  //
  var s=5;
  var btn=getButton('btnSimpleDelay',box,m,box.ry*2-60-m,60,60,false,'AAAX',picClock(),0.13,function(){},null);
  btn.getElementsByTagName('rect')[0].setAttribute('fill','#bdb76d');
  btn.getElementsByTagName('rect')[1].setAttribute('stroke','#eee8aa');
  btn.getElementsByTagName('path')[0].setAttribute('fill','#eee8aa');
  var btn=getButton('btnAccumulation',box,m+60+s,box.ry*2-60-m,60,60,false,'AAAX',picHeap(),0.12,function(){},null);

  getButton('btnCompensation',box,m+(60+s)*2,box.ry*2-60-m,60,60,false,'AAAX',picUp(),0.12,function(){},null);

  //var btn=getButton('btnAddTimeAfterMoveB',box,m+(60+s)*3+60*1.45+s,box.ry*2-60-m,60*1.45,60,true,'AAAC',picNone(),0.12,function(){},'ADD~TIME');
  //btn.getElementsByTagName('text')[0].setAttribute('y','27');btn.getElementsByTagName('text')[1].setAttribute('y','47');
  /*var g=getG('gAfterMoveButton',box,60,170,1,true,0,0);
  getText(null,g,-40,0,18,'Arial','url(#grdIcon)','none',0,'After moves :','start');
  var btn=getButton(null,g,0,20,60,60,true,'AAAC',picNone(),0.12,function(){},'5');
  btn.getElementsByTagName('text')[0].setAttribute('y','37');
  var btn=getButton(null,g,70,20,60,60,true,'AAAC',picNone(),0.12,function(){},'10');
  btn.getElementsByTagName('text')[0].setAttribute('y','37');
  var btn=getButton(null,g,140,20,60,60,true,'AAAC',picNone(),0.12,function(){},'15');
  btn.getElementsByTagName('text')[0].setAttribute('y','37');
  var btn=getButton(null,g,210,20,60,60,true,'AAAC',picNone(),0.12,function(){},'20');
  btn.getElementsByTagName('text')[0].setAttribute('y','37');

  var btn=getButton(null,g,0,90,60,60,true,'AAAC',picNone(),0.12,function(){},'25');
  btn.getElementsByTagName('text')[0].setAttribute('y','37');
  var btn=getButton(null,g,70,90,60,60,true,'AAAC',picNone(),0.12,function(){},'30');
  btn.getElementsByTagName('text')[0].setAttribute('y','37');
  var btn=getButton(null,g,140,90,60,60,true,'AAAC',picNone(),0.12,function(){},'35');
  btn.getElementsByTagName('text')[0].setAttribute('y','37');
  var btn=getButton(null,g,210,90,60,60,true,'AAAC',picNone(),0.12,function(){},'40');
  btn.getElementsByTagName('text')[0].setAttribute('y','37');*/

}
