import {createSVGElement, setSVGAttributes} from './utilities.js'

export function drawBarChart(container, data){
  const maximum = Math.max(...data);
  const canvasHeight = 300;
  const canvasWidth = 500;
  const rectWidth = 20;
  const gap = 10;
  const rectColor = "green";
  const axisColor = "black";
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
    const rectAttrs = rectAttributesDict(originX + gap * (n+1) + rectWidth * n, originY - height, rectWidth, height, rectColor);
    const rectNode = createSVGElement('rect', setSVGAttributes, rectAttrs);
    svgNode.appendChild(rectNode)
    n++;
  })
 

}



function lineAttributesDict(x1, y1, x2, y2, stroke, strokeWidth){
    return {x1, y1, x2, y2, stroke, 'stroke-width': strokeWidth || 1}
}

function rectAttributesDict(x, y, width, height, fill){
    return {x, y, width, height, fill};
}