const jwt = require("jsonwebtoken");
const tokenValidation= function(req,res,next){
  
   let token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });
  try{
    let decodedToken =jwt.verify(token, "nurasha2000");
  }
  catch(err){
    return res.send({ status: false, msg: "token is invalid" });
  }
  next();
}
module.exports.tokenValidation=tokenValidation;