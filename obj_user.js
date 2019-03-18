var OBJ_user=new Object();
OBJ_user.arr=new Array();
OBJ_user.numLink=0; // used for trying to link with users one by one
function getUser(conn){
  var objUser=new Object();
  objUser.strName='';
  objUser.lnkPic='';
  objUser.conn=null; // object peer established connection
  conn.objUser=objUser;
  objUser.conn=conn;
  objUser.pid=conn.peer;
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
        var btn=o('btnUser');
        if(btn.objUser==objUser){
          var pth=btn.getElementsByTagName('path')[0];
          var z=0.225, w=arr[0], h=arr[1], d=arr[2];
          pth.setAttribute('transform','translate('+(btn.rx-w*z/2)+','+(btn.ry-h*z/2)+') scale('+z+')');
          pth.setAttribute('d',d);
        }
      }
    }
  }
  objUser.bufSend=new Array();
  return objUser;
}
function setUser(objUser,strUser){
  var arr=strUser.split(':');
  objUser.strName=arr[0];
  objUser.lnkPic=arr[1];
  objUser.intRank=arr[2];
}
function remUser(objUser){
  for(var i in OBJ_user.arr){
    if(OBJ_user.arr[i]==objUser){
      if(objUser.objWatch!==null) remWatch(objUser.objWatch);
      OBJ_user.arr.splice(i,1);
      break;
    }
  }
}
function isUser(pid){
  for(var i in OBJ_user.arr) if(OBJ_user.arr[i].pid==pid) return OBJ_user.arr[i];
  return false;
}
