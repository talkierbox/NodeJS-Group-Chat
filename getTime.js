function getDate() {
	
	let date_ob = new Date()
	
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current day
let day = date_ob.getDate();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

let datetime =  `$${month}/${day}/${year}: ${hours}:${minutes}:${seconds}`

return datetime

}

module.exports.getDate = getDate