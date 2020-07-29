import {createSVGElement, setSVGAttributes, createSVGtext} from './utilities.js'

export function drawBarChart(container, data){
  const maximum = Math.max(...data);
  const canvasHeight = 300;
  const canvasWidth = 500;
  const rectWidth = 20;
  const gap = 10;
  const rectColor = "green";
  const axisColor = "#666";
  const axisWidth = 400;
  const axisHeight = 200;
  const ratio = axisHeight / maximum;
  const originX = 50;
  const originY = 250;
    

  const svgNode = createSVGElement('svg');
  container.appendChild(svgNode);
  svgNode.setAttributeNS(null, 'width', canvasWidth);
  svgNode.setAttributeNS(null, 'height', canvasHeight);

  const xAxisAttr = lineAttributesDict(originX, originY, axisWidth + originX, originY,
    axisColor, 2)
  const xAxisNode = createSVGElement('line', setSVGAttributes, xAxisAttr);
  svgNode.appendChild(xAxisNode);

  const yAxisAttr = lineAttributesDict(originX, originY, originX, originY - axisHeight,
    axisColor, 2)
  const yAxisNode = createSVGElement('line', setSVGAttributes, yAxisAttr);
  svgNode.appendChild(yAxisNode);

  let n = 0;

  data.forEach(el => {
    const height = el * ratio;
    const x = originX + gap * (n+1) + rectWidth * n;
    const y = originY - height;
    const rectAttrs = rectAttributesDict(x, y, rectWidth, height, rectColor);
    const rectNode = createSVGElement('rect', setSVGAttributes, rectAttrs);

    const tagNode = createSVGtext(n+1 + '月', {x: x+10, y: originY+20, 'text-anchor': 'middle', class: 'chart-text-m'});
   
    const NumberNode = createSVGtext(el, {x: x+10, y: y-5, 'text-anchor': 'middle', class: 'chart-text-s'});
    
 
    svgNode.appendChild(rectNode);
    svgNode.appendChild(tagNode);
    svgNode.appendChild(NumberNode);
    n++;
  })

  const minNode = createSVGtext(0, {x: originX - 12, y: originY, 'text-anchor': 'end', class: 'chart-text-m'});
  const maxNode = createSVGtext(maximum, {x: originX - 12, y: originY - axisHeight + 14, 'text-anchor': 'end', class: 'chart-text-m'});
  svgNode.appendChild(minNode);
  svgNode.appendChild(maxNode);
 

}



function lineAttributesDict(x1, y1, x2, y2, stroke, strokeWidth){
    return {x1, y1, x2, y2, stroke, 'stroke-width': strokeWidth || 1}
}

function rectAttributesDict(x, y, width, height, fill){
    return {x, y, width, height, fill};
}

