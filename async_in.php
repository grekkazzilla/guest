<?php
require_once('../inc/script.php');
// RECEIVE DATA
$namePlayer=reStr($_POST['name']);
$strPass=reStr($_POST['pass']);
// SCAN USERS
$dirScan='../u/';
$arrScan=scandir($dirScan);
// FIND NAME
$blnFound=false;
for($i=2;$i<count($arrScan);$i++){
    if($namePlayer==$arrScan[$i]){
        $blnFound=true;
        $strSnake=file_get_contents($dirScan.$arrScan[$i].'/snake.txt');
        $strHash=file_get_contents($dirScan.$arrScan[$i].'/hash.txt');
        if(password_verify($strPass.$strSnake,$strHash)){
            if($fp=fopen($dirScan.$arrScan[$i].'/mug.txt','w+')){
                $strMug=getRndStr(7);
                if(fwrite($fp,$strMug)){
                    echo('in_ok~Good`You are in!');
                    fclose($fp);
                    $_SESSION['name']=$namePlayer;
                    $_SESSION['mug']=$strMug;
                    exit;
                }
                else{echo('in_fail~An error has occured ...');exit;}
            }
            else{echo('in_fail~An error has occured ...');exit;}
        }
        else{echo('in_fail~Error`Wrong login or password');exit;};
        break;
    }
}
if($blnFound===false) echo('in_fail~Error`Wrong login or password');
?>