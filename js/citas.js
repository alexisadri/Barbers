let pagina = 1;

const cita = {
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {

    // Consulta los Servicios
    mostrarServicios();

    // Resalta el Div Actual segun el tab al que se presiona
    mostrarSeccion();

    eventListeners();
});

function eventListeners() {

    // Oculta o muestra una sección segun el tab al que se presiona
    cambiarSeccion();

    // Paginacion siguiente y anterior
    paginaSiguiente();
    paginaAnterior();

    // Comprueba la pagina actual para ocultar o mostrar la paginacion
    botonesPaginador();

    // Muestra el resumen de la cita ( o mensaje de error en caso de no pasar la validación )
    mostrarResumen();

    // Almacena el nombre de la cita en el objeto
    nombreCita();

    // Almacena el numero de telefono de la cita en el objeto
    telCita();

    // Almacena la fecha de la cita en el objeto
    fechaCita();


    // Almacena la hora de la cita en el objeto
    horaCita();


}

function mostrarSeccion() {

    // Eliminar mostrar-seccion de la sección anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar-seccion');
    }

    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    // Eliminar la clase de actual en el tab anterior
    const tabAnterior = document.querySelector('.tabs .actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    // Resalta el Tab Actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            // Llamar la función de mostrar sección
            mostrarSeccion();

            botonesPaginador();
        })
    })
}


async function mostrarServicios() {
    try {
        const resultado = await fetch('../servicios.json');
        const db = await resultado.json();

        const { servicios } = db;

        // Generar el HTML
        servicios.forEach(servicio => {
            const { id, nombre, detalle, precio  } = servicio;

            // DOM Scripting
            // Generar nombre de servicio
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');

            //Generar detalle de servicios
            const detalleServicio = document.createElement('P');
            detalleServicio.textContent = detalle;
            detalleServicio.classList.add('detalle-servicio');

            // Generar el precio del servicio
            const precioServicio = document.createElement('P');
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add('precio-servicio');

            // Generar div contenedor de servicio
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicio');
            servicioDiv.dataset.idServicio = id;

            // Selecciona un servicio para la cita
            servicioDiv.onclick = seleccionarServicio;


            // Inyectar precio y nombre al div de servicio
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(detalleServicio);
            servicioDiv.appendChild(precioServicio);

            // Inyectarlo en el HTML
            document.querySelector('#servicios').appendChild(servicioDiv);
        })
    } catch (error) {
        console.log(error);
    }
}


function seleccionarServicio(e) {

    let elemento;
    // Forzar que el  elemento al cual le damos click sea el DIV 
    if (e.target.tagName === 'P') {
        elemento = e.target.parentElement;
    } else {
        elemento = e.target;
    }

    if (elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');

        const id = parseInt(elemento.dataset.idServicio);

        eliminarServicio(id);
    } else {
        elemento.classList.add('seleccionado');

        const servicioObj = {
            id: parseInt(elemento.dataset.idServicio),
            nombre: elemento.firstElementChild.textContent,
            detalle: elemento.firstElementChild.nextElementSibling.textContent,
            precio: elemento.firstElementChild.nextElementSibling.nextElementSibling.textContent
        }

        // console.log(servicioObj);
        agregarServicio(servicioObj);
    }
}

function eliminarServicio(id) {
    const { servicios } = cita;
    cita.servicios = servicios.filter(servicio => servicio.id !== id);

    console.log(cita);
}

function agregarServicio(servicioObj) {
    const {  servicios } = cita;
    cita.servicios = [...servicios, servicioObj];

    console.log(cita);
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', () => {
        pagina++;
        botonesPaginador();
    });
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', () => {
        pagina--;

        botonesPaginador();
    });
}

