export function generateCheckBox(container, options){

    let html = '';
    html += `<input type="checkbox" id="${container.dataset.group}-all"  value="all">
    <label for="${container.dataset.group}-all">全部</label>`;

    options.forEach(el => {
        html += `<input type="checkbox" id="${el}"  data-type="checkbox" value="${el}">
        <label for="${el}">${el}</label>`
    })

    container.innerHTML = html;
    return container;
}




export function checkedCounter(checkBoxes){
    let counter = 0;
    checkBoxes.forEach(el => {
        if (el.checked) counter++;
    })
    return counter; 
}


