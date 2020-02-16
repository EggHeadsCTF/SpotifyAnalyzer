const path = require('path');
const http =  require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const API = require('./api/api');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

app.post('/ajax', urlencodedParser, (req, res) => {
	API.api(req.body.uri, (data, err) => {
		
		let response = err ? err : data;
		console.log("server", response);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(response));
	});
});

io.on('connection', (socket) => {
  	console.log('New user connected');
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});