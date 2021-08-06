export function getDate(str){
    let temp = str.split("-")
    temp = temp[2].slice(0,2)  + "-" + temp[1] + "-" + temp[0];
    return temp;
}