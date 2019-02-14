function init(){
    // DEFINE ROOT ELEMENTS
    var sctRoot=document.getElementById('sctRoot');
    var svgRoot=document.getElementsByTagName('svg')[0];
    var gWrap=svgRoot.getElementsByTagName('g')[0];
    var dfs=svgRoot.getElementsByTagName('defs')[0];
    // GRADIENTS & EFFECTS
    getLinGrd('grdButton','#eee8aa','#bdb76d',1,1,false,'down',dfs);
    getLinGrd('grdButtonRvs','#bdb76d','#eee8aa',1,1,false,'down',dfs);
    getLinGrd('grdIcon','#a0a0a0','#000',1,1,false,'down',dfs);
    getLinGrd('grdIconRvs','#505050','#909090',1,1,false,'down',dfs);
    getLinGrd('grdPale','#fff','#eee8aa',1,1,false,'down',dfs);
    getLinGrd('grdPaleRvs','#eee8aa','#fff',1,1,false,'down',dfs);
    getLinGrd('grdGold','#ffeeaa','#aa8800',1,1,false,'down',dfs);
    getLinGrd('grdGoldBrd','#d3bc5f','#2b2200',1,1,false,'down',dfs); // gold border
    getLinGrd('grdSilver','#ececec','#999999',1,1,false,'down',dfs);
    getLinGrd('grdSilverRvs','#999999','#ececec',1,1,false,'down',dfs);
    getLinGrd('grdBrain','#fff','#bdb76d',1,1,false,'down',dfs);
    getBlurFilter('blr2',2,dfs);
    getBlurFilter('blr3',3,dfs);
    getBlurFilter('blr8',8,dfs);
    getBlurFilter('blr10',10,dfs);
    getBlurFilter('blr12',12,dfs);
    getBlurFilter('blr14',14,dfs);
    // FULL SCALE UP
    OBJ_var.fltScale=getScale(svgRoot,gWrap,OBJ_var.wArena,OBJ_var.hArena,10);
    //getGrid(gWrap,OBJ_var.wArena,OBJ_var.hArena,50);
    //
    getLoad('gLoad',gWrap,-9999,-9999,1,'none',0);
    getSay(gWrap,OBJ_var.wArena,OBJ_var.hArena,'url(#blr3)');
    ////////////////////
    // DIV ARENA ///////
    ////////////////////
    var div=getG('divArena',gWrap,0,0,1,true,OBJ_var.wArena/2,OBJ_var.hArena/2);
    OBJ_var.divOn=div;
    getButton('btnClose',div,-9999,-9999,40,40,false,'BXBX',picCross(),0.09,function(){hideBox(OBJ_var.boxOn)},null);
    // OBJ CHESS
    OBJ_chess.getBoard(8,8,2,'standard');
    // G CHESSBOARD
    var g=OBJ_board.drawBoard(div,'gBoard',4,104,1,49,'#eee8aa','#bdb76d',true);
    var pos=110; // for pawnjs engine purposes
    var num=21;
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            var gSqu=document.getElementById('g'+(pos+j)*1);
            gSqu.num=num+j;
            //getText(null,gSqu,25,40,15,'Arial','#f00','none',0,gSqu.num,'middle');
        }
        pos-=12;
        num+=10;
    }
    // G TOP
    var w=60, h=60, s=6.4, g=getG('gTop',div,4,6,1,true,0,0);
    getButton('btnVar',g,0,30,w,h,true,'AAAX',picListA(),0.11,function(){showBox('boxVar');},null);
    var btn=getButton('btnSide',g,(w+s),30,w,h,true,'AAAX',picNone(),0.11,function(){showBox('boxSide');},null);
    draw_white_pawn(null,btn,(w-50)/2-9,(h-50)/2,0.985,true);
    draw_black_pawn(null,btn,(w-50)/2+9,(h-50)/2,1,true);
    btn.getElementsByTagName('path')[1].setAttribute('fill','transparent');
    btn.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
    btn.getElementsByTagName('path')[1].setAttribute('stroke-width','2.5');
    btn.getElementsByTagName('path')[2].setAttribute('fill','url(#grdIcon)');
    btn.getElementsByTagName('path')[2].setAttribute('stroke','url(#grdIcon)');
    var btn=getButton('btnMatch',g,(w+s)*2,0,(w*2+s),h+30,true,'CXAX',picFence(),0.13,function(){
        showBox('boxVS');
    },null);
    var pth=btn.getElementsByTagName('path')[0]; pth.setAttribute('transform','translate('+(pth.x)+','+(pth.y+20)+') scale('+pth.z+')');
    var p=picUser(), z=0.12; getPath(null,btn,(btn.rx-p[0]*z/2),5,z,'url(#grdButton)','none',0,p[2]);
    var btn=getButton('btnTime',g,(w+s)*4,30,(w*2+s),h,true,'AAAX',picClock(),0.13,function(){showBox('boxTime');},null);
    var pth=btn.getElementsByTagName('path')[0];
    pth.setAttribute('transform','translate('+(pth.x-35)+','+pth.y+') scale('+pth.z+')');
    getText(null,btn,83,25,18,'Arial','url(#grdIcon)','none',0,'15 min','middle');
    getText(null,btn,83,45,18,'Arial','url(#grdIcon)','none',0,'10 sec','middle');
    // G BOTTOM
    var w=60, h=60, s=6.4, g=getG('gBottom',div,4,504,1,true,0,0);
    getButton('btnMenu',g,0,0,w,h,true,'AAAX',picMenu(),0.11,function(){showBox('boxMenu');},null);
    getButton('btnMenu',g,(w+s),0,w,h,true,'AAAX',picBook(),0.135,function(){},null);
    var btn=getButton('btnPlayer',g,(w+s)*2,0,(w*2+s),h+30,true,'CXDX',picNone(),0.225,function(){showBox('boxPlayer');},null);
    getPath(null,btn,37,10,0.225,'#bdb76d','none',0,'M 105.5 0 C 104.74638 -0.0097246875 104.01468 0.0072925 103.28125 0.03125 C 98.391734 0.19092 93.9294 1.08498 89.8125 2.53125 C 86.69648 3.62252 86.53689 8.17035 89.59375 9.40625 C 103.67501 15.08608 115.78969 26.57025 122.46875 45.1875 C 122.65283 45.69368 122.83566 46.18788 123 46.6875 C 120.0549 41.90828 116.23987 37.558 111.625 33.84375 C 97.379394 22.33289 77.656222 20.47536 60.53125 26.9375 C 50.354875 30.77665 43.478146 36.60218 38.59375 43.28125 C 37.016018 45.43748 38.858917 48.35814 41.46875 47.8125 C 56.943676 44.58474 74.010786 47.68593 90.15625 60.53125 C 97.63733 66.47403 103.15094 73.10075 106.9375 80.0625 C 102.08597 74.55358 95.33445 70.66358 87.53125 69.5 C 75.573354 67.70533 63.698403 73.57658 56.5 83.3125 C 53.614063 87.20425 51.971414 91.10493 51.15625 94.9375 C 50.604046 97.54077 53.677607 99.5119 55.78125 97.875 C 62.999377 92.2609 72.614318 89.31214 84.375 90.96875 C 94.03204 92.32955 101.4383 96.2871 106.75 101.75 C 105.80337 102.55858 46.88968 146.52303 8.28125 281.15625 C 5.927798 283.39125 3.73036 285.71405 1.71875 288.09375 C -2.238729 292.78105 1.098462 300 7.21875 300 L 252.1875 300 C 258.21575 300.033 261.67957 292.9273 257.78125 288.3125 C 239.84111 267.0855 207.69542 250.88795 168.84375 244.28125 C 165.04406 221.52905 158.24 210.9208 158.0625 210.625 C 161.02075 209.2379 164.61168 208.75565 168.6875 209.65625 C 173.65734 210.77385 177.03613 213.4105 179.09375 216.75 C 179.69198 217.7229 181.22875 217.3807 181.40625 216.25 C 181.66263 214.5934 181.56527 212.78625 181 210.78125 C 179.58005 205.79165 175.71815 201.6538 170.65625 200.5625 C 167.34958 199.8591 164.05544 200.4025 161.28125 201.875 C 163.85165 199.6531 167.03918 197.8312 170.9375 196.5625 C 179.35208 193.8672 186.70014 195.20185 192.40625 198.84375 C 193.37262 199.45515 194.55898 198.5419 194.25 197.4375 C 193.29678 194.0125 191.40355 190.67685 187.90625 187.59375 C 182.01603 182.41345 173.8232 180.1598 166.375 182.625 C 163.97552 183.4205 161.77485 184.5965 159.875 186.0625 C 160.013 185.885 160.17445 185.70215 160.3125 185.53125 C 165.8017 179.08225 172.40468 176.2828 178.90625 176.125 C 180.31963 176.092 180.9597 174.25755 179.875 173.34375 C 177.56758 171.42415 174.7192 169.9138 171.03125 169.125 C 162.73502 167.3566 153.99101 169.8604 148.71875 176.5 C 146.82546 178.8732 145.51258 181.5515 144.75 184.3125 C 142.51488 182.5047 139.9007 181.0783 136.96875 180.25 C 128.81713 177.936 120.26862 181.01635 114.5625 187.28125 C 112.09729 189.98315 110.69349 192.8048 109.9375 195.625 C 109.54306 197.0779 111.21314 198.2658 112.46875 197.4375 C 117.81332 193.8613 124.71185 192.33215 132.84375 194.34375 C 133.06727 194.40975 133.27648 194.47855 133.5 194.53125 C 131.10051 194.43925 128.64451 194.744 126.21875 195.5 C 118.73109 197.8338 113.39337 204.44825 111.625 212.09375 C 110.61262 216.49825 110.98114 220.2394 112.125 223.5 C 112.53916 224.6833 114.16978 224.68855 114.65625 223.53125 C 117.22664 217.36495 122.37315 212.1625 130.65625 209.5 C 134.55456 208.2444 138.21477 207.85385 141.59375 208.15625 C 138.47115 208.57035 135.48675 210.0578 133.21875 212.5625 C 129.7346 216.4016 128.99476 222.01525 130.75 226.90625 C 131.4534 228.87835 132.47295 230.39075 133.65625 231.59375 C 134.44511 232.40245 135.86672 231.8115 135.78125 230.6875 C 135.48542 226.7628 136.70821 222.6878 140.09375 218.875 C 142.7036 215.9496 145.67666 214.0457 148.6875 213.625 C 148.6805 213.625 153.46103 225.36665 154.125 242.28125 C 146.17716 241.46605 137.99193 241 129.65625 241 C 109.24433 241 89.846669 243.54785 72.28125 248.15625 C 75.923183 168.78965 124.75334 116.20045 124.8125 115.9375 C 130.82761 119.9147 135.9318 126.00987 139.21875 134.5625 C 143.49835 145.67237 142.74702 155.7531 138.875 164.0625 C 137.76402 166.4422 140.35711 168.95475 142.75 167.84375 C 146.3262 166.18715 149.80013 163.68295 152.96875 159.96875 C 160.81138 150.75875 163.85677 137.86633 159.40625 126.625 C 156.5006 119.28853 151.16773 113.61573 144.71875 110.125 C 152.34447 112.24178 160.04358 116.09503 167.53125 122.03125 C 183.4269 134.65968 190.36061 150.29645 190.90625 165.84375 C 191.01141 168.76255 194.5952 170.0607 196.46875 167.8125 C 201.6424 161.633 205.53727 153.77155 206.9375 143.3125 C 209.36985 125.162 203.11718 106.33672 188.6875 95.0625 C 184.02005 91.40742 178.9186 88.7256 173.59375 86.9375 C 174.12623 86.9902 174.64845 87.04125 175.1875 87.09375 C 194.59362 89.36173 208.45738 98.35481 217.1875 110.5625 C 219.2254 113.409 223.82755 112.19635 224.15625 108.71875 C 224.83337 101.9345 224.03047 94.62875 220.875 86.6875 C 213.57799 68.3069 197.46509 54.57602 177.75 52.90625 C 170.6765 52.30802 163.80101 53.20228 157.4375 55.3125 C 158.06203 48.63343 157.36334 41.74481 155.1875 35 C 149.1198 16.1724 132.11323 3.57171 112.5625 0.59375 C 110.1238 0.2239625 107.76086 0.029174062 105.5 0 z');
    btn.arrOn.push(['path',1,'fill','#bdb76d','url(#grdPale)']);
    
    btn.req=function(){}
    getButton('btnSetUp',g,(w+s)*4,0,w,h,true,'AAAX',picGear(),0.13,function(){},null);
    getButton('btnOnLine',g,(w+s)*5,0,w,h,true,'AAAX',picEye(),0.13,function(){},null);
    // BOX VAR
    var w=150, h=60, m=10, s=10, x=m, y=60, qtyHor=2, qtyVer=4;
    var box=getMenu('boxVar',div,w,h,m,s,qtyHor,qtyVer,false);
    getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'Game','start');
    var arr=new Array(['Classic',''],['Shuffle',''],['Chess','960'],['Three','Queens'],['Pawn','Attack'],['Racing','Kings'],['Knight','King'],['Checkers','']);
    for(var i=0;i<arr.length;i++){
        var btn=getButton(null,box,x,y,w,h,true,'AAXC',null,0,function(){
       
        },arr[i][0]+'~'+arr[i][1]);
        btn.strVar=arr[i][0]+' '+arr[i][1];
        btn.do=function(){
            
        }
        getCircle(null,btn,25,30,10,'url(#grdButtonRvs)','none',0);
        btn.arrOn.push(['circle',0,'fill','url(#grdButtonRvs)','#eee8aa']);
        var arrText=btn.getElementsByTagName('text');
        arrText[0].setAttribute('x',btn.rx+15);arrText[1].setAttribute('x',btn.rx+15);
        if(arrText[1].firstChild.nodeValue=='') arrText[0].setAttribute('y',37);
        else{arrText[0].setAttribute('y',25);arrText[1].setAttribute('y',45);}
        x+=w+s;if((i+1)%qtyHor==0){x-=(w+s)*qtyHor;y+=h+s;}
    }
    // BOX SIDE
    var w=60, h=60, m=10, s=10, x=m, y=60, qtyHor=3, qtyVer=1;
    var box=getMenu('boxSide',div,w,h,m,s,qtyHor,qtyVer,false);
    getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'Take your side','start');
    var btn=getButton(null,box,10,60,w,h,true,'AAAX',picNone(),0,function(){},null);
    draw_white_pawn(null,btn,(w-50)/2,(h-50)/2,1,true);
    btn.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
    var btn=getButton(null,box,10+w+s,60,w,h,true,'AAAX',picNone(),0,function(){},null);
    draw_black_pawn(null,btn,(w-50)/2,(h-50)/2,1,true);
    btn.getElementsByTagName('path')[1].setAttribute('fill','url(#grdIcon)');
    btn.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
    var btn=getButton(null,box,10+(w+s)*2,60,w,h,true,'AAAX',picNone(),0,function(){},null);
    draw_white_pawn(null,btn,(w-50)/2-9,(h-50)/2,1,true);
    draw_black_pawn(null,btn,(w-50)/2+9,(h-50)/2,1,true);
    btn.getElementsByTagName('path')[1].setAttribute('stroke','url(#grdIcon)');
    btn.getElementsByTagName('path')[2].setAttribute('fill','url(#grdIcon)');
    btn.getElementsByTagName('path')[2].setAttribute('stroke','url(#grdIcon)');
    // BOX VS
    var box=getBox('boxVS',div,270,260,false,'#fff');
    getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'VS','start');
    var w=120, h=120, zIcon=0.35, btn=getButton('btnRobo',box,box.rx-s/2-w-1,60,w,h,true,'CXDX',picHead(),zIcon,function(){
        
    },null);
    getPath(null,btn,10,8,zIcon,'#fff','none',0,'M 150.8125 20.53125 C 142.23166 20.649011 133.77351 21.738763 125.6875 23.9375 C 97.476949 31.608545 75.888382 40.919518 62.65625 61.46875 C 48.139048 84.013668 46.658714 118.80442 61.0625 133.34375 C 84.590096 157.0928 148.9015 132.89243 169.59375 153.90625 C 185.13814 169.69221 183.625 205.90625 183.625 205.90625 C 183.625 205.90625 203.71848 209.09576 221.21875 206.0625 C 225.28586 173.47627 250.99893 165.25705 258.90625 136.59375 C 263.84646 118.68614 262.8774 99.610612 255.71875 82.46875 C 247.2828 62.268205 225.31432 42.412494 205.625 32.84375 C 189.04438 24.785735 169.69006 20.272178 150.8125 20.53125 z');
    var z=0.1, p=picGear();
    getPath(null,btn,39,21,z,'url(#grdIcon)','none',0,p[2]);
    var pth=getPath(null,btn,66,33,z,'url(#grdIcon)','none',0,p[2]);
    pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+z+') rotate(25,'+p[0]/2+','+p[1]/2+')');
    btn.setAttribute('transform','translate('+(btn.x+btn.rx*2)+','+btn.y+') scale(-1,1)');
    btn.arrOn.push(['path',1,'fill','#fff','#bdb76d'],['path',2,'fill','url(#grdIcon)','#fff'],['path',3,'fill','url(#grdIcon)','#fff']);
    var xIcon=10, yIcon=6, btn=getButton('btnHuman',box,box.rx+s/2+1,60,w,h,true,'CXAX',picHead(),zIcon,function(){
        
    },null); 
    getPath(null,btn,xIcon,yIcon,zIcon,'url(#grdBrain)','none',0,'M 149.71875,30.84375 C 139.88213,13.621626 99.966923,23.567615 104.75,42.59375 81.013503,35.786955 63.09487,59.874892 71.78125,74.5625 47.70203,84.174724 47.88273,103.19077 53.9375,117.4375 59.99836,131.69857 74.80883,144.06908 97.21875,134.375 120.06502,155.77418 142,136.0625 142,136.0625 c 0,0 23.03388,5.93899 26.40625,16.3125 4.45302,13.69731 1.4375,53.15625 1.4375,53.15625 12.1259,6.3128 26.07209,5.58737 36.03125,0.0937 0,0 -3.60519,-22.12751 5.53125,-22.40625 19.89695,-0.60702 50.01297,-21.83416 35.125,-40.5 20.34995,-0.86524 23.78991,-34.688 2.125,-43.90625 21.48307,-9.311746 -2.27502,-46.028717 -18.375,-37.65625 C 240.4482,42.907054 197.30804,22.136436 188.75,40.71875 188.51801,19.835603 159.09786,14.579847 149.71875,30.84375 z');
    pth=getPath(null,btn,xIcon,yIcon,zIcon,'#bdb76d','none',0,'M 128.875 28.34375 L 121.875 38.125 C 124.04186 39.672761 127.65321 45.172054 128.90625 51.53125 C 130.00989 57.132226 129.58595 63.130059 126.96875 68.15625 C 120.5826 71.22332 115.66776 76.022071 112.03125 80.875 C 111.805 81.17693 111.59572 81.478271 111.375 81.78125 C 108.24042 68.105692 98.786805 55.874919 87.34375 48.75 L 81 58.9375 C 94.216846 67.166853 104.03086 85.198972 99.03125 100.3125 C 89.230803 109.7786 83.631096 108.72246 79.0625 106.59375 C 74.3967 104.41975 71.34375 99.875 71.34375 99.875 L 61.1875 106.28125 C 61.1875 106.28125 65.555473 113.53408 74 117.46875 C 82.444527 121.40342 95.533839 120.76333 108.125 108.25 C 113.83019 102.58007 116.74126 94.579852 121.625 88.0625 C 126.50874 81.545148 131.8427 76.894435 141.53125 76.84375 C 151.47056 76.79175 156.47554 81.199307 159.875 85.9375 C 161.9217 88.790212 163.07296 91.607838 163.6875 93.40625 C 161.59453 95.134613 159.71847 97.175402 158.1875 99.5 C 153.67407 97.156779 148.9316 96.072932 144.28125 96.09375 C 138.3126 96.12047 132.52713 97.920598 127.6875 101.09375 C 118.00825 107.44005 111.50213 118.98439 112.21875 132.0625 L 124.1875 131.40625 C 123.71005 122.69279 128.10797 115.15209 134.25 111.125 C 140.192 107.22906 147.2189 106.42934 154.3125 111.09375 C 153.88113 117.9838 156.20761 125.71523 161.5 134.0625 L 171.625 127.625 C 166.58827 119.68095 165.76827 114.11688 166.5 110.28125 C 167.23173 106.44562 169.58027 103.58176 173.4375 101.15625 C 177.29473 98.730741 182.55056 97.092367 187.53125 96.46875 C 192.51194 95.845133 197.2979 96.314133 199.53125 97.09375 C 210.58709 100.95312 215.20982 106.28111 217 111.625 C 218.79018 116.96889 217.69672 123.1884 214.5625 128.84375 C 211.57562 134.23323 207.40385 136.94865 202.28125 140.09375 C 197.15865 143.23885 190.79142 146.78544 187.15625 154.15625 C 182.48693 163.62393 181.72877 176.44594 181.53125 187.4375 C 181.33373 198.42906 182.09375 207.46875 182.09375 207.46875 L 194.03125 206.46875 C 194.03125 206.46875 193.34579 197.97687 193.53125 187.65625 C 193.71671 177.33563 195.18327 165.05334 197.9375 159.46875 C 199.76387 155.76554 203.26323 153.54689 208.53125 150.3125 C 210.03513 149.38917 211.65463 148.37598 213.3125 147.21875 C 217.42996 147.93523 220.1266 149.11099 221.625 150.625 C 223.58919 152.60965 224.99222 156.09996 224.1875 164.28125 L 236.125 165.46875 C 237.11137 155.44064 235.35642 147.44184 230.15625 142.1875 C 228.12493 140.13502 225.79706 138.65506 223.25 137.5625 C 223.8867 136.64785 224.48938 135.69039 225.0625 134.65625 C 228.17428 129.04141 230.10337 122.53412 229.84375 115.90625 C 232.79796 115.59993 235.22145 116.11214 237.25 117.15625 C 240.57718 118.86877 243.36546 122.32683 244.96875 128 L 256.53125 124.75 C 254.25385 116.69149 249.57232 109.98024 242.75 106.46875 C 239.33884 104.71301 235.50645 103.86962 231.46875 103.875 C 229.96451 103.87686 228.42512 104.00576 226.875 104.25 C 224.9315 100.37352 222.00001 96.758947 218.09375 93.625 C 220.20058 88.440056 223.92513 85.378366 228 83.65625 C 232.77885 81.636616 238.01609 82.202824 239.625 83.15625 L 245.75 72.84375 C 242.5245 70.932345 238.85749 70.057778 235.03125 70.0625 C 231.20501 70.0672 227.22314 70.954247 223.34375 72.59375 C 217.1733 75.201502 211.27225 80.189916 207.75 87.46875 C 206.38145 86.867305 204.96472 86.303462 203.46875 85.78125 C 200.94875 84.901572 198.18061 84.402033 195.25 84.21875 C 194.70319 84.184552 194.15098 84.169149 193.59375 84.15625 C 196.32781 68.580022 205.88097 58.966879 218.90625 56.125 L 216.34375 44.375 C 197.74673 48.43253 183.93123 64.069129 181.3125 85.375 C 178.94882 85.88412 176.56293 86.560034 174.25 87.4375 C 173.25316 84.96868 171.79236 81.958377 169.625 78.9375 C 168.17114 76.911105 166.32419 74.887381 164.125 73 C 176.24997 62.39507 179.03979 45.360529 174.03125 31.21875 L 162.71875 35.25 C 166.8167 46.820683 164.30461 59.652531 152.65625 66.53125 C 149.32859 65.45824 145.60051 64.822135 141.46875 64.84375 C 141.21394 64.845083 140.9706 64.868456 140.71875 64.875 C 141.79601 59.544092 141.63056 54.132117 140.65625 49.1875 C 138.92415 40.39707 135.06655 32.766285 128.875 28.34375 z');
    pth.setAttribute('stroke-linecap','butt');
    btn.arrOn.push(['path',1,'fill','url(#grdBrain)','#bdb76d'],['path',2,'fill','#bdb76d','#fff']);
    var w=120, h=60, btn=getButton('btnFriend',box,box.rx-w/2,190,w,h,true,'CXAX',picGlad(),0.1,function(){
        
    },null);
    var pth=btn.getElementsByTagName('path')[0]; pth.setAttribute('transform','translate('+(pth.x-25)+','+pth.y+') scale('+pth.z+')');
    var z=0.12, p=picEnvelope(); getPath(null,btn,70,btn.ry-p[1]*z/2,z,'url(#grdIcon)','none',0,p[2]);
    // BOX TIME
    var w=126.4, h=60, m=10, s=10, x=m, y=60, qtyHor=2, qtyVer=4, arr=new Array(
        ['simple_delay',1,5],
        ['simple_delay',2,3],
        ['simple_delay',3,3],
        ['simple_delay',5,2],
        ['simple_delay',10,0],
        ['simple_delay',15,0],
        ['accumulation',15,15],
        ['compensation',5,30]
    );
    var box=getMenu('boxTime',div,w,h,m,s,qtyHor,qtyVer,false);
    getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'Time Control','start');
    for(var i=0;i<arr.length;i++){
        if(arr[i][0]=='simple_delay') var p=picClock(), z=0.13, dx=30;
        else if(arr[i][0]=='accumulation') var p=picHeap(), z=0.12, dx=30;
        else if(arr[i][0]=='compensation') var p=picUp(), z=0.12, dx=30;
        var btn=getButton(null,box,x,y,w,h,true,'AAAC',p,z,function(){},'a~b');
        var pth=btn.getElementsByTagName('path')[0]; pth.setAttribute('transform','translate('+(pth.x-dx)+','+pth.y+') scale('+pth.z+')');
        if(arr[i][2]==0) var yA=35, strB='';
        else var yA=25, strB=arr[i][2]+' sec';
        var txtA=btn.getElementsByTagName('text')[0]; txtA.setAttribute('x','85'); txtA.setAttribute('y',yA); txtA.firstChild.nodeValue=arr[i][1]+' min';
        var txtB=btn.getElementsByTagName('text')[1]; txtB.setAttribute('x','85'); txtB.setAttribute('y','45'); txtB.firstChild.nodeValue=strB;
        x+=w+s;if((i+1)%qtyHor==0){x-=(w+s)*qtyHor;y+=h+s;}
    }
    // BOX MENU
    var w=60, h=60, m=10, s=10, x=m, y=60, qtyHor=2, qtyVer=2, arr=new Array(
        [picEnter(),0.13,function(){}],
        [picBulb(),0.13,function(){}],
        [picBoot(),0.145,function(){}],
        [picHand(),0.14,function(){}]
    );
    var box=getMenu('boxMenu',div,w,h,m,s,qtyHor,qtyVer,false);
    getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'Menu','start');
    for(var i=0;i<arr.length;i++){
        getButton(null,box,x,y,w,h,true,'AAAC',arr[i][0],arr[i][1],arr[i][2],null);
        x+=w+s;if((i+1)%qtyHor==0){x-=(w+s)*qtyHor;y+=h+s;}
    }
    // BOX PLAYER
    var box=getBox('boxPlayer',div,260,270,false,'#fff');
    getText(null,box,15,35,18,'Arial','url(#grdButton)','none',0,'My Name','start');
    getRect(null,box,10,60,240,40,5,'transparent','#eee8aa',1);
    getText(null,box,box.rx,85,18,'Arial','url(#grdIcon)','none',0,'Stranger','middle');
    getButton(null,box,box.rx-100,110,60,60,true,'AAAC',picPenA(),0.12,function(){},null);
    getButton(null,box,box.rx-30,110,60,60,true,'AAAC',picImage(),0.13,function(){showDiv('divPic');setPix();},null);
    getButton(null,box,box.rx+40,110,60,60,true,'AAAC',picCam(),0.13,function(){},null);
    getText(null,box,15,200,18,'Arial','url(#grdButton)','none',0,'Self Ranking','start');
    var w=40, h=40, s=10, z=0.11, p=picStar();
    for(var i=0;i<5;i++){
        var btn=getButton('btnRank'+(i+1),box,box.rx-(w*5+s*4)/2+(w+s)*i,220,w,h,true,'XXAX',p,z,function(){
            putRank(this.intRank);
            OBJ_var.arrU[0].intRank=this.intRank;
            setLocal('rank',this.intRank);
        },null);
        var pth=btn.getElementsByTagName('path')[0];
        pth.setAttribute('fill','transparent');
        pth.setAttribute('stroke','#000');
        pth.setAttribute('stroke-width','10');
        pth.setAttribute('filter','url(#blr12)');
        getPath(null,btn,0,0,1,'url(#grdButton)','#bdb76d',0.5,'M 5 0 C 2.23 0 0 2.23 0 5 L 0 35 C 0 37.77 2.23 40 5 40 L 35 40 C 37.77 40 40 37.77 40 35 L 40 5 C 40 2.23 37.77 0 35 0 L 5 0 z M 19.90625 5.21875 C 20.356973 5.21375 20.758674 5.49315 20.9375 5.90625 L 24.5 14.15625 C 24.66421 14.53895 25.021181 14.7805 25.4375 14.8125 L 34.40625 15.5 C 34.855902 15.5336 35.231836 15.8226 35.375 16.25 C 35.518162 16.6775 35.4015 17.1398 35.0625 17.4375 L 28.3125 23.375 C 27.999716 23.65 27.86925 24.0948 27.96875 24.5 L 30.09375 33.21875 C 30.2015 33.65595 30.01781 34.13805 29.65625 34.40625 C 29.294815 34.67435 28.824393 34.69815 28.4375 34.46875 L 20.6875 29.875 C 20.328208 29.6617 19.885626 29.6558 19.53125 29.875 L 11.90625 34.59375 C 11.522383 34.83085 11.023861 34.8236 10.65625 34.5625 C 10.28871 34.3005 10.12014 33.84595 10.21875 33.40625 L 12.1875 24.625 C 12.27874 24.2188 12.13046 23.80155 11.8125 23.53125 L 4.96875 17.71875 C 4.6257348 17.42755 4.4900292 16.96085 4.625 16.53125 C 4.7600971 16.10185 5.1452959 15.791 5.59375 15.75 L 14.53125 14.9375 C 14.94637 14.899 15.311409 14.6358 15.46875 14.25 L 18.875 5.90625 C 19.045762 5.48915 19.456535 5.22875 19.90625 5.21875 z');
        getPath(null,btn,(w-p[0]*z)/2,(w-p[1]*z)/2,z,'url(#grdGold)','url(#grdGoldBrd)',5,p[2]);
        btn.intRank=i+1;
        btn.arrOn[0]=['path', 0, 'filter', 'url(#blr12)', 'url(#blr8)'];
        btn.arrOn[1]=['path', 1, 'fill', 'url(#grdButton)', '#bdb76d'];
        btn.arrOn[2]=['path', 2, 'fill', 'url(#grdGold)', '#aa8800'];
        btn.arrOn[3]=['path', 2, 'stroke', 'url(#grdGoldBrd)', '#aa8800'];
    }
    ////////////////////
    // DIV PIC /////////
    ////////////////////
    var div=getG('divPic',gWrap,0,0,1,false,OBJ_var.wArena/2,OBJ_var.hArena/2);
    getButton(null,div,div.rx-20,10,40,40,true,'BXBX',picCross(),0.09,function(){showDiv('divArena')},null);
    getButton('btnRefreshPix',div,div.rx-30,div.ry*2-70,60,60,true,'DXCX',picRefresh(),0.13,function(){setPix();},null);
    var w=90, h=w, r=0, s=15, nh=3, nv=4, x=(400-w*nh-s*(nh-1))/2, y=(600-h*nv-s*(nv-1)-15)/2;
    for(var i=0;i<12;i++){
        var g=getG('gPic'+i,divPic,x,y,1,true,w/2,h/2);
        getRect(null,g,0,0,w,h,r,'#808080','none',0).setAttribute('filter','url(#blr2)');
        getRect(null,g,0,0,w,h,r,'#fff','none',0);
        getPath(null,g,0,0,0,'none','none',0,'');
        g.style.cursor='pointer';
        g.onclick=function(){
            if(OBJ_var.blnLock===false){
                OBJ_var.blnLock=true;
                showDiv('divArena');
                showBox('menuMain');
                var z=0.6, gPic=o('gPlayerPicA'), pthPic=gPic.getElementsByTagName('path')[0];
                pthPic.setAttribute('d','');
                drawLoad('gLoad','url(#grdButton)',6,(gPic.rx*2-100*z)/2,(gPic.ry*2-100*z)/2,z,gPic);
                sendRequest('async_pic.php','file='+this.strFile+'&shot='+OBJ_var.strShot,function(){
                    hideG('gLoad');
                    var rsp=xhr.responseText.split('~');
                    if(rsp[0]=='change_pic_ok'){
                        hideG('gLoad');
                        var arrPic=rsp[2].split(':');
                        var wPic=arrPic[0]*1;
                        var hPic=arrPic[1]*1;
                        var strPicD=arrPic[2];
                        var zPic=0.225, gPic=o('gPlayerPicA'), pthPic=gPic.getElementsByTagName('path')[0];
                        pthPic.setAttribute('transform','translate('+(gPic.rx-wPic*zPic/2)+','+(gPic.ry-hPic*zPic/2)+') scale('+zPic+')');
                        pthPic.setAttribute('d',strPicD);
                        var zPic=0.3, gPic=o('gPlayerPicB'), pthPic=gPic.getElementsByTagName('path')[0];
                        pthPic.setAttribute('transform','translate('+(gPic.rx-wPic*zPic/2)+','+(gPic.ry-hPic*zPic/2)+') scale('+zPic+')');
                        pthPic.setAttribute('d',strPicD);
                        OBJ_var.blnLock=false;
                    }
                    else{
                        showSay(rsp[1],'divArena');
                        o('btnCloseSay').do=function(){
                            hideG('boxSay');
                            OBJ_var.blnLock=false;
                        }
                    }
                });
            }
        }
        x+=(w+s);if((i+1)%nh==0){x-=(w+s)*nh;y+=(h+s);}
    }
    // SETTING
    var lnkPic=getLocal('pic','00007.txt'); if((typeof lnkPic)!='string') lnkPic='00007.txt';
    var intRank=getLocal('rank',3)*1; if(intRank<1 || intRank>5 || (typeof intRank)!='number') intRank=3; 
    OBJ_var.arrU[0].lnkPic=lnkPic;
    OBJ_var.arrU[0].intRank=intRank;
    putPic();
    putRank(intRank);
    
    ////////////////////
    // END SHOW ////////
    ////////////////////
    var imgLoad=document.getElementsByTagName('img')[0];
    imgLoad.parentNode.removeChild(imgLoad);
    sctRoot.style.display='block';
    OBJ_var.blnLock=false;
    OBJ_var.blnLock=false;
}