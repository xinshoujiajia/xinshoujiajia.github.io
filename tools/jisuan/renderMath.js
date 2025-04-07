function renderPrimeFactors(n) {
  const factors = primeFactorization(n);
  const formatFactors = factors.map(([prime, exp]) => `${prime}^{${exp}}`).join(' \\cdot ');
  return `$$${n}=${formatFactors}$$`;
}

function renderGCD(a, b) {
  let steps = [];
  let [pa, pb] = [a, b];
  for ([a, b] = [Math.min(a, b), Math.max(a, b)]; a !== 0; [a, b] = [b % a, a]) {
    steps.push([b, Math.floor(b / a), a, b % a]);
  }
  const formatSteps = steps.map(([a, q, b, r]) => `$$${a}=${q}\\cdot${b}+${r}$$`).join(' ');
  return formatSteps + `$$\\gcd(${pa},${pb})=${b}$$`;
}

function renderGCDPrime(a, b) {
  const allFactors = [];
  const factorsA = primeFactorization(a);
  const factorsB = primeFactorization(b);
  
  // 获取a和b的因数分解
  const formatA = factorsA.map(([prime, exp]) => `${prime}^{${exp}}`).join(' \\cdot ');
  const formatB = factorsB.map(([prime, exp]) => `${prime}^{${exp}}`).join(' \\cdot ');

  // 合并质因数分解，取最小指数
  for (const [prime, expA] of factorsA) {
    const expB = factorsB.find(([p]) => p === prime)?.[1] || 0;
    const minExp = Math.min(expA, expB);
    if (minExp > 0) {
      allFactors.push([prime, minExp]);
    }
  }

  const gcd = allFactors.reduce((acc, [prime, exp]) => acc * Math.pow(prime, exp), 1);
  const formatGCD = allFactors.map(([prime, exp]) => `${prime}^{${exp}}`).join(' \\cdot ');
  
  return `$$\\begin{align*}
    & ${a} = ${formatA} \\\\
    & ${b} = ${formatB} \\\\
    & \\text{gcd}(${a},${b}) = ${formatGCD} = ${gcd}
  \\end{align*}$$`;
}

function renderLCMPrime(a, b) {
  const allFactors = [];
  const factorsA = primeFactorization(a);
  const factorsB = primeFactorization(b);
  
  // 获取a和b的因数分解
  const formatA = factorsA.map(([prime, exp]) => `${prime}^{${exp}}`).join(' \\cdot ');
  const formatB = factorsB.map(([prime, exp]) => `${prime}^{${exp}}`).join(' \\cdot ');

  // 合并质因数分解
  for (const [prime, expA] of factorsA) {
    const expB = factorsB.find(([p]) => p === prime)?.[1] || 0;
    allFactors.push([prime, Math.max(expA, expB)]);  
  }

  const lcm = allFactors.reduce((acc, [prime, exp]) => acc * Math.pow(prime, exp), 1);
  const formatLCM = allFactors.map(([prime, exp]) => `${prime}^{${exp}}`).join(' \\cdot ');
  
  return `$$\\begin{align*}
    & ${a} = ${formatA} \\\\
    & ${b} = ${formatB} \\\\
    & \\text{lcm}(${a},${b}) = ${formatLCM} = ${lcm}
  \\end{align*}$$`;
}

function renderEuclideanAlgorithm(a, b) {
  let steps = [];
  for (let [a, b] = [Math.min(a, b), Math.max(a, b)]; a !== 0; [a, b] = [b % a, a]) {
    steps.push([b, Math.floor(b / a), a, b % a]);
  }
  const formatSteps = steps.map(([a, q, b, r]) => `$$${a}=${q}\\cdot${b}+${r}$$`).join(' ');
  return formatSteps + `$$\\gcd(${a},${b})=${b}$$`;
}

function ExEuclidean(a, b, steps, backSteps) {
  if (a === 0) {
    return [b, 0, 1];
  } else {
    const c = Math.floor(b/a);
    const d = b % a;
    if (steps) {
      steps.push(`${b}&=${c}\\cdot${a}+${d} \\\\`);
    }
    const [gcd, x1, y1] = ExEuclidean(d, a, steps, backSteps);
    const x = y1 - c * x1;
    const y = x1;
    if (backSteps) {
      backSteps.push(`&=${x}*${a}${y>0?'+':''}${y}*${b} \\\\`);
    }
    return [gcd, x, y];
  }
}

