function link_wbs_msg(msg){
  var rsp=msg.split('~');
  if(rsp[0]=='hello'){
    OBJ.wbs.send('hello~'+OBJ_host.pid);
    var imgLoad=document.getElementsByTagName('img')[0];
    imgLoad.parentNode.removeChild(imgLoad);
    sctRoot.style.display='block';
    OBJ.blnLock=false;
  }
  else if(rsp[0]=='in'){
    var pid=rsp[1];
    var objUser=getUser(pid);
    var conn=OBJ.peer.connect(pid);
    conn.objUser=objUser;
    conn.on('open',function(){
      var objUser=this.objUser;
      objUser.conn=this;
      this.on('data', function(data){
        link_conn_msg(this,data);
      });
    });
  }
  else if(rsp[0]=='out'){
    remUser(rsp[1]);
  }
}
//////////
function link_conn_msg(conn,data){
  var asw=data.split('~');
  var objUser=getUserByPID(conn.peer)
  if(asw[0]=='watch_req' || asw[0]=='watch_exch' && OBJ.strMode=='watch'){
    if(asw[0]=='watch_exch'){
      setUser(objUser,asw[1]);
      if(objUser.objWatch===null) getWatch(objUser,asw[2]);
      else setWatch(objUser,asw[2]);
    }
    objUser.conn.send('watch_resp~'+makeWatchReq());
  }
  else if(asw[0]=='watch_resp' && OBJ.strMode=='watch'){
    setUser(objUser,asw[1]);
    if(objUser.objWatch===null) getWatch(objUser,asw[2]);
    else setWatch(objUser,asw[2]);
  }
}
//////////
function makeWatchReq(){
  return OBJ_host.strName+':'+OBJ_host.lnkPic+':'+OBJ_host.intRank+':'+OBJ_host.dataImage+'~'+OBJ_arena.intVar+':'+OBJ_arena.strSide+':'+OBJ_arena.intBase+':'+OBJ_arena.intAdd+':'+OBJ_arena.strClock;
}
function link_watch(){
  for(var i in ARR_user){
    var objUser=ARR_user[i];
    if(objUser.objWatch===null){
      if(OBJ.strMode=='standby') objUser.conn.send('watch_req');
      else if(OBJ.strMode=='watch') objUser.conn.send('watch_exch~'+makeWatchReq());
    }
  }
}
