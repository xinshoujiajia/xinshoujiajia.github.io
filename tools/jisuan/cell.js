class Cell {
    constructor() {
        this.cell = document.createElement('div');
        this.cell.className = 'cell';

        this.inputComponents = [];
        this.functionSelect = document.createElement('select');
        this.functionSelect.className = 'function-select';
        for (let i = 0; i < functions.length; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = functions[i].name;
            this.functionSelect.appendChild(option);
        }
        this.functionSelect.addEventListener('change', () => this.updateInputs());
        this.cell.appendChild(this.functionSelect);

        this.inputContainer = document.createElement('div');
        this.inputContainer.className = 'input-container';
        this.cell.appendChild(this.inputContainer);
        this.updateInputs();

        this.calculateBtn = document.createElement('button');
        this.calculateBtn.className = 'calculate-btn';
        this.calculateBtn.textContent = '计算';
        this.calculateBtn.addEventListener('click', () => this.calculate());
        this.cell.appendChild(this.calculateBtn);

        this.resultDiv = document.createElement('div');
        this.resultDiv.className = 'result';
        this.cell.appendChild(this.resultDiv);        
    }

    updateInputs() {
        const selectedFunction = functions[this.functionSelect.value];
        this.inputComponents = [];
        this.inputContainer.innerHTML = '';

        // 改用数组遍历代替索引遍历
        selectedFunction.params.forEach(param => {
            const input = createInputComponent(
                this.inputContainer,
                param.type,  // 直接从参数对象获取类型
                param.name,  // 直接从参数对象获取名称
                param.args
            );
            this.inputComponents.push(input);
        });
    }

    calculate() {
        const inputs = this.inputComponents.map(input => input.getValue());
        const result = functions[this.functionSelect.value].func(...inputs);
        this.resultDiv.innerHTML = result;
        MathJax.typeset([this.resultDiv]);
    }
}