const mongoose = require('mongoose')
const TweetScheam = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('tweet', TweetScheam)