import { gameStat, keyword, setapBriks ,restartGame,domElement} from "./controler/variables.js"
import { loop } from "./controler/controle.js";
import { handleResize } from "./controler/responsi.js";
setapBriks.setUpGame()
let resizeTimeout

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 100);
});


document.addEventListener("keydown", (e) => {

    if (e.code == 'KeyP') {
        if (gameStat.ballLaunched) {
            domElement.PausedBarElement.style.display = "flex";
            gameStat.ballLaunched = false
            keyword.keyPPresed = true
            restartGame.PausedGame()

        } else if (keyword.keyPPresed) {
            domElement.PausedBarElement.style.display = "none";
            gameStat.ballLaunched = true
            keyword.keyPPresed = false
        }
    }



    if (e.code === 'Space' && !gameStat.fail && !gameStat.ballLaunched && !keyword.keyPPresed) {
        gameStat.ballLaunched = true
        gameStat.dx = Math.random() * 800 - gameStat.dx;
        gameStat.startplaying = true
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
requestAnimationFrame((t) => loop(t)
);







