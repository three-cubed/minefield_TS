function generateNumber(min_inclusive: number, max_inclusive: number): number {
    return Math.floor(Math.random() * (max_inclusive - min_inclusive + 1)) + min_inclusive;
}

function generate2numbers(min_X: number, max_X: number, min_Y: number, max_Y: number): number[] {
    return [generateNumber(min_X, max_X), generateNumber(min_Y, max_Y)];
}

function generateOperation(): string { // This function is used in sketch.js
    const randomNum = generateNumber(1, 5);
    let randomOperation = '*'; // 2 in 5 chance of a question being multiplication.
    if (randomNum === 3) {
        randomOperation = '+';
    } else if (randomNum === 4) {
        randomOperation = '-';
    } else if (randomNum === 5) {
        randomOperation = '/';
    }
    return randomOperation;
}

const small = [1, 10];
const midsized = [11, 99];
const large = [101, 999];
const numCombos: any[] = [
    null,
    [...small, ...small],
    [...midsized, ...small],
    [...midsized, ...midsized],
    [...large, ...midsized],
    [...large, ...large]
];

function generateCalc(level: number, operation: string): [string, number] { // This function is used in sketch.js
    const difficulty = setDifficulty(level);
    if (operation === '+' || operation === '-') {
        return createPlusMinus(operation, ...numCombos[difficulty]);
    }
    if (operation === '*' || operation === '/') {
        return createMultDiv(operation, difficulty);
    }
}

function createMultDiv(operation: string, difficulty: number): [string, number] {
    let no1, no2;
    if (difficulty === 1) {
        no1 = generateNumber(1, 6); if (no1 === 6) no1 = 10; no2 = generateNumber(1, 11);
    }
    if (difficulty === 2) {
        no1 = generateNumber(6, 11); if (no1 > 9) no1 += 1; no2 = generateNumber(2, 12);
    }
    if (difficulty === 3) {
        no1 = generateNumber(3, 12);
        no2 = generateNumber(3, 12);
        const wildCard = generateNumber(1, 4);
        if (operation === '*') {
            if (wildCard === 1) no1 *= 10;
            if (wildCard === 2) no2 *= 10;
            if (wildCard === 3) no2 *= 100;
            if (wildCard === 4) {
                no1 *= 10;
                no2 *= 10;
            }
        }
        if (operation === '/') {
            if (wildCard <= 2) no1 *= 10;
            if (wildCard > 2) no2 *= 10;
        }
    }
    if (difficulty === 4 && operation === '*') {
        const wildCard = generateNumber(1, 16);
        if (wildCard >= 5) {
            no1 = generateNumber(13, 99); no2 = generateNumber(3, 12);
        } else if (wildCard < 5) {
            no1 = generateNumber(3, 12); no2 = generateNumber(3, 12);
            if (wildCard === 1) no1 /= 10;
            if (wildCard === 2) no2 /= 10;
            if (wildCard === 3) no2 /= 100;
            if (wildCard === 4) {no1 /= 10; no2 /= 10;}
        }
    }
    if (difficulty === 4 && operation === '/') {
        no1 = generateNumber(13, 33);
        no2 = generateNumber(3, 12);
        if (no2 === 10) {
            no2 = 5;
        }
    }
    if (difficulty === 5 && operation === '*') {
        no1 = generateNumber(101, 999);
        no2 = generateNumber(3, 9);
    }
    if (difficulty === 5 && operation === '/') {
        no1 = generateNumber(41, 149);
        no2 = generateNumber(3, 12);
        if (no2 === 10) {
            no2 = 5;
        }
    }
    if (operation === '/') {
        no1 *= no2;
    }

    const question = (`${no1} ${operation} ${no2}`);
    const answer = eval(question);
    return [
        question,
        answer
    ];
}

function createPlusMinus(operation: string, min_X: number, max_X: number, min_Y: number, max_Y: number): [string, number] {
    let [no1, no2] = generate2numbers(min_X, max_X, min_Y, max_Y);
    if (operation === '-' && no1 < no2) {
        const dummy = no1;
        no1 = no2;
        no2 = dummy;
    }
    const question = (`${no1} ${operation} ${no2}`);
    const answer = eval(question);
    return [
        question,
        answer
    ];
}

function setDifficulty(level: number): number {
    const levelsPerDifficulty = 6;
    const maxDifficulty = 4;
    const difficulty = Math.floor((level + levelsPerDifficulty - 1) / levelsPerDifficulty);
    if (difficulty > maxDifficulty) return maxDifficulty;
    return difficulty;
}
