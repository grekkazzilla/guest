<?php
session_start();
//
session_destroy();
//
if(isset($_COOKIE['name'])) setcookie('name','',0,'/');
if(isset($_COOKIE['pass'])) setcookie('pass','',0,'/');
//
header('Location:index.php');
?>
