const jwt = require("jsonwebtoken");
const tokenValidationAndAuthorization= function(req,res,next){
  
   let token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });
  try{
    let decodedToken =jwt.verify(token, "nurasha2000");
    if(decodedToken.userId !=req.params.userId){
      return res.send({status:false,msg:"you are not authorized to do the operation"})
    }
    next();
  }
  catch(err){
    return res.send({ status: false, msg: "token is invalid" });
  }
  
}
module.exports.tokenValidationAndAuthorization=tokenValidationAndAuthorization;