<?php
require_once('inc_script.php');
require_once('inc_pass_async.php');
if($boolPass===true){
    $docPic=$_POST['file'];
    if(file_exists('../upx/'.$docPic)){
        if($fp=fopen('../u/'.$strPlayer.'/pic.txt','w+')){
            if(fwrite($fp,$docPic)){
                fclose($fp);
                echo('change_pic_ok~Done`The userpic has been changed.~'.file_get_contents('../upx/'.$docPic));
            }
            else echo('change_pic_fail~An error has occurred ...');
        }
        else echo('change_pic_fail~An error has occurred ...');
    }
    else echo('change_pic_fail~An error has occurred ...');
}
else echo('change_pic_fail~An error has occurred ...');
?>