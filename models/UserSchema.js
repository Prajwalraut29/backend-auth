const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userschema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})


const UserSchema = mongoose.model("userdatas", userschema)

module.exports = UserSchema;