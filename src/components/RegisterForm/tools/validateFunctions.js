import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import isEmpty from "validator/lib/isEmpty";
import isNumeric from "validator/lib/isNumeric";
import isAlpha from "validator/lib/isAlpha";

const isFieldError = (name, value) => {
    switch (name) {
    case "email":
        return !isEmail(value);

    case "firstName":
        return !isAlpha(value) || !isLength(value, {min:2, max:24});
    
    case "lastName":
        return !isAlpha(value) || !isLength(value, {min:2, max:24});
    
    case "password":
        return !isLength(value, {min:8});

    case "phoneNumber":
        return !isNumeric(value);

    case "termsAgreed":
        return !value;    

    default:
        return isEmpty(value);    
    }
};

module.exports = {
    isFieldError
};
