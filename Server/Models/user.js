const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type : String},
    email:{type: String},
    pass:{type: String},
    gender:{
        type: String,
        enum: ['Male' , 'Female' , "IDK"],
        default: 'IDK',
    },
    birthdate:{type: Date},
})
const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
