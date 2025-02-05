const listaNombres = [];

const agregarNombres = () => {
    const nombre = prompt('Ingrese un nombre en mayúsculas:');

    if (nombre === null) {
        alert('No ha ingresado ningún nombre.');
        return;
    }

    if (nombre === "") {
        alert('Por favor, ingrese un nombre válido.');
        return agregarNombres();
    } else {
        nombre.toUpperCase();
        if (listaNombres.includes(nombre)) {
            alert('El nombre ya se ha ingresado, por favor ingrese otro.');
            return agregarOtroNombre();
        }
        listaNombres.push(nombre);
        agregarOtroNombre();        
    }
}
const agregarOtroNombre = () =>{
    const continuar = prompt('¿Desea agregar otro nombre?').toLowerCase();
        if (continuar === 'no') {
            return;
        } else if (continuar === 'si') {
            agregarNombres();
        } else {
            alert('Opción inválida, ingrese "si" o "no".');
            return agregarOtroNombre();
        }
}
const ordenarAscendente = () => {
    if (listaNombres.length === 0) {
        alert('No hay nombres para ordenar');
        return;
    } else {
        listaNombres.sort();
        alert(`La lista de nombres ordenada de forma ascendente es: ${'\n\n' + listaNombres.join('\n')}`);
        return listaNombres;
    }
};

const ordenarDescendente = () => {
    if (listaNombres.length === 0) {
        alert('No hay nombres para ordenar.');
        return;
    } else {
        listaNombres.sort().reverse();
        alert(`La lista de nombres ordenada de forma descendente es: ${'\n\n' + listaNombres.join('\n')}`);
        return listaNombres;
    }
};

const sorteo = () => {
    if (listaNombres.length === 0) {
        alert('No hay nombres para sortear.');
        return;
    } else {
        const indiceGanador = Math.floor(Math.random() * listaNombres.length);
        const nombreGanador = listaNombres[indiceGanador];
        alert(`El nombre ganador es: ${'\n\n' + nombreGanador}`);
        return nombreGanador;
    }
};

const opcionesMenu = () => {
    let opcionUsuario;
    do {
    opcionUsuario = parseInt(prompt(`¿Qué desea hacer con los nombres? \n
        1 - Ordenar ascendentemente. \n
        2 - Ordenar descendentemente. \n
        3 - Realizar un sorteo. \n
        4 - Agregar otro nombre. \n\n
        0 - Salir.`));

    switch (opcionUsuario) {
        case 0:
            alert('¡Gracias por utilizar el programa!');
            break;
        case 1:
            ordenarAscendente();
            break;
        case 2:
            ordenarDescendente();
            break;
        case 3:
            sorteo();
            break;
        case 4:
            agregarNombres();
            break;
        default:
            alert(`Opción inválida, ingrese un número correcto.`);
            opcionesMenu();
            break;
     } 
    } while (opcionUsuario !==0)
}

agregarNombres();
opcionesMenu();