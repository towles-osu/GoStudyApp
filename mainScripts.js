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

//newsData object has data (storing the actual info), currIndex, activeSearch (boolean)
//news stories in format array of arrays, each array is a news item.
//sub-array is two to four parts, first element is headline, second is url, third is optional article content
// and final is associated .sgf file as json style object
const newsData = {
    data : [
        ["Go Seigen is the original AlphaGo", "www.usgo.org", "There isn't much more to say than the title.  Go Seigen was using moves that AI would later use over 70 years before AI became stronger than humans"],
        ["Blood vomit game is still being talked about", "www.go4go.net", "This is a famous game during which one of the players vomitted blood.",
            "(;FF[4]PB[Hinaya Rippo]HA[5]PW[Honinbo Dosaku]KM[0]RE[W+R]AB[dd][dp][jj][pd][pp]; W[qf]; B[mc]; W[qn]; B[ql]; W[on]; B[rp]; W[cn]; B[gq]; W[cf]; B[ch]; W[ef]; B[bd]; W[cj]; B[bf]; W[ce]; B[be]; W[cg]; B[bg]; W[cd]; B[cc]; W[dc]; B[ed]; W[ec]; B[fc]; W[cb]; B[bc]; W[fd]; B[fe]; W[gd]; B[ee]; W[gc]; B[fb]; W[eb]; B[dh]; W[ge]; B[ff]; W[eg]; B[gf]; W[eh]; B[he]; W[gb]; B[ei]; W[gh]; B[fi]; W[gg]; B[if]; W[jh]; B[hj]; W[hg]; B[hf]; W[kg]; B[ke]; W[bi]; B[bh]; W[dj]; B[bb]; W[kj]; B[kk]; W[lj]; B[lk]; W[jk]; B[jl]; W[ik]; B[ij]; W[il]; B[ki]; W[li]; B[kh]; W[lh]; B[ji]; W[jg]; B[lg]; W[lf]; B[mg]; W[je]; B[jf]; W[kf]; B[jd]; W[kd]; B[le]; W[ng]; B[mh]; W[ni]; B[nh]; W[oh]; B[og]; W[ld]; B[nf]; W[me]; B[nj]; W[jm]; B[qd]; W[qj]; B[np]; W[ro]; B[qp]; W[pg]; B[pk]; W[oj]; B[ok]; W[mi]; B[pj]; W[oi]; B[qi]; W[pi]; B[qh]; W[ph]; B[mn]; W[mk]; B[nm]; W[nl]; B[qk]; W[fk]; B[ek]; W[fl]; B[ej]; W[cp]; B[hi]; W[hh]; B[cl]; W[bl]; B[dn]; W[dm]; B[el]; W[do]; B[en]; W[eo]; B[fn]; W[cm]; B[hl]; W[hk]; B[gk]; W[kl]; B[im]; W[ll]; B[gl]; W[gp]; B[fo]; W[fp]; B[ep]; W[co]; B[fq]; W[hp]; B[hq]; W[ip]; B[jq]; W[om]; B[ol]; W[mo])"]
    ],
    currIndex: 0,
    activeSearch : false};

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

function initNews(source = fileData) {
    let curr_index = Math.floor(Math.random() * source.data.length);
    let span = document.getElementById("currNews");
    span.innerText = source.data[curr_index][0];
    let link = document.createElement("a");
    link.href = source.data[curr_index][1];
    if (source.data[curr_index].length > 3) {
        document.getElementById("loadSgfNews").hidden = false;
    }
    else {
        document.getElementById("loadSgfNews").hidden = true;
    }
    source.currIndex = curr_index;

}

function nextNews(source = newsData) {
    source.currIndex = (source.currIndex + 1) % source.data.length;
    let curr_index = source.currIndex;
    let span = document.getElementById("currNews");
    span.innerText = source.data[curr_index][0];
    let link = document.createElement("a");
    link.href = source.data[curr_index][1];
    if (source.data[curr_index].length > 3) {
        document.getElementById("loadSgfNews").hidden = false;
    }
    else {
        document.getElementById("loadSgfNews").hidden = true;
    }
    source.currIndex = curr_index;
}

/*This function is unnecessary for my project, I need to not do it.
function loadNewsSgf(source = newsData) {
    let goboard = document.getElementById("GoBoard");
    console.log(goboard);
    goboard.innerHTML = source.data[source.currIndex][3];
}
*/

function loadNewsSgf() {
    alert("This functionality is not yet available.")
}; 


function initialize() {
    loadToolTips(toolTips);
    //loadJoseki(sgfFile);
    initProverbs(fileData);
    initNews(newsData);
}