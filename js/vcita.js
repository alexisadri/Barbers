function habilitarindex() {
    nombre = document.getElementById("nombre").nodeValue;
    telefono = document.getElementById("telefono").nodeValue;
    fecha = document.getElementById("fecha").nodeValue;
    hora = document.getElementById("hora").nodeValue;


    val = 0;

    if (nombre == "") {
        val++;
    }
    if (telefono == "") {
        val++;
    }
    if (fecha == "") {
        val++;
    }
    if (hora == "") {
        val++;
    }
    if (val == 0) {
        document.getElementById("btn").disabled = false;
    } else {
        document.getElementById("btn").disabled = true;

    }
}

document.getElementById("nombre").addEventListener("keyup", habilitarindex);
document.getElementById("telefono").addEventListener("keyup", habilitarindex);
document.getElementById("fecha").addEventListener("keyup", habilitarindex);
document.getElementById("hora").addEventListener("keyup", habilitarindex);
document.getElementById("btn").addEventListener("click", () => {
    alert("Formulario lleno");
});