<?php

include 'conexion.php';
//comienzo de sesión
session_start();
$usuario=$_POST["user"];
$password=$_POST["pass"];
 
    //Encriptar la contraseña con una variable para poder ingresar
    $salt = 'Contrasena1';//Cadena opcional para tomar como referencia el encriptamiento
    $password= crypt($password,$salt);

     $datos = "INSERT INTO sesion(usuario_ses, ultimafech_ses) VALUES ( '$usuario', now())";
    //Validaciones de usuario y contraseña
    $validar_user=mysqli_query($conexion,"SELECT * FROM usuario
    WHERE usuario_usu='$usuario' AND contrasenia_usu='$password'");  

    if (!mysqli_num_rows($validar_user)) {
        echo '<script>alert("La contraseña o el Password son incorrectos");window.history.go(-1);</script>';    
        exit;
    } else {
    $_SESSION["user"] = $usuario;
        header("location:cpanel.php");
    }

 $res = mysqli_query($conexion,$datos);
    if (!$res) {
        echo '<script> alert("Error!"); </script>';
     }

//cerrar la seccion 
mysqli_close($conexion);



