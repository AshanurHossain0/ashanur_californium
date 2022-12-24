const userModel= require("../models/userModel")


const createUser= async function (req, res) {
    let savedData= await userModel.create(req.body)
    res.send({msg: savedData})
}

module.exports.createUser= createUser