const express=require("express")
const app=express()
const route=require("./router/router")
const mongoose= require("mongoose")
app.use(express.json());


mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://devendra_29:I28Cx63EjuXQjHtQ@devendra.ytysqub.mongodb.net/group17Database",{useNewUrlParser:true})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/',route)


app.listen(3000, function () {
    console.log('Express app running on port ' +  3000)
});
