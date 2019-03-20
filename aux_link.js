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
          if(OBJ.strMode=='watch'){
            OBJ.strMode='match';
            setUser(objUser,msg[1]);
            startGame(true);
            OBJ_arena.objMatch=objUser;
            o('btnUser').objUser=objUser;
            objUser.loadPic();
            objUser.conn.send('match_rsp~'+OBJ_arena.arrHist[0][0]+'~'+OBJ_arena.blnSide);
          }
          else objUser.conn.send('match_rej');
        }
        else if(msg[0]=='match_rsp'){
          OBJ.strMode='match';
          var strFen=msg[1];
          if(msg[2]=='true') OBJ_arena.blnSide=false;
          else OBJ_arena.blnSide=true
          startGame(false);
          OBJ_arena.objMatch=objUser;
          OBJ_chess.setBoard(strFen);
          OBJ_board.putBoard();
          OBJ_arena.arrHist=new Array();
          OBJ_arena.arrHist[0]=new Array(strFen,false,false,false,false); // fen position, posA, posB, move notation, arrCheck
          var gLoad=o('gLoad');hideG(gLoad);showG(gLoad.parentNode.getElementsByTagName('g')[0]);
          remWatch(objUser.objWatch);
          showDiv('divArena');
          OBJ.blnLock=false;
          o('btnUser').objUser=objUser;
          objUser.loadPic();
        }
        else if(msg[0]=='move'){
          play(o('g'+msg[1]),true);
          play(o('g'+msg[2]),true);
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
