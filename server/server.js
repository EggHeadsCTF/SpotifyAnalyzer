const path = require('path');
const http =  require('http');
const express = require('express');
const bodyParser = require('body-parser');
const API = require('./api/api');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

// EJS for templating
app.set('view engine', 'ejs');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/result', (req, res) => {
	console.log(req.query.url);
	API.getMusic(req.query.url)
		.then((retObj) => {
			res.render('result', {response: retObj});
			console.log(retObj);
			
		}).catch((err) => {
			console.error("Error", err);
			res.render('result', {response: "api_error"});
		});
});
app.get('/search', (req, res) => {
	console.log(req.query.music);
	API.searchMusic(req.query.music).then((result) => {
		console.log(result);
		res.render('search', {result: result})
	});
	
})

app.post('/ajax', urlencodedParser, (req, res) => {
	console.log(req.body);
	API.searchMusic(req.body.query).then((result) => {
		res.end(JSON.stringify(result));
		console.log('sent');
	}).catch((err) => {
		console.error("Error", err);
		res.end("api_error");
	})
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});