const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    }, 
    password: {
        type: 'string',
        required: true
    },
    age: {
        type: 'number',
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// module.exports = mongoose.model('User', UserSchema)
const User = mongoose.model('user', UserSchema);
//   User.createIndexes(); 
  module.exports = User;