var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 8001, path: '/peerjs'});
console.log('peer started');
//
var WebSocketServer=require('ws');
var http=require('http');
console.log('websocket started');
var club=new Array();
var ws=new WebSocketServer.Server({port:8000});
ws.on('connection',function(ws){
    ws.send('hello');
    ws.on('message',function(message){
        var rsp=message.split('~');
        if(rsp[0]=='hello'){
            if(rsp[1]==''){
                ws.guest=true;
                ws.name=Math.round(Math.random()*1000000);
                ws.on=true;
            }
            else{
                ws.guest=false;
                ws.name=rsp[1];
                ws.on=false;
            }
            ws.shot=rsp[2];
            ws.pid=rsp[3];
            ws.auth=false;
            ws.req=false;
            ws.about=new Array();
            ws.arena=new Array();
            var boo=false;
            for(var i in club){
                if(club[i].name==ws.name){
                    if(club[i].on===false){
                        ws.about=club[i].about;
                        club[i]=ws;
                        boo=true;
                    }
                    else if(club[i].on===true){
                        ws.name='';
                        ws.on=false;
                        ws.send('ban');
                        ws.close();
                    }
                    break;
                }
            }
            if(boo===false){
                ws.about=new Array();
                club.push(ws);
            }
            // authorization
            if(ws.guest===false){
                ws.req=true;
                http.get({host:'localhost',port:2002,path:'/varchess2/ws_shot.php?name='+ws.name+'&shot='+ws.shot},function(res){
                    res.on('data', function(data){
                        var asw=(''+data).split('~');
                        for(var i in club){
                            if(club[i].name==asw[1]){
                                if(asw[0]=='0'){
                                    var obj=new Object();
                                    obj.name=club[i].name;
                                    obj.auth=false;
                                    obj.on=false;
                                    obj.req=false;
                                    obj.about=club[i].about;
                                    club[i].req=false;
                                    club[i].send('ban');
                                    club[i].close();
                                    club[i]=obj;
                                }
                                if(asw[0]=='1'){
                                    club[i].on=true;
                                    club[i].auth=true;
                                    club[i].req=false;
                                    for(var j in club[i].about){
                                        club[i].about[j].send('in~'+club[i].name+'~'+club[i].pid);
                                    }   
                                }
                                break;
                            }
                        }
                    });
                });
            }
        }
        else if(rsp[0]=='about'){
            var boo=false;
            for(var i in club){
                if(club[i].name==rsp[1]){
                    club[i].about.push(ws);
                    boo=true;
                    if(club[i].on===true && club[i].auth===true) ws.send('in~'+rsp[1]+'~'+club[i].pid);
                    else ws.send('out~'+rsp[1]);
                    break;
                }
            }
            if(boo===false){
                var obj=new Object();
                obj.name=rsp[1];
                obj.auth=false;
                obj.on=false;
                obj.req=false;
                obj.about=new Array();
                obj.arena=new Array();
                obj.about.push(ws);
                club.push(obj);
                ws.send('out~'+rsp[1]);
            }
        }
        else if(rsp[0]=='away'){
            for(var i in club){
                if(club[i].name==rsp[1]){
                    for(var j in club[i].about){
                        if(club[i].about[j]==ws){
                            club[i].about.splice(j,1);
                            if(club[i].about.length==0 && club[i].on===false){
                                club.splice(i,1);
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }
        else if(rsp[0]=='arena'){
            var obj=new Object();
            obj.var=rsp[2];
            obj.base=rsp[3];
            obj.delay=rsp[4];
            obj.grow=rsp[5];
            obj.add=rsp[6];
            obj.side=rsp[7];
            obj.rand=rsp[8];
            for(var i in club){
                if(club[i].name==rsp[1]){
                    club[i].arena.push(obj);
                }
            }
        }
        else if(rsp[0]=='get'){
            var bln=false;
            var n=rsp[1];
            if(n>=club.length) n=0;
            for(var i=rsp[1];i<club.length;i++){
                if(club[i].name!=ws.name && club[i].on===true && club[i].arena.length>0){
                    var arr=new Array();
                    for(var j in club[i].arena){
                        arr.push(club[i].arena[j].var+'`'+club[i].arena[j].base+'`'+club[i].arena[j].delay+'`'+club[i].arena[j].grow+'`'+club[i].arena[j].add+'`'+club[i].arena[j].side+'`'+club[i].arena[j].rand);
                    }
                    //console.log(arr.join(':'));
                    ws.send('get_1~'+club[i].name+'~'+club[i].pid+'~'+i+'~'+arr.join(':'));
                    bln=true;
                    break;
                }
            }
            if(bln===false){
                ws.send('get_0');
            }
        }
        else if(rsp[0]=='man'){
            var arr=new Array();
            for(var i in club){
                var tmp=new Array();
                for(var j in club[i].about){
                    tmp.push(club[i].about[j].name)
                }
                if(tmp.length==0) arr.push(club[i].name+':'+club[i].on);
                else arr.push(club[i].name+':'+club[i].on+':'+tmp.join('`'));
            }
            ws.send('man~'+arr.join('^'));
        }
    });
    //
    ws.on('close',function(){
        ws.on=false;
        ws.auth=false;
        for(var i in ws.about){
            ws.about[i].send('out~'+ws.name);
        }
        //
        for(var i=0;i<club.length;i++){
            for(var j in club[i].about){
                if(club[i].about[j]==ws){
                    club[i].about.splice(j,1);
                    break;
                }
            }
            if(club[i].about.length==0 && club[i].on===false && club[i].req===false){
                club.splice(i,1);
                i--;
            }
        }
    });
});