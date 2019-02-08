<?php
$strID=$_POST['id'];
$lnkPic=file_get_contents('../u/'.$strID.'/pic.txt');
$strPic=file_get_contents('../upx/'.$lnkPic);
echo('meet_1~'.$strPic);
?>