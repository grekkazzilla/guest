<?php
$arrScan=scandir('../upx/');
$arrFound=array();
$arrResp=array();
for($i=0;$i<12;$i++){
    do{$lnkFound=$arrScan[rand(2,count($arrScan)-1)];}
    while(in_array($lnkFound,$arrFound));
    $strD=file_get_contents('../upx/'.$lnkFound);
    $arrFound[$i]=$lnkFound;
    $arrResp[$i]=$lnkFound.'`'.$strD;
}
echo('pix_ok~'.implode('^',$arrResp));
?>