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
    for (let i = 1; i <= m; i++) { const option="document.createElement('option');" option.value="i;" option.textcontent="i;" nselect.appendchild(option); } }); function generatematrix(row, m, n) if(n="==0){" for (let i="0;" < row.push(0); matrixdata.push(row); return; if(m="=n){" row.push(1); generatematrix(row.concat(0), m-1, n); generatematrix(row.concat(1), n-1); document.getelementbyid('m-input').addeventlistener('change', updatematrix); document.getelementbyid('n-input').addeventlistener('change', ()> {
    const m = parseInt(document.getElementById('m-input').value);
    const colSelect = document.getElementById('col-select');
    colSelect.innerHTML = '';
    for (let i = 1; i <= m; i++) { const checkbox="document.createElement('input');" checkbox.type="checkbox" ; checkbox.value="i;" checkbox.id="col-" + i; label="document.createElement('label');" label.htmlfor="col-" label.textcontent="i;" colselect.appendchild(checkbox); colselect.appendchild(label); } updatematrix(); }); function getselectedcolumns() checkboxes="document.querySelectorAll('#col-select" input[type="checkbox" ]'); selectedcols="[];" checkboxes.foreach(checkbox> {
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
                    if (col > 0 && col </=></=>