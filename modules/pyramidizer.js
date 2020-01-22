/*Pyramidizer V1*/
 
function printByChar(word, args){
 
    if(Array.isArray(word)) word = word.toString().replace(",", " ")
     
    word = word.toString()
     
    if(!word || word.length == 0){
     return console.log(`No word inputted!`);
    }
     
    let length = word.length
     
    let returnString = ""

    for(var i = 0; i <= length; i++){
     returnString = returnString.concat(`\n` + word.slice(0, i))
    }
     if(args){
    if(args.reverse){
    for(var i = 0; i <= length; i++){
		
		let newWord = require(`./reverse.js`)(word)
		
        returnString = returnString.concat(`\n` + newWord.slice(i,length))
    }
     
    }
}
     return returnString
    }
     
    module.exports = printByChar
    