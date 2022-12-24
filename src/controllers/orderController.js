const orderModel=require('../models/orderModel')
const productModel=require('../models/productModel');
const userModel = require('../models/userModel');

const orderPurchase=async function(req,res){
    const productData=await productModel.findById(req.body.productId);
    const userData=await userModel.findById(req.body.userId);
    if(!productData){
        res.send({msg:"product does not exist"})
    }
    if(req.headers.isfreeappuser){
        req.body["amount"]=0
        req.body["isFreeAppUser"]=true
        const createdOrder=await orderModel.create(req.body)
        res.send({msg:createdOrder})
    }
    else{
        const productPrice=productData.price;
        const userBalance=userData.balance;
        if(userBalance<productPrice){
            res.send({msg:"insufficient balance"})
        }
        await userModel.findByIdAndUpdate(req.body.userId,{balance:(userBalance-productPrice)})
        req.body["amount"]=productPrice
        req.body["isFreeAppUser"]=false
        const createdOrder=await orderModel.create(req.body)
        res.send({msg:createdOrder})
    }
}

module.exports.orderPurchase=orderPurchase