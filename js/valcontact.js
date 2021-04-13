document.addEventListener('DOMContentLoaded', function() {

    validar();


});

function validar() {
    //Valida el nombre del contacto en el objeto
    nombreValido();

    //Valida el correo del contacto en el objeto
    correoValido();

    //Valida el asunto del contacto en el objeto
    asuntoValido();

    //Valida el mensaje del contacto en el objeto
    mensajeValido();
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
    const formulario = document.querySelector('.formulario-contacto');
    formulario.appendChild(alerta);

    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function nombreValido() {
    const nombreContacto = document.querySelector('#name');

    nombreContacto.addEventListener('input', e => {
        const nombreTexto = e.target.value.trim();
        if (nombreTexto === '') {
            mostrarAlerta('No debe ir vacío', 'error');
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

function asuntoValido() {
    const asuntoContacto = document.querySelector('#asunto');

    asuntoContacto.addEventListener('input', e => {
        const asuntoTexto = e.target.value.trim();
        if (asuntoTexto === '') {
            mostrarAlerta('No debe ir vacío', 'error');
        } else if (asuntoTexto.length < 10) {
            mostrarAlerta('El nombre debe tener mas de 10 caracteres', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }

        }

    });
}

function mensajeValido() {
    const mensajeContacto = document.querySelector('#mensaje');

    mensajeContacto.addEventListener('input', e => {
        const mensajeTexto = e.target.value.trim();
        if (mensajeTexto === '') {
            mostrarAlerta('No debe ir vacío', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }

        }

    });
}