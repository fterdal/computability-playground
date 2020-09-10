const { red, green } = require('chalk');
// const eval =

const valid = 'let a;';

const invalid = 'let 1;';

const logIt = "console.log('hello')";

// child_process.execSync(logIt);
// child_process.execSync(valid);

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

// console.log(eval('       '.trim()))

function removeCapitals(arr) {
  return [...new Set(arr.map((char) => char.toLowerCase()))];
}

// function throttle(callback, waitForMS) {
//   let readyToRun = true;
//   return function (...args) {
//     if (readyToRun) {
//       readyToRun = false;
//       setTimeout(() => {
//         readyToRun = true;
//       }, waitForMS);
//       return callback(...args);
//     }
//   };
// }

const throttle = (fn, ms) => {
  let allowExecution = true;
  return function (...args) {
    if (!allowExecution) return;
    allowExecution = false;
    const result = fn(...args);
    setTimeout(() => {
      allowExecution = true;
    }, ms);
    return result;
  };
};

// We'll use all the characters corresponding to Unicode numbers 32 - 126, and
// then subtract the capital letters.
// While this isn't quite a complete set of characters, it'll cover most of the
// relevant symbols that we generally use when coding. We're subtracting
// capital letters purely so that we have fewer combinations to check (but
// feel free to add them back in if you like).

// console.log('ALPHABET:', alphabet);
// console.log('ALPHABET LENGTH:', alphabet.length);

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
    // If you want to leave the capitals in, feel free to comment this out.
    alphabet = removeCapitals(alphabet);
  }

  let results = [
    [...alphabet], // results of length 1
  ];

  const throttledCheckTime = throttle(() => {
    const timeElapsed = new Date() - startTime;
    console.log(`time elapsed`, timeElapsed);
    if (timeElapsed > timeLimit) return true;
    return false;
  }, 500);

  for (let i = 0; i < 3; i++) {
    // if (!results[i]) results[i] = [];
    results[i + 1] = [];
    if (results[i - 1]) results[i - 1] = new Array(results[i - 1].length);
    results[i].forEach((attempt) => {
      // console.log(results[i].slice(0, 5))
      alphabet.forEach((letter) => {
        // if (!results[i + 1]) results.push([])
        // const timeRemaining = timeLimit - timeElapsed;
        // console.log(`Time elapsed`, timeElapsed);
        // console.log(`Time limit`, timeLimit);
        // console.log(`Time remaining`, timeRemaining);
        if (throttledCheckTime()) return results;
        results[i + 1].push(attempt.concat(letter));
      });
    });
  }
  return results;
}

const start = new Date();
const results = generateAllPrograms();
console.log(`It took ${new Date() - start}ms`);

results.forEach((strs, idx) =>
  console.log(`There are ${strs.length} combinations of length ${idx + 1}`)
);

console.log(results[0])

// Let's look at a random slice of three-length combos:
console.log(results[2].slice(300, 350));

// const startTime = new Date();
// const duration = 10; // Do this for one second
// console.log(
//   `Iterating over every single program. Stopping after ${duration}ms...`
// );
// for (let length = 1; new Date() - duration < startTime; length++) {
//   for (let i = 0; i < length; i++) {
//     let attempt = '';
//     for (let unicode = 32; unicode < 128; unicode++) {
//       try {
//         attempt = String.fromCharCode(unicode);
//         eval(attempt);
//         successfulAttempts++;
//         successes.push(attempt);
//       } catch (err) {
//         failedAttempts++;
//       }
//     }
//   }
// }

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

// for (let i = 32; i < 128; i++) {
//   console.log('i = ', i, ' => ', String.fromCharCode(i));
// }
