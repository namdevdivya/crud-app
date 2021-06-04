const mongoose = require('mongoose');

let schema = mongoose.Schema({
    firstname: {
        type: String,
        require: true,
        default : '',
    },
    lastname : {
        type: String,
        require: true,
        default : '',
    },
    email: {
        type:String,
        require: true,
        default : '',
        unique : true,
    },
    mobileNumber : {
        type: Number,
        require : true,
    },
    password: { type: String, default: null },
    confirmPassword : {type  : String ,default : null},
})

const Userdb = mongoose.model('user',schema);

module.exports = Userdb;