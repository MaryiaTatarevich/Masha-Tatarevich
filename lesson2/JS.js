
        let phones = [];
        function getValue(){
            const img = document.getElementById("img");
            const brand = document.getElementById("brand");
            const model = document.getElementById("model");
            const price = document.getElementById("price");
            const sale = document.getElementById("sale");
            phones.img = img.value;
            phones.brand = brand.value;
            phones.model = model.value;
            phones.price = price.value;
            phones.sale = sale.value;
            console.log(phones)
        }

         
        const phone = [
      {
        model: "samsung",
        imgUrl:"https://content2.onliner.by/catalog/device/main/9dffcecbd2d8c7ffd77baec20379646c.jpeg",
        color: "black",
        descriptions:'Android, экран 6.4" AMOLED (1080x2400), Mediatek Helio G80, ОЗУ 4 ГБ, флэш-память 64 ГБ, карты памяти, камера 64 Мп, аккумулятор 5000 мАч, 2 SIM',
        price: 300,
        sale: true
      },
      {
        model: "honor",
        imgUrl:"https://content2.onliner.by/catalog/device/main/3d1c36cb1506be29f0f17024553b4408.jpeg",
        color: "green",
        descriptions: 'Android, экран 6.67" IPS (1080x2400), HiSilicon Kirin 710A, ОЗУ 4 ГБ, флэш-память 128 ГБ, карты памяти, камера 48 Мп, аккумулятор 5000 мАч, 2 SIM',
        price: 250,
        sale: true
      },
      {
        model: "Xiaomi",
        imgUrl:"https://content2.onliner.by/catalog/device/main/0d09fb0af3fca468d2b68c6528a16d71.jpeg",
        color: "blue",
        descriptions: 'Android, экран 6.55" AMOLED (1080x2400), Qualcomm Snapdragon 732G, ОЗУ 6 ГБ, флэш-память 128 ГБ, карты памяти, камера 64 Мп, аккумулятор 4250 мАч, 2 SIM',
        price: 450,
        sale: true
      }
    ];
      let html = "";
      for (let i = 0; i < phone.length; i++){
         html += `<div class="card" style="width: 18rem;">
            <img src=${phone[i].imgUrl} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone[i].model}</h5>
              <p class="card-text">${phone[i].descriptions}</p>
              <p class="card-text">${phone[i].price}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>`
      }

     const app = document.getElementById ("app");
     app.innerHTML = html  
 

     
     let phones = [];
     function getValue(){
         const img = document.getElementById("img");
         const brand = document.getElementById("brand");
         const model = document.getElementById("model");
         const price = document.getElementById("price");
         const sale = document.getElementById("sale");
         phones.img = img.value;
         phones.brand = brand.value;
         phones.model = model.value;
         phones.price = price.value;
         phones.sale = sale.value;
         console.log(phones)
     }
