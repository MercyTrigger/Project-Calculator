let firstNumber, operator, secondNumber;

firstNumber = Number(prompt('First number: '));

operator = prompt('Operator: ');

secondNumber = Number(prompt('Second number: '));



const addFunction = function (...args) {
    const wrongNumber = args.some(arg => isNaN(arg));
    console.log(wrongNumber ? "Wrong data type!" : args.reduce((total, current) => total + current));
};

const substractFunction = function (...args) {
    const wrongNumber = args.some(arg => isNaN(arg));
    return wrongNumber ? "Wrong data type!" : args.reduce((total, current) => total - current);
};

const multiplyFunction = function (...args) {
    const wrongNumber = args.some(arg => isNaN(arg));
    return wrongNumber ? "Wrong data type!" : args.reduce((total, current) => total * current);
};

const divideFunction = function (...args) {
    const wrongNumber = args.some(arg => isNaN(arg));
    return wrongNumber ? "Wrong data type!" : args.reduce((total, current) => total / current);
};

const operate = function (operator) {
    switch (operator) {
        default:
            return 'You typed the wrong operator!';
        case '+':
            return addFunction(firstNumber, secondNumber);
        case '-':
            return substractFunction(firstNumber, secondNumber);        
        case '*':
            return multiplyFunction(firstNumber, secondNumber);
        case '/':
            return divideFunction(firstNumber, secondNumber);
    };
};

