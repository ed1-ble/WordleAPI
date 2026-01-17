// some comments are for API conc review //
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.text()) // Middleware, used to PARSE incoming data //

let wordList =[];

const fs = require('fs');
fs.readFile('5L-words.txt','utf8',(err,data)=>{
    if (err) {
        console.error(err);
        return;
    }
    wordList = data.split('\n');
})

let getWord=()=>{
    const today = new Date();
    const quadDayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 6)); // Rotates word every 6 hours //
    const word = wordList[quadDayIndex % wordList.length];
    return word;
}

// setTimeout(()=>{console.log(getWord())},1000) //

app.get('/api/word',(req,res)=>{ // word is an API endpoint, not a url path to any file in the repo! //
    const currWord = getWord();
    res.send(currWord);
});

module.exports = app;