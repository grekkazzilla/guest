// ************************************//
// *********** CHESS UNITS *********** //
// ************************************// 50 X 50
function draw_white_king(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 25.030443,27.1875 c 0,0 4.5,-7.5 3,-10.5 0,0 -1,-2.5 -3,-2.5 -2,0 -3,2.5 -3,2.5 -1.5,3 3,10.5 3,10.5');
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 14.030443,39.1875 c 5.5,3.5 15.5,3.5 21,0 l 0,-7 c 0,0 9,-4.5 6,-10.5 -4,-6.5 -13.5,-3.5 -16,4 l 0,3.5 0,-3.5 c -3.5,-7.5 -13,-10.5 -16.0000004,-4 -3,6 5.0000004,10 5.0000004,10 l 0,7.5 z');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 25.030443,13.8175 0,-5.63');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 22.530443,10.1875 5,0');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 14.030443,32.1875 c 5.5,-3 15.5,-3 21,0');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 14.030443,35.6875 c 5.5,-3 15.5,-3 21,0');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 14.030443,39.1875 c 5.5,-3 15.5,-3 21,0');
    g.name='king';
    g.side=true;
    g.fen='K';
    return g;
}
function draw_black_king(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 14.030443,39.1875 c 5.5,3.5 15.5,3.5 21,0 l 0,-7 c 0,0 9,-4.5 6,-10.5 -4,-6.5 -13.5,-3.5 -16,4 l 0,3.5 0,-3.5 c -3.5,-7.5 -13,-10.5 -16.0000004,-4 -3,6 5.0000004,10 5.0000004,10 l 0,7.5 z');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 25.030443,27.1875 c 0,0 4.5,-7.5 3,-10.5 0,0 -1,-2.5 -3,-2.5 -2,0 -3,2.5 -3,2.5 -1.5,3 3,10.5 3,10.5');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 25.030443,13.8175 0,-5.63');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 22.530443,10.1875 5,0');
    getPath(null,g,0,0,1,'none','#ffffff',1.5,'m 34.530443,31.6875 c 0,0 8.5,-4 6.03,-9.65 -3.88,-5.85 -13.03,-1.85 -15.53,4.65 l 0.01,2.1 -0.01,-2.1 c -2.5,-6.5 -12.594,-10.5 -15.5030004,-4.65 -2.497,5.65 4.8530004,9 4.8530004,9');
    getPath(null,g,0,0,1,'none','#ffffff',1.5,'m 14.030443,32.1875 c 5.5,-3 15.5,-3 21,0 m -21,3.5 c 5.5,-3 15.5,-3 21,0 m -21,3.5 c 5.5,-3 15.5,-3 21,0');
    g.name='king';
    g.side=false;
    g.fen='k';
	return g;
}
function draw_white_queen(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 11.5,28.625 c 8.5,-1.5 21,-1.5 27,0 l 2,-12 -7,11 0,-14 -5.5,13.5 -3,-15 -3,15 -5.5,-14 0,14.5 -7,-11 2,12 z');
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 11.5,28.625 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1.5,2.5 -1.5,2.5 -1.5,1.5 0.5,2.5 0.5,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 14,32.625 c 3.5,-1 18.5,-1 22,0');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 14.5,36.125 c 6,-1 15,-1 21,0');
    getCircle(null,g,8.5,13.7783847,2.75,'#ffffff','#000000',1.5);
    getCircle(null,g,16.5,10.7783847,2.75,'#ffffff','#000000',1.5);
    getCircle(null,g,25,9.7783847,2.75,'#ffffff','#000000',1.5);
    getCircle(null,g,33.5,10.7783847,2.75,'#ffffff','#000000',1.5);
    getCircle(null,g,41.5,13.7783847,2.75,'#ffffff','#000000',1.5);
    g.name='queen';
    g.side=true;
    g.fen='Q';
	return g;
}
function draw_black_queen(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 11.5,27.778385 c 8.5,-1.5 21,-1.5 27,0 l 2.5,-12.5 -7.5,11.5 -0.3,-14.1 -5.2,13.6 -3,-14.5 -3,14.5 -5.2,-13.6 -0.3,14.1 -7.5,-11.5 2.5,12.5 z');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 11.5,27.778385 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1.5,2.5 -1.5,2.5 -1.5,1.5 0.5,2.5 0.5,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 13.5,40.278385 a 35,35 0 0 0 23,0');
    getPath(null,g,0,0,1,'none','#ffffff',1.5,'m 13.5,30.778385 a 35,35 0 0 1 23,0');
    getPath(null,g,0,0,1,'none','#ffffff',1.5,'m 15,33.278385 20,0');
    getPath(null,g,0,0,1,'none','#ffffff',1.5,'m 14,36.278385 a 35,35 0 0 0 22,0');
    getPath(null,g,0,0,1,'none','#ffffff',1.5,'m 13,39.278385 a 35,35 0 0 0 24,0');
    getCircle(null,g,8.5,13.7783847,2.75,'#000000','none',0);
    getCircle(null,g,16.5,10.7783847,2.75,'#000000','none',0);
    getCircle(null,g,25,9.7783847,2.75,'#000000','none',0);
    getCircle(null,g,33.5,10.7783847,2.75,'#000000','none',0);
    getCircle(null,g,41.5,13.7783847,2.75,'#000000','none',0);
    g.name='queen';
    g.side=false;
    g.fen='q';
	return g;
}
function draw_white_rook(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 33.5,18 0,12.5 -17,0 0,-12.5');
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 36.5,15 -3,3 -17,0 -3,-3');
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 13.5,15 0,-5 4,0 0,2 5,0 0,-2 5,0 0,2 5,0 0,-2 4,0 0,5');
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'M 33.5,30.5 35,33 15,33 16.5,30.5');
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 14.5,37 0,-4 21,0 0,4 -21,0 z');
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 11.5,40 27,0 0,-3 -27,0 0,3 z');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 13.5,15 23,0');
    g.name='rook';
    g.side=true;
    g.fen='R';
	return g;
}
function draw_black_rook(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 16.5,30.5 0,-13 17,0 0,13 -17,0 z');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 16.5,17.5 -3,-2.5 23,0 -3,2.5 -17,0 z');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 13.5,15 0,-5 4,0 0,2 5,0 0,-2 5,0 0,2 5,0 0,-2 4,0 0,5 -23,0 z');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 15,33 1.5,-2.5 17,0 1.5,2.5 -20,0 z');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 14.5,37 0,-4 21,0 0,4 -21,0 z');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 11.5,40 27,0 0,-3 -27,0 0,3 z');
    getPath(null,g,0,0,1,'none','#ffffff',1.5,'m 13.5,15 23,0');
    getPath(null,g,0,0,1,'none','#ffffff',1,'m 16.5,17.5 17,0');
    getPath(null,g,0,0,1,'none','#ffffff',1,'m 16.5,30.5 17,0');
    getPath(null,g,0,0,1,'none','#ffffff',1,'m 15.5,32.5 19,0');
    getPath(null,g,0,0,1,'none','#ffffff',1.5,'m 14.5,36.5 21,0 0,0');
    g.name='rook';
    g.side=false;
    g.fen='r';
	return g;
}
function draw_white_knight(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 24.985521,12 c 10.5,1 16.5,8 16,29 l -23,0 c 0,-9 10,-6.5 8,-21');
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 26.985521,20 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.042,-0.94 1.41,-3.04 0,-3 -1,0 0.19,1.23 -1,2 -1,0 -4.0030004,1 -4.0000004,-4 0,-2 6.0000004,-12 6.0000004,-12 0,0 1.89,-1.9 2,-3.5 -0.73,-0.994 -0.5,-2 -0.5,-3 1,-1 3,2.5 3,2.5 l 2,0 c 0,0 0.78,-1.992 2.5,-3 1,0 1,3 1,3');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 17.918521,17.75 a 0.499989,1.499967 30.000728 0 1 -0.866,-0.5 0.499989,1.499967 30.000728 0 1 0.866,0.5 z');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 12.485521,27.5 a 0.5,0.5 0 0 1 -1,0 0.5,0.5 0 1 1 1,0 z');
    g.name='knight';
    g.side=true;
    g.fen='N';
	return g;
}
function draw_black_knight(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 24.985521,12 c 10.5,1 16.5,8 16,29 l -23,0 c 0,-9 10,-6.5 8,-21');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 26.985521,20 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.042,-0.94 1.41,-3.04 0,-3 -1,0 0.19,1.23 -1,2 -1,0 -4.0030004,1 -4.0000004,-4 0,-2 6.0000004,-12 6.0000004,-12 0,0 1.89,-1.9 2,-3.5 -0.73,-0.994 -0.5,-2 -0.5,-3 1,-1 3,2.5 3,2.5 l 2,0 c 0,0 0.78,-1.992 2.5,-3 1,0 1,3 1,3');
    getPath(null,g,0,0,1,'#ffffff','none',0,'m 27.535521,12.4 -0.45,1.45 0.5,0.15 c 3.15,1 5.65,2.49 7.9,6.75 2.25,4.26 3.25,10.31 2.75,20.25 l -0.05,0.5 2.25,0 0.05,-0.5 c 0.5,-10.06 -0.88,-16.85 -3.25,-21.34 -2.37,-4.49 -5.79,-6.64 -9.19,-7.16 l -0.51,-0.1 z');
    getPath(null,g,0,0,1,'#ffffff','#ffffff',1.5,'m 17.918521,17.75 a 0.499989,1.499967 30.000728 0 1 -0.866,-0.5 0.499989,1.499967 30.000728 0 1 0.866,0.5 z');
    getPath(null,g,0,0,1,'#ffffff','#ffffff',1.5,'m 12.485521,27.5 a 0.5,0.5 0 0 1 -1,0 0.5,0.5 0 1 1 1,0 z');
    g.name='knight';
    g.side=false;
    g.fen='n';
	return g;
}
function draw_white_bishop(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 17.5,34.842407 c 2.5,2.5 12.5,2.5 15,0 0.5,-1.5 0,-2 0,-2 0,-2.5 -2.5,-4 -2.5,-4 5.5,-1.5 6,-11.5 -5,-15.5 -11,4 -10.5,14 -5,15.5 0,0 -2.5,1.5 -2.5,4 0,0 -0.5,0.5 0,2 z');
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 11.5,38.842407 c 3.39,-0.97 10.11,0.43 13.5,-2 3.39,2.43 10.11,1.03 13.5,2 0,0 1.65,0.54 3,2 -0.68,0.97 -1.65,0.99 -3,0.5 -3.39,-0.97 -10.11,0.46 -13.5,-1 -3.39,1.46 -10.11,0.03 -13.5,1 -1.354,0.49 -2.323,0.47 -3,-0.5 1.354,-1.94 3,-2 3,-2 z');
    getPath(null,g,0,0,1,'none','#000000',1.5,'m 20,28.842407 10,0 m -12.5,4 15,0 m -7.5,-14.5 0,5 m -2.5,-2.5 5,0');
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 27.5,10.842407 a 2.5,2.5 0 0 1 -5,0 2.5,2.5 0 1 1 5,0 z');
    g.name='bishop';
    g.side=true;
    g.fen='B';
	return g;
}
function draw_black_bishop(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 17.5,34.842407 c 2.5,2.5 12.5,2.5 15,0 0.5,-1.5 0,-2 0,-2 0,-2.5 -2.5,-4 -2.5,-4 5.5,-1.5 6,-11.5 -5,-15.5 -11,4 -10.5,14 -5,15.5 0,0 -2.5,1.5 -2.5,4 0,0 -0.5,0.5 0,2 z');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 11.5,38.842407 c 3.39,-0.97 10.11,0.43 13.5,-2 3.39,2.43 10.11,1.03 13.5,2 0,0 1.65,0.54 3,2 -0.68,0.97 -1.65,0.99 -3,0.5 -3.39,-0.97 -10.11,0.46 -13.5,-1 -3.39,1.46 -10.11,0.03 -13.5,1 -1.354,0.49 -2.323,0.47 -3,-0.5 1.354,-1.94 3,-2 3,-2 z');
    getPath(null,g,0,0,1,'none','#ffffff',1.5,'m 20,28.842407 10,0 m -12.5,4 15,0 m -7.5,-14.5 0,5 m -2.5,-2.5 5,0');
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 27.5,10.842407 a 2.5,2.5 0 0 1 -5,0 2.5,2.5 0 1 1 5,0 z');
    g.name='bishop';
    g.side=false;
    g.fen='b';
	return g;
}
function draw_white_pawn(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#ffffff','#000000',1.5,'m 25,9.75 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 -1.95,1.12 -3.28,3.21 -3.28,5.62 0,2.03 0.94,3.84 2.41,5.03 -3,1.06 -7.41,5.55 -7.41,13.47 l 23,0 c 0,-7.92 -4.41,-12.41 -7.41,-13.47 1.47,-1.19 2.41,-3 2.41,-5.03 0,-2.41 -1.33,-4.5 -3.28,-5.62 0.49,-0.67 0.78,-1.49 0.78,-2.38 0,-2.21 -1.79,-4 -4,-4 z');
    g.name='pawn';
    g.side=true;
    g.fen='P';
	return g;
}
function draw_black_pawn(idUnit,objRoot,x,y,z,boolShown){
    var g=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
    getPath(null,g,0,0,1,'#000000','#000000',1.5,'m 25,9.75 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 -1.95,1.12 -3.28,3.21 -3.28,5.62 0,2.03 0.94,3.84 2.41,5.03 -3,1.06 -7.41,5.55 -7.41,13.47 l 23,0 c 0,-7.92 -4.41,-12.41 -7.41,-13.47 1.47,-1.19 2.41,-3 2.41,-5.03 0,-2.41 -1.33,-4.5 -3.28,-5.62 0.49,-0.67 0.78,-1.49 0.78,-2.38 0,-2.21 -1.79,-4 -4,-4 z');
    g.name='pawn';
    g.side=false;
    g.fen='p';
	return g;
}
// FAIRY UNITS
function draw_white_grasshopper(idUnit,objRoot,x,y,z,boolShown){
   var gOut=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
   var gIn=draw_white_queen(null,gOut,0,0,1,true);
   gIn.setAttribute('transform','translate(0,0) scale(1) rotate(180,25,25)');
   gOut.name='grasshopper';
   gOut.side=true;
   gOut.fen='G';
   return gOut;
}
function draw_black_grasshopper(idUnit,objRoot,x,y,z,boolShown){
   var gOut=getG(idUnit,objRoot,x,y,z,boolShown,25,25);
   var gIn=draw_black_queen(null,gOut,0,0,1,true);
   gIn.setAttribute('transform','translate(0,0) scale(1) rotate(180,25,25)');
   gOut.name='grasshopper';
   gOut.side=true;
   gOut.fen='G';
   return gOut;
}