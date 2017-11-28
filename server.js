const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static(path.join(__dirname, "./node_nodules")));
app.get('/', function (req, res) {
    res.send('index.html');
    res.end();
});
const server = app.listen(8000, function () {
    console.log('listening on port 8000');
});

const io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log('connected! socket # ', socket.id);
    socket.on('posting_form', function(data) {
        console.log('received data!');
        let { name, location, lang, comments } = data;
        let lucky = Math.floor((Math.random() * 1000) + 1);
        let mesg = `You emitted the following information to the server: `;
        mesg += `{ name: '${name}', location: '${location}', language: '${lang}', comment: '${comments}' }`;
        // mesg += `\n\nYour lucky number emitted by the server is ${lucky}`
        socket.emit('updated_message', mesg);
        socket.emit('random_number', lucky);
    })
})
