function dataFilter(data, optionList){
    return data.filter(el => {
        let isSelected = true;
        for (const option in optionList){
          let value = el[option]; 
          if (!optionList[option][value]){
              isSelected = false; 
          }
       }
       return isSelected;
    })
}

export function showTable(source, optionList, thOrder, container){
    let filteredData;
    let col_1_val = '';
    const col_1_list = {};
    if (optionList) filteredData = dataFilter(source, optionList);
    else filteredData = source;
    container.innerHTML = '';

    if (thOrder[0] === 'product') {
        container.parentElement.querySelector('#th-1').innerText = '商品';
        container.parentElement.querySelector('#th-2').innerText = '地区';
    } else {
        container.parentElement.querySelector('#th-2').innerText = '商品';
        container.parentElement.querySelector('#th-1').innerText = '地区';
    }
    
    filteredData.forEach(el => {
        const newRow = document.createElement('tr');
        let col_1 = '', col_2 = '';
        if (el[thOrder[0]] != col_1_val){
            col_1_val = el[thOrder[0]]; 
            if (col_1_val){
                col_1_list[col_1_val] = 1;
            }
           
     
           
            col_1 = `<td class="tg-0lax" id="${col_1_val}">${el[thOrder[0]]}</td>`;
        } else {
            col_1_list[col_1_val]++;
           
        }

        col_2 = `<td class="tg-0lax">${el[thOrder[1]]}</td>`;
        let sales = '';
        for (const month of el.sale) {
            sales +=  `<td class="tg-0lax">${month}</td>`;
        }

        const data = col_1 + col_2 + sales;
        newRow.innerHTML = data;
        container.appendChild(newRow);
    })

    for (const el in col_1_list) {
     
        if (el){
            container.querySelector('#' + el).setAttribute('rowspan', col_1_list[el]);
        }
    }
}

