function mainPageLoading() {
    //для back очистить поле
     let findGame = document.getElementById('allGame')
     if(findGame){   
        findGame.remove()
     }
    let mainPage =
        `<a href="#Game" onclick="switchToGamePage()"><span>New Game</span></a>
    <a href="#Records" onclick="switchToRecordsPage()"><span>Records</span></a>
    <a href="#Rules" onclick=" switchToRulesPage"><span>Rules</span></a>`;
    return mainPage
}