let timer
let gameSituation = true
let colorsArray = ['red', 'darkgreen', 'orange', 'aqua', 'yellow', 'purple', 'blue', 'ghostwhite', 'hotpink'];
//создаем массив с будуими машинками
let allCarsArray = [];
//номер машинки 
let carNumber
//начальные координаты каждой машинки posX = 7; posY = 12
let posXStart = 7;
let posYStart = 12;
let windowWidth
let startPixel
let createNewCar = true
let startNewCar
let reversingCells
let myScore = 0;
let myLives = 5;
let updatePassword
let topCoordinate
let topcarCoordinate
//ф-ция для прочтения информации
function findInfo() {
    $.ajax(
        {
            url: ajaxHandlerScript, type: 'POST', dataType: 'json',
            data: { f: 'READ', n: myName },
            success: readInfo, error: errorHandler
        });

}
function readInfo(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
    else if (callresult.result != "") {
        result = JSON.parse(callresult.result);
        result.sort(compareScore)
        for (let i = 0; i < result.length; i++) {
            if (result[i].score < myScore) {
                let value = result[i]
                getNewRecord(value)
                return
            }
        }
    }
}
//ф-ция получение информации, подготовка к перезаписи
function storeInfo() {
    updatePassword = Math.random();
    $.ajax({
        url: ajaxHandlerScript, type: 'POST', dataType: 'json',
        data: { f: 'LOCKGET', n: myName, p: updatePassword },
        success: lockGetReady, error: errorHandler
    }
    );
}
//ф-ции перезаписи 
function lockGetReady(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
    else {
        // нам всё равно, что было прочитано -
        // всё равно перезаписываем
        $.ajax({
            url: ajaxHandlerScript, type: 'POST', dataType: 'json',
            data: { f: 'UPDATE', n: myName, v: JSON.stringify(result), p: updatePassword },
            success: updateReady, error: errorHandler
        }
        );
    }
}
function updateReady(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
}
//Функция выбоа рандомного числа 
function randomDiap(n, m) {
    return Math.floor(
        Math.random() * (m - n + 1)
    ) + n;
}
//сортирует от меньшего к большему
function compareScore(a, b) {
    return a.score - b.score
}
//Загрузка страницы игры
function gamePageLoading() {
    //получаем текущие размеры окна браузера
    windowWidth = window.innerWidth;
    //обнуляем результаты 
    myScore = 0;
    myLives = 5;

    console.log(windowWidth)

    let findGame = document.getElementById('allGame');
    if (!findGame) {
        creationGameArea()
    } else {
        findGame.remove()
        creationGameArea()
    }
    if (timer) {
        clearInterval(timer)
        move()
    } else {
        move()
    }
}
//функция создания области игры 
function creationGameArea() {
    let allGame = document.createElement('div');
    allGame.setAttribute('id', 'allGame');
    allGame.setAttribute('class', 'allGame');
    let menu = document.createElement('div');
    menu.setAttribute('class', 'menu');
    let score = document.createElement('span');
    let lives = document.createElement('span');
    let textScore = document.createTextNode(`Score:${myScore}`);
    let textLives = document.createTextNode(`Lives:${myLives}`);
    lives.setAttribute('id', 'lives');
    score.setAttribute('id', 'score');
    lives.appendChild(textLives);
    score.appendChild(textScore);
    menu.appendChild(lives);
    menu.appendChild(score);
    let pause = document.createElement('button');
    let textPause = document.createTextNode('Pause');
    let back = document.createElement('button');
    let textBack = document.createTextNode('Menu');
    let newGame = document.createElement('button');
    let textnewGame = document.createTextNode('New Game');
    pause.appendChild(textPause);
    back.appendChild(textBack);
    newGame.appendChild(textnewGame);
    back.addEventListener('click', switchToMainPage)
    pause.addEventListener('click', stopGame)
    newGame.addEventListener('click', gamePageLoading)
    pause.setAttribute('id', 'pause');
    menu.appendChild(pause);
    menu.appendChild(newGame);
    menu.appendChild(back);
    document.body.appendChild(allGame);
    //создаем поле
    let field = document.createElement('div');
    allGame.appendChild(field).setAttribute('class', 'field');
    allGame.appendChild(menu);
    //разбиваем поле на ячейки
    for (let i = 0; i < 169; i++) {
        let pixel = document.createElement('div');
        field.appendChild(pixel).setAttribute('class', 'pixel')
    }
    //присваиваем координаты каждой ячейке
    let pixel = document.getElementsByClassName('pixel');
    let x = 1;
    let y = 1;
    for (let i = 0; i < 169; i++) {
        if (x > 13) {
            x = 1;
            y++;
        }
        pixel[i].setAttribute('posX', x);
        pixel[i].setAttribute('posY', y);
        x++
    }
    //создаем массив с дополнительными классами window.innerWidth
    let array = [
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'i', 'i', 'i', 'i', 'i', '4', 'i', 'i', 'i', 'i', 'i', 'b'],
        ['b', 'i', 'i', 'i', 'i', 'i', 'v', 'i', 'i', 'i', 'i', 'i', 'b'],
        ['b', '5', 'l', 'l', 'l', 'l', 'c', 'r', 'r', 'r', 'r', '3', 'b'],
        ['b', 'i', 'i', 'i', 'i', 'i', 'v', 'i', 'i', 'i', 'i', 'i', 'b'],
        ['b', '6', 'l', 'l', 'l', 'l', 'c', 'r', 'r', 'r', 'r', '2', 'b'],
        ['b', 'i', 'i', 'i', 'i', 'i', 'v', 'i', 'i', 'i', 'i', 'i', 'b'],
        ['b', '7', 'l', 'l', 'l', 'l', 'c', 'r', 'r', 'r', 'r', '1', 'b'],
        ['b', 'i', 'i', 'i', 'i', 'i', 'v', 'i', 'i', 'i', 'i', 'i', 'b'],
        ['b', '8', 'l', 'l', 'l', 'l', 'c', 'r', 'r', 'r', 'r', '0', 'b'],
        ['b', 'i', 'i', 'i', 'i', 'i', 'v', 'i', 'i', 'i', 'i', 'i', 'b'],
        ['b', 'i', 'i', 'i', 'i', 'i', 'v', 'i', 'i', 'i', 'i', 'i', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']
    ]
    let regexpRight = /[0-3]/;//диапозон от 0-3
    let regexpVertical = /[4]/;// 4
    let regexpLeft = /[5-8]/;//диапозон от 5-8
    for (let i = 0; i < array.length; i++) {
        for (let k = 0; k < array[i].length; k++) {
            if (array[i][k] === 'v') {
                let vertically = [document.querySelector(`[posX='${k + 1}'][posY='${i + 1}']`)];
                vertically[0].classList.add('vertically');
            } else if (array[i][k] === 'b') {
                let border = [document.querySelector(`[posX='${k + 1}'][posY='${i + 1}']`)];
                border[0].classList.add('border')
            } else if (array[i][k] === 'r') {
                let horizontallyRight = [document.querySelector(`[posX='${k + 1}'][posY='${i + 1}']`)];
                horizontallyRight[0].classList.add('horizontallyRight');
            }
            else if (array[i][k] === 'l') {
                let horizontallyLeft = [document.querySelector(`[posX='${k + 1}'][posY='${i + 1}']`)];
                horizontallyLeft[0].classList.add('horizontallyLeft');
            } else if (array[i][k] === 'c') {
                let changeDirection = [document.querySelector(`[posX='${k + 1}'][posY='${i + 1}']`)];
                changeDirection[0].classList.add('vertically');
                changeDirection[0].classList.add('changeDirection');
            } else if (regexpRight.test(array[i][k])) {
                let garage = [document.querySelector(`[posX='${k + 1}'][posY='${i + 1}']`)];
                garage[0].classList.add('rightGarage');
                garage[0].style.background = 'none'
                garage[0].style.backgroundColor = `${colorsArray[array[i][k]]}`
            }
            else if (regexpVertical.test(array[i][k])) {
                let garage = [document.querySelector(`[posX='${k + 1}'][posY='${i + 1}']`)];
                garage[0].classList.add('verticalGarage');
                garage[0].style.background = 'none'
                garage[0].style.backgroundColor = `${colorsArray[array[i][k]]}`
            }
            else if (regexpLeft.test(array[i][k])) {
                let garage = [document.querySelector(`[posX='${k + 1}'][posY='${i + 1}']`)];
                garage[0].classList.add('leftGarage');
                garage[0].style.background = 'none'
                garage[0].style.backgroundColor = `${colorsArray[array[i][k]]}`
            }
        }
    }
}
//ф-ция создания машинки 
function createCar(carNumber) {
    //находим стартовую ячейку 
    startPixel = [document.querySelector(`[posX= '${posXStart}'][posY= '${posYStart}']`)];
    startPixel[0].classList.add('startPixel');
    topCoordinate = startPixel[0].getBoundingClientRect().height / 2;
    let car = document.createElement('div')
    let colorNumber = randomDiap(0, 8)
    car.setAttribute('id', carNumber)
    startPixel[0].appendChild(car).setAttribute('class', 'car');
    topcarCoordinate = topCoordinate - car.getBoundingClientRect().height / 2;
    allCarsArray.push(carNumber)
    let myCar = document.getElementById(carNumber)
    myCar.style.backgroundColor = `${colorsArray[colorNumber]}`
    myCar.style.top = topCoordinate + 'px'
    myCar.style.left = topcarCoordinate + 'px'
    startPixel[0].setAttribute('id', `currentPixel${carNumber}`)
}
//Ф-ция вызова движения машинок и создания новых; 
function game() {
    let findGame = document.getElementById('allGame')
    if (findGame) {
        for (let i = 0; i < allCarsArray.length; i++) {
            let currentCellsExistence = document.getElementById(`currentPixel${i}`)
            if (currentCellsExistence)
                carMove(i)
        }

        if (startNewCar < 100) {
            startNewCar++

        } else if (startNewCar === 100 && createNewCar) {
            carNumber++
            createCar(carNumber)
            startNewCar = 0
        }
    } else return
}
//ф-ция  координаты Y для каждой машинки
function coordinateY(carNumber) {
    let currentCar = document.getElementById(carNumber).style.top;
    let currentCoordinates = parseFloat(currentCar)
    let resultCoordinates = currentCoordinates - 1
    return resultCoordinates
}
//ф-ция  координаты X для каждой машинки
function coordinateXRight(carNumber) {
    let currentCar = document.getElementById(carNumber).style.left;
    let currentCoordinates = parseFloat(currentCar)
    let resultCoordinates = currentCoordinates + 1
    return resultCoordinates
}
function coordinateXLeft(carNumber) {
    let currentCar = document.getElementById(carNumber).style.left;
    let currentCoordinates = parseFloat(currentCar)
    let resultCoordinates = currentCoordinates - 1
    return resultCoordinates
}

