let ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
let myName = 'Tatarevich_Maryia_Project'
//var updatePassword
function creation() {
    let records = []

    let jsonValue = JSON.stringify(records)
    $.ajax({
        url: ajaxHandlerScript,
        type: 'POST', dataType: 'json',
        data: { f: 'INSERT', n: myName, v: jsonValue },
        success: createSuccessfully,
        error: errorHandler
    })

    function createSuccessfully(data) {
        console.log(data)
    }

    function errorHandler() {
        console.log('Error')
    }
}

 function restoreInfo(){   
    $.ajax(
        {
            url: ajaxHandlerScript, type : 'POST', dataType:'json', 
            data : { f : 'READ', n : myName },
            success : readReady, error : errorHandler  
        });
}

function compareScore(a,b){
    return b.score-a.score
}

 function readReady(callresult){
    if (callresult.error!=undefined)
    alert(callresult.error);
    else if ( callresult.result!="" ) {
        result = JSON.parse(callresult.result);
       result.sort(compareScore)
       for (let i = 0; i<result.length; i++){
        result[i].pos = `${i+1}`
       }
       let scorePage = `<table>
         <caption>TOP 5 PLAYERS</caption>
         <tr>
         <th>POS</th>
         <th>NAME</th>
         <th>SCORE</th></tr>`
     for (let i = 0; i < result.length; i++) {
         scorePage += `<tr><th>${result[i].pos}</th>
             <th>${result[i].player}</th>
             <th>${result[i].score}</th></tr>`
     }
     scorePage += '</table>'  
     let findResult = document.getElementById('allRecords')
    //   if (findResult) {
    //  findResult.remove()
     let allRecords = document.createElement('div');
     allRecords.setAttribute('id', 'allRecords');
     document.body.appendChild(allRecords)
     let back = document.createElement('button');
     let textBack = document.createTextNode('Menu');
     back.appendChild(textBack);
     back.addEventListener('click', switchToMainPage)
     allRecords.innerHTML=scorePage
     allRecords.appendChild(back)
    }

}
function errorHandler() {
    console.log('Error')
}

function recordsPageLoading() {
    restoreInfo() 
}
