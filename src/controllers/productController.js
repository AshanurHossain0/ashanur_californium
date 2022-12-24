const productModel = require("../models/productModel")

const createProduct=async function(req,res){
    const createdProduct=await productModel.create(req.body);
    res.send({msg:createdProduct});
}

module.exports.createProduct=createProduct

