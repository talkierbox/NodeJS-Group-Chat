/*
    NodeJS Web Chat
    Copyright (C) 2020 Hershraj N.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.


*/


// This is the messiest code I have ever written, I made it in a few days. Please forgive me 

async function bot(io, input, prefix, datetime, message, socket, config, data) {
    if (message.toLowerCase().startsWith(prefix) && config.enableBOT) {
        if (input.startsWith(`${prefix}say`)) {
            let array = message.split(" ")
            console.log(`Say Command Used! Attempted Password: ${array[1]}.`)
            let password = config.password
            if (array[1].toLowerCase() == password) {
                let args = message.slice(prefix.length + 4 + password.length + 1)
                return io.emit('chat_message', '<strong>' + `BOT:` + '</strong> ' + args);
            } else return;
        } else if (input.startsWith(`${prefix}help`)) {
            let helpMsg = `Commands: ${prefix}online (Shows all online users!) ||| ${prefix}ship [person1] [person2] [reverse (OPTIONAL)] ||| ${prefix}pyramid [word/sentence to pyramidize] ||| ${prefix}reverse [sentence to reverse] ||| ${prefix}8ball [sentence to check with the 8ball] ||| ${prefix}image [image direct url]`
            io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
            return io.emit('chat_message', '<strong>' + `BOT:` + '</strong> ' + helpMsg);
        } else if (input.startsWith(`${prefix}online`)) {
            io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
            return io.emit('chat_message', '<strong>' + `BOT:` + '</strong> ' + data.online.toString());
        } else if (input.startsWith(`${prefix}ship `)) {
            let args = message.split(" ")
            if (!args[2]) {
                io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
                return io.emit('chat_message', '<strong>' + `BOT:` + '</strong>: ' + `INVALID ARGUMENTS! PLEASE INPUT 2 WORDS/PEOPLE TO SHIP!`);
            }
            if (args[3]) {
                if (args[3] == "reverse") {
                    io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
                    return io.emit('chat_message', '<strong>' + `BOT:` + '</strong>: ' + require(`./modules/shipper`)(args[1], args[2], {
                        "reverse": true
                    }));
                } else {
                    io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
                    return io.emit('chat_message', '<strong>' + `BOT:` + '</strong>: ' + require(`./modules/shipper`)(args[1], args[2], null));
                }
            } else {
                io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
                return io.emit('chat_message', '<strong>' + `BOT:` + '</strong>: ' + require(`./modules/shipper`)(args[1], args[2], null));
            }
        } else if (input.startsWith(`${prefix}pyramid `)) {
            let args = message.slice(prefix.length + 8)
            message = require(`./modules/pyramidizer`)(args, {
                "reverse": true
            })
            return io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
        } else if (input.startsWith(`${prefix}image `)) {
            let args = message.split(" ")
            if (!args[1]) return io.emit('chat_message', '<strong>' + `BOT:` + '</strong> ' + `Please enter a valid image url!`);
            return io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + `<img src="${args[1]}" height="100" width="100">`);
        } else if (input.startsWith(`${prefix}reverse `)) {
            let stringToReverse = message.slice(prefix.length + 8)
            message = require(`./modules/reverse`)(stringToReverse)
            return io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
        } else if (input.startsWith(`${prefix}8ball `)) {
            let args = message.slice(prefix.length + 6)
            let ballmodule = require(`./modules/8ball`)
            let response = ballmodule.getResp()
            io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
            return io.emit('chat_message', '<strong>' + `BOT:` + '</strong> ' + response);
        } else {
            io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
            return io.emit('chat_message', '<strong>' + `BOT:` + '</strong> ' + `Invalid Command! Use ${prefix}help to see the commands!`);
        }
    } else {
        if (!message || message == "\n" || message.length == 0 || message == " " || message == "  ") return;
        io.emit('chat_message', '<strong>' + `${datetime} || ` + socket.username + '</strong>: ' + message);
    }
} // End of module
module.exports = bot
