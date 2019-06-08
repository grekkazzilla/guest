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
         for(var i in uuu){
           uuu[i].send('in~'+ws.pid);
         }
         uuu.push(ws);
      }
   });
   //
   ws.on('close',function(){
     for(var i=0;i<uuu.length;i++){
       if(uuu[i]==ws){
         uuu.splice(i,1);
         i--;
       }
       else{
         uuu[i].send('out~'+ws.pid);
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