function botonesPaginador() {
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if (pagina === 1) {
        paginaAnterior.classList.add('ocultar');
    } else if (pagina === 3) {
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');

        mostrarResumen(); // Estamos en la página 3, carga el resumen de la cita
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion(); // Cambia la sección que se muestra por la de la página
}

function mostrarResumen() {
    // Destructuring
    const {  nombre, fecha, hora, servicios } = cita;

    // Seleccionar el resumen
    const resumenDiv = document.querySelector('.contenido-resumen');

    // Limpia el HTML previo
    while (resumenDiv.firstChild) {
        resumenDiv.removeChild(resumenDiv.firstChild);
    }


    // validación de objeto
    if (Object.values(cita).includes('')) {
        const noServicios = document.createElement('P');
        noServicios.textContent = 'Faltan datos de Servicios';

        noServicios.classList.add('invalidar-cita');

        // agregar a resumen Div
        resumenDiv.appendChild(noServicios);

        return;
    }

    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';

    // Mostrar el resumen
    const nombreCita = document.createElement('P');
    nombreCita.innerHTML = `<span>Nombre:</span> ${nombre}`;

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fecha}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`;

    const serviciosCita = document.createElement('DIV');
    serviciosCita.classList.add('resumen-servicios');

    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';

    serviciosCita.appendChild(headingServicios);


    let cantidad = 0;

    // Iterar sobre el arreglo de servicios
    servicios.forEach(servicio => {

        const {  nombre, detalle, precio } = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const textoDetalle = document.createElement('P');
        textoDetalle.textContent = detalle;

        const precioServicio = document.createElement('P');
        precioServicio.textContent = precio;
        precioServicio.classList.add('precio');

        const totalServicio = precio.split('$');

        cantidad += parseInt(totalServicio[1].trim());

        // Colocar texto y precio en el div
        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(textoDetalle);
        contenedorServicio.appendChild(precioServicio);

        serviciosCita.appendChild(contenedorServicio);


    });


    resumenDiv.appendChild(headingCita);
    resumenDiv.appendChild(nombreCita);
    resumenDiv.appendChild(fechaCita);
    resumenDiv.appendChild(horaCita);

    resumenDiv.appendChild(serviciosCita);

    const cantidadPagar = document.createElement('P');
    cantidadPagar.classList.add('total');
    cantidadPagar.innerHTML = `<span>Total a Pagar:  </span> $ ${cantidad}`;


    resumenDiv.appendChild(cantidadPagar);

}

function nombreCita() {
    const nombreInput = document.querySelector('#nombre');

    nombreInput.addEventListener('input', e => {
        const nombreTexto = e.target.value.trim();

        // Validación de que nombreTexto debe tener algo
        if (nombreTexto === '') {
            mostrarAlerta('El campo del nombre no debe ir vacío', 'error');
        } else if (nombreTexto.length < 4) {
            mostrarAlerta('El nombre debe tener mas de 4 caracteres', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
            cita.nombre = nombreTexto;
        }
    });
}

function telCita() {
    const telefonoInput = document.querySelector('#telefono');

    telefonoInput.addEventListener('input', e => {
        const telefonoNumero = e.target.value;

        if (telefonoNumero === '') {
            mostrarAlerta('El campo del número de teléfono no debe ir vacío', 'error');
        } else if (telefonoNumero.length < 10) {
            mostrarAlerta('El número de teléfono debe ser de 10 caracteres', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
            cita.telefono = telefonoNumero;
        }

    });
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
    const formulario = document.querySelector('.formulario');
    formulario.appendChild(alerta);

    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function fechaCita() {
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', e => {

        const dia = new Date(e.target.value).getUTCDay();

        if ([0, 6].includes(dia)) {
            e.preventDefault();
            fechaInput.value = '';
            mostrarAlerta('Fines de Semana no son permitidos', 'error');
        } else {
            cita.fecha = fechaInput.value;

            console.log(cita);
        }
    })
}



function horaCita() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', e => {

        const horaCita = e.target.value;
        const hora = horaCita.split(':');

        if (hora[0] < 10 || hora[0] > 18) {
            mostrarAlerta('Hora no válida', 'error');
            setTimeout(() => {
                inputHora.value = '';
            }, 3000);
        } else {
            cita.hora = horaCita;

            console.log(cita);
        }
    });
}