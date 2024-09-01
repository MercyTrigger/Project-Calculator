// Keyboard support buttons 
// 0-9	0-9
// Shift + 2	Delete all
// Backspace	Backspace
// Shift + 5	%
// =	+
// -	-
// Shift + 5	%
// Shift + 8	*
// Shift + \	/
// Enter	=
// music section -------------------------------------------------------------------------------
const imgAudion = document.querySelector('#guitar');

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
// Setting music on Space key and handeling Alt key music stoppage (it won't stop after pressing Alt now)

let isAltPressed = false; // 

musicMuchacho.addEventListener('pause', () => { // pause is custom here, u can change it for anything
    if (isAltPressed) {
        musicMuchacho.play();
        isAltPressed = false;
    };
}); 

[firstNumber, secondNumber] = [null, null];

const operateType = function (operator) { // this is operator definder for typing key (+-/*) cuz regular doesn't work properly
    switch (operator) {
        default:
            return 'You typed the wrong operator!';
        case '=':
            return addFunction(firstNumber, secondNumber);       
        case '-':
            return substractionFunction(firstNumber, secondNumber);       
        case '*':
            return multiplyFunction(firstNumber, secondNumber);
        case '|':
            return divideFunction(firstNumber, secondNumber);
    };
};

addEventListener('keydown', (e) => { 

    blinkSpan.style.display = 'initial'; // stopping blinking cursor 

    // +- ------------------------------------------------------------------------------  
    if (e.key === '_' && !spanResult.innerText.includes('-') && spanResult.innerText) {
        clickMusic.play();
        spanResult.innerText = spanResult.innerText.padStart(spanResult.innerText.length + 1, '-');
    };    

    if (spanResult.innerText === String(firstNumber) && secondNumber) { // if the same numbers (first and second) arranging second from undefined
        secondNumber = undefined; // this way we can use same numbers over and over again without interfering the result with multiple operations 
        spanResult.innerText = '';
    };

    let symbols = /['-=|*%']/;

    const multyOperatorTyping = function() {
        clickMusic.play();
            moreThanOneOperator += 1;
            if (moreThanOneOperator > 1) {
                if (symbols.test(e.key) && secondNumber) {
                    operator = e.key; // e.target.innerText cuz of typing key we targeting e.key
                    spanResult.innerText = spanResult.innerText.slice(0, -1);
                } else {
                    if (!spanResult.innerText) {
                        operator = e.key;
                    } else {
                        secondNumber = parseFloat(spanResult.innerText);
                        firstNumber = operateType(operator);
                        spanResult.innerText = firstNumber;    
                        operator = e.key; 
                    };                   
                }; 
            } else {
                if (symbols.test(e.key) && !spanResult.innerText) { // in order the user pressing math signs before initialazing variables (because we're typing here's spanResult)
                    moreThanOneOperator = 0;
                };
                dotStop.style.opacity = 'initial';
                firstNumber = parseFloat(spanResult.innerText);
                spanResult.innerText = '';
                operator = e.key;
            };
    };

    if (spanResult.innerText.includes('.')) {
        // if there is a '.' preventing from typing more of them
    } else {
        if (e.key === '.' && spanResult.innerText.at(0)) { // typing '.' and making sure it's not the first symbol
            spanResult.innerText += '.';
        };
    };
    
    if (spanResult.offsetWidth > 390) { // change this to 390px so that % can perform corretly (gives NaN with large numbers otherwise
        spanResult.innerText = '';
    };

    if (e.key === ' ' && musicMuchacho.paused) {
        currentTime = musicMuchacho.currentTime;
        musicMuchacho.play();
    } else if (e.code === 'AltLeft') {
        isAltPressed = true; // music not be interrupted when pressing altleft
    } else {
        currentTime = musicMuchacho.currentTime;
        musicMuchacho.pause();
    };

    // keyboard support 
    switch (e.key) {
        case 'Backspace':
            spanResult.innerText = spanResult.innerText.slice(0, -1);
            clickMusic.play();
            break;
        case '0':
            spanResult.innerText += '0';
            clickMusic.play(); // when typing adding click iphone effect
            break;
        case '1':
            spanResult.innerText += '1';
            clickMusic.play();
            break;
        case '2':
            spanResult.innerText += '2';
            clickMusic.play();
            break;
        case '3':
            spanResult.innerText += '3';
            clickMusic.play();
            break;
        case '4':
            spanResult.innerText += '4';
            clickMusic.play();
            break;
        case '5':
            spanResult.innerText += '5';
            clickMusic.play();
            break;
        case '6':
            spanResult.innerText += '6';
            clickMusic.play();
            break;
        case '7':
            spanResult.innerText += '7';
            clickMusic.play();
            break;
        case '8':
            spanResult.innerText += '8';
            clickMusic.play();
            break;
        case '9':
            spanResult.innerText += '9';
            clickMusic.play();
            break;
        case '@':
            clickMusic.play();
            spanResult.style.fontSize = '40px'; 
            dotStop.style.opacity = 'initial'; // resetting visually dot stoppage
            spanResult.innerText = '';    
            [firstNumber, secondNumber] = [null, null];
            moreThanOneOperator = 0;        
            break;
        case '%':
            clickMusic.play();
            if (spanResult.innerText === '') {
                if (firstNumber) {
                    spanResult.innerText = firstNumber; // is case we switching from +-*/ to %
                    spanResult.innerText =  parseFloat(spanResult.innerText) / 100;
                } else {
                    // in case it's empty
                };
            } else { // regular working scenario when there is spanResult.innerText
                blinkSpan.style.display = 'none';
                dotStop.style.opacity = 'initial';
                spanResult.style.fontSize = '33px'; // to prevent overriding the screen
                let plainAnswer = parseFloat(spanResult.innerText) / 100;
                spanResult.innerText =  plainAnswer;
            }; 
            break;
        case '=':
            multyOperatorTyping();
            break;            
        case '-':
            multyOperatorTyping();
            break;
        case '*':
            multyOperatorTyping();
            break;
        case "|":
            multyOperatorTyping();
            break;
        case 'Enter':
            clickMusic.play();            
                if (e.key === 'Enter' && secondNumber) {
                    if (e.key === 'Enter' && !spanResult.innerText) { // in case there is firstNumber but instead of regular +-/* goes Enter
                        alert('Please, assign the right math symbol, not "="');
                    } else {
                        dotStop.style.opacity = 'initial';
                        blinkSpan.style.display = 'none'; // stopping blinking cursor
                        secondNumber = parseFloat(spanResult.innerText);
                        result = spanResult.innerText = operateType(operator);
                    };
                } else {                    
                    if (e.key === 'Enter' && !spanResult.innerText) { // in case there is firstNumber but instead of regular +-/* goes Enter
                        alert('Please, assign the right math symbol, not "="');
                    } else {
                        dotStop.style.opacity = 'initial';
                        blinkSpan.style.display = 'none'; // stopping blinking cursor
                        secondNumber = parseFloat(spanResult.innerText);
                        result = spanResult.innerText = operateType(operator);
                    };
                } // magic here, as we have 2 variables to store values and it operates
            moreThanOneOperator = 0;      
    };
    if (spanResult.offsetWidth > 360) { // removing locale to shorten the result and smaller font (screen overrideng issue)
        if (result) {
            spanResult.style.fontSize = '35px'; 
            result = spanResult.innerText = operateType(operator);
        }; // if here because of '%' operand works incorrectly (NaN)
    }; 
});

