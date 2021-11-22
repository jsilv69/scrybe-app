const mongoose = require('mongoose')

const Template = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
  }, {timestamps: true})

const model = mongoose.model('TemplateData', Template, 'templates')

module.exports = model
