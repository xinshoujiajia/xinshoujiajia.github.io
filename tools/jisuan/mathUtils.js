// 常用数学工具函数
function primeFactorization(n) {
  const factors = [];
  for (let divisor = 2, temp = n; temp >= 2; divisor++) {
    if (temp % divisor === 0) {
      let count = 0;
      while (temp % divisor === 0) {
        temp /= divisor;
        count++;
      }
      factors.push([divisor, count]);
    }
  }
  return factors;
}

function coprimeNumbers(n) {
  const numbers = [];
  for (let i = 1; i <= n; i++) {
    let a = i, b = n;
    while (a !== 0) [a, b] = [b % a, a];
    if (b === 1) numbers.push(i);
  }
  return numbers;
}

// 基于质因数分解的欧拉函数计算
function eulerPhi(n) {
  return primeFactorization(n).reduce((acc, [prime, exp]) => 
    acc * (prime - 1) * Math.pow(prime, exp - 1), 1
  );
}

// 最大公约数计算
function gcd(a, b) {
  while (a !== 0) [a, b] = [b % a, a];
  return b;
}

// 互质判断
// function isCoprime(a, b) {
//   return gcd(a, b) === 1;
// }
