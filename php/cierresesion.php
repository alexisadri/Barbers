<?php

    include 'conexion.php';
    session_start();
    $varsesion = $_SESSION['user'];
    $user = $_POST["user1"];
    

    if($varsesion == null || $varsesion=""){    
    echo 'usted no tiene autorizacion';
    die(); 
    }
    
    
    
    $resultado = mysqli_query($conexion, "SELECT MAX(id_ses) AS 'id' from sesion ");
    $fila = mysqli_fetch_assoc($resultado);
    $fila['id'];
    $i = $fila['id'];
    
    echo $i;
                
    session_start();
    session_destroy();
    //consulta sql insertar
    
    
    $update ="UPDATE sesion SET finsesion_ses = (now()) WHERE id_ses = '$i' ";
    
    
    //EJECUCION DE LA CONSULTA 
    
    $res=mysqli_query($conexion,$update );
    if (!$res) {
    echo 'Error en el Mensaje';
    }else{
        echo '<script>
                window.history.go(-1);
                alert("mensaje con exito");
            
              </script>';
    
    header("location:../sesion.html");
    }
    
    
    
    //cerramos la seccion
    mysqli_close($conexion);