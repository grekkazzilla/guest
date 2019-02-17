////////////////////////////////////////////////
// MAKE BUTTON AND ACTIONS
function getButton(strID,oRoot,intX,intY,intW,intH,blnShown,ctgStyle,fncPic,zPic,fncDo,strTxt){
    // strTxt text~text~...
    var btn=getG(strID,oRoot,intX,intY,1,blnShown,intW/2,intH/2);
    btn.arrOn=new Array();
    if(ctgStyle.substr(0,1)=='A'){
        var arrRct=[5,'url(#grdButton)','none',0];
        getRect(null,btn,0,0,intW,intH,5,'url(#grdButton)','none',0);
        btn.arrOn.push(['rect',0,'fill','url(#grdButton)','#bdb76d']);
    }
    else if(ctgStyle.substr(0,1)=='B'){
        getRect(null,btn,0,0,intW,intH,5,'url(#grdIcon)','none',0);
        btn.arrOn.push(['rect',0,'fill','url(#grdIcon)','#000']);
    }
    else if(ctgStyle.substr(0,1)=='C'){
        getRect(null,btn,0,0,intW,intH,5,'url(#grdPale)','url(#grdButton)',1);
        btn.arrOn.push(['rect',0,'fill','url(#grdPale)','#bdb76d']);
        btn.arrOn.push(['rect',0,'stroke','url(#grdButton)','#bdb76d']);
    }
    else if(ctgStyle.substr(0,1)=='D'){
        getRect(null,btn,0,0,intW,intH,5,'url(#grdButton)','#bdb76d',1);
        btn.arrOn.push(['rect',0,'fill','url(#grdButton)','#bdb76d']);
    }
    else if(ctgStyle.substr(0,1)=='E'){
        var arrRct=[8,'url(#grdIcon)','none',0];
        getRect(null,btn,0,0,intW,intH,8,'url(#grdIcon)','none',0);
        btn.arrOn.push(['rect',0,'fill','url(#grdIcon)','#000']);
    }
    //
    if(ctgStyle.substr(1,1)=='A'){
        getRect(null,btn,5,5,intW-5*2,intH-5*2,5*0.8,'transparent','url(#grdButtonRvs)',1);
        btn.arrOn.push(['rect',1,'stroke','url(#grdButtonRvs)','#eee8aa']);
    }
    else if(ctgStyle.substr(1,1)=='B'){
        getRect(null,btn,5,5,intW-5*2,intH-5*2,5*0.8,'transparent','url(#grdIconRvs)',1);
        btn.arrOn.push(['rect',1,'stroke','url(#grdIconRvs)','#fff']);
    }
    //
    var gIn=getG(null,btn,0,0,1,true,intW/2,intH/2);
    if(fncPic!==null){
        var intIcnX=(intW-fncPic[0]*zPic)/2;
        var intIcnY=(intH-fncPic[1]*zPic)/2;
        var strIcnD=fncPic[2];
        if(ctgStyle.substr(2,1)=='A'){
            var pth=getPath(null,gIn,intIcnX,intIcnY,zPic,'url(#grdIcon)','none',0,strIcnD);
            btn.arrOn.push(['path',0,'fill','url(#grdIcon)','#eee8aa']);
        }
        else if(ctgStyle.substr(2,1)=='B'){
            var pth=getPath(null,gIn,intIcnX,intIcnY,zPic,'transparent','url(#grdPale)',18,strIcnD);
        }
        else if(ctgStyle.substr(2,1)=='C'){
            var pth=getPath(null,gIn,intIcnX,intIcnY,zPic,'url(#grdPale)','none',0,strIcnD);
            btn.arrOn.push(['path',0,'fill','url(#grdPale)','#fff']);
        }
        else if(ctgStyle.substr(2,1)=='D'){
            var pth=getPath(null,gIn,intIcnX,intIcnY,zPic,'url(#grdButton)','none',0,strIcnD);
            btn.arrOn.push(['path',0,'fill','url(#grdButton)','#000']);
        }
        else if(ctgStyle.substr(2,1)=='E'){
            var pth=getPath(null,gIn,intIcnX,intIcnY,zPic,'#eee8aa','#bdb76d',10,strIcnD);
            btn.arrOn.push(['path',0,'fill','#eee8aa','#bdb76d'],['path',0,'stroke','#bdb76d','#eee8aa']);
        }
        else if(ctgStyle.substr(2,1)=='F'){
            var pth=getPath(null,gIn,intIcnX,intIcnY,zPic,'transparent','#fff',15,strIcnD);
        }
        pth.w=fncPic[0];
        pth.h=fncPic[1];
    }
    //
    if(strTxt!==null){
        var row=strTxt.split('~');
        for(var i=0;i<row.length;i++){
            if(ctgStyle.substr(3,1)=='A') getText(null,gIn,intW/2,30,20,'Arial','#fff','none',0,row[i],'middle');
            else if(ctgStyle.substr(3,1)=='B'){
                if(i==0) var strFill='#fff';
                else if(i==1) var strFill='url(#grdPale)';
                getText(null,gIn,intW/2,0,18,'Arial',strFill,'none',0,row[i],'middle').style.fontWeight='bold';
            }
            else if(ctgStyle.substr(3,1)=='C'){
                if(i==0) var strFill='url(#grdIcon)';
                else if(i==1) var strFill='#404040';
                getText(null,gIn,intW/2,0,18,'Arial',strFill,'none',0,row[i],'middle');
            }
        }
    };
    btn.blnLock=false; // lock button against action if true
    btn.blnUnlock=false; // exclude button from OBJ_var.blnLock blocking
    if(fncDo!==null){
        btn.do=fncDo; // perform with delay (see pushButton())
        btn.onclick=function(){if(this.blnLock!==true){pushButton(this);}};
    }
    btn.style.cursor='pointer';
    return btn;
}
function pushButton(btn){
    if((OBJ_var.blnLock===false || btn.blnUnlock===true) && btn.blnLock===false){
        OBJ_var.blnLock=true;
        onBtn(btn,1);                       // instant look change
        if(btn.go!==undefined) btn.go();    // perform  instantly
        if(btn.do!==null){                  // perform with delay
            setTimeout(function(){
                onBtn(btn,0);               // return previous look
                OBJ_var.blnLock=false;
                btn.do();
            },250);
        }
    }
}
function onBtn(btn,a){ // a: 0 - released button (off/out) look, 1 - pushed button (on) look
    if(btn.arrOn){
        for(var i=0;i<btn.arrOn.length;i++){
            var arr=btn.arrOn[i];
            for(var j=0;j<arr.length;j++){
                btn.getElementsByTagName(arr[0])[arr[1]].setAttribute(arr[2],arr[a*1+3]);
            }
        }
    }
}
// MAKE TOGGLE BUTTON AND ACTONS (300x210) 
function getToggle(id,root,x,y,w,h,fncDo,strLabel,xText,yText,strAnchor){
    var tgl=getG(id,root,x,y,1,true,w/2,h/2);
    getRect(null,tgl,0,0,w,h,0,'transparent','#c0c0c0',0);
    var z=h/210;
    var g=getG(null,tgl,0,0,z,true,0,0);
    var pth=getPath(null,g,0,0,1,'transparent','#000000',5,'M 110.0625 24 C 65.9625 24 30 60.3 30 105 C 30 149.7 65.9625 186 110.0625 186 L 188.0625 186 C 233.3625 186 270 149.7 270 105 C 270 60.3 233.3625 24 188.0625 24 L 110.0625 24 z');
    pth.setAttribute('filter','url(#blr8)');
    getPath(null,g,0,0,1,'#fff','none',0,'M 37.40625 0 C 16.69923 0 0 20.35021 0 45.65625 L 0 164.34375 C 0 189.64979 16.69923 210 37.40625 210 L 262.59375 210 C 283.30077 210 300 189.64979 300 164.34375 L 300 45.65625 C 300 20.35021 283.30077 0 262.59375 0 L 37.40625 0 z M 110.0625 24 L 188.0625 24 C 233.3625 24 270 60.3 270 105 C 270 149.7 233.3625 186 188.0625 186 L 110.0625 186 C 65.9625 186 30 149.7 30 105 C 30 60.3 65.9625 24 110.0625 24 z');
    getCircle(null,g,115,105,65,'url(#grdSilver)','none',0);
    getCircle(null,g,115,105,45,'url(#grdSilverRvs)','none',0);
    getText(null,tgl,xText,yText,18,'Arial','url(#grdSilver)','none',0,strLabel,strAnchor); // 60 27 left usually
    tgl.blnOn=false;
    tgl.blnLock=false;
    tgl.style.cursor='pointer';
    tgl.do=fncDo;
    tgl.onclick=function(){
        pushToggle(this,undefined);
        tgl.do();
    }
    return tgl;
}
function pushToggle(tgl,bln){
    if(typeof(tgl)=='string') tgl=o(tgl);
    if(tgl.blnLock===false){
        if(bln===undefined) tgl.blnOn=!tgl.blnOn;
        else tgl.blnOn=bln;
        if(tgl.blnOn===true){
            var strSdw='olive';
            var strBtn='url(#grdButton)';
            var strRvs='url(#grdButtonRvs)';
            var strTxt='url(#grdIcon)';
            var x=185;
        }
        else{
            var strSdw='#808080';
            var strBtn='url(#grdSilver)';
            var strRvs='url(#grdSilverRvs)';
            var strTxt='#c0c0c0';
            var x=115;
        }
        tgl.getElementsByTagName('path')[0].setAttribute('stroke',strSdw);
        tgl.getElementsByTagName('circle')[0].setAttribute('cx',x);
        tgl.getElementsByTagName('circle')[0].setAttribute('fill',strBtn);
        tgl.getElementsByTagName('circle')[1].setAttribute('cx',x);
        tgl.getElementsByTagName('circle')[1].setAttribute('fill',strRvs);
        tgl.getElementsByTagName('text')[0].setAttribute('fill',strTxt);
    }
}