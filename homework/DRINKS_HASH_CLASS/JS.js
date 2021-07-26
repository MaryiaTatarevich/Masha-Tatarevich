object = {} // Создание класса HashStorageClass
        class HashStorageClass {
            addValue(key,value){
                object[key] = value
            }

            getValue(key){
                if(key in object){
                return object[key]
                } else {return false}
            }

            deleteValue(key){
                if(!(key in object)){
                    return false  
                } else {return delete object[key] }
            }

            getKeys(){
                let arr = [];
                for (let k in object)
                arr.push(k)
                return arr   
            }
        }    
        const drinkStorage = new HashStorageClass

        //Функция закрытия окон и разблокировки кнопок меню 
        function closeWindow(id){
            let elem = String(id) 
            document.getElementById(elem).style.display='none';
            document.getElementById('firstButton').disabled = false;
            document.getElementById('secondButton').disabled = false;
            document.getElementById('thirdButton').disabled = false;
            document.getElementById('fourthButton').disabled = false;
        }

        //Функция заблокировать кнопки меню
        function lockButtons(){
            document.getElementById('firstButton').disabled = true;
            document.getElementById('secondButton').disabled = true;
            document.getElementById('thirdButton').disabled = true;
            document.getElementById('fourthButton').disabled = true;
        }