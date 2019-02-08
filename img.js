// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob){}
else alert('The File APIs are not fully supported in this browser.');
function setImage(files){
    OBJ_var.blnLock=true;
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        // Когда это событие активируется, данные готовы.
        // Вставляем их в страницу в элемент <div>
        if(file.type!='image/jpeg' && file.type!='image/png' && file.type!='image/gif'){
            OBJ_var.blnLock=true;
            o('btnCloseSay').do=function(){
                hideG(o('boxSay'));
                OBJ_var.blnLock=false;
            }
            showSay('Error`Wrong image type`Please send jpeg, png or gif only','divPlayer');
        }
        else if(file.size>5000000){
            OBJ_var.blnLock=true;
            o('btnCloseSay').do=function(){
                hideG(o('boxSay'));
                OBJ_var.blnLock=false;
            }
            showSay('Error`File size exceeds!`'+file.size+' bytes attempted to upload ...`Please get a smaller image of`5000 K as maximum','divPlayer');
        }
        else{
            showDiv('divImage');
            var img=new Image();
            img.src=e.target.result;
            o('divImage').getElementsByTagName('image')[0].setAttribute('xlink:href',img.src);
            img.onload=function(){
                var rctSelect=o('rctChangeSelect');
                rctSelect.wAbs=396;
                rctSelect.wImage=img.width;
                rctSelect.hImage=img.height;
                rctSelect.strType=file.type;
                if(rctSelect.wImage>=rctSelect.hImage){
                    rctSelect.fltScale=rctSelect.wAbs/rctSelect.wImage;
                    rctSelect.wThis=Math.round(rctSelect.hImage/2*rctSelect.fltScale);
                }
                else if(rctSelect.wImage<rctSelect.hImage){
                    rctSelect.fltScale=rctSelect.wAbs/rctSelect.hImage;
                    rctSelect.wThis=Math.round(rctSelect.wImage/2*rctSelect.fltScale);
                }
                rctSelect.xImage0=(rctSelect.wAbs-Math.round(rctSelect.wImage*rctSelect.fltScale))/2;
                rctSelect.yImage0=(rctSelect.wAbs-Math.round(rctSelect.hImage*rctSelect.fltScale))/2;
                rctSelect.xImage1=rctSelect.xImage0+Math.round(rctSelect.wImage*rctSelect.fltScale);
                rctSelect.yImage1=rctSelect.yImage0+Math.round(rctSelect.hImage*rctSelect.fltScale);
                //
                rctSelect.xThis=(rctSelect.wAbs-rctSelect.wThis)/2*1;
                rctSelect.yThis=rctSelect.xThis;
                rctSelect.setAttribute('x',rctSelect.xThis);
                rctSelect.setAttribute('y',rctSelect.yThis);
                rctSelect.setAttribute('width',rctSelect.wThis);
                rctSelect.setAttribute('height',rctSelect.wThis);
                //
                putImageSelect(rctSelect);
                //
                rctSelect.blnZoom=false;
                rctSelect.blnMove=false;
                OBJ_var.blnLock=false;
            }
        }
    };
    reader.readAsDataURL(file);
}
//
function putImageSelect(rctSelect){
    var rct=o('rctChangeTop');
    rct.setAttribute('x','0');
    rct.setAttribute('y','0');
    rct.setAttribute('width',rctSelect.xThis+rctSelect.wThis);
    rct.setAttribute('height',rctSelect.yThis);
    //
    var rct=o('rctChangeRight');
    rct.setAttribute('x',rctSelect.xThis+rctSelect.wThis);
    rct.setAttribute('y','0');
    rct.setAttribute('width',rctSelect.wAbs-rctSelect.xThis-rctSelect.wThis);
    rct.setAttribute('height',rctSelect.yThis+rctSelect.wThis);
    //
    var rct=o('rctChangeBottom');
    rct.setAttribute('x',rctSelect.xThis);
    rct.setAttribute('y',rctSelect.yThis+rctSelect.wThis);
    rct.setAttribute('width',rctSelect.wAbs-rctSelect.xThis);
    rct.setAttribute('height',rctSelect.wAbs-rctSelect.yThis-rctSelect.wThis);
    //
    var rct=o('rctChangeLeft');
    rct.setAttribute('x','0');
    rct.setAttribute('y',rctSelect.yThis);
    rct.setAttribute('width',rctSelect.xThis);
    rct.setAttribute('height',rctSelect.wAbs-rctSelect.yThis);
}
function putImageMove(rct,x1,y1){
    if(rct.blnMove===true){
        var dx=x1-rct.x0;
        var dy=y1-rct.y0;
        rct.xThis+=dx;
        rct.yThis+=dy;
        if(rct.xThis<rct.xImage0) rct.xThis=rct.xImage0;
        if(rct.xThis>rct.xImage1-rct.wThis) rct.xThis=rct.xImage1-rct.wThis;
        if(rct.yThis<rct.yImage0) rct.yThis=rct.yImage0;
        if(rct.yThis>rct.yImage1-rct.wThis) rct.yThis=rct.yImage1-rct.wThis;
        rct.setAttribute('x',rct.xThis);
        rct.setAttribute('y',rct.yThis);
        putImageSelect(rct);
        rct.x0=x1;
        rct.y0=y1;
    }
}
function setImageZoom(btn,d){
    var rct=o('rctChangeSelect');
    rct.blnZoom=true;
    onBtn(btn,1);
    anmImageZoom(rct,d,btn);
}
function anmImageZoom(rct,d,btn){
    rct.wThis+=(2*d);
    rct.xThis-=(1*d);
    rct.yThis-=(1*d);
    if(
        rct.xThis<rct.xImage0 ||
        rct.xThis>rct.xImage1-rct.wThis ||
        rct.yThis<rct.yImage0 ||
        rct.yThis>rct.yImage1-rct.wThis ||
        rct.wThis<50){
            rct.wThis-=(2*d);
            rct.xThis+=(1*d);
            rct.yThis+=(1*d);
            rct.blnZoom=false;
    }
    rct.setAttribute('x',rct.xThis);
    rct.setAttribute('y',rct.yThis);
    rct.setAttribute('width',rct.wThis);
    rct.setAttribute('height',rct.wThis);
    putImageSelect(rct);
    if(rct.blnZoom===true) requestAnimationFrame(function(){anmImageZoom(rct,d,btn);});
    else onBtn(btn,0);
}