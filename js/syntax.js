"use strict"

class Enums {
    constructor() {
        this.none = "null";
        this.var = "var";
        this.const = "const";
        this.num = "num";
        this.unary = "unary";
        this.binary = "binary";
        this.multi = "multi";
        this.meta = "meta";
    };
};
let enums = new Enums();

class UnaryOperations {
    constructor() {
        // basic unary functions
        this.negate = 1;
        this.reci = 2;
        this.fact = 3;
        this.sqrt = 4;
        this.cbrt = 5;
        this.abs = 6;
        this.floor = 7;
        this.ceil = 8;
        this.frac = 9;
        this.sign = 10;

        // trigonometric
        this.sin = 11;
        this.cos = 12;
        this.tan = 13;
        this.cosec = 14;
        this.sec = 15;
        this.cot = 16;
        this.arcsin = 17;
        this.arccos = 18;
        this.arctan = 19;
        this.sinh = 20;
        this.cosh = 21;
        this.tanh = 22;

        // logarithmic
        this.ln = 31;
        this.log = 32;
        this.antiln = 33;

        // numbers
        this.is_prime = 41;
        this.factorize = 42;
        this.prime_factorize = 43;
        this.lcm = 44;
        this.hcf = 45;
    }
};
let unary = new UnaryOperations();

class BinaryOperations {
    constructor() {
        this.add = 1;
        this.mul = 2;
        this.div = 3;
        this.floor_div = 4;
        this.mod = 5;
        this.pow = 6;
        this.perm = 7;
        this.comb = 8;
        this.log_base = 9;
        this.antilog_base = 10;
        this.exponent = 11;
        this.percent = 12;
        this.frac = 13;
    }
};
let binary = new BinaryOperations();

class Const {
    constructor() {
        this.c = 1;
        this.G = 2;
        this.h = 3;
        this.rh = 4;

        this.mvp = 5;
        this.evp = 6;
        this.z0 = 7;
        this.kc = 8;
        this.e_charge = 9;
        this.bohr_magn = 10;
        this.nuc_magn = 11;
        this.vkc = 12;

        this.bohr_rad = 13;
        this.e_mass = 14;
        this.p_mass = 15;
        this.n_mass = 16;
        this.fsc = 17;
        this.he = 18;
        this.ryd = 19;

        this.amu = 20;
        this.N = 21;
        this.kb = 22;
        this.F = 23;
        this.c1 = 24;
        this.c2 = 25;
        this.R = 26;
        this.sb = 27;
        this.wdl = 28;

        this.pi = 29;
        this.gr = 30;
        this.e = 31;

        this.g = 32;
    };
};
let constant = new Const();

class Multi {
    constructor() {
        this.lcm = 1;
        this.hcf = 2;
    }
}
let multi = new Multi();

class Meta {
    constructor() {
        this.open_brac = 1;
        this.close_brac = 2;
        this.sep = 3;
    }
}
let meta = new Meta();