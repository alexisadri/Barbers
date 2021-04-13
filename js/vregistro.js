document.addEventListener('DOMContentLoaded', function() {

    validar();


});

function validar() {
    //Valida el nombre del registro en el objeto
    nombreValido();

    //Valida el correo del registro en el objeto
    correoValido();

    //Valida el usuario del registro en el objeto
    usuarioValido();

    //Alamacena la contraseña del usuario del registro en el objeto
    contraseniaValido();

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
    const formulario = document.querySelector('.form-registro');
    formulario.appendChild(alerta);

    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function nombreValido() {
    const nombreInput = document.querySelector('#name');

    nombreInput.addEventListener('input', e => {
        const nombreTexto = e.target.value.trim();
        if (nombreTexto === '') {
            mostrarAlerta('El campo del nombre no debe ir vacío', 'error');
        } else if (nombreTexto.length < 4) {
            mostrarAlerta('El nombre debe tener mas de 4 caracteres', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }

        }

    });
}

function correoValido() {
    const correoInput = document.querySelector('#email');

    correoInput.addEventListener('input', e => {
        const correoTexto = e.target.value.trim();
        const cvalidar = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (correoTexto === '') {
            mostrarAlerta('El  campo del correo no debe ir vacío', 'error');
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

function usuarioValido() {
    const usuarioInput = document.querySelector('#user');
    usuarioInput.addEventListener('input', e => {
        const usuarioTexto = e.target.value.trim();
        if (usuarioTexto === '') {
            mostrarAlerta('El campo de usuario no debe ir vacío', 'error');
        } else if (usuarioTexto.length >= 16) {
            mostrarAlerta('El usuario no contener más de 16 caracteres', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }

        }

    });
}

function contraseniaValido() {
    const contraseniaInput = document.querySelector('#password');
    contraseniaInput.addEventListener('input', e => {
        const contraseniaTexto = e.target.value.trim();
        if (contraseniaTexto === '') {
            mostrarAlerta('La contraseña no debe contener espacios en blanco', 'error');
        } else if (contraseniaTexto.length >= 16 || contraseniaTexto.length <= 8) {
            mostrarAlerta('El contraseña debe ser mayor a 8 y menor a 16 caracteres', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }

        }

    });
}