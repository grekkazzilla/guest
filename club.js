function getBoxClub(strBoxID,objRoot,xBox,yBox,blnShow){
    var wBox=190, hBox=110;
    var boxClub=getG(strBoxID,objRoot,xBox,yBox,1,blnShow,wBox/2,hBox/2);
    getRect(null,boxClub,0,0,wBox,hBox,0,'#808080','transparent',0).setAttribute('filter','url(#blr2)');
    getRect(null,boxClub,0,0,wBox,hBox,0,'url(#grdPale)','transparent',0);
    // user pic - g[0]
    var w=75, h=w, x=(wBox-w)/2, y=7;
    var g=getG(null,boxClub,x,y,1,true,w/2,h/2);
    getPath(null,g,0,0,0,'#c0c0c0','none',0,'');
    //getRect(null,g,0,0,w,h,0,'transparent','red',1);
    // user name - g[1]
    var w=wBox, h=20, x=0, y=hBox-5-h;
    var g=getG(null,boxClub,x,y,1,true,w/2,h/2);
    getText(null,g,w/2,17,18,'Arial','#c0c0c0','none',0,'','middle').style.fontWeight='bold';
    //getRect(null,g,0,0,w,h,0,'transparent','red',1);
    // user status -  g[2]
    var w=35, h=w, x=7, y=7;
    var g=getG(null,boxClub,x,y,1,true,w/2,h/2);
    getPath(null,g,0,0,0.11,'url(#grdButton)','none',0,'');
    //getRect(null,g,0,0,w,h,0,'transparent','red',1);
    // user award - g[3]
    var w=35, h=w, x=wBox-7-w, y=7;
    var arrIcon=picAward(), zIcon=0.12, xIcon=(w-arrIcon[0]*zIcon)/2, yIcon=(h-arrIcon[1]*zIcon)/2;
    var g=getG(null,boxClub,x,y,1,false,w/2,h/2);
    getPath(null,g,xIcon,yIcon,zIcon,'#c0c0c0','none',0,arrIcon[2]);
    getText(null,g,w/2,23,18,'Arial','#fff','none',0,'3','middle').style.fontWeight='bold';
    //getRect(null,g,0,0,w,h,0,'transparent','red',1);
    // user skill - g[4]
    var w=35, h=w, x=7, y=7;
    var arrIcon=picStar(), zIcon=0.12, xIcon=(w-arrIcon[0]*zIcon)/2, yIcon=(h-arrIcon[1]*zIcon)/2;
    var g=getG(null,boxClub,x,y,1,false,w/2,h/2);
    getPath(null,g,xIcon,yIcon,zIcon,'#c0c0c0','none',0,arrIcon[2]);
    getText(null,g,w/2,25,18,'Arial','#fff','none',0,'3','middle').style.fontWeight='bold';
    //getRect(null,g,0,0,w,h,0,'transparent','red',1);
    // user image
    if(strBoxID!='boxPlayer' && strBoxID!='boxMember'){
        var img=document.getElementsByTagName('image')[0].cloneNode(true);
        img.setAttribute('x','0');
        img.setAttribute('y','0');
        img.setAttribute('width','0');
        img.setAttribute('height','0');
        img.setAttribute('xlink:href','');
        boxClub.appendChild(img);
        boxClub.style.cursor='pointer';
        boxClub.onclick=function(){
            setMember(this.objClub);
            showDiv('divMember');
        }
    }
    //
    boxClub.objClub=null;
    return boxClub;
}
function putBoxClub(boxClub,objClub){
    for(var i in OBJ_var.arrClub){
        var obj=OBJ_var.arrClub[i];
        for(var j in obj.arrBox){
            if(obj.arrBox[j]==boxClub){
                obj.arrBox.splice(j,1);
                break;
            }
        }
    }
    if(objClub!==null) objClub.arrBox.push(boxClub);
    boxClub.objClub=objClub;
    objClub.boxClub=boxClub;
    //
    var arrG=boxClub.getElementsByTagName('g');
    // pic
    var g=arrG[0];
    var pth=g.getElementsByTagName('path')[0];
    if(boxClub.objClub!==null){
        if(boxClub.objClub.strPicD==''){
            var arrPic=picHour();
            var wPic=arrPic[0];
            var hPic=arrPic[1];
            var strPicD=arrPic[2];
            boxClub.objClub.reqMeet();
        }
        else{
            var wPic=boxClub.objClub.wPic;
            var hPic=boxClub.objClub.hPic;
            var strPicD=boxClub.objClub.strPicD;
        }
        putBoxClubOn(boxClub);
        showG(g);
    }
    else{
        var arrPic=graphUser();
        var wPic=arrPic[0];
        var hPic=arrPic[1];
        var strPicD=arrPic[2];
        pth.setAttribute('fill','url(#grdButton)');
        jumpG(g,g.x,boxClub.ry-g.ry);
    }
    putBoxClubPic(boxClub,wPic,hPic,strPicD);
    // name
    var g=arrG[1];
    var txt=g.getElementsByTagName('text')[0];
    if(boxClub.objClub!==null) var strName=boxClub.objClub.strName;
    else var strName='';
    txt.firstChild.nodeValue=strName;
    // status
    var g=arrG[2];
    var pth=g.getElementsByTagName('path')[0];
    if(boxClub.objClub!==null){
        if(boxClub.objClub.ctg=='member') var arrPic=picUser();
        else if(boxClub.objClub.ctg=='watch') var arrPic=picEye();
        else var arrPic=picNone();
    }
    else var arrPic=graphNone();
    pth.setAttribute('transform','translate('+(g.rx-arrPic[0]*pth.z/2)+','+(g.ry-arrPic[1]*pth.z/2)+') scale('+pth.z+')');
    pth.setAttribute('d',arrPic[2]);
    showG(g);
}
function putBoxClubPic(boxClub,wPic,hPic,strPicD){
    var g=boxClub.getElementsByTagName('g')[0];
    var pth=g.getElementsByTagName('path')[0];
    var z=0.225;
    pth.setAttribute('transform','translate('+(g.rx-wPic*z/2)+','+(g.ry-hPic*z/2)+') scale('+z+')');
    pth.setAttribute('d',strPicD);
    
}
function putBoxClubOn(boxClub){
    var objClub=boxClub.objClub;
    if(objClub.blnOn===true) var strFill='url(#grdIcon)';
    else if(objClub.blnOn===false) var strFill='#c0c0c0';
    var arrG=boxClub.getElementsByTagName('g');
    arrG[0].getElementsByTagName('path')[0].setAttribute('fill',strFill);
    arrG[1].getElementsByTagName('text')[0].setAttribute('fill',strFill);
}
//
function setClubFromStr(strClub,ctgClub){
    if(strClub!=''){
        if(ctgClub=='watch') var arrClub=OBJ_var.arrWatch;
        else if(ctgClub=='find'){
            for(var i=0;i<OBJ_var.arrFind;i++){
                var strName=OBJ_var.arrFind[i];
                OBJ_var.arrFind.splice(i,1);
                remClub(strName);
                i--;
            }
            OBJ_var.arrFind=new Array();
            var arrClub=OBJ_var.arrFind;
        }
        OBJ_var.ctgClub=ctgClub;
        var row=strClub.split(':');
        for(var i in row){
            var strName=row[i];
            var objClub=getClub(strName);
            if(ctgClub=='watch') objClub.ctg='watch';
            else if(ctgClub=='find' && objClub.ctg=='') objClub.ctg='member';
            arrClub.push(strName);
        }
        arrClub.sort();
    }
    setClubPage(1,ctgClub);
}
function setClubPage(numPage,ctgClub){
    var gBar=o('gClubBar');
    var btnFind=o('btnClubFind');
    var btnClose=o('btnClubClose');
    var btnSetUp=o('btnClubSetUp');
    var intMarg=7;
    showG(btnFind);
    if(ctgClub=='watch'){
        var arrClub=OBJ_var.arrWatch;
        gBar.w=(btnFind.rx+btnSetUp.rx)*2+intMarg;
        btnSetUp.x=btnFind.x+btnFind.rx*2+intMarg;
        hideG(btnClose);
        showG(btnSetUp);
        btnFind.getElementsByTagName('rect')[0].setAttribute('fill','url(#grdIcon)');
        btnFind.arrOn[0][3]='url(#grdIcon)';
        btnFind.arrOn[0][4]='#000';
    }
    else if(ctgClub=='find'){
        var arrClub=OBJ_var.arrFind;
        gBar.w=(btnFind.rx+btnClose.rx)*2+intMarg;
        btnClose.x=btnFind.x+btnFind.rx*2+intMarg;
        showG(btnClose);
        hideG(btnSetUp);
        btnFind.getElementsByTagName('rect')[0].setAttribute('fill','url(#grdButton)');
        btnFind.arrOn[0][3]='url(#grdButton)';
        btnFind.arrOn[0][4]='#bdb76d';
    }
    OBJ_var.ctgClub=ctgClub;
    OBJ_var.qtyClubPage=Math.ceil(arrClub.length/6);
    var qtyButton=0;
    if(OBJ_var.qtyClubPage>=5) qtyButton=5;
    else if(OBJ_var.qtyClubPage>1) qtyButton=OBJ_var.qtyClubPage;
    gBar.w+=(o('btnClubPage0').rx*2+intMarg)*qtyButton;
    jumpG(gBar,(400-gBar.w)/2,gBar.y);
    // assemble a page
    OBJ_var.numClubPage=numPage;
    putClubPage(numPage);
}
function putClubPage(numPage){
    if(OBJ_var.ctgClub=='watch') var arrClub=OBJ_var.arrWatch;
    else if(OBJ_var.ctgClub=='find') var arrClub=OBJ_var.arrFind;
    // clear
    for(var i=0;i<6;i++){
        var boxClub=o('boxClub'+i);
        var btn=o('btnClubPage'+i);
        hideG(boxClub);
        hideG(btn);
        var pthPic=boxClub.getElementsByTagName('path')[0];
        pthPic.setAttribute('d','');
    }
    hideG(o('gClubPageNum'));
    //
    OBJ_var.numClubPage=numPage;
    // SHOW BUTTONS
    var c=0;
    var numStart=numPage-2;
    if(numStart<1) numStart=1;
    var numEnd=numPage+2;
    if(numEnd>OBJ_var.qtyClubPage) numEnd=OBJ_var.qtyClubPage;
    //
    if(OBJ_var.qtyClubPage==4 && numPage==1) numEnd=4;
    else if(OBJ_var.qtyClubPage==4 && numPage==4) numStart=1;
    else if(OBJ_var.qtyClubPage>=5 && numPage<=2) numEnd=5;
    else if(OBJ_var.qtyClubPage>=5 && numPage>=4) numStart=OBJ_var.qtyClubPage-4;
    //
    var intMarg=7;
    if(OBJ_var.qtyClubPage>1){
        for(i=numStart;i<=numEnd;i++){
            if(i==numPage) var btn=o('gClubPageNum');
            else{
                var btn=o('btnClubPage'+c);
                btn.goToPage=i;
            }
            btn.getElementsByTagName('text')[0].firstChild.nodeValue=i;
            btn.x=94+(btn.rx*2+intMarg)*c;
            btn.y=0;
            showG(btn);
            c++;
        }
    }
    // CLUB BOXES
    var w=o('boxClub0').rx*2;
    var h=o('boxClub0').ry*2;
    var m=10; // intMargin
    var n=6;
    if(numPage==OBJ_var.qtyClubPage) n=arrClub.length-(OBJ_var.qtyClubPage-1)*6;
    //
    var x0=200, y0=300, x=0, y=0, c=0;
    for(i=(numPage-1)*6;i<(numPage*6);i++){
        if(i<arrClub.length){
            var boxClub=o('boxClub'+c);
            if(n==1 && c==0) x=x0-w/2, y=y0-h/2;
            else if(n==2 && c==0) x=x0-w-m/2, y=y0-h/2;
            else if(n==2 && c==1) x=x0+m/2, y=y0-h/2;
            else if(n==3 && c==0) x=x0-w-m/2, y=y0-h-m/2;
            else if(n==3 && c==1) x=x0+m/2, y=y0-h-m/2;
            else if(n==3 && c==2) x=x0-w/2, y=y0+m/2;
            else if(n==4 && c==0) x=x0-w-m/2, y=y0-h-m/2;
            else if(n==4 && c==1) x=x0+m/2, y=y0-h-m/2;
            else if(n==4 && c==2) x=x0-w-m/2, y=y0+m/2;
            else if(n==4 && c==3) x=x0+m/2, y=y0+m/2;
            else if(n==5 && c==0) x=x0-w-m/2, y=y0-h*1.5-m;
            else if(n==5 && c==1) x=x0+m/2, y=y0-h*1.5-m;
            else if(n==5 && c==2) x=x0-w-m/2, y=y0-h/2;
            else if(n==5 && c==3) x=x0+m/2, y=y0-h/2;
            else if(n==5 && c==4) x=x0-w/2, y=y0+h/2+m;
            else if(n==6 && c==0) x=x0-w-m/2, y=y0-h*1.5-m;
            else if(n==6 && c==1) x=x0+m/2, y=y0-h*1.5-m;
            else if(n==6 && c==2) x=x0-w-m/2, y=y0-h/2;
            else if(n==6 && c==3) x=x0+m/2, y=y0-h/2;
            else if(n==6 && c==4) x=x0-w-m/2, y=y0+h/2+m;
            else if(n==6 && c==5) x=x0+m/2, y=y0+h/2+m;
            c++;
            boxClub.x=x;
            boxClub.y=y;
            y+=h+m;
            var strName=arrClub[i];
            var objClub=getClub(strName);
            putBoxClub(boxClub,objClub);
            if(objClub.blnOn===undefined) OBJ_var.wbs.send('about~'+objClub.strName);
            showG(boxClub);
        }
        else break;
    }
}
//
function getClub(strName){
    for(var i in OBJ_var.arrClub){
        if(OBJ_var.arrClub[i].strName==strName) return OBJ_var.arrClub[i];
    }
    var objClub=new Object();
    objClub.strName=strName;        // user id (no repeat)
    objClub.strPicD='';         // svg d attribute
    objClub.wPic=0;             // svg picture width
    objClub.hPic=0;             // svg picture heigth
    objClub.strAbout='';        // info written about self
    objClub.blnOn=undefined;    // online status, false - off or true - on
    objClub.pid='';             // peer id
    objClub.ctg='';             // status: player, guest, member, watch, friend, banned
    objClub.strMark='none';     // mark: none, star, heart
    objClub.arrBox=new Array(); // linked boxes to show
    //
    objClub.xhr=new XMLHttpRequest();
    objClub.xhr.obj=objClub;
    objClub.reqMeet=function(){
        this.xhr.open('POST', 'async_meet.php', true);
        this.xhr.onreadystatechange = function(){
            if (this.readyState==4){
                if (this.status==200){
                    var asw=this.responseText.split('~');
                    if(asw[0]=='meet_1'){
                        var row=asw[1].split(':');
                        var objClub=this.obj;
                        objClub.wPic=row[0]*1;
                        objClub.hPic=row[1]*1;
                        objClub.strPicD=row[2];
                        for(var i in objClub.arrBox){
                            putBoxClubPic(objClub.arrBox[i],objClub.wPic,objClub.hPic,objClub.strPicD);
                        }
                    }
                }
            }
        }
        this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        this.xhr.send('id='+this.strName);
    }
    // uploaded image (photo)
    objClub.img=null;
    objClub.reqImage=function(){
        if(this.img===null){
            var img=new Image;
            img.obj=this;
            img.src='../u/'+this.strName+'/img.jpeg';
            img.onload=function(){
                var objClub=this.obj;
                objClub.img=this;
                o('boxPlayerImage').getElementsByTagName('image')[0].setAttribute('xlink:href',img.src+'?v='+getRand(0,1000));
            }
        }
    }
    OBJ_var.arrClub.push(objClub);
    return objClub;
}
function remClub(strName){
    var blnFound=false;
    if(blnFound===false){
        for(var i in OBJ_var.arrWatch){
            if(OBJ_var.arrWatch[i]==strName){
                blnFound=true;
                break;
            }
        }
    }
    if(blnFound===false){
        for(var i in OBJ_var.arrFind){
            if(OBJ_var.arrFind[i]==strName){
                blnFound=true;
                break;
            }
        }
    }
    if(blnFound===false){
        for(var i in OBJ_var.arrClub){
            if(OBJ_var.arrClub[i].strName===strName){
                OBJ_var.arrClub.splice(i,1);
                WBS.send('away~'+strName);
                break;
            }
        }
    }
}