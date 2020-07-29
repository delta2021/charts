

export const drawLineChart = (function(){
    const canvasHeight = 300;
    const canvasWidth = 500; 
    const xLength = 450;
    const yLength = 200;
    const r = 2;
    const gap = 30;
    const originX = 50;
    const originY = 250;
    return function(canvas, data){
        if (!canvas.getContext) return; 
        
        const maximum = Math.max(...data);
        const ratio = yLength / maximum;
        const ctx = canvas.getContext('2d');
     
    
        ctx.canvas.width = canvasWidth;
        ctx.canvas.height = canvasHeight;
        ctx.clearRect(0, 0, 500, 300);
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(originX, originY - yLength);
        ctx.moveTo(originX, originY);
        ctx.lineTo(xLength, originY);
        ctx.stroke();
    
        let n = 1; 
        let prev = null;
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
