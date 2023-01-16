const shortid = require("shortid")
const validUrl = require('valid-url')
//=> model importing
const urlModel = require("../model/UrlModel");


const baseUrl= "http:localhost:3000" 
const createShortUrl=async function(req,res){
try{
    const {longUrl}=req.body
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).send('Invalid base URL') 
    }
    const urlCode = shortid.generate();
    if(validUrl.isUri(longUrl)){
        let createUrl = await urlModel.findOne({longUrl})
        if(createUrl)  {
           res.send(findurl)
        }else{
           const shortUrl =baseUrl+ '/' + urlCode
           createUrl=new urlModel({ urlCode , longUrl , shortUrl, data : new Date() })
       }
        res.status(200).send({status:true , data:createUrl})

  }else{
       res.status(401).json('Invalid longUrl')
   }
} catch(err){
      res.status(500).send({status:false , data:err.message})
}
}
module.exports={createShortUrl}
