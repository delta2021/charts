import {getOptionSelected} from './data.js'

export function setHash(){
    const hash = getOptionSelected();
    location.hash = hash;
}

export function parseHash(){
    return decodeURIComponent(location.hash);
}