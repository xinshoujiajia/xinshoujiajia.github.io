// 初始化第一个单元格
function initializeNotebook() {
    document.addEventListener('DOMContentLoaded', function() {
        addNewCell();
    });
}

// 添加新单元格
function addNewCell() {
    const notebook = document.querySelector('.notebook');
    const newCell = new Cell();
    notebook.appendChild(newCell.cell);
}

document.querySelector('.add-cell-btn').addEventListener('click', addNewCell);

// 初始化笔记本
initializeNotebook();