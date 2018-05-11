import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import isEmpty from "validator/lib/isEmpty";
import isNumeric from "validator/lib/isNumeric";
import moment from "moment";
import XRegExp from "xregexp";

const unicodeWorld = XRegExp("^(?:\\p{L}|\\p{L}[ '-]\\p{L})+$");
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

    value = value.trim();
		
    switch (name) {
    case "email":
        return !isEmail(value);

    case "firstName":
        return !unicodeWorld.test(value) || !isLength(value, {min:2, max:24});
    
    case "lastName":
        return !unicodeWorld.test(value) || !isLength(value, {min:2, max:24});
    
    case "password":
        return !isLength(value, {min:8});

    case "phoneNumber":
        return !isNumeric(value) || !isLength(value, {min:5, max:12});
		   
    case "dateOfBirth": {
        const date = moment(value, "YYYY-MM-DD");
        const currDate = moment();
        const diff = moment.duration(currDate.diff(date)).add(1, "days");
        return diff.years() < 18
    }	 
    }
};

module.exports = {
    isFieldError
};
