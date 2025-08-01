// 迷宫游戏核心逻辑 - 融合生命游戏机制

// 常量定义
const MAZE_WIDTH = 128;
const MAZE_HEIGHT = 128;
const CELL_SIZE = 4; // 每个格子的像素大小
const MAX_ACTIONS_PER_TURN = 10; // 每回合最大行动次数
const MAX_SKILLS_PER_TURN = 1; // 每回合最大技能使用次数

// 游戏状态
let maze = []; // 迷宫数组，0表示空地，1表示墙壁
let playerX = Math.floor(MAZE_WIDTH / 2); // 玩家初始X坐标（中心）
let playerY = Math.floor(MAZE_HEIGHT / 2); // 玩家初始Y坐标（中心）
let canvas = null;
let ctx = null;
let gameStatus = "就绪"; 
let skillActive = false; // 技能是否激活
let skillButton = null; // 技能按钮元素
let actionsLeft = MAX_ACTIONS_PER_TURN; // 剩余行动次数
let skillsLeft = MAX_SKILLS_PER_TURN; // 剩余技能次数
let isPlayerTurn = true; // 是否是玩家回合

// 初始化游戏
function initGame() {
    // 获取Canvas元素
    canvas = document.getElementById('mazeCanvas');
    ctx = canvas.getContext('2d');

    // 初始化迷宫（用户可以替换为自己的迷宫生成算法）
    initializeMaze();

    // 初始化游戏状态
    playerX = Math.floor(MAZE_WIDTH / 2);
    playerY = Math.floor(MAZE_HEIGHT / 2);
    isPlayerTurn = true;
    actionsLeft = MAX_ACTIONS_PER_TURN;
    skillsLeft = MAX_SKILLS_PER_TURN;
    skillActive = false;
    gameStatus = "欢迎来到迷宫生命游戏！点击游戏说明查看规则";

    // 渲染迷宫
    renderMaze();

    // 添加事件监听器
    addEventListeners();

    // 更新状态
    updateStatus();
}

// 初始化迷宫（随机生成）
function initializeMaze() {
    // 创建空迷宫
    maze = new Array(MAZE_HEIGHT);
    for (let y = 0; y < MAZE_HEIGHT; y++) {
        maze[y] = new Array(MAZE_WIDTH);
        for (let x = 0; x < MAZE_WIDTH; x++) {
            // 随机生成墙壁(1)和空地(0)，墙壁概率为50%
            maze[y][x] = Math.random() > 0.5 ? 1 : 0;
        }
    }

    // 设置中心3x3区域为空地
    const centerX = Math.floor(MAZE_WIDTH / 2);
    const centerY = Math.floor(MAZE_HEIGHT / 2);
    for (let y = centerY - 1; y <= centerY + 1; y++) {
        for (let x = centerX - 1; x <= centerX + 1; x++) {
            maze[y][x] = 0;
        }
    }
}

