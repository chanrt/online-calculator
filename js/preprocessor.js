"use strict"

class Reader {
    constructor() {
        this.keywords = [];
        this.equation = [];
        this.vars = [];

        // Binary operations
        this.addBinary("+", binary.add);
        this.addBinary("plus", binary.add);
        this.addBinary("add", binary.add);
        this.addBinary("and", binary.add);

        this.addBinary("*", binary.mul);
        this.addBinary("times", binary.mul);
        this.addBinary("multiply", binary.mul);

        this.addBinary("/", binary.div);
        this.addBinary("by", binary.div);
        this.addBinary("divide", binary.div);

        this.addBinary("% of", binary.percent);
        this.addBinary("%", binary.mod);
        this.addBinary("^", binary.pow);
        this.addBinary("P", binary.perm);
        this.addBinary("C", binary.comb);
        this.addBinary("log_", binary.log_base);
        this.addBinary("antilog_", binary.antilog_base);
        this.addBinary("e", binary.exponent);
        this.addBinary("frac", binary.frac);

        // Unary operations
        this.addUnary("-", unary.negate);
        this.addUnary("minus", unary.negate);
        this.addUnary("subtract", unary.negate);

        this.addUnary("~", unary.reci);
        this.addUnary("!", unary.fact);
        this.addUnary("sqrt", unary.sqrt);
        this.addUnary("cbrt", unary.cbrt);
        this.addUnary("abs", unary.abs);
        this.addUnary("floor", unary.floor);
        this.addUnary("ceil", unary.ceil);
        this.addUnary("fractional", unary.frac);
        this.addUnary("sign", unary.sign);

        this.addUnary("arcsin", unary.arcsin);
        this.addUnary("arccos", unary.arccos);
        this.addUnary("arctan", unary.arctan);

        this.addUnary("sinh", unary.sinh);
        this.addUnary("cosh", unary.cosh);
        this.addUnary("tanh", unary.tanh);

        this.addUnary("cosec", unary.cosec);
        this.addUnary("sec", unary.sec);
        this.addUnary("cos", unary.cos);
        this.addUnary("sin", unary.sin);
        this.addUnary("tan", unary.tan);
        this.addUnary("cot", unary.cot);

        this.addUnary("ln", unary.ln);
        this.addUnary("log", unary.log);
        this.addUnary("antiln", unary.antiln);

        this.addUnary("is prime", unary.is_prime);
        this.addUnary("factorize", unary.factorize);
        this.addUnary("prime factorize", unary.prime_factorize);

        this.addConst("#mvp", constant.mvp);
        this.addConst("#evp", constant.evp);
        this.addConst("#Z", constant.z0);
        this.addConst("#kc", constant.kc);
        this.addConst("#e_charge", constant.e_charge);
        this.addConst("#bohr_magn", constant.bohr_magn);
        this.addConst("#nuc_magn", constant.nuc_magn);
        this.addConst("#vkc", constant.vkc);
        
        this.addConst("#bohr_rad", constant.bohr_rad);
        this.addConst("#e_mass", constant.e_mass);
        this.addConst("#p_mass", constant.p_mass);
        this.addConst("#n_mass", constant.n_mass);
        this.addConst("#fsc", constant.fsc);
        this.addConst("#he", constant.he);
        this.addConst("#ryd", constant.ryd);

        this.addConst("#amu", constant.amu);
        this.addConst("#N", constant.N);
        this.addConst("#kb", constant.kb);
        this.addConst("#F", constant.F);
        this.addConst("#c_one", constant.c1);
        this.addConst("#c_two", constant.c2);
        this.addConst("#R", constant.R);
        this.addConst("#sb", constant.sb);
        this.addConst("#wdl", constant.wdl);

        this.addConst("#c", constant.c);
        this.addConst("#G", constant.G);
        this.addConst("#h", constant.h);
        this.addConst("#rh", constant.rh);

        this.addConst("#pi", constant.pi);
        this.addConst("#gr", constant.gr);
        this.addConst("#e", constant.e);

        this.addConst("#g", constant.g);

        for(let char_code = 97; char_code < 123; char_code++) {
            this.addVariable("?" + String.fromCharCode(char_code), char_code);
        }

        this.addMulti("lcm", multi.lcm);
        this.addMulti("hcf", multi.hcf);

        this.addMeta("(", meta.open_brac);
        this.addMeta(")", meta.close_brac);
    };
    // initialization methods
    addUnary(new_word, new_value) {
        this.keywords.push(
            {
                word: new_word,
                flag: enums.unary,
                value: new_value,
            }
        )
    }
    addBinary(new_word, new_value) {
        this.keywords.push(
            {
                word: new_word,
                flag: enums.binary,
                value: new_value,
            }
        )
    }
    addConst(new_word, new_value) {
        this.keywords.push(
            {
                word: new_word,
                flag: enums.const,
                value: new_value,
            }
        )
    }
    addVariable(new_word, new_value) {
        this.keywords.push(
            {
                word: new_word,
                flag: enums.var,
                value: new_value,
            }
        )
    }
    addMulti(new_word, new_value) {
        this.keywords.push(
            {
                word: new_word,
                flag: enums.multi,
                value: new_value,
            }
        )
    } 
    addMeta(new_word, new_value) {
        this.keywords.push(
            {
                word: new_word,
                flag: enums.meta,
                value: new_value,
            }
        )
    }
    // number methods
    initNewNum() {
        this.inside_num = false;
        this.after_point = false;
        this.new_num = 0.0;
        this.place_value = 0;
    }
    isNum(character) {
        return (character.charCodeAt(0) > 47 && character.charCodeAt(0) < 58);
    }
    getNum(character) {
        return (character.charCodeAt(0) - 48);
    }
    // string methods
    keywordAt(prompt, position, word) {
        for (let i = position; i < position + word.length; i++) {
            if (prompt[i] != word[i - position]) {
                return false;
            }
        }
        return true;
    }
    // main method
    parse(prompt) {
        this.clearEquation();
        this.initNewNum();

        for (let i = 0; i < prompt.length; i++) {
            if (this.inside_num) {
                if (this.isNum(prompt[i])) {
                    if(this.after_point) {
                        this.new_num = this.new_num + (Math.pow(10, this.place_value) * this.getNum(prompt[i]));
                        this.place_value--;
                    }
                    else {
                        this.new_num = (10 * this.new_num) + this.getNum(prompt[i]);
                    }
                    this.equation.pop();
                    this.equation.push({
                        flag: enums.num,
                        value: this.new_num,
                    })
                }
                else if (prompt[i] == '.') {
                    this.after_point = true;
                    this.place_value--;
                }
                else {
                    this.initNewNum();

                    for (let keyword of this.keywords) {
                        if (this.keywordAt(prompt, i, keyword.word)) {
                            this.equation.push(
                                {
                                    flag: keyword.flag,
                                    value: keyword.value,
                                }
                            );
                            i = i + keyword.word.length - 1;
                        }
                    }
                }
            }
            else {
                if (this.isNum(prompt[i])) {
                    this.inside_num = true;
                    this.new_num = this.getNum(prompt[i]);

                    this.equation.push(
                        {
                            flag: enums.num,
                            value: this.new_num,
                        }
                    )
                }
                else if (prompt[i] == '.') {
                    this.inside_num = true;
                    this.after_point = true;
                    this.place_value--;
                }
                else {
                    for (let keyword of this.keywords) {
                        if (this.keywordAt(prompt, i, keyword.word)) {
                            this.equation.push(
                                {
                                    flag: keyword.flag,
                                    value: keyword.value,
                                }
                            );
                            if(keyword.flag == enums.var) {
                                this.vars.push(keyword.value);
                            }
                            i = i + keyword.word.length - 1;
                        }
                    }
                }
            }
        }
    }
    // equation methods
    clearEquation() {
        this.equation = [];
        this.vars = [];
    }
    getEquation() {
        return this.equation;
    }
    getLength() {
        return this.equation.length;
    }
    getVarSet() {
        return new Set(this.vars.sort((a,b) => a-b));
    }
}
let reader = new Reader();
