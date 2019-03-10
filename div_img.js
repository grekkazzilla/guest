function getImage(gRoot){
  var div=getG('divImage',gRoot,0,0,1,false,OBJ.w/2,OBJ.h/2);
  var btn=getButton(null,div,200-5-60-60-10,10,60,60,true,'DXEX',picMagniA(),0.17,null,null);
  getPath(null,btn,14,24,0.085,'#eee8aa','#bdb76d',20,picMinus()[2]);
  btn.arrOn.push(['path',1,'fill','#eee8aa','transparent'],['path',1,'stroke','#bdb76d','#eee8aa']);
  if(isTouch()===true){
      btn.ontouchstart=function(){setImageZoom(this,-1);}
      btn.ontouchend=function(){o('rctChangeSelect').blnZoom=false;}
      btn.ontouchleave=function(){o('rctChangeSelect').blnZoom=false;}
  }
  else{
      btn.onmousedown=function(){setImageZoom(this,-1);}
      btn.onmouseup=function(){o('rctChangeSelect').blnZoom=false;}
      btn.onmouseout=function(){o('rctChangeSelect').blnZoom=false;}
  }
  var btn=getButton(null,div,200-5-60,10,60,60,true,'DXEX',picMagniA(),0.17,null,null);
  getPath(null,btn,14,15,0.085,'#eee8aa','#bdb76d',20,picPlus()[2]);
  btn.arrOn.push(['path',1,'fill','#eee8aa','transparent'],['path',1,'stroke','#bdb76d','#eee8aa']);
  if(isTouch()===true){
      btn.ontouchstart=function(){setImageZoom(this,+1);}
      btn.ontouchend=function(){o('rctChangeSelect').blnZoom=false;}
      btn.ontouchleave=function(){o('rctChangeSelect').blnZoom=false;}
  }
  else{
      btn.onmousedown=function(){setImageZoom(this,+1);}
      btn.onmouseup=function(){o('rctChangeSelect').blnZoom=false;}
      btn.onmouseout=function(){o('rctChangeSelect').blnZoom=false;}
  }
  getButton('btnSubImage',div,200+5,10,60,60,true,'DXEX',picYes(),0.16,function(){
      var img=new Image();
      img.src=o('divImage').getElementsByTagName('image')[0].getAttribute('xlink:href');
      var cnv=document.getElementById('cnvImage');
      var ctx=cnv.getContext('2d');
      var rct=o('rctChangeSelect');
      var xImage=(rct.xThis-rct.xImage0)/rct.fltScale;
      var yImage=(rct.yThis-rct.yImage0)/rct.fltScale;
      var wImage=rct.wThis/rct.fltScale;
      ctx.drawImage(img,xImage,yImage,wImage,wImage,0,0,196,196);
      OBJ_host.dataImage=cnv.toDataURL('image/png');
      OBJ_host.setImage(OBJ_host.dataImage);
      OBJ_host.putImage();
      showDiv('divArena');
      showBox('boxHost');
  },null);
  getButton(null,div,200+5+10+60,10,60,60,true,'DXEX',picNo(),0.16,function(){showDiv('divArena');},null);
  var z=0.16, p=picCam(); getPath(null,div,(OBJ.w-p[0]*z)/2,540,z,'url(#grdButton)','none',0,p[2]);
  var w=396, gImage=getG('gImage',div,4,110,1,true,w/2,w/2);
  getRect(null,gImage,0,0,w,w,0,'transparent','url(#grdButton)',1);
  var img=document.getElementsByTagName('image')[0].cloneNode(true);
  gImage.appendChild(img);
  img.setAttribute('x','0');
  img.setAttribute('y','0');
  img.setAttribute('width',w);
  img.setAttribute('height',w);
  getRect('rctChangeTop',gImage,0,0,0,0,0,'#fff','none',0).setAttribute('opacity','0.5');
  getRect('rctChangeLeft',gImage,0,0,0,0,0,'#fff','none',0.0).setAttribute('opacity','0.5');
  getRect('rctChangeBottom',gImage,0,0,0,0,0,'#fff','none',0).setAttribute('opacity','0.5');
  getRect('rctChangeRight',gImage,0,0,0,0,0,'#fff','none',0.0).setAttribute('opacity','0.5');
  //
  var rctSelect=getRect('rctChangeSelect',gImage,0,0,0,0,0,'transparent','#000',0.5);
  rctSelect.style.cursor='pointer';
  rctSelect.blnMove=false;
  rctSelect.blnZoom=false;
  if(isTouch()===true){
      rctSelect.ontouchstart=function(){this.blnMove=true;this.x0=event.touches[0].pageX;this.y0=event.touches[0].pageY;}
      rctSelect.ontouchend=function(){this.blnMove=false;}
      rctSelect.ontouchleave=function(){this.blnMove=false;}
      rctSelect.ontouchmove=function(){putImageMove(this,event.touches[0].pageX,event.touches[0].pageY);}
  }
  else{
      rctSelect.onmousedown=function(){this.blnMove=true;this.x0=event.pageX;this.y0=event.pageY;}
      rctSelect.onmouseup=function(){this.blnMove=false;}
      rctSelect.onmouseout=function(){this.blnMove=false;}
      rctSelect.onmousemove=function(){putImageMove(this,event.pageX,event.pageY);}
  }
}
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob){}
else alert('The File APIs are not fully supported in this browser.');
function setImage(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        // Когда это событие активируется, данные готовы.
        // Вставляем их в страницу в элемент <div>
        if(file.type!='image/jpeg' && file.type!='image/png' && file.type!='image/gif'){
            OBJ.blnLock=true;
            o('btnCloseSay').do=function(){
                hideG(o('boxSay'));
                OBJ.blnLock=false;
            }
            showSay('Error`Wrong image type`Please send jpeg, png or gif only','divPlayer');
        }
        else if(file.size>5000000){
            OBJ.blnLock=true;
            o('btnCloseSay').do=function(){
                hideG(o('boxSay'));
                OBJ.blnLock=false;
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
