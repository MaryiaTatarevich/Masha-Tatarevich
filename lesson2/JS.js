
        
        const phones = [
            {
                imgUrl:"https://content2.onliner.by/catalog/device/main/9dffcecbd2d8c7ffd77baec20379646c.jpeg",
                brand: "Samsung",
                model: "Galaxy S20 FE SM-G780G 6GB/128GB",
                description: 'Android, экран 6.4" AMOLED (1080x2400), Mediatek Helio G80, ОЗУ 4 ГБ, флэш-память 64 ГБ, карты памяти, камера 64 Мп, аккумулятор 5000 мАч, 2 SIM',
                price: "300 $",
                sale: true
             },
             {
                imgUrl:"https://content2.onliner.by/catalog/device/main/3d1c36cb1506be29f0f17024553b4408.jpeg",
                brand: "Honor",
                model: "10X Lite DNN-LX9 4GB/128GB",
                description: 'Android, экран 6.67" IPS (1080x2400), HiSilicon Kirin 710A, ОЗУ 4 ГБ, флэш-память 128 ГБ, карты памяти, камера 48 Мп, аккумулятор 5000 мАч, 2 SIM',
                price: "250 $",
                sale: false
             },
            {
                imgUrl:"https://content2.onliner.by/catalog/device/main/0d09fb0af3fca468d2b68c6528a16d71.jpeg",
                brand: "Xiaomi",
                model: "Redmi 9 4GB/64GB",
                description: 'Android, экран 6.55" AMOLED (1080x2400), Qualcomm Snapdragon 732G, ОЗУ 6 ГБ, флэш-память 128 ГБ, карты памяти, камера 64 Мп, аккумулятор 4250 мАч, 2 SIM',
                price: "450 $",
                sale: true
            }
        ];

     
     function getValue(){
         let phone = {};
         const imgUrl = document.getElementById("img").value;
         const brand = document.getElementById("brand").value;
         const model = document.getElementById("model").value;
         const description = document.getElementById("description").value;
         const price = document.getElementById("price").value;
         const sale = document.getElementById("sale");

         phone.imgUrl = imgUrl ;
         phone.brand = brand;
         phone.model = model;
         phone.description = description;
         phone.price = price;
         if(sale.checked){
            phone.sale = true
         } else {false
        };  
        phones.push (phone)

        let allInputs = document.querySelectorAll("input")
        for (let i = 0; i <= allInputs.length; i++) {
         allInputs[i].value = "";
        };

     }


     
     function render(){
        let html = "";
      for (let i = 0; i < phones.length; i++){
         html += `<div  class="card" id = ${i} style="width: 22rem; ">
            <img src=${phones[i].imgUrl} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phones[i].brand}</h5>
            <h6 class="card-title">${phones[i].model}</h6>
            <p class="card-text">${phones[i].description}</p>
            <p class="card-text">${phones[i].price}</p>`
         html += phones[i].sale ? "<p style = color:red>SALE</p>": "<p></p>"
         html += `<a href="#" class="btn btn-primary">Купить</a>
            <button data-phone-id = ${i} onclick="deleteCard(this)"  href="#" class="btn btn-primary">Удалить</button>
            <button onclick="upgradeCard()"  href="#" class="btn btn-primary">Обновить</button>
            </div>
          </div>`
         
      }
     let app = document.getElementById ("app");
     app.innerHTML = html   
     }

     function deleteCard(obj){
        let index = obj.getAttribute('data-phone-id');
        let div = document.getElementById(index);
        div.parentNode.removeChild(div);
        phones.splice (index,1);
     }

     function upgradeCard(){
        
     }

          
     // добавить валидацию 
     //по умолчанию unchecked
     
 
    
