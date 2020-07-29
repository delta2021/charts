import {sourceData, productList, regionList, optionList, updateOptionList} from './modules/data.js';
import {showTable} from './modules/table.js';
import {generateCheckBox, checkedCounter} from './modules/checkBox.js';
import {drawBarChart} from './modules/bar.js';
import {drawLineChart} from './modules/line.js';


//生成筛选项和监听器
(function initCheckBox(){
   
    //nodes
    const tableBody = document.querySelector('#table-body');
    const productRadioWrapper = document.querySelector('#product-radio-wrapper');
    const regionRadioWrapper = document.querySelector('#region-radio-wrapper');
   

    generateCheckBox(productRadioWrapper, productList);
    generateCheckBox(regionRadioWrapper, regionList);
     
    //nodes
    const productCheckBoxes = productRadioWrapper.querySelectorAll('[data-type="checkbox"]');
    const regionCheckBoxes = regionRadioWrapper.querySelectorAll('[data-type="checkbox"]');
    const productAll = productRadioWrapper.querySelector(`#product-all`);
    const regionAll = regionRadioWrapper.querySelector(`#region-all`);
    const barWrapper = document.querySelector('#bar-wrapper');
    const lineWrapper = document.querySelector('#line-chart-canvas');

    //flags
    let regionChecked = 1;
    let productChecked = 1;


    productRadioWrapper.addEventListener('click', e => {
        if (e.target.dataset.type === 'checkbox') {
            let checked = checkedCounter(productCheckBoxes);
            if ( checked <= 0) {
                e.target.checked = true; 
                checked++;
            }
            else if (checked === optionList['product'].length) productAll.checked = true;
            else productAll.checked = false;
            updateOptionList(productCheckBoxes, optionList, 'product');

             //列的顺序
             if (checked > 1 && regionChecked === 1) {
                 regionFirst();
             } else {
                 productFirst();
             } 

             productChecked = checked; 
        }
    })


   regionRadioWrapper.addEventListener('click', e => {
        if (e.target.dataset.type === 'checkbox') {
            let checked = checkedCounter(regionCheckBoxes);
            //不允许一个都不选
            if ( checked <= 0) {
                e.target.checked = true; 
                checked++;
            }
            //如果全选，自动选中全选checkbox
            else if (checked === optionList['product'].length) regionAll.checked = true;
            else regionAll.checked = false;
            updateOptionList(regionCheckBoxes, optionList, 'region');
            //列的顺序
         
            if (checked === 1 && productChecked > checked) {
                regionFirst();
            } else {
                productFirst();
            }
            regionChecked = checked;
            

        }
    })


    productAll.addEventListener('click', (e) => {
        //这个按钮只允许选择全部， 不允许取消选择。
        if (!e.target.checked) e.target.checked = true;
        else {
            if (checkedCounter(productCheckBoxes) < optionList['product'].length){
                productCheckBoxes.forEach(el => {
                    el.checked = true;
                    updateOptionList(productCheckBoxes, optionList, 'product');
                    if (regionChecked === 1){
                        regionFirst()
                    } else {
                        productFirst();
                    }
                })
            }
        }
    })


    regionAll.addEventListener('click', (e) => {
        //这个按钮只允许选择全部， 不允许取消选择。
        if (!e.target.checked) e.target.checked = true;
        else {
            if (checkedCounter(regionCheckBoxes) < optionList['region'].length){
                regionCheckBoxes.forEach(el => {
                    el.checked = true;
                    updateOptionList(regionCheckBoxes, optionList, 'region');
                    productFirst();
                })
            }
        }
    })


    //设置初始选中项
    productCheckBoxes.forEach(el => {
        if (el.value === '手机') el.checked = true;   
    })
    regionCheckBoxes.forEach(el => {
        if (el.value === '华东') el.checked = true;
    })
    productFirst();
    //初始的图表
    drawBarChart(barWrapper, sourceData[0].sale)
    drawLineChart(lineWrapper, sourceData[0].sale);



    //两个列序
    function productFirst(){
        const thOrder = {'0': 'product', '1': 'region', '2': 'sale'};
        showTable(sourceData, optionList, thOrder, tableBody);
    }

    function regionFirst(){
        const order = {'0': 'region', '1': 'product', '2': 'sale'};
        showTable(sourceData, optionList, order, tableBody);
    }


  

})()




