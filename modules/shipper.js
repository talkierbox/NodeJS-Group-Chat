function shipper(word1, word2, args){
 
 
 
    if(!word1 || !word2) return console.log(`You must provide 2 words!`)
     
    let length1 = word1.length
    let length2 = word2.length
     
    let word1half = Math.round(word1.length / 2)
    let word2half = Math.round(word2.length / 2)
     
    let word1Final = word1.slice(0,word1half)
    let word2Final = word2.slice(0,word2half)
 if(args){
     
    if(args.useLastHalf){
    word1Final = word1.slice(word1half, length1)
    word2Final = word2.slice(word2half, length2)
    }
     
    if(args.useLowerCase){
     word1Final = word1Final.toLowerCase()
     word2Final = word2Final.toLowerCase()
    }
     
    if(args.reverse){
     return `${word2Final}${word1Final}`
    }
 
}
   return `${word1Final}${word2Final}`
    }
     
    module.exports = shipper
    