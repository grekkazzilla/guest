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
////////////////////////////////////////////////////
/////////// *** CREATE SVG ELEMENTS *** ////////////
////////////////////////////////////////////////////
function getSVG(strObj,strID,objParent){
	var strXLM='http://www.w3.org/2000/svg';
	var obj=document.createElementNS(strXLM,strObj);
	if(strID!=null) obj.id=strID;
	if(objParent!=null) objParent.appendChild(obj);
	return obj;
}
function getG(id,root,x,y,z,blnShown,rx,ry){
	var g=getSVG('g',id,root);
    if(blnShown!==null){
        g.x=x, g.y=y, g.z=z, g.r=0, g.rx=rx, g.ry=ry, g.w=rx*2, g.h=ry*2;
        if(blnShown===true) showG(g);
        else if(blnShown===false) hideG(g);
    }
    else g.setAttribute('transform','translate('+x+','+y+') scale('+z+')');
	return g;
}
function getRect(strID,objParent,intX,intY,intW,intH,intR,strFill,strStroke,intStrokeW){
	var rct=getSVG('rect',strID,objParent);
	rct.setAttribute('x',intX);
	rct.setAttribute('y',intY);
	rct.setAttribute('width',intW);
	rct.setAttribute('height',intH);
	rct.setAttribute('rx',intR);
	rct.setAttribute('ry',intR);
	styleO(rct,strFill,strStroke,intStrokeW);
	return rct;
}
function getCircle(strID,objParent,intX,intY,intR,strFill,strStroke,intStrokeW){
	var crl=getSVG('circle',strID,objParent);
	crl.setAttribute('cx',intX);
	crl.setAttribute('cy',intY);
	crl.setAttribute('r',intR);
	styleO(crl,strFill,strStroke,intStrokeW);
	return crl;
}
function getLine(strID,objParent,intX0,intY0,intX1,intY1,strStroke,intStrokeW){
	var lin=getSVG('line',strID,objParent);
	lin.setAttribute('x1',intX0);
	lin.setAttribute('y1',intY0);
	lin.setAttribute('x2',intX1);
	lin.setAttribute('y2',intY1);
	lin.setAttribute('stroke',strStroke);
	lin.setAttribute('stroke-width',intStrokeW);
	lin.setAttribute('stroke-linecap','round');
	return lin;
}
function getPath(strID,objParent,intX,intY,intZ,strFill,strStroke,intStrokeW,strD){
	var pth=getSVG('path',strID,objParent);
	pth.setAttribute('transform','translate('+intX+','+intY+') scale('+intZ+')');
	styleO(pth,strFill,strStroke,intStrokeW);
	pth.setAttribute('d',strD);
	pth.setAttribute('stroke-linejoin','round');
	pth.setAttribute('stroke-linecap','round');
    pth.x=intX;
    pth.y=intY;
    pth.z=intZ;
	return pth;
}
function getText(strID,objParent,intX,intY,intFont,strFont,strFill,strStroke,intStrokeW,strText,strHor){
	var txt=getSVG('text',strID,objParent);
	txt.setAttribute('x',intX);
	txt.setAttribute('y',intY);
	txt.setAttribute('font-size',intFont+'px');
	txt.setAttribute('fill',strFill);
    txt.setAttribute('stroke',strStroke);
    txt.setAttribute('stroke-width',intStrokeW);
	txt.setAttribute('font-family',strFont);
	txt.setAttribute('text-anchor',strHor);
	txt.appendChild(document.createTextNode(strText));
	return txt;
}
function getEllipse(strID,objParent,intX,intY,intRX,intRY,strFill,strStroke,intStrokeW){
    var elp=getSVG('ellipse',strID,objParent);
	elp.setAttribute('cx',intX);
	elp.setAttribute('cy',intY);
	elp.setAttribute('rx',intRX);
    elp.setAttribute('ry',intRY);
	styleO(elp,strFill,strStroke,intStrokeW);
	return elp;
}
function styleO(obj,strFill,strStroke,intStrokeW){
	obj.setAttribute('fill',strFill);
	obj.setAttribute('stroke',strStroke);
	obj.setAttribute('stroke-width',intStrokeW);
}
//////// ARCS ////////
function polarToCartesian(centerX,centerY,radius,angleInDegrees){
    var angleInRadians=(angleInDegrees-90)*Math.PI/180.0;
    return{
        x:centerX+(radius*Math.cos(angleInRadians)),
        y:centerY+(radius*Math.sin(angleInRadians))
    };
}
function describeArc(x,y,radius,startAngle,endAngle){
    var start=polarToCartesian(x,y,radius,endAngle);
    var end=polarToCartesian(x,y,radius,startAngle);
    var largeArcFlag=endAngle-startAngle<=180 ? "0" : "1";
    var d=[
        "M",start.x,start.y,
        "A",radius,radius,0,largeArcFlag,0,end.x,end.y
    ].join(" ");
    return d;
}
// *****************************************//
// ********* GRADIENTS & FILTERS************//
// *****************************************//
function getLinGrd(strID,strColor01,strColor02,intOpac01,intOpac02,blnThree,strDir,dfs){
	var grd=getSVG('linearGradient',strID,dfs);
	if(strDir=='down'){
		grd.setAttribute('x1','0');
		grd.setAttribute('x2','0');
		grd.setAttribute('y1','0');
		grd.setAttribute('y2','1');
	}
	else if(strDir=='asc'){
		grd.setAttribute('x1','1');
		grd.setAttribute('x2','0');
		grd.setAttribute('y1','0');
		grd.setAttribute('y2','1');
	}
	var stp=getSVG('stop',null,grd);
	stp.setAttribute('offset','0%');
	stp.setAttribute('stop-color',strColor01);
	stp.setAttribute('stop-opacity',intOpac01);
	var stp=getSVG('stop',null,grd);
	stp.setAttribute('offset','100%');
	stp.setAttribute('stop-color',strColor02);
	stp.setAttribute('stop-opacity',intOpac02);
	if(blnThree){
		stp.setAttribute('offset','50%');
		var stp=getSVG('stop',null,grd);
		stp.setAttribute('offset','100%');
		stp.setAttribute('stop-color',strColor01);
		stp.setAttribute('stop-opacity',intOpac01);
	}
    return grd;
}
function getRadGrd(strID,intOffSet01,intOffSet02,intOffSet03,strColor01,strColor02,strColor03,intOpac01,intOpac02,intOpac03,dfs){
	var grd=getSVG('radialGradient',strID,dfs);
	grd.setAttribute('cx','50%');
	grd.setAttribute('cy','50%');
	grd.setAttribute('r','50%');
	grd.setAttribute('fx','50%');
	grd.setAttribute('fy','50%');
	var stp=getSVG('stop',null,grd);
	stp.setAttribute('offset',intOffSet01+'%');
	stp.setAttribute('stop-color',strColor01);
	stp.setAttribute('stop-opacity',intOpac01);
	var stp=getSVG('stop',null,grd);
	stp.setAttribute('offset',intOffSet02+'%');
	stp.setAttribute('stop-color',strColor02);
	stp.setAttribute('stop-opacity',intOpac02);
	if(intOffSet03!==null){
		var stp=getSVG('stop',null,grd);
		stp.setAttribute('offset',intOffSet03+'%');
		stp.setAttribute('stop-color',strColor03);
		stp.setAttribute('stop-opacity',intOpac03);
	}
    return grd;
}
function getBlurFilter(strName,intVal,dfs){
	var flt=getSVG('filter',strName,dfs);
	var gaussBlur=getSVG('feGaussianBlur',null,flt);
	gaussBlur.setAttribute('stdDeviation',intVal);
	gaussBlur.setAttribute('in','SourceGraphic');
}
// *****************************************//
// ************* TRANSFORM *****************//
// *****************************************//
function jumpG(g,x,y){if(typeof(g)=='string') g=o(g);g.setAttribute('transform','translate('+x+','+y+') scale('+g.z+') rotate('+g.r+','+g.rx+','+g.ry+')');}
function turnG(g,r){if(typeof(g)=='string') g=o(g);g.setAttribute('transform','translate('+g.x+','+g.y+') scale('+g.z+') rotate('+r+','+g.rx+','+g.ry+')');}
function showG(g){
   if(typeof(g)=='string') g=o(g);
   g.shown=true;
   g.setAttribute('transform','translate('+g.x+','+g.y+') scale('+g.z+') rotate('+g.r+','+g.rx+','+g.ry+')');
}
function hideG(g){
    if(typeof(g)=='string') g=o(g);
    g.shown=false;
    g.setAttribute('transform','scale(0)');
}
function fadeInG(g,s,c,fnc){
    g.setAttribute('opacity',c);
    if(c==0) showG(g);
    if(c<=1){c=c+s;requestAnimationFrame(function(){fadeInG(g,s,c,fnc);});}
    else {if(fnc) fnc();}
}
function fadeOutG(g,s,c,fnc){
    g.setAttribute('opacity',c);
    if(c>0){c=c-s;requestAnimationFrame(function(){fadeOutG(g,s,c,fnc);});}
    else {
        hideG(g);
        if(fnc) fnc();
    }
}
function evenG(arr,x0,x1,y,wG,space){
    var n=arr.length;
    var lenRoot=x1-x0;
    var lenG=n*wG+space*(n-1);
    var startX=x0+(lenRoot-lenG)/2;
    for(var i=0;i<n;i++){
        var g=arr[i];
        g.x=startX+(wG+space)*i;
        g.y=y;
        showG(g);
    }
}
