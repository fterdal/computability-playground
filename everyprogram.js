// const child_process = require('child_process')
// const eval =

const valid = 'let A;';

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
const startTime = new Date();
const duration = 3000; // Do this for one second
console.log(`starting to write every single program for ${duration}ms...`);
while (new Date() - duration < startTime) {}

console.log(`new Date() - startTime = `, new Date() - startTime);

// for (let i = 32; i < 128; i++) {
//   console.log('i = ', i, ' => ', String.fromCharCode(i));
// }

// const idx = 4

// console.log(valid.charCodeAt(idx), valid[idx]);

// const i = '-'
// console.log(i.charCodeAt(0), i[0]);
// console.log('i = ', i, ' => ', String.fromCharCode(i))

// let alphabet = [
//   [
//     'a',
//     'b',
//     'c',
//     'd',
//     'e',
//     'f',
//     'g',
//     'h',
//     'i',
//     'j',
//     'k',
//     'l',
//     'm',
//     'n',
//     'o',
//     'p',
//     'q',
//     'r',
//     's',
//     't',
//     'u',
//     'v',
//     'w',
//     'x',
//     'y',
//     'z',
//   ],
// ];
