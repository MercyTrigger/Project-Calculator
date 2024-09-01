let firstNumber, operator, secondNumber;


const addFunction = function (...args) {
    const wrongNumber = args.some(arg => isNaN(arg)); // also works as substraction cuz of e.target.innerText in case '-' inside span
    return wrongNumber ? "Wrong data type!" : args.reduce((total, current) => total + current);    
};

const substractionFunction = function (...args) {
    const wrongNumber = args.some(arg => isNaN(arg)); // also works as substraction cuz of e.target.innerText in case '-' inside span
    return wrongNumber ? "Wrong data type!" : args.reduce((total, current) => total - current);
};

const multiplyFunction = function (...args) {
    const wrongNumber = args.some(arg => isNaN(arg));
    return wrongNumber ? "Wrong data type!" : args.reduce((total, current) => total * current);
};

const divideFunction = function (...args) {
    const wrongNumber = args.some(arg => isNaN(arg));
    return wrongNumber ? "Wrong data type!" : args.reduce((total, current) => {
        if (current === 0) {
            dotStop.style.opacity = 'initial'; // resetting visually dot stoppage
            blinkSpan.style.display = 'initial'; // returning blinking cursor each time after '='
            moreThanOneOperator = 0;          
            [firstNumber, secondNumber] = [null, null] // resettinng numbers, so we could work with different cases
            spanResult.innerText = '';  
            alert('Can\'t be divided by 0, dummy!');
            return ''; // if we return alert() no value is being returned and because of this - undefined
        } else {
            return total / current;            
        }; 
    });
};

const operate = function (operator) {
    switch (operator) {
        default:
            return 'You typed the wrong operator!';
        case '+':
            return addFunction(firstNumber, secondNumber);       
        case '-':
            return substractionFunction(firstNumber, secondNumber);       
        case '*':
            return multiplyFunction(firstNumber, secondNumber);
        case '/':
            return divideFunction(firstNumber, secondNumber);
    };
};


// DOM math

const spanResult = document.querySelector('#result');
const divC = document.querySelector('#delete');
const currentValue = document.querySelector('.parent');
const dotStop = document.querySelector('#dot');
const container = document.querySelector('.container');



let clickHandler, moreThanOneOperator, equalOnce, result;

moreThanOneOperator = 0;

[firstNumber, secondNumber] = [null, null] // resettinng numbers, so we could work with different cases


