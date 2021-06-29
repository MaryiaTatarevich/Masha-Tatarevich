let countriesList = {};

function informInput(){
    let newCountry = prompt ('Введите название страны');
    let addNewCountry = newCountry.toLowerCase();
    let newCapital = prompt ('Введите столицу');
    let addNewCapital = newCapital.toLowerCase();
    if(addNewCountry in countriesList){
        alert ('Введенная страна уже есть')} else{
            countriesList[addNewCountry] = addNewCapital  
        };
};

function informRequest(){
    let inputCountry = prompt ('Введите необходимую страну');
    let neededCountry = inputCountry.toLowerCase();
    if(neededCountry in countriesList){
        alert(`Страна: ${neededCountry}; Столица: ${countriesList[neededCountry]}` )
    } else{
        alert('Нет информации о стране')
    };
};

function allCountries(){
    for (let i in countriesList)
    console.log (`Страна: ${i}; Столица: ${countriesList[i]}`)
}

function deleteInform(){
    let inputCountry = prompt ('Введите страну, которую необходимо удалить');
    let deletedCountry = inputCountry.toLowerCase(); 
    if(deletedCountry in countriesList){
        delete countriesList[deletedCountry]
    }  else{
        alert ('Такой страны нет')
    }
}
