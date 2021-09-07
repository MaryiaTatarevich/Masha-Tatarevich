function mainPageLoading() {
    //для back очистить поле
    let findGame = document.getElementById('allGame')
    let findRecords = document.getElementById('allRecords')

    if (findGame) {
        findGame.remove()
    }else if(findRecords){
        findRecords.remove()
    }
    let mainPage =
        `<a href="#Game" onclick="switchToGamePage()"><span>New Game</span></a>
    <a href="#Records" onclick="switchToRecordsPage()"><span>Records</span></a>`
    return mainPage
}