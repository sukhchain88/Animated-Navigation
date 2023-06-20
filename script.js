const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
// const music = document.querySelector("#audio");
const music = document.getElementById("audio");
const currentTimeEl = document.getElementById("current-Item");
const durationEl = document.getElementById("duration");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//  Music
const songs = [
  {
    name: "suk",
    displayName: "Electric Chill Meachice",
    artist: "Jacinto Design",
  },
  {
    name: "suk2",
    displayName: "Seven nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "suk3",
    displayName: "Sidu Chill Meachice",
    artist: "Jacinto Design",
  },
  {
    name: "suk4",
    displayName: "Dilljet Chill Meachice",
    artist: "Jacinto Design",
  },
  {
    name: "suk5",
    displayName: "Meachice Chill Meachice",
    artist: "Jacinto Design",
  },
];
// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");

  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

// Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Updata Dom
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${songs.name}.mp3`;
  image.src = `music/${songs.name}.avif`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.lenght - 1;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}
// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Updata Progress Bar & Time
function updataProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update Progerss bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    console.log("minutes", durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current Time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime(clickX / width) * duration;
}

//  Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updataProgressBar);
progressContainer.addEventListener("click", setProgressBar);
