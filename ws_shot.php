<?php
$strName=$_GET['name'];
$strShot=$_GET['shot'];
$dir='../u/';
$arrScan=scandir($dir);
if(in_array($strName,$arrScan)){
    if($strShot==file_get_contents($dir.$strName.'/shot.txt')) echo('1~'.$strName);
    else echo('0~'.$strName);
}
else echo('0~'.$strName);
?>