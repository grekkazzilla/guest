//////////////////////////////////////////////////////
function getBox(strID,gRoot,wBox,hBox,blnShow,strFill){
    var gBoard=o('gBoard');
    var xBox=gBoard.x+gBoard.rx*gBoard.z-wBox/2;
    var yBox=gBoard.y+gBoard.ry*gBoard.z-hBox/2;
    var box=getG(strID,gRoot,xBox,yBox,1,blnShow,wBox/2,hBox/2);
    getRect(null,box,0,0,wBox,hBox,0,'#808080','transparent',0).setAttribute('filter','url(#blr2)');
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
    hideG(OBJ.divOn);
    OBJ.divOn=div;
    if(OBJ.boxOn!==null) hideBox(OBJ.boxOn);
    showG(div);
}
function showBox(box){
    if(typeof(box)=='string') box=o(box);
    if(OBJ.boxOn==box) hideBox(OBJ.boxOn);
    else{
        if(box.id=='boxHost'){
            o('btnHost').getElementsByTagName('path')[0].setAttribute('fill','url(#grdIcon)');
            if(OBJ_host.dataImage==''){
                box.rx=260/2, box.ry=270/2;
                var xLab=15, yLabRank=200;
                var xPen=box.rx-100, xPic=box.rx-30, xCam=box.rx+40, yCam=110;
                var yRank=220;
                hideG('btnBin');
                hideG('gImgHost');
            }
            else{
                box.rx=280/2, box.ry=350/2;
                var xLab=20, yLabRank=270;
                var xPen=box.rx+5, xPic=box.rx+70, xCam=box.rx+5, yCam=175;
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
            o('labName').setAttribute('x',xLab);
            o('rctName').setAttribute('width',box.rx*2-20);
            o('txtName').setAttribute('x',box.rx);
            var btn=o('btnName'); jumpG(btn,xPen,btn.y);
            var btn=o('btnPic'); jumpG(btn,xPic,btn.y);
            var btn=o('btnImage'); jumpG(btn,xCam,yCam);
            var lab=o('labRank'); lab.setAttribute('x',xLab); lab.setAttribute('y',yLabRank);
            var g=o('gRank'); jumpG(g,box.rx-g.rx,yRank);
        }
        else if(box.id=='boxGo'){
            OBJ.blnLock=true;
            o('btnClose').blnUnlock=true;
            setLatestHistory();
            setHistoryButtons();
        }
        if(box.id!='boxPromoteWhite' && box.id!='boxPromoteBlack'){
            var btnClose=document.getElementById('btnClose');
            jumpG(btnClose,box.rx*2-50,10);
            box.appendChild(btnClose);
        }
        if(OBJ.boxOn!==null) hideBox(OBJ.boxOn);
        OBJ.boxOn=box;
        OBJ.divOn.appendChild(box);
        showG(box);
    }
}
function hideBox(box){
    if(typeof(box)=='string') box=o(box);
    hideG(box);
    OBJ.boxOn=null;
    if(box.id=='boxHost') o('btnHost').getElementsByTagName('path')[0].setAttribute('fill','url(#grdButton)');
    else if(box.id=='boxGo'){
      OBJ.blnLock=false;
      o('btnClose').blnUnlock=false;
    }
}
