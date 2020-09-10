

// Event-Loop based throttle
// const throttle = (fn, ms) => {
//   let allowExecution = true;
//   return function (...args) {
//     if (!allowExecution) return;
//     allowExecution = false;
//     const result = fn(...args);
//     console.log('setting timeout', ms);
//     setTimeout(() => {
//       allowExecution = true;
//     }, ms);
//     return result;
//   };
// };

// Timestamp-based throttle
const throttle = (fn, wait) => {
  let lastCalled = null;
  return function (...args) {
    if (!lastCalled || Date.now() - lastCalled >= wait) {
      lastCalled = Date.now();
      return fn.apply(this, args);
    }
  };
};

const startTime = new Date();
const throttledCheckTime = throttle((limit) => {
  const timeElapsed = new Date() - startTime;
  console.log(`time elapsed`, timeElapsed);
  // if (timeElapsed > limit) return true;
  // return false;
}, 500);

const timeLimit = 2000;
while (new Date() - startTime < timeLimit) {
  throttledCheckTime(timeLimit);
}
