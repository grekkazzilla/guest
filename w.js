var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 8001, path: '/peerjs'});
console.log('peer started');
//
var WebSocketServer=require('ws');
console.log('websocket started');
//
var uuu=new Array();
//
var ws=new WebSocketServer.Server({port:8000});
ws.on('connection',function(ws){
   ws.send('hello');
   ws.on('message',function(msg){
      var r=msg.split('~');
      if(r[0]=='hello'){
         ws.pid=r[1];
         ws.num=1000;
         ws.str='';
         uuu.push(ws);
      }
      else if(r[0]=='arena_on'){
        ws.num=r[1];
        for(var i in uuu){
          var u=uuu[i];
          if(u!=ws){
            if(u.num==ws.num) ws.send('arena_on~'+u.pid);
            if(u.str!='' && u.str.charAt(ws.num)=='1') u.send('watch_on~'+ws.pid);
          }
        }
      }
      else if(r[0]=='arena_off') ws.num=1000;
      else if(r[0]=='watch_on'){
        ws.str=r[1];
        for(var i in uuu){
          var u=uuu[i];
          if(u!=ws){
            if(ws.str.charAt(u.num)=='1') ws.send('watch_on~'+u.pid);
          }
        }
      }
      else if(r[0]=='watch_off') ws.str='';
   });
   //
   ws.on('close',function(){
     for(var i in uuu){
       if(uuu[i]==ws){
         uuu.splice(i,1);
         break;
       }
     }
   });
});
/*
var http=require('http');
http.get({host:'localhost',port:2002,path:'/varchess2/ws_shot.php?name='+ws.name+'&shot='+ws.shot},function(res){
    res.on('data', function(data){
        var asw=(''+data).split('~');
    });
});
*/
