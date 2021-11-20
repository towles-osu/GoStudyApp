//Stew Towle
//This is the js to be run by nodejs to provide the backend functionality for using GoStudyV2.html

//Imports of the modules we use and setup for them
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
const port = 4242;
app.set('port', port);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


function loadFile(source) {

    let data = fs.readFileSync(source);
    return JSON.parse(data);
}

app.get('/', function (req, res) {
    console.log("get called");
    res.send("this app uses post not get requests.")
});

app.post('/', (req, res, next) => {
    //This is basic test function to check if everything works for post request
    if (req.body.type == "basic") {
        res.send(JSON.stringify({ "port": port, "message": "when in doubt tenuki" }));
    }
});


app.post('/load', (req, res, next) => {
    if (req.body.type == "loadSave") {
        let file_data = loadFile(req.body.file_path);
        res.send(JSON.stringify(file_data));
    }

});



app.use(function (req, res) {
    res.status(404);
    res.send('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.send('Error 500: Something went wrong in the code');
});


app.listen(port, () => console.log('listening on port', port));