var club=new Object();
club.arr=new Array();
club.get=function(pid){
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
  club.arr.push(objUser);
  return objUser;
}
club.connect=function(conn){
  var objUser=club.findByPID(conn.peer);
  objUser.conn=conn;
  // test
  var btn=document.createElement('button');
  btn.style.width='150px';
  btn.style.height='25px';
  btn.innerHTML=conn.peer;
  document.getElementsByTagName('body')[0].appendChild(btn);
  btn.conn=conn;
  btn.onclick=function(){
    this.conn.send('msg~hello from '+this.conn.peer);
  }
  //
}
club.findByPID=function(pid){
  for(var i in club.arr){
    var objUser=club.arr[i];
    if(objUser.pid==pid) return objUser;
  }
}
club.rem=function(objUser){
  for(var i in club.arr){
    if(objUser==club.arr[i]){
      club.arr.splice(i,1);
      break;
    }
  }
}
