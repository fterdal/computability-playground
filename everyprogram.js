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

  if (alphabet === undefined) {
    alphabet = [];
    for (let i = 32; i < 127; i++) {
      alphabet.push(String.fromCharCode(i));
    }
    // If you want to leave the capitals in, feel free to comment out this line
    alphabet = removeCapitals(alphabet);
  }

  for (let i = 1; ; i++) {
    const timeElapsed = new Date() - startTime;
    if (timeElapsed > timeLimit) return;
    const programAttempt = constructStr(i, alphabet);
    if (programAttempt) {
      try {
        // WHOA! Apparently, eval uses the containing scope!
        // I guess this makes sense. But it's still strange.
        // It means that eval("i") runs fine because i is declared
        // in this for loop.
        eval(programAttempt);
        successfulAttempts++;
        // console.log(programAttempt);
        successes.push(programAttempt);
      } catch (err) {
        failedAttempts++;
      }
    }
  }
}

const start = new Date();
generateAllPrograms(1000);
console.log(`It took ${new Date() - start}ms`);

console.log(`Time's up!
${red(`Failed Attempts: ${failedAttempts}`)}
${green(`Successful Attempts: ${successfulAttempts}`)}
`);

if (successes.length) {
  console.log(green('\nSuccesses'));
  console.log('--------------------');
  successes.slice(0, 50).forEach((success) => {
    console.log(success);
    console.log('--------------------');
  });
}
