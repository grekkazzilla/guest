function blinkCursor(){
    o('spnCursor').tmr=setInterval(function(){
        var spn=o('spnCursor');
        var attr=spn.style.visibility;
        if(attr=='hidden') spn.style.visibility='visible';
        else spn.style.visibility='hidden';
    },500);
}
function getInput(id,x,y,w,h,frm){
    var inp=getG(id,frm,x,y,1,true,w/2,h/2);
    getText(null,inp,8,28,18,'Arial','#bdb76d','none',0,'','start');
    getRect('rctLeft',inp,-10,0,w/2+35,h,0,'transparent','#f00',0).onclick=function(){
        putCursor(this);
    };
    getRect('rctRight',inp,w/2+25,0,w/2-15,h,0,'transparent','#f00',0).onclick=function(){
        putCursor(this);
    };
    var txt=getText(null,inp,w/2+25,28,18,'Arial','#000','none',0,'','middle');
    txt.maxlen=200;
    inp.style.cursor='pointer';
    return inp;
}
function setForm(ctg){;
    o('frmWrite').ctg=ctg;
    o('inp00').getElementsByTagName('text')[1].appendChild(o('spnCursor'));
    clearInput();
    o('spnCursor').style.display='inline';
    blinkCursor();
    if(ctg=='login' || ctg=='newreg'){
        o('inp00').getElementsByTagName('text')[0].firstChild.nodeValue='name:';
        o('inp01').getElementsByTagName('text')[0].firstChild.nodeValue='pass:';
        if(ctg=='login'){
            showG('icnLogIn');
            showG('btnNewReg');
            hideG('icnNewReg');
            hideG('btnLogIn');
        }
        else{
            showG('icnNewReg');
            showG('btnLogIn');
            hideG('icnLogIn');
            hideG('btnNewReg');
        }
        hideG('icnFind');
        hideG('icnName');
        hideG('gHide');
    }
    else if(ctg=='changepass'){
        o('inp00').getElementsByTagName('text')[0].firstChild.nodeValue='old:';
        o('inp01').getElementsByTagName('text')[0].firstChild.nodeValue='new:';
        hideG('icnFind');
        hideG('icnName');
        hideG('gHide');
    }
    else if(ctg=='search'){
        o('inp00').getElementsByTagName('text')[0].firstChild.nodeValue='find:';
        o('inp01').getElementsByTagName('text')[0].firstChild.nodeValue='';
        showG('icnFind');
        showG('gHide');
        hideG('icnLogIn');
        hideG('btnNewReg');
        hideG('icnNewReg');
        hideG('btnLogIn');
        hideG('icnName');
    }
    else if(ctg=='name'){
        o('inp00').getElementsByTagName('text')[0].firstChild.nodeValue='name:';
        o('inp01').getElementsByTagName('text')[0].firstChild.nodeValue='';
        hideG('icnFind');
        showG('gHide');
        hideG('icnLogIn');
        hideG('btnNewReg');
        hideG('icnNewReg');
        hideG('btnLogIn');
        showG('icnName');
        var strName=OBJ_var.arrUser[0].strName;
        var spnCursor=o('spnCursor');
        for(var i=0;i<strName.length;i++){
            var spn=getSpan();
            o('inp00').getElementsByTagName('text')[1].appendChild(spn);
            spn.innerHTML=strName.charAt(i);
        }
        spnCursor.parentNode.appendChild(spnCursor);
    }
}
function printBtn(str){
    var spnCursor=o('spnCursor');
    var txt=spnCursor.parentNode;
    if(txt.maxlen>txt.getComputedTextLength()){
        var spnNew=getSpan();
        spnNew.innerHTML=str;
        txt.insertBefore(spnNew,spnCursor);
    }
    if(o('btnCase').up===true){
        o('btnCase').up=false;
        changeCase();
    }
}
function getSpan(){
    var spnCursor=o('spnCursor');
    for(var i=0;i<spnCursor.arr.length;i++){
        if(spnCursor.arr[i].parentNode===null) return spnCursor.arr[i];
    }
    var spn=getSVG('tspan',null,null);
    spn.onclick=function(){
        this.parentNode.insertBefore(o('spnCursor'),this.nextSibling);
    }
    o('spnCursor').arr.push(spn);
    return spn;
}
function putCursor(rct){
    if(OBJ_var.blnLock===false){
        var txt=rct.parentNode.getElementsByTagName('text')[1];
        var spnCursor=o('spnCursor');
        if(rct.nextSibling.tagName=='rect') txt.insertBefore(spnCursor,txt.firstChild);
        else txt.appendChild(spnCursor);
    }
}
function backSpace(){
    var spnCursor=o('spnCursor');
    var txt=spnCursor.parentNode;
    if(txt.firstChild!=spnCursor){
        var spnDel=spnCursor.previousSibling;
        spnDel.innerHTML='';
        if(txt.firstChild!=spnCursor) spnDel.parentNode.removeChild(spnDel);
    }
}
function changeCase(){
    var btn=o('gKeyBoard').firstChild;
    for(var i=0;i<26;i++){
        var str=btn.getElementsByTagName('text')[0].firstChild.nodeValue;
        if(btnCase.up===true) str=str.toUpperCase();
        else str=str.toLowerCase();
        btn.getElementsByTagName('text')[0].firstChild.nodeValue=str;
        btn.str=str;
        btn=btn.nextSibling;
    }
}
function clearInput(){
    for(var i=0;i<2;i++){
        var txt=o('inp0'+i).getElementsByTagName('text')[1];
        var arr=txt.getElementsByTagName('tspan');
        for(var j=arr.length-1;j>=0;j--){
            var spn=arr[j];
            if(spn.id!='spnCursor'){
                spn.innerHTML='';
                spn.parentNode.removeChild(spn);
            }
        }
    }
}