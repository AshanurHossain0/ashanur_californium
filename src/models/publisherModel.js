const mongoose = require('mongoose');

const publisherSchema=new mongoose.Schema({
    name: {type:String,required:true},
    headQuarter:{type:String}

},{timestamps:true})



module.exports = mongoose.model('NewPublisher', publisherSchema);