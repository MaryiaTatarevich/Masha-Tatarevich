function rulesPageLoading() {
    // //для back очистить поле
    // let findGame = document.getElementById('allGame');
    // let findRecords = document.getElementById('allRecords');
    // if (findGame) {
    //     findGame.remove()
    // }else if(findRecords){
    //     findRecords.remove()
    // }
    let rulesPage =
        `<h2> The goal of the game is to sort as many balls as possible by color.</h2>
    <h2> You can change the direction of the square at the intersection by clicking on it.</h2>
    <a href="#Main" onclick="switchToMainPage()"><span>Menu</span></a>`
    return rulesPage
    
}