function getUnaryFunction(value) {
    switch(value) {
        case unary.negate:
            return negate;
        case unary.reci:
            return reci;
        case unary.fact:
            return fact;
        case unary.sqrt:
            return sqrt;
        case unary.cbrt:
            return cbrt;
        case unary.abs:
            return abs;
        case unary.floor:
            return floor;
        case unary.ceil:
            return ceil;
        case unary.frac:
            return fractional;
        case unary.sign:
            return sign;

        case unary.ln:
            return ln;
        case unary.log:
            return log;
        case unary.antiln:
            return antiln;

        case unary.sin:
            return sin;
        case unary.cos:
            return cos;
        case unary.tan:
            return tan;
        case unary.cosec:
            return cosec;
        case unary.sec:
            return sec;
        case unary.cot:
            return cot;

        case unary.arcsin:
            return asin;
        case unary.arccos:
            return acos;
        case unary.arctan:
            return atan;

        case unary.sinh:
            return sinh;
        case unary.cosh:
            return cosh;
        case unary.tanh:
            return tanh;

        case unary.is_prime:
            return is_prime;
        case unary.factorize:
            return factorize;
        case unary.prime_factorize:
            return prime_factorize;
    }
}

function getBinaryFunction(value) {
    switch(value) {
        case binary.add:
            return add;
        case binary.mul:
            return mul;
        case binary.div:
            return div;
        case binary.floor_div:
            return floor_div;
        case binary.mod:
            return mod;
        case binary.pow:
            return pow;
        case binary.perm:
            return perm;
        case binary.comb:
            return comb;
        case binary.log_base:
            return log_base;
        case binary.antilog_base:
            return antilog_base;
        case binary.exponent:
            return exponent;
        case binary.percent:
            return percent;
        case binary.frac:
            return frac;
    }
}

function getConstant(value) {
    switch(value) {
        case constant.c:
            return 299792458;
        case constant.G:
            return 6.673 * Math.pow(10, -11);
        case constant.h:
            return 6.62606957 * Math.pow(10, -34);
        case constant.rh:
            return 1.054571729 * Math.pow(10, -34);

        case constant.mvp:
            return 1.256637061 * Math.pow(10, -6);
        case constant.evp:
            return 8.854187817 * Math.pow(10, -12);
        case constant.z0:
            return 376.730313461;
        case constant.kc:
            return 8.987551787 * Math.pow(10, 9);
        case constant.e_charge:
            return 1.602176565 * Math.pow(10, -19);
        case constant.bohr_magn:
            return 9.27400968 * Math.pow(10, -24);
        case constant.nuc_magn:
            return 5.05078353 * Math.pow(10, -27);
        case constant.vkc:
            return 25812.8074434;

        case constant.bohr_rad:
            return 5.2917721092 * Math.pow(10, -11);
        case constant.e_mass:
            return 9.10938291 * Math.pow(10, -31);
        case constant.p_mass:
            return 1.672621777 * Math.pow(10, -27);
        case constant.n_mass:
            return 1.674927211 * Math.pow(10, -27);
        case constant.fsc:
            return 7.2973525698 * Math.pow(10, -3);
        case constant.he:
            return 4.35974434 * Math.pow(10, -18);
        case constant.ryd:
            return 10973731.568539;

        case constant.amu:
            return 1.660538921 * Math.pow(10, -27);
        case constant.N:
            return 6.02214129 * Math.pow(10, 23);
        case constant.kb:
            return 1.3806488 * Math.pow(10, -23);
        case constant.F:
            return 96485.3365;
        case constant.c1:
            return 3.74177153 * Math.pow(10, -16);
        case constant.c2:
            return 1.4387770 * Math.pow(10, -2);
        case constant.R:
            return 8.3144621;
        case constant.sb:
            return 5.670373 * Math.pow(10, -8);
        case constant.wdl:
            return 2.8977721 * Math.pow(10, -3);

        case constant.pi:
            return 3.1415926535897932384626433;
        case constant.gr:
            return 1.61803398875;
        case constant.e:
            return 2.7182818284590452353602874713527;

        case constant.g:
            return 9.80665;
    };
}

function getMultiFunction(value) {
    switch(value) {
        case multi.lcm:
            return lcm;
        case multi.hcf:
            return hcf;
    }
}

// UNARY FUNCTIONS

function negate(a) {
    return -a;
}

function reci(a) {
    if(a != 0.0) {
        return (1 / a);
    }
    else {
        error.push("division by 0 is undefined");
        return undefined;
    }
}

function sqrt(a) {
    if(a >= 0) {
        return Math.sqrt(a);
    }
    else {
        error.push("Negative numbers don't have a square root");
        return undefined;
    }
}

function cbrt(a) {
    return Math.cbrt(a);
}

function abs(a) {
    return Math.abs(a);
}

function floor(a) {
    return Math.floor(a);
}

function ceil(a) {
    return Math.ceil(a);
}

function fractional(a) {
    return (a - Math.floor(a));
}

function sign(a) {
    if(a > 0) return 1;
    else if(a < 0) return -1;
    else return 0;
}

// trigs
function sin(a) {
    if (degree_mode) {
        return Math.sin(getRadians(a));
    }
    else {
        return Math.sin(a);
    }
}

function cos(a) {
    if (degree_mode) {
        return Math.cos(getRadians(a));
    }
    else {
        return Math.cos(a);
    }
}

function tan(a) {
    if (degree_mode) {
        return Math.tan(getRadians(a));
    }
    else {
        return Math.tan(a);
    }
}

function cosec(a) {
    return 1 / sin(a);
}

function sec(a) {
    return 1 / cos(a);
}

function cot(a) {
    return 1 / tan(a);
}

