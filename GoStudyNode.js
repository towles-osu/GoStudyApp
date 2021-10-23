//This code is based on node.js documentation and tutorial
//https://nodejs.org/en/docs/guides/getting-started-guide/

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