function renderExEuclidean(a, b) {
  let steps = [];
  let backSteps = [];
  const [gcd,s,t]=ExEuclidean(a, b, steps, backSteps);
  return `$$\\begin{align*}${steps.join(' ')} \\end{align*}$$`
   + `$$\\begin{align*}${gcd}${backSteps.join(' ')} \\end{align*}$$`
   + `$$\\therefore ${s}\\cdot${a}${t>0?'+':''}${t}\\cdot${b}=${gcd}$$`
}

// 求解同余方程 ax ≡ b (mod m)
function renderCongruenceEquation(a, b, m) {
  const d = gcd(a, m);
  if (b % d !== 0) {
    return `$$\\begin{align*}\\because& \\gcd(${a},${m})=${d} , ${b} \\bmod ${d} \\neq 0 \\\\ \\therefore& \\text{无解} \\end{align*}$$`;
  }
  
  let steps = [];
  let backSteps = [];
  const [g,s,t]=ExEuclidean(a, m, steps, backSteps);
  let formatResult = `$$\\begin{align*}`;
  if(s<0){
    formatResult += `\\because & s=${s}+${m}=${s+m}, t=${t}-${m}=${t-m} \\\\`;
    formatResult += `\\therefore & ${s+m}\\cdot${a}${t-m}\\cdot${m}=${g}\\\\`
    formatResult += `\\therefore & x=${s+m}\\cdot${b}\\bmod ${m}=${((s+m)*b)%m} \\\\`;
  }else{
    formatResult += `\\therefore & ${s}\\cdot${a}${t}\\cdot${m}=${g} \\\\`
    formatResult += `\\therefore & x=${s}\\cdot${b}\\bmod ${m}=${(s*b)%m} \\\\`;
  }
  formatResult += ` \\end{align*}$$`;
  return `$$\\begin{align*}${steps.join(' ')} \\end{align*}$$`
   + `$$\\begin{align*}${g}${backSteps.join(' ')} \\end{align*}$$`
   + formatResult
}

function renderModInverse(a, p) {
  let steps = [];
  let backSteps = [];
  const [gcd,s,t]=ExEuclidean(a, p, steps, backSteps);
  let formatResult = `$$\\begin{align*}`;
  if(s<0){
    formatResult += `\\because & s=${s}+${p}=${s+p}, t=${t}-${p}=${t-p} \\\\`;
    formatResult += `\\therefore & ${a}\\cdot${s+p}=${gcd}\\bmod ${p} \\end{align*}$$`; 
  }else{
    formatResult += `\\therefore & ${s}\\cdot${a}=${gcd}\\bmod ${p} \\end{align*}$$`;
  }
  return `$$\\begin{align*}${steps.join(' ')} \\end{align*}$$`
   + `$$\\begin{align*}${gcd}${backSteps.join(' ')} \\end{align*}$$`
   + formatResult;
}

function renderMatrix(matrix) {
  const rows = matrix.map(row => row.join(' & '));
  return `\\begin{pmatrix}${rows.join(' \\\\ ')} \\end{pmatrix}`;
}

function renderExEuclideanMatrix(a, b) {
  let steps = [];
  const m = [
    [a, b],
    [1, 0],
    [0, 1]
  ];

  if(a > b){
    steps.push(m.map(row => [...row]));
  }
  while (m[0][0] !== 0) {
    const k = Math.floor(m[0][0] / m[0][1]);
    m[0][0] %= m[0][1];
    m[1][0] -= k * m[1][1];
    m[2][0] -= k * m[2][1];
    steps.push(m.map(row => [...row]));
    if (m[0][0] === 1) {
      break;
    }
    const k2 = Math.floor(m[0][1] / m[0][0]);
    m[0][1] %= m[0][0];
    m[1][1] -= k2 * m[1][0];
    m[2][1] -= k2 * m[2][0];
    steps.push(m.map(row => [...row]));
    if (m[0][1] === 1) {
      const k3 = m[0][0]-1;
      m[0][0] = 1;
      m[1][0] -= k3 * m[1][1];
      m[2][0] -= k3 * m[2][1];
      steps.push(m.map(row => [...row]));
      break;
    }
  }
  const final = steps[steps.length-1];
  const formatSteps = steps.map(step => renderMatrix(step)).join('\\rightarrow');
  return `$$${formatSteps}$$` + `$$${final[1][0]}\\cdot ${a} ${final[2][0]}\\cdot ${b} =${final[0][0]}$$`;
}

