//////////////////////////////////////////////////////
function getScale(svgRoot,divChild,wChild,hChild,intPad){
	document.body.style.textAlign='center';
	var intPageW=document.documentElement.clientWidth;
	var intPageH=document.documentElement.clientHeight;
	var intSVGW=intPageW-intPad*2;
	var intSVGH=intPageH-intPad*2;
	svgRoot.setAttribute('width',intSVGW);
	svgRoot.setAttribute('height',intSVGH);
	svgRoot.style.marginTop=intPad+"px";
	var fltRatioW=intSVGW/wChild;
	var fltRatioH=intSVGH/hChild;
	var intArenaX=0;
	var intArenaY=0;
	var fltScaleFactor=1;
	if(fltRatioW>fltRatioH){
		fltScaleFactor=fltRatioH;
		intArenaX=(intSVGW-wChild*fltScaleFactor)/2;
	}
	else if(fltRatioW<fltRatioH){
		fltScaleFactor=fltRatioW;
		intArenaY=(intSVGH-hChild*fltScaleFactor)/2;
	}
	divChild.setAttribute('transform','translate('+intArenaX+' '+intArenaY+') scale('+fltScaleFactor+')');
    //
	document.body.onresize=function(){
        getScale(svgRoot,divChild,wChild,hChild,intPad);
    }
    return fltScaleFactor;
}
function getGrid(gRoot,intWidth,intHeight,intPace){
	for(var i=0;i<intWidth+1;i=i+intPace) getLine(null,gRoot,i,0,i,intHeight,"#c0c0c0",1);
	for(var i=0;i<intHeight+1;i=i+intPace) getLine(null,gRoot,0,i,intWidth,i,"#c0c0c0",1);
}
//
function mirrHor(btn){
    var pth=btn.getElementsByTagName('path')[0];
    pth.setAttribute('transform','translate('+(btn.rx-pth.w*pth.z/2+pth.w*pth.z)+','+(btn.ry-pth.h*pth.z/2)+') scale('+(pth.z*-1)+','+pth.z+')');
}
// HISTORY CONTROL
function setHistoryShow(d){
	OBJ_var.numShowMove+=d;
	var strFen=OBJ_var.arrHist[OBJ_var.arrHist.length-2+OBJ_var.numShowMove][0];
	var arrCheck=OBJ_var.arrHist[OBJ_var.arrHist.length-2+OBJ_var.numShowMove][4];
	OBJ_chess.setBoard(strFen);
	OBJ_board.putBoard();
	if(arrCheck!==false) OBJ_board.putCheck(arrCheck);
}
function setLatestHistory(){
	var strFen=OBJ_var.arrHist[OBJ_var.arrHist.length-2][0];
	OBJ_chess.setBoard(strFen);
	OBJ_board.putBoard();
	OBJ_var.numShowMove=0;
}
function setHistoryButtons(){
	var btnBack=o('btnHistBack'), btnFrwd=o('btnHistFrwd');
	if(OBJ_var.arrHist.length+OBJ_var.numShowMove>2){
		btnBack.getElementsByTagName('path')[0].setAttribute('fill','#eee8aa');
		btnBack.blnLock=false;
	}
	else{
		btnBack.getElementsByTagName('path')[0].setAttribute('fill','transparent');
		btnBack.blnLock=true;
	}
	if(OBJ_var.numShowMove<0){
		btnFrwd.getElementsByTagName('path')[0].setAttribute('fill','#eee8aa');
		btnFrwd.blnLock=false;
	}
	else{
		btnFrwd.getElementsByTagName('path')[0].setAttribute('fill','transparent');
		btnFrwd.blnLock=true;
	}
}
