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
    section,form{display:none;}
</style>
<!--script type='text/javascript' src='../libr/p4wn.js'></script>
<script type='text/javascript' src='../libr/peer.min.js'></script-->
<script type='text/javascript' src='init.js'></script>
<script type='text/javascript' src='script.js'></script>
<script type='text/javascript' src='svg.js'></script>
<script type='text/javascript' src='chess.js'></script>
<script type='text/javascript' src='board.js'></script>
<script type='text/javascript' src='control.js'></script>
<script type='text/javascript' src='pic.js'></script>
<script type='text/javascript' src='unit.js'></script>
<script type='text/javascript' src='form.js'></script>
<script type='text/javascript' src='load.js'></script>
<script type='text/javascript' src='say.js'></script>
<script type='text/javascript' src='pix.js'></script>
<script type='text/javascript' src='img.js'></script>
<script type='text/javascript'>
    var OBJ_var=new Object();
    OBJ_var.wArena=400;
    OBJ_var.hArena=600;
    OBJ_var.fltScale=1;
    OBJ_var.blnLock=true;
    OBJ_var.boxOn=null;
    OBJ_var.divOn=null;
    OBJ_var.wbs=null;
    OBJ_var.arrU=new Array();
    getU();
    function getU(){
        var u=new Object();
        u.strName='';
        u.lnkPic='';
        u.pcn=null;
        u.intRank=0;
        OBJ_var.arrU.push(u);
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
    <form enctype='multipart/form-data'>
        <input id='inpImage' type='file' onchange='if(this.value!="") setImage(this.files);'>
    </form>
</body>
</html>
