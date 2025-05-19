console.log("Welcome to Spoitfy :)");

//initialize the variables
let songIndex=0;
let audioElement=new Audio('Dominic Fike _Baby Doll_ (Official Audio)-yt.savetube.me.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName= document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName("songItem"));


let songs= [
    {songName: "Babydoll - Dominic Fike", filePath: "Dominic Fike _Baby Doll_ (Official Audio)-yt.savetube.me.mp3", coverPath: "baby doll.jpg"},
    {songName: "Crying in the Club - Camilla Cabello", filePath: "Camila Cabello - Crying In The Club (Audio)-yt.savetube.me.mp3", coverPath: "covers/Crying In The Club.png"},
    {songName: "All The Stars - SZA, Kendrick Lamar", filePath: "Kendrick Lamar, SZA - All The Stars (8D AUDIO)-yt.savetube.me.mp3", coverPath: "covers/All The Stars.jpeg"},
    {songName: "Animals - Maroon 5", filePath: "C:\Users\sisri\CS Projects\Spotify\Maroon 5 - Animals (Lyrics)-yt.savetube.me.mp3", coverPath: "covers/Animals.jpeg"},
    {songName: "Circles - Post Malone", filePath: "Post Malone - Circles (Official Audio)-yt.savetube.me.mp3", coverPath: "covers/Circles.jpeg"},
    {songName: "Him All Along", filePath: "Gunna - HIM ALL ALONG [Official Video]-yt.savetube.me.mp3", coverPath: "covers/Him All Along.jpg"},
    {songName: "Lost", filePath: "Maroon 5 - Lost (Official Music Video)-yt.savetube.me.mp3", coverPath: "covers/Lost.jpg"},
    {songName: "Lalala", filePath: "Y2K, bbno$ - Lalala (Official Video)-yt.savetube.me.mp3", coverPath: "covers/Lalala.png"},
    {songName: "Wildflower", filePath: "Billie Eilish - WILDFLOWER (Official Lyric Video)-yt.savetube.me.mp3", coverPath: "covers/Wildflower.jpg"},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})


//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //Update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = '${songIndex+1}.mp3';
        masterSongName.innerText= songs[songIndex].songName;
        audioElement.currentTime= 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

//to get previous and next songs

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=8){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = '${songIndex+1}.mp3';
    masterSongName.innerText= songs[songIndex].songName;
        audioElement.currentTime= 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = '${songIndex+1}.mp3';
    masterSongName.innerText= songs[songIndex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})