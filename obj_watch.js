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
  putWatch(OBJ_watch.numPage);
}
function putWatch(numPage){
  var qtyPage=Math.ceil(OBJ_watch.arr.length/3);
  for(var i=0;i<3;i++){
    var boxWatch=o('boxWatch'+i);
    var txtName=boxWatch.getElementsByTagName('text')[0];
    var num=numPage*3+i;
    if(num<OBJ_watch.arr.length){
      var objWatch=OBJ_watch.arr[num];
      var objUser=objWatch.objUser;
      txtName.firstChild.nodeValue=objUser.strName;
      boxWatch.objWatch=objWatch;
      boxWatch.loadPic();
    }
    else{
      txtName.firstChild.nodeValue='';
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
}
