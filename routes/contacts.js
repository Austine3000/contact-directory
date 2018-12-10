var express = require('express');
var router = express.Router();

var Contact = require('../models/contact');

router.post('/create', function(req, res) {
    req.checkBody('first_name', 'First name must be specified.').notEmpty(); 
    req.checkBody('last_name', 'Last name must be specified.').notEmpty();
    req.checkBody('phone_number', 'Phone number must be specified.').notEmpty(); 
    req.checkBody('category', 'Category must be specified.').notEmpty();

    req.sanitize('first_name').escape();
    req.sanitize('last_name').escape();
    req.sanitize('phone_number').escape();
    req.sanitize('category').escape();

    req.sanitize('first_name').trim();     
    req.sanitize('last_name').trim();
    req.sanitize('phone_number').trim();     
    req.sanitize('category').trim();


    var errors = req.validationErrors();
    
    var contact = new Contact(
      { first_name: req.body.first_name, 
        last_name: req.body.last_name, 
        phone_number: req.body.phone_number,
        category: req.body.category
       });
       
    if (errors) {
        res.json({contact: Contact, errors: errors });
        return;
    } 
    else {
        contact.save(function (err) {
            if (err) { return next(err); }
               res.json(contact);
            });
    }
});

module.exports = router;