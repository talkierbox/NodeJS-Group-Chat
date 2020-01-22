function check8Ball(){
    let list8ball = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy try again",
        "Ask again later",
        "Absolutely Not",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful",
        "I guess",
        "After looking at all the details, I would say yes",
        "After looking at all the details, I would say no"
    ];
   var rand = Math.floor(Math.random() * list8ball.length);
    return `${list8ball[rand]}`

}

module.exports.getResp = check8Ball