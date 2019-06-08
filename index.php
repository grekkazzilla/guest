<?php
$strHost=trim(file_get_contents('../config/host.txt'));
?>
<!DOCTYPE html>
<html>
<head>
<title>VarChess</title>
<meta http-equiv='content-type' content='text/html; charset=utf-8' />
<link rel='icon' href='favicon.ico' type='image/x-icon'>
<link rel='shortcut icon' href='favicon.ico' type='image/x-icon'>
<meta name='viewport' content='user-scalable=no' />
<link rel='stylesheet' type='text/css' href='style.css' />
<style type='text/css'>
    section,input,canvas{display:none;}
</style>
<script type='text/javascript' src='../lib/p4wn.js'></script>
<script type='text/javascript' src='../lib/peer.min.js'></script>
<!-- -->
<script type='text/javascript' src='inc_script.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_svg.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_chess.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_board.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_pic.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_unit.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_load.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_say.js?v=<?php echo rand(0,1000);?>'></script>
<!-- -->
<script type='text/javascript' src='obj_arena.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='obj_host.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='obj_user.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='obj_watch.js?v=<?php echo rand(0,1000);?>'></script>
<!-- -->
<script type='text/javascript' src='aux_var.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='aux_link.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='aux_box.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='aux_button.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='aux_run.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='aux_find.js?v=<?php echo rand(0,1000);?>'></script>
<!-- -->
<script type='text/javascript' src='div_arena.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_img.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_pic.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_book.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_form.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_watch.js?v=<?php echo rand(0,1000);?>'></script>
<!-- -->
<script type='text/javascript'>
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
  OBJ.strHost='<?php echo($strHost); ?>';
  OBJ.blnWatch=false;
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
    //getGrid(gWrap,OBJ.w,OBJ.h,10);
    //
    getLoad('gLoad',gWrap,-9999,-9999,1,'none',0);
    getSay(gWrap,OBJ.w,OBJ.h,'url(#blr3)');
    //
    var divArena=getArena(gWrap);
    OBJ.divOn=divArena;
    getPic(gWrap);
    getImage(gWrap);
    getForm(gWrap);
    drawWatch(gWrap);
    getBook(gWrap);
    //
    OBJ_arena.get();
    OBJ_arena.putVar();
    OBJ_arena.putSide();
    OBJ_arena.putTimeTop();
    OBJ_arena.putTimeBox();
    //
    OBJ_host.get();
    OBJ_host.putName();
    OBJ_host.putRank(OBJ_host.intRank);
    OBJ_host.putImage();
    OBJ_host.loadPic('none',function(){
      OBJ.peer=new Peer({host:OBJ.strHost,port:8001,path:'/peerjs'});
      OBJ.peer.on('open',function(pid){
        OBJ.wbs=new WebSocket('ws://'+OBJ.strHost+':8000','echo-protocol');
        OBJ_host.pid=pid;
        console.log('my pid: '+OBJ_host.pid);
        OBJ.wbs.addEventListener('message',function(e){
          link_wbs_msg(e.data);
        });
      });
      OBJ.peer.on('connection',function(conn){
        conn.on('open',function(){
          this.on('data',function(data){
            link(this,data);
          });
        });
      });
    });
    OBJ_host.objMatch=null; // objUser linked opponent when found and chosen
  }
</script>
</head>
<body onload='init();'>
    <p style='position:fixed;top:40%;width:100%;text-align:center;'><img src='load.gif' /></p>
    <section id='sctRoot'>
        <svg>
            <g id='divRoot'>
                <image xlink:href='' />
            </g>
            <defs></defs>
        </svg>
    </section>
    <input id='inpImage' type='file' onchange='if(this.value!=""){setImage(this.files);this.value="";}'>
    <canvas width='196' height='196' id='cnvImage'></canvas>
</body>
</html>
