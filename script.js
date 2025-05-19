console.log("Welcome to Spotify :)");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('Dominic Fike _Baby Doll_ (Official Audio)-yt.savetube.me.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songName: "Babydoll - Dominic Fike", filePath: "Dominic Fike _Baby Doll_ (Official Audio)-yt.savetube.me.mp3", coverPath: "baby doll.jpg" },
    { songName: "Crying in the Club - Camilla Cabello", filePath: "Camila Cabello - Crying In The Club (Audio)-yt.savetube.me.mp3", coverPath: "covers/Crying In The Club.png" },
    { songName: "All The Stars - SZA, Kendrick Lamar", filePath: "Kendrick Lamar, SZA - All The Stars (8D AUDIO)-yt.savetube.me.mp3", coverPath: "covers/All The Stars.jpeg" },
    { songName: "Animals - Maroon 5", filePath: "Maroon 5 - Animals (Lyrics)-yt.savetube.me.mp3", coverPath: "covers/Animals.jpeg" },
    { songName: "Circles - Post Malone", filePath: "Post Malone - Circles (Official Audio)-yt.savetube.me.mp3", coverPath: "covers/Circles.jpeg" },
    { songName: "Him All Along", filePath: "Gunna - HIM ALL ALONG [Official Video]-yt.savetube.me.mp3", coverPath: "covers/Him All Along.jpg" },
    { songName: "Lost", filePath: "Maroon 5 - Lost (Official Music Video)-yt.savetube.me.mp3", coverPath: "covers/Lost.jpg" },
    { songName: "Lalala", filePath: "Y2K, bbno$ - Lalala (Official Video)-yt.savetube.me.mp3", coverPath: "covers/Lalala.png" },
    { songName: "Wildflower", filePath: "Billie Eilish - WILDFLOWER (Official Lyric Video)-yt.savetube.me.mp3", coverPath: "covers/Wildflower.jpg" }
];

// Setting song items with cover and song name
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Function to reset all play buttons to play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

// Event listener for each individual song play button
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays(); // Reset all play buttons to play state
        songIndex = index; // Get the index of the clicked song
        e.target.classList.remove('fa-circle-play'); // Change clicked button to pause
        e.target.classList.add('fa-circle-pause');

        audioElement.src = songs[songIndex].filePath; // Set audio source to clicked song
        audioElement.currentTime = 0; // Start the song from the beginning
        audioElement.play(); // Play the selected song

        // Update the songInfo section at the bottom
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

// Handle play/pause for the master play button (bottom section)
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to audio time updates for progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Handle progress bar change (seek bar)
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// To go to next song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// To go to previous song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
