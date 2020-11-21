"use strict"

let prec = 2;
let result = 0;
let answers = [];
let error_log = [];
var degree_mode = true;
let normal_display = true;

let eval_input = document.getElementById("eval-input");
let eval_result = document.getElementById("eval-result");
let prec_display = document.getElementById("prec-display");
let prec_increase = document.getElementById("prec-increase");
let prec_decrease = document.getElementById("prec-decrease");
let mode_toggle = document.getElementsByName("mode");
let display_toggle = document.getElementsByName("display-style");

eval_input.value = "";
prec_display.innerHTML = `Precision: ${prec}`;
eval_result.innerHTML = `${result.toFixed(prec)}`;

function transferAns() {
    eval_input.value = eval_result.innerHTML;
}

function calculate(literal) {
    if(literal == 1) {
        eval_input.value="lcm 6*2 10+3 4^2";
        startEval();
        window.scrollTo(0,0);
    }
    else if(literal == 2) {
        eval_input.value="(sin42)^2 + (cos42)^2";
        startEval();
        window.scrollTo(0,0);
    }
    else if(literal == 3) {
        eval_input.value="1/sqrt(#mvp * #evp)";
        startEval();
        window.scrollTo(0,0);
    }
}

function displayPrec() {

    if (prec == 0) {
        prec_decrease.style.display = "none";
    }
    else if (prec == 12) {
        prec_increase.style.display = "none";
    }
    else {
        prec_decrease.style.display = "block";
        prec_increase.style.display = "block";
    }
    prec_display.innerHTML = `Precision: ${prec}`;

    if(normal_display) {
        eval_result.innerHTML = `${result.toFixed(prec)}`;
    }
    else {
        eval_result.innerHTML = `${result.toExponential(prec)}`;
    }
}

function increasePrec() {
    prec++;
    displayPrec();
}

function decreasePrec() {
    prec--;
    displayPrec();
}

function startEval() {

    if(mode_toggle[0].checked) {
        degree_mode = true;
    }
    else {
        degree_mode = false;
    }

    if(display_toggle[0].checked) {
        normal_display = true;
    }
    else {
        normal_display = false;
    }

    reader.parse(eval_input.value);
    answers = [];

    if(reader.getLength() == 0) {
        result = 0;
        eval_result.innerHTML = `${result.toFixed(prec)}`
    }
    else {
        error_log = [];
        result = evaluater.evaluate(reader.getEquation(), 0, reader.getLength());

        if(Number.isNaN(result) || result === undefined) {
            eval_result.innerHTML = "";
            for(let error of error_log) {
                eval_result.innerHTML += `(${error}) `
            }
        }
        else {
            if(answers.length == 0) {
                if(normal_display) {
                    eval_result.innerHTML = `${result.toFixed(prec)}`;
                }
                else {
                    eval_result.innerHTML = `${result.toExponential(prec)}`
                }
            }
            else {
                eval_result.innerHTML = '';
                for(let answer of answers) {
                    eval_result.innerHTML += `${answer} `
                }
            }
        }
    }
}

function clearEval() {
    eval_input.value = "";
    startEval();
}

