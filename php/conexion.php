<?php

$conexion = mysqli_connect("localhost","root","","appbarbers");

if (!$conexion) {
    echo '<script>alert("Error de Conexión");window.history.go(-1);</script>';
}




