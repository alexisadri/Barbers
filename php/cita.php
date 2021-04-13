<?php
include 'conexion.php';

$nombre=$_POST["nombre"];
$telefono=$_POST["tel"];
$fecha=$_POST["fecha"];
$hora=$_POST["hora"];

$citaindex = "INSERT INTO cita (nombre_cit,	telefono_cit, fecha_cit, hora_cit)
    VALUES('$nombre','$telefono','$fecha','$hora')";

$res=mysqli_query($conexion, $citaindex);

if (!$res) {
 echo '<script>alert("Error de cita");window.history.go(-1);</script>';
     exit;
}else {
    echo '<script>alert("Cita registrada!");window.history.go(-1);</script>';
    exit;
}

 //cerrar la seccion 
 mysqli_close($conexion);
