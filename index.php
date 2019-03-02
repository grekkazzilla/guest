<?php

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
<script type='text/javascript' src='init.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='script.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='svg.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='chess.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='board.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='var.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='control.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='pic.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='unit.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='form.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='load.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='say.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='pix.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='img.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='put.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='box.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='button.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='run.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript'>
    var OBJ_var=new Object();
    OBJ_var.wArena=400;
    OBJ_var.hArena=600;
    OBJ_var.fltScale=1;
    OBJ_var.blnLock=true;
    OBJ_var.boxOn=null;
    OBJ_var.divOn=null;
    OBJ_var.wbs=null;
    OBJ_var.intVar=1;
    OBJ_var.blnSide=true;
    OBJ_var.strSide='any';
    OBJ_var.strVS='human';
    OBJ_var.arrHist=new Array();
    OBJ_var.arrUser=new Array();
    OBJ_var.objDrive=null;
    OBJ_var.strMode='standby';
    OBJ_var.numShowMove=0;
    getUser();
    function getUser(){
        var objUser=new Object();
        objUser.strName='';
        objUser.lnkPic='';
        objUser.pcn=null;
        objUser.intRank=0;
        objUser.lnkPic='';
        objUser.strPic='';
        objUser.wPic=0;
        objUser.hPic=0;
        objUser.dataImage='';
        OBJ_var.arrUser.push(objUser);
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
