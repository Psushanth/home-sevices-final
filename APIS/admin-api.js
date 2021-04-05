//mini express app
const exp=require("express")
const adminApiObj=exp.Router();
const errorHandler=require("express-async-handler")

let bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Admin=require("../models/Admin")

adminApiObj.use(exp.json())
//http:localhost:8080/user/createuser
adminApiObj.post("/createadmin",errorHandler(async (req,res)=>{
   
   
    let userfind=await Admin.findOne({name:req.body.name})
    if(userfind==null){
     
       
    //create user obj for User model
    let adminObj=new Admin({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
           
    })
    let hashpassword= await bcrypt.hash(adminObj.password,7)
    adminObj.password=hashpassword

    let result =await adminObj.save()
    res.send({message:"admin created"})
}
    else{   res.send({message:"admin already Exist"})}
    
}))


adminApiObj.post("/adminlogin",errorHandler( async (req,res)=>{
    
    let adminFromDb= await Admin.findOne({name:req.body.name})
    let passwordcompare=await bcrypt.compare(req.body.password,adminFromDb.password)
    if(!adminFromDb){
        res.send({message:"invalid adminname"})
    }

    else if(!passwordcompare )
    {
    res.send({message:"invalid password"})
    }
    else{
        let signedToken= await jwt.sign({name:adminFromDb.name},process.env.SECRET,{expiresIn:100})
        res.send({message:"login success",token:signedToken,name:adminFromDb.name})
    }
}))



adminApiObj.get("/getadmin",errorHandler(async (req,res)=>{


    let usersArray=await Admin.find()
    res.send({message:usersArray})
}))



module.exports=adminApiObj;