const {model, Schema} = require('mongoose');
const validator = require('validator');

const enquirySchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!');
            }
        }
    },
    enquiryType: {
        type: String,
        required: true
    },
    comment: {
        type: String
    }
});

const enquiry = model('Enquiry', enquirySchema);

module.exports = enquiry;
