function getForm(gRoot){
  var div=getG('divForm',gRoot,0,0,1,false,OBJ.w/2,OBJ.h/2);
  var blnTouch=isTouch();
  var frm=getG('frmWrite',div,5,95,1,true,0,0);
  getRect(null,frm,0,0,389,150,15,'#808080','none',0).setAttribute('filter','url(#blr3)');
  getRect(null,frm,13,21,298,42,15,'#ffffff','#808080',2).setAttribute('filter','url(#blr2)');
  getRect(null,frm,13,86,298,42,15,'#ffffff','#808080',2).setAttribute('filter','url(#blr2)');
  getPath(null,frm,0,0,1,'#eee8aa','none',0,'M 15 0 C 6.69 0 0 6.69 0 15 L 0 135 C 0 143.31 6.69 150 15 150 L 374 150 C 382.31 150 389 143.31 389 135 L 389 15 C 389 6.69 382.31 0 374 0 L 15 0 z M 27.46875 20.875 L 297.0625 20.875 C 305.3725 20.875 312.0625 27.565 312.0625 35.875 L 312.0625 47.15625 C 312.0625 55.46625 305.3725 62.15625 297.0625 62.15625 L 27.46875 62.15625 C 19.15875 62.15625 12.46875 55.46625 12.46875 47.15625 L 12.46875 35.875 C 12.46875 27.565 19.15875 20.875 27.46875 20.875 z M 27.46875 86.125 L 297.0625 86.125 C 305.3725 86.125 312.0625 92.815 312.0625 101.125 L 312.0625 112.4375 C 312.0625 120.7475 305.3725 127.4375 297.0625 127.4375 L 27.46875 127.4375 C 19.15875 127.4375 12.46875 120.7475 12.46875 112.4375 L 12.46875 101.125 C 12.46875 92.815 19.15875 86.125 27.46875 86.125 z');
  getInput('inp00',13,21,298,42,frm);
  getInput('inp01',13,86,298,42,frm);
  // ICN ENTER
  var z=0.19, p=picEnter();
  var icn=getG('icnLogIn',div,(400-p[0]*z)/2-35,15,1,false,0,0);
  var pth=getPath(null,icn,0,0,z,'url(#grdButton)','none',0,p[2]);
  // ICN USER
  var z=0.18, p=picUser();
  var icn=getG('icnNewReg',div,(400-p[0]*z)/2+32,15,1,false,0,0);
  getPath(null,icn,0,0,z,'url(#grdButton)','none',0,p[2]);
  // ICN FIND
  var z=0.22, p=picMagni();
  var icn=getG('icnFind',div,(400-p[0]*z)/2,12,1,false,0,0);
  getPath(null,icn,0,0,z,'url(#grdButton)','none',0,p[2]);
  // ICN NAME
  var z=0.18, p=picPenA();
  var icn=getG('icnName',div,(400-p[0]*z)/2,18,1,false,0,0);
  getPath(null,icn,0,0,z,'url(#grdButton)','none',0,p[2]);
  // BUTTON LOGIN && NEWREG
  var arr=new Array(
      ['btnLogIn',-1,picEnter(),0.14,function(){
          hideG('btnLogIn');
          hideG('icnNewReg');
          showG('icnLogIn');
          showG('btnNewReg');
          o('frmWrite').ctg='login';
      }],
      ['btnNewReg',+1,picUser(),0.13,function(){
          hideG('icnLogIn');
          hideG('btnNewReg');
          showG('btnLogIn');
          showG('icnNewReg');
          o('frmWrite').ctg='newreg';
      }]
  );
  for(var i=0;i<arr.length;i++) getButton(arr[i][0],div,(400-60)/2+35*arr[i][1],12,60,60,true,'AAAX',arr[i][2],arr[i][3],arr[i][4],null);
  // G HIDER
  var g=getG('gHide',frm,10,84,1,false,0,0);
  getRect(null,g,0,0,302,46,0,'#eee8aa','none',0);
  getText(null,g,151,22,18,'Arial','#bdb76d','none',0,'three chars at least required','middle');
  getText(null,g,151,43,18,'Arial','#bdb76d','none',0,'then push yes button','middle');
  // BTN CLOSE & SUBMIT
  var w=60, h=w, arr=new Array(
      ['btnCloseForm',10,picNo(),function(){
          clearInterval(o('spnCursor').tmr);
          showDiv('divArena');
      }],
      ['btnSubForm',80,picYes(),function(){
          clearInterval(o('spnCursor').tmr);
          //OBJ.blnLock=true;
          //var z=0.45;hideG(this.getElementsByTagName('g')[0]);drawLoad(o('gLoad'),'url(#grdPale)',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,this);
          var frm=o('frmWrite');
          var str00=o('inp00').getElementsByTagName('text')[1].innerHTML;
          var str01=o('inp01').getElementsByTagName('text')[1].innerHTML;
          //
          if(frm.ctg=='login' || frm.ctg=='newreg'){
              if(frm.ctg=='login') var fileAct='async_in.php';
              else if(frm.ctg=='newreg') var fileAct='async_reg.php';
              var strReq='name='+str00+'&pass='+str01;
          }
          else if(frm.ctg=='search'){
              var fileAct='async_find.php';
              var strReq='find='+str00+'&shot='+OBJ.strShot;
          }
          else if(frm.ctg=='name'){
              var spnCursor=o('spnCursor');
              str00=str00.replace(/<\/?[^>]+>/gi,'');
              var strName='';
              for(var i=0;i<str00.length;i++){
                  var strChar=str00.charAt(i);
                  if(strChar!='|') strName+=strChar;
              }
              if(strName.length>=3){
                  OBJ_host.setName(strName); // > aux_host.js
                  OBJ_host.putName(); // > aux_host.js
                  showDiv('divArena');
                  showBox('boxHost');
              }
              else{
                  OBJ.blnLock=true;
                  if(strName.length==0) var msg='Empty`Please try again.`Three characters at least required`to make a name.';
                  else var msg='Too short`Please try again.`Three characters at least required`to make a name.';
                  showSay(msg,'divForm');
                  o('btnCloseSay').do=function(){
                      hideG('boxSay');
                      blinkCursor();
                      OBJ.blnLock=false;
                  }
              }
          }
          //
          /*sendRequest(fileAct,strReq,function(){
              var rsp=xhr.responseText.split('~');
              var spn=o('spnCursor');clearInterval(spn.tmr);spn.style.display='none';
              if(rsp[0]=='in_ok'){
                  window.location.href='.';
              }
              else if(rsp[0]=='reg_fail' || rsp[0]=='in_fail' || rsp[0]=='find_fail'){
                  hideG(o('gLoad'));showG(o('btnSubForm').getElementsByTagName('g')[0]);
                  showSay(rsp[1],o('divForm'));
                  o('btnCloseSay').do=function(){
                      hideG(o('boxSay'));
                      o('spnCursor').style.display='inline';
                      blinkCursor();
                      OBJ.blnLock=false;
                  }
              }
              else if(rsp[0]=='reg_ok'){
                  hideG(o('gLoad'));showG(o('btnSubForm').getElementsByTagName('g')[0]);
                  showSay(rsp[1],o('divForm'));
                  o('btnCloseSay').do=function(){
                      OBJ.blnLock=true;
                      var btn=o('btnCloseSay');
                      btn.blnUnlock=false;
                      var z=0.375;hideG(btn.getElementsByTagName('g')[0]);drawLoad(o('gLoad'),'#fff',6,(this.rx*2-100*z)/2,(this.ry*2-100*z)/2,z,btn);
                      window.location.href='.';
                  }
              }
              else if(rsp[0]=='find_ok'){
                  hideG('gLoad');
                  showG(o('btnSubForm').getElementsByTagName('g')[0]);
                  setClubFromStr(rsp[1],'find');
                  showDiv('divClub');
                  OBJ.blnLock=false;
              }
              else window.location.href='.';
          });*/
      }]);
  for(var i=0;i<arr.length;i++) getButton(arr[i][0],frm,320,arr[i][1],w,h,true,'DXEX',arr[i][2],0.16,arr[i][3],null);
  // KEYBOARD
  var w=50, h=w, s=w*1.05, x=0, y=0, gKeyBoard=getG('gKeyBoard',div,9,270,1,true,0,0);
  for(var i=0;i<39;i++){
      var strChar='', strText=null;
      var pic=null, z=0;
      w=h;
      switch(i){
          case 0:strChar='q';break;
          case 1:strChar='w';break;
          case 2:strChar='e';break;
          case 3:strChar='r';break;
          case 4:strChar='t';break;
          case 5:strChar='y';break;
          case 6:strChar='u';break;
          case 7:strChar='i';break;
          case 8:strChar='o';break;
          case 9:strChar='p';break;
          case 10:strChar='a';break;
          case 11:strChar='s';break;
          case 12:strChar='d';break;
          case 13:strChar='f';break;
          case 14:strChar='g';break;
          case 15:strChar='h';break;
          case 16:strChar='j';break;
          case 17:strChar='k';break;
          case 18:strChar='l';break;
          case 19:strChar='z';break;
          case 20:strChar='x';break;
          case 21:strChar='c';break;
          case 22:strChar='v';break;
          case 23:strChar='b';break;
          case 24:strChar='n';break;
          case 25:strChar='m';break;
          case 26:strChar='<';break;
          case 27:strChar='0';break;
          case 28:strChar='1';break;
          case 29:strChar='2';break;
          case 30:strChar='3';break;
          case 31:strChar='4';break;
          case 32:strChar='^';break;
          case 33:strChar='5';break;
          case 34:strChar='6';break;
          case 35:strChar='7';break;
          case 36:strChar='8';break;
          case 37:strChar='9';break;
          case 38:strChar='_';break;
      }
      if(i==26) pic=picArrow(), z=0.09;
      if(i==38 || i==26 || i==32) w*=2;
      else strText=strChar;
      var btn=getButton(null,gKeyBoard,x,y,w,h,true,'EBFA',pic,z,function(){

      },strText);
      btn.str=strChar;
      //
      if(i==32){
          btn.id='btnCase';
          btn.up=false;
          getText(null,btn,50,32,20,'Arial','#fff','none',0,'CAP','middle');
      }
      else if(i==26){var pth=btn.getElementsByTagName('path')[0];pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+') rotate(-180,'+pth.w/2+','+pth.h/2+')');}
      else if(i==38) getPath(null,btn,35,23,1,'transparent','#fff',2,'M 0 0 L 0 5 L 30 5 L 30 0');
      btn.onmousedown=function(){
          if(OBJ.blnLock===false){
              OBJ.blnLock=true;
              onBtn(this,1);
              var btn=this;
              setTimeout(function(){
                  if(btn.str=='^'){
                      o('btnCase').up=!o('btnCase').up;
                      changeCase();
                  }
                  else if(btn.str=='<') backSpace();
                  else printBtn(btn.str);
                  onBtn(btn,0);
                  OBJ.blnLock=false;
              },100);
          }
      }
      x+=s;
      switch(i){
          case 6:x=50/3;y+=s;break;
          case 13:x=0;y+=s;break;
          case 20:x=50/3;y+=s;break;
          case 26:x=0;y+=s;break;
          case 32:x=50/3;y+=s;break;
      }
  }
  // SPN CURSOR
  var spn=getSVG('tspan','spnCursor',o('inp00').getElementsByTagName('text')[1]);
  spn.innerHTML='|';
  spn.arr=new Array();
}
function blinkCursor(){
    o('spnCursor').tmr=setInterval(function(){
        var spn=o('spnCursor');
        var attr=spn.style.visibility;
        if(attr=='hidden') spn.style.visibility='visible';
        else spn.style.visibility='hidden';
    },500);
}
function getInput(id,x,y,w,h,frm){
    var inp=getG(id,frm,x,y,1,true,w/2,h/2);
    getText(null,inp,8,28,18,'Arial','#bdb76d','none',0,'','start');
    getRect('rctLeft',inp,-10,0,w/2+35,h,0,'transparent','#f00',0).onclick=function(){
        putCursor(this);
    };
    getRect('rctRight',inp,w/2+25,0,w/2-15,h,0,'transparent','#f00',0).onclick=function(){
        putCursor(this);
    };
    var txt=getText(null,inp,w/2+25,28,18,'Arial','#000','none',0,'','middle');
    txt.maxlen=200;
    inp.style.cursor='pointer';
    return inp;
}
function setForm(ctg){;
    o('frmWrite').ctg=ctg;
    o('inp00').getElementsByTagName('text')[1].appendChild(o('spnCursor'));
    clearInput();
    o('spnCursor').style.display='inline';
    blinkCursor();
    if(ctg=='login' || ctg=='newreg'){
        o('inp00').getElementsByTagName('text')[0].firstChild.nodeValue='name:';
        o('inp01').getElementsByTagName('text')[0].firstChild.nodeValue='pass:';
        if(ctg=='login'){
            showG('icnLogIn');
            showG('btnNewReg');
            hideG('icnNewReg');
            hideG('btnLogIn');
        }
        else{
            showG('icnNewReg');
            showG('btnLogIn');
            hideG('icnLogIn');
            hideG('btnNewReg');
        }
        hideG('icnFind');
        hideG('icnName');
        hideG('gHide');
    }
    else if(ctg=='changepass'){
        o('inp00').getElementsByTagName('text')[0].firstChild.nodeValue='old:';
        o('inp01').getElementsByTagName('text')[0].firstChild.nodeValue='new:';
        hideG('icnFind');
        hideG('icnName');
        hideG('gHide');
    }
    else if(ctg=='search'){
        o('inp00').getElementsByTagName('text')[0].firstChild.nodeValue='find:';
        o('inp01').getElementsByTagName('text')[0].firstChild.nodeValue='';
        showG('icnFind');
        showG('gHide');
        hideG('icnLogIn');
        hideG('btnNewReg');
        hideG('icnNewReg');
        hideG('btnLogIn');
        hideG('icnName');
    }
    else if(ctg=='name'){
        o('inp00').getElementsByTagName('text')[0].firstChild.nodeValue='name:';
        o('inp01').getElementsByTagName('text')[0].firstChild.nodeValue='';
        hideG('icnFind');
        showG('gHide');
        hideG('icnLogIn');
        hideG('btnNewReg');
        hideG('icnNewReg');
        hideG('btnLogIn');
        showG('icnName');
        var strName=OBJ_host.strName;
        var spnCursor=o('spnCursor');
        for(var i=0;i<strName.length;i++){
            var spn=getSpan();
            o('inp00').getElementsByTagName('text')[1].appendChild(spn);
            spn.innerHTML=strName.charAt(i);
        }
        spnCursor.parentNode.appendChild(spnCursor);
    }
}
function printBtn(str){
    var spnCursor=o('spnCursor');
    var txt=spnCursor.parentNode;
    if(txt.maxlen>txt.getComputedTextLength()){
        var spnNew=getSpan();
        spnNew.innerHTML=str;
        txt.insertBefore(spnNew,spnCursor);
    }
    if(o('btnCase').up===true){
        o('btnCase').up=false;
        changeCase();
    }
}
function getSpan(){
    var spnCursor=o('spnCursor');
    for(var i=0;i<spnCursor.arr.length;i++){
        if(spnCursor.arr[i].parentNode===null) return spnCursor.arr[i];
    }
    var spn=getSVG('tspan',null,null);
    spn.onclick=function(){
        this.parentNode.insertBefore(o('spnCursor'),this.nextSibling);
    }
    o('spnCursor').arr.push(spn);
    return spn;
}
function putCursor(rct){
    if(OBJ.blnLock===false){
        var txt=rct.parentNode.getElementsByTagName('text')[1];
        var spnCursor=o('spnCursor');
        if(rct.nextSibling.tagName=='rect') txt.insertBefore(spnCursor,txt.firstChild);
        else txt.appendChild(spnCursor);
    }
}
function backSpace(){
    var spnCursor=o('spnCursor');
    var txt=spnCursor.parentNode;
    if(txt.firstChild!=spnCursor){
        var spnDel=spnCursor.previousSibling;
        spnDel.innerHTML='';
        if(txt.firstChild!=spnCursor) spnDel.parentNode.removeChild(spnDel);
    }
}
function changeCase(){
    var btn=o('gKeyBoard').firstChild;
    for(var i=0;i<26;i++){
        var str=btn.getElementsByTagName('text')[0].firstChild.nodeValue;
        if(btnCase.up===true) str=str.toUpperCase();
        else str=str.toLowerCase();
        btn.getElementsByTagName('text')[0].firstChild.nodeValue=str;
        btn.str=str;
        btn=btn.nextSibling;
    }
}
function clearInput(){
    for(var i=0;i<2;i++){
        var txt=o('inp0'+i).getElementsByTagName('text')[1];
        var arr=txt.getElementsByTagName('tspan');
        for(var j=arr.length-1;j>=0;j--){
            var spn=arr[j];
            if(spn.id!='spnCursor'){
                spn.innerHTML='';
                spn.parentNode.removeChild(spn);
            }
        }
    }
}
