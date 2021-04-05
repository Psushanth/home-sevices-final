const exp=require("express")
const profApiObj=exp.Router();
const errorHandler=require("express-async-handler")

const Professional=require("../models/professional")

profApiObj.use(exp.json())
//http:localhost:8080/user/createuser
profApiObj.post("/createprof",errorHandler(async (req,res)=>{
   
   
    let proffind=await Professional.findOne({name:req.body.name})
    if(proffind==null){
     
       
    //create user obj for User model
    let profObj=new Professional({
        name:req.body.name,
        email:req.body.email,
        locations:req.body.locations,
        skills:req.body.skills,
        mobilenumber:req.body.mobilenumber
           
    })

    let result =await profObj.save()
    res.send({message:"Professional created"})
}
    else{   res.send({message:"professional already Exist"})}
    
}))

module.exports=profApiObj