export const originalData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]


export const productList = ['手机', '笔记本', '智能音箱'];
export const regionList = ['华东', '华南', '华北'];
export const optionList = {product: {'手机': true, '笔记本': false, '智能音箱': false, length: 3}, 
region: {'华东': true, '华南': false, '华北': false, length: 3}};


const dict = (function getCombinationIndex(){
    const dict = {};
    let index = 0;
    originalData.forEach(el => {
        const key = el.region + el.product;
        dict[key] = index;
        index++;
    })
    return dict;
})()

export function getSalesData(sourceData, str){
    return sourceData[dict[str]].sale; 
}

export function getOptionSelected(){
    let p ='p=';
    let r = 'r='
    for (const key in optionList.product){
        if (optionList.product[key] && key != 'length') p += key + '&';
    }

    for (const key in optionList.region){
        if (optionList.region[key]  && key != 'length') r += key + '&';
    }
    return p + r; 
}

export function updateOptionList(checkBoxes, optionList, group){
    checkBoxes.forEach(el => {
        if (el.checked){
            optionList[group][el.value] = true;
            
        } else {
            optionList[group][el.value] = false;
        }
     })
}


export function pullNewData(nodeList){
    const result = []
    nodeList.forEach(node => {
        const newData = {};
        newData.index = node.dataset.index;
        const arr = [];
        node.querySelectorAll('input').forEach(input => {
            arr.push(input.value);
        })
        newData.data = arr;
        result.push(newData)
    })

    return result;
}

export function replaceData(old, newData){

    let invalid = false;
    newData.forEach(obj => {
        if (invalid) return; 
        obj.data.forEach(el => {
            if (isNaN(el)) {
                invalid = true;
                return;
            }       
        })
    })

    if (invalid) return false;
    newData.forEach(obj => {
        old[obj.index].sale = obj.data;
    })
    return true;
   
}