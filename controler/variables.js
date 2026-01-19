
export let gameStat = {
    startplaying: false,
    countLive: 0,
    fail: false,
    win: false,
    ballLaunched: false,
    dx: 400,
    dy: 400,
    score: 0,
    isPaused: null,
    alredySetLoseMesage: false
}
export let domElement = {
    paddleElement: document.getElementById("paddle"),
    boardElement: document.getElementById("board"),
    ballElement: document.getElementById("balle"),
    lives: document.getElementById("lives"),
    scoreElement: document.getElementById("score"),
    timebar: document.getElementById("timer"),
    boardRec: null,
    continueElement: null,
    RestartElement: null,
    PausedBarElement: null,
}
// Game object dimensions
export let demention = {
    boardHeight: 0,
    boardWidth: 0,
    paddleHeight: 0,
    paddleWidth: 0,
    brickWidth: 0,
    brickHeight: 0,
    ballWidth: 0,
    ballHeight: 0,
}
// Initialization helpers
export let init = {
    initDemention: function () {
        demention.boardHeight = domElement.boardElement.offsetHeight;
        demention.boardWidth = domElement.boardElement.offsetWidth;
        demention.paddleHeight = domElement.paddleElement.offsetHeight;
        demention.paddleWidth = domElement.paddleElement.offsetWidth;
        demention.ballWidth = domElement.ballElement.offsetWidth;
        demention.ballHeight = domElement.ballElement.offsetHeight;
        demention.brickWidth = (demention.boardWidth - 10 * setapBriks.gap) / setapBriks.cols - 2
        demention.brickHeight = demention.boardHeight * 0.06;
    },
    initDOM: function () {
        domElement.paddleElement = document.getElementById("paddle");
        domElement.boardElement = document.getElementById("board");
        domElement.ballElement = document.getElementById("balle");
        domElement.lives = document.getElementById("lives");
        domElement.scoreElement = document.getElementById("score");
        domElement.timebar = document.getElementById("timer"),
            domElement.PausedBarElement = document.getElementById('pauseCont')
        domElement.RestartElement = document.getElementById('restart')
        domElement.continueElement = document.getElementById('continue')
        domElement.boardRec = domElement.boardElement.getBoundingClientRect()
    },
    initPosition: function () {
        position.paddleY = demention.boardHeight - 50;
        position.paddleX =
            demention.boardWidth / 2 - demention.paddleWidth / 2;

        position.x =
            position.paddleX +
            demention.paddleWidth / 2 -
            demention.ballWidth / 2;

        position.y =
            position.paddleY - demention.ballHeight;
    },

}
export let keyword = {
    left: 0,
    right: 0,
    keyPPresed: null,
}
// Timer tracking information
export let timerInfo = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    startTime: null,
    pausedAt: null,
    totalPausedTime: 0,
    timText: ''

}
// Paddle and ball positions
export let position = {
    paddleY: 0,
    paddleX: 0,
    x: 0,
    y: 0,
}
// Brick setup and management
export let setapBriks = {
    rows: 3,
    cols: 11,
    gap: 4,
    bricks: [],
    addBriksAndLife: function () {
        setapBriks.bricks = []
        for (let i = 0; i < setapBriks.rows; i++) {
            for (let j = 0; j < setapBriks.cols; j++) {
                let brick = document.createElement('div');
                brick.className = "brick";

                brick.style.width = `${demention.brickWidth}px`;
                brick.style.height = `${demention.brickHeight}px`;
                brick.style.backgroundColor = "saddlebrown";
                brick.style.position = "absolute";

                brick.style.left = 5 + (j * (demention.brickWidth + setapBriks.gap)) + "px"; // == 90px
                brick.style.top = 10 + (i * (demention.brickHeight + setapBriks.gap)) + "px";
                setapBriks.bricks.push({
                    i,
                    j,
                    x: parseInt(brick.style.left),
                    y: parseInt(brick.style.top),
                    el: brick
                })
                domElement.boardElement.appendChild(brick);
            }
        }
        // Ensure 3 lives are displayed
        let liveCount = document.getElementsByClassName('live')?.length || 0;


        for (let u = 0; u < 3 - liveCount; u++) {
            let live = document.createElement('img')
            live.src = './images/heart.png'
            live.classList.add("live")
            live.style.width = "30px"
            live.style.height = "30px"
            live.style.margin = "2px"
            live.style.borderRadius = "10px"
            domElement.lives.appendChild(live)

        }
    },


    setUpGame: function () {
        domElement.paddleElement.style.transform = `translate(${position.paddleX}px, ${position.paddleY}px)`
        init.initDOM()
        init.initDemention()
        init.initPosition()
        setapBriks.addBriksAndLife()
    }


}
// Win / lose and restart system
export let restartGame = {
    PausedGame: function () {
        domElement.RestartElement.addEventListener('click', () => {
            domElement.PausedBarElement.style.display = "none";
            restartGame.Reinitislize()
            
        })
        domElement.continueElement.addEventListener('click', () => {
            domElement.PausedBarElement.style.display = "none";
            gameStat.ballLaunched = true
            keyword.keyPPresed = false
        })
    },
    GameWinOrlose: function (score, NumberOfstars, text, textUX, textTime) {
        let overLayer = document.createElement('div')
        overLayer.classList.add('endGame')
        let stars = document.createElement('div')
        stars.classList.add('stars')
        let star1 = document.createElement('span')
        let star2 = document.createElement('span')
        let star3 = document.createElement('span')
        let starShine = document.createElement('img')
        starShine.classList.add('star')
        starShine.src = './images/star.png'
        let starNoShine = document.createElement('img')
        starNoShine.classList.add('star')
        starNoShine.src = './images/starlos.png'
        let textWin = document.createElement('h1')
        textWin.textContent = text
        let textUx = document.createElement('p')
        textUx.textContent = textUX
        let retryBtn = document.createElement('img')
        retryBtn.classList.add('retryBtn')
        retryBtn.id = 'retryBtn'
        retryBtn.src = './images/refresh-action.png'
        let retry = document.createElement('div')
        retry.textContent = 'Retry'
        retry.id = 'retrytext'
        let scorDiv = document.createElement('div')
        scorDiv.classList.add('scorediv')
        scorDiv.textContent = `score: ${score}`
        let timDiv = document.createElement('div')
        timDiv.classList.add('timdiv')
        timDiv.textContent = `record: ${textTime}`
        switch (NumberOfstars) {
            case 0:
                star1.appendChild(restartGame.createStar(false))
                star2.appendChild(restartGame.createStar(false))
                star3.appendChild(restartGame.createStar(false))

                break;

            case 1:
                star1.appendChild(restartGame.createStar(true))
                star2.appendChild(restartGame.createStar(false))
                star3.appendChild(restartGame.createStar(false))

                break;
            case 2:
                star1.appendChild(restartGame.createStar(true))
                star2.appendChild(restartGame.createStar(true))
                star3.appendChild(restartGame.createStar(false))

                break;
            default:
                star1.appendChild(restartGame.createStar(true))
                star2.appendChild(restartGame.createStar(true))
                star3.appendChild(restartGame.createStar(true))
                break;

        }
        stars.appendChild(star1)
        stars.appendChild(star2)
        stars.appendChild(star3)
        overLayer.appendChild(stars)
        overLayer.appendChild(textWin)
        overLayer.appendChild(scorDiv)
        overLayer.appendChild(timDiv)
        overLayer.appendChild(textUx)
        overLayer.appendChild(retryBtn)
        overLayer.appendChild(retry)
        document.body.appendChild(overLayer)


    },
    RetryGame: function (score1, n, textLosOrWin, textUX, timText1) {
        timerInfo.timebar = document.getElementById('timer')
        restartGame.GameWinOrlose(score1, n, textLosOrWin, textUX, timText1)

        const retryBtn = document.getElementById('retryBtn');
        const overLayer = document.querySelector('.endGame');

        retryBtn.addEventListener('click', () => {
            overLayer.remove();
            restartGame.Reinitislize()

        });

    },
    Reinitislize: function () {
        keyword.keyPPresed=false
        gameStat.score = 0;
        domElement.scoreElement.textContent = 'score:0'
        gameStat.countLive = 0;
        gameStat.fail = false;
        gameStat.alredySetLoseMesage = false
        gameStat.ballLaunched = false
        timerInfo.startTime = null;
        timerInfo.pausedAt = null;
        timerInfo.totalPausedTime = 0;
        gameStat.isPaused = false;
        timerInfo.timText = '00:00'
        domElement.timebar.textContent = `00:00`;
        restartGame.clearBricks();
        position.paddleY = demention.boardHeight - 50;
        position.paddleX = demention.boardWidth / 2 - demention.paddleWidth / 2;
        domElement.paddleElement.style.transform = `translate(${position.paddleX}px, ${position.paddleY}px)`
        setapBriks.setUpGame()
        gameStat.win = false
    },
    clearBricks: function () {
        let bricks = document.querySelectorAll('.brick')
        bricks.forEach(brik => brik.remove())
    },
    createStar: function (shiny) {
        const img = document.createElement('img');
        img.classList.add('star');
        img.src = shiny
            ? './images/star.png'
            : './images/starlos.png';
        return img;
    }

}



