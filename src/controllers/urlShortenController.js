const shortid = require("shortid")
const validUrl = require('url-validation')
//=> model importing
const urlModel = require("../model/UrlModel");


const baseUrl = "http:localhost:3000/"
const createShortUrl = async function (req, res) {
    try {
        const { longUrl } = req.body
        if(! longUrl) return res.status(400).send({status:false, message:"please provide long url"})

        if (! validUrl(longUrl)) return res.status(400).send({status:false, message:"please provide valid long url"})

        const findUrl = await urlModel.findOne({ longUrl: longUrl }).select({urlCode:1,shortUrl:1,longUrl:1,_id:0})

        if(findUrl) return res.status(200).send({status:true, data:findUrl})

        let urlCode = shortid.generate();
        
        const findUrlCode= await urlModel.findOne({urlCode:urlCode})

        if(findUrlCode) urlCode = urlCode + shortid.generate()

        const shortUrl = baseUrl + urlCode

        const crData = await urlModel.create({ urlCode: urlCode, longUrl: longUrl, shortUrl: shortUrl })

        const result={longUrl: crData.longUrl, shortUrl: crData.shortUrl, urlCode: crData.urlCode}

        return res.status(201).send({ status: true, data: result })

    } catch (err) {
        res.status(500).send({ status: false, data: err.message })
    }
}
   const getUrl=async function (req,res){
     try{
  //====>here we are using pathparam (/:urlCode)
 let urlCode = req.params.urlCode
  //====> if urlCode not present it throughs the error
 if(!urlCode) return res.status(400).send({status:false , msg:"enter urlCode"})

 //====> here we find that urlCode in db
 const getUrl=await urlModel.findOne({urlCode:urlCode})
 //====>if urlCode simply it gives the longUrl from the getUrl with status code 301 (redirected the http)
 if(getUrl){
    let longUrl=getUrl.longUrl
  return res.status(302).redirect(longUrl)//'http://exmple.com'+
  //====> if not urlCode present it throughs the error
 }else{
   return res.status(404).send({status:false,msg:"Url not found"})
 }
}catch(err){
   res.status(500).send({status:false,msg:err.message})
  }
}
module.exports = { createShortUrl,getUrl }
