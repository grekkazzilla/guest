// *****************************************//
// *************** SPIRAL LOAD *************//
// *****************************************//
// spinning spiral to indicate loading data asynchronously
// size 100 x 100 pixels
function getLoad(id,gRoot,x,y,z,strFill,intStrokeW){
    var g=getG(id,gRoot,x,y,z,false,50,50);
    getPath(null,g,0,0,1,strFill,strFill,5,'M 49.15625 0 C 48.554037 -0.0068816 47.945168 0.01703628 47.34375 0.03125 C 31.305932 0.41028119 15.679088 8.2337702 6.75 22.75 C -5.9862758 43.455665 -0.33340851 71.98026 20.8125 84.78125 C 39.425219 96.048738 64.937158 90.880114 76.25 71.8125 C 86.05041 55.294072 81.4293 32.727206 64.4375 22.90625 C 50.015261 14.570455 30.385901 18.705378 22.0625 33.625 C 15.187584 45.948227 18.803189 62.652089 31.65625 69.46875 C 41.875972 74.888811 55.675159 71.733292 60.96875 60.9375 C 64.944594 52.829128 62.317791 41.924733 53.5625 38.1875 C 50.571968 36.91098 47.069165 36.820859 44.03125 37.875 C 40.993334 38.92914 38.391969 41.157355 37.34375 44.53125 C 36.751083 46.438868 36.8763 48.77665 37.75 50.6875 C 38.623699 52.598349 40.326091 54.116356 42.71875 54.1875 A 0.50645732 0.50645732 0 0 0 42.75 53.1875 C 40.75682 53.12824 39.448108 51.913507 38.6875 50.25 C 37.926893 48.586493 37.771915 46.483135 38.28125 44.84375 C 39.228992 41.793253 41.55108 39.781542 44.34375 38.8125 C 47.136421 37.843458 50.409211 37.952414 53.15625 39.125 C 61.329583 42.61382 63.805522 52.86645 60.0625 60.5 C 55.03811 70.746773 41.875182 73.733539 32.125 68.5625 C 19.801374 62.026628 16.322877 45.98165 22.9375 34.125 C 30.972737 19.721908 49.979919 15.714016 63.9375 23.78125 C 80.421889 33.308933 84.931776 55.257383 75.40625 71.3125 C 64.390432 89.879482 39.462907 94.893869 21.3125 83.90625 C 0.66199494 71.405157 -4.8586319 43.525382 7.59375 23.28125 C 21.57812 0.54652836 52.413281 -5.4815863 74.75 8.4375 C 99.569463 23.903702 106.10599 57.696547 90.71875 82.125 C 90.095949 83.113743 89.465094 84.083658 88.78125 85.03125 A 0.50316382 0.50316382 0 1 0 89.59375 85.625 C 90.289873 84.660392 90.959727 83.662806 91.59375 82.65625 C 107.271 57.767395 100.58857 23.363964 75.28125 7.59375 C 67.266457 2.5993485 58.189438 0.10322399 49.15625 0 z');
    return g;
}
function showLoad(g){g.shown=true;spinLoad(g,0);}
function drawLoad(g,strFill,intStroke,x,y,z,objParent){
    if(typeof(g)=='string') g=o(g);
    if(strFill!=null){
        g.getElementsByTagName('path')[0].setAttribute('fill',strFill);
        g.getElementsByTagName('path')[0].setAttribute('stroke',strFill);
    }
    if(intStroke!=null) g.getElementsByTagName('path')[0].setAttribute('stroke-width',intStroke);
    if(x!=null) g.x=x;
    if(y!=null) g.y=y;
    if(z!=null) g.z=z;
    g.setAttribute('transform','translate('+g.x+','+g.y+') scale('+g.z+') rotate(0,50,50)');
    if(objParent!=null) objParent.appendChild(g);
    showLoad(g);
}
function spinLoad(g,c){
	// this is to switch on the spinning spiral animation
	// to switch off and hide away the spinning animation only set shown attr equal to false through hideG() function
    if(g.shown===true){
        g.setAttribute('transform','translate('+g.x+','+g.y+') scale('+g.z+') rotate('+c+',50,50)');
        c=c+4;
        requestAnimationFrame(function(){spinLoad(g,c);});
    }
}