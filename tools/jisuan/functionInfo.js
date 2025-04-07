// 函数信息数组
const functions = [
    {
        name: '分解质因数',
        func: renderPrimeFactors,
        params: [
            { name: 'n', type: 'scalar' ,args: []}
        ]
    },
    {
        name: '最大公约数',
        func: renderGCD,
        params: [
            { name: 'a', type: 'scalar' ,args: []},
            { name: 'b', type: 'scalar' ,args: []}
        ]
    },
    {
        name: '最大公约数（质因数分解）',
        func: renderGCDPrime,
        params: [
            { name: 'a', type: 'scalar' ,args: []},
            { name: 'b', type: 'scalar' ,args: []}
        ]
    },
    {
        name: '最小公倍数（质因数分解）',
        func: renderLCMPrime,
        params: [
            { name: 'a', type: 'scalar' ,args: []},
            { name: 'b', type: 'scalar' ,args: []}
        ]
    },
    {
        name: '模加法',
        func: renderAddMod,
        params: [
            { name: 'a', type:'scalar',args: []},
            { name: 'b', type:'scalar',args: []},
            { name: 'p', type:'scalar',args: []}
        ]
    },
    {
        name: '模乘法',
        func: renderMultMod,
        params: [
            { name: 'a', type:'scalar',args: []},
            { name: 'b', type:'scalar',args: []},
            { name: 'p', type:'scalar',args: []}
        ] 
    },
    {
        name: '模幂',
        func: renderPowMod,
        params: [
            { name: 'a', type:'scalar',args: []},
            { name: 'b', type:'scalar',args: []},
            { name: 'p', type:'scalar',args: []}
        ]
    },
    {
        name: '加法表',
        func: renderAddModTable,
        params: [
            { name: 'n', type: 'scalar' ,args: []}
        ]
    },
    {
        name: '乘法表',
        func: renderMultModTable,
        params: [
            { name: 'n', type: 'scalar' ,args: []}
        ]
    },
    // {
    //     name: '指数表',
    //     func: renderPowModTable,
    //     params: [
    //         { name: 'n', type: 'scalar' ,args: []},
    //         { name: 'p', type:'scalar',args: []}
    //     ]
    // },
    {
        name: '扩展欧几里得',
        func: renderExEuclidean,
        params: [
            { name: 'a', type: 'scalar' ,args: []},
            { name: 'b', type: 'scalar' ,args: []}
        ]
    },
    {
        name: '扩展欧几里得（矩阵形式）',
        func: renderExEuclideanMatrix,
        params: [
            { name: 'a', type: 'scalar' ,args: []},
            { name: 'b', type: 'scalar' ,args: []}
        ]
    },
    {
        name: '模逆',
        func: renderModInverse,
        params: [
            { name: 'a', type:'scalar',args: []},
            { name: 'p', type:'scalar',args: []}
        ]  
    },
    {
        name: '同余方程',
        func: renderCongruenceEquation, 
        params: [
            { name: 'a', type:'scalar',args: []},
            { name: 'b', type:'scalar',args: []},
            { name: 'p', type:'scalar',args: []} 
        ]
    },
    {
        name: '欧拉函数',
        func: renderEular,
        params: [
            { name: 'n', type: 'scalar' ,args: []}
        ]
    },
    {
        name: '平方剩余',
        func: renderQuadraticResidue,
        params: [
            { name: 'p', type:'scalar',args: []}
        ] 
    },
    {
        name: '勒让德符号（欧拉判别法）',
        func: renderLegendre,
        params: [
            { name: 'p', type:'scalar',args: []},
            { name: 'q', type:'scalar',args: []}
        ] 
    },
    {
        name: '勒让德符号（二次互反律）',
        func: renderLegendre2,
        params: [
            { name: 'p', type:'scalar',args: []},
            { name: 'q', type:'scalar',args: []}
        ] 
    },
    {
        name: '阶',
        func: renderOrder,
        params: [
            { name: 'n', type:'scalar',args: []},
            { name: 'p', type:'scalar',args: []}
        ] 
    },
    {
        name: '原根',
        func: renderPrimitiveRoot,
        params: [
            { name: 'p', type:'scalar',args: []}
        ] 
    }
];
