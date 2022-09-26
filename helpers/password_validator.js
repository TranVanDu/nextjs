var passwordValidator = require('password-validator');

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
    .is().min(6)                                    // Minimum length 8
    .is().max(20)                                  // Maximum length 100
    .has().digits()
    .has().letters()                                // Must have digits
    .has().not().spaces()                           // Should not have spaces
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()

export const checkPassword = (password) => {
    return schema.validate(password, { list: true })
}

export const getErrCheckPassword = (password) => {
    var arr = checkPassword(password);
    if (arr.length == 0) return false;
    var err = arr[0];
    switch (err) {
        case "min": return "password_6_20";
        case "max": return "password_6_20";
        case "digits": return "password_has_number";
        case "letters": return "password_has_letters";
        case "spaces": return "password_not_space";
        case "uppercase": return "password_has_uppercase";
        case "lowercase": return "password_has_lowercase";
        default: return "";
    }
}


// // Validate against a password string
// console.log(schema.validate('validPASS123'));
// // => true
// console.log(schema.validate('invalidPASS'));
// // => false

// // Get a full list of rules which failed
// console.log(schema.validate('joke', { list: true }));
// // => [ 'min', 'uppercase', 'digits' ]