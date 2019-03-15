function link_wbs_msg(msg){
  var rsp=msg.split('~');
  if(rsp[0]=='hello'){
    OBJ.wbs.send('hello~'+OBJ_host.pid);
    var imgLoad=document.getElementsByTagName('img')[0];
    imgLoad.parentNode.removeChild(imgLoad);
    sctRoot.style.display='block';
    OBJ.blnLock=false;
  }
  else if(rsp[0]=='arena_on'){

  }
  else if(rsp[0]=='watch_on'){

  }
}
//////////
function link_conn_msg(conn,data){
  var asw=data.split('~');
  var objUser=conn.objUser;
}
//////////
function link_watch(){
  if(OBJ_user.numLink>=OBJ_user.arr.length){
    OBJ_user.numLink=0;
  }
  else if(OBJ_user.numLink<OBJ_user.arr.length){
    var objUser=OBJ_user.arr[OBJ_user.numLink];
    OBJ_user.numLink++;
    if(objUser.conn===null){
      var conn=OBJ.peer.connect(objUser.pid);
      conn.objUser=objUser;
      conn.on('open',function(){
        var objUser=this.objUser;
        objUser.conn=this;
        this.on('data', function(data){
          link_conn_msg(this,data);
        });
        this.send('watch_req');
      });
    }
    else setTimeout('link_watch()',1000);
  }
}
