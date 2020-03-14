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

app.get('/search', (req, res) => {
	console.log(req.query.url);
	API.api(req.query.url)
		.then((retObj) => {
			res.render('search', {response: retObj});
			console.log(retObj);
			
		}).catch((err) => {
			console.error("Error", err);
			res.render('search', {response: "api_error"});
		});
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});