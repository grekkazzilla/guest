var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 8001, path: '/peerjs'});
console.log('peer started');
//
var WebSocketServer=require('ws');
console.log('websocket started');
//
var u=new Array();
//
var ws=new WebSocketServer.Server({port:8000});
ws.on('connection',function(ws){
   ws.send('hello');
   ws.on('message',function(message){
      var rsp=message.split('~');
      if(rsp[0]=='hello'){
         ws.pid=rsp[1];
         for(var i in u){
           u[i].send('in~'+ws.pid); // tell them all about me
           ws.send('in~'+u[i].pid); // tell me about them all
         }
         // add new user
         u.push(ws);
      }
   });
   //
   ws.on('close',function(){
      for(var i in u){
         if(u[i].pid==ws.pid) var n=i;
         else u[i].send('out~'+ws.pid);
      }
      u.splice(n,1);
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
