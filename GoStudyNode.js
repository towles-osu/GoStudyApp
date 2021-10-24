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
const fs = require('fs');
const bodyParser = require('body-parser');

const exp_serv = express();

exp_serv.use(bodyParser.json());

const port = 3030;
const mainpage = "/";



function saveToFile(source) {
    let stringedData = JSON.stringify(source);
    //alert("Your data file is loading, please wait until file-loaded displays at the top of the app before using features");
    console.log("writing " + source.filePath);
    fs.writeFile(source.filePath, stringedData, (err) => {
        if (err) {
            return err.code;
        }
        else {
            return `Succesfully saved data to ${path}.`;
        }
    });
}

//Given file path returns the json data as a string.
function loadFromFile(source) {
    let data = fs.readFileSync(source);
    //console.log("internal", JSON.parse(data));
    return JSON.parse(data);
    
}

/*
exp_serv.get('/', function(req,res){
	console.log(path.join(__dirname, mainpage));
	res.sendFile(path.join(__dirname, mainpage));
	    });
*/

exp_serv.get('/', function (req, res) {
    console.log("get called");
    res.sendFile(path.join(__dirname + '/index.html'));
});

exp_serv.post('/save', function (req, res, next) {
    //console.log(req.body);
    let response = saveToFile(req.body);
    res.send(response);
});

exp_serv.post('/load', function (req, res, next) {
    console.log("loading from ", req.body.filePath);
   
    let response = loadFromFile(req.body.filePath);
    //console.log(response);
    res.send(JSON.stringify(response));
    
});


exp_serv.use(function (req, res) {
    res.status(404);
    res.send('404');
});

exp_serv.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.send('Error 500: Something went wrong in the code');
});

exp_serv.listen(port, () => console.log(`listening on port ${port}`));

//exp_serv.use(express.static("./"));