//присвоение текущего статуса клетки каждой машинке
function startPixelY(carNumber) {
    let currentCar = document.getElementById(carNumber);
    let firstPixel = document.getElementsByClassName('startPixel')
    let outdatedPosY = firstPixel[0].getAttribute('posY')
    outdatedPosY--
    return outdatedPosY
}

function noChangeCellY(carNumber) {
    let currentCar = document.getElementById(carNumber);
    let currentPixel = document.getElementById(`currentPixel${carNumber}`);
    let noChangePosY = currentPixel.getAttribute('posY')
    return noChangePosY
}
function noChangeCellX(carNumber) {
    let currentCar = document.getElementById(carNumber);
    let currentPixel = document.getElementById(`currentPixel${carNumber}`);
    let noChangePosX = currentPixel.getAttribute('posX')
    return noChangePosX
}

function currentPixelY(carNumber) {
    let currentCar = document.getElementById(carNumber);
    let currentPixel = document.getElementById(`currentPixel${carNumber}`);
    let outdatedPosY = currentPixel.getAttribute('posY')
    outdatedPosY--
    return outdatedPosY
}
function currentPixelXright(carNumber) {
    let currentCar = document.getElementById(carNumber);
    let currentPixel = document.getElementById(`currentPixel${carNumber}`);
    let outdatedPosX = currentPixel.getAttribute('posX')
    outdatedPosX++
    return outdatedPosX
}
function currentPixelXleft(carNumber) {
    let currentCar = document.getElementById(carNumber);
    let currentPixel = document.getElementById(`currentPixel${carNumber}`);
    let outdatedPosX = currentPixel.getAttribute('posX')
    outdatedPosX--
    return outdatedPosX
}

