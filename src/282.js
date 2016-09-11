const input = `
10 16
10 32
10 9024720
F 10
F 1
F 111111
F 100000
F 10110110100111001
`;

const expectedOutput = `
1001000
10101000
1010100101010100000010001000010010
1
1
20
8
2868
`;

(function test() {
  console.log(run(input));
})();

function run(input) {
  input = input.trim();
  const inputRows = input.split('\n');
  const outputRows = inputRows.map(inputRowsToOutputRows);
  return outputRows.join('\n');
}

function inputRowsToOutputRows(inputRow) {
  const [base, num] = inputRow.split(' ');
  if (base === '10') return decToFib(num);
  if (base === 'F') return fibToDec(num);
  throw new Error(`Wrong base symbol given: ${base}`);
}

function decToFib(num) {
  num = parseInt(num, 10);

  let i = 1;
  let fibArr = [1];
  let result = [];

  while (num > fibArr[i - 1]) {
    fibArr.push(fibonacci(++i));
  }

  fibArr.pop();
  fibArr = fibArr.reverse();

  fibArr.forEach((fibNum, idx) => {
    if (num >= fibNum) {
      num -= fibNum;
      result.push('1');
    } else {
      result.push('0');
    }
  });

  return result.join('');
}

function fibToDec(num) {
  return num.split('').reduce((acc, digit, idx, arr) => {
    if (digit === '1') acc += fibonacci(arr.length - idx);
    return acc;
  }, 0);
}

function fibonacci(n) {
  return n < 1 ? 0
    : n <= 2 ? 1
    : fibonacci(n - 1) + fibonacci(n - 2);
}
