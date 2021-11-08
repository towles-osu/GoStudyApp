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
const child_process = require('child_process');
const waitOn = require('wait-on');
const file_path_to_news_service = 'NewsScraper/usgoScraper/goNewsScraper.py'
const file_path_to_news = 'usgoNews.json';
const waitOptions = {
    resources: [file_path_to_news],
    delay: 500,
    simultaneous: 1,
    timeout: 30000
};

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
    //news_data = fs.readFileSync(file_path_to_news, "utf8");
    //console.log(news_data)

    let data = fs.readFileSync(source);
    return JSON.parse(data);
    
    
    //console.log("internal", JSON.parse(data));
    
    
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

exp_serv.post('/news', function (req, res, next) {
    //This post function will generate the files for reading go news from
    //Does so by calling teamates go news scraper microservice
    console.log("news called");
    let result = child_process.exec("python3 " + file_path_to_news_service);
    //console.log(result);
    res.send(JSON.stringify(result));
});

exp_serv.post('/newsFile', function (req, res, next) {
    //This post function read the file information on news and returns it as a json
    waitOn(waitOptions, function (err) {
        if (err) {
            console.log("wait-on issue", err);
        }
        console.log("waited on file");
        let newsData = loadFromFile(file_path_to_news);
        //console.log(newsData);
        res.send(JSON.stringify(newsData));
    });
    
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

