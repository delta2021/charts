export const drawLineChart = (function(){
    const canvasHeight = 300;
    const canvasWidth = 500; 
    const xLength = 450;
    const yLength = 200;
    const r = 2;
    const gap = 30;
    const originX = 50;
    const originY = 250;

    return function(canvas, data, clear, color, max){
        if (!canvas.getContext) return; 
        
        const maximum = max || Math.max(...data);
        const ratio = yLength / maximum;
        const ctx = canvas.getContext('2d');
        
        if (clear){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.beginPath();
            ctx.moveTo(originX, originY);
            ctx.lineTo(originX, originY - yLength);
            ctx.moveTo(originX, originY);
            ctx.lineTo(xLength, originY);
            ctx.strokeStyle = '#000';
            ctx.stroke();
            ctx.font = '12px serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#000'
            for (let i = 1; i < 13; i++){
                ctx.fillText(i + '月', originX + gap * i, originY + 20);
            }
            
        }
       
        
        let n = 1; 
        let prev = null;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        data.forEach(el => {
            const y = el * ratio;
            ctx.beginPath();
            ctx.moveTo(originX + gap * n, originY - y);
            ctx.arc(originX + gap * n, originY - y, r, 0, Math.PI * 2, false);
            ctx.fill();
            if (prev){
                ctx.lineTo(prev[0], prev[1]);
                ctx.stroke();
            }
            prev = [originX + gap * n, originY - y];
            n++;
        })    
    }

}())


export function drawMultipleLines(canvas, dataArr, colorArr){
    let max = -Infinity;
    dataArr.forEach(el => {
        const subMax = Math.max(...el);
        if (subMax > max) max = subMax;
    })
    dataArr.forEach((data, index) => {
        if (index === 0) drawLineChart(canvas, data, true, colorArr[index], max);
        else drawLineChart(canvas, data, false, colorArr[index], max);
    })  
}
