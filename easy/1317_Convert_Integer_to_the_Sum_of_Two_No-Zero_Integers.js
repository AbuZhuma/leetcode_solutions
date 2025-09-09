function noZeros(num) {
  return !num.toString().includes('0');
}

function getNoZeroIntegers(n) {
  let s = n.toString();
  let a = '';
  let b = '';

  for (let ch of s) {
    if (ch === '0') {
      a += '1';
      b += '9';
    } else {
      let digit = parseInt(ch);
      if (digit === 1) {
        a += '1';
        b += '0';
      } else {
        a += (digit - 1).toString();
        b += '1';
      }
    }
  }

  if (a.includes('0') || b.includes('0')) {
    for (let i = 1; i < n; i++) {
      if (noZeros(i) && noZeros(n - i)) {
        return [i, n - i];
      }
    }
  }

  return [parseInt(a), parseInt(b)];
}

const tests = [
  {n: 2, expectedSum: 2},
  {n: 11, expectedSum: 11},
  {n: 19, expectedSum: 19},
  {n: 21, expectedSum: 21},
  {n: 94, expectedSum: 94},
  {n: 101, expectedSum: 101},
  {n: 345, expectedSum: 345},
  {n: 409, expectedSum: 409},
  {n: 1001, expectedSum: 1001},
  {n: 999, expectedSum: 999},
];

for (const {n, expectedSum} of tests) {
  const [a, b] = getNoZeroIntegers(n);
  const pass = (a + b === expectedSum) && noZeros(a) && noZeros(b);
  console.log(`Test n=${n}: a=${a}, b=${b}, sum=${a+b}, pass=${pass}`);
}
