const { Router } = require("express")
const express=require("express")
const router=express.Router()
const collegeController=require("../controller/collegeController")
const intensModel = require('../model/internModel')

router.post("/functionup/colleges",collegeController.collegeCreate)
router.post("/functionup/interns",collegeController.interCreate)
router.get("/functionup/collegeDetails",collegeController.getCollege)

// router.get('/interns',async (req ,res)=>{
//   let data =  await intensModel.find({collegeId : req.query.id})
//   res.send({data : data})
// })

router.all('*/',(req ,res)=>{
    res.status(400).send({status: false , message :" path invalid"})
  })
  
module.exports=router