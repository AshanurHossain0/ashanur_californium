const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    authorName:{type:String,required:true},
	age:{type:Number},
	address:{type:String},
    rating:{type:Number}

}, { timestamps: true });

module.exports = mongoose.model('NewAuthor', authorSchema)
