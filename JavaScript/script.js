
let currentsong = new Audio();
let currentIndex = 0;

let expand_btn = document.querySelector(".expand-arrow")
expand_btn.addEventListener("click", () => {
    document.getElementById("sidebar").style.width = "0vw"
    document.getElementById("maincontainer").style.width = "100vw"
    document.getElementById("maincontainer").style.marginLeft = "0"
})

let hamburger = document.querySelector(".svg")
hamburger.addEventListener("click", () => {
    document.getElementById("sidebar").style.width = "100vw"
    document.getElementById("sidebar").style.display = "block"
    document.getElementById("maincontainer").style.width = "0"
})

const songs = [
    {
        Title: "Die with a Smile",
        singer: "Bruno Mars",
        src: "Assets/songs/Lady Gaga, Bruno Mars - Die With A Smile.mp3",
        poster: "https://i.pinimg.com/736x/80/10/3d/80103dcd20fb23f94c46b9433e5bfd26.jpg"
    },
    {
        Title: "Gangster Paradise",
        singer: "Coolio",
        src: "Assets/songs/Coolio - Gangsta's Paradise (feat. L.V.) [Official Music Video] [fPO76Jlnz6c].mp3",
        poster: "https://i.pinimg.com/736x/b3/67/ed/b367ed0fd3a9c7eeb620dd84984684f8.jpg"
    },
    {
        Title: "Loving you is a Losing Game",
        singer: "Duncan Laurence",
        src: "Assets/songs/Duncan Laurence - Loving You Is A Losing Game (Lyrics) _ Arcade.mp3",
        poster: "https://i.pinimg.com/736x/6c/a8/64/6ca864fba1b35bab17f441496c9baae2.jpg"
    },
    {
        Title: "Matshuka Ultrafunk",
        singer: "Tatiana Kurtukova",
        src: "Assets/songs/Believer - Imagine Dragons.mp3",
        poster: "https://i.pinimg.com/736x/ff/58/93/ff5893eef886e7a686fd44b578766805.jpg"
    },
    {
        Title: "Skyfall",
        singer: "Adale",
        src: "Assets/songs/Adele - Skyfall.mp3",
        poster: "https://i.pinimg.com/736x/3a/b3/39/3ab33958577c2455cbfc761bc5d8100a.jpg"
    },
    {
        Title: "Suzume",
        singer: "RADWIMPS",
        src: "Assets/songs/Suzume no Tojimari『Suzume』Theme Song.mp3.mp3",
        poster: "https://i.pinimg.com/736x/7e/18/91/7e189184bb1753c066a06c3f67ac5de1.jpg"
    },
    {
        Title: "Die with a Smile",
        singer: "Bruno Mars",
        src: "Assets/songs/Lady Gaga, Bruno Mars - Die With A Smile.mp3",
        poster: "https://i.pinimg.com/736x/80/10/3d/80103dcd20fb23f94c46b9433e5bfd26.jpg"
    },
    {
        Title: "Gangster Paradise",
        singer: "Coolio",
        src: "Assets/songs/Coolio - Gangsta's Paradise (feat. L.V.) [Official Music Video] [fPO76Jlnz6c].mp3",
        poster: "https://i.pinimg.com/736x/b3/67/ed/b367ed0fd3a9c7eeb620dd84984684f8.jpg"
    },
    {
        Title: "Loving you is a Losing Game",
        singer: "Duncan Laurence",
        src: "Assets/songs/Duncan Laurence - Loving You Is A Losing Game (Lyrics) _ Arcade.mp3",
        poster: "https://i.pinimg.com/736x/6c/a8/64/6ca864fba1b35bab17f441496c9baae2.jpg"
    },
    {
        Title: "Matshuka Ultrafunk",
        singer: "Tatiana Kurtukova",
        src: "Assets/songs/Believer - Imagine Dragons.mp3",
        poster: "https://i.pinimg.com/736x/ff/58/93/ff5893eef886e7a686fd44b578766805.jpg"
    },
    {
        Title: "Skyfall",
        singer: "Adale",
        src: "Assets/songs/Adele - Skyfall.mp3",
        poster: "https://i.pinimg.com/736x/3a/b3/39/3ab33958577c2455cbfc761bc5d8100a.jpg"
    },
    {
        Title: "Suzume",
        singer: "RADWIMPS",
        src: "Assets/songs/Suzume no Tojimari『Suzume』Theme Song.mp3.mp3",
        poster: "https://i.pinimg.com/736x/7e/18/91/7e189184bb1753c066a06c3f67ac5de1.jpg"
    }
]

function playsong(index) {
    currentIndex = index;
    currentsong.src = songs[index].src;
    currentsong.play();
    playbtn.src = "Assets/images/pause-circle.svg";

    // update playbar title
    document.querySelector(".playbartitle h4").innerText = songs[index].Title;

    // update poster 
    document.querySelector(".playbarimage").src = songs[index].poster;

    //update singer name 
    document.querySelector(".singername").innerText = songs[index].singer;
}

let playbtn = document.getElementById("playbarplaybtn");

playbtn.addEventListener("click", () => {

    if (currentsong.paused) {
        currentsong.play();
        playbtn.src = "Assets/images/pause-circle.svg"
    }
    else {
        currentsong.pause();
        playbtn.src = "Assets/images/play.svg"
    }
})

let seekbar = document.getElementById("seekbar");
let currentTime = document.getElementById("currentTime");
let duration = document.getElementById("duration")

currentsong.addEventListener("timeupdate", () => {

    let progress = (currentsong.currentTime / currentsong.duration) * 100;
    seekbar.value = progress;

    currentTime.innerText = formatTime(currentsong.currentTime);
    duration.innerText = formatTime(currentsong.duration);
});

seekbar.addEventListener("input", () => {
    currentsong.currentTime = (seekbar.value / 100) * currentsong.duration;
});

function formatTime(time) {
    if (isNaN(time)) return "00:00";

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (seconds < 10) seconds = "0" + seconds;

    return `${minutes}:${seconds}`
}


function nextsong() {
    currentIndex = (currentIndex + 1) % songs.length;
    playsong(currentIndex);
}

function prevsong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playsong(currentIndex);
}

document.getElementById("nextBtn").addEventListener("click", nextsong);
document.getElementById("prevBtn").addEventListener("click", prevsong);

currentsong.addEventListener("ended", nextsong);

let container = document.querySelector(".spotifyPlaylist")

songs.forEach((song, index) => {
    container.innerHTML += `
    <div class="card" data-index="${index}">
            <div class="playlistThumbnail">
                <img class="thumbnail" src="${song.poster}">
                <img class="playbtn" src="Assets/images/play-button.png" alt="">
            </div>
            <h3>${song.Title}</h3>
            <p class="singername">${song.singer}</p>
        </div>
        `;
});


let cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        playsong(index);
    });
});


currentsong.addEventListener("loadedmetadata" , ()  => {
    duration.innerText = formatTime(currentsong.duration);
})