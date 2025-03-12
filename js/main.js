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
            position: "top-end",
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

//Se valida que el usuario haya ingresado un nombre válido y la edad este entre 0 y 120
    if (isNumber || data.age < 0 || data.age > 120) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: 'Datos inválidos. Por favor, intente nuevamente.',
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
    //Se crea un objeto con los datos ingresados
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
    //Se crean y se añaden los títulos a la tabla
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
        //Se pregunta si esta seguro de eliminar el dato
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
    //Se añaden los datos a la tabla
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

    const orderButton = document.createElement('button');
    orderButton.innerText = 'Ordenar';
    orderButton.onclick = () => orderData(true);

    const sortButton = document.createElement('button');
    sortButton.innerText = 'Sortear';
    sortButton.onclick = () => sortData();

    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reiniciar';
    resetButton.onclick = () => resetData();
    //Se añaden los botones al HTML
    buttons.appendChild(orderButton);
    buttons.appendChild(sortButton);
    buttons.appendChild(resetButton);

    sectionButtons.appendChild(buttons);
    };
};

//Se crea una función para resetear el localStorage
const resetData = () => {

    if(errors(dataList)) return;

    //Se pregunta si esta seguro de reiniciar los datos
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
            //Se crea un temporizador para que se reinicien los datos
            Swal.fire({
                position: "center",
                title: 'Reiniciando...', 
                showConfirmButton: false,
            });

            setTimeout (() => {
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
            },2000)
            
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

//Se crea una función para mostrar cuando haya errores
const errors = (dataList) => {
    //Se valida que haya datos en la lista
    if(!dataList || dataList.length === 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: 'No hay datos ingresados',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false  
        });
        return true;
    //Se valida que haya más de un dato en la lista
    } else if (!dataList || dataList.length === 1) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: 'Se necesita más de un dato para realizar esta acción',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,   
            backdrop: 'static',
            scrollbarPadding: false  
        });
        return true;
    };
    return false;
};

//Se crea una función para ordenar los datos
const orderData = (order) => {
    //Se valida que haya datos en la lista
    if(errors(dataList)) return;

     if (order) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: '¿Cómo desea ordenar los datos?',
                input: 'select',
                inputOptions: {
                    'ascAlf': 'Alfabéticamente de A a Z',
                    'descAlf': 'Alfabéticamente de Z a A',
                    'ascEd': 'Por edades de menor a mayor',
                    'descEd': 'Por edades de mayor a menor',
                },
                inputPlaceholder: "Selecciona una opción",
                heightAuto: false,
                backdrop: 'static',
                scrollbarPadding: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
            }).then((result) => {
                //Se ordena la lista de datos alfabéticamente
                    if (result.isConfirmed) {
                        switch (result.value) {
                            case 'ascAlf':
                                //Se ordena de forma alfabeticamente ascendente
                                dataList.sort((a, b) => a.name.localeCompare(b.name));
                                break;
                            case 'descAlf':
                                //Se ordena de forma alfabeticamente descendente
                                dataList.sort((a, b) => b.name.localeCompare(a.name));
                                break;
                            case 'ascEd':
                                //Se ordena de forma numericamente ascendente
                                dataList.sort((a, b) => a.age - b.age);
                                break;
                            case 'descEd':
                                //Se ordena de forma numericamente descendente
                                dataList.sort((a, b) => b.age - a.age);
                                break;
                            default:
                                Swal.fire('No seleccionaste ninguna opción')
                                break;
                        };

                    showData();

                    };
                });
            };
    };
        
//Se crea una función para realizar un sorteo
const sortData = () => {
    if(errors(dataList)) return;

    const winner = dataList[Math.floor(Math.random() * dataList.length)];
        
    //Crea una cuenta atrás para mostrar el nombre del ganador
    let count = 3;
        
    const countdown = setInterval(() => {
        Swal.fire({
            position: "center",
            title: `El nombre ganador se dará en ${count} segundos...`,
            showConfirmButton: false,
        });
        count--;
        if (count === -1) {
            clearInterval(countdown)
            Swal.fire({
                position: "center",
                icon: "success",
                title: `El ganador es: <br> 🎉​🎊​"${winner.name}" de ${winner.age} ${winner.age > 1 ? 'años' : 'año'}🎊🎉​​`,
                heightAuto: false,   
                backdrop: 'static',
                scrollbarPadding: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',      
            });
            startConfetti();
            return winner;
        };
        }, 1000);
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

