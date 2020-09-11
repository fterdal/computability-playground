const alphabet = ['a', 'b', 'c'];

/**
 * IDEA: Create a lazy function that takes in a number and uses modulo to create
 * an array of indices in the alphabet array. It constructs the string based on
 * those indices into the alphabet
 */

const constructStr = (num) => {
  let indices = [];
  while (num >= 0) {
    const mod = num % alphabet.length;
    const div = Math.floor(num / alphabet.length);
    indices = [mod, ...indices]
    if (num === 0) return indices
    num = Math.floor(num / alphabet.length);
    // console.log({ div, mod });
    // console.log(nextIdx);
  }
  //  let str = '';
  // return indices.map(idx => alphabet[idx]).join('');
  return indices
};

const combos = 18
for (let num = 0; num < combos; num++) {
  console.log(`constructStr(${num}) === ${constructStr(num)}`);
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
  // ...
];
