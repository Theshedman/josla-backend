const {model, Schema} = require('mongoose');
const validator = require('validator');

const careerSchema = new Schema({
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
    phone: {
        type: String,
        required: true,
        validator(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Phone number is not valid!');
            }
        }
    },
    position: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    }
});

const career = model('Career', careerSchema);

module.exports = career;
