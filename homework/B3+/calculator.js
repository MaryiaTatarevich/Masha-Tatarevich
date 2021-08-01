
function calculation (myEnter){
let arrayMyEnter = myEnter.split('');
let operations = ['+', '*', '/', '(', ')'];
let arrayInPut = []
let index = 0

for (let i = 0; i < arrayMyEnter.length; i++) {

    let check = operations.some(function (letter) {
        if (letter === arrayMyEnter[i]) {
            return true
        } else {
            return false
        }
    })

    function dropCheck(value) {
        if (isFinite(value) || value === '.') {
            return true
        } else {
            return false
        }
    } //не цифра не точка 

    function minusCheck(value) {//value = (arrayMyEnter[i - 1])
        let newValue = value - 1
        if (arrayMyEnter[value] === '-' && !(isFinite(arrayMyEnter[newValue]) || arrayMyEnter[newValue] === ')')) {
            return 'unary'
        }else if(arrayMyEnter[value] !== '-'){
            return false
        } else  {
            return 'binary'
        }
    }//проверка на унарный минус

    if (arrayMyEnter[i] === '-') {
        let result = minusCheck(i)
        if (result === 'binary') {
            arrayInPut[index] = arrayMyEnter[i]
            index++
        } else if (result === 'unary'){
            arrayInPut[index] = arrayMyEnter[i]
        }

    }

    else if (check) {
        arrayInPut[index] = arrayMyEnter[i]
        index++
    }

    else if (isFinite(arrayMyEnter[i]) &&  minusCheck(i - 1)==='unary' && !dropCheck(arrayMyEnter[i + 1])) {
        arrayInPut[index] += arrayMyEnter[i]
        index++
    } //для единичных отрицательных цифр 

    else if (isFinite(arrayMyEnter[i]) && !dropCheck(arrayMyEnter[i - 1]) && !dropCheck(arrayMyEnter[i + 1])) {
        arrayInPut[index] = arrayMyEnter[i]
        index++
    } //для единичных  цифр 

    else if (dropCheck(arrayMyEnter[i]) && !dropCheck(arrayMyEnter[i - 1]) && dropCheck(arrayMyEnter[i + 1])) {
        arrayInPut[index] = arrayMyEnter[i]
    } //усли элемент цифра или точка, предыдущее значение не цифра и не точка , а след значение цифра или точка, то присваиваем индекс

    else if (dropCheck(arrayMyEnter[i]) && minusCheck(i - 1)==='unary' && dropCheck(arrayMyEnter[i + 1])) {
        arrayInPut[index] += arrayMyEnter[i]
    } //усли элемент цифра или точка, предыдущее значение не цифра и не точка , а след значение цифра или точка, то присваиваем индекс

    else if (dropCheck(arrayMyEnter[i]) && dropCheck(arrayMyEnter[i - 1]) && dropCheck(arrayMyEnter[i + 1])) {
        arrayInPut[index] += arrayMyEnter[i]
    } //если элем цифра или точка, предыдущее знач цифра или точка, а след знач цифра или точка


    else if (dropCheck(arrayMyEnter[i]) && dropCheck(arrayMyEnter[i - 1]) && !(dropCheck(arrayMyEnter[i + 1]))) {
        arrayInPut[index] += arrayMyEnter[i]
        index++
    } //если элем цифра, а след знач не цифра или точка ,то идем дальше 

}

let numbersStack = [];//массив выхода 
let symbolsStack = [];// стек операции, одет операции в стек или иассив зависит от приритета последней операции в стек

for (let i = 0; i < arrayInPut.length; i++) {
    if (!isNaN(parseFloat(arrayInPut[i]))) {//проверяем число ли элемент
        numbersStack.push(arrayInPut[i]) //если число, то добавляем его в массив с числами
    }
    else {
        switch (arrayInPut[i]) {
            case '(':   
                symbolsStack.push(arrayInPut[i]);
                break;
            case ')'://нужно вытолкать все знаки из стека в массив до первой открывающейся скобки и избавляемся от обеих скобок  
                if (symbolsStack.length > 1) {
                    while (symbolsStack[symbolsStack.length - 1] !== '(') {
                        numbersStack.push(symbolsStack.pop())
                    }

                    symbolsStack = symbolsStack.filter(function (item) {
                        return item !== '('
                    });
                }
                else {
                    symbolsStack = symbolsStack.filter(function (item) {
                        return item !== '('
                    })
                }
                break;
            case '+':
                if (symbolsStack.length > 0) {
                    if (symbolsStack[symbolsStack.length - 1] === '/' || symbolsStack[symbolsStack.length - 1] === '*' || symbolsStack[symbolsStack.length - 1] === '-' || symbolsStack[symbolsStack.length - 1] === '+') {//если последний символ в стеке операций имеет приоритет выше, чем текущий знак, то последний знак из стека перемещаем в массив  
                        numbersStack.push(symbolsStack.pop())
                        symbolsStack.push(arrayInPut[i])
                    }

                    else {
                    symbolsStack.push(arrayInPut[i]);
                }
                }
                else {
                    symbolsStack.push(arrayInPut[i]);
                }

                break;
            case '-':
                if (symbolsStack.length > 0) {
                    if (symbolsStack[symbolsStack.length - 1] === '/' || symbolsStack[symbolsStack.length - 1] === '*' || symbolsStack[symbolsStack.length - 1] === '+'|| symbolsStack[symbolsStack.length - 1] === '-') {
                        numbersStack.push(symbolsStack.pop())
                        symbolsStack.push(arrayInPut[i])
                    }
                    else {
                    symbolsStack.push(arrayInPut[i]);
                }
                }
                else {
                    symbolsStack.push(arrayInPut[i]);
                }

                break;
            case '*':
            if (symbolsStack.length > 0) {
                    if (symbolsStack[symbolsStack.length - 1] === '/' || symbolsStack[symbolsStack.length - 1] === '*') {
                        numbersStack.push(symbolsStack.pop())
                        symbolsStack.push(arrayInPut[i])
                    }
                    else {
                    symbolsStack.push(arrayInPut[i]);
                }
                }
                else {
                    symbolsStack.push(arrayInPut[i]);
                }
                //Если приоритет ниже, то просто добавляем элемент


                break;
            case '/':
            if (symbolsStack.length > 0) {
                    if (symbolsStack[symbolsStack.length - 1] === '/' || symbolsStack[symbolsStack.length - 1] === '*') {
                        numbersStack.push(symbolsStack.pop())
                        symbolsStack.push(arrayInPut[i])
                    }
                    else {
                    symbolsStack.push(arrayInPut[i]);
                }
                }
                else {
                    symbolsStack.push(arrayInPut[i]);
                }
                break;
        }
    }
}
 if(symbolsStack.length!==0){
    for (let k = 0; k <= symbolsStack.length; k++) {
    numbersStack.push(symbolsStack.pop())}
 }

let result = []

for (let r = 0; r < numbersStack.length; r++) {
    if (numbersStack[r] === '+') {
        elem1 = result.pop()
        elem2 = result.pop()
        result.push(elem2 + elem1)
    }
    else if (numbersStack[r] === '-') {

        elem1 = result.pop()
        elem2 = result.pop()
        result.push(elem2 - elem1)
    }
    else if (numbersStack[r] === '*') {
        elem1 = result.pop()
        elem2 = result.pop()
        result.push(elem2 * elem1)
    }
    else if (numbersStack[r] === '/') {
        elem1 = result.pop()
        elem2 = result.pop()
        result.push(elem2 / elem1)
    }
    else {
        result.push(parseFloat(numbersStack[r]))
    }
}


return result
}


