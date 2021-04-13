<?php
session_start();
error_reporting(0);
   
    $varsesion = $_SESSION['user'];

        if ($varsesion == null || $varsesion = '') {
            echo '<script>
                    alert("Por favor, Ingresa tu usuario y contraseña");
                    window.location= "../sesion.html";
                    die();
                 </script>';
        }
    
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BarberShop | Corte al estilo original</title>
    <script src="https://kit.fontawesome.com/461910131c.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet">
    <link rel="icon" href="../img/barber.png">
    <link rel="stylesheet" href="../css/normalize.css">
    <link rel="stylesheet" href="../css/cpanel.css">
    <link rel="stylesheet" href="../css/paginacion.css">
    <link rel="stylesheet" href="../css/resumen.css">
    <link rel="stylesheet" href="../css/servicios.css">
    <link rel="stylesheet" href="../css/tabs.css">
    <link rel="stylesheet" href="../css/cpanelFormulario.css">
    <link rel="stylesheet" href="../css/barbers.css">
</head>

<body>
    <div class="contenedor-estetica">

        <div class="imagen"></div>
        <div class="app">
        <div class="cerrar-sesion">
            <a href="cierresesion.php">Cerrar Sesión</a>
        </div>
            <nav class="tabs">
                <button type="button" data-paso="1">Servicios</button>
                <button type="button" data-paso="2">Información del Cliente</button>
                <button type="button" data-paso="3">Resumen</button>
            </nav>

            <!-- Inicia contenido app -->
            <div id="paso-1" class="seccion">
                <div class="barbers-tittle">
                    <i class="fas fa-cut"></i>
                    <h2>Servicios</h2>
                </div>
                <p class="text-center">Elije tus Servicios a Continuación</p>
                <div id="servicios" class="listado-servicios"></div>
            </div>
            <div id="paso-2" class="seccion">
                <div class="barbers-tittle">
                    <i class="fas fa-cut"></i>
                    <h2>Información</h2>
                </div>
                <p class="text-center">Coloca tus datos y fecha de cita.</p>

                <form action="cita.php" method="POST" onsubmit="return citaformulario();" class="formulario">
                    <fieldset class="field">
                        <legend>Información Personal</legend>
                        <div class="campo">
                            <label for="nombre">Nombre:</label>
                            <input type="text" id="nombre" required placeholder="Tu Nombre" name="nombre">
                        </div>
                        <div class="campo">
                            <label for="telefono">Teléfono:</label>
                            <input type="tel" id="telefono" required placeholder="Tu Teléfono" name="tel">
                        </div>
                    </fieldset>
                    <fieldset class="field">
                        <legend>Información de cita</legend>

                        <div class="campo">
                            <label for="fecha">Fecha:</label>
                            <input type="date" min="2021-01-31" required id="fecha" name="fecha">
                        </div>
                        <div class="campo">
                            <label for="hora">Hora:</label>
                            <input type="time" id="hora" required name="hora">
                        </div>
                    </fieldset>
                    <button type="submit" >Enviar Datos</button>
                </form>
                    
            </div>
            <div id="paso-3" class="seccion contenido-resumen">
                <h2>Resumen de Cita</h2>
            </div>
            <div class="paginacion">
                <button id="anterior">&laquo; Anterior</button>
                <button id="siguiente">Siguiente &raquo;</button>
            </div>
        </div>
    </div>
    <script src="../js/vcita.js"></script>
    <script src="../js/citas.js"></script>
    <script src="../js/captura.js"></script>
</body>

</html>