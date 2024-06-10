// music section -------------------------------------------------------------------------------
const imgAudion = document.querySelector('.guitar');

const musicMuchacho = new Audio();
musicMuchacho.src = './music/guitarSong.mp4';
musicMuchacho.loop = true // play it in a loop (unstoppable)

let currentTime = 0; // Store the current time of the audio

imgAudion.addEventListener('click', () => {
    if (musicMuchacho.paused) {
        musicMuchacho.currentTime;
        musicMuchacho.play();
    } else {
        currentTime = musicMuchacho.currentTime;
        musicMuchacho.pause();
    };
});
  // credit Ukulele x Guitar Type Beat "Your Pain" (Sad R&B / Rap Hip Hop Instrumental)

// Setting music on Space key
addEventListener('keydown', (e) => { 
    if (e.key === ' ' && musicMuchacho.paused) {
        currentTime = musicMuchacho.currentTime;
        musicMuchacho.play();
    } else {
        currentTime = musicMuchacho.currentTime;
        musicMuchacho.pause();
    };
});

let isAltPressed = false; // handeling Alt key music stoppage (it won't stop after pressing Alt now)

addEventListener('keydown', (e) => {
    if (e.code === 'AltLeft') {
        isAltPressed = true;
    };
});

musicMuchacho.addEventListener('pause', () => {
    if (isAltPressed) {
        musicMuchacho.play();
        isAltPressed = false;
    };
})


// custom cursor section --------------------------------------------------------------------------

const divCustom = document.createElement('div');
divCustom.style.cssText = 'height: 60px; width: 60px; border-radius: 50%; background: #eeeee4; opacity: .9; position: fixed; display: none; pointer-events: none; z-index: 9999;'; // fixed prevents from scrolling
document.body.appendChild(divCustom);

document.addEventListener('mousemove', (event) => {
    divCustom.style.display = 'initial';
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    divCustom.style.left = `${mouseX - (divCustom.offsetWidth / 2)}px`; // centeres it exactly where the mouse is x
    divCustom.style.top = `${mouseY - (divCustom.offsetHeight / 2)}px`; // centeres it exactly where the mouse is y
});

document.addEventListener('mouseleave', () => {
    divCustom.style.display = 'none';
});





