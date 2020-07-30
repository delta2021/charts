
export {getData, saveData};

function getData(){
    return JSON.parse(localStorage.getItem('salesData'));
}

function saveData(val){
    console.log('save');
    localStorage.setItem('salesData', JSON.stringify(val));
}