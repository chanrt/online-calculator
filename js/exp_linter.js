"use strict";

function loadExp(exp) {
    if(exp == "simple interest") {
        exp_input.value = "?p * ?r * ?t / 100";
    }
    else if(exp == "compound interest") {
        exp_input.value = "?p * (1 + ?r / 100)^?t"
    }
    else if(exp == "density-unit-cell") {
        exp_input.value = "(?z * ?m) / (#N * ?a^3)"
    }
    else if(exp == "time-dilation") {
        exp_input.value = "?t / sqrt(1 - (?v / #c)^2)"
    }
    window.scrollTo(0,0);
    startExp();
}

let prec = 2;
let result = 0;

let equation = [];
let equation_length = 0;

let variables = [];
let variable_values = [];
let error_log = [];

var degree_mode = true;
let normal_display = true;

let exp_input = document.getElementById("exp-input");
let exp_result = document.getElementById("exp-result");
let var_car = document.getElementById("var-car");

let prec_display = document.getElementById("prec-display");
let prec_increase = document.getElementById("prec-increase");
let prec_decrease = document.getElementById("prec-decrease");

let mode_toggle = document.getElementsByName("mode");
let display_toggle = document.getElementsByName("display-style");

prec_display.innerHTML = `Precision: ${prec}`;
exp_result.innerHTML = `${result.toFixed(prec)}`;
exp_input.value = "";

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

    if (normal_display) {
        exp_result.innerHTML = `${result.toFixed(prec)}`;
    }
    else {
        exp_result.innerHTML = `${result.toExponential(prec)}`;
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

function startExp() {
    
    variables = [];
    error_log = [];
    var_car.innerHTML = "";

    reader.parse(exp_input.value);
    equation = reader.getEquation();
    equation_length = reader.getLength();

    if (reader.getLength() == 0) {
        result = 0;
        exp_result.innerHTML = `${result.toFixed(prec)}`;
    }
    else {
        variables = reader.getVarSet();
        console.log("Variables: ", variables);

        if (variables.size == 0) {
            displayResult();
        }
        else {
            for (let variable of variables) {
                var_car.innerHTML += `
                <center>
                    <input class="input flow-text" type="text" id="var-${variable}" name="calculation" placeholder="Enter value of ${String.fromCharCode(variable)}" oninput="obtainVars()">
                </center>`;

            }
        }
    }
}

function toggles() {

    if (mode_toggle[0].checked) {
        degree_mode = true;
    }
    else {
        degree_mode = false;
    }
    if (display_toggle[0].checked) {
        normal_display = true;
    }
    else {
        normal_display = false;
    }

    displayResult();
}

function displayResult() {

    console.log("Equation being evaluated: ", JSON.parse(JSON.stringify(equation)));
    result = evaluater.evaluate(equation, 0, equation_length);

    if (Number.isNaN(result) || result === undefined) {
        exp_result.innerHTML = "";
        for (let error of error_log) {
            exp_result.innerHTML += `(${error}) `
        }
        error_log = [];
    }
    else if (normal_display) {
        console.log("Normal display");
        exp_result.innerHTML = `${result.toFixed(prec)}`;
    }
    else {
        console.log("Scientific display");
        exp_result.innerHTML = `${result.toExponential(prec)}`;
    }
}

function obtainVars() {
    for (let variable of variables) {
        variable_values.push(Number.parseFloat(document.getElementById(`var-${variable}`).value));
    }
    console.log("Variable values: ", variable_values);
    if (variable_values.includes(NaN)) {
        variable_values = [];
    }

    if (variables.size == variable_values.length) {
        substituteVars();
        displayResult();
    }
    variable_values = [];
    reader.parse(exp_input.value);
    equation = reader.getEquation();
    equation_length = reader.getLength();
}

function substituteVars() {
    for (let i = 0; i < equation_length; i++) {
        if (equation[i].flag == enums.var) {
            equation[i].value = variable_values[Array.from(variables).indexOf(equation[i].value)];
            equation[i].flag = enums.num;
        }
    }
}

function clearExp() {
    exp_input.value = "";
    startExp();
}


