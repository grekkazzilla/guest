<?php
require_once('inc_script.php');
require_once('inc_pass_async.php');
if($boolPass===true){
    $doc=$_FILES['doc']['tmp_name'];
    $type=$_POST['type'];
    $scale=$_POST['scale'];
    $xImage=$_POST['xImage'];
    $yImage=$_POST['yImage'];
    $xSelect=($_POST['xSelect']-$xImage)/$scale;
    $ySelect=($_POST['ySelect']-$yImage)/$scale;
    $wSelect=$_POST['wSelect']/$scale;
    if($type=='image/jpeg') $imgSrc=imagecreatefromjpeg($doc);
    else if($type=='image/png') $imgSrc=imagecreatefrompng($doc);
    else if($type=='image/gif') $imgSrc=imagecreatefromgif($doc);
    $imgDst=imagecreatetruecolor(196,196);
    imagecopyresampled($imgDst,$imgSrc,0,0,$xSelect,$ySelect,196,196,$wSelect,$wSelect);
    imagejpeg($imgDst,'../u/'.$strPlayer.'/img.jpeg');
    imagedestroy($imgDst);
    $msgError='img_fail~Sorry`An error has occurred`No image has been uploaded.`Please, try again later.';
    //
    if(!$fp=fopen('../u/'.$strPlayer.'/img_info.txt','w')){
        echo($msgError);
        exit;
    }
    else if(!fwrite($fp,'posted~'.time())){
        echo($msgError);
        fclose($fp);
    }
    //
    echo('img_ok~Good`The image has been uploaded`It will take some time before` other players will be able to see it`after approval.');
}
else echo($msgError);
?>