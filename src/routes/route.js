const express = require('express');
const router = express.Router();


router.get("/profile-details", function(req, res){
    // Write the LOGIC here
    res.send('dummy response')
})
router.get("/movies", function(req, res){
    // Write the LOGIC here
    const movies=['three idiot','krish','kal ho na ho','premer kahini','who am i?']
    res.send(movies)
})
// router.get("/movies/:indexNumber", function(req, res){
//     // Write the LOGIC here
//     const movies=['three idiot','krish','kal ho na ho','premer kahini','who am i?']
//     res.send(movies[req.params.indexNumber])
// })
router.get("/movies/:indexNumber", function(req, res){
    // Write the LOGIC here
    const movies=['three idiot','krish','kal ho na ho','premer kahini','who am i?']
    if(req.params.indexNumber >=0 && req.params.indexNumber<5){
        res.send(movies[req.params.indexNumber])
    }
    else{
        res.send("invalid number, Enter a valid index!")
    }
})
router.get("/films", function(req, res){
    const film=[
        {
            id:1,
            name:'three idiot'
        },
        {
            id:2,
            name:'krish',
        },
        {
            id:3,
            name:'kal ho na ho'
        },
        {
            id:4,
            name:'rang de basanti'
        }
    ]
    res.send(film)
})
router.get("/films/:filmId", function(req, res){
    const film=[
        {
            id:1,
            name:'three idiot'
        },
        {
            id:2,
            name:'krish',
        },
        {
            id:3,
            name:'kal ho na ho'
        },
        {
            id:4,
            name:'rang de basanti'
        }
    ]
    let myObj=film.find((obj)=>{
        return (obj.id==req.params.filmId)
    })
    if(myObj){
        res.send(myObj);
    }
    else{
        res.send("No movie exists with this id");
    }
})


module.exports = router;