// inverse trigs
function asin(a) {
    if (degree_mode) {
        return getDegrees(Math.asin(a));
    }
    else {
        return Math.asin(a);
    }
}

function acos(a) {
    if (degree_mode) {
        return getDegrees(Math.acos(a));
    }
    else {
        return Math.acos(a);
    }
}

function atan(a) {
    if (degree_mode) {
        return getDegrees(Math.atan(a));
    }
    else {
        return Math.atan(a);
    }
}

function sinh(a) {
    if(degree_mode) {
        return Math.sinh(getRadians(a));
    }
    else {
        return Math.sinh(a);
    };
}

function cosh(a) {
    if(degree_mode) {
        return Math.cosh(getRadians(a));
    }
    else {
        return Math.cosh(a);
    }
}

function tanh(a) {
    if(degree_mode) {
        return Math.tanh(getRadians(a));
    }
    else {
        return Math.tanh(a);
    }
}

// factorial
function fact(a) {
    if (a < 0) {
        error_log.push("factorials are not defined for negative numbers");
        return undefined;
    }
    else if (a - a.toFixed(0) != 0.0) {
        error_log.push("factorials are not defined for fractional numbers");
        return undefined;
    }
    else {
        let ans;
        for (ans = 1; a > 0; a--) {
            ans *= a;
        };
        return ans;
    }
}

//logarithms
function ln(a) {
    if (a < 0) {
        error_log.push("log is not defined for numbers <= 0")
        return undefined;
    }
    else {
        return Math.log(a);
    }
}

function log(a) {
    if (a < 0) {
        error_log.push("log is not defined for numbers <= 0")
        return undefined;
    }
    else {
        return (Math.log(a) / Math.log(10));
    }
}

function antiln(a) {
    return Math.pow(Math.E, a);
}

// number functions

function is_prime(a) {

    if(a <= 0 || a - a.toFixed(0) != 0.0) {
        error_log.push("not a natural number");
        return undefined;
    }
    else if(a == 1) {
        answers.push("1 is neither prime nor composite");
        return false;
    }
    else if(a == 2 || a == 3) {
        answers.push("true");
        return true;
    }
    else if(a % 2 == 0 || a % 3 == 0) {
        answers.push("false");
        return false;
    }
    else {
        let upper_limit = Math.ceil(Math.sqrt(a));

        for(let i = upper_limit; upper_limit > 3; upper_limit--) {
            if(a % upper_limit == 0) {
                answers.push("false");
                return false;
            }
        }
        answers.push("true");
        return true;
    }
}

function factorize(a) {

    if(a <= 0 || a - a.toFixed(0) != 0.0) {
        error_log.push("not a natural number");
        return undefined;
    }
    else {
        for(let i = 1; i <= a; i++) {
            if(a % i == 0) {
                answers.push(i);
            }
        }
        return 1;
    }
}

function prime_factorize(a) {

    if(a <= 0 || a - a.toFixed(0) != 0.0) {
        error_log.push("not a natural number");
        return undefined;
    }
    else {
        for(let i = 2; i <= a; i++) {
            if(a % i == 0 && is_prime_lite(i)) {
                answers.push(i);
            }
            
        }
        return 1;
    }
}

// BINARY FUNCTIONS

function add(a, b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    if (b != 0.0) {
        return a / b;
    }
    else {
        error_log.push("division by zero is undefined");
        return undefined;
    }
}

function floor_div(a, b) {
    if (b != 0.0) {
        return Math.floor(a/b);
    }
    else {
        error_log.push("division by zero is undefined");
        return undefined;
    }
}

function pow(a, b) {
    if (a != 0.0 || b != 0.0) {
        return Math.pow(a, b);
    }
    else {
        error_log.push("0^0 is indeterminate");
        return undefined;
    }
}

function mod(a, b) {
    return (a % b);
}

function perm(n, r) {
    return (fact(n) / fact(n-r));
}

function comb(n, r) {
    return (fact(n) / (fact(r) * fact(n-r)));
}

function log_base(base, a) {
    if (base <= 0) {
        error_log.push("log is not defined for bases <= 0");
        return undefined;
    }
    if (a < 0) {
        error_log.push("log is not defined for numbers <= 0");
        return undefined;
    }
    return (Math.log(a) / Math.log(base));
}

function antilog_base(base, a) {
    return Math.pow(base, a);
}

function exponent(mantissa, exp) {
    return (mantissa * Math.pow(10, exp));
}

function percent(a, b) {
    return ((a/100) * b);
}

function frac(a, b) {
    return (a / b);
}

// multi functions
function lcm(numbers) {
    let biggest_num = getBiggest(numbers);
    let lcm = biggest_num;
    let all_divisible = true;

    while(lcm < Infinity) {
        all_divisible = true;
        for(let number of numbers) {
            if(lcm % number != 0.0) {
                all_divisible = false;
                break;
            } 
        }
        if(all_divisible) {
            answers.push(lcm);
            return lcm;
        }
        else {
            lcm += biggest_num;
        }
    }
}

function hcf(numbers) {

}

// helper functions
function getDegrees(radians) {
    return (180 * radians / Math.PI);
}

function getRadians(degrees) {
    return (Math.PI * degrees / 180);
}

function is_prime_lite(a) {
    if(a == 2 || a == 3) {
        return true;
    }
    else if(a % 2 == 0 || a % 3 == 0) {
        return false;
    }
    else {
        let upper_limit = Math.ceil(Math.sqrt(a));

        for(let i = upper_limit; upper_limit > 3; upper_limit--) {
            if(a % upper_limit == 0) {
                return false;
            }
        }
        return true;
    }
}

function getBiggest(numbers) {
    let biggest = -Infinity;

    for(let number of numbers) {
        if(number > biggest) {
            biggest = number;
        }
    }
    return biggest;
}

