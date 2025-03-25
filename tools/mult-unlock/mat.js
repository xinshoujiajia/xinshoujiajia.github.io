let matrixData = [];

function drawMatrix(matrix) {
    const container = document.getElementById('matrix-container');
    container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'matrix-table';

    matrix.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(num => {
            const td = document.createElement('td');
            td.textContent = num;
            td.className = 'matrix-cell ' + (num === 0 ? 'cell-zero' : 'cell-one');
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    container.appendChild(table);
}

document.getElementById('m-input').addEventListener('change', () => {
    const m = parseInt(document.getElementById('m-input').value);
    const nSelect = document.getElementById('n-input');
    nSelect.innerHTML = '';
    for (let i = 1; i <= m; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        nSelect.appendChild(option);
    }
});

function generateMatrix(row, m, n) {
    if(n===0){
        for (let i = 0; i < m; i++) {
            row.push(0);
        }
        matrixData.push(row);
        return;
    }
    if(m==n){
        for (let i = 0; i < m; i++) {
            row.push(1);
        }
        matrixData.push(row);
        return;
    }
    generateMatrix(row.concat(0), m-1, n);
    generateMatrix(row.concat(1), m-1, n-1);
}



document.getElementById('m-input').addEventListener('change', updateMatrix);
document.getElementById('n-input').addEventListener('change', updateMatrix);

document.getElementById('m-input').addEventListener('change', () => {
    const m = parseInt(document.getElementById('m-input').value);
    const colSelect = document.getElementById('col-select');
    colSelect.innerHTML = '';
    for (let i = 1; i <= m; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; 
        checkbox.value = i;
        checkbox.id = 'col-' + i;
        const label = document.createElement('label');
        label.htmlFor = 'col-' + i;
        label.textContent = i;
        colSelect.appendChild(checkbox);
        colSelect.appendChild(label);
    }
    updateMatrix();
});

function getSelectedColumns() {
    const checkboxes = document.querySelectorAll('#col-select input[type="checkbox"]');
    const selectedCols = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCols.push(parseInt(checkbox.value));
        }
    });
    return selectedCols;
}

function updateMatrix() {
    const m = parseInt(document.getElementById('m-input').value);
    const n = parseInt(document.getElementById('n-input').value);
    const k = m - n + 1;
    if (m > 0 && n > 0) {
        matrixData = [];
        generateMatrix([], m, k);
        document.getElementById('k-value').textContent = k;
        document.getElementById('S-value').textContent = matrixData.length;
        drawMatrix(matrixData);
        const selectedCols = getSelectedColumns();
        const container = document.getElementById('col-display');
        container.innerHTML = '';
        if (matrixData.length > 0 && selectedCols.length > 0) {
            const table = document.createElement('table');
            table.className = 'matrix-table';
            matrixData.forEach(row => {
                const tr = document.createElement('tr');
                let orResult = 0;
                selectedCols.forEach(col => {
                    if (col > 0 && col <= row.length) {
                        const td = document.createElement('td');
                        td.textContent = row[col - 1];
                        td.className = 'matrix-cell ' + (row[col - 1] === 0 ? 'cell-zero' : 'cell-one');
                        tr.appendChild(td);
                        orResult |= row[col - 1];
                    }
                });
                const emptyTd = document.createElement('td');
                emptyTd.className = 'matrix-cell empty-cell';
                tr.appendChild(emptyTd);
                const resultTd = document.createElement('td');
                resultTd.textContent = orResult;
                resultTd.className = 'matrix-cell ' + (orResult === 0 ? 'cell-zero' : 'cell-one');
                tr.appendChild(resultTd);
                table.appendChild(tr);
            });
            container.appendChild(table);
        }
    }
}

document.getElementById('col-select').addEventListener('change', updateMatrix);