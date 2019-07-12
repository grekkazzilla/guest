<?php
$strHost=trim(file_get_contents('../config/host.txt'));
?>
<!DOCTYPE html>
<html>
<head>
<title>VarChess</title>
<meta http-equiv='content-type' content='text/html; charset=utf-8' />
<link rel='icon' href='favicon.ico' type='image/x-icon'>
<link rel='shortcut icon' href='favicon.ico' type='image/x-icon'>
<meta name='viewport' content='user-scalable=no' />
<link rel='stylesheet' type='text/css' href='style.css' />
<style type='text/css'>
    section,input,canvas{display:none;}
</style>
<script type='text/javascript' src='../lib/p4wn.js'></script>
<script type='text/javascript' src='../lib/peer.min.js'></script>
<!-- -->
<script type='text/javascript' src='inc_script.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_svg.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_chess.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_board.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_pic.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_unit.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_load.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='inc_say.js?v=<?php echo rand(0,1000);?>'></script>
<!-- -->
<script type='text/javascript' src='obj_arena.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='obj_host.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='obj_user.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='obj_watch.js?v=<?php echo rand(0,1000);?>'></script>
<!-- -->
<script type='text/javascript' src='aux_var.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='aux_link.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='aux_box.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='aux_button.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='aux_run.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='aux_find.js?v=<?php echo rand(0,1000);?>'></script>
<!-- -->
<script type='text/javascript' src='div_arena.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_img.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_pic.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_book.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_form.js?v=<?php echo rand(0,1000);?>'></script>
<script type='text/javascript' src='div_watch.js?v=<?php echo rand(0,1000);?>'></script>
<!-- -->
<script type='text/javascript' src='box_time.js?v=<?php echo rand(0,1000);?>'></script>
<!-- -->
<script type='text/javascript'>
  var OBJ=new Object();
  OBJ.w=400;
  OBJ.h=600;
  OBJ.fltScale=1;
  OBJ.blnLock=true;
  OBJ.boxOn=null;
  OBJ.divOn=null;
  OBJ.wbs=null;
  OBJ.peer=null;
  OBJ.strMode='standby';
  OBJ.strHost='<?php echo($strHost); ?>';
  OBJ.blnWatch=false;
  function init(){
    // DEFINE ROOT ELEMENTS
    var sctRoot=document.getElementById('sctRoot');
    var svgRoot=document.getElementsByTagName('svg')[0];
    var gWrap=svgRoot.getElementsByTagName('g')[0];
    getButton('btnClose',gWrap,-9999,-9999,40,40,false,'BXBX',picCross(),0.09,function(){hideBox(OBJ.boxOn)},null);
    getRect('rctBlur',gWrap,0,0,0,0,0,'#808080','transparent',0).setAttribute('filter','url(#blr2)');
    var dfs=svgRoot.getElementsByTagName('defs')[0];
    // GRADIENTS & EFFECTS
    getLinGrd('grdButton','#eee8aa','#bdb76d',1,1,false,'down',dfs);
    getLinGrd('grdButtonRvs','#bdb76d','#eee8aa',1,1,false,'down',dfs);
    getLinGrd('grdIcon','#a0a0a0','#000',1,1,false,'down',dfs);
    getLinGrd('grdIconRvs','#505050','#909090',1,1,false,'down',dfs);
    getLinGrd('grdPale','#fff','#eee8aa',1,1,false,'down',dfs);
    getLinGrd('grdPaleRvs','#eee8aa','#fff',1,1,false,'down',dfs);
    getLinGrd('grdGold','#ffeeaa','#aa8800',1,1,false,'down',dfs);
    getLinGrd('grdGoldBrd','#d3bc5f','#2b2200',1,1,false,'down',dfs); // gold border
    getLinGrd('grdSilver','#ececec','#999999',1,1,false,'down',dfs);
    getLinGrd('grdSilverRvs','#999999','#ececec',1,1,false,'down',dfs);
    getLinGrd('grdBrain','#fff','#bdb76d',1,1,false,'down',dfs);
    getLinGrd('grdRed','#ff8080','#aa0000',1,1,false,'down',dfs);
    getBlurFilter('blr2',2,dfs);
    getBlurFilter('blr3',3,dfs);
    getBlurFilter('blr6',3,dfs);
    getBlurFilter('blr8',8,dfs);
    getBlurFilter('blr10',10,dfs);
    getBlurFilter('blr12',12,dfs);
    getBlurFilter('blr14',14,dfs);
    // FULL SCALE UP
    OBJ.fltScale=getScale(svgRoot,gWrap,OBJ.w,OBJ.h,10);
    //getGrid(gWrap,OBJ.w,OBJ.h,10);
    //
    getLoad('gLoad',gWrap,-9999,-9999,1,'none',0);
    getSay(gWrap,OBJ.w,OBJ.h,'url(#blr3)');
    //

    var divArena=getArena(gWrap);
    drawTimeHead(divArena);
    putTimeHead();
    drawTimeBox(divArena);
    putTimeBox();
    OBJ.divOn=divArena;
    getPic(gWrap);
    getImage(gWrap);
    getForm(gWrap);
    drawWatch(gWrap);
    getBook(gWrap);
    //
    // BOX GAME END
    var box=getBox('boxGameEnd',gWrap,250,230,false,'url(#grdPale)');
    getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'Checkmate','start');
    //
    var gWhiteKnight=getG(null,box,0,0,0,true,504/2,504/2);
    getPath(null,gWhiteKnight,0,0,1,'url(#grdIcon)','none',0,'M 229.02734 30.173828 C 228.37908 30.174204 227.68908 30.268908 226.92578 30.412109 C 224.05378 30.951109 220.58211 34.140062 206.66211 49.039062 C 197.42361 58.926963 189.52347 67.017578 189.10547 67.017578 C 188.68747 67.017578 176.27634 59.756813 161.52734 50.882812 C 129.55664 31.647112 129.762 31.745338 125.5332 33.523438 C 119.3251 36.133437 119.33242 36.034797 122.35742 74.216797 L 124.55273 101.91797 L 121.6543 106.2168 C 120.0603 108.5818 112.55296 116.66423 104.97266 124.17773 C 93.489452 135.55913 90.649872 138.97973 87.951172 144.67773 L 84.710938 151.51758 L 84.667969 170.01758 C 84.629769 186.62058 84.393681 189.17134 82.363281 194.89844 C 78.446281 205.94644 72.7365 216.13367 58.6875 237.13867 C 38.1591 267.83067 29.995822 285.96642 28.544922 304.10742 C 26.288922 332.32342 46.647516 357.29714 75.353516 361.52734 C 79.556216 362.14664 80.165128 362.58989 81.798828 366.21289 C 82.791228 368.41379 85.009363 371.2859 86.726562 372.5957 C 90.409562 375.4046 97.359893 378.01563 101.1543 378.01562 C 110.0443 378.01563 122.72277 370.423 130.60938 360.375 C 133.07067 357.239 137.65342 349.6888 140.79492 343.5957 C 157.70492 310.7977 163.65569 305.14825 201.55469 285.90625 C 211.53969 280.83725 224.37342 273.83812 230.07422 270.35352 C 235.77502 266.86892 240.68036 264.01758 240.97461 264.01758 C 241.26886 264.01758 241.24821 269.98008 240.92773 277.26758 C 240.01973 297.91658 236.60984 311.34436 227.96484 328.31836 C 220.72084 342.54036 214.52019 350.08758 191.24219 373.01758 C 165.40319 398.46958 158.64451 407.57002 152.78711 424.79102 C 145.93341 444.94102 147.13554 468.718 155.21094 472.75 L 155.21484 472.75391 C 157.18484 473.73876 190.78555 473.95372 314.43555 473.76172 L 469.15625 473.52148 C 475.12191 467.93608 475.63245 454.10749 475.60547 448.73438 C 475.27447 385.95438 462.84492 306.97555 442.66992 239.43555 C 430.92092 200.10155 418.10297 172.06658 400.41797 147.01758 C 392.23397 135.42558 374.55417 117.54386 363.57617 109.75586 C 347.13317 98.090858 326.82314 89.295575 306.36914 84.984375 C 295.10514 82.610135 273.41456 81.461125 264.50586 82.765625 L 258.30273 83.673828 L 246.9082 58.630859 C 236.03283 34.725693 233.56516 30.171197 229.02734 30.173828 z');
    getPath(null,gWhiteKnight,0,0,1,'#fff','none',0,'M 225.88477 54.650391 L 210.29297 70.751953 L 194.70117 86.853516 L 167.53711 98.542969 L 140.37109 110.23438 L 133.82031 119.00586 C 130.21771 123.83026 122.75056 131.94792 117.22656 137.04492 C 102.39656 150.72992 102.71686 149.98458 102.63086 171.01758 C 102.56896 186.07958 102.24679 189.56258 100.32617 196.01758 C 96.539874 208.74358 88.106875 224.63858 73.796875 246.01758 C 58.099875 269.46858 49.933562 285.0603 47.601562 296.0293 C 45.619563 305.3519 46.203837 316.99864 48.960938 323.14062 C 53.828437 333.98462 65.791344 342.58759 77.527344 343.68359 L 83.949219 344.2832 L 90.646484 335.40039 C 94.330484 330.51489 98.325237 325.97239 99.523438 325.30469 C 104.36884 322.60329 109.58369 324.31909 111.67969 329.30469 C 113.44369 333.49989 112.56527 335.52057 104.07031 346.82617 C 100.22381 351.94537 97.222136 356.89517 97.398438 357.82617 C 97.978556 360.88897 104.19228 360.53245 108.83398 357.16992 C 115.26068 352.51452 119.54472 346.51203 128.26172 329.95703 C 132.73242 321.46613 138.34733 311.77583 140.73633 308.42383 C 149.90973 295.55583 163.74092 285.53744 192.54492 270.89844 C 220.88392 256.49644 245.94675 240.51295 253.34375 232.12695 C 262.06485 222.23875 265.76344 210.70598 264.89844 196.08398 C 264.25063 185.12998 265.35706 181.85672 270.29102 180.13672 C 272.79542 179.26368 274.12065 179.36076 276.75195 180.60938 C 280.93375 182.59376 282.22647 186.04108 282.91797 197.05078 C 283.97337 213.85378 276.44696 233.69586 264.34766 246.00586 L 257.70117 252.76562 L 258.50586 259.14258 C 259.70486 268.63568 258.50186 290.22958 256.20117 300.51758 C 251.66637 320.79358 243.13189 340.10433 231.96289 355.36133 C 228.65069 359.88573 216.29952 373.09258 204.22852 385.01758 C 182.69652 406.28858 176.47022 413.82063 171.57422 424.51562 C 168.45872 431.32063 166.24095 441.77758 166.21875 449.76758 L 166.20117 456.01758 L 307.64258 456.01758 C 358.43548 455.59762 408.20397 457.04826 458.83984 456.42383 C 458.83984 456.42383 461.72738 452.45798 458.62109 413.01758 C 452.81789 339.33458 434.84905 252.62758 414.99805 202.51758 C 409.18455 187.84258 398.10259 166.86558 390.43359 156.01758 C 373.97159 132.73158 349.50314 113.66356 324.61914 104.72656 C 309.69014 99.364665 298.13217 97.511016 280.20117 97.603516 C 269.48417 97.658796 261.08433 98.232684 256.23633 99.240234 C 252.13083 100.09338 248.25003 100.5908 247.61133 100.3457 C 246.97263 100.1006 242.94104 92.163584 238.65234 82.708984 C 234.36364 73.254384 229.73554 63.072984 228.36914 60.083984 L 225.88477 54.650391 z');
    getPath(null,gWhiteKnight,0,0,1,'#fff','none',0,'M 139.42383 58.474609 C 139.26883 58.626209 139.68028 65.943981 140.33789 74.738281 L 141.5332 90.728516 L 156.70312 84.123047 L 171.875 77.519531 L 155.78906 67.859375 C 146.94236 62.545975 139.57883 58.323009 139.42383 58.474609 z');
    //getPath(null,gWhiteKnight,0,0,1,'#808080','none',0,'M 150.55664 151.09375 C 145.25653 151.09695 139.5428 153.72921 135.49805 158.33594 C 132.84705 161.35394 119.8035 182.33686 115.2793 190.85938 L 115.28125 190.85938 C 114.11715 193.05226 114.18835 193.16297 116.37305 192.55859 C 117.65735 192.20329 122.52064 190.02821 127.18164 187.72461 C 133.61004 184.54801 137.47314 181.72229 143.18164 176.02539 C 150.09664 169.12439 158.20703 157.37827 158.20703 154.26367 C 158.20703 153.54997 157.05338 152.52662 155.64258 151.99023 C 154.04458 151.38271 152.32334 151.09268 150.55664 151.09375 z');
    getPath(null,gWhiteKnight,0,0,1,'url(#grdIcon)','none',0,'M 68.005859 288.02344 C 63.654959 288.03054 59.204462 291.77968 56.476562 297.73828 C 54.415662 302.23928 53.783964 305.45586 53.402344 313.38086 L 52.921875 323.35547 L 63.8125 315.87891 C 74.8911 308.27431 79.205078 303.63397 79.205078 299.32227 C 79.205078 293.63567 73.633559 288.01428 68.005859 288.02344 z');
    gWhiteKnight.setAttribute('transform','translate(110,65) scale(-0.2,0.2)');
    //
    var gBlackKnight=getG(null,box,140,65,0.2,true,504/2,504/2);
    getPath(null,gBlackKnight,0,0,1,'url(#grdIcon)','none',0,'M 227.59766 39.5 C 227.17693 39.5 218.6461 48.214356 208.64062 58.865234 L 190.44922 78.230469 L 159.8457 59.857422 C 130.95617 42.512342 129.2257 41.620471 128.93359 43.919922 C 128.76341 45.259612 129.55092 57.561374 130.68359 71.257812 C 131.81627 84.954253 132.74413 97.927344 132.74414 100.08789 C 132.74414 106.1363 126.23473 115.16522 111.18164 130 C 93.171581 147.74886 93.297369 147.468 93.230469 170 C 93.177999 187.67468 93.11885 188.1717 89.900391 197.5 C 85.600161 209.96368 80.65398 218.84365 64.556641 243 C 49.067571 266.24356 44.985905 273.67949 40.714844 286.42773 C 31.786124 313.07818 38.95071 336.07095 59.519531 346.7793 C 67.055741 350.70273 74.208523 352.5 82.292969 352.5 L 87.744141 352.5 L 87.746094 355.75 C 87.753644 362.31275 93.950914 368.5 100.51562 368.5 C 105.49401 368.5 112.46566 365.49593 117.23828 361.29492 C 123.16939 356.07414 127.96264 348.9493 136.32031 332.92773 C 151.27537 304.25903 158.02907 298.16015 197.59375 277.58984 C 218.30295 266.8228 229.91056 259.99726 241.41797 251.82031 L 247.5918 247.43359 L 248.41797 253.2168 C 249.88217 263.46703 249.28851 288.19972 247.36133 297.26758 C 243.60173 314.95749 235.84398 332.95055 225.70117 347.5 C 222.582 351.97432 211.70053 363.67363 198.73047 376.5 C 176.86356 398.12467 169.87432 406.35223 164.75 416.5 C 158.53954 428.7987 155.72748 444.18743 157.19141 457.85742 L 157.90234 464.5 L 312.48242 464.5 L 467.06055 464.5 L 466.40039 444.04883 C 464.03839 370.81159 450.3101 290.82823 429.31641 228 C 414.31345 183.10052 398.88753 155.69841 375.24414 131.95117 C 349.63551 106.23008 319.19919 92.543556 283.74414 90.802734 C 274.46835 90.347294 260.26535 91.292051 253.53906 92.8125 C 253.0816 92.91591 247.23031 80.9625 240.53516 66.25 C 233.84002 51.5375 228.01838 39.5 227.59766 39.5 z');
    getPath(null,gBlackKnight,0,0,1,'#fff','none',0,'M 281.3125 96.964844 C 266.07263 96.815012 251.14872 98.542053 247.75781 101.70117 C 244.81411 104.44363 245.32644 110.11922 248.74805 112.66211 C 251.12883 114.43146 251.74867 114.44932 261.24805 113.01758 C 298.67507 107.37663 333.28489 118.23571 360.89453 144.28125 C 387.95614 169.80979 406.94263 212.58752 423.13086 284.5 C 434.85602 336.58648 441.30039 381.69442 444.77539 436 C 445.7397 451.06867 446.10452 453.25524 447.97852 455.25 C 450.83531 458.29096 455.16646 458.1675 458.38086 454.95312 C 460.88875 452.44527 460.91824 452.23897 460.27344 441.70312 C 456.62864 382.15271 450.26766 336.41494 438.13086 282.5 C 427.84956 236.82766 417.34544 205.15878 403.63477 178.5 C 394.60269 160.9382 385.61894 148.36258 373.25195 135.97266 C 353.97111 116.65605 333.19082 105.23154 306.66211 99.359375 C 299.71331 97.821256 290.45642 97.054743 281.3125 96.964844 z');
    getPath(null,gBlackKnight,0,0,1,'#ffaaaa','none',0,'M 151.09961 150.68555 C 148.2337 150.61299 144.92854 151.1413 142.23438 152.36523 C 136.7414 154.86065 133.16102 159.24015 123.95312 174.72656 C 112.70714 193.64075 113.08746 192.82329 115.9082 192.04297 C 117.19291 191.68758 122.05774 189.51253 126.71875 187.20898 C 133.14718 184.03192 137.01026 181.20667 142.71875 175.50977 C 149.63422 168.60833 157.74414 156.86267 157.74414 153.74805 C 157.74413 151.86552 154.78435 150.77883 151.09961 150.68555 z');
    getPath(null,gBlackKnight,0,0,1,'#fff','none',0,'M 67.542969 287.50391 C 63.19167 287.51097 58.741602 291.26016 56.013672 297.21875 C 53.952742 301.72042 53.321073 304.93432 52.939453 312.85938 L 52.458984 322.83594 L 63.351562 315.35938 C 69.341962 311.24723 75.256571 306.3794 76.494141 304.54297 C 77.731712 302.70653 78.744141 300.1237 78.744141 298.80273 C 78.744142 293.11644 73.170679 287.49476 67.542969 287.50391 z');
    //
    getText(null,box,50,200,18,'Arial','url(#grdIcon)','none',0,'beaten','middle');
    getText(null,box,box.rx,200,18,'Arial','url(#grdIcon)','none',0,'0 - 1','middle');
    getPath(null,box,75,95,0.04,'#606060','none',0,picCrossB()[2]); // 27 186 #ffaaaa
    getPath(null,box,186,175,0.12,'url(#grdIcon)','none',0,picAward()[2]); // 27 186 #ffaaaa
    getPath(null,box,197,185.5,0.04,'#eee8aa','none',0,picStarA()[2]); // 27 186 #ffaaaa
    //getPath(null,box,100,186,0.17,'url(#grdIcon)','none',0,picAgree()[2]); // 27 186 #ffaaaa
    //
    OBJ_host.get();
    OBJ_host.putName();
    OBJ_host.putRank(OBJ_host.intRank);
    OBJ_host.putImage();
    OBJ_host.loadPic('none',function(){
      link();
      var imgLoad=document.getElementsByTagName('img')[0];
      imgLoad.parentNode.removeChild(imgLoad);
      sctRoot.style.display='block';
      OBJ.blnLock=false;
    });
    OBJ_host.objMatch=null; // objUser linked opponent when found and chosen
  }
</script>
</head>
<body onload='init();'>
    <p style='position:fixed;top:40%;width:100%;text-align:center;'><img src='load.gif' /></p>
    <section id='sctRoot'>
        <svg>
            <g id='divRoot'>
                <image xlink:href='' />
            </g>
            <defs></defs>
        </svg>
    </section>
    <input id='inpImage' type='file' onchange='if(this.value!=""){setImage(this.files);this.value="";}'>
    <canvas width='196' height='196' id='cnvImage'></canvas>
</body>
</html>
