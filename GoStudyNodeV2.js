//Stew Towle
//This is the js to be run by nodejs to provide the backend functionality for using GoStudyV2.html


const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const waitOn = require('wait-on');
const file_path_to_news_service = 'NewsScraper/usgoScraper/goNewsScraper.py';
const file_path_to_news = 'usgoNews.json';
const waitOptions = {
    resources: [file_path_to_news],
    delay: 500,
    simultaneous: 1,
    timeout: 30000
};

const app = express();
const port = 4242;  //Change this if you wish to use a different port to run the service
                    //Note, you must also change the port at the top of goStudyV2.js
app.set('port', port);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


function loadFile(source) {

    let data = fs.readFileSync(source);
    return JSON.parse(data);
}

function saveFile(path, data) {
    fs.writeFileSync(path, JSON.stringify(data));
}

function getNews() {
    let result = child_process.exec("python3 " + file_path_to_news_service);
    return new Promise((resolve, reject) => {
        waitOn(waitOptions, function (err) {
            if (err) {
                return reject(err);
            }
            let fileData = loadFile(file_path_to_news);
            return resolve(fileData);
        })
    });
}

app.get('/', function (req, res) {
    res.send("this app uses post not get requests.")
});


app.post('/load', async (req, res, next) => {
    if (req.body.type == "loadSave") {
        let file_data = loadFile(req.body.file_path);
        res.send(JSON.stringify(file_data));
    }
    else if (req.body.type == "loadNews") {
        let newsData = await getNews();
        res.send(JSON.stringify(newsData));

    }

});

app.post('/save', (req, res, next) => {
    if (req.body.type == "saveAll") {
        saveFile(req.body.file_path, req.body.data);
    }

});

app.use(function (req, res) {
    res.status(404);
    res.send('404');
});

app.use(function (err, req, res, next) {
    res.status(500);
    res.send('Error 500: Something went wrong in the code');
});


app.listen(port, () => console.log('listening on port', port));