const express = require("express");
var fs = require('fs');
var path = require('path')
const logger = require("morgan");
const bodyParser = require("body-parser");
require('./kafka/consumer.js');

// This will be our application entry. We'll setup our server here.
const http = require("http");
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger("dev"));
app.use(logger('common', {
	stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))	

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require("./routes")(app);

app.get("*", (req, res) =>
	res.status(200).send({
		message: "Bienvenido a la API de este microservicio",
	})
);

const port = parseInt(process.env.PORT, 10) || 3000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
