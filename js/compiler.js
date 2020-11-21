"use strict"

class Evaluater {
    constructor() {
        this.unary_special = [];

        // binary functions have a priority
        this.binary_priority = [];
        this.binary_special = [];

        // number search stops if these are found
        this.search_terminators = [];

        this.initialize();
    }

    initialize() {
        this.unary_special.push(
            unary.negate,
            unary.reci,
            unary.fact,
        );

        this.binary_special.push(
            binary.log_base,
            binary.antilog_base,
            binary.frac,
        );

        this.binary_priority.push(
            binary.exponent,
            binary.percent,
            binary.perm,
            binary.comb,
            binary.pow,
            binary.log_base,
            binary.antilog_base,
            binary.mod,
            binary.floor_div,
            binary.div,
            binary.mul,
            binary.add,
            binary.frac
        );
    }

    // number functions
    getLeftNum(equation, position, start) {
        for (let i = position; i >= start; i--) {
            if (equation[i].flag == enums.num) {
                return i;
            }
        }
        return undefined;
    }

    getRightNum(equation, position, stop) {
        for (let i = position; i < stop; i++) {
            if (equation[i].flag == enums.num) {
                return i;
            }
        }
        return undefined;
    }

    getNumNums(equation, start, stop) {
        let num_nums = 0;
        for (let i = start; i < stop; i++) {
            if (equation[i].flag == enums.num) {
                num_nums++;
            }
        }
        return num_nums;
    }

    getOnlyNum(equation, start, stop) {
        if (this.getNumNums(equation, start, stop) == 1) {
            for (let i = start; i < stop; i++) {
                if (equation[i].flag == enums.num) {
                    return equation[i].value;
                }
            }
        }
        else {
            return undefined;
        }
    }

    makeNum(equation, position, value) {
        equation[position].flag = enums.num;
        equation[position].value = value;
    }

    clearIndices(equation, index1, index2) {
        if (index2 === undefined) {
            equation[index1].flag = enums.none;
            equation[index1].value = 0.0;
        }
        else {
            for (let i = index1; i <= index2; i++) {
                equation[i].flag = enums.none;
                equation[i].value = 0.0;
            }
        }
    }

    getClosingBracket(equation, position, stop) {
        let ledger = 0;

        for (let i = position; i < stop; i++) {
            if (equation[i].flag == enums.meta) {
                if (equation[i].value == meta.open_brac) {
                    ledger++;
                }
                else if (equation[i].value == meta.close_brac) {
                    ledger--;
                }
            }
            if (ledger == 0) {
                return i;
            }
        }

        // error reporting
        if(ledger == 1) {
            error_log.push(`unclosed bracket`);
        }
        else if(ledger == -1) {
            error_log.push("unopened bracket");
        }
        else if(ledger > 1) {
            error_log.push(`${Math.abs(ledger)} brackets are not closed`);
        }
        else if(ledger < -1) {
            error_log.push(`${Math.abs(ledger)} brackets are not opened`);
        }
        return undefined;
    }

    resolveBinaryIssues(equation, start, stop) {
        if(equation[start].flag == enums.binary && equation[start].value == binary.add) {
            equation[start].flag = enums.none;
        }

        for(let i = start + 2; i < stop; i++) {
            if(equation[i].flag == enums.binary && equation[i-1].flag == enums.binary) {
                if(equation[i].value == binary.add) {
                    equation[i].flag = enums.none;
                }
                if(equation[i].value == binary.div && equation[i-1].value == binary.div) {
                    equation[i-1].flag = enums.none;
                    equation[i].value = binary.floor_div;
                }
            }
        }

        if(equation[equation.length - 1].flag == enums.binary) {
            equation.pop();
        }
    }

    getSet(equation, position, stop) {
        let set = [];
        for(let i = position + 1; i < stop; i++) {
            if(equation[i].flag == enums.num) {
                set.push(equation[i].value);
            }
            else if(equation[i].flag != enums.none && equation.flag != enums.meta) {
                break;
            }
        } 
        return set;
    }

    // main function
    evaluate(equation, start, stop) {

        console.log("Received: ", equation);
        // Simplify brackets
        for (let i = start; i < stop; i++) {
            if (equation[i].flag == enums.meta) {
                if (equation[i].value = meta.open_brac) {
                    let left_index = i;
                    let right_index = this.getClosingBracket(equation, i, stop);

                    this.makeNum(equation, left_index, this.evaluate(equation, left_index + 1, right_index));
                    this.clearIndices(equation, left_index + 1, right_index);
                    i = right_index + 1;
                }
            }
        }

        // Substituting constants
        for(let i = start; i < stop; i++) {
            if(equation[i].flag == enums.const) {
                equation[i].flag = enums.num;
                equation[i].value = getConstant(equation[i].value);
            }
        }

        // Unary functions
        for (let i = stop - 1; i >= start; i--) {
            if (equation[i].flag == enums.unary) {
                let index;

                if (equation[i].value == unary.fact) {
                    index = this.getLeftNum(equation, i, start);
                }
                else {
                    index = this.getRightNum(equation, i, stop);
                }
                let unary_function = getUnaryFunction(equation[i].value);
                equation[index].value = unary_function(equation[index].value);

                if(equation[i].value == unary.negate) {
                    equation[i].flag = enums.binary;
                    equation[i].value = binary.add;
                }
                else {
                    equation[i].flag = enums.none;
                }
            }
        }

        this.resolveBinaryIssues(equation, start, stop);
        // Binary functions
        for (let operation of this.binary_priority) {
            for (let i = start; i < stop; i++) {
                if (equation[i].flag == enums.binary) {
                    if (equation[i].value == operation) {
                        let index1, index2;
                        if (this.binary_special.includes(equation[i].value)) {
                            index1 = this.getRightNum(equation, i, stop);
                            index2 = this.getRightNum(equation, index1 + 1, stop);
                        }
                        else {
                            index1 = this.getLeftNum(equation, i, start);
                            index2 = this.getRightNum(equation, i, stop);
                        }
                        let binary_function = getBinaryFunction(equation[i].value);
                        this.makeNum(equation, i, binary_function(equation[index1].value, equation[index2].value));
                        this.clearIndices(equation, index1);
                        this.clearIndices(equation, index2);
                    }
                }
            }
        }

        // Multi functions
        for(let i = 0; i < equation.length; i++) {
            if(equation[i].flag == enums.multi) {
                let set = this.getSet(equation, i, stop);
                let multi_function = getMultiFunction(equation[i].value);
                
                equation[i].flag = enums.num;
                equation[i].value = multi_function(set);
                this.clearIndices(equation, i+1, stop-1);
            }
        }

        return this.getOnlyNum(equation, start, stop);
    }
}
let evaluater = new Evaluater();




