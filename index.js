const express = require('express');
const path = require('path');
const members = require('./Members');

const app = express();
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${res.originalUrl}`);
    next();
}

// init middleware
app.use(logger);
// app.get('/', (req, res) => {
//     // res.send('<h1>Hello World !!<h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


// simple REST API that gets ALL MEMBERS
app.get('/api/members',(req, res)=> {
    res.json(members)
});

// MIDDLE ware are functions that has access to req and res

// you just need to put the html files into the static folder and express will use them
app.use(express.static(path.join(__dirname, 'public')));


const PORT =process.env.PORT || 8000;
// 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
