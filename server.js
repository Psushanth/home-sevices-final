const exp=require("express")
const app=exp()
require("dotenv").config()

//import pathmodule
const path=require("path")
//merge this server with dist folder
app.use(exp.static(path.join(__dirname,'dist/home-services')))

const mongoose=require("mongoose");

mongoose.connect(process.env.DBURL,{useNewUrlParser:true,useUnifiedTopology:true})
const db =mongoose.connection;
db.on('error',()=>console.log("error is DB connection"))
db.once('open',()=>console.log("connected to DB"))
//import userApi
const userApiObj=require("./APIS/user-api")
const adminApiObj=require("./APIS/admin-api")
const servicesApiObj=require("./APIS/services-api")
const cartApiObj=require("./APIS/cart-api")
const professionalApiObj=require("./APIS/professional-api")
app.use("/user",userApiObj)
app.use("/admin",adminApiObj)
app.use("/services",servicesApiObj)
app.use("/cart",cartApiObj)
app.use("/professional",professionalApiObj)

//middleware to deal with invalid paths
app.use((req,res,next)=>
{res.send({message:req.url+" is not a valid path"})
})   
//error handler middleware
app.use((err,req,res,next)=>
{res.send({message:"error occuered",reason:err.message})})  
 

const port=process.env.PORT;
app.listen(port,()=>{console.log(`web server listening on port ${port}`)})