function renderEular(n) {
  const factors = primeFactorization(n); // 替换原有的分解逻辑
  const phi = eulerPhi(n); // 直接使用工具函数
  // 修改分解步骤的展示方式
  const formatFactors1 = factors.map(([prime, exp]) => exp===1?`\\phi(${prime})`:`\\phi(${prime}^{${exp}})`).join(' \\cdot ');
  const formatFactors2 = factors.map(([prime, exp]) => exp===1?`(${prime}-1)`:`${prime}^{${exp}} \\cdot (1 - \\frac{1}{${prime}})`).join(' \\cdot ');
  if (factors.length === 1) {
    return `$$\\phi(${n})=${formatFactors2}=${phi}$$`;
  }
  return `$$\\phi(${n}) = ${formatFactors1} = ${formatFactors2} = ${phi}$$`;
}

function renderAddMod(a, b, p) {
  return `$$${a}+${b}=${(a + b) % p}\\bmod${p}$$`;
}

function renderMultMod(a, b, p) {
  return `$$${a}\\cdot${b}=${(a * b) % p}\\bmod${p}$$`;
}

function renderPowMod(a, b, p) {
  let result = 1;
  let base = a % p;
  let exponent = b;

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % p;
    }
    base = (base * base) % p;
    exponent = Math.floor(exponent / 2);
  }
  return `$$${a}^{${b}}=${result}\\bmod${p}$$`;
}

function renderQuadraticResidue(p) {
  let steps = [];
  for(let i = 1; i <= Math.floor(p/2); i++){
    let result = 1;
    let base = i % p;
    let exponent = 2;
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % p;
      }
      base = (base * base) % p;
      exponent = Math.floor(exponent / 2);
    }
    steps.push([i, 2, p, result]);
  }
  const formatSteps = steps.map(([a, b, c, d]) => `& ${a}^{${b}} \\equiv ${d} \\pmod{${c}}`).join(' \\\\');
  const values = steps.map(([, , , d]) => d).sort((a,b)=>a-b).join(', ');
  return `$$\\begin{align*}
    ${formatSteps} \\\\
    & \\therefore ${p}的平方剩余为\\{${values}\\}
  \\end{align*}$$`;
}

function renderLegendre(p, q) {
  let a = p, b = q;
  while (a !== 0) {
    const temp = a;
    a = b % a;
    b = temp;
  }
  if(b != 1){
    return `$$(\\frac{${p}}{${q}})=0$$`;  
  }
  let result = 1;
  let base = p % q;
  let exponent = Math.floor(q/2);
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % q;
    }
    base = (base * base) % q;
    exponent = Math.floor(exponent / 2);
  }
  return `$$\\begin{align*} & \\because ${p}^{\\frac{${q}-1}{2}}=${result} \\\\
  & \\therefore (\\frac{${p}}{${q}})=${result===1?1:-1} \\end{align*}$$`;
}

function renderLegendre2(p, q) {
  let steps = [];
  let sign = 1;
  let [a,b]=[p,q];
  while (a !== 1) {
    [a,b] = [b%a, a];
    steps.push([a, b, sign]);
    sign *= Math.pow(-1, Math.floor((a - 1) * (b - 1) / 4));
  }
  const formatSteps = steps.map(([a,b,sign]) => `=${sign}\\cdot(\\frac{${a}}{${b}})\\cdot (-1)^{\\frac{(${a}-1)(${b}-1)}{4}}`).join(' ');
  return `$$(\\frac{${p}}{${q}})${formatSteps}=${sign}$$`;
}

