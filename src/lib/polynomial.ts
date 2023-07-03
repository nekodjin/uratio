import { ratioPrecision } from "./globals";

export class Polynomial extends Array<number> {
    constructor(...args: number[]) {
        if (args.length < 1) {
            throw new Error("polynomials must have at least one coefficient");
        }

        if (args.length !== 1) {
            super(...args);
            return;
        }

        super(1);
        this[0] = args[0];
    }

    pop() {
        if (self.length === 1) {
            throw new Error("polynomials must have at least one coefficient");
        }

        return super.pop();
    }

    unshift() {
        if (self.length === 1) {
            throw new Error("polynomials must have at least one coefficient");
        }

        return super.unshift();
    }

    evalAt(x: number) {
        let acc = 0;

        this.forEach((coeff) => {
            acc *= x;
            acc += coeff;
        });

        return acc;
    }

    get #coeffPowerPairs() {
        const coeffPowerPairs: {
            coeff: number;
            power: number;
        }[] = [];

        this.forEach((coeff, index) => {
            const power = this.length - index - 1;

            coeffPowerPairs.push({ coeff, power });
        });

        return coeffPowerPairs;
    }

    get derivative() {
        const coeffs = this.#coeffPowerPairs.map(({ coeff, power }) => {
            return coeff * power + 0;
        });

        coeffs.pop();

        return new Polynomial(...coeffs);
    }

    tangentLineAt(x: number) {
        const y = this.evalAt(x);
        const m = this.derivative.evalAt(x);
        const b = m * -x + y;
        console.log(`m = ${m}, b = ${b}`);

        return new Polynomial(m, b);
    }

    newton(initial: number) {
        let guess = initial;

        while (Math.abs(this.evalAt(guess)) > ratioPrecision) {
            guess -= this.evalAt(guess) / this.derivative.evalAt(guess);
        }

        return guess;
    }

    toString() {
        const coeffPowerPairs = this.#coeffPowerPairs;

        if (coeffPowerPairs.length === 1) {
            return `${coeffPowerPairs[0].coeff}`;
        }

        let s = "";

        coeffPowerPairs.forEach(({ coeff, power }) => {
            if (coeff === 0) return;

            if (coeff >= 0) {
                s += " + ";

                if (coeff !== 1 || power === 0) {
                    s += coeff;
                }
            } else {
                s += " - ";

                if (coeff !== -1) {
                    s += -coeff;
                } else if (power === 0) {
                    s += coeff;
                }
            }

            if (power !== 0) {
                s += "x";

                if (power !== 1) {
                    s += `^${power}`;
                }
            }
        });

        if (coeffPowerPairs[0].coeff >= 0) {
            return s.substring(3);
        } else {
            return `-${s.substring(3)}`;
        }
    }

    toHtml() {
        const s = this.toString();

        return s.replaceAll(/\^(?<power>[0-9]+)/g, (str, ...args) => {
            const groups = args[args.length - 1];

            return `<sup>${groups.power}</sup>`;
        });
    }
}
