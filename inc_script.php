<?php
session_start();
ini_set('display_errors','On'); 
error_reporting(E_ALL);
header('Content-Type: text/html; charset=utf-8');
function getRndStr($len){
    $strReturn='';
    $strPick='qwertyuiopasdfghjklzxcvbnm0123456789';
    $lenPick=strlen($strPick);
    for($i=0;$i<$len;$i++){
        $strChar=substr($strPick,rand(0,$lenPick-1),1);
        if(rand(0,1)==1) $strChar=strtoupper($strChar);
        $strReturn.=$strChar;
    }
    return $strReturn;
}
function reStr($str){return str_replace('|','',trim(strip_tags($str)));}
$pageThis=basename($_SERVER['PHP_SELF'],'.php');
$arr=explode('/',trim($_SERVER['PHP_SELF']));
$dirThis=$arr[count($arr)-2];
?>