
//let body = document.querySelector("body")
let a = document.getElementById("pabble")
let b = document.getElementById("board")
//let x = 0
let bHeight = b.offsetHeight
let bdWidth = b.offsetWidth
let aHeight = a.offsetHeight
let aWidth = a.offsetWidth

let pabbleY = bHeight - 50
let pabbleX = bdWidth / 2 - (a.offsetWidth) / 2

let ballLaunched = false

a.style.transform = `translate(${pabbleX}px, ${pabbleY}px)`

let keyword = {
    left: 0,
    right: 0
}

document.addEventListener("keydown", (e) => {
    if (e.code === 'Space') {
        ballLaunched = true
        dx = Math.random() * 20 - 10; // dx entre -2 et 2
        dy = 5; // toujours vers le haut   
    }
    if (e.key === "ArrowRight") {
        keyword.right = true
    } else if (e.key === "ArrowLeft") {
        keyword.left = true
    }
})
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") {
        keyword.right = false
    }
    if (e.key === "ArrowLeft") {
        keyword.left = false
    }
})

function movePabble() {
    if (keyword.right) {
        pabbleX = pabbleX + 5
    }
    if (keyword.left) {
        pabbleX = pabbleX - 5
    }
    if (pabbleX > bdWidth - a.offsetWidth) pabbleX = bdWidth - a.offsetWidth
    if (pabbleX < 0) pabbleX = 0
    a.style.transform = `translate(${pabbleX}px,  ${pabbleY}px)`
}

let element = document.getElementById("balle")
let board = document.getElementById("board")
let boardWidth = board.offsetWidth
let boardHeight = board.offsetHeight
let letterWidth = element.offsetWidth
let letterHeight = element.offsetHeight

let x = pabbleX + (aWidth / 2) - (letterWidth / 2)
let y = pabbleY - letterHeight
// element.style.transform = `translate(${x}px, ${y}px)`
let dx = 5
let dy = 5
let bricks = []
let boardBricks = document.getElementById("board");
let brickX = []
let rows = 3;
let cols = 11;
let brickWidth = 40
let brickHeight = 20

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let brick = document.createElement('div');
        brick.className = "brick";

        brick.style.width = "40px";
        brick.style.height = "20px";
        brick.style.backgroundColor = "saddlebrown";
        brick.style.position = "absolute";
        brick.style.left = 5 + (j * 45) + "px"; // == 90px
        brick.style.top = 10 + (i * 25) + "px"; // == 20px
        //console.log(brick.style.left)
        bricks.push({
            x: parseInt(brick.style.left),
            y: parseInt(brick.style.top),
            el: brick
        })
        //console.log(brickXY)
        boardBricks.appendChild(brick);
    }
    //brickY.push(brick.style.top)
}

let lives = document.getElementById("live") 
for (let u = 0; u < 3; u++) {
    let live = document.createElement('div')
    live.className = "live"
    live.style.width = "20px"
    live.style.height = "20px"
    live.style.border = "10px"
    lives.appendChild(live)

}

let countLive = 0
let fail = false

function ball() {
    x = x + dx
    y = y + dy
    if (x <= 0 || (x + letterWidth) >= boardWidth) {
        dx = -dx
    }
    /* if ((y + letterHeight) >= boardHeight) {
         y = boardHeight - letterHeight
         return 
     }*/
    if (y <= 0) {
        dy = -dy
    }
    if ((y + letterHeight) >= boardHeight) {
        ballLaunched = false 
        countLive++
        fail = true
    }
    //let ydown = y + letterHeight  
    let ydown = y
    if (ydown >= pabbleY && y <= pabbleY + aHeight && x + letterWidth >= pabbleX && x <= pabbleX + aWidth) {
        dy = -dy

        let contact = (x + letterWidth / 2 - pabbleX) / aWidth
        let maxDX = 5
        dx = (contact - 0.5) * 2 * maxDX
    }
    let contact = false
    for (let i = 0; i < bricks.length; i++) {
        let brick = bricks[i]

        if (
            x < brick.x + brickWidth &&
            x + letterWidth > brick.x &&
            y < brick.y + brickHeight &&
            y + letterHeight > brick.y
        ) {
            dy = -dy

            brick.el.remove()   // BONNE brique
            bricks.splice(i, 1)

            break
        }
    }




}

function loop() {
    movePabble()

    if (!ballLaunched || fail) {
        x = pabbleX + (aWidth / 2) - (letterWidth / 2)
        y = pabbleY - letterHeight
        if (countLive < 3) { 
            fail = false
        }
    } else {
        ball()
    }
    element.style.transform = `translate(${x}px, ${y}px)`
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)








/*
let ballX = '95px';
let ballY = '10px';

bricksPos.forEach(pos => {
  if (pos.x === ballX && pos.y === ballY) {
    console.log("MATCH trouvé", pos);
  }
});



let ballX = 95;
let ballY = 10;

bricksPos.forEach(pos => {
  let x = parseInt(pos.x);
  let y = parseInt(pos.y);

  if (x === ballX && y === ballY) {
    console.log("MATCH trouvé", pos);
  }
});


let value = 10;

bricksPos.forEach(pos => {
  if (parseInt(pos.x) === value) {
    console.log("match avec x", pos);
  }
  if (parseInt(pos.y) === value) {
    console.log("match avec y", pos);
  }
});

*/