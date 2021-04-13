<?php
include 'conexion.php';

$nombre=$_POST["nombre"];
$email=$_POST["correo"];
$usuario=$_POST["usuario"];
$password=$_POST["pass"];
//Encriptar la constraseña
$salt = 'Contrasena1';
$password= crypt($password,$salt);

$insertar = "INSERT INTO usuario (nombre_usu, email_usu, usuario_usu, token_usu, contrasena_usu) 
  VALUES('$nombre','$email','$usuario',' ','$password')";
   
  //VALIDACIONES
  //correo
  $validar_usuario=mysqli_query($conexion, "SELECT * FROM usuario WHERE usuario_usu='$usuario'");
  $validar_email=mysqli_query($conexion, "SELECT * FROM usuario WHERE email_usu='$email'");


if(mysqli_num_rows($validar_usuario)>0 ){ //validación de usuario si está disponible o no 
    echo '<script>alert("El usuario ya está disponible, ingresa otro por favor");window.history.go(-1);</script>';
    exit;
}
if(mysqli_num_rows($validar_email)>0){ //validación de email si está disponible o no
    echo '<script>alert("El correo ya está disponible, ingresa otro por favor");window.history.go(-1);</script>';
    exit;
}
if($email===$usuario){ 
    echo '<script>alert("El correo no debe ser igual al usuario");window.history.go(-1);</script>';
}
if($usuario === $password){
    echo '<script>alert("La contraseña no debe ser igual al usuario");window.history.go(-1);</script>';
}
if (!preg_match('`[a-z]`',$password)){//contraseña letra minúscula
    echo '<script>alert("La contraseña debe tener al menos una letra minúscula");window.history.go(-1);</script>';

} if (!preg_match('`[A-Z]`',$password)){//contraseña letra mayúscula
    echo '<script>alert("La contraseña debe tener al menos una letra mayúscula");window.history.go(-1);</script>';
    
}else if (!preg_match('`[0-9]`',$password)){//contraseña con un número al menos
    echo '<script>alert("La contraseña debe tener almenos un número");window.history.go(-1);</script>';
    exit;
}

$res=mysqli_query($conexion, $insertar);

if (!$res) {
 echo '<script>alert("Error de registro");window.history.go(-1);</script>';
     exit;
}else {
    echo '<script>alert("Usuario registrado, Ingrese con su cuenta");window.location= "sesion.html";</script>';
    exit;
}

 //cerrar la seccion 
 mysqli_close($conexion);
