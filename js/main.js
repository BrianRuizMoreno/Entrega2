// Se declara dataList de forma global para poder manipularla en todas las funciones
let dataList = JSON.parse(localStorage.getItem('dataList')) || [];

//Se crea una función para agregar datos a la lista
const addNewData = (data) => {
    if(!validateData(data)){
        return;
    } else {
        dataList.push(data);
        localStorage.setItem('dataList', JSON.stringify(dataList));
        sectionResult.innerHTML = '';
        showData();
        Swal.fire({
            position: "center",
            icon: "success",
            title: `El nombre "${data.name}" de ${data.age} ${data.age > 1 ? 'años' : 'año'} ha sido agregado a la lista.`,
            showConfirmButton: false,
            timer: 2500,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false  
        });
    };
};

//Se crea una función para validar que los datos ingresados no estén vacíos ni repetidos
const validateData = (data) => {
    let isNumber = false;
    for (let i = 0; i < data.name.length; i++) {
        if (!isNaN(data.name[i]) && data.name[i] !== " ") {
            isNumber = true;
            break; 
        }
    };

    data.age = parseInt(data.age, 10);

//Se valida que el usuario haya ingresado un nombre válido
    if (isNumber) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: 'Por favor, ingrese un nombre válido.',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false  
        });
        return false;
    };

//Se valida que el dato ingresado sea un número entre 0 y 120
    if (data.age < 0 || data.age > 120) {  
        Swal.fire({
            position: "center",
            icon: "warning",
            title: 'Por favor, ingrese una edad válida.',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false 
        });
        return false;
    };

//Se valida que los datos no se haya ingresado previamente
    if (dataList.some(el => el.name === data.name && el.age === data.age)) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: `El nombre "${data.name}" de ${data.age} ${data.age > 1 ? 'años' : 'año'} ya se ha ingresado, por favor ingrese otro.`,
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false  
        });
        return false;
    };
    return true;
};


const myFormulary = document.getElementById('formulary');
myFormulary.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const age = e.target[1].value;

    const newData = {
        name,
        age
    };
    
    addNewData(newData);

    e.target[0].value = '';
    e.target[1].value = '';
});


const sectionResult = document.getElementById('section-result');
const sectionButtons = document.getElementById('section-buttons'); 

//Se crea una función para asignar los títulos de la tabla
const tableTitle = () => {
    const table = document.createElement('table');
    table.className = 'table-group';

    const titleRow = document.createElement('tr');

    const titleName = document.createElement('th');
    titleName.innerText = 'Nombre';

    const titleAge = document.createElement('th');
    titleAge.innerText = 'Edad';

    const titleDelete = document.createElement('th');
    titleDelete.innerText = 'Eliminar';

    titleRow.appendChild(titleName);
    titleRow.appendChild(titleAge);
    titleRow.appendChild(titleDelete);
    table.appendChild(titleRow);

    sectionResult.appendChild(table);
};

