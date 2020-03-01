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
	API.api(req.query.url, (data, err) => {

		let response = err ? err : data;
		//TODO optimize response
		
		res.render('search', {response: response});
	})
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});