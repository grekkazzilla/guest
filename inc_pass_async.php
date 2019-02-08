<?php
$boolPass=false;
if(
    isset($_SESSION['name']) AND
    isset($_SESSION['mug']) AND
    isset($_POST['shot'])
){
    $strPlayer=$_SESSION['name'];
    $strMug=$_SESSION['mug'];
    $strShot=$_POST['shot'];
    //
    if(
        $strMug==file_get_contents('../u/'.$strPlayer.'/mug.txt') AND
        $strShot==file_get_contents('../u/'.$strPlayer.'/shot.txt')
    )
    {
        $boolPass=true;
    }
}
?>