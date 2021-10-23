//This code is based on node.js documentation and tutorial
//https://nodejs.org/en/docs/guides/getting-started-guide/
/*
const http = require('http');

const host = '127.0.0.1';
const port = 3030;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello Squirrel');
    });

server.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}/`);
		    });
*/

const express = require('express');
const path = require('path');

const exp_serv = express();

const port = 3030;
const mainpage = "/";

/*
exp_serv.get('/', function(req,res){
	console.log(path.join(__dirname, mainpage));
	res.sendFile(path.join(__dirname, mainpage));
	    });
*/

exp_serv.listen(port, () => console.log(`listening on port ${port}`));

exp_serv.use(express.static("./"));