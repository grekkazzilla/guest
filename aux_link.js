function link_wbs_msg(data){
  var msg=data.split('~');
  if(msg[0]=='hello'){
    OBJ.wbs.send('hello~'+OBJ_host.pid);
    var imgLoad=document.getElementsByTagName('img')[0];
    imgLoad.parentNode.removeChild(imgLoad);
    sctRoot.style.display='block';
    OBJ.blnLock=false;
  }
  else if(msg[0]=='arena_on'){}
  else if(msg[0]=='watch_on') link_pcn_msg(msg[1],null,'greet_req');
}
function link_pcn_msg(pid,conn,msgSend){
  var objUser=isUser(pid);
  if(objUser===false){
    if(conn===null) var conn=OBJ.peer.connect(pid);
    conn.on('open',function(){
      var objUser=getUser(this);
      if(msgSend!=''){
        objUser.conn.send(msgSend);
      }
      this.on('data',function(data){
        var msg=data.split('~');
        var objUser=this.objUser;
        if(msg[0]=='greet_req'){
          if(OBJ.strMode=='watch') objUser.bufSend.push('greet_rsp~'+OBJ_host.strName+':'+OBJ_host.lnkPic+':'+OBJ_host.intRank+'~'+OBJ_arena.intVar+':'+OBJ_arena.strSide+':'+OBJ_arena.intBase+':'+OBJ_arena.intAdd+':'+OBJ_arena.strClock);
          else objUser.bufSend.push('greet_rej');
        }
        else if(msg[0]=='greet_rsp'){
          setUser(objUser,msg[1]);
          if(isWatch(objUser)===false) getWatch(objUser,msg[2]);
        }
        else if(msg[0]=='greet_rej'){
          remUser(objUser);
        }
        else if(msg[0]=='close'){
          console.log(OBJ_host.strName+' has closed '+objUser.pid+' connection');
          //objUser.conn.close();
        }
        if(objUser.bufSend.length>0) objUser.conn.send(objUser.bufSend.shift());
      });
    });
    conn.on('close',function(){
      console.log(OBJ_host.strName+' has closed '+objUser.pid+' connection');
    });
  }
  else{
    if(msgSend!='') objUser.conn.send(msgSend);
  }
}
