<?php
$namePlayer='Guest';         // user name
$strPass='';            // solid user password
$strSnake='';           // solid secret string to make hash
$strHash='';            // solid user hash
$strMug='';             // temporary secret string stored in session
$strJug='';             // temporary secret string stored in cookie
$strShot='';            // temporary secret string submitted in async requests
$boolAuth=false;        // if user has been authorised
$boolSession=false;     // if session exists
$boolCookie=false;      // if cookies found
$strPass='';            // cookie jug or session mug to match
$filePass='';           // jug.txt or mug.txt
// CHECK SESSION
if(isset($_SESSION['name']) AND isset($_SESSION['mug'])){
    $namePlayer=$_SESSION['name'];
    $strMug=$_SESSION['mug'];
    $strPass=$strMug;
    $filePass='../u/'.$namePlayer.'/mug.txt';
    $boolSession=true;
}
// CHECK COOKIE
if($boolSession===false){
    if(isset($_COOKIE['name']) AND isset($_COOKIE['jug'])){
        $namePlayer=$_COOKIE['name'];
        $strJug=$_COOKIE['jug'];
        $strPass=$strJug;
        $filePass='../u/'.$namePlayer.'/jug.txt';
        $boolCookie=true;
    }
}
// CHECK AUTHORIZATION
if($boolSession===true || $boolCookie===true){
    if(file_exists($filePass)){
        if($strPass==file_get_contents($filePass)){
            $boolAuth=true;
        } 
    }
}
// IF AUTHORIZED
// REWRITE PASS FILES, SESSION & COOKIE (MUG, JUG & SHOT)
if($boolAuth===true){
    // MUG
    $strMug=getRndStr(7);
    if($fp=fopen('../u/'.$namePlayer.'/mug.txt','w+')){
        if(fwrite($fp,$strMug)){
            $_SESSION['name']=$namePlayer;
            $_SESSION['mug']=$strMug;
            fclose($fp);
        }else exit;
    }else exit;
    // JUG
    $strJug=getRndStr(7);
    if($fp=fopen('../u/'.$namePlayer.'/jug.txt','w+')){
        if(fwrite($fp,$strJug)){
            $addTime=3600*24*2;
            setcookie('name',$namePlayer,time()+$addTime,'/');
            setcookie('jug',$strJug,time()+$addTime,'/');
            fclose($fp);
        }else exit;
    }else exit;
    // SHOT
    $strShot=getRndStr(7);
    if($fp=fopen('../u/'.$namePlayer.'/shot.txt','w+')){
        if(fwrite($fp,$strShot)){
            fclose($fp);
        }else exit;
    }else exit;
}
?>