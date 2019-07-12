//////////////////////////////////////////////////////
function getBox(strID,gRoot,wBox,hBox,blnShow,strFill){
    var gBoard=o('gBoard');
    var xBox=gBoard.x+gBoard.rx*gBoard.z-wBox/2;
    var yBox=gBoard.y+gBoard.ry*gBoard.z-hBox/2;
    var box=getG(strID,gRoot,xBox,yBox,1,blnShow,wBox/2,hBox/2);
    getRect(null,box,0,0,wBox,hBox,0,strFill,'transparent',0);
    return box;
}
function getMenu(strID,gRoot,wButton,hButton,intPad,intMargin,qtyHor,qtyVer,blnShow){
    if(strID=='boxPromoteWhite' || strID=='boxPromoteBlack') var intAddHeight=10;
    else intAddHeight=60;
    var wBox=wButton*qtyHor+intPad*2+(qtyHor-1)*intMargin;
    var hBox=hButton*qtyVer+intAddHeight+intPad+(qtyVer-1)*intMargin;
    if(strID=='menuMain') hBox+=25;
    var box=getBox(strID,gRoot,wBox,hBox,blnShow,'#fff');
    return box;
}
function showDiv(div){
    if(typeof(div)=='string') div=o(div);
    if(OBJ.divOn==o('divWatch')){
      OBJ.strMode='standby';
      for(var i in OBJ_user.arr){
        OBJ_user.arr[i].conn.send('arena_off');
      }
    }
    hideG(OBJ.divOn);
    OBJ.divOn=div;
    if(OBJ.boxOn!==null) hideBox(OBJ.boxOn);
    showG(div);
}
function showBox(box){
    if(typeof(box)=='string') box=o(box);
    if(OBJ.boxOn==box) hideBox(OBJ.boxOn);
    else{
        if(OBJ.boxOn!==null) hideBox(OBJ.boxOn);
        if(box.id=='boxHost'){
            o('btnHost').getElementsByTagName('path')[0].setAttribute('fill','url(#grdButton)');
            if(OBJ_host.dataImage==''){
                box.rx=360/2, box.ry=270/2;
                var xLab=110, yLabRank=200;
                var xPen=box.rx-50, xPic=box.rx+20, xCam=box.rx+90, yCam=110;
                var yRank=220;
                hideG('btnBin');
                hideG('gImgHost');
            }
            else{
                box.rx=380/2, box.ry=350/2;
                var xLab=110, yLabRank=270;
                var xPen=box.rx+55, xPic=box.rx+120, xCam=box.rx+55, yCam=175;
                var yRank=290;
                showG('btnBin');
                showG('gImgHost');
            }
            var gBoard=o('gBoard');
            box.x=gBoard.x+gBoard.rx*gBoard.z-box.rx;
            box.y=gBoard.y+gBoard.ry*gBoard.z-box.ry;
            var arrRect=box.getElementsByTagName('rect');
            arrRect[0].setAttribute('width',box.rx*2);
            arrRect[0].setAttribute('height',box.ry*2);
            arrRect[1].setAttribute('width',box.rx*2);
            arrRect[1].setAttribute('height',box.ry*2);
            o('linHost').setAttribute('y2',box.ry*2-7);
            o('labName').setAttribute('x',xLab);
            o('rctName').setAttribute('width',box.rx*2-120);
            o('txtName').setAttribute('x',box.rx+50);
            var btn=o('btnName'); jumpG(btn,xPen,btn.y);
            var btn=o('btnPic'); jumpG(btn,xPic,btn.y);
            var btn=o('btnImage'); jumpG(btn,xCam,yCam);
            var lab=o('labRank'); lab.setAttribute('x',xLab); lab.setAttribute('y',yLabRank);
            var g=o('gRank'); jumpG(g,box.rx-g.rx+50,yRank);
        }
        else if(box.id=='boxGo'){
            OBJ.blnLock=true;
            o('btnClose').blnUnlock=true;
            setLatestHistory();
            setHistoryButtons();
        }
        // close button and blur rect
        var rctBkg=box.getElementsByTagName('rect')[0];
        var rctBlur=o('rctBlur');
        rctBlur.setAttribute('width',box.rx*2);
        rctBlur.setAttribute('height',box.ry*2);
        box.insertBefore(rctBlur,rctBkg);
        if(box.id!='boxPromoteWhite' && box.id!='boxPromoteBlack'){
            var btnClose=document.getElementById('btnClose');
            jumpG(btnClose,box.rx*2-50,10);
            box.appendChild(btnClose);
        }
        //
        OBJ.boxOn=box;
        OBJ.divOn.appendChild(box);
        showG(box);
    }
}
function hideBox(box){
    if(typeof(box)=='string') box=o(box);
    hideG(box);
    OBJ.boxOn=null;
    if(box.id=='boxHost') o('btnHost').getElementsByTagName('path')[0].setAttribute('fill','url(#grdIcon)');
    else if(box.id=='boxGo'){
      OBJ.blnLock=false;
      o('btnClose').blnUnlock=false;
    }
    else if(box.id=='boxTime'){
      var num=OBJ_arena.numOn;
      var objArena=OBJ_arena.arr[numOn];
      setLocal('baseA'+num,objArena.intBaseA);
      setLocal('baseB'+num,objArena.intBaseB);
      setLocal('baseC'+num,objArena.intBaseC);
      setLocal('baseD'+num,objArena.intBaseD);
      setLocal('delayA'+num,objArena.intDelayA);
      setLocal('delayB'+num,objArena.intDelayB);
      setLocal('delayC'+num,objArena.intDelayC);
      setLocal('delayD'+num,objArena.intDelayD);
      setLocal('moveA'+num,objArena.intMoveA);
      setLocal('moveB'+num,objArena.intMoveB);
      setLocal('moveC'+num,objArena.intMoveC);
      setLocal('moveD'+num,objArena.intMoveD);
      setLocal('incrementA'+num,objArena.blnIncrementA);
      setLocal('incrementB'+num,objArena.blnIncrementB);
      setLocal('incrementC'+num,objArena.blnIncrementC);
      setLocal('incrementD'+num,objArena.blnIncrementD);
    }
    box.appendChild(o('rctBlur'));
}
