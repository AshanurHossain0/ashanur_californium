
const globalMid= function ( req, res, next) {
    const currentdate = new Date(); 
    const datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + "  "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    let ip= req.ip
    let url= req.originalUrl
    console.log(`${datetime}  ${ip}  ${url}`)
    next()
}

module.exports.globalMid= globalMid
