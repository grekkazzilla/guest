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
<script type='text/javascript' src='grekk.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='var.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='control.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='pic.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='unit.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='form.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='load.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='say.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='pix.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='img.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='box.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='button.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='run.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_pic.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='book.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='arena.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='club.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='watch.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='link.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript'>

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
