// const child_process = require('child_process')
// const eval =

const valid = 'let a;'

const invalid = 'let 1;'

const logIt = "console.log('hello')"

// child_process.execSync(logIt);
// child_process.execSync(valid);
// eval(valid);
// eval(invalid);
eval(logIt); // It logs!
