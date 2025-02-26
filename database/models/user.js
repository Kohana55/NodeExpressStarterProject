const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: { type: String },
    tokenExpiry: { type : Date },
})

mongoose.models.User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = mongoose.models.User;