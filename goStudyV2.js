//Stew Towle
//This file provides the front-end javascript for running the go study app.
//Port is set as 4242 for running this app from localhost

//Change this if you change the port you are using in GoStudyNodeV2.js
const nodeUrl = "http://localhost:4242/"; 
let studyData = {};
const saveFilePath = "SaveData/localSave.json";
let newsData = {
    data: [],
    currIndex: 0,
    activeSearch: false
    };


document.addEventListener("DOMContentLoaded", initialize);


function showTutorial() {
    let tutorial = document.getElementById("tutorialText");
    tutorial.hidden = (tutorial.hidden) ? false : true;
}

function toolTipChange(checkbox) {
    if (checkbox.checked) {
        let tooltipped = document.querySelectorAll(".notip");
        for (node in tooltipped) {
            tooltipped[node].className ="tip";
        }
    } else {
        let tooltipped = document.querySelectorAll(".tip");
        for (node in tooltipped) {
            tooltipped[node].className = "notip";
        }
    }
}

function mkProv(event) {
    studyData.proverbs.push(event.srcElement.parentNode.parentNode.firstChild.firstChild.innerText);
    saveToFile();
}

function delCurProv(source = studyData) {
    let decision = confirm("Are you sure you want to delete the proverb: " + source.proverbs[source.currProv]);
    if (decision) {
        source.proverbs.splice(source.currProv, 1);
        source.activeProvSearch = false;
        source.currSearchProv = 0;
        source.newProvSearch = false;
        source.currProv = Math.floor(Math.random() * source.proverbs.length);
        saveToFile();
        nextProverb();
    }
}

function initProverbs(source = studyData) {
    let currIndex = Math.floor(Math.random() * source.proverbs.length);
    source.currProv = currIndex;
    nextProverb();
}

function nextProverb(source = studyData) {
    let span = document.getElementById("currProverb");
    if (source.activeProvSearch == false) {
        source.currProv++;
        source.currProv = source.currProv % source.proverbs.length;
        span.innerText = source.proverbs[source.currProv];
    }
    else {
        pickNextProvWithSearch(source, span);
    }
}

function pickNextProvWithSearch(source, span) {
    if (source.newProvSearch) {
        source.newProvSearch = false;
        source.currSearchProv = 0;
        span.innerText = source.proverbs[provSearchIndexList[0]];
        source.currProv = provSearchIndexList[0];
        source.currSearchProv++;
    }
    else {
        if (source.currSearchProv < provSearchIndexList.length) {
            span.innerText = source.proverbs[provSearchIndexList[source.currSearchProv]];
            source.currProv = provSearchIndexList[source.currSearchProv];
            source.currSearchProv++;
        }
        else {
            source.activeProvSearch = false;
            nextProverb();
        }
    }
}

function provSearch() {
    let searchStr = prompt("Enter a word or phrase to search proverbs for.");
    if (searchStr != null) {
        provSearchIndexList = [];
        for (let index = 0; index < studyData.proverbs.length; index++) {
            if (studyData.proverbs[index].toLowerCase().includes(searchStr.toLowerCase())) {
                studyData.activeProvSearch = true;
                studyData.newProvSearch = true;
                provSearchIndexList.push(index);
            }
        }
        if (studyData.activeProvSearch == false) {
            alert("No matching proverb found.");
        }
        nextProverb();
    }
}

function initNews(source = newsData) {
    let currIndex = Math.floor(Math.random() * source.data.length);
    source.currIndex = currIndex;
    nextNews();

}

function incrementNews(incrementAmt, source = newsData) {
    source.currIndex = (source.currIndex + incrementAmt) % source.data.length;
    let currIndex = source.currIndex;
    let span = document.getElementById("currNews");
    span.innerHTML = source.data[currIndex]["Title"] + "</br>" + source.data[currIndex]["Date"];
    let link = document.createElement("a");
    link.href = source.data[currIndex]["Link"];
    link.innerText = "Go to original article.";
    span.append(document.createElement("br"));
    span.append(link);
}

function nextNews(source = newsData) {
    incrementNews(1, source);
}

function prevNews(source = newsData) {
    incrementNews(-1, source);
}

