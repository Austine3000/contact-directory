//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Contact = require('../models/contact');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Contact', () => {
    beforeEach((done) => { //Before each test we empty the database
        Contact.remove({}, (err) => { 
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET contact', () => {
      it('it should GET all the contacts', (done) => {
        chai.request(app)
            .get('/contacts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
      });
  });

  /*
  * Test the /POST route
  */
 describe('/POST contacts', () => {
    it('it should POST a contact', (done) => {
        let contact = {
            "first_name": "Joe",
            "last_name": "Adamu",
            "phone_number": "081356678890",
            "category": "DEV-OPS"
        }
      chai.request(app)
          .post('/contacts/create')
          .send(contact)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.book.should.have.property('first_name');
            res.body.book.should.have.property('last_name');
            res.body.book.should.have.property('phone_number');
            res.body.book.should.have.property('category');
        done();
          });
    });

});

/*
  * Test the /GET/:id route
  */
 describe('/GET/:id contact', () => {
    it('it should GET a contact by the given id', (done) => {
        let contact = new Contact({
            "first_name": "Joe",
            "last_name": "Adamu",
            "phone_number": "081356678890",
            "category": "DEV-OPS"
        });
        contact.save((err, contact) => {
            chai.request(app)
          .get('/contact/' + contact.id)
          .send(contact)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('first_name');
                res.body.should.have.property('last_name');
                res.body.should.have.property('phone_number');
                res.body.should.have.property('category');
                res.body.should.have.property('_id').eql(contact.id);
            done();
          });
        });

    });

    /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id contact', () => {
    it('it should UPDATE a contact given the id', (done) => {
        let contact = new Contact({
            "first_name": "Joe",
            "last_name": "Adamu",
            "phone_number": "081356678890",
            "category": "DEV-OPS"
        })
        contact.save((err, contact) => {
              chai.request(app)
              .put(`/contacts/${contact.id}/update`)
              .send({
                "first_name": "Joe",
                "last_name": "Adamu",
                "phone_number": "081356678890",
                "category": "FRONT-END"
            })
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.book.should.have.property('category').eql("FRONT-END");
                done();
              });
        });
    });
});

/*
  * Test the /DELETE/:id route
  */
 describe('/DELETE/:id contacts', () => {
    it('it should DELETE a contact given the id', (done) => {
        let contact = new Contact({
            "first_name": "Joe",
            "last_name": "Adamu",
            "phone_number": "081356678890",
            "category": "DEV-OPS"
        })
        contact.save((err, contact) => {
              chai.request(app)
              .delete(`/contacts/${contact.id}/delete`)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Deleted successfully!');
                done();
              });
        });
    });
});
});

});

