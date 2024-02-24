const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String,
    },
    username: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String
    }
 });

 const userModel = mongoose.model('User', userSchema);

 module.exports = userModel;

