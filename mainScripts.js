//Written by Stew Towle
//Contains the script for operating the Go Study App main-page

const sgfFile = "SaveData/alaska-beefstew.sgf";

document.addEventListener("DOMContentLoaded", initialize);

const toolTips = {
    ProverbWidget: "This widget displays proverbs you have saved to your personal proverbs and lessons.",
    JosekiWidget: "Interactive Go Board for playing out common sequences and saving notes about them",
    NotesWidget: "Use this area to view and edit Notes you have about Go."
};

const fileData = {
    proverbs: [
        "Use early game influence to attack",
        "When no move looks good, tenuki.",
        "Inside your territory make solid connection, facing out make tiger's mouth."
    ],
    currProv: 0,
    activeProvSearch: false,
    notes: {

    },
    joseki: {

    }
};

function loadToolTips(tipsById) {
    for (const part in tipsById) {
        console.log(part);
        document.getElementById(part).dataset.tooltip = tipsById[part];
    }
}

function loadJoseki(filePath) {
    let josekiDiv = document.querySelector("eidogo-player-auto");
    

}

function initProverbs(source) {
    let curr_index = Math.floor(Math.random() * source.proverbs.length);
    let span = document.getElementById("currProverb");
    span.innerText = source.proverbs[curr_index];
    source.proverbs.currProv = curr_index;
}

function nextProverb(source = fileData) {
    let span = document.getElementById("currProverb");
    if (!source.activeProvSearch) {
        source.currProv++;
        source.currProv = source.currProv % source.proverbs.length;
        span.innerText = source.proverbs[source.currProv];
    }
    
}




function initialize() {
    loadToolTips(toolTips);
    //loadJoseki(sgfFile);
    initProverbs(fileData);
}