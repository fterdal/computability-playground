const { red, green } = require('chalk');

// const valid = 'let a;';

// const invalid = 'let 1;';

// const logIt = "console.log('hello')";

// try {
//   eval(valid);
//   eval(invalid);
// } catch (err) {
//   console.log(err);
// }
// eval(logIt); // It logs!

let failedAttempts = 0;
let successfulAttempts = 0;
let successes = [];

function removeCapitals(arr) {
  return [...new Set(arr.map((char) => char.toLowerCase()))];
}

// We use a throttled function to keep track of how much time remains and
// reporting to the user
const throttle = (fn, wait) => {
  let lastCalled = null;
  return function (...args) {
    if (!lastCalled || Date.now() - lastCalled >= wait) {
      lastCalled = Date.now();
      return fn.apply(this, args);
    }
  };
};

const constructStr = (num, alphabet = ['a', 'b', 'c']) => {
  alphabet = [null, ...alphabet]
  let indices = [];
  const base = alphabet.length;
  while (num !== 0) {
    const rem = num % alphabet.length;
    const quotient = parseInt(num / base);
    // console.log({ rem, quotient });
    if (rem === 0) return null;
    indices.unshift(rem);
    num = quotient;
  }
  const result = indices.map((idx) => alphabet[idx]).join('');
  // console.log(result);
  return result;
};

// We'll use all the characters corresponding to Unicode numbers 32 - 126, and
// then subtract the capital letters.
// While this isn't quite a complete set of characters, it'll cover most of the
// relevant symbols that we generally use when coding. We're subtracting
// capital letters purely so that we have fewer combinations to check (but
// feel free to add them back in if you like).

function generateAllPrograms(timeLimit = 100, alphabet) {
  const startTime = new Date();

  if (alphabet === undefined) {
    alphabet = [];
    for (let i = 32; i < 127; i++) {
      alphabet.push(String.fromCharCode(i));
    }
    // If you want to leave the capitals in, feel free to comment out this line
    alphabet = removeCapitals(alphabet);
  }

  const throttledCheckTime = throttle(() => {
    const timeElapsed = new Date() - startTime;
    if (timeElapsed > timeLimit) return true;
    console.log(`Time Remaining: ${(timeLimit - timeElapsed) / 1000} seconds`);
    return false;
  }, 500);
  console.log(alphabet);

  for (let i = 1; ; i++) {
    if (throttledCheckTime()) return;
    const programAttempt = constructStr(i, alphabet);
    if (programAttempt) console.log(programAttempt);
  }
}

// Given an alphabet of 69 characters, there should be 22667121 different
// combinations of length 4: Math.pow(69, 4)

// In my experiments, I had to run the program for about 30 seconds before it
// finished all of those combinations. Imagine how long it would take to generate
// this simple program: console.log('') (only 15 characters long!)

const start = new Date();
generateAllPrograms(100000);
console.log(`It took ${new Date() - start}ms`);

// results.forEach((strs, idx) =>
//   console.log(`I found ${strs.length} combinations of length ${idx + 1}`)
// );

// console.log(`Time's up!
// ${red(`Failed Attempts: ${failedAttempts}`)}
// ${green(`Successful Attempts: ${successfulAttempts}`)}
// `);

if (successes.length) {
  console.log(green('\nSuccesses'));
  console.log('--------------------');
  successes.forEach((success) => {
    console.log(success);
    console.log('--------------------');
  });
}
