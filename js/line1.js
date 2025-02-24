class TrigTable {
    constructor(canvas) {
        this.canvas = canvas; // 直接传入 canvas 对象
        this.ctx = this.canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.R = Math.floor(Math.min(this.width, this.height) / 4);
        this.N = Math.ceil(Math.PI * this.R);
        this.table = (()=>{
            const table = new Array(this.N);
            for (let i = 0; i < this.N; i++) {
                table[i] = Math.sin((i * Math.PI) / (this.N * 2));
            }
            return table;
        })();
        this.count = 0;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;

        // Initialize canvas
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#888888";
        this.ctx.moveTo(this.centerX+2*this.R, this.height / 2); // Start from center
    }

    // Sine table function
    sin_table(i) {
        const index = Math.floor(i / this.N) % 4;
        switch (index) {
            case 0:
                return this.table[i % this.N];
            case 1:
                return this.table[this.N - 1 - (i % this.N)];
            case 2:
                return -this.table[i % this.N];
            case 3:
                return -this.table[this.N - 1 - (i % this.N)];
        }
    }

    // Cosine table function
    cos_table(i) {
        const index = Math.floor(i / this.N) % 4;
        switch (index) {
            case 0:
                return this.table[this.N - 1 - (i % this.N)];
            case 1:
                return -this.table[i % this.N];
            case 2:
                return -this.table[this.N - 1 - (i % this.N)];
            case 3:
                return this.table[i % this.N];
        }
    }

    // Draw function
    draw() {
        // Draw line
        for(let i=0;i!=8;i++){
            const x = this.R * (this.cos_table(this.count+i) + this.cos_table(Math.round(Math.E * (this.count+i))));
            const y = this.R * (this.sin_table(this.count+i) + this.sin_table(Math.round(Math.E * (this.count+i))));
            this.ctx.lineTo(this.centerX + x, this.centerY + y);
        }
        // Increment count
        this.count+=8;
        this.ctx.stroke();

        // Request next frame
        requestAnimationFrame(() => this.draw());
    }

    // Start drawing
    start() {
        this.draw();
    }
}

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('load', ()=>{
    const canvas=document.createElement("canvas");
    canvas.id="canvas";
    document.body.appendChild(canvas);
    resizeCanvas();}, false);
 
function resizeCanvas() {
    const canvas = document.getElementById('canvas'); // 获取现有的 canvas 对象
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
 
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        const width=displayWidth;
        const height=displayHeight;

        canvas.width = width;
        canvas.height = height;
        
        const trigTable = new TrigTable(canvas); // 传入 canvas 对象
        trigTable.start();
    }
}
