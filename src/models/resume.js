const {model, Schema} = require('mongoose');
const validator = require('validator');

const resumeSchema = new Schema({
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
    cv: {
        type: String,
        required: true
    },
    aboutYou: {
        type: String,
        required: true
    },
    portfolio: String
});

const resume = model('Resume', resumeSchema);

module.exports = resume;
