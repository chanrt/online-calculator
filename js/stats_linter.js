"use strict"

let prec = 2;
let mean = 0, sd = 0;
let error_log = [];
let bessel = false;

let stat_input = document.getElementById("mean-input");
let stat_result = document.getElementById("mean-result");
let prec_display = document.getElementById("prec-display");
let prec_increase = document.getElementById("prec-increase");
let prec_decrease = document.getElementById("prec-decrease");
let bessel_toggle = document.getElementsByName("correction");

prec_display.innerHTML = `Precision: ${prec}`;
stat_result.innerHTML = `&mu;: ${mean.toFixed(prec)} &sigma;: ${sd.toFixed(prec)}`;

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
    stat_result.innerHTML = `&mu;: ${mean.toFixed(prec)} &sigma;: ${sd.toFixed(prec)}`;
}

function increasePrec() {
    prec++;
    displayPrec();
}

function decreasePrec() {
    prec--;
    displayPrec();
}

function startMean() {

    if(bessel_toggle[0].checked) {
        bessel = true;
    }
    else {
        bessel = false;
    }

    reader.parse(stat_input.value);
    stats.calculate(reader.getEquation());

    if(reader.getLength() == 0) {
        mean = 0, sd = 0;
    }
    else {
        
    }
    stat_result.innerHTML = `&mu;: ${mean.toFixed(prec)} &sigma;: ${sd.toFixed(prec)}`;
}

function startError() {
    
}

