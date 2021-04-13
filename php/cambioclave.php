<?php
    if (isset($_GET['usuario']) AND isset($_GET['token'])) {
        require "conexion.php";

        $user = $conexion->real_escape_string($_GET['usuario']);
        $token = $conexion->real_escape_string($_GET['token']);
        $sql = $conexion->query("SELECT token_usu FROM usuario WHERE usuario_usu='$user'");
        $row = $sql->fetch_array();

        if ($row['token_usu'] == $token) {
            
            if (isset($_POST['codigo'])) {
                require "conexion.php";

                $password = $conexion->real_escape_string($_POST['password']);
                $salt = 'Contrasena1';
                $password= crypt($password,$salt);

                $act = $conexion->query("UPDATE usuario SET contrasenia_usu='$password',token_usu='' WHERE usuario_usu='$user'");

                if($act){
                    echo '<script>alert("Su contraseña se ha cambiado, ya puede ingresar a su cuenta");window.location= "iniciosesion.html";</script>';
                }
            }

        }else{
        echo '<script>alert("No se ha econtrado ninguna información");window.location= "index.html";</script>';
        }
    } 
