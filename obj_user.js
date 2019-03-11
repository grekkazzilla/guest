var ARR_user=new Array();
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
  ARR_user.push(objUser);
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
  for(var i in ARR_user){
    var objUser=ARR_user[i];
    if(objUser.pid==pid) return objUser;
  }
}
function remUser(pid){
  for(var i in ARR_user){
    var objUser=ARR_user[i];
    if(objUser.pid==pid){
      if(objUser.objWatch!==null) remWatch(objUser.objWatch);
      ARR_user.splice(i,1);
      break;
    }
  }
}
