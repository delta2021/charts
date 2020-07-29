export  { clearCanvas, createSVGElement, setSVGAttributes, createSVGtext};

function clearCanvas(canvas, width=500, height=300){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
}

function createSVGElement(tag, fn, param) {
    const node =  document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (fn){
        fn(node, param);
    }
    return node
  }

function setSVGAttributes(node, pairs) {
    for (const pair in pairs){
        node.setAttributeNS(null,  pair,  pairs[pair]);
    }

}

function createSVGtext(textContent, attributes){
    const textNode = createSVGElement('text', setSVGAttributes, attributes);
    const textContentNode = document.createTextNode(textContent);
    textNode.appendChild(textContentNode);
    return textNode;
}
