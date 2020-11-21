"use strict";

class Stats {
    constructor() {
        this.numbers = [];
    };
    getSD(mean) {
        let sum_of_diffs = 0;

        for(let number of this.numbers) {
            sum_of_diffs += Math.pow((number - mean), 2);
        }

        if(bessel) {
            return Math.sqrt(sum_of_diffs / (this.numbers.length - 1));
        }
        else {
            return Math.sqrt(sum_of_diffs / this.numbers.length);
        }
    }

    calculate(equation) {
        this.numbers = [];
        let sum = 0;

        for(let term of equation) {
            if(term.flag == enums.num) {
                sum += term.value;
                this.numbers.push(term.value);
            }
        }

        mean = sum / this.numbers.length;
        sd = this.getSD(mean);
    }
}

let stats = new Stats();