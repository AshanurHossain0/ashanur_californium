const express = require('express');
const router = express.Router();

router.get('/sol2',function(req,res){
    let arr=[33, 34, 35,36,38]
    let n=arr.length+1;
    let maxSum=n*(arr[0]+arr[arr.length-1])/2;
    let minSum=arr.reduce((acc,element)=>{return acc+=element})
    let missingNumber=maxSum-minSum;
    res.send({data:missingNumber})
})

module.exports = router;