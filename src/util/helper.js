const printDate=()=>{
    console.log(new Date());
}
const printMonth=()=>{
    const month=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
    console.log(month[(new Date().getMonth())-1])
}
const  getBatchInfo=()=>{
    const name='californium';
    const weekAndDay='W3D4'
    const topic='node modules'
    console.log(`name: ${name}, week and day: ${weekAndDay}, topic: ${topic}`);
}
module.exports.printDate=printDate;
module.exports.printMonth=printMonth;
module.exports.getBatchInfo=getBatchInfo;