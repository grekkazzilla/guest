
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
  ARR_user.push(objUser);
  return objUser;
}
function linkUser(conn){
  var objUser=getUserByPID(conn.peer);
  objUser.conn=conn;
}
function getUserByPID(pid){
  for(var i in ARR_user){
    var objUser=ARR_user[i];
    if(objUser.pid==pid) return objUser;
  }
}
function remUser(objUser){
  for(var i in ARR_user){
    if(objUser==ARR_user[i]){
      ARR_user.splice(i,1);
      break;
    }
  }
}
