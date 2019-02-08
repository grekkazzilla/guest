<?php
require_once('../inc/script.php');
// RECEIVE DATA
$namePlayer=reStr($_POST['name']);
$strPass=reStr($_POST['pass']);
// CHECK LOGIN AND PASSWORD
if($namePlayer==''){
    echo('reg_fail~Error`Empty login name');
    exit;
}
if(strlen($namePlayer)<3){
    echo('reg_fail~Error`Login name is too short`Minimum three characters required');
    exit;
}
if (!preg_match('~^[a-z0-9_\-\' ]*$~i',$namePlayer)){
    echo('reg_fail~Error`Unallowed characters`Please use only English,`numbers and underscore`to make the login name');
    exit;
}
if($strPass==''){
    echo('reg_fail~Error`Empty password');
    exit;
}
// CHECK IF THIS NAME EXISTS
$fldUser='../u/'.$namePlayer;
if(!mkdir($fldUser,0700)){
    echo('reg_fail~Sorry`This name already exists`Please make a different login name');
    exit;
}
else{
    $strSnake=getRndStr(10);
    $strHash=password_hash($strPass.$strSnake,PASSWORD_DEFAULT);
    $strMug=getRndStr(7);
    // FILES
    saveFile($fldUser,'snake.txt',$strSnake);
    saveFile($fldUser,'hash.txt',$strHash);
    saveFile($fldUser,'reg.txt',time());
    saveFile($fldUser,'last_visit.txt',time());
    saveFile($fldUser,'mug.txt',$strMug);
    saveFile($fldUser,'jug.txt','0000000');
    saveFile($fldUser,'shot.txt','0000000');
    saveFile($fldUser,'skill.txt','2');
    saveFile($fldUser,'coin.txt','0');
    saveFile($fldUser,'pic_info.txt','0');
    saveFile($fldUser,'img_info.txt','none');
    saveFile($fldUser,'about.txt','none');
    saveFile($fldUser,'log.txt','ok');
    // FOLDERS
    makeDir($fldUser,'club');
    makeDir($fldUser,'book');
    makeDir($fldUser,'save');
    makeDir($fldUser,'mail');
    // RANDOM SELECTING A USER PIC
    $arr=scandir('../upx');
    array_shift($arr);
    array_shift($arr);
    $pic=$arr[rand(0,count($arr)-1)];
    saveFile($fldUser,'pic.txt',$pic);
}
// IF SUCCESSFUL SAVE SESSION AND REPORT OK
$_SESSION['name']=$namePlayer;
$_SESSION['mug']=$strMug;
echo("reg_ok~Good. Registered`Please memorize the password`You might want to change the userpic`that's been randomly assigned to you.");
exit;
// FUNCTIONS
function saveFile($fldUser,$fileName,$strData){
    if(!$fp=fopen($fldUser.'/'.$fileName,'a+')){
        echo('reg_fail~An error has occurred ...');
        delFld($fldUser);
        exit;
    }
    else{
        if(!fwrite($fp,$strData)){
            echo('reg_fail~An error has occurred ...');
            fclose($fp);
            delFld($fldUser);
            exit;
        }
        else fclose($fp);
    }
}
function makeDir($fldUser,$dirName){
    if(!mkdir($fldUser.'/'.$dirName.'/',0700)){
        echo('reg_fail~An error has occurred ...');
        delFld($fldUser);
        exit;
    }
}
function delFld($fldUser){
    chmod($fldUser,0777);
    $arrFile=scandir($fldUser);
    for($i=2;$i<count($arrFile);$i++){
        chmod($arrFile[$i],0777);
        if(is_dir($arrFile[$i])) rmdir($fldUser.'/'.$arrFile[$i]);
        else unlink($fldUser.'/'.$arrFile[$i]);
    }
    rmdir($fldUser);
}
?>