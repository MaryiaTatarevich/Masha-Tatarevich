function mainPageLoading() {
    //для back очистить поле
    let findGame = document.getElementById('allGame');
    let findRecords = document.getElementById('allRecords');
    if (findGame) {
        findGame.remove()
    }else if(findRecords){
        findRecords.remove()
    }
    let mainPage =
        `<a href="#Game" onclick="switchToGamePage()"><span>New Game</span></a>
    <a href="#Records" onclick="switchToRecordsPage()"><span>Records</span></a>
    <a href="#Rules" onclick="switchToRulesPage()"><span>Rules</span></a>
    <a href="#About" onclick="switchToAboutPage()"><span>About</span></a>
    <div id ="musicIcon" onclick = 'music()'></div>`
    return mainPage
    
}
let playMusic = false
let backgroundMusic = new Audio('./pages/game/sounds/backgroundMusic.mp3')
function music(){
    let musicIcon = document.getElementById('musicIcon');
if(!playMusic){
    playMusic = true
    backgroundMusic.play()
    backgroundMusic.volume = 0.1;
    musicIcon.style.backgroundImage ='url(./pages/game/img/icon_music.png)'
    
}else{
    playMusic = false
    backgroundMusic.pause()
    backgroundMusic.currentTime=0;
    musicIcon.style.backgroundImage ='url(./pages/game/img/icon_nomusic.png)'
}
}
