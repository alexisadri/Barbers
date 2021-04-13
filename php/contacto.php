<?php
include 'conexion.php';

$nombre = $_POST["name"];
$email = $_POST["correo"];
$asunto = $_POST["asun"];
$mensaje = $_POST["mess"];

    //consulta SQL
    $mensaje = "INSERT INTO contacto(nombre_con, email_con, asunto_con, mensaje_con) 
    VALUES('$nombre','$email','$asunto','$mensaje')";

        //VALIDACIONES   
        if (strlen($asunto)<5) { 
            echo '<script>
            alert("El asunto debe tener al menos 5 caracteres");
            window.history.go(-1);
            </script>';
            exit;
        }else if (strlen($mensaje)<5) { 
            echo '<script>
            alert("El mensaje debe tener al menos 5 caracteres");
            window.history.go(-1);
            </script>';
            exit;
        }
    //Ejecución de la consulta insertar
    $res=mysqli_query($conexion, $mensaje);

        if (!$res) {
            echo '<script>
            alert("Error! El mensaje no fue enviado");
            window.history.go(-1);
        </script>';
        } else {
            echo '<script>
            alert("Mensaje enviado con exito");
            window.history.go(-1);
        </script>';
        }

//cerrar la seccion 
mysqli_close($conexion);