function renderOrder(a, p) {
  // 使用gcd工具函数检查互质
  if (gcd(a, p) !== 1) {
    return `$$\\begin{align*}& ${a}与${p}不互质，阶不存在\\end{align*}$$`;
  }

  // 使用工具函数简化代码
  const phi = eulerPhi(p);
  const divisors = Array.from({length: phi}, (_, i) => i + 1)
    .filter(d => phi % d === 0);

  // 使用modExp工具函数简化模幂计算
  const powMod = divisors.map(d => [a, d, p, modExp(a, d, p)]);
  
  let d = p;
  let _a = a;
  while (_a !== 0) [_a, d] = [d % _a, _a];
  
  const result = powMod.find(([, , , r]) => r === 1);
  if (d !== 1) {
    return `$$\\begin{align*}& ${a}与${p}不互质，阶不存在\\end{align*}$$`;
  }
  
  const formatSteps = powMod.map(([a, d, p, r]) => `& ${a}^{${d}} \\equiv ${r} \\pmod{${p}}`).join(' \\\\');
  return `$$\\begin{align*}
    & \\phi(${p})=${phi} \\\\
    & ${phi}的因数：${divisors.join(', ')} \\\\
    ${formatSteps} \\\\
    & \\therefore \\text{ord}_{${p}}(${a}) = ${result ? result[1] : '不存在'}
  \\end{align*}$$`;
}

function renderPrimitiveRoot(p) {
  // 使用工具函数获取欧拉函数值及其素因数
  const phi = eulerPhi(p);
  const phiFactors = [...new Set(primeFactorization(phi).map(([p]) => p))];

  // 使用gcd工具函数简化互质检查
  let g = 2;
  for (; g < p; g++) {
    if (gcd(g, p) !== 1) continue;

    // 使用modExp工具函数简化验证步骤
    if (phiFactors.some(prime => modExp(g, phi / prime, p) === 1)) {
      continue;
    }
    break;
  }

  // 使用coprimeNumbers工具函数生成互质指数
  const exponents = coprimeNumbers(phi);

  // 优化验证步骤的生成逻辑
  const steps = [
    `&\\text{1. 找到最小原根 } g = ${g}`,
    `&\\text{2. 与}\\phi(${p})=${phi}\\text{互质的指数}: ${exponents.join(', ')}`,
    `&\\text{3. 所有原根}: ${exponents.map(e => `${g}^{${e}} \\bmod ${p}`).join(', ')}`,
    ...exponents.slice(0, 3).map(e => 
      `&\\text{验证 } ${g}^{${e}} \\equiv ${modExp(g, e, p)} \\pmod{${p}}`
    )
  ];

  return `$$\\begin{aligned}${steps.join(' \\\\')}\\end{aligned}$$`;
}

// 修改后的modExp函数
function modExp(base, exponent, mod) {
  let result = 1;
  base = base % mod;
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % mod;
    }
    base = (base * base) % mod;
    exponent = Math.floor(exponent / 2);
  }
  return result;
}


function renderAddModTable(p) {
  let table = '<table border="1" cellpadding="5" cellspacing="0">';
  table += '<tr><th>+</th>';
  for (let i = 0; i < p; i++) {
    table += `<th>${i}</th>`;
  }
  table += '</tr>';
  
  for (let i = 0; i < p; i++) {
    table += `<tr><th>${i}</th>`;
    for (let j = 0; j < p; j++) {
      table += `<td>${(i + j) % p}</td>`;
    }
    table += '</tr>';
  }
  table += '</table>';
  return table;
}

function renderMultModTable(p) {
  let table = '<table border="1" cellpadding="5" cellspacing="0">';
  table += '<tr><th>×</th>';
  for (let i = 1; i < p; i++) {
    table += `<th>${i}</th>`;
  }
  table += '</tr>';
  
  for (let i = 1; i < p; i++) {
    table += `<tr><th>${i}</th>`;
    for (let j = 1; j < p; j++) {
      table += `<td>${(i * j) % p}</td>`;
    }
    table += '</tr>';
  }
  table += '</table>';
  return table;
}