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

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let config = require(`./config.json`)
let fs = require(`fs`)
let prefix = config.prefix
let dateFile = require(`./getTime`)
let data = JSON.parse(fs.readFileSync(`./online.json`))
let arr = data.online
app.get('/', function (req, res) {
    res.render('index.ejs');
});
io.sockets.on('connection', function (socket) {
    socket.on('username', function (username) {
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        let number = getRandomInt(100000)
        if (!username) username = `Anon - ${number}`
        if (username.toLowerCase().includes(`admin`)) {
            username = username.toLowerCase().replace(`admin`, ``)
            username = username.toLowerCase().replace(`[] `, ``)
        }
        if (username.toLowerCase() == config.password) username = `[Admin] Hershraj`
        console.log(`${username} has connected!`)
        data.online.push(username)
        fs.writeFileSync(`./online.json`, JSON.stringify(data))
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' joined the chat..</i>');
    });
    socket.on('disconnect', function (username) {
        console.log(`${socket.username} has disconnected!`)
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == `${socket.username}`) {
                arr.splice(i, 1);
            }
        }
        fs.writeFileSync(`./online.json`, JSON.stringify(data))
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })
    socket.on('chat_message', function (message) {
        let datetime = dateFile.getDate()
        let format = `${datetime} || ${socket.username}: ${message}\n`
        if (!message || message == "\n" || message.length == 0 || message == " " || message == "  ") return;
        if (config.logger) {
            let chat = fs.createWriteStream('./chat.log', {
                flags: 'a'
            });
            chat.write(format)
        }
        console.log(format)
        // Command Handler
        let input = message.toLowerCase()
        if (config.cussFilter) {
            filterMessage = require(`./modules/cussFilter`)(message)
        }
        require(`./chat.js`)(io, input, prefix, datetime, filterMessage, socket, config, data)
    });
});
let port = config.port || process.env.PORT
const server = http.listen(port, function () {
    let iii = 0
    if (iii = 0) {
        let baseFile = JSON.parse(fs.readFileSync(`./online.json`))
        baseFile.online = []
        fs.writeFileSync(`./online.json`, JSON.stringify(baseFile))
        iii++
    }
    console.log('listening on Port: ' + port);
    console.log(`Hosting on URL: ${config.accessURL}:${port}`)
});
