const authorModel = require("../models/authorModel")
const publisherModel= require("../models/publisherModel.js")
const bookModel= require("../models/bookModel");
const { all } = require("../routes/route");

const createAuthor=async function(req,res){
    const createdAuthor=await authorModel.create(req.body);
    res.send({msg:createdAuthor})
}
const createPublisher=async function(req,res){
    const createdPublisher=await publisherModel.create(req.body);
    res.send({msg:createdPublisher})
}

const createBook=async function(req,res){
    if(req.body.authorId){
        if(req.body.publisher){
            try{
                const checkingAuthorId=await authorModel.findById(req.body.authorId)
                if(checkingAuthorId){
                    try{
                        const checkingPublisher=await publisherModel.findById(req.body.publisher)
                        if(checkingPublisher){
                            const createdData=await bookModel.create(req.body);
                            res.send(createdData)
                        }
                        else{
                            res.send({msg:"the publisher is not present"})
                        }
                    }
                    catch(err){
                        res.send({msg:"please give a valid publisher object id"})
                    }
                }
                else{
                    res.send({msg:"the author is not present"})
                }
            }
            catch(err){
                res.send({msg:"please give a valid author object id"})
            }
        }
        else{
            res.send({msg:"publisher is required"})
        }
    }
    else{
        res.send({msg:"authorId is required"})
    }
}

const getBook=async function(req,res){
    const booksData=await bookModel.find().populate('authorId').populate('publisher')
    res.send({msg:booksData})
}
const updateCover=async function(req,res){
    const findedData=await publisherModel.find({name:{$in:["Penguin","HarperCollins"]}}).select({_id:1})
    let all_id=[]
    findedData.forEach(x=>{
        all_id.push(x._id)
    })
    const updatedData=await bookModel.updateMany({publisher:{$in:all_id}},{isHardCover:true})
    res.send({msg:"updated",status:updatedData})
}
const updatePrice=async function(req,res){
    const findedData=await authorModel.find({rating:{$gt:3.5}}).select({_id:1})
    let all_id=[]
    findedData.forEach(x=>{
        all_id.push(x._id)
    })
    const updatedData=await bookModel.updateMany({authorId:{$in:all_id}},{$inc:{price:+10}})
    res.send({msg:"updated",status:updatedData})
}


module.exports.createAuthor= createAuthor
module.exports.createPublisher= createPublisher
module.exports.createBook= createBook
module.exports.getBook= getBook
module.exports.updateCover= updateCover
module.exports.updatePrice= updatePrice

