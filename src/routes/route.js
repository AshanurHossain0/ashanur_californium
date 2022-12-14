const express = require('express');
const router = express.Router();

let persons= [
    {
    name: "PK",
    age: 10,
    votingStatus: false
 },
 {
    name: "SK",
    age: 20,
    votingStatus: false
 },
 {
    name: "AA",
    age: 70,
    votingStatus: false
 },
 {
    name: "SC",
    age: 5,
    votingStatus: false
 },
 {
    name: "HO",
    age: 40,
    votingStatus: false
 }
 ]
 
router.post( "/myquery", function (req, res){
    for(let i=0;i<persons.length;i++){
        if(persons[i].age>=req.query.personAge){
            persons[i].votingStatus=true;
        }
    }
    let resArr=persons.filter(x=>x.votingStatus);
    res.send(resArr)
})


module.exports = router;