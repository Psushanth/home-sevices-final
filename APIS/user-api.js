//mini express app
const exp=require("express")
const userApiObj=exp.Router();
const errorHandler=require("express-async-handler")

let bcrypt=require("bcryptjs")

const User=require("../models/User")
const jwt=require("jsonwebtoken")

userApiObj.use(exp.json())
//http:localhost:8080/user/createuser
userApiObj.post("/createuser",errorHandler(async (req,res)=>{
   
   
    let userfind=await User.findOne({name:req.body.name})
    if(userfind==null){
     
       
    //create user obj for User model
    let userObj=new User({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
           
    })
    let hashpassword= await bcrypt.hash(userObj.password,7)
    userObj.password=hashpassword

    let result =await userObj.save()
    res.send({message:"user created"})
}
    else{   res.send({message:"user already Exist"})}
    
}))
userApiObj.post("/userlogin",errorHandler( async (req,res)=>{
    
    let userFromDb= await User.findOne({name:req.body.name})
    let passwordcompare=await bcrypt.compare(req.body.password,userFromDb.password)
    if(!userFromDb){
        res.send({message:"invalid username"})
    }

    else if(!passwordcompare )
    {
    res.send({message:"invalid password"})
    }
    else{
        let signedToken= await jwt.sign({name:userFromDb.name},process.env.SECRET,{expiresIn:100})
        res.send({message:"login success",token:signedToken,name:userFromDb.name})
    }
}))



userApiObj.get("/getusers",errorHandler(async (req,res)=>{


    let usersArray=await User.find()
    res.send({message:usersArray})
}))



module.exports=userApiObj;