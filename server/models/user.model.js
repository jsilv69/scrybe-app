const mongoose = require('mongoose')

const User = mongoose.Schema({
    username: {
        type: String,
        required: true,
		unique: true,
    },
    email: {
        type: String,
        required: true,
		unique: true,
    },
    password: {
        type: String,
        required: true,
    },
  }, {timestamps: true})

const model = mongoose.model('UserData', User, 'users')

module.exports = model
