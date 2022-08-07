const express = require('express');
// const moment = require('moment');
const path = require('path');
// const members = require('./Members');
const logger = require('./middleware/logger')

const app = express();

// // middleware example
// const logger = (req, res, next) => {
//     // console.log(`${req.protocol}://${req.get('host')}${res.originalUrl}`);
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`);
//     next();
// }

// init middleware
app.use(logger);
// app.get('/', (req, res) => {
//     // res.send('<h1>Hello World !!<h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // gets all members
// app.get('/api/members/:id', (req, res)=> {
//     // res.send(req.params.id);
//     const found = members.some(member => member.id ===parseInt(req.params.id));
//     if (found) {
//         res.json(members.filter(member => member.id === parseInt(req.params.id)));
//     } else {
//         res.status(400).json({ msg: `No member of the id of ${req.params.id} is found`});
//     }
    
// });


// // simple REST API that gets ALL MEMBERS
// app.get('/api/members',(req, res)=> {
//     res.json(members)
// });

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// MIDDLE ware are functions that has access to req and res

// you just need to put the html files into the static folder and express will use them
app.use(express.static(path.join(__dirname, 'public')));

// members api routes
app.use('/api/members', require('./routes/api/members'));
// app.use('/api/members');
const PORT =process.env.PORT || 8000;
// 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
