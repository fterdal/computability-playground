const alphSize = 3;
console.log('---------------');
for (let num = 0; num < 21; num++) {
  console.log(`${num} % ${alphSize} = ${num % alphSize}`);
  console.log(`${num} / ${alphSize} = ${Math.floor(num / alphSize)}`);
  console.log('---------------');
}

// const alphabet = ['a', 'b', 'c'];
// const alphabet = ['a', 'b'];
// const alphabet = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const alphabet = ['a', 'b', 'c'];

/**
 * IDEA: Create a lazy function that takes in a number and uses modulo to create
 * an array of indices in the alphabet array. It constructs the string based on
 * those indices into the alphabet
 */

const constructStr = (num, alphabet = ['a', 'b', 'c']) => {
  alphabet.unshift(null);
  let indices = [];
  const base = alphabet.length;
  while (num !== 0) {
    // console.log(num);
    const rem = num % alphabet.length;
    const quotient = parseInt(num / base);
    console.log({ rem, quotient });
    // indices.push(rem);
    if (rem === 0) return null;
    indices.unshift(rem);
    num = quotient;
    // num = base;
  }
  // return indices
  return indices.map(idx => alphabet[idx]).join('');
};

// const num = 3;
// console.log(`constructStr(${num}) === [${constructStr(num)}]`);

const combos = 40;
for (let num = 1; num < combos; num++) {
  console.log('');
  console.log(`constructStr(${num}) === "${constructStr(num)}"`);
}

const idealCombinations = [
  ['a'], // num = 0
  ['b'], // num = 1
  ['c'], // num = 2
  ['aa'], // num = 3
  ['ab'], // num = 4
  ['ac'], // num = 5
  ['ba'], // num = 6
  ['bb'], // num = 7
  ['bc'], // num = 8
  ['ca'], // num = 9
  ['cb'], // num = 10
  ['cc'], // num = 11
  ['aaa'], // num = 12
  // ...
];
