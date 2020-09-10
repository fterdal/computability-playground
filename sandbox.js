const throttle = (fn, ms) => {
  let allowExecution = true;
  return function (...args) {
    if (!allowExecution) return;
    allowExecution = false;
    const result = fn(...args);
    console.log('setting timeout', ms);
    setTimeout(() => {
      allowExecution = true;
    }, ms);
    return result;
  };
};

const startTime = new Date();
const throttledCheckTime = throttle((limit) => {
  const timeElapsed = new Date() - startTime;
  console.log(`time elapsed`, timeElapsed);
  // if (timeElapsed > limit) return true;
  // return false;
}, 10);

const timeLimit = 2000;
while (new Date() - startTime < timeLimit) {
  throttledCheckTime(timeLimit);
}
