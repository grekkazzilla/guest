function link(){
  OBJ.peer=new Peer({host:OBJ.strHost,port:8001,path:'/peerjs'});
  OBJ.peer.on('open',function(pid){
    OBJ.wbs=new WebSocket('ws://'+OBJ.strHost+':8000','echo-protocol');
    OBJ_host.pid=pid;
    console.log('my pid: '+OBJ_host.pid);
    OBJ.wbs.addEventListener('message',function(e){
      var msg=e.data.split('~');
      if(msg[0]=='hello'){
        OBJ.wbs.send('hello~'+OBJ_host.pid);
      }
      else if(msg[0]=='in'){
        var conn=OBJ.peer.connect(msg[1]);
        conn.on('open',function(){
          this.on('data',function(data){
            pcn(this,data);
          });
          this.on('close',function(){remUser(isUser(this.peer));});
        });
      }
      else if(msg[0]=='out'){
        //var objUser=isUser(msg[1]);
        //remUser(objUser);
      }
    });
    this.on('connection',function(conn){
      conn.on('open',function(){
        this.send('link_req~'+OBJ_host.strName+':'+OBJ_host.lnkPic+':'+OBJ_host.intRank+'~'+OBJ.strMode+'~'+OBJ_arena.intVar+':'+OBJ_arena.strSide+':'+OBJ_arena.intBase+':'+OBJ_arena.intAdd+':'+OBJ_arena.strClock);
        this.on('data',function(data){
          pcn(this,data);
        });
        this.on('close',function(){remUser(isUser(this.peer));});
      });
    });
  });
}
function pcn(conn,data){
  var msg=data.split('~');
  if(msg[0]=='link_req' || msg[0]=='link_rsp'){
    var objUser=getUser(conn);
    setUser(objUser,msg[1]);
    if(msg[2]=='arena'){
      getWatch(objUser,msg[3]);
    }
    if(msg[0]=='link_req') conn.send('link_rsp~'+OBJ_host.strName+':'+OBJ_host.lnkPic+':'+OBJ_host.intRank+'~'+OBJ.strMode+'~'+OBJ_arena.intVar+':'+OBJ_arena.strSide+':'+OBJ_arena.intBase+':'+OBJ_arena.intAdd+':'+OBJ_arena.strClock);
  }
  else if(msg[0]=='arena_on'){
    getWatch(isUser(conn.peer),msg[1]);
  }
  else if(msg[0]=='arena_off'){
    remWatch(isUser(conn.peer).objWatch);
  }
}
/*function link_pcn_msg(pid,conn,msgSend){
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
        if(msg[0]=='link_req'){
          objUser.conn.send('link_rsp');
        }
        else if(msg[0]=='link_rsp'){
          console.log(9000);
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
}*/
function startGame(){
  if(OBJ.strMode=='standby' && OBJ_arena.strVS=='human'){
    if(OBJ.boxOn!==null) hideBox(OBJ.boxOn);
    var btn=o('btnMatch');
    var z=0.425;hideG(btn.getElementsByTagName('g')[0]);drawLoad('gLoad','url(#grdButton)',9,(btn.rx*2-100*z)/2,(btn.ry*2-100*z)/2,z,btn);
    btn.arrOn.push(['path',1,'stroke','url(#grdButton)','#eee8aa']);
    OBJ.strMode='arena';
    for(var i in OBJ_user.arr){
      OBJ_user.arr[i].conn.send('arena_on~'+OBJ_arena.intVar+':'+OBJ_arena.strSide+':'+OBJ_arena.intBase+':'+OBJ_arena.intAdd+':'+OBJ_arena.strClock);
    }
  }
  else if(OBJ.strMode=='arena'){
    var btn=o('btnMatch');
    showG(btn.getElementsByTagName('g')[0]);hideG('gLoad');
    btn.arrOn.unshift();
    OBJ.strMode='standby';
    for(var i in OBJ_user.arr){
      OBJ_user.arr[i].conn.send('arena_off');
    }
  }
}
