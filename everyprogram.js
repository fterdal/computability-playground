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

// We'll use all the characters corresponding to Unicode numbers 32 - 126.
// While this isn't quite a complete set, it'll cover all the letters, numbers
// and relevant symbols that we generally use when coding.
const alphabet = [];
for (let i = 32; i < 127; i++) {
  alphabet.push(String.fromCharCode(i));
}
console.log('ALPHABET:', alphabet);

// results will be a multi-dimensional array
// the first inner array is all the strings of length one
// the second is all the strings of length two
// each inner array stores all the strings of length index + 1
let results = [
  [...alphabet], // reseults of length 1
];

// for (let i = 0; i < 2; i++) {
let i = 0;
results[i].forEach((attempt) => {
  alphabet.forEach((letter) => {
    // console.count('oops');
    if (!results[i + 1]) results.push([]);
    results[i + 1].push(attempt.concat(letter));
  });
});
// }

i = 1;
results[i].forEach((attempt) => {
  alphabet.forEach((letter) => {
    // console.count('oops');
    if (!results[i + 1]) results.push([]);
    results[i + 1].push(attempt.concat(letter));
  });
});

results.forEach((strs, idx) =>
  console.log(`There are ${strs.length} combinations of length ${idx + 1}`)
);

console.log(results[2].slice(234, 300))

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
