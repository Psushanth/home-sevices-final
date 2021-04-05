//mini express app
const exp=require("express")
const cartApiObj=exp.Router();
const errorHandler=require("express-async-handler")



const Cart=require("../models/cart")

cartApiObj.use(exp.json())
//http:localhost:8080/user/createuser
cartApiObj.post("/addtocart",errorHandler(async (req,res)=>{
     if(req.body!=null){
       
    //create user obj for User model
    let cartObj=new Cart({
        username:req.body.username,
        subservice:req.body.subservice,
        status:true,
        price:req.body.price,
        image:req.body.image
            })
   

    let result =await cartObj.save()
    res.send({message:"added to the cart"})

         } else{   res.send({message:"services are not added"})}
    
}))


cartApiObj.get("/getservicesfrmcart/:username",errorHandler(async (req,res)=>{

    let cartfind=await Cart.find({$and:[{username:req.params.username},{status:true}]})
    if(cartfind!=null){

        res.send({message:cartfind})
    }else{
        res.send({message:"user cart not found"})
    }

   
}))

cartApiObj.put("/deletefrmcart",errorHandler(async (req,res)=>{

    

       await Cart.updateOne({$and:[{subservice:req.body.subservice},{status:true}]},
        {status:req.body.status}
        )
       res.send({message:"deleted the service"})


}))



module.exports=cartApiObj;