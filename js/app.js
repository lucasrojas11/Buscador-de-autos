//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Container for results 
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 12;

//Generate an object with the search 
const dataSearch = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}


//Events
document.addEventListener("DOMContentLoaded",() => {
    showCars(cars); //show cars when loading data

    //fill in the years options
    fillSelect()
});

//Event listeners for search select   
marca.addEventListener('change', e => {
    dataSearch.marca = e.target.value;

    filterCars(); 
});

year.addEventListener('change', e => {
    dataSearch.year = parseInt(e.target.value);

    filterCars(); 
});

minimo.addEventListener('change', e => {
    dataSearch.minimo = e.target.value;

    filterCars();
});

maximo.addEventListener('change', e => {
    dataSearch.maximo = e.target.value;

    filterCars();
});

puertas.addEventListener('change', e => {
    dataSearch.puertas = parseInt(e.target.value);

    filterCars();
});

transmision.addEventListener('change', e => {
    dataSearch.transmision = e.target.value;

    filterCars();
});

color.addEventListener('change', e => {
    dataSearch.color = e.target.value;

    filterCars();
    console.log(dataSearch);
});




//Functions 
const showCars = (cars) => {

    cleanHTML(); //remove old HTML

    cars.forEach( car => {
        const {marca, modelo, year, puertas, transmision, precio, color} = car;
        const carHTML = document.createElement('p');
        
        carHTML.textContent = `
        ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transaction: ${transmision} - Precio: ${precio} - ${color} 
        `;
        
        //Insert at the HTML
        resultado.appendChild(carHTML);
    }) 
}

//Clean HTML 
const cleanHTML = () => {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//generates the years of the select 
const fillSelect = () => {

    for (let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option); //add the year option to the select
    }
}

//function that filters based on the search
const filterCars = () => {
    const result = cars.filter( filterBrand ).filter(filterYear).filter(filterMin).filter(filterMax).filter(filterPuertas).filter(filterTransmition).filter(filterColor)

    //console.log(result);
    
    if(result.length) {
        showCars(result);
    }else{
        noResults();
    }
}

const noResults = () => {

    cleanHTML();

    const noResult = document.createElement('div');
    noResult.classList.add('alerta', 'error');
    noResult.textContent = 'No hay Resultados, por favor realiza otra busqueda';
    resultado.appendChild(noResult);
}

const filterBrand = (car) => {
    const { marca } = dataSearch;
    if(marca){
        return car.marca === marca;
    }
    return car;
}

const filterYear = (car) => {
    const { year } = dataSearch;
    if(year){
        return car.year === year;
    }
    return car;
}

const filterMin = (car) => {
    const {minimo} = dataSearch;
    if(minimo){
        return car.precio >= minimo;
    }
    return car; 
}

const filterMax = (car) => {
    const {maximo} = dataSearch;
    if(maximo){
        return car.precio <= maximo;
    }
    return car; 
}

const filterPuertas = (car) => {
    const { puertas } = dataSearch;
    if(puertas){
        return car.puertas === puertas;
    }
    return car;
}

const filterTransmition = (car) => {
    const { transmision } = dataSearch;
    if(transmision){
        return car.transmision === transmision;
    }
    return car;
}

const filterColor = (car) => {
    const { color} = dataSearch;
    if(color){
        return car.color === color;
    }
    return car;
}