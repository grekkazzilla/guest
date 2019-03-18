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
        if(msg[0]=='greet_req'){
          if(OBJ.strMode=='watch') objUser.conn.send('greet_rsp~'+OBJ_host.strName+':'+OBJ_host.lnkPic+':'+OBJ_host.intRank+'~'+OBJ_arena.intVar+':'+OBJ_arena.strSide+':'+OBJ_arena.intBase+':'+OBJ_arena.intAdd+':'+OBJ_arena.strClock);
          else objUser.conn.send('greet_rej');
        }
        else if(msg[0]=='greet_rsp'){
          setUser(objUser,msg[1]);
          if(isWatch(objUser)===false) getWatch(objUser,msg[2]);
        }
        else if(msg[0]=='close'){
          objUser.conn.close();
        }
        else if(msg[0]=='match_req'){
          var strUser=msg[1];
          var strSide=msg[2];
          if(strSide=='white') var strSide='black';
          else if(strSide=='black') var strSide='white';
          OBJ_arena.setSide(strSide);
          OBJ_arena.putSide();
          objUser.conn.send('match_rsp~'+OBJ_arena.arrHist[0][0]);
        }
        else if(msg[0]=='match_rsp'){
          var strFen=msg[1];
          OBJ_chess.setBoard(strFen);
          OBJ_board.putBoard();
          OBJ_arena.arrHist=new Array();
          OBJ_arena.arrHist[0]=new Array(strFen,false,false,false,false);
        }
      });
      this.on('close',function(){
        remUser(objUser);
      });
    });
  }
  else if(msgSend!=''){
    objUser.conn.send(msgSend);
    OBJ.test++;
  }
}
