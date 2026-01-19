import { demention, domElement, position, setapBriks } from "./variables.js";
export function handleResize() {

    // Save old ball position as percentage of board size
    let oldballposx = position.x * 100 / demention.boardWidth
    let oldballposy = position.y * 100 / demention.boardHeight
    // Save old paddle X position as percentage
    let oldpaddposx = position.paddleX * 100 / demention.boardWidth
    // Update board rectangle reference
    domElement.boardRec = domElement.ballElement.getBoundingClientRect()
    // Update board dimensions
    demention.boardWidth = domElement.boardElement.offsetWidth;
    demention.boardHeight = domElement.boardElement.offsetHeight;
    // Update paddle dimensions
    demention.paddleHeight = domElement.paddleElement.offsetHeight;
    demention.paddleWidth = domElement.paddleElement.offsetWidth;
    // Restore paddle position proportionally
    position.paddleX = oldpaddposx * demention.boardWidth / 100;
    position.paddleY = demention.boardHeight - 50;
    domElement.paddleElement.style.transform =
        `translate(${position.paddleX}px, ${position.paddleY}px)`;
    // Recalculate brick size based on new board size
    demention.brickWidth = (demention.boardWidth - setapBriks.gap * (setapBriks.cols - 1)) / setapBriks.cols - 2
    demention.brickHeight = (demention.boardHeight * 0.06)

    // Restore ball position proportionally
    position.x = oldballposx * demention.boardWidth / 100
    position.y = oldballposy * demention.boardHeight / 100
    domElement.ballElement.style.transform =
        `translate(${position.x}px, ${position.y}px)`;



    // Re-layout only remaining bricks
    relayoutBricks();
}


function relayoutBricks() {

    setapBriks.bricks.forEach((brick) => {
        brick.el.style.width = `${demention.brickWidth}px`;
        brick.el.style.height = `${demention.brickHeight}px`;
        // Recalculate brick position
        brick.el.style.left = 5 + (brick.j * (demention.brickWidth + setapBriks.gap)) + "px";
        brick.el.style.top = 10 + (brick.i * (demention.brickHeight + setapBriks.gap)) + "px";
        brick.x = parseInt(brick.el.style.left)
        brick.y = parseInt(brick.el.style.top)

    });


}


