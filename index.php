<?php
require_once('inc_script.php');
require_once('inc_pass_sync.php');
$strClub='';            // contact list of favourite users
$lnkPic='';
if($boolAuth===true){
    // PIC DATA
    $lnkPic=file_get_contents('../u/'.$namePlayer.'/pic.txt');
    // CLUB DATA
    $scanDir=scandir('../u/'.$namePlayer.'/club/');
    $arrClub=array();
    for($i=2;$i<count($scanDir);$i++){
        $nameUser=substr($scanDir[$i],0,strlen($scanDir[$i])-4);
        $arrClub[]=$nameUser;
    }
    if(count($arrClub)>0) $strClub=implode(':',$arrClub);
}
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
<script type='text/javascript' src='club.js'></script>
<script type='text/javascript' src='match.js'></script>
<script type='text/javascript' src='member.js'></script>
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
    OBJ_var.arrArena=new Array();
    OBJ_var.numArena=0;
    OBJ_var.blnLock=true;
    OBJ_var.boxOn=null;
    OBJ_var.divOn=null;
    OBJ_var.divPrev=null;
    OBJ_var.blnAuth=<?php echo $boolAuth ? 'true' : 'false'; // alt: var_export($bool_var,true) ?>;
    OBJ_var.ctgClub='watch'; // watch OR find
    OBJ_var.arrClub=new Array();
    OBJ_var.arrWatch=new Array();
    OBJ_var.arrFind=new Array();
    OBJ_var.qtyClubPage=0;
    OBJ_var.numClubPage=0;
    OBJ_var.pcn=null;
    OBJ_var.wbs=null;
    OBJ_var.arrClub[0]=getClub('');
    OBJ_var.arrClub[0].blnOn=true;
    OBJ_var.arrClub[0].ctg='player';
    if(OBJ_var.blnAuth===true){
        OBJ_var.arrClub[0].strName='<?php echo($namePlayer);?>';
        OBJ_var.arrClub[0].lnkPic='<?php echo($lnkPic);?>';
        OBJ_var.strShot='<?php echo($strShot);?>';
    }
    else{
        OBJ_var.arrClub[0].strName=getLocal('name','Stranger');
        OBJ_var.arrClub[0].lnkPic=getLocal('pic','00007.txt');
        OBJ_var.strShot='none';
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
