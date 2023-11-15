var musicState = localStorage.getItem("musicState");
var mute = document.getElementById("mute");
var muteText = '<img src="./mute.jpg" alt="Mute/Unmute">';
var playingText = '<img src="./volume.jpg" alt="Mute/Unmute">'

var backgroundMusic = document.getElementById("backgroundMusic");
volumeControl.addEventListener('input', function() {
  backgroundMusic.volume = volumeControl.value;
});

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

document.addEventListener('DOMContentLoaded', function () {
  if(musicState === "playing"){
    playMusic();
    mute.innerHTML = playingText;
  } else {
    mute.innerHTML = muteText;
  }
});

function music(){
  if (backgroundMusic.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
}