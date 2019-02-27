const Validator = require('validator');
const isEmpty =  require('./isEmpty');
//company location email jobTitle is required
module.exports = function ValidateProfileInput(data){
    let errors = {};
    data.handle = !isEmpty(data.handle)? data.handle : '';
    data.status = !isEmpty(data.status)? data.status: '';
   
    //TODO
    data.email = !isEmpty(data.email) ? data.email : '';
    data.company  = !isEmpty(data.company)? data.company : '';
    data.location = !isEmpty (data.location) ? data.location: '';
    data.jobTitle = !isEmpty(data.jobTitle) ? data.jobTitle : '';


    if (Validator.isEmpty(data.handle), {min: 2, max : 40}){
        errors.handle = 'Handle needs to between 2 and 40 characters';
    }

    if (!Validator.isEmail(data.email)){
        errors.email = 'Email field is invalid';
    }
    if (Validator.isEmpty(data.status)){
        errors.status = 'status field is required';
    }
    if (Validator.isEmpty(company)) {
        errors.company = 'Company field is required';
    }
    if (Validator.isEmpty(location)) {
        errors.location = 'Location field is required';
    }
    if (Validator.isEmpty(jobTitle)) {
        errors.jobTitle = 'JobTitle field is required';
    }

    return {
        errors, 
        isValid : isEmpty(errors)
    };
};