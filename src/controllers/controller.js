const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")

const createBook=async function(req,res){
    if(req.body.author_id){
        const data=await BookModel.create(req.body);
        res.send({msg:data})
    }
    else{
        res.send({msg:"please give author_id,it's mandatory!"})
    }
}
const createAuthor=async function(req,res){
    if(req.body.author_id){
        const data=await AuthorModel.create(req.body);
        res.send({msg:data})
    }
    else{
        res.send({msg:"please give author_id,it's mandatory!"})
    }
}
const getBhagatBooks=async function(req,res){
    const authorObj=await AuthorModel.findOne({author_name:"Chetan Bhagat"})
    const id=authorObj.author_id
    const booksName=await BookModel.find({author_id:id})
    res.send(booksName)
}

const findAuthorAndUpdatePrice=async function(req,res){
    const updatedData=await BookModel.findOneAndUpdate({name:"Two states"},{price:100},{new:true}).select({author_id:1,name:1,price:1,_id:0})
    const authorObj=await AuthorModel.findOne({$or:[updatedData]})
    res.send({authorName:authorObj.author_name,data:updatedData})
}

const getAuthors=async function(req,res){
    const booksObj=await BookModel.find( { price : { $gte: 50, $lte: 100} } )
    const idArr=[]
    booksObj.forEach(obj=>{
        const id=obj.author_id
        idArr.push(id)
    })
    const authorObj=await AuthorModel.find({author_id:{$in:idArr}})
    const authorArr=[];
    authorObj.forEach(obj=>{
        authorArr.push(obj.author_name)
    })

    res.send({authorNames:authorArr})
}

module.exports.createBook= createBook
module.exports.createAuthor= createAuthor
module.exports.getBhagatBooks= getBhagatBooks
module.exports.findAuthorAndUpdatePrice= findAuthorAndUpdatePrice
module.exports.getAuthors= getAuthors