// 渲染迷宫
function renderMaze() {
    // 清空画布
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制迷宫
    ctx.fillStyle = '#333333';
    for (let y = 0; y < MAZE_HEIGHT; y++) {
        for (let x = 0; x < MAZE_WIDTH; x++) {
            if (maze[y][x] === 1) {
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    // 绘制玩家
    ctx.fillStyle = '#2196F3'; // 玩家蓝色
    ctx.beginPath();
    ctx.arc(
        playerX * CELL_SIZE + CELL_SIZE / 2,
        playerY * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 * 0.8,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // 检查是否到达边界（逃出迷宫）
    if (playerX === 0 || playerX === MAZE_WIDTH - 1 || playerY === 0 || playerY === MAZE_HEIGHT - 1) {
        gameStatus = "胜利！恭喜你走出迷宫！";
        isPlayerTurn = false;
        updateStatus();
    }
}

// 激活技能
function activateSkill() {
    if (!isPlayerTurn || gameStatus === "胜利！恭喜你走出迷宫！" || gameStatus === "失败！你困在墙里了！") return;

    if (skillActive) {
        // 如果技能已激活，则取消激活
        skillActive = false;
        skillButton.classList.remove('skill-active');
        gameStatus = "技能已取消";
    } else {
        // 检查是否还有技能次数
        if (skillsLeft <= 0) {
            gameStatus = "本回合技能已用完！";
        } else {
            // 激活技能
            skillActive = true;
            skillButton.classList.add('skill-active');
            gameStatus = "技能已激活，点击方向键使用";
        }
    }
    updateStatus();
}

// 移动玩家
function movePlayer(dx, dy) {
    if (!isPlayerTurn || gameStatus === "胜利！恭喜你走出迷宫！" || gameStatus === "失败！你困在墙里了！") return;

    // 检查是否还有行动次数
    if (actionsLeft <= 0) {
        gameStatus = "行动已用完，结束回合";
        updateStatus();
        return;
    }

    const newX = playerX + dx;
    const newY = playerY + dy;

    // 检查是否在迷宫范围内
    if (newX >= 0 && newX < MAZE_WIDTH && newY >= 0 && newY < MAZE_HEIGHT) {
        if (skillActive) {
            // 技能激活状态下，反转目标格子
            maze[newY][newX] = maze[newY][newX] === 0 ? 1 : 0;
            skillActive = false;
            skillButton.classList.remove('skill-active');
            skillsLeft -= 1; // 减少技能次数
            actionsLeft -= 1; // 减少行动次数
            gameStatus = "技能已使用"; 
            updateStatus();
            renderMaze();

            // 检查行动次数是否用完
            if (actionsLeft <= 0) {
                endPlayerTurn();
            }
        } else {
            // 正常移动
            if (maze[newY][newX] === 0) {
                playerX = newX;
                playerY = newY;
                actionsLeft -= 1; // 减少行动次数
                renderMaze();
                gameStatus = "移动成功";
                updateStatus();

                // 检查行动次数是否用完
                if (actionsLeft <= 0) {
                    endPlayerTurn();
                }
            } else {
                gameStatus = "前方是墙，无法移动";
                updateStatus();
            }
        }
    } else {
        gameStatus = "超出范围，无法移动";
        updateStatus();
    }
}

// 结束玩家回合，进入迷宫更新回合
function endPlayerTurn() {
    isPlayerTurn = false;
    gameStatus = "迷宫更新中...";
    updateStatus();

    // 延迟一下，让玩家看清楚
    setTimeout(() => {
        updateMaze();
        // 检查玩家是否在墙里
        if (maze[playerY][playerX] === 1) {
            gameStatus = "失败！你困在墙里了！";
        } else {
            startNewTurn();
        }
        updateStatus();
    }, 500);
}

// 根据生命游戏规则更新迷宫
function updateMaze() {
    const newMaze = JSON.parse(JSON.stringify(maze)); // 创建迷宫副本

    // 生命游戏规则：不更新最外围一圈
    for (let y = 1; y < MAZE_HEIGHT - 1; y++) {
        for (let x = 1; x < MAZE_WIDTH - 1; x++) {
            // 计算周围8个格子中墙壁的数量
            let wallCount = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue; // 跳过当前格子
                    if (maze[y + dy][x + dx] === 1) {
                        wallCount++;
                    }
                }
            }

            // 生命游戏规则
            if (maze[y][x] === 1) {
                // 当前是墙壁，如果周围墙壁少于2个或多于3个，则变为空地
                if (wallCount < 2 || wallCount > 3) {
                    newMaze[y][x] = 0;
                }
            } else {
                // 当前是空地，如果周围有3个墙壁，则变为墙壁
                if (wallCount === 3) {
                    newMaze[y][x] = 1;
                }
            }
        }
    }

    maze = newMaze;
    renderMaze();
}

// 开始新的玩家回合
function startNewTurn() {
    isPlayerTurn = true;
    actionsLeft = MAX_ACTIONS_PER_TURN;
    skillsLeft = MAX_SKILLS_PER_TURN;
    skillActive = false;
    if (skillButton) {
        skillButton.classList.remove('skill-active');
    }
    gameStatus = "新回合开始";
    updateStatus();
}

// 重新开始游戏
function restartGame() {
    // 重置游戏状态
    initializeMaze();
    playerX = Math.floor(MAZE_WIDTH / 2);
    playerY = Math.floor(MAZE_HEIGHT / 2);
    isPlayerTurn = true;
    actionsLeft = MAX_ACTIONS_PER_TURN;
    skillsLeft = MAX_SKILLS_PER_TURN;
    skillActive = false;
    if (skillButton) {
        skillButton.classList.remove('skill-active');
    }
    gameStatus = "游戏已重置";
    renderMaze();
    updateStatus();
}

// 显示游戏说明
function showHelp() {
    alert(
        "生命迷宫游戏规则：\n\n" +
        "1. 玩家每回合有10次行动机会和1次技能机会\n" +
        "2. 移动或使用技能都会消耗行动次数\n" +
        "3. 技能可以反转目标格子的状态（墙变空地或空地变墙）\n" +
        "4. 玩家回合结束后，迷宫会根据生命游戏规则更新\n" +
        "5. 生命游戏规则：\n" +
        "   - 墙壁：如果周围墙壁少于2个或多于3个，则变为空地\n" +
        "   - 空地：如果周围有3个墙壁，则变为墙壁\n" +
        "6. 迷宫更新后，如果玩家处于墙里则游戏失败\n" +
        "7. 到达迷宫边界（任何边缘）即可胜利\n\n" +
        "控制方式：\n" +
        "- 方向键或WASD：移动\n" +
        "- 空格键或技能按钮：激活/取消技能\n" +
        "- Q键或跳过回合按钮：结束当前回合\n" +
        "- R键或重新开始按钮：重置游戏\n" +
        "- F键或游戏说明按钮：显示此帮助信息"
    );
}

// 添加事件监听器
function addEventListeners() {
    // 键盘控制
    document.addEventListener('keydown', (e) => {
        switch (e.key.toLowerCase()) {
            // 移动和技能控制 - 仅在玩家回合可用
            case 'w':
            case 'arrowup':
                if (isPlayerTurn) movePlayer(0, -1);
                break;
            case 'a':
            case 'arrowleft':
                if (isPlayerTurn) movePlayer(-1, 0);
                break;
            case 's':
            case 'arrowdown':
                if (isPlayerTurn) movePlayer(0, 1);
                break;
            case 'd':
            case 'arrowright':
                if (isPlayerTurn) movePlayer(1, 0);
                break;
            case ' ': // 空格键激活技能
                if (isPlayerTurn) activateSkill();
                break;

            // 全局快捷键 - 任何时候都可用
            case 'q': // 跳过回合
                if (isPlayerTurn && gameStatus !== "胜利！恭喜你走出迷宫！" && gameStatus !== "失败！你困在墙里了！") {
                    endPlayerTurn();
                }
                break;
            case 'r': // 重新开始
                restartGame();
                break;
            case 'f': // 游戏信息
                showHelp();
                break;
        }
    });

    // 移动玩家
    document.getElementById('btnUp').addEventListener('click', () => movePlayer(0, -1));
    document.getElementById('btnLeft').addEventListener('click', () => movePlayer(-1, 0));
    document.getElementById('btnDown').addEventListener('click', () => movePlayer(0, 1));
    document.getElementById('btnRight').addEventListener('click', () => movePlayer(1, 0));

    // 技能按钮
    skillButton = document.getElementById('btnSkill');
    skillButton.addEventListener('click', activateSkill);

    // 跳过回合按钮
    document.getElementById('btnSkip').addEventListener('click', () => {
        if (isPlayerTurn && gameStatus !== "胜利！恭喜你走出迷宫！" && gameStatus !== "失败！你困在墙里了！") {
            endPlayerTurn();
        }
    });

    // 重新开始按钮
    document.getElementById('btnRestart').addEventListener('click', restartGame);

    // 游戏说明按钮
    document.getElementById('btnHelp').addEventListener('click', showHelp);
}

// 更新状态
function updateStatus() {
    document.getElementById('gameStatus').textContent = gameStatus;
    document.getElementById('actionsLeft').textContent = actionsLeft;
    document.getElementById('skillsLeft').textContent = skillsLeft;
}

// 当页面加载完成后初始化游戏
window.addEventListener('load', initGame);