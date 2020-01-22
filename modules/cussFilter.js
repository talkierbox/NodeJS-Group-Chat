

function checkCuss(message){
	
	
	
	
	
let input = message.toLowerCase()
	
	

	
	
	
	
if(input.includes(`fuck`) || input.includes(`shit`) || input.includes(`nigg`) || input.includes(`dick`) || input.includes(`fagg`) || input.includes(` ass`) || input.startsWith(`ass `)){
    message = message.toLowerCase().replace(`fuck`, "f**k")
    message = message.toLowerCase().replace(`shit`, "s**t")
    message = message.toLowerCase().replace(`nigg`, "n***")
    message = message.toLowerCase().replace(`dick`, "d**k")
    message = message.toLowerCase().replace(`fagg`, "f***")
    message = message.toLowerCase().replace(`ass`, " a**")
}

return message;
}

module.exports = checkCuss