//Функция движения машинки 
function carMove(carNumber) {
    let currentCar = document.getElementById(carNumber); //Достаем необходимую машинку
    let topPosYCar = currentCar.getBoundingClientRect().top;
    let topPosYPixelStart = startPixel[0].getBoundingClientRect().top;
    let resultYStart = topPosYCar - topPosYPixelStart
    let currentPixel = document.getElementById(`currentPixel${carNumber}`)
    let topPosYPixel
    let topPosXrightPixel
    let topPosXleftPixel
    if (currentPixel) {
        topPosYPixel = currentPixel.getBoundingClientRect().top;
        topPosXrightPixel = currentPixel.getBoundingClientRect().right;
        topPosXleftPixel = currentPixel.getBoundingClientRect().left;
    }
    let resultY = topPosYCar - topPosYPixel
    let topPosXrightCar = currentCar.getBoundingClientRect().right;
    let resultXright = topPosXrightPixel - topPosXrightCar
    let topPosXleftCar = currentCar.getBoundingClientRect().left;
    let resultXleft = topPosXleftCar - topPosXleftPixel

    if (resultY > 0 && currentPixel.classList.contains('vertically')) {
        currentCar.style.top = coordinateY(carNumber) + 'px'
    } else if (resultY <= 0 && currentPixel.classList.contains('vertically')) {
        let newCell = currentPixelY(carNumber)
        let noChangeCell = noChangeCellX(carNumber);
        //удаляем текущий id с устаревшей ячейки
        currentPixel.removeAttribute("id");
        //присваиваем id клетке, которая выше 
        let newPixel = [document.querySelector(`[posX='${noChangeCell}'][posY='${newCell}']`)];
        newPixel[0].setAttribute('id', `currentPixel${carNumber}`);
    }
    else if (resultY <= 0 && currentPixel.classList.contains('verticalGarage')) {
        let newCell = currentPixelY(carNumber)
        let noChangeCell = noChangeCellX(carNumber);
        //удаляем текущий id с устаревшей ячейки
        currentPixel.removeAttribute("id");
        //присваиваем id клетке, которая выше 
        let newPixel = [document.querySelector(`[posX='${noChangeCell}'][posY='${newCell}']`)];
        newPixel[0].setAttribute('id', `currentPixel${carNumber}`);
    }
    else if (resultY > topcarCoordinate && currentPixel.classList.contains('verticalGarage')) {
        currentCar.style.top = coordinateY(carNumber) + 'px'
    } else if (resultY <= topcarCoordinate && currentPixel.classList.contains('verticalGarage')) {
        deleteCar(carNumber)
    }

    if (resultXright > 0 && currentPixel.classList.contains('right')) {
        if (resultY > topcarCoordinate) {
            currentCar.style.top = coordinateY(carNumber) + 'px'

        } else (currentCar.style.left = coordinateXRight(carNumber) + 'px');

    } else if (resultXright <= 0 && currentPixel.classList.contains('right')) {
        let newCell = currentPixelXright(carNumber);
        let noChangeCell = noChangeCellY(carNumber);
        //удаляем текущий id с устаревшей ячейки
        currentPixel.removeAttribute("id");
        //присваиваем текущий класс клетке, которая правее 
        newPixel = [document.querySelector(`[posX='${newCell}'][posY='${noChangeCell}']`)];

        newPixel[0].setAttribute('id', `currentPixel${carNumber}`);
    }

    if (resultXright > 0 && currentPixel.classList.contains('horizontallyRight')) {
        currentCar.style.left = coordinateXRight(carNumber) + 'px'
    } else if (resultXright <= 0 && currentPixel.classList.contains('horizontallyRight')) {
        let newCell = currentPixelXright(carNumber);
        let noChangeCell = noChangeCellY(carNumber);
        //удаляем текущий id с устаревшей ячейки
        currentPixel.removeAttribute("id");
        //присваиваем текущий класс клетке, которая правее 
        newPixel = [document.querySelector(`[posX='${newCell}'][posY='${noChangeCell}']`)];
        newPixel[0].setAttribute('id', `currentPixel${carNumber}`);
    } else if (resultXright <= 0 && currentPixel.classList.contains('rightGarage')) {
        let newCell = currentPixelXright(carNumber);
        let noChangeCell = noChangeCellY(carNumber);
        //удаляем текущий id с устаревшей ячейки
        currentPixel.removeAttribute("id");
        //присваиваем текущий класс клетке, которая правее 
        newPixel = [document.querySelector(`[posX='${newCell}'][posY='${noChangeCell}']`)];
        newPixel[0].setAttribute('id', `currentPixel${carNumber}`);
    }

    if (resultXright > topcarCoordinate && currentPixel.classList.contains('rightGarage')) {
        currentCar.style.left = coordinateXRight(carNumber) + 'px'
    } else if (resultXright <= topcarCoordinate && currentPixel.classList.contains('rightGarage')) {
        deleteCar(carNumber)
    }
    if (resultXleft > 0 && currentPixel.classList.contains('left')) {
        if (resultY > topcarCoordinate) {
            currentCar.style.top = coordinateY(carNumber) + 'px'
        } else (currentCar.style.left = coordinateXLeft(carNumber) + 'px')

    } else if (resultXleft <= 0 && currentPixel.classList.contains('left')) {
        let newCell = currentPixelXleft(carNumber);
        let noChangeCell = noChangeCellY(carNumber);
        //удаляем текущий класс с устаревшей ячейки
        currentPixel.removeAttribute("id");
        //присваиваем текущий класс клетке, которая левее 
        let newPixel = [document.querySelector(`[posX='${newCell}'][posY='${noChangeCell}']`)];
        newPixel[0].setAttribute('id', `currentPixel${carNumber}`);
    }

    if (resultXleft > 0 && currentPixel.classList.contains('horizontallyLeft')) {
        currentCar.style.left = coordinateXLeft(carNumber) + 'px'
    } else if (resultXleft <= 0 && currentPixel.classList.contains('horizontallyLeft')) {
        let newCell = currentPixelXleft(carNumber);
        let noChangeCell = noChangeCellY(carNumber);
        //удаляем текущий класс с устаревшей ячейки
        currentPixel.removeAttribute("id");
        //присваиваем текущий класс клетке, которая левее 
        let newPixel = [document.querySelector(`[posX='${newCell}'][posY='${noChangeCell}']`)];
        newPixel[0].setAttribute('id', `currentPixel${carNumber}`);
    } else if (resultXleft <= 0 && currentPixel.classList.contains('leftGarage')) {
        let newCell = currentPixelXleft(carNumber);
        let noChangeCell = noChangeCellY(carNumber);
        //удаляем текущий класс с устаревшей ячейки
        currentPixel.removeAttribute("id");
        //присваиваем текущий класс клетке, которая левее 
        let newPixel = [document.querySelector(`[posX='${newCell}'][posY='${noChangeCell}']`)];
        newPixel[0].setAttribute('id', `currentPixel${carNumber}`);
    } if (resultXright < topcarCoordinate && currentPixel.classList.contains('leftGarage')) {
        currentCar.style.left = coordinateXLeft(carNumber) + 'px'
    } else if (resultXright >= topcarCoordinate && currentPixel.classList.contains('leftGarage')) {
        deleteCar(carNumber)
    }
}
//Функция остановки игры (кнопка паузы)
function stopGame() {
    if (gameSituation) {
        clearInterval(timer)
        gameSituation = false

        let pause = document.getElementById('pause');
        pause.innerHTML = 'Continue'

    } else if (myLives !== 0) {
        if (timer) {
            clearInterval(timer)
        }
        timer = setInterval(game, 40)
        gameSituation = true
        pause.innerHTML = 'Pause'
    }
}
//Функция удаления машинки если она добралась до последней ячейки 
function deleteCar(carNumber) {
    let currentCar = document.getElementById(carNumber);
    let currentCarColor = currentCar.style.backgroundColor;
    let currentPixel = document.getElementById(`currentPixel${carNumber}`);
    let currentPixelColor = currentPixel.style.backgroundColor;
    // let startCell = document.getElementsByClassName('startPixel')
    if (currentCarColor === currentPixelColor) {
        let score = document.getElementById('score');
        myScore += 1;
        score.innerHTML = `Score:${myScore}`;

    } else {
        let lives = document.getElementById('lives');
        myLives -= 1;
        lives.innerHTML = `Lives:${myLives}`;
        currentPixel.style.animation = '0.5s shake';
        currentPixel.addEventListener('animationend', function () {
            currentPixel.style.removeProperty('animation');
        });
        window.navigator.vibrate(500);
        if (myLives === 0) {
            clearInterval(timer);
            findInfo();
        }
    }
    currentCar.remove()
    currentPixel.removeAttribute("id");
}
function move() {
    //номер первой машинки 0
    carNumber = 0;
    createCar(carNumber);

    timer = setInterval(game, 40);

    startNewCar = 0

    let posX = posXStart
    let posY = posYStart

    let allButtons = document.getElementsByTagName('button');
    for (let l = 0; l < allButtons.length; l++) {
        allButtons[l].addEventListener('click', () => clickAudio.play())
    }


    //Выбираем все клетки изменяющие направление
    reversingCells = document.getElementsByClassName('changeDirection');
    for (let i = 0; i < reversingCells.length; i++) {
        reversingCells[i].addEventListener('click', () => directionChange(i))
        reversingCells[i].addEventListener('click', () => clickAudio.play())
    }
}
//Функция для изменения направления 
function directionChange(i) {
    if (reversingCells[i].classList.contains('vertically')) {
        reversingCells[i].classList.remove('vertically')
        reversingCells[i].classList.add('right')
    } else if (reversingCells[i].classList.contains('right')) {
        reversingCells[i].classList.remove('right')
        reversingCells[i].classList.add('left')
    } else if (reversingCells[i].classList.contains('left')) {
        reversingCells[i].classList.remove('left')
        reversingCells[i].classList.add('vertically')
    }
}
function getNewRecord(value) {
    let number = value
    let dataEntryWindow = document.createElement('div');
    dataEntryWindow.setAttribute('id', 'dataEntryWindow');
    dataEntryInscription = document.createElement('span');
    dataEntryInscription.setAttribute('class', 'text')
    let textdataEntryInscription = document.createTextNode('Congratulations! You are in the top 5 players.');
    dataEntryInscription.appendChild(textdataEntryInscription);
    // dataEntryInscription.setAttribute('class','form-label')
    let enterName = document.createElement('input');
    enterName.setAttribute('id', 'enterName');
    enterName.setAttribute('class', 'form-control');
    enterName.setAttribute('placeholder', 'Please enter your name.');
    let confirmationButton = document.createElement('button');
    let confirmationButtonText = document.createTextNode('OK');
    confirmationButton.appendChild(confirmationButtonText);
    confirmationButton.addEventListener('click', () => makeChanges(number));


    dataEntryWindow.appendChild(dataEntryInscription)
    dataEntryWindow.appendChild(enterName)
    dataEntryWindow.appendChild(confirmationButton)
    document.body.appendChild(dataEntryWindow)
}
function makeChanges(number) {
    let enterNameValue = document.getElementById('enterName').value;
    number.score = myScore
    number.player = enterNameValue
    let deleteDataEntryWindow = document.getElementById('dataEntryWindow');
    deleteDataEntryWindow.remove();
    storeInfo()
    return
}
// let x,y;
// if (window.innerWidth<=812){
//     x=0.6;y=0.6;
// } else if (812<window.innerWidth && window.innerWidth<1050) {
//     x=0.75;y=0.75; 
// } else if (window.innerWidth>=1050){
//     x=1;y=1;
// }