const express = require('express');
const app = express();
app.use(express.static('static'));
app.get('/', function (req, res) {
    res.send('index.html');
    res.end();
});
app.listen(8000, function () {
    console.log('listening on port 8000');
});