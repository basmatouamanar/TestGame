import { keyword, position, gameStat, demention, domElement, setapBriks, timerInfo, restartGame } from "./variables.js"
// Used to avoid updating the timer display more than once per second
let lastDisplayedSecond = -1;
// Handle paddle movement based on keyboard input
function movePaddle() {
    // Stop movement if paused, failed, or game is won or fail
    if (keyword.keyPPresed || gameStat.fail || gameStat.win) return

    if (keyword.right) {
        position.paddleX = position.paddleX + 8
    }
    if (keyword.left) {
        position.paddleX = position.paddleX - 8
    }
    if (position.paddleX > demention.boardWidth - demention.paddleWidth - 5) position.paddleX = demention.boardWidth - demention.paddleWidth - 5
    if (position.paddleX < 0) position.paddleX = 0

    domElement.paddleElement.style.transform = `translate(${position.paddleX}px,  ${position.paddleY}px)`


}

// Handle ball movement and collisions
function ball(delta) {

    position.x += gameStat.dx * delta;
    position.y += gameStat.dy * delta;

    // Left wall collision
    if (position.x <= 0) {

        position.x = 0;
        gameStat.dx = -gameStat.dx;
    }
    // Right wall collision
    if (position.x + demention.ballWidth >= demention.boardWidth) {
        position.x = demention.boardWidth - demention.ballWidth;
        gameStat.dx = -gameStat.dx;
    }
    // Top wall collision
    if (position.y <= 0) {
        position.y = 0
        gameStat.dy = -gameStat.dy
    }
    // Bottom wall (lose life)
    if ((position.y + demention.ballHeight) >= demention.boardHeight) {
        let oneLive = domElement.lives.querySelector('.live')
        // Remove one life if available
        if (oneLive) {
            oneLive.remove()
            gameStat.score -= 15
            if (gameStat.score < 0) {
                gameStat.score = 0
            }
            domElement.scoreElement.textContent = `score: ${gameStat.score}`
        }
        // Reset ball state
        gameStat.ballLaunched = false
        gameStat.countLive++
        gameStat.fail = true
    }

    // Paddle collision detection
    let ydown = position.y
    if (ydown >= position.paddleY && ydown <= position.paddleY + demention.paddleHeight && position.x + demention.ballWidth >= position.paddleX && position.x <= position.paddleX + demention.paddleWidth) {
        position.y = position.paddleY
        gameStat.dy = -gameStat.dy

        let contact = (position.x + demention.ballWidth / 2 - position.paddleX) / demention.paddleWidth
        let maxDX = Math.abs(gameStat.dy) * 0.8; // or 0.6

        gameStat.dx = (contact - 0.5) * 2 * maxDX
    }
    // Brick collision detection
    for (let i = 0; i < setapBriks.bricks.length; i++) {
        let brick = setapBriks.bricks[i]

        if (
            position.x < brick.x + demention.brickWidth &&
            position.x + demention.ballWidth > brick.x &&
            position.y < brick.y + demention.brickHeight &&
            position.y + demention.ballHeight > brick.y
        ) {
            gameStat.dy = -gameStat.dy
            gameStat.score += 10
            domElement.scoreElement.textContent = `score: ${gameStat.score}`

            brick.el.remove()
            setapBriks.bricks.splice(i, 1)
            if (setapBriks.bricks.length == 0) {
                gameStat.win = true
                gameStat.ballLaunched = false
                gameStat.startplaying = true
                // Star rating based on time
                switch (true) {
                    case (timerInfo.hours == 0 && timerInfo.minutes <= 1):
                        restartGame.RetryGame(gameStat.score, 3, '🎉 You Win', 'No bricks left… can you beat your best record?', timerInfo.timText)


                        break;

                    case (timerInfo.hours == 0 && timerInfo.minutes <= 2):
                        restartGame.RetryGame(gameStat.score, 2, '🎉 You Win', 'No bricks left… can you beat your best record?', timerInfo.timText)
                        break;

                    case (timerInfo.hours == 0 && timerInfo.minutes <= 3):
                        restartGame.RetryGame(gameStat.score, 1, '🎉 You Win', 'No bricks left… can you beat your best record?', timerInfo.timText)
                        break;

                    default:
                        restartGame.RetryGame(gameStat.score, 0, '🎉 You Win', 'No bricks left… can you beat your best record?', timerInfo.timText)

                        break
                }


            }

            break
        }
    }




}

// Timer logic with pause handling
function timerSeter() {
    if (!gameStat.startplaying) return;

    if (!gameStat.ballLaunched) {
        if (gameStat.isPaused) return;

        gameStat.isPaused = true;
        timerInfo.pausedAt = Date.now();
        return;
    }

    if (gameStat.isPaused) {
        gameStat.isPaused = false;
        timerInfo.totalPausedTime += Date.now() - timerInfo.pausedAt;
    }

    if (!timerInfo.startTime) {
        timerInfo.startTime = Date.now();
    }

    const now = Date.now();
    const elapsedMs =
        now - timerInfo.startTime - timerInfo.totalPausedTime;

    const totalSeconds = Math.floor(elapsedMs / 1000);
    if (totalSeconds < 0) return;
    // Update only once per second
    if (totalSeconds === lastDisplayedSecond) return;
    lastDisplayedSecond = totalSeconds;

    timerInfo.seconds = totalSeconds % 60;
    timerInfo.minutes = Math.floor(totalSeconds / 60) % 60;
    timerInfo.hours = Math.floor(totalSeconds / 3600);

    const s = timerInfo.seconds < 10 ? '0' + timerInfo.seconds : timerInfo.seconds;
    const m = timerInfo.minutes < 10 ? '0' + timerInfo.minutes : timerInfo.minutes;

    timerInfo.timText =
        timerInfo.hours > 0 ? `${hours}:${m}:${s}` : `${m}:${s}`;

    domElement.timebar.textContent = timerInfo.timText;
}


// Track previous frame time
let lastTime = 0;

export function loop(t) {
    // Calculate delta time (max 33ms)
    const delta = Math.min((t - lastTime) / 1000, 0.033);
    lastTime = t;
    timerSeter()
    movePaddle()
    // Ball waiting on paddle or fail state
    if ((!gameStat.ballLaunched || gameStat.fail) && !gameStat.win && !keyword.keyPPresed) {
        position.x = position.paddleX + (demention.paddleWidth / 2) - (demention.ballWidth / 2)
        position.y = position.paddleY - demention.ballHeight
        if (gameStat.countLive < 3) {
            gameStat.fail = false
        } else {
            if (!gameStat.alredySetLoseMesage) {
                gameStat.alredySetLoseMesage = true
                gameStat.startplaying = false
                restartGame.RetryGame(gameStat.score, 0, '💥 You Lose', 'Your ball fell… but you can try again!', timerInfo.timText)
            }
        }

    } else if (gameStat.ballLaunched) {
        gameStat.alredySetLoseMesage = false
        ball(delta)


    }
    // Apply ball position to DOM
    domElement.ballElement.style.transform = `translate(${position.x}px, ${position.y}px)`
    // Request next frame
    requestAnimationFrame(loop)
}
