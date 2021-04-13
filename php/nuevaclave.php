<?php
        if (isset($_POST['codigo'])) {
            require "conexion.php";
            $email = $conexion->real_escape_string($_POST['correo']);
            $sql = $conexion->query("SELECT usuario_usu,nombre_usu,email_usu FROM usuario WHERE email_usu='$email'");
            $row = $sql->fetch_array();
            $count = $sql->num_rows;
            if ($count ==1) {
                $token = uniqid();
                $act = $conexion->query("UPDATE usuario SET token_usu='$token' WHERE email_usu='$email'");
                //Enviar el correo electronico
                $email_para = $email;
                $email_asunto= "Restablecer contraseña";
                $email_de= "BarberShop.com";
                $email_mensaje= "Hola ".$row['nombre_usu'].
                ", se solicito el restablecimiento de contraseña para tu cuenta. 
                haz clic en el siguiente link para cambiar tu contraseña.                     
                http://localhost/App/php/cambioclave.php?usuario=".$row['usuario_usu']."&token=".$token ."
                Si tu no realizaste ninguna solicitud de cambio de contraseña, solo ignora este mensaje.";
            
                mail($email_para, $email_asunto, $email_de, $email_mensaje);
                echo '<script>alert("Solicitud enviada con éxito");window.location= "../index.html";</script>';
            }else{
                echo '<script>alert("Este correo no está registrado, Intentalo de nuevo");window.history.go(-1);</script>';
            }
        }
    