<!DOCTYPE html>
<html>
<head>
<title>VarChess</title>
<script>
function init(){
    var svg=document.getElementsByTagName('svg')[0];
    var img=new Image();
    img.src=svg.getElementsByTagName('image')[0].getAttribute('xlink:href');
    
        var cnv=document.getElementsByTagName('canvas')[0];
        var ctx=cnv.getContext('2d');
        ctx.drawImage(img,0,0);
    
}
</script>
</head>
<body onload='init();'>
<svg style='border:1px solid blue;'>
    <image x='0' y='0' width='100' height='100' xlink:href='uimg.png' />
</svg>
<canvas style='border:1px solid green;'>
    
</canvas>

</body>
</html>