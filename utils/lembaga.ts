export function uppercaseFirstLetter(str : string) : string {
    let res : string = "";
    if(str.length > 0){
        res = str[0].toUpperCase();
        for(let i = 1; i < str.length; i++){
            res += str[i].toLowerCase();
        }
    }
    return res;
}