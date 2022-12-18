const bookModel=require("../models/bookModel.js");
const createBook=async function(req,res){
    let data=req.body;
    let savedData=await bookModel.create(data)
    res.send({msg:savedData})
}

const bookList=async function(req,res){
    let list=await bookModel.find({}).select({bookName:1,authorName:1,_id:0});
    res.send({msg:list});
}
const getBooksInYear=async function(req,res){
    let data=await bookModel.find({year:req.body.year});
    res.send({list:data});
}
const getParticularBooks=async function(req,res){
    if(req.body.name){
        let data=await bookModel.find({bookName:req.body.name})
        res.send({list:data})
    }
    else{
        let data=await bookModel.find({year:req.body.year})
        res.send({list:data})
    }
}
const getXINRBooks=async function(req,res){
    let data=await bookModel.find({"price.indianPrice":/INR$/i});
    res.send({list:data})
}
const getRandomBooks=async function(req,res){
    let data=await bookModel.find({$or:[{totalPages:{$gt:500}},{stockAvailable:true}]});
    res.send({list:data})
}
module.exports.createBook=createBook;
module.exports.bookList=bookList;
module.exports.getBooksInYear=getBooksInYear;
module.exports.getParticularBooks=getParticularBooks;
module.exports.getXINRBooks=getXINRBooks;
module.exports.getRandomBooks=getRandomBooks;