//Se crea una función para crear la tabla con los datos
const createTable = (data) => {
    const table = document.createElement('table');

    const dataRow = document.createElement('tr');

    const name = document.createElement('td');
    name.innerText = data.name;

    const age = document.createElement('td');
    age.innerText = data.age;

    const deleteButton = document.createElement('td');
    deleteButton.innerText = 'Eliminar';
    deleteButton.className = 'delete-button';
    //Se crea una función para eliminar un dato de la lista al hacer click
    deleteButton.onclick = () => {
        Swal.fire({
            position: "center",
            icon: "question",
            title: `¿Está seguro de eliminar "${data.name}" de ${data.age} ${data.age > 1 ? 'años' : 'año'}?`,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then ((result) => {
            if (result.isConfirmed) {
                const index = dataList.indexOf(data);
                dataList.splice(index, 1);
                localStorage.setItem('dataList', JSON.stringify(dataList));
                sectionResult.innerHTML = '';  
                showData();
            }
        });
    };

    dataRow.appendChild(name);
    dataRow.appendChild(age);
    dataRow.appendChild(deleteButton);
    table.appendChild(dataRow);

    sectionResult.appendChild(table);
};

//Se crea una función para añadir botones
const createButtons = () => {
    if (!document.querySelector('.buttons-group')) {
    const buttons = document.createElement('div');
    buttons.className = 'buttons-group';

    const ascButton = document.createElement('button');
    ascButton.innerText = 'Ordenar Ascendente';
    ascButton.onclick = () => sortDataAsc();

    const descButton = document.createElement('button');
    descButton.innerText = 'Ordenar Descendente';
    descButton.onclick = () => sortDataDesc();

    const sortButton = document.createElement('button');
    sortButton.innerText = 'Sortear';
    sortButton.onclick = () => sortData();

    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reiniciar';
    resetButton.onclick = () => resetData();

    buttons.appendChild(ascButton);
    buttons.appendChild(descButton);
    buttons.appendChild(sortButton);
    buttons.appendChild(resetButton);

    sectionButtons.appendChild(buttons);
};
};

//Se crea una función para resetear el localStorage
const resetData = () => {
    Swal.fire({
        position: "center",
        icon: "question",
        title: '¿Está seguro de reiniciar los datos?',
        heightAuto: false,   
        backdrop: 'static',
        scrollbarPadding: false,      
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
    }).then ((result) => {
        if (result.isConfirmed) {
            dataList.splice(0, dataList.length);
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Lista de datos reiniciada',
                showConfirmButton: false,
                timer: 2000,
                heightAuto: false,   
                backdrop: 'static',
                scrollbarPadding: false  
            });
            localStorage.removeItem('dataList');
            sectionResult.innerHTML = '';
            showData();
        }});
            return dataList;
};

//Se crea una función para mostrar los datos en la tabla
const showData = () => {
    sectionResult.innerHTML = '';
    tableTitle();
    createButtons();
    dataList.forEach(el => {
        createTable(el);
    });
};

//Se crea una función para ordenar los nombres de forma ascendente
const sortDataAsc = () => {
    if(dataList.length === 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: 'No hay nombres para ordenar',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false  
        });
        return;
    } else {
        Swal.fire({
            position: "center",
            icon: "info",
            title: '¿Desea ordenar alfabéticamente o por edades?',
            heightAuto: false,
            backdrop: 'static',
            scrollbarPadding: false,
            showConfirmButton: true,
            confirmButtonText: 'Alfabéticamente',
            showCancelButton: true,
            cancelButtonText: 'Por edades',
        }).then((result) => {
            if (result.isConfirmed) {
                dataList.sort((a, b) => a.name.localeCompare(b.name));
                showData();
                localStorage.removeItem('ordenarAscendente');
            return dataList;
            } else {
                dataList.sort((a, b) => a.age - b.age);
                showData();
            return dataList;
            };
        });
    }
};

//Se crea una función para ordenar los nombres de forma descendente
const sortDataDesc = () => {
    if(dataList.length === 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: 'No hay nombres para ordenar',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false  
        });
        return;
    } else {
        Swal.fire({
            position: "center",
            icon: "info",
            title: '¿Desea ordenar alfabéticamente o por edades?',
            heightAuto: false,
            backdrop: 'static',
            scrollbarPadding: false,
            showConfirmButton: true,
            confirmButtonText: 'Alfabéticamente',
            showCancelButton: true,
            cancelButtonText: 'Por edades',
        }).then((result) => {
            if (result.isConfirmed) {
                dataList.sort((a, b) => b.name.localeCompare(a.name));
                showData();
            return dataList;
            } else {
                dataList.sort((a, b) => b.age - a.age);
                showData();
            return dataList;
            };
        });
    }
};

//Se crea una función para realizar un sorteo
const sortData = () => {
    if (dataList.length === 0) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: 'No hay nombres para sortear',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false  
        })
        return;
    } else {
        const ganador = dataList[Math.floor(Math.random() * dataList.length)];
        Swal.fire({
            position: "center",
            icon: "success",
            title: `El nombre ganador es: ${'\n\n' + ganador.name} de ${ganador.age} ${ganador.age > 1 ? 'años' : 'año'}`,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',      
        });
        startConfetti();
        return ganador;
    }
};

function startConfetti() {
    confetti({
      particleCount: 1500,
      spread: 360,
      origin: { y: .3 },
      colors: ['#fee0be', '#5ff9b1', '#ff8f9b', '#eba1ff'],
    });
  };

//Se inicializa
showData();
