// let a = ''; // first number
// let b = ''; // second number
// let sign = ''; // знак операции
// let finish = false;
//
// const digit =['0','1','2','3','4','5','6','7','8','9','.'];
// const action = ['-','+','*','/'];
//
// // экран
// const out = document.querySelector('.calc-screen p');
//
// function clearAll () {
//     a = ''; // first number
//     b = ''; // second number
//     sign = ''; // знак операции
//     finish = false;
//     out.textContent = 0;
// }
// document.querySelector('.ac').onclick = clearALL
//
// document.querySelector('.buttons').onclick = (event) => {
//     // нажата не кнопка
//     if (!event.target.classList.contains('btn')) return;
//     //нажата кнопка clearAll ac
//     if (event.target.classList.contains('ac')) return;
//
//     out.textContent = '';
//     // получаю нажатую кнопку
//     const key = event.target.textContent;
//
//     //если нажата клавиша 0-9 или .
//     if (digit.includes(key)) {
//         if (b === '' && sign === '') {
//             a += key;
//
//             console.log(a, b, sign);
//             out.textContent = a;
//         }
//         else if (a!=='' && b!=='' && finish){
//             b = key;
//             finish = false;
//             out.textContent = b;
//         }
//         else{
//             b += key;
//             out.textContent = a;
//         }
//         console.table(a, b, sign);
//         return;
//     }
//
//     // если клавиша нажата + - * /
//     if (action.includes(key)) {
//         sign = key;
//         out.textContent = sign;
//         console.table(a, b, sign);
//         return;
//
//         // нажата =
//         if (key === '=') {
//             if (b ==='') b = a;
//             switch (sign) {
//                 case "+":
//                          a = (+a) + (+b);
//                          break;
//                 case "-":
//                          a = a - b;
//                          break;
//                 case "*":
//                          a = a * b;
//                          break;
//                 case "/":
//                     if (b === '0'){
//                         out.textContent = 'ошибка';
//                         a = '';
//                         b = '' ;
//                         sign = '' ;
//                         return;
//                     }
//                          a = a / b;
//                          break;
//             }
//             finish = true;
//             out.textContent = a;
//             console.table(a, b, sign);
//         }
//     }
// }





"use strict";

var input = document.getElementById('input'), // input/output button
    number = document.querySelectorAll('.numbers div'), // number buttons
    operator = document.querySelectorAll('.operators div'), // operator buttons
    result = document.getElementById('result'), // equal button
    clear = document.getElementById('clear'), // clear button
    resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {

        // storing current input string and its last character in variables - used later
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // if result is not diplayed, just keep adding
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            // if result is currently displayed and user pressed an operator
            // we need to keep on adding to the string for next operation
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            // if result is currently displayed and user pressed a number
            // we need clear the input string and add the new input to start the new opration
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }

    });
}

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {

        // storing current input string and its last character in variables - used later
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // if last character entered is an operator, replace it with the currently pressed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            // if first key pressed is an opearator, don't do anything
            console.log("enter a number first");
        } else {
            // else just add the operator pressed to the input
            input.innerHTML += e.target.innerHTML;
        }

    });
}

// on click of 'equal' button
result.addEventListener("click", function() {

    // this is the string that we will be processing eg. -10+26+33-56*34/23
    var inputString = input.innerHTML;

    // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    var numbers = inputString.split(/\+|\-|\×|\÷/g);

    // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
    // first we replace all the numbers and dot with empty string and then split
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    // now we are looping through the array and doing one operation at a time.
    // first divide, then multiply, then subtraction and then addition
    // as we move we are alterning the original numbers and operators array
    // the final element remaining in the array will be the output

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation :)
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; // displaying the output

    resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
})

