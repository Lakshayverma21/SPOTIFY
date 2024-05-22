console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio("SONGS/1.mp3");
let masterPlay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("progress-bar");
let gif = document.getElementById("gif");
let songItems = document.getElementsByClassName("song-item");
let masterSongName = document.getElementById("master-song-name");

let songs = [
    {songName: "Song 1", coverPath: "COVERS/1.jpg", filePath: "SONGS/1.mp3"},
    {songName: "Song 2", coverPath: "COVERS/2.jpg", filePath: "SONGS/2.mp3"},
    {songName: "Song 3", coverPath: "COVERS/3.jpg", filePath: "SONGS/3.mp3"},
    {songName: "Song 4", coverPath: "COVERS/4.jpg", filePath: "SONGS/4.mp3"},
    {songName: "Song 5", coverPath: "COVERS/5.jpg", filePath: "SONGS/5.mp3"},
    {songName: "Song 6", coverPath: "COVERS/6.jpg", filePath: "SONGS/0115. Greatness - AShamaluevMusic.mp3"},
    {songName: "Song 7", coverPath: "COVERS/7.jpg", filePath: "SONGS/0545. Justice - AShamaluevMusic.mp3"},
    {songName: "Song 8", coverPath: "COVERS/8.jpg", filePath: "SONGS/0550. Empire - AShamaluevMusic.mp3"},
    {songName: "Song 9", coverPath: "COVERS/9.jpg", filePath: "SONGS/0552. Darkness - AShamaluevMusic.mp3"},
    {songName: "Song 10", coverPath: "COVERS/10.jpg", filePath: "SONGS/meeting-the-stars-dramatic-background-orchestral-music-for-video-30s-197574.mp3"}
];

window.onload = function() {
    let songItems = document.getElementsByClassName("song-item");
    for (let i = 0; i < songItems.length; i++) {
        let element = songItems[i];
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("song-name")[0].innerText = songs[i].songName;
    }
};

masterPlay.addEventListener("click", () => {
    if(audioElement.paused || audioElement.currentTime <= 0) { 
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    });
};

Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        const clickedIndex = parseInt(e.target.id);
        
        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            gif.style.opacity = 0;
        } else {
            songIndex = clickedIndex;
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        }
    });
});


document.getElementById("next").addEventListener("click", () => {
    if(songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
    if(songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
});