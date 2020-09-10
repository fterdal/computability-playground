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

// We'll use all the characters corresponding to Unicode numbers 32 - 126, and
// then subtract the capital letters.
// While this isn't quite a complete set of characters, it'll cover most of the
// relevant symbols that we generally use when coding. We're subtracting
// capital letters purely so that we have fewer combinations to check (but
// feel free to add them back in if you like).

// results will be a multi-dimensional array
// the first inner array is all the strings of length one
// the second is all the strings of length two
// each inner array stores all the strings of length index + 1

function generateAllPrograms(timeLimit = 100, alphabet) {
  const startTime = new Date();

  if (alphabet === undefined) {
    alphabet = [];
    for (let i = 32; i < 127; i++) {
      alphabet.push(String.fromCharCode(i));
    }
    0;
    // If you want to leave the capitals in, feel free to comment out this line
    alphabet = removeCapitals(alphabet);
  }

  let results = [
    [...alphabet], // results of length 1 are just the alphabet
    // results of length 2 will go here
  ];

  const throttledCheckTime = throttle(() => {
    const timeElapsed = new Date() - startTime;
    if (timeElapsed > timeLimit) return true;
    console.log(`Time Remaining: ${(timeLimit - timeElapsed) / 1000} seconds`);
    return false;
  }, 500);

  for (let i = 0; ; i++) {
    // Creat a new array to store the new length combinations
    results[i + 1] = [];

    // Clear out the old one to save memory (but preserve the lenfth)
    if (results[i - 1]) results[i - 1] = new Array(results[i - 1].length);

    for (let j = 0; j < results[i].length; j++) {
      const attempt = results[i][j];

      for (let x = 0; x < alphabet.length; x++) {
        // If time has expired, quit the function and return the results
        if (throttledCheckTime()) return results;

        const letter = alphabet[x];
        results[i + 1].push(attempt.concat(letter));
      }
    }
  }
  // return results;
}

// Given an alphabet of 69 characters, there should be 22667121 different
// combinations of length 4: Math.pow(69, 4)

// In my experiments, I had to run the program for about 30 seconds before it
// finished all of those combinations. Imagine how long it would take to generate
// this simple program: console.log('') (only 15 characters long!)

const start = new Date();
const results = generateAllPrograms(30000);
console.log(`It took ${new Date() - start}ms`);

results.forEach((strs, idx) =>
  console.log(`I found ${strs.length} combinations of length ${idx + 1}`)
);

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
