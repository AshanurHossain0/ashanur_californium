const userModel = require('../models/userModel')

const addFreeUser=async function(req,res,next){
    const user_id=req.body.userId;
    const isFreeAppUserStatus=await userModel.findById(user_id).select({_id:0,isFreeAppUser:1})
    if(isFreeAppUserStatus){
        req.headers.isfreeappuser=isFreeAppUserStatus.isFreeAppUser
        next()
    }
    else{
        res.send({msg:"invalid user id"})
    }
}

module.exports.addFreeUser=addFreeUser