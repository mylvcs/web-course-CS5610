const Validator = require('validator');
const isEmpty =  require('./isEmpty');

module.exports = function ValidateLoginInput(data){
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';
   

    if (Validator.isEmpty(data.text)){
        errors.email = 'Email field is required';
    }

    if (!Validator.isLength(data.text, {min: 8, max : 3000})){
        errors.text = 'Post must be between 8 and 300 characters';
    }
    
    return {
        errors, 
        isValid : isEmpty(errors)
    };
};