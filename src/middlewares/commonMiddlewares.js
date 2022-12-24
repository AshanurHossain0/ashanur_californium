
const headerValidation= function ( req, res, next) {
    const isFree=req.headers.isfreeappuser
    if(isFree==undefined){
        res.send({msg:"the request is missing a mandatory header"})
    }
    else{
        req.body["isFreeAppUser"]=isFree;
        next()
    }
}

module.exports.headerValidation= headerValidation
