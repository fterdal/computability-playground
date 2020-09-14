const { parse } = require('acorn');
try {
  let $ = 'hello'
  const program = '$'
  parse(program, { ecmaVersion: 2020 });
  eval('"use strict";' + program)
} catch (err) {
  console.log('ERROR CAUGHT')
  console.log(err)
}
