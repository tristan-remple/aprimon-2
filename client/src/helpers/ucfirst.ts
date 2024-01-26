export default function ucfirst(str: string) {

    let wordArr = str.split(" ");
    let newStr = "";

    for (let i = 0; i < wordArr.length; i++) {
        let firstLetter = wordArr[i][0].toUpperCase();
        let rest = wordArr[i].slice(1);
        let word = firstLetter + rest;
        newStr += word + " ";
    }

    return newStr.slice(0, newStr.length - 1);
    
}