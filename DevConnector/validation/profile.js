const Validator = require('validator');
const isEmpty =  require('./isEmpty');

module.exports = function ValidateProfileInput(data){
    let errors = {};
    data.handle = !isEmpty(data.handle)? data.handle : '';
    data.status = !isEmpty(data.status)? data.status : '';
    data.skills = !isEmpty(data.skills)? data.skills : '';

    //TODO
    data.handle = !isEmpty(data.handle)? data.handle : '';
    data.handle = !isEmpty(data.handle)? data.handle : '';
    data.handle = !isEmpty(data.handle)? data.handle : '';
    data.handle = !isEmpty(data.handle)? data.handle : '';


    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password)? data.password : '';

    if (Validator.isEmpty(data.handle), {min: 2, max : 40}){
        errors.handle = 'Handle needs to between 2 and 40 characters';
    }
    // if (Validator.isEmail(data.email)){
    //     errors.email = 'Email field is invalid';
    // }

    if (Validator.isEmpty(data.status)){
        errors.status = 'status field is required';
    }
    if (Validator.isEmpty(data.skills)){
        errors.skills = 'skills field is required';
    }
    if (!isEmpty(data.website)){
        if (!Validator.isURL (data.website)){
            errors.website = 'Not a valid URL'; 
        }
    }
    // if (Validator.isLength(data.password, {min: 6, max :30})){
    //     errors.password = 'Password must be at least 6 characters';
    // }
    return {
        errors, 
        isValid : isEmpty(errors)
    };
};