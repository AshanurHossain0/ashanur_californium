const jwt = require("jsonwebtoken");
const tokenValidationAndAuthorization= function(req,res,next){
  try{
    let token = req.headers["x-auth-token"];
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
    try{
      let decodedToken =jwt.verify(token, "nurasha2000");
      if(decodedToken.userId !=req.params.userId){
        return res.status(403).send({status:false,msg:"you are not authorized to do the operation"})
      }
      next();
    }
    catch(err){
      return res.status(400).send({msg:"invalid token"})
    }
  }
  catch(err){
    return res.status(500).send({status:false,msg:err.message})
  }
}
module.exports.tokenValidationAndAuthorization=tokenValidationAndAuthorization;