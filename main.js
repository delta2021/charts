import {sourceData} from './modules/ife31data.js';
import {showTable} from './modules/table.js';


const productList = ['手机', '笔记本', '智能音箱'];
const regionList = ['华东', '华南', '华北'];
const optionList = {product: {'手机': true, '笔记本': false, '智能音箱': false, length: 3}, 
region: {'华东': true, '华南': false, '华北': false, length: 3}};
const thOrder = {'0': 'product', '1': 'region', '2': 'sale'};

//生成筛选项和监听器
(function initCheckBox(){
    const tableBody = document.querySelector('#table-body');
    const productRadioWrapper = document.querySelector('#product-radio-wrapper');
    const regionRadioWrapper = document.querySelector('#region-radio-wrapper');
    let productChecked = 1;
    let regionChecked = 1; 
    generateCheckBox(productRadioWrapper, productList, 'product');
    generateCheckBox(regionRadioWrapper, regionList, 'region');

    function generateCheckBox(container, options, group){

        let html = '';
        html += `<input type="checkbox" id="all"  value="all">
        <label for="all">全部</label>`;

        options.forEach(el => {
            html += `<input type="checkbox" id="${el}"  data-type="checkbox" value="${el}">
            <label for="${el}">${el}</label>`
        })

        container.innerHTML = html;
        //exclude 'all'
        const checkBoxes = container.querySelectorAll('[data-type="checkbox"]');
        const all = container.querySelector('#all');
        let checked = 1; 

        checkBoxes.forEach(el => {
            if (el.value === '华东' || el.value === '手机') {
                el.checked = true;
            }
        })

        showTable(sourceData, optionList, thOrder, tableBody);
        container.addEventListener('change',(e) => {
            if (e.target.type === 'checkbox'){
            
                if (e.target.value === 'all') {
                if (!e.target.checked) e.target.checked = true;
                checked = optionList[group].length;
                checkBoxes.forEach(el => {
                    el.checked = true;
                    optionList[group][el.value] = true;
                })
                } else {
                    if (e.target.checked) checked++;
                    else checked--;
                    //当没有选项被选中时， 重新选中当前选项，对表格不作更新
                    if (checked === 0) {
                        e.target.checked = true;
                        checked++;
                        return;
                    }
                    //当全部选中时， 同时勾选全选框
                    else if (checked === optionList[group].length){
                        all.checked = true;
                    } 
                    //中间状态， 取消全选框
                    else {
                        all.checked = false;
                    
                    }  
                }

                if (group === 'product') productChecked = checked;
                else regionChecked = checked;

                if (productChecked === 1 && regionChecked > 1) {
                    thOrder[0] = 'product';
                    thOrder[1] = 'region';
                } else if (productChecked > 1 && regionChecked === 1){
                    thOrder[0] = 'region';
                    thOrder[1] = 'product';
                } else if (productChecked === 1 && regionChecked === 1){
                    thOrder[0] = 'product';
                    thOrder[1] = 'region';
                } else {
                    thOrder[0] = 'product';
                    thOrder[1] = 'region';
                }
                //更新选中项
                checkBoxes.forEach(el => {
                    if (el.checked){
                        optionList[group][el.value] = true;
                        
                    } else {
                        optionList[group][el.value] = false;
                    }
                })
                //展示表格
                showTable(sourceData, optionList, thOrder, tableBody);

            }
        })
       
    
    }

})()




//next: 将时间监听器从generateCheckBox中抽出