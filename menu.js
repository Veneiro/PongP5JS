function startGame() {
  window.location.href = "game.html";
}

function help() {
  window.location.href = "help.html";
}

function back() {
  window.location.href = "index.html";
}

var musicState = localStorage.getItem("musicState");
var mute = document.getElementById("mute");
var muteText = "Music Muted";
var playingText = "Playing now..."

// Pausar la música
function pauseMusic() {
  backgroundMusic.pause();
  localStorage.setItem("musicState", "paused");
  mute.innerHTML = muteText;
}

// Detener la música
function stopMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  localStorage.setItem("musicState", "paused");
  mute.innerHTML = "Stopped";
}

var backgroundMusic = document.getElementById("backgroundMusic");
// Reproducir la música
function playMusic() {
  backgroundMusic.play();
  localStorage.setItem("musicState", "playing");
  mute.innerHTML = playingText;
}

// Restaura el estado de la música
if (musicState === "playing") {
  playMusic();
} else if (musicState === "paused") {
  pauseMusic();
}

window.addEventListener('load', function () {
  if(musicState === "playing"){
    playMusic();
    mute.innerHTML = playingText;
  }
});

function music(){
  if (backgroundMusic.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
}