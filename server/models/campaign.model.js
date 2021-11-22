const mongoose = require('mongoose')

const Campaign = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    campaignStatus: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    members: {
        type: Array,
        required: true,
    },
    template: {
        type: mongoose.Schema.ObjectId,
        ref: 'Template',
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
  }, {timestamps: true})

const model = mongoose.model('CampaignData', Campaign, 'campaigns')

module.exports = model
