var OBJ=new Object();
OBJ.w=400;
OBJ.h=600;
OBJ.fltScale=1;
OBJ.blnLock=true;
OBJ.boxOn=null;
OBJ.divOn=null;
OBJ.wbs=null;
OBJ.peer=null;
OBJ.strMode='standby';
var OBJ_arena=new Object();
OBJ_arena.intVar=1;
OBJ_arena.blnSide=true;
OBJ_arena.strSide='any';
OBJ_arena.strVS='human';
OBJ_arena.arrHist=new Array();
OBJ_arena.objDrive=null;
OBJ_arena.numShowMove=0;
var OBJ_watch=new Object();
var ARR_user=new Array();
var OBJ_host=new Object();
OBJ_host.strName='';
OBJ_host.lnkPic='';
OBJ_host.conn=null; // object peer established connection
OBJ_host.pid=''; // string peer id
OBJ_host.intRank=0;
OBJ_host.lnkPic='';
OBJ_host.strPic='';
OBJ_host.wPic=0;
OBJ_host.hPic=0;
OBJ_host.dataImage='';
OBJ_host.putPic=function(fncBack){

}
function init(){
    // DEFINE ROOT ELEMENTS
    var sctRoot=document.getElementById('sctRoot');
    var svgRoot=document.getElementsByTagName('svg')[0];
    var gWrap=svgRoot.getElementsByTagName('g')[0];
    var dfs=svgRoot.getElementsByTagName('defs')[0];
    // GRADIENTS & EFFECTS
    getLinGrd('grdButton','#eee8aa','#bdb76d',1,1,false,'down',dfs);
    getLinGrd('grdButtonRvs','#bdb76d','#eee8aa',1,1,false,'down',dfs);
    getLinGrd('grdIcon','#a0a0a0','#000',1,1,false,'down',dfs);
    getLinGrd('grdIconRvs','#505050','#909090',1,1,false,'down',dfs);
    getLinGrd('grdPale','#fff','#eee8aa',1,1,false,'down',dfs);
    getLinGrd('grdPaleRvs','#eee8aa','#fff',1,1,false,'down',dfs);
    getLinGrd('grdGold','#ffeeaa','#aa8800',1,1,false,'down',dfs);
    getLinGrd('grdGoldBrd','#d3bc5f','#2b2200',1,1,false,'down',dfs); // gold border
    getLinGrd('grdSilver','#ececec','#999999',1,1,false,'down',dfs);
    getLinGrd('grdSilverRvs','#999999','#ececec',1,1,false,'down',dfs);
    getLinGrd('grdBrain','#fff','#bdb76d',1,1,false,'down',dfs);
    getLinGrd('grdRed','#ff8080','#aa0000',1,1,false,'down',dfs);
    getBlurFilter('blr2',2,dfs);
    getBlurFilter('blr3',3,dfs);
    getBlurFilter('blr6',3,dfs);
    getBlurFilter('blr8',8,dfs);
    getBlurFilter('blr10',10,dfs);
    getBlurFilter('blr12',12,dfs);
    getBlurFilter('blr14',14,dfs);
    // FULL SCALE UP
    OBJ.fltScale=getScale(svgRoot,gWrap,OBJ.w,OBJ.h,10);
    //getGrid(gWrap,OBJ.w,OBJ.h,50);
    //
    getLoad('gLoad',gWrap,-9999,-9999,1,'none',0);
    getSay(gWrap,OBJ.w,OBJ.h,'url(#blr3)');
    //
    var div=getArena(gWrap);
    OBJ.divOn=div;
    getPic(gWrap);
    getImage(gWrap);
    getForm(gWrap);
    getWatch(gWrap);
    getBook(gWrap);
    ////////////////////
    // SETTING /////////
    ////////////////////
    var intVar=getLocal('var',1)*1; if((typeof intVar)!='number' || intVar<0 || intVar>8) intVar=1;
    var strSide=getLocal('side','any'); if((typeof strSide)!='string' || (strSide!='white' && strSide!='black' && strSide!='any')) strSide='any';
    var strVS=getLocal('vs','human'); if((typeof strVS)!='string' || (strVS!='human' && strVS!='robo' && strVS!='friend')) strVS='human';
    var strName=getLocal('name','Stranger'); if((typeof strName)!='string') strName='Stranger';
    var lnkPic=getLocal('pic','00007.txt'); if((typeof lnkPic)!='string') lnkPic='00007.txt';
    var intRank=getLocal('rank',3)*1; if(intRank<1 || intRank>5 || (typeof intRank)!='number') intRank=3;
    var dataImage=getLocal('img','');
    OBJ_arena.intVar=intVar;
    OBJ_arena.strSide=strSide;
    OBJ_arena.strVS=strVS;
    OBJ_host.strName=strName;
    OBJ_host.lnkPic=lnkPic;
    OBJ_host.intRank=intRank;
    OBJ_host.dataImage=dataImage;
    chooseVar();
    putSide();
    putVS();
    o('txtName').firstChild.nodeValue=strName;
    putRank(intRank);
    o('gImgHost').getElementsByTagName('image')[0].setAttribute('xlink:href',dataImage);
    ////////////////////
    // USERPIC /////////
    ////////////////////
    sendRequest('../upx/'+lnkPic,'',function(){
        hideG('gLoad');
        var arrPic=xhr.responseText.split(':');
        var wPic=arrPic[0]*1;
        var hPic=arrPic[1]*1;
        var strPic=arrPic[2];
        OBJ_host.wPic=wPic;
        OBJ_host.hPic=hPic;
        OBJ_host.strPic=strPic;
        var zPic=0.225, btnPic=o('btnHost'), pthPic=btnPic.getElementsByTagName('path')[0]
        showG(btnPic.getElementsByTagName('g')[0]);
        pthPic.setAttribute('transform','translate('+(btnPic.rx-wPic*zPic/2)+','+(btnPic.ry-hPic*zPic/2)+') scale('+zPic+')');
        pthPic.setAttribute('d',strPic);
        ////////////////////
        // LINK ////////////
        ////////////////////
        var strHost='localhost';
        //var strHost='88.87.93.236';
        OBJ.peer=new Peer({host:strHost,port:8001,path:'/peerjs'});
        OBJ.peer.on('open', function(pid){
          OBJ.wbs=new WebSocket('ws://'+strHost+':8000','echo-protocol');
          OBJ_host.pid=pid;
          console.log('my pid: '+OBJ_host.pid);
          OBJ.wbs.addEventListener('message',function(e){
            var msg = e.data;
            var rsp=msg.split('~');
            if(rsp[0]=='hello'){
              OBJ.wbs.send('hello~'+OBJ_host.pid);
              ////////////////////
              // END SHOW ////////
              ////////////////////
              var imgLoad=document.getElementsByTagName('img')[0];
              imgLoad.parentNode.removeChild(imgLoad);
              sctRoot.style.display='block';
              OBJ.blnLock=false;
            }
            else if(rsp[0]=='in'){
              var pid=rsp[1];
              var objUser=getUser(pid);
              var peer=new Peer();
              var conn=peer.connect(objUser.pid);
            }
            else if(rsp[0]=='out'){
              for(var i in OBJ_club.arr){
                if(OBJ_club.arr[i].pid==rsp[1]){
                  OBJ_club.arr.splice(i,1);
                  break;
                }
              }
            }
          });
       });
       OBJ.peer.on('connection',function(conn){
         conn.on('data',function(data){
           texted(this,data);
         });
       });
    });
}
function findArena(){
  for(var i in OBJ_club.arr){
    var u=OBJ_club.arr[i];
    var conn=G_wrap.peer.connect(OBJ_club.arr[i].pid);
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
