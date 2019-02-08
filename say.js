function getSay(root,wPage,hPage,blr){
    var W=380, H=80, R=5, box=getG('boxSay',root,(wPage-W)/2,(hPage-H)/2,1,false,0,0);
    getRect(null,box,0,0,W,H,R,'#808080','none',0).setAttribute('filter','url(#blr2)');getRect(null,box,0,0,W,H,R,'url(#grdPale)','none',0);
    box.hPage=hPage;
    getText(null,box,10,30,20,'Round','#000','none',0,'','start').style.fontWeight='bold';
    getText(null,box,10,65,20,'Round','#000','none',0,'','start');
    getText(null,box,10,100,20,'Round','#bdb76d','none',0,'','start');
    getText(null,box,10,120,20,'Round','#bdb76d','none',0,'','start');
    getText(null,box,10,140,20,'Round','#bdb76d','none',0,'','start');
    var btn=getButton('btnCloseSay',box,(W-60-10),10,60,60,true,'BBBX',picCross(),0.125,function(){},null);
    btn.getElementsByTagName('path')[0].setAttribute('stroke-width','12');
    btn.blnUnlock=true;
}
function showSay(str,root){
    var box=o('boxSay');
    if(typeof(root)=='string') root=o(root);
    root.appendChild(box);
    var arr=str.split('`');
    var arrRct=box.getElementsByTagName('rect');
    var arrTxt=box.getElementsByTagName('text');
    showG(box);
    for(var i=0;i<5;i++){
        if(i<arr.length) arrTxt[i].firstChild.nodeValue=arr[i];
        else arrTxt[i].firstChild.nodeValue='';
    }
    var h=80;
    if(arr.length>4) h=155;
    else if(arr.length>3) h=135;
    else if(arr.length>2) h=115;
    arrRct[0].setAttribute('height',h);
    arrRct[1].setAttribute('height',h);
    jumpG(box,box.x,(box.hPage-h)/2);
}