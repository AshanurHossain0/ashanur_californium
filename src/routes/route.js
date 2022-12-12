const express = require('express');
const router = express.Router();

router.get('/sol1',function(req,res){
    let arr=[1,2,3,4,6,7,8,9]
    let n=arr.length+1;
    let maxSum=(n*(n+1))/2;
    let minSum=arr.reduce((acc,element)=>{return acc+=element});
    let missingNumber=(maxSum-minSum);
    res.send({data:missingNumber})
})

module.exports = router;