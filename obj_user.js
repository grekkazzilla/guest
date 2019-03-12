var OBJ_user=new Object();
OBJ_user.arr=new Array();
function getUser(pid){
  var objUser=new Object();
  objUser.strName='';
  objUser.lnkPic='';
  objUser.conn=null; // object peer established connection
  objUser.pid=pid; // string peer id
  objUser.intRank=0;
  objUser.lnkPic='';
  objUser.strPic='';
  objUser.wPic=0;
  objUser.hPic=0;
  objUser.dataImage='';
  objUser.objWatch=null;
  OBJ_user.arr.push(objUser);
  var xhr = new XMLHttpRequest();
  xhr.objUser=objUser;
  objUser.xhr=xhr;
  objUser.loadPic=function(){
    this.xhr.open('POST', '../upx/'+this.lnkPic, true);
    this.xhr.onreadystatechange = this.xhr.checkState;
    this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    this.xhr.send('');
  }
  xhr.checkState=function(){
    if(this.readyState==4){
      if(this.status==200){
        var objUser=this.objUser;
        var arr=this.responseText.split(':');
        objUser.wPic=arr[0];
        objUser.hPic=arr[1];
        objUser.strPic=arr[2];
        for(var i=0;i<3;i++){
          var boxWatch=o('boxWatch'+i);
          var objWatch=boxWatch.objWatch;
          if(objWatch!==null && objWatch.objUser==objUser){
            var btn=o('btnWatchUser'+i);
            var pth=btn.getElementsByTagName('path')[0];
            var z=0.225, w=arr[0], h=arr[1], d=arr[2];
            pth.setAttribute('transform','translate('+(btn.rx-w*z/2)+','+(btn.ry-h*z/2)+') scale('+z+')');
            pth.setAttribute('d',d);
          }
        }
      }
    }
  }
  return objUser;
}
function setUser(objUser,strUser){
  var arr=strUser.split(':');
  objUser.strName=arr[0];
  objUser.lnkPic=arr[1];
  objUser.intRank=arr[2];
  objUser.dataImage=arr[3];
}
function getUserByPID(pid){
  for(var i in OBJ_user.arr){
    var objUser=OBJ_user.arr[i];
    if(objUser.pid==pid) return objUser;
  }
}
function remUser(pid){
  for(var i in OBJ_user.arr){
    var objUser=OBJ_user.arr[i];
    if(objUser.pid==pid){
      if(objUser.objWatch!==null) remWatch(objUser.objWatch);
      OBJ_user.arr.splice(i,1);
      break;
    }
  }
}
