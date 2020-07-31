import {originalData, productList, regionList, optionList, updateOptionList, 
    pullNewData, replaceData,getSalesData} from './modules/data.js';
import {showTable} from './modules/table.js';
import {generateCheckBox, checkedCounter} from './modules/checkBox.js';
import {drawBarChart} from './modules/bar.js';
import {drawLineChart, drawMultipleLines} from './modules/line.js';
import {colors} from './modules/colors.js';
import {getData, saveData} from'./modules/localStorage.js';
import {setHash, parseHash} from './modules/hash.js';



(function init(){

   
    // obtain data
    let sourceData;
    if (getData()) sourceData = getData();
    else sourceData = originalData;
    //nodes
    const tableBody = document.querySelector('#table-body');
    const productRadioWrapper = document.querySelector('#product-radio-wrapper');
    const regionRadioWrapper = document.querySelector('#region-radio-wrapper');
    const btn = document.querySelector('#btn-update');

    //update data
    btn.addEventListener('click', () => {
        const rowsNode = tableBody.querySelectorAll('tr');
        const newData = pullNewData(rowsNode);
        const updated = replaceData(sourceData, newData);
        if (!updated) {
            alert('包含无效输入，保存失败！');
        } else {
            saveData(sourceData);
            alert('保存成功！');
        }
        if (regionChecked < productChecked && regionChecked === 1) regionFirst();
        else productFirst();
    })


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
             productChecked = checked; 
             //会触发onpopState
             setHash();
          
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
            regionChecked = checked;
            setHash();
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
            setHash();
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
            setHash();
        }
    })


    //设置初始选中项
    if (!location.hash){
        productCheckBoxes.forEach(el => {
            if (el.value === '手机') el.checked = true;   
        })
        regionCheckBoxes.forEach(el => {
            if (el.value === '华东') el.checked = true;
        })
        productFirst();
    
        //初始的图表
        drawBarChart(barWrapper, sourceData[0].sale);
        drawLineChart(lineWrapper, sourceData[0].sale, true, colors[0]);
    } else {
        restoreState();

    }
   

    window.onpopstate = function(){
        restoreState();
    }

 

    //两个列序
    function renderTable(){
        if (productChecked > 1 && regionChecked === 1) {
            regionFirst();
        } else {
            productFirst();
        } 
    }
    function productFirst(){
        const thOrder = {'0': 'product', '1': 'region', '2': 'sale'};
        showTable(sourceData, optionList, thOrder, tableBody);
    }

    function regionFirst(){
        const order = {'0': 'region', '1': 'product', '2': 'sale'};
        showTable(sourceData, optionList, order, tableBody);
    }


    function restoreState(){
       
        let para = parseHash();
        //获得产品参数
        let i = para.indexOf('p');
        //获得地区参数
        let j = para.indexOf('r');
        let products = para.slice(i+2, j-1).split('&');
        let region = para.slice(j+2, para.length-1).split('&');
        productChecked = products.length;
        regionChecked = region.length;

        productCheckBoxes.forEach(el => {
           if (products.indexOf(el.id) >= 0){
            el.checked = true;
           } else {
               el.checked = false;
           }
        })
        regionCheckBoxes.forEach(el => {
            if (region.indexOf(el.id) >= 0){
                el.checked = true;
               } else {
                   el.checked = false;
                }
        })

        if (productChecked >= optionList.product.length){
            productAll.checked = true;
        } else {
            productAll.checked = false;
        }

        if (regionChecked >= optionList.region.length){
            regionAll.checked = true;
        } else {
            regionAll.checked = false;
        }
        
        const salesData = [];
        for (let i = 0, len = products.length; i < len; i++){
            for (let j = 0, len = region.length; j < len; j++){
                const temp = getSalesData(sourceData, region[j] + products[i]);
                salesData.push(temp);
            }
        }

        drawBarChart(barWrapper, salesData[0]);
        drawMultipleLines(lineWrapper, salesData, colors);
        updateOptionList(regionCheckBoxes, optionList, 'region');
        updateOptionList(productCheckBoxes, optionList, 'product');
        renderTable();
    }

    

})()




