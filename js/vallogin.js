document.addEventListener('DOMContentLoaded', function() {
    validar();
});

function validar() {

    //Valida el usuario del usuario del login en el objeto
    correoValido();
    //Valida la contrasena del usuario del login en el objeto
    contrasenialoginValido();


}

function mostrarAlerta(mensaje, tipo) {

    // Si hay una alerta previa, entonces no crear otra
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        return;
    }

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');

    if (tipo === 'error') {
        alerta.classList.add('error');
    }

    // Insertar en el HTML
    const formulario = document.getElementById('form-login');
    formulario.appendChild(alerta);

    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function correoValido() {
    const correoInput = document.getElementById('email');

    correoInput.addEventListener('input', e => {
        const correoTexto = e.target.value.trim();
        const cvalidar = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (correoTexto === '') {
            mostrarAlerta('No debe ir vacío', 'error');
        } else if (!correoTexto.match(cvalidar)) {
            mostrarAlerta('El  correo no es válido', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }

        }

    });
}

function contrasenialoginValido() {
    const contrasenialoginInput = document.getElementById('pass');
    contrasenialoginInput.addEventListener('input', e => {
        const contrasenialoginTexto = e.target.value.trim();
        if (contrasenialoginTexto === '') {
            mostrarAlerta('No debe ir vacío', 'error');
        } else if (contrasenialoginTexto.length >= 16 || contrasenialoginTexto.length <= 8) {
            mostrarAlerta('El contraseña debe ser mayor a 8 y menor a 16 caracteres', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }

        }

    });
}