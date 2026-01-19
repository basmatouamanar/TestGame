let game = `
   <div class="info-Cont">
    <div id="lives"></div>
    <div id="score">score:0</div>
    <div id="timer">00:00</div>
  </div>
  <div id="board">
    <div id="balle"></div>
    <div id="paddle"></div>
  </div>
   <div id="pauseCont" class='pauseCont'>
   <div class="titlePaus">Game Paused</div>
   <div class="button">
            <button class="restart" id="restart">restart</button>
            <button class ="continue" id="continue">continue</button>
   </div>
            </div>
      
  
  `
let startbuton = document.getElementById('stbuton')
startbuton.addEventListener('click', () => {
  document.body.innerHTML = game;

  // Create and append the script
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'ball.js';
  document.body.appendChild(script);
});