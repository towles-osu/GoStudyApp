//Stew Towle
//This file provides the front-end javascript for running the go study app.
//Port is set as 4242 for running this app from localhost

const node_url = "http://localhost:4242/";
let studyData = {};
const saveFilePath = "SaveData/localSave.json";


document.addEventListener("DOMContentLoaded", initialize);





function post_req_gen(body_fields) {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body_fields)
    };
}



async function initialize() {
    const loadResult = await fetch(node_url + "load", post_req_gen({ "file_path": saveFilePath, type: "loadSave" }));
    studyData = await loadResult.json();
    console.log(studyData);


}
