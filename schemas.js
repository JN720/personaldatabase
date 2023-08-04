const mongo = require('mongodb');
const fs = require('fs')

letterSchema = new mongo.Schema({
    filename : {
        type : String,
        required : true,
        default : 'image'
    },
    size : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    file : {
        type : {},
        required : true
    }
})

voiceSchema = new mongo.Schema({
    filename : {
        type : String,
        required : true,
        default : 'audio'
    },
    size : {
        type : Number,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    file : {
        type : {},
        required : true
    }
})

module.exports.letter = mongo.model('Letter', letterSchema);
module.exports.voice = mongo.model('Voice', voiceSchema);