//mini express app
const exp=require("express")
const servicesApiObj=exp.Router();
const errorHandler=require("express-async-handler")

const verifytoken=require("../APIS/middleware/verifytoken")
const Services=require("../models/services")

servicesApiObj.use(exp.json())

//imports
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

//configure cloudinary
cloudinary.config({
    cloud_name:'duedscjh8',
    api_key:'784447282668448',
    api_secret: 'GIP62TC9Oz3dxtKBkcYYGa2yaMI' 
 });

//cofigure cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async (req, file) => {
    return {
    folder: 'home-services', 
    public_id: file.fieldname + '-' + Date.now()
    }},
   });

//configure multer
var upload = multer({ storage: storage })


//http:localhost:8080/user/createuser
servicesApiObj.post("/createservices",upload.single('image'),errorHandler(async (req,res)=>{
   
   
    let servicefind=await Services.findOne({serviceId:req.body.serviceId})
    
    if(servicefind==null){
     
        req.body=JSON.parse(req.body.serviceObj)
        req.body.image=req.file.path;
        
    //create user obj for User model
    let serviceObj=new Services({
        serviceId : req.body.serviceId,
            mainservice : req.body.mainservice,
            subservice:req.body.subservice,
            status:true,
            price : req.body.price,
            discreption: req.body.discreption,
            image : req.body.image
            
    })
   

    let result =await serviceObj.save()
    res.send({message:"services added"})
}
    else{   res.send({message:"service already Exist"})}
    
}))


servicesApiObj.get("/getservices",errorHandler(async (req,res)=>{
   let adminArray=await Services.find({ status:true})
    res.send({message:adminArray})
}))


servicesApiObj.put("/deleteservices",errorHandler(async (req,res)=>{
    await Services.updateOne({$and:[{subservice:req.body.subservice},{status:true}]},
        {status:req.body.status}
        )
       res.send({message:"deleted the service"})
}))

servicesApiObj.get("/getservices/:serviceId",errorHandler(async (req,res)=>{
    let adminArray=await Services.findOne({ serviceId:req.params.serviceId})
     res.send({message:adminArray})
 }))
 
 servicesApiObj.put("/updateservice",upload.single('image'),errorHandler(async (req,res)=>{
     
     req.body=JSON.parse(req.body.serviceObj)
     req.body.image=req.file.path;
     console.log(req.body)
     if(req.body.serviceId!=null){
    await Services.updateOne({ serviceId:req.body.serviceId},
        {
        mainservice : req.body.mainservice,
        subservice:req.body.subservice,
        status:true,
        price : req.body.price,
        discreption: req.body.discreption,
        image : req.body.image
        }
        )
       res.send({message:"Updated the service"})
    }else{
        res.send({message:"serviceId not found"})
    }
    
}))

servicesApiObj.get("/getmainservices/:location",errorHandler(async (req,res)=>{
    let servicesinlocation=await Services.findOne({ location:req.params.location})
    console.log(servicesinlocation)
     res.send({message:servicesinlocation})
 }))

module.exports=servicesApiObj;