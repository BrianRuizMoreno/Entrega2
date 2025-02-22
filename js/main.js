// Se declara listaNombres de forma global para poder manipularla en todas las funciones
let listaNombres = JSON.parse(localStorage.getItem('listaNombres')) || [];

//Se crea una función para agregar nombres a la lista
const agregarNombres = () => {
    
    let nombre = prompt('Ingrese un nombre:');

    if (nombre === null) {
        opcionesMenu();
        return;
    }
    //Se valida que el dato ingresado no sea un número
    let esNumerico = false;
    for (let i = 0; i < nombre.length; i++) {
        if (!isNaN(nombre[i]) && nombre[i] !== " ") {
            esNumerico = true;
            break; 
        }
    }
    //Se valida que el usuario haya ingresado un nombre válido
    if (nombre === "" || esNumerico) {
        alert('Por favor, ingrese un nombre válido.');
        return agregarNombres();
    } else {
        //Se valida que el nombre no se haya ingresado previamente
        if (listaNombres.some(el => el.nombre === nombre)) {
            alert(`El nombre "${nombre}" ya se ha ingresado, por favor ingrese otro.`);
            return agregarOtroNombre();
        }

        let edad = ingresarEdad();
        //Se agrega el nombre a la lista
        listaNombres.push({nombre, edad});
        //Se guarda la lista en el localStorage
        localStorage.setItem('listaNombres', JSON.stringify(listaNombres));
        alert(`El nombre "${nombre}" de "${edad} ${edad > 1 ? 'años' : 'año'}" ha sido agregado a la lista.`);
        agregarOtroNombre();        
    }
}
//Se crea una función para ingresar la edad
const ingresarEdad = () => {

    let edad = parseInt(prompt('Ingrese la edad del nombre ingresado:'));
    //Se valida que el dato ingresado sea un número
    if (!edad || isNaN(edad) || edad <= 0 || edad >= 110){
        alert('Por favor, ingrese una edad válida.');
        return ingresarEdad();
    }

    return edad;
}

//Se pregunta al usuario si desea agregar otro nombre
const agregarOtroNombre = () =>{
        if (confirm('¿Desea agregar otro nombre?')) {
            agregarNombres();} else{
            opcionesMenu();
            }
}

//Se crea una función para ordenar los nombres de forma ascendente
const ordenarAscendente = () => {
    if (JSON.parse(localStorage.getItem('ordenarAscendente')) === 1) {
        if (listaNombres.length === 0) {
            alert('No hay nombres para ordenar');
            return;
        } else {
            listaNombres.sort((a, b) => a.nombre.localeCompare(b.nombre));
            alert(`Lista ordenada alfabéticamente de forma 
                ascendentemente:\n\n${listaNombres.map(el => el.nombre).join('\n')}`);
                localStorage.removeItem('ordenarAscendente');
            return listaNombres;
        }
    } else {
        listaNombres.sort((a, b) => a.edad - b.edad);
            alert(`Lista ordenada por edades de forma 
                ascendentemente:\n\n${listaNombres.map(el => el.edad).join('\n')}`);
                localStorage.removeItem('ordenarAscendente');
            return listaNombres;
    }
};

//Se crea una función para ordenar los nombres de forma descendente
const ordenarDescendente = () => {
    if (JSON.parse(localStorage.getItem('ordenarDescendente')) === 1) {
        if (listaNombres.length === 0) {
            alert('No hay nombres para ordenar');
            return;
        } else {
            listaNombres.sort((a, b) => b.nombre.localeCompare(a.nombre));
            alert(`Lista ordenada alfabéticamente de forma 
                descendentemente:\n\n${listaNombres.map(el => el.nombre).join('\n')}`);
                localStorage.removeItem('ordenarDescendente');
            return listaNombres;
        }
    } else {
        listaNombres.sort((a, b) => b.edad - a.edad);
            alert(`Lista ordenada por edades de forma 
                descendentemente:\n\n${listaNombres.map(el => el.edad).join('\n')}`);
                localStorage.removeItem('ordenarDescendente');
            return listaNombres;
    }
};

//Se crea una función para realizar un sorteo
const sorteo = () => {
    if (listaNombres.length === 0) {
        alert('No hay nombres para sortear.');
        return;
    } else {
        const ganador = listaNombres[Math.floor(Math.random() * listaNombres.length)];
        alert(`El nombre ganador es: ${'\n\n' + ganador.nombre} de ${ganador.edad} ${ganador.edad > 1 ? 'años' : 'año'}`);
        return ganador;
    }
};

//Se crea una función para reiniciar la lista de nombres
const reiniciar = () => {
    listaNombres.splice(0, listaNombres.length);
    localStorage.removeItem('listaNombres');
    alert('La lista de nombres ha sido reiniciada.');
    return listaNombres;
}
//Se crea una función para mostrar las opciones del menú
const opcionesMenu = () => {
    let opcionUsuario;
    let opcionMenu;
    let opcionOrdenar;
    do {
    opcionUsuario = parseInt(prompt(`¿Qué desea hacer con los nombres? \n
        1 - Ordenar ascendentemente. \n
        2 - Ordenar descendentemente. \n
        3 - Realizar un sorteo. \n
        4 - Agregar otro nombre. \n
        5 - Reiniciar la lista de nombres. \n
        0 - Salir.`));

    switch (opcionUsuario) {
        case 0:
            alert('¡Gracias por utilizar el programa!');
            return;
        case 1:
            opcionMenu = parseInt(prompt(`¿Por nombres o por edades? \n
                1 - Por nombres. \n
                2 - Por edades.\n\n 
                0 - Volver al menú principal.`));
                switch (opcionMenu) {
                    case 0:
                        opcionesMenu();
                        break;
                    case 1:
                        opcionOrdenar = 1;
                        localStorage.setItem('ordenarAscendente', JSON.stringify(opcionOrdenar));
                        ordenarAscendente();
                        break;
                    case 2:
                        opcionOrdenar = 2;
                        localStorage.setItem('ordenarAscendente', JSON.stringify(opcionOrdenar));
                        ordenarAscendente();
                        break;
                    default:
                        alert('Opción inválida. Por favor, vuelva a intentarlo.');
                        break;
                }
            break;
        case 2:
            opcionMenu = parseInt(prompt(`¿Por nombres o por edades? \n
                1 - Por nombres. \n
                2 - Por edades.\n\n 
                0 - Volver al menú principal.`));
                switch (opcionMenu) {
                    case 0:
                        opcionesMenu();
                        break;
                    case 1:
                        opcionOrdenar = 1;
                        localStorage.setItem('ordenarDescendente', JSON.stringify(opcionOrdenar));
                        ordenarDescendente();
                        break;
                    case 2:
                        opcionOrdenar = 2;
                        localStorage.setItem('ordenarDescendente', JSON.stringify(opcionOrdenar));
                        ordenarDescendente();
                        break;
                    default:
                        alert('Opción inválida. Por favor, vuelva a intentarlo.');
                        break;
                }
            break;
        case 3:
            sorteo();
            break;
        case 4:
            agregarNombres();
            break;
        case 5:
            reiniciar();
            break;
        default:
            alert(`Opción inválida, ingrese un número correcto.`);
            opcionesMenu();
            break;
     } 
    } 
    while (opcionUsuario !== 0);
    return;
}
//Se inicia el programa
agregarNombres();
