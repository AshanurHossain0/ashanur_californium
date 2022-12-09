const express = require('express');
const router = express.Router();
const myModule1=require('../logger/logger.js')
const myModule2=require('../util/helper.js')
const myModule3=require('../validator/formatter.js')
const lod=require('lodash')

router.get('/test-me', function (req, res) {
    myModule1.welcome();

    myModule2.printDate();
    myModule2.printMonth();
    myModule2.getBatchInfo();

    myModule3.trim('functionUp ');
    myModule3.changetoLowerCase('aSHANur');
    myModule3.changeToUpperCase('ashaNur');

    console.log(lod.chunk(['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],3))

    let arr=[]
    let ct=0,i=1;
    while(ct<10){
        arr.push(i)
        i+=2;
        ct+=1;
    }
    console.log(lod.tail(arr))

    let arr1=[1,2,3,4,9]
    let arr2=[2,3,5]
    let arr3=[3,4,12]
    console.log(lod.union(arr1,arr2,arr3))

    console.log(lod.fromPairs([["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]))

    res.send('any dummy text')
});


router.get('/test-you', function(req, res){
    console.log("I am here")
    res.send("very important text")
})


module.exports = router;