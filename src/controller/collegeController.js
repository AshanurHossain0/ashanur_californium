const { find } = require("../model/collegeModel")
const collegeModel=require("../model/collegeModel")
const internsModel=require("../model/internModel")
let nameRegex = /^[A-Za-z ]{3,50}$/
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
let mobileRegex= /^([+]\d{2}[ ])?\d{10}$/

exports.collegeCreate=async function(req,res){
   try{let data=req.body
    const {name,fullName,logoLink} =data
    if(!name) return res.status(400).send({status:false,message:"name is required"})
    if(!fullName) return res.status(400).send({status:false,message:"full name is required"})
    if(!logoLink) return res.status(400).send({status:false,message:"logo link is required"})

    if(!name.match(nameRegex)) return res.status(400).send({status:false,message:"invalid name"})
    if(!fullName.match(nameRegex)) return res.status(400).send({status:false,message:"name is required"})
    
    let college=await collegeModel.findOne({name:name})
    if(college) return res.status(400).send({status:false,message:"this college name already exists"})
    let create=await collegeModel.create(data)
    res.status(201).send({status:true,data:create})
}catch(error){
    res.status(500).send({error:error.message})
}}

exports.interCreate=async function(req,res){
   try{
    let data=req.body
    const {name,email,mobile,collegeName}=data

    if(!name) return res.status(400).send({status:false,message:"name is required"})
    if(!email) return res.status(400).send({status:false,message:"email is required"})
    if(!mobile) return res.status(400).send({status:false,message:"mobile is required"})
    if(!collegeName) return res.status(400).send({status:false,message:"collegeName is required"})
    if(!name.match(nameRegex)) return res.status(400).send({status:false,msg:"plz. give valid name"})
    if(!email.match(emailRegex)) return res.status(400).send({status:false,message:"email should be valid"})
    if(!mobile.match(mobileRegex)) return res.status(400).send({status:false,msg:"mobile number is required"})

    let getcollege=await collegeModel.findOne({collegeName:collegeName})
    if(!getcollege) return res.status(400).send({status:false,message:"college does not exist"})
    let obj={name:name,email:email,mobile:mobile,collegeId:getcollege._id}
    let createdData=await internsModel.create(obj)
    res.status(201).send({status:true,data:createdData})
}catch(error){
    res.status(500).send({error:error.message})
}}


exports.getCollege=async (req,res)=>{
   let data=req.query.collegeName
   const newData=await collegeModel.findOne({name:data})
   if(!newData) return res.status(400).send({status:false,message:"you are not correct"})

   const findInterns=await internsModel.find({collegeId:newData._id}).select({collegeId:0})
   let newObj={name:newData.name,fullName:newData.fullName,logoLink:newData.logoLink,interns:findInterns}
   res.status(200).send({status:true,data:newData})
}




