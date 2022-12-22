const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name:{type:String,required:true},
	authorId:{type:ObjectId,ref:"NewAuthor"},
	price:{type:Number},
	ratings:{type:Number},
	publisher:{type:ObjectId,ref:"NewPublisher"},
	isHardCover:{type:Boolean,default:false}


}, { timestamps: true });


module.exports = mongoose.model('NewBook', bookSchema)
