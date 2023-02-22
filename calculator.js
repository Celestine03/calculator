var previousKey = '';
var prevPrevKey = '';
var firstNumber = 0;
var secondNumber = 0;
var total = 0;
var toReset = false;
var enteredNum = true;

// for AC key to clear and screen display after operation keys
function reset(val) {
    document.getElementById("result").innerText = val;
}
function ac() {
    previousKey = '';
    firstNumber = 0;
    secondNumber = 0;
    total = 0;
    toReset = false;
    reset(0);
}

// delete the last digit
function backspace() {
    var current = document.getElementById("result").innerText;
    var newValue = current.slice(0, -1);
    if (newValue === '') {
        document.getElementById("result").innerText = '0';
    } else {
        document.getElementById("result").innerText = newValue;
    }
    
}

// to add/remove - sign
function sign() {
    current = document.getElementById("result").innerText;
    if (current.includes('-')) {
        document.getElementById("result").innerText = current.slice(1,);
    } else {
        document.getElementById("result").innerText = '-' + current;
    }
}

// for % key calculation
function percent() {
    current = parseFloat(document.getElementById("result").innerText);
    if (previousKey === '+' || previousKey === '-') {
        newValue = current / 100 * firstNumber;
    } else {
        newValue = current / 100;
    }
    document.getElementById("result").innerText = newValue;
}

// for number keys
function num(val) {
    enteredNum = true;
    if (toReset) {
        reset(val);
        toReset = false;
    } else {
        var initial = document.getElementById("result").innerText;
        if (initial === '0') {
            document.getElementById("result").innerText = val;
        } else {
            document.getElementById("result").innerText = initial + val;
        }
    }
} 

// for decimal key
function decimal() {
    var initial = document.getElementById("result").innerText;
    if (!initial.includes('.')) {
        document.getElementById("result").innerText = initial + '.';
    }
}

// for operators
function sym(operator) {
    if (enteredNum || (!enteredNum && operator!==previousKey)) {
        if (!enteredNum) {
            previousKey = operator;
        } else {
            if (previousKey === '' || previousKey === '=') {
                firstNumber = parseFloat(document.getElementById("result").innerText);
                total = firstNumber;
                previousKey = operator;
                toReset = true;
                enteredNum = false;
            } else if (previousKey === '+') {
                secondNumber = parseFloat(document.getElementById("result").innerText);
                total = firstNumber + secondNumber;
                sym_helper(total, operator);
            } else if (previousKey === '-') {
                secondNumber = parseFloat(document.getElementById("result").innerText);
                total = firstNumber - secondNumber;
                sym_helper(total, operator);
            } else if (previousKey === 'x') {
                secondNumber = parseFloat(document.getElementById("result").innerText);
                total = firstNumber * secondNumber;
                sym_helper(total, operator);
            } else if (previousKey === '÷') {
                secondNumber = parseFloat(document.getElementById("result").innerText);
                total = firstNumber / secondNumber;
                sym_helper(total, operator);
            } 
        }
    }
}

function sym_helper(total, operator) {
    if (enteredNum) {
        document.getElementById("result").innerText = total.toString();
        toReset = true;
        firstNumber = total;
        enteredNum = false;
    } 
    previousKey = operator;
}

// for = key 
function equal() {
    secondNumber = enteredNum 
        ? previousKey === '='
            ? secondNumber
            : parseFloat(document.getElementById("result").innerText)
        : 0;
    firstNumber = previousKey === '='
        ? total
        : firstNumber;
    previousKey = previousKey === '='
        ? prevPrevKey
        : previousKey;
    if (previousKey === '+') {
        total = firstNumber + secondNumber;
        equal_helper(total);
    } else if (previousKey === '-') {
        total = firstNumber - secondNumber;
        equal_helper(total);
    } else if (previousKey === 'x') {
        total = firstNumber * secondNumber;
        equal_helper(total);
    } else if (previousKey === '÷') {
        total = firstNumber / secondNumber;
        equal_helper(total);
    }
}

function equal_helper(total) {
    document.getElementById("result").innerText = total.toString();
    prevPrevKey = previousKey;
    previousKey = '=';
    toReset = true;
}