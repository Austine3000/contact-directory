var mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var ContactSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        phone_number: {type: String, required: true, max: 20},
        Category: {type: String, required: true, enum: ['FRONT-END', 'BACK-END', 'DEV-OPS', 'FULLSTACK'], default: 'FULLSTACK'}
    }
);

// Virtual for contact's full name
ContactSchema
.virtual('name')
.get(function() {
    return this.last_name + ', ' + this.first_name;
});

module.exports = mongoose.model('Contact', ContactSchema)