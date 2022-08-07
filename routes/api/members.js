const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

//NOTE: your need to store you data using a database in practice

// simple REST API that gets ALL MEMBERS
router.get('/',(req, res)=> {
    res.json(members)
});

// gets all members
router.get('/:id', (req, res)=> {
    // res.send(req.params.id);
    const found = members.some(member => member.id ===parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member of the id of ${req.params.id} is found`});
    }
    
});


// Create Member
// Different methods can use the same routes
router.post('/', (req, res) => {
    // res.send(req.body); sends back the json
    const newMember = {
        id:uuid.v4(), // randomly create an id
        name: req.body.name, //use the name from req
        email: req.body.email, //use the email from req
        status: 'active'

    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and an email.'});
    }
    members.push(newMember);
    res.json(members); // if good, returns all members after updated
});

//Update Member
router.put('/:id', (req, res)=> {
    // res.send(req.params.id);
    const found = members.some(member => member.id ===parseInt(req.params.id));
    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                // accounts for situations that user only wants to update either one of the attributes
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({ msg: 'Member is updated', member});
            }
        });
        // res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member of the id of ${req.params.id} is found`});
    }
});

//Delete Member
router.delete('/:id', (req, res)=> {
    // res.send(req.params.id);
    const found = members.some(member => member.id ===parseInt(req.params.id));
    if (found) {
        res.json({msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `No member of the id of ${req.params.id} is found`});
    }
    
});

// router.post()
module.exports = router;