import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import isEmpty from "validator/lib/isEmpty";
import isNumeric from "validator/lib/isNumeric";
import isAlpha from "validator/lib/isAlpha";

const isFieldError = (name, value) => {
    if(name === "termsAgreed") {
        return !value;
    }

    if (isEmpty(value)) {
        return {
            active: true,
            justEmpty: true
        }
    }

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
    }
};

module.exports = {
    isFieldError
};
