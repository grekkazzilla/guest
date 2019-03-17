var OBJ_watch=new Object();
OBJ_watch.arr=new Array();
OBJ_watch.numPage=0;
function getWatch(objUser,strWatch){
  var objWatch=new Object();
  objUser.objWatch=objWatch;
  objWatch.objUser=objUser;
  OBJ_watch.arr.push(objWatch);
  setWatch(objUser,strWatch);
}
function setWatch(objUser,strWatch){
  var objWatch=objUser.objWatch;
  var arr=strWatch.split(':');
  objWatch.intVar=arr[0];
  objWatch.strSide=arr[1];
  objWatch.intBase=arr[2];
  objWatch.intAdd=arr[3];
  objWatch.strClock=arr[4];
  if(OBJ.divOn==o('divWatch')) putWatch(OBJ_watch.numPage);
}
function putWatch(numPage){
  var qtyWatch=OBJ_watch.arr.length;
  var qtyPage=Math.ceil(qtyWatch/3);
  if(qtyPage==0) qtyPage=1;
  // icn quantity
  var strWatchQuantity=qtyWatch;
  if(qtyWatch<10) strWatchQuantity='00'+strWatchQuantity;
  else if(qtyWatch<100) strWatchQuantity='0'+strWatchQuantity;
  else if(qtyWatch>999) strWatchQuantity='999';
  txtWatchQuantity.firstChild.nodeValue=strWatchQuantity;
  // txt page
  o('txtWatchPage').firstChild.nodeValue=(numPage+1)+' / '+qtyPage;
  //
  for(var i=0;i<3;i++){
    var boxWatch=o('boxWatch'+i);
    var num=numPage*3+i;
    if(num<OBJ_watch.arr.length){
      // name
      var objWatch=OBJ_watch.arr[num];
      var objUser=objWatch.objUser;
      boxWatch.getElementsByTagName('text')[0].firstChild.nodeValue=objUser.strName;
      boxWatch.objWatch=objWatch;
      // pic
      showG('btnWatchUser'+i);
      objUser.loadPic();
      // btn
      showG('btnWatchMatch'+i);
      // rank
      for(var j=0;j<5;j++){
        var pth=o('pthWatchStar'+i+j), z=0.09;
        if(objUser.intRank<j+1) var z=0;
        pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+z+')');
      }
      // var
      o('txtWatchVar'+i).firstChild.nodeValue=OBJ_arena.arrName[objWatch.intVar];
      // side
      showG('icnWatchSide'+i);
      var gWhite=o('gWhite'+i), gBlack=o('gBlack'+i);
      if(objWatch.strSide=='white'){showG(gWhite);hideG(gBlack);}
      else if(objWatch.strSide=='black'){hideG(gWhite);showG(gBlack);}
      else{jumpG(gWhite,gWhite.x-9,gWhite.y);jumpG(gBlack,gBlack.x+9,gBlack.y);}
      // time
      var g=o('gWatchTime'+i);
      showG(g);
      var pth=g.getElementsByTagName('path')[0];
      var txtA=g.getElementsByTagName('text')[0];
      var txtB=g.getElementsByTagName('text')[1];
      if(objWatch.strClock=='simple_delay') var z=0.13, p=picClock();
      else if(objWatch.strClock=='accumulation') var z=0.11, p=picHeap();
      else if(objWatch.strClock=='compensation') var z=0.11, p=picUp();
      if(objWatch.intAdd==0) var yA=30, strB='';
      else var yA=21, strB=objWatch.intAdd+' sec';
      pth.setAttribute('transform','translate(0,'+(g.ry-p[1]*z/2)+') scale('+z+')');
      pth.setAttribute('d',p[2]);
      txtA.setAttribute('y',yA);
      txtA.firstChild.nodeValue=objWatch.intBase/60+' min';
      txtB.firstChild.nodeValue=strB;
    }
    else{
      boxWatch.getElementsByTagName('text')[0].firstChild.nodeValue='';
      hideG('btnWatchUser'+i);
      for(var j=0;j<5;j++) o('pthWatchStar'+i+j).setAttribute('transform','scale(0)');
      o('txtWatchVar'+i).firstChild.nodeValue='';
      hideG('icnWatchSide'+i);
      hideG('gWatchTime'+i);
      boxWatch.objWatch=null;
    }
  }
}
function remWatch(objWatch){
  for(var i in OBJ_watch.arr){
    if(OBJ_watch.arr[i]==objWatch){
      var objUser=objWatch.objUser;
      objUser.objWatch=null;
      OBJ_watch.arr.splice(i,1);
      break;
    }
  }
  if(OBJ.divOn==o('divWatch')) putWatch(OBJ_watch.numPage);
}
function isWatch(objUser){
  for(var i in OBJ_watch.arr) if(OBJ_watch.arr[i].objUser==objUser) return OBJ_watch.arr[i];
  return false;
}
