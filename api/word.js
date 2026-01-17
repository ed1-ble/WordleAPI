// some comments are for API conc review //
const express = require('express');
const path = require('path');
const app = express();
//const port = 3000;//
const cors = require('cors');
app.use(cors());
app.use(express.text()) // Middleware, used to PARSE incoming data //

const filePath = path.join(__dirname,'..','5L-words.txt')

const fs = require('fs');

let getWord=()=>{
    let wordList = fs.readFileSync(filePath,'utf8').split('\n');

    const today = new Date();
    const quadDayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 6)); // Rotates word every 6 hours //
    const word = wordList[quadDayIndex % wordList.length];
    return word;
}

setTimeout(()=>{console.log(getWord())},1000) //

app.get('/api/word',(req,res)=>{ // word is an API endpoint, not a url path to any file in the repo! //
    const currWord = getWord();
    res.send(currWord);
});

module.exports = app;