// opacity when hovering on buttons -----------------------------------------------------------------

currentValue.addEventListener('mouseover', e => {
    e.target.style.opacity = '.5';
    container.style.opacity = '1'; // in case not to trigger their container when hovering
});

currentValue.addEventListener('mouseout', e => {
    e.target.style.opacity = 'initial';
    container.style.opacity = '1';
});


if (screen.width > 500) {
    document.body.appendChild(divCustom); // adding for tabletes and laptops
} else {
     // for phones we removing custom cursor
}

// custom cursor section --------------------------------------------------------------------------

const divCustom = document.createElement('div');
divCustom.style.cssText = 'height: 60px; width: 60px; border-radius: 50%; background: #eeeee4; opacity: .9; position: fixed; display: none; pointer-events: none; z-index: 9999;'; // fixed prevents from scrolling

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



// cursor sound affect and animation when clicking

const divParent = document.body.querySelector('.parent');

const clickMusic = new Audio('./music/click.mp3');


divParent.addEventListener('mousedown', () => {
    divCustom.style.opacity = '.6';
    clickMusic.play()
});

divParent.addEventListener('mouseup', () => {
    divCustom.style.opacity = '.9';
});


// blinking cursor -------------------------------------------------------------------------

const blinkSpan = document.querySelector('.blink');


let value = true;

let interval = setInterval(() => {
    if (value) {
        blinkSpan.style.opacity = '1';
        value = false;
    } else {
        blinkSpan.style.opacity = '0';
        value = true;
    };    
}, 450);
