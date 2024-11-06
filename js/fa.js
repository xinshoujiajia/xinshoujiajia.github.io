function createRule(value){
    rule=new Array(10);
    for(let i=0;i!=10;i++){
        rule[i]=(value%4);
        value>>=2;
    }
    return rule;
}

function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() *max);
}

const value=getRandomInt(1048576);
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('load', ()=>{
    const canvas=document.createElement("canvas");
    var subtitle=document.getElementsByClassName("site-subtitle");
    subtitle[0].textContent=`规则：${value}`;
    canvas.id="canvas";
    document.body.appendChild(canvas);
    resizeCanvas();}, false);
 
function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
 
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        const width=displayWidth;
        const height=displayHeight;

        canvas.width = width;
        canvas.height = height;
 
        const ctx = canvas.getContext('2d');
	const imageData = ctx.getImageData(0, 0, width, height);
        const data=imageData.data;

        const rule=createRule(value);
        let pre=new Array(width).fill(0);
        let cur=new Array(width);
        let color=0;
        pre[width>>1]=3;
        let index=0;
        for(let i=0;i!=height;i++){
            let j=0;
            cur[j]=rule[pre[0]+pre[1]];
            color=28*cur[j];
            data[index++]=color;
            data[index++]=color;
            data[index++]=color;
            data[index++]=255;

            while(++j!=width-1){
                cur[j]=rule[pre[j-1]+pre[j]+pre[j+1]];
                color=28*cur[j];
                data[index++]=color;
                data[index++]=color;
                data[index++]=color;
                data[index++]=255;
            }

            cur[j]=rule[pre[j]+pre[j-1]];
            color=28*cur[j];
            data[index++]=color;
            data[index++]=color;
            data[index++]=color;
            data[index++]=255;

            pre=Array.from(cur);
        }
        ctx.putImageData(imageData, 0, 0);
    }
}

