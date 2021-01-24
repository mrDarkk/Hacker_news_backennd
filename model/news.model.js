const mongoose = require("mongoose");

var newsSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: "You have to give an Heading"
    },
    content: {
        type: String,
        required: "You have to give an content"
    },
    URL: {
        type: String,
        required: "You have to give an url"
    },
    UserId: {
        type: String

    },
    date: {
        type: Date,
        default: Date.now()
    }

});


module.exports = mongoose.model('News', newsSchema);