currentValue.addEventListener('click', (e) => {   
    
    blinkSpan.style.display = 'initial'; // stopping blinking cursor 
    

    if (spanResult.innerText === String(firstNumber) && secondNumber) { // if the same numbers (first and second) arranging second from undefined
        secondNumber = undefined; // this way we can use same numbers over and over again without interfering the result with multiple operations 
        spanResult.innerText = '';
    };

    spanResult.style.fontSize = '40px'  // initial size for the font (if the previous result overrode the screen - implemented 35px)

    if (spanResult.offsetWidth > 360) {
        // if the input overrides the result screen, it stops
    } else {
        spanResult.append(e.target.innerText); // otherwise it appends to the screen
    }; 

    if (e.target.alt === 'backspace icon' || e.target.id === 'backspace') { // making sure that it is a backspace and not the other img (guitar), grabbing img and its div here 
        let slicingBack = spanResult.innerText.slice(0, -1);
        spanResult.innerText = slicingBack; // deleting one by one
    };

    if (spanResult.innerText.includes('.')) { // we're handeling multy dot case when doing maths on #dot button there
        if (spanResult.innerText.at(0).includes('.')) {
            spanResult.innerText = ''; // preventing . to be the first symbol in spanResult.innerText
        };
        if (!clickHandler) {
            clickHandler = (e) => {
                e.stopPropagation();
            };
            dotStop.addEventListener('click', clickHandler);
        };
    } else {
        dotStop.removeEventListener('click', clickHandler);
        clickHandler = null;
    }; 

    if (spanResult.innerText.includes('=')) { // it is an event for '=' sign, so when there is an answer it will not be changed when I click '=' button after operation 
        if (!equalOnce) {
    
            equalOnce = (e) => {
                e.stopPropagation();
            };
            document.querySelector('#equal').addEventListener('click', equalOnce);   
        };
    } else {
        document.querySelector('#equal').removeEventListener('click', equalOnce);
        equalOnce = null;
    };

    if (e.target.id === '') { // if the user pressing on the whole .container, it'll be wipped out (I don't know how to do it differently) 
        if (e.target.alt === 'backspace icon' || e.target.alt === 'person with guitar icon' || e.target.id === 'guitar') { // not to trigger img (they have the same id of '')
        } else {
            spanResult.innerText = '';
            alert('Please, press on the buttons directly');
        };       
    };

    let symbols = /['+-/*%=']/;

    const multyOperator = function() {
        moreThanOneOperator += 1;
            if (moreThanOneOperator > 1) {
                if (symbols.test(spanResult.innerText.at(0))) {
                    operator = e.target.innerText;
                    spanResult.innerText = spanResult.innerText.slice(0, -1);
                    if (spanResult.innerText) { // in case I use +- for the second number
                        secondNumber = parseFloat(spanResult.innerText);
                        firstNumber = operate(operator);
                        spanResult.innerText = firstNumber;    
                        operator = e.target.innerText;   
                    };
                } else {
                    secondNumber = parseFloat(spanResult.innerText);
                    firstNumber = operate(operator);
                    spanResult.innerText = firstNumber;    
                    operator = e.target.innerText;    
                };  
            } else {
                if (symbols.test(spanResult.innerText.at(0)) && !firstNumber) { // in order the user pressing math signs before initialazing variables
                    moreThanOneOperator = 0;  
                    spanResult.innerText = spanResult.innerText.slice(0, -1);
                    if (spanResult.innerText) { // in case I use +- for the first number
                        firstNumber = parseFloat(spanResult.innerText);
                        spanResult.innerText = '';
                        operator = e.target.innerText; 
                        moreThanOneOperator += 1;
                    };
                } else {
                    dotStop.style.opacity = 'initial';
                    firstNumber = parseFloat(spanResult.innerText);
                    spanResult.innerText = '';
                    operator = e.target.innerText;    
                }
               
            };
    }; // function for making everythingc clean in math part
    
    switch (e.target.innerText) {        
        case 'C':
            dotStop.style.opacity = 'initial'; // resetting visually dot stoppage
            spanResult.innerText = '';  
            moreThanOneOperator = 0;          
            [firstNumber, secondNumber] = [null, null] // resettinng numbers, so we could work with different cases
            break;
        case '%':
            if (symbols.test(spanResult.innerText.at(0))) {
                if (firstNumber) { // if there is firstNumber declared
                    spanResult.innerText = firstNumber; // is case we switching from +-*/ to %
                } else { // else just removing % sign so that NaN wouldn't be thrown
                    spanResult.innerText = spanResult.innerText.slice(0, -1);
                };
            };
            if (spanResult.innerText === '') {
                // if spanResult.innerText is empty we catching NaN and doing nothing
            } else { 
                blinkSpan.style.display = 'none';
                dotStop.style.opacity = 'initial';
                spanResult.style.fontSize = '33px'; // to prevent overriding the screen
                let plainAnswer = parseFloat(spanResult.innerText) / 100;
                spanResult.innerText =  plainAnswer;
            };            
            break;
        case '+':
            multyOperator();           
            break;
        case '-':
            multyOperator();
            break;
        case '*':
            multyOperator();
            break;
        case '/':
            multyOperator();
            break;
        case '=':
            if (spanResult.innerText === '=' && firstNumber) {
                spanResult.innerText = spanResult.innerText.slice(0, -1);
                dotStop.style.opacity = 'initial'; // resetting visually dot stoppage
                alert('Please, assign the right math symbol, not "="');
                return ''; // in case if after +-/* user decides to press = (we catching that bug)
            }
            if (e.target.innerText === '=' && firstNumber === null) {
                let slicingHack = spanResult.innerText.slice(0, -1);
                spanResult.innerText = slicingHack; // in case pressing '=' before secondNumber
            } else {
                dotStop.style.opacity = 'initial';
                blinkSpan.style.display = 'none'; // stopping blinking cursor
                secondNumber = parseFloat(spanResult.innerText);
                result = spanResult.innerText = operate(operator); // magic here, as we have 2 variables to store values and it operates
            };
            moreThanOneOperator = 0;                  
     };
     if (spanResult.offsetWidth > 360) { // removing locale to shorten the result and smaller font (screen overrideng issue)
        if (result) {
            spanResult.style.fontSize = '35px'; 
            result = spanResult.innerText = operate(operator);
        }; // if here because of '%' operand works incorrectly (NaN)
    };
}); 

