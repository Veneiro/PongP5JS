function startGame() {
  window.location.href = "game.html";
}

function help() {
  window.location.href = "help.html";
}

function back() {
  window.location.href = "index.html";
}
/** 


const promise = backgroundMusic.play();

let playedOnLoad;

if (promise !== undefined) {
  promise.then(_ => {
    // Autoplay started!
    playedOnLoad = true;
  }).catch(error => {
    // Autoplay was prevented.
    playedOnLoad = true;
  });
}

// Pausar la música
function pauseMusic() {
  backgroundMusic.pause();
}

// Detener la música
function stopMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}
*/
var backgroundMusic = document.getElementById("backgroundMusic");
// Reproducir la música
function playMusic() {
  backgroundMusic.play();
}