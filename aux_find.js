function getFind(){
  // 0
  OBJ_host.shuffle_bullet_w='1',OBJ_host.shuffle_bullet_b='1',OBJ_host.shuffle_bullet_wb='1';
  OBJ_host.shuffle_blitz_w='1',OBJ_host.shuffle_blitz_b='1',OBJ_host.shuffle_blitz_wb='1';
  OBJ_host.shuffle_rapid_w='1',OBJ_host.shuffle_rapid_b='1',OBJ_host.shuffle_rapid_wb='1';
  // 9
  OBJ_host.classic_bullet_w='1',OBJ_host.classic_bullet_b='1',OBJ_host.classic_bullet_wb='1';
  OBJ_host.classic_blitz_w='1',OBJ_host.classic_blitz_b='1',OBJ_host.classic_blitz_wb='1';
  OBJ_host.classic_rapid_w='1',OBJ_host.classic_rapid_b='1',OBJ_host.classic_rapid_wb='1';
  // 18
  OBJ_host.end_bullet_w='1',OBJ_host.end_bullet_b='1',OBJ_host.end_bullet_wb='1';
  OBJ_host.end_blitz_w='1',OBJ_host.end_blitz_b='1',OBJ_host.end_blitz_wb='1';
  OBJ_host.end_rapid_w='1',OBJ_host.end_rapid_b='1',OBJ_host.end_rapid_wb='1';
  // 27
  OBJ_host.queens_bullet_w='1',OBJ_host.queens_bullet_b='1',OBJ_host.queens_bullet_wb='1';
  OBJ_host.queens_blitz_w='1',OBJ_host.queens_blitz_b='1',OBJ_host.queens_blitz_wb='1';
  OBJ_host.queens_rapid_w='1',OBJ_host.queens_rapid_b='1',OBJ_host.queens_rapid_wb='1';
  // 36
  OBJ_host.revolt_bullet_w='1',OBJ_host.revolt_bullet_b='1',OBJ_host.revolt_bullet_wb='1';
  OBJ_host.revolt_blitz_w='1',OBJ_host.revolt_blitz_b='1',OBJ_host.revolt_blitz_wb='1';
  OBJ_host.revolt_rapid_w='1',OBJ_host.revolt_rapid_b='1',OBJ_host.revolt_rapid_wb='1';
  // 45
  OBJ_host.pawns_bullet_w='1',OBJ_host.pawns_bullet_b='1',OBJ_host.pawns_bullet_wb='1';
  OBJ_host.pawns_blitz_w='1',OBJ_host.pawns_blitz_b='1',OBJ_host.pawns_blitz_wb='1';
  OBJ_host.pawns_rapid_w='1',OBJ_host.pawns_rapid_b='1',OBJ_host.pawns_rapid_wb='1';
  // 54
  OBJ_host.random_bullet_w='1',OBJ_host.random_bullet_b='1',OBJ_host.random_bullet_wb='1';
  OBJ_host.random_blitz_w='1',OBJ_host.random_blitz_b='1',OBJ_host.random_blitz_wb='1';
  OBJ_host.random_rapid_w='1',OBJ_host.random_rapid_b='1',OBJ_host.random_rapid_wb='1';
  // 63
  OBJ_host.horde_bullet_w='1',OBJ_host.horde_bullet_b='1',OBJ_host.horde_bullet_wb='1';
  OBJ_host.horde_blitz_w='1',OBJ_host.horde_blitz_b='1',OBJ_host.horde_blitz_wb='1';
  OBJ_host.horde_rapid_w='1',OBJ_host.horde_rapid_b='1',OBJ_host.horde_rapid_wb='1';
  // 72
  OBJ_host.wedge_bullet_w='1',OBJ_host.wedge_bullet_b='1',OBJ_host.wedge_bullet_wb='1';
  OBJ_host.wedge_blitz_w='1',OBJ_host.wedge_blitz_b='1',OBJ_host.wedge_blitz_wb='1';
  OBJ_host.wedge_rapid_w='1',OBJ_host.wedge_rapid_b='1',OBJ_host.wedge_rapid_wb='1';
}
function asmFind(){
  var str=OBJ_host.shuffle_bullet_w+OBJ_host.shuffle_bullet_b+OBJ_host.shuffle_bullet_wb;
  str+=OBJ_host.shuffle_blitz_w+OBJ_host.shuffle_blitz_b+OBJ_host.shuffle_blitz_wb;
  str+=OBJ_host.shuffle_rapid_w+OBJ_host.shuffle_rapid_b+OBJ_host.shuffle_rapid_wb;
  str+=OBJ_host.classic_bullet_w+OBJ_host.classic_bullet_b+OBJ_host.classic_bullet_wb;
  str+=OBJ_host.classic_blitz_w+OBJ_host.classic_blitz_b+OBJ_host.classic_blitz_wb;
  str+=OBJ_host.classic_rapid_w+OBJ_host.classic_rapid_b+OBJ_host.classic_rapid_wb;
  str+=OBJ_host.end_bullet_w+OBJ_host.end_bullet_b+OBJ_host.end_bullet_wb;
  str+=OBJ_host.end_blitz_w+OBJ_host.end_blitz_b+OBJ_host.end_blitz_wb;
  str+=OBJ_host.end_rapid_w+OBJ_host.end_rapid_b+OBJ_host.end_rapid_wb;
  str+=OBJ_host.queens_bullet_w+OBJ_host.queens_bullet_b+OBJ_host.queens_bullet_wb;
  str+=OBJ_host.queens_blitz_w+OBJ_host.queens_blitz_b+OBJ_host.queens_blitz_wb;
  str+=OBJ_host.queens_rapid_w+OBJ_host.queens_rapid_b+OBJ_host.queens_rapid_wb;
  str+=OBJ_host.revolt_bullet_w+OBJ_host.revolt_bullet_b+OBJ_host.revolt_bullet_wb;
  str+=OBJ_host.revolt_blitz_w+OBJ_host.revolt_blitz_b+OBJ_host.revolt_blitz_wb;
  str+=OBJ_host.revolt_rapid_w+OBJ_host.revolt_rapid_b+OBJ_host.revolt_rapid_wb;
  str+=OBJ_host.pawns_bullet_w+OBJ_host.pawns_bullet_b+OBJ_host.pawns_bullet_wb;
  str+=OBJ_host.pawns_blitz_w+OBJ_host.pawns_blitz_b+OBJ_host.pawns_blitz_wb;
  str+=OBJ_host.pawns_rapid_w+OBJ_host.pawns_rapid_b+OBJ_host.pawns_rapid_wb;
  str+=OBJ_host.random_bullet_w+OBJ_host.random_bullet_b+OBJ_host.random_bullet_wb;
  str+=OBJ_host.random_blitz_w+OBJ_host.random_blitz_b+OBJ_host.random_blitz_wb;
  str+=OBJ_host.random_rapid_w+OBJ_host.random_rapid_b+OBJ_host.random_rapid_wb;
  str+=OBJ_host.horde_bullet_w+OBJ_host.horde_bullet_b+OBJ_host.horde_bullet_wb;
  str+=OBJ_host.horde_blitz_w+OBJ_host.horde_blitz_b+OBJ_host.horde_blitz_wb;
  str+=OBJ_host.horde_rapid_w+OBJ_host.horde_rapid_b+OBJ_host.horde_rapid_wb;
  str+=OBJ_host.wedge_bullet_w+OBJ_host.wedge_bullet_b+OBJ_host.wedge_bullet_wb;
  str+=OBJ_host.wedge_blitz_w+OBJ_host.wedge_blitz_b+OBJ_host.wedge_blitz_wb;
  str+=OBJ_host.wedge_rapid_w+OBJ_host.wedge_rapid_b+OBJ_host.wedge_rapid_wb;
  return str;
}
function setFind(){
  var intTime=OBJ_arena.intBase+OBJ_arena.intAdd*40;
  if(OBJ_arena.intVar==0 && OBJ_arena.strSide=='white' && intTime<=3*60) OBJ_host.numFind=0;
  else if(OBJ_arena.intVar==0 && OBJ_arena.strSide=='black' && intTime<=3*60) OBJ_host.numFind=1;
  else if(OBJ_arena.intVar==0 && OBJ_arena.strSide=='any' && intTime<=3*60) OBJ_host.numFind=2;
  else if(OBJ_arena.intVar==0 && OBJ_arena.strSide=='white' && intTime<=10*60) OBJ_host.numFind=3;
  else if(OBJ_arena.intVar==0 && OBJ_arena.strSide=='black' && intTime<=10*60) OBJ_host.numFind=4;
  else if(OBJ_arena.intVar==0 && OBJ_arena.strSide=='any' && intTime<=10*60) OBJ_host.numFind=5;
  else if(OBJ_arena.intVar==0 && OBJ_arena.strSide=='white' && intTime<=30*60) OBJ_host.numFind=6;
  else if(OBJ_arena.intVar==0 && OBJ_arena.strSide=='black' && intTime<=30*60) OBJ_host.numFind=7;
  else if(OBJ_arena.intVar==0 && OBJ_arena.strSide=='any' && intTime<=30*60) OBJ_host.numFind=8;
  else if(OBJ_arena.intVar==1 && OBJ_arena.strSide=='white' && intTime<=3*60) OBJ_host.numFind=9;
  else if(OBJ_arena.intVar==1 && OBJ_arena.strSide=='black' && intTime<=3*60) OBJ_host.numFind=10;
  else if(OBJ_arena.intVar==1 && OBJ_arena.strSide=='any' && intTime<=3*60) OBJ_host.numFind=11;
  else if(OBJ_arena.intVar==1 && OBJ_arena.strSide=='white' && intTime<=10*60) OBJ_host.numFind=12;
  else if(OBJ_arena.intVar==1 && OBJ_arena.strSide=='black' && intTime<=10*60) OBJ_host.numFind=13;
  else if(OBJ_arena.intVar==1 && OBJ_arena.strSide=='any' && intTime<=10*60) OBJ_host.numFind=14;
  else if(OBJ_arena.intVar==1 && OBJ_arena.strSide=='white' && intTime<=30*60) OBJ_host.numFind=15;
  else if(OBJ_arena.intVar==1 && OBJ_arena.strSide=='black' && intTime<=30*60) OBJ_host.numFind=16;
  else if(OBJ_arena.intVar==1 && OBJ_arena.strSide=='any' && intTime<=30*60) OBJ_host.numFind=17;
  else if(OBJ_arena.intVar==2 && OBJ_arena.strSide=='white' && intTime<=3*60) OBJ_host.numFind=18;
  else if(OBJ_arena.intVar==2 && OBJ_arena.strSide=='black' && intTime<=3*60) OBJ_host.numFind=19;
  else if(OBJ_arena.intVar==2 && OBJ_arena.strSide=='any' && intTime<=3*60) OBJ_host.numFind=20;
  else if(OBJ_arena.intVar==2 && OBJ_arena.strSide=='white' && intTime<=10*60) OBJ_host.numFind=21;
  else if(OBJ_arena.intVar==2 && OBJ_arena.strSide=='black' && intTime<=10*60) OBJ_host.numFind=22;
  else if(OBJ_arena.intVar==2 && OBJ_arena.strSide=='any' && intTime<=10*60) OBJ_host.numFind=23;
  else if(OBJ_arena.intVar==2 && OBJ_arena.strSide=='white' && intTime<=30*60) OBJ_host.numFind=24;
  else if(OBJ_arena.intVar==2 && OBJ_arena.strSide=='black' && intTime<=30*60) OBJ_host.numFind=25;
  else if(OBJ_arena.intVar==2 && OBJ_arena.strSide=='any' && intTime<=30*60) OBJ_host.numFind=26;
  else if(OBJ_arena.intVar==3 && OBJ_arena.strSide=='white' && intTime<=3*60) OBJ_host.numFind=27;
  else if(OBJ_arena.intVar==3 && OBJ_arena.strSide=='black' && intTime<=3*60) OBJ_host.numFind=28;
  else if(OBJ_arena.intVar==3 && OBJ_arena.strSide=='any' && intTime<=3*60) OBJ_host.numFind=29;
  else if(OBJ_arena.intVar==3 && OBJ_arena.strSide=='white' && intTime<=10*60) OBJ_host.numFind=30;
  else if(OBJ_arena.intVar==3 && OBJ_arena.strSide=='black' && intTime<=10*60) OBJ_host.numFind=31;
  else if(OBJ_arena.intVar==3 && OBJ_arena.strSide=='any' && intTime<=10*60) OBJ_host.numFind=32;
  else if(OBJ_arena.intVar==3 && OBJ_arena.strSide=='white' && intTime<=30*60) OBJ_host.numFind=33;
  else if(OBJ_arena.intVar==3 && OBJ_arena.strSide=='black' && intTime<=30*60) OBJ_host.numFind=34;
  else if(OBJ_arena.intVar==3 && OBJ_arena.strSide=='any' && intTime<=30*60) OBJ_host.numFind=35;
  else if(OBJ_arena.intVar==4 && OBJ_arena.strSide=='white' && intTime<=3*60) OBJ_host.numFind=36;
  else if(OBJ_arena.intVar==4 && OBJ_arena.strSide=='black' && intTime<=3*60) OBJ_host.numFind=37;
  else if(OBJ_arena.intVar==4 && OBJ_arena.strSide=='any' && intTime<=3*60) OBJ_host.numFind=38;
  else if(OBJ_arena.intVar==4 && OBJ_arena.strSide=='white' && intTime<=10*60) OBJ_host.numFind=39;
  else if(OBJ_arena.intVar==4 && OBJ_arena.strSide=='black' && intTime<=10*60) OBJ_host.numFind=40;
  else if(OBJ_arena.intVar==4 && OBJ_arena.strSide=='any' && intTime<=10*60) OBJ_host.numFind=41;
  else if(OBJ_arena.intVar==4 && OBJ_arena.strSide=='white' && intTime<=30*60) OBJ_host.numFind=42;
  else if(OBJ_arena.intVar==4 && OBJ_arena.strSide=='black' && intTime<=30*60) OBJ_host.numFind=43;
  else if(OBJ_arena.intVar==4 && OBJ_arena.strSide=='any' && intTime<=30*60) OBJ_host.numFind=44;
  else if(OBJ_arena.intVar==5 && OBJ_arena.strSide=='white' && intTime<=3*60) OBJ_host.numFind=45;
  else if(OBJ_arena.intVar==5 && OBJ_arena.strSide=='black' && intTime<=3*60) OBJ_host.numFind=46;
  else if(OBJ_arena.intVar==5 && OBJ_arena.strSide=='any' && intTime<=3*60) OBJ_host.numFind=47;
  else if(OBJ_arena.intVar==5 && OBJ_arena.strSide=='white' && intTime<=10*60) OBJ_host.numFind=48;
  else if(OBJ_arena.intVar==5 && OBJ_arena.strSide=='black' && intTime<=10*60) OBJ_host.numFind=49;
  else if(OBJ_arena.intVar==5 && OBJ_arena.strSide=='any' && intTime<=10*60) OBJ_host.numFind=50;
  else if(OBJ_arena.intVar==5 && OBJ_arena.strSide=='white' && intTime<=30*60) OBJ_host.numFind=51;
  else if(OBJ_arena.intVar==5 && OBJ_arena.strSide=='black' && intTime<=30*60) OBJ_host.numFind=52;
  else if(OBJ_arena.intVar==5 && OBJ_arena.strSide=='any' && intTime<=30*60) OBJ_host.numFind=53;
  else if(OBJ_arena.intVar==6 && OBJ_arena.strSide=='white' && intTime<=3*60) OBJ_host.numFind=54;
  else if(OBJ_arena.intVar==6 && OBJ_arena.strSide=='black' && intTime<=3*60) OBJ_host.numFind=55;
  else if(OBJ_arena.intVar==6 && OBJ_arena.strSide=='any' && intTime<=3*60) OBJ_host.numFind=56;
  else if(OBJ_arena.intVar==6 && OBJ_arena.strSide=='white' && intTime<=10*60) OBJ_host.numFind=57;
  else if(OBJ_arena.intVar==6 && OBJ_arena.strSide=='black' && intTime<=10*60) OBJ_host.numFind=58;
  else if(OBJ_arena.intVar==6 && OBJ_arena.strSide=='any' && intTime<=10*60) OBJ_host.numFind=59;
  else if(OBJ_arena.intVar==6 && OBJ_arena.strSide=='white' && intTime<=30*60) OBJ_host.numFind=60;
  else if(OBJ_arena.intVar==6 && OBJ_arena.strSide=='black' && intTime<=30*60) OBJ_host.numFind=61;
  else if(OBJ_arena.intVar==6 && OBJ_arena.strSide=='any' && intTime<=30*60) OBJ_host.numFind=62;
  else if(OBJ_arena.intVar==7 && OBJ_arena.strSide=='white' && intTime<=3*60) OBJ_host.numFind=63;
  else if(OBJ_arena.intVar==7 && OBJ_arena.strSide=='black' && intTime<=3*60) OBJ_host.numFind=64;
  else if(OBJ_arena.intVar==7 && OBJ_arena.strSide=='any' && intTime<=3*60) OBJ_host.numFind=65;
  else if(OBJ_arena.intVar==7 && OBJ_arena.strSide=='white' && intTime<=10*60) OBJ_host.numFind=66;
  else if(OBJ_arena.intVar==7 && OBJ_arena.strSide=='black' && intTime<=10*60) OBJ_host.numFind=67;
  else if(OBJ_arena.intVar==7 && OBJ_arena.strSide=='any' && intTime<=10*60) OBJ_host.numFind=68;
  else if(OBJ_arena.intVar==7 && OBJ_arena.strSide=='white' && intTime<=30*60) OBJ_host.numFind=69;
  else if(OBJ_arena.intVar==7 && OBJ_arena.strSide=='black' && intTime<=30*60) OBJ_host.numFind=70;
  else if(OBJ_arena.intVar==7 && OBJ_arena.strSide=='any' && intTime<=30*60) OBJ_host.numFind=71;
  else if(OBJ_arena.intVar==8 && OBJ_arena.strSide=='white' && intTime<=3*60) OBJ_host.numFind=72;
  else if(OBJ_arena.intVar==8 && OBJ_arena.strSide=='black' && intTime<=3*60) OBJ_host.numFind=73;
  else if(OBJ_arena.intVar==8 && OBJ_arena.strSide=='any' && intTime<=3*60) OBJ_host.numFind=74;
  else if(OBJ_arena.intVar==8 && OBJ_arena.strSide=='white' && intTime<=10*60) OBJ_host.numFind=75;
  else if(OBJ_arena.intVar==8 && OBJ_arena.strSide=='black' && intTime<=10*60) OBJ_host.numFind=76;
  else if(OBJ_arena.intVar==8 && OBJ_arena.strSide=='any' && intTime<=10*60) OBJ_host.numFind=77;
  else if(OBJ_arena.intVar==8 && OBJ_arena.strSide=='white' && intTime<=30*60) OBJ_host.numFind=78;
  else if(OBJ_arena.intVar==8 && OBJ_arena.strSide=='black' && intTime<=30*60) OBJ_host.numFind=79;
  else if(OBJ_arena.intVar==8 && OBJ_arena.strSide=='any' && intTime<=30*60) OBJ_host.numFind=80;
}
