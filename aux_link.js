function findArena(){
  for(var i in OBJ_club.arr){
    var u=OBJ_club.arr[i];
    var conn=G_wrap.peer.connect(ARR_user[i].pid);
    conn.on('open',function(){
      this.on('data',function(data){
        texted(this,data);
      });
      this.send('watch');
    });
  }
}
function linked(conn){
  var btn=document.createElement('button');
  btn.style.width='150px';
  btn.style.height='25px';
  btn.innerHTML=conn.peer;
  document.getElementsByTagName('body')[0].appendChild(btn);
  btn.conn=conn;
  btn.onclick=function(){
    this.conn.send('msg~hello from '+this.conn.peer);
  }
}
function texted(conn,data){
  var asw=data.split('~');
  if(asw[0]=='watch'){
    if(DIV_arena.strMode=='wait'){
      conn.send('arena~'+DIV_arena.intVar);
      linked(conn);
    }
  }
  else if(asw[0]=='arena'){
    if(DIV_arena.strMode=='wait'){
      conn.send('arena~'+DIV_arena.intVar);
      linked(conn);
    }
  }
  else if(asw[0]=='msg'){
    console.log(asw[1]);
  }
}
