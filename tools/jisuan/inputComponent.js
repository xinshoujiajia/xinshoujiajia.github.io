class InputComponent {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'input-component';
    }

    getValue() {
        throw new Error('getValue() must be implemented');
    }
}

class ScalarInput extends InputComponent {
    constructor(rootElement, label, args) {
        super();
        this.label = label;
        this.input = document.createElement('input');
        this.input.type = 'number';
        this.input.required = true;

        this.container.innerHTML = '';
        const labelElement = document.createElement('label');
        labelElement.textContent = this.label;
        this.container.appendChild(labelElement);
        this.container.appendChild(this.input);
        rootElement.appendChild(this.container);
    }

    getValue() {
        return parseInt(this.input.value);
    }
}

class MatrixInput extends InputComponent {
    constructor(rootElement, label, args) {
        super();
        this.rows = args[0];
        this.cols = args[1];
        this.matrix = [];
        this.table = document.createElement('table');
        this.table.className = 'matrix-table';

        if(this.rows == undefined){
            this.rows = 1;
            const rowsControl = createInputComponent(this.container,'scalar','行数');
            rowsControl.input.addEventListener('change',()=>{
               this.rows = rowsControl.getValue();
               this.resize(this.rows,this.cols); 
            })
        }
        if(this.cols == undefined){
            this.cols = 1;
            const colsControl = createInputComponent(this.container,'scalar','列数');
            colsControl.input.addEventListener('change',()=>{
                this.cols = colsControl.getValue();
                this.resize(this.rows,this.cols);
            })
        }

        this.resize(this.rows,this.cols);
        this.container.appendChild(this.table);
        rootElement.appendChild(this.container);
    }

    resize(rows, cols) {
        this.table.innerHTML = '';        

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');
            this.matrix[i] = [];

            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.required = true;
                cell.appendChild(input);
                row.appendChild(cell);
                this.matrix[i][j] = input;
            }

            this.table.appendChild(row);
        }
    }

    getValue() {
        return this.matrix.map(row => row.map(input => parseInt(input.value)));
    }
}

function createInputComponent(rootElement, type, args) {
    switch (type) {
        case 'scalar':
            return new ScalarInput(rootElement, args);
        case 'matrix':
            return new MatrixInput(rootElement, args);
        default:
            throw new Error('Unknown input type');
    }
}