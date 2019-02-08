<?php
require_once('../inc/script.php');
require_once('../inc/pass_async.php');
// RECEIVE DATA
if($boolPass===true){
    $strFind=reStr($_POST['find']);
    if($strFind==''){
        echo("find_fail~Error`You've sent an empty string");
        exit;
    }
    else if(strlen($strFind)<3){
        echo('find_fail~Please`Enter more characters`three at least');
        exit;
    }
    // SCAN USERS TO FIND
    $arrScan=scandir('../u/');
    $arrFound=array();
    for($i=2;$i<count($arrScan);$i++){
        if(strpos($arrScan[$i],$strFind)!==false AND $arrScan[$i]!=$namePlayer){
            $arrFound[]=$arrScan[$i];
        }
    }
    //
    if(count($arrFound)>0){
        echo('find_ok~'.implode(':',$arrFound));
        exit;
    }
    else{
        echo('find_fail~Sorry ...`No matching names found');
        exit;
    }
}
else echo('find_fail~Sorry ...`An error has occurred.');
?>