const { red, green } = require('chalk');

function removeCapitals(arr) {
  return [...new Set(arr.map((char) => char.toLowerCase()))];
}

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
  alphabet = [null, ...alphabet];
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

  let failedAttempts = 0;
  let successfulAttempts = 0;
  let successes = [];

  if (alphabet === undefined) {
    alphabet = [];
    for (let i = 32; i < 127; i++) {
      alphabet.push(String.fromCharCode(i));
    }
    // If you want to leave the capitals in, feel free to comment out this line
    alphabet = removeCapitals(alphabet);
  }
  const throttledLoadingTime = throttle(function () {
    process.stdout.write('.');
  }, 100);

  for (let I = 1; ; I++) {
    const timeElapsed = new Date() - startTime;
    if (timeElapsed > timeLimit) {
      return {
        failedAttempts,
        successfulAttempts,
        successes,
      };
    }
    throttledLoadingTime();
    const programAttempt = constructStr(I, alphabet);
    if (programAttempt) {
      try {
        // WHOA! Apparently, eval uses the containing scope!
        // I guess this makes sense. But it's still strange.
        // It means that eval("i") runs fine because i is declared
        // in this for loop. Changing the i to capital for now (since
        // capitals were excluded).
        eval(programAttempt);
        successfulAttempts++;
        successes.push(programAttempt);
      } catch (err) {
        failedAttempts++;
      }
    }
  }
}

const start = new Date();

// Change this to give the function more time to run
const timeLimit = 60000;

const { successes, successfulAttempts, failedAttempts } = generateAllPrograms(
  timeLimit
);

console.log(`\nTime's up! It took ${
  new Date() - start
}ms to generate all these programs
${red(`Failed Attempts: ${failedAttempts}`)}
${green(`Successful Attempts: ${successfulAttempts}`)}
`);

if (successes.length) {
  console.log(green('\nThe Longest Successful Attempts:'));
  console.log('--------------------');
  const longestOnes = successes.slice(successes.length - 10, successes.length);
  longestOnes.slice(0, 50).forEach((success) => {
    console.log(success);
    console.log('--------------------');
  });
}