function initNotes(source = studyData) {
    let notesDisplay = document.getElementById("NoteTable");
    for (note in source.notes) {
        notesDisplay.append(addNoteRow(source.notes[note], note));
    }
}

function addNoteRow(note, noteNum) {
    let newRow = document.createElement("tr");
    let noteCol = document.createElement("td");
    noteCol.append(document.createElement("div"));
    noteCol.firstChild.innerText = note;
    newRow.setAttribute("id", "note" + noteNum);
    let editCol = document.createElement("td");
    let delCol = document.createElement("td");
    let provCol = document.createElement("td");
    editCol.innerHTML = '<button class="edit" type="button">edit</button>';
    editCol.firstChild.addEventListener('click', editRow);
    delCol.innerHTML = '<button class="del" type="button">delete</button>';
    delCol.firstChild.addEventListener('click', delRow);
    provCol.innerHTML = '<button class="mkProv" type="button">make proverb</button>';
    provCol.firstChild.addEventListener('click', mkProv);
    newRow.append(noteCol);
    newRow.append(editCol);
    newRow.append(delCol);
    newRow.append(provCol);
    return newRow;
}

function saveNote() {
    let note = document.getElementById("noteInput");
    studyData.notes.push(note.value);
    note.value = "";
    let notesDisplay = document.getElementById("NoteTable");
    let newNote = studyData.notes[studyData.notes.length - 1];
    notesDisplay.append(addNoteRow(newNote, studyData.notes.length - 1));
    saveToFile();

}

function delRow(event) {
    let decision = confirm("Are you sure you want to delete: " + event.srcElement.parentNode.parentNode.firstChild.innerText);
    if (decision) {
        let noteRow = event.srcElement.parentNode.parentNode;
        let elId = noteRow.id;
        let index = elId.lastIndexOf("e") + 1;
        let noteNumber = elId.slice(index);
        index = parseInt(noteNumber);
        studyData.notes.splice(index, 1);
        noteRow.remove();
        saveToFile();
    }
}

function editRow(event) {
    let noteRow = event.srcElement.parentNode.parentNode;
    noteRow.firstChild.firstChild.setAttribute("contenteditable", "true");
    let button = event.srcElement;
    button.setAttribute("class", "saveNote");
    button.innerText = "save";
    button.removeEventListener("click", editRow);
    button.addEventListener("click", saveRow);
    button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("name", "revert");
    button.innerText = "undo changes";
    event.srcElement.parentNode.append(button);
    button.addEventListener("click", revertNote);
}


function revertNote(event) {
    let noteIndex = event.srcElement.parentNode.parentNode.id.slice(4);
    let decision = confirm("Are you sure you want to undo all changes to this note?");
    if (decision) {
        let restoreContent = studyData.notes[noteIndex];
        let dataBox = event.srcElement.parentNode;
        dataBox.innerHTML = '<button class="edit" type="button">edit</button>';
        dataBox.firstChild.addEventListener('click', editRow);
        dataBox.parentNode.firstChild.firstChild.setAttribute("contenteditable", "false");
        dataBox.parentNode.firstChild.firstChild.innerText = restoreContent;
    }
}

function saveRow(event) {
    let noteIndex = event.srcElement.parentNode.parentNode.id.slice(4);
    let decision = confirm("Are you sure you want to save changes?");
    if (decision) {
        studyData.notes[noteIndex] = event.srcElement.parentNode.parentNode.firstChild.firstChild.innerText;
        let dataBox = event.srcElement.parentNode;
        dataBox.innerHTML = '<button class="edit" type="button">edit</button>';
        dataBox.firstChild.addEventListener('click', editRow);
        saveToFile();
    }
}


function postReqGen(bodyFields) {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyFields)
    };
}

function populateWidgets() {
    initNotes();
    initNews();
    initProverbs();
}

async function saveToFile() {
    let saveResults = await fetch(nodeUrl + "save", postReqGen({ type: "saveAll", "file_path": saveFilePath, data: studyData }));
}

async function initialize() {
    const loadResult = await fetch(nodeUrl + "load", postReqGen({ "file_path": saveFilePath, type: "loadSave" }));
    studyData = await loadResult.json();
    const loadNews = await fetch(nodeUrl + "load", postReqGen({ type: "loadNews" }));
    newsData.data = await loadNews.json();
    populateWidgets